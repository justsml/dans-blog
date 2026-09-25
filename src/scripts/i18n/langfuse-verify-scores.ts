// Read-only remote audit: compare every saved metric against its projected Score.
import { readFileSync, writeFileSync } from "node:fs";
import {
  langfuseConnection,
  projectTranslationScores,
  scoreRecordHash,
} from "./langfuse-score-projection.ts";
const c = langfuseConnection();
if (!c) throw new Error("Langfuse credentials and base URL required");
const { base, headers } = c;
async function get(path: string) {
  const r = await fetch(base + "/api/public/" + path, {
    headers,
    signal: AbortSignal.timeout(30000),
  });
  if (!r.ok) throw Error(String(r.status));
  return r.json();
}
const links = new Map<string, any>();
for (const l of readFileSync(
  "reports/i18n/cost-observability/score-log-backfill.jsonl",
  "utf8",
)
  .trim()
  .split("\n")) {
  const r = JSON.parse(l);
  links.set(r.sourceRecordSha256, r);
}
for (const r of JSON.parse(
  readFileSync(
    "reports/i18n/cost-observability/score-native-links.json",
    "utf8",
  ),
))
  links.set(r.sourceRecordSha256, r);
const expected = new Map<string, any>();
for (const line of readFileSync("reports/translations-log.jsonl", "utf8")
  .trim()
  .split("\n")) {
  const r = JSON.parse(line);
  if (r.event !== "translation_scored") continue;
  const key = scoreRecordHash(line),
    l = r.langfuseTraceId
      ? { traceId: r.langfuseTraceId, observationId: r.langfuseObservationId }
      : links.get(key);
  if (!l) throw Error("Missing trace link for " + key);
  for (const s of projectTranslationScores(
    r,
    { traceId: l.traceId, observationId: l.observationId },
    key,
  ))
    expected.set(s.id, s);
}
const project = await get("projects");
if (project.data.length !== 1 || project.data[0].name !== "dans-blog")
  throw new Error("Expected dans-blog Langfuse project");
const first = await get("v2/scores?limit=100&page=1");
const found = new Map<string, any>(first.data.map((s: any) => [s.id, s]));
for (let page = 2; page <= first.meta.totalPages; page += 6) {
  const results = await Promise.all(
    Array.from(
      { length: Math.min(6, first.meta.totalPages - page + 1) },
      (_, i) => get(`v2/scores?limit=100&page=${page + i}`),
    ),
  );
  for (const d of results) for (const s of d.data) found.set(s.id, s);
}
let mismatches = 0;
const missing = [];
for (const [id, s] of expected) {
  const r = found.get(id);
  if (!r) {
    missing.push(id);
    continue;
  }
  const value = s.dataType === "CATEGORICAL" ? r.stringValue : r.value;
  if (
    value !== s.value ||
    r.traceId !== s.traceId ||
    r.observationId !== s.observationId
  )
    mismatches++;
}
const result = {
  verifiedAt: new Date().toISOString(),
  projectId: project.data[0].id,
  expectedScores: expected.size,
  uniqueScoresRead: found.size,
  apiReportedTotal: first.meta.totalItems,
  missingScores: missing.length,
  mismatches,
  traceCount: (await get("traces?limit=1")).meta.totalItems,
  note: "Compared every deterministic score ID, value, trace ID and observation ID against the saved source. Verification uses enumerated unique IDs rather than the API aggregate count.",
};
writeFileSync(
  "reports/i18n/cost-observability/score-projection-verification.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(result);
if (missing.length || mismatches) process.exitCode = 1;
