import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import { ACTIVE_LOCALES, type ActiveLocale } from "../../shared/i18n.ts";
import {
  collectSourcePostSlugs,
  isTranslationFreshForSourceContents,
  isTranslationOlderThanSource,
  parseActiveLocales,
} from "./corpus-inventory.ts";
import {
  assertRunLock,
  createRunLock,
  getPostPaths,
  gitCommit,
  releaseRunLock,
  optionalString,
  parseArgs,
  parseList,
  randomizeListOrder,
  relativeToRepo,
  run,
  writeTextFile,
} from "./utils.ts";
import { normalizeLocalizedCandidateFile } from "./localized-mdx.ts";
import {
  assertNoOutOfCreditMarker,
  hasOutOfCreditMarker,
  isOutOfCreditError,
  recordOutOfCreditIssue,
} from "./out-of-credit.ts";
import {
  CHEAP_FAST_TRANSLATION_MODELS,
  resolveCheapFastTranslationModels,
} from "./model-presets.ts";

const DEFAULT_TRANSLATION_TIMEOUT_SECONDS = 240;
const DEFAULT_CHUNK_SIZE = "18p";
const DEFAULT_TASK_CONCURRENCY = 16;
const OUT_OF_CREDIT_SETTLE_MS = 60_000;
const REPORT_ROOT = join(process.cwd(), "reports/i18n");

type CandidateTask = {
  slug: string;
  locale: ActiveLocale;
};

type CandidateTaskStats = CandidateTask & {
  candidateCount: number;
  newestCandidateMs: number;
};

type CandidateTelemetry = {
  runtimeSeconds: string;
  tokens: {
    input?: number;
    output?: number;
    thinking?: number;
    cached?: number;
    cacheWrite?: number;
  };
  estimatedCostUsd?: number;
  pricingSource?: string;
};

type CandidateRunAttempt = {
  model: string;
  status: "skipped" | "candidate" | "rejected";
  validationStatus?: string;
  reportPath?: string;
  note?: string;
  telemetry?: CandidateTelemetry;
};

type CandidateRunSummary = {
  runId: string;
  runStatus: "running" | "completed" | "failed" | "interrupted";
  slug: string;
  locale: string;
  startedAt: string;
  updatedAt: string;
  modelsRequested: string[];
  attemptedModels: number;
  skippedModels: number;
  rejectedModels: number;
  candidateModels: number;
  totals: {
    runtimeSeconds: string;
    inputTokens: number;
    outputTokens: number;
    thinkingTokens: number;
    cachedInputTokens: number;
    cacheWriteTokens: number;
    estimatedCostUsd: number;
    hasUnknownInputTokens: boolean;
    hasUnknownOutputTokens: boolean;
    hasUnknownThinkingTokens: boolean;
    hasUnknownCachedInputTokens: boolean;
    hasUnknownCacheWriteTokens: boolean;
    hasUnknownEstimatedCost: boolean;
  };
  attempts: CandidateRunAttempt[];
};

type Totals = ReturnType<typeof createCandidateRunTotals>;

const TOKEN_FIELDS = [
  ["input",      "inputTokens",       "hasUnknownInputTokens"      ],
  ["output",     "outputTokens",      "hasUnknownOutputTokens"     ],
  ["thinking",   "thinkingTokens",    "hasUnknownThinkingTokens"   ],
  ["cached",     "cachedInputTokens", "hasUnknownCachedInputTokens"],
  ["cacheWrite", "cacheWriteTokens",  "hasUnknownCacheWriteTokens" ],
] as const satisfies Array<[keyof CandidateTelemetry["tokens"], keyof Totals, keyof Totals]>;

