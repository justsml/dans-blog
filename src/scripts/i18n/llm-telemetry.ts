export interface TranslationTelemetry {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  durationMs: number;
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
): TranslationTelemetry {
  return {
    inputTokens: usage?.inputTokens ?? 0,
    outputTokens: usage?.outputTokens ?? 0,
    cacheReadTokens: usage?.inputTokenDetails?.cacheReadTokens ?? usage?.cachedInputTokens ?? 0,
    cacheWriteTokens: usage?.inputTokenDetails?.cacheWriteTokens ?? 0,
    durationMs,
  };
}

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
