import { expect, test } from "@playwright/test";

test.describe("Quiz runtime", () => {
  test("boots slide navigation and records an answer", async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto("/quiz-is-your-memory-rusty/");

    const quiz = page.locator(".quiz-ui");
    await expect(quiz).toBeVisible();

    await expect(page.locator(".quiz-nav-bar")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator(".quiz-score-bar")).toBeVisible();
    await expect(page.locator(".quiz-score-bar-value")).toHaveText(/\d+\/\d+/);

    const firstQuestion = page.locator(".challenge").first();
    await firstQuestion.scrollIntoViewIfNeeded();
    await firstQuestion.locator(".option").first().click();

    await expect.poll(
      async () =>
        page.evaluate(() =>
          localStorage.getItem("quiz-quiz-is-your-memory-rusty"),
        ),
      { timeout: 5_000 },
    ).not.toBeNull();
  });
});
