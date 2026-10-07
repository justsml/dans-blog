import { registerTelemetry } from "ai";
import { CostAwareLangfuseIntegration } from "./langfuse-ai-sdk.ts";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";

const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
const secretKey = process.env.LANGFUSE_SECRET_KEY;
const baseUrl = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;

// `bun test` auto-loads .env, so real credentials would otherwise export test spans to Langfuse.
// Under test, only a local stub (127.0.0.1/localhost) may receive exports.
const isTestRun = process.env.NODE_ENV === "test";
const targetsLocalStub = /^https?:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(baseUrl ?? "");

export let langfuseEnabled =
  publicKey != null &&
  publicKey !== "" &&
  secretKey != null &&
  secretKey !== "" &&
  (!isTestRun || targetsLocalStub);

/**
 * Test hook: toggles the gate that withLangfuseTelemetry and the score helpers read, without starting
 * an exporter. ES module importers see the live value, so test results no longer depend on which
 * file imported this module first.
 */
export function setLangfuseEnabled(enabled: boolean) {
  langfuseEnabled = enabled;
}

let spanProcessor: LangfuseSpanProcessor | undefined;
if (langfuseEnabled) {
  spanProcessor = new LangfuseSpanProcessor({
    publicKey,
    secretKey,
    baseUrl,
    // Select observations-first ingestion explicitly, including self-hosted v4.
    additionalHeaders: { "x-langfuse-ingestion-version": "4" },
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
// CLI runs flush after every call; an unreachable host should warn once, not per call.
let flushWarned = false;
function warnFlushOnce(message: string) {
  if (flushWarned) return;
  flushWarned = true;
  console.warn(`${message} (further Langfuse flush warnings suppressed)`);
}

/**
 * Flush short-lived CLI observations before the process exits. Bounded so an
 * unreachable Langfuse host can't hang the CLI on its way out.
 */
export async function flushLangfuse() {
  if (spanProcessor == null) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<void>((resolve) => {
    timer = setTimeout(() => {
      warnFlushOnce(`Langfuse flush timed out after ${FLUSH_TIMEOUT_MS}ms; some traces may be missing.`);
      resolve();
    }, FLUSH_TIMEOUT_MS);
  });
  try {
    await Promise.race([spanProcessor.forceFlush(), timeout]);
  } catch (error) {
    warnFlushOnce(`Langfuse flush failed: ${error instanceof Error ? error.message : error}`);
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
