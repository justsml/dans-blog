import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import { optionalString, parseArgs, parseList } from "./utils.ts";

type SourcePost = {
  category: string;
  date?: string;
  directory: string;
  isDraft: boolean;
  isHidden: boolean;
  isUnlisted: boolean;
  slug: string;
  title: string;
};

type CandidateSummary = {
  locale: ActiveLocale;
  count: number;
  expected: number;
  reports: number;
  inputTokens: number;
  outputTokens: number;
  thinkingTokens: number;
  cachedInputTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  costUsd: number;
  hasUnknownCost: boolean;
};

type ArticleRow = SourcePost & {
  candidates: Record<ActiveLocale, CandidateSummary>;
};

type Totals = {
  articles: number;
  slots: number;
  completeSlots: number;
  candidateRows: number;
  inputTokens: number;
  outputTokens: number;
  thinkingTokens: number;
  cachedInputTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  costUsd: number;
  hasUnknownCost: boolean;
};

const REPORT_ROOT = join(process.cwd(), "reports/i18n");
const POSTS_ROOT = join(process.cwd(), "src/content/posts");

const options = parseArgs();
const expectedCandidates = parsePositiveInteger(optionalString(options, "expected"), 2);
const selectedLocales = parseLocales();
const selectedSlugs = new Set(parseList(optionalString(options, "slugs"), []));
const shouldIncludeDrafts = options["include-drafts"] === true;
const shouldIncludeHidden = options["include-hidden"] === true;
const shouldIncompleteOnly = options["incomplete-only"] === true;
const watchIntervalSeconds = parseOptionalPositiveInteger(optionalString(options, "watch"));

if (watchIntervalSeconds == null) {
  render();
} else {
  render();
  setInterval(() => {
    console.clear();
    render();
  }, watchIntervalSeconds * 1000);
}

function render() {
  const rows = collectRows();
  const visibleRows = shouldIncompleteOnly
    ? rows.filter((row) => selectedLocales.some((locale) => row.candidates[locale].count < expectedCandidates))
    : rows;
  const totals = summarize(rows);

  console.log(renderDashboard(visibleRows, totals));
}

function collectRows(): ArticleRow[] {
  return collectSourcePosts()
    .filter((post) => shouldIncludeHidden || !post.isHidden)
    .filter((post) => shouldIncludeDrafts || !post.isDraft)
    .filter((post) => selectedSlugs.size === 0 || selectedSlugs.has(post.slug) || selectedSlugs.has(post.directory))
    .map((post) => ({
      ...post,
      candidates: Object.fromEntries(
        selectedLocales.map((locale) => [locale, readCandidateSummary(post.slug, locale)]),
      ) as Record<ActiveLocale, CandidateSummary>,
    }))
    .sort((a, b) =>
      completionRatio(a) - completionRatio(b) ||
      (b.date ?? "").localeCompare(a.date ?? "") ||
      a.slug.localeCompare(b.slug),
    );
}

function collectSourcePosts(): SourcePost[] {
  return readdirSync(POSTS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((directory) => findIndexPath(join(POSTS_ROOT, directory)) != null)
    .map((directory) => {
      const path = findIndexPath(join(POSTS_ROOT, directory));
      if (path == null) throw new Error(`No post index found for ${directory}`);

      const parsed = matter(readFileSync(path, "utf8"));
      const data = parsed.data as Record<string, unknown>;
      const slug = stripDatePrefix(directory);

      return {
        category: stringValue(data.category) ?? "Uncategorized",
        date: stringValue(data.date),
        directory,
        isDraft: data.draft === true,
        isHidden: data.hidden === true,
        isUnlisted: data.unlisted === true,
        slug,
        title: stringValue(data.title) ?? slug,
      };
    });
}

function readCandidateSummary(slug: string, locale: ActiveLocale): CandidateSummary {
  const reportDir = join(REPORT_ROOT, slug, locale);
  const candidateRows = readCandidateRows(join(reportDir, "candidates.jsonl"));
  const fallbackReports = countCandidateReportFiles(reportDir);
  const rowsOrReports = candidateRows.length > 0 ? candidateRows.length : fallbackReports;

  return {
    locale,
    count: rowsOrReports,
    expected: expectedCandidates,
    reports: fallbackReports,
    inputTokens: sumNumbers(candidateRows, "totalInputTokens"),
    outputTokens: sumNumbers(candidateRows, "totalOutputTokens"),
    thinkingTokens: sumNestedThinkingTokens(candidateRows),
    cachedInputTokens: sumNumbers(candidateRows, "totalCacheReadTokens"),
    cacheWriteTokens: sumNumbers(candidateRows, "totalCacheWriteTokens"),
    durationMs: sumNumbers(candidateRows, "totalDurationMs"),
    costUsd: sumNumbers(candidateRows, "totalCostUsd"),
    hasUnknownCost: candidateRows.some((row) => typeof row.totalCostUsd !== "number"),
  };
}

function readCandidateRows(path: string): Array<Record<string, unknown>> {
  if (!existsSync(path)) return [];

  return readFileSync(path, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as Record<string, unknown>];
      } catch {
        return [];
      }
    });
}

