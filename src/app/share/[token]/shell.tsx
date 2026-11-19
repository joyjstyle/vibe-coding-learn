import type { ReactNode } from "react";
import { contentFor } from "@/lib/content/curriculum";
import { getLang } from "@/lib/i18n/server";
import { AppFrame } from "@/components/AppFrame";
import { LangToggle } from "@/components/LangToggle";

/** The supervisor's view: the platform name in plain type, no navigation and no sign-in. */
export async function ShareShell({ children }: { children: ReactNode }) {
  const { platform } = contentFor(await getLang());
  return (
    <AppFrame
      bar={
        <header className="ob-topbar" data-surface="dark">
          <p className="ob-brand ob-p">{platform.name}</p>
          <LangToggle />
        </header>
      }
    >
      {children}
    </AppFrame>
  );
}
