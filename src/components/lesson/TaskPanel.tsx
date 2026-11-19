"use client";

import Link from "next/link";
import type { TaskPart } from "@/lib/content/model";
import { Blocks } from "../content/Blocks";
import { Inlines } from "../content/Inlines";
import { useT } from "@/lib/i18n/client";
import type { SaveMessage } from "./useTicks";

/**
 * The lesson's practical exercise: the task as authored, one checkbox per numbered step.
 * Ticks save as they are made. Ticking steps never completes the lesson by itself.
 */
export function TaskPanel({
  task,
  slug,
  ticked,
  onToggle,
  message,
  canSave,
  headingLevel = 2,
  headingId,
}: {
  task: TaskPart;
  slug: string;
  ticked: Set<string>;
  onToggle: (id: string, checked: boolean) => void;
  message: SaveMessage;
  canSave: boolean;
  headingLevel?: 1 | 2;
  headingId: string;
}) {
  const t = useT();
  const H = headingLevel === 1 ? "h1" : "h2";
  const done = task.steps.filter((s) => ticked.has(s.id)).length;
  return (
    <section className="gl-task" aria-labelledby={headingId}>
      <div className="gl-task__head">
        <H id={headingId} className={`ob-h ${headingLevel === 1 ? "t-page-heading" : "t-section-heading"}`}>
          {t["ui.task.yourTask"]}
        </H>
        <p className="ob-p t-label-meta gl-task__count">
          {t["ui.task.stepsDone"](done, task.steps.length)}
        </p>
      </div>
      {task.heading ? (
        <p className="ob-p gl-task__title">
          <strong>
            <Inlines nodes={task.heading} />
          </strong>
        </p>
      ) : null}
      <div className="gl-prose gl-prose--compact">
        <Blocks blocks={task.before} />
      </div>
      {!canSave ? (
        <p className="ob-p ob-alert ob-alert--info gl-task__note">{t["ui.task.notSignedIn"]}</p>
      ) : null}
      <ol className="gl-steps">
        {task.steps.map((step, i) => {
          const [first, ...rest] = step.children;
          const label = first?.type === "paragraph" ? first.children : null;
          const id = `step-${step.id}`;
          return (
            <li key={step.id} className="gl-step">
              <div className="ob-check">
                <input type="checkbox" id={id} checked={ticked.has(step.id)} disabled={!canSave} onChange={(e) => onToggle(step.id, e.target.checked)} />
                <label htmlFor={id}>
                  <span className="gl-step__num">{i + 1}.</span> {label ? <Inlines nodes={label} /> : t["ui.task.step"](i + 1)}
                </label>
              </div>
              {(label ? rest : step.children).length ? (
                <div className="gl-prose gl-prose--compact gl-step__more">
                  <Blocks blocks={label ? rest : step.children} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      <SaveStatus message={message} />
      {task.after.length ? (
        <div className="gl-prose gl-prose--compact">
          <Blocks blocks={task.after} />
        </div>
      ) : null}
      <div className="ob-card__actions">
        <Link className="ob-btn ob-btn--secondary" href={`/lesson/${slug}/submit`}>
          {t["ui.task.submitEvidence"]}
        </Link>
      </div>
    </section>
  );
}

/** Confirmations are announced politely; errors are announced at once and stay visible. */
export function SaveStatus({ message }: { message: SaveMessage }) {
  return (
    <>
      <p className="ob-p t-label-meta gl-save" role="status">
        {message?.kind === "saved" ? message.text : null}
      </p>
      <p className="ob-p ob-error-text gl-save--error" role="alert">
        {message?.kind === "error" ? (
          <>
            <span className="ob-glyph" aria-hidden="true">!</span>
            {message.text}
          </>
        ) : null}
      </p>
    </>
  );
}
