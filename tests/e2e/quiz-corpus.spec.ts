import { expect, test } from "@playwright/test";
import { loadQuizCorpus } from "../../src/scripts/i18n/quiz-corpus";
import { getQuizMessages } from "../../src/components/QuizUI/messages";

// The source files define coverage, not a hand-picked list of passing translations.
// These tests prove representation and interaction. Language review establishes meaning.
const corpus = loadQuizCorpus();
test.use({ reducedMotion: "reduce", timezoneId: "America/Denver" });
for (const entry of corpus) {
  test(`${entry.locale}/${entry.slug}: every choice is represented and selectable`, async ({ page }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    expect(entry.quiz.challenges.length).toBe(entry.source.challenges.length);
    await page.goto(entry.route, { waitUntil: "domcontentloaded" });
    const first = page.locator("#qq-1");
    await first.scrollIntoViewIfNeeded();
    await expect(page.locator(".quiz-ui")).toHaveClass(/quiz-slides-active/);
    const messages = getQuizMessages(entry.locale);
    for (const [index, challenge] of entry.quiz.challenges.entries()) {
      await test.step(`Question ${index + 1}: all ${challenge.options.length} choices`, async () => {
        expect(challenge.index).toBe(index);
        expect(challenge.options.length).toBe(entry.source.challenges[index].options.length);
        expect(challenge.options.filter(option => option.isAnswer)).toHaveLength(1);
        expect(new Set(challenge.options.map(option => option.text.trim())).size).toBe(challenge.options.length);
        const dot = page.locator(".quiz-dot").nth(index);
        const question = page.locator(`#qq-${index + 1}`);
        await expect(dot).toHaveClass(/active/);
        await question.scrollIntoViewIfNeeded();
        await expect(question.locator(".toggle-explainer")).toHaveText(messages.showExplanation);
        const options = question.locator(".option");
        await expect(options).toHaveCount(challenge.options.length);
        const order = challenge.options.map((option, i) => ({ ...option, i }))
          .sort((a, b) => Number(Boolean(a.isAnswer)) - Number(Boolean(b.isAnswer)));
        for (const [attempt, option] of order.entries()) {
          expect(option.text.trim()).not.toBe("");
          const control = options.nth(option.i);
          await expect(control.locator("label")).toHaveText(option.text);
          await control.scrollIntoViewIfNeeded();
          await expect(control).toBeVisible();
          await control.focus();
          await page.keyboard.press(attempt % 2 ? "Space" : "Enter");
          await expect(question).toHaveAttribute("data-answer-count", String(attempt + 1));
          await expect(question).toHaveAttribute("data-question-correct", String(Boolean(option.isAnswer)));
          const dismiss = question.locator(".hint-tooltip button").first();
          if (await dismiss.isVisible()) await dismiss.click();
        }
      });
    }
    await expect(page.locator(".quiz-score-bar-value")).toHaveText(`${entry.quiz.challenges.length}/${entry.quiz.challenges.length}`);
    expect(errors).toEqual([]);
  });
}

// A compact mobile pass includes every writing system and every localized toolbar.
test.describe("mobile locale controls", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  for (const entry of corpus.filter(entry => entry.slug === "quiz-is-your-memory-rusty")) {
    test(`${entry.locale}: explanation, persistence and reset`, async ({ page }) => {
      const messages = getQuizMessages(entry.locale);
      await page.goto(entry.route);
      const first = page.locator("#qq-1");
      await first.scrollIntoViewIfNeeded();
      await expect(page.locator(".quiz-ui")).toHaveClass(/quiz-slides-active/);
      await expect(first).toHaveCSS("direction", ["ar", "he"].includes(entry.locale) ? "rtl" : "ltr");
      await expect(first.locator("pre").first()).toHaveCSS("direction", "ltr");
      const toggle = first.locator(".toggle-explainer");
      await toggle.click();
      await expect(toggle).toHaveText(messages.hideExplanation);
      await expect(first.locator("section.explanation")).toBeVisible();
      await toggle.click();
      await expect(toggle).toHaveText(messages.showExplanation);
      await first.locator(".option").nth(entry.quiz.challenges[0].options.findIndex(option => option.isAnswer)).click();
      await expect(page.locator(".quiz-score-bar-value")).toHaveText("1/18");
      await page.reload();
      await first.scrollIntoViewIfNeeded();
      await expect(page.locator(".quiz-score-bar-value")).toHaveText("1/18");
      const reset = page.locator(".quiz-reset-button");
      await expect(reset).toHaveAccessibleName(messages.resetLabel);
      await reset.click();
      await first.scrollIntoViewIfNeeded();
      await expect(page.locator(".quiz-score-bar-value")).toHaveText("0/18");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    });
  }
});
