import { readFileSync, readdirSync, existsSync, appendFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { startObservation } from "@langfuse/tracing";
import { traceNegotiation, nativeUsage } from "./langfuse.ts";
import { hash } from "./protocol.ts";
import { CallLog } from "./call-log.ts";
const dir = resolve(process.argv[2] ?? "");
if (!process.argv[2] || !existsSync(join(dir, "manifest.json")))
  throw Error("Usage: bun backfill-langfuse.ts RUN_DIRECTORY");
const rows = (path: string) =>
  readFileSync(path, "utf8")
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
const receipt = join(dir, "langfuse-backfill.jsonl");
type CallReceipt = {
  key: string;
  request: any;
  invocation: any;
  exit: { code: number | null; timedOut: boolean };
  stdout: string;
  output: unknown;
  receipt: string;
};
const logPath = join(dir, "calls.jsonl");
const legacyDir = join(dir, "calls");
/** Calls that reached a CLI exit, from the run's call log or legacy per-call files. */
function readCalls(): { calls: CallReceipt[]; sources: string[] } {
  if (existsSync(logPath)) {
    const log = new CallLog(logPath);
    const keys = [...new Set(log.records().map((r) => r.key))];
    const calls = keys.flatMap((key) => {
      const exit = log.latest(key, "exit");
      const request = log.latest(key, "request");
      if (!exit || !request) return [];
      return [
        {
          key,
          request,
          invocation: log.latest(key, "invocation"),
          exit: { code: exit.code as number | null, timedOut: !!exit.timedOut },
          stdout: String(exit.stdout ?? ""),
          output:
            log.latest(key, "parsed")?.value ??
            log.latest(key, "raw")?.text ?? { unavailable: true, exit },
          receipt: logPath + "#" + key,
        },
      ];
    });
    return { calls, sources: [logPath] };
  }
  const files = readdirSync(legacyDir).filter(
    (f) =>
      f.endsWith("-request.jsonl") &&
      existsSync(join(legacyDir, f.replace("-request.jsonl", "-cli-exit.jsonl"))),
  );
  const calls = files.map((file) => {
    const prefix = join(legacyDir, file.replace("-request.jsonl", ""));
    const request = rows(join(legacyDir, file))[0];
    const exit = rows(prefix + "-cli-exit.jsonl")[0];
    return {
      key: request.key,
      request,
      invocation: rows(prefix + "-cli-invocation.jsonl")[0],
      exit,
      stdout: existsSync(prefix + "-cli-stdout.txt")
        ? readFileSync(prefix + "-cli-stdout.txt", "utf8")
        : "",
      output: existsSync(prefix + "-parsed.jsonl")
        ? rows(prefix + "-parsed.jsonl")[0].value
        : existsSync(prefix + "-raw.jsonl")
          ? rows(prefix + "-raw.jsonl")[0].text
          : { unavailable: true, exit },
      receipt: prefix,
    };
  });
  return { calls, sources: files.map((f) => join(legacyDir, f)) };
}
const { calls, sources } = readCalls();
const eventFiles = readdirSync(dir).filter((f) => /^events-.*\.jsonl$/.test(f));
const fingerprint = hash(
  JSON.stringify([
    ...sources.map((f) => [f.slice(dir.length + 1), hash(readFileSync(f, "utf8"))]),
    ...eventFiles.map((f) => [f, hash(readFileSync(join(dir, f), "utf8"))]),
  ]),
);
if (
  existsSync(receipt) &&
  rows(receipt).some(
    (r) => r.fingerprint === fingerprint && r.status === "flushed",
  )
) {
  console.log("This receipt snapshot is already exported");
  process.exit(0);
}
let ids: { traceId: string; observationId: string } | undefined;
await traceNegotiation(
  {
    backfill: true,
    runDirectory: dir,
    manifest: JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")),
    timing: "Import time, not original inference latency",
    fingerprint,
  },
  (value) => {
    ids = value;
    appendFileSync(
      receipt,
      JSON.stringify({ status: "started", fingerprint, ...ids }) + "\n",
    );
  },
  async () => {
    for (const { request, invocation, exit, output, stdout, receipt } of calls) {
      const accounting = nativeUsage(
        invocation.backend,
        stdout,
        request.actor.model,
      );
      startObservation(
        request.key,
        {
          model: request.actor.model,
          input: request,
          output,
          ...accounting,
          metadata: {
            ...accounting.metadata,
            backfill: true,
            receipt,
            originalTimingUnavailable: true,
            invocation,
            exit,
          },
          ...(exit.code !== 0 || exit.timedOut
            ? {
                level: "ERROR" as const,
                statusMessage: "Original CLI execution failed",
              }
            : {}),
        },
        { asType: "generation" },
      ).end();
    }
    for (const file of eventFiles)
      for (const event of rows(join(dir, file)))
        startObservation(
          event.type,
          {
            output: event,
            metadata: {
              backfill: true,
              sourceFile: file,
              originalTimestamp: event.at,
            },
          },
          { asType: "event" },
        ).end();
    return {
      status: existsSync(join(dir, "result.jsonl"))
        ? rows(join(dir, "result.jsonl"))[0].status
        : "in-progress-snapshot",
      importedCalls: calls.length,
      eventFiles: eventFiles.length,
    };
  },
);
appendFileSync(
  receipt,
  JSON.stringify({ status: "flushed", fingerprint, ...ids }) + "\n",
);
console.log(
  JSON.stringify({
    traceId: ids!.traceId,
    importedCalls: calls.length,
    backfill: true,
  }),
);
