import { mkdtempSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildContentModel } from "../../scripts/build-content.ts";
import { ContentError, lessonReferences, parseLesson, segmentPlaceholders } from "@/lib/content/parse";
import type { Block, Lesson } from "@/lib/content/model";

// ---------- All 40 locked lessons ----------

const model = buildContentModel("content");
const all = Object.values(model.lessons);

/** Counts fences straight from the raw files, independently of the parser. */
function rawFenceTags(file: string): string[] {
  const tags: string[] = [];
  let open = false;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = /^```(.*)$/.exec(line);
    if (!m) continue;
    if (!open) tags.push(m[1]!.trim());
    open = !open;
  }
  return tags;
}

describe("the 40 locked lessons", () => {
  it("all parse, and every listed lesson is available", () => {
    expect(all).toHaveLength(40);
    expect(model.days).toHaveLength(10);
    for (const d of model.days) expect(d.lessons.every((l) => l.available), `Day ${d.n}`).toBe(true);
  });

  it.each(all.map((l) => [l.id, l] as const))("Lesson %s has the full lesson structure", (_id, l: Lesson) => {
    expect(l.objective.items.length).toBeGreaterThan(0);
    expect(l.prerequisites.length).toBeGreaterThan(0);
    expect(l.requiredMaterials.length).toBeGreaterThan(0);
    expect(l.sections.map((s) => s.number)).toEqual(l.sections.map((_, i) => i + 1));
    const k = l.sections.length;
    expect([l.task.number, l.submission.number, l.criteria.number, l.knowledgeCheck.number].sort((a, b) => a - b)).toEqual([k + 1, k + 2, k + 3, k + 4]);
    if (l.furtherReading) expect(l.furtherReading.number).toBe(k + 5);
    expect(l.task.heading).not.toBeNull();
    expect(l.task.steps.length).toBeGreaterThan(0);
    expect(l.submission.items.length).toBeGreaterThan(0);
    expect(l.criteria.items.length).toBeGreaterThan(0);
    expect(l.knowledgeCheck.questions).toHaveLength(5);
  });

  it.each(all.map((l) => [l.id, l] as const))("Lesson %s keeps every fenced block, typed by its language tag", (_id, l: Lesson) => {
    const ref = model.days.flatMap((d) => d.lessons).find((x) => x.id === l.id)!;
    const tags = rawFenceTags(`content/lessons/lesson-${ref.id}.md`);
    const expected = { prompt: 0, command: 0, example: 0, template: 0, plain: 0 };
    for (const t of tags) {
      if (t === "text") expected.prompt++;
      else if (t === "bash") expected.command++;
      else if (["tsx", "ts", "css", "html"].includes(t)) expected.example++;
      else if (t === "markdown") expected.template++;
      else if (t === "") expected.plain++;
      else throw new Error(`unexpected tag ${t}`);
    }
    expect(l.codeCounts).toEqual(expected);
  });

  it("does not treat ## headings inside Lesson 3.3's templates as sections", () => {
    const l = model.lessons["3.3"]!;
    const titles = l.sections.map((s) => s.title);
    expect(titles).not.toContain("Purpose and audience");
    expect(titles).not.toContain("Scope");
    const templates = l.sections.flatMap((s) => s.blocks).filter((b): b is Extract<Block, { type: "code" }> => b.type === "code" && b.kind === "template");
    expect(templates.some((t) => t.value.includes("## Purpose and audience"))).toBe(true);
  });

  it("accepts plain bullets and - [ ] checklists as completion criteria", () => {
    expect(model.lessons["3.3"]!.criteria.checklist).toBe(true);
    expect(model.lessons["3.3"]!.criteria.items).toHaveLength(12);
    expect(model.lessons["4.2"]!.criteria.checklist).toBe(false);
  });

  it("marks Lesson 1.2's criteria as alternatives, and no other lesson's", () => {
    expect(all.filter((l) => l.criteria.mode === "one").map((l) => l.id)).toEqual(["1.2"]);
  });

  it("turns Official reference and Official references into Further reading", () => {
    expect(all.filter((l) => l.furtherReading).map((l) => l.id).sort()).toEqual(["1.2", "1.3", "1.4", "3.2"]);
    expect(model.lessons["1.2"]!.furtherReading!.title).toBe("Further reading");
  });

  it("keeps Your output only where the lesson has it", () => {
    expect(all.filter((l) => l.yourOutput).map((l) => l.id)).toEqual(["3.3"]);
  });

  it("reads lesson titles from the first line", () => {
    expect(model.lessons["4.2"]!.title).toBe("Planning Small Tasks with Clear Acceptance Criteria");
  });
});

// ---------- Placeholders and references ----------

describe("placeholders", () => {
  it("finds bracketed placeholders", () => {
    expect(segmentPlaceholders("Do this:\n\n[Insert task.]")).toEqual([{ text: "Do this:\n\n" }, { placeholder: "[Insert task.]" }]);
    expect(segmentPlaceholders("git push origin [branch-name]")).toEqual([{ text: "git push origin " }, { placeholder: "[branch-name]" }]);
    expect(segmentPlaceholders("| [Fill in] | [Fill in] |").filter((s) => "placeholder" in s)).toHaveLength(2);
  });
  it("ignores checkboxes, links and code brackets", () => {
    for (const s of ["- [ ] Item", "- [x] Done", "[Git status](https://git-scm.com)", 'devices["Pixel 7"]', 'meta[name="description"]', "toEqual([])"]) {
      expect(segmentPlaceholders(s).some((x) => "placeholder" in x), s).toBe(false);
    }
  });
  it("finds placeholders in prompts, commands and templates in the real lessons", () => {
    const blocks = all.flatMap((l) => l.sections.flatMap((s) => s.blocks)).filter((b): b is Extract<Block, { type: "code" }> => b.type === "code");
    for (const kind of ["prompt", "command", "template"] as const) expect(blocks.some((b) => b.kind === kind && b.hasPlaceholders), kind).toBe(true);
    expect(blocks.filter((b) => b.kind === "example").every((b) => b.segments === undefined)).toBe(true);
  });
});

describe("lesson references", () => {
  it("reads single and listed lesson IDs", () => {
    expect(lessonReferences("Complete Lesson 4.1 and have a task ready.")).toEqual(["4.1"]);
    expect(lessonReferences("Complete Lessons 3.1 and 3.2, and Lesson 1.3.")).toEqual(["3.1", "3.2", "1.3"]);
    expect(lessonReferences("Complete Lessons 5.1 to 5.3.")).toEqual(["5.1", "5.3"]);
  });
});

// ---------- Unrecognised structures fail ----------

const meta = { id: "9.9", slug: "9-9", title: "Fixture", day: 9, order: 9, estimatedMinutes: 60 };

const valid = `# Lesson 9.9: Fixture

### Learning objective

By the end of this lesson, you should be able to:

- Do one thing.

**Prerequisites:** Complete Lesson 9.8.

**Required materials:** A laptop.

## 1. Teach

Some prose.

## 2. Practical exercise

**Task: Do the thing.**

1. First step.
2. Second step.

## 3. Expected submission

Submit:

- One item.

## 4. Completion criteria

The lesson is complete when:

- It is done.

## 5. Knowledge check

1. Why?
2. How?
`;

const swap = (from: string, to: string) => {
  if (!valid.includes(from)) throw new Error(`fixture does not contain ${from}`);
  return valid.replace(from, to);
};

describe("the parser", () => {
  it("parses the valid fixture", () => {
    const l = parseLesson(valid, meta);
    expect(l.task.steps.map((s) => s.id)).toEqual(["s1", "s2"]);
    expect(l.prerequisiteLessons).toEqual(["9.8"]);
  });

  const broken: [string, string][] = [
    ["a raw HTML block", swap("Some prose.", "<div>Some prose.</div>")],
    ["an image", swap("Some prose.", "![A picture](a.png)")],
    ["an unknown fence language", swap("Some prose.", "```python\nprint(1)\n```")],
    ["text after the fence tag", swap("Some prose.", '```ts title="x"\nconst a = 1;\n```')],
    ["a footnote", swap("Some prose.", "Some prose.[^1]\n\n[^1]: A note.")],
    ["a missing Prerequisites line", swap("**Prerequisites:** Complete Lesson 9.8.\n\n", "")],
    ["an unknown labelled paragraph", swap("**Required materials:** A laptop.", "**Required materials:** A laptop.\n\n**Time:** One hour.")],
    ["an unnumbered section heading", swap("## 1. Teach", "## Teach")],
    ["a numbering gap", swap("## 2. Practical exercise", "## 3. Practical exercise")],
    ["a missing task-side section", swap("## 3. Expected submission\n\nSubmit:\n\n- One item.\n\n", "").replace("## 4.", "## 3.").replace("## 5.", "## 4.")],
    ["a teaching section after the task sections", valid + "\n## 6. Extra teaching\n\nMore prose.\n"],
    ["two step lists in the practical exercise", swap("2. Second step.", "2. Second step.\n\nThen:\n\n1. Another list.")],
    ["no step list in the practical exercise", swap("1. First step.\n2. Second step.", "Just prose.")],
    ["mixed checklist and plain criteria", swap("- It is done.", "- [ ] It is done.\n- And this.")],
    ["a pre-ticked criterion", swap("- It is done.", "- [x] It is done.")],
    ["content after the knowledge check questions", valid + "\nA closing note.\n"],
    ["a second level 1 heading", swap("Some prose.", "# Another title")],
    ["a title for a different lesson", swap("# Lesson 9.9: Fixture", "# Lesson 9.8: Fixture")],
    ["a malformed title line", swap("# Lesson 9.9: Fixture", "# Fixture")],
  ];

  it.each(broken)("fails on %s", (_name, md) => {
    expect(() => parseLesson(md, meta)).toThrow(ContentError);
  });

  it("names the lesson and line in its error", () => {
    expect(() => parseLesson(swap("Some prose.", "<div>Some prose.</div>"), meta)).toThrow(/^Lesson 9\.9, line \d+: unrecognised block "html"/);
  });

  it("reads an 'either' criteria list as alternatives", () => {
    expect(parseLesson(swap("The lesson is complete when:", "The lesson is complete when either:"), meta).criteria.mode).toBe("one");
  });
});

describe("a lesson whose file is missing", () => {
  it("stays in the programme as unavailable instead of failing", () => {
    const dir = mkdtempSync(join(tmpdir(), "genie-content-"));
    mkdirSync(join(dir, "lessons"));
    writeFileSync(join(dir, "lessons", "lesson-1.1.md"), valid.replace("9.9", "1.1").replace("9.8", "1.0"));
    writeFileSync(
      join(dir, "curriculum.json"),
      JSON.stringify({
        platform_name: "VibeCode Academy",
        platform_description: "Fixture",
        units: [
          {
            unit: 1,
            day: 1,
            title: "Day one",
            estimated_minutes: 120,
            lessons: [
              { id: "1.1", order: 1, title: "Fixture", file: "lessons/lesson-1.1.md", estimated_minutes: 60 },
              { id: "1.2", order: 2, title: "Not written yet", file: "lessons/lesson-1.2.md", estimated_minutes: 60 },
            ],
          },
        ],
      }),
    );
    const m = buildContentModel(dir);
    expect(m.days[0]!.lessons.map((l) => [l.id, l.available])).toEqual([["1.1", true], ["1.2", false]]);
    expect(m.lessons["1.2"]).toBeUndefined();
  });
});
