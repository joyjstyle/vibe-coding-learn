import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { days, getDayFromParam } from "@/lib/content/curriculum";
import { dayGoal } from "@/lib/config";
import { getProgrammeView, nextLesson, type LessonView } from "@/lib/programme";
import { formatMinutes } from "@/lib/schedule";
import { PageHeader } from "@/components/PageHeader";
import { Inlines } from "@/components/content/Inlines";
import { ComingSoonBadge, DayChip, ProgressBadge, ReviewTag } from "@/components/StatusBadges";
import { getLang, getT, type Lang, type Messages } from "@/lib/i18n/server";

type Props = { params: Promise<{ n: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return days.map((d) => ({ n: String(d.n) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang();
  const t = await getT();
  const day = getDayFromParam((await params).n, lang);
  return { title: day ? t["pages.day.metaTitle"](day.n, day.title) : t["pages.notFoundTitle"] };
}

const ACTION: Partial<Record<LessonView["status"], "pages.day.startLesson" | "pages.continueLesson" | "pages.day.reviewLesson">> = { not_started: "pages.day.startLesson", in_progress: "pages.continueLesson", complete: "pages.day.reviewLesson" };

function LessonCard({ lesson, next, t, lang }: { lesson: LessonView; next: boolean; t: Messages; lang: Lang }) {
  const actionKey = lesson.available ? ACTION[lesson.status] : undefined;
  const action = actionKey ? t[actionKey] : undefined;
  return (
    <li>
      <article className={`ob-card ${next ? "ob-card--cyan" : "ob-card--outlined"} gl-lessoncard`} aria-labelledby={`lesson-${lesson.slug}`}>
        <div className="gl-lessoncard__head">
          <h3 id={`lesson-${lesson.slug}`} className="ob-h t-card-title">
            <span className="gl-lessoncard__id">{t["pages.lessonN"](lesson.id)}</span> {lesson.title}
          </h3>
          <span className="ob-row__badges">{lesson.available ? <ProgressBadge status={lesson.status} /> : <ComingSoonBadge />}</span>
        </div>
        <p className="ob-p gl-lessoncard__meta">
          {formatMinutes(lesson.estimatedMinutes, "minutes", lang)}
          {lesson.reviewPoint ? t["pages.day.reviewPointSuffix"] : ""}
        </p>
        {lesson.available ? (
          <details className="gl-disclosure">
            <summary>{t["pages.day.whatYoullDo"]}</summary>
            <ul className="gl-disclosure__body gl-bullets">
              {lesson.objectiveItems.map((item, i) => (
                <li key={i}>
                  <Inlines nodes={item} />
                </li>
              ))}
            </ul>
          </details>
        ) : (
          <p className="ob-p ob-secondary">{t["pages.notYetPublished"]}</p>
        )}
        {action ? (
          <div className="ob-card__actions">
            <Link className="ob-link" href={`/lesson/${lesson.slug}`} aria-label={t["pages.day.actionLabel"](action, lesson.id)}>
              {action}
            </Link>
          </div>
        ) : null}
      </article>
    </li>
  );
}

export default async function DayPage({ params }: Props) {
  const summary = getDayFromParam((await params).n);
  if (!summary) notFound();
  await connection();
  const lang = await getLang();
  const t = await getT();
  const view = await getProgrammeView();
  const day = view.days.find((d) => d.n === summary.n)!;
  const goal = dayGoal(day.n);
  const next = nextLesson(day);
  const reviewPoints = day.lessons.filter((l) => l.reviewPoint);

  return (
    <>
      <div className="gl-dayhead">
        <PageHeader eyebrow={t["pages.dayOfTotal"](day.n, view.days.length)} title={day.title} />
        <div className="gl-inline-status">
          <DayChip access={day.access} />
          {day.access === "locked" ? <span className="ob-p">{day.opensLabel ?? t["pages.openingDateNotSet"]}</span> : null}
        </div>
        <p className="ob-p">
          <strong>{t["pages.day.goal"]}</strong> {goal ?? <span className="ob-secondary">{t["pages.day.notYetSupplied"]}</span>}
        </p>
        {next ? (
          <p className="ob-p">
            <Link className="ob-btn ob-btn--primary ob-btn--large" href={`/lesson/${next.slug}`}>
              {next.status === "in_progress" ? t["pages.day.continueN"](next.id) : t["pages.day.startN"](next.id)}
            </Link>
          </p>
        ) : day.access === "locked" ? (
          <p className="ob-p ob-secondary">
            {day.opensLabel ? "" : t["pages.day.opensUnknown"]}
            {t["pages.day.earlierOpen"]}
          </p>
        ) : null}
      </div>

      <section className="gl-section" aria-labelledby="needs">
        <h2 id="needs" className="ob-h t-section-heading">
          {day.n === view.currentDay ? t["pages.day.needToday"] : t["pages.day.need"]}
        </h2>
        <dl className="gl-needs">
          {day.lessons.map((l) => (
            <div key={l.id} className="gl-needs__item">
              <dt className="t-label-meta">
                {t["pages.lessonTitle"](l.id, l.title)}
              </dt>
              <dd className="ob-p">{l.available ? <Inlines nodes={l.requiredMaterials} /> : <span className="ob-secondary">{t["pages.notYetPublished"]}</span>}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="gl-section" aria-labelledby="lessons">
        <div className="gl-section__head">
          <h2 id="lessons" className="ob-h t-section-heading">
            {t["pages.day.lessons"]}
          </h2>
          <p className="ob-p ob-secondary">
            {t["pages.day.lessonsMeta"](formatMinutes(day.estimatedMinutes, "hours", lang), day.completeCount, day.lessons.length)}
          </p>
        </div>
        <ol className="gl-cardlist">
          {day.lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} next={l.id === next?.id} t={t} lang={lang} />
          ))}
        </ol>
      </section>

      <section className="gl-section" aria-labelledby="review">
        <h2 id="review" className="ob-h t-section-heading">
          {t["pages.day.reviewPoint"]}
        </h2>
        {reviewPoints.length ? (
          <ul className="gl-cardlist">
            {reviewPoints.map((l) => (
              <li key={l.id} className="ob-card ob-card--outlined gl-review">
                <p className="ob-p gl-inline-status">
                  <strong>
                    {t["pages.lessonTitle"](l.id, l.title)}
                  </strong>
                  <ReviewTag decision={l.review ?? "not_submitted"} />
                </p>
                <p className="ob-p">
                  <span className="ob-secondary">{t["pages.day.yourSupervisor"]}</span> {l.reviewPoint!.supervisorDecides}
                </p>
                <p className="ob-p ob-secondary">{t["pages.day.reviewOutside"]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ob-p">{t["pages.day.noReviewPoint"]}</p>
        )}
      </section>
    </>
  );
}
