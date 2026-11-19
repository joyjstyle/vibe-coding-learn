/**
 * Checks Vietnamese lesson files on their own: each must parse, carry the title from
 * content/vi/curriculum.json, and have the same structure as the English lesson.
 *
 * Run with: node scripts/check-vi-lesson.ts 1.1 1.2   (no ids: every file in content/vi/lessons)
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CurriculumSchema } from "../src/lib/content/curriculum-schema.ts";
import { parseLesson } from "../src/lib/content/parse.ts";
import type { Lesson } from "../src/lib/content/model.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const load = (dir: string) => CurriculumSchema.parse(JSON.parse(readFileSync(join(root, dir, "curriculum.json"), "utf8")));
const refs = (dir: string) => new Map(load(dir).units.flatMap((u) => u.lessons.map((l) => [l.id, { ...l, day: u.day }] as const)));
const enRefs = refs("content");
const viRefs = refs("content/vi");

const counts = (l: Lesson) => ({ sections: l.sections.length, steps: l.task.steps.length, evidence: l.submission.items.length, criteria: l.criteria.items.length, questions: l.knowledgeCheck.questions.length, objectives: l.objective.items.length, furtherReading: Boolean(l.furtherReading) });

let ids = process.argv.slice(2);
if (!ids.length) ids = readdirSync(join(root, "content/vi/lessons")).flatMap((f) => /^lesson-(\d+\.\d+)\.md$/.exec(f)?.[1] ?? []);
let failed = 0;
for (const id of ids) {
  try {
    const en = enRefs.get(id), vi = viRefs.get(id);
    if (!en || !vi) throw new Error("not in curriculum.json");
    const file = join(root, "content/vi", vi.file);
    if (!existsSync(file)) throw new Error(`missing ${file}`);
    const meta = (r: typeof en) => ({ id, slug: id.replace(".", "-"), title: r.title, day: r.day, order: r.order, estimatedMinutes: r.estimated_minutes });
    const enLesson = parseLesson(readFileSync(join(root, "content", en.file), "utf8"), meta(en));
    const viLesson = parseLesson(readFileSync(file, "utf8"), meta(vi));
    if (viLesson.title !== vi.title) throw new Error(`title "${viLesson.title}" should be "${vi.title}" (from content/vi/curriculum.json)`);
    const a = counts(enLesson), b = counts(viLesson);
    const diff = Object.keys(a).filter((k) => a[k as keyof typeof a] !== b[k as keyof typeof b]);
    if (diff.length) throw new Error(`structure differs from English: ${diff.map((k) => `${k} ${String(b[k as keyof typeof b])} (English ${String(a[k as keyof typeof a])})`).join(", ")}`);
    console.log(`ok  Lesson ${id}`);
  } catch (e) {
    failed++;
    console.log(`ERR Lesson ${id}: ${(e as Error).message}`);
  }
}
process.exit(failed ? 1 : 0);
