import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname } from "node:path";
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
  "openrouter/google/gemini-3.1-flash-lite-preview",
  "openrouter/z-ai/glm-5-turbo",
  "openrouter/anthropic/claude-haiku-4.5",
  "openrouter/google/gemini-3-flash-preview",
  "openrouter/google/gemini-2.5-flash-lite",
  "openrouter/deepseek/deepseek-v4-flash",
  "openrouter/qwen/qwen3-coder-flash",
  "openrouter/minimax/minimax-m2.7",
  "openrouter/minimax/minimax-m2.5",
  "openrouter/moonshotai/kimi-k2.6",
];

const DEFAULT_OPENCODE_TIMEOUT_SECONDS = 180;
const OPENCODE_COMMAND = existsSync("/Users/dan/.opencode/bin/opencode")
  ? "/Users/dan/.opencode/bin/opencode"
  : "opencode";
const MODEL_VARIANTS = new Map([
  ["openrouter/google/gemini-3.1-flash-lite-preview", "minimal"],
  ["openrouter/deepseek/deepseek-v4-pro", "low"],
  ["openrouter/qwen/qwen3.6-plus", "low"],
  ["openrouter/qwen/qwen3-coder-flash", "low"],
  ["openrouter/google/gemini-3-flash-preview", "minimal"],
  ["openrouter/z-ai/glm-5.1", "low"],
  ["openrouter/z-ai/glm-5-turbo", "low"],
  ["openrouter/z-ai/glm-4.7-flash", "low"],
]);

type ModelPrice = {
  input: number;
  output: number;
  cachedInput?: number;
};

const MODEL_PRICES_PER_MILLION_TOKENS = new Map<string, ModelPrice>([
  ["openrouter/google/gemma-4-26b-a4b-it", { input: 0, output: 0 }],
  ["openrouter/google/gemma-4-31b-it", { input: 0, output: 0 }],
  ["openrouter/google/gemini-3.1-flash-lite-preview", { input: 0.1, output: 0.4 }],
  ["openrouter/google/gemini-2.5-flash-lite", { input: 0.1, output: 0.4 }],
  ["openrouter/deepseek/deepseek-v4-flash", { input: 0.05, output: 0.1 }],
  ["openrouter/deepseek/deepseek-v4-pro", { input: 0.2, output: 0.8 }],
  ["openrouter/anthropic/claude-haiku-4.5", { input: 1, output: 5 }],
  ["openrouter/qwen/qwen3-coder-flash", { input: 0.05, output: 0.2 }],
  ["openrouter/qwen/qwen3.6-plus", { input: 0.325, output: 1.95 }],
  ["openrouter/qwen/qwen3.6-flash", { input: 0.25, output: 1.5 }],
  ["openrouter/qwen/qwen3.6-35b-a3b", { input: 0.15, output: 1 }],
  ["openrouter/z-ai/glm-5-turbo", { input: 0.1, output: 0.4 }],
  ["openrouter/z-ai/glm-4.7-flash", { input: 0.1, output: 0.4 }],
  ["openrouter/minimax/minimax-m2.7", { input: 0.3, output: 1.2 }],
  ["openrouter/minimax/minimax-m2.5", { input: 0.3, output: 1.2 }],
  ["openrouter/moonshotai/kimi-k2.6", { input: 0.6, output: 2.5 }],
  ["openrouter/google/gemma-4-26b-a4b-it:free", { input: 0, output: 0 }],
  ["openrouter/minimax/minimax-m2.5:free", { input: 0, output: 0 }],
  ["openrouter/openai/gpt-5-mini", { input: 0.25, output: 2 }],
  ["openrouter/openai/gpt-5.4-mini", { input: 0.75, output: 4.5 }],
]);

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const models = parseList(optionalString(options, "models"), DEFAULT_CANDIDATE_MODELS);
const shouldSkipValidation = options["skip-validation"] === true;
const shouldSkipCommit = options["no-commit"] === true;
const shouldOverwrite = options["overwrite"] === true;
const timeoutSeconds = getTimeoutSeconds();
const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);
const targetRelPath = relativeToRepo(targetPath);

mkdirSync(dirname(targetPath), { recursive: true });

