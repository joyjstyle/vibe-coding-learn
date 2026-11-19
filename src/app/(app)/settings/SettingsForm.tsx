"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveSettings } from "@/lib/actions/settings";
import type { Settings, TextSize } from "@/lib/platform/settings";
import { useT } from "@/lib/i18n/client";

const SIZES = [
  { value: "default", label: "pages.settings.size.default", hint: "pages.settings.size.defaultHint" },
  { value: "large", label: "pages.settings.size.large", hint: "pages.settings.size.largeHint" },
  { value: "larger", label: "pages.settings.size.larger", hint: "pages.settings.size.largerHint" },
] as const satisfies readonly { value: TextSize; label: string; hint: string }[];

export function SettingsForm({ initial, canSave }: { initial: Settings; canSave: boolean }) {
  const router = useRouter();
  const t = useT();
  const [name, setName] = useState(initial.name ?? "");
  const [textSize, setTextSize] = useState<TextSize>(initial.textSize);
  const [reducedMotion, setReducedMotion] = useState(initial.reducedMotion);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string; field?: "name" } | null>(null);

  async function save() {
    setBusy(true);
    setStatus(null);
    const r = await saveSettings({ name, textSize, reducedMotion }).catch(() => ({ ok: false as const, error: t["pages.settings.saveError"] }));
    setBusy(false);
    if (r.ok) {
      // Apply at once; the server applies the same values on every page from now on.
      document.documentElement.dataset.textSize = textSize;
      document.documentElement.dataset.reducedMotion = String(reducedMotion);
      setStatus({ kind: "ok", text: t["pages.settings.saved"] });
      router.refresh();
    } else setStatus({ kind: "error", text: r.error, field: "field" in r ? r.field : undefined });
  }

  return (
    <form
      className="gl-settings"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
    >
      {!canSave ? <p className="ob-p ob-alert ob-alert--info">{t["pages.settings.notSignedIn"]}</p> : null}

      <section className="ob-card ob-card--outlined gl-settings__group" aria-labelledby="set-name">
        <h2 id="set-name" className="ob-h t-card-title">
          {t["pages.settings.nameHeading"]}
        </h2>
        <div className="ob-field">
          <label className="ob-label" htmlFor="name">
            {t["pages.settings.nameLabel"]} <span className="ob-req">{t["pages.settings.optional"]}</span>
          </label>
          <p className="ob-help" id="name-help">
            {t["pages.settings.nameHelp"]}
          </p>
          <input id="name" className="ob-input" autoComplete="name" maxLength={80} value={name} aria-describedby="name-help" aria-invalid={status?.field === "name" || undefined} onChange={(e) => setName(e.target.value)} />
        </div>
      </section>

      <section className="ob-card ob-card--outlined gl-settings__group" aria-labelledby="set-text">
        <h2 id="set-text" className="ob-h t-card-title">
          {t["pages.settings.textSize"]}
        </h2>
        <fieldset className="ob-fieldset">
          <legend className="sr-only">{t["pages.settings.textSize"]}</legend>
          {SIZES.map((s) => (
            <label key={s.value} className="ob-option gl-option-two-line">
              <input type="radio" name="textSize" value={s.value} checked={textSize === s.value} onChange={() => setTextSize(s.value)} />
              <span>
                {t[s.label]} <span className="ob-secondary">· {t[s.hint]}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="ob-card ob-card--outlined gl-settings__group" aria-labelledby="set-motion">
        <h2 id="set-motion" className="ob-h t-card-title">
          {t["pages.settings.motion"]}
        </h2>
        <div className="ob-check">
          <input type="checkbox" id="reduced-motion" checked={reducedMotion} aria-describedby="motion-help" onChange={(e) => setReducedMotion(e.target.checked)} />
          <label htmlFor="reduced-motion">{t["pages.settings.reduceMotion"]}</label>
        </div>
        <p className="ob-help" id="motion-help">
          {t["pages.settings.motionHelp"]}
        </p>
      </section>

      <div className="ob-card__actions">
        <button type="submit" className="ob-btn ob-btn--primary ob-btn--large" disabled={!canSave || busy} aria-busy={busy || undefined}>
          {busy ? t["pages.settings.saving"] : t["pages.settings.save"]}
        </button>
      </div>
      <p className="ob-p t-label-meta gl-save" role="status">
        {status?.kind === "ok" ? status.text : null}
      </p>
      <p className="ob-p ob-error-text gl-save--error" role="alert">
        {status?.kind === "error" ? status.text : null}
      </p>
    </form>
  );
}
