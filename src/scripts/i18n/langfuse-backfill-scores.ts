// Project saved translation metrics onto existing traces. No LLM calls or trace writes.
// bun src/scripts/i18n/langfuse-backfill-scores.ts [--apply]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import {
  langfuseConnection,
  projectTranslationScores,
  scoreRecordHash,
  sendTranslationScores,
  type ScoreTraceLink,
} from "./langfuse-score-projection.ts";

const connection = langfuseConnection();
if (!connection) throw new Error("Langfuse credentials and base URL required");
const apply = process.argv.includes("--apply");
async function get(route: string): Promise<any> {
  const response = await fetch(`${connection!.base}/api/public/${route}`, {
    headers: connection!.headers,
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Langfuse lookup HTTP ${response.status}`);
  return response.json();
}
const projects = await get("projects");
if (projects.data.length !== 1 || projects.data[0].name !== "dans-blog")
  throw new Error(
    "Refusing score import: credentials must resolve to the dans-blog project",
  );
const projectId = projects.data[0].id;
const records: Array<{ key: string; record: Record<string, any> }> =
  readFileSync("reports/translations-log.jsonl", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => ({ key: scoreRecordHash(line), record: JSON.parse(line) }))
    .filter(({ record }) => record.event === "translation_scored");
const links = new Map<string, ScoreTraceLink>();
const receiptPath = "reports/i18n/cost-observability/score-log-backfill.jsonl";
if (existsSync(receiptPath))
  for (const line of readFileSync(receiptPath, "utf8")
    .split("\n")
    .filter(Boolean)) {
    const r = JSON.parse(line);
    links.set(r.sourceRecordSha256, {
      traceId: r.traceId,
      observationId: r.observationId,
    });
  }
for (const { key, record } of records)
  if (typeof record.langfuseTraceId === "string")
    links.set(key, {
      traceId: record.langfuseTraceId,
      observationId: record.langfuseObservationId,
    });

// Validate historical links against actual destination trace IDs.
const available = new Set<string>();
async function listTraces(query: string): Promise<any[]> {
  const traces: any[] = [];
  for (let page = 1; ; page++) {
    const result = await get(`traces?limit=100&page=${page}&${query}`);
    traces.push(...result.data);
    if (page >= result.meta.totalPages) return traces;
  }
}
for (const t of await listTraces("tags=i18n-score")) available.add(t.id);
const missing = records.filter(({ key }) => !links.has(key));
const recovered: Array<Record<string, unknown>> = [];
if (missing.length) {
  const times = missing
    .map(({ record: r }) => Date.parse(r.at) - r.durationMs)
    .filter(Number.isFinite);
  if (!times.length)
    throw new Error(
      "Unlinked scores lack valid timestamps/durations; provide explicit trace IDs",
    );
  const from = new Date(Math.min(...times) - 10000).toISOString();
  const candidates = await listTraces(
    `fromTimestamp=${encodeURIComponent(from)}`,
  );
  for (const { key, record: r } of missing) {
    const matched = candidates.filter((t) => {
      const argv =
        t.metadata?.resourceAttributes?.["process.command_args"] ?? [];
      const option = (name: string) => argv[argv.indexOf(name) + 1];
      return (
        t.name ===
          `invoke_agent ${r.judgeModel.replace(/^openrouter\//, "")}` &&
        argv.includes("--slug") &&
        option("--slug") === r.slug &&
        ((argv.includes("--locales") && option("--locales") === r.locale) ||
          (argv.includes("--locale") && option("--locale") === r.locale)) &&
        Math.abs(Date.parse(t.timestamp) - (Date.parse(r.at) - r.durationMs)) <
          3000
      );
    });
    if (matched.length !== 1) continue;
    const trace = await get(`traces/${matched[0].id}`);
    const generations = trace.observations.filter(
      (o: any) => o.type === "GENERATION",
    );
    const link = {
      traceId: trace.id,
      ...(generations.length === 1 ? { observationId: generations[0].id } : {}),
    };
    links.set(key, link);
    available.add(trace.id);
    recovered.push({
      sourceRecordSha256: key,
      ...link,
      matchBasis:
        "unique model, exact CLI slug/locale, and start within 3 seconds",
    });
  }
}
// Newly logged explicit IDs may not have the historical tag.
for (const { key, record } of records) {
  const link = links.get(key);
  if (record.langfuseTraceId && link && !available.has(link.traceId)) {
    await get(`traces/${link.traceId}`);
    available.add(link.traceId);
  }
}
const dir = "reports/i18n/cost-observability";
const checkpoint = `${dir}/score-projection-${projectId}.json`;
const completed: Record<string, number> = existsSync(checkpoint)
  ? JSON.parse(readFileSync(checkpoint, "utf8")).completed
  : {};
const summary = {
  projectId,
  apply,
  sourceRecords: records.length,
  recoveredLinks: recovered.length,
  alreadyProjected: 0,
  projectedRecords: 0,
  scores: 0,
  unlinked: 0,
};
const pending: Array<{
  key: string;
  scores: ReturnType<typeof projectTranslationScores>;
}> = [];
for (const { key, record } of records) {
  if (completed[key] !== undefined) {
    summary.alreadyProjected++;
    continue;
  }
  const link = links.get(key);
  if (!link || !available.has(link.traceId)) {
    summary.unlinked++;
    continue;
  }
  pending.push({ key, scores: projectTranslationScores(record, link, key) });
}
for (let offset = 0; offset < pending.length; offset += 25) {
  const batch = pending.slice(offset, offset + 25);
  const scores = batch.flatMap((item) => item.scores);
  if (apply) {
    await sendTranslationScores(scores, new Date().toISOString());
    for (const item of batch) completed[item.key] = item.scores.length;
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      checkpoint,
      JSON.stringify({ projectId, completed }, null, 2) + "\n",
    );
  }
  summary.projectedRecords += batch.length;
  summary.scores += scores.length;
  if (apply && offset % 500 === 0)
    console.log(
      `Projected ${summary.projectedRecords}/${pending.length} records`,
    );
}
if (apply) {
  writeFileSync(
    `${dir}/score-native-links.json`,
    JSON.stringify(recovered, null, 2) + "\n",
  );
  writeFileSync(
    `${dir}/${summary.projectedRecords ? "score-projection-summary" : "score-projection-last-run"}.json`,
    JSON.stringify(
      { ...summary, completedAt: new Date().toISOString() },
      null,
      2,
    ) + "\n",
  );
}
console.log(JSON.stringify(summary, null, 2));
