import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import {
  getPostPaths,
  gitCommit,
  optionalString,
  parseArgs,
  parseList,
  relativeToRepo,
  run,
  runInherited,
  writeTextFile,
} from "./utils.ts";

const DEFAULT_CANDIDATE_MODELS = [
  "openrouter/qwen/qwen3.6-plus",
  "openrouter/deepseek/deepseek-v4-flash",
  "openrouter/openai/gpt-oss-120b:nitro",
  "openrouter/qwen/qwen3-32b:nitro",
  "openrouter/z-ai/glm-4.7-flash",
  "openrouter/minimax/minimax-m2.5",
  "openrouter/minimax/minimax-m2.7",
  "openrouter/google/gemini-3-flash-preview",
  "openrouter/deepseek/deepseek-v3.2",
  "openrouter/z-ai/glm-5-turbo",
];

const DEFAULT_TRANSLATION_TIMEOUT_SECONDS = 240;
const DEFAULT_CHUNK_SIZE = "6p";
const DEFAULT_TASK_CONCURRENCY = 2;

type CandidateTask = {
  slug: string;
  locale: ActiveLocale;
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

const options = parseArgs();
const models = validateCandidateModels(parseList(optionalString(options, "models"), DEFAULT_CANDIDATE_MODELS));
const shouldSkipValidation = options["skip-validation"] === true;
const shouldSkipCommit = options["no-commit"] === true;
const shouldOverwrite = options["overwrite"] === true;
const shouldAllowConcurrentWorktree = options["allow-concurrent-worktree"] === true;
const shouldDryRun = options["dry-run"] === true;
const isTaskWorker = options["task-worker"] === true;
const timeoutSeconds = getTimeoutSeconds();
const taskConcurrency = getTaskConcurrency();
const chunkSize = optionalString(options, "chunk") ?? DEFAULT_CHUNK_SIZE;
const quizConcurrency = optionalString(options, "quiz-concurrency");
const challengeRetries = optionalString(options, "challenge-retries");
const requestedSlug = optionalString(options, "slug");
const requestedSlugs = parseList(optionalString(options, "slugs"), requestedSlug == null ? [] : [requestedSlug]);
const slugs = requestedSlugs.length > 0 ? requestedSlugs : getAllPostSlugs();
const locales = getRequestedLocales();

let slug = "";
let locale: ActiveLocale = "es";
let sourcePath = "";
let targetPath = "";
let reportDir = "";
let targetRelPath = "";
let candidatesPath = "";
let candidateRunStartedAt = new Date();
let candidateRunId = "";
let candidateRunSummaryPath = "";
let candidateRunSummaryRelPath = "";
let candidateRunAttempts: CandidateRunAttempt[] = [];

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
  processTask(slugs[0], locales[0]);
} else {
  await processTasks(getCandidateTasks());
}

