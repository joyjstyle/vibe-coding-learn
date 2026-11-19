/**
 * Calendar unlocking. Day N opens on the cohort's Nth working day, in the cohort's time
 * zone. All four lessons of a day open together; earlier days stay open. Nothing here
 * waits for a supervisor. Pure functions, so the rules are unit-tested directly.
 */
import { z } from "zod";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

const IsoDate = z
  .string()
  .regex(ISO_DATE)
  .refine((d) => {
    const t = new Date(`${d}T00:00:00Z`);
    return !Number.isNaN(t.getTime()) && t.toISOString().slice(0, 10) === d;
  }, "not a real date");

export const CohortSchema = z.object({
  timeZone: z.string().refine((tz) => {
    try {
      new Intl.DateTimeFormat("en-GB", { timeZone: tz });
      return true;
    } catch {
      return false;
    }
  }, "unknown time zone"),
  startDate: IsoDate.nullable(),
  workingDays: z.array(z.enum(WEEKDAYS)).min(1).refine((d) => new Set(d).size === d.length, "working days repeat"),
  nonWorkingDates: z.array(IsoDate),
});

export type Cohort = z.infer<typeof CohortSchema>;
export type DayAccess = "locked" | "open" | "done";
export type LessonProgressStatus = "locked" | "not_started" | "in_progress" | "complete";

/** Today's date as YYYY-MM-DD in the given time zone. */
export function todayIn(timeZone: string, now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function addDays(iso: string, n: number): string {
  const t = new Date(`${iso}T00:00:00Z`);
  t.setUTCDate(t.getUTCDate() + n);
  return t.toISOString().slice(0, 10);
}

function weekdayOf(iso: string): Weekday {
  return WEEKDAYS[new Date(`${iso}T00:00:00Z`).getUTCDay()]!;
}

/**
 * The opening date of each day: the 1st, 2nd ... Nth working day counted from the start
 * date (inclusive), skipping non-working weekdays and non-working dates.
 * Null when the start date is not set yet.
 */
export function dayOpenDates(cohort: Cohort, dayCount: number): string[] | null {
  if (!cohort.startDate) return null;
  const skip = new Set(cohort.nonWorkingDates);
  const working = new Set(cohort.workingDays);
  const dates: string[] = [];
  let d = cohort.startDate;
  // A year of calendar days is far more than any 10-day programme needs.
  for (let guard = 0; dates.length < dayCount && guard < 366 * 2; guard++, d = addDays(d, 1)) {
    if (working.has(weekdayOf(d)) && !skip.has(d)) dates.push(d);
  }
  if (dates.length < dayCount) throw new Error("Could not find enough working days for the programme");
  return dates;
}

/** A day is open from its opening date onwards, and done when every lesson in it is complete. */
export function dayAccess(openDate: string | null, today: string, allLessonsComplete: boolean): DayAccess {
  if (!openDate || today < openDate) return "locked";
  return allLessonsComplete ? "done" : "open";
}

/** Locked is set by the platform from the calendar; the rest comes from the intern's progress. */
export function lessonStatus(access: DayAccess, progress: "not_started" | "in_progress" | "complete" | undefined): LessonProgressStatus {
  if (access === "locked") return "locked";
  return progress ?? "not_started";
}

/** "Opens on 20 November", with the year only when it differs from today's. */
export function formatOpenDate(openDate: string, today: string, lang: "en" | "vi" = "en"): string {
  const t = new Date(`${openDate}T00:00:00Z`);
  const sameYear = openDate.slice(0, 4) === today.slice(0, 4);
  const text = new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-GB", { timeZone: "UTC", day: "numeric", month: "long", ...(sameYear ? {} : { year: "numeric" }) }).format(t);
  return lang === "vi" ? `Mở vào ${text}` : `Opens on ${text}`;
}

/** "about 90 minutes" for lessons; day totals read in hours, such as "about 6 hours". */
export function formatMinutes(minutes: number, unit: "minutes" | "hours" = "minutes", lang: "en" | "vi" = "en"): string {
  if (lang === "vi") {
    if (unit === "minutes" || minutes < 60) return `khoảng ${minutes} phút`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m ? `khoảng ${h} giờ ${m} phút` : `khoảng ${h} giờ`;
  }
  if (unit === "minutes" || minutes < 60) return `about ${minutes} minutes`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hours = `${h} ${h === 1 ? "hour" : "hours"}`;
  return m ? `about ${hours} ${m} minutes` : `about ${hours}`;
}
