"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { reviewPointFor } from "@/lib/config";
import { lessonIdToSlug } from "@/lib/content/curriculum";
import { COMMIT, isHttpUrl } from "@/lib/evidence-rules";
import { cleanFileName, checkFile } from "@/lib/evidence-rules";
import { getLang, getT, type Messages } from "@/lib/i18n/server";
import { getLessonAccess } from "@/lib/lesson-access";
import { auth } from "@/lib/platform/auth";
import { FileRefusedError, type FileRef } from "@/lib/platform/files";
import { DECISIONS, newId, newShareToken, type DraftItem, type EvidenceItem } from "@/lib/platform/work";
import { latestSubmission, nextVersion } from "@/lib/work-rules";
import { fileStorage, workStore } from "@/lib/platform/stores";

type Fail = { ok: false; error: string };
const fail = (error: string): Fail => ({ ok: false, error });

/** The signed-in intern and an open lesson, or the reason the action cannot go ahead. */
async function guard(lessonId: string, t: Messages) {
  if (!/^\d+\.\d+$/.test(lessonId)) return fail(t["lib.error.lessonMissing"]);
  const intern = await auth.getCurrentIntern();
  if (!intern) return fail(t["lib.work.notSignedIn"]);
  const access = await getLessonAccess(lessonId);
  if (access.kind !== "open") return fail(t["lib.work.lessonNotOpen"]);
  return { ok: true as const, intern, lesson: access.lesson };
}

function refresh(lessonId: string) {
  const slug = lessonIdToSlug(lessonId);
  revalidatePath(`/lesson/${slug}`, "layout");
  revalidatePath(`/work/${slug}`);
  revalidatePath("/work");
}

// ---------- Files ----------

export async function uploadEvidenceFile(lessonId: string, form: FormData): Promise<{ ok: true; file: FileRef } | Fail> {
  const t = await getT();
  const g = await guard(lessonId, t);
  if (!g.ok) return g;
  const file = form.get("file");
  if (!(file instanceof File)) return fail(t["lib.work.chooseFile"]);
  // Checked here first so the reason is in the learner's language; the store checks again.
  const pre = checkFile(cleanFileName(file.name), file.size, await getLang());
  if (!pre.ok) return fail(pre.reason);
  try {
    const ref = await fileStorage.save(g.intern.id, file.name, new Uint8Array(await file.arrayBuffer()));
    return { ok: true, file: ref };
  } catch (e) {
    if (e instanceof FileRefusedError) return fail(e.message);
    return fail(t["lib.work.uploadFailed"](file.name));
  }
}

// ---------- Drafts and submissions ----------

export type ItemInput = { itemId: string; kind: "text" | "link" | "file"; text?: string; url?: string; fileId?: string };
export type EvidenceInput = { items: ItemInput[]; gitCommit: string };

const ItemInputSchema = z.object({
  itemId: z.string().regex(/^e\d+$/),
  kind: z.enum(["text", "link", "file"]),
  text: z.string().max(20000).optional(),
  url: z.string().max(2000).optional(),
  fileId: z.string().regex(/^[0-9a-f]{32}$/).optional(),
});
const EvidenceInputSchema = z.object({ items: z.array(ItemInputSchema).max(50), gitCommit: z.string().max(40) });

async function resolveFile(internId: string, id: string | undefined): Promise<FileRef | undefined> {
  if (!id) return undefined;
  return (await fileStorage.read(internId, id))?.ref;
}

export async function saveDraft(lessonId: string, input: EvidenceInput): Promise<{ ok: true; savedAt: string } | Fail> {
  const t = await getT();
  const g = await guard(lessonId, t);
  if (!g.ok) return g;
  const parsed = EvidenceInputSchema.safeParse(input);
  if (!parsed.success) return fail(t["lib.work.unreadable"]);
  const known = new Set(g.lesson.submission.items.map((i) => i.id));
  const items: DraftItem[] = [];
  for (const it of parsed.data.items) {
    if (!known.has(it.itemId)) continue;
    items.push({ itemId: it.itemId, kind: it.kind, text: it.text, url: it.url, file: await resolveFile(g.intern.id, it.fileId) });
  }
  const savedAt = new Date().toISOString();
  try {
    await workStore.update(g.intern.id, (w) => ({
      next: { ...w, drafts: [...w.drafts.filter((d) => d.lessonId !== lessonId), { lessonId, items, gitCommit: parsed.data.gitCommit.trim(), savedAt }] },
      result: null,
    }));
  } catch {
    return fail(t["lib.error.saveFailed"]);
  }
  return { ok: true, savedAt };
}

export type SubmitProblem = { itemId: string | "gitCommit"; message: string };

