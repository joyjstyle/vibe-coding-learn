"use client";

import { Fragment } from "react";
import { useT } from "@/lib/i18n/client";
import { ExternalLink } from "lucide-react";
import type { Inline } from "@/lib/content/model";

const isExternal = (url: string) => /^https?:\/\//.test(url);

/** Renders lesson text exactly as authored. External links open in a new tab and say so. */
export function Inlines({ nodes }: { nodes: Inline[] }) {
  const t = useT();
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.type) {
          case "text":
            return <Fragment key={i}>{n.value}</Fragment>;
          case "strong":
            return <strong key={i}><Inlines nodes={n.children} /></strong>;
          case "emphasis":
            return <em key={i}><Inlines nodes={n.children} /></em>;
          case "delete":
            return <del key={i}><Inlines nodes={n.children} /></del>;
          case "inlineCode":
            return <code key={i} className="gl-inline-code">{n.value}</code>;
          case "break":
            return <br key={i} />;
          case "link":
            return isExternal(n.url) ? (
              <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" className="gl-link">
                <Inlines nodes={n.children} />
                <ExternalLink className="gl-link__icon" size={20} aria-hidden="true" focusable="false" />
                <span className="sr-only">{t["ui.opensInNewTab"]}</span>
              </a>
            ) : (
              <a key={i} href={n.url} className="gl-link">
                <Inlines nodes={n.children} />
              </a>
            );
        }
      })}
    </>
  );
}
