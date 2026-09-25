import * as ai from "ai";
import { initLogger, traced, wrapAISDK } from "braintrust";
import { withLangfuseTelemetry } from "./langfuse.ts";
import type { EvalScoreInput } from "./langfuse-score-projection.ts";
import { withLangfuseEval } from "./langfuse-scores.ts";

export const BRAINTRUST_PROJECT_NAME = "danlevy.net";

const apiKey = process.env.BRAINTRUST_API_KEY;
export const braintrustEnabled = apiKey != null && apiKey !== "";

const instrumentedAi = braintrustEnabled
  ? (() => {
    initLogger({
      projectName: BRAINTRUST_PROJECT_NAME,
      apiKey,
      asyncFlush: false,
    });
    return wrapAISDK(ai);
  })()
  : ai;

export const generateText: typeof ai.generateText = (options) =>
  instrumentedAi.generateText(withLangfuseTelemetry(options));
export const streamText: typeof ai.streamText = (options) =>
  instrumentedAi.streamText(withLangfuseTelemetry(options));

/**
 * Wraps fn() in a Braintrust span and a Langfuse observation, each only when
 * its credentials are set. Both receive the result's scores[] so each eval
 * case appears as a scored row, and in Langfuse the eval's LLM calls nest
 * under it.
 */
export async function tracedEval<T extends { scores?: EvalScoreInput[] }>(
  name: string,
  metadata: Record<string, unknown>,
  evalFn: () => Promise<T>,
  options: {
    llmString?: string;
    inputOverride?: unknown;
  } = {},
): Promise<T> {
  const fn = () =>
    withLangfuseEval(
      name,
      { ...metadata, llmString: options.llmString },
      options.inputOverride ?? metadata,
      evalFn,
    );
  if (!braintrustEnabled) return fn();

  return traced(
    async (span) => {
      const result = await fn();
      if (Array.isArray(result.scores)) {
        const scoreMap: Record<string, number> = {};
        for (const s of result.scores) scoreMap[s.name] = s.score;
        span.log({
          scores: scoreMap,
          output: result,
          metadata: {
            ...metadata,
            llmString: options.llmString,
          },
        });
      }
      return result;
    },
    {
      name,
      event: {
        input: options.inputOverride ?? metadata,
        metadata: {
          ...metadata,
          llmString: options.llmString,
        },
      },
    },
  );
}
