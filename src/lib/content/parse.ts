/**
 * Parses one locked lesson file into the typed model. Strict by design: any structure it
 * does not recognise throws a ContentError naming the lesson and line, so a change to the
 * content package fails the build and the 40-lesson test instead of rendering wrongly.
 *
 * Runs at build time (scripts/build-content.ts) and in tests. Plain erasable TypeScript, so
 * Node can run it directly.
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import type { Nodes, PhrasingContent, Root, RootContent } from "mdast";
import type {
  Block,
  CheckItem,
  CodeBlock,
  CodeCounts,
  CodeKind,
  CriteriaPart,
  Inline,
  KnowledgeCheckPart,
  Lesson,
  Section,
  Segment,
  SubmissionPart,
  TaskPart,
} from "./model.ts";
import { inlineText } from "./text.ts";

export class ContentError extends Error {
  constructor(lessonId: string, message: string, line?: number) {
    super(`Lesson ${lessonId}${line ? `, line ${line}` : ""}: ${message}`);
    this.name = "ContentError";
  }
}

export type LessonMeta = { id: string; slug: string; title: string; day: number; order: number; estimatedMinutes: number };

/** Sections moved to the task side, by the exact heading text in the lesson files. */
export const TASK_SECTIONS = ["Practical exercise", "Expected submission", "Completion criteria", "Knowledge check"] as const;
/** Headings that become Further reading. Lessons 1.2 and 1.4 use the plural. */
export const FURTHER_READING_SECTIONS = ["Official reference", "Official references"] as const;

const CODE_KINDS: Record<string, CodeKind> = {
  text: "prompt",
  bash: "command",
  tsx: "example",
  ts: "example",
  css: "example",
  html: "example",
  markdown: "template",
};

// ---------- Placeholders ----------

/**
 * Square-bracketed text a learner must replace, such as [Insert task.], [Fill in] or
 * [branch-name]. Not placeholders: checkboxes ([ ], [x]), Markdown links ([text](url)),
 * quoted strings and attribute selectors (["Pixel 7"], [name="description"]).
 */