const options = parseArgs();
const models = randomizeListOrder(validateCandidateModels(
  resolveCheapFastTranslationModels(parseList(optionalString(options, "models"), [...CHEAP_FAST_TRANSLATION_MODELS])),
));
const shouldValidateCandidates = options.validate === true || options["validate-candidates"] === true;
const shouldRunFullCandidateValidation = options["full-validation"] === true;
const shouldSkipCommit = options["no-commit"] === true;
const shouldDryRun = options["dry-run"] === true;
const shouldOnlyModified = options["only-modified"] === true;
const isTaskWorker = options["task-worker"] === true;
const timeoutSeconds = getTimeoutSeconds();
const taskConcurrency = getTaskConcurrency();
const chunkSize = optionalString(options, "chunk") ?? DEFAULT_CHUNK_SIZE;
const quizConcurrency = optionalString(options, "quiz-concurrency");
const challengeRetries = optionalString(options, "challenge-retries");
const runLockPath = optionalString(options, "run-lock-path") ?? join(process.cwd(), ".git/codex-i18n-translation-run.json");
const inheritedRunId = optionalString(options, "run-id");
const processRunId = inheritedRunId ?? `${new Date().toISOString().replace(/[:.]/g, "-")}-${process.pid}`;
const ownsRunLock = inheritedRunId == null && !shouldDryRun;
const requestedSlug = optionalString(options, "slug");
const requestedSlugs = parseList(optionalString(options, "slugs"), requestedSlug == null ? [] : [requestedSlug]);
const slugs = requestedSlugs.length > 0 ? requestedSlugs : getAllPostSlugs();
const locales = getRequestedLocales();

// Mutable task context — reset at the start of each processTask() call.
let slug = "";
let locale: ActiveLocale = "es";
let sourcePath = "";
let targetPath = "";
let targetRelPath = "";
let reportDir = "";
let articleReportDir = "";
let candidatesPath = "";

// Candidate run state — written to events/history JSONL files.
let candidateRunStartedAt = new Date();
let candidateRunId = "";
let candidateRunEventsPath = "";
let candidateRunEventsRelPath = "";
let candidateRunHistoryPath = "";
let candidateRunHistoryRelPath = "";
let candidateRunAttempts: CandidateRunAttempt[] = [];
let candidateRunStatus: CandidateRunSummary["runStatus"] = "running";
let candidateRunFinalized = false;
let isProcessingTask = false;
const activeChildren = new Set<ChildProcess>();
let outOfCreditShutdownPromise: Promise<void> | undefined;

registerProcessCleanup();

if (ownsRunLock) {
  createRunLock(runLockPath, processRunId, "i18n:translate:candidates");
}

if (!shouldDryRun) {
  assertRunLock(runLockPath, processRunId);
  assertNoOutOfCreditMarker();
}

if (shouldDryRun) {
  console.log(`Candidate tasks:`);
  for (const task of getCandidateTasks()) {
    console.log(`- ${task.locale}/${task.slug}`);
  }
  console.log(`\nCandidate models:`);
  for (const model of models) {
    console.log(`- ${model}`);
  }
  process.exit(0);
}

if (isTaskWorker) {
  if (locales.length !== 1 || slugs.length !== 1) {
    throw new Error("--task-worker requires exactly one --slug and one --locale.");
  }
  await processTask(slugs[0], locales[0]);
} else {
  await processTasks(getCandidateTasks());
}