for (const model of models) {
  const preRunChangedPaths = getChangedPaths();
  const prompt = [
    "You are a constrained translation file-rewrite worker.",
    `Translate ${relativeToRepo(sourcePath)} into ${locale}.`,
    `Write the complete translated MDX to ${targetRelPath}.`,
    "Do not run shell commands, git commands, Bun scripts, validation scripts, or translation scripts.",
    "Do not inspect or follow repository skills. Do not create commits. The wrapper script owns validation, reports, and Git.",
    "Preserve MDX structure, imports, component names, prop names, code blocks, URLs, asset paths, and anchors.",
    "Translate reader-facing prose, frontmatter title/subTitle, image alt text, quiz questions/options/explanations, and visible UI copy inside MDX props.",
    "Do not add commentary outside the file. Replace any previous candidate in the target file.",
    "Keep frontmatter lean: localized title/subTitle/body and optional localized cover_alt only unless a field must override English.",
  ].join("\n");

  const reportPath = `${reportDir}/${safeModelName(model)}.md`;
  if (!shouldOverwrite && existsSync(reportPath)) {
    console.log(`Skipping existing ${locale}/${model} report at ${relativeToRepo(reportPath)}. Pass --overwrite to rerun.`);
    continue;
  }

  const opencodeResult = runOpenCode([
      "run",
      "--pure",
      "--model",
      model,
      ...getVariantArgs(model),
      "--file",
      sourcePath,
      "--dangerously-skip-permissions",
      prompt,
    ], timeoutSeconds * 1000);
  const telemetry = getCandidateTelemetry(model, opencodeResult);
  const unrelatedChangedPaths = getUnrelatedChangedPaths(preRunChangedPaths);

  if (unrelatedChangedPaths.length > 0) {
    cleanupRejectedTarget();
    cleanupUnrelatedPaths(unrelatedChangedPaths);
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: touched unrelated files",
      telemetry,
      note: `Model changed files outside ${targetRelPath}: ${unrelatedChangedPaths.join(", ")}`,
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }

    continue;
  }

  if (!opencodeResult.ok) {
    cleanupRejectedTarget();
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: opencode command failed",
      telemetry,
      note: opencodeResult.errorMessage,
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }

    continue;
  }

  if (!existsSync(targetPath)) {
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: missing output file",
      telemetry,
      note: `Model did not create ${targetRelPath}.`,
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }

    continue;
  }

  if (!hasGitDiff(targetRelPath)) {
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: target file unchanged",
      telemetry,
      note: [
        `Model did not leave a diff in ${targetRelPath}.`,
        "This usually means the provider failed, refused, or only inspected the existing candidate.",
      ].join(" "),
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }

    continue;
  }

  let validationStatus = "skipped";
  if (!shouldSkipValidation) {
    try {
      validationStatus = validateCandidate();
    } catch (error) {
      cleanupRejectedTarget();
      writeCandidateReport({
        reportPath,
        model,
        validationStatus: "rejected: validation failed",
        telemetry,
        note: error instanceof Error ? error.message : String(error),
      });

      if (!shouldSkipCommit) {
        gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
          relativeToRepo(reportPath),
        ]);
      }

      continue;
    }
  }

  writeCandidateReport({ reportPath, model, validationStatus, telemetry });

  if (!shouldSkipCommit) {
    gitCommit(`i18n candidate(${locale}): ${slug} via ${model}`, [
      targetRelPath,
      relativeToRepo(reportPath),
    ]);
  }
}

function validateCandidate() {
  normalizeCandidateForLocale();
  runInherited("bun", ["run", "i18n:validate", "--slug", slug, "--locale", locale]);
  return "passed";
}

function normalizeCandidateForLocale() {
  if (!existsSync(targetPath)) return;

  const normalized = readFileSync(targetPath, "utf8")
    .replaceAll("](./", "](../")
    .replaceAll('src="./', 'src="../')
    .replaceAll("src='./", "src='../")
    .replaceAll('="./', '="../')
    .replaceAll("='./", "='../")
    .replace(/^(\s*[A-Za-z0-9_-]+:\s*)\.\/(?!\.)/gm, "$1../")
    .replaceAll(" from '../../../", " from '../../../../");

  writeTextFile(targetPath, normalized);
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

function getUnrelatedChangedPaths(preRunChangedPaths: Set<string>) {
  const targetDirRelPath = relativeToRepo(dirname(targetPath));
  const targetDirStatusPath = `${targetDirRelPath}/`;

  return [...getChangedPaths()].filter(
    (path) =>
      path !== targetRelPath &&
      path !== targetDirStatusPath &&
      !preRunChangedPaths.has(path),
  );
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

function cleanupUnrelatedPaths(paths: string[]) {
  for (const path of paths) {
    if (pathExistsInHead(path)) {
      writeTextFile(`${process.cwd()}/${path}`, run("git", ["show", `HEAD:${path}`]));
    } else {
      rmSync(`${process.cwd()}/${path}`, { recursive: true, force: true });
    }
  }
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

function safeModelName(model: string) {
  return model.replace(/[^a-z0-9._-]+/gi, "-");
}

function getVariantArgs(model: string) {
  const variant = MODEL_VARIANTS.get(model);
  return variant == null ? [] : ["--variant", variant];
}

function getTimeoutSeconds() {
  const rawValue = optionalString(options, "timeout-seconds");
  if (rawValue == null) return DEFAULT_OPENCODE_TIMEOUT_SECONDS;

  const parsedValue = Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`--timeout-seconds must be a positive integer. Received "${rawValue}".`);
  }

  return parsedValue;
}

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

type OpenCodeResult = {
  ok: boolean;
  runtimeMs: number;
  output: string;
  errorMessage?: string;
};

function runOpenCode(args: string[], timeoutMs: number): OpenCodeResult {
  const startTime = Date.now();
  const result = spawnSync(OPENCODE_COMMAND, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: timeoutMs,
  });
  const runtimeMs = Date.now() - startTime;
  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";

  if (stdout.length > 0) process.stdout.write(stdout);
  if (stderr.length > 0) process.stderr.write(stderr);

  const timeoutNote =
    result.error?.name === "TimeoutError" || result.signal === "SIGTERM"
      ? ` after ${timeoutMs}ms`
      : "";

  return {
    ok: result.status === 0,
    runtimeMs,
    output: `${stdout}\n${stderr}`,
    errorMessage: result.status === 0
      ? undefined
      : `Command failed${timeoutNote}: ${OPENCODE_COMMAND} ${args.join(" ")}`,
  };
}

