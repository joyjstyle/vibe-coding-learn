"use client";

import { ListTree } from "lucide-react";
import { useT } from "@/lib/i18n/client";
import { useLessonNav } from "./LessonContext";

/** "Section 3 of 9" with a progress bar, shown while a teaching section is on screen. */
export function SectionProgress() {
  const { section, outline } = useLessonNav();
  const t = useT();
  if (section === null) return null;
  const total = outline.sections.length;
  return (
    <div className="gl-lessonbar__progress">
      <span className="t-label-meta" id="lesson-position">
        {t["ui.lessonbar.sectionOf"](section, total)}
      </span>
      <progress className="gl-progress" aria-labelledby="lesson-position" value={section} max={total} />
    </div>
  );
}

/** Opens the outline drawer. Hidden from 1280px, where the outline is a rail beside the reading column. */
export function OutlineButton() {
  const { setOutlineOpen, outlineOpen } = useLessonNav();
  const t = useT();
  return (
    <button type="button" className="ob-btn ob-btn--on-dark gl-outline-button" aria-haspopup="dialog" aria-expanded={outlineOpen} onClick={() => setOutlineOpen(true)}>
      <ListTree size={20} aria-hidden="true" focusable="false" />
      {t["ui.outline"]}
    </button>
  );
}
