import type { Lang } from "./i18n/lang";
import { messages } from "./i18n/messages";

/** The four main destinations, in the fixed order the design system and IA plan require. */
export const mainNav = [
  { label: "Home", labelKey: "lib.nav.home", href: "/home", section: "/home" },
  { label: "Syllabus", labelKey: "lib.nav.syllabus", href: "/syllabus", section: "/syllabus" },
  { label: "My work", labelKey: "lib.nav.work", href: "/work", section: "/work" },
  { label: "Toolkit", labelKey: "lib.nav.toolkit", href: "/toolkit/prompts", section: "/toolkit" },
] as const;

export type MainNavItem = (typeof mainNav)[number];

/** A main item's label in the given language. */
export function navLabel(item: MainNavItem, lang: Lang = "en"): string {
  return messages[lang][item.labelKey];
}

/** Day pages belong to the Syllabus, so the Syllabus item stays marked while on one. */
const sectionAliases: Record<string, string> = { "/day": "/syllabus" };

/**
 * How a main item relates to the current path: "page" when it is the page itself,
 * "true" when the path is inside its section, false otherwise.
 */
export function navCurrent(section: string, href: string, pathname: string): "page" | "true" | false {
  if (pathname === href) return "page";
  const first = "/" + (pathname.split("/")[1] ?? "");
  const owner = sectionAliases[first] ?? first;
  return owner === section ? "true" : false;
}
