import { registerTelemetry } from "ai";
import { CostAwareLangfuseIntegration } from "./langfuse-ai-sdk.ts";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";

const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
const secretKey = process.env.LANGFUSE_SECRET_KEY;
const baseUrl = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;

export const langfuseEnabled =
  publicKey != null &&
  publicKey !== "" &&
  secretKey != null &&
  secretKey !== "";

let spanProcessor: LangfuseSpanProcessor | undefined;
if (langfuseEnabled) {
  spanProcessor = new LangfuseSpanProcessor({
    publicKey,
    secretKey,
    baseUrl,
  });
  const sdk = new NodeSDK({ spanProcessors: [spanProcessor] });
  sdk.start();
  registerTelemetry(new CostAwareLangfuseIntegration());
  process.once("beforeExit", () => {
    void flushLangfuse();
  });
}

type TelemetryCallOptions = {
  telemetry?: { includeRuntimeContext?: object };
  runtimeContext?: unknown;
};

/**
 * Enables AI SDK 7 telemetry for the registered Langfuse integration. Metadata
 * rides on `runtimeContext`: the integration exports only the context keys
 * listed in `telemetry.includeRuntimeContext`, and AI SDK 7 dropped
 * `telemetry.metadata`. No-op when Langfuse credentials aren't configured.
 */
export function withLangfuseTelemetry<T extends TelemetryCallOptions>(
  options: T,
  metadata?: Record<string, unknown>,
): T {
  if (!langfuseEnabled) return options;

  const telemetry = { ...options.telemetry, isEnabled: true };
  if (metadata == null || Object.keys(metadata).length === 0)
    return { ...options, telemetry };

  return {
    ...options,
    runtimeContext: { ...(options.runtimeContext as object), ...metadata },
    telemetry: {
      ...telemetry,
      includeRuntimeContext: {
        ...telemetry.includeRuntimeContext,
        ...Object.fromEntries(Object.keys(metadata).map((key) => [key, true])),
      },
    },
  };
}

const FLUSH_TIMEOUT_MS = 5_000;

/**
 * Flush short-lived CLI observations before the process exits. Bounded so an
 * unreachable Langfuse host can't hang the CLI on its way out.
 */
export async function flushLangfuse() {
  if (spanProcessor == null) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<void>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`Langfuse flush timed out after ${FLUSH_TIMEOUT_MS}ms; some traces may be missing.`);
      resolve();
    }, FLUSH_TIMEOUT_MS);
  });
  try {
    await Promise.race([spanProcessor.forceFlush(), timeout]);
  } catch (error) {
    console.warn("Langfuse flush failed:", error instanceof Error ? error.message : error);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * `process.exit()` skips `beforeExit`, so any exit after LLM work must flush
 * first or the batched spans are dropped.
 */
export async function exitAfterFlush(code: number): Promise<never> {
  await flushLangfuse();
  process.exit(code);
}
