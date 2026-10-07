import { expect, test, type APIRequestContext } from '@playwright/test';
import { load } from 'cheerio';

async function readPage(request: APIRequestContext, path: string) {
  const response = await request.get(path);
  expect(response.ok(), `pagination URL ${path}`).toBe(true);
  const $ = load(await response.text());
  return {
    links: $('.article-card').map((_, card) => $(card).attr('href')).get(),
    next: $('[hx-get]').attr('hx-get'),
  };
}

for (const prefix of ['', '/es']) {
  test(`home pagination preserves every post ${prefix || '/en'}`, async ({ request }) => {
    const home = await readPage(request, `${prefix}/`);
    const firstPage = await readPage(request, `${prefix}/pages/1-date-desc/`);
    expect(home.links).toEqual(firstPage.links);
    expect(home.next).toBe(firstPage.next);

    const links = [...home.links];
    const visited = new Set<string>();
    let next = home.next;
    while (next) {
      expect(visited.has(next), `pagination loop at ${next}`).toBe(false);
      visited.add(next);
      const batch = await readPage(request, next);
      expect(batch.links.length).toBeGreaterThan(0);
      links.push(...batch.links);
      next = batch.next;
    }
    expect(visited.size).toBeGreaterThan(1);
    expect(new Set(links).size).toBe(links.length);
  });
}

for (const prefix of ['', '/es']) {
  test(`More posts appends successive batches ${prefix || '/en'}`, async ({ page, request }) => {
    await page.goto(`${prefix}/`, { waitUntil: 'domcontentloaded' });
    const list = page.locator('.article-list');
    const hrefs = () => page.locator('.article-list > .article-card').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
    for (let batch = 0; batch < 2; batch++) {
      // The loader also fires when it scrolls into view, so read the list and its next URL together, at rest.
      await expect(list).not.toHaveAttribute('aria-busy', 'true');
      const previous = await hrefs();
      const nextUrl = await page.locator('.article-list-loader').getAttribute('hx-get');
      expect(nextUrl).toBeTruthy();
      const next = await readPage(request, nextUrl!);
      // Focus scrolls the loader into view, which may start the load itself; Enter covers the case where it doesn't.
      await page.locator('.article-list-loader__button').focus();
      await page.keyboard.press('Enter');
      // A further batch may autoload once the new loader is visible; the clicked batch comes first, once.
      await expect.poll(async () => (await hrefs()).slice(0, previous.length + next.links.length))
        .toEqual([...previous, ...next.links]);
    }
    const all = await hrefs();
    expect(new Set(all).size).toBe(all.length);
  });
}

test('paging shows loading, prevents duplicate requests, and continues keyboard focus', async ({ page }) => {
  let requestCount = 0;
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/pages/2-date-desc/', async route => {
    requestCount++;
    await pending;
    await route.continue();
  });
  await page.goto('/');
  // Located by class: its accessible name switches to the loading label while busy.
  const button = page.locator('.article-list-loader__button');
  // Focusing scrolls the loader into view, which starts the load on its own; Enter covers a viewport where
  // it doesn't. A click would wait out the disabled request and then fire a second one.
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toBeDisabled();
  await expect(page.locator('.article-list')).toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('.article-list-loader__loading')).toBeVisible();
  await button.evaluate(node => { (node as HTMLButtonElement).click(); });
  release();
  await expect(page.locator('.article-list > .article-card')).toHaveCount(18);
  expect(requestCount).toBe(1);
  await expect(page.locator('[data-article-loading-status]')).toHaveText('9 more articles loaded. 18 articles shown.');
  await expect(page.locator('.article-list > .article-card').nth(9)).toBeFocused();
});

test('failed paging preserves cards and permits an inline retry', async ({ page }) => {
  await page.route('**/pages/2-date-desc/', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  await page.goto('/');
  await page.getByRole('button', { name: 'More posts', exact: true }).click();
  await expect(page.locator('.article-list > .article-card')).toHaveCount(9);
  await expect(page.locator('.article-list-loader [role="alert"]')).toBeVisible();
  const retry = page.getByRole('button', { name: 'Try again', exact: true });
  await expect(retry).toBeEnabled();
  await page.unroute('**/pages/2-date-desc/');
  await retry.click();
  await expect(page.locator('.article-list > .article-card')).toHaveCount(18);
  await expect(page.locator('.article-list-loader [role="alert"]')).toBeHidden();
});
