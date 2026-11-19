import { lessonMetadata, type LessonRouteProps } from "../lesson-page";
import { loadLesson } from "../load";
import { LessonUnavailable } from "../unavailable";
import { contentFor } from "@/lib/content/curriculum";
import { getLang, getT } from "@/lib/i18n/server";
import { checkState } from "@/lib/lesson-state";
import { auth } from "@/lib/platform/auth";
import { emptyWork } from "@/lib/platform/work";
import { latestSubmission } from "@/lib/work-rules";
import { TaskPageClient } from "./TaskPageClient";
import { workStore } from "@/lib/platform/stores";

export const generateMetadata = lessonMetadata("ui.task.yourTask");

export default async function TaskPage({ params }: LessonRouteProps) {
  const data = await loadLesson((await params).lesson);
  if (!("canSave" in data)) return <LessonUnavailable access={data.access} />;
  const { access, canSave, progress } = data;
  const lesson = access.lesson;
  const intern = await auth.getCurrentIntern();
  const work = intern ? await workStore.get(intern.id) : emptyWork();
  const t = await getT();
  const lessons = contentFor(await getLang()).lessons;
  const i = lessons.findIndex((l) => l.id === lesson.id);
  const following = lessons[i + 1];
  return (
    <>
      <p className="ob-p t-label-meta gl-eyebrow">
        {t["ui.dayLessonTitle"](lesson.day, lesson.id, lesson.title)}
      </p>
      <TaskPageClient
        lessonId={lesson.id}
        slug={lesson.slug}
        task={lesson.task}
        criteria={lesson.criteria}
        tickedSteps={progress?.tickedSteps ?? []}
        tickedCriteria={progress?.tickedCriteria ?? []}
        canSave={canSave}
        lastSection={progress?.lastSection ?? lesson.sections[lesson.sections.length - 1]!.number}
        submitted={Boolean(latestSubmission(work, lesson.id))}
        check={await checkState(lesson.id, progress)}
        complete={progress?.status === "complete"}
        next={following ? { id: following.id, slug: following.slug, title: following.title } : null}
      />
    </>
  );
}
