import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import {
  collectSourcePosts,
  filterActiveLocales,
  getTranslationSlot,
  type SourcePost,
} from "./corpus-inventory.ts";
import { analyzeHeadingAnchorLinks } from "./heading-link-validation.ts";
import { compareMdxStructure, type MdxStructureCounts } from "./structural-validation.ts";
import { optionalString, parseArgs, parseList, relativeToRepo } from "./utils.ts";

type StructuralCoverage = {
  score: number;
  valid: boolean;
  issueCount: number;
  blockingIssueCount: number;
  differences: Record<string, number>;
  summary: string;
  sourceCounts: MdxStructureCounts;
  targetCounts: MdxStructureCounts;
};

type HeadingLinkCoverage = {
  checkedLinks: number;
  failedLinks: number;
  staleSourceAnchorLinks: number;
  unresolvedTargetLinks: number;
  wrongHeadingAnchorLinks: number;
  examples: string[];
};

type LocaleCoverage = {
  candidateReports: number;
  hasJudge: boolean;
  hasQwenBaseline: boolean;
  hasTranslation: boolean;
  locale: ActiveLocale;
  reportPath: string;
  headingLinks?: HeadingLinkCoverage;
  structure?: StructuralCoverage;
  targetPath: string;
  translationPath?: string;
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
const selectedLocales = filterActiveLocales(parseList(optionalString(options, "locales"), [...ACTIVE_LOCALES]));
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
  return collectSourcePosts().map((sourcePost) => {
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

function getLocaleCoverage(post: SourcePost, locale: ActiveLocale): LocaleCoverage {
  const paths = getTranslationSlot(post, locale);
  const targetPath = paths.targetPath;
  const fallbackTargetPath = paths.fallbackTargetPath;
  const reportPath = paths.reportDir;
  const reports = existsSync(reportPath)
    ? readdirSync(reportPath, { withFileTypes: true }).filter((entry) => entry.isFile())
    : [];
  const translationPath = existingTranslationPath(targetPath, fallbackTargetPath);
  const structure = translationPath == null
    ? undefined
    : getStructuralCoverage(paths.sourcePath, translationPath);
  const headingLinks = translationPath == null
    ? undefined
    : getHeadingLinkCoverage(paths.sourcePath, translationPath);

  return {
    candidateReports: reports.filter((entry) =>
      entry.name.endsWith(".md") &&
      !entry.name.startsWith("judge") &&
      entry.name !== "candidate-shortfall.md",
    ).length,
    hasJudge: existsSync(join(reportPath, "judge-summary.md")) || existsSync(join(reportPath, "judge.md")),
    hasQwenBaseline: existsSync(join(reportPath, "openrouter-qwen-qwen3.6-plus.md")),
    hasTranslation: translationPath != null,
    headingLinks,
    locale,
    reportPath,
    structure,
    targetPath,
    translationPath,
  };
}

function existingTranslationPath(targetPath: string, fallbackTargetPath: string) {
  if (existsSync(targetPath)) return targetPath;
  if (existsSync(fallbackTargetPath)) return fallbackTargetPath;
  return undefined;
}

function getStructuralCoverage(sourcePath: string, translationPath: string): StructuralCoverage {
  const comparison = compareMdxStructure({
    sourceContents: readFileSync(sourcePath, "utf8"),
    targetContents: readFileSync(translationPath, "utf8"),
    targetPath: relativeToRepo(translationPath),
  });

  return {
    score: comparison.score,
    valid: comparison.valid,
    issueCount: comparison.issues.length,
    blockingIssueCount: comparison.issues.filter((issue) => issue.blocking).length,
    differences: comparison.differences,
    summary: comparison.summary,
    sourceCounts: comparison.source.counts,
    targetCounts: comparison.target.counts,
  };
}

function getHeadingLinkCoverage(sourcePath: string, translationPath: string): HeadingLinkCoverage {
  const report = analyzeHeadingAnchorLinks({
    sourceContents: readFileSync(sourcePath, "utf8"),
    targetContents: readFileSync(translationPath, "utf8"),
  });

  return {
    checkedLinks: report.checkedLinks,
    failedLinks: report.failedLinks,
    staleSourceAnchorLinks: report.staleSourceAnchorLinks,
    unresolvedTargetLinks: report.unresolvedTargetLinks,
    wrongHeadingAnchorLinks: report.wrongHeadingAnchorLinks,
    examples: report.failures.slice(0, 3).map((failure) =>
      `line ${failure.lineNumber}: #${failure.targetFragment || "(missing)"} -> #${failure.expectedFragment}`,
    ),
  };
}

function summarize(posts: PostCoverage[]) {
  const totalSlots = posts.length * selectedLocales.length;
  const filledSlots = posts.reduce((sum, post) => sum + post.filledCount, 0);
  const missingSlots = totalSlots - filledSlots;
  const structuralSlots = posts.flatMap((post) =>
    post.coverage.filter((item) => item.structure != null),
  );
  const structuralValidSlots = structuralSlots.filter((item) => item.structure?.valid === true).length;
  const structuralInvalidSlots = structuralSlots.length - structuralValidSlots;
  const headingLinkSlots = posts.flatMap((post) =>
    post.coverage.filter((item) => (item.headingLinks?.checkedLinks ?? 0) > 0),
  );
  const headingLinkFailureSlots = headingLinkSlots.filter((item) => (item.headingLinks?.failedLinks ?? 0) > 0);
  const headingLinkFailures = headingLinkSlots.reduce((sum, item) => sum + (item.headingLinks?.failedLinks ?? 0), 0);
  const averageStructureScore = average(
    structuralSlots.map((item) => item.structure?.score).filter((score): score is number => score != null),
  );
  const minimumStructureScore = minimum(
    structuralSlots.map((item) => item.structure?.score).filter((score): score is number => score != null),
  );
  const localeRows = selectedLocales.map((locale) => {
    const filled = posts.filter((post) =>
      post.coverage.some((item) => item.locale === locale && item.hasTranslation),
    ).length;
    const structureSlots = posts
      .flatMap((post) => post.coverage)
      .filter((item) => item.locale === locale && item.structure != null);
    const validStructure = structureSlots.filter((item) => item.structure?.valid === true).length;
    const structureScores = structureSlots
      .map((item) => item.structure?.score)
      .filter((score): score is number => score != null);
    const localeHeadingLinkSlots = posts
      .flatMap((post) => post.coverage)
      .filter((item) => item.locale === locale && (item.headingLinks?.checkedLinks ?? 0) > 0);
    const localeHeadingLinkFailureSlots = localeHeadingLinkSlots
      .filter((item) => (item.headingLinks?.failedLinks ?? 0) > 0);

    return {
      averageStructureScore: average(structureScores),
      filled,
      headingLinkFailureSlots: localeHeadingLinkFailureSlots.length,
      headingLinkFailures: localeHeadingLinkSlots.reduce((sum, item) => sum + (item.headingLinks?.failedLinks ?? 0), 0),
      headingLinkSlots: localeHeadingLinkSlots.length,
      locale,
      minimumStructureScore: minimum(structureScores),
      missing: posts.length - filled,
      percent: posts.length === 0 ? 0 : filled / posts.length,
      structuralInvalid: structureSlots.length - validStructure,
      structuralValid: validStructure,
    };
  });

  return {
    averageStructureScore,
    completePosts: posts.filter((post) => post.missingLocales.length === 0).length,
    filledSlots,
    headingLinkFailureSlots: headingLinkFailureSlots.length,
    headingLinkFailures,
    headingLinkSlots: headingLinkSlots.length,
    localeRows,
    minimumStructureScore,
    missingSlots,
    posts: posts.length,
    structuralInvalidSlots,
    structuralSlots: structuralSlots.length,
    structuralValidSlots,
    totalSlots,
  };
}

function renderConsoleSummary(summary: ReturnType<typeof summarize>) {
  return [
    `English posts: ${summary.posts}`,
    `Translation slots: ${summary.filledSlots}/${summary.totalSlots} filled (${formatPercent(summary.filledSlots / summary.totalSlots)}), ${summary.missingSlots} missing`,
    `Complete posts: ${summary.completePosts}/${summary.posts}`,
    `Structure valid: ${summary.structuralValidSlots}/${summary.structuralSlots} (${formatPercent(summary.structuralValidSlots / summary.structuralSlots)}), avg score ${formatScore(summary.averageStructureScore)}, min ${formatScore(summary.minimumStructureScore)}`,
    `Heading anchor links: ${summary.headingLinkFailureSlots}/${summary.headingLinkSlots} translation(s) with failures, ${summary.headingLinkFailures} failing link(s)`,
    "",
    ...summary.localeRows.map((row) =>
      `${row.locale}: ${row.filled}/${summary.posts} (${formatPercent(row.percent)}) missing ${row.missing}; structure ${row.structuralValid}/${row.structuralValid + row.structuralInvalid} valid, avg ${formatScore(row.averageStructureScore)}; heading links ${row.headingLinkFailureSlots}/${row.headingLinkSlots} files, ${row.headingLinkFailures} links`,
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
  const structuralIssueRows = posts.flatMap((post) =>
    post.coverage
      .filter((item) => item.hasTranslation && item.structure != null && !item.structure.valid)
      .map((item) => [
        post.slug,
        item.locale,
        formatScore(item.structure?.score),
        item.structure?.blockingIssueCount ?? 0,
        summarizeDifferences(item.structure?.differences ?? {}),
        compactStructuralSummary(item.structure?.summary ?? ""),
      ]),
  ).sort((a, b) => Number(a[2]) - Number(b[2]) || String(a[0]).localeCompare(String(b[0])));
  const headingLinkIssueRows = posts.flatMap((post) =>
    post.coverage
      .filter((item) => item.hasTranslation && (item.headingLinks?.failedLinks ?? 0) > 0)
      .map((item) => [
        post.slug,
        item.locale,
        item.headingLinks?.checkedLinks ?? 0,
        item.headingLinks?.failedLinks ?? 0,
        item.headingLinks?.staleSourceAnchorLinks ?? 0,
        item.headingLinks?.unresolvedTargetLinks ?? 0,
        item.headingLinks?.wrongHeadingAnchorLinks ?? 0,
        item.headingLinks?.examples.join("; ") || "-",
      ]),
  ).sort((a, b) => Number(b[3]) - Number(a[3]) || String(a[0]).localeCompare(String(b[0])));

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
    `- Structure-valid translations: ${summary.structuralValidSlots}/${summary.structuralSlots} (${formatPercent(summary.structuralValidSlots / summary.structuralSlots)})`,
    `- Heading anchor link failures: ${summary.headingLinkFailures} failing link(s) across ${summary.headingLinkFailureSlots}/${summary.headingLinkSlots} translation(s) with same-page heading links`,
    `- Average structure score: ${formatScore(summary.averageStructureScore)}`,
    `- Minimum structure score: ${formatScore(summary.minimumStructureScore)}`,
    `- Locales: ${selectedLocales.join(", ")}`,
    "",
    "## Locale Coverage",
    "",
    markdownRow(["Locale", "Filled", "Missing", "Coverage", "Structure valid", "Heading link files", "Heading link fails", "Avg structure", "Min structure"]),
    markdownRow(["---", "---:", "---:", "---:", "---:", "---:", "---:", "---:", "---:"]),
    ...summary.localeRows.map((row) =>
      markdownRow([
        row.locale,
        row.filled,
        row.missing,
        formatPercent(row.percent),
        `${row.structuralValid}/${row.structuralValid + row.structuralInvalid}`,
        `${row.headingLinkFailureSlots}/${row.headingLinkSlots}`,
        row.headingLinkFailures,
        formatScore(row.averageStructureScore),
        formatScore(row.minimumStructureScore),
      ]),
    ),
    "",
    "## Structural Health",
    "",
    `- Translated slots analyzed: ${summary.structuralSlots}`,
    `- Structurally invalid translated slots: ${summary.structuralInvalidSlots}`,
    `- Average structure score: ${formatScore(summary.averageStructureScore)}`,
    `- Minimum structure score: ${formatScore(summary.minimumStructureScore)}`,
    "",
    "### Structural Issues",
    "",
    ...renderStructuralIssueRows(structuralIssueRows),
    "",
    "## Heading Anchor Link Health",
    "",
    `- Translations with same-page heading links: ${summary.headingLinkSlots}`,
    `- Translations with heading link failures: ${summary.headingLinkFailureSlots}`,
    `- Failing heading links: ${summary.headingLinkFailures}`,
    "",
    "### Heading Anchor Link Failures",
    "",
    ...renderHeadingLinkIssueRows(headingLinkIssueRows),
    "",
    "## Zero Coverage Posts",
    "",
    ...renderPostList(zeroCoveragePosts),
    "",
    "## Health Notes",
    "",
    `- Missing locale slots with candidate reports waiting: ${waitingCandidateRows.length}`,
    `- Existing translations without judge summaries: ${translationWithoutJudgeRows.length}`,
    `- Existing translations with structural parity failures: ${structuralIssueRows.length}`,
    `- Existing translations with heading anchor link failures: ${headingLinkIssueRows.length}`,
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

function renderStructuralIssueRows(rows: Array<Array<string | number>>) {
  if (rows.length === 0) return ["No structural parity failures found."];
  return [
    markdownRow(["Post", "Locale", "Score", "Blocking issues", "Differences", "Summary"]),
    markdownRow(["---", "---", "---:", "---:", "---", "---"]),
    ...rows.map((row) => markdownRow(row)),
  ];
}

function renderHeadingLinkIssueRows(rows: Array<Array<string | number>>) {
  if (rows.length === 0) return ["No heading anchor link failures found."];
  return [
    markdownRow(["Post", "Locale", "Checked", "Failures", "Stale source", "Unresolved", "Wrong heading", "Examples"]),
    markdownRow(["---", "---", "---:", "---:", "---:", "---:", "---:", "---"]),
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

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${(value * 100).toFixed(1)}%`;
}

function formatScore(value: number | undefined) {
  if (value == null || !Number.isFinite(value)) return "n/a";
  return value.toFixed(3);
}

function average(values: number[]) {
  if (values.length === 0) return undefined;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function minimum(values: number[]) {
  if (values.length === 0) return undefined;
  return Math.min(...values);
}

function summarizeDifferences(differences: Record<string, number>) {
  const entries = Object.entries(differences);
  if (entries.length === 0) return "-";
  return entries
    .slice(0, 6)
    .map(([key, value]) => `${key}:${formatSignedNumber(value)}`)
    .join(", ");
}

function compactStructuralSummary(summary: string) {
  const compact = summary
    .replace(/^[^:]+index\.mdx?:\s*/, "")
    .replace(/\s*Differences:\s*\{[\s\S]*$/, "")
    .replace(/\s+/g, " ")
    .trim();
  return compact.length <= 220 ? compact : `${compact.slice(0, 217)}...`;
}

function formatSignedNumber(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

function markdownRow(values: Array<string | number>) {
  return `| ${values.map((value) => escapeCell(String(value))).join(" | ")} |`;
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
