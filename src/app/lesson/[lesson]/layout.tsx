import type { ReactNode } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getLesson, getLessonBySlug, lessons } from "@/lib/content/curriculum";
import { getProgrammeView } from "@/lib/programme";
import { getLang } from "@/lib/i18n/server";
import { AppFrame } from "@/components/AppFrame";
import { LessonBar } from "@/components/LessonBar";
import { LessonNavProvider } from "@/components/lesson/LessonContext";
import type { OutlineData } from "@/components/lesson/OutlineNav";
import { getHelpData } from "@/lib/help-data";
import { requireIntern } from "@/lib/identity";
import { HelpProvider } from "@/components/help/HelpContext";

export const dynamicParams = false;
export function generateStaticParams() {
  return lessons.map((l) => ({ lesson: l.slug }));
}

export default async function LessonLayout({ children, params }: { children: ReactNode; params: Promise<{ lesson: string }> }) {
  const lang = await getLang();
  const summary = getLessonBySlug((await params).lesson, lang);
  if (!summary) notFound();
  await connection();
  await requireIntern();
  const programme = await getProgrammeView();
  const day = programme.days.find((d) => d.n === summary.day)!;
  const lesson = getLesson(summary.id, lang) ?? getLesson(summary.id);
  const outline: OutlineData = {
    lessonId: summary.id,
    slug: summary.slug,
    title: summary.title,
    day: summary.day,
    sections: lesson && day.access !== "locked" ? lesson.sections.map((s) => ({ number: s.number, title: s.title })) : [],
    dayLessons: day.lessons.map((l) => ({ id: l.id, slug: l.slug, title: l.title, status: l.available ? l.status : "coming_soon" })),
  };
  return (
    <LessonNavProvider outline={outline}>
      <HelpProvider data={await getHelpData()}>
        <AppFrame bar={<LessonBar lesson={summary} />}>{children}</AppFrame>
      </HelpProvider>
    </LessonNavProvider>
  );
}
