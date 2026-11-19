"use client";

import { useCallback, useRef, useState } from "react";
import type { ProgressResult } from "@/lib/actions/progress";
import { useT } from "@/lib/i18n/client";

export type SaveMessage = { kind: "saved" | "error"; text: string } | null;

const ERRORS = {
  not_signed_in: "ui.task.notSignedIn",
  not_available: "ui.ticks.notAvailable",
  invalid: "ui.ticks.invalid",
  save_failed: "ui.ticks.saveFailed",
} as const satisfies Record<Exclude<ProgressResult, { ok: true }>["error"], string>;

/**
 * Ticked items for one list (task steps or completion criteria). A tick shows at once;
 * "Saved" is announced only after the server confirms, and a failed save puts the tick back.
 */
export function useTicks(initial: string[], save: (id: string, checked: boolean) => Promise<ProgressResult>, exclusive = false) {
  const [ticked, setTicked] = useState<Set<string>>(() => new Set(initial));
  const [message, setMessage] = useState<SaveMessage>(null);
  const pending = useRef(0);
  const t = useT();

  const toggle = useCallback(
    async (id: string, checked: boolean) => {
      // For a single-choice list, choosing one replaces the previous choice.
      let before = new Set<string>();
      setTicked((prev) => {
        before = prev;
        if (exclusive) return new Set(checked ? [id] : []);
        const next = new Set(prev);
        if (checked) next.add(id);
        else next.delete(id);
        return next;
      });
      pending.current += 1;
      let result: ProgressResult;
      try {
        result = await save(id, checked);
      } catch {
        result = { ok: false, error: "save_failed" };
      }
      pending.current -= 1;
      if (result.ok) {
        if (pending.current === 0) setMessage({ kind: "saved", text: t["ui.ticks.saved"] });
      } else {
        setTicked((prev) => {
          if (exclusive) return before;
          const next = new Set(prev);
          if (checked) next.delete(id);
          else next.add(id);
          return next;
        });
        setMessage({ kind: "error", text: t[ERRORS[result.error]] });
      }
    },
    [save, exclusive, t],
  );

  return { ticked, toggle, message };
}
