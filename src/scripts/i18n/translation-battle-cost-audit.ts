import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { join } from "node:path";
const dir =
  process.argv[2] ?? "reports/i18n/translation-battles/2026-09-24-gold-v1";
const out = join(dir, "cost-audit");
mkdirSync(out, { recursive: true });
const calls = readdirSync(join(dir, "calls")).map((f) =>
  JSON.parse(readFileSync(join(dir, "calls", f), "utf8")),
);
let index = 0;
const rows: any[] = [];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (index < calls.length) {
      const c = calls[index++];
      const path = join(out, c.id + ".jsonl");
      let receipt: any;
      if (existsSync(path)) receipt = JSON.parse(readFileSync(path, "utf8"));
      else {
        const response = await fetch(
          "https://openrouter.ai/api/v1/generation?id=" +
            encodeURIComponent(c.response.id),
          {
            headers: {
              Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
            },
          },
        );
        receipt = {
          callId: c.id,
          checkedAt: new Date().toISOString(),
          httpStatus: response.status,
          body: await response.json(),
        };
        writeFileSync(path, JSON.stringify(receipt) + "\n");
      }
      if (receipt.httpStatus !== 200)
        throw Error("Lookup failed " + c.id + " " + receipt.httpStatus);
      const d = receipt.body.data;
      if (
        typeof d.is_byok !== "boolean" ||
        typeof d.total_cost !== "number" ||
        !Number.isFinite(d.total_cost) ||
        d.total_cost < 0 ||
        (d.is_byok &&
          (typeof d.upstream_inference_cost !== "number" ||
            !Number.isFinite(d.upstream_inference_cost) ||
            d.upstream_inference_cost < 0))
      )
        throw Error("Missing or invalid settlement fields: " + c.id);
      rows.push({
        callId: c.id,
        model: c.model,
        phase: c.id.startsWith("gen-") ? "generation" : "evaluation",
        isByok: d.is_byok,
        gatewayUsd: d.total_cost,
        upstreamReferenceUsd: d.upstream_inference_cost,
        originalGatewayUsd: c.telemetry.providerCostUsd,
        originalUpstreamUsd: c.telemetry.providerUpstreamCostUsd,
        catalogUsd: c.catalogEstimateUsd,
        nativeInput: d.native_tokens_prompt,
        nativeOutput: d.native_tokens_completion,
        nativeReasoning: d.native_tokens_reasoning,
        originalInput: c.telemetry.inputTokens,
        originalOutput: c.telemetry.outputTokens,
        cached: d.native_tokens_cached,
      });
    }
  }),
);
writeFileSync(
  join(out, "reconciliation.jsonl"),
  rows.map((r) => JSON.stringify(r)).join("\n") + "\n",
);
const sum = (rs: any[], key: string) =>
  rs.reduce((n, r) => n + (r[key] ?? 0), 0);
