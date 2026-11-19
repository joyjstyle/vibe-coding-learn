"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Lesson } from "@/lib/content/model";
import { saveSectionVisit, saveStep } from "@/lib/actions/progress";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { formatMinutes } from "@/lib/schedule";
import { useLang, useT } from "@/lib/i18n/client";
import { Blocks } from "../content/Blocks";
import { Inlines } from "../content/Inlines";
import { useLessonNav } from "./LessonContext";
import { OutlineNav } from "./OutlineNav";
import { TaskPanel } from "./TaskPanel";
import { useTicks } from "./useTicks";

export type Prerequisite = { id: string; slug: string; title: string; complete: boolean };

type Props = {
  lesson: Lesson;
  /** The saved section, or null on the first visit. */
  lastSection: number | null;
  tickedSteps: string[];
  canSave: boolean;
  prerequisites: Prerequisite[];
};

const SECTION = /^#section-(\d+)$/;
const scrollKey = (lessonId: string, n: number) => `gl-scroll:${lessonId}:${n}`;

function readScroll(key: string): number | null {
  try {
    const v = sessionStorage.getItem(key);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}
function writeScroll(key: string, y: number) {
  try {
    sessionStorage.setItem(key, String(Math.round(y)));
  } catch {
    /* Storage can be unavailable; scroll memory is a convenience only. */
  }
}

export function LessonReader({ lesson, lastSection, tickedSteps, canSave, prerequisites }: Props) {
  const router = useRouter();
  const t = useT();
  const lang = useLang();
  const { setSection: shareSection, registerSelect } = useLessonNav();
  const numbers = lesson.sections.map((s) => s.number);
  const first = numbers[0]!;
  const last = numbers[numbers.length - 1]!;
  const taskSide = [lesson.task.number, lesson.submission.number, lesson.criteria.number, lesson.knowledgeCheck.number, lesson.furtherReading?.number].filter((n): n is number => typeof n === "number");
  const base = `/lesson/${lesson.slug}`;

  const [section, setSection] = useState<number>(lastSection ?? first);
  /** False until the address has been read, so the first render's guess is never saved. */
  const [arrived, setArrived] = useState(false);
  /** The section scroll positions are recorded against. Switched before any programmatic scroll. */
  const scrollSection = useRef(section);
  const firstVisit = lastSection === null;
  const headingRef = useRef<HTMLHeadingElement>(null);
  /** What to do with scroll and focus after the next section change. */
  const pendingFocus = useRef<"top" | "restore" | null>(null);

  const narrow = useMediaQuery("(max-width: 1023.98px)");
  const [tab, setTab] = useState<"lesson" | "task">("lesson");
  const ticks = useTicks(tickedSteps, useCallback((id: string, checked: boolean) => saveStep(lesson.id, id, checked), [lesson.id]));
  const doneCount = lesson.task.steps.filter((s) => ticks.ticked.has(s.id)).length;

  // Read the address once on arrival: a section link, a task-side link, or nothing (resume).
  useLayoutEffect(() => {
    const m = SECTION.exec(window.location.hash);
    const n = m ? Number(m[1]) : null;
    if (n !== null && numbers.includes(n)) {
      scrollSection.current = n;
      setSection(n);
      pendingFocus.current = "restore";
    } else if (n !== null && taskSide.includes(n)) {
      router.replace(n === lesson.furtherReading?.number ? `${base}#section-${last}` : `${base}/task`);
    } else {
      history.replaceState(history.state, "", `${base}#section-${lastSection ?? first}`);
    }
    setArrived(true);
    // Run once on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Browser Back and Forward between sections: restore the scroll position left there.
  // Listens for hashchange, not popstate: Next.js's router consumes popstate. Our own
  // pushState calls never fire hashchange, so this only runs for history moves and typed links.
  useEffect(() => {
    const onPop = () => {
      const m = SECTION.exec(window.location.hash);
      const n = m ? Number(m[1]) : null;
      if (n !== null && numbers.includes(n)) {
        scrollSection.current = n;
        pendingFocus.current = "restore";
        setSection(n);
      }
    };
    window.addEventListener("hashchange", onPop);
    return () => window.removeEventListener("hashchange", onPop);
  }, [numbers]);

  // Remember the scroll position within the section on screen.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      const n = scrollSection.current;
      frame = requestAnimationFrame(() => {
        if (n === scrollSection.current) writeScroll(scrollKey(lesson.id, n), window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [lesson.id]);

  // After a section change: move to its top and focus its heading, or restore a remembered position.
  useLayoutEffect(() => {
    const mode = pendingFocus.current;
    pendingFocus.current = null;
    if (mode === "top") {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "start" });
    } else if (mode === "restore") {
      const y = readScroll(scrollKey(lesson.id, section));
      if (y !== null) window.scrollTo(0, y);
    }
  }, [section, lesson.id]);

  // Share the position with the lesson bar, and save it as the place to continue from.
  useEffect(() => {
    if (!arrived) return;
    shareSection(section);
    if (canSave) void saveSectionVisit(lesson.id, section);
  }, [arrived, section, lesson.id, canSave, shareSection]);
  useEffect(() => () => shareSection(null), [shareSection]);

  const goTo = useCallback(
    (n: number) => {
      writeScroll(scrollKey(lesson.id, scrollSection.current), window.scrollY);
      scrollSection.current = n;
      history.pushState(history.state, "", `${base}#section-${n}`);
      pendingFocus.current = "top";
      setSection(n);
      setTab("lesson");
    },
    [base, lesson.id],
  );

  useEffect(() => {
    registerSelect(goTo);
    return () => registerSelect(null);
  }, [registerSelect, goTo]);

  const current = lesson.sections.find((s) => s.number === section) ?? lesson.sections[0]!;
  const index = lesson.sections.indexOf(current);
  const prev = lesson.sections[index - 1];
  const next = lesson.sections[index + 1];

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const target = e.key === "Home" ? "lesson" : e.key === "End" ? "task" : tab === "lesson" ? "task" : "lesson";
    setTab(target);
    document.getElementById(`tab-${target}`)?.focus();
  };

  const tabbed = narrow;
  const reading = (
    <div className="gl-reading">
      <header className="gl-lesson-head">
        <p className="ob-p t-label-meta gl-eyebrow">
          {t["ui.dayLesson"](lesson.day, lesson.id)}
        </p>
        <h1 className="ob-h t-lesson-title">{lesson.title}</h1>
        <p className="ob-p ob-secondary">{formatMinutes(lesson.estimatedMinutes, "minutes", lang)}</p>
      </header>

      {current.number === first ? (
        <div className="gl-intro">
          <details className="ob-card ob-card--outlined gl-introcard" open={firstVisit}>
            <summary className="ob-h t-card-title">{t["ui.reader.objective"]}</summary>
            <div className="gl-prose gl-prose--compact">
              {lesson.objective.intro.length ? (
                <p>
                  <Inlines nodes={lesson.objective.intro} />
                </p>
              ) : null}
              <ul>
                {lesson.objective.items.map((item, i) => (
                  <li key={i}>
                    <Inlines nodes={item} />
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <details className="ob-card ob-card--outlined gl-introcard" open={firstVisit}>
            <summary className="ob-h t-card-title">{t["ui.reader.beforeStart"]}</summary>
            <dl className="gl-before">
              <dt className="t-label-meta">{t["ui.reader.prerequisites"]}</dt>
              <dd>
                <Inlines nodes={lesson.prerequisites} />
              </dd>
              <dt className="t-label-meta">{t["ui.reader.materials"]}</dt>
              <dd>
                <Inlines nodes={lesson.requiredMaterials} />
              </dd>
              {lesson.yourOutput ? (
                <>
                  <dt className="t-label-meta">{t["ui.reader.output"]}</dt>
                  <dd>
                    <Inlines nodes={lesson.yourOutput} />
                  </dd>
                </>
              ) : null}
            </dl>
          </details>
          {prerequisites.some((p) => !p.complete) ? (
            <div className="ob-callout ob-callout--dependency">
              <p className="ob-callout__label ob-p">{t["ui.reader.beforeContinue"]}</p>
              <p className="ob-p">{t["ui.reader.buildsOn"]}</p>
              <ul className="gl-bullets">
                {prerequisites
                  .filter((p) => !p.complete)
                  .map((p) => (
                    <li key={p.id}>
                      <Link className="gl-link" href={`/lesson/${p.slug}`}>
                        {t["ui.lessonTitle"](p.id, p.title)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <article className="gl-section-body" aria-labelledby={`section-${current.number}`}>
        <h2 id={`section-${current.number}`} ref={headingRef} tabIndex={-1} className="ob-h t-section-heading gl-section-title">
          {current.number}. {current.title}
        </h2>
        <div className="gl-prose">
          <Blocks blocks={current.blocks} />
        </div>
        {current.number === last && lesson.furtherReading ? (
          <section className="gl-further" aria-labelledby="further-reading">
            <h3 id="further-reading" className="ob-h t-lesson-subsection">
              {t["ui.reader.furtherReading"]}
            </h3>
            <div className="gl-prose">
              <Blocks blocks={lesson.furtherReading.blocks} />
            </div>
          </section>
        ) : null}
      </article>

      <nav className="gl-secnav" aria-label={t["ui.reader.sections"]}>
        {prev ? (
          <a className="ob-btn ob-btn--secondary ob-btn--large" href={`${base}#section-${prev.number}`} onClick={(e) => (e.preventDefault(), goTo(prev.number))}>
            {t["ui.reader.back"]}
          </a>
        ) : (
          <Link className="ob-btn ob-btn--secondary ob-btn--large" href={`/day/${lesson.day}`}>
            {t["ui.reader.backToDay"](lesson.day)}
          </Link>
        )}
        {next ? (
          <a className="ob-btn ob-btn--primary ob-btn--large" href={`${base}#section-${next.number}`} onClick={(e) => (e.preventDefault(), goTo(next.number))}>
            {t["ui.reader.nextSection"]}
          </a>
        ) : (
          <Link className="ob-btn ob-btn--primary ob-btn--large" href={`${base}/task`}>
            {t["ui.reader.goToTask"]}
          </Link>
        )}
      </nav>
    </div>
  );

  const task = (
    <TaskPanel task={lesson.task} slug={lesson.slug} ticked={ticks.ticked} onToggle={ticks.toggle} message={ticks.message} canSave={canSave} headingId="task-panel-heading" />
  );

  return (
    <div className="gl-lesson">
      <aside className="gl-lesson__rail" aria-label={t["ui.outline"]}>
        <OutlineNav />
      </aside>

      {tabbed ? (
        <div className="gl-lesson__tabbed">
          <div role="tablist" aria-label={t["ui.reader.tabs"]} className="gl-tabs">
            <button type="button" role="tab" id="tab-lesson" aria-controls="panel-lesson" aria-selected={tab === "lesson"} tabIndex={tab === "lesson" ? 0 : -1} onClick={() => setTab("lesson")} onKeyDown={onTabKey}>
              {t["ui.reader.tabLesson"]}
            </button>
            <button type="button" role="tab" id="tab-task" aria-controls="panel-task" aria-selected={tab === "task"} tabIndex={tab === "task" ? 0 : -1} onClick={() => setTab("task")} onKeyDown={onTabKey}>
              {t["ui.task.yourTask"]}
              <span className="gl-tabs__count">
                {t["ui.task.stepsDone"](doneCount, lesson.task.steps.length)}
              </span>
            </button>
          </div>
          <div role="tabpanel" id="panel-lesson" aria-labelledby="tab-lesson" hidden={tab !== "lesson"}>
            {reading}
          </div>
          <div role="tabpanel" id="panel-task" aria-labelledby="tab-task" hidden={tab !== "task"} className="gl-lesson__taskpanel">
            {task}
          </div>
        </div>
      ) : (
        <>
          <div className="gl-lesson__main">{reading}</div>
          <aside className="gl-lesson__task" aria-label={t["ui.task.yourTask"]}>
            {task}
          </aside>
        </>
      )}
    </div>
  );
}
