import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ACTIVE_LOCALES } from "../../../shared/i18n.ts";
import { snapshotHistory } from "./history.ts";
import { hash } from "./protocol.ts";

/** Freeze the current English source, one published locale and its recent Git history for consensus-run.ts. */
const [slug, locale, outPath] = process.argv.slice(2);
if (!slug || !locale || !outPath)
  throw Error("Usage: bun freeze-snapshot.ts SLUG LOCALE OUT_JSON");
if (!(ACTIVE_LOCALES as readonly string[]).includes(locale))
  throw Error("Unsupported locale: " + locale);
if (existsSync(outPath)) throw Error("Snapshot already frozen: " + outPath);
const root = process.cwd();
const dirs = readdirSync(join(root, "src/content/posts")).filter((d) =>
  d.endsWith("--" + slug),
);
if (dirs.length !== 1) throw Error("Expected one post directory for " + slug);
const sourcePath = `src/content/posts/${dirs[0]}/index.mdx`,
  targetPath = `src/content/posts/${dirs[0]}/${locale}/index.mdx`;
const source = readFileSync(join(root, sourcePath), "utf8"),
  target = readFileSync(join(root, targetPath), "utf8");
const snapshot = {
  locale,
  sourcePath,
  targetPath,
  source,
  target,
  sourceHash: hash(source),
  targetHash: hash(target),
  history: snapshotHistory(root, sourcePath, targetPath),
};
writeFileSync(outPath, JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Froze ${targetPath} (${snapshot.targetHash.slice(0, 12)}) → ${outPath}`);
