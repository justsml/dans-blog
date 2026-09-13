/**
 * Report translations whose recorded `sourceHash` no longer matches the English
 * source on disk. These need retranslation, not prompt tuning: the judge scores
 * them as low-quality when the real problem is that they describe an older
 * version of the article.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { ACTIVE_LOCALES } from "../../shared/i18n.ts";
import { hashPostSource, readRecordedSourceHash } from "./source-hash.ts";

const POSTS_DIR = join(process.cwd(), "src/content/posts");

const stale: Array<{ slug: string; locale: string }> = [];
const unstamped: string[] = [];
let current = 0;

for (const dir of readdirSync(POSTS_DIR)) {
  const postDir = join(POSTS_DIR, dir);
  if (!statSync(postDir).isDirectory()) continue;

  const sourcePath = pickPostFile(postDir);
  if (sourcePath == null) continue;
  const currentHash = hashPostSource(readFileSync(sourcePath, "utf8"));
  const slug = dir.replace(/^\d{4}-\d{2}-\d{2}--/, "");

  for (const locale of ACTIVE_LOCALES) {
    const targetPath = pickPostFile(join(postDir, locale));
    if (targetPath == null) continue;

    const recorded = readRecordedSourceHash(readFileSync(targetPath, "utf8"));
    if (recorded == null) unstamped.push(`${locale}/${slug}`);
    else if (recorded !== currentHash) stale.push({ slug, locale });
    else current += 1;
  }
}

const bySlug = new Map<string, string[]>();
for (const entry of stale) {
  bySlug.set(entry.slug, [...(bySlug.get(entry.slug) ?? []), entry.locale]);
}

console.log(`Translations: ${current} current, ${stale.length} stale, ${unstamped.length} unstamped.`);
if (bySlug.size > 0) {
  console.log(`\nStale (source changed since translation):`);
  for (const [slug, locales] of [...bySlug].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(locales.length).padStart(2)} locales  ${slug}  (${locales.sort().join(", ")})`);
  }
}
if (unstamped.length > 0) {
  console.log(`\nUnstamped (run i18n:backfill-source-hash): ${unstamped.length}`);
}

process.exitCode = stale.length > 0 ? 1 : 0;

function pickPostFile(dir: string) {
  for (const name of ["index.mdx", "index.md"]) {
    const candidate = join(dir, name);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
}
