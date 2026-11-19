"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/client";
import { ArrowLeft } from "lucide-react";
import { HomeIcon } from "./icons";
import { HelpButton } from "./help/HelpButton";
import { LangToggle } from "./LangToggle";
import type { LessonRef } from "@/lib/content/curriculum";
import { IconLink } from "./IconLink";
import { OutlineButton, SectionProgress } from "./lesson/LessonBarControls";

/**
 * The focused bar on lesson screens, replacing the top bar. Left: back to the day and a
 * breadcrumb. Centre: "Section 3 of 9" with a progress bar while a section is on screen.
 * Right: Outline (below 1280px), Help and Home. Needs LessonNavProvider.
 */
export function LessonBar({ lesson }: { lesson: LessonRef }) {
  const t = useT();
  const dayHref = `/day/${lesson.day}`;
  return (
    <header className="ob-topbar gl-lessonbar" data-surface="dark">
      <Link className="ob-btn ob-btn--on-dark gl-lessonbar__back" href={dayHref}>
        <ArrowLeft size={20} aria-hidden="true" focusable="false" />
        {t["ui.day"](lesson.day)}
      </Link>
      <nav className="ob-crumbs gl-crumbs--dark gl-lessonbar__crumbs" aria-label={t["ui.lessonbar.breadcrumb"]}>
        <ol>
          <li>
            <Link href="/syllabus">{t["ui.syllabus"]}</Link>
          </li>
          <li>
            <Link href={dayHref}>{t["ui.day"](lesson.day)}</Link>
          </li>
          <li>
            <span aria-current="page">
              {t["ui.lessonTitle"](lesson.id, lesson.title)}
            </span>
          </li>
        </ol>
      </nav>
      <SectionProgress />
      <div className="ob-utils gl-lessonbar__end">
        <OutlineButton />
        <HelpButton />
        <IconLink href="/home" label={t["ui.home"]} icon={<HomeIcon />} />
        <LangToggle />
      </div>
    </header>
  );
}