function getCandidateTelemetry(model: string, result: OpenCodeResult): CandidateTelemetry {
  const tokens = parseTokenUsage(result.output);

  return {
    runtimeSeconds: (result.runtimeMs / 1000).toFixed(2),
    tokens,
    estimatedCostUsd: estimateCost(model, tokens),
  };
}

function parseTokenUsage(output: string): CandidateTelemetry["tokens"] {
  const jsonUsage = parseJsonUsage(output);
  if (jsonUsage != null) return jsonUsage;

  return {
    input: findTokenCount(output, [
      "input tokens",
      "prompt tokens",
      "input",
      "prompt",
    ]),
    output: findTokenCount(output, [
      "output tokens",
      "completion tokens",
      "output",
      "completion",
    ]),
    thinking: findTokenCount(output, [
      "thinking tokens",
      "reasoning tokens",
      "reasoning",
      "thinking",
    ]),
    cached: findTokenCount(output, [
      "cached input tokens",
      "cache read tokens",
      "cached tokens",
      "cached",
    ]),
  };
}

function parseJsonUsage(output: string): CandidateTelemetry["tokens"] | undefined {
  for (const line of output.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (!trimmedLine.startsWith("{")) continue;

    try {
      const event = JSON.parse(trimmedLine);
      const usage = findUsageObject(event);
      if (usage == null) continue;

      return {
        input: firstNumber(usage, ["input", "inputTokens", "prompt_tokens", "promptTokens"]),
        output: firstNumber(usage, ["output", "outputTokens", "completion_tokens", "completionTokens"]),
        thinking: firstNumber(usage, ["thinking", "thinkingTokens", "reasoning_tokens", "reasoningTokens"]),
        cached: firstNumber(usage, ["cached", "cachedInput", "cachedInputTokens", "cache_read_input_tokens"]),
      };
    } catch {
      // Ignore non-JSON formatted opencode output.
    }
  }

  return undefined;
}

function findUsageObject(value: unknown): Record<string, unknown> | undefined {
  if (value == null || typeof value !== "object") return undefined;
  const record = value as Record<string, unknown>;
  const directUsage = record.usage;
  if (directUsage != null && typeof directUsage === "object") {
    return directUsage as Record<string, unknown>;
  }

  for (const child of Object.values(record)) {
    const nestedUsage = findUsageObject(child);
    if (nestedUsage != null) return nestedUsage;
  }

  return undefined;
}

function firstNumber(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }

  return undefined;
}

function findTokenCount(output: string, labels: string[]) {
  for (const label of labels) {
    const match = output.match(new RegExp(`${label.replaceAll(" ", "\\s+")}\\D+([0-9][0-9,]*)`, "i"));
    if (match?.[1] != null) return Number(match[1].replaceAll(",", ""));
  }

  return undefined;
}

function estimateCost(model: string, tokens: CandidateTelemetry["tokens"]) {
  const price = MODEL_PRICES_PER_MILLION_TOKENS.get(model);
  if (price == null) return undefined;

  const inputTokens = tokens.input ?? 0;
  const outputTokens = tokens.output ?? 0;
  const thinkingTokens = tokens.thinking ?? 0;
  const cachedTokens = tokens.cached ?? 0;
  const uncachedInputTokens = Math.max(inputTokens - cachedTokens, 0);

  return (
    (uncachedInputTokens * price.input) +
    (cachedTokens * (price.cachedInput ?? price.input)) +
    ((outputTokens + thinkingTokens) * price.output)
  ) / 1_000_000;
}

function formatMetric(value: number | undefined) {
  return value == null ? "unknown" : String(value);
}
