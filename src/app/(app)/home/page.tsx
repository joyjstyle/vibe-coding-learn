import Link from "next/link";
import { connection } from "next/server";
import { getLesson } from "@/lib/content/curriculum";
import { getIdentity } from "@/lib/identity";
import { lessonsBehind, nextUp } from "@/lib/home";
import { type LessonProgress } from "@/lib/platform/progress";
import { emptyWork } from "@/lib/platform/work";
import { getProgrammeView } from "@/lib/programme";
import { formatMinutes } from "@/lib/schedule";
import { decisionsFor, latestSubmission, reviewState } from "@/lib/work-rules";
import { PageHeader } from "@/components/PageHeader";
import { DayChip, ProgressBadge, ReviewTag } from "@/components/StatusBadges";
import { dateTime } from "@/components/work/EvidenceView";
import { progressStore, workStore } from "@/lib/platform/stores";
import { getLang, getT } from "@/lib/i18n/server";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.home.title"] };
}

export default async function HomePage() {
  await connection();
  const lang = await getLang();
  const t = await getT();
  const [view, { intern }] = await Promise.all([getProgrammeView(), getIdentity()]);
  const progress = intern ? await progressStore.list(intern.id) : new Map<string, LessonProgress>();
  const work = intern ? await workStore.get(intern.id) : emptyWork();
  const up = nextUp(view, progress);
  const behind = lessonsBehind(view);
  const today = view.currentDay ? view.days.find((d) => d.n === view.currentDay)! : null;
  const allLessons = view.days.flatMap((d) => d.lessons);
  const reviewLessons = allLessons.filter((l) => l.reviewPoint);

  // Needs your attention: changes requested, newest decision first.
  const attention = reviewLessons
    .filter((l) => reviewState(work, l.id) === "changes_requested")
    .map((l) => ({ lesson: l, decision: decisionsFor(work, l.id)[0]! }))
    .sort((a, b) => b.decision.recordedAt.localeCompare(a.decision.recordedAt));
  // Waiting on your supervisor: submitted at a review point, no decision recorded for the latest version.
  const waiting = reviewLessons.filter((l) => reviewState(work, l.id) === "awaiting_review").map((l) => ({ lesson: l, submitted: latestSubmission(work, l.id)! }));

  const firstLockedOpens = view.days.find((d) => d.access === "locked")?.opensLabel ?? null;
  const nextSectionTitle = up.kind === "lesson" && up.section ? getLesson(up.lesson.id, lang)?.sections.find((s) => s.number === up.section)?.title : undefined;
  const totalSections = up.kind === "lesson" ? getLesson(up.lesson.id, lang)?.sections.length : undefined;

  return (
    <>
      <PageHeader title={t["pages.home.title"]} lead={today ? t["pages.home.todayLead"](today.n, view.days.length, today.title) : t["pages.home.notStarted"]} />

      {attention.length ? (
        <section className="gl-section" aria-labelledby="attention">
          <h2 id="attention" className="ob-h t-section-heading">
            {t["pages.home.attention"]}
          </h2>
          <ul className="gl-cardlist">
            {attention.map(({ lesson, decision }) => (
              <li key={lesson.id} className="ob-card ob-card--butter gl-attention">
                <p className="ob-p gl-inline-status">
                  <ReviewTag decision="changes_requested" />
                  <span className="t-label-meta">{t["pages.home.recorded"](dateTime(decision.recordedAt, lang))}</span>
                </p>
                <h3 className="ob-h t-card-title">
                  {t["pages.lessonTitle"](lesson.id, lesson.title)}
                </h3>
                {decision.notes ? <p className="ob-p gl-prewrap gl-attention__notes">{decision.notes}</p> : null}
                <div className="ob-card__actions">
                  <Link className="ob-link" href={`/work/${lesson.slug}`} aria-label={t["pages.home.resubmitLabel"](lesson.id)}>
                    {t["pages.resubmit"]}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="ob-card ob-card--featured gl-today" aria-labelledby="today-title">
        {up.kind === "lesson" ? (
          <>
            <p className="ob-p gl-today__meta gl-inline-status">
              <span>
                {t["pages.dayLesson"](up.lesson.day, up.lesson.id)}
              </span>
              <ProgressBadge status={up.lesson.status} />
            </p>
            <h2 id="today-title" className="ob-h t-page-heading">
              {up.lesson.title}
            </h2>
            <p className="ob-p gl-today__text">
              {up.action === "continue" && up.section && nextSectionTitle
                ? t["pages.home.stoppedAt"](up.section, totalSections, nextSectionTitle)
                : t["pages.home.startWith"](formatMinutes(up.lesson.estimatedMinutes, "minutes", lang))}
            </p>
            {behind ? (
              <p className="ob-p gl-today__text">
                {t["pages.home.behind"](behind)}
              </p>
            ) : null}
            <div className="ob-card__actions">
              <Link className="ob-btn ob-btn--primary ob-btn--large" href={`/lesson/${up.lesson.slug}${up.section ? `#section-${up.section}` : ""}`}>
                {up.action === "continue" ? t["pages.continueLesson"] : t["pages.startLessonN"](up.lesson.id)}
              </Link>
            </div>
          </>
        ) : up.kind === "all_done" ? (
          <>
            <h2 id="today-title" className="ob-h t-card-title">
              {t["pages.home.allDone"]}
            </h2>
            <p className="ob-p gl-today__text">{firstLockedOpens ? t["pages.home.nextDayOpens"](firstLockedOpens) : t["pages.home.programmeDone"]}</p>
            <div className="ob-card__actions">
              <Link className="ob-btn ob-btn--primary" href="/work">
                {t["pages.home.viewMyWork"]}
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 id="today-title" className="ob-h t-card-title">
              {t["pages.home.firstDayNotOpen"]}
            </h2>
            <p className="ob-p gl-today__text">{firstLockedOpens ? t["pages.home.day1Opens"](firstLockedOpens) : t["pages.home.day1OpensUnknown"]}
              {t["pages.home.meanwhileTour"]}
            </p>
            <div className="ob-card__actions">
              <Link className="ob-btn ob-btn--primary" href="/welcome">
                {t["pages.home.openTour"]}
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="gl-section" aria-labelledby="days">
        <h2 id="days" className="ob-h t-section-heading">
          {t["pages.home.yourDays"](view.days.length)}
        </h2>
        <ol className="gl-dayrow">
          {view.days.map((d) => {
            const points = d.lessons.filter((l) => l.reviewPoint);
            const current = d.n === view.currentDay;
            return (
              <li key={d.n}>
                <Link className={`gl-daytile${current ? " gl-daytile--current" : ""}`} href={`/day/${d.n}`} aria-current={current ? "date" : undefined}>
                  <span className="gl-daytile__n">{t["pages.dayN"](d.n)}</span>
                  {current ? <span className="t-label-meta">{t["pages.home.today"]}</span> : null}
                  <DayChip access={d.access} />
                  {points.map((l) => (
                    <span key={l.id} className="gl-daytile__review">
                      <span className="t-label-meta">{t["pages.home.reviewN"](l.id)}</span>
                      <ReviewTag decision={l.review ?? "not_submitted"} />
                    </span>
                  ))}
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="gl-section" aria-labelledby="waiting">
        <h2 id="waiting" className="ob-h t-section-heading">
          {t["pages.home.waiting"]}
        </h2>
        {waiting.length ? (
          <>
            <p className="ob-p ob-secondary">{t["pages.home.waitingText"]}</p>
            <ul className="ob-list gl-sublist">
              {waiting.map(({ lesson, submitted }) => (
                <li key={lesson.id} className="ob-sub gl-sub">
                  <div className="gl-sub__main">
                    <p className="ob-meta ob-p">{t["pages.lessonN"](lesson.id)}</p>
                    <p className="ob-p gl-sub__title">{lesson.title}</p>
                    <p className="ob-meta ob-p">{t["pages.home.versionSubmitted"](submitted.version, dateTime(submitted.submittedAt, lang))}</p>
                  </div>
                  <div className="ob-sub__actions">
                    <ReviewTag decision="awaiting_review" />
                    <Link className="ob-link" href={`/work/${lesson.slug}`} aria-label={t["pages.viewSubmissionLabel"](lesson.id)}>
                      {t["pages.viewSubmission"]}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="ob-p">{t["pages.home.nothingWaiting"]}</p>
        )}
      </section>

      <section className="gl-section" aria-labelledby="shortcuts">
        <h2 id="shortcuts" className="ob-h t-section-heading">
          {t["pages.home.shortcuts"]}
        </h2>
        <ul className="ob-grid gl-shortcuts">
          <li className="ob-card ob-card--lavender">
            <p className="ob-tk__kind ob-p">{t["pages.home.promptLibrary"]}</p>
            <p className="ob-p">{t["pages.home.promptLibraryText"]}</p>
            <Link className="ob-link" href="/toolkit/prompts">
              {t["pages.home.viewPrompts"]}
            </Link>
          </li>
          <li className="ob-card ob-card--outlined">
            <p className="ob-tk__kind ob-p">{t["pages.home.glossary"]}</p>
            <p className="ob-p">{t["pages.home.glossaryText"]}</p>
            <Link className="ob-link" href="/toolkit/glossary">
              {t["pages.home.openGlossary"]}
            </Link>
          </li>
          <li className="ob-card ob-card--outlined">
            <p className="ob-tk__kind ob-p">{t["pages.home.commandSheet"]}</p>
            <p className="ob-p">{t["pages.home.commandSheetText"]}</p>
            <Link className="ob-link" href="/toolkit/commands">
              {t["pages.home.viewCommands"]}
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