async function processTask(currentSlug: string, currentLocale: ActiveLocale) {
  assertRunLock(runLockPath, processRunId);
  slug = currentSlug;
  locale = currentLocale;
  const paths = getPostPaths(slug, locale);
  sourcePath = paths.sourcePath;
  targetPath = paths.targetPath;
  reportDir = paths.reportDir;
  articleReportDir = dirname(reportDir);
  targetRelPath = relativeToRepo(targetPath);
  candidatesPath = join(articleReportDir, "candidates.jsonl");
  candidateRunStartedAt = new Date();
  candidateRunId = candidateRunStartedAt.toISOString().replace(/[:.]/g, "-");
  candidateRunEventsPath = join(reportDir, "candidate-run-events.jsonl");
  candidateRunEventsRelPath = relativeToRepo(candidateRunEventsPath);
  candidateRunHistoryPath = join(reportDir, "candidate-run-history.jsonl");
  candidateRunHistoryRelPath = relativeToRepo(candidateRunHistoryPath);
  candidateRunAttempts = [];
  candidateRunStatus = "running";
  candidateRunFinalized = false;
  isProcessingTask = true;

  try {
    if (shouldOnlyModified && !isTranslationOlderThanSource(paths)) {
      console.log(`\nSkipping ${slug} [${locale}]; English modified is not newer than the translation modified date.`);
      isProcessingTask = false;
      return;
    }

    console.log(`\nGenerating candidates for ${slug} [${locale}]`);
    mkdirSync(dirname(targetPath), { recursive: true });
    mkdirSync(reportDir, { recursive: true });
    appendCandidateRunEvent("run_started", buildCandidateRunSummary());

    for (const model of models) {
      assertRunLock(runLockPath, processRunId);
      assertNoOutOfCreditMarker();
      const reportPath = getAttemptReportPath(model);

      const startedAt = Date.now();
      try {
        restoreTargetFromHead();
        await runDirectTranslation(model);
        assertRunLock(runLockPath, processRunId);

        if (!existsSync(targetPath)) {
          throw new Error(`Direct translator did not create ${targetRelPath}.`);
        }

        let validationStatus = "deferred";
        normalizeCandidateForLocale();
        assertRunLock(runLockPath, processRunId);
        if (shouldValidateCandidates) {
          validationStatus = await validateCandidate();
        }
        assertRunLock(runLockPath, processRunId);

        writeCandidateReport({
          reportPath,
          model,
          validationStatus,
          telemetry: getDirectTelemetry(model, startedAt),
          note: "Generated through the direct AI SDK chunked translator.",
          rawOutput: existsSync(targetPath) ? readFileSync(targetPath, "utf8") : undefined,
        });
        recordRunAttempt({
          model,
          status: "candidate",
          validationStatus,
          reportPath: relativeToRepo(reportPath),
          note: "Generated through the direct AI SDK chunked translator.",
          telemetry: getDirectTelemetry(model, startedAt),
        });
        restoreTargetFromHead();

        if (!shouldSkipCommit) {
          gitCommit(`i18n candidate(${locale}): ${slug} via ${model}`, [
            relativeToRepo(reportDir),
            relativeToRepo(candidatesPath),
          ]);
        }
      } catch (error) {
        assertRunLock(runLockPath, processRunId);
        const isCreditFailure = hasOutOfCreditMarker() || isOutOfCreditError(error);
        if (isCreditFailure) {
          recordOutOfCreditIssue(error, {
            script: "translate-candidates",
            slug,
            locale,
            model,
          });
        }
        const telemetry = getDirectTelemetry(model, startedAt);
        const rawOutput = existsSync(targetPath) ? readFileSync(targetPath, "utf8") : undefined;
        cleanupRejectedTarget();
        writeCandidateReport({
          reportPath,
          model,
          validationStatus: isCreditFailure
            ? "rejected: OpenRouter out of credits"
            : "rejected: direct AI SDK translation failed",
          telemetry,
          note: error instanceof Error ? error.message : String(error),
          rawOutput,
        });
        recordRunAttempt({
          model,
          status: "rejected",
          validationStatus: isCreditFailure
            ? "rejected: OpenRouter out of credits"
            : "rejected: direct AI SDK translation failed",
          reportPath: relativeToRepo(reportPath),
          note: error instanceof Error ? error.message : String(error),
          telemetry,
        });

        if (!shouldSkipCommit) {
          gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
            relativeToRepo(reportPath),
            candidateRunEventsRelPath,
          ]);
        }

        if (isCreditFailure) {
          await settleThenKillActiveChildren("OpenRouter out of credits");
          throw new Error("OpenRouter appears to be out of credits; stopped candidate generation.");
        }
      }
    }

    finalizeCandidateRun("completed", { commit: true, print: true });
  } catch (error) {
    assertRunLock(runLockPath, processRunId);
    finalizeCandidateRun("failed", { commit: !shouldSkipCommit, print: true });
    throw error;
  } finally {
    isProcessingTask = false;
  }
}

