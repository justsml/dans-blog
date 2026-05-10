import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import {
  optionalString,
  parseArgs,
  parseList,
  relativeToRepo,
  run,
  runInherited,
} from "./utils.ts";

const QWEN_BASELINE_MODEL = "openrouter/qwen/qwen3.6-plus";
const QWEN_REPORT_FILE = "openrouter-qwen-qwen3.6-plus.md";

type Task = {
  slug: string;
  locale: ActiveLocale;
  targetPath: string;
  reportPath: string;
};

const options = parseArgs();
const selectedLocales = parseList(optionalString(options, "locales"), [...ACTIVE_LOCALES])
  .filter((locale): locale is ActiveLocale => ACTIVE_LOCALES.includes(locale as ActiveLocale));
const selectedSlugs = new Set(parseList(optionalString(options, "slugs"), []));
const limit = parseOptionalPositiveInteger(optionalString(options, "limit"));
const latestPosts = parseOptionalPositiveInteger(optionalString(options, "latest-posts"));
const timeoutSeconds = parsePositiveInteger(optionalString(options, "timeout-seconds"), 240);
const shouldDryRun = options["dry-run"] === true;
const shouldPush = options["push"] === true;
const shouldMissingOnly = options["missing-only"] === true;
const shouldRetryRejected = options["retry-rejected"] !== false;

const tasks = getQwenBaselineTasks();
const limitedTasks = limit == null ? tasks : tasks.slice(0, limit);

console.log(`Found ${tasks.length} Qwen baseline task(s).`);
console.log(`Processing ${limitedTasks.length} task(s).`);
console.log(`Model: ${QWEN_BASELINE_MODEL}`);
console.log(`Timeout seconds: ${timeoutSeconds}`);

if (shouldDryRun) {
  for (const task of limitedTasks) {
    const fileStatus = existsSync(task.targetPath) ? "existing-file" : "missing-file";
    console.log(`${task.locale}/${task.slug} ${fileStatus} -> ${relativeToRepo(task.reportPath)}`);
  }
  process.exit(0);
}

for (const [index, task] of limitedTasks.entries()) {
  console.log(`\n[${index + 1}/${limitedTasks.length}] ${task.locale}/${task.slug}`);
  runInherited("git", ["pull", "--rebase", "origin", "main"]);
  requireCleanWorktree();

  const beforeHead = run("git", ["rev-parse", "HEAD"]);
  runInherited("bun", [
    "run",
    "i18n:translate:candidates",
    "--",
    "--slug",
    task.slug,
    "--locale",
    task.locale,
    "--models",
    QWEN_BASELINE_MODEL,
    "--timeout-seconds",
    String(timeoutSeconds),
  ]);

  const afterHead = run("git", ["rev-parse", "HEAD"]);
  if (afterHead === beforeHead) {
    console.log("No commit created; Qwen report already satisfied or model produced no change.");
    continue;
  }

  if (shouldPush) {
    runInherited("git", ["push", "origin", "HEAD:main"]);
  }
}

function getQwenBaselineTasks() {
  const postsDir = join(process.cwd(), "src/content/posts");
  const tasks: Task[] = [];
  const postEntries = readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => hasSourcePost(join(postsDir, entry.name)))
    .sort((a, b) => b.name.localeCompare(a.name));
  const scopedPostEntries = latestPosts == null ? postEntries : postEntries.slice(0, latestPosts);

  for (const entry of scopedPostEntries) {
    const postDir = join(postsDir, entry.name);
    const slug = stripDatePrefix(entry.name);
    if (selectedSlugs.size > 0 && !selectedSlugs.has(slug) && !selectedSlugs.has(entry.name)) continue;

    for (const locale of selectedLocales) {
      const targetPath = join(postDir, locale, "index.mdx");
      const reportPath = join(process.cwd(), "reports/i18n", slug, locale, QWEN_REPORT_FILE);
      if (shouldMissingOnly && existsSync(targetPath)) continue;
      if (hasSuccessfulQwenReport(reportPath)) continue;
      if (!shouldRetryRejected && existsSync(reportPath)) continue;
      tasks.push({ slug, locale, targetPath, reportPath });
    }
  }

  return tasks.sort((a, b) => {
    const byMissingFile = Number(existsSync(a.targetPath)) - Number(existsSync(b.targetPath));
    if (byMissingFile !== 0) return byMissingFile;

    const byTarget = b.targetPath.localeCompare(a.targetPath);
    return byTarget || a.locale.localeCompare(b.locale);
  });
}

function hasSourcePost(postDir: string) {
  return existsSync(join(postDir, "index.mdx")) || existsSync(join(postDir, "index.md"));
}

function hasSuccessfulQwenReport(reportPath: string) {
  if (!existsSync(reportPath)) return false;
  const contents = readFileSync(reportPath, "utf8");
  return !contents.includes("- Validation: rejected:");
}

function requireCleanWorktree() {
  const status = run("git", ["status", "--short"]);
  if (status.length > 0) {
    throw new Error(`Refusing to continue with a dirty worktree:\n${status}`);
  }
}

function stripDatePrefix(directoryName: string) {
  return directoryName.replace(/^\d{4}-\d{2}-\d{2}--/, "");
}

function parsePositiveInteger(rawValue: string | undefined, fallback: number) {
  const parsedValue = rawValue == null ? fallback : Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`Expected a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}

function parseOptionalPositiveInteger(rawValue: string | undefined) {
  if (rawValue == null) return undefined;
  return parsePositiveInteger(rawValue, 1);
}
