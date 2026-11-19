"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Check, Circle } from "lucide-react";
import type { CriteriaPart, TaskPart } from "@/lib/content/model";
import { chooseCriterionOption, markLessonComplete, saveCriterion, saveStep } from "@/lib/actions/progress";
import type { CheckState } from "@/lib/work-rules";
import { Blocks } from "@/components/content/Blocks";
import { Inlines } from "@/components/content/Inlines";
import { SaveStatus, TaskPanel } from "@/components/lesson/TaskPanel";
import { useTicks } from "@/components/lesson/useTicks";
import { ProgressBadge } from "@/components/StatusBadges";
import { useT } from "@/lib/i18n/client";

type Props = {
  lessonId: string;
  slug: string;
  task: TaskPart;
  criteria: CriteriaPart;
  tickedSteps: string[];
  tickedCriteria: string[];
  canSave: boolean;
  lastSection: number;
  submitted: boolean;
  check: CheckState;
  complete: boolean;
  next: { id: string; slug: string; title: string } | null;
};

function Condition({ ok, label, detail, href, linkText }: { ok: boolean; label: string; detail: string; href?: string; linkText?: string }) {
  const t = useT();
  return (
    <li className={`gl-condition${ok ? " gl-condition--ok" : ""}`}>
      {ok ? <Check size={20} aria-hidden="true" focusable="false" /> : <Circle size={20} aria-hidden="true" focusable="false" />}
      <span>
        <strong>{t["ui.task.labelColon"](label)}</strong> {ok ? t["ui.task.done"] : t["ui.task.notYet"]}. <span className="ob-secondary">{detail}</span>
        {!ok && href && linkText ? (
          <>
            {" "}
            <Link className="gl-link" href={href}>
              {linkText}
            </Link>
          </>
        ) : null}
      </span>
    </li>
  );
}

