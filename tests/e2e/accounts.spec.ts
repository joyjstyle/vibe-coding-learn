import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Browser, type Page } from "@playwright/test";
import pg from "pg";
import { DB_PORT } from "../../playwright.config";
import { STUDENTS } from "./db-setup";

// Database mode: student accounts (Better Auth) and storage in Postgres, as in production
// on Neon, using a local throwaway database. Skipped unless E2E_DATABASE_URL is set.
const dbUrl = process.env.E2E_DATABASE_URL;
test.skip(!dbUrl, "Set E2E_DATABASE_URL to a local throwaway Postgres database to run the account tests.");
test.use({ baseURL: `http://localhost:${DB_PORT}` });
test.describe.configure({ mode: "serial" });

const [one, two] = STUDENTS as [(typeof STUDENTS)[number], (typeof STUDENTS)[number]];
const saved = (page: Page) => page.waitForResponse((r) => r.request().method() === "POST" && r.ok());

async function signIn(page: Page, who: { email: string; password: string }, next = "/home") {
  await page.goto(`/sign-in?next=${encodeURIComponent(next)}`);
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password", { exact: true }).fill(who.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(new RegExp(`${next.replace(/[/?]/g, "\\$&")}$`));
}

/**
 * A separate browser. Sign-in attempts are rate-limited per client address, which Better
 * Auth reads from X-Forwarded-For (set by the host in production), so each simulated
 * person gets their own address.
 */
async function freshPage(browser: Browser, ip: string) {
  return (await browser.newContext({ baseURL: `http://localhost:${DB_PORT}`, viewport: { width: 1280, height: 900 }, extraHTTPHeaders: { "x-forwarded-for": ip } })).newPage();
}

async function query<T extends pg.QueryResultRow>(sql: string, params: unknown[]) {
  const db = new pg.Pool({ connectionString: dbUrl });
  try {
    return (await db.query<T>(sql, params)).rows;
  } finally {
    await db.end();
  }
}

test("signed-out visitors are sent to sign in, and come back afterwards", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/sign-in$/);
  await page.goto("/day/2");
  await expect(page).toHaveURL(/\/sign-in\?next=%2Fday%2F2$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sign in to VibeCode Academy");
  await expect(page.getByRole("navigation")).toHaveCount(0);
  expect(await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze().then((r) => r.violations)).toEqual([]);
  // Share links stay public: a missing one is a plain 404, not a sign-in page.
  const share = await page.goto("/share/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  expect(share?.status()).toBe(404);
  // Server actions refuse without a session, whatever the page shows.
  const res = await page.request.get("/files/0123456789abcdef0123456789abcdef", { maxRedirects: 0 });
  expect([302, 307, 404]).toContain(res.status());
});

