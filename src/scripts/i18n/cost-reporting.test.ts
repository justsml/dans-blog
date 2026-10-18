import { describe, expect, test } from "bun:test";
import { sdkAccounting } from "./cost-accounting.ts";
import { effectiveOpenRouterCost, usageFromResult } from "./llm-telemetry.ts";
import { estimateTokenCost } from "./translation-costs.ts";

describe("BYOK cost resolution", () => {
  test("BYOK adds the upstream charge to OpenRouter's own fee", () => {
    expect(effectiveOpenRouterCost({ cost: 0, upstreamCost: 0.000484, isByok: true })).toBeCloseTo(0.000484, 9);
    expect(effectiveOpenRouterCost({ cost: 0.0001, upstreamCost: 0.0005, isByok: true })).toBeCloseTo(0.0006, 9);
  });
  test("non-BYOK cost already includes upstream", () => {
    expect(effectiveOpenRouterCost({ cost: 0.0000344, upstreamCost: 0.0000344, isByok: false })).toBe(0.0000344);
  });
  test("usageFromResult reads usage.raw for a BYOK call", () => {
    const t = usageFromResult(
      {
        inputTokens: 12,
        outputTokens: 46,
        outputTokenDetails: { reasoningTokens: 33 },
        raw: { cost: 0, cost_details: { upstream_inference_cost: 0.000484 }, is_byok: true },
      },
      10,
    );
    expect(t.providerCostUsd).toBeCloseTo(0.000484, 9);
    expect(t.reasoningTokens).toBe(33);
  });
  test("sdkAccounting reports BYOK cost to Langfuse instead of $0", () => {
    const a = sdkAccounting({
      modelId: "openai/gpt-6.1-sol",
      usage: { inputTokens: 12, outputTokens: 46, raw: { cost: 0, cost_details: { upstream_inference_cost: 0.000484 }, is_byok: true } },
    });
    expect(a.costDetails?.total).toBeCloseTo(0.000484, 9);
  });
  test("a zero cost on a non-BYOK route stays zero (free models)", () => {
    const a = sdkAccounting({
      modelId: "anthropic/claude-haiku-5.5",
      usage: { inputTokens: 1000, outputTokens: 1000, raw: { cost: 0, is_byok: false } },
    });
    expect(a.costDetails?.total).toBe(0);
  });
});

describe("price table", () => {
  test(":nitro routes price like the base model", () => {
    expect(estimateTokenCost("openrouter/minimax/minimax-m2.5:nitro", 1_000_000, 0).pricingSource).not.toBe("unknown");
  });
  test("all target models are priced", () => {
    for (const id of ["openai/gpt-6.1-sol", "anthropic/claude-haiku-5.5", "z-ai/glm-5.3-flash", "deepseek/deepseek-v4.1-flash", "google/gemini-3.5-flash-lite"])
      expect(estimateTokenCost(id, 1000, 1000).totalUsd).toBeGreaterThan(0);
  });
  test("provider-reported cost, even 0, beats the price table", () => {
    expect(estimateTokenCost("anthropic/claude-haiku-5.5", 1_000_000, 1_000_000, 0, { providerCostUsd: 0.42 }).totalUsd).toBe(0.42);
    expect(estimateTokenCost("anthropic/claude-haiku-5.5", 1_000_000, 1_000_000, 0, { providerCostUsd: 0 }).totalUsd).toBe(0);
    expect(estimateTokenCost("anthropic/claude-haiku-5.5", 1_000_000, 0).totalUsd).toBeGreaterThan(0);
  });
  test("cache writes are billed at the write rate and not twice", () => {
    const c = estimateTokenCost("anthropic/claude-haiku-5.5", 1_000_000, 0, 0, { cacheWriteTokens: 1_000_000 });
    expect(c.totalUsd).toBeCloseTo(0.125, 6);
  });
});

import { isHaikuModel } from "./model-policy.ts";
test("all Haiku models are allowed", () => {
  for (const m of ["openrouter/anthropic/claude-haiku-5.5", "openrouter/anthropic/claude-haiku-4.5", "openrouter/~anthropic/claude-haiku-latest"])
    expect(isHaikuModel(m)).toBe(true);
  expect(isHaikuModel("openrouter/anthropic/claude-opus-5.5")).toBe(false);
});