const PLACEHOLDER = /\[(?![ xX]?\])([^[\]\n"'=]+)\](?!\()/g;

export function segmentPlaceholders(value: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of value.matchAll(PLACEHOLDER)) {
    const start = m.index ?? 0;
    if (start > last) out.push({ text: value.slice(last, start) });
    out.push({ placeholder: m[0] });
    last = start + m[0].length;
  }
  if (last < value.length) out.push({ text: value.slice(last) });
  return out;
}

// ---------- Converters ----------

type Ctx = { id: string };

const lineOf = (node: Nodes) => node.position?.start.line;

function toInlines(nodes: PhrasingContent[], ctx: Ctx): Inline[] {
  return nodes.map((n): Inline => {
    switch (n.type) {
      case "text":
        return { type: "text", value: n.value };
      case "strong":
        return { type: "strong", children: toInlines(n.children, ctx) };
      case "emphasis":
        return { type: "emphasis", children: toInlines(n.children, ctx) };
      case "delete":
        return { type: "delete", children: toInlines(n.children, ctx) };
      case "inlineCode":
        return { type: "inlineCode", value: n.value };
      case "link":
        return { type: "link", url: n.url, children: toInlines(n.children, ctx) };
      case "break":
        return { type: "break" };
      default:
        throw new ContentError(ctx.id, `unrecognised inline content "${n.type}"`, lineOf(n));
    }
  });
}

function toCode(node: Extract<RootContent, { type: "code" }>, ctx: Ctx): CodeBlock {
  const lang = node.lang ?? null;
  if (node.meta) throw new ContentError(ctx.id, `unrecognised text after the fence's language tag: "${node.meta}"`, lineOf(node));
  const kind: CodeKind | undefined = lang === null ? "plain" : CODE_KINDS[lang];
  if (!kind) throw new ContentError(ctx.id, `unrecognised code block language "${lang}"`, lineOf(node));
  const block: CodeBlock = { type: "code", kind, lang, value: node.value };
  if (kind === "prompt" || kind === "command" || kind === "template") {
    block.segments = segmentPlaceholders(node.value);
    block.hasPlaceholders = block.segments.some((s) => "placeholder" in s);
  }
  return block;
}

function toBlocks(nodes: RootContent[], ctx: Ctx): Block[] {
  return nodes.map((n): Block => {
    switch (n.type) {
      case "paragraph":
        return { type: "paragraph", children: toInlines(n.children, ctx) };
      case "heading":
        if (n.depth < 3) throw new ContentError(ctx.id, `unexpected level ${n.depth} heading inside a section`, lineOf(n));
        return { type: "heading", depth: n.depth as 3 | 4 | 5 | 6, children: toInlines(n.children, ctx) };
      case "list":
        return {
          type: "list",
          ordered: Boolean(n.ordered),
          start: n.ordered ? (n.start ?? 1) : null,
          items: n.children.map((li) => ({ checked: li.checked ?? null, children: toBlocks(li.children, ctx) })),
        };
      case "blockquote":
        return { type: "blockquote", children: toBlocks(n.children, ctx) };
      case "table": {
        const [head, ...rows] = n.children;
        if (!head) throw new ContentError(ctx.id, "table without a header row", lineOf(n));
        return {
          type: "table",
          align: (n.align ?? []).map((a) => a ?? null),
          header: head.children.map((c) => toInlines(c.children, ctx)),
          rows: rows.map((r) => r.children.map((c) => toInlines(c.children, ctx))),
        };
      }
      case "code":
        return toCode(n, ctx);
      case "thematicBreak":
        return { type: "thematicBreak" };
      default:
        throw new ContentError(ctx.id, `unrecognised block "${n.type}"`, lineOf(n));
    }
  });
}

// ---------- Text helpers ----------

export { inlineText };

function phrasingText(nodes: PhrasingContent[]): string {
  return nodes.map((n) => ("value" in n ? n.value : "children" in n ? phrasingText(n.children as PhrasingContent[]) : "")).join("");
}

/**
 * Vietnamese lessons (content/vi) may use these headings and labels in place of the English
 * ones; each maps to the English name the rest of the parser expects.
 */
export const VI_ALIASES: Record<string, string> = {
  "Mục tiêu bài học": "Learning objective",
  "Bài tập thực hành": "Practical exercise",
  "Sản phẩm cần nộp": "Expected submission",
  "Tiêu chí hoàn thành": "Completion criteria",
  "Kiểm tra kiến thức": "Knowledge check",
  "Tài liệu tham khảo chính thức": "Official references",
  "Điều kiện tiên quyết:": "Prerequisites:",
  "Tài liệu cần chuẩn bị:": "Required materials:",
  "Kết quả của bạn:": "Your output:",
};
const canon = (text: string) => VI_ALIASES[text] ?? text;

/** Lesson IDs named after "Lesson" or "Lessons" (or Vietnamese "Bài"), such as "Lessons 4.1 and 4.2". */
export function lessonReferences(text: string): string[] {
  const ids: string[] = [];
  for (const m of text.matchAll(/(?:\bLessons?|(?<![\p{L}])Bài)\s+(\d+\.\d+(?:(?:\s*,\s*|\s+(?:and|or|to|và|hoặc|đến)\s+)\d+\.\d+)*)/gu)) {
    for (const id of m[1]!.match(/\d+\.\d+/g) ?? []) if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

// ---------- Lesson structure ----------

type RawSection = { number: number; title: string; nodes: RootContent[]; line?: number };

const PREAMBLE_FIELDS = { "Prerequisites:": "prerequisites", "Required materials:": "requiredMaterials", "Your output:": "yourOutput" } as const;

/** "**Label:** text" becomes the text after the label, without its leading space. */
function labelledParagraph(node: Extract<RootContent, { type: "paragraph" }>, ctx: Ctx): { label: string; content: Inline[] } | null {
  const [first, ...rest] = node.children;
  if (!first || first.type !== "strong") return null;
  const label = phrasingText(first.children).trim();
  const content = toInlines(rest, ctx);
  const head = content[0];
  if (head?.type === "text") {
    const trimmed = head.value.replace(/^\s+/, "");
    if (trimmed) content[0] = { type: "text", value: trimmed };
    else content.shift();
  }
  return { label, content };
}

function splitAroundOne(nodes: RootContent[], match: (n: RootContent) => boolean, ctx: Ctx, what: string, line?: number) {
  const idx = nodes.flatMap((n, i) => (match(n) ? [i] : []));
  if (idx.length !== 1) throw new ContentError(ctx.id, `expected exactly one ${what}, found ${idx.length}`, line);
  const i = idx[0]!;
  return { before: nodes.slice(0, i), list: nodes[i] as Extract<RootContent, { type: "list" }>, after: nodes.slice(i + 1) };
}

function checkItems(list: Extract<RootContent, { type: "list" }>, prefix: string, ctx: Ctx): CheckItem[] {
  return list.children.map((li, i) => ({ id: `${prefix}${i + 1}`, children: toBlocks(li.children, ctx) }));
}

function parseTask(s: RawSection, ctx: Ctx): TaskPart {
  let nodes = s.nodes;
  let heading: Inline[] | null = null;
  const first = nodes[0];
  if (first?.type === "paragraph" && first.children.length === 1 && first.children[0]!.type === "strong") {
    const text = phrasingText(first.children[0]!.children);
    if (/^(Task|Nhiệm vụ):/.test(text)) {
      heading = toInlines(first.children[0]!.children, ctx);
      nodes = nodes.slice(1);
    }
  }
  const { before, list, after } = splitAroundOne(nodes, (n) => n.type === "list" && Boolean(n.ordered), ctx, "numbered list of task steps", s.line);
  return { number: s.number, heading, before: toBlocks(before, ctx), steps: checkItems(list, "s", ctx), after: toBlocks(after, ctx) };
}

function parseSubmission(s: RawSection, ctx: Ctx): SubmissionPart {
  const { before, list, after } = splitAroundOne(s.nodes, (n) => n.type === "list" && !n.ordered, ctx, "bulleted list of evidence items", s.line);
  return { number: s.number, intro: toBlocks(before, ctx), items: checkItems(list, "e", ctx), after: toBlocks(after, ctx) };
}

function parseCriteria(s: RawSection, ctx: Ctx): CriteriaPart {
  const { before, list, after } = splitAroundOne(s.nodes, (n) => n.type === "list" && !n.ordered, ctx, "bulleted list of completion criteria", s.line);
  const checks = list.children.map((li) => li.checked ?? null);
  const checklist = checks.some((c) => c !== null);
  if (checklist && checks.some((c) => c === null)) throw new ContentError(ctx.id, "completion criteria mix checklist and plain bullets", lineOf(list));
  if (checks.some((c) => c === true)) throw new ContentError(ctx.id, "a completion criterion is pre-ticked in the file", lineOf(list));
  const intro = toBlocks(before, ctx);
  const lastIntro = intro[intro.length - 1];
  const either = lastIntro?.type === "paragraph" && /(\beither|một trong các điều sau):\s*$/.test(inlineText(lastIntro.children));
  return { number: s.number, intro, mode: either ? "one" : "all", checklist, items: checkItems(list, "c", ctx), after: toBlocks(after, ctx) };
}

function parseKnowledgeCheck(s: RawSection, ctx: Ctx): KnowledgeCheckPart {
  const { before, list, after } = splitAroundOne(s.nodes, (n) => n.type === "list" && Boolean(n.ordered), ctx, "numbered list of knowledge check questions", s.line);
  if (after.length) throw new ContentError(ctx.id, "unrecognised content after the knowledge check questions", lineOf(after[0]!));
  return {
    number: s.number,
    intro: toBlocks(before, ctx),
    questions: list.children.map((li, i) => ({ id: `q${i + 1}`, children: toBlocks(li.children, ctx) })),
  };
}

function countCode(blocks: Block[], counts: CodeCounts) {
  for (const b of blocks) {
    if (b.type === "code") counts[b.kind] += 1;
    else if (b.type === "list") for (const li of b.items) countCode(li.children, counts);
    else if (b.type === "blockquote") countCode(b.children, counts);
  }
}

export function parseLesson(markdown: string, meta: LessonMeta): Lesson {
  const ctx: Ctx = { id: meta.id };
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
  const [h1, ...rest] = tree.children;

  // Title line: "# Lesson X.Y: Title"
  if (!h1 || h1.type !== "heading" || h1.depth !== 1) throw new ContentError(ctx.id, "the first line is not a level 1 heading", h1 && lineOf(h1));
  const titleMatch = /^(?:Lesson|Bài) (\d+\.\d+): (.+)$/.exec(phrasingText(h1.children).trim());
  if (!titleMatch) throw new ContentError(ctx.id, 'the first line does not read "# Lesson X.Y: Title"', lineOf(h1));
  if (titleMatch[1] !== meta.id) throw new ContentError(ctx.id, `the file is headed Lesson ${titleMatch[1]}`, lineOf(h1));
  const title = titleMatch[2]!.trim();

  // Split into preamble and numbered sections.
  const preamble: RootContent[] = [];
  const raw: RawSection[] = [];
  for (const node of rest) {
    if (node.type === "heading" && node.depth <= 2) {
      const m = node.depth === 2 ? /^(\d+)\. (.+)$/.exec(phrasingText(node.children).trim()) : null;
      if (!m) throw new ContentError(ctx.id, `unrecognised heading "${phrasingText(node.children)}"`, lineOf(node));
      raw.push({ number: Number(m[1]), title: canon(m[2]!.trim()), nodes: [], line: lineOf(node) });
    } else if (raw.length) raw[raw.length - 1]!.nodes.push(node);
    else preamble.push(node);
  }
  raw.forEach((s, i) => {
    if (s.number !== i + 1) throw new ContentError(ctx.id, `section numbered ${s.number} where ${i + 1} was expected`, s.line);
  });

  // Preamble: learning objective, then labelled paragraphs.
  const objHead = preamble[0];
  if (!objHead || objHead.type !== "heading" || objHead.depth !== 3 || canon(phrasingText(objHead.children).trim()) !== "Learning objective") {
    throw new ContentError(ctx.id, 'expected "### Learning objective" after the title', objHead && lineOf(objHead));
  }
  let i = 1;
  let objIntro: Inline[] = [];
  if (preamble[i]?.type === "paragraph") objIntro = toInlines((preamble[i++] as Extract<RootContent, { type: "paragraph" }>).children, ctx);
  const objList = preamble[i++];
  if (!objList || objList.type !== "list" || objList.ordered) throw new ContentError(ctx.id, "the learning objective is not followed by a bulleted list", objList && lineOf(objList));
  const objectiveItems = objList.children.map((li) => {
    const [p, ...more] = li.children;
    if (!p || p.type !== "paragraph" || more.length) throw new ContentError(ctx.id, "a learning objective item is not a single line", lineOf(li));
    return toInlines(p.children, ctx);
  });

  const fields: Partial<Record<(typeof PREAMBLE_FIELDS)[keyof typeof PREAMBLE_FIELDS], Inline[]>> = {};
  for (const node of preamble.slice(i)) {
    const lp = node.type === "paragraph" ? labelledParagraph(node, ctx) : null;
    const key = lp ? PREAMBLE_FIELDS[canon(lp.label) as keyof typeof PREAMBLE_FIELDS] : undefined;
    if (!lp || !key) throw new ContentError(ctx.id, "unrecognised content before section 1", lineOf(node));
    if (fields[key]) throw new ContentError(ctx.id, `"${lp.label}" appears twice`, lineOf(node));
    fields[key] = lp.content;
  }
  if (!fields.prerequisites) throw new ContentError(ctx.id, 'missing "**Prerequisites:**"');
  if (!fields.requiredMaterials) throw new ContentError(ctx.id, 'missing "**Required materials:**"');

  // Sections: teaching sections, then the four task-side sections, then optional further reading.
  const sections: Section[] = [];
  const taskSide = new Map<string, RawSection>();
  let further: RawSection | null = null;
  for (const s of raw) {
    const isTask = (TASK_SECTIONS as readonly string[]).includes(s.title);
    const isFurther = (FURTHER_READING_SECTIONS as readonly string[]).includes(s.title);
    if (isTask) {
      if (taskSide.has(s.title)) throw new ContentError(ctx.id, `"${s.title}" appears twice`, s.line);
      if (further) throw new ContentError(ctx.id, `"${s.title}" comes after Further reading`, s.line);
      taskSide.set(s.title, s);
    } else if (isFurther) {
      if (further) throw new ContentError(ctx.id, "more than one official reference section", s.line);
      further = s;
    } else {
      if (taskSide.size || further) throw new ContentError(ctx.id, `teaching section "${s.title}" comes after the task sections`, s.line);
      sections.push({ number: s.number, title: s.title, blocks: toBlocks(s.nodes, ctx) });
    }
  }
  for (const name of TASK_SECTIONS) if (!taskSide.has(name)) throw new ContentError(ctx.id, `missing the "${name}" section`);
  if (!sections.length) throw new ContentError(ctx.id, "no teaching sections");

  const lesson: Lesson = {
    id: meta.id,
    slug: meta.slug,
    title,
    day: meta.day,
    order: meta.order,
    estimatedMinutes: meta.estimatedMinutes,
    objective: { intro: objIntro, items: objectiveItems },
    prerequisites: fields.prerequisites,
    requiredMaterials: fields.requiredMaterials,
    yourOutput: fields.yourOutput ?? null,
    prerequisiteLessons: lessonReferences(inlineText(fields.prerequisites)).filter((id) => id !== meta.id),
    sections,
    task: parseTask(taskSide.get("Practical exercise")!, ctx),
    submission: parseSubmission(taskSide.get("Expected submission")!, ctx),
    criteria: parseCriteria(taskSide.get("Completion criteria")!, ctx),
    knowledgeCheck: parseKnowledgeCheck(taskSide.get("Knowledge check")!, ctx),
    furtherReading: further ? { number: further.number, title: "Further reading", blocks: toBlocks(further.nodes, ctx) } : null,
    codeCounts: { prompt: 0, command: 0, example: 0, template: 0, plain: 0 },
  };

  const all: Block[] = [
    ...sections.flatMap((s) => s.blocks),
    ...lesson.task.before,
    ...lesson.task.steps.flatMap((s) => s.children),
    ...lesson.task.after,
    ...lesson.submission.intro,
    ...lesson.submission.items.flatMap((s) => s.children),
    ...lesson.submission.after,
    ...lesson.criteria.intro,
    ...lesson.criteria.items.flatMap((s) => s.children),
    ...lesson.criteria.after,
    ...lesson.knowledgeCheck.intro,
    ...lesson.knowledgeCheck.questions.flatMap((q) => q.children),
    ...(lesson.furtherReading?.blocks ?? []),
  ];
  countCode(all, lesson.codeCounts);
  return lesson;
}
