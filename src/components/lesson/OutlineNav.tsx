"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LessonProgressStatus } from "@/lib/schedule";
import { useT } from "@/lib/i18n/client";
import { useLessonNav } from "./LessonContext";

export type OutlineData = {
  lessonId: string;
  slug: string;
  title: string;
  day: number;
  sections: { number: number; title: string }[];
  dayLessons: { id: string; slug: string; title: string; status: LessonProgressStatus | "coming_soon" }[];
};

const STATUS_WORD = {
  locked: "ui.status.locked",
  not_started: "ui.status.notStarted",
  in_progress: "ui.status.inProgress",
  complete: "ui.status.complete",
  coming_soon: "ui.status.comingSoon",
} as const satisfies Record<OutlineData["dayLessons"][number]["status"], string>;

/** This lesson's sections, its task pages and the day's other lessons. */
export function OutlineNav({ onNavigate }: { onNavigate?: () => void }) {
  const { outline, section, select } = useLessonNav();
  const pathname = usePathname();
  const t = useT();
  const base = `/lesson/${outline.slug}`;
  const onReader = pathname === base;
  const page = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav className="gl-outline" aria-label={t["ui.outline.label"]}>
      <section>
        <h3 className="t-label-meta gl-outline__heading">{t["ui.outline.inThisLesson"]}</h3>
        <ol className="gl-outline__list">
          {outline.sections.map((s) => (
            <li key={s.number}>
              <a
                href={`${base}#section-${s.number}`}
                aria-current={onReader && section === s.number ? "location" : undefined}
                onClick={(e) => {
                  if (onReader && select(s.number)) {
                    e.preventDefault();
                    onNavigate?.();
                  } else onNavigate?.();
                }}
              >
                <span className="gl-outline__num">{s.number}.</span> {s.title}
              </a>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h3 className="t-label-meta gl-outline__heading">{t["ui.outline.doTheWork"]}</h3>
        <ul className="gl-outline__list">
          <li><Link href={`${base}/task`} aria-current={page(`${base}/task`)} onClick={onNavigate}>{t["ui.task.yourTask"]}</Link></li>
          <li><Link href={`${base}/submit`} aria-current={page(`${base}/submit`)} onClick={onNavigate}>{t["ui.submit.title"]}</Link></li>
          <li><Link href={`${base}/check`} aria-current={page(`${base}/check`)} onClick={onNavigate}>{t["ui.check.title"]}</Link></li>
        </ul>
      </section>
      <section>
        <h3 className="t-label-meta gl-outline__heading">{t["ui.outline.dayLessons"](outline.day)}</h3>
        <ol className="gl-outline__list">
          {outline.dayLessons.map((l) => (
            <li key={l.id}>
              {l.id === outline.lessonId ? (
                <span className="gl-outline__self">
                  {l.id} {l.title} <span className="gl-outline__status">{t["ui.outline.thisLesson"]}</span>
                </span>
              ) : (
                <Link href={`/lesson/${l.slug}`} onClick={onNavigate}>
                  {l.id} {l.title} <span className="gl-outline__status">{t[STATUS_WORD[l.status]]}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </section>
    </nav>
  );
}
