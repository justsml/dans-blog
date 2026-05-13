export interface TranslationTelemetry {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
  providerCostUsd?: number;
  providerUpstreamCostUsd?: number;
  pricingSource?: string;
}

export function usageFromResult(
  usage: {
    inputTokens?: number;
    outputTokens?: number;
    cachedInputTokens?: number;
    inputTokenDetails?: {
      cacheReadTokens?: number;
      cacheWriteTokens?: number;
    };
  } | undefined,
  durationMs: number,
  providerMetadata?: unknown,
): TranslationTelemetry {
  const openRouterUsage = getOpenRouterUsage(providerMetadata);
  const promptTokensDetails = recordValue(openRouterUsage?.promptTokensDetails);
  const providerCostUsd = numberValue(openRouterUsage?.cost);
  const providerUpstreamCostUsd = numberValue(recordValue(openRouterUsage?.costDetails)?.upstreamInferenceCost);

  return {
    inputTokens: usage?.inputTokens ?? numberValue(openRouterUsage?.promptTokens) ?? 0,
    outputTokens: usage?.outputTokens ?? numberValue(openRouterUsage?.completionTokens) ?? 0,
    cacheReadTokens: usage?.inputTokenDetails?.cacheReadTokens
      ?? usage?.cachedInputTokens
      ?? numberValue(promptTokensDetails?.cachedTokens)
      ?? 0,
    cacheWriteTokens: usage?.inputTokenDetails?.cacheWriteTokens ?? 0,
    durationMs,
    providerCostUsd,
    providerUpstreamCostUsd,
    pricingSource: providerCostUsd == null ? undefined : "openrouter-usage-accounting",
  };
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
