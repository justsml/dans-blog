// Price backfilled Langfuse generations whose cost is unknown, using the
// current OpenRouter catalog and each generation's stored token usage.
// Retroactive estimate: historical prices and routed providers may differ, and
// :nitro variants are priced at their base model when not listed separately.
// Usage: bun langfuse-estimate-unpriced.ts CATALOG_JSON
import { appendFileSync, readFileSync } from "node:fs";
const catalogPath = process.argv[2];
if (!catalogPath) throw Error("Usage: CATALOG_JSON (OpenRouter /api/v1/models)");
const catalog = new Map(
  JSON.parse(readFileSync(catalogPath, "utf8")).data.map((m: any) => [m.id, m]),
);
const pricingSource = "openrouter-catalog-" + new Date().toISOString().slice(0, 10) + "-retro";
const out = "reports/i18n/cost-observability/unpriced-estimates.jsonl";
const base = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;
const headers = {
  Authorization:
    "Basic " +
    Buffer.from(
      process.env.LANGFUSE_PUBLIC_KEY + ":" + process.env.LANGFUSE_SECRET_KEY,
    ).toString("base64"),
  "Content-Type": "application/json",
};
const rows = (path: string) =>
  readFileSync(path, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
const traceIds = [
  ...rows("reports/i18n/cost-observability/score-log-backfill.jsonl")
    .filter((r) => r.costBasis === "unknown")
    .map((r) => r.traceId),
  ...rows("reports/i18n/cost-observability/candidates-backfill.jsonl")
    .filter((r) => r.unknownCostChunks > 0)
    .map((r) => r.traceId),
];
const updates: any[] = [];
const receipts: any[] = [];
for (const traceId of traceIds) {
  const res = await fetch(base + "/api/public/traces/" + traceId, { headers });
  if (!res.ok) throw Error("Trace lookup failed " + traceId);
  const trace = await res.json();
  for (const o of trace.observations) {
    if (o.type !== "GENERATION" || o.metadata?.costBasis !== "unknown") continue;
    const entry: any =
      catalog.get(o.model) ?? catalog.get(o.model.replace(/:(nitro|floor)$/, ""));
    if (!entry) throw Error("Model missing from catalog: " + o.model);
    const p = entry.pricing;
    const u = o.usageDetails ?? {};
    const cacheRead = +(p.input_cache_read ?? p.prompt);
    const cacheWrite = +(p.input_cache_write ?? p.prompt);
    const cost =
      (u.input ?? 0) * +p.prompt +
      (u.input_cached ?? 0) * cacheRead +
      (u.input_cache_write ?? 0) * cacheWrite +
      (u.output ?? 0) * +p.completion;
    const metadata = {
      ...o.metadata,
      costBasis: "api-equivalent-estimate",
      costKnown: true,
      pricingSource,
      pricedAs: entry.id,
      estimateNote:
        "Retroactive catalog estimate from stored usage; historical prices and routed providers may differ.",
    };
    updates.push({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "generation-update",
      body: { id: o.id, traceId, costDetails: { total: cost }, metadata },
    });
    receipts.push({ traceId, observationId: o.id, model: o.model, pricedAs: entry.id, usage: u, estimatedUsd: cost, pricingSource });
  }
}
for (let i = 0; i < updates.length; i += 40) {
  const res = await fetch(base + "/api/public/ingestion", {
    method: "POST",
    headers,
    body: JSON.stringify({ batch: updates.slice(i, i + 40) }),
  });
  const body = await res.json();
  if (!res.ok || body.errors?.length) throw Error("Langfuse update failed at " + i);
}
for (const r of receipts) appendFileSync(out, JSON.stringify(r) + "\n");
const byModel: Record<string, { calls: number; usd: number }> = {};
for (const r of receipts) {
  byModel[r.model] ??= { calls: 0, usd: 0 };
  byModel[r.model].calls++;
  byModel[r.model].usd += r.estimatedUsd;
}
console.table(byModel);
console.log(`Estimated ${receipts.length} generations: $${receipts.reduce((n, r) => n + r.estimatedUsd, 0).toFixed(4)}`);