function processTask(currentSlug: string, currentLocale: ActiveLocale) {
  slug = currentSlug;
  locale = currentLocale;
  const paths = getPostPaths(slug, locale);
  sourcePath = paths.sourcePath;
  targetPath = paths.targetPath;
  reportDir = paths.reportDir;
  targetRelPath = relativeToRepo(targetPath);
  candidatesPath = join(reportDir, "candidates.jsonl");
  candidateRunStartedAt = new Date();
  candidateRunId = candidateRunStartedAt.toISOString().replace(/[:.]/g, "-");
  candidateRunSummaryPath = join(reportDir, "candidate-run-summary.json");
  candidateRunSummaryRelPath = relativeToRepo(candidateRunSummaryPath);
  candidateRunAttempts = [];

  console.log(`\nGenerating candidates for ${slug} [${locale}]`);
  mkdirSync(dirname(targetPath), { recursive: true });

  for (const model of models) {
    const reportPath = `${reportDir}/${safeModelName(model)}.md`;
    if (!shouldOverwrite && existsSync(reportPath) && !isRejectedReport(reportPath)) {
      console.log(`Skipping existing ${locale}/${model} report at ${relativeToRepo(reportPath)}. Pass --overwrite to rerun.`);
      recordRunAttempt({
        model,
        status: "skipped",
        reportPath: relativeToRepo(reportPath),
        note: "Existing non-rejected report found. Pass --overwrite to rerun.",
      });
      continue;
    }
    if (!shouldOverwrite && existsSync(reportPath)) {
      console.log(`Retrying rejected ${locale}/${model} report at ${relativeToRepo(reportPath)}.`);
    }

    const preRunChangedPaths = getChangedPaths();
    const preRunCandidatesJsonl = existsSync(candidatesPath) ? readFileSync(candidatesPath, "utf8") : undefined;
    const startedAt = Date.now();
    try {
      runDirectTranslation(model);

      if (!existsSync(targetPath)) {
        throw new Error(`Direct translator did not create ${targetRelPath}.`);
      }

      if (!hasGitDiff(targetRelPath)) {
        throw new Error([
          `Direct translator did not leave a diff in ${targetRelPath}.`,
          "This usually means the translation already exists or the provider produced unchanged output.",
        ].join(" "));
      }

      let validationStatus = "skipped";
      if (!shouldSkipValidation) {
        validationStatus = validateCandidate();
      }

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

      if (!shouldSkipCommit) {
        gitCommit(`i18n candidate(${locale}): ${slug} via ${model}`, [
          targetRelPath,
          relativeToRepo(reportDir),
        ]);
      }
    } catch (error) {
      const telemetry = getDirectTelemetry(model, startedAt);
      const rawOutput = existsSync(targetPath) ? readFileSync(targetPath, "utf8") : undefined;
      cleanupRejectedTarget();
      cleanupNewGeneratedReports(preRunChangedPaths, reportPath);
      restoreCandidateIndex(preRunCandidatesJsonl);
      writeCandidateReport({
        reportPath,
        model,
        validationStatus: "rejected: direct AI SDK translation failed",
        telemetry,
        note: error instanceof Error ? error.message : String(error),
        rawOutput,
      });
      recordRunAttempt({
        model,
        status: "rejected",
        validationStatus: "rejected: direct AI SDK translation failed",
        reportPath: relativeToRepo(reportPath),
        note: error instanceof Error ? error.message : String(error),
        telemetry,
      });

      if (!shouldSkipCommit) {
        gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
          relativeToRepo(reportPath),
          candidateRunSummaryRelPath,
        ]);
      }
    }
  }

  printCandidateRunSummary(buildCandidateRunSummary());
}

