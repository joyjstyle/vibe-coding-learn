"use client";

import { useEffect, useRef, useState } from "react";
import { Code, FileText, MessageSquareText, SquareTerminal, type LucideIcon } from "lucide-react";
import type { CodeBlock } from "@/lib/content/model";
import { useT } from "@/lib/i18n/client";
import type { Messages } from "@/lib/i18n/messages";

const LANG_NAMES: Record<string, string> = { tsx: "TSX", ts: "TypeScript", css: "CSS", html: "HTML" };

type CardKind = { label: string; icon: LucideIcon; copy: string; noun: string; afterPlaceholder?: string };

function kindOf(block: CodeBlock, t: Messages): CardKind {
  switch (block.kind) {
    case "prompt":
      return { label: t["ui.code.prompt.label"], icon: MessageSquareText, copy: t["ui.code.prompt.copy"], noun: t["ui.code.prompt.noun"], afterPlaceholder: t["ui.code.afterSending"] };
    case "command":
      return { label: t["ui.code.command.label"], icon: SquareTerminal, copy: t["ui.code.command.copy"], noun: t["ui.code.command.noun"], afterPlaceholder: t["ui.code.afterRunning"] };
    case "template":
      return { label: t["ui.code.template.label"], icon: FileText, copy: t["ui.code.template.copy"], noun: t["ui.code.template.noun"], afterPlaceholder: t["ui.code.afterSending"] };
    case "example":
      return { label: t["ui.code.example.label"](LANG_NAMES[block.lang ?? ""] ?? block.lang ?? ""), icon: Code, copy: t["ui.code.copy"], noun: t["ui.code.noun"] };
    default:
      return { label: t["ui.code.label"], icon: Code, copy: t["ui.code.copy"], noun: t["ui.code.noun"] };
  }
}

type CopyState = "idle" | "copied" | "failed";

/**
 * The design system's CodePanel for prompts, commands, templates and code examples.
 * Copy never runs anything. "Copied" appears only after the clipboard write succeeds;
 * otherwise the learner is told to select the text, which always stays selectable.
 */
export function CodeCard({ block }: { block: CodeBlock }) {
  const t = useT();
  const kind = kindOf(block, t);
  const Icon = kind.icon;
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(block.value);
      setState("copied");
    } catch {
      setState("failed");
    }
    timer.current = setTimeout(() => setState("idle"), 8000);
  }

  const wraps = block.kind === "prompt" || block.kind === "template" || block.kind === "plain";
  return (
    <figure className={`gl-code gl-code--${block.kind}`}>
      <div className="ob-code" data-surface="dark">
        <div className="ob-code__head">
          <figcaption className="ob-code__lang gl-code__label">
            <Icon size={20} aria-hidden="true" focusable="false" />
            {kind.label}
          </figcaption>
          <button type="button" className="ob-btn ob-btn--on-dark" onClick={copy}>
            {kind.copy}
          </button>
        </div>
        {block.hasPlaceholders ? <p className="ob-p gl-code__note">{t["ui.code.placeholders"]}</p> : null}
        <pre
          className={wraps ? "gl-code__pre gl-code__pre--wrap" : "gl-code__pre"}
          {...(wraps ? {} : { tabIndex: 0, role: "region", "aria-label": t["ui.code.scrollable"](kind.label) })}
        >
          <code>
            {block.segments
              ? block.segments.map((s, i) => ("placeholder" in s ? <mark key={i} className="gl-ph">{s.placeholder}</mark> : <span key={i}>{s.text}</span>))
              : block.value}
          </code>
        </pre>
      </div>
      <p className="ob-p t-label-meta gl-code__status" role="status">
        {state === "copied" ? (block.hasPlaceholders && kind.afterPlaceholder ? t["ui.code.copiedThen"](kind.afterPlaceholder) : t["ui.copied"]) : null}
        {state === "failed" ? t["ui.code.copyFailed"](kind.noun) : null}
      </p>
    </figure>
  );
}
