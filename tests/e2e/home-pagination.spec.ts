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
    const cards = page.locator('.article-list > .article-card');
    for (let batch = 0; batch < 2; batch++) {
      const nextUrl = await page.locator('.article-list-loader').getAttribute('hx-get');
      expect(nextUrl).toBeTruthy();
      const next = await readPage(request, nextUrl!);
      const previous = await cards.evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
      await page.getByRole('button', { name: 'More posts', exact: true }).click();
      await expect(cards).toHaveCount(previous.length + next.links.length);
      expect(await cards.evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))))
        .toEqual([...previous, ...next.links]);
    }
  });
}
