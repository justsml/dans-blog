export interface TokenCostEstimate {
  inputUsd: number;
  outputUsd: number;
  totalUsd: number;
  pricingSource: string;
}

interface ModelPricing {
  inputPerMillionUsd: number;
  cachedInputPerMillionUsd?: number;
  outputPerMillionUsd: number;
  source: string;
}

const MODEL_PRICING: Record<string, ModelPricing> = {
  "openai/gpt-oss-120b:nitro": {
    inputPerMillionUsd: 0.039,
    outputPerMillionUsd: 0.18,
    source: "local-openrouter-estimate",
  },
  "qwen/qwen3-32b:nitro": {
    inputPerMillionUsd: 0.08,
    outputPerMillionUsd: 0.24,
    source: "local-openrouter-estimate",
  },
  "qwen/qwen3.6-plus": {
    inputPerMillionUsd: 0.325,
    outputPerMillionUsd: 1.95,
    source: "local-openrouter-estimate",
  },
  "deepseek/deepseek-v4-flash": {
    inputPerMillionUsd: 0.14,
    cachedInputPerMillionUsd: 0.0028,
    outputPerMillionUsd: 0.28,
    source: "local-openrouter-estimate",
  },
};

export function normalizeOpenRouterModelId(modelId: string) {
  return modelId.replace(/^openrouter\//, "");
}

export function safeModelPathName(modelId: string) {
  return normalizeOpenRouterModelId(modelId).replace(/[^a-z0-9._-]+/gi, "-");
}

export function estimateTokenCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number,
  cacheReadTokens = 0,
): TokenCostEstimate {
  const pricing = MODEL_PRICING[normalizeOpenRouterModelId(modelId)];

  if (!pricing) {
    return {
      inputUsd: 0,
      outputUsd: 0,
      totalUsd: 0,
      pricingSource: "unknown",
    };
  }

  const nonCachedInputTokens = Math.max(inputTokens - cacheReadTokens, 0);
  const inputUsd =
    (nonCachedInputTokens / 1_000_000) * pricing.inputPerMillionUsd
    + (cacheReadTokens / 1_000_000) * (pricing.cachedInputPerMillionUsd ?? pricing.inputPerMillionUsd);
  const outputUsd = (outputTokens / 1_000_000) * pricing.outputPerMillionUsd;

  return {
    inputUsd,
    outputUsd,
    totalUsd: inputUsd + outputUsd,
    pricingSource: pricing.source,
  };
}
