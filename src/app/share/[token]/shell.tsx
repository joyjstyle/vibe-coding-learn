import type { ReactNode } from "react";
import { platform } from "@/lib/content/curriculum";
import { AppFrame } from "@/components/AppFrame";
import { LangToggle } from "@/components/LangToggle";

/** The supervisor's view: the platform name in plain type, no navigation and no sign-in. */
export function ShareShell({ children }: { children: ReactNode }) {
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
