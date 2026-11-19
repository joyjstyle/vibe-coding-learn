import Link from "next/link";
import { connection } from "next/server";
import { getProgrammeView, type DayView } from "@/lib/programme";
import { formatMinutes } from "@/lib/schedule";
import { PageHeader } from "@/components/PageHeader";
import { LessonRow } from "@/components/LessonRow";
import { DayChip, ReviewTag } from "@/components/StatusBadges";
import { getLang, getT, type Lang, type Messages } from "@/lib/i18n/server";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.syllabus.title"] };
}

function DayCard({ day, current, total, t, lang }: { day: DayView; current: boolean; total: number; t: Messages; lang: Lang }) {
  const reviewPoints = day.lessons.filter((l) => l.reviewPoint);
  return (
    <li>
      <section className={`ob-card gl-daycard${current ? " ob-card--cyan" : ""}`} aria-labelledby={`day-${day.n}`}>
        <div className="gl-daycard__head">
          <div className="gl-daycard__titles">
            <p className="ob-p t-label-meta gl-daycard__eyebrow">
              {t["pages.dayOfTotal"](day.n, total)}
              {current ? t["pages.syllabus.todaySuffix"] : ""}
            </p>
            <h2 id={`day-${day.n}`} className="ob-h t-card-title">
              {day.title}
            </h2>
          </div>
          <DayChip access={day.access} />
        </div>

        <p className="ob-p gl-daycard__meta">
          {t["pages.syllabus.dayMeta"](day.lessons.length, formatMinutes(day.estimatedMinutes, "hours", lang), day.completeCount)}
        </p>
        {day.access === "locked" ? <p className="ob-p gl-daycard__opens">{day.opensLabel ?? t["pages.openingDateNotSet"]}</p> : null}

        <details className="gl-disclosure" open={current}>
          <summary>{t["pages.syllabus.lessonsInDay"](day.n)}</summary>
          <ol className="ob-list gl-disclosure__body">
            {day.lessons.map((l) => (
              <LessonRow key={l.id} lesson={l} />
            ))}
          </ol>
        </details>

        {reviewPoints.length ? (
          <div className="gl-daycard__review">
            {reviewPoints.map((l) => (
              <p key={l.id} className="ob-p gl-inline-status">
                <span>{t["pages.syllabus.reviewPoint"](l.id)}</span>
                <ReviewTag decision={l.review ?? "not_submitted"} />
              </p>
            ))}
          </div>
        ) : null}

        <div className="ob-card__actions">
          <Link className={current ? "ob-btn ob-btn--primary" : "ob-btn ob-btn--secondary"} href={`/day/${day.n}`}>
            {t["pages.syllabus.openDay"](day.n)}
          </Link>
        </div>
      </section>
    </li>
  );
}

export default async function SyllabusPage() {
  await connection();
  const view = await getProgrammeView();
  const lang = await getLang();
  const t = await getT();
  return (
    <>
      <PageHeader
        title={t["pages.syllabus.title"]}
        lead={t["pages.syllabus.lead"](view.days.length, view.lessonCount)}
      />

      {!view.scheduleSet ? (
        <div className="ob-alert ob-alert--info gl-alert" role="note">
          <span className="ob-glyph" aria-hidden="true">i</span>
          <div>
            <p className="ob-alert__title">{t["pages.syllabus.datesNotSet"]}</p>
            <p className="ob-p">{t["pages.syllabus.datesNotSetText"]}</p>
          </div>
        </div>
      ) : null}

      <section className="ob-card ob-card--cyan gl-stat" aria-labelledby="progress-label">
        <p id="progress-label" className="ob-stat__label ob-p">{t["pages.syllabus.lessonsComplete"]}</p>
        <p className="ob-stat__figure ob-p">{view.completeCount}</p>
        <p className="ob-stat__scope ob-p">{t["pages.syllabus.ofLessons"](view.lessonCount)}</p>
      </section>

      <ol className="gl-daylist">
        {view.days.map((d) => (
          <DayCard key={d.n} day={d} current={d.n === view.currentDay} total={view.days.length} t={t} lang={lang} />
        ))}
      </ol>
    </>
  );
}
