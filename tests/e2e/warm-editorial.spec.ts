import { test, expect } from "@playwright/test";

const variants = ["warm-editorial", "warm-journal", "warm-library", "warm-dispatch"];

for (const width of [1440, 390]) {
  for (const variant of variants) {
    test(`${variant} at ${width}px: theme, filters, and article navigation survive transitions`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(`/designs/${variant}/`);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await page.getByLabel("Color theme").selectOption("dark");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      const background = await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor);
      expect(background).toBe("rgb(33, 31, 28)");
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);

      await page.getByRole("button", { name: "Security", exact: true }).click();
      await expect(page.locator("[data-article]:visible")).toHaveCount(1);
      await page.getByRole("button", { name: "All", exact: true }).click();
      await page.getByRole("searchbox").fill("Postgres Text Searching Guide");
      await expect(page.locator("[data-article]:visible")).toHaveCount(1);
      await page.getByRole("searchbox").fill("");
      await expect(page.locator("[data-article]:visible")).toHaveCount(9);

      const card = page.locator(".note-link").first();
      const title = await card.locator("h2").textContent();
      const titleName = await card.locator("h2").evaluate((node) => getComputedStyle(node).viewTransitionName);
      const imageName = await card.locator(".note-image").evaluate((node) => getComputedStyle(node).viewTransitionName);
      expect(titleName).not.toBe("none");
      expect(imageName).not.toBe("none");
      await card.click();
      await expect(page.locator(".reading-header h1")).toHaveText(title!);
      await expect(page.locator(".reading-body")).not.toBeEmpty();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      expect(await page.locator(".reading-header h1").evaluate((node) => getComputedStyle(node).viewTransitionName)).toBe(titleName);
      expect(await page.locator(".reading-hero > div").evaluate((node) => getComputedStyle(node).viewTransitionName)).toBe(imageName);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      await expect(page.getByRole("link", { name: "DataAnalyzer.app", exact: false })).toBeVisible();

      await page.getByRole("link", { name: "Back to field notes" }).click();
      await expect(page.locator("[data-article]")).toHaveCount(9);
      await page.getByRole("button", { name: "Security", exact: true }).click();
      await expect(page.locator("[data-article]:visible")).toHaveCount(1);
      await page.reload();
      await expect(page.getByLabel("Color theme")).toHaveValue("dark");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page.getByLabel("Color theme").selectOption("light");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      expect(await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor)).toBe("rgb(250, 247, 241)");
    });
  }
}

test("system theme follows OS changes and reduced motion disables animation", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/designs/warm-journal/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.locator(".hero-copy").evaluate((node) => getComputedStyle(node).animationName)).toBe("none");
  await page.locator(".note-link").first().click();
  await expect(page.locator(".reading-body")).not.toBeEmpty();
  await page.getByRole("link", { name: "Back to field notes" }).click();
  await expect(page.locator("#filter-status")).toHaveText("9 articles");
});
