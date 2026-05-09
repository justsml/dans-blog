import { spawnSync } from "node:child_process";

export type ModelPrice = {
  input: number;
  output: number;
  cachedInput?: number;
};

export type RunTelemetry = {
  runtimeSeconds: string;
  tokens: {
    input?: number;
    output?: number;
    thinking?: number;
    cached?: number;
  };
  estimatedCostUsd?: number;
};

export type CommandResult = {
  ok: boolean;
  runtimeMs: number;
  output: string;
  errorMessage?: string;
};

const MODEL_PRICES_PER_MILLION_TOKENS = new Map<string, ModelPrice>([
  ["openrouter/google/gemma-4-26b-a4b-it", { input: 0, output: 0 }],
  ["openrouter/google/gemma-4-31b-it", { input: 0, output: 0 }],
  ["openrouter/deepseek/deepseek-v4-pro", { input: 0.2, output: 0.8 }],
  ["openrouter/qwen/qwen3.6-plus", { input: 0.325, output: 1.95 }],
  ["openrouter/qwen/qwen3.6-flash", { input: 0.25, output: 1.5 }],
  ["openrouter/qwen/qwen3.6-35b-a3b", { input: 0.15, output: 1 }],
  ["openrouter/openai/gpt-5-mini", { input: 0.25, output: 2 }],
  ["openrouter/openai/gpt-5.4-mini", { input: 0.75, output: 4.5 }],
  ["openrouter/openai/gpt-5.4", { input: 2, output: 10 }],
]);

export function runMeasuredCommand(command: string, args: string[], timeoutMs: number): CommandResult {
  const startTime = Date.now();
  const result = spawnSync(command, args, {
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
      : `Command failed${timeoutNote}: ${command} ${args.join(" ")}`,
  };
}

export function getRunTelemetry(model: string, result: CommandResult): RunTelemetry {
  const tokens = parseTokenUsage(result.output);

  return {
    runtimeSeconds: (result.runtimeMs / 1000).toFixed(2),
    tokens,
    estimatedCostUsd: estimateCost(model, tokens),
  };
}

export function renderTelemetryLines(telemetry: RunTelemetry) {
  return [
    `- Runtime seconds: ${telemetry.runtimeSeconds}`,
    `- Input tokens: ${formatMetric(telemetry.tokens.input)}`,
    `- Output tokens: ${formatMetric(telemetry.tokens.output)}`,
    `- Thinking tokens: ${formatMetric(telemetry.tokens.thinking)}`,
    `- Cached input tokens: ${formatMetric(telemetry.tokens.cached)}`,
    `- Estimated cost: ${telemetry.estimatedCostUsd == null ? "unknown" : `$${telemetry.estimatedCostUsd.toFixed(6)}`}`,
  ];
}

function parseTokenUsage(output: string): RunTelemetry["tokens"] {
  const jsonUsage = parseJsonUsage(output);
  if (jsonUsage != null) return jsonUsage;

  return {
    input: findTokenCount(output, ["input tokens", "prompt tokens", "input", "prompt"]),
    output: findTokenCount(output, ["output tokens", "completion tokens", "output", "completion"]),
    thinking: findTokenCount(output, ["thinking tokens", "reasoning tokens", "reasoning", "thinking"]),
    cached: findTokenCount(output, ["cached input tokens", "cache read tokens", "cached tokens", "cached"]),
  };
}

function parseJsonUsage(output: string): RunTelemetry["tokens"] | undefined {
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
      // Ignore non-JSON formatted command output.
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

function estimateCost(model: string, tokens: RunTelemetry["tokens"]) {
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
