"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { trapTab } from "@/lib/hooks/trapTab";
import { returnTarget, trackLastPressed } from "@/lib/hooks/lastPressed";
import { useT } from "@/lib/i18n/client";

/**
 * A modal drawer from the right, built on the native <dialog>: showModal() contains focus,
 * makes the page inert and closes on Escape. Focus returns to whatever opened it.
 * Used for the lesson Outline and, in Phase 5, the Help drawer.
 */
export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const t = useT();

  useEffect(() => trackLastPressed(), []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnTo.current = returnTarget();
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="gl-drawer"
      aria-labelledby={titleId}
      onClose={() => {
        onClose();
        // Return focus without scrolling, so closing keeps the reader's place on the page.
        returnTo.current?.focus({ preventScroll: true });
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={trapTab}
    >
      <div className="ob-drawer gl-drawer__panel">
        <div className="ob-drawer__head">
          <h2 id={titleId} className="ob-h t-card-title">
            {title}
          </h2>
          <button type="button" className="ob-btn ob-btn--secondary" onClick={onClose}>
            <X size={20} aria-hidden="true" focusable="false" />
            {t["ui.close"]}
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
