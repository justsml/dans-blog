import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, join, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { CallLog, type CallRecord, type CallStage } from "./call-log.ts";

/**
 * Fold a run's legacy calls/ fan-out (7-8 files per model call) into one
 * append-only calls.jsonl, verify every receipt survived, then delete calls/.
 * Langfuse trace-id receipts are dropped; traces live in Langfuse itself.
 */
const dir = resolve(process.argv[2] ?? "");
const legacyDir = join(dir, "calls");
if (!process.argv[2] || !existsSync(join(dir, "manifest.json")))
  throw Error("Usage: bun compact-calls.ts RUN_DIRECTORY");
if (!existsSync(legacyDir)) {
  console.log("No legacy calls/ directory: " + dir);
  process.exit(0);
}
const logPath = join(dir, "calls.jsonl");
if (existsSync(logPath)) throw Error("calls.jsonl already exists: " + logPath);

const suffixes: Array<[string, CallStage | "stdout" | "stderr" | "drop"]> = [
  ["-cli-invocation.jsonl", "invocation"],
  ["-cli-exit.jsonl", "exit"],
  ["-cli-stdout.txt", "stdout"],
  ["-cli-stderr.txt", "stderr"],
  ["-request.jsonl", "request"],
  ["-raw.jsonl", "raw"],
  ["-parsed.jsonl", "parsed"],
  ["-langfuse.jsonl", "drop"],
];
const oneRecord = (path: string) => {
  const rows = readFileSync(path, "utf8").split("\n").filter((l) => l.trim());
  if (rows.length !== 1) throw Error("Expected one record: " + path);
  return JSON.parse(rows[0]!);
};

type Group = { prefix: string; files: Map<string, string> };
const groups = new Map<string, Group>();
for (const file of readdirSync(legacyDir)) {
  const match = suffixes.find(([suffix]) => file.endsWith(suffix));
  if (!match) throw Error("Unrecognized receipt file, not compacting: " + file);
  const prefix = file.slice(0, -match[0].length);
  const group = groups.get(prefix) ?? { prefix, files: new Map() };
  group.files.set(match[1], join(legacyDir, file));
  groups.set(prefix, group);
}

const records: CallRecord[] = [];
const expected: Array<{ key: string; stage: CallStage; field: string; value: unknown }> = [];
const order: CallStage[] = ["request", "invocation", "exit", "raw", "parsed"];
for (const { prefix, files } of groups.values()) {
  const request = files.has("request") ? oneRecord(files.get("request")!) : undefined;
  const key = typeof request?.key === "string" ? request.key : prefix;
  for (const stage of order) {
    const path = files.get(stage);
    if (!path) continue;
    const fields: Record<string, unknown> = oneRecord(path);
    if (stage === "exit") {
      for (const stream of ["stdout", "stderr"] as const) {
        const text = files.get(stream);
        fields[stream] = text ? readFileSync(text, "utf8") : "";
        expected.push({ key, stage, field: stream, value: fields[stream] });
      }
    }
    for (const [field, value] of Object.entries(fields))
      expected.push({ key, stage, field, value });
    records.push({
      ...fields,
      at: statSync(path).mtime.toISOString(),
      key,
      stage,
      compactedFrom: basename(path),
    });
  }
}
records.sort((a, b) => a.at.localeCompare(b.at));
writeFileSync(logPath, records.map((r) => JSON.stringify(r)).join("\n") + "\n");

const log = new CallLog(logPath);
const written = log.records();
if (written.length !== records.length) throw Error("Record count mismatch after compaction");
for (const { key, stage, field, value } of expected) {
  const row = written.find((r) => r.key === key && r.stage === stage);
  if (!row || !isDeepStrictEqual(row[field], value))
    throw Error(`Verification failed for ${key} ${stage}.${field}; calls/ kept`);
}
rmSync(legacyDir, { recursive: true });
const runLangfuse = join(dir, "langfuse.jsonl");
if (existsSync(runLangfuse)) rmSync(runLangfuse);
console.log(
  `Compacted ${groups.size} calls (${records.length} records) → ${logPath}`,
);
