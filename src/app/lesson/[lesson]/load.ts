import { notFound } from "next/navigation";
import { contentFor, getLesson, getLessonBySlug, lessonIdToSlug } from "@/lib/content/curriculum";
import { getLang } from "@/lib/i18n/server";
import { getLessonAccess, type LessonAccess } from "@/lib/lesson-access";
import type { LessonProgress } from "@/lib/platform/progress";
import { auth } from "@/lib/platform/auth";
import type { Prerequisite } from "@/components/lesson/LessonReader";
import { progressStore } from "@/lib/platform/stores";

export type LoadedLesson =
  | { access: Extract<LessonAccess, { kind: "coming_soon" | "locked" }> }
  | { access: Extract<LessonAccess, { kind: "open" }>; canSave: boolean; progress: LessonProgress | undefined; prerequisites: Prerequisite[] };

/**
 * Everything a lesson route needs: access, the intern's saved progress and prerequisites.
 * The lesson and its summary are in the current language (untranslated lessons are English).
 */
export async function loadLesson(slug: string): Promise<LoadedLesson> {
  const lang = await getLang();
  const summary = getLessonBySlug(slug, lang);
  if (!summary) notFound();
  const found = await getLessonAccess(summary.id);
  if (found.kind === "unknown") notFound();
  if (found.kind !== "open") return { access: { ...found, summary } };
  // The title comes from the summary, so an untranslated lesson (English text) still shows its translated title.
  const lesson = getLesson(summary.id, lang) ?? found.lesson;
  const access = { ...found, summary, lesson: { ...lesson, title: summary.title } };
  const intern = await auth.getCurrentIntern();
  const progress = intern ? await progressStore.get(intern.id, summary.id) : undefined;
  const statusOf = (id: string) => access.programme.days.flatMap((d) => d.lessons).find((l) => l.id === id)?.status;
  const lessons = contentFor(lang).lessons;
  const prerequisites: Prerequisite[] = access.lesson.prerequisiteLessons
    .map((id) => lessons.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
    .map((l) => ({ id: l.id, slug: lessonIdToSlug(l.id), title: l.title, complete: statusOf(l.id) === "complete" }));
  return { access, canSave: Boolean(intern), progress, prerequisites };
}
