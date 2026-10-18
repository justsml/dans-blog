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
  cacheWritePerMillionUsd?: number;
  outputPerMillionUsd: number;
  source: string;
}

const MODEL_PRICING: Record<string, ModelPricing> = {
  "openai/gpt-6.1-sol": {
    inputPerMillionUsd: 2,
    cachedInputPerMillionUsd: 0.1,
    cacheWritePerMillionUsd: 2.5,
    outputPerMillionUsd: 10,
    source: "openrouter-2026-10-16",
  },
  "openai/gpt-6-sol": {
    inputPerMillionUsd: 2,
    cachedInputPerMillionUsd: 0.2,
    outputPerMillionUsd: 10,
    source: "openrouter-2026-09-22",
  },
  "anthropic/claude-opus-5.5": {
    inputPerMillionUsd: 4,
    cachedInputPerMillionUsd: 0.2,
    outputPerMillionUsd: 20,
    source: "openrouter-2026-09-22",
  },
  "z-ai/glm-5.3-flashx": {
    inputPerMillionUsd: 0.37,
    cachedInputPerMillionUsd: 0.075,
    outputPerMillionUsd: 1.25,
    source: "openrouter-2026-09-22",
  },
  "deepseek/deepseek-v4.1-flash": {
    inputPerMillionUsd: 0.15,
    cachedInputPerMillionUsd: 0.003,
    outputPerMillionUsd: 0.6,
    source: "openrouter-2026-10-16",
  },
  "anthropic/claude-sonnet-5.5": {
    inputPerMillionUsd: 2,
    outputPerMillionUsd: 10,
    source: "openrouter-2026-10-16",
  },
  "anthropic/claude-haiku-5.5": {
    inputPerMillionUsd: 0.1,
    cachedInputPerMillionUsd: 0.01,
    cacheWritePerMillionUsd: 0.125,
    outputPerMillionUsd: 0.5,
    source: "openrouter-2026-10-16",
  },
  "openai/gpt-6-luna": {
    inputPerMillionUsd: 0.1,
    cachedInputPerMillionUsd: 0.01,
    outputPerMillionUsd: 0.5,
    source: "openrouter-2026-09-22",
  },
  "openai/gpt-5.6-luna": {
    inputPerMillionUsd: 0.2,
    cachedInputPerMillionUsd: 0.02,
    outputPerMillionUsd: 1.2,
    source: "openrouter-2026-09-22",
  },
  "openai/gpt-5.6-terra": {
    inputPerMillionUsd: 2,
    cachedInputPerMillionUsd: 0.2,
    outputPerMillionUsd: 12,
    source: "openrouter-2026-09-13",
  },
  "openai/gpt-5.6-sol": {
    inputPerMillionUsd: 2,
    cachedInputPerMillionUsd: 0.2,
    outputPerMillionUsd: 10,
    source: "openrouter-2026-09-13",
  },
  "openai/gpt-6-astra": {
    inputPerMillionUsd: 10,
    cachedInputPerMillionUsd: 1,
    outputPerMillionUsd: 50,
    source: "openrouter-2026-09-22",
  },
  "openai/gpt-oss-120b:nitro": {
    inputPerMillionUsd: 0.03,
    outputPerMillionUsd: 0.18,
    source: "openrouter-2026-09-13",
  },
  "qwen/qwen3-32b:nitro": {
    inputPerMillionUsd: 0.08,
    outputPerMillionUsd: 0.28,
    source: "openrouter-2026-09-13",
  },
  "qwen/qwen3.8-max": {
    inputPerMillionUsd: 2,
    cachedInputPerMillionUsd: 0.25,
    outputPerMillionUsd: 6,
    source: "openrouter-2026-09-13",
  },
  "qwen/qwen3.6-flash": {
    inputPerMillionUsd: 0.1875,
    outputPerMillionUsd: 1.125,
    source: "openrouter-2026-09-13",
  },
  "qwen/qwen3.6-35b-a3b": {
    inputPerMillionUsd: 0.1,
    cachedInputPerMillionUsd: 0.01,
    outputPerMillionUsd: 0.95,
    source: "openrouter-2026-09-13",
  },
  "qwen/qwen3.5-9b": {
    inputPerMillionUsd: 0.1,
    outputPerMillionUsd: 0.15,
    source: "openrouter-2026-09-13",
  },
  "google/gemma-4-26b-a4b-it": {
    inputPerMillionUsd: 0.07,
    outputPerMillionUsd: 0.34,
    source: "openrouter-2026-09-13",
  },
  "google/gemma-4-31b-it": {
    inputPerMillionUsd: 0.09,
    outputPerMillionUsd: 0.34,
    source: "openrouter-2026-09-13",
  },
  // Historical pricing retained to account for old runs; not active model choices.
  "deepseek/deepseek-v4-pro": {
    inputPerMillionUsd: 0.51,
    outputPerMillionUsd: 1.01,
    source: "openrouter-2026-09-13",
  },
  "deepseek/deepseek-v4-flash": {
    inputPerMillionUsd: 0.05,
    cachedInputPerMillionUsd: 0.009,
    outputPerMillionUsd: 0.09,
    source: "openrouter-2026-09-13",
  },
  "deepseek/deepseek-v3.2": {
    inputPerMillionUsd: 0.21,
    cachedInputPerMillionUsd: 0.021,
    outputPerMillionUsd: 0.31,
    source: "openrouter-2026-09-13",
  },
  "google/gemini-3.8-flash": {
    inputPerMillionUsd: 0.825,
    cachedInputPerMillionUsd: 0.0825,
    outputPerMillionUsd: 4.125,
    source: "openrouter-2026-10-16",
  },
  "google/gemini-3.5-flash-lite": {
    inputPerMillionUsd: 0.3,
    cachedInputPerMillionUsd: 0.03,
    outputPerMillionUsd: 2.5,
    source: "openrouter-2026-09-22",
  },
  "z-ai/glm-5.3-flash": {
    inputPerMillionUsd: 0.0126,
    cachedInputPerMillionUsd: 0.0125,
    outputPerMillionUsd: 0.8288,
    source: "openrouter-2026-10-16",
  },
  "minimax/minimax-m2.5": {
    inputPerMillionUsd: 0.27,
    cachedInputPerMillionUsd: 0.03,
    outputPerMillionUsd: 0.95,
    source: "openrouter-2026-09-13",
  },
  "minimax/minimax-m2.7": {
    inputPerMillionUsd: 0.24,
    outputPerMillionUsd: 0.96,
    source: "openrouter-2026-09-13",
  },
  "moonshotai/kimi-k2.6": {
    inputPerMillionUsd: 0.58,
    cachedInputPerMillionUsd: 0.12,
    outputPerMillionUsd: 2.44,
    source: "openrouter-2026-09-13",
  },
  "openai/gpt-5-mini": {
    inputPerMillionUsd: 0.25,
    outputPerMillionUsd: 2,
    source: "openrouter-2026-09-13",
  },
  "openai/gpt-5.4-mini": {
    inputPerMillionUsd: 0.75,
    outputPerMillionUsd: 4.5,
    source: "openrouter-2026-09-13",
  },
  "openai/gpt-5.4": {
    inputPerMillionUsd: 2.5,
    outputPerMillionUsd: 15,
    source: "openrouter-2026-09-13",
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
  options: { providerCostUsd?: number; cacheWriteTokens?: number } = {},
): TokenCostEstimate {
  const normalizedId = normalizeOpenRouterModelId(modelId);
  const pricingId = normalizedId.startsWith("gpt-") ? `openai/${normalizedId}` : normalizedId;
  // `:nitro`/`:floor`/`:free` select a provider route at the same list price;
  // `:batch` is half price, so it keeps its own (absent) entry rather than
  // silently pricing as the base model.
  const pricing = MODEL_PRICING[pricingId] ?? MODEL_PRICING[pricingId.replace(/:(nitro|floor|free|online)$/, "")];
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

  // inputTokens is the AI SDK total (it already includes cache reads and writes).
  const cacheWriteTokens = options.cacheWriteTokens ?? 0;
  const nonCachedInputTokens = Math.max(inputTokens - cacheReadTokens - cacheWriteTokens, 0);
  const inputUsd =
    (nonCachedInputTokens / 1_000_000) * pricing.inputPerMillionUsd
    + (cacheReadTokens / 1_000_000) * (pricing.cachedInputPerMillionUsd ?? pricing.inputPerMillionUsd)
    + (cacheWriteTokens / 1_000_000) * (pricing.cacheWritePerMillionUsd ?? pricing.inputPerMillionUsd);
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
  // Provider-reported cost always wins over the price table, including an
  // explicit 0 (free models). Callers pass undefined when no accounting was
  // returned (first-party OpenAI sends none), and only then do we price locally.
  // BYOK upstream charges are folded in upstream of here (effectiveOpenRouterCost).
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
}
