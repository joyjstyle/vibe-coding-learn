import Link from "next/link";
import { lessonMetadata, type LessonRouteProps } from "../lesson-page";
import { loadLesson } from "../load";
import { LessonUnavailable } from "../unavailable";
import { reviewPointFor } from "@/lib/config";
import { inlineText } from "@/lib/content/text";
import { auth } from "@/lib/platform/auth";
import { emptyWork } from "@/lib/platform/work";
import { latestSubmission, nextVersion, reviewState } from "@/lib/work-rules";
import { Blocks } from "@/components/content/Blocks";
import { EvidenceForm, type FormItem, type ItemValue } from "@/components/work/EvidenceForm";
import { ReviewTag } from "@/components/StatusBadges";
import { workStore } from "@/lib/platform/stores";
import { getT } from "@/lib/i18n/server";

export const generateMetadata = lessonMetadata("ui.submit.title");

export default async function SubmitPage({ params }: LessonRouteProps) {
  const data = await loadLesson((await params).lesson);
  if (!("canSave" in data)) return <LessonUnavailable access={data.access} />;
  const lesson = data.access.lesson;
  const t = await getT();
  const intern = await auth.getCurrentIntern();
  const work = intern ? await workStore.get(intern.id) : emptyWork();
  const draft = work.drafts.find((d) => d.lessonId === lesson.id);
  const latest = latestSubmission(work, lesson.id);
  const reviewPoint = reviewPointFor(lesson.id);
  const state = reviewState(work, lesson.id);

  const items: FormItem[] = lesson.submission.items.map((it) => {
    const first = it.children[0];
    return { id: it.id, label: first?.type === "paragraph" ? first.children : [{ type: "text", value: t["ui.submit.evidenceItem"](it.id.slice(1)) }] };
  });
  // Prefill from a saved draft, else from the latest version (for resubmitting), else empty.
  const initial: Record<string, ItemValue> = {};
  for (const it of items) {
    const d = draft?.items.find((x) => x.itemId === it.id);
    const s = latest?.items.find((x) => x.itemId === it.id);
    initial[it.id] = d
      ? { kind: d.kind, text: d.text ?? "", url: d.url ?? "", file: d.file ?? null }
      : s
        ? { kind: s.kind, text: s.kind === "text" ? s.text : "", url: s.kind === "link" ? s.url : "", file: s.kind === "file" ? s.file : null }
        : { kind: "text", text: "", url: "", file: null };
  }
  // A Git commit field where the lesson's expected submission mentions a commit.
  const askCommit = lesson.submission.items.some((it) => /\bcommit\b/i.test(it.children.map((b) => (b.type === "paragraph" ? inlineText(b.children) : "")).join(" ")));

  return (
    <div className="gl-submitpage">
      <header className="gl-page-head">
        <p className="ob-p t-label-meta gl-eyebrow">
          {t["ui.dayLessonTitle"](lesson.day, lesson.id, lesson.title)}
        </p>
        <h1 className="ob-h t-page-heading">{t["ui.submit.title"]}</h1>
        <p className="ob-p ob-secondary">
          {latest ? t["ui.submit.resubmit"](latest.version) : t["ui.submit.lead"]}
        </p>
      </header>

      {lesson.submission.after.length ? (
        <div className="ob-callout ob-callout--dependency">
          <p className="ob-callout__label ob-p">{t["ui.submit.beforeSubmit"]}</p>
          <div className="gl-prose gl-prose--compact">
            <Blocks blocks={lesson.submission.after} />
          </div>
        </div>
      ) : null}

      <EvidenceForm
        lessonId={lesson.id}
        slug={lesson.slug}
        items={items}
        initial={initial}
        initialCommit={draft?.gitCommit ?? latest?.gitCommit ?? ""}
        askCommit={askCommit}
        nextVersion={nextVersion(work, lesson.id)}
        canSave={data.canSave}
        draftSavedAt={draft?.savedAt ?? null}
      />

      {reviewPoint ? (
        <section className="ob-card ob-card--outlined gl-reviewpoint" aria-labelledby="review-point">
          <h2 id="review-point" className="ob-h t-card-title">
            {t["ui.submit.reviewPoint"]}
          </h2>
          <p className="ob-p gl-inline-status">
            <span>{t["ui.submit.yourSupervisor"](reviewPoint.supervisorDecides)}</span>
            <ReviewTag decision={state} />
          </p>
          {latest ? (
            <>
              <p className="ob-p">{t["ui.submit.shareThenRecord"]}</p>
              <div className="ob-card__actions">
                <Link className="ob-btn ob-btn--secondary" href={`/work/${lesson.slug}#share`}>
                  {t["ui.submit.share"]}
                </Link>
                <Link className="ob-btn ob-btn--secondary" href={`/work/${lesson.slug}#record`}>
                  {t["ui.submit.record"]}
                </Link>
              </div>
            </>
          ) : (
            <p className="ob-p ob-secondary">{t["ui.submit.onceSubmitted"]}</p>
          )}
        </section>
      ) : null}
    </div>
  );
}
