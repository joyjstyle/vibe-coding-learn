"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toolkitAreaLabel, toolkitAreas } from "@/lib/toolkit";
import { useLang, useT } from "@/lib/i18n/client";

export function ToolkitNav() {
  const pathname = usePathname();
  const t = useT();
  const lang = useLang();
  return (
    <nav className="gl-subnav" aria-label={t["pages.toolkit.title"]}>
      <ul>
        {toolkitAreas.map((a) => {
          const href = `/toolkit/${a.slug}`;
          return (
            <li key={a.slug}>
              <Link href={href} aria-current={pathname === href ? "page" : undefined}>
                {toolkitAreaLabel(a, lang)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
