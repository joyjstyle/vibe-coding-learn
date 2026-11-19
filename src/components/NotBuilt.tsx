"use client";

import { useT } from "@/lib/i18n/client";

/** Development placeholder for a route whose content arrives in a later build phase. */
export function NotBuilt({ what }: { what: string }) {
  const t = useT();
  return (
    <section className="ob-card ob-card--outlined gl-notbuilt" aria-label={t["ui.notBuilt.label"]}>
      <p className="ob-p">
        <strong>{t["ui.notBuilt.title"]}</strong> {what}
      </p>
    </section>
  );
}
