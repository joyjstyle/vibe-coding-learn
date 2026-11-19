"use client";

import { UserRound } from "lucide-react";
import { useT } from "@/lib/i18n/client";

/** Learner identity: initials on `lavender`, or a neutral icon while no name is set. */
export function Avatar({ initials, name }: { initials: string | null; name: string | null }) {
  const t = useT();
  return (
    <span className="gl-identity">
      <span className="ob-avatar" aria-hidden="true">
        {initials ?? <UserRound size={20} aria-hidden="true" focusable="false" />}
      </span>
      <span className="sr-only">{name ? t["ui.account.signedInAs"](name) : t["ui.account.noName"]}</span>
    </span>
  );
}
