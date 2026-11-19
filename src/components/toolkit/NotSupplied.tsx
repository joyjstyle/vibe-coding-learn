"use client";

import { useT } from "@/lib/i18n/client";

/** An honest empty state for content that has not been written or supplied yet. */
export function NotSupplied({ what, file }: { what: string; file: string }) {
  const t = useT();
  return (
    <section className="ob-soon" aria-label={t["ui.notSupplied.label"](what)}>
      <span className="ob-badge ob-badge--soon">{t["ui.notSupplied.badge"]}</span>
      <p className="ob-p">{t["ui.notSupplied.body"](what)}</p>
      <p className="ob-p ob-secondary t-label-meta">
        {t["ui.notSupplied.platformBefore"]}<code className="gl-inline-code">{file}</code>{t["ui.notSupplied.platformAfter"]}
      </p>
    </section>
  );
}
