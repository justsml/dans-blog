import {
  getActiveSpanId,
  getActiveTraceId,
  propagateAttributes,
  startActiveObservation,
} from "@langfuse/tracing";
import { flushLangfuse, langfuseEnabled } from "./langfuse.ts";
import {
  projectEvalScores,
  projectTranslationScores,
  propagatableMetadata,
  scoreRecordHash,
  sendTranslationScores,
  type EvalScoreInput,
  type ScoreTraceLink,
} from "./langfuse-score-projection.ts";

export function currentScoreTrace(): ScoreTraceLink | undefined {
  if (!langfuseEnabled) return undefined;
  const traceId = getActiveTraceId();
  return traceId ? { traceId, observationId: getActiveSpanId() } : undefined;
}

/** Keep local score output authoritative even if the observability service fails. */
export async function publishTranslationScores(
  record: Record<string, unknown>,
): Promise<void> {
  const link = currentScoreTrace();
  if (!link) return;
  try {
    const timestamp =
      typeof record.at === "string" ? record.at : new Date().toISOString();
    const key = scoreRecordHash(JSON.stringify(record));
    await sendTranslationScores(
      projectTranslationScores(record, link, key),
      timestamp,
    );
  } catch {
    console.warn(
      "[langfuse] score export failed; saved scorer output remains available for backfill",
    );
  }
}

/** A non-billed parent groups the existing SDK generation with its parsed scores. */
export async function withTranslationScoreTrace<T>(
  metadata: Record<string, unknown>,
  run: () => Promise<T>,
): Promise<T> {
  if (!langfuseEnabled) return run();
  try {
    return await startActiveObservation(
      "i18n.translation-score",
      async (span) => {
        span.update({ metadata });
        return run();
      },
    );
  } finally {
    try {
      await flushLangfuse();
    } catch {
      console.warn("[langfuse] scorer trace flush failed");
    }
  }
}

/**
 * Parents every AI SDK generation inside run() under one eval observation,
 * stamps the eval's trace name and short metadata onto all of them, then
 * attaches the eval's scores to that observation. Flushing is left to the
 * caller's exit path so parallel evals don't each block on a flush.
 */
export async function withLangfuseEval<
  T extends { scores?: EvalScoreInput[] },
>(
  name: string,
  metadata: Record<string, unknown>,
  input: unknown,
  run: () => Promise<T>,
): Promise<T> {
  if (!langfuseEnabled) return run();
  return startActiveObservation(name, (span) =>
    propagateAttributes(
      {
        traceName: name,
        metadata: propagatableMetadata(metadata),
        tags: ["i18n-eval"],
      },
      async () => {
        span.update({ input, metadata });
        const result = await run();
        span.update({ output: result });
        const link = currentScoreTrace();
        if (link && Array.isArray(result.scores)) {
          try {
            await sendTranslationScores(
              projectEvalScores(name, result.scores, link),
              new Date().toISOString(),
            );
          } catch {
            console.warn(
              `[langfuse] eval score export failed for ${name}; local eval output is unaffected`,
            );
          }
        }
        return result;
      },
    ),
  );
}
