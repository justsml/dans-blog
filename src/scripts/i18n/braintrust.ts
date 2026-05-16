import * as ai from "ai";
import { initLogger, traced, wrapAISDK } from "braintrust";

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

export const generateText = instrumentedAi.generateText;
export const streamText = instrumentedAi.streamText;

/**
 * Wraps fn() in a Braintrust span when BRAINTRUST_API_KEY is set, otherwise
 * calls it directly. Attaches the result's scores[] array to the span so each
 * eval case appears as a scored row in the Braintrust UI.
 */
export async function tracedEval<T extends { scores?: Array<{ name: string; score: number }> }>(
  name: string,
  metadata: Record<string, unknown>,
  fn: () => Promise<T>,
  options: {
    llmString?: string;
    inputOverride?: unknown;
  } = {},
): Promise<T> {
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
