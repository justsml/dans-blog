import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";

const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
const secretKey = process.env.LANGFUSE_SECRET_KEY;
const baseUrl = process.env.LANGFUSE_BASE_URL;

export const langfuseEnabled = publicKey != null && publicKey !== "" && secretKey != null && secretKey !== "";

if (langfuseEnabled) {
  const spanProcessor = new LangfuseSpanProcessor({
    publicKey,
    secretKey,
    baseUrl,
  });
  const sdk = new NodeSDK({ spanProcessors: [spanProcessor] });
  sdk.start();
}

/**
 * Merges `experimental_telemetry: { isEnabled: true }` into AI SDK call options so
 * generateText/streamText spans are exported to Langfuse via the OTel span processor
 * registered above. No-op when Langfuse credentials aren't configured.
 */
export function withLangfuseTelemetry<T extends { experimental_telemetry?: unknown }>(
  options: T,
  metadata?: Record<string, unknown>,
): T {
  if (!langfuseEnabled) return options;

  return {
    ...options,
    experimental_telemetry: {
      isEnabled: true,
      metadata,
    },
  };
}
