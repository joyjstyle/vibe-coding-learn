"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { HelpData } from "@/lib/help-data";
import { useT } from "@/lib/i18n/client";
import { Drawer } from "../Drawer";
import { HelpContent } from "./HelpContent";

type HelpCtx = { open: boolean; setOpen: (v: boolean) => void };
const Ctx = createContext<HelpCtx | null>(null);

export function useHelp(): HelpCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useHelp needs HelpProvider");
  return v;
}

/** Makes the Help drawer available on every page under it. */
export function HelpProvider({ data, children }: { data: HelpData; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  const t = useT();
  return (
    <Ctx.Provider value={value}>
      {children}
      <Drawer open={open} onClose={() => setOpen(false)} title={t["ui.help"]}>
        <HelpContent data={data} onNavigate={() => setOpen(false)} />
      </Drawer>
    </Ctx.Provider>
  );
}
