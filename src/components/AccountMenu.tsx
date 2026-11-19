"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useT } from "@/lib/i18n/client";
import { Avatar } from "./Avatar";
import { Tooltip } from "./Tooltip";

/**
 * Below 768px Settings and the learner's identity move here, as the design system asks
 * when space runs out. Help stays in the bar.
 * A disclosure: the button toggles a list of links; Escape and clicking outside close it,
 * and Escape returns focus to the button.
 */
export function AccountMenu({ initials, name }: { initials: string | null; name: string | null }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = useT();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="gl-account" ref={rootRef}>
      <Tooltip label={t["ui.account.menu"]} align="end" suppressed={open}>
        <button
          ref={buttonRef}
          type="button"
          className="gl-account__button"
          // The visible initials are part of the name (WCAG 2.5.3, label in name).
          aria-label={initials ? t["ui.account.menuWithInitials"](initials) : t["ui.account.menu"]}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <Avatar initials={initials} name={name} />
        </button>
      </Tooltip>
      <div id={panelId} className="gl-account__panel" hidden={!open}>
        <p className="ob-p t-label-meta gl-account__who">{name ? t["ui.account.signedInAs"](name) : t["ui.account.noName"]}</p>
        <ul className="gl-account__list">
          <li>
            <Link href="/settings" aria-current={pathname === "/settings" ? "page" : undefined}>
              {t["ui.settings"]}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
