/**
 * Parses the locked package in content/ into the typed content model and writes it to
 * src/generated/content.json. Fails on any lesson structure the parser does not recognise.
 * A lesson whose file is missing is kept in the programme as unavailable ("Coming soon").
 *
 * Run with: node scripts/build-content.ts
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CurriculumSchema } from "../src/lib/content/curriculum-schema.ts";
import { parseLesson } from "../src/lib/content/parse.ts";
import type { ContentModel, Lesson } from "../src/lib/content/model.ts";
import { parseKnowledgeCheck } from "../src/lib/knowledge-checks.ts";

export function lessonSlug(id: string): string {
  return id.replace(".", "-");
}

/**
 * Builds the model from a content folder holding curriculum.json and the lesson files it lists.
 * With `fallback` (the English model), a lesson whose file is missing here uses the English
 * lesson instead of becoming "Coming soon". The Vietnamese build (content/vi) uses this.
 */
export function buildContentModel(contentDir: string, fallback?: ContentModel): ContentModel {
  const curriculum = CurriculumSchema.parse(JSON.parse(readFileSync(join(contentDir, "curriculum.json"), "utf8")));
  const lessons: Record<string, Lesson> = {};
  const seen = new Set<string>();

  const days = [...curriculum.units]
    .sort((a, b) => a.day - b.day)
    .map((unit) => {
      const lessonSummaries = [...unit.lessons]
        .sort((a, b) => a.order - b.order)
        .map((ref) => {
          if (seen.has(ref.id)) throw new Error(`curriculum.json lists Lesson ${ref.id} twice`);
          seen.add(ref.id);
          const meta = { id: ref.id, slug: lessonSlug(ref.id), title: ref.title, day: unit.day, order: ref.order, estimatedMinutes: ref.estimated_minutes };
          const path = join(contentDir, ref.file);
          if (!existsSync(path)) {
            const en = fallback?.lessons[ref.id];
            if (en) {
              lessons[ref.id] = en;
              return { ...meta, available: true, objectiveItems: en.objective.items, requiredMaterials: en.requiredMaterials };
            }
            return { ...meta, available: false, objectiveItems: [], requiredMaterials: [] };
          }
          const lesson = parseLesson(readFileSync(path, "utf8"), meta);
          if (lesson.title !== ref.title) throw new Error(`Lesson ${ref.id}: the file's title "${lesson.title}" differs from curriculum.json "${ref.title}"`);
          lessons[ref.id] = lesson;
          return { ...meta, available: true, objectiveItems: lesson.objective.items, requiredMaterials: lesson.requiredMaterials };
        });
      return { n: unit.day, title: unit.title, estimatedMinutes: unit.estimated_minutes, lessons: lessonSummaries };
    });

  days.forEach((d, i) => {
    if (d.n !== i + 1) throw new Error(`curriculum.json has Day ${d.n} where Day ${i + 1} was expected`);
  });

  validateKnowledgeChecks(join(contentDir, "knowledge-checks"), new Set(seen));
  return { platform: { name: curriculum.platform_name, description: curriculum.platform_description }, days, lessons };
}

/** Fails the build on any malformed multiple-choice check, so a bad file never reaches an intern. */
export function validateKnowledgeChecks(dir: string, lessonIds: Set<string>): number {
  if (!existsSync(dir)) return 0;
  let count = 0;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".json")) continue;
    const m = /^lesson-(\d+\.\d+)\.json$/.exec(name);
    if (!m) throw new Error(`knowledge-checks/${name}: expected a name like lesson-4.2.json`);
    if (!lessonIds.has(m[1]!)) throw new Error(`knowledge-checks/${name}: no Lesson ${m[1]} in curriculum.json`);
    try {
      parseKnowledgeCheck(JSON.parse(readFileSync(join(dir, name), "utf8")), m[1]!);
    } catch (e) {
      throw new Error(`knowledge-checks/${name}: ${(e as Error).message}`);
    }
    count++;
  }
  return count;
}

/** The Vietnamese programme must match the English one: same days, lessons, order and minutes. */
export function checkSameProgramme(en: ContentModel, vi: ContentModel) {
  const shape = (m: ContentModel) => JSON.stringify(m.days.map((d) => [d.n, d.estimatedMinutes, d.lessons.map((l) => [l.id, l.slug, l.order, l.estimatedMinutes])]));
  if (shape(en) !== shape(vi)) throw new Error("content/vi/curriculum.json does not match content/curriculum.json (days, lesson ids, order or minutes differ)");
  for (const [id, l] of Object.entries(vi.lessons)) {
    const e = en.lessons[id]!;
    const counts = (x: typeof l) => [x.sections.length, x.task.steps.length, x.submission.items.length, x.criteria.items.length, x.knowledgeCheck.questions.length].join(",");
    if (counts(l) !== counts(e)) throw new Error(`Lesson ${id}: the Vietnamese file has a different structure from the English one (sections, steps, evidence, criteria, questions: ${counts(l)} vs ${counts(e)})`);
  }
}

function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const model = buildContentModel(join(root, "content"));
  const out = join(root, "src/generated");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "content.json"), JSON.stringify(model));
  const available = model.days.flatMap((d) => d.lessons).filter((l) => l.available).length;
  const total = model.days.flatMap((d) => d.lessons).length;
  console.log(`Content model written to src/generated/content.json: ${model.days.length} days, ${available} of ${total} lessons available.`);

  // Vietnamese: same programme, translated titles and lessons; untranslated lessons stay English.
  const viDir = join(root, "content/vi");
  const vi = existsSync(join(viDir, "curriculum.json")) ? buildContentModel(viDir, model) : model;
  checkSameProgramme(model, vi);
  writeFileSync(join(out, "content.vi.json"), JSON.stringify(vi));
  const translated = existsSync(join(viDir, "lessons")) ? readdirSync(join(viDir, "lessons")).filter((f) => f.endsWith(".md")).length : 0;
  console.log(`Vietnamese content written to src/generated/content.vi.json: ${translated} of ${total} lessons translated.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
