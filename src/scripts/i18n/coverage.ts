import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import matter from "gray-matter";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import { optionalString, parseArgs, parseList, relativeToRepo } from "./utils.ts";

type SourcePost = {
  category: string;
  date?: string;
  directory: string;
  isDraft: boolean;
  isHidden: boolean;
  isUnlisted: boolean;
  path: string;
  popularity: number;
  slug: string;
  title: string;
};

type LocaleCoverage = {
  candidateReports: number;
  hasJudge: boolean;
  hasQwenBaseline: boolean;
  hasTranslation: boolean;
  locale: ActiveLocale;
  reportPath: string;
  targetPath: string;
};

type PostCoverage = SourcePost & {
  coverage: LocaleCoverage[];
  filledCount: number;
  missingLocales: ActiveLocale[];
  priority: "critical" | "high" | "medium" | "low" | "complete";
};

const DEFAULT_OUTPUT_PATH = join(process.cwd(), "reports/i18n/coverage.md");
const POPULAR_SLUGS = new Set([
  "llm-connection-strings",
  "you-may-not-need-axios",
  "you-might-not-need-algolia",
  "ai-sdk-math-tool",
  "serverless-database-magic",
  "naming-things-real-good",
  "beware-the-single-purpose-people",
  "quiz-bash-in-the-shell",
]);

const options = parseArgs();
const selectedLocales = parseList(optionalString(options, "locales"), [...ACTIVE_LOCALES])
  .filter((locale): locale is ActiveLocale => ACTIVE_LOCALES.includes(locale as ActiveLocale));
const shouldIncludeHidden = options["include-hidden"] === true;
const shouldMissingOnly = options["missing-only"] === true;
const shouldJson = options.json === true;
const outputPath = optionalString(options, "output") ?? DEFAULT_OUTPUT_PATH;

const posts = collectCoverage()
  .filter((post) => shouldIncludeHidden || (!post.isHidden && !post.isDraft))
  .sort(sortByPriority);

const summary = summarize(posts);

if (shouldJson) {
  console.log(JSON.stringify({ summary, posts }, null, 2));
} else {
  console.log(renderConsoleSummary(summary));
  const reportPosts = shouldMissingOnly
    ? posts.filter((post) => post.missingLocales.length > 0)
    : posts;
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, renderMarkdown(reportPosts, summary), "utf8");
  console.log(`Wrote ${relativeToRepo(outputPath)}`);
}

function collectCoverage(): PostCoverage[] {
  const postsDir = join(process.cwd(), "src/content/posts");
  const postDirs = readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((directory) => findIndexPath(join(postsDir, directory)) != null)
    .sort();

  return postDirs.map((directory) => {
    const postDir = join(postsDir, directory);
    const sourcePath = findIndexPath(postDir);
    if (sourcePath == null) {
      throw new Error(`No source index found for ${postDir}`);
    }

    const sourcePost = readSourcePost(directory, sourcePath);
    const coverage = selectedLocales.map((locale) => getLocaleCoverage(sourcePost, locale));
    const missingLocales = coverage
      .filter((item) => !item.hasTranslation)
      .map((item) => item.locale);
    const filledCount = coverage.length - missingLocales.length;

    return {
      ...sourcePost,
      coverage,
      filledCount,
      missingLocales,
      priority: getPriority(sourcePost, missingLocales),
    };
  });
}

function readSourcePost(directory: string, path: string): SourcePost {
  const parsed = matter(readFileSync(path, "utf8"));
  const data = parsed.data as Record<string, unknown>;

  return {
    category: stringValue(data.category) ?? "Uncategorized",
    date: stringValue(data.date),
    directory,
    isDraft: data.draft === true,
    isHidden: data.hidden === true,
    isUnlisted: data.unlisted === true,
    path,
    popularity: numberValue(data.popularity) ?? 0,
    slug: stripDatePrefix(directory),
    title: stringValue(data.title) ?? stripDatePrefix(directory),
  };
}