export function TaskPageClient(props: Props) {
  const { lessonId, slug, task, criteria, canSave, submitted, check } = props;
  const router = useRouter();
  const t = useT();
  const steps = useTicks(props.tickedSteps, useCallback((id: string, checked: boolean) => saveStep(lessonId, id, checked), [lessonId]));
  const one = criteria.mode === "one";
  const crit = useTicks(
    props.tickedCriteria,
    useCallback((id: string, checked: boolean) => (one ? chooseCriterionOption(lessonId, id) : saveCriterion(lessonId, id, checked)), [lessonId, one]),
    one,
  );
  const [complete, setComplete] = useState(props.complete);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepsDone = task.steps.filter((s) => steps.ticked.has(s.id)).length;
  const chosen = criteria.items.filter((c) => crit.ticked.has(c.id)).length;
  const criteriaOk = one ? chosen === 1 : chosen === criteria.items.length;
  const conditions = {
    steps: stepsDone === task.steps.length,
    evidence: submitted,
    criteria: criteriaOk,
    check: check !== "pending",
  };
  const ready = Object.values(conditions).every(Boolean);
  const missing = [!conditions.steps && t["ui.task.missing.steps"], !conditions.evidence && t["ui.task.missing.evidence"], !conditions.criteria && (one ? t["ui.task.missing.choose"] : t["ui.task.missing.criteria"]), !conditions.check && t["ui.task.missing.check"]].filter((m): m is string => Boolean(m));

  async function onComplete() {
    setBusy(true);
    setError(null);
    const r = await markLessonComplete(lessonId).catch(() => ({ ok: false as const, error: t["ui.saveFailed"] }));
    setBusy(false);
    if (r.ok) {
      setComplete(true);
      router.refresh();
    } else setError(r.error);
  }

  return (
    <div className="gl-taskpage">
      <TaskPanel task={task} slug={slug} ticked={steps.ticked} onToggle={steps.toggle} message={steps.message} canSave={canSave} headingLevel={1} headingId="task-heading" />

      <section className="ob-card ob-card--outlined gl-selfcheck" aria-labelledby="selfcheck-heading">
        <h2 id="selfcheck-heading" className="ob-h t-section-heading">
          {t["ui.task.selfCheck"]}
        </h2>
        <div className="gl-prose gl-prose--compact">
          <Blocks blocks={criteria.intro} />
        </div>
        {one ? (
          <fieldset className="ob-fieldset gl-criteria">
            <legend>{t["ui.task.chooseStatement"]}</legend>
            {criteria.items.map((c) => {
              const first = c.children[0];
              return (
                <label key={c.id} className="ob-option gl-criterion-option">
                  <input type="radio" name="criteria-choice" checked={crit.ticked.has(c.id)} disabled={!canSave || complete} onChange={() => crit.toggle(c.id, true)} />
                  <span>{first?.type === "paragraph" ? <Inlines nodes={first.children} /> : c.id}</span>
                </label>
              );
            })}
          </fieldset>
        ) : (
          <ul className="gl-steps gl-criteria">
            {criteria.items.map((c) => {
              const first = c.children[0];
              const id = `criterion-${c.id}`;
              return (
                <li key={c.id} className="gl-step">
                  <div className="ob-check">
                    <input type="checkbox" id={id} checked={crit.ticked.has(c.id)} disabled={!canSave || complete} onChange={(e) => crit.toggle(c.id, e.target.checked)} />
                    <label htmlFor={id}>{first?.type === "paragraph" ? <Inlines nodes={first.children} /> : c.id}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <SaveStatus message={crit.message} />
        {criteria.after.length ? (
          <div className="gl-prose gl-prose--compact">
            <Blocks blocks={criteria.after} />
          </div>
        ) : null}
      </section>

      <section className="ob-card ob-card--outlined gl-complete" aria-labelledby="complete-heading">
        <h2 id="complete-heading" className="ob-h t-section-heading">
          {t["ui.task.markComplete"]}
        </h2>
        {complete ? (
          <div className="gl-complete__done" role="status">
            <p className="ob-p gl-inline-status">
              <ProgressBadge status="complete" />
              <span>{t["ui.task.youMarkedComplete"]}</span>
            </p>
            <p className="ob-p ob-secondary">{t["ui.task.separateFromReview"]}</p>
            {props.next ? (
              <p className="ob-p">
                <Link className="ob-btn ob-btn--primary" href={`/lesson/${props.next.slug}`}>
                  {t["ui.task.startLesson"](props.next.id)}
                </Link>
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <p className="ob-p">{t["ui.task.allFour"]}</p>
            <ul className="gl-conditions">
              <Condition ok={conditions.steps} label={t["ui.task.cond.steps"]} detail={t["ui.task.ticked"](stepsDone, task.steps.length)} />
              <Condition ok={conditions.evidence} label={t["ui.task.cond.evidence"]} detail={submitted ? t["ui.task.submitted"] : t["ui.task.nothingSubmitted"]} href={`/lesson/${slug}/submit`} linkText={t["ui.task.submitEvidence"]} />
              <Condition ok={conditions.criteria} label={t["ui.task.cond.selfCheck"]} detail={one ? (chosen ? t["ui.task.statementChosen"] : t["ui.task.noStatement"]) : t["ui.task.ticked"](chosen, criteria.items.length)} />
              <Condition
                ok={conditions.check}
                label={t["ui.task.cond.check"]}
                detail={check === "passed" ? t["ui.task.checkPassed"] : check === "unavailable" ? t["ui.task.checkSkipped"] : t["ui.task.checkPending"]}
                href={`/lesson/${slug}/check`}
                linkText={t["ui.task.goToCheck"]}
              />
            </ul>
            <div className="ob-card__actions">
              <button type="button" className="ob-btn ob-btn--primary ob-btn--large" disabled={!ready || !canSave || busy} aria-busy={busy || undefined} aria-describedby={ready ? undefined : "complete-why"} onClick={onComplete}>
                {busy ? t["ui.task.saving"] : t["ui.task.markComplete"]}
              </button>
            </div>
            {!ready ? (
              <p id="complete-why" className="ob-p ob-secondary">
                {t["ui.task.toFinish"](missing)}
              </p>
            ) : null}
            {error ? (
              <p className="ob-p ob-error-text" role="alert">
                <span className="ob-glyph" aria-hidden="true">!</span>
                {error}
              </p>
            ) : null}
          </>
        )}
      </section>

      <p className="ob-p">
        <Link className="ob-btn ob-btn--tertiary" href={`/lesson/${slug}#section-${props.lastSection}`}>
          {t["ui.task.backToLesson"]}
        </Link>
      </p>
    </div>
  );
}
