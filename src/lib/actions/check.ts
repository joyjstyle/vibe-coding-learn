"use server";

import { revalidatePath } from "next/cache";
import { lessonIdToSlug } from "@/lib/content/curriculum";
import { isPassed, loadKnowledgeCheck } from "@/lib/knowledge-checks";
import { getT } from "@/lib/i18n/server";
import { getLessonAccess } from "@/lib/lesson-access";
import { auth } from "@/lib/platform/auth";
import { emptyProgress, recordAnswer } from "@/lib/progress-rules";
import { progressStore } from "@/lib/platform/stores";

export type AnswerResult =
  | { ok: true; correct: boolean; explanation: string; passed: boolean }
  | { ok: false; error: string };

/** Marks one answer on the server; the browser never receives the correct option in advance. */
export async function checkAnswer(lessonId: string, questionId: string, optionId: string): Promise<AnswerResult> {
  const t = await getT();
  if (!/^\d+\.\d+$/.test(lessonId)) return { ok: false, error: t["lib.error.lessonMissing"] };
  const intern = await auth.getCurrentIntern();
  if (!intern) return { ok: false, error: t["lib.check.notSignedIn"] };
  const access = await getLessonAccess(lessonId);
  if (access.kind !== "open") return { ok: false, error: t["lib.error.lessonNotOpen"] };
  const check = await loadKnowledgeCheck(lessonId);
  if (!check) return { ok: false, error: t["lib.check.unavailable"] };
  const question = check.questions.find((q) => q.id === questionId);
  if (!question || !question.options.some((o) => o.id === optionId)) return { ok: false, error: t["lib.check.chooseAnswer"] };
  try {
    const saved = await progressStore.update(intern.id, lessonId, (p) => {
      const base = p ?? emptyProgress(lessonId);
      const answers = { ...(base.knowledgeCheck?.answers ?? {}), [questionId]: [...(base.knowledgeCheck?.answers[questionId] ?? []), optionId] };
      return recordAnswer(base, questionId, optionId, isPassed(check, answers), new Date().toISOString());
    });
    revalidatePath(`/lesson/${lessonIdToSlug(lessonId)}`, "layout");
    return { ok: true, correct: optionId === question.correctOptionId, explanation: question.explanation, passed: isPassed(check, saved.knowledgeCheck?.answers ?? {}) };
  } catch {
    return { ok: false, error: t["lib.check.saveFailed"] };
  }
}
