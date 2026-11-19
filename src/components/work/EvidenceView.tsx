import { ExternalLink, Paperclip } from "lucide-react";
import type { Lesson } from "@/lib/content/model";
import type { Submission } from "@/lib/platform/work";
import { LOCALE, type Lang } from "@/lib/i18n/lang";
import { getLang, getT } from "@/lib/i18n/server";
import { Inlines } from "../content/Inlines";

const dateTime = (iso: string, lang: Lang = "en") => new Date(iso).toLocaleString(LOCALE[lang], { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }) + " UTC";
export { dateTime };

/**
 * One submitted version, read-only. `fileHref` decides where files are served from.
 * A server component (it takes a function prop), so it reads the language itself.
 */
export async function EvidenceView({ lesson, submission, fileHref }: { lesson: Lesson; submission: Submission; fileHref: (id: string) => string }) {
  const t = await getT();
  const lang = await getLang();
  return (
    <div className="gl-evidence-view">
      <p className="ob-p ob-secondary t-label-meta">
        {t["ui.evidence.versionLine"](submission.version, dateTime(submission.submittedAt, lang))}
        {submission.gitCommit ? t["ui.evidence.commitSuffix"](submission.gitCommit) : ""}
      </p>
      <ol className="gl-evidence-view__items">
        {submission.items.map((item) => {
          const expected = lesson.submission.items.find((i) => i.id === item.itemId);
          const first = expected?.children[0];
          return (
            <li key={item.itemId}>
              <p className="ob-p gl-evidence-view__label">{first?.type === "paragraph" ? <Inlines nodes={first.children} /> : t["ui.evidence.item"](item.itemId.slice(1))}</p>
              {item.kind === "text" ? <p className="ob-p gl-evidence-view__text">{item.text}</p> : null}
              {item.kind === "link" ? (
                <a className="gl-link" href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                  <ExternalLink className="gl-link__icon" size={20} aria-hidden="true" focusable="false" />
                  <span className="sr-only">{t["ui.opensInNewTab"]}</span>
                </a>
              ) : null}
              {item.kind === "file" ? (
                <a className="gl-link gl-filelink" href={fileHref(item.file.id)} target="_blank" rel="noopener noreferrer">
                  <Paperclip size={20} aria-hidden="true" focusable="false" />
                  {item.file.name}
                  <span className="sr-only">{t["ui.opensInNewTab"]}</span>
                </a>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
