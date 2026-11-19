import { describe, expect, it } from "vitest";
import { days, getDayFromParam, getLessonBySlug, lessonIdToSlug, lessons, platform, slugToLessonId } from "@/lib/content/curriculum";

describe("curriculum", () => {
  it("names the platform from the content package", () => {
    expect(platform.name).toBe("VibeCode Academy");
    expect(platform.description).toBe("Clinic Genie Vibe Coding Intern Platform");
  });
  it("has the days and lessons the package lists, in order", () => {
    expect(days.map((d) => d.n)).toEqual(days.map((_, i) => i + 1));
    for (const d of days) expect(d.lessons.map((l) => l.order)).toEqual(d.lessons.map((_, i) => i + 1));
    expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
  });
  it("shows Unit 7's platform title, not its locked title", () => {
    expect(getDayFromParam("7")?.title).toBe("Forms and Interactive Features");
  });
  it("has every lesson available, since all 40 files exist", () => {
    for (const l of lessons) expect(l.available, l.id).toBe(true);
  });
  it("converts IDs and URL slugs both ways", () => {
    expect(lessonIdToSlug("10.4")).toBe("10-4");
    expect(slugToLessonId("10-4")).toBe("10.4");
    expect(slugToLessonId("4.2")).toBeNull();
    expect(getLessonBySlug("4-2")?.title).toBe("Planning Small Tasks with Clear Acceptance Criteria");
    expect(getLessonBySlug("11-1")).toBeUndefined();
  });
  it("accepts only plain day numbers", () => {
    expect(getDayFromParam("4")?.n).toBe(4);
    for (const bad of ["04", "4.0", "four", "0", "", "11"]) expect(getDayFromParam(bad), bad).toBeUndefined();
  });
});