const summaries = ["generation", "evaluation"].map((phase) => {
  const rs = rows.filter((r) => r.phase === phase),
    byok = rs.filter((r) => r.isByok),
    standard = rs.filter((r) => !r.isByok);
  return {
    phase,
    calls: rs.length,
    byokCalls: byok.length,
    standardCalls: standard.length,
    openRouterChargeUsd: sum(rs, "gatewayUsd"),
    byokUpstreamReferenceUsd: sum(byok, "upstreamReferenceUsd"),
    standardUpstreamReferenceUsd: sum(standard, "upstreamReferenceUsd"),
    gatewayMismatches: rs.filter(
      (r) => Math.abs(r.gatewayUsd - r.originalGatewayUsd) > 1e-10,
    ),
    upstreamMismatches: rs.filter(
      (r) => Math.abs(r.upstreamReferenceUsd - r.originalUpstreamUsd) > 1e-10,
    ),
    tokenMismatches: rs.filter(
      (r) =>
        r.nativeInput !== r.originalInput ||
        r.nativeOutput !== r.originalOutput,
    ),
  };
});
writeFileSync(
  join(out, "summary.jsonl"),
  summaries.map((r) => JSON.stringify(r)).join("\n") + "\n",
);
console.log(JSON.stringify(summaries));
if (process.argv.includes("--sync-langfuse")) {
  const base = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        process.env.LANGFUSE_PUBLIC_KEY + ":" + process.env.LANGFUSE_SECRET_KEY,
      ).toString("base64"),
    "Content-Type": "application/json",
  };
  let cursor = 0;
  const updates: any[] = [];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (cursor < rows.length) {
        const r = rows[cursor++],
          c = calls.find((c) => c.id === r.callId);
        const response = await fetch(base + "/api/public/traces/" + c.traceId, {
          headers,
        });
        if (!response.ok) throw Error("Trace lookup failed");
        const trace = await response.json();
        const observations = trace.observations.filter(
          (o: any) => o.type === "GENERATION",
        );
        if (observations.length !== 1) throw Error("Expected one generation");
        const o = observations[0];
        const metadata = {
          ...o.metadata,
          isByok: r.isByok,
          openRouterChargeUsd: r.gatewayUsd,
          byokInferenceReferenceUsd: r.isByok ? r.upstreamReferenceUsd : 0,
          providerInvoiceReconciled: false,
          settledGenerationId: c.response.id,
          costAccountingVersion: 3,
          upstreamCostNote:
            "Legacy raw completion field may repeat gateway charge. Use verified isByok and byokInferenceReferenceUsd. Provider invoice has not been reconciled.",
        };
        const batch = [
          {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            type: "generation-update",
            body: {
              id: o.id,
              traceId: c.traceId,
              costDetails: { total: r.gatewayUsd },
              metadata,
            },
          },
        ];
        const update = await fetch(base + "/api/public/ingestion", {
          method: "POST",
          headers,
          body: JSON.stringify({ batch }),
        });
        const body = await update.json();
        if (!update.ok || body.errors?.length)
          throw Error("Langfuse update failed");
        updates.push({
          callId: c.id,
          traceId: c.traceId,
          observationId: o.id,
          httpStatus: update.status,
          ...metadata,
        });
      }
    }),
  );
  writeFileSync(
    join(out, "langfuse-updates.jsonl"),
    updates.map((r) => JSON.stringify(r)).join("\n") + "\n",
  );
  console.log("Updated " + updates.length + " existing generations");
}
if (process.argv.includes("--verify-langfuse")) {
  const base = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        process.env.LANGFUSE_PUBLIC_KEY + ":" + process.env.LANGFUSE_SECRET_KEY,
      ).toString("base64"),
  };
  let cursor = 0;
  const checked: any[] = [];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (cursor < rows.length) {
        const r = rows[cursor++],
          c = calls.find((c) => c.id === r.callId);
        const response = await fetch(base + "/api/public/traces/" + c.traceId, {
          headers,
        });
        if (!response.ok) throw Error("Trace lookup failed");
        const t = await response.json(),
          gs = t.observations.filter((o: any) => o.type === "GENERATION"),
          o = gs[0];
        const passed =
          gs.length === 1 &&
          o.costDetails.total === r.gatewayUsd &&
          o.metadata.isByok === r.isByok &&
          o.metadata.byokInferenceReferenceUsd ===
            (r.isByok ? r.upstreamReferenceUsd : 0) &&
          o.metadata.providerInvoiceReconciled === false;
        checked.push({ callId: c.id, traceId: c.traceId, passed });
      }
    }),
  );
  writeFileSync(
    join(out, "langfuse-settlement-verification.jsonl"),
    checked.map((r) => JSON.stringify(r)).join("\n") + "\n",
  );
  if (checked.some((r) => !r.passed))
    throw Error("Settlement verification mismatch");
  console.log("Verified " + checked.length + " settled Langfuse records");
}
