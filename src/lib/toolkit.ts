import type { Lang } from "./i18n/lang";
import { messages } from "./i18n/messages";

export const toolkitAreas = [
  { slug: "prompts", label: "Prompt library" },
  { slug: "commands", label: "Command sheet" },
  { slug: "templates", label: "Templates" },
  { slug: "glossary", label: "Glossary" },
  { slug: "project-kit", label: "Project kit" },
  { slug: "statuses", label: "Statuses explained" },
] as const;

export type ToolkitArea = (typeof toolkitAreas)[number];

export function getToolkitArea(slug: string): ToolkitArea | undefined {
  return toolkitAreas.find((a) => a.slug === slug);
}

/** A Toolkit area's label in the given language. */
export function toolkitAreaLabel(area: ToolkitArea, lang: Lang = "en"): string {
  return messages[lang][`lib.toolkit.${area.slug}`];
}
