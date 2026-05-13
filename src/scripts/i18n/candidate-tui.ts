import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
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
  isInProgress: boolean;
  attemptedModels: number;
  rejectedModels: number;
  accountingSources: string[];
  inputTokens: number;
  outputTokens: number;
  thinkingTokens: number;
  cachedInputTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  costUsd: number;
  hasUnknownTokens: boolean;
  hasUnknownCost: boolean;
};

type ArticleRow = SourcePost & {
  candidates: Record<ActiveLocale, CandidateSummary>;
};

type Totals = {
  articles: number;
  slots: number;
  completeSlots: number;
  completeArticles: number;
  inProgressSlots: number;
  inProgressArticles: number;
  candidateRows: number;
  attemptedModels: number;
  rejectedModels: number;
  accountingSources: string[];
  inputTokens: number;
  outputTokens: number;
  thinkingTokens: number;
  cachedInputTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  costUsd: number;
  hasUnknownTokens: boolean;
  hasUnknownCost: boolean;
};

type AccountingTotals = {
  attemptedModels: number;
  rejectedModels: number;
  inputTokens: number;
  outputTokens: number;
  thinkingTokens: number;
  cachedInputTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  costUsd: number;
  hasUnknownTokens: boolean;
  hasUnknownCost: boolean;
  sources: string[];
};

type WorkerState = {
  enabled: boolean;
  status: "disabled" | "starting" | "running" | "completed" | "failed" | "stopped";
  startedAt?: Date;
  finishedAt?: Date;
  exitCode?: number | null;
  signal?: string | null;
  error?: string;
  recentOutput: string[];
};

const REPORT_ROOT = join(process.cwd(), "reports/i18n");
const POSTS_ROOT = join(process.cwd(), "src/content/posts");
const DEFAULT_TUI_TASK_CONCURRENCY = "16";
const DEFAULT_TUI_QUIZ_CONCURRENCY = "8";

const options = parseArgs();
const expectedCandidates = parsePositiveInteger(optionalString(options, "expected"), 2);
const selectedLocales = parseLocales();
const selectedSlugs = new Set(parseList(optionalString(options, "slugs"), []));
const shouldIncludeDrafts = options["include-drafts"] === true;
const shouldIncludeHidden = options["include-hidden"] === true;
const shouldIncompleteOnly = options["incomplete-only"] === true;
const shouldMarkdown = options.markdown === true || options["no-tui"] === true;
const watchIntervalSeconds = parseOptionalPositiveInteger(optionalString(options, "watch"));
const shouldUseTui = !shouldMarkdown && process.stdout.isTTY && process.stdin.isTTY;
const shouldRunWorker = options.run === true && options["monitor-only"] !== true;
const workerState: WorkerState = {
  enabled: shouldRunWorker,
  status: shouldRunWorker ? "starting" : "disabled",
  recentOutput: [],
};
let workerProcess: ChildProcess | undefined;

if (shouldRunWorker) {
  startCandidateWorker();
}

if (shouldUseTui) {
  await renderTerminalUi();
} else {
  renderMarkdownLoop();
}

function getDashboardData() {
  const rows = collectRows();
  const visibleRows = shouldIncompleteOnly
    ? rows.filter((row) => articleState(row) !== "complete")
    : rows;
  const totals = summarize(rows);

  return { rows: visibleRows, totals };
}

function renderMarkdownLoop() {
  const render = () => {
    const { rows, totals } = getDashboardData();

    console.log(renderDashboard(rows, totals));
  };

  const exitWithFinalTotals = (signal: string) => {
    const { totals } = getDashboardData();
    stopCandidateWorker(signal);
    console.log(renderFinalAccounting(totals, signal));
    process.exit(0);
  };

  render();
  if (watchIntervalSeconds != null || shouldRunWorker) {
    const interval = setInterval(() => {
      console.clear();
      render();
      if (shouldRunWorker && isWorkerFinished()) {
        clearInterval(interval);
        const { totals } = getDashboardData();
        console.log(renderFinalAccounting(totals, workerState.status));
        process.exit(workerState.status === "completed" ? 0 : 1);
      }
    }, (watchIntervalSeconds ?? 10) * 1000);

    process.once("SIGINT", () => {
      clearInterval(interval);
      exitWithFinalTotals("SIGINT");
    });
    process.once("SIGTERM", () => {
      clearInterval(interval);
      exitWithFinalTotals("SIGTERM");
    });
  }
}

