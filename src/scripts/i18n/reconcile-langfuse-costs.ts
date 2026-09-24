import { readFileSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { nativeUsage } from "./negotiation/langfuse.ts";
const ids = process.argv.slice(2);
if (!ids.length) throw Error("Pass trace IDs to reconcile in place");
const base = process.env.LANGFUSE_BASE_URL ?? process.env.LANGFUSE_HOST;
const headers = {
  Authorization:
    "Basic " +
    Buffer.from(
      process.env.LANGFUSE_PUBLIC_KEY + ":" + process.env.LANGFUSE_SECRET_KEY,
    ).toString("base64"),
  "Content-Type": "application/json",
};
mkdirSync("reports/i18n/cost-observability", { recursive: true });
for (const traceId of ids) {
  const response = await fetch(base + "/api/public/traces/" + traceId, {
    headers,
  });
  if (!response.ok) throw Error("Trace lookup failed " + response.status);
  const trace = await response.json();
  const batch = [];
  for (const observation of trace.observations ?? []) {
    if (observation.type !== "GENERATION") continue;
    const prefix = observation.metadata?.receiptPrefix;
    if (typeof prefix !== "string") continue;
    const path = resolve(prefix + "-cli-stdout.txt");
    if (!path.startsWith(resolve("reports/i18n") + "/") || !existsSync(path))
      throw Error("Missing or out-of-scope receipt");
    const backend =
      observation.metadata?.backend ??
      observation.metadata?.invocation?.backend;
    if (!["claude", "codex", "opencode"].includes(backend))
      throw Error("Unknown backend");
    const accounting = nativeUsage(
      backend,
      readFileSync(path, "utf8"),
      observation.model,
    );
    batch.push({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "generation-update",
      body: {
        id: observation.id,
        traceId,
        usageDetails: accounting.usageDetails,
        ...(accounting.costDetails
          ? { costDetails: accounting.costDetails }
          : {}),
        metadata: {
          ...observation.metadata,
          ...accounting.metadata,
          costAccountingVersion: 2,
        },
      },
    });
  }
  const r = await fetch(base + "/api/public/ingestion", {
    method: "POST",
    headers,
    body: JSON.stringify({ batch }),
  });
  const body = await r.json();
  if (!r.ok || body.errors?.length)
    throw Error("Cost reconciliation rejected: " + JSON.stringify(body));
  const receipt = {
    at: new Date().toISOString(),
    traceId,
    updated: batch.length,
    httpStatus: r.status,
    known: batch.filter((e) => e.body.costDetails).length,
    unknown: batch.filter((e) => !e.body.costDetails).length,
  };
  appendFileSync(
    "reports/i18n/cost-observability/reconciliation.jsonl",
    JSON.stringify(receipt) + "\n",
  );
  console.log(JSON.stringify(receipt));
}
