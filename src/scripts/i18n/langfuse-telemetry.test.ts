import { test, expect } from "bun:test";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { generateText } from "ai";
import { MockLanguageModelV4 } from "ai/test";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { setLangfuseTracerProvider } from "@langfuse/tracing";
import { CostAwareLangfuseIntegration } from "./langfuse-ai-sdk.ts";

const mockModel = () =>
  new MockLanguageModelV4({
    doGenerate: {
      content: [{ type: "text", text: "OK" }],
      finishReason: { unified: "stop", raw: "stop" },
      usage: {
        inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
        outputTokens: { total: 1, text: 1, reasoning: 0 },
      },
      warnings: [],
    },
  });

// langfuse.ts reads credentials at import time. Per-call `integrations` below
// replace the global Langfuse one, so nothing is ever exported to this host.
process.env.LANGFUSE_PUBLIC_KEY = "pk-test";
process.env.LANGFUSE_SECRET_KEY = "sk-test";
process.env.LANGFUSE_BASE_URL = "http://127.0.0.1:9";
const { withLangfuseTelemetry } = await import("./langfuse.ts");

test("metadata reaches the Langfuse observation through runtimeContext", async () => {
  const exporter = new InMemorySpanExporter();
  const provider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(exporter)],
  });
  const integration = new CostAwareLangfuseIntegration({
    tracer: provider.getTracer("telemetry-test"),
  });
  const model = mockModel();

  await generateText(
    withLangfuseTelemetry(
      {
        model,
        prompt: "hi",
        runtimeContext: { existing: "kept" },
        telemetry: {
          integrations: integration,
          includeRuntimeContext: { existing: true },
        },
      },
      { slug: "trust-but-throttle", locale: "ja" },
    ),
  );
  await provider.forceFlush();

  const attributes = Object.assign(
    {},
    ...exporter.getFinishedSpans().map((span) => span.attributes),
  );
  expect(attributes["langfuse.observation.metadata.slug"]).toBe(
    "trust-but-throttle",
  );
  expect(attributes["langfuse.observation.metadata.locale"]).toBe("ja");
  expect(attributes["langfuse.observation.metadata.existing"]).toBe("kept");
  await provider.shutdown();
});

test("without metadata only telemetry is enabled", () => {
  const options = withLangfuseTelemetry({ prompt: "hi", telemetry: {} });
  expect(options).toEqual({ prompt: "hi", telemetry: { isEnabled: true } });
  expect("experimental_telemetry" in options).toBe(false);
});

test("an eval parents its generations, stamps its metadata on them, and posts scores", async () => {
  const exporter = new InMemorySpanExporter();
  const provider = new NodeTracerProvider({
    spanProcessors: [
      new LangfuseSpanProcessor({
        exporter,
        exportMode: "immediate",
        publicKey: "pk-test",
        secretKey: "sk-test",
      }),
    ],
  });
  setLangfuseTracerProvider(provider);
  const { withLangfuseEval } = await import("./langfuse-scores.ts");
  const ingested: any[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string, init: RequestInit) => {
    ingested.push(...JSON.parse(String(init.body)).batch);
    return Response.json({ successes: [], errors: [] });
  }) as typeof fetch;

  try {
    const result = await withLangfuseEval(
      "eval:trust-but-throttle/ja",
      { slug: "trust-but-throttle", locale: "ja", profiles: { big: true } },
      { id: "case-1" },
      async () => {
        await generateText({
          model: mockModel(),
          prompt: "hi",
          telemetry: {
            integrations: new CostAwareLangfuseIntegration({
              tracer: provider.getTracer("ai"),
            }),
          },
        });
        return { scores: [{ name: "mdx", score: 1, passed: true }] };
      },
    );
    expect(result.scores).toHaveLength(1);
  } finally {
    globalThis.fetch = realFetch;
    setLangfuseTracerProvider(null);
  }
  await provider.forceFlush();

  const spans = exporter.getFinishedSpans();
  const evalSpan = spans.find((s) => s.name === "eval:trust-but-throttle/ja");
  expect(evalSpan).toBeDefined();
  const children = spans.filter(
    (s) => s.parentSpanContext?.spanId === evalSpan!.spanContext().spanId,
  );
  expect(children.length).toBeGreaterThan(0);
  for (const child of children) {
    expect(child.spanContext().traceId).toBe(evalSpan!.spanContext().traceId);
    expect(child.attributes["langfuse.trace.name"]).toBe(
      "eval:trust-but-throttle/ja",
    );
    expect(child.attributes["langfuse.trace.metadata.slug"]).toBe(
      "trust-but-throttle",
    );
    expect(child.attributes["langfuse.trace.metadata.profiles"]).toBeUndefined();
  }

  expect(ingested).toHaveLength(1);
  expect(ingested[0].body).toMatchObject({
    traceId: evalSpan!.spanContext().traceId,
    observationId: evalSpan!.spanContext().spanId,
    name: "eval.mdx",
    value: 1,
  });
  await provider.shutdown();
});
