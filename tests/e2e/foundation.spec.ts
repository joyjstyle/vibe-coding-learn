import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const MAIN_ITEMS = ["Home", "Syllabus", "My work", "Toolkit"];
const WIDTHS = [320, 360, 390, 720, 768, 1024, 1280, 1440];

const APP_ROUTES = [
  "/welcome", "/home", "/syllabus", "/day/1", "/day/3", "/day/6", "/day/7", "/day/10", "/work", "/work/2-4",
  "/toolkit/prompts", "/toolkit/commands", "/toolkit/templates", "/toolkit/glossary",
  "/toolkit/project-kit", "/toolkit/statuses", "/help", "/settings",
];
const LESSON_ROUTES = ["/lesson/1-1", "/lesson/4-2", "/lesson/4-2/task", "/lesson/4-2/submit", "/lesson/4-2/check", "/lesson/10-4"];
const ALL = [...APP_ROUTES, ...LESSON_ROUTES];

async function axe(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  return results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
}

async function horizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

test.describe("every route", () => {
  for (const route of ALL) {
    test(`${route} renders with one h1, a title and no axe violations`, async ({ page }) => {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(/ · VibeCode Academy$/);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toHaveCount(1);
      expect(await axe(page)).toEqual([]);
    });
  }
});

test("the root address goes to the Welcome tour on a first visit", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/welcome$/);
});

