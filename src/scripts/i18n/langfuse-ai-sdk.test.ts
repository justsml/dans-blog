import { test, expect } from "bun:test";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { generateText, streamText } from "ai";
import { MockLanguageModelV4 } from "ai/test";
import { CostAwareLangfuseIntegration } from "./langfuse-ai-sdk.ts";
import { sdkAccounting } from "./cost-accounting.ts";

test("official constructor traces generate and streaming cost exactly once per model response", async () => {
  const exporter = new InMemorySpanExporter();
  const sdk = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(exporter)],
  });
  sdk.register();
  const integration = new CostAwareLangfuseIntegration({
    tracer: sdk.getTracer("cost-test"),
  });
  const usage = {
    inputTokens: { total: 100, noCache: 60, cacheRead: 40, cacheWrite: 0 },
    outputTokens: { total: 20, text: 15, reasoning: 5 },
  };
  const providerMetadata = { openrouter: { usage: { cost: 0.012 } } };
  const model = new MockLanguageModelV4({
    modelId: "unknown-new-model",
    provider: "openrouter",
    doGenerate: {
      content: [{ type: "text", text: "OK" }],
      finishReason: { unified: "stop", raw: "stop" },
      usage,
      providerMetadata,
      warnings: [],
    },
    doStream: {
      stream: new ReadableStream({
        start(c) {
          for (const x of [
            { type: "text-start", id: "t" },
            { type: "text-delta", id: "t", delta: "OK" },
            { type: "text-end", id: "t" },
            {
              type: "finish",
              finishReason: { unified: "stop", raw: "stop" },
              usage,
              providerMetadata,
            },
          ] as const)
            c.enqueue(x);
          c.close();
        },
      }),
    },
  });
  await generateText({
    model,
    prompt: "Test",
    telemetry: { integrations: [integration] },
  });
  const result = streamText({
    model,
    prompt: "Test streaming",
    telemetry: { integrations: [integration] },
  });
  await result.consumeStream();
  await sdk.forceFlush();
  const spans = exporter.getFinishedSpans();

  const billed = spans.filter(
    (s) => s.attributes["langfuse.observation.cost_details"],
  );
  expect(billed).toHaveLength(2);
  for (const s of billed) {
    expect(
      JSON.parse(String(s.attributes["langfuse.observation.cost_details"])),
    ).toEqual({ total: 0.012 });
    expect(
      JSON.parse(String(s.attributes["langfuse.observation.usage_details"])),
    ).toEqual({
      input: 60,
      input_cached: 40,
      input_cache_write: 0,
      output: 15,
      output_reasoning: 5,
    });
  }
  const broken = new MockLanguageModelV4({
    doGenerate: async () => {
      throw Error("deliberate offline failure");
    },
  });
  await expect(
    generateText({
      model: broken,
      prompt: "fail",
      maxRetries: 0,
      telemetry: { integrations: [integration] },
    }),
  ).rejects.toThrow("deliberate offline failure");
  await sdk.forceFlush();
  const unknown = exporter
    .getFinishedSpans()
    .filter(
      (span) =>
        span.attributes["langfuse.observation.metadata.costKnown"] === false,
    );
  expect(unknown.length).toBeGreaterThan(0);
  expect(
    unknown.every(
      (span) =>
        span.attributes["langfuse.observation.cost_details"] === undefined,
    ),
  ).toBe(true);
  await sdk.shutdown();
});
test("zero provider cost overrides estimates; unknown usage stays unknown", () => {
  expect(
    sdkAccounting({
      modelId: "openai/gpt-6-sol",
      usage: { inputTokens: 100, outputTokens: 10 },
      providerMetadata: { openrouter: { usage: { cost: 0 } } },
    }).costDetails,
  ).toEqual({ total: 0 });
  expect(
    sdkAccounting({ modelId: "unknown", usage: {} }).costDetails,
  ).toBeUndefined();
});

test("long-context estimates apply the verified pricing tier", () => {
  const result = sdkAccounting({
    modelId: "gpt-6-sol",
    provider: "openai.chat",
    usage: { inputTokens: 300000, outputTokens: 100 },
  });
  expect(result.costDetails?.total).toBeCloseTo(1.2015, 6);
  expect(result.metadata.pricingSource).toContain("272k-tier");
});