export async function submitEvidence(lessonId: string, input: EvidenceInput): Promise<{ ok: true; version: number } | (Fail & { problems?: SubmitProblem[] })> {
  const t = await getT();
  const g = await guard(lessonId, t);
  if (!g.ok) return g;
  const parsed = EvidenceInputSchema.safeParse(input);
  if (!parsed.success) return fail(t["lib.work.unreadable"]);

  const problems: SubmitProblem[] = [];
  const items: EvidenceItem[] = [];
  for (const [index, expected] of g.lesson.submission.items.entries()) {
    const it = parsed.data.items.find((x) => x.itemId === expected.id);
    const n = index + 1;
    if (!it) {
      problems.push({ itemId: expected.id, message: t["lib.work.itemEmpty"](n) });
    } else if (it.kind === "text") {
      if (!it.text?.trim()) problems.push({ itemId: it.itemId, message: t["lib.work.itemEmpty"](n) });
      else items.push({ itemId: it.itemId, kind: "text", text: it.text.trim() });
    } else if (it.kind === "link") {
      if (!it.url?.trim() || !isHttpUrl(it.url.trim())) problems.push({ itemId: it.itemId, message: t["lib.work.itemNeedsLink"](n) });
      else items.push({ itemId: it.itemId, kind: "link", url: it.url.trim() });
    } else {
      const file = await resolveFile(g.intern.id, it.fileId);
      if (!file) problems.push({ itemId: it.itemId, message: t["lib.work.itemNoFile"](n) });
      else items.push({ itemId: it.itemId, kind: "file", file });
    }
  }
  const commit = parsed.data.gitCommit.trim();
  if (commit && !COMMIT.test(commit)) problems.push({ itemId: "gitCommit", message: t["lib.work.commitFormat"] });
  if (problems.length) return { ok: false, error: t["lib.work.needsAttention"], problems };

  try {
    const version = await workStore.update(g.intern.id, (w) => {
      const v = nextVersion(w, lessonId);
      return {
        next: {
          ...w,
          drafts: w.drafts.filter((d) => d.lessonId !== lessonId),
          submissions: [...w.submissions, { id: newId(), lessonId, version: v, items, gitCommit: commit || null, submittedAt: new Date().toISOString() }],
        },
        result: v,
      };
    });
    refresh(lessonId);
    return { ok: true, version };
  } catch {
    return fail(t["lib.error.saveFailed"]);
  }
}

// ---------- Review outcome (recorded by the intern) ----------

const ReviewInputSchema = z.object({
  decision: z.enum(DECISIONS),
  reviewerName: z.string().trim().min(1, "Add the reviewer's name.").max(100),
  notes: z.string().max(5000),
});

export async function recordReviewOutcome(lessonId: string, input: z.input<typeof ReviewInputSchema>): Promise<{ ok: true } | (Fail & { field?: "reviewerName" | "decision" | "notes" })> {
  const t = await getT();
  const g = await guard(lessonId, t);
  if (!g.ok) return g;
  if (!reviewPointFor(lessonId)) return fail(t["lib.work.notReviewPoint"]);
  const parsed = ReviewInputSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0]!;
    return { ...fail(issue.path[0] === "reviewerName" ? t["lib.work.reviewerName"] : t["lib.work.checkDecision"]), field: issue.path[0] as "reviewerName" | "decision" | "notes" };
  }
  try {
    const recorded = await workStore.update(g.intern.id, (w) => {
      const latest = latestSubmission(w, lessonId);
      if (!latest) return { next: w, result: false };
      return {
        next: { ...w, decisions: [...w.decisions, { id: newId(), lessonId, version: latest.version, decision: parsed.data.decision, reviewerName: parsed.data.reviewerName, notes: parsed.data.notes.trim(), recordedAt: new Date().toISOString() }] },
        result: true,
      };
    });
    if (!recorded) return fail(t["lib.work.submitBeforeReview"]);
    refresh(lessonId);
    return { ok: true };
  } catch {
    return fail(t["lib.error.saveFailed"]);
  }
}

// ---------- Share links ----------

export async function createShareLink(lessonId: string): Promise<{ ok: true; token: string } | Fail> {
  const t = await getT();
  const g = await guard(lessonId, t);
  if (!g.ok) return g;
  try {
    const token = await workStore.update(g.intern.id, (w) => {
      if (!latestSubmission(w, lessonId)) return { next: w, result: null };
      const live = w.shares.find((s) => s.lessonId === lessonId && !s.revokedAt);
      if (live) return { next: w, result: live.token };
      const t = newShareToken();
      return { next: { ...w, shares: [...w.shares, { token: t, lessonId, createdAt: new Date().toISOString(), revokedAt: null }] }, result: t };
    });
    if (!token) return fail(t["lib.work.submitBeforeShare"]);
    refresh(lessonId);
    return { ok: true, token };
  } catch {
    return fail(t["lib.error.saveFailed"]);
  }
}

export async function revokeShareLink(lessonId: string): Promise<{ ok: true } | Fail> {
  const t = await getT();
  const g = await guard(lessonId, t);
  if (!g.ok) return g;
  try {
    const at = new Date().toISOString();
    await workStore.update(g.intern.id, (w) => ({ next: { ...w, shares: w.shares.map((s) => (s.lessonId === lessonId && !s.revokedAt ? { ...s, revokedAt: at } : s)) }, result: null }));
    refresh(lessonId);
    return { ok: true };
  } catch {
    return fail(t["lib.error.saveFailed"]);
  }
}

