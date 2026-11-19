"use client";

import { Check, FilePen, FileCheck, Circle, CircleCheck, CircleDashed, Clock, Hourglass, Lock, LockOpen, Minus, PenLine, type LucideIcon } from "lucide-react";
import type { DayAccess, LessonProgressStatus } from "@/lib/schedule";
import { useT } from "@/lib/i18n/client";
import type { Messages } from "@/lib/i18n/messages";

type Key = { [K in keyof Messages]: Messages[K] extends string ? K : never }[keyof Messages];

/**
 * Three kinds of status, kept apart (docs/DECISIONS.md, decision 3). Each pairs an icon with
 * a word; colour only supports the word. They differ by fill, outline and icon:
 *   Lesson progress  filled pill, round icons
 *   Review decision  outlined tag
 *   Day access       icon and word, no container
 */

const iconProps = { size: 20, "aria-hidden": true, focusable: false } as const;

function Badge({ className, icon: Icon, label }: { className: string; icon: LucideIcon; label: string }) {
  return (
    <span className={className}>
      <Icon {...iconProps} />
      {label}
    </span>
  );
}

const PROGRESS: Record<LessonProgressStatus, { label: Key; icon: LucideIcon; variant: string }> = {
  locked: { label: "ui.status.locked", icon: Lock, variant: "" },
  not_started: { label: "ui.status.notStarted", icon: Circle, variant: "" },
  in_progress: { label: "ui.status.inProgress", icon: CircleDashed, variant: "ob-badge--progress" },
  complete: { label: "ui.status.complete", icon: CircleCheck, variant: "ob-badge--complete" },
};

export function ProgressBadge({ status }: { status: LessonProgressStatus }) {
  const t = useT();
  const p = PROGRESS[status];
  return <Badge className={`ob-badge gl-badge ${p.variant}`} icon={p.icon} label={t[p.label]} />;
}

export type ReviewDecision = "not_submitted" | "awaiting_review" | "changes_requested" | "accepted";

const REVIEW: Record<ReviewDecision, { label: Key; icon: LucideIcon; variant: string }> = {
  not_submitted: { label: "ui.status.notSubmitted", icon: Minus, variant: "" },
  awaiting_review: { label: "ui.status.awaitingReview", icon: Hourglass, variant: "ob-badge--awaiting" },
  changes_requested: { label: "ui.status.changesRequested", icon: PenLine, variant: "ob-badge--changes" },
  accepted: { label: "ui.status.accepted", icon: Check, variant: "ob-badge--accepted" },
};

export function ReviewTag({ decision }: { decision: ReviewDecision }) {
  const t = useT();
  const r = REVIEW[decision];
  return <Badge className={`ob-badge gl-badge gl-tag ${r.variant}`} icon={r.icon} label={t[r.label]} />;
}

const DAY: Record<DayAccess, { label: Key; icon: LucideIcon }> = {
  locked: { label: "ui.status.locked", icon: Lock },
  open: { label: "ui.status.open", icon: LockOpen },
  done: { label: "ui.status.done", icon: Check },
};

export function DayChip({ access }: { access: DayAccess }) {
  const t = useT();
  const d = DAY[access];
  return <Badge className={`ob-badge gl-badge gl-chip gl-chip--${access}`} icon={d.icon} label={t[d.label]} />;
}

/** Availability, a separate dimension: a lesson whose file is missing. Never "Locked". */
export function ComingSoonBadge() {
  const t = useT();
  return <Badge className="ob-badge gl-badge ob-badge--soon" icon={Clock} label={t["ui.status.comingSoon"]} />;
}

/** Submission (decision 6): whether evidence has been sent. Separate from the review decision. */
export function SubmissionBadge({ state }: { state: "draft" | "submitted" }) {
  const t = useT();
  return state === "submitted" ? (
    <Badge className="ob-badge gl-badge ob-badge--submitted" icon={FileCheck} label={t["ui.status.submitted"]} />
  ) : (
    <Badge className="ob-badge gl-badge ob-badge--draft" icon={FilePen} label={t["ui.status.draft"]} />
  );
}
