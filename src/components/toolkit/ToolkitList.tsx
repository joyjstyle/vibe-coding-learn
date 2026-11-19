"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { ToolkitGroup } from "@/lib/toolkit-index";
import { useT } from "@/lib/i18n/client";
import { CodeCard } from "../content/CodeCard";

/** A searchable list of prompts, commands or templates, grouped by day, each linking back to its lesson. */
export function ToolkitList({ groups, noun, plural }: { groups: ToolkitGroup[]; noun: string; plural: string }) {
  const [query, setQuery] = useState("");
  const id = useId();
  const t = useT();
  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, entries: g.entries.filter((e) => !q || `${e.block.value} ${e.lessonTitle} ${e.where} lesson ${e.lessonId}`.toLowerCase().includes(q)) }))
        .filter((g) => g.entries.length),
    [groups, q],
  );
  const count = shown.reduce((n, g) => n + g.entries.length, 0);

  return (
    <div className="gl-toolkit-list">
      <div className="ob-field gl-search" role="search">
        <label className="ob-label" htmlFor={id}>
          {t["ui.toolkit.search"](plural)}
        </label>
        <input id={id} className="ob-input" type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-describedby={`${id}-count`} />
      </div>
      <p id={`${id}-count`} className="ob-p t-label-meta ob-secondary" role="status">
        {q ? t["ui.toolkit.matches"](count, count === 1 ? noun : plural, query.trim()) : null}
      </p>
      {q && !count ? (
        <p className="ob-p">
          {t["ui.toolkit.noMatches"](plural, query.trim())}{" "}
          <button type="button" className="ob-btn ob-btn--tertiary" onClick={() => setQuery("")}>
            {t["ui.clearSearch"]}
          </button>
        </p>
      ) : null}
      {shown.map((g) => (
        <section key={g.day} className="gl-section" aria-labelledby={`${id}-day-${g.day}`}>
          <h2 id={`${id}-day-${g.day}`} className="ob-h t-section-heading">
            {t["ui.toolkit.dayTitle"](g.day, g.title)}
          </h2>
          <ol className="gl-toolkit-entries">
            {g.entries.map((e) => (
              <li key={e.key} className="gl-toolkit-entry">
                <p className="ob-p gl-toolkit-entry__where">
                  <Link className="gl-link" href={e.href}>
                    {t["ui.lessonTitle"](e.lessonId, e.lessonTitle)}
                  </Link>{" "}
                  <span className="ob-secondary">· {e.where}</span>
                </p>
                <CodeCard block={e.block} />
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
