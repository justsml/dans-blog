export interface TokenCostEstimate {
  inputUsd: number;
  outputUsd: number;
  totalUsd: number;
  pricingSource: string;
  providerCostUsd?: number;
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
  "qwen/qwen3.6-flash": {
    inputPerMillionUsd: 0.25,
    outputPerMillionUsd: 1.5,
    source: "local-openrouter-estimate",
  },
  "qwen/qwen3.6-35b-a3b": {
    inputPerMillionUsd: 0.15,
    cachedInputPerMillionUsd: 0.05,
    outputPerMillionUsd: 1,
    source: "local-openrouter-estimate",
  },
  "qwen/qwen3.5-9b": {
    inputPerMillionUsd: 0.04,
    outputPerMillionUsd: 0.15,
    source: "local-openrouter-estimate",
  },
  "google/gemma-4-26b-a4b-it": {
    inputPerMillionUsd: 0,
    outputPerMillionUsd: 0,
    source: "local-openrouter-estimate",
  },
  "google/gemma-4-31b-it": {
    inputPerMillionUsd: 0,
    outputPerMillionUsd: 0,
    source: "local-openrouter-estimate",
  },
  "deepseek/deepseek-v4-pro": {
    inputPerMillionUsd: 0.2,
    outputPerMillionUsd: 0.8,
    source: "local-openrouter-estimate",
  },
  "deepseek/deepseek-v4-flash": {
    inputPerMillionUsd: 0.14,
    cachedInputPerMillionUsd: 0.0028,
    outputPerMillionUsd: 0.28,
    source: "local-openrouter-estimate",
  },
  "deepseek/deepseek-v3.2": {
    inputPerMillionUsd: 0.252,
    cachedInputPerMillionUsd: 0.0252,
    outputPerMillionUsd: 0.378,
    source: "local-openrouter-estimate",
  },
  "google/gemini-3-flash-preview": {
    inputPerMillionUsd: 0.5,
    cachedInputPerMillionUsd: 0.05,
    outputPerMillionUsd: 3,
    source: "local-openrouter-estimate",
  },
  "z-ai/glm-4.7-flash": {
    inputPerMillionUsd: 0.06,
    cachedInputPerMillionUsd: 0.01,
    outputPerMillionUsd: 0.4,
    source: "local-openrouter-estimate",
  },
  "z-ai/glm-5-turbo": {
    inputPerMillionUsd: 1.2,
    cachedInputPerMillionUsd: 0.24,
    outputPerMillionUsd: 4,
    source: "local-openrouter-estimate",
  },
  "minimax/minimax-m2.5": {
    inputPerMillionUsd: 0.15,
    outputPerMillionUsd: 1.15,
    source: "local-openrouter-estimate",
  },
  "minimax/minimax-m2.7": {
    inputPerMillionUsd: 0.299,
    outputPerMillionUsd: 1.2,
    source: "local-openrouter-estimate",
  },
  "moonshotai/kimi-k2.6": {
    inputPerMillionUsd: 0.75,
    cachedInputPerMillionUsd: 0.15,
    outputPerMillionUsd: 3.5,
    source: "local-openrouter-estimate",
  },
  "openai/gpt-5-mini": {
    inputPerMillionUsd: 0.25,
    outputPerMillionUsd: 2,
    source: "local-openrouter-estimate",
  },
  "openai/gpt-5.4-mini": {
    inputPerMillionUsd: 0.75,
    outputPerMillionUsd: 4.5,
    source: "local-openrouter-estimate",
  },
  "openai/gpt-5.4": {
    inputPerMillionUsd: 2,
    outputPerMillionUsd: 10,
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
  options: { providerCostUsd?: number } = {},
): TokenCostEstimate {
  const pricing = MODEL_PRICING[normalizeOpenRouterModelId(modelId)];
  const providerCostUsd = normalizeProviderCost(options.providerCostUsd);
  const providerEstimate = providerCostUsd == null
    ? undefined
    : {
      totalUsd: providerCostUsd,
      pricingSource: "openrouter-usage-accounting",
      providerCostUsd,
    };

  if (!pricing) {
    if (providerEstimate != null) {
      return {
        inputUsd: 0,
        outputUsd: providerEstimate.totalUsd,
        ...providerEstimate,
      };
    }

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
  const localTotalUsd = inputUsd + outputUsd;

  if (providerEstimate != null) {
    const inputRatio = localTotalUsd > 0 ? inputUsd / localTotalUsd : 0;
    const providerInputUsd = providerEstimate.totalUsd * inputRatio;
    return {
      inputUsd: providerInputUsd,
      outputUsd: providerEstimate.totalUsd - providerInputUsd,
      ...providerEstimate,
    };
  }

  return {
    inputUsd,
    outputUsd,
    totalUsd: inputUsd + outputUsd,
    pricingSource: pricing.source,
  };
}

function normalizeProviderCost(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
}