async function processTasks(tasks: CandidateTask[]) {
  console.log(`Found ${tasks.length} candidate translation task(s).`);
  console.log(`Processing with concurrency ${taskConcurrency}.`);

  if (tasks.length === 1) {
    await processTask(tasks[0].slug, tasks[0].locale);
    return;
  }

  const failures: string[] = [];
  await mapLimit(tasks, taskConcurrency, async (task, index) => {
    if (hasOutOfCreditMarker()) return;
    console.log(`\n[${index + 1}/${tasks.length}] queued ${task.locale}/${task.slug}`);
    try {
      await runTaskWorker(task);
    } catch (error) {
      if (hasOutOfCreditMarker() || isOutOfCreditError(error)) {
        recordOutOfCreditIssue(error, {
          script: "translate-candidates",
          phase: "task-worker",
          slug: task.slug,
          locale: task.locale,
        });
        await settleThenKillActiveChildren("OpenRouter out of credits");
        return;
      }
      failures.push(`${task.locale}/${task.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  if (hasOutOfCreditMarker()) {
    throw new Error("OpenRouter appears to be out of credits; stopped scheduling candidate tasks.");
  }

  if (failures.length > 0) {
    throw new Error([
      `${failures.length} candidate task(s) failed:`,
      ...failures.map((failure) => `- ${failure}`),
    ].join("\n"));
  }
}

function runTaskWorker(task: CandidateTask) {
  const args = [
    "run",
    "i18n:translate:candidates",
    "--",
    "--task-worker",
    "--slug",
    task.slug,
    "--locale",
    task.locale,
    "--models",
    models.join(","),
    "--timeout-seconds",
    String(timeoutSeconds),
    "--chunk",
    chunkSize,
    "--run-id",
    processRunId,
    "--run-lock-path",
    runLockPath,
    ...optionalFlag("--validate-candidates", shouldValidateCandidates),
    ...optionalFlag("--full-validation", shouldRunFullCandidateValidation),
    ...optionalFlag("--no-commit", shouldSkipCommit),
    ...optionalFlag("--only-modified", shouldOnlyModified),
    ...optionalArg("--quiz-concurrency", quizConcurrency),
    ...optionalArg("--challenge-retries", challengeRetries),
  ];

  return new Promise<void>((resolve, reject) => {
    const child = spawn("bun", args, {
      cwd: process.cwd(),
      stdio: "inherit",
      detached: true,
    });
    trackChild(child);

    child.on("error", (error) => {
      activeChildren.delete(child);
      reject(error);
    });
    child.on("exit", (code, signal) => {
      activeChildren.delete(child);
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`worker exited with ${signal ?? `code ${code}`}`));
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

function optionalArg(name: string, value: string | undefined) {
  return value == null ? [] : [name, value];
}

function optionalFlag(name: string, enabled: boolean) {
  return enabled ? [name] : [];
}

function runTrackedInherited(
  command: string,
  args: string[],
  options: { timeoutMs?: number } = {},
) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: "inherit",
      detached: true,
    });
    const timeout = options.timeoutMs == null
      ? undefined
      : setTimeout(() => {
        killChildTree(child);
        reject(new Error(`Command failed after ${options.timeoutMs}ms: ${command} ${args.join(" ")}`));
      }, options.timeoutMs);

    trackChild(child);
    child.on("error", (error) => {
      if (timeout != null) clearTimeout(timeout);
      activeChildren.delete(child);
      reject(error);
    });
    child.on("exit", (code, signal) => {
      if (timeout != null) clearTimeout(timeout);
      activeChildren.delete(child);
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Command failed: ${command} ${args.join(" ")} (${signal ?? `code ${code}`})`));
    });
  });
}

function trackChild(child: ChildProcess) {
  activeChildren.add(child);
}

function killActiveChildren() {
  for (const child of activeChildren) {
    killChildTree(child);
  }
  activeChildren.clear();
}

async function settleThenKillActiveChildren(reason: string) {
  if (outOfCreditShutdownPromise != null) return outOfCreditShutdownPromise;
  outOfCreditShutdownPromise = (async () => {
    if (activeChildren.size === 0) return;
    console.error(`${reason}; waiting ${OUT_OF_CREDIT_SETTLE_MS / 1000}s before terminating ${activeChildren.size} active translation worker(s).`);
    await new Promise((resolve) => setTimeout(resolve, OUT_OF_CREDIT_SETTLE_MS));
    if (activeChildren.size > 0) {
      console.error(`Terminating ${activeChildren.size} active translation worker(s) after out-of-credit settle delay.`);
      killActiveChildren();
    }
  })();
  return outOfCreditShutdownPromise;
}

function killChildTree(child: ChildProcess) {
  if (child.pid == null) return;
  try {
    process.kill(-child.pid, "SIGTERM");
    setTimeout(() => {
      try {
        if (child.pid != null) process.kill(-child.pid, "SIGKILL");
      } catch {
        // Child group already exited.
      }
    }, 5000).unref();
  } catch {
    try {
      child.kill("SIGTERM");
    } catch {
      // Child already exited.
    }
  }
}

async function runDirectTranslation(model: string) {
  const args = [
    "run", "i18n:translate:chunked", "--",
    "--slug", slug,
    "--locale", locale,
    "--model", model,
    "--chunk", chunkSize,
    "--run-id", processRunId,
    "--run-lock-path", runLockPath,
    ...optionalArg("--quiz-concurrency", quizConcurrency),
    ...optionalArg("--challenge-retries", challengeRetries),
  ];
  await runTrackedInherited("bun", args, { timeoutMs: timeoutSeconds * 1000 });
}

