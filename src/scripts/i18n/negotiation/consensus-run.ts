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
import { writeRecords, readRecord } from "./records.ts";
import { extractJsonObject } from "../judge-utils.ts";
const [snapshotArg, outArg, policyArg, refsArg] = process.argv.slice(2);
if (!snapshotArg || !outArg || !policyArg || !refsArg)
  throw Error(
    "Usage: bun consensus-run.ts SNAPSHOT_JSON NEW_RUN_DIR POLICY_JSON REFERENCES_JSON [--prepare-only]",
  );
const out = resolve(outArg),
  snapshot = JSON.parse(readFileSync(snapshotArg, "utf8")),
  policy = policySchema.parse(JSON.parse(readFileSync(policyArg, "utf8"))),
  references = JSON.parse(readFileSync(refsArg, "utf8"));
if (
  !["es", "ja"].includes(snapshot.locale) ||
  hash(snapshot.source) !== snapshot.sourceHash ||
  hash(snapshot.target) !== snapshot.targetHash
)
  throw Error("Invalid frozen snapshot");
if (
  !Array.isArray(references) ||
  references.some((r) => !r.id || r.verified !== true)
)
  throw Error("Only checked reference records can enter evidence packet");
const actors = [
  { model: "openai/gpt-6-sol" },
  { model: "anthropic/claude-opus-5.5" },
  { model: "openai/gpt-6-astra" },
  { model: "anthropic/claude-fable-5.1" },
];
const identity = {
  protocol: "issue-consensus-v2",
  severityScale: "1-5",
  snapshotHash: hash(JSON.stringify(snapshot)),
  policy,
  referencesHash: hash(JSON.stringify(references)),
  actors,
};
mkdirSync(join(out, "calls"), { recursive: true });
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
// One append-only event stream per execution attempt; retries never erase history.
const events = join(out, "events-" + Date.now() + ".jsonl");
let latestCandidate = snapshot.target;
const result = await negotiateConsensus(
  { ...snapshot, policy, actors, references, history: snapshot.history ?? [] },
  {
    emit: (event) => {
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
      const prefix = join(out, "calls", key.replaceAll("/", "--")),
        outputSchema = z.toJSONSchema(schema);
      const request = { key, actor, system, payload, outputSchema },
        fingerprint = hash(JSON.stringify(request));
      if (existsSync(prefix + "-parsed.jsonl")) {
        const cached = readRecord(prefix + "-parsed.json");
        if (cached.fingerprint !== fingerprint)
          throw Error("Cache identity mismatch");
        return schema.parse(cached.value);
      }
      if (existsSync(prefix + "-request.jsonl"))
        throw Error(
          "Prior incomplete attempt retained; inspect before retrying",
        );
      writeRecords(prefix + "-request.jsonl", [{ fingerprint, ...request }]);
      const text = await runCli(
        actor.model.startsWith("openai/") ? "codex" : "claude",
        { model: actor.model, effort: "high" },
        system +
          "\n" +
          JSON.stringify(payload) +
          "\nOUTPUT SCHEMA\n" +
          JSON.stringify(outputSchema),
        outputSchema,
        prefix,
      );
      writeRecords(prefix + "-raw.jsonl", [{ fingerprint, text }]);
      const json = extractJsonObject(text);
      if (!json) throw Error("No JSON response");
      const value = schema.parse(JSON.parse(json));
      writeRecords(prefix + "-parsed.jsonl", [{ fingerprint, value }]);
      return value;
    },
  },
).catch((error) => {
  const failure = {
    status: "needs-attention",
    reason: "execution-failure",
    error: String(error),
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
