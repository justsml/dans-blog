import { createHash } from "node:crypto";
import {
  langfuseConnection,
  sendTranslationScores,
  type LangfuseScore,
} from "./langfuse-score-projection.ts";

const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
function connection() {
  const result = langfuseConnection();
  if (!result) throw Error("Langfuse credentials and base URL required");
  return result;
}

/** V4 reads are observation-first and cursor-paginated, including trace lookups. */
export async function listLangfuseObservations(
  query: Record<string, string> = {},
  fetchImpl = fetch,
): Promise<any[]> {
  const { base, headers } = connection();
  const observations: any[] = [];
  const seen = new Set<string>();
  let cursor: string | undefined;
  do {
    const params = new URLSearchParams({
      ...query,
      fields: "core,basic,time,io,metadata,model,usage,prompt,trace_context",
      expandMetadata: "attributes,resourceAttributes,invocation",
      limit: "1000",
      ...(cursor ? { cursor } : {}),
    });
    const response = await fetchImpl(
      base + "/api/public/v2/observations?" + params,
      {
        headers,
        signal: AbortSignal.timeout(20000),
      },
    );
    if (!response.ok)
      throw Error("Langfuse observations lookup HTTP " + response.status);
    const result = await response.json();
    observations.push(...result.data);
    cursor = result.meta?.cursor;
    if (cursor && seen.has(cursor))
      throw Error("Langfuse returned a repeated cursor");
    if (cursor) seen.add(cursor);
  } while (cursor);
  return observations;
}

export async function getLangfuseTrace(traceId: string) {
  const observations = await listLangfuseObservations({ traceId });
  if (!observations.length) throw Error("Langfuse trace not found: " + traceId);
  return { id: traceId, observations };
}

// Historical scripts assemble these local drafts; they are NEVER sent to legacy ingestion.
export type BackfillDraft = {
  type: "trace-create" | "generation-create" | "span-create" | "event-create";
  body: Record<string, any>;
  timestamp?: string;
  id?: string;
};
const scalar = (value: unknown) =>
  typeof value === "string" ? value : JSON.stringify(value);
const attr = (key: string, value: unknown) => ({
  key,
  value: { stringValue: scalar(value) },
});
const nanos = (time: string) => {
  const ms = Date.parse(time);
  if (!Number.isFinite(ms)) throw Error("Invalid backfill timestamp: " + time);
  return (BigInt(ms) * 1000000n).toString();
};

/** Assemble one complete OTLP span per operation, with root IO and propagated context. */
export function backfillSpans(drafts: BackfillDraft[]) {
  const roots = new Map(
    drafts
      .filter((d) => d.type === "trace-create")
      .map((d) => [d.body.id, d.body]),
  );
  const childrenByTrace = Map.groupBy(
    drafts.filter((d) => d.type !== "trace-create"),
    (d) => d.body.traceId,
  );
  return drafts.map((draft) => {
    const b = draft.body;
    const root = draft.type === "trace-create";
    const traceId = root ? b.id : b.traceId;
    const trace = roots.get(traceId);
    if (!trace || !/^[a-f0-9]{32}$/.test(traceId))
      throw Error("Missing/invalid backfill trace");
    const rootId = hash(traceId + ":root").slice(0, 16);
    const spanId = root ? rootId : b.id;
    if (!/^[a-f0-9]{16}$/.test(spanId)) throw Error("Invalid backfill span ID");
    const children = childrenByTrace.get(traceId) ?? [];
    const start = root ? trace.timestamp : b.startTime;
    const end = root
      ? children.reduce(
          (latest, d) =>
            Date.parse(d.body.endTime ?? d.body.startTime) > Date.parse(latest)
              ? (d.body.endTime ?? d.body.startTime)
              : latest,
          start,
        )
      : (b.endTime ?? b.startTime);
    if (Date.parse(end) < Date.parse(start))
      throw Error("Backfill ends before start");
    const attributes = [
      attr(
        "langfuse.observation.type",
        root ? "span" : draft.type.replace("-create", ""),
      ),
      attr("langfuse.trace.name", trace.name),
      attr(
        "langfuse.environment",
        b.environment ??
          trace.environment ??
          process.env.LANGFUSE_TRACING_ENVIRONMENT ??
          "default",
      ),
    ];
    for (const [key, value] of Object.entries({
      input: b.input,
      output: b.output,
      "model.name": b.model,
      "model.parameters": b.modelParameters,
      usage_details: b.usageDetails,
      cost_details: b.costDetails,
      level: b.level,
      status_message: b.statusMessage,
    }))
      if (value !== undefined)
        attributes.push(attr("langfuse.observation." + key, value));
    if (trace.tags)
      attributes.push({
        key: "langfuse.trace.tags",
        value: {
          arrayValue: {
            values: trace.tags.map((stringValue: string) => ({ stringValue })),
          },
        },
      } as any);
    for (const [key, value] of Object.entries(trace.metadata ?? {}))
      if (value !== undefined)
        attributes.push(attr("langfuse.trace.metadata." + key, value));
    for (const [key, value] of Object.entries(b.metadata ?? {}))
      if (value !== undefined)
        attributes.push(attr("langfuse.observation.metadata." + key, value));
    return {
      traceId,
      spanId,
      name: b.name,
      kind: 1,
      ...(!root ? { parentSpanId: b.parentObservationId ?? rootId } : {}),
      startTimeUnixNano: nanos(start),
      endTimeUnixNano: nanos(end),
      attributes,
      status: { code: b.level === "ERROR" ? 2 : 1 },
    };
  });
}

