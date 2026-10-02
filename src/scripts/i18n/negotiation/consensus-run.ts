import { traceNegotiation, traceNegotiationEvent } from "./langfuse.ts";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  appendFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { z } from "zod";
import { policySchema } from "./consensus-policy.ts";
import { negotiateConsensus } from "./consensus-engine.ts";
import { validateAdaptive } from "./adaptive-validation.ts";
import { runCli } from "./cli-transport.ts";
import { hash } from "./protocol.ts";
import { writeRecords } from "./records.ts";
import { CallLog } from "./call-log.ts";
import { extractJsonObject } from "../judge-utils.ts";
import { ACTIVE_LOCALES } from "../../../shared/i18n.ts";
const [snapshotArg, outArg, policyArg, refsArg] = process.argv.slice(2);
if (!snapshotArg || !outArg || !policyArg || !refsArg)
  throw Error(
    "Usage: bun consensus-run.ts SNAPSHOT_JSON NEW_RUN_DIR POLICY_JSON REFERENCES_JSON [--prepare-only] [--timeout-seconds N] [--actors a,b,c,d]",
  );
const out = resolve(outArg),
  snapshot = JSON.parse(readFileSync(snapshotArg, "utf8")),
  policy = policySchema.parse(JSON.parse(readFileSync(policyArg, "utf8"))),
  references = JSON.parse(readFileSync(refsArg, "utf8"));
const timeoutFlag = process.argv.indexOf("--timeout-seconds");
const timeoutMs =
  timeoutFlag === -1 ? 240_000 : Number(process.argv[timeoutFlag + 1]) * 1000;
if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
  throw Error("--timeout-seconds must be a positive number");
if (
  !(ACTIVE_LOCALES as readonly string[]).includes(snapshot.locale) ||
  hash(snapshot.source) !== snapshot.sourceHash ||
  hash(snapshot.target) !== snapshot.targetHash
)
  throw Error("Invalid frozen snapshot");
if (
  !Array.isArray(references) ||
  references.some((r) => !r.id || r.verified !== true)
)
  throw Error("Only checked reference records can enter evidence packet");
