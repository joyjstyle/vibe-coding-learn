import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolkitArea, toolkitAreaLabel, toolkitAreas } from "@/lib/toolkit";
import { toolkitCount, toolkitGroups } from "@/lib/toolkit-index";
import { loadGlossary, loadProjectKit, termAnchor } from "@/lib/toolkit-config";
import { lessonIdToSlug } from "@/lib/content/curriculum";
import { PageHeader } from "@/components/PageHeader";
import { ToolkitList } from "@/components/toolkit/ToolkitList";
import { NotSupplied } from "@/components/toolkit/NotSupplied";
import { StatusesExplained } from "@/components/toolkit/StatusesExplained";
import Link from "next/link";
import { getLang, getT } from "@/lib/i18n/server";

type Props = { params: Promise<{ area: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return toolkitAreas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getToolkitArea((await params).area);
  const t = await getT();
  return { title: area ? t["pages.toolkit.metaTitle"](toolkitAreaLabel(area, await getLang())) : t["pages.notFoundTitle"] };
}

/** The four working templates the IA plan lists from the project's templates folder, not yet supplied. */
const WORKING_TEMPLATES = ["pages.toolkit.wt.task", "pages.toolkit.wt.qa", "pages.toolkit.wt.submission", "pages.toolkit.wt.register"] as const;

export default async function ToolkitAreaPage({ params }: Props) {
  const area = getToolkitArea((await params).area);
  if (!area) notFound();
  const t = await getT();
  const lang = await getLang();
  const label = toolkitAreaLabel(area, lang);
  // Vietnamese nouns do not change in the plural.
  const nouns = (en: string, vi: string) => (lang === "vi" ? { noun: vi, plural: vi } : { noun: en, plural: `${en}s` });

  switch (area.slug) {
    case "prompts": {
      const n = toolkitCount("prompt", lang);
      return (
        <>
          <PageHeader eyebrow={t["pages.toolkit.title"]} title={label} lead={t["pages.toolkit.promptsLead"](n)} />
          <ToolkitList groups={toolkitGroups("prompt", lang)} {...nouns("prompt", "prompt")} />
        </>
      );
    }
    case "commands": {
      const n = toolkitCount("command", lang);
      return (
        <>
          <PageHeader eyebrow={t["pages.toolkit.title"]} title={label} lead={t["pages.toolkit.commandsLead"](n)} />
          <ToolkitList groups={toolkitGroups("command", lang)} {...nouns("command", "lệnh")} />
        </>
      );
    }
    case "templates": {
      const n = toolkitCount("template", lang);
      return (
        <>
          <PageHeader eyebrow={t["pages.toolkit.title"]} title={label} lead={t["pages.toolkit.templatesLead"](n)} />
          <section className="gl-section" aria-labelledby="working-templates">
            <h2 id="working-templates" className="ob-h t-section-heading">
              {t["pages.toolkit.workingTemplates"]}
            </h2>
            <p className="ob-p">{t["pages.toolkit.workingTemplatesIntro"]}</p>
            <ul className="gl-bullets">
              {WORKING_TEMPLATES.map((k) => (
                <li key={k}>
                  {t[k]} <span className="ob-badge ob-badge--soon gl-inline-badge">{t["pages.toolkit.notYetSupplied"]}</span>
                </li>
              ))}
            </ul>
          </section>
          <ToolkitList groups={toolkitGroups("template", lang)} {...nouns("template", "mẫu")} />
        </>
      );
    }
    case "glossary": {
      const glossary = await loadGlossary();
      return (
        <>
          <PageHeader eyebrow={t["pages.toolkit.title"]} title={label} lead={t["pages.toolkit.glossaryLead"]} />
          {glossary ? (
            <dl className="gl-glossary">
              {[...glossary.terms]
                .sort((a, b) => a.term.localeCompare(b.term, "en-GB"))
                .map((term) => (
                  <div key={term.term} id={termAnchor(term.term)} className="gl-glossary__term">
                    <dt className="ob-h t-card-title">{term.term}</dt>
                    <dd className="ob-p">
                      {term.definition}
                      {term.lessons.length ? (
                        <span className="gl-glossary__lessons">
                          {" "}
                          {t["pages.toolkit.see"]}{" "}
                          {term.lessons.map((id, i) => (
                            <span key={id}>
                              {i ? ", " : ""}
                              <Link className="gl-link" href={`/lesson/${lessonIdToSlug(id)}`}>
                                {t["pages.lessonN"](id)}
                              </Link>
                            </span>
                          ))}
                          .
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
            </dl>
          ) : (
            <NotSupplied what={t["pages.toolkit.glossaryWhat"]} file="content/glossary.json" />
          )}
        </>
      );
    }
    case "project-kit": {
      const kit = await loadProjectKit();
      return (
        <>
          <PageHeader eyebrow={t["pages.toolkit.title"]} title={label} lead={t["pages.toolkit.projectKitLead"]} />
          {kit ? (
            <ul className="ob-grid gl-kit">
              {kit.items.map((it) => (
                <li key={it.url} className="ob-card ob-card--cyan">
                  <p className="ob-tk__kind ob-p">{it.format}{it.version ? t["pages.toolkit.versionSuffix"](String(it.version)) : ""}</p>
                  <h2 className="ob-card__title">{it.title}</h2>
                  {it.description ? <p className="ob-p">{it.description}</p> : null}
                  <a className="ob-link" href={it.url} target="_blank" rel="noopener noreferrer">
                    {t["pages.toolkit.openResource"]}<span className="sr-only">{t["pages.toolkit.opensNewTab"](it.title)}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <NotSupplied what={t["pages.toolkit.projectKitWhat"]} file="config/project-kit.json" />
          )}
        </>
      );
    }
    case "statuses":
      return (
        <>
          <PageHeader eyebrow={t["pages.toolkit.title"]} title={label} lead={t["pages.toolkit.statusesLead"]} />
          <StatusesExplained />
        </>
      );
  }
}
