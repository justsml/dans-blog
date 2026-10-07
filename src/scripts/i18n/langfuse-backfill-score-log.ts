import { exportLangfuseBackfill } from "./langfuse-v4.ts";
// Import translation_scored records from reports/translations-log.jsonl that
// never reached Langfuse. Usage:
//   bun langfuse-backfill-score-log.ts FROM_ISO TO_ISO
// IDs derive from the record hash; destination observations are checked before export.
// The log keeps usage, charges and timing but no prompt, output text or
// OpenRouter generation id: BYOK is inferred from the charge pattern, not
// verified by generation lookup.
import { createHash } from "node:crypto";
import { appendFileSync, mkdirSync, readFileSync } from "node:fs";
const [from, to] = process.argv.slice(2);
if (!from || !to) throw Error("Usage: FROM_ISO TO_ISO");
const out = "reports/i18n/cost-observability/score-log-backfill.jsonl";
mkdirSync("reports/i18n/cost-observability", { recursive: true });

const records = readFileSync("reports/translations-log.jsonl", "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => ({ line, r: JSON.parse(line) }))
  .filter(
    ({ r }) => r.event === "translation_scored" && r.at >= from && r.at < to,
  );
const complete = (r: any) =>
  ["inputTokens", "outputTokens", "durationMs"].every(
    (k) => typeof r[k] === "number" && Number.isFinite(r[k]),
  ) && typeof r.judgeModel === "string";
const skipped = records.filter(({ r }) => !complete(r)).length;
records.splice(0, records.length, ...records.filter(({ r }) => complete(r)));
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const batch: any[] = [];
const receipts: any[] = [];
for (const { line, r } of records) {
  const key = sha(line);
  const traceId = key.slice(0, 32);
  const observationId = key.slice(32, 48);
  const model = r.judgeModel.replace(/^openrouter\//, "");
  const endTime = r.at;
  const startTime = new Date(Date.parse(r.at) - r.durationMs).toISOString();
  const cached = r.cacheReadTokens ?? 0;
  const reported = typeof r.providerCostUsd === "number";
  const estimated =
    !reported && typeof r.totalUsd === "number" && r.pricingSource !== "unknown";
  const cost = reported ? r.providerCostUsd : estimated ? r.totalUsd : undefined;
  const inferredByok =
    reported && r.providerCostUsd === 0 && r.providerUpstreamCostUsd > 0;
  const metadata = {
    backfill: true,
    source: "reports/translations-log.jsonl",
    sourceRecordSha256: key,
    costBasis: reported
      ? "openrouter-reported"
      : estimated
        ? "api-equivalent-estimate"
        : "unknown",
    costKnown: cost !== undefined,
    pricingSource: r.pricingSource,
    ...(reported
      ? {
          openRouterChargeUsd: r.providerCostUsd,
          isByok: inferredByok,
          isByokVerified: false,
          byokBasis:
            "Inferred: zero gateway charge with nonzero upstream cost. No generation id was logged for a lookup.",
          byokInferenceReferenceUsd: inferredByok ? r.providerUpstreamCostUsd : 0,
          providerInvoiceReconciled: false,
        }
      : {}),
    costAccountingVersion: 3,
    pricingTableEstimateUsd: r.totalUsd,
    timing: "Original request start/end from the score log",
    outputUnavailable: "The score log keeps parsed scores, not raw model text",
  };
  const task = {
    slug: r.slug,
    locale: r.locale,
    sourcePath: r.sourcePath,
    targetPath: r.targetPath,
    sourceHash: r.sourceHash,
    translationHash: r.translationHash,
  };
  const scores = {
    readability: r.readability,
    technicalAccuracy: r.technicalAccuracy,
    coherence: r.coherence,
    relevance: r.relevance,
    translationQuality: r.translationQuality,
    overallScore: r.overallScore,
    recommendation: r.recommendation,
    confidence: r.confidence,
    issues: { high: r.highIssueCount, medium: r.mediumIssueCount, low: r.lowIssueCount },
  };
  batch.push(
    {
      id: sha(key + "trace"),
      timestamp: startTime,
      type: "trace-create",
      body: {
        id: traceId,
        name: "i18n score " + r.locale + "/" + r.slug,
        timestamp: startTime,
        input: task,
        output: scores,
        tags: ["i18n-score", "backfill"],
        metadata: { backfill: true, judgeModel: model },
      },
    },
    {
      id: sha(key + "generation"),
      timestamp: startTime,
      type: "generation-create",
      body: {
        id: observationId,
        traceId,
        name: "chat " + model,
        startTime,
        endTime,
        model,
        input: task,
        output: scores,
        usageDetails: {
          input: r.inputTokens - cached,
          input_cached: cached,
          input_cache_write: r.cacheWriteTokens ?? 0,
          output: r.outputTokens,
        },
        ...(cost === undefined ? {} : { costDetails: { total: cost } }),
        metadata,
      },
    },
  );
  receipts.push({ traceId, observationId, at: r.at, model, slug: r.slug, locale: r.locale, costUsd: cost ?? null, ...metadata });
}
await exportLangfuseBackfill(batch);
for (const receipt of receipts) appendFileSync(out, JSON.stringify(receipt) + "\n");
console.log(
  `Imported ${receipts.length} score calls from ${from} to ${to}; skipped ${skipped} without usage, cost or timing`,
);