async function renderTerminalUi() {
  // @ts-expect-error terminal-kit does not publish TypeScript declarations.
  const { terminal: term } = await import("terminal-kit");
  let scrollOffset = 0;
  let maxScrollOffset = 0;
  let pageStep = 10;
  let rows: ArticleRow[] = [];
  let totals: Totals;
  let lastRenderedAt = new Date();

  const refreshData = () => {
    const data = getDashboardData();
    rows = data.rows;
    totals = data.totals;
    lastRenderedAt = new Date();
  };

  const draw = () => {
    const width = term.width ?? process.stdout.columns ?? 120;
    const height = term.height ?? process.stdout.rows ?? 40;
    const sideWidth = width >= 105 ? Math.min(42, Math.max(34, Math.floor(width * 0.3))) : 0;
    const tableWidth = sideWidth > 0 ? width - sideWidth - 2 : width;
    const tableTop = 4;
    const tableHeight = Math.max(3, height - tableTop - 2);
    const visibleCount = Math.max(0, tableHeight - 2);
    const maxOffset = Math.max(0, rows.length - visibleCount);
    maxScrollOffset = maxOffset;
    pageStep = Math.max(1, visibleCount - 1);
    scrollOffset = Math.min(scrollOffset, maxOffset);

    term.clear();
    drawHeader(term, width, rows.length, lastRenderedAt);
    drawTable(term, rows.slice(scrollOffset, scrollOffset + visibleCount), tableWidth, tableTop);

    if (sideWidth > 0) {
      drawSidePanel(term, totals!, rows, tableWidth + 2, 4, sideWidth, height - 5);
    } else {
      drawBottomPanel(term, totals!, rows, 1, Math.max(tableTop + 4, height - 8), width);
    }

    drawFooter(term, width, height, scrollOffset, maxOffset);
  };

  const scrollTo = (offset: number) => {
    const nextOffset = Math.max(0, Math.min(maxScrollOffset, offset));
    if (nextOffset === scrollOffset) return;
    scrollOffset = nextOffset;
    draw();
  };

  const scrollBy = (delta: number) => scrollTo(scrollOffset + delta);
  const signalHandlers = {
    SIGINT: () => shutdown("SIGINT"),
    SIGTERM: () => shutdown("SIGTERM"),
  };

  refreshData();
  term.fullscreen(true);
  term.hideCursor(true);
  term.grabInput({ mouse: "motion" });
  draw();
  process.once("SIGINT", signalHandlers.SIGINT);
  process.once("SIGTERM", signalHandlers.SIGTERM);

  const interval = setInterval(() => {
    refreshData();
    draw();
  }, (watchIntervalSeconds ?? 10) * 1000);

  let didShutdown = false;
  function shutdown(reason: string) {
    if (didShutdown) return;
    didShutdown = true;
    clearInterval(interval);
    process.off("SIGINT", signalHandlers.SIGINT);
    process.off("SIGTERM", signalHandlers.SIGTERM);
    stopCandidateWorker(reason);
    refreshData();
    term.grabInput(false);
    term.hideCursor(false);
    term.fullscreen(false);
    term.styleReset();
    console.log(renderFinalAccounting(totals!, reason));
    process.exit(0);
  }

  term.on("key", (name: string) => {
    if (name === "CTRL_C") shutdown("CTRL_C");
    if (name === "q" || name === "Q") shutdown("q");
    if (name === "ESCAPE") shutdown("ESCAPE");
    if (name === "r") {
      refreshData();
      draw();
    }
    if (name === "UP") {
      scrollBy(-1);
    }
    if (name === "DOWN") {
      scrollBy(1);
    }
    if (name === "PAGE_UP") {
      scrollBy(-pageStep);
    }
    if (name === "PAGE_DOWN") {
      scrollBy(pageStep);
    }
    if (name === "HOME") {
      scrollTo(0);
    }
    if (name === "END") {
      scrollTo(maxScrollOffset);
    }
  });

  term.on("mouse", (name: string, data?: { y?: number }) => {
    if (name === "MOUSE_WHEEL_UP") scrollBy(-3);
    if (name === "MOUSE_WHEEL_DOWN") scrollBy(3);
    if (name === "MOUSE_LEFT_BUTTON_PRESSED" && typeof data?.y === "number") {
      const tableRow = data.y - 6;
      if (tableRow >= 0) scrollTo(scrollOffset + tableRow);
    }
  });
}

function drawHeader(
  term: any,
  width: number,
  visibleRows: number,
  renderedAt: Date,
) {
  writeAt(term, 1, 1, "I18n Candidate Dashboard", width, "bold");
  writeAt(
    term,
    1,
    2,
    [
      `${visibleRows} article${visibleRows === 1 ? "" : "s"}`,
      `${selectedLocales.join(", ")}`,
      `expected ${expectedCandidates}`,
      `worker ${formatWorkerStatus()}`,
      `updated ${renderedAt.toLocaleTimeString()}`,
    ].join("  |  "),
    width,
    "gray",
  );
  writeAt(term, 1, 3, "─".repeat(width), width, "gray");
}

