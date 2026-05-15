export interface TranslationTelemetry {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  reasoningTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  finishReason?: string;
  rawFinishReason?: string;
  warnings?: unknown[];
  providerCostUsd?: number;
  providerUpstreamCostUsd?: number;
  pricingSource?: string;
  openRouterUsage?: Record<string, unknown>;
}

export type LlmGenerationResultDiagnostics = {
  finishReason?: string;
  rawFinishReason?: string;
  warnings?: unknown[];
};

export function usageFromResult(
  usage: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
    cachedInputTokens?: number;
    inputTokenDetails?: {
      cacheReadTokens?: number;
      cacheWriteTokens?: number;
    };
  } | undefined,
  durationMs: number,
  providerMetadata?: unknown,
  diagnostics?: LlmGenerationResultDiagnostics,
): TranslationTelemetry {
  const openRouterUsage = getOpenRouterUsage(providerMetadata);
  const promptTokensDetails = recordValue(openRouterUsage?.promptTokensDetails);
  const snakePromptTokensDetails = recordValue(openRouterUsage?.prompt_tokens_details);
  const completionTokensDetails = recordValue(openRouterUsage?.completionTokensDetails);
  const snakeCompletionTokensDetails = recordValue(openRouterUsage?.completion_tokens_details);
  const providerCostUsd = numberValue(openRouterUsage?.cost);
  const providerUpstreamCostUsd = numberValue(recordValue(openRouterUsage?.costDetails)?.upstreamInferenceCost)
    ?? numberValue(recordValue(openRouterUsage?.cost_details)?.upstream_inference_cost);
  const inputTokens = usage?.inputTokens
    ?? numberValue(openRouterUsage?.promptTokens)
    ?? numberValue(openRouterUsage?.prompt_tokens)
    ?? 0;
  const outputTokens = usage?.outputTokens
    ?? numberValue(openRouterUsage?.completionTokens)
    ?? numberValue(openRouterUsage?.completion_tokens)
    ?? 0;
  const cacheReadTokens = usage?.inputTokenDetails?.cacheReadTokens
    ?? usage?.cachedInputTokens
    ?? numberValue(promptTokensDetails?.cachedTokens)
    ?? numberValue(snakePromptTokensDetails?.cached_tokens)
    ?? 0;
  const cacheWriteTokens = usage?.inputTokenDetails?.cacheWriteTokens
    ?? numberValue(promptTokensDetails?.cacheWriteTokens)
    ?? numberValue(snakePromptTokensDetails?.cache_write_tokens)
    ?? 0;
  const reasoningTokens = numberValue(completionTokensDetails?.reasoningTokens)
    ?? numberValue(snakeCompletionTokensDetails?.reasoning_tokens)
    ?? 0;

  return {
    inputTokens,
    outputTokens,
    totalTokens: usage?.totalTokens
      ?? numberValue(openRouterUsage?.totalTokens)
      ?? numberValue(openRouterUsage?.total_tokens)
      ?? inputTokens + outputTokens,
    reasoningTokens,
    cacheReadTokens,
    cacheWriteTokens,
    durationMs,
    finishReason: diagnostics?.finishReason,
    rawFinishReason: diagnostics?.rawFinishReason,
    warnings: diagnostics?.warnings,
    providerCostUsd,
    providerUpstreamCostUsd,
    pricingSource: providerCostUsd == null ? undefined : "openrouter-usage-accounting",
    openRouterUsage,
  };
}

export function diagnosticsFromResult(result: {
  finishReason?: string;
  rawFinishReason?: string;
  warnings?: unknown[] | undefined;
}): LlmGenerationResultDiagnostics {
  return {
    finishReason: result.finishReason,
    rawFinishReason: result.rawFinishReason,
    warnings: result.warnings,
  };
}

export function assertGenerationNotTokenLimited(label: string, result: {
  finishReason?: string;
  rawFinishReason?: string;
}, maxOutputTokens: number): void {
  if (result.finishReason !== "length") return;
  throw new Error(
    [
      `${label} stopped because it hit maxOutputTokens=${maxOutputTokens}.`,
      "The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate.",
      result.rawFinishReason == null ? undefined : `Provider finish reason: ${result.rawFinishReason}`,
    ].filter(Boolean).join(" "),
  );
}

export const OPENROUTER_USAGE_ACCOUNTING = {
  usage: {
    include: true,
  },
} as const;

export function cachedText(text: string) {
  return {
    type: "text" as const,
    text,
    providerOptions: {
      openrouter: {
        cacheControl: { type: "ephemeral" },
      },
    },
  };
}

export function plainText(text: string) {
  return {
    type: "text" as const,
    text,
  };
}

// Keep cached material in its own first user message so OpenRouter sticky
// routing and provider prompt caching see a stable prefix before dynamic tails.
export function cachedUserMessage(text: string) {
  return {
    role: "user" as const,
    content: [cachedText(text)],
  };
}

export function plainUserMessage(text: string) {
  return {
    role: "user" as const,
    content: [plainText(text)],
  };
}

function getOpenRouterUsage(providerMetadata: unknown) {
  const metadata = recordValue(providerMetadata);
  return recordValue(recordValue(metadata?.openrouter)?.usage);
}

function recordValue(value: unknown): Record<string, unknown> | undefined {
  return value != null && typeof value === "object" ? value as Record<string, unknown> : undefined;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
