import { readFileSync, readdirSync, existsSync, appendFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { startObservation } from "@langfuse/tracing";
import { traceNegotiation, nativeUsage } from "./langfuse.ts";
import { hash } from "./protocol.ts";
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
const calls = join(dir, "calls");
const files = readdirSync(calls).filter(
  (f) =>
    f.endsWith("-request.jsonl") &&
    existsSync(join(calls, f.replace("-request.jsonl", "-cli-exit.jsonl"))),
);
const eventFiles = readdirSync(dir).filter((f) => /^events-.*\.jsonl$/.test(f));
const fingerprint = hash(
  JSON.stringify([
    ...files.map((f) => [f, hash(readFileSync(join(calls, f), "utf8"))]),
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
    for (const file of files) {
      const prefix = join(calls, file.replace("-request.jsonl", ""));
      const request = rows(join(calls, file))[0];
      const invocation = rows(prefix + "-cli-invocation.jsonl")[0];
      const exit = rows(prefix + "-cli-exit.jsonl")[0];
      const output = existsSync(prefix + "-parsed.jsonl")
        ? rows(prefix + "-parsed.jsonl")[0].value
        : existsSync(prefix + "-raw.jsonl")
          ? rows(prefix + "-raw.jsonl")[0].text
          : { unavailable: true, exit };
      const stdout = existsSync(prefix + "-cli-stdout.txt")
        ? readFileSync(prefix + "-cli-stdout.txt", "utf8")
        : "";
      startObservation(
        request.key,
        {
          model: request.actor.model,
          input: request,
          output,
          metadata: {
            backfill: true,
            receiptPrefix: prefix,
            originalTimingUnavailable: true,
            invocation,
            exit,
          },
          ...nativeUsage(invocation.backend, stdout),
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
      importedCalls: files.length,
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
    importedCalls: files.length,
    backfill: true,
  }),
);