// Claude models are capped at Opus 5.5 (floor Sonnet 5.5) until Fable is authorized.
const DEFAULT_ACTORS = [
  "openai/gpt-6.1-sol",
  "anthropic/claude-opus-5.5",
  "openai/gpt-6-sol",
  "anthropic/claude-sonnet-5.5",
];
const actorsFlag = process.argv.indexOf("--actors");
const actors = (
  actorsFlag === -1
    ? DEFAULT_ACTORS
    : (process.argv[actorsFlag + 1] ?? "").split(",").filter(Boolean)
).map((model) => {
  if (!/^(openai|anthropic)\//.test(model))
    throw Error("Actors must be openai/ or anthropic/ models: " + model);
  return { model };
});
const identity = {
  protocol: "issue-consensus-v2",
  severityScale: "1-5",
  snapshotHash: hash(JSON.stringify(snapshot)),
  policy,
  referencesHash: hash(JSON.stringify(references)),
  actors,
};
mkdirSync(out, { recursive: true });
if (existsSync(join(out, "calls")))
  throw Error(
    "Legacy calls/ receipts found; run compact-calls.ts on this directory first",
  );
const callLog = new CallLog(join(out, "calls.jsonl"));
const manifest = join(out, "manifest.json");
if (
  existsSync(manifest) &&
  JSON.stringify(JSON.parse(readFileSync(manifest, "utf8")).identity) !==
    JSON.stringify(identity)
)
  throw Error("Run identity changed; use a new directory");
if (!existsSync(manifest)) {
  writeFileSync(
    manifest,
    JSON.stringify({ identity, createdAt: new Date().toISOString() }, null, 2) +
      "\n",
  );
  writeFileSync(
    join(out, "snapshot.json"),
    JSON.stringify(snapshot, null, 2) + "\n",
  );
  writeFileSync(
    join(out, "references.json"),
    JSON.stringify(references, null, 2) + "\n",
  );
}
if (process.argv.includes("--prepare-only")) {
  console.log("Prepared frozen v2 negotiation: " + out);
  process.exit(0);
}
/** Parallel panel calls nest AggregateErrors; String() alone hides every cause. */
function describeError(error: unknown): string {
  return error instanceof AggregateError
    ? error.errors.map(describeError).join("\n")
    : String(error);
}
// One append-only event stream per execution attempt; retries never erase history.
const events = join(out, "events-" + Date.now() + ".jsonl");
let latestCandidate = snapshot.target;
const result = await traceNegotiation(
  { identity },
  () => {},
  () =>
    negotiateConsensus(
      {
        ...snapshot,
        policy,
        actors,
        references,
        history: snapshot.history ?? [],
      },
      {
        emit: (event) => {
          traceNegotiationEvent(event);
          if (event.type === "revision" && typeof event.text === "string")
            latestCandidate = event.text;
          appendFileSync(
            events,
            JSON.stringify({ at: new Date().toISOString(), ...event }) + "\n",
          );
        },
        validate: (candidate) =>
          validateAdaptive(
            snapshot.source,
            candidate,
            snapshot.target,
            snapshot.targetPath,
            snapshot.locale,
            policy,
          ),
        call: async <T>(
          key: string,
          actor: { model: string },
          system: string,
          payload: unknown,
          schema: z.ZodType<T>,
        ) => {
          const outputSchema = z.toJSONSchema(schema);
          const request = { key, actor, system, payload, outputSchema },
            fingerprint = hash(JSON.stringify(request));
          const cached = callLog.latest(key, "parsed");
          if (cached) {
            if (cached.fingerprint !== fingerprint)
              throw Error("Cache identity mismatch");
            traceNegotiationEvent({
              type: "cached-call",
              key,
              model: actor.model,
              fingerprint,
              output: cached.value,
            });
            return schema.parse(cached.value);
          }
          const prior = callLog.records().filter((r) => r.key === key);
          if (prior.length) {
            // A request with no CLI exit means the process was killed mid-call:
            // nothing was answered, so retrying is safe. Anything that exited
            // (error, bad JSON, schema failure) still needs a human look.
            const lastRequest = prior.findLastIndex((r) => r.stage === "request");
            if (prior.slice(lastRequest).some((r) => r.stage !== "request" && r.stage !== "invocation"))
              throw Error(
                "Prior incomplete attempt retained; inspect before retrying",
              );
            traceNegotiationEvent({ type: "interrupted-call-retried", key, model: actor.model });
            appendFileSync(
              events,
              JSON.stringify({ at: new Date().toISOString(), type: "interrupted-call-retried", key }) + "\n",
            );
          }
          callLog.append(key, "request", { fingerprint, ...request });
          // Run-constant context first so every call shares a cacheable prefix;
          // the per-round candidate and per-call task follow.
          const {
            source,
            sourceHash,
            references,
            history,
            candidate,
            candidateHash,
            ...task
          } = payload as Record<string, unknown>;
          const text = await runCli(
            actor.model.startsWith("openai/") ? "codex" : "claude",
            { model: actor.model, effort: actor.model === "openai/gpt-6.1-sol" ? "low" : "high" },
            {
              system:
                system +
                "\nFROZEN RUN CONTEXT (identical for every call in this run)\n" +
                JSON.stringify({ sourceHash, source, references, history }),
              user:
                "CURRENT CANDIDATE\n" +
                JSON.stringify({ candidateHash, candidate }) +
                "\nTASK\n" +
                JSON.stringify(task) +
                "\nOUTPUT SCHEMA\n" +
                JSON.stringify(outputSchema),
            },
            outputSchema,
            { log: callLog, key },
            timeoutMs,
          );
          callLog.append(key, "raw", { fingerprint, text });
          const json = extractJsonObject(text);
          if (!json) throw Error("No JSON response");
          const value = schema.parse(JSON.parse(json));
          callLog.append(key, "parsed", { fingerprint, value });
          return value;
        },
      },
    ),
).catch((error) => {
  const failure = {
    status: "needs-attention",
    reason: "execution-failure",
    error: describeError(error),
    candidate: latestCandidate,
    calls: null,
  };
  appendFileSync(
    events,
    JSON.stringify({
      at: new Date().toISOString(),
      type: "failure",
      ...failure,
    }) + "\n",
  );
  return failure;
});
writeRecords(join(out, "result.jsonl"), [result]);
writeFileSync(join(out, "candidate.mdx"), result.candidate);
console.log(
  JSON.stringify({
    status: result.status,
    candidateHash: hash(result.candidate),
    calls: result.calls,
  }),
);
if (result.status === "needs-attention") process.exitCode = 1;
