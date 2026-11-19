"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/client";

export function SignOut() {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <section className="ob-card ob-card--outlined gl-settings__group" aria-labelledby="set-account">
      <h2 id="set-account" className="ob-h t-card-title">
        {t["pages.settings.account"]}
      </h2>
      <p className="ob-p ob-secondary">{t["pages.settings.accountText"]}</p>
      <div>
        <button
          type="button"
          className="ob-btn ob-btn--secondary"
          disabled={busy}
          aria-busy={busy || undefined}
          onClick={async () => {
            setBusy(true);
            setError(null);
            try {
              const res = await fetch("/api/auth/sign-out", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}", credentials: "same-origin" });
              if (!res.ok) throw new Error();
              window.location.assign("/sign-in");
            } catch {
              setError(t["pages.settings.signOutError"]);
              setBusy(false);
            }
          }}
        >
          {busy ? t["pages.settings.signingOut"] : t["pages.settings.signOut"]}
        </button>
      </div>
      <p className="ob-p ob-error-text gl-save--error" role="alert">
        {error}
      </p>
    </section>
  );
}