function countCandidateReportFiles(reportDir: string) {
  if (!existsSync(reportDir)) return 0;

  return readdirSync(reportDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) =>
      entry.name.endsWith(".md") &&
      !entry.name.startsWith("judge") &&
      entry.name !== "candidate-shortfall.md" &&
      entry.name !== "judge-summary.md",
    )
    .length;
}

function summarize(rows: ArticleRow[]): Totals {
  const summaries = rows.flatMap((row) => selectedLocales.map((locale) => row.candidates[locale]));

  return {
    articles: rows.length,
    slots: summaries.length,
    completeSlots: summaries.filter((summary) => summary.count >= expectedCandidates).length,
    candidateRows: summaries.reduce((sum, summary) => sum + summary.count, 0),
    inputTokens: summaries.reduce((sum, summary) => sum + summary.inputTokens, 0),
    outputTokens: summaries.reduce((sum, summary) => sum + summary.outputTokens, 0),
    thinkingTokens: summaries.reduce((sum, summary) => sum + summary.thinkingTokens, 0),
    cachedInputTokens: summaries.reduce((sum, summary) => sum + summary.cachedInputTokens, 0),
    cacheWriteTokens: summaries.reduce((sum, summary) => sum + summary.cacheWriteTokens, 0),
    durationMs: summaries.reduce((sum, summary) => sum + summary.durationMs, 0),
    costUsd: summaries.reduce((sum, summary) => sum + summary.costUsd, 0),
    hasUnknownCost: summaries.some((summary) => summary.hasUnknownCost),
  };
}

function renderDashboard(rows: ArticleRow[], totals: Totals) {
  const generatedAt = new Date().toISOString();

  return [
    `# I18n Candidate TUI`,
    "",
    `Generated at \`${generatedAt}\`. Expected candidates per locale: \`${expectedCandidates}\`.`,
    "",
    renderStatusPanel(totals),
    "",
    renderLocalePanel(rows),
    "",
    "## Articles",
    "",
    markdownRow(["Article", "Category", "Date", ...selectedLocales.map((locale) => locale.toUpperCase()), "Total"]),
    markdownRow(["---", "---", "---", ...selectedLocales.map(() => "---:"), "---:"]),
    ...rows.map((row) =>
      markdownRow([
        `\`${row.slug}\``,
        row.category,
        row.date ?? "",
        ...selectedLocales.map((locale) => formatCandidateCell(row.candidates[locale])),
        `${selectedLocales.reduce((sum, locale) => sum + row.candidates[locale].count, 0)}/${selectedLocales.length * expectedCandidates}`,
      ]),
    ),
    "",
    watchIntervalSeconds == null
      ? "Tip: add `--watch 10` to refresh this terminal view every 10 seconds."
      : `Watching every ${watchIntervalSeconds}s. Press Ctrl-C to stop.`,
    "",
  ].join("\n");
}

function renderStatusPanel(totals: Totals) {
  const coverage = totals.slots === 0 ? 0 : totals.completeSlots / totals.slots;

  return [
    "## Status",
    "",
    markdownRow(["Metric", "Value"]),
    markdownRow(["---", "---:"]),
    markdownRow(["Articles", totals.articles]),
    markdownRow(["Locale slots complete", `${totals.completeSlots}/${totals.slots} (${formatPercent(coverage)})`]),
    markdownRow(["Candidate rows", totals.candidateRows]),
    markdownRow(["Input tokens", formatInteger(totals.inputTokens)]),
    markdownRow(["Output tokens", formatInteger(totals.outputTokens)]),
    markdownRow(["Thinking tokens", formatInteger(totals.thinkingTokens)]),
    markdownRow(["Cached input tokens", formatInteger(totals.cachedInputTokens)]),
    markdownRow(["Cache write tokens", formatInteger(totals.cacheWriteTokens)]),
    markdownRow(["Duration", formatDuration(totals.durationMs)]),
    markdownRow(["Estimated cost", `${formatUsd(totals.costUsd)}${totals.hasUnknownCost ? " + unknown" : ""}`]),
  ].join("\n");
}