/** Check destination IDs before export: v4 does not upsert or deduplicate observations. */
export async function exportLangfuseBackfill(
  drafts: BackfillDraft[],
  fetchImpl = fetch,
) {
  const { base, headers } = connection();
  const spans = backfillSpans(drafts);
  const groups = Map.groupBy(spans, (span) => span.traceId);
  for (const [traceId, group] of groups) {
    const existing = await listLangfuseObservations({ traceId }, fetchImpl);
    if (existing.length) {
      const ids = new Set(existing.map((o) => o.id));
      // Historical legacy imports may lack a root; never duplicate their generations.
      const children = group.filter((s) => s.parentSpanId);
      const required = children.length ? children : group;
      if (required.every((s) => ids.has(s.spanId))) continue;
      throw Error(
        "Partial/existing trace " + traceId + "; refusing duplicate backfill",
      );
    }
    const response = await fetchImpl(base + "/api/public/otel/v1/traces", {
      method: "POST",
      headers: { ...headers, "x-langfuse-ingestion-version": "4" },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        resourceSpans: [
          {
            resource: {
              attributes: [attr("service.name", "dans-blog-i18n-backfill")],
            },
            scopeSpans: [
              { scope: { name: "dans-blog-i18n-backfill" }, spans: group },
            ],
          },
        ],
      }),
    });
    if (!response.ok)
      throw Error("Langfuse OTLP backfill HTTP " + response.status);
    const result = await response.json();
    if (Number(result.partialSuccess?.rejectedSpans ?? 0) > 0)
      throw Error(
        "Langfuse rejected backfill spans; inspect destination before retry",
      );
  }
}

/** Settled costs become annotations on immutable observations, not billed duplicate spans. */
export async function publishCostReconciliation(
  updates: Array<{ body: Record<string, any> }>,
) {
  const scores: LangfuseScore[] = [];
  for (const { body } of updates) {
    const metadata = {
      ...body.metadata,
      reconciliation:
        "post-export annotation; original observation cost/usage is immutable",
    };
    for (const [bucket, values] of Object.entries({
      cost: body.costDetails,
      usage: body.usageDetails,
    }))
      for (const [key, value] of Object.entries(values ?? {})) {
        if (typeof value !== "number" || !Number.isFinite(value)) continue;
        const name = "reconciled." + bucket + "." + key;
        scores.push({
          id: hash(body.traceId + ":" + body.id + ":" + name),
          traceId: body.traceId,
          observationId: body.id,
          name,
          value,
          dataType: "NUMERIC",
          metadata,
          comment:
            "Post-export reconciliation; does not replace immutable billed cost or usage.",
        });
      }
  }
  await sendTranslationScores(scores, new Date().toISOString());
}
