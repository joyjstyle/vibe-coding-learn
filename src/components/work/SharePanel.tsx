"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createShareLink, revokeShareLink } from "@/lib/actions/work";
import { useT } from "@/lib/i18n/client";
import { Dialog } from "../Dialog";

/** A read-only link for the supervisor: create, copy, or turn off. */
export function SharePanel({ lessonId, token, canSave }: { lessonId: string; token: string | null; canSave: boolean }) {
  const router = useRouter();
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [confirmOff, setConfirmOff] = useState(false);
  const url = token ? `${typeof window === "undefined" ? "" : window.location.origin}/share/${token}` : null;

  async function create() {
    setBusy(true);
    setMessage(null);
    const r = await createShareLink(lessonId).catch(() => ({ ok: false as const, error: t["ui.share.createFailed"] }));
    setBusy(false);
    if (r.ok) {
      setMessage({ kind: "ok", text: t["ui.share.created"] });
      router.replace(window.location.pathname, { scroll: false });
    } else setMessage({ kind: "error", text: r.error });
  }

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setMessage({ kind: "ok", text: t["ui.copied"] });
    } catch {
      setMessage({ kind: "error", text: t["ui.share.copyFailed"] });
    }
  }

  async function turnOff() {
    setBusy(true);
    const r = await revokeShareLink(lessonId).catch(() => ({ ok: false as const, error: t["ui.share.turnOffFailed"] }));
    setBusy(false);
    setConfirmOff(false);
    if (r.ok) {
      setMessage({ kind: "ok", text: t["ui.share.turnedOff"] });
      router.replace(window.location.pathname, { scroll: false });
    } else setMessage({ kind: "error", text: r.error });
  }

  return (
    <div className="gl-share">
      {url ? (
        <>
          <div className="ob-field gl-field gl-share__field">
            <label className="ob-label" htmlFor="share-url">
              {t["ui.share.readOnlyLink"]}
            </label>
            <p className="ob-help" id="share-help">
              {t["ui.share.help"]}
            </p>
            <input id="share-url" className="ob-input" readOnly value={url} aria-describedby="share-help" onFocus={(e) => e.currentTarget.select()} />
          </div>
          <div className="ob-card__actions">
            <button type="button" className="ob-btn ob-btn--secondary" onClick={copy}>
              {t["ui.share.copy"]}
            </button>
            <button type="button" className="ob-btn ob-btn--tertiary" disabled={!canSave || busy} onClick={() => setConfirmOff(true)}>
              {t["ui.share.turnOff"]}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="ob-p">{t["ui.share.intro"]}</p>
          <div className="ob-card__actions">
            <button type="button" className="ob-btn ob-btn--secondary" disabled={!canSave || busy} aria-busy={busy || undefined} onClick={create}>
              {t["ui.share.create"]}
            </button>
          </div>
        </>
      )}
      <p className="ob-p t-label-meta gl-save" role="status">
        {message?.kind === "ok" ? message.text : null}
      </p>
      <p className="ob-p ob-error-text gl-save--error" role="alert">
        {message?.kind === "error" ? message.text : null}
      </p>
      <Dialog open={confirmOff} onClose={() => setConfirmOff(false)} title={t["ui.share.confirmTitle"]} busy={busy}>
        <p className="ob-p">{t["ui.share.confirmBody"]}</p>
        <div className="ob-card__actions">
          <button type="button" className="ob-btn ob-btn--destructive" disabled={busy} aria-busy={busy || undefined} onClick={turnOff}>
            {t["ui.share.turnOff"]}
          </button>
          <button type="button" className="ob-btn ob-btn--secondary" disabled={busy} onClick={() => setConfirmOff(false)}>
            {t["ui.share.keep"]}
          </button>
        </div>
      </Dialog>
    </div>
  );
}
