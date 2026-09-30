import * as ai from "ai";
import { withLangfuseTelemetry } from "./langfuse.ts";
import type { EvalScoreInput } from "./langfuse-score-projection.ts";
import { withLangfuseEval } from "./langfuse-scores.ts";

export const generateText: typeof ai.generateText = (options) =>
  ai.generateText(withLangfuseTelemetry(options));
export const streamText: typeof ai.streamText = (options) =>
  ai.streamText(withLangfuseTelemetry(options));

/**
 * Wraps fn() in a Langfuse observation when credentials are set. The result's
 * scores[] are attached so each eval case appears as a scored row, and the
 * eval's LLM calls nest under it.
 */
export function tracedEval<T extends { scores?: EvalScoreInput[] }>(
  name: string,
  metadata: Record<string, unknown>,
  evalFn: () => Promise<T>,
  options: {
    llmString?: string;
    inputOverride?: unknown;
  } = {},
): Promise<T> {
  return withLangfuseEval(
    name,
    { ...metadata, llmString: options.llmString },
    options.inputOverride ?? metadata,
    evalFn,
  );
}