function getLocaleCoverage(post: SourcePost, locale: ActiveLocale): LocaleCoverage {
  const postDir = dirname(post.path);
  const targetPath = join(postDir, locale, "index.mdx");
  const fallbackTargetPath = join(postDir, locale, "index.md");
  const reportPath = join(process.cwd(), "reports/i18n", post.slug, locale);
  const reports = existsSync(reportPath)
    ? readdirSync(reportPath, { withFileTypes: true }).filter((entry) => entry.isFile())
    : [];

  return {
    candidateReports: reports.filter((entry) =>
      entry.name.endsWith(".md") &&
      !entry.name.startsWith("judge") &&
      entry.name !== "candidate-shortfall.md",
    ).length,
    hasJudge: existsSync(join(reportPath, "judge-summary.md")) || existsSync(join(reportPath, "judge.md")),
    hasQwenBaseline: existsSync(join(reportPath, "openrouter-qwen-qwen3.6-plus.md")),
    hasTranslation: existsSync(targetPath) || existsSync(fallbackTargetPath),
    locale,
    reportPath,
    targetPath,
  };
}

function summarize(posts: PostCoverage[]) {
  const totalSlots = posts.length * selectedLocales.length;
  const filledSlots = posts.reduce((sum, post) => sum + post.filledCount, 0);
  const missingSlots = totalSlots - filledSlots;
  const localeRows = selectedLocales.map((locale) => {
    const filled = posts.filter((post) =>
      post.coverage.some((item) => item.locale === locale && item.hasTranslation),
    ).length;

    return {
      filled,
      locale,
      missing: posts.length - filled,
      percent: posts.length === 0 ? 0 : filled / posts.length,
    };
  });

  return {
    completePosts: posts.filter((post) => post.missingLocales.length === 0).length,
    filledSlots,
    localeRows,
    missingSlots,
    posts: posts.length,
    totalSlots,
  };
}

function renderConsoleSummary(summary: ReturnType<typeof summarize>) {
  return [
    `English posts: ${summary.posts}`,
    `Translation slots: ${summary.filledSlots}/${summary.totalSlots} filled (${formatPercent(summary.filledSlots / summary.totalSlots)}), ${summary.missingSlots} missing`,
    `Complete posts: ${summary.completePosts}/${summary.posts}`,
    "",
    ...summary.localeRows.map((row) =>
      `${row.locale}: ${row.filled}/${summary.posts} (${formatPercent(row.percent)}) missing ${row.missing}`,
    ),
  ].join("\n");
}

function renderMarkdown(posts: PostCoverage[], summary: ReturnType<typeof summarize>) {
  const missingPosts = posts.filter((post) => post.missingLocales.length > 0);
  const zeroCoveragePosts = posts.filter((post) => post.filledCount === 0);
  const waitingCandidateRows = missingPosts.flatMap((post) =>
    post.coverage
      .filter((item) => !item.hasTranslation && item.candidateReports > 0)
      .map((item) => [post.slug, item.locale, item.candidateReports, item.hasQwenBaseline ? "yes" : "no"]),
  );
  const translationWithoutJudgeRows = posts.flatMap((post) =>
    post.coverage
      .filter((item) => item.hasTranslation && !item.hasJudge)
      .map((item) => [post.slug, item.locale, item.hasQwenBaseline ? "yes" : "no"]),
  );

  return [
    "# I18n Coverage",
    "",
    `Generated at \`${new Date().toISOString()}\`.`,
    "",
    "## Summary",
    "",
    `- English posts: ${summary.posts}`,
    `- Translation slots: ${summary.filledSlots}/${summary.totalSlots} filled (${formatPercent(summary.filledSlots / summary.totalSlots)})`,
    `- Missing slots: ${summary.missingSlots}`,
    `- Fully translated posts: ${summary.completePosts}/${summary.posts}`,
    `- Locales: ${selectedLocales.join(", ")}`,
    "",
    "## Locale Coverage",
    "",
    markdownRow(["Locale", "Filled", "Missing", "Coverage"]),
    markdownRow(["---", "---:", "---:", "---:"]),
    ...summary.localeRows.map((row) =>
      markdownRow([row.locale, row.filled, row.missing, formatPercent(row.percent)]),
    ),
    "",
    "## Zero Coverage Posts",
    "",
    ...renderPostList(zeroCoveragePosts),
    "",
    "## Health Notes",
    "",
    `- Missing locale slots with candidate reports waiting: ${waitingCandidateRows.length}`,
    `- Existing translations without judge summaries: ${translationWithoutJudgeRows.length}`,
    "",
    "### Candidate Reports Without Translation Files",
    "",
    ...renderWaitingCandidateRows(waitingCandidateRows),
    "",
    "### Translations Without Judge Summaries",
    "",
    ...renderTranslationWithoutJudgeRows(translationWithoutJudgeRows),
    "",
    "## Prioritized Gaps",
    "",
    markdownRow(["Priority", "Post", "Category", "Date", "Filled", "Missing locales", "Reports waiting"]),
    markdownRow(["---", "---", "---", "---", "---:", "---", "---:"]),
    ...missingPosts.map((post) =>
      markdownRow([
        post.priority,
        post.slug,
        post.category,
        post.date ?? "",
        `${post.filledCount}/${selectedLocales.length}`,
        post.missingLocales.join(", "),
        post.coverage.filter((item) => !item.hasTranslation && item.candidateReports > 0).length,
      ]),
    ),
    "",
    "## Translation Queue Commands",
    "",
    "```sh",
    "bun run i18n:qwen:baseline -- --missing-only --limit 10",
    "bun run i18n:translate:all-missing -- --min-candidates 2 --limit 5",
    "bun run i18n:report:models",
    "bun run i18n:coverage",
    "```",
    "",
  ].join("\n");
}

