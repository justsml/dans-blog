import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import {
  collectSourcePosts as collectInventorySourcePosts,
  getTranslationSlot,
  isTranslationOlderThanSource,
  parseActiveLocales,
  type SourcePost,
} from "./corpus-inventory.ts";
import { optionalString, parseArgs, parseList } from "./utils.ts";
import {
  hasOutOfCreditMarker,
  isOutOfCreditError,
  recordOutOfCreditIssue,
} from "./out-of-credit.ts";

type CandidateSummary = {
  locale: ActiveLocale;
  count: number;
  expected: number;
  reports: number;
  isInProgress: boolean;
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
  accountingSources: string[];
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
  expectedCandidateRows: number;
  candidateProgressRows: number;
  attemptedModels: number;
  rejectedModels: number;
  activeRun: AccountingTotals;
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
  mode?: "candidates" | "judge";
  status: "disabled" | "starting" | "running" | "completed" | "failed" | "stopped";
  startedAt?: Date;
  finishedAt?: Date;
  exitCode?: number | null;
  signal?: string | null;
  error?: string;
  progress?: WorkerProgress;
  recentOutput: string[];
};

type WorkerProgress = {
  total: number;
  started: number;
  completed: number;
  failed: number;
  running: number;
  concurrency?: number;
  activeTasks: string[];
  failures: string[];
};

const REPORT_ROOT = join(process.cwd(), "reports/i18n");
const DEFAULT_TUI_TASK_CONCURRENCY = "16";
const DEFAULT_TUI_QUIZ_CONCURRENCY = "18";
const DEFAULT_REFRESH_DEBOUNCE_MS = 750;
const DEFAULT_CANDIDATE_MODELS = [
  "openrouter/deepseek/deepseek-v3.2",
  "openrouter/deepseek/deepseek-v4-flash",
  "openrouter/google/gemini-3-flash-preview",
  "openrouter/minimax/minimax-m2.5",
  "openrouter/minimax/minimax-m2.7",
  "openrouter/openai/gpt-oss-120b:nitro",
  "openrouter/qwen/qwen3-32b:nitro",
  "openrouter/qwen/qwen3.6-plus",
  "openrouter/z-ai/glm-4.7-flash",
  "openrouter/z-ai/glm-5-turbo",
];
const JUDGE_PROGRESS_PREFIX = "::i18n-judge-progress::";
const OUT_OF_CREDIT_SETTLE_MS = 60_000;
const CURRENT_RUN_STARTED_AT_GRACE_MS = 2000;
const FINALIZED_CANDIDATE_RUN_STATUSES = new Set(["completed", "failed", "interrupted"]);

const options = parseArgs();
const explicitExpectedCandidates = parseOptionalPositiveInteger(optionalString(options, "expected"));
const fixedExpectedCandidates = explicitExpectedCandidates ?? 2;
const selectedLocales = parseLocales();
const selectedSlugs = new Set(parseList(optionalString(options, "slugs"), []));
const shouldIncludeDrafts = options["include-drafts"] === true;
const shouldIncludeHidden = options["include-hidden"] === true;
const shouldIncompleteOnly = options["incomplete-only"] === true;
const shouldOnlyModified = options["only-modified"] === true;
const shouldMarkdown = options.markdown === true || options["no-tui"] === true;
const watchIntervalSeconds = parseOptionalPositiveInteger(optionalString(options, "watch"));
const refreshDebounceMs = parsePositiveInteger(optionalString(options, "refresh-debounce-ms"), DEFAULT_REFRESH_DEBOUNCE_MS);
const shouldUseTui = !shouldMarkdown && process.stdout.isTTY && process.stdin.isTTY;
const shouldRunJudgeWorker = options.judge === true;
const shouldRunWorker = (options.run === true || shouldRunJudgeWorker) && options["monitor-only"] !== true;
const candidateModelCount = parseList(optionalString(options, "models"), DEFAULT_CANDIDATE_MODELS).length;
const shouldUseDynamicExpectedCandidates = explicitExpectedCandidates == null
  && !shouldRunJudgeWorker
  && (options.run === true || optionalString(options, "models") != null);
const expectedBaselineCounts = new Map<string, number>();
const workerState: WorkerState = {
  enabled: shouldRunWorker,
  mode: shouldRunWorker ? (shouldRunJudgeWorker ? "judge" : "candidates") : undefined,
  status: shouldRunWorker ? "starting" : "disabled",
  recentOutput: [],
};
let workerProcess: ChildProcess | undefined;
const activeJudgeChildren = new Set<ChildProcess>();
let outOfCreditJudgeShutdownPromise: Promise<void> | undefined;

