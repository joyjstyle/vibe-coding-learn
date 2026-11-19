"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { FileText, Link as LinkIcon, Paperclip, X } from "lucide-react";
import type { Inline } from "@/lib/content/model";
import { FILE_ACCEPT, fileTypesLabel, MAX_FILE_LABEL } from "@/lib/evidence-rules";
import type { FileRef } from "@/lib/platform/files";
import { saveDraft, submitEvidence, uploadEvidenceFile, type EvidenceInput, type SubmitProblem } from "@/lib/actions/work";
import { LOCALE } from "@/lib/i18n/lang";
import { useLang, useT } from "@/lib/i18n/client";
import { Inlines } from "../content/Inlines";
import { Dialog } from "../Dialog";

export type FormItem = { id: string; label: Inline[] };
type Kind = "text" | "link" | "file";
export type ItemValue = { kind: Kind; text: string; url: string; file: FileRef | null };

type Upload = { state: "idle" } | { state: "uploading"; name: string } | { state: "failed"; name: string; reason: string; file: File };

const KIND_LABEL = { text: "ui.evidence.kind.text", link: "ui.evidence.kind.link", file: "ui.evidence.kind.file" } as const satisfies Record<Kind, string>;
const KIND_ICON = { text: FileText, link: LinkIcon, file: Paperclip };

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function EvidenceForm({
  lessonId,
  slug,
  items,
  initial,
  initialCommit,
  askCommit,
  nextVersion,
  canSave,
  draftSavedAt,
}: {
  lessonId: string;
  slug: string;
  items: FormItem[];
  initial: Record<string, ItemValue>;
  initialCommit: string;
  askCommit: boolean;
  nextVersion: number;
  canSave: boolean;
  draftSavedAt: string | null;
}) {
  const router = useRouter();
  const t = useT();
  const lang = useLang();
  const formId = useId();
  const [values, setValues] = useState<Record<string, ItemValue>>(initial);
  const [commit, setCommit] = useState(initialCommit);
  const [uploads, setUploads] = useState<Record<string, Upload>>({});
  const [problems, setProblems] = useState<SubmitProblem[]>([]);
  const [status, setStatus] = useState<{ kind: "saved" | "error"; text: string } | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState<"draft" | "submit" | null>(null);
  const [dirty, setDirty] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Warn before leaving with unsaved entries.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (id: string, patch: Partial<ItemValue>) => {
    setValues((v) => ({ ...v, [id]: { ...v[id]!, ...patch } }));
    setProblems((list) => list.filter((p) => p.itemId !== id));
    setDirty(true);
  };

  async function upload(id: string, file: File) {
    setUploads((u) => ({ ...u, [id]: { state: "uploading", name: file.name } }));
    const form = new FormData();
    form.set("file", file);
    let result: Awaited<ReturnType<typeof uploadEvidenceFile>>;
    try {
      result = await uploadEvidenceFile(lessonId, form);
    } catch {
      result = { ok: false, error: t["ui.evidence.uploadFailed"](file.name) };
    }
    if (result.ok) {
      set(id, { file: result.file });
      setUploads((u) => ({ ...u, [id]: { state: "idle" } }));
    } else {
      setUploads((u) => ({ ...u, [id]: { state: "failed", name: file.name, reason: result.error, file } }));
    }
  }

  const payload = (): EvidenceInput => ({
    items: items.map((it) => {
      const v = values[it.id]!;
      return { itemId: it.id, kind: v.kind, text: v.kind === "text" ? v.text : undefined, url: v.kind === "link" ? v.url : undefined, fileId: v.kind === "file" ? v.file?.id : undefined };
    }),
    gitCommit: commit,
  });

  /** Checks in the browser first, with the same rules the server applies again. */
  function localProblems(): SubmitProblem[] {
    const out: SubmitProblem[] = [];
    items.forEach((it, i) => {
      const v = values[it.id]!;
      const n = i + 1;
      if (v.kind === "text" && !v.text.trim()) out.push({ itemId: it.id, message: t["ui.evidence.itemEmpty"](n) });
      if (v.kind === "link" && !/^https?:\/\/\S+$/i.test(v.url.trim())) out.push({ itemId: it.id, message: t["ui.evidence.itemLink"](n) });
      if (v.kind === "file" && !v.file) out.push({ itemId: it.id, message: t["ui.evidence.itemNoFile"](n) });
    });
    if (commit.trim() && !/^[0-9a-f]{7,40}$/i.test(commit.trim())) out.push({ itemId: "gitCommit", message: t["ui.evidence.commitInvalid"] });
    return out;
  }

  function showProblems(list: SubmitProblem[]) {
    setProblems(list);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function onSaveDraft() {
    setBusy("draft");
    setStatus(null);
    try {
      const r = await saveDraft(lessonId, payload());
      if (r.ok) {
        setDirty(false);
        setStatus({ kind: "saved", text: t["ui.evidence.draftSaved"] });
      } else setStatus({ kind: "error", text: r.error });
    } catch {
      setStatus({ kind: "error", text: t["ui.saveFailed"] });
    }
    setBusy(null);
  }

  function onSubmitClick() {
    setStatus(null);
    const list = localProblems();
    if (list.length) return showProblems(list);
    setProblems([]);
    setConfirming(true);
  }

  async function onConfirm() {
    setBusy("submit");
    try {
      const r = await submitEvidence(lessonId, payload());
      if (r.ok) {
        setDirty(false);
        router.push(`/work/${slug}?submitted=${r.version}`);
        return;
      }
      setConfirming(false);
      if ("problems" in r && r.problems?.length) showProblems(r.problems);
      else setStatus({ kind: "error", text: r.error });
    } catch {
      setConfirming(false);
      setStatus({ kind: "error", text: t["ui.evidence.submitFailed"] });
    }
    setBusy(null);
  }

  const problemFor = (id: string) => problems.find((p) => p.itemId === id);
  const summaryItems = items.map((it, i) => {
    const v = values[it.id]!;
    const what = v.kind === "text" ? t["ui.evidence.summaryText"](v.text.trim().length) : v.kind === "link" ? t["ui.evidence.summaryLink"](v.url.trim()) : t["ui.evidence.summaryFile"](v.file?.name ?? t["ui.evidence.none"]);
    return t["ui.evidence.summaryItem"](i + 1, what);
  });

  return (
    <form
      id={formId}
      className="gl-evidence"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitClick();
      }}
    >
      {!canSave ? <p className="ob-p ob-alert ob-alert--info">{t["ui.evidence.notSignedIn"]}</p> : null}

      {problems.length ? (
        <div ref={summaryRef} tabIndex={-1} className="ob-alert ob-alert--error gl-error-summary" role="alert" aria-labelledby="problems-title">
          <span className="ob-glyph" aria-hidden="true">!</span>
          <div>
            <p id="problems-title" className="ob-alert__title">
              {t["ui.evidence.needsAttention"]}
            </p>
            <ul className="gl-bullets">
              {problems.map((p) => (
                <li key={p.itemId}>
                  <a className="gl-link" href={p.itemId === "gitCommit" ? "#git-commit" : `#item-${p.itemId}`}>
                    {p.message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {draftSavedAt ? <p className="ob-p ob-secondary t-label-meta">{t["ui.evidence.draftLastSaved"](new Date(draftSavedAt).toLocaleString(LOCALE[lang], { dateStyle: "medium", timeStyle: "short" }))}</p> : null}

      <ol className="gl-evidence__items">
        {items.map((it, i) => {
          const v = values[it.id]!;
          const problem = problemFor(it.id);
          const up = uploads[it.id] ?? { state: "idle" };
          const errId = `err-${it.id}`;
          return (
            <li key={it.id}>
              <fieldset id={`item-${it.id}`} tabIndex={-1} className="ob-card ob-card--outlined gl-evidence__item" aria-describedby={problem ? errId : undefined}>
                <legend className="gl-evidence__legend">
                  <span className="t-label-meta gl-evidence__n">
                    {t["ui.evidence.itemOf"](i + 1, items.length)} <span className="ob-req">{t["ui.required"]}</span>
                  </span>
                  <span className="gl-evidence__label">
                    <Inlines nodes={it.label} />
                  </span>
                </legend>

                <div className="gl-kinds" role="radiogroup" aria-label={t["ui.evidence.howProvide"](i + 1)}>
                  {(["text", "link", "file"] as const).map((k) => {
                    const Icon = KIND_ICON[k];
                    return (
                      <label key={k} className="ob-option gl-kind">
                        <input type="radio" name={`kind-${it.id}`} value={k} checked={v.kind === k} onChange={() => set(it.id, { kind: k })} />
                        <Icon size={20} aria-hidden="true" focusable="false" />
                        {t[KIND_LABEL[k]]}
                      </label>
                    );
                  })}
                </div>

                {problem ? (
                  <p id={errId} className="ob-error-text">
                    <span className="ob-glyph" aria-hidden="true">!</span>
                    {problem.message}
                  </p>
                ) : null}

                {v.kind === "text" ? (
                  <div className="ob-field gl-field">
                    <label className="ob-label" htmlFor={`text-${it.id}`}>
                      {t["ui.evidence.yourText"]}
                    </label>
                    <textarea id={`text-${it.id}`} className="ob-input" rows={5} value={v.text} aria-invalid={problem ? true : undefined} onChange={(e) => set(it.id, { text: e.target.value })} />
                  </div>
                ) : null}

                {v.kind === "link" ? (
                  <div className="ob-field gl-field">
                    <label className="ob-label" htmlFor={`url-${it.id}`}>
                      {t["ui.evidence.link"]}
                    </label>
                    <p className="ob-help" id={`url-help-${it.id}`}>
                      {t["ui.evidence.linkHelp"]}
                    </p>
                    <input id={`url-${it.id}`} className="ob-input" type="url" inputMode="url" autoComplete="off" value={v.url} aria-describedby={`url-help-${it.id}`} aria-invalid={problem ? true : undefined} onChange={(e) => set(it.id, { url: e.target.value })} />
                  </div>
                ) : null}

                {v.kind === "file" ? (
                  <div className="ob-field gl-field">
                    <label className="ob-label" htmlFor={`file-${it.id}`}>
                      {t["ui.evidence.file"]}
                    </label>
                    <p className="ob-help" id={`file-help-${it.id}`}>
                      {t["ui.evidence.fileHelp"](fileTypesLabel(lang), MAX_FILE_LABEL)}
                    </p>
                    {v.file ? (
                      <div className="gl-filechip">
                        <Paperclip size={20} aria-hidden="true" focusable="false" />
                        <span>
                          {v.file.name} <span className="ob-secondary">{t["ui.evidence.uploaded"](formatSize(v.file.size))}</span>
                        </span>
                        <button type="button" className="ob-btn ob-btn--tertiary" onClick={() => set(it.id, { file: null })}>
                          <X size={20} aria-hidden="true" focusable="false" />
                          {t["ui.evidence.removeFile"]}
                        </button>
                      </div>
                    ) : (
                      <input
                        id={`file-${it.id}`}
                        type="file"
                        className="gl-fileinput"
                        accept={FILE_ACCEPT}
                        aria-describedby={`file-help-${it.id}`}
                        aria-invalid={problem ? true : undefined}
                        disabled={!canSave || up.state === "uploading"}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          e.target.value = "";
                          if (f) void upload(it.id, f);
                        }}
                      />
                    )}
                    <p className="ob-p t-label-meta gl-upload-status" role="status">
                      {up.state === "uploading" ? t["ui.evidence.uploading"](up.name) : null}
                    </p>
                    {up.state === "failed" ? (
                      <div className="gl-upload-failed" role="alert">
                        <p className="ob-error-text">
                          <span className="ob-glyph" aria-hidden="true">!</span>
                          {up.reason}
                        </p>
                        <div className="ob-card__actions">
                          <button type="button" className="ob-btn ob-btn--secondary" onClick={() => void upload(it.id, up.file)}>
                            {t["ui.evidence.tryAgain"]}
                          </button>
                          <button type="button" className="ob-btn ob-btn--tertiary" onClick={() => setUploads((u) => ({ ...u, [it.id]: { state: "idle" } }))}>
                            {t["ui.evidence.remove"]}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </fieldset>
            </li>
          );
        })}
      </ol>

      {askCommit ? (
        <div className="ob-field gl-field">
          <label className="ob-label" htmlFor="git-commit">
            {t["ui.evidence.gitCommit"]} <span className="ob-req">{t["ui.optional"]}</span>
          </label>
          <p className="ob-help" id="git-commit-help">
            {t["ui.evidence.gitCommitHelp"]}
          </p>
          <input
            id="git-commit"
            className="ob-input gl-commit"
            autoComplete="off"
            spellCheck={false}
            value={commit}
            aria-describedby="git-commit-help"
            aria-invalid={problemFor("gitCommit") ? true : undefined}
            onChange={(e) => {
              setCommit(e.target.value);
              setProblems((list) => list.filter((p) => p.itemId !== "gitCommit"));
              setDirty(true);
            }}
          />
        </div>
      ) : null}

      <div className="gl-evidence__actions">
        <button type="submit" className="ob-btn ob-btn--primary ob-btn--large" disabled={!canSave || busy !== null}>
          {t["ui.submit.title"]}
        </button>
        <button type="button" className="ob-btn ob-btn--secondary ob-btn--large" disabled={!canSave || busy !== null} aria-busy={busy === "draft" || undefined} onClick={onSaveDraft}>
          {busy === "draft" ? t["ui.evidence.savingDraft"] : t["ui.evidence.saveDraft"]}
        </button>
        <Link className="ob-btn ob-btn--tertiary" href={`/lesson/${slug}/task`}>
          {t["ui.evidence.returnToTask"]}
        </Link>
      </div>
      {dirty ? <p className="ob-p t-label-meta ob-secondary">{t["ui.evidence.unsaved"]}</p> : null}

      <p className="ob-p t-label-meta gl-save" role="status">
        {status?.kind === "saved" ? status.text : null}
      </p>
      <p className="ob-p ob-error-text gl-save--error" role="alert">
        {status?.kind === "error" ? (
          <>
            <span className="ob-glyph" aria-hidden="true">!</span>
            {status.text}
          </>
        ) : null}
      </p>

      <Dialog open={confirming} onClose={() => setConfirming(false)} title={t["ui.evidence.confirmTitle"]} busy={busy === "submit"}>
        <p className="ob-p">{t["ui.evidence.confirmBody"](nextVersion)}{nextVersion > 1 ? t["ui.evidence.earlierKept"] : ""}</p>
        <ul className="gl-bullets">
          {summaryItems.map((s) => (
            <li key={s}>{s}</li>
          ))}
          {askCommit && commit.trim() ? <li>{t["ui.evidence.commitLine"](commit.trim())}</li> : null}
        </ul>
        <div className="ob-card__actions">
          <button type="button" className="ob-btn ob-btn--primary" aria-busy={busy === "submit" || undefined} disabled={busy === "submit"} onClick={onConfirm}>
            {busy === "submit" ? t["ui.evidence.submitting"] : t["ui.submit.title"]}
          </button>
          <button type="button" className="ob-btn ob-btn--secondary" disabled={busy === "submit"} onClick={() => setConfirming(false)}>
            {t["ui.evidence.goBack"]}
          </button>
        </div>
      </Dialog>
    </form>
  );
}
