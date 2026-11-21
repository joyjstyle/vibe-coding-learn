import type { ReactNode } from "react";
import Link from "next/link";
import { contentFor } from "@/lib/content/curriculum";
import { getLang } from "@/lib/i18n/server";
import { requireSupervisor } from "@/lib/identity";
import { AppFrame } from "@/components/AppFrame";
import { LangToggle } from "@/components/LangToggle";
import { SupervisorSignOut } from "./SupervisorSignOut";

/** The supervisor's shell: the platform name, the language toggle and sign-out. No student navigation. */
export default async function SupervisorLayout({ children }: { children: ReactNode }) {
  await requireSupervisor();
  const { platform } = contentFor(await getLang());
  return (
    <AppFrame
      bar={
        <header className="ob-topbar" data-surface="dark">
          <Link className="ob-brand" href="/supervisor">
            {platform.name}
          </Link>
          <div className="ob-utils">
            <LangToggle />
            <SupervisorSignOut />
          </div>
        </header>
      }
    >
      {children}
    </AppFrame>
  );
}
