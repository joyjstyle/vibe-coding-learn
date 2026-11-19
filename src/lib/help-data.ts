/** What the Help drawer shows about the intern's position and how to reach the supervisor. */
import { getLesson } from "./content/curriculum";
import { getLang } from "./i18n/server";
import { getIdentity } from "./identity";
import { nextUp } from "./home";
import { type LessonProgress } from "./platform/progress";
import { getProgrammeView } from "./programme";
import { loadSupport } from "./toolkit-config";
import { progressStore } from "./platform/stores";

export type HelpData = {
  today: { n: number; total: number; title: string } | null;
  next: { id: string; slug: string; title: string; section: number | null; sectionTitle: string | null } | null;
  /** "not_open" before the first day opens; "all_done" when every open lesson is complete. */
  nextState: "lesson" | "not_open" | "all_done";
  support: { howToReach: string; channel: string | null } | null;
  setupProblems: { href: string; title: string } | null;
};

export async function getHelpData(): Promise<HelpData> {
  const [view, { intern }, lang] = await Promise.all([getProgrammeView(), getIdentity(), getLang()]);
  const progress = intern ? await progressStore.list(intern.id) : new Map<string, LessonProgress>();
  const up = nextUp(view, progress);
  const day = view.currentDay ? view.days.find((d) => d.n === view.currentDay)! : null;
  // Found by its English title; shown with the title in the learner's language.
  const setupEn = getLesson("1.2")?.sections.find((s) => /setup problems/i.test(s.title));
  const setup = setupEn ? (getLesson("1.2", lang)?.sections.find((s) => s.number === setupEn.number) ?? setupEn) : undefined;
  let next: HelpData["next"] = null;
  if (up.kind === "lesson") {
    const full = getLesson(up.lesson.id, lang);
    next = { id: up.lesson.id, slug: up.lesson.slug, title: up.lesson.title, section: up.section, sectionTitle: full?.sections.find((s) => s.number === up.section)?.title ?? null };
  }
  return {
    today: day ? { n: day.n, total: view.days.length, title: day.title } : null,
    next,
    nextState: up.kind,
    support: await loadSupport(),
    setupProblems: setup ? { href: `/lesson/1-2#section-${setup.number}`, title: setup.title } : null,
  };
}