function renderLocalePanel(rows: ArticleRow[]) {
  return [
    "## Locale Status",
    "",
    markdownRow(["Locale", "Complete", "Candidates", "Estimated cost"]),
    markdownRow(["---", "---:", "---:", "---:"]),
    ...selectedLocales.map((locale) => {
      const summaries = rows.map((row) => row.candidates[locale]);
      const complete = summaries.filter((summary) => summary.count >= expectedCandidates).length;
      const candidates = summaries.reduce((sum, summary) => sum + summary.count, 0);
      const cost = summaries.reduce((sum, summary) => sum + summary.costUsd, 0);
      const hasUnknown = summaries.some((summary) => summary.hasUnknownCost);

      return markdownRow([
        locale,
        `${complete}/${rows.length}`,
        candidates,
        `${formatUsd(cost)}${hasUnknown ? " + unknown" : ""}`,
      ]);
    }),
  ].join("\n");
}

function formatCandidateCell(summary: CandidateSummary) {
  const value = `${summary.count}/${summary.expected}`;
  if (summary.count >= summary.expected) return value;
  if (summary.count === 0) return `_${value}_`;
  return `**${value}**`;
}

function completionRatio(row: ArticleRow) {
  const expected = selectedLocales.length * expectedCandidates;
  const actual = selectedLocales.reduce((sum, locale) => sum + Math.min(row.candidates[locale].count, expectedCandidates), 0);
  return expected === 0 ? 1 : actual / expected;
}

function findIndexPath(postDir: string) {
  const mdxPath = join(postDir, "index.mdx");
  const mdPath = join(postDir, "index.md");
  if (existsSync(mdxPath)) return mdxPath;
  if (existsSync(mdPath)) return mdPath;
  return undefined;
}

function parseLocales() {
  const values = parseList(optionalString(options, "locales"), [...ACTIVE_LOCALES]);
  const invalidLocales = values.filter((value) => !ACTIVE_LOCALES.includes(value as ActiveLocale));

  if (invalidLocales.length > 0) {
    throw new Error(`--locales must be active locales. Received: ${invalidLocales.join(", ")}`);
  }

  return values as ActiveLocale[];
}

function parsePositiveInteger(rawValue: string | undefined, fallback: number) {
  const parsed = rawValue == null ? fallback : Number(rawValue);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Expected a positive integer. Received "${rawValue}".`);
  }
  return parsed;
}

function parseOptionalPositiveInteger(rawValue: string | undefined) {
  if (rawValue == null) return undefined;
  return parsePositiveInteger(rawValue, 1);
}

function stringValue(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : undefined;
}

function sumNumbers(rows: Array<Record<string, unknown>>, key: string) {
  return rows.reduce((sum, row) => {
    const value = row[key];
    return sum + (typeof value === "number" && Number.isFinite(value) ? value : 0);
  }, 0);
}

function sumNestedThinkingTokens(rows: Array<Record<string, unknown>>) {
  return rows.reduce((sum, row) => {
    const direct = row.totalThinkingTokens;
    if (typeof direct === "number" && Number.isFinite(direct)) return sum + direct;

    const telemetry = recordValue(row.telemetry);
    if (telemetry == null) return sum;
    const chunks = Array.isArray(telemetry.chunks) ? telemetry.chunks : [];
    return sum + chunks.reduce((chunkSum, chunk) => {
      const usage = recordValue(recordValue(chunk)?.telemetry);
      const value = usage?.thinkingTokens;
      return chunkSum + (typeof value === "number" && Number.isFinite(value) ? value : 0);
    }, 0);
  }, 0);
}

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value != null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function stripDatePrefix(directoryName: string) {
  return directoryName.replace(/^\d{4}-\d{2}-\d{2}--/, "");
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${(value * 100).toFixed(1)}%`;
}

function formatInteger(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function formatUsd(value: number) {
  return `$${value.toFixed(4)}`;
}

function formatDuration(milliseconds: number) {
  const seconds = Math.round(milliseconds / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function markdownRow(values: Array<number | string>) {
  return `| ${values.map((value) => escapeCell(String(value))).join(" | ")} |`;
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
