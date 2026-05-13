import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  getPostPaths,
  gitCommit,
  optionalString,
  parseArgs,
  parseList,
  relativeToRepo,
  requireActiveLocale,
  requireString,
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
const DEFAULT_ARTICLE_CHUNK_SIZE = "5s";

type CandidateTelemetry = {
  runtimeSeconds: string;
  tokens: {
    input?: number;
    output?: number;
    thinking?: number;
    cached?: number;
  };
  estimatedCostUsd?: number;
};

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const models = validateCandidateModels(parseList(optionalString(options, "models"), DEFAULT_CANDIDATE_MODELS));
const shouldSkipValidation = options["skip-validation"] === true;
const shouldSkipCommit = options["no-commit"] === true;
const shouldOverwrite = options["overwrite"] === true;
const shouldAllowConcurrentWorktree = options["allow-concurrent-worktree"] === true;
const timeoutSeconds = getTimeoutSeconds();
const articleChunkSize = optionalString(options, "chunk") ?? DEFAULT_ARTICLE_CHUNK_SIZE;
const quizConcurrency = optionalString(options, "quiz-concurrency");
const challengeRetries = optionalString(options, "challenge-retries");
const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);
const targetRelPath = relativeToRepo(targetPath);

mkdirSync(dirname(targetPath), { recursive: true });

for (const model of models) {
  const reportPath = `${reportDir}/${safeModelName(model)}.md`;
  if (!shouldOverwrite && existsSync(reportPath) && !isRejectedReport(reportPath)) {
    console.log(`Skipping existing ${locale}/${model} report at ${relativeToRepo(reportPath)}. Pass --overwrite to rerun.`);
    continue;
  }
  if (!shouldOverwrite && existsSync(reportPath)) {
    console.log(`Retrying rejected ${locale}/${model} report at ${relativeToRepo(reportPath)}.`);
  }

  const preRunChangedPaths = getChangedPaths();
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
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n candidate(${locale}): ${slug} via ${model}`, [
        targetRelPath,
        relativeToRepo(reportDir),
      ]);
    }
  } catch (error) {
    cleanupRejectedTarget();
    cleanupNewGeneratedReports(preRunChangedPaths, reportPath);
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: direct AI SDK translation failed",
      telemetry: getDirectTelemetry(model, startedAt),
      note: error instanceof Error ? error.message : String(error),
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }
  }
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
    articleChunkSize,
  ];

  if (quizConcurrency != null) {
    args.push("--quiz-concurrency", quizConcurrency);
  }
  if (challengeRetries != null) {
    args.push("--challenge-retries", challengeRetries);
  }

  runInherited("bun", args, { timeoutMs: timeoutSeconds * 1000 });
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
}: {
  reportPath: string;
  model: string;
  validationStatus: string;
  telemetry: CandidateTelemetry;
  note?: string;
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
      `- Estimated cost: ${telemetry.estimatedCostUsd == null ? "unknown" : `$${telemetry.estimatedCostUsd.toFixed(6)}`}`,
      note ? `- Note: ${note}` : undefined,
      ``,
    ].filter(Boolean).join("\n"),
  );
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
      },
      estimatedCostUsd: numberValue(summary.totalCostUsd),
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
