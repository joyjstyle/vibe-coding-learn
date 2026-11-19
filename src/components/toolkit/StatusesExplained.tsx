"use client";

import { useT } from "@/lib/i18n/client";
import { ComingSoonBadge, DayChip, ProgressBadge, ReviewTag, SubmissionBadge } from "../StatusBadges";

/** Statuses explained, from the IA plan's status model. Shown in the Toolkit and the Help drawer. */
export function StatusesExplained({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const H = compact ? "h3" : "h2";
  const cls = compact ? "ob-h t-label-meta gl-status-kind" : "ob-h t-section-heading";
  return (
    <div className="gl-statuses">
      <section aria-label={t["ui.statuses.progress"]}>
        <H className={cls}>{t["ui.statuses.progress"]}</H>
        <p className="ob-p ob-secondary">{t["ui.statuses.progressLead"]}</p>
        <dl className="gl-status-list">
          <dt><ProgressBadge status="locked" /></dt><dd>{t["ui.statuses.progress.locked"]}</dd>
          <dt><ProgressBadge status="not_started" /></dt><dd>{t["ui.statuses.progress.notStarted"]}</dd>
          <dt><ProgressBadge status="in_progress" /></dt><dd>{t["ui.statuses.progress.inProgress"]}</dd>
          <dt><ProgressBadge status="complete" /></dt><dd>{t["ui.statuses.progress.complete"]}</dd>
          <dt><ComingSoonBadge /></dt><dd>{t["ui.statuses.progress.comingSoon"]}</dd>
        </dl>
      </section>
      <section aria-label={t["ui.statuses.review"]}>
        <H className={cls}>{t["ui.statuses.review"]}</H>
        <p className="ob-p ob-secondary">{t["ui.statuses.reviewLead"]}</p>
        <dl className="gl-status-list">
          <dt><ReviewTag decision="not_submitted" /></dt><dd>{t["ui.statuses.review.notSubmitted"]}</dd>
          <dt><ReviewTag decision="awaiting_review" /></dt><dd>{t["ui.statuses.review.awaiting"]}</dd>
          <dt><ReviewTag decision="changes_requested" /></dt><dd>{t["ui.statuses.review.changes"]}</dd>
          <dt><ReviewTag decision="accepted" /></dt><dd>{t["ui.statuses.review.accepted"]}</dd>
        </dl>
      </section>
      <section aria-label={t["ui.statuses.submission"]}>
        <H className={cls}>{t["ui.statuses.submission"]}</H>
        <dl className="gl-status-list">
          <dt><SubmissionBadge state="draft" /></dt><dd>{t["ui.statuses.submission.draft"]}</dd>
          <dt><SubmissionBadge state="submitted" /></dt><dd>{t["ui.statuses.submission.submitted"]}</dd>
        </dl>
      </section>
      <section aria-label={t["ui.statuses.day"]}>
        <H className={cls}>{t["ui.statuses.day"]}</H>
        <p className="ob-p ob-secondary">{t["ui.statuses.dayLead"]}</p>
        <dl className="gl-status-list">
          <dt><DayChip access="locked" /></dt><dd>{t["ui.statuses.day.locked"]}</dd>
          <dt><DayChip access="open" /></dt><dd>{t["ui.statuses.day.open"]}</dd>
          <dt><DayChip access="done" /></dt><dd>{t["ui.statuses.day.done"]}</dd>
        </dl>
      </section>
      <section aria-label={t["ui.statuses.words"]}>
        <H className={cls}>{t["ui.statuses.words"]}</H>
        <p className="ob-p">{t["ui.statuses.wordsBody"]}</p>
      </section>
    </div>
  );
}