function renderWaitingCandidateRows(rows: Array<Array<string | number>>) {
  if (rows.length === 0) return ["No waiting candidate reports found."];
  return [
    markdownRow(["Post", "Locale", "Candidate reports", "Qwen baseline"]),
    markdownRow(["---", "---", "---:", "---"]),
    ...rows.map((row) => markdownRow(row)),
  ];
}

function renderTranslationWithoutJudgeRows(rows: Array<Array<string>>) {
  if (rows.length === 0) return ["No unjudged translations found."];
  return [
    markdownRow(["Post", "Locale", "Qwen baseline"]),
    markdownRow(["---", "---", "---"]),
    ...rows.map((row) => markdownRow(row)),
  ];
}

function renderPostList(posts: PostCoverage[]) {
  if (posts.length === 0) return ["No zero-coverage posts."];
  return posts.map((post) => `- \`${post.slug}\` (${post.category}, ${post.date ?? "undated"})`);
}

function getPriority(
  post: SourcePost,
  missingLocales: ActiveLocale[],
): PostCoverage["priority"] {
  if (missingLocales.length === 0) return "complete";
  if (POPULAR_SLUGS.has(post.slug) && missingLocales.length >= 3) return "critical";
  if (post.popularity >= 0.7 || isRecent(post.date)) return "high";
  if (post.category === "Quiz" || missingLocales.length >= 4) return "medium";
  return "low";
}

function isRecent(date: string | undefined) {
  if (date == null) return false;
  return new Date(date).getFullYear() >= 2025;
}

function sortByPriority(a: PostCoverage, b: PostCoverage) {
  const priorityRank = { critical: 0, high: 1, medium: 2, low: 3, complete: 4 };
  return (
    priorityRank[a.priority] - priorityRank[b.priority] ||
    b.missingLocales.length - a.missingLocales.length ||
    b.popularity - a.popularity ||
    b.directory.localeCompare(a.directory)
  );
}

function findIndexPath(postDir: string) {
  const mdxPath = join(postDir, "index.mdx");
  const mdPath = join(postDir, "index.md");
  if (existsSync(mdxPath)) return mdxPath;
  if (existsSync(mdPath)) return mdPath;
  return undefined;
}

function stripDatePrefix(directoryName: string) {
  return directoryName.replace(/^\d{4}-\d{2}-\d{2}--/, "");
}

function stringValue(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : undefined;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${(value * 100).toFixed(1)}%`;
}

function markdownRow(values: Array<string | number>) {
  return `| ${values.map((value) => escapeCell(String(value))).join(" | ")} |`;
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
