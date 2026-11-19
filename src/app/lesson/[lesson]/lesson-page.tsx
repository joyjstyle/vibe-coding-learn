import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLessonBySlug } from "@/lib/content/curriculum";
import type { Messages } from "@/lib/i18n/messages";
import { getLang, getT } from "@/lib/i18n/server";
import { PageHeader } from "@/components/PageHeader";
import { NotBuilt } from "@/components/NotBuilt";

export type LessonRouteProps = { params: Promise<{ lesson: string }> };

/** A message key whose value is plain text. */
type TextKey = { [K in keyof Messages]: Messages[K] extends string ? K : never }[keyof Messages];

/** Shared by the lesson, task, submit and check routes: the page title, in the current language. */
export function lessonMetadata(part?: TextKey) {
  return async ({ params }: LessonRouteProps): Promise<Metadata> => {
    const t = await getT();
    const lesson = getLessonBySlug((await params).lesson, await getLang());
    if (!lesson) return { title: t["ui.pageNotFound"] };
    const base = t["ui.lessonTitle"](lesson.id, lesson.title);
    return { title: part ? t["ui.metaTitle"](t[part], base) : base };
  };
}

export function lessonPlaceholder(part: string | null, what: string) {
  return async function LessonPlaceholderPage({ params }: LessonRouteProps) {
    const t = await getT();
    const lesson = getLessonBySlug((await params).lesson, await getLang());
    if (!lesson) notFound();
    const eyebrow = t["ui.dayLesson"](lesson.day, lesson.id);
    return (
      <>
        {part ? (
          <PageHeader eyebrow={`${eyebrow}: ${lesson.title}`} title={part} />
        ) : (
          <PageHeader eyebrow={eyebrow} title={lesson.title} titleStyle="lesson-title" />
        )}
        <NotBuilt what={what} />
      </>
    );
  };
}
