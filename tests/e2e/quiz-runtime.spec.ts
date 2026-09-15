import { expect, test } from "@playwright/test";

for (const [locale, slug, explanation, direction] of [
  ["en", "quiz-is-your-memory-rusty", "Show explanation", "ltr"],
  ["he", "quiz-is-your-memory-rusty", "הצגת הסבר", "rtl"],
  ["de", "quiz-postgres-sql-mastery-pt1", "Erklärung anzeigen", "ltr"],
  ["hi", "quiz-postgres-sql-mastery-pt1", "व्याख्या दिखाएँ", "ltr"],
  ["fr", "quiz-advanced-js-error-mastery", "Afficher l’explication", "ltr"],
  ["zh", "js-quiz-14-date-time-questions-test-your-knowledge", "显示解释", "ltr"],
]) {
  test(`${locale}: immediate answer, localized controls and code direction`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${locale === "en" ? "" : `/${locale}`}/${slug}/`);
    const first = page.locator(".challenge").first();
    await first.scrollIntoViewIfNeeded();
    await expect(first.locator(".toggle-explainer")).toHaveText(explanation);
    // Answer before waiting for the navigation runtime to start.
    await first.locator(".option").first().click();
    await expect(page.locator(".quiz-nav-bar")).toBeVisible({ timeout: 5000 });
    await expect(page.locator(".quiz-score-bar")).toBeVisible();
    await expect(first).toHaveCSS("direction", direction);
    await expect(first.locator("pre").first()).toHaveCSS("direction", "ltr");
    expect(errors).toEqual([]);
  });
}

test("an incorrect answer stays available for another attempt", async ({ page }) => {
  await page.goto("/quiz-is-your-memory-rusty/", { waitUntil: "domcontentloaded" });
  const first = page.locator("#qq-1");
  await first.scrollIntoViewIfNeeded();
  await expect(page.locator(".quiz-ui")).toHaveClass(/quiz-slides-active/);
  await first.locator(".option").first().click();
  await expect(first).toHaveAttribute("data-question-correct", "false");
  // Exceeds the old 950ms wrong-answer auto-advance timer.
  await page.waitForTimeout(1400);
  await expect(page.locator(".quiz-dot").first()).toHaveClass(/active/);
  await first.locator(".option").nth(1).click();
  await expect(first).toHaveAttribute("data-answer-count", "2");
});

test("changing a correct answer cancels its pending navigation", async ({ page }) => {
  await page.goto("/quiz-is-your-memory-rusty/");
  const first = page.locator("#qq-1");
  await first.scrollIntoViewIfNeeded();
  await expect(page.locator(".quiz-ui")).toHaveClass(/quiz-slides-active/);
  await first.locator(".option").nth(4).click();
  await expect(first).toHaveAttribute("data-question-correct", "true");
  await first.locator(".option").first().click();
  await expect(first).toHaveAttribute("data-question-correct", "false");
  await page.waitForTimeout(1400);
  await expect(page.locator(".quiz-dot").first()).toHaveClass(/active/);
});