function drawTable(term: any, rows: ArticleRow[], width: number, top: number) {
  const totalWidth = 7;
  const statusWidth = 11;
  const categoryWidth = 12;
  const dateWidth = 10;
  const localeWidth = 7;
  const fixedWidth = categoryWidth + dateWidth + totalWidth + statusWidth + selectedLocales.length * localeWidth + 9;
  const articleWidth = Math.max(18, width - fixedWidth);
  const columns = [
    { label: "Article", width: articleWidth },
    { label: "Category", width: categoryWidth },
    { label: "Date", width: dateWidth },
    ...selectedLocales.map((locale) => ({ label: locale.toUpperCase(), width: localeWidth })),
    { label: "Total", width: totalWidth },
    { label: "Status", width: statusWidth },
  ];

  let x = 1;
  for (const column of columns) {
    writeAt(term, x, top, column.label, column.width, "bold");
    x += column.width + 1;
  }

  writeAt(term, 1, top + 1, "─".repeat(width), width, "gray");

  rows.forEach((row, index) => {
    const y = top + 2 + index;
    const total = selectedLocales.reduce((sum, locale) => sum + row.candidates[locale].count, 0);
    const values = [
      row.slug,
      row.category,
      row.date ?? "",
      ...selectedLocales.map((locale) => terminalCandidateCell(row.candidates[locale])),
      `${total}/${selectedLocales.length * expectedCandidates}`,
      formatArticleState(row),
    ];

    let cellX = 1;
    values.forEach((value, cellIndex) => {
      const column = columns[cellIndex];
      const style = cellIndex >= 3 && cellIndex < 3 + selectedLocales.length
        ? candidateStyle(row.candidates[selectedLocales[cellIndex - 3]])
        : cellIndex === values.length - 1
          ? articleStateStyle(row)
        : undefined;
      writeAt(term, cellX, y, value, column.width, style);
      cellX += column.width + 1;
    });
  });
}

function drawSidePanel(
  term: any,
  totals: Totals,
  rows: ArticleRow[],
  left: number,
  top: number,
  width: number,
  height: number,
) {
  drawPanel(term, left, top, width, height, "Status");
  const lines = [
    ["Worker", formatWorkerStatus()],
    ["Slots", `${totals.completeSlots}/${totals.slots} (${formatPercent(totals.slots === 0 ? 0 : totals.completeSlots / totals.slots)})`],
    ["Articles", `${totals.completeArticles}/${totals.articles}`],
    ["In progress", `${totals.inProgressSlots} slots, ${totals.inProgressArticles} articles`],
    ["Candidates", String(totals.candidateRows)],
    ["Attempts", String(totals.attemptedModels)],
    ["Rejected", String(totals.rejectedModels)],
    ["Input", `${formatInteger(totals.inputTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`],
    ["Output", `${formatInteger(totals.outputTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`],
    ["Cache read", formatInteger(totals.cachedInputTokens)],
    ["Cache write", formatInteger(totals.cacheWriteTokens)],
    ["Duration", formatDuration(totals.durationMs)],
    ["Cost", `${formatUsd(totals.costUsd)}${totals.hasUnknownCost ? " + unknown" : ""}`],
    ["Source", formatSources(totals.accountingSources)],
  ];

  lines.forEach(([label, value], index) => {
    writeAt(term, left + 2, top + 2 + index, `${label}:`, 13, "gray");
    writeAt(term, left + 15, top + 2 + index, value, width - 17);
  });

  const localeTop = top + lines.length + 4;
  writeAt(term, left + 2, localeTop, "Locales", width - 4, "bold");
  selectedLocales.forEach((locale, index) => {
    const summaries = rows.map((row) => row.candidates[locale]);
    const complete = summaries.filter((summary) => summary.count >= expectedCandidates).length;
    const candidates = summaries.reduce((sum, summary) => sum + summary.count, 0);
    const y = localeTop + 2 + index;
    writeAt(term, left + 2, y, locale, 4, "bold");
    writeAt(term, left + 7, y, `${complete}/${rows.length}`, 9);
    writeAt(term, left + 17, y, `${candidates} cand`, width - 19, candidates > 0 ? "green" : "gray");
  });

  if (workerState.recentOutput.length > 0) {
    const logTop = localeTop + selectedLocales.length + 4;
    if (logTop < top + height - 3) {
      writeAt(term, left + 2, logTop, "Worker Log", width - 4, "bold");
      workerState.recentOutput.slice(-Math.max(0, top + height - logTop - 2)).forEach((line, index) => {
        writeAt(term, left + 2, logTop + 2 + index, line, width - 4, "gray");
      });
    }
  }
}

function drawBottomPanel(term: any, totals: Totals, rows: ArticleRow[], left: number, top: number, width: number) {
  drawPanel(term, left, top, width, 9, "Status");
  const coverage = totals.slots === 0 ? 0 : totals.completeSlots / totals.slots;
  writeAt(term, left + 2, top + 2, `Worker ${formatWorkerStatus()}`, width - 4);
  writeAt(term, left + 2, top + 3, `Slots ${totals.completeSlots}/${totals.slots} (${formatPercent(coverage)})`, width - 4);
  writeAt(term, left + 2, top + 4, `Articles ${totals.completeArticles}/${totals.articles} | Running ${totals.inProgressSlots} slots`, width - 4);
  writeAt(term, left + 2, top + 5, `Candidates ${totals.candidateRows} | Attempts ${totals.attemptedModels} | Rejected ${totals.rejectedModels}`, width - 4);
  writeAt(term, left + 2, top + 6, `Cost ${formatUsd(totals.costUsd)}${totals.hasUnknownCost ? " + unknown" : ""} | Source ${formatSources(totals.accountingSources)}`, width - 4);
  writeAt(term, left + 2, top + 7, `Locales ${selectedLocales.map((locale) => {
    const summaries = rows.map((row) => row.candidates[locale]);
    return `${locale}:${summaries.filter((summary) => summary.count >= expectedCandidates).length}/${rows.length}`;
  }).join(" ")}`, width - 4);
}

