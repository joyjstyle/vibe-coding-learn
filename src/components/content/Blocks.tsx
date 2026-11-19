"use client";

import type { Block, TableCell } from "@/lib/content/model";
import { useT } from "@/lib/i18n/client";
import { inlineText } from "@/lib/content/text";
import { CodeCard } from "./CodeCard";
import { Inlines } from "./Inlines";

/** Lesson tables: a normal table from 720px; below that each row becomes a stacked card. */
function ResponsiveTable({ block }: { block: Extract<Block, { type: "table" }> }) {
  const t = useT();
  const labels = block.header.map((h: TableCell) => inlineText(h).trim());
  return (
    <div className="gl-table" role="region" aria-label={t["ui.table"]} tabIndex={0}>
      <table role="table">
        <thead role="rowgroup">
          <tr role="row">
            {block.header.map((h, i) => (
              <th key={i} role="columnheader" scope="col" style={{ textAlign: block.align[i] ?? undefined }}>
                <Inlines nodes={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {block.rows.map((row, r) => (
            <tr key={r} role="row">
              {row.map((cell, i) => (
                <td key={i} role="cell" data-label={labels[i] || undefined} style={{ textAlign: block.align[i] ?? undefined }}>
                  <Inlines nodes={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Renders authored lesson blocks. Prose stays on the page surface, never in separate cards. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return (
              <p key={i}>
                <Inlines nodes={b.children} />
              </p>
            );
          case "heading": {
            const H = `h${b.depth}` as "h3" | "h4" | "h5" | "h6";
            return (
              <H key={i} className={b.depth === 3 ? "ob-h t-lesson-subsection" : "ob-h"}>
                <Inlines nodes={b.children} />
              </H>
            );
          }
          case "list": {
            const items = b.items.map((li, j) => (
              <li key={j}>
                {li.children.length === 1 && li.children[0]!.type === "paragraph" ? <Inlines nodes={li.children[0]!.children} /> : <Blocks blocks={li.children} />}
              </li>
            ));
            return b.ordered ? (
              <ol key={i} start={b.start && b.start !== 1 ? b.start : undefined}>
                {items}
              </ol>
            ) : (
              <ul key={i}>{items}</ul>
            );
          }
          case "blockquote":
            return (
              <blockquote key={i}>
                <Blocks blocks={b.children} />
              </blockquote>
            );
          case "table":
            return <ResponsiveTable key={i} block={b} />;
          case "code":
            return <CodeCard key={i} block={b} />;
          case "thematicBreak":
            return <hr key={i} />;
        }
      })}
    </>
  );
}
