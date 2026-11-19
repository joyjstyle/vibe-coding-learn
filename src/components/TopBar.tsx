"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, navCurrent, navLabel } from "@/lib/nav";
import { useLang, useT } from "@/lib/i18n/client";
import { AccountMenu } from "./AccountMenu";
import { Avatar } from "./Avatar";
import { HelpButton } from "./help/HelpButton";
import { LangToggle } from "./LangToggle";

/**
 * Top bar for every page except lessons. Left: the platform name in plain type (no logo
 * exists). Centre: the four main items, always visible as text; below 1024px they move to
 * their own full-width row. Right: Help, Settings and the learner's initials. Below 768px
 * Settings and the initials move into the account menu; Help stays in the bar at every
 * width because it fits. No notifications in version 1.
 */
export function TopBar({ brand, initials, name }: { brand: string; initials: string | null; name: string | null }) {
  const pathname = usePathname();
  const t = useT();
  const lang = useLang();
  return (
    <header className="ob-topbar gl-topbar" data-surface="dark">
      <Link className="ob-brand gl-topbar__brand" href="/home">
        {brand}
      </Link>
      <nav className="gl-topbar__nav" aria-label={t["ui.topbar.mainNav"]}>
        <ul className="ob-nav">
          {mainNav.map((item) => {
            const current = navCurrent(item.section, item.href, pathname);
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={current || undefined}>
                  {navLabel(item, lang)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="ob-utils gl-topbar__utils">
        <HelpButton />
        <Link className="ob-btn ob-btn--on-dark gl-topbar__wide" href="/settings" aria-current={pathname === "/settings" ? "page" : undefined}>
          {t["ui.settings"]}
        </Link>
        <span className="gl-topbar__wide">
          <Avatar initials={initials} name={name} />
        </span>
        <span className="gl-topbar__menu">
          <AccountMenu initials={initials} name={name} />
        </span>
        <LangToggle />
      </div>
    </header>
  );
}
