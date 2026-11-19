"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useId, useState } from "react";
import { searchToolkit, type SearchResult } from "@/lib/actions/search";
import type { HelpData } from "@/lib/help-data";
import { useT } from "@/lib/i18n/client";
import { messages } from "@/lib/i18n/messages";
import { LessonNavContext } from "../lesson/LessonContext";

/** Search areas whose snippet is code, in either language. */
const codeAreas = new Set(
  Object.values(messages).flatMap((m) => [m["lib.search.area.prompt"], m["lib.search.area.command"], m["lib.search.area.template"]]),
);

/**
 * Help: search the Toolkit, where you are, statuses, setup problems and how to reach your
 * supervisor. Used in the drawer on every page and on /help. No support chat and no
 * response-time promises.
 */
export function HelpContent({ data, onNavigate, headingLevel = 3 }: { data: HelpData; onNavigate?: () => void; headingLevel?: 2 | 3 }) {
  const id = useId();
  const t = useT();
  const H = headingLevel === 2 ? "h2" : "h3";
  const pathname = usePathname();
  const lessonNav = useContext(LessonNavContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [searched, setSearched] = useState("");
  const [busy, setBusy] = useState(false);
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");

  // Where am I: the lesson on screen when there is one, otherwise today's position.
  const onLesson = lessonNav ? { ...lessonNav.outline, section: lessonNav.section } : null;
  const sectionTitle = onLesson?.section ? onLesson.sections.find((s) => s.number === onLesson.section)?.title : undefined;

  function locationText() {
    const url = typeof window === "undefined" ? "" : window.location.href;
    if (onLesson) {
      const parts = [`VibeCode Academy · ${t["ui.dayLessonTitle"](onLesson.day, onLesson.lessonId, onLesson.title)}`];
      if (onLesson.section && sectionTitle) parts.push(t["ui.help.locSection"](onLesson.section, sectionTitle));
      else if (pathname.endsWith("/task")) parts.push(t["ui.task.yourTask"]);
      else if (pathname.endsWith("/submit")) parts.push(t["ui.submit.title"]);
      else if (pathname.endsWith("/check")) parts.push(t["ui.check.title"]);
      return `${parts.join(" · ")}\n${url}`;
    }
    return `VibeCode Academy · ${typeof document === "undefined" ? "" : document.title}\n${url}`;
  }

  async function search() {
    const q = query.trim();
    if (!q) return;
    setBusy(true);
    try {
      setResults(await searchToolkit(q));
    } catch {
      setResults([]);
    }
    setSearched(q);
    setBusy(false);
  }

  async function copyLocation() {
    try {
      await navigator.clipboard.writeText(locationText());
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  }

  return (
    <div className="gl-help">
      <section aria-labelledby={`${id}-search`}>
        <H id={`${id}-search`}>{t["ui.help.searchTitle"]}</H>
        <form
          role="search"
          className="gl-help__search"
          onSubmit={(e) => {
            e.preventDefault();
            void search();
          }}
        >
          <label className="ob-label" htmlFor={`${id}-q`}>
            {t["ui.help.searchLabel"]}
          </label>
          <div className="gl-help__searchrow">
            <input id={`${id}-q`} className="ob-input" type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit" className="ob-btn ob-btn--secondary" disabled={busy} aria-busy={busy || undefined}>
              {t["ui.help.search"]}
            </button>
          </div>
        </form>
        <div role="status" className="gl-help__results">
          {results ? (
            results.length ? (
              <>
                <p className="ob-p t-label-meta ob-secondary">
                  {t["ui.help.results"](results.length, searched)}
                </p>
                <ul className="gl-help__list">
                  {results.map((r) => (
                    <li key={`${r.href}-${r.title}`}>
                      <Link className="gl-link" href={r.href} onClick={onNavigate}>
                        {r.title}
                      </Link>
                      <span className="t-label-meta ob-secondary gl-help__area">{r.area}</span>
                      {r.snippet ? <span className={`gl-help__snippet${codeAreas.has(r.area) ? " gl-help__snippet--code" : ""}`}>{r.snippet}</span> : null}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="ob-p">
                {t["ui.help.noResults"](searched)}{" "}
                <button
                  type="button"
                  className="ob-btn ob-btn--tertiary"
                  onClick={() => {
                    setQuery("");
                    setResults(null);
                  }}
                >
                  {t["ui.clearSearch"]}
                </button>
              </p>
            )
          ) : null}
        </div>
      </section>

      <section aria-labelledby={`${id}-where`}>
        <H id={`${id}-where`}>{t["ui.help.whereTitle"]}</H>
        {onLesson ? (
          <p className="ob-p">
            {t["ui.dayLessonTitle"](onLesson.day, onLesson.lessonId, onLesson.title)}
            {onLesson.section && sectionTitle ? t["ui.help.sectionOf"](onLesson.section, onLesson.sections.length, sectionTitle) : ""}.
          </p>
        ) : data.today ? (
          <p className="ob-p">
            {t["ui.help.today"](data.today.n, data.today.total, data.today.title)}
          </p>
        ) : (
          <p className="ob-p">{t["ui.help.noDay"]}</p>
        )}
        {data.next ? (
          <p className="ob-p">
            {t["ui.help.next"]}{" "}
            <Link className="gl-link" href={`/lesson/${data.next.slug}`} onClick={onNavigate}>
              {t["ui.lessonTitle"](data.next.id, data.next.title)}
            </Link>
            {data.next.section && data.next.sectionTitle ? t["ui.help.nextSection"](data.next.section, data.next.sectionTitle) : ""}.
          </p>
        ) : data.nextState === "all_done" ? (
          <p className="ob-p">{t["ui.help.allDone"]}</p>
        ) : null}
      </section>

      <section aria-labelledby={`${id}-statuses`}>
        <H id={`${id}-statuses`}>{t["ui.help.statusesTitle"]}</H>
        <p className="ob-p">
          {t["ui.help.statusesBody"]}{" "}
          <Link className="gl-link" href="/toolkit/statuses" onClick={onNavigate}>
            {t["ui.help.statusesLink"]}
          </Link>
        </p>
      </section>

      <section aria-labelledby={`${id}-setup`}>
        <H id={`${id}-setup`}>{t["ui.help.setupTitle"]}</H>
        {data.setupProblems ? (
          <p className="ob-p">
            {t["ui.help.setupCovered"]}{" "}
            <Link className="gl-link" href={data.setupProblems.href} onClick={onNavigate}>
              {data.setupProblems.title}
            </Link>
          </p>
        ) : null}
      </section>

      <section aria-labelledby={`${id}-contact`}>
        <H id={`${id}-contact`}>{t["ui.help.contactTitle"]}</H>
        {data.support ? (
          <>
            <p className="ob-p gl-prewrap">{data.support.howToReach}</p>
            {data.support.channel ? <p className="ob-p">{data.support.channel}</p> : null}
          </>
        ) : (
          <p className="ob-p">{t["ui.help.noContact"]}</p>
        )}
        <p className="ob-p ob-secondary">{t["ui.help.copyWhere"]}</p>
        <div>
          <button type="button" className="ob-btn ob-btn--secondary" onClick={copyLocation}>
            {onLesson ? t["ui.help.copyLesson"] : t["ui.help.copyPage"]}
          </button>
        </div>
        <p className="ob-p t-label-meta gl-save" role="status">
          {copy === "copied" ? t["ui.copied"] : copy === "failed" ? t["ui.help.copyFailed"] : null}
        </p>
      </section>

      <section aria-labelledby={`${id}-tour`}>
        <H id={`${id}-tour`}>{t["ui.help.newTitle"]}</H>
        <p className="ob-p">
          <Link className="gl-link" href="/welcome" onClick={onNavigate}>
            {t["ui.help.replayTour"]}
          </Link>
        </p>
      </section>
    </div>
  );
}
