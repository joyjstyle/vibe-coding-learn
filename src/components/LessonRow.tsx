"use client";

import Link from "next/link";
import type { LessonView } from "@/lib/programme";
import { formatMinutes } from "@/lib/schedule";
import { useLang, useT } from "@/lib/i18n/client";
import { ComingSoonBadge, ProgressBadge } from "./StatusBadges";

const ACTION = {
  not_started: "ui.row.start",
  in_progress: "ui.row.continue",
  complete: "ui.row.review",
} as const satisfies Partial<Record<LessonView["status"], string>>;

/** One lesson in a list: ID, full title, time, badges and at most one action. */
export function LessonRow({ lesson, current = false }: { lesson: LessonView; current?: boolean }) {
  const t = useT();
  const lang = useLang();
  const key = lesson.status === "locked" ? undefined : ACTION[lesson.status];
  const action = lesson.available && key ? t[key] : undefined;
  return (
    <li className={`ob-row gl-row${current ? " ob-row--current" : ""}`}>
      <span className="ob-row__id" aria-hidden="true">
        {lesson.id}
      </span>
      <span className="gl-row__main">
        <span className="ob-row__title">
          <span className="sr-only">{t["ui.lessonTitle"](lesson.id, "")}</span>
          {lesson.title}
        </span>
        <span className="ob-meta gl-row__meta">{formatMinutes(lesson.estimatedMinutes, "minutes", lang)}</span>
      </span>
      <span className="ob-row__badges">
        {lesson.available ? <ProgressBadge status={lesson.status} /> : <ComingSoonBadge />}
      </span>
      <span className="gl-row__action">
        {action ? (
          <Link href={`/lesson/${lesson.slug}`} aria-label={`${action}: ${t["ui.lesson"](lesson.id)}`}>
            {action}
          </Link>
        ) : !lesson.available ? (
          <span className="ob-meta">{t["ui.row.notPublished"]}</span>
        ) : null}
      </span>
    </li>
  );
}
