import { describe, expect, test } from "bun:test";
import { isTrackableModelId, modelIdsMatch, normalizeModelId } from "./model-id.ts";

describe("normalizeModelId", () => {
  test("canonicalizes OpenRouter shorthand model IDs", () => {
    expect(normalizeModelId("qwen/qwen3.6-plus")).toBe("openrouter/qwen/qwen3.6-plus");
    expect(normalizeModelId("deepseek/deepseek-v4-flash")).toBe("openrouter/deepseek/deepseek-v4-flash");
    expect(normalizeModelId("openai/gpt-oss-120b:nitro")).toBe("openrouter/openai/gpt-oss-120b:nitro");
  });

  test("keeps direct OpenAI model IDs distinct from OpenRouter IDs", () => {
    expect(normalizeModelId("openai/gpt-5.4-nano")).toBe("openai/gpt-5.4-nano");
  });

  test("normalizes llm connection strings to provider/model IDs", () => {
    expect(normalizeModelId("llm://openrouter/openai/gpt-oss-120b:nitro?max_tokens=8000")).toBe(
      "openrouter/openai/gpt-oss-120b:nitro",
    );
  });
});

describe("modelIdsMatch", () => {
  test("matches legacy shorthand and canonical OpenRouter IDs", () => {
    expect(modelIdsMatch("deepseek/deepseek-v4-flash", "openrouter/deepseek/deepseek-v4-flash")).toBe(true);
  });
});

describe("isTrackableModelId", () => {
  test("rejects report and accounting filenames", () => {
    expect(isTrackableModelId("candidates.jsonl")).toBe(false);
    expect(isTrackableModelId("candidate/run/events.jsonl")).toBe(false);
    expect(isTrackableModelId("judge.json")).toBe(false);
    expect(isTrackableModelId("final/polish")).toBe(false);
  });

  test("accepts canonical and shorthand model IDs", () => {
    expect(isTrackableModelId("openrouter/qwen/qwen3-32b:nitro")).toBe(true);
    expect(isTrackableModelId("qwen/qwen3.6-plus")).toBe(true);
  });
});
