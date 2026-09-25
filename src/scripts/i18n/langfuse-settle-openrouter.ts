// Settle live Langfuse generations against OpenRouter's generation lookup.
// Writes the verified gateway charge and BYOK flag in place, using the same
// cost-accounting v3 fields as translation-battle-cost-audit.ts.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const out = "reports/i18n/cost-observability/openrouter-settlement";
mkdirSync(out, { recursive: true });
const base = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;
const headers = {
  Authorization:
    "Basic " +
    Buffer.from(
      process.env.LANGFUSE_PUBLIC_KEY + ":" + process.env.LANGFUSE_SECRET_KEY,
    ).toString("base64"),
  "Content-Type": "application/json",
};
const all: any[] = [];
for (let page = 1; ; page++) {
  const r = await fetch(
    `${base}/api/public/observations?type=GENERATION&limit=100&page=${page}`,
    { headers },
  );
  if (!r.ok) throw Error("Observation listing failed " + r.status);
  const j = await r.json();
  all.push(...j.data);
  if (page >= j.meta.totalPages) break;
}
const pending = all.filter(
  (o) =>
    o.metadata?.costAccountingVersion !== 3 &&
    o.metadata?.attributes?.["gen_ai.provider.name"] === "openrouter" &&
    String(o.metadata?.attributes?.["gen_ai.response.id"]).startsWith("gen-"),
);
console.log(`${pending.length} of ${all.length} generations need settlement`);
const updates: any[] = [];
for (const o of pending) {
  const generationId = o.metadata.attributes["gen_ai.response.id"];
  const path = join(out, generationId + ".jsonl");
  let receipt: any;
  if (existsSync(path)) receipt = JSON.parse(readFileSync(path, "utf8"));
  else {
    const response = await fetch(
      "https://openrouter.ai/api/v1/generation?id=" +
        encodeURIComponent(generationId),
      { headers: { Authorization: "Bearer " + process.env.OPENROUTER_API_KEY } },
    );
    receipt = {
      observationId: o.id,
      traceId: o.traceId,
      checkedAt: new Date().toISOString(),
      httpStatus: response.status,
      body: await response.json(),
    };
    if (response.status === 200)
      appendFileSync(path, JSON.stringify(receipt) + "\n");
  }
  if (receipt.httpStatus !== 200) {
    console.log(`Skipped ${generationId}: lookup ${receipt.httpStatus}`);
    continue;
  }
  const d = receipt.body.data;
  if (
    typeof d.is_byok !== "boolean" ||
    typeof d.total_cost !== "number" ||
    d.total_cost < 0 ||
    (d.is_byok && typeof d.upstream_inference_cost !== "number")
  )
    throw Error("Missing or invalid settlement fields: " + generationId);
  const metadata = {
    ...o.metadata,
    isByok: d.is_byok,
    openRouterChargeUsd: d.total_cost,
    byokInferenceReferenceUsd: d.is_byok ? d.upstream_inference_cost : 0,
    providerInvoiceReconciled: false,
    settledGenerationId: generationId,
    costAccountingVersion: 3,
    upstreamCostNote:
      "Legacy raw completion field may repeat gateway charge. Use verified isByok and byokInferenceReferenceUsd. Provider invoice has not been reconciled.",
  };
  const r = await fetch(base + "/api/public/ingestion", {
    method: "POST",
    headers,
    body: JSON.stringify({
      batch: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          type: "generation-update",
          body: {
            id: o.id,
            traceId: o.traceId,
            costDetails: { total: d.total_cost },
            metadata,
          },
        },
      ],
    }),
  });
  const body = await r.json();
  if (!r.ok || body.errors?.length) throw Error("Langfuse update failed");
  updates.push({
    observationId: o.id,
    traceId: o.traceId,
    model: o.model,
    generationId,
    isByok: d.is_byok,
    openRouterChargeUsd: d.total_cost,
    byokInferenceReferenceUsd: metadata.byokInferenceReferenceUsd,
  });
}
for (const u of updates)
  appendFileSync(join(out, "langfuse-updates.jsonl"), JSON.stringify(u) + "\n");
console.log(`Updated ${updates.length} generations`);
console.table(updates.map(({ model, isByok, openRouterChargeUsd, byokInferenceReferenceUsd }) => ({ model, isByok, openRouterChargeUsd, byokInferenceReferenceUsd })));
