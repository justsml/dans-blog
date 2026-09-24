import {
  startActiveObservation,
  startObservation,
  type LangfuseGenerationAttributes,
} from "@langfuse/tracing";
import { langfuseEnabled, flushLangfuse } from "../langfuse.ts";
import { readFileSync, existsSync, appendFileSync } from "node:fs";

/** Preserve provider-reported counters; never invent billing from a CLI subscription. */
export function nativeUsage(
  backend: string,
  stdout: string,
): Pick<LangfuseGenerationAttributes, "usageDetails" | "costDetails"> {
  try {
    const events =
      backend === "claude"
        ? [JSON.parse(stdout)]
        : stdout
            .trim()
            .split("\n")
            .filter(Boolean)
            .map((line) => JSON.parse(line));
    const final = events.findLast((e) => e.usage);
    if (!final) return {};
    const usage = final.usage,
      details: Record<string, number> = {};
    for (const [key, value] of Object.entries(usage))
      if (typeof value === "number" && Number.isFinite(value))
        details[key] = value;
    return {
      usageDetails: details,
      ...(typeof final.total_cost_usd === "number"
        ? { costDetails: { total: final.total_cost_usd } }
        : {}),
    };
  } catch {
    return {};
  }
}
export async function traceCli<T>(
  input: {
    backend: string;
    actor: { model: string; effort: string };
    prompt: string;
    schema: unknown;
    receiptPrefix: string;
  },
  fn: () => Promise<T>,
): Promise<T> {
  if (!langfuseEnabled) return fn();
  return startActiveObservation(
    "translation-cli",
    async (span) => {
      span.update({
        model: input.actor.model,
        input: { prompt: input.prompt, schema: input.schema },
        modelParameters: {
          reasoning_effort: input.actor.effort,
          requested_max_output_tokens: 24000,
        },
        metadata: {
          backend: input.backend,
          receiptPrefix: input.receiptPrefix,
          costBasis: "provider-reported CLI estimate when available",
        },
      });
      appendFileSync(
        input.receiptPrefix + "-langfuse.jsonl",
        JSON.stringify({ traceId: span.traceId, observationId: span.id }) +
          "\n",
      );
      try {
        const output = await fn();
        span.update({ output });
        return output;
      } catch (error) {
        span.update({ level: "ERROR", statusMessage: String(error) });
        throw error;
      } finally {
        const path = input.receiptPrefix + "-cli-stdout.txt";
        if (existsSync(path))
          span.update(nativeUsage(input.backend, readFileSync(path, "utf8")));
        span.end();
        await flushLangfuse();
      }
    },
    { asType: "generation", endOnExit: false },
  );
}
export async function traceNegotiation<T>(
  input: unknown,
  onTrace: (ids: { traceId: string; observationId: string }) => void,
  fn: () => Promise<T>,
): Promise<T> {
  if (!langfuseEnabled)
    throw Error(
      "Translation negotiation requires LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY",
    );
  return startActiveObservation(
    "translation-negotiation",
    async (span) => {
      span.update({ input });
      onTrace({ traceId: span.traceId, observationId: span.id });
      try {
        const output = await fn();
        span.update({ output });
        return output;
      } catch (error) {
        span.update({ level: "ERROR", statusMessage: String(error) });
        throw error;
      } finally {
        span.end();
        await flushLangfuse();
      }
    },
    { asType: "agent", endOnExit: false },
  );
}
export function traceNegotiationEvent(event: {
  type: string;
  [key: string]: unknown;
}) {
  if (langfuseEnabled)
    startObservation(event.type, { output: event }, { asType: "event" }).end();
}
