// Import translation candidate runs from reports/i18n/*/candidates.jsonl,
// which predate Langfuse tracing. One trace per candidate, one generation per
// chunk. Chunks ran sequentially, so they are laid out back to back, ending at
// the candidate's createdAt; per-chunk durations are original. Ids derive from
// the record hash, so reruns upsert instead of duplicating.
import { createHash } from "node:crypto";
import { appendFileSync, mkdirSync, readFileSync } from "node:fs";
import { Glob } from "bun";
const out = "reports/i18n/cost-observability/candidates-backfill.jsonl";
mkdirSync("reports/i18n/cost-observability", { recursive: true });
const base = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;
const headers = {
  Authorization:
    "Basic " +
    Buffer.from(
      process.env.LANGFUSE_PUBLIC_KEY + ":" + process.env.LANGFUSE_SECRET_KEY,
    ).toString("base64"),
  "Content-Type": "application/json",
};
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const lines: string[] = [];
for await (const path of new Glob("reports/i18n/*/candidates.jsonl").scan("."))
  lines.push(...readFileSync(path, "utf8").split("\n").filter(Boolean));
const chunkCost = (c: any, recordPricing: string) => {
  const pricing = c.pricingSource ?? recordPricing;
  if (c.pricingSource === "openrouter-usage-accounting" && typeof c.providerCostUsd === "number") {
    const byok = c.providerCostUsd === 0 && c.providerUpstreamCostUsd > 0;
    return {
      cost: c.providerCostUsd,
      metadata: {
        costBasis: "openrouter-reported",
        costKnown: true,
        openRouterChargeUsd: c.providerCostUsd,
        isByok: byok,
        isByokVerified: false,
        byokInferenceReferenceUsd: byok ? c.providerUpstreamCostUsd : 0,
        providerInvoiceReconciled: false,
      },
    };
  }
  if (typeof c.costUsd === "number" && pricing !== "unknown")
    return {
      cost: c.costUsd,
      metadata: { costBasis: "api-equivalent-estimate", costKnown: true },
    };
  return { cost: undefined, metadata: { costBasis: "unknown", costKnown: false } };
};
const events: any[] = [];
const receipts: any[] = [];
for (const line of lines) {
  const r = JSON.parse(line);
  const chunks: any[] = r.telemetry?.chunks ?? [];
  if (!chunks.length || typeof r.createdAt !== "string") continue;
  // Unpriced records get a distinct id space: an earlier import stored their
  // placeholder $0 as a cost, and Langfuse cannot unset a stored cost.
  const key = sha(r.pricingSource === "unknown" ? "unpriced:" + line : line);
  const traceId = key.slice(0, 32);
  const end = Date.parse(r.createdAt);
  const total = chunks.reduce((n, c) => n + (c.durationMs ?? 0), 0);
  let cursor = end - total;
  const traceStart = new Date(cursor).toISOString();
  events.push({
    id: sha(key + "trace"),
    timestamp: traceStart,
    type: "trace-create",
    body: {
      id: traceId,
      name: "i18n candidate " + r.locale + "/" + r.slug,
      timestamp: traceStart,
      input: {
        slug: r.slug,
        locale: r.locale,
        model: r.model,
        sourcePath: r.sourcePath,
        sourceHash: r.sourceHash,
        chunkSize: r.telemetry.chunkSize,
      },
      output: { candidatePath: r.candidatePath, outputHash: r.outputHash },
      tags: ["i18n-candidate", "backfill"],
      metadata: {
        backfill: true,
        runId: r.runId,
        source: "reports/i18n/*/candidates.jsonl",
        sourceRecordSha256: key,
        pricingSource: r.pricingSource,
        recordedTotalCostUsd: r.totalCostUsd ?? null,
      },
    },
  });
  let known = 0;
  let unknown = 0;
  for (const [i, c] of chunks.entries()) {
    const start = new Date(cursor).toISOString();
    cursor += c.durationMs ?? 0;
    const { cost, metadata } = chunkCost(c, r.pricingSource);
    cost === undefined ? unknown++ : (known += cost);
    const cached = c.cacheReadTokens ?? 0;
    events.push({
      id: sha(key + "generation" + i),
      timestamp: start,
      type: "generation-create",
      body: {
        id: sha(key + "obs" + i).slice(0, 16),
        traceId,
        name: "chunk " + (c.label ?? c.index),
        startTime: start,
        endTime: new Date(cursor).toISOString(),
        model: r.model,
        modelParameters: {
          temperature: r.temperature,
          maxTokens: r.maxTokens,
          reasoningEffort: r.reasoningEffort,
        },
        input: { chunkIndex: c.index, label: c.label ?? null },
        output: c.text ?? null,
        usageDetails: {
          input: (c.inputTokens ?? 0) - cached,
          input_cached: cached,
          input_cache_write: c.cacheWriteTokens ?? 0,
          output: c.outputTokens ?? 0,
        },
        ...(cost === undefined ? {} : { costDetails: { total: cost } }),
        metadata: {
          ...metadata,
          backfill: true,
          costAccountingVersion: 3,
          pricingSource: c.pricingSource ?? r.pricingSource,
          timing: "Original chunk duration; start reconstructed from sequential layout ending at createdAt",
        },
      },
    });
  }
  receipts.push({ traceId, runId: r.runId, slug: r.slug, locale: r.locale, model: r.model, chunks: chunks.length, knownCostUsd: known, unknownCostChunks: unknown });
}
for (let i = 0; i < events.length; i += 40) {
  const res = await fetch(base + "/api/public/ingestion", {
    method: "POST",
    headers,
    body: JSON.stringify({ batch: events.slice(i, i + 40) }),
  });
  const body = await res.json();
  if (!res.ok || body.errors?.length)
    throw Error("Langfuse ingestion failed at " + i + " " + JSON.stringify(body.errors).slice(0, 500));
}
for (const receipt of receipts) appendFileSync(out, JSON.stringify(receipt) + "\n");
console.log(`Imported ${receipts.length} candidates (${events.length - receipts.length} chunk generations) of ${lines.length} records`);
