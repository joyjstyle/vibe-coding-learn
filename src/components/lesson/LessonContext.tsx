"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { useT } from "@/lib/i18n/client";
import { Drawer } from "../Drawer";
import { OutlineNav, type OutlineData } from "./OutlineNav";

type SelectSection = (n: number) => void;

type LessonNav = {
  outline: OutlineData;
  /** The section on screen, or null on the task, submit and check pages. */
  section: number | null;
  setSection: (n: number | null) => void;
  outlineOpen: boolean;
  setOutlineOpen: (open: boolean) => void;
  /** Set by the reader while it is on screen, so outline links switch sections in place. */
  registerSelect: (fn: SelectSection | null) => void;
  select: (n: number) => boolean;
};

const Ctx = createContext<LessonNav | null>(null);
/** Exported so Help can read the lesson position when it is on a lesson screen. */
export const LessonNavContext = Ctx;

export function useLessonNav(): LessonNav {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLessonNav needs LessonNavProvider");
  return v;
}

export function LessonNavProvider({ outline, children }: { outline: OutlineData; children: ReactNode }) {
  const [section, setSection] = useState<number | null>(null);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const t = useT();
  const selectRef = useRef<SelectSection | null>(null);
  const registerSelect = useCallback((fn: SelectSection | null) => {
    selectRef.current = fn;
  }, []);
  const select = useCallback((n: number) => {
    if (!selectRef.current) return false;
    selectRef.current(n);
    return true;
  }, []);
  const value = useMemo(() => ({ outline, section, setSection, outlineOpen, setOutlineOpen, registerSelect, select }), [outline, section, outlineOpen, registerSelect, select]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <Drawer open={outlineOpen} onClose={() => setOutlineOpen(false)} title={t["ui.outline"]}>
        <OutlineNav onNavigate={() => setOutlineOpen(false)} />
      </Drawer>
    </Ctx.Provider>
  );
}
