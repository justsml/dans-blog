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
