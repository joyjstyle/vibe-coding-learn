/**
 * What the Syllabus, Day and (later) Home pages show: content joined with the calendar
 * and the intern's saved progress. Every number comes from content or progress data.
 */
import { contentFor } from "./content/curriculum";
import type { Lang } from "./i18n/lang";
import type { LessonSummary } from "./content/model";
import { effectiveSchedule, reviewPointFor, type ReviewPoint } from "./config";
import { auth } from "./platform/auth";
import { type LessonProgress } from "./platform/progress";
import { emptyWork, type Work } from "./platform/work";
import { reviewState, type ReviewState } from "./work-rules";
import { dayAccess, dayOpenDates, formatOpenDate, lessonStatus, type DayAccess, type LessonProgressStatus } from "./schedule";
import { progressStore, workStore } from "./platform/stores";

export type LessonView = LessonSummary & {
  status: LessonProgressStatus;
  reviewPoint: ReviewPoint | null;
  /** The recorded review state at a review point; null for other lessons. */
  review: ReviewState | null;
};

export type DayView = {
  n: number;
  title: string;
  estimatedMinutes: number;
  access: DayAccess;
  openDate: string | null;
  /** "Opens on 20 November" while locked with a known date; null otherwise. */
  opensLabel: string | null;
  lessons: LessonView[];
  completeCount: number;
};

export type ProgrammeView = {
  today: string;
  /** False while config/cohort.json has no start date. */
  scheduleSet: boolean;
  days: DayView[];
  lessonCount: number;
  completeCount: number;
  /** The latest day that is open today, or null when no day is open yet. */
  currentDay: number | null;
};

export function buildProgrammeView(today: string, openDates: string[] | null, progress: Map<string, LessonProgress>, work: Work = emptyWork(), lang: Lang = "en"): ProgrammeView {
  const { days } = contentFor(lang);
  const dayViews = days.map((d, i): DayView => {
    const openDate = openDates?.[i] ?? null;
    const progressOf = (id: string) => progress.get(id)?.status;
    const allComplete = d.lessons.every((l) => l.available && progressOf(l.id) === "complete");
    // Day 1 is always open, with or without a start date.
    const access = i === 0 ? dayAccess(today, today, allComplete) : dayAccess(openDate, today, allComplete);
    const lessons = d.lessons.map((l) => {
      const reviewPoint = reviewPointFor(l.id) ?? null;
      return { ...l, status: lessonStatus(access, l.available ? progressOf(l.id) : undefined), reviewPoint, review: reviewPoint ? reviewState(work, l.id) : null };
    });
    return {
      n: d.n,
      title: d.title,
      estimatedMinutes: d.estimatedMinutes,
      access,
      openDate,
      opensLabel: access === "locked" && openDate ? formatOpenDate(openDate, today, lang) : null,
      lessons,
      completeCount: lessons.filter((l) => l.status === "complete").length,
    };
  });
  const open = dayViews.filter((d) => d.access !== "locked");
  return {
    today,
    scheduleSet: openDates !== null,
    days: dayViews,
    lessonCount: dayViews.reduce((n, d) => n + d.lessons.length, 0),
    completeCount: dayViews.reduce((n, d) => n + d.completeCount, 0),
    currentDay: open.length ? open[open.length - 1]!.n : null,
  };
}

export async function getProgrammeView(): Promise<ProgrammeView> {
  const { getLang } = await import("./i18n/server");
  const lang = await getLang();
  const { cohort, today } = effectiveSchedule();
  const intern = await auth.getCurrentIntern();
  const progress = intern ? await progressStore.list(intern.id) : new Map<string, LessonProgress>();
  const work = intern ? await workStore.get(intern.id) : emptyWork();
  return buildProgrammeView(today, dayOpenDates(cohort, contentFor(lang).days.length), progress, work, lang);
}

/** The first available lesson in the day that is not complete, for the day's primary action. */
export function nextLesson(day: DayView): LessonView | undefined {
  if (day.access === "locked") return undefined;
  return day.lessons.find((l) => l.available && l.status !== "complete");
}
