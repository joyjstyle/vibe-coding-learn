import Link from "next/link";
import { lessonMetadata, type LessonRouteProps } from "../lesson-page";
import { loadLesson } from "../load";
import { LessonUnavailable } from "../unavailable";
import { loadKnowledgeCheck, publicQuestions } from "@/lib/knowledge-checks";
import { Blocks } from "@/components/content/Blocks";
import { CheckRunner } from "@/components/lesson/CheckRunner";
import { getT } from "@/lib/i18n/server";

export const generateMetadata = lessonMetadata("ui.check.title");

export default async function CheckPage({ params }: LessonRouteProps) {
  const data = await loadLesson((await params).lesson);
  if (!("canSave" in data)) return <LessonUnavailable access={data.access} />;
  const lesson = data.access.lesson;
  const t = await getT();
  const check = await loadKnowledgeCheck(lesson.id);
  const answers = data.progress?.knowledgeCheck?.answers ?? {};
  const correctSoFar = check ? check.questions.filter((q) => answers[q.id]?.at(-1) === q.correctOptionId).map((q) => q.id) : [];

  return (
    <div className="gl-checkpage">
      <header className="gl-page-head">
        <p className="ob-p t-label-meta gl-eyebrow">
          {t["ui.dayLessonTitle"](lesson.day, lesson.id, lesson.title)}
        </p>
        <h1 className="ob-h t-page-heading">{t["ui.check.title"]}</h1>
        <p className="ob-p ob-secondary">{t["ui.check.lead"]}</p>
      </header>

      {check ? (
        <CheckRunner lessonId={lesson.id} slug={lesson.slug} questions={publicQuestions(check)} correctSoFar={correctSoFar} canSave={data.canSave} />
      ) : (
        <>
          <div className="ob-callout ob-callout--note">
            <p className="ob-callout__label ob-p">{t["ui.check.unavailableTitle"]}</p>
            <p className="ob-p">{t["ui.check.unavailableBody"]}</p>
          </div>
          <section className="gl-section" aria-labelledby="reflection">
            <h2 id="reflection" className="ob-h t-section-heading">
              {t["ui.check.reflection"]}
            </h2>
            <div className="gl-prose">
              <Blocks blocks={lesson.knowledgeCheck.intro} />
              <ol>
                {lesson.knowledgeCheck.questions.map((qq) => (
                  <li key={qq.id}>
                    <Blocks blocks={qq.children} />
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </>
      )}
      <p className="ob-p">
        <Link className="ob-btn ob-btn--tertiary" href={`/lesson/${lesson.slug}/task`}>
          {t["ui.check.backToTask"]}
        </Link>
      </p>
    </div>
  );
}