function drawPanel(term: any, left: number, top: number, width: number, height: number, title: string) {
  writeAt(term, left, top, `┌${`─`.repeat(Math.max(0, width - 2))}┐`, width, "gray");
  for (let y = top + 1; y < top + height - 1; y += 1) {
    writeAt(term, left, y, `│${" ".repeat(Math.max(0, width - 2))}│`, width, "gray");
  }
  writeAt(term, left, top + height - 1, `└${`─`.repeat(Math.max(0, width - 2))}┘`, width, "gray");
  writeAt(term, left + 2, top, ` ${title} `, Math.max(0, width - 4), "bold");
}

function drawFooter(term: any, width: number, height: number, offset: number, maxOffset: number) {
  writeAt(term, 1, height, `q quit + stop worker | r refresh | worker ${formatWorkerStatus()} | ${offset}/${maxOffset}`, width, "gray");
}

function terminalCandidateCell(summary: CandidateSummary) {
  return summary.isInProgress ? `${summary.count}/${summary.expected}*` : `${summary.count}/${summary.expected}`;
}

function candidateStyle(summary: CandidateSummary) {
  if (summary.isInProgress) return "cyan";
  if (summary.count >= summary.expected) return "green";
  if (summary.count === 0) return "gray";
  return "yellow";
}

function articleState(row: ArticleRow) {
  const summaries = selectedLocales.map((locale) => row.candidates[locale]);
  if (summaries.some((summary) => summary.isInProgress)) return "running";
  if (summaries.every((summary) => summary.count >= summary.expected)) return "complete";
  if (summaries.some((summary) => summary.count > 0)) return "partial";
  return "missing";
}

function formatArticleState(row: ArticleRow) {
  const state = articleState(row);
  if (state === "running") return "running";
  if (state === "complete") return "complete";
  if (state === "partial") return "partial";
  return "missing";
}

function articleStateStyle(row: ArticleRow) {
  const state = articleState(row);
  if (state === "running") return "cyan";
  if (state === "complete") return "green";
  if (state === "partial") return "yellow";
  return "gray";
}

function articleStateRank(row: ArticleRow) {
  const state = articleState(row);
  if (state === "running") return 0;
  if (state === "partial") return 1;
  if (state === "missing") return 2;
  return 3;
}

function writeAt(term: any, x: number, y: number, value: string, width: number, style?: string) {
  const text = fitCell(value, width);
  term.moveTo(x, y);
  if (style != null && typeof term[style] === "function") {
    term[style](text);
  } else {
    term(text);
  }
}

function fitCell(value: string, width: number) {
  const plain = value.replace(/\s+/g, " ");
  if (plain.length === width) return plain;
  if (plain.length < width) return plain.padEnd(width, " ");
  if (width <= 1) return plain.slice(0, width);
  return `${plain.slice(0, width - 1)}…`;
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
      articleStateRank(a) - articleStateRank(b) ||
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
  const accounting = readAccountingTotals(reportDir, candidateRows);

  return {
    locale,
    count: rowsOrReports,
    expected: expectedCandidates,
    reports: fallbackReports,
    isInProgress: isRunInProgress(reportDir),
    attemptedModels: accounting.attemptedModels,
    rejectedModels: accounting.rejectedModels,
    accountingSources: accounting.sources,
    inputTokens: accounting.inputTokens,
    outputTokens: accounting.outputTokens,
    thinkingTokens: accounting.thinkingTokens,
    cachedInputTokens: accounting.cachedInputTokens,
    cacheWriteTokens: accounting.cacheWriteTokens,
    durationMs: accounting.durationMs,
    costUsd: accounting.costUsd,
    hasUnknownTokens: accounting.hasUnknownTokens,
    hasUnknownCost: accounting.hasUnknownCost,
  };
}

function isRunInProgress(reportDir: string) {
  const latestSummary = readJsonRecord(join(reportDir, "candidate-run-summary.json"));
  if (latestSummary?.runStatus !== "running") return false;

  const runId = typeof latestSummary.runId === "string" ? latestSummary.runId : undefined;
  if (runId == null) return true;

  const history = readCandidateRows(join(reportDir, "candidate-run-history.jsonl"));
  return !history.some((summary) => summary.runId === runId && summary.runStatus === "completed");
}

