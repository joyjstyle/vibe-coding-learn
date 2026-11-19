import Link from "next/link";
import type { LessonAccess } from "@/lib/lesson-access";
import { getT } from "@/lib/i18n/server";
import { ComingSoonBadge, ProgressBadge } from "@/components/StatusBadges";

/** Shown instead of a lesson that is not open: Coming soon (no file) or Locked (calendar). */
export async function LessonUnavailable({ access }: { access: Extract<LessonAccess, { kind: "coming_soon" | "locked" }> }) {
  const t = await getT();
  const { summary, day } = access;
  const soon = access.kind === "coming_soon";
  return (
    <section className="ob-soon" aria-labelledby="unavailable-title">
      {soon ? <ComingSoonBadge /> : <ProgressBadge status="locked" />}
      <p className="ob-p t-label-meta gl-eyebrow">
        {t["ui.dayLesson"](summary.day, summary.id)}
      </p>
      <h1 id="unavailable-title" className="ob-h t-lesson-title">
        {summary.title}
      </h1>
      <p className="ob-p">
        {soon
          ? t["ui.unavailable.soon"]
          : day.opensLabel
            ? t["ui.unavailable.lockedOpens"](day.opensLabel, day.n)
            : t["ui.unavailable.locked"](day.n)}
      </p>
      <div className="ob-card__actions">
        <Link className="ob-btn ob-btn--primary" href="/syllabus">
          {t["ui.unavailable.backToSyllabus"]}
        </Link>
        <Link className="ob-btn ob-btn--tertiary" href="/help">
          {t["ui.unavailable.getHelp"]}
        </Link>
      </div>
    </section>
  );
}
