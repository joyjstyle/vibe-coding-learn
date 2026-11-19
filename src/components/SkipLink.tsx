"use client";

import { useT } from "@/lib/i18n/client";

export function SkipLink() {
  const t = useT();
  return (
    <a className="gl-skip" href="#main">
      {t["ui.skipLink"]}
    </a>
  );
}