test.describe("unknown addresses return 404", () => {
  for (const route of ["/day/11", "/day/04", "/lesson/11-1", "/lesson/4.2", "/lesson/4-2/extra", "/toolkit/unknown", "/work/0-0", "/nope"]) {
    test(route, async ({ page }) => {
      const res = await page.goto(route);
      expect(res?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
    });
  }
});

test.describe("skip link", () => {
  for (const route of ["/home", "/lesson/4-2"]) {
    test(`is the first stop and moves focus to main on ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.keyboard.press("Tab");
      const skip = page.getByRole("link", { name: "Skip to main content" });
      await expect(skip).toBeFocused();
      await expect(skip).toBeInViewport();
      await page.keyboard.press("Enter");
      await expect(page.locator("main#main")).toBeFocused();
    });
  }
});

test.describe("top bar", () => {
  test("shows the platform name as plain text linking to Home", async ({ page }) => {
    await page.goto("/syllabus");
    const brand = page.getByRole("banner").getByRole("link", { name: "VibeCode Academy", exact: true });
    await expect(brand).toHaveAttribute("href", "/home");
    await expect(brand.locator("img, svg")).toHaveCount(0);
  });

  test("marks the current page and section with aria-current", async ({ page }) => {
    const nav = () => page.getByRole("navigation", { name: "Main" });
    await page.goto("/home");
    await expect(nav().getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    await page.goto("/day/3");
    await expect(nav().getByRole("link", { name: "Syllabus" })).toHaveAttribute("aria-current", "true");
    await page.goto("/toolkit/glossary");
    await expect(nav().getByRole("link", { name: "Toolkit" })).toHaveAttribute("aria-current", "true");
    await expect(page.getByRole("navigation", { name: "Toolkit" }).getByRole("link", { name: "Glossary" })).toHaveAttribute("aria-current", "page");
    await page.goto("/settings");
    await expect(nav().locator("[aria-current]")).toHaveCount(0);
  });

  test("the active capsule is canvas with ink text", async ({ page }) => {
    await page.goto("/home");
    const home = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Home" });
    const style = await home.evaluate((el) => {
      const s = getComputedStyle(el);
      return { bg: s.backgroundColor, color: s.color };
    });
    expect(style).toEqual({ bg: "rgb(246, 246, 244)", color: "rgb(23, 23, 23)" });
  });

  for (const width of WIDTHS) {
    test(`keeps the four main items and Help visible at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/home");
      const nav = page.getByRole("navigation", { name: "Main" });
      for (const label of MAIN_ITEMS) await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
      const util = page.getByRole("banner").getByRole("link", { name: "Settings" });
      const menu = page.getByRole("button", { name: /^Account menu/ });
      await expect(page.getByRole("banner").getByRole("button", { name: "Help" })).toBeVisible();
      if (width < 768) {
        await expect(util).toBeHidden();
        await expect(menu).toBeVisible();
      } else {
        await expect(util).toBeVisible();
        await expect(menu).toBeHidden();
      }
    });
  }

  test("account menu opens, closes with Escape and returns focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/home");
    const button = page.getByRole("button", { name: /^Account menu/ });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".gl-tip__bubble", { hasText: "Account menu" })).toBeHidden();
    const settings = page.getByRole("link", { name: "Settings" });
    await expect(settings).toBeVisible();
    expect(await axe(page)).toEqual([]);
    await settings.focus();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
    await button.click();
    await page.getByRole("link", { name: "Settings" }).click();
    await expect(page).toHaveURL(/\/settings$/);
    await expect(page.getByRole("button", { name: /^Account menu/ })).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("lesson bar", () => {
  test("replaces the top bar with back link, breadcrumb, Help and Home", async ({ page }) => {
    await page.goto("/lesson/4-2/task");
    await expect(page.getByRole("navigation", { name: "Main" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Day 4" }).first()).toHaveAttribute("href", "/day/4");
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(crumbs.getByRole("link", { name: "Syllabus" })).toBeVisible();
    await expect(crumbs.locator('[aria-current="page"]')).toHaveText("Lesson 4.2: Planning Small Tasks with Clear Acceptance Criteria");
    await expect(page.getByRole("banner").getByRole("button", { name: "Help", exact: true })).toHaveAttribute("aria-haspopup", "dialog");
    await expect(page.getByRole("banner").getByRole("link", { name: "Home", exact: true })).toHaveAttribute("href", "/home");
  });

  test("icon buttons show a tooltip on keyboard focus and hide it with Escape", async ({ page }) => {
    await page.goto("/lesson/4-2");
    const home = page.getByRole("link", { name: "Home" });
    await home.focus();
    const tip = page.locator(".gl-tip__bubble", { hasText: "Home" });
    await expect(tip).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tip).toBeHidden();
    await expect(home).toBeFocused();
  });
});

test.describe("no sideways scrolling", () => {
  for (const route of ["/home", "/syllabus", "/day/3", "/day/7", "/toolkit/project-kit", "/lesson/4-2", "/lesson/10-4/submit"]) {
    for (const width of WIDTHS) {
      test(`${route} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(route);
        expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      });
    }
  }
});

test.describe("narrow screens pass axe", () => {
  for (const route of ["/home", "/syllabus", "/day/3", "/day/6", "/lesson/4-2", "/toolkit/prompts"]) {
    test(`${route} at 320px`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(route);
      expect(await axe(page)).toEqual([]);
    });
  }
});

test("an unknown share link is a 404, kept out of search engines, with no navigation", async ({ page }) => {
  const res = await page.goto("/share/example-token");
  expect(res?.status()).toBe(404);
  expect(res?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  // Next.js adds its own robots tag to 404 pages beside ours; every one must say noindex.
  const robots = await page.locator('meta[name="robots"]').evaluateAll((els) => els.map((e) => e.getAttribute("content") ?? ""));
  expect(robots.length).toBeGreaterThan(0);
  expect(robots.every((c) => c.includes("noindex"))).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This shared submission is not available");
  await expect(page.getByRole("navigation")).toHaveCount(0);
});

test("reduced motion turns transitions off", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/home");
  const duration = await page.locator(".ob-btn").first().evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(duration.split(",").every((d) => parseFloat(d) === 0)).toBe(true);
});

test("design system fonts load", async ({ page }) => {
  await page.goto("/home");
  const loaded = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
  });
  expect(loaded.some((f) => /Bricolage/i.test(f))).toBe(true);
  expect(loaded.some((f) => /Manrope/i.test(f))).toBe(true);
});