function readAccountingTotals(reportDir: string, candidateRows: Array<Record<string, unknown>>): AccountingTotals {
  const history = readCandidateRows(join(reportDir, "candidate-run-history.jsonl"));
  if (history.length > 0) {
    const totals = createAccountingTotals(["run history"]);
    for (const summary of history) addRunSummaryToAccounting(totals, summary, { includeCandidates: true });
    return totals;
  }

  const latestSummary = readJsonRecord(join(reportDir, "candidate-run-summary.json"));
  if (candidateRows.length === 0 && latestSummary != null) {
    const totals = createAccountingTotals(["latest run summary"]);
    addRunSummaryToAccounting(totals, latestSummary, { includeCandidates: true });
    return totals;
  }

  const totals = createAccountingTotals(candidateRows.length > 0 ? ["candidate jsonl"] : []);
  for (const row of candidateRows) addCandidateRowToAccounting(totals, row);

  if (latestSummary != null) {
    addRunSummaryToAccounting(totals, latestSummary, { includeCandidates: false });
    if (summaryHasNonCandidateAttempts(latestSummary)) addSource(totals, "latest rejected run");
    return totals;
  }

  addRejectedReportsToAccounting(totals, reportDir);
  return totals;
}

function createAccountingTotals(sources: string[] = []): AccountingTotals {
  return {
    attemptedModels: 0,
    rejectedModels: 0,
    inputTokens: 0,
    outputTokens: 0,
    thinkingTokens: 0,
    cachedInputTokens: 0,
    cacheWriteTokens: 0,
    durationMs: 0,
    costUsd: 0,
    hasUnknownTokens: false,
    hasUnknownCost: false,
    sources,
  };
}

function addCandidateRowToAccounting(totals: AccountingTotals, row: Record<string, unknown>) {
  totals.attemptedModels += 1;
  totals.inputTokens += numberOrZero(row.totalInputTokens);
  totals.outputTokens += numberOrZero(row.totalOutputTokens);
  totals.thinkingTokens += numberOrZero(row.totalThinkingTokens) || sumNestedThinkingTokens([row]);
  totals.cachedInputTokens += numberOrZero(row.totalCacheReadTokens);
  totals.cacheWriteTokens += numberOrZero(row.totalCacheWriteTokens);
  totals.durationMs += numberOrZero(row.totalDurationMs);
  totals.costUsd += numberOrZero(row.totalCostUsd);
  totals.hasUnknownTokens = totals.hasUnknownTokens || hasUnknownCandidateTokens(row);
  totals.hasUnknownCost = totals.hasUnknownCost || typeof row.totalCostUsd !== "number";
}

function addRunSummaryToAccounting(
  totals: AccountingTotals,
  summary: Record<string, unknown>,
  options: { includeCandidates: boolean },
) {
  const attempts = Array.isArray(summary.attempts) ? summary.attempts : [];
  if (attempts.length === 0) {
    if (options.includeCandidates) addRunTotalsToAccounting(totals, summary);
    return;
  }

  for (const attemptValue of attempts) {
    const attempt = recordValue(attemptValue);
    if (attempt == null) continue;
    const status = typeof attempt.status === "string" ? attempt.status : "";
    if (status === "skipped") continue;
    if (!options.includeCandidates && status === "candidate") continue;

    totals.attemptedModels += 1;
    if (status === "rejected") totals.rejectedModels += 1;
    addTelemetryToAccounting(totals, recordValue(attempt.telemetry));
  }
}

function addRunTotalsToAccounting(totals: AccountingTotals, summary: Record<string, unknown>) {
  const runTotals = recordValue(summary.totals);
  if (runTotals == null) return;

  totals.attemptedModels += numberOrZero(summary.attemptedModels);
  totals.rejectedModels += numberOrZero(summary.rejectedModels);
  totals.inputTokens += numberOrZero(runTotals.inputTokens);
  totals.outputTokens += numberOrZero(runTotals.outputTokens);
  totals.thinkingTokens += numberOrZero(runTotals.thinkingTokens);
  totals.cachedInputTokens += numberOrZero(runTotals.cachedInputTokens);
  totals.cacheWriteTokens += numberOrZero(runTotals.cacheWriteTokens);
  totals.durationMs += numberOrZero(runTotals.runtimeSeconds) * 1000;
  totals.costUsd += numberOrZero(runTotals.estimatedCostUsd);
  totals.hasUnknownTokens = totals.hasUnknownTokens || [
    runTotals.hasUnknownInputTokens,
    runTotals.hasUnknownOutputTokens,
    runTotals.hasUnknownThinkingTokens,
    runTotals.hasUnknownCachedInputTokens,
    runTotals.hasUnknownCacheWriteTokens,
  ].some(Boolean);
  totals.hasUnknownCost = totals.hasUnknownCost || runTotals.hasUnknownEstimatedCost === true;
}

function addTelemetryToAccounting(totals: AccountingTotals, telemetry: Record<string, unknown> | undefined) {
  if (telemetry == null) {
    totals.hasUnknownTokens = true;
    totals.hasUnknownCost = true;
    return;
  }

  const tokens = recordValue(telemetry.tokens);
  totals.durationMs += numberOrZero(telemetry.runtimeSeconds) * 1000;
  totals.inputTokens += numberOrZero(tokens?.input);
  totals.outputTokens += numberOrZero(tokens?.output);
  totals.thinkingTokens += numberOrZero(tokens?.thinking);
  totals.cachedInputTokens += numberOrZero(tokens?.cached);
  totals.cacheWriteTokens += numberOrZero(tokens?.cacheWrite);
  totals.costUsd += numberOrZero(telemetry.estimatedCostUsd);

  totals.hasUnknownTokens = totals.hasUnknownTokens || tokens == null || [
    tokens.input,
    tokens.output,
    tokens.thinking,
    tokens.cached,
    tokens.cacheWrite,
  ].some((value) => typeof value !== "number");
  totals.hasUnknownCost = totals.hasUnknownCost || typeof telemetry.estimatedCostUsd !== "number";
}

