import {
  listLangfuseObservations,
  publishCostReconciliation,
} from "./langfuse-v4.ts";
// Settle live Langfuse generations against OpenRouter's generation lookup.
// Annotates the verified gateway charge and BYOK flag as reconciliation scores, using the same
// cost-accounting v3 fields as translation-battle-cost-audit.ts.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const out = "reports/i18n/cost-observability/openrouter-settlement";
mkdirSync(out, { recursive: true });

const all = await listLangfuseObservations({ type: "GENERATION" });
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
      {
        headers: { Authorization: "Bearer " + process.env.OPENROUTER_API_KEY },
      },
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
  await publishCostReconciliation([
    {
      body: {
        id: o.id,
        traceId: o.traceId,
        costDetails: { total: d.total_cost },
        metadata,
      },
    },
  ]);
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
console.log(
  `Annotated ${updates.length} generations (immutable observations unchanged)`,
);
console.table(
  updates.map(
    ({ model, isByok, openRouterChargeUsd, byokInferenceReferenceUsd }) => ({
      model,
      isByok,
      openRouterChargeUsd,
      byokInferenceReferenceUsd,
    }),
  ),
);
