/** Complete existing hero families without replacing artwork or enlarging raster sources.
 * bun src/scripts/hero-formats.ts --write (otherwise audit only)
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve, relative } from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const root = process.cwd();
const postsRoot = resolve(root, "src/content/posts");
const write = process.argv.includes("--write");
const sourceOverrides: Record<string, string> = {
  // Corrected composition retains llm://openai/gpt-5.2?cache=true on one line.
  "2026-01-30--llm-connection-strings": "square-fullsize.webp",
  "2026-01-26--securing-clawdbot-tailscale": "hero-full.webp",
  "2024-08-29--handling-international-numbers-and-currency": "currency-banner-pic.webp",
  "2024-11-07--quiz-modern-css-2025": "dan-levy-downtown-denver-at-night-square.webp",
  "2024-09-29--one-weird-trick-to-speed-up-feature-teams": "square_big_danny-howe-98KlbUsOO_w-unsplash.webp",
  "2024-10-23--honest-priorities": "new-priority-city-icon.webp",
  "2025-05-31--the-last-to-think": "banner-thinking-decay.webp",
};
const wideCrops: Record<string, {left: number; top: number; width: number; height: number}> = {
  "2018-09-30--visualizing-promises": {left: 0, top: 160, width: 853, height: 474},
};
const records: Array<Record<string, unknown>> = [];
const reportDir = resolve(root, "output/hero-coverage");
await mkdir(reportDir, { recursive: true });
const local = (path: string) => relative(root, path);
const metadata = (path: string) => sharp(path).metadata();
function setField(text: string, key: string, value: string) {
  const end = text.indexOf("\n---", 3);
  const front = text.slice(0, end).replace(/\r/g, "");
  const line = `${key}: ${value}`;
  const pattern = new RegExp(`^${key}:.*$`, "m");
  return (pattern.test(front) ? front.replace(pattern, line) : `${front}\n${line}`) + text.slice(end);
}
for (const entry of await readdir(postsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = resolve(postsRoot, entry.name);
  let file = resolve(dir, "index.mdx"), text: string;
  try { text = await readFile(file, "utf8"); }
  catch { file = resolve(dir, "index.md"); try { text = await readFile(file, "utf8"); } catch { continue; } }
  const { data } = matter(text);
  const wideRef = data.cover_full_width ?? data.cover;
  if (!wideRef) {
    records.push({ slug: entry.name, status: "no assigned artwork", published: data.publish !== false && !data.hidden && !data.draft });
    continue;
  }
  const original = resolve(dir, wideRef);
  let wide = original;
  if (!data.cover_full_width) {
    wide = resolve(dir, "hero-responsive-wide.webp");
    const m = await metadata(original);
    const width = Math.min(m.width!, 1600);
    if (write) await (wideCrops[entry.name] ? sharp(original).extract(wideCrops[entry.name]) : sharp(original)).resize({ width, height: Math.round(width / 1.8), fit: "cover", position: "attention", withoutEnlargement: true }).webp({ quality: 85 }).toFile(wide);
  }
  let square = data.cover_mobile ? resolve(dir, data.cover_mobile) : undefined;
  const current = square ? await metadata(square) : undefined;
  let squareSource = square;
  let squareMethod = "existing square";
  // Native 400–599px compositions are already adequate; do not discard a matched
  // composition merely because a different exploratory image has more pixels.
  if (!current || current.width !== current.height || current.width! < 400) {
    squareSource = sourceOverrides[entry.name] ? resolve(dir, sourceOverrides[entry.name]) : original;
    square = resolve(dir, "hero-responsive-square.webp");
    const m = await metadata(squareSource);
    const size = Math.min(600, Math.min(m.width!, m.height!));
    if (size < 200) throw new Error(`No adequate square source: ${entry.name}`);
    const target = size >= 600 ? 600 : Math.floor(size / 100) * 100;
    if (write) await sharp(squareSource).resize({ width: target, height: target, fit: "cover", position: "centre", withoutEnlargement: true }).webp({ quality: 85 }).toFile(square);
    squareMethod = "recut from matching source";
  }
  if (!square) throw new Error(`Missing square: ${entry.name}`);
  let icon = data.cover_icon ? resolve(dir, data.cover_icon) : undefined;
  const iconMeta = icon ? await metadata(icon) : undefined;
  if (!iconMeta || iconMeta.width !== 200 || iconMeta.height !== 200 || square !== resolve(dir, data.cover_mobile ?? "")) {
    icon = resolve(dir, "hero-responsive-icon-200.webp");
    if (write) await sharp(square).resize(200, 200, { withoutEnlargement: true }).webp({ quality: 78 }).toFile(icon);
  }
  // Keep the informative landscape LLM URL visible, even on mobile. Its square
  // companion remains available for previews; the original wide bytes stay intact.
  const mobileHero = entry.name !== "2026-01-30--llm-connection-strings";
  const fields = { cover_full_width: wide, cover_mobile: square, cover_icon: icon! };
  let changedFiles = 0;
  if (write) {
    const contentFiles = [file];
    for (const child of await readdir(dir, { withFileTypes: true })) {
      if (child.isDirectory()) {
        for (const name of ["index.mdx", "index.md"]) {
          const candidate = resolve(dir, child.name, name);
          try { await readFile(candidate); contentFiles.push(candidate); } catch { /* No localized post. */ }
        }
      }
    }
    for (const contentFile of contentFiles) {
      const before = await readFile(contentFile, "utf8");
      let after = before;
      for (const [key, path] of Object.entries(fields)) {
        const ref = relative(dirname(contentFile), path);
        after = setField(after, key, ref.startsWith(".") ? ref : `./${ref}`);
      }
      after = setField(after, "cover_mobile_hero", String(mobileHero));
      if (before !== after) { await writeFile(contentFile, after); changedFiles++; }
    }
  }
  const wm = await metadata(write ? wide : original);
  const sm = await metadata(write ? square : squareSource!);
  records.push({ slug: entry.name, published: data.publish !== false && !data.hidden && !data.draft, status: "paired", wide: local(wide), wideSize: `${wm.width}x${wm.height}`, square: local(square), squareSize: `${sm.width}x${sm.height}`, squareSource: local(squareSource!), squareMethod, icon: local(icon!), mobileHero, changedFiles });
}
await writeFile(resolve(reportDir, write ? "manifest.json" : "audit.json"), JSON.stringify(records, null, 2) + "\n");
console.log(JSON.stringify({ mode: write ? "write" : "audit", articles: records.length, paired: records.filter(r => r.status === "paired").length, publishedPaired: records.filter(r => r.published && r.status === "paired").length, unassigned: records.filter(r => r.status !== "paired"), changedFiles: records.reduce((n, r) => n + Number(r.changedFiles ?? 0), 0) }, null, 2));
