import { afterEach, expect, test } from "bun:test";
import {
  backfillSpans,
  exportLangfuseBackfill,
  listLangfuseObservations,
  publishCostReconciliation,
  type BackfillDraft,
} from "./langfuse-v4.ts";

const saved = { ...process.env };
afterEach(() => {
  for (const key of [
    "LANGFUSE_PUBLIC_KEY",
    "LANGFUSE_SECRET_KEY",
    "LANGFUSE_BASE_URL",
  ]) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});
function configure() {
  Object.assign(process.env, {
    LANGFUSE_PUBLIC_KEY: "pk-test",
    LANGFUSE_SECRET_KEY: "sk-test",
    LANGFUSE_BASE_URL: "http://127.0.0.1:9",
  });
}
const traceId = "a".repeat(32);
const childId = "b".repeat(16);
const drafts: BackfillDraft[] = [
  {
    type: "trace-create",
    body: {
      id: traceId,
      name: "backfill",
      timestamp: "2026-09-01T00:00:00Z",
      input: { prompt: "original" },
      output: { result: "original" },
      tags: ["i18n"],
      metadata: { slug: "test" },
    },
  },
  {
    type: "generation-create",
    body: {
      id: childId,
      traceId,
      name: "generation",
      startTime: "2026-09-01T00:00:00Z",
      endTime: "2026-09-01T00:00:01Z",
      model: "historical-model",
      input: "question",
      output: "answer",
      usageDetails: { input: 4, output: 2 },
      costDetails: { total: 0.003 },
    },
  },
];
test("backfill exports complete v4 spans with original timing, root IO, costs and hierarchy", async () => {
  configure();
  const calls: { path: string; init?: RequestInit }[] = [];
  const fake = (async (url: any, init?: RequestInit) => {
    calls.push({ path: new URL(url).pathname, init });
    return Response.json(
      new URL(url).pathname.endsWith("observations")
        ? { data: [], meta: {} }
        : {},
    );
  }) as unknown as typeof fetch;
  await exportLangfuseBackfill(drafts, fake);
  expect(calls.map((c) => c.path)).toEqual([
    "/api/public/v2/observations",
    "/api/public/otel/v1/traces",
  ]);
  expect(
    (calls[1].init!.headers as Record<string, string>)[
      "x-langfuse-ingestion-version"
    ],
  ).toBe("4");
  const spans = JSON.parse(String(calls[1].init!.body)).resourceSpans[0]
    .scopeSpans[0].spans;
  expect(spans).toHaveLength(2);
  expect(spans[1].parentSpanId).toBe(spans[0].spanId);
  expect(spans[0].endTimeUnixNano).toBe(spans[1].endTimeUnixNano);
  const attrs = (span: any) =>
    Object.fromEntries(span.attributes.map((a: any) => [a.key, a.value]));
  expect(attrs(spans[0])["langfuse.observation.input"].stringValue).toBe(
    '{"prompt":"original"}',
  );
  expect(attrs(spans[1])["langfuse.trace.metadata.slug"].stringValue).toBe(
    "test",
  );
  expect(attrs(spans[1])["langfuse.observation.cost_details"].stringValue).toBe(
    '{"total":0.003}',
  );
  expect(() =>
    backfillSpans([
      { ...drafts[1], body: { ...drafts[1].body, endTime: "invalid" } },
      drafts[0],
    ]),
  ).toThrow();
});
test("backfill reruns skip accepted IDs and refuse partial traces instead of duplicating cost", async () => {
  configure();
  let writes = 0;
  const fake = (async (_url: any, init?: RequestInit) => {
    if (init?.method === "POST") writes++;
    return Response.json({ data: [{ id: childId }], meta: {} });
  }) as unknown as typeof fetch;
  await exportLangfuseBackfill(drafts, fake);
  expect(writes).toBe(0);
  const partial = (async () =>
    Response.json({
      data: [{ id: "c".repeat(16) }],
      meta: {},
    })) as unknown as typeof fetch;
  await expect(exportLangfuseBackfill(drafts, partial)).rejects.toThrow(
    "refusing duplicate",
  );
});
test("observation reads follow cursors and fail closed on a repeated cursor", async () => {
  configure();
  const cursors: (string | null)[] = [];
  const fake = (async (url: any) => {
    const cursor = new URL(url).searchParams.get("cursor");
    cursors.push(cursor);
    return Response.json({
      data: [{ id: cursor ?? "first" }],
      meta: { cursor: cursor ? null : "next" },
    });
  }) as unknown as typeof fetch;
  expect(await listLangfuseObservations({ traceId }, fake)).toHaveLength(2);
  expect(cursors).toEqual([null, "next"]);
  const stuck = (async () =>
    Response.json({
      data: [],
      meta: { cursor: "same" },
    })) as unknown as typeof fetch;
  await expect(listLangfuseObservations({}, stuck)).rejects.toThrow(
    "repeated cursor",
  );
});
test("post-export cost settlement writes stable linked scores, never generation updates", async () => {
  configure();
  const original = globalThis.fetch;
  const batches: any[] = [];
  globalThis.fetch = (async (_url: any, init: RequestInit) => {
    batches.push(JSON.parse(String(init.body)).batch);
    return Response.json({ successes: [], errors: [] });
  }) as unknown as typeof fetch;
  try {
    const updates = [
      {
        body: {
          id: childId,
          traceId,
          costDetails: { total: 0.01 },
          metadata: { isByok: true },
        },
      },
    ];
    await publishCostReconciliation(updates);
    await publishCostReconciliation(updates);
    expect(batches[0][0].type).toBe("score-create");
    expect(batches[0][0].id).toBe(batches[1][0].id);
    expect(batches[0][0].body).toMatchObject({
      traceId,
      observationId: childId,
      name: "reconciled.cost.total",
      value: 0.01,
      metadata: { isByok: true },
    });
  } finally {
    globalThis.fetch = original;
  }
});
