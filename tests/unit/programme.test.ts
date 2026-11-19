import { describe, expect, it } from "vitest";
import { buildProgrammeView, nextLesson } from "@/lib/programme";
import { allReviewPoints, dayGoal } from "@/lib/config";
import { lessons } from "@/lib/content/curriculum";
import type { LessonProgress } from "@/lib/platform/progress";

const dates = ["2026-11-16", "2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-23", "2026-11-24", "2026-11-25", "2026-11-26", "2026-11-27"];
const rec = (lessonId: string, status: LessonProgress["status"]): [string, LessonProgress] => [lessonId, { lessonId, status, lastSection: null, tickedSteps: [], tickedCriteria: [], completedAt: null }];

describe("programme view", () => {
  it("opens only Day 1 while no start date is set", () => {
    const v = buildProgrammeView("2026-11-18", null, new Map());
    expect(v.scheduleSet).toBe(false);
    expect(v.days[0]!.access).toBe("open");
    expect(v.days.slice(1).every((d) => d.access === "locked" && d.opensLabel === null)).toBe(true);
    expect(v.currentDay).toBe(1);
    expect(v.lessonCount).toBe(lessons.length);
  });

  it("opens days by date and labels the rest with their opening date", () => {
    const v = buildProgrammeView("2026-11-18", dates, new Map());
    expect(v.days.map((d) => d.access)).toEqual(["open", "open", "open", "locked", "locked", "locked", "locked", "locked", "locked", "locked"]);
    expect(v.days[3]!.opensLabel).toBe("Opens on 19 November");
    expect(v.currentDay).toBe(3);
    expect(v.days[0]!.lessons.every((l) => l.status === "not_started")).toBe(true);
    expect(v.days[5]!.lessons.every((l) => l.status === "locked")).toBe(true);
  });

  it("counts real progress and marks a fully complete day done", () => {
    const progress = new Map([rec("1.1", "complete"), rec("1.2", "complete"), rec("1.3", "complete"), rec("1.4", "complete"), rec("2.1", "in_progress")]);
    const v = buildProgrammeView("2026-11-18", dates, progress);
    expect(v.days[0]!.access).toBe("done");
    expect(v.completeCount).toBe(4);
    expect(v.days[1]!.lessons[0]!.status).toBe("in_progress");
    expect(nextLesson(v.days[1]!)?.id).toBe("2.1");
    expect(nextLesson(v.days[0]!)).toBeUndefined();
    expect(nextLesson(v.days[5]!)).toBeUndefined();
  });

  it("attaches the proposed review points to their lessons", () => {
    const v = buildProgrammeView("2026-11-18", dates, new Map());
    const points = v.days.flatMap((d) => d.lessons.filter((l) => l.reviewPoint).map((l) => l.id));
    expect(points).toEqual(["2.4", "3.4", "4.4", "5.4", "6.4", "7.4", "8.2", "9.4", "10.1", "10.3", "10.4"]);
    expect(allReviewPoints.every((r) => lessons.some((l) => l.id === r.lesson))).toBe(true);
  });

  it("has no day goals until they are supplied", () => {
    for (let n = 1; n <= 10; n++) expect(dayGoal(n)).toBeNull();
  });
});
