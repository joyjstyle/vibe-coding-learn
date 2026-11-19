"use server";

import { z } from "zod";
import { auth } from "@/lib/platform/auth";
import { type LessonProgress } from "@/lib/platform/progress";
import { getT } from "@/lib/i18n/server";
import { getLessonAccess } from "@/lib/lesson-access";
import { chooseCriterion, emptyProgress, markComplete, recordVisit, setCriterion, setStep } from "@/lib/progress-rules";
import { revalidatePath } from "next/cache";
import { lessonIdToSlug } from "@/lib/content/curriculum";
import { checkState } from "@/lib/lesson-state";
import { completion, latestSubmission } from "@/lib/work-rules";
import { progressStore, workStore } from "@/lib/platform/stores";

export type ProgressResult = { ok: true; progress: LessonProgress } | { ok: false; error: "not_signed_in" | "not_available" | "invalid" | "save_failed" };

const LessonId = z.string().regex(/^\d+\.\d+$/);

/** Every change is checked against the real lesson and the calendar before it is stored. */
async function change(
  lessonId: string,
  check: (lesson: Extract<Awaited<ReturnType<typeof getLessonAccess>>, { kind: "open" }>["lesson"]) => boolean,
  apply: (p: LessonProgress) => LessonProgress,
): Promise<ProgressResult> {
  if (!LessonId.safeParse(lessonId).success) return { ok: false, error: "invalid" };
  const intern = await auth.getCurrentIntern();
  if (!intern) return { ok: false, error: "not_signed_in" };
  const access = await getLessonAccess(lessonId);
  if (access.kind !== "open") return { ok: false, error: "not_available" };
  if (!check(access.lesson)) return { ok: false, error: "invalid" };
  try {
    const progress = await progressStore.update(intern.id, lessonId, (current) => apply(current ?? emptyProgress(lessonId)));
    return { ok: true, progress };
  } catch {
    return { ok: false, error: "save_failed" };
  }
}

export async function saveSectionVisit(lessonId: string, section: number): Promise<ProgressResult> {
  return change(lessonId, (l) => Number.isInteger(section) && l.sections.some((s) => s.number === section), (p) => recordVisit(p, section));
}

export async function saveStep(lessonId: string, stepId: string, checked: boolean): Promise<ProgressResult> {
  return change(lessonId, (l) => typeof checked === "boolean" && l.task.steps.some((s) => s.id === stepId), (p) => setStep(p, stepId, checked));
}

export async function saveCriterion(lessonId: string, criterionId: string, checked: boolean): Promise<ProgressResult> {
  return change(lessonId, (l) => typeof checked === "boolean" && l.criteria.items.some((c) => c.id === criterionId), (p) => setCriterion(p, criterionId, checked));
}

/** Lesson 1.2's "either" criteria: choosing one alternative replaces any other. */
export async function chooseCriterionOption(lessonId: string, criterionId: string): Promise<ProgressResult> {
  return change(lessonId, (l) => l.criteria.mode === "one" && l.criteria.items.some((c) => c.id === criterionId), (p) => chooseCriterion(p, criterionId));
}

export type CompleteResult = { ok: true } | { ok: false; error: string };

/**
 * Marks the lesson complete once all four conditions hold: every step ticked, evidence
 * submitted, every completion criterion ticked, and the knowledge check passed (or not yet
 * available). Checked again here, whatever the page showed. Supervisor review plays no part.
 */
export async function markLessonComplete(lessonId: string): Promise<CompleteResult> {
  const t = await getT();
  if (!LessonId.safeParse(lessonId).success) return { ok: false, error: t["lib.error.lessonMissing"] };
  const intern = await auth.getCurrentIntern();
  if (!intern) return { ok: false, error: t["lib.progress.notSignedIn"] };
  const access = await getLessonAccess(lessonId);
  if (access.kind !== "open") return { ok: false, error: t["lib.error.lessonNotOpen"] };
  try {
    const work = await workStore.get(intern.id);
    const current = await progressStore.get(intern.id, lessonId);
    const check = await checkState(lessonId, current);
    const state = completion(access.lesson, current, Boolean(latestSubmission(work, lessonId)), check);
    if (!state.ready) return { ok: false, error: t["lib.progress.conditionsNotMet"] };
    await progressStore.update(intern.id, lessonId, (p) => markComplete(p ?? emptyProgress(lessonId), new Date().toISOString(), check === "passed" ? "passed" : "unavailable"));
    const slug = lessonIdToSlug(lessonId);
    revalidatePath(`/lesson/${slug}`, "layout");
    revalidatePath("/syllabus");
    revalidatePath(`/day/${access.lesson.day}`);
    return { ok: true };
  } catch {
    return { ok: false, error: t["lib.error.saveFailed"] };
  }
}