if (options["judge-worker"] === true) {
  try {
    await runJudgeWorker();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
  process.exit(0);
}

if (shouldUseDynamicExpectedCandidates) {
  captureExpectedBaselineCounts();
}

if (shouldRunWorker) {
  startWorker(shouldRunJudgeWorker ? "judge" : "candidates");
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
  let refreshTimer: ReturnType<typeof setTimeout> | undefined;
  let isRefreshing = false;

  const refreshData = () => {
    const data = getDashboardData();
    rows = data.rows;
    totals = data.totals;
    lastRenderedAt = new Date();
  };

  const refreshAndDraw = () => {
    if (isRefreshing) return;
    isRefreshing = true;
    try {
      refreshData();
      draw();
    } finally {
      isRefreshing = false;
    }
  };

  const requestRefresh = (delayMs = refreshDebounceMs) => {
    if (refreshTimer != null) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      refreshTimer = undefined;
      refreshAndDraw();
    }, delayMs);
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
    requestRefresh();
  }, (watchIntervalSeconds ?? 10) * 1000);

  let didShutdown = false;
  function shutdown(reason: string) {
    if (didShutdown) return;
    didShutdown = true;
    clearInterval(interval);
    if (refreshTimer != null) clearTimeout(refreshTimer);
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
      requestRefresh(0);
    }
    if (name === "j" || name === "J") {
      if (workerProcess == null || isWorkerFinished()) {
        startWorker("judge");
        requestRefresh(0);
      } else {
        appendWorkerOutput("judge start ignored: worker already running");
        draw();
      }
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
      `expected ${formatExpectedTarget()}`,
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
    const expectedTotal = selectedLocales.reduce((sum, locale) => sum + row.candidates[locale].expected, 0);
    const values = [
      row.slug,
      row.category,
      row.date ?? "",
      ...selectedLocales.map((locale) => terminalCandidateCell(row.candidates[locale])),
      `${total}/${expectedTotal}`,
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
  const candidateProgress = candidateProgressRatio(totals);
  const lines = [
    ["Worker", formatWorkerStatus()],
    ["Progress", `${formatProgressBar(candidateProgress, 12)} ${formatPercent(candidateProgress)}`],
    ["Candidates", `${totals.candidateProgressRows}/${totals.expectedCandidateRows}`],
    ["Slots", `${totals.completeSlots}/${totals.slots} (${formatPercent(totals.slots === 0 ? 0 : totals.completeSlots / totals.slots)})`],
    ["Articles", `${totals.completeArticles}/${totals.articles}`],
    ["In progress", `${totals.inProgressSlots} slots, ${totals.inProgressArticles} articles`],
    ["Attempts", String(totals.attemptedModels)],
    ["Rejected", String(totals.rejectedModels)],
    ["Run cost", `${formatUsd(totals.activeRun.costUsd)}${totals.activeRun.hasUnknownCost ? " + unknown" : ""}`],
    ["Run input", `${formatInteger(totals.activeRun.inputTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`],
    ["Run output", `${formatInteger(totals.activeRun.outputTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`],
    ["Thinking", `${formatInteger(totals.activeRun.thinkingTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`],
    ["Cache read", formatInteger(totals.activeRun.cachedInputTokens)],
    ["Cache write", formatInteger(totals.activeRun.cacheWriteTokens)],
    ["Duration", formatDuration(totals.activeRun.durationMs)],
    ["Source", formatSources(totals.activeRun.sources)],
    ...(workerState.mode === "judge" && workerState.progress != null
      ? [
          ["Judge tasks", formatWorkerProgressSummary(workerState.progress)],
          ["Judge active", formatActiveJudgeTasks(workerState.progress, 2)],
        ]
      : []),
  ];

  lines.forEach(([label, value], index) => {
    writeAt(term, left + 2, top + 2 + index, `${label}:`, 13, "gray");
    writeAt(term, left + 15, top + 2 + index, value, width - 17);
  });

  const localeTop = top + lines.length + 4;
  writeAt(term, left + 2, localeTop, "Locales", width - 4, "bold");
  selectedLocales.forEach((locale, index) => {
    const summaries = rows.map((row) => row.candidates[locale]);
    const complete = summaries.filter((summary) => summary.count >= summary.expected).length;
    const candidates = summaries.reduce((sum, summary) => sum + summary.count, 0);
    const expected = summaries.reduce((sum, summary) => sum + summary.expected, 0);
    const progress = expected === 0
      ? 1
      : summaries.reduce((sum, summary) => sum + Math.min(summary.count, summary.expected), 0) / expected;
    const y = localeTop + 2 + index;
    writeAt(term, left + 2, y, locale, 4, "bold");
    writeAt(term, left + 7, y, `${complete}/${rows.length}`, 9);
    writeAt(term, left + 17, y, `${formatProgressBar(progress, 8)} ${candidates}/${expected}`, width - 19, candidates > 0 ? "green" : "gray");
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
  const candidateProgress = candidateProgressRatio(totals);
  writeAt(term, left + 2, top + 2, `Worker ${formatWorkerStatus()}`, width - 4);
  writeAt(term, left + 2, top + 3, `Progress ${formatProgressBar(candidateProgress, 18)} ${formatPercent(candidateProgress)} (${totals.candidateProgressRows}/${totals.expectedCandidateRows})`, width - 4);
  writeAt(term, left + 2, top + 4, `Slots ${totals.completeSlots}/${totals.slots} (${formatPercent(coverage)}) | Articles ${totals.completeArticles}/${totals.articles}`, width - 4);
  writeAt(term, left + 2, top + 5, `Running ${totals.inProgressSlots} slots | Attempts ${totals.attemptedModels} | Rejected ${totals.rejectedModels}`, width - 4);
  writeAt(term, left + 2, top + 6, `Run ${formatUsd(totals.activeRun.costUsd)} | ${formatInteger(totals.activeRun.inputTokens)} in | ${formatInteger(totals.activeRun.outputTokens)} out`, width - 4);
  writeAt(
    term,
    left + 2,
    top + 7,
    workerState.mode === "judge" && workerState.progress != null
      ? `Judge ${formatWorkerProgressSummary(workerState.progress)} | ${formatActiveJudgeTasks(workerState.progress, 2)}`
      : `Locales ${selectedLocales.map((locale) => {
          const summaries = rows.map((row) => row.candidates[locale]);
          return `${locale}:${summaries.filter((summary) => summary.count >= summary.expected).length}/${rows.length}`;
        }).join(" ")}`,
    width - 4,
  );
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
  writeAt(term, 1, height, `q quit + stop worker | j judge | r refresh | worker ${formatWorkerStatus()} | ${offset}/${maxOffset}`, width, "gray");
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
    .filter((post) =>
      !shouldOnlyModified ||
      selectedLocales.some((locale) => isTranslationOlderThanSource(getTranslationSlot(post, locale))),
    )
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
  return collectInventorySourcePosts();
}

function readCandidateSummary(slug: string, locale: ActiveLocale): CandidateSummary {
  const reportDir = join(REPORT_ROOT, slug, locale);
  const fallbackReports = countCandidateReportFiles(reportDir);
  const rowsOrReports = readCandidateCount(slug, locale);
  const accounting = readAccountingTotals(reportDir);

  return {
    locale,
    count: rowsOrReports,
    expected: getExpectedCandidateCount(slug, locale, rowsOrReports),
    reports: fallbackReports,
    isInProgress: isRunInProgress(reportDir),
    attemptedModels: accounting.attemptedModels,
    rejectedModels: accounting.rejectedModels,
    inputTokens: accounting.inputTokens,
    outputTokens: accounting.outputTokens,
    thinkingTokens: accounting.thinkingTokens,
    cachedInputTokens: accounting.cachedInputTokens,
    cacheWriteTokens: accounting.cacheWriteTokens,
    durationMs: accounting.durationMs,
    costUsd: accounting.costUsd,
    hasUnknownTokens: accounting.hasUnknownTokens,
    hasUnknownCost: accounting.hasUnknownCost,
    accountingSources: accounting.sources,
  };
}

function readCandidateCount(slug: string, locale: ActiveLocale) {
  const reportDir = join(REPORT_ROOT, slug, locale);
  const candidateRows = readCandidateRowsForLocale(slug, locale);
  const fallbackReports = countCandidateReportFiles(reportDir);
  return candidateRows.length > 0 ? candidateRows.length : fallbackReports;
}

function captureExpectedBaselineCounts() {
  for (const post of collectSourcePosts()) {
    if (selectedSlugs.size > 0 && !selectedSlugs.has(post.slug)) continue;
    for (const locale of selectedLocales) {
      expectedBaselineCounts.set(expectedBaselineKey(post.slug, locale), readCandidateCount(post.slug, locale));
    }
  }
}

function getExpectedCandidateCount(slug: string, locale: ActiveLocale, currentCount: number) {
  if (!shouldUseDynamicExpectedCandidates) return fixedExpectedCandidates;

  const baseline = expectedBaselineCounts.get(expectedBaselineKey(slug, locale)) ?? currentCount;
  return baseline + candidateModelCount;
}

function expectedBaselineKey(slug: string, locale: ActiveLocale) {
  return `${slug}\0${locale}`;
}

function formatExpectedTarget() {
  return shouldUseDynamicExpectedCandidates
    ? `current+${candidateModelCount}`
    : String(fixedExpectedCandidates);
}

function isRunInProgress(reportDir: string) {
  const latestSummary = readLatestRunSummary(reportDir);
  return latestSummary?.runStatus === "running";
}

function readAccountingTotals(reportDir: string): AccountingTotals {
  const summary = readCurrentRunSummary(reportDir);
  const totals = createAccountingTotals(summary == null ? [] : [accountingSourceForRunSummary(summary)]);
  if (summary != null) addRunSummaryToAccounting(totals, summary, { includeCandidates: true });
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

function readCandidateRowsForLocale(slug: string, locale: ActiveLocale) {
  const articleRows = readCandidateRows(join(REPORT_ROOT, slug, "candidates.jsonl"))
    .filter((row) => row.locale === locale);
  const legacyRows = readCandidateRows(join(REPORT_ROOT, slug, locale, "candidates.jsonl"));
  const rowsById = new Map<string, Record<string, unknown>>();

  for (const row of [...legacyRows, ...articleRows]) {
    rowsById.set(candidateRowId(row), row);
  }

  return [...rowsById.values()];
}

function candidateRowId(row: Record<string, unknown>) {
  return typeof row.runId === "string"
    ? row.runId
    : JSON.stringify([row.locale, row.model, row.createdAt, row.candidatePath]);
}

function readJsonRecord(path: string): Record<string, unknown> | undefined {
  if (!existsSync(path)) return undefined;

  try {
    return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function readLatestRunSummary(reportDir: string): Record<string, unknown> | undefined {
  const latestEvent = readLatestRunEventSummary(reportDir);
  if (latestEvent != null) return latestEvent;
  const latestHistory = readLatestRunHistorySummary(reportDir);
  if (latestHistory != null) return latestHistory;
  return readJsonRecord(join(reportDir, "candidate-run-summary.json"));
}

function readCurrentRunSummary(reportDir: string): Record<string, unknown> | undefined {
  const latestSummary = readLatestRunSummary(reportDir);
  if (latestSummary == null) return undefined;
  if (latestSummary.runStatus === "running") return latestSummary;
  return isCurrentWorkerRunSummary(latestSummary) ? latestSummary : undefined;
}

function readLatestRunEventSummary(reportDir: string): Record<string, unknown> | undefined {
  const events = readCandidateRows(join(reportDir, "candidate-run-events.jsonl"));
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const summary = recordValue(events[index]?.summary);
    if (summary != null) return summary;
  }
  return undefined;
}

function readLatestRunHistorySummary(reportDir: string): Record<string, unknown> | undefined {
  const rows = readCandidateRows(join(reportDir, "candidate-run-history.jsonl"));
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    const summary = recordValue(rows[index]);
    if (summary != null) return summary;
  }
  return undefined;
}

function isCurrentWorkerRunSummary(summary: Record<string, unknown>) {
  if (!shouldRunWorker || workerState.startedAt == null) return false;
  if (!FINALIZED_CANDIDATE_RUN_STATUSES.has(String(summary.runStatus))) return false;

  const startedAt = typeof summary.startedAt === "string" ? Date.parse(summary.startedAt) : Number.NaN;
  if (!Number.isFinite(startedAt)) return false;

  return startedAt >= Number(workerState.startedAt) - CURRENT_RUN_STARTED_AT_GRACE_MS;
}

function accountingSourceForRunSummary(summary: Record<string, unknown>) {
  return summary.runStatus === "running" ? "active run events" : "current worker run events";
}

function numberOrZero(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
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
  const activeRun = createAccountingTotals();
  for (const summary of summaries) addSummaryToActiveRunTotals(activeRun, summary);
  const expectedCandidateRows = summaries.reduce((sum, summary) => sum + summary.expected, 0);
  const candidateProgressRows = summaries.reduce((sum, summary) => sum + Math.min(summary.count, summary.expected), 0);

  return {
    articles: rows.length,
    slots: summaries.length,
    completeSlots: summaries.filter((summary) => summary.count >= summary.expected).length,
    completeArticles: rows.filter((row) => articleState(row) === "complete").length,
    inProgressSlots: summaries.filter((summary) => summary.isInProgress).length,
    inProgressArticles: rows.filter((row) => articleState(row) === "running").length,
    candidateRows: summaries.reduce((sum, summary) => sum + summary.count, 0),
    expectedCandidateRows,
    candidateProgressRows,
    attemptedModels: summaries.reduce((sum, summary) => sum + summary.attemptedModels, 0),
    rejectedModels: summaries.reduce((sum, summary) => sum + summary.rejectedModels, 0),
    activeRun,
  };
}

function addSummaryToActiveRunTotals(totals: AccountingTotals, summary: CandidateSummary) {
  totals.attemptedModels += summary.attemptedModels;
  totals.rejectedModels += summary.rejectedModels;
  totals.inputTokens += summary.inputTokens;
  totals.outputTokens += summary.outputTokens;
  totals.thinkingTokens += summary.thinkingTokens;
  totals.cachedInputTokens += summary.cachedInputTokens;
  totals.cacheWriteTokens += summary.cacheWriteTokens;
  totals.durationMs += summary.durationMs;
  totals.costUsd += summary.costUsd;
  totals.hasUnknownTokens = totals.hasUnknownTokens || summary.hasUnknownTokens;
  totals.hasUnknownCost = totals.hasUnknownCost || summary.hasUnknownCost;
  for (const source of summary.accountingSources) {
    if (!totals.sources.includes(source)) totals.sources.push(source);
  }
}

function renderDashboard(rows: ArticleRow[], totals: Totals) {
  const generatedAt = new Date().toISOString();
  const workerCopy = shouldRunWorker
    ? `Worker: \`${formatWorkerStatus()}\`. Command:`
    : "Worker is disabled. To generate candidates for the same scope, run:";

  return [
    `# I18n Candidate TUI`,
    "",
    `Generated at \`${generatedAt}\`. Expected candidates per locale: \`${formatExpectedTarget()}\`.`,
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
        `${selectedLocales.reduce((sum, locale) => sum + row.candidates[locale].count, 0)}/${selectedLocales.reduce((sum, locale) => sum + row.candidates[locale].expected, 0)}`,
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
    ...(workerState.mode === "judge" && workerState.progress != null
      ? [
          "## Judge Progress",
          "",
          markdownRow(["Metric", "Value"]),
          markdownRow(["---", "---:"]),
          markdownRow(["Tasks", formatWorkerProgressSummary(workerState.progress)]),
          markdownRow(["Active", formatActiveJudgeTasks(workerState.progress, 6)]),
          markdownRow(["Failures", workerState.progress.failures.length === 0 ? "none" : workerState.progress.failures.join("; ")]),
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
  const progress = candidateProgressRatio(totals);
  return [
    "",
    `Final i18n candidate accounting (${reason})`,
    `- Articles: ${totals.articles}`,
    `- Candidate progress: ${totals.candidateProgressRows}/${totals.expectedCandidateRows} (${formatPercent(progress)})`,
    `- Locale slots complete: ${totals.completeSlots}/${totals.slots}`,
    `- Articles complete: ${totals.completeArticles}/${totals.articles}`,
    `- In progress: ${totals.inProgressSlots} slots, ${totals.inProgressArticles} articles`,
    `- Candidate rows: ${totals.candidateRows}`,
    `- Model attempts: ${totals.attemptedModels} (${totals.rejectedModels} rejected)`,
    `- Run input tokens: ${formatInteger(totals.activeRun.inputTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`,
    `- Run output tokens: ${formatInteger(totals.activeRun.outputTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`,
    `- Run thinking tokens: ${formatInteger(totals.activeRun.thinkingTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`,
    `- Run cached input tokens: ${formatInteger(totals.activeRun.cachedInputTokens)}`,
    `- Run cache write tokens: ${formatInteger(totals.activeRun.cacheWriteTokens)}`,
    `- Run duration: ${formatDuration(totals.activeRun.durationMs)}`,
    `- Run estimated cost: ${formatUsd(totals.activeRun.costUsd)}${totals.activeRun.hasUnknownCost ? " + unknown" : ""}`,
    `- Accounting source: ${formatSources(totals.activeRun.sources)}`,
    ...(workerState.mode === "judge" && workerState.progress != null
      ? [
          `- Judge tasks: ${formatWorkerProgressSummary(workerState.progress)}`,
          `- Judge failures: ${workerState.progress.failures.length === 0 ? "none" : workerState.progress.failures.join("; ")}`,
        ]
      : []),
    "",
  ].join("\n");
}

function renderStatusPanel(totals: Totals) {
  const coverage = totals.slots === 0 ? 0 : totals.completeSlots / totals.slots;
  const progress = candidateProgressRatio(totals);

  return [
    "## Status",
    "",
    markdownRow(["Metric", "Value"]),
    markdownRow(["---", "---:"]),
    markdownRow(["Worker", formatWorkerStatus()]),
    markdownRow(["Candidate progress", `${totals.candidateProgressRows}/${totals.expectedCandidateRows} (${formatPercent(progress)}) ${formatProgressBar(progress, 16)}`]),
    markdownRow(["Articles", totals.articles]),
    markdownRow(["Locale slots complete", `${totals.completeSlots}/${totals.slots} (${formatPercent(coverage)})`]),
    markdownRow(["Articles complete", `${totals.completeArticles}/${totals.articles}`]),
    markdownRow(["In progress", `${totals.inProgressSlots} slots, ${totals.inProgressArticles} articles`]),
    markdownRow(["Candidate rows", totals.candidateRows]),
    markdownRow(["Model attempts", totals.attemptedModels]),
    markdownRow(["Rejected attempts", totals.rejectedModels]),
    markdownRow(["Run input tokens", `${formatInteger(totals.activeRun.inputTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`]),
    markdownRow(["Run output tokens", `${formatInteger(totals.activeRun.outputTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`]),
    markdownRow(["Run thinking tokens", `${formatInteger(totals.activeRun.thinkingTokens)}${totals.activeRun.hasUnknownTokens ? " + unknown" : ""}`]),
    markdownRow(["Run cached input tokens", formatInteger(totals.activeRun.cachedInputTokens)]),
    markdownRow(["Run cache write tokens", formatInteger(totals.activeRun.cacheWriteTokens)]),
    markdownRow(["Run duration", formatDuration(totals.activeRun.durationMs)]),
    markdownRow(["Run estimated cost", `${formatUsd(totals.activeRun.costUsd)}${totals.activeRun.hasUnknownCost ? " + unknown" : ""}`]),
    markdownRow(["Accounting source", formatSources(totals.activeRun.sources)]),
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
      const complete = summaries.filter((summary) => summary.count >= summary.expected).length;
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
  const expected = selectedLocales.reduce((sum, locale) => sum + row.candidates[locale].expected, 0);
  const actual = selectedLocales.reduce((sum, locale) => {
    const summary = row.candidates[locale];
    return sum + Math.min(summary.count, summary.expected);
  }, 0);
  return expected === 0 ? 1 : actual / expected;
}

function candidateProgressRatio(totals: Totals) {
  return totals.expectedCandidateRows === 0
    ? 1
    : totals.candidateProgressRows / totals.expectedCandidateRows;
}

function formatProgressBar(value: number, width: number) {
  const ratio = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  const filled = Math.round(ratio * width);
  return `[${"#".repeat(filled)}${"-".repeat(Math.max(0, width - filled))}]`;
}

function parseLocales() {
  const values = parseList(optionalString(options, "locales"), [...ACTIVE_LOCALES]);
  return parseActiveLocales(values, "--locales");
}

function startWorker(mode: "candidates" | "judge") {
  const args = mode === "judge" ? buildJudgeWorkerArgs() : buildGeneratorArgs();
  workerState.enabled = true;
  workerState.mode = mode;
  workerState.startedAt = new Date();
  workerState.finishedAt = undefined;
  workerState.exitCode = undefined;
  workerState.signal = undefined;
  workerState.error = undefined;
  workerState.progress = undefined;
  workerState.recentOutput = [];
  workerState.status = "running";
  appendWorkerOutput(`$ bun ${formatCommandArgs(args)}`);

  const child = spawn("bun", args, {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
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
  killWorkerTree(workerProcess);
}

function killWorkerTree(child: ChildProcess) {
  if (child.pid == null) return;
  try {
    process.kill(-child.pid, "SIGTERM");
    setTimeout(() => {
      try {
        if (child.pid != null) process.kill(-child.pid, "SIGKILL");
      } catch {
        // Worker group already exited.
      }
    }, 5000).unref();
  } catch {
    try {
      child.kill("SIGTERM");
    } catch {
      // Worker already exited.
    }
  }
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

  const logLines = lines.filter((line) => {
    if (!line.startsWith(JUDGE_PROGRESS_PREFIX)) return true;
    updateJudgeProgress(line.slice(JUDGE_PROGRESS_PREFIX.length));
    return false;
  });

  workerState.recentOutput.push(...logLines);
  workerState.recentOutput = workerState.recentOutput.slice(-40);
}

function formatWorkerStatus() {
  if (!workerState.enabled) return "disabled";
  const label = workerState.mode ?? "worker";
  if (workerState.status === "running") {
    const elapsed = formatDuration(Date.now() - Number(workerState.startedAt ?? new Date()));
    const progress = workerState.progress == null ? undefined : formatWorkerProgressSummary(workerState.progress);
    return progress == null ? `${label} ${elapsed}` : `${label} ${progress} ${elapsed}`;
  }
  if (workerState.status === "failed") {
    return workerState.error ?? `${label} failed ${workerState.signal ?? `code ${workerState.exitCode ?? "unknown"}`}`;
  }
  return `${label} ${workerState.status}`;
}

function updateJudgeProgress(rawJson: string) {
  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawJson) as Record<string, unknown>;
  } catch {
    return;
  }

  const progress = workerState.progress ?? createWorkerProgress();
  const type = typeof event.event === "string" ? event.event : "";
  const taskLabel = formatProgressTaskLabel(event);

  if (type === "planned") {
    workerState.progress = {
      ...createWorkerProgress(),
      total: numberOrZero(event.total),
      concurrency: numberOrZero(event.concurrency) || undefined,
    };
    return;
  }

  if (type === "task_started") {
    progress.total = Math.max(progress.total, numberOrZero(event.total));
    progress.started += 1;
    progress.running += 1;
    if (taskLabel != null && !progress.activeTasks.includes(taskLabel)) {
      progress.activeTasks.push(taskLabel);
    }
  } else if (type === "task_completed" || type === "task_failed") {
    progress.completed += type === "task_completed" ? 1 : 0;
    progress.failed += type === "task_failed" ? 1 : 0;
    progress.running = Math.max(0, progress.running - 1);
    progress.activeTasks = taskLabel == null
      ? progress.activeTasks
      : progress.activeTasks.filter((label) => label !== taskLabel);
    if (type === "task_failed") {
      const error = typeof event.error === "string" ? event.error : "unknown error";
      progress.failures.push(`${taskLabel ?? "unknown"}: ${error}`);
      progress.failures = progress.failures.slice(-6);
    }
  } else if (type === "run_finished") {
    progress.total = Math.max(progress.total, numberOrZero(event.total));
    progress.completed = numberOrZero(event.completed);
    progress.failed = numberOrZero(event.failed);
    progress.running = 0;
    progress.activeTasks = [];
  }

  workerState.progress = progress;
}

function createWorkerProgress(): WorkerProgress {
  return {
    total: 0,
    started: 0,
    completed: 0,
    failed: 0,
    running: 0,
    activeTasks: [],
    failures: [],
  };
}

function formatProgressTaskLabel(event: Record<string, unknown>) {
  const slug = typeof event.slug === "string" ? event.slug : undefined;
  const locale = typeof event.locale === "string" ? event.locale : undefined;
  if (slug == null || locale == null) return undefined;
  return `${locale}/${slug}`;
}

function formatWorkerProgressSummary(progress: WorkerProgress) {
  const processed = progress.completed + progress.failed;
  const failed = progress.failed > 0 ? `, ${progress.failed} failed` : "";
  const running = progress.running > 0 ? `, ${progress.running} running` : "";
  return `${processed}/${progress.total} processed${running}${failed}`;
}

function formatActiveJudgeTasks(progress: WorkerProgress, limit: number) {
  if (progress.activeTasks.length === 0) return "none";
  const visible = progress.activeTasks.slice(0, limit);
  const hiddenCount = progress.activeTasks.length - visible.length;
  return hiddenCount > 0 ? `${visible.join(", ")} +${hiddenCount}` : visible.join(", ");
}

function renderScopedGeneratorCommand() {
  return `bun ${formatCommandArgs(shouldRunJudgeWorker ? buildJudgeWorkerArgs() : buildGeneratorArgs())}`;
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

  for (const name of ["validate", "validate-candidates", "full-validation", "no-commit", "dry-run", "only-modified"]) {
    if (options[name] === true) args.push(`--${name}`);
  }

  return args;
}

function buildJudgeWorkerArgs() {
  const args = ["./src/scripts/i18n/candidate-tui.ts", "--judge-worker"];
  const slugs = [...selectedSlugs];

  if (slugs.length > 0) {
    args.push("--slugs", slugs.join(","));
  }

  args.push("--locales", selectedLocales.join(","));
  args.push("--expected", String(fixedExpectedCandidates));

  addGeneratorArgWithDefault(args, "task-concurrency", DEFAULT_TUI_TASK_CONCURRENCY);
  addOptionalGeneratorArg(args, "judge-model");
  addOptionalGeneratorArg(args, "second-model");
  addOptionalGeneratorArg(args, "escalate-model");
  addOptionalGeneratorArg(args, "candidate-limit");
  addOptionalGeneratorArg(args, "candidate-models");
  addOptionalGeneratorArg(args, "timeout-seconds");
  addOptionalGeneratorArg(args, "fix-pass-limit");
  addOptionalGeneratorArg(args, "judge-batch-size");

  for (const name of ["full-validation", "no-commit", "overwrite", "allow-single-candidate"]) {
    if (options[name] === true) args.push(`--${name}`);
  }

  return args;
}

async function runJudgeWorker() {
  const tasks = collectJudgeTasks();
  const concurrency = parsePositiveInteger(optionalString(options, "task-concurrency"), Number(DEFAULT_TUI_TASK_CONCURRENCY));
  const failures: string[] = [];

  console.log(`Found ${tasks.length} judge task(s).`);
  console.log(`Processing judge tasks with concurrency ${concurrency}.`);
  emitJudgeProgress({ event: "planned", total: tasks.length, concurrency });

  await mapLimit(tasks, concurrency, async (task, index) => {
    if (hasOutOfCreditMarker()) return;
    console.log(`\n[${index + 1}/${tasks.length}] judging ${task.locale}/${task.slug}`);
    emitJudgeProgress({ event: "task_started", index: index + 1, total: tasks.length, slug: task.slug, locale: task.locale });
    try {
      await runJudgeTask(task);
      emitJudgeProgress({ event: "task_completed", index: index + 1, total: tasks.length, slug: task.slug, locale: task.locale });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (hasOutOfCreditMarker() || isOutOfCreditError(error)) {
        recordOutOfCreditIssue(error, {
          script: "candidate-tui",
          phase: "judge-worker",
          slug: task.slug,
          locale: task.locale,
        });
        await settleThenKillActiveJudgeChildren("OpenRouter out of credits");
        emitJudgeProgress({ event: "task_failed", index: index + 1, total: tasks.length, slug: task.slug, locale: task.locale, error: message });
        return;
      }
      failures.push(`${task.locale}/${task.slug}: ${message}`);
      emitJudgeProgress({ event: "task_failed", index: index + 1, total: tasks.length, slug: task.slug, locale: task.locale, error: message });
    }
  });

  emitJudgeProgress({
    event: "run_finished",
    total: tasks.length,
    completed: tasks.length - failures.length,
    failed: failures.length,
  });

  if (hasOutOfCreditMarker()) {
    throw new Error("OpenRouter appears to be out of credits; stopped scheduling judge tasks.");
  }

  if (failures.length > 0) {
    throw new Error([
      `${failures.length} judge task(s) failed:`,
      ...failures.map((failure) => `- ${failure}`),
    ].join("\n"));
  }
}

function emitJudgeProgress(event: Record<string, unknown>) {
  console.log(`${JUDGE_PROGRESS_PREFIX}${JSON.stringify(event)}`);
}

function collectJudgeTasks() {
  const rows = collectRows();
  const tasks: Array<{ slug: string; locale: ActiveLocale; count: number }> = [];

  for (const row of rows) {
    for (const locale of selectedLocales) {
      const summary = row.candidates[locale];
      if (summary.count <= 0) continue;
      if (summary.count < summary.expected && options["allow-single-candidate"] !== true) continue;
      if (!options.overwrite && hasJudgeOutput(row.slug, locale)) continue;
      tasks.push({ slug: row.slug, locale, count: summary.count });
    }
  }

  return tasks.sort((a, b) =>
    b.count - a.count ||
    a.slug.localeCompare(b.slug) ||
    a.locale.localeCompare(b.locale),
  );
}

function hasJudgeOutput(slug: string, locale: ActiveLocale) {
  return existsSync(join(REPORT_ROOT, slug, locale, "judge.json"));
}

function runJudgeTask(task: { slug: string; locale: ActiveLocale }) {
  const args = [
    "run",
    "i18n:judge",
    "--",
    "--slug",
    task.slug,
    "--locale",
    task.locale,
    ...optionalArg("--model", optionalString(options, "judge-model")),
    ...optionalArg("--second-model", optionalString(options, "second-model")),
    ...optionalArg("--escalate-model", optionalString(options, "escalate-model")),
    ...optionalArg("--candidate-limit", optionalString(options, "candidate-limit")),
    ...optionalArg("--candidate-models", optionalString(options, "candidate-models")),
    ...optionalArg("--timeout-seconds", optionalString(options, "timeout-seconds")),
    ...optionalArg("--fix-pass-limit", optionalString(options, "fix-pass-limit")),
    ...optionalArg("--judge-batch-size", optionalString(options, "judge-batch-size")),
    ...optionalFlag("--full-validation", options["full-validation"] === true),
    ...optionalFlag("--no-commit", options["no-commit"] === true),
    ...optionalFlag("--allow-single-candidate", options["allow-single-candidate"] === true),
  ];

  return new Promise<void>((resolve, reject) => {
    const child = spawn("bun", args, {
      cwd: process.cwd(),
      stdio: "inherit",
    });
    activeJudgeChildren.add(child);

    child.on("error", (error) => {
      activeJudgeChildren.delete(child);
      reject(error);
    });
    child.on("exit", (code, signal) => {
      activeJudgeChildren.delete(child);
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`judge exited with ${signal ?? `code ${code}`}`));
    });
  });
}

async function mapLimit<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>,
) {
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      if (hasOutOfCreditMarker()) return;
      const index = nextIndex;
      nextIndex += 1;
      await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runWorker()),
  );
}

async function settleThenKillActiveJudgeChildren(reason: string) {
  if (outOfCreditJudgeShutdownPromise != null) return outOfCreditJudgeShutdownPromise;
  outOfCreditJudgeShutdownPromise = (async () => {
    if (activeJudgeChildren.size === 0) return;
    console.error(`${reason}; waiting ${OUT_OF_CREDIT_SETTLE_MS / 1000}s before terminating ${activeJudgeChildren.size} active judge worker(s).`);
    await new Promise((resolve) => setTimeout(resolve, OUT_OF_CREDIT_SETTLE_MS));
    for (const child of activeJudgeChildren) {
      killWorkerTree(child);
    }
    activeJudgeChildren.clear();
  })();
  return outOfCreditJudgeShutdownPromise;
}

function addOptionalGeneratorArg(args: string[], name: string) {
  const value = optionalString(options, name);
  if (value != null) args.push(`--${name}`, value);
}

function optionalArg(name: string, value: string | undefined) {
  return value == null ? [] : [name, value];
}

function optionalFlag(name: string, enabled: boolean) {
  return enabled ? [name] : [];
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

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value != null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
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
