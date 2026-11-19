"use server";

import { contentFor, getLesson } from "@/lib/content/curriculum";
import type { Lang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { toolkitAreaLabel, toolkitAreas } from "@/lib/toolkit";
import { toolkitGroups } from "@/lib/toolkit-index";
import { loadGlossary, termAnchor } from "@/lib/toolkit-config";

export type SearchResult = { area: string; title: string; snippet: string; href: string };
type Entry = SearchResult & { haystack: string };

const cache: Partial<Record<Lang, Entry[]>> = {};

async function index(lang: Lang): Promise<Entry[]> {
  const cached = cache[lang];
  if (cached) return cached;
  const t = messages[lang];
  const entries: Entry[] = [];
  for (const a of toolkitAreas) {
    const label = toolkitAreaLabel(a, lang);
    entries.push({ area: t["lib.search.area.toolkit"], title: label, snippet: "", href: `/toolkit/${a.slug}`, haystack: label });
  }
  for (const d of contentFor(lang).days) {
    for (const ref of d.lessons) {
      const l = getLesson(ref.id, lang);
      const sections = l ? l.sections.map((s) => s.title).join(" · ") : "";
      entries.push({ area: t["lib.search.area.lesson"](d.n), title: t["lib.search.lessonTitle"](ref.id, ref.title), snippet: sections.slice(0, 160), href: `/lesson/${ref.slug}`, haystack: `${ref.id} ${ref.title} ${sections}` });
    }
  }
  for (const [kind, area] of [["prompt", t["lib.search.area.prompt"]], ["command", t["lib.search.area.command"]], ["template", t["lib.search.area.template"]]] as const) {
    for (const g of toolkitGroups(kind, lang)) {
      for (const e of g.entries) {
        const first = e.block.value.split("\n").find((x) => x.trim()) ?? "";
        entries.push({ area, title: t["lib.search.entryTitle"](e.lessonId, e.where), snippet: first.slice(0, 160), href: e.href, haystack: `${e.block.value} ${e.lessonTitle} ${e.where}` });
      }
    }
  }
  const glossary = await loadGlossary();
  for (const term of glossary?.terms ?? []) entries.push({ area: t["lib.search.area.glossary"], title: term.term, snippet: term.definition.slice(0, 160), href: `/toolkit/glossary#${termAnchor(term.term)}`, haystack: `${term.term} ${term.definition}` });
  const built = entries.map((e) => ({ ...e, haystack: e.haystack.toLowerCase() }));
  cache[lang] = built;
  return built;
}

/** The request's language from the cookie; English outside a request (unit tests). */
async function requestLang(): Promise<Lang> {
  try {
    const { getLang } = await import("@/lib/i18n/server");
    return await getLang();
  } catch {
    return "en";
  }
}

/**
 * Up to ten matches; every word of the query must appear. Titles that match rank first.
 * Results are in the language given, or the request's language when none is given.
 */
export async function searchToolkit(query: string, lang?: Lang): Promise<SearchResult[]> {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 8);
  if (!words.length || query.length > 200) return [];
  const all = await index(lang === "vi" || lang === "en" ? lang : await requestLang());
  return all
    .filter((e) => words.every((w) => e.haystack.includes(w)))
    .map((e) => ({ e, score: words.filter((w) => e.title.toLowerCase().includes(w)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ e }) => ({ area: e.area, title: e.title, snippet: e.snippet, href: e.href }));
}