test("a wrong password gets one message that does not say whether the account exists", async ({ page }) => {
  for (const email of [one.email, "nobody@example.test"]) {
    await page.goto("/sign-in");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill("not-the-password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "match an account" })).toHaveText(/That email and password don't match an account\./);
  }
  await page.goto("/home");
  await expect(page).toHaveURL(/\/sign-in/);
});

test("Student One completes a lesson; the result is saved against their account in the database", async ({ page }) => {
  await signIn(page, one, "/day/2");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Brief, Research and Website Structure");
  await page.goto("/home");
  await expect(page.locator(".gl-topbar .ob-avatar").first()).toHaveText("SO");

  // Complete Lesson 1.3: steps, evidence, self-check. Its multiple-choice check does not exist yet, so it is skipped.
  await page.goto("/lesson/1-3/task");
  for (const box of await page.locator(".gl-task").getByRole("checkbox").all()) {
    const s = saved(page);
    await box.check();
    await s;
  }
  await page.goto("/lesson/1-3/submit");
  const items = page.locator("fieldset.gl-evidence__item");
  await expect(items.first()).toBeVisible();
  for (let i = 0; i < (await items.count()); i++) await items.nth(i).getByLabel("Your text").fill(`Student One evidence ${i + 1}.`);
  await page.locator("form.gl-evidence").getByRole("button", { name: "Submit evidence" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Submit evidence" }).click();
  await page.waitForURL(/\/work\/1-3\?submitted=1$/);
  await page.goto("/lesson/1-3/task");
  await expect(page.locator(".gl-selfcheck").getByRole("checkbox").first()).toBeVisible();
  for (const box of await page.locator(".gl-selfcheck").getByRole("checkbox").all()) {
    const s = saved(page);
    await box.check();
    await s;
  }
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await expect(page.getByText("You marked this lesson complete.")).toBeVisible();

  // Also stop part-way through Lesson 1.2, with one step ticked.
  const visit = saved(page);
  await page.goto("/lesson/1-2#section-4");
  await visit;
  const tick = saved(page);
  await page.locator(".gl-lesson__task").getByRole("checkbox").first().check();
  await tick;

  // The database holds the results against Student One's account.
  const [user] = await query<{ id: string }>(`select id from "user" where email = $1`, [one.email]);
  const rows = await query<{ lesson_id: string; data: { status: string; lastSection: number | null; tickedSteps: string[]; checkAtCompletion?: string } }>(
    "select lesson_id, data from genie_lesson_progress where intern_id = $1 order by lesson_id",
    [user!.id],
  );
  const byLesson = Object.fromEntries(rows.map((r) => [r.lesson_id, r.data]));
  expect(byLesson["1.3"]).toMatchObject({ status: "complete", checkAtCompletion: "unavailable" });
  expect(byLesson["1.2"]).toMatchObject({ status: "in_progress", lastSection: 4, tickedSteps: ["s1"] });
  const [work] = await query<{ data: { submissions: { lessonId: string; version: number }[] } }>("select data from genie_work where intern_id = $1", [user!.id]);
  expect(work!.data.submissions.map((s) => `${s.lessonId} v${s.version}`)).toEqual(["1.3 v1"]);
});

test("after signing out and in again, Student One's progress is all there", async ({ page, browser }) => {
  await signIn(page, one);
  await page.goto("/settings");
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.waitForURL(/\/sign-in$/);
  await page.goto("/home");
  await expect(page).toHaveURL(/\/sign-in/);

  // A new browser, as on another day or another computer.
  const later = await freshPage(browser, "10.0.0.1");
  await signIn(later, one);
  await later.goto("/syllabus");
  await expect(later.locator(".gl-stat .ob-stat__figure")).toHaveText("1");
  await later.goto("/day/1");
  await expect(later.locator(".gl-lessoncard").nth(2).locator(".gl-badge")).toHaveText("Complete");
  await expect(later.locator(".gl-lessoncard").nth(1).locator(".gl-badge")).toHaveText("In progress");
  await later.goto("/lesson/1-2");
  await expect(later).toHaveURL(/#section-4$/);
  await expect(later.locator(".gl-lesson__task").getByRole("checkbox").first()).toBeChecked();
  await later.goto("/work");
  await expect(later.locator(".gl-sub")).toContainText("Lesson 1.3");
  await later.goto("/lesson/1-3/task");
  await expect(later.getByText("You marked this lesson complete.")).toBeVisible();
});

test("Student Two sees none of Student One's progress or work", async ({ browser }) => {
  const page = await freshPage(browser, "10.0.0.2");
  await signIn(page, two);
  await expect(page.locator(".gl-topbar .ob-avatar").first()).toHaveText("ST");
  await page.goto("/syllabus");
  await expect(page.locator(".gl-stat .ob-stat__figure")).toHaveText("0");
  await page.goto("/day/1");
  await expect(page.locator(".gl-lessoncard").nth(2).locator(".gl-badge")).toHaveText("Not started");
  await page.goto("/work");
  await expect(page.getByText("You haven't submitted any evidence yet.")).toBeVisible();
  await page.goto("/work/1-3");
  await expect(page.getByText("Nothing has been submitted for this lesson yet")).toBeVisible();
});

test("too many wrong passwords are slowed down, for that address only", async ({ browser }) => {
  const page = await freshPage(browser, "10.0.0.3");
  await page.goto("/sign-in");
  let limited = false;
  for (let i = 0; i < 8 && !limited; i++) {
    await page.getByLabel("Email").fill(two.email);
    await page.getByLabel("Password", { exact: true }).fill(`wrong-password-${i}`);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("alert").filter({ hasText: /match an account|Too many attempts/ })).toBeVisible();
    limited = await page.getByText("Too many attempts. Wait a minute, then try again.").isVisible();
  }
  expect(limited).toBe(true);
  // Someone else, from another address, can still sign in.
  const other = await freshPage(browser, "10.0.0.4");
  await signIn(other, two);
  await expect(other.getByRole("heading", { level: 1 })).toHaveText("Home");
});
