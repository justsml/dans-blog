import { test, expect } from '@playwright/test';

test.describe('Navigation Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  for (const [section, path] of [
    ['quizzes', /^\/challenges\/$/],
    ['categories', /^\/category\/[^/]+\/$/],
    ['popular', /^\/[^/]+\/$/],
    ['recent', /^\/[^/]+\/$/],
  ] as const) {
    test(`Articles ${section} link opens its destination`, async ({ page }) => {
      const nav = page.locator('nav.static-nav');
      await nav.locator('summary').filter({ hasText: /^Articles/ }).click();
      const link = nav.locator(`.item-${section}`).getByRole('link').first();
      const href = await link.getAttribute('href');
      expect(href).toMatch(path);
      const [response] = await Promise.all([
        page.waitForResponse(response =>
          response.request().isNavigationRequest() && response.frame() === page.mainFrame()),
        link.click(),
      ]);
      expect(response?.ok()).toBe(true);
      await expect(page).toHaveURL(new URL(href!, page.url()).href);
      await expect(page.locator('main')).toBeVisible();
    });
  }

  for (const [menu, linkName, destination] of [
    ['Projects', /Open Source Journal/, '/open-source-journal/'],
    ['About', /<form>/, '/contact/'],
  ] as const) {
    test(`${menu} link opens ${destination}`, async ({ page }) => {
      const nav = page.locator('nav.static-nav');
      await nav.locator('summary').filter({ hasText: new RegExp(`^${menu}`) }).click();
      const [response] = await Promise.all([
        page.waitForResponse(response =>
          response.request().isNavigationRequest() && response.frame() === page.mainFrame()),
        nav.getByRole('link', { name: linkName }).click(),
      ]);
      expect(response?.ok()).toBe(true);
      await expect(page).toHaveURL(new URL(destination, page.url()).href);
      await expect(page.locator('main')).toBeVisible();
    });
  }

  test('switching menus hides the old panel, and clicking outside dismisses the new one', async ({ page }) => {
    const nav = page.locator('nav.static-nav');
    await nav.locator('summary').filter({ hasText: /^Articles/ }).click();
    await expect(nav.locator('.item-quizzes')).toBeVisible();
    await nav.locator('summary').filter({ hasText: /^Projects/ }).click();
    await expect(nav.locator('.item-quizzes')).toBeHidden();
    const project = nav.getByRole('link', { name: /Open Source Journal/ });
    await expect(project).toBeVisible();
    await page.locator('main').click({ position: { x: 10, y: 10 } });
    await expect(project).toBeHidden();
  });

  test('keyboard users can dismiss the menu and follow its first link', async ({ page }) => {
    const nav = page.locator('nav.static-nav');
    const articles = nav.locator('summary').filter({ hasText: /^Articles/ });
    const quizzes = nav.getByRole('link', { name: /^Quizzes/ });
    await articles.focus();
    await page.keyboard.press('Enter');
    await expect(quizzes).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(quizzes).toBeHidden();
    await articles.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(quizzes).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/challenges\/$/);
  });
});