function getAllPostSlugs() {
  return collectSourcePostSlugs().sort((a, b) => b.localeCompare(a));
}

function getCandidateTasks(): CandidateTask[] {
  return slugs
    .flatMap((currentSlug) =>
      locales.map((currentLocale) => getCandidateTaskStats(currentSlug, currentLocale)),
    )
    .filter(({ slug: currentSlug, locale: currentLocale }) =>
      !shouldOnlyModified || isTranslationOlderThanSource(getPostPaths(currentSlug, currentLocale)),
    )
    .sort((a, b) =>
      a.candidateCount - b.candidateCount ||
      a.newestCandidateMs - b.newestCandidateMs ||
      a.slug.localeCompare(b.slug) ||
      a.locale.localeCompare(b.locale),
    )
    .map(({ slug: currentSlug, locale: currentLocale }) => ({
      slug: currentSlug,
      locale: currentLocale,
    }));
}

function getCandidateTaskStats(currentSlug: string, currentLocale: ActiveLocale): CandidateTaskStats {
  const paths = getPostPaths(currentSlug, currentLocale);
  const sourceContents = shouldOnlyModified ? readFileSync(paths.sourcePath, "utf8") : undefined;
  const rows = readCandidateOutputRows(currentSlug, currentLocale)
    .filter((row) => sourceContents == null || candidateRowIsFreshForSource(row, sourceContents));
  return {
    slug: currentSlug,
    locale: currentLocale,
    candidateCount: rows.length > 0 || shouldOnlyModified
      ? rows.length
      : countCandidateReportFiles(join(REPORT_ROOT, currentSlug, currentLocale)),
    newestCandidateMs: getNewestCandidateMs(rows),
  };
}

function candidateRowIsFreshForSource(row: Record<string, unknown>, sourceContents: string) {
  const candidatePath = typeof row.candidatePath === "string" ? row.candidatePath : undefined;
  if (candidatePath == null) return false;

  const absolutePath = join(process.cwd(), candidatePath);
  if (!existsSync(absolutePath)) return false;
  return isTranslationFreshForSourceContents(sourceContents, readFileSync(absolutePath, "utf8"));
}

function readCandidateOutputRows(currentSlug: string, currentLocale: ActiveLocale) {
  const articleReportDir = join(REPORT_ROOT, currentSlug);
  const reportDir = join(articleReportDir, currentLocale);
  const candidateRows = readJsonlRows(join(articleReportDir, "candidates.jsonl"))
    .filter((row) => row.locale === currentLocale);
  const legacyRows = readJsonlRows(join(reportDir, "candidates.jsonl"));
  const rowsById = new Map<string, Record<string, unknown>>();
  for (const row of [...legacyRows, ...candidateRows]) {
    rowsById.set(candidateRowId(row), row);
  }
  return [...rowsById.values()];
}

function getNewestCandidateMs(rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return 0;
  return Math.max(...rows.map(candidateCreatedMs));
}

function candidateCreatedMs(row: Record<string, unknown>) {
  const timestamp = typeof row.createdAt === "string"
    ? row.createdAt
    : typeof row.at === "string"
      ? row.at
      : "";
  const parsed = Date.parse(timestamp);
  return Number.isFinite(parsed) ? parsed : 0;
}

function candidateRowId(row: Record<string, unknown>) {
  return typeof row.runId === "string"
    ? row.runId
    : JSON.stringify([row.locale, row.model, row.createdAt, row.candidatePath]);
}

