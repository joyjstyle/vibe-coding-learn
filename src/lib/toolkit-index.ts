/**
 * The Toolkit's prompt library, command sheet and templates, collected from the parsed
 * lessons. Every count shown comes from here; nothing is typed in by hand.
 */
import { contentFor, getLesson } from "./content/curriculum";
import type { Block, CodeBlock, CodeKind, Lesson } from "./content/model";
import type { Lang } from "./i18n/lang";
import { messages } from "./i18n/messages";

export type ToolkitEntry = {
  key: string;
  lessonId: string;
  lessonTitle: string;
  day: number;
  /** Where the block sits, for the link back. */
  where: string;
  href: string;
  block: CodeBlock;
};

export type ToolkitGroup = { day: number; title: string; entries: ToolkitEntry[] };

function codeIn(blocks: Block[]): CodeBlock[] {
  return blocks.flatMap((b) => (b.type === "code" ? [b] : b.type === "list" ? b.items.flatMap((i) => codeIn(i.children)) : b.type === "blockquote" ? codeIn(b.children) : []));
}

function locations(lesson: Lesson, lang: Lang): { where: string; href: string; blocks: Block[] }[] {
  const t = messages[lang];
  const base = `/lesson/${lesson.slug}`;
  return [
    ...lesson.sections.map((s) => ({ where: t["lib.toolkit.where.section"](s.number, s.title), href: `${base}#section-${s.number}`, blocks: s.blocks })),
    { where: t["lib.toolkit.where.task"], href: `${base}/task`, blocks: [...lesson.task.before, ...lesson.task.steps.flatMap((s) => s.children), ...lesson.task.after] },
    { where: t["lib.toolkit.where.submit"], href: `${base}/submit`, blocks: [...lesson.submission.intro, ...lesson.submission.items.flatMap((s) => s.children), ...lesson.submission.after] },
    { where: t["lib.toolkit.where.criteria"], href: `${base}/task`, blocks: [...lesson.criteria.intro, ...lesson.criteria.items.flatMap((s) => s.children), ...lesson.criteria.after] },
    { where: t["lib.toolkit.where.check"], href: `${base}/check`, blocks: [...lesson.knowledgeCheck.intro, ...lesson.knowledgeCheck.questions.flatMap((q) => q.children)] },
    ...(lesson.furtherReading ? [{ where: t["lib.toolkit.where.furtherReading"], href: `${base}#section-${lesson.sections[lesson.sections.length - 1]!.number}`, blocks: lesson.furtherReading.blocks }] : []),
  ];
}

/** Entries in the given language: lesson titles, "where" labels and blocks come from that language's lessons. */
export function toolkitGroups(kind: CodeKind, lang: Lang = "en"): ToolkitGroup[] {
  return contentFor(lang)
    .days.map((d) => ({
      day: d.n,
      title: d.title,
      entries: d.lessons.flatMap((ref) => {
        const lesson = getLesson(ref.id, lang);
        if (!lesson) return [];
        return locations(lesson, lang).flatMap((loc) =>
          codeIn(loc.blocks)
            .filter((b) => b.kind === kind)
            .map((block, i) => ({ key: `${lesson.id}-${loc.where}-${i}`, lessonId: lesson.id, lessonTitle: lesson.title, day: d.n, where: loc.where, href: loc.href, block })),
        );
      }),
    }))
    .filter((g) => g.entries.length);
}

export function toolkitCount(kind: CodeKind, lang: Lang = "en"): number {
  return toolkitGroups(kind, lang).reduce((n, g) => n + g.entries.length, 0);
}
