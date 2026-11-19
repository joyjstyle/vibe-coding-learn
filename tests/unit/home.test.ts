import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { lessonsBehind, nextUp } from "@/lib/home";
import { buildProgrammeView } from "@/lib/programme";
import type { LessonProgress } from "@/lib/platform/progress";
import { LocalJsonSettingsStore } from "@/lib/platform/settings";
import { toolkitCount, toolkitGroups } from "@/lib/toolkit-index";
import { GlossarySchema, ProjectKitSchema, SupportSchema, termAnchor } from "@/lib/toolkit-config";
import { searchToolkit } from "@/lib/actions/search";

const dates = ["2026-11-16", "2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-23", "2026-11-24", "2026-11-25", "2026-11-26", "2026-11-27"];
const rec = (lessonId: string, status: LessonProgress["status"], lastSection: number | null = null): [string, LessonProgress] => [lessonId, { lessonId, status, lastSection, tickedSteps: [], tickedCriteria: [], completedAt: null }];

describe("Home: next lesson and lessons behind", () => {
  it("offers Day 1 before the start date is set", () => {
    const view = buildProgrammeView("2026-11-18", null, new Map());
    expect(nextUp(view, new Map())).toMatchObject({ kind: "lesson" });
    expect(lessonsBehind(view)).toBe(0);
  });
  it("starts with Lesson 1.1 on the first day, with nobody behind", () => {
    const view = buildProgrammeView("2026-11-16", dates, new Map());
    const up = nextUp(view, new Map());
    expect(up).toMatchObject({ kind: "lesson", action: "start", lesson: { id: "1.1" } });
    expect(lessonsBehind(view)).toBe(0);
  });
  it("continues the earliest unfinished lesson at its saved section, and counts earlier days as behind", () => {
    const progress = new Map([rec("1.1", "complete"), rec("1.2", "in_progress", 4)]);
    const view = buildProgrammeView("2026-11-18", dates, progress);
    expect(nextUp(view, progress)).toMatchObject({ kind: "lesson", action: "continue", section: 4, lesson: { id: "1.2" } });
    // Day 3 is today: Day 1 has 3 unfinished, Day 2 has 4. Today's lessons are not behind.
    expect(lessonsBehind(view)).toBe(7);
  });
  it("says all done when every open lesson is complete", () => {
    const progress = new Map(["1.1", "1.2", "1.3", "1.4"].map((id) => rec(id, "complete")));
    const view = buildProgrammeView("2026-11-16", dates, progress);
    expect(nextUp(view, progress)).toEqual({ kind: "all_done" });
  });
});

describe("settings store", () => {
  it("starts with defaults and saves changes", async () => {
    const store = new LocalJsonSettingsStore(mkdtempSync(join(tmpdir(), "genie-settings-")));
    expect(await store.get("dev-intern")).toEqual({ name: null, textSize: "default", reducedMotion: false, welcomeCompletedAt: null });
    await store.update("dev-intern", (s) => ({ ...s, name: "Ada Lovelace", textSize: "larger" }));
    expect(await store.get("dev-intern")).toMatchObject({ name: "Ada Lovelace", textSize: "larger" });
    await expect(store.update("dev-intern", (s) => ({ ...s, textSize: "huge" as "large" }))).rejects.toThrow();
  });
});

describe("Toolkit counts come from the lessons", () => {
  const raw = readdirSync("content/lessons").map((f) => readFileSync(join("content/lessons", f), "utf8"));
  const fences = (tag: string) => raw.reduce((n, s) => n + (s.match(new RegExp("^```" + tag + "$", "gm"))?.length ?? 0), 0);
  it("matches the fenced blocks in the lesson files", () => {
    expect(toolkitCount("prompt")).toBe(fences("text"));
    expect(toolkitCount("command")).toBe(fences("bash"));
    expect(toolkitCount("template")).toBe(fences("markdown"));
  });
  it("groups by day and links each entry back to its lesson", () => {
    const groups = toolkitGroups("prompt");
    expect(groups.map((g) => g.day)).toEqual([...groups.map((g) => g.day)].sort((a, b) => a - b));
    for (const e of groups.flatMap((g) => g.entries)) expect(e.href).toMatch(/^\/lesson\/\d+-\d+(#section-\d+|\/task|\/submit|\/check)$/);
  });
});

describe("files not yet supplied", () => {
  it("define schemas for the glossary, project kit and support details", () => {
    expect(GlossarySchema.safeParse({ terms: [{ term: "IA", definition: "Information architecture." }] }).success).toBe(true);
    expect(GlossarySchema.safeParse({ terms: [] }).success).toBe(false);
    expect(ProjectKitSchema.safeParse({ items: [{ title: "Brief", format: "PDF", url: "https://example.com/brief.pdf" }] }).success).toBe(true);
    expect(ProjectKitSchema.safeParse({ items: [{ title: "Brief", format: "PDF", url: "not a url" }] }).success).toBe(false);
    expect(SupportSchema.safeParse({ howToReach: "Message your supervisor in the team channel." }).success).toBe(true);
    expect(termAnchor("Information architecture (IA)")).toBe("information-architecture-ia");
  });
});

describe("Toolkit search", () => {
  it("finds lessons and prompts by every word, titles first", async () => {
    const r = await searchToolkit("sitemap");
    expect(r[0]!.title).toBe("Lesson 2.3: Planning the Sitemap, User Journeys and Page Sections");
    expect(r.some((x) => x.area === "Prompt")).toBe(true);
    expect(await searchToolkit("   ")).toEqual([]);
    expect(await searchToolkit("zzzz-no-such-thing")).toEqual([]);
  });
});