function readJsonlRows(path: string) {
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

function getRequestedLocales() {
  const requestedLocale = optionalString(options, "locale");
  const values = parseList(optionalString(options, "locales"), requestedLocale == null ? [...ACTIVE_LOCALES] : [requestedLocale]);
  return parseActiveLocales(values, "--locale/--locales");
}

async function validateCandidate() {
  const validateArgs = ["run", "i18n:validate", "--slug", slug, "--locale", locale];
  if (!shouldRunFullCandidateValidation) {
    validateArgs.push("--skip-global");
  }
  await runTrackedInherited("bun", validateArgs);
  return shouldRunFullCandidateValidation ? "passed" : "passed: local checks only";
}

function normalizeCandidateForLocale() {
  if (!existsSync(targetPath)) return;

  const normalized = normalizeLocalizedCandidateFile(
    readFileSync(sourcePath, "utf8"),
    readFileSync(targetPath, "utf8"),
  );
  writeTextFile(targetPath, normalized);
}

function cleanupRejectedTarget() {
  restoreTargetFromHead();
}

function restoreTargetFromHead() {
  if (targetExistsInHead()) {
    writeTextFile(targetPath, run("git", ["show", `HEAD:${targetRelPath}`]));
    return;
  }

  rmSync(dirname(targetPath), { recursive: true, force: true });
}

function targetExistsInHead() {
  try {
    run("git", ["cat-file", "-e", `HEAD:${targetRelPath}`]);
    return true;
  } catch {
    return false;
  }
}

function writeCandidateReport({
  reportPath,
  model,
  validationStatus,
  telemetry,
  note,
  rawOutput,
}: {
  reportPath: string;
  model: string;
  validationStatus: string;
  telemetry: CandidateTelemetry;
  note?: string;
  rawOutput?: string;
}) {
  writeTextFile(
    reportPath,
    [
      `# Translation Candidate`,
      ``,
      `- Slug: ${slug}`,
      `- Locale: ${locale}`,
      `- Model: ${model}`,
      `- Target: ${targetRelPath}`,
      `- Validation: ${validationStatus}`,
      `- Runtime seconds: ${telemetry.runtimeSeconds}`,
      `- Input tokens: ${formatMetric(telemetry.tokens.input)}`,
      `- Output tokens: ${formatMetric(telemetry.tokens.output)}`,
      `- Thinking tokens: ${formatMetric(telemetry.tokens.thinking)}`,
      `- Cached input tokens: ${formatMetric(telemetry.tokens.cached)}`,
      `- Cache write tokens: ${formatMetric(telemetry.tokens.cacheWrite)}`,
      `- Estimated cost: ${telemetry.estimatedCostUsd == null ? "unknown" : `$${telemetry.estimatedCostUsd.toFixed(6)}`}`,
      `- Pricing source: ${telemetry.pricingSource ?? "unknown"}`,
      note ? `- Note: ${note}` : undefined,
      ``,
      formatRawOutput(rawOutput),
    ].filter(Boolean).join("\n"),
  );
}

function formatRawOutput(rawOutput: string | undefined) {
  if (rawOutput == null || rawOutput.trim() === "") return undefined;

  const fence = longestBacktickRun(rawOutput) >= 4
    ? "`".repeat(longestBacktickRun(rawOutput) + 1)
    : "````";

  return [
    `## Raw Output`,
    ``,
    `${fence}mdx`,
    rawOutput.trimEnd(),
    fence,
    ``,
  ].join("\n");
}

function longestBacktickRun(value: string) {
  return Math.max(0, ...Array.from(value.matchAll(/`+/g), (match) => match[0].length));
}

function getDirectTelemetry(model: string, startedAt: number): CandidateTelemetry {
  const summary = readLatestCandidateSummary(model);
  if (summary != null) {
    return {
      runtimeSeconds: formatSeconds(numberValue(summary.totalDurationMs)),
      tokens: {
        input: numberValue(summary.totalInputTokens),
        output: numberValue(summary.totalOutputTokens),
        cached: numberValue(summary.totalCacheReadTokens),
        cacheWrite: numberValue(summary.totalCacheWriteTokens),
      },
      estimatedCostUsd: numberValue(summary.totalCostUsd),
      pricingSource: typeof summary.pricingSource === "string" ? summary.pricingSource : undefined,
    };
  }

  return {
    runtimeSeconds: formatSeconds(Date.now() - startedAt),
    tokens: {},
  };
}

function readLatestCandidateSummary(model: string) {
  const normalizedModel = model.replace(/^openrouter\//, "");
  const rows = [
    ...readJsonlRows(candidatesPath),
    ...readJsonlRows(join(reportDir, "candidates.jsonl")),
  ].filter((summary) => summary.locale === locale);

  for (const summary of rows.toReversed()) {
    if (summary.model === normalizedModel || summary.model === model) return summary;
  }

  return undefined;
}

function safeModelName(model: string) {
  return model.replace(/[^a-z0-9._-]+/gi, "-");
}

function validateCandidateModels(models: string[]) {
  const forbiddenModels = models.filter((model) =>
    model.includes("-fast") ||
    (model.startsWith("openrouter/openai/") && model !== "openrouter/openai/gpt-oss-120b:nitro") ||
    model.startsWith("openrouter/anthropic/"),
  );

  if (forbiddenModels.length > 0) {
    throw new Error([
      "Translation candidates must use cheap non-GPT/non-Anthropic models, except gpt-oss-120b:nitro, and must not use -fast variants.",
      `Forbidden model(s): ${forbiddenModels.join(", ")}`,
    ].join(" "));
  }

  return models;
}

function getAttemptReportPath(model: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return join(reportDir, `${safeModelName(model)}-${timestamp}.md`);
}

function getTimeoutSeconds() {
  const rawValue = optionalString(options, "timeout-seconds");
  if (rawValue == null) return DEFAULT_TRANSLATION_TIMEOUT_SECONDS;

  const parsedValue = Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`--timeout-seconds must be a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}

function getTaskConcurrency() {
  const rawValue = optionalString(options, "task-concurrency");
  if (rawValue == null) return DEFAULT_TASK_CONCURRENCY;

  const parsedValue = Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`--task-concurrency must be a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}

function formatSeconds(milliseconds: number | undefined) {
  if (milliseconds == null || !Number.isFinite(milliseconds)) return "unknown";
  return (milliseconds / 1000).toFixed(2);
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function formatMetric(value: number | undefined) {
  return value == null ? "unknown" : String(value);
}

function registerProcessCleanup() {
  for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"] as const) {
    process.once(signal, () => {
      console.error(`Received ${signal}; stopping active translation children and preserving run accounting.`);
      killActiveChildren();
      finalizeCandidateRun("interrupted", { commit: false, print: true });
      if (ownsRunLock) releaseRunLock(runLockPath, processRunId);
      process.exit(signal === "SIGINT" ? 130 : 143);
    });
  }

  process.once("exit", () => {
    killActiveChildren();
    if (isProcessingTask && !candidateRunFinalized) {
      finalizeCandidateRun("interrupted", { commit: false, print: false });
    }
    if (ownsRunLock) releaseRunLock(runLockPath, processRunId);
  });
}

function recordRunAttempt(attempt: CandidateRunAttempt) {
  candidateRunAttempts.push(attempt);
  appendCandidateRunEvent("attempt_recorded", buildCandidateRunSummary(), { attempt });
}

function finalizeCandidateRun(
  status: CandidateRunSummary["runStatus"],
  options: { commit: boolean; print: boolean },
) {
  if (candidateRunFinalized || candidateRunEventsPath === "") return;

  candidateRunStatus = status;
  const finalSummary = buildCandidateRunSummary();
  appendCandidateRunEvent("run_finished", finalSummary);
  appendCandidateRunHistory(finalSummary);
  candidateRunFinalized = true;

  if (options.commit && !shouldSkipCommit) {
    gitCommit(`i18n accounting(${locale}): ${slug} candidate run totals`, [
      candidateRunEventsRelPath,
      candidateRunHistoryRelPath,
    ]);
  }

  if (options.print) {
    printCandidateRunSummary(finalSummary);
  }
}

function buildCandidateRunSummary(): CandidateRunSummary {
  const totals = createCandidateRunTotals();
  let skippedModels = 0;
  let rejectedModels = 0;
  let candidateModels = 0;

  for (const attempt of candidateRunAttempts) {
    if (attempt.status === "skipped") { skippedModels++; continue; }
    if (attempt.status === "rejected") rejectedModels++;
    if (attempt.status === "candidate") candidateModels++;
    addTelemetryToTotals(totals, attempt.telemetry);
  }

  return {
    runId: candidateRunId,
    runStatus: candidateRunStatus,
    slug,
    locale,
    startedAt: candidateRunStartedAt.toISOString(),
    updatedAt: new Date().toISOString(),
    modelsRequested: models,
    attemptedModels: candidateRunAttempts.length - skippedModels,
    skippedModels,
    rejectedModels,
    candidateModels,
    totals: {
      ...totals,
      runtimeSeconds: (totals.runtimeMilliseconds / 1000).toFixed(2),
      estimatedCostUsd: Number(totals.estimatedCostUsd.toFixed(6)),
    },
    attempts: candidateRunAttempts,
  };
}

function createCandidateRunTotals() {
  return {
    runtimeMilliseconds: 0,
    inputTokens: 0,
    outputTokens: 0,
    thinkingTokens: 0,
    cachedInputTokens: 0,
    cacheWriteTokens: 0,
    estimatedCostUsd: 0,
    hasUnknownInputTokens: false,
    hasUnknownOutputTokens: false,
    hasUnknownThinkingTokens: false,
    hasUnknownCachedInputTokens: false,
    hasUnknownCacheWriteTokens: false,
    hasUnknownEstimatedCost: false,
  };
}

function addTelemetryToTotals(totals: Totals, telemetry: CandidateTelemetry | undefined) {
  if (telemetry == null) {
    totals.hasUnknownInputTokens = true;
    totals.hasUnknownOutputTokens = true;
    totals.hasUnknownThinkingTokens = true;
    totals.hasUnknownCachedInputTokens = true;
    totals.hasUnknownCacheWriteTokens = true;
    totals.hasUnknownEstimatedCost = true;
    return;
  }

  const runtimeSeconds = Number(telemetry.runtimeSeconds);
  if (Number.isFinite(runtimeSeconds)) totals.runtimeMilliseconds += runtimeSeconds * 1000;

  for (const [tokenKey, totalKey, unknownKey] of TOKEN_FIELDS) {
    const value = telemetry.tokens[tokenKey];
    if (value == null) {
      (totals[unknownKey] as boolean) = true;
    } else {
      (totals[totalKey] as number) += value;
    }
  }

  if (telemetry.estimatedCostUsd == null) {
    totals.hasUnknownEstimatedCost = true;
  } else {
    totals.estimatedCostUsd += telemetry.estimatedCostUsd;
  }
}

function summaryForOutput(summary: CandidateRunSummary) {
  const { runtimeMilliseconds: _, ...totals } = summary.totals as CandidateRunSummary["totals"] & { runtimeMilliseconds?: number };
  return { ...summary, totals };
}

function appendCandidateRunEvent(
  event: "run_started" | "attempt_recorded" | "run_finished",
  summary: CandidateRunSummary,
  extra: Record<string, unknown> = {},
) {
  const record = {
    event,
    at: new Date().toISOString(),
    runId: summary.runId,
    slug: summary.slug,
    locale: summary.locale,
    runStatus: summary.runStatus,
    summary: summaryForOutput(summary),
    ...extra,
  };
  appendFileSync(candidateRunEventsPath, `${JSON.stringify(record)}\n`, "utf8");
}

function appendCandidateRunHistory(summary: CandidateRunSummary) {
  appendFileSync(candidateRunHistoryPath, `${JSON.stringify(summaryForOutput(summary))}\n`, "utf8");
}

function printCandidateRunSummary(summary: CandidateRunSummary) {
  console.log([
    "",
    `Candidate run totals for ${slug} [${locale}]:`,
    `- Models attempted: ${summary.attemptedModels}/${summary.modelsRequested.length} (${summary.skippedModels} skipped, ${summary.rejectedModels} rejected)`,
    `- Runtime seconds: ${summary.totals.runtimeSeconds}`,
    `- Input tokens: ${formatTotalMetric(summary.totals.inputTokens, summary.totals.hasUnknownInputTokens)}`,
    `- Output tokens: ${formatTotalMetric(summary.totals.outputTokens, summary.totals.hasUnknownOutputTokens)}`,
    `- Thinking tokens: ${formatTotalMetric(summary.totals.thinkingTokens, summary.totals.hasUnknownThinkingTokens)}`,
    `- Cached input tokens: ${formatTotalMetric(summary.totals.cachedInputTokens, summary.totals.hasUnknownCachedInputTokens)}`,
    `- Cache write tokens: ${formatTotalMetric(summary.totals.cacheWriteTokens, summary.totals.hasUnknownCacheWriteTokens)}`,
    `- Estimated cost: $${summary.totals.estimatedCostUsd.toFixed(6)}${summary.totals.hasUnknownEstimatedCost ? " + unknown" : ""}`,
    `- Events: ${candidateRunEventsRelPath}`,
    `- History: ${candidateRunHistoryRelPath}`,
  ].join("\n"));
}

function formatTotalMetric(value: number, hasUnknown: boolean) {
  return `${value}${hasUnknown ? " + unknown" : ""}`;
}
