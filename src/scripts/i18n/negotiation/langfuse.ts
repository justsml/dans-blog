import { accountUsage, numberOrUnknown as num } from "../cost-accounting.ts";
import { startActiveObservation, startObservation } from "@langfuse/tracing";
import { langfuseEnabled, flushLangfuse } from "../langfuse.ts";
import { readFileSync, existsSync, appendFileSync } from "node:fs";

/** Preserve provider-reported counters; never invent billing from a CLI subscription. */
export function nativeUsage(
  backend: string,
  stdout: string,
  model = "unknown",
) {
  const events = stdout
    .trim()
    .split("\n")
    .flatMap((line) => {
      try {
        return [JSON.parse(line)];
      } catch {
        return [];
      }
    });
  // Claude print output is one complete envelope; tolerate pretty-printed receipts.
  if (backend === "claude") {
    try {
      events.splice(0, events.length, JSON.parse(stdout));
    } catch {}
  }
  let input: number | undefined,
    output: number | undefined,
    cached: number | undefined,
    cacheWrite: number | undefined,
    reasoning: number | undefined,
    cost: number | undefined;
  const add = (a: number | undefined, b: unknown) =>
    num(b) === undefined ? a : (a ?? 0) + num(b)!;
  let partialCost = false;
  for (const e of events) {
    const u =
      backend === "opencode" && e.type === "step_finish"
        ? e.part?.tokens
        : e.usage;
    if (!u) continue;
    if (backend === "claude") {
      input = add(
        input,
        num(u.input_tokens) === undefined
          ? undefined
          : u.input_tokens +
              (num(u.cache_read_input_tokens) ?? 0) +
              (num(u.cache_creation_input_tokens) ?? 0),
      );
      cached = add(cached, u.cache_read_input_tokens);
      cacheWrite = add(cacheWrite, u.cache_creation_input_tokens);
    } else if (backend === "opencode") {
      input = add(
        input,
        num(u.input) === undefined
          ? undefined
          : u.input + (num(u.cache?.read) ?? 0) + (num(u.cache?.write) ?? 0),
      );
      cached = add(cached, u.cache?.read);
      cacheWrite = add(cacheWrite, u.cache?.write);
      reasoning = add(reasoning, u.reasoning);
    } else {
      input = add(input, u.input_tokens);
      cached = add(cached, u.cached_input_tokens);
      cacheWrite = add(cacheWrite, u.cache_write_input_tokens);
      reasoning = add(reasoning, u.reasoning_output_tokens);
    }
    output = add(
      output,
      backend === "opencode"
        ? num(u.output) === undefined
          ? undefined
          : u.output + (num(u.reasoning) ?? 0)
        : u.output_tokens,
    );
    const reported = backend === "opencode" ? e.part?.cost : e.total_cost_usd;
    if (num(reported) === undefined) partialCost = true;
    cost = add(cost, reported);
  }
  return accountUsage(
    model,
    { input, output, cached, cacheWrite, reasoning },
    partialCost ? undefined : cost,
    "cli-reported-estimate",
  );
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
          span.update(
            nativeUsage(
              input.backend,
              readFileSync(path, "utf8"),
              input.actor.model,
            ),
          );
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
