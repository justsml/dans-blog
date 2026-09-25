import { test, expect } from "bun:test";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { generateText } from "ai";
import { MockLanguageModelV4 } from "ai/test";
import { CostAwareLangfuseIntegration } from "./langfuse-ai-sdk.ts";

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
  const model = new MockLanguageModelV4({
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
