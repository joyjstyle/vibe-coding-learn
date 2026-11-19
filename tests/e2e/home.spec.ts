import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { HOME_PORT } from "../../playwright.config";

// The home server: fresh data, development dates, today Wed 18 Nov 2026, so Day 3 is today
// and Days 1 and 2 (8 lessons) count as behind until done.
test.use({ baseURL: `http://localhost:${HOME_PORT}` });
// One file, run in order: the Settings test changes text size for every page on this server.
test.describe.configure({ mode: "serial" });

async function axe(page: Page) {
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
}
const saved = (page: Page) => page.waitForResponse((r) => r.request().method() === "POST" && r.ok());

// Ordered: the first visit, then Home as the intern makes progress, then Settings last.
test.describe.serial("first visit, Home and Settings", () => {
  test("the first visit opens the four-step Welcome tour", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/welcome$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Welcome to VibeCode Academy");
    await expect(page.getByText("Clinic Genie Vibe Coding Intern Platform")).toBeVisible();
    await expect(page.getByText("Step 1 of 4")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Welcome tour" }).getByRole("link", { name: "What you will build" })).toHaveAttribute("aria-current", "step");
    await expect(page.getByText("you will build a website for Saffron Wellness Clinic, a fictional practice client")).toBeVisible();
    expect(await axe(page)).toEqual([]);
    await page.getByRole("link", { name: "Next" }).click();
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2 })).toHaveText("How a lesson works");
    await page.goto("/welcome?step=4");
    await expect(page.locator(".gl-needs dt")).toHaveCount(4);
    await expect(page.getByRole("button", { name: "Start Lesson 1.1" })).toBeVisible();
    await page.goto("/welcome?step=1");
    await page.getByRole("button", { name: "Skip tour" }).click();
    await expect(page).toHaveURL(/\/home$/);
    await page.goto("/");
    await expect(page).toHaveURL(/\/home$/);
  });

  test("Home on a fresh start: Start Lesson 1.1, lessons behind, the 10 days, nothing waiting", async ({ page }) => {
    await page.goto("/home");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Home");
    await expect(page.locator(".gl-page-head").getByText("Day 3 of 10: Design and Markdown Instructions")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Needs your attention" })).toHaveCount(0);
    const today = page.locator(".gl-today");
    await expect(today.getByRole("heading", { level: 2 })).toHaveText("How Websites Work and the Vibe Coding Workflow");
    await expect(today).toContainText("8 lessons behind. Earlier days stay open, so you can catch up; nothing is blocked.");
    const primary = page.locator("main .ob-btn--primary");
    await expect(primary).toHaveCount(1);
    await expect(primary).toHaveText("Start Lesson 1.1");
    await expect(page.locator(".gl-daytile")).toHaveCount(10);
    await expect(page.locator(".gl-daytile[aria-current='date']")).toContainText("Day 3");
    await expect(page.locator(".gl-daytile").nth(5).locator(".gl-chip")).toHaveText("Locked");
    await expect(page.getByText("Nothing is waiting on your supervisor.")).toBeVisible();
    for (const name of ["View prompts", "Open the glossary", "View commands"]) await expect(page.getByRole("link", { name })).toBeVisible();
    expect(await axe(page)).toEqual([]);
  });

  test("Continue reopens the exact section where the intern stopped", async ({ page }) => {
    const save = saved(page);
    await page.goto("/lesson/1-1#section-3");
    await save;
    await page.goto("/home");
    const today = page.locator(".gl-today");
    await expect(today).toContainText("You stopped at section 3 of 6: Understand your role when working with Claude.");
    await expect(today.locator(".gl-badge")).toHaveText("In progress");
    const cont = page.getByRole("link", { name: "Continue lesson" });
    await expect(cont).toHaveAttribute("href", "/lesson/1-1#section-3");
    await cont.click();
    await expect(page.locator("#lesson-position")).toHaveText("Section 3 of 6");
  });

  test("a submission at a review point waits on the supervisor; Changes requested comes first under Needs your attention", async ({ page }) => {
    await page.goto("/lesson/2-4/submit");
    const items = page.locator("fieldset.gl-evidence__item");
    for (let i = 0; i < (await items.count()); i++) await items.nth(i).getByLabel("Your text").fill(`Item ${i + 1}.`);
    await page.locator("form.gl-evidence").getByRole("button", { name: "Submit evidence" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Submit evidence" }).click();
    await page.waitForURL(/\/work\/2-4\?submitted=1$/);
    await page.goto("/home");
    const waiting = page.locator("section").filter({ has: page.getByRole("heading", { name: "Waiting on your supervisor" }) });
    await expect(waiting.locator(".gl-sub")).toContainText("Lesson 2.4");
    await expect(waiting.locator(".gl-tag")).toHaveText("Awaiting review");
    await expect(page.locator(".gl-daytile").nth(1).locator(".gl-tag")).toHaveText("Awaiting review");

    await page.goto("/work/2-4#record");
    await page.getByLabel("Changes requested").check();
    await page.getByLabel(/Reviewer's name/).fill("Test Reviewer");
    await page.getByLabel(/supervisor's notes/).fill("Add the booking journey.");
    await page.getByRole("button", { name: "Record review outcome" }).click();
    await expect(page.locator(".gl-review-record .gl-tag").first()).toHaveText("Changes requested");

    await page.goto("/home");
    const first = page.locator("main .gl-section").first();
    await expect(first.getByRole("heading", { level: 2 })).toHaveText("Needs your attention");
    await expect(first).toContainText("Lesson 2.4: Submit the Website Brief and Structure for Review");
    await expect(first).toContainText("Add the booking journey.");
    await expect(first.getByRole("link", { name: "Resubmit Lesson 2.4" })).toHaveAttribute("href", "/work/2-4");
    await expect(page.getByText("Nothing is waiting on your supervisor.")).toBeVisible();
    expect(await axe(page)).toEqual([]);
  });

  test("Settings: name, text size and reduced motion apply on every page and persist", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("textbox", { name: /Name/ }).fill("Ada Lovelace");
    await page.getByLabel(/^Larger/).check();
    await page.getByLabel("Reduce motion").check();
    const save = saved(page);
    await page.getByRole("button", { name: "Save settings" }).click();
    await save;
    await expect(page.getByRole("status").filter({ hasText: "Saved" })).toBeVisible();
    await page.goto("/home");
    await expect(page.locator(".gl-topbar .ob-avatar").first()).toHaveText("AL");
    await expect(page.locator("html")).toHaveAttribute("data-text-size", "larger");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("20px");
    await expect(page.locator("html")).toHaveAttribute("data-reduced-motion", "true");
    const duration = await page.locator(".ob-btn").first().evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(duration.split(",").every((d) => parseFloat(d) === 0)).toBe(true);
    // Larger text must never push a page sideways.
    for (const width of [320, 390, 720]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["/home", "/syllabus", "/day/3", "/lesson/1-1#section-1", "/lesson/2-4/submit", "/work/2-4", "/toolkit/statuses", "/welcome?step=4", "/settings"]) {
        await page.goto(route);
        await expect(page.locator("main h1")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${route} at ${width}px`).toBeLessThanOrEqual(0);
      }
    }
    expect(await axe(page)).toEqual([]);
    // Put the defaults back for the tests that follow on this server.
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/settings");
    await page.getByRole("textbox", { name: /Name/ }).fill("");
    await page.getByLabel(/^Default/).check();
    await page.getByLabel("Reduce motion").uncheck();
    const reset = saved(page);
    await page.getByRole("button", { name: "Save settings" }).click();
    await reset;
    await page.goto("/home");
    await expect(page.locator("html")).toHaveAttribute("data-text-size", "default");
  });
});

test.describe("Help", () => {
  test("opens as a modal drawer from every page, searches the Toolkit and closes back to its button", async ({ page }) => {
    await page.goto("/syllabus");
    const button = page.getByRole("banner").getByRole("button", { name: "Help" });
    await button.click();
    const drawer = page.getByRole("dialog", { name: "Help" });
    await expect(drawer).toBeVisible();
    await drawer.getByLabel("Lessons, prompts, commands, templates and terms").fill("sitemap");
    await drawer.getByRole("button", { name: "Search", exact: true }).click();
    await expect(drawer.getByText(/results? for “sitemap”/)).toBeVisible();
    expect(await axe(page)).toEqual([]);
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest("dialog")))).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(button).toBeFocused();
    await button.click();
    await drawer.getByLabel("Lessons, prompts, commands, templates and terms").fill("sitemap");
    await drawer.getByRole("button", { name: "Search", exact: true }).click();
    await drawer.getByRole("link", { name: "Lesson 2.3: Planning the Sitemap, User Journeys and Page Sections" }).click();
    await expect(page).toHaveURL(/\/lesson\/2-3/);
    await expect(drawer).toBeHidden();
  });

  test("on a lesson it says where you are and copies the lesson and section", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/lesson/2-2#section-2");
    await page.getByRole("banner").getByRole("button", { name: "Help" }).click();
    const drawer = page.getByRole("dialog", { name: "Help" });
    await expect(drawer).toContainText("Day 2 · Lesson 2.2: Researching Relevant References and Sources Efficiently · Section 2 of 7");
    await expect(drawer).toContainText("Your supervisor's contact details have not been added yet.");
    await drawer.getByRole("button", { name: "Copy lesson and section" }).click();
    await expect(drawer.getByRole("status").filter({ hasText: "Copied" })).toBeVisible();
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain("Lesson 2.2: Researching Relevant References and Sources Efficiently · Section 2:");
    expect(clip).toContain("/lesson/2-2#section-2");
    await expect(drawer.getByRole("link", { name: "Replay the welcome tour" })).toHaveAttribute("href", "/welcome");
    await expect(drawer.getByRole("link", { name: /setup problems/i })).toHaveAttribute("href", /\/lesson\/1-2#section-\d+$/);
  });

  test("/help is the same help as its own page, with h2 sections", async ({ page }) => {
    await page.goto("/help");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Help");
    await expect(page.getByRole("heading", { level: 2 })).toHaveText(["Search the Toolkit", "Where am I?", "Statuses explained", "Common setup problems", "Contact your supervisor", "New to VibeCode Academy?"]);
  });
});

test.describe("Toolkit", () => {
  for (const [area, kind, noun] of [["prompts", "prompt", "prompts"], ["commands", "command", "terminal commands"], ["templates", "template", "document templates"]] as const) {
    test(`${area}: the count in the introduction is the number of cards, and search narrows them`, async ({ page }) => {
      await page.goto(`/toolkit/${area}`);
      const lead = await page.locator(".gl-page-head .ob-secondary").innerText();
      const n = Number(new RegExp(`^(\\d+) ${noun}`).exec(lead)?.[1]);
      expect(n).toBeGreaterThan(0);
      await expect(page.locator(`.gl-code--${kind}`)).toHaveCount(n);
      const search = page.getByRole("searchbox", { name: new RegExp(`Search`) });
      await search.fill("zzzz-nothing");
      await expect(page.getByText(/No .* match “zzzz-nothing”/)).toBeVisible();
      await page.getByRole("button", { name: "Clear search" }).click();
      await expect(page.locator(`.gl-code--${kind}`)).toHaveCount(n);
    });
  }

  test("templates list the four working templates as not yet supplied", async ({ page }) => {
    await page.goto("/toolkit/templates");
    const working = page.locator("section").filter({ has: page.getByRole("heading", { name: "Working templates" }) });
    await expect(working.getByText("Not yet supplied")).toHaveCount(4);
  });

  test("the glossary and project kit say they are not yet supplied, and invent nothing", async ({ page }) => {
    await page.goto("/toolkit/glossary");
    await expect(page.getByText("The glossary has not been supplied yet.")).toBeVisible();
    await expect(page.locator(".gl-glossary")).toHaveCount(0);
    await page.goto("/toolkit/project-kit");
    await expect(page.getByText("The project kit has not been supplied yet.")).toBeVisible();
  });

  test("Statuses explained shows every badge with its word", async ({ page }) => {
    await page.goto("/toolkit/statuses");
    for (const word of ["Locked", "Not started", "In progress", "Complete", "Coming soon", "Not submitted", "Awaiting review", "Changes requested", "Accepted", "Draft", "Submitted", "Open", "Done"]) {
      await expect(page.locator(".gl-badge", { hasText: new RegExp(`^${word}$`) }).first()).toBeVisible();
    }
  });
});

test.describe("layout and accessibility", () => {
  for (const route of ["/home", "/welcome", "/welcome?step=4", "/help", "/settings", "/toolkit/prompts", "/toolkit/commands", "/toolkit/templates", "/toolkit/glossary", "/toolkit/project-kit", "/toolkit/statuses"]) {
    for (const width of [320, 390, 720, 1024, 1280]) {
      test(`${route} at ${width}px: no sideways scrolling and no axe violations`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await expect(page.locator("main h1")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
        expect(await axe(page)).toEqual([]);
      });
    }
  }

  test("the Help drawer is usable at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/home");
    await page.getByRole("banner").getByRole("button", { name: "Help" }).click();
    const drawer = page.getByRole("dialog", { name: "Help" });
    await expect(drawer).toBeVisible();
    const box = await drawer.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(320);
    expect(await axe(page)).toEqual([]);
  });
});