async function processTasks(tasks: CandidateTask[]) {
  console.log(`Found ${tasks.length} candidate translation task(s).`);
  console.log(`Processing with concurrency ${taskConcurrency}.`);

  if (tasks.length === 1) {
    processTask(tasks[0].slug, tasks[0].locale);
    return;
  }

  const failures: string[] = [];
  await mapLimit(tasks, taskConcurrency, async (task, index) => {
    console.log(`\n[${index + 1}/${tasks.length}] queued ${task.locale}/${task.slug}`);
    try {
      await runTaskWorker(task);
    } catch (error) {
      failures.push(`${task.locale}/${task.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

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
    ...optionalFlag("--skip-validation", shouldSkipValidation),
    ...optionalFlag("--no-commit", shouldSkipCommit),
    ...optionalFlag("--overwrite", shouldOverwrite),
    ...optionalFlag("--allow-concurrent-worktree", shouldAllowConcurrentWorktree),
    ...optionalArg("--quiz-concurrency", quizConcurrency),
    ...optionalArg("--challenge-retries", challengeRetries),
  ];

  return new Promise<void>((resolve, reject) => {
    const child = spawn("bun", args, {
      cwd: process.cwd(),
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
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

function runDirectTranslation(model: string) {
  const args = [
    "run",
    "i18n:translate:chunked",
    "--",
    "--slug",
    slug,
    "--locale",
    locale,
    "--model",
    model,
    "--chunk",
    chunkSize,
  ];

  if (quizConcurrency != null) {
    args.push("--quiz-concurrency", quizConcurrency);
  }
  if (challengeRetries != null) {
    args.push("--challenge-retries", challengeRetries);
  }

  runInherited("bun", args, { timeoutMs: timeoutSeconds * 1000 });
}

function getAllPostSlugs() {
  const postsDir = join(process.cwd(), "src/content/posts");
  return readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((directoryName) => (
      existsSync(join(postsDir, directoryName, "index.mdx"))
      || existsSync(join(postsDir, directoryName, "index.md"))
    ))
    .sort((a, b) => b.localeCompare(a))
    .map((directoryName) => directoryName.replace(/^\d{4}-\d{2}-\d{2}--/, ""));
}

function getCandidateTasks(): CandidateTask[] {
  return slugs.flatMap((currentSlug) =>
    locales.map((currentLocale) => ({
      slug: currentSlug,
      locale: currentLocale,
    })),
  );
}

function getRequestedLocales() {
  const requestedLocale = optionalString(options, "locale");
  const values = parseList(optionalString(options, "locales"), requestedLocale == null ? [...ACTIVE_LOCALES] : [requestedLocale]);
  const invalidLocales = values.filter((value) => !isActiveLocale(value));

  if (invalidLocales.length > 0) {
    throw new Error(
      `--locale/--locales must use active locales: ${ACTIVE_LOCALES.join(", ")}. Received: ${invalidLocales.join(", ")}`,
    );
  }

  return values as ActiveLocale[];
}

function validateCandidate() {
  normalizeCandidateForLocale();
  runInherited("bun", ["run", "i18n:fix-mdx-indents", "--write", targetPath]);
  const validateArgs = ["run", "i18n:validate", "--slug", slug, "--locale", locale];
  if (shouldAllowConcurrentWorktree) {
    validateArgs.push("--skip-global");
  }
  runInherited("bun", validateArgs);
  return "passed";
}

function normalizeCandidateForLocale() {
  if (!existsSync(targetPath)) return;

  const normalized = ensureSourceImports(readFileSync(targetPath, "utf8"))
    .replaceAll("](./", "](../")
    .replaceAll('src="./', 'src="../')
    .replaceAll("src='./", "src='../")
    .replaceAll('="./', '="../')
    .replaceAll("='./", "='../")
    .replace(/^(\s*[A-Za-z0-9_-]+:\s*)\.\/(?!\.)/gm, "$1../")
    .replaceAll(" from '../../../", " from '../../../../");

  writeTextFile(targetPath, normalized);
}

function ensureSourceImports(targetContents: string) {
  const sourceImports = readFileSync(sourcePath, "utf8").match(/^import\s.+$/gm) ?? [];
  const missingImports = sourceImports
    .filter((importLine) => {
      const localeImportLine = importLine.replaceAll(" from '../../../", " from '../../../../");
      return !targetContents.includes(importLine) && !targetContents.includes(localeImportLine);
    })
    .map((importLine) => importLine.replaceAll(" from '../../../", " from '../../../../"));

  if (missingImports.length === 0) return targetContents;

  const frontmatterEnd = targetContents.indexOf("\n---", 3);
  if (!targetContents.startsWith("---") || frontmatterEnd === -1) {
    return `${missingImports.join("\n")}\n\n${targetContents}`;
  }

  const insertAt = frontmatterEnd + "\n---".length;
  return `${targetContents.slice(0, insertAt)}\n${missingImports.join("\n")}${targetContents.slice(insertAt)}`;
}

function hasGitDiff(path: string) {
  const status = run("git", ["status", "--porcelain", "--", path]);
  return status.trim().length > 0;
}

function cleanupRejectedTarget() {
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

function cleanupNewGeneratedReports(preRunChangedPaths: Set<string>, reportPath: string) {
  const legacyReportRelPath = relativeToRepo(reportPath);
  const reportDirRelPath = relativeToRepo(reportDir);

  for (const path of getChangedPaths()) {
    if (preRunChangedPaths.has(path)) continue;
    if (path === legacyReportRelPath) continue;
    if (!path.startsWith(`${reportDirRelPath}/`)) continue;
    if (pathExistsInHead(path)) continue;
    rmSync(join(process.cwd(), path), { recursive: true, force: true });
  }
}

function restoreCandidateIndex(previousContents: string | undefined) {
  if (previousContents == null) {
    rmSync(candidatesPath, { force: true });
    return;
  }

  writeTextFile(candidatesPath, previousContents);
}

function getChangedPaths() {
  const output = run("git", ["status", "--porcelain"]);
  return new Set(
    output
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => line.match(/^.. ?(.+)$/)?.[1] ?? line.slice(3))
      .map((path) => path.split(" -> ").at(-1))
      .filter((path): path is string => path != null && path.trim() !== ""),
  );
}

function pathExistsInHead(path: string) {
  try {
    run("git", ["cat-file", "-e", `HEAD:${path}`]);
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
  const candidatesPath = join(reportDir, "candidates.jsonl");
  if (!existsSync(candidatesPath)) return undefined;

  const normalizedModel = model.replace(/^openrouter\//, "");
  const lines = readFileSync(candidatesPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines.toReversed()) {
    try {
      const summary = JSON.parse(line) as Record<string, unknown>;
      if (summary.model === normalizedModel || summary.model === model) return summary;
    } catch {
      // Ignore malformed JSONL rows.
    }
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

function isRejectedReport(reportPath: string) {
  return readFileSync(reportPath, "utf8").includes("- Validation: rejected:");
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

function recordRunAttempt(attempt: CandidateRunAttempt) {
  candidateRunAttempts.push(attempt);
  writeCandidateRunSummary(buildCandidateRunSummary());
}

function buildCandidateRunSummary(): CandidateRunSummary {
  const totals = createCandidateRunTotals();
  for (const attempt of candidateRunAttempts) {
    if (attempt.status === "skipped") continue;
    addTelemetryToTotals(totals, attempt.telemetry);
  }

  return {
    runId: candidateRunId,
    slug,
    locale,
    startedAt: candidateRunStartedAt.toISOString(),
    updatedAt: new Date().toISOString(),
    modelsRequested: models,
    attemptedModels: candidateRunAttempts.filter((attempt) => attempt.status !== "skipped").length,
    skippedModels: candidateRunAttempts.filter((attempt) => attempt.status === "skipped").length,
    rejectedModels: candidateRunAttempts.filter((attempt) => attempt.status === "rejected").length,
    candidateModels: candidateRunAttempts.filter((attempt) => attempt.status === "candidate").length,
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

function addTelemetryToTotals(
  totals: ReturnType<typeof createCandidateRunTotals>,
  telemetry: CandidateTelemetry | undefined,
) {
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
  if (Number.isFinite(runtimeSeconds)) {
    totals.runtimeMilliseconds += runtimeSeconds * 1000;
  }

  totals.inputTokens += addKnownMetric(telemetry.tokens.input, () => {
    totals.hasUnknownInputTokens = true;
  });
  totals.outputTokens += addKnownMetric(telemetry.tokens.output, () => {
    totals.hasUnknownOutputTokens = true;
  });
  totals.thinkingTokens += addKnownMetric(telemetry.tokens.thinking, () => {
    totals.hasUnknownThinkingTokens = true;
  });
  totals.cachedInputTokens += addKnownMetric(telemetry.tokens.cached, () => {
    totals.hasUnknownCachedInputTokens = true;
  });
  totals.cacheWriteTokens += addKnownMetric(telemetry.tokens.cacheWrite, () => {
    totals.hasUnknownCacheWriteTokens = true;
  });

  if (telemetry.estimatedCostUsd == null) {
    totals.hasUnknownEstimatedCost = true;
  } else {
    totals.estimatedCostUsd += telemetry.estimatedCostUsd;
  }
}

function addKnownMetric(value: number | undefined, markUnknown: () => void) {
  if (value == null) {
    markUnknown();
    return 0;
  }
  return value;
}

function writeCandidateRunSummary(summary: CandidateRunSummary) {
  const { runtimeMilliseconds: _runtimeMilliseconds, ...totals } = summary.totals as CandidateRunSummary["totals"] & {
    runtimeMilliseconds?: number;
  };
  writeTextFile(candidateRunSummaryPath, JSON.stringify({ ...summary, totals }, null, 2));
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
    `- Summary: ${candidateRunSummaryRelPath}`,
  ].join("\n"));
}

function formatTotalMetric(value: number, hasUnknown: boolean) {
  return `${value}${hasUnknown ? " + unknown" : ""}`;
}
