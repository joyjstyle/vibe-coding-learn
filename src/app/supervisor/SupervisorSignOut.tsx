"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/client";

/** Sign-out in the supervisor's top bar. On failure it stays put so it can be tried again. */
export function SupervisorSignOut() {
  const t = useT();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      className="ob-btn ob-btn--on-dark"
      disabled={busy}
      aria-busy={busy || undefined}
      onClick={async () => {
        setBusy(true);
        try {
          const res = await fetch("/api/auth/sign-out", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}", credentials: "same-origin" });
          if (!res.ok) throw new Error();
          window.location.assign("/sign-in");
        } catch {
          setBusy(false);
          alert(t["pages.settings.signOutError"]);
        }
      }}
    >
      {busy ? t["pages.settings.signingOut"] : t["pages.supervisor.signOut"]}
    </button>
  );
}
