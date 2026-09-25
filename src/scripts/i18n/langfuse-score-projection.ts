import { createHash } from "node:crypto";

export type ScoreTraceLink = { traceId: string; observationId?: string };
export type LangfuseScore = {
  id: string;
  traceId: string;
  observationId?: string;
  name: string;
  value: number | string;
  dataType: "NUMERIC" | "CATEGORICAL" | "BOOLEAN";
  comment: string;
  metadata: Record<string, unknown>;
};

export const scoreRecordHash = (source: string) =>
  createHash("sha256").update(source).digest("hex");
const numericKeys = [
  "readability",
  "technicalAccuracy",
  "coherence",
  "relevance",
  "translationQuality",
  "fidelity",
  "mdxPreservation",
  "culturalAdaptation",
  "languagePurity",
  "localeQuality",
  "tone",
  "publishReadiness",
  "overallScore",
  "confidenceScore",
];

/** Project saved values verbatim; this never judges, normalizes, or rescales them. */
export function projectTranslationScores(
  record: Record<string, unknown>,
  link: ScoreTraceLink,
  sourceKey: string,
): LangfuseScore[] {
  const nested =
    record.scores && typeof record.scores === "object"
      ? (record.scores as Record<string, unknown>)
      : {};
  const judgeScores =
    record.judgeScores && typeof record.judgeScores === "object"
      ? (record.judgeScores as Record<string, unknown>)
      : {};
  const values = { ...nested, ...judgeScores, ...record };
  const metadata = Object.fromEntries(
    Object.entries({
      projectionVersion: "translation-scores@v1",
      sourceRecordSha256: sourceKey,
      sourceTimestamp: record.at,
      slug: record.slug,
      locale: record.locale,
      judgeModel: record.judgeModel ?? record.model,
      sourceHash: record.sourceHash,
      translationHash: record.translationHash,
      roundLabel: record.roundLabel,
    }).filter(([, value]) => value !== undefined),
  );
  const scores: LangfuseScore[] = [];
  const add = (
    key: string,
    value: number | string,
    dataType: LangfuseScore["dataType"],
  ) => {
    const name = `i18n.${key}`;
    scores.push({
      id: scoreRecordHash(
        `${sourceKey}:${link.traceId}:${link.observationId ?? "trace"}:${name}`,
      ),
      ...link,
      name,
      value,
      dataType,
      metadata,
      comment:
        "Projected from saved translation scorer output; original scale retained. This is not a new judge run.",
    });
  };
  for (const key of numericKeys) {
    const value = values[key];
    if (typeof value === "number" && Number.isFinite(value))
      add(key, value, "NUMERIC");
  }
  if (typeof values.publishReady === "boolean")
    add("publishReady", Number(values.publishReady), "BOOLEAN");
  if (typeof values.recommendation === "string" && values.recommendation)
    add("recommendation", values.recommendation, "CATEGORICAL");
  return scores;
}

export function langfuseConnection() {
  const base = (
    process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST
  )?.replace(/\/+$/, "");
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  if (!base || !publicKey || !secretKey) return null;
  return {
    base,
    headers: {
      Authorization: `Basic ${Buffer.from(`${publicKey}:${secretKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
  };
}

export async function sendTranslationScores(
  scores: LangfuseScore[],
  timestamp: string,
  fetchImpl = fetch,
): Promise<void> {
  if (!scores.length) return;
  const connection = langfuseConnection();
  if (!connection)
    throw new Error("Langfuse credentials and base URL are required");
  const response = await fetchImpl(`${connection.base}/api/public/ingestion`, {
    method: "POST",
    headers: connection.headers,
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      batch: scores.map((score) => {
        const at =
          typeof score.metadata.sourceTimestamp === "string"
            ? score.metadata.sourceTimestamp
            : timestamp;
        return {
          id: score.id,
          timestamp: at,
          type: "score-create",
          body: { ...score, timestamp: at },
        };
      }),
    }),
  });
  if (!response.ok)
    throw new Error(`Langfuse score ingestion HTTP ${response.status}`);
  const result = await response.json();
  if (result.errors?.length)
    throw new Error(`Langfuse rejected ${result.errors.length} score events`);
}

export type EvalScoreInput = {
  name: string;
  score: number;
  passed?: boolean;
  severity?: string;
  details?: string;
};

/**
 * Eval scorers report 0–1 values; the `eval.` prefix keeps them apart from the
 * `i18n.` judge projections, which use the judges' original scales.
 */
export function projectEvalScores(
  evalName: string,
  scores: EvalScoreInput[],
  link: ScoreTraceLink,
): LangfuseScore[] {
  return scores
    .filter((s) => Number.isFinite(s.score))
    .map((s) => {
      const name = `eval.${s.name}`;
      return {
        id: scoreRecordHash(
          `${evalName}:${link.traceId}:${link.observationId ?? "trace"}:${name}`,
        ),
        ...link,
        name,
        value: s.score,
        dataType: "NUMERIC" as const,
        comment: s.details ?? "",
        metadata: Object.fromEntries(
          Object.entries({ evalName, passed: s.passed, severity: s.severity })
            .filter(([, value]) => value !== undefined),
        ),
      };
    });
}

const PROPAGATED_VALUE_MAX = 200;

/**
 * propagateAttributes() drops non-string or >200-char values with a warning,
 * so keep only the short scalar dimensions worth filtering traces by.
 */
export function propagatableMetadata(
  metadata: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (!["string", "number", "boolean"].includes(typeof value)) continue;
    const text = String(value);
    if (text.length <= PROPAGATED_VALUE_MAX) out[key] = text;
  }
  return out;
}