function addRejectedReportsToAccounting(totals: AccountingTotals, reportDir: string) {
  if (!existsSync(reportDir)) return;

  for (const entry of readdirSync(reportDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    if (entry.name.startsWith("judge") || entry.name === "candidate-shortfall.md" || entry.name === "judge-summary.md") continue;

    const reportPath = join(reportDir, entry.name);
    const contents = readFileSync(reportPath, "utf8");
    if (!contents.includes("- Validation: rejected:")) continue;

    totals.attemptedModels += 1;
    totals.rejectedModels += 1;
    totals.durationMs += parseReportSeconds(contents) * 1000;
    totals.inputTokens += parseReportMetric(contents, "Input tokens").value;
    totals.outputTokens += parseReportMetric(contents, "Output tokens").value;
    totals.thinkingTokens += parseReportMetric(contents, "Thinking tokens").value;
    totals.cachedInputTokens += parseReportMetric(contents, "Cached input tokens").value;
    totals.cacheWriteTokens += parseReportMetric(contents, "Cache write tokens").value;
    const cost = parseReportCost(contents);
    totals.costUsd += cost.value;
    totals.hasUnknownTokens = totals.hasUnknownTokens || [
      parseReportMetric(contents, "Input tokens").isUnknown,
      parseReportMetric(contents, "Output tokens").isUnknown,
      parseReportMetric(contents, "Thinking tokens").isUnknown,
      parseReportMetric(contents, "Cached input tokens").isUnknown,
      parseReportMetric(contents, "Cache write tokens").isUnknown,
    ].some(Boolean);
    totals.hasUnknownCost = totals.hasUnknownCost || cost.isUnknown;
    addSource(totals, "rejected markdown");
  }
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

function readJsonRecord(path: string): Record<string, unknown> | undefined {
  if (!existsSync(path)) return undefined;

  try {
    return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function summaryHasNonCandidateAttempts(summary: Record<string, unknown>) {
  const attempts = Array.isArray(summary.attempts) ? summary.attempts : [];
  return attempts.some((attemptValue) => {
    const attempt = recordValue(attemptValue);
    return attempt != null && attempt.status !== "candidate" && attempt.status !== "skipped";
  });
}

function addSource(totals: AccountingTotals, source: string) {
  if (!totals.sources.includes(source)) totals.sources.push(source);
}

function numberOrZero(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function hasUnknownCandidateTokens(row: Record<string, unknown>) {
  return [
    row.totalInputTokens,
    row.totalOutputTokens,
    row.totalThinkingTokens,
    row.totalCacheReadTokens,
    row.totalCacheWriteTokens,
  ].some((value) => typeof value !== "number");
}

function parseReportSeconds(contents: string) {
  const match = contents.match(/^- Runtime seconds:\s*(.+)$/m);
  return numberOrZero(match?.[1]);
}

function parseReportMetric(contents: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = contents.match(new RegExp(`^- ${escapedLabel}:\\s*(.+)$`, "m"));
  const rawValue = match?.[1]?.trim();
  const value = numberOrZero(rawValue);
  return {
    value,
    isUnknown: rawValue == null || rawValue === "" || rawValue === "unknown",
  };
}

function parseReportCost(contents: string) {
  const match = contents.match(/^- Estimated cost:\s*(.+)$/m);
  const rawValue = match?.[1]?.trim();
  const value = numberOrZero(rawValue?.replace(/^\$/, ""));
  return {
    value,
    isUnknown: rawValue == null || rawValue === "" || rawValue === "unknown",
  };
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
    completeArticles: rows.filter((row) => articleState(row) === "complete").length,
    inProgressSlots: summaries.filter((summary) => summary.isInProgress).length,
    inProgressArticles: rows.filter((row) => articleState(row) === "running").length,
    candidateRows: summaries.reduce((sum, summary) => sum + summary.count, 0),
    attemptedModels: summaries.reduce((sum, summary) => sum + summary.attemptedModels, 0),
    rejectedModels: summaries.reduce((sum, summary) => sum + summary.rejectedModels, 0),
    accountingSources: [...new Set(summaries.flatMap((summary) => summary.accountingSources))].sort(),
    inputTokens: summaries.reduce((sum, summary) => sum + summary.inputTokens, 0),
    outputTokens: summaries.reduce((sum, summary) => sum + summary.outputTokens, 0),
    thinkingTokens: summaries.reduce((sum, summary) => sum + summary.thinkingTokens, 0),
    cachedInputTokens: summaries.reduce((sum, summary) => sum + summary.cachedInputTokens, 0),
    cacheWriteTokens: summaries.reduce((sum, summary) => sum + summary.cacheWriteTokens, 0),
    durationMs: summaries.reduce((sum, summary) => sum + summary.durationMs, 0),
    costUsd: summaries.reduce((sum, summary) => sum + summary.costUsd, 0),
    hasUnknownTokens: summaries.some((summary) => summary.hasUnknownTokens),
    hasUnknownCost: summaries.some((summary) => summary.hasUnknownCost),
  };
}

function renderDashboard(rows: ArticleRow[], totals: Totals) {
  const generatedAt = new Date().toISOString();
  const workerCopy = shouldRunWorker
    ? `Worker: \`${formatWorkerStatus()}\`. Command:`
    : "Worker is disabled. To generate candidates for the same scope, run:";

  return [
    `# I18n Candidate TUI`,
    "",
    `Generated at \`${generatedAt}\`. Expected candidates per locale: \`${expectedCandidates}\`.`,
    "",
    workerCopy,
    "",
    `\`${renderScopedGeneratorCommand()}\``,
    "",
    renderStatusPanel(totals),
    "",
    renderLocalePanel(rows),
    "",
    "## Articles",
    "",
    markdownRow(["Article", "Category", "Date", ...selectedLocales.map((locale) => locale.toUpperCase()), "Total", "Status"]),
    markdownRow(["---", "---", "---", ...selectedLocales.map(() => "---:"), "---:", "---"]),
    ...rows.map((row) =>
      markdownRow([
        `\`${row.slug}\``,
        row.category,
        row.date ?? "",
        ...selectedLocales.map((locale) => formatCandidateCell(row.candidates[locale])),
        `${selectedLocales.reduce((sum, locale) => sum + row.candidates[locale].count, 0)}/${selectedLocales.length * expectedCandidates}`,
        formatArticleState(row),
      ]),
    ),
    "",
    ...(workerState.recentOutput.length > 0
      ? [
          "## Worker Log",
          "",
          "```text",
          ...workerState.recentOutput.slice(-12),
          "```",
          "",
        ]
      : []),
    watchIntervalSeconds == null
      ? "Tip: add `--watch 10` to refresh this terminal view every 10 seconds."
      : `Watching every ${watchIntervalSeconds}s. Press Ctrl-C to stop.`,
    "",
  ].join("\n");
}

function renderFinalAccounting(totals: Totals, reason: string) {
  return [
    "",
    `Final i18n candidate accounting (${reason})`,
    `- Articles: ${totals.articles}`,
    `- Locale slots complete: ${totals.completeSlots}/${totals.slots}`,
    `- Articles complete: ${totals.completeArticles}/${totals.articles}`,
    `- In progress: ${totals.inProgressSlots} slots, ${totals.inProgressArticles} articles`,
    `- Candidate rows: ${totals.candidateRows}`,
    `- Model attempts: ${totals.attemptedModels} (${totals.rejectedModels} rejected)`,
    `- Input tokens: ${formatInteger(totals.inputTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`,
    `- Output tokens: ${formatInteger(totals.outputTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`,
    `- Thinking tokens: ${formatInteger(totals.thinkingTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`,
    `- Cached input tokens: ${formatInteger(totals.cachedInputTokens)}`,
    `- Cache write tokens: ${formatInteger(totals.cacheWriteTokens)}`,
    `- Duration: ${formatDuration(totals.durationMs)}`,
    `- Estimated cost: ${formatUsd(totals.costUsd)}${totals.hasUnknownCost ? " + unknown" : ""}`,
    `- Accounting source: ${formatSources(totals.accountingSources)}`,
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
    markdownRow(["Worker", formatWorkerStatus()]),
    markdownRow(["Articles", totals.articles]),
    markdownRow(["Locale slots complete", `${totals.completeSlots}/${totals.slots} (${formatPercent(coverage)})`]),
    markdownRow(["Articles complete", `${totals.completeArticles}/${totals.articles}`]),
    markdownRow(["In progress", `${totals.inProgressSlots} slots, ${totals.inProgressArticles} articles`]),
    markdownRow(["Candidate rows", totals.candidateRows]),
    markdownRow(["Model attempts", totals.attemptedModels]),
    markdownRow(["Rejected attempts", totals.rejectedModels]),
    markdownRow(["Input tokens", `${formatInteger(totals.inputTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`]),
    markdownRow(["Output tokens", `${formatInteger(totals.outputTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`]),
    markdownRow(["Thinking tokens", `${formatInteger(totals.thinkingTokens)}${totals.hasUnknownTokens ? " + unknown" : ""}`]),
    markdownRow(["Cached input tokens", formatInteger(totals.cachedInputTokens)]),
    markdownRow(["Cache write tokens", formatInteger(totals.cacheWriteTokens)]),
    markdownRow(["Duration", formatDuration(totals.durationMs)]),
    markdownRow(["Estimated cost", `${formatUsd(totals.costUsd)}${totals.hasUnknownCost ? " + unknown" : ""}`]),
    markdownRow(["Accounting source", formatSources(totals.accountingSources)]),
  ].join("\n");
}

function renderLocalePanel(rows: ArticleRow[]) {
  return [
    "## Locale Status",
    "",
    markdownRow(["Locale", "Complete", "Running", "Candidates", "Attempts", "Rejected", "Estimated cost"]),
    markdownRow(["---", "---:", "---:", "---:", "---:", "---:", "---:"]),
    ...selectedLocales.map((locale) => {
      const summaries = rows.map((row) => row.candidates[locale]);
      const complete = summaries.filter((summary) => summary.count >= expectedCandidates).length;
      const running = summaries.filter((summary) => summary.isInProgress).length;
      const candidates = summaries.reduce((sum, summary) => sum + summary.count, 0);
      const attempts = summaries.reduce((sum, summary) => sum + summary.attemptedModels, 0);
      const rejected = summaries.reduce((sum, summary) => sum + summary.rejectedModels, 0);
      const cost = summaries.reduce((sum, summary) => sum + summary.costUsd, 0);
      const hasUnknown = summaries.some((summary) => summary.hasUnknownCost);

      return markdownRow([
        locale,
        `${complete}/${rows.length}`,
        running,
        candidates,
        attempts,
        rejected,
        `${formatUsd(cost)}${hasUnknown ? " + unknown" : ""}`,
      ]);
    }),
  ].join("\n");
}

function formatCandidateCell(summary: CandidateSummary) {
  const value = `${summary.count}/${summary.expected}`;
  if (summary.isInProgress) return `**${value} running**`;
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

function startCandidateWorker() {
  const args = buildGeneratorArgs();
  workerState.startedAt = new Date();
  workerState.status = "running";
  appendWorkerOutput(`$ bun ${formatCommandArgs(args)}`);

  const child = spawn("bun", args, {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
  });
  workerProcess = child;

  child.stdout?.on("data", appendWorkerOutput);
  child.stderr?.on("data", appendWorkerOutput);
  child.on("error", (error) => {
    workerState.status = "failed";
    workerState.error = error.message;
    workerState.finishedAt = new Date();
    appendWorkerOutput(error.message);
  });
  child.on("exit", (code, signal) => {
    workerState.exitCode = code;
    workerState.signal = signal;
    workerState.finishedAt = new Date();
    workerState.status = code === 0 ? "completed" : "failed";
    appendWorkerOutput(`worker exited with ${signal ?? `code ${code}`}`);
    workerProcess = undefined;
  });
}

function stopCandidateWorker(reason: string) {
  if (workerProcess == null || isWorkerFinished()) return;
  workerState.status = "stopped";
  workerState.finishedAt = new Date();
  appendWorkerOutput(`stopping worker: ${reason}`);
  workerProcess.kill("SIGTERM");
}

function isWorkerFinished() {
  return workerState.status === "completed" || workerState.status === "failed" || workerState.status === "stopped";
}

function appendWorkerOutput(value: unknown) {
  const text = stripAnsi(String(value));
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  workerState.recentOutput.push(...lines);
  workerState.recentOutput = workerState.recentOutput.slice(-40);
}

function formatWorkerStatus() {
  if (!workerState.enabled) return "disabled";
  if (workerState.status === "running") return `running ${formatDuration(Date.now() - Number(workerState.startedAt ?? new Date()))}`;
  if (workerState.status === "failed") {
    return workerState.error ?? `failed ${workerState.signal ?? `code ${workerState.exitCode ?? "unknown"}`}`;
  }
  return workerState.status;
}

function renderScopedGeneratorCommand() {
  return `bun ${formatCommandArgs(buildGeneratorArgs())}`;
}

function buildGeneratorArgs() {
  const args = ["run", "i18n:translate:candidates", "--"];
  const slugs = [...selectedSlugs];

  if (slugs.length > 0) {
    args.push("--slugs", slugs.join(","));
  }

  args.push("--locales", selectedLocales.join(","));

  addOptionalGeneratorArg(args, "models");
  addOptionalGeneratorArg(args, "timeout-seconds");
  addGeneratorArgWithDefault(args, "task-concurrency", DEFAULT_TUI_TASK_CONCURRENCY);
  addOptionalGeneratorArg(args, "chunk");
  addGeneratorArgWithDefault(args, "quiz-concurrency", DEFAULT_TUI_QUIZ_CONCURRENCY);
  addOptionalGeneratorArg(args, "challenge-retries");

  for (const name of ["skip-validation", "no-commit", "overwrite", "allow-concurrent-worktree", "dry-run"]) {
    if (options[name] === true) args.push(`--${name}`);
  }

  return args;
}

function addOptionalGeneratorArg(args: string[], name: string) {
  const value = optionalString(options, name);
  if (value != null) args.push(`--${name}`, value);
}

function addGeneratorArgWithDefault(args: string[], name: string, fallback: string) {
  const value = optionalString(options, name) ?? fallback;
  if (value != null) args.push(`--${name}`, value);
}

function formatCommandArgs(args: string[]) {
  return args.map(shellQuote).join(" ");
}

function shellQuote(value: string) {
  if (/^[A-Za-z0-9._,/:=-]+$/.test(value)) return value;
  return `'${value.replaceAll("'", "'\\''")}'`;
}

function stripAnsi(value: string) {
  return value.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "");
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

function formatSources(sources: string[]) {
  return sources.length === 0 ? "none yet" : sources.join(", ");
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
