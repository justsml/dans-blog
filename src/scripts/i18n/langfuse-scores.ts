import {
  getActiveSpanId,
  getActiveTraceId,
  startActiveObservation,
} from "@langfuse/tracing";
import { flushLangfuse, langfuseEnabled } from "./langfuse.ts";
import {
  projectTranslationScores,
  scoreRecordHash,
  sendTranslationScores,
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
