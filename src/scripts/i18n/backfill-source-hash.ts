/**
 * Stamp `sourceHash` into existing translations.
 *
 * Each translation is stamped with the hash of the English source *as it stood
 * when that translation was last committed*, not the source as it stands today.
 * Stamping today's hash everywhere would mark already-stale translations as
 * current and destroy the signal this field exists to carry.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ACTIVE_LOCALES } from "../../shared/i18n.ts";
import { SOURCE_HASH_KEY, hashPostSource } from "./source-hash.ts";
import { optionalString, parseArgs, relativeToRepo } from "./utils.ts";

const POSTS_DIR = join(process.cwd(), "src/content/posts");
const options = parseArgs();
const isDryRun = options["dry-run"] === true;
const onlySlug = optionalString(options, "slug");

let stamped = 0;
let alreadyStamped = 0;
let stale = 0;
const unresolved: string[] = [];

for (const dir of readdirSync(POSTS_DIR)) {
  const postDir = join(POSTS_DIR, dir);
  if (!statSync(postDir).isDirectory()) continue;
  if (onlySlug != null && !dir.endsWith(onlySlug)) continue;

  const sourcePath = pickPostFile(postDir);
  if (sourcePath == null) continue;
  const currentHash = hashPostSource(readFileSync(sourcePath, "utf8"));

  for (const locale of ACTIVE_LOCALES) {
    const targetPath = pickPostFile(join(postDir, locale));
    if (targetPath == null) continue;

    const contents = readFileSync(targetPath, "utf8");
    if (readFrontmatterKey(contents, SOURCE_HASH_KEY) != null) {
      alreadyStamped += 1;
      continue;
    }

    const historicalSource = readSourceAtCommitOf(targetPath, sourcePath);
    if (historicalSource == null) {
      unresolved.push(relativeToRepo(targetPath));
      continue;
    }

    const hash = hashPostSource(historicalSource);
    if (hash !== currentHash) stale += 1;
    stamped += 1;

    if (!isDryRun) {
      writeFileSync(targetPath, insertFrontmatterKey(contents, SOURCE_HASH_KEY, hash), "utf8");
    }
  }
}

console.log(`${isDryRun ? "[dry run] " : ""}stamped ${stamped} translation(s).`);
console.log(`- already stamped: ${alreadyStamped}`);
console.log(`- stamped as STALE (source has changed since): ${stale}`);
if (unresolved.length > 0) {
  console.log(`- could not resolve a historical source for ${unresolved.length}:`);
  for (const path of unresolved) console.log(`  ${path}`);
}

function pickPostFile(dir: string) {
  for (const name of ["index.mdx", "index.md"]) {
    const candidate = join(dir, name);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
}

/** The English source's content at the commit that last touched `targetPath`. */
function readSourceAtCommitOf(targetPath: string, sourcePath: string) {
  const commit = git(["log", "-1", "--format=%H", "--", targetPath]);
  if (commit == null || commit === "") return undefined;
  return git(["show", `${commit}:${relativeToRepo(sourcePath)}`]);
}

function git(args: string[]) {
  try {
    return execFileSync("git", args, { cwd: process.cwd(), encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch {
    return undefined;
  }
}

function readFrontmatterKey(contents: string, key: string) {
  const block = frontmatterBlock(contents);
  if (block == null) return undefined;
  const match = block.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim();
}

/**
 * Append the key textually so the rest of the YAML keeps its exact formatting.
 * The value is always quoted: an all-digit hash would otherwise parse as a
 * number, which both changes its type and drops any leading zero.
 */
function insertFrontmatterKey(contents: string, key: string, value: string) {
  const end = contents.indexOf("\n---", 3);
  if (!contents.startsWith("---") || end === -1) {
    throw new Error("Translation is missing a frontmatter block.");
  }
  return `${contents.slice(0, end)}\n${key}: "${value}"${contents.slice(end)}`;
}

function frontmatterBlock(contents: string) {
  if (!contents.startsWith("---")) return undefined;
  const end = contents.indexOf("\n---", 3);
  return end === -1 ? undefined : contents.slice(3, end);
}
