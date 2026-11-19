import Link from "next/link";
import { connection } from "next/server";
import { reviewPointFor } from "@/lib/config";
import { contentFor } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { auth } from "@/lib/platform/auth";
import { emptyWork } from "@/lib/platform/work";
import { getProgrammeView, nextLesson } from "@/lib/programme";
import { latestSubmission, reviewState, submissionsFor, type ReviewState } from "@/lib/work-rules";
import { dateTime } from "@/components/work/EvidenceView";
import { PageHeader } from "@/components/PageHeader";
import { ReviewTag, SubmissionBadge } from "@/components/StatusBadges";
import { workStore } from "@/lib/platform/stores";

export async function generateMetadata() {
  const t = await getT();
  return { title: t["pages.work.title"] };
}

const FILTERS = [
  { key: "needs-action", label: "pages.work.filter.needs-action" },
  { key: "awaiting", label: "pages.work.filter.awaiting" },
  { key: "accepted", label: "pages.work.filter.accepted" },
  { key: "all", label: "pages.work.filter.all" },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];

type Row = { id: string; slug: string; title: string; day: number; when: string | null; versions: number; draft: boolean; review: ReviewState | null };

const matches = (f: FilterKey, r: Row) =>
  f === "all" || (f === "needs-action" && r.review === "changes_requested") || (f === "awaiting" && r.review === "awaiting_review") || (f === "accepted" && r.review === "accepted");

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  await connection();
  const lang = await getLang();
  const t = await getT();
  const { lessons } = contentFor(lang);
  const intern = await auth.getCurrentIntern();
  const work = intern ? await workStore.get(intern.id) : emptyWork();
  const rows: Row[] = lessons
    .map((l) => {
      const subs = submissionsFor(work, l.id);
      const draft = work.drafts.some((d) => d.lessonId === l.id);
      if (!subs.length && !draft) return null;
      return {
        id: l.id,
        slug: l.slug,
        title: l.title,
        day: l.day,
        when: latestSubmission(work, l.id)?.submittedAt ?? null,
        versions: subs.length,
        draft,
        review: subs.length && reviewPointFor(l.id) ? reviewState(work, l.id) : null,
      };
    })
    .filter((r): r is Row => r !== null)
    .sort((a, b) => (b.when ?? "").localeCompare(a.when ?? ""));

  const counts = Object.fromEntries(FILTERS.map((f) => [f.key, rows.filter((r) => matches(f.key, r)).length])) as Record<FilterKey, number>;
  const requested = (await searchParams).filter;
  const filter: FilterKey = FILTERS.some((f) => f.key === requested) ? (requested as FilterKey) : counts["needs-action"] ? "needs-action" : "all";
  const shown = rows.filter((r) => matches(filter, r));

  let firstStep: { id: string; slug: string } | undefined;
  if (!rows.length) {
    const programme = await getProgrammeView();
    const day = programme.days.find((d) => d.n === programme.currentDay);
    const next = day ? nextLesson(day) : undefined;
    firstStep = next ? { id: next.id, slug: next.slug } : undefined;
  }

  return (
    <>
      <PageHeader title={t["pages.work.title"]} lead={t["pages.work.lead"]} />
      <nav className="gl-subnav" aria-label={t["pages.work.filterLabel"]}>
        <ul>
          {FILTERS.map((f) => (
            <li key={f.key}>
              <Link href={`/work?filter=${f.key}`} aria-current={filter === f.key ? "page" : undefined}>
                {t[f.label]} ({counts[f.key]})
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!rows.length ? (
        <section className="ob-card ob-card--outlined gl-empty" aria-label={t["pages.work.noneLabel"]}>
          <p className="ob-p">{t["pages.work.none"]}</p>
          {firstStep ? (
            <p className="ob-p">
              <Link className="ob-btn ob-btn--primary" href={`/lesson/${firstStep.slug}`}>
                {t["pages.work.goToLesson"](firstStep.id)}
              </Link>
            </p>
          ) : (
            <p className="ob-p ob-secondary">{t["pages.work.firstOpensUnknown"]}</p>
          )}
        </section>
      ) : !shown.length ? (
        <p className="ob-p">{t["pages.work.nothingHere"]} <Link className="gl-link" href="/work?filter=all">{t["pages.work.showAll"]}</Link>.</p>
      ) : (
        <ul className="ob-list gl-sublist">
          {shown.map((r) => (
            <li key={r.id} className="ob-sub gl-sub">
              <div className="gl-sub__main">
                <p className="ob-meta ob-p">
                  {t["pages.dayLesson"](r.day, r.id)}
                </p>
                <p className="ob-p gl-sub__title">{r.title}</p>
                <p className="ob-sub__meta ob-meta ob-p">
                  {r.when ? <span>{t["pages.work.lastSubmitted"](dateTime(r.when, lang))}</span> : <span>{t["pages.work.notSubmitted"]}</span>}
                  {r.versions > 1 ? <span>{t["pages.work.versions"](r.versions)}</span> : null}
                </p>
              </div>
              <div className="ob-sub__actions">
                <SubmissionBadge state={r.versions ? "submitted" : "draft"} />
                {r.review ? <ReviewTag decision={r.review} /> : null}
                <Link className="ob-link" href={`/work/${r.slug}`} aria-label={t["pages.viewSubmissionLabel"](r.id)}>
                  {t["pages.viewSubmission"]}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
