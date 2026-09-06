/** Requires the talks server; uses installed Chrome. bun artifacts/speaking-portfolio-expanded/check-talks.ts <slug...> */
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const base = process.env.TALKS_URL || 'http://localhost:4399';
const slugs = process.argv.slice(2);
if (!slugs.length) throw new Error('Pass at least one talk slug');
const failures: string[] = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const slug of slugs) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('pageerror', e => failures.push(`${slug}: ${e.message}`));
    page.on('console', m => { if (m.type() === 'error') failures.push(`${slug}: ${m.text()}`); });
    page.on('requestfailed', r => failures.push(`${slug}: ${r.url()} ${r.failure()?.errorText}`));
    page.on('response', r => { if (r.status() >= 400) failures.push(`${slug}: HTTP ${r.status()} ${r.url()}`); });
    await page.goto(`${base}/reveal-talks/${slug}.html`);
    await page.waitForFunction(() => (window as any).Reveal?.isReady());
    const count = await page.locator('.slides > section').count();
    for (let i = 0; i < count; i++) {
      await page.evaluate(i => {
        const r = (window as any).Reveal;
        r.configure({ transition: 'none' });
        r.slide(i);
        while (r.nextFragment()) { /* reveal every fragment */ }
      }, i);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(80);
      const problems = await page.evaluate(() => {
        const slide = document.querySelector('.slides > section.present')!;
        return [...slide.querySelectorAll('h2,p,span,b,table,img,svg,pre')]
          .filter(el => !el.closest('aside') && (el as HTMLElement).checkVisibility())
          .flatMap(el => {
            const r = el.getBoundingClientRect();
            const bad = r.left < -1 || r.top < -1 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1;
            return bad ? [`${el.tagName} ${el.textContent?.slice(0, 65)} (${Math.round(r.right)},${Math.round(r.bottom)})`] : [];
          });
      });
      failures.push(...problems.map(p => `${slug} slide ${i + 1}: ${p}`));
    }
    console.log(`${slug}: checked ${count} slides at 1440×900`);
    await page.close();
  }
} finally { await browser.close(); }
// Check every changed/untracked Markdown or HTML file in this shared tree.
const paths = new Set([
  ...execFileSync('git', ['diff', '--name-only', 'HEAD', '-z']).toString().split('\0'),
  ...execFileSync('git', ['ls-files', '--others', '--exclude-standard', '-z']).toString().split('\0'),
]);
let links = 0;
for (const path of paths) {
  if (!/\.(md|html)$/.test(path) || !existsSync(path)) continue;
  const text = readFileSync(path, 'utf8');
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const href = match[1].replace(/^<|>$/g, '').split(/[?#]/)[0];
    if (!href || /^(?:[a-z]+:|\/)/i.test(href)) continue;
    links++;
    if (!existsSync(resolve(dirname(path), decodeURIComponent(href)))) failures.push(`${path}: missing ${href}`);
  }
}
console.log(`Checked ${links} local Markdown links across changed files`);
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
