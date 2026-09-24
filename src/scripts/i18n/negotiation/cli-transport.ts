import { traceCli } from "./langfuse.ts";
import { writeRecords } from "./records.ts";
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

export type CliBackend = "claude" | "codex" | "opencode";
export type CliActor = { model: string; effort: string };
export function cliCommand(
  backend: CliBackend,
  actor: CliActor,
  dir: string,
  schema: unknown,
) {
  const model = actor.model.replace(/^(openai|anthropic)\//, "");
  if (backend === "claude")
    return [
      "claude",
      "--print",
      "--output-format",
      "json",
      "--model",
      model.replace(/(\d)\.(\d)/g, "$1-$2"),
      "--effort",
      actor.effort,
      "--tools",
      "",
      "--strict-mcp-config",
      "--safe-mode",
      "--no-session-persistence",
      "--json-schema",
      JSON.stringify(schema),
    ];
  if (backend === "codex")
    return [
      "codex",
      "exec",
      "--ignore-user-config",
      "--ephemeral",
      "--skip-git-repo-check",
      "--sandbox",
      "read-only",
      "--model",
      model,
      "-c",
      "model_reasoning_effort=" + JSON.stringify(actor.effort),
      "--json",
      "--output-schema",
      join(dir, "schema.json"),
      "--output-last-message",
      join(dir, "answer.json"),
      "-",
    ];
  return [
    "opencode",
    "run",
    "--pure",
    "--format",
    "json",
    "--model",
    "openrouter/" + actor.model,
    "--variant",
    actor.effort,
  ];
}
export function cliAnswer(
  backend: CliBackend,
  stdout: string,
  answer?: string,
): string {
  if (backend === "codex") {
    if (!answer?.trim()) throw Error("Codex did not write a final answer");
    return answer;
  }
  if (backend === "claude") {
    const envelope = JSON.parse(stdout);
    if (envelope.is_error || envelope.subtype?.startsWith("error"))
      throw Error("Claude returned an error result");
    if (envelope.structured_output)
      return JSON.stringify(envelope.structured_output);
    if (typeof envelope.result === "string") return envelope.result;
    throw Error("Claude returned no structured result");
  }
  const events = stdout
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  if (events.some((e) => e.type === "error"))
    throw Error("OpenCode returned an error event");
  const text = events
    .filter((e) => e.type === "text")
    .map((e) => e.part?.text ?? "")
    .join("");
  if (!text.trim()) throw Error("OpenCode returned no final text");
  return text;
}
/** A fresh subprocess per role/round; only the coordinator can apply changes. */
async function runCliUntraced(
  backend: CliBackend,
  actor: CliActor,
  prompt: string,
  schema: unknown,
  receiptPrefix: string,
  timeoutMs = 240000,
) {
  // CLI validators lag Zod's draft identifier; schema keywords remain unchanged.
  const { $schema: _dialect, ...cliSchema } = schema as Record<string, unknown>;
  schema = cliSchema;
  const dir = mkdtempSync(join(tmpdir(), "translation-negotiation-"));
  writeFileSync(join(dir, "schema.json"), JSON.stringify(schema));
  const command = cliCommand(backend, actor, dir, schema);
  writeRecords(receiptPrefix + "-cli-invocation.jsonl", [
    {
      backend,
      command,
      cwd: dir,
      timeoutMs,
      requestedMaxOutputTokens: 24000,
      outputTokenLimitEnforced: backend === "claude",
      contextMode: "frozen-inline-packet",
      session: "fresh",
    },
  ]);
  const env = {
    ...process.env,
    CLAUDE_CODE_MAX_OUTPUT_TOKENS: "24000",
    OPENCODE_CONFIG_CONTENT: JSON.stringify({ permission: { "*": "deny" } }),
  };
  const result = await new Promise<{
    stdout: string;
    stderr: string;
    code: number | null;
    timedOut: boolean;
  }>((resolve, reject) => {
    const child = spawn(command[0]!, command.slice(1), {
      cwd: dir,
      env,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "",
      stderr = "",
      timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
    }, timeoutMs);
    const killTimer = setTimeout(() => child.kill("SIGKILL"), timeoutMs + 5000);
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.stdin.on("error", () => {});
    child.on("error", (error) => {
      clearTimeout(timer);
      clearTimeout(killTimer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      clearTimeout(killTimer);
      resolve({ stdout, stderr, code, timedOut });
    });
    child.stdin.end(prompt);
  });
  writeFileSync(receiptPrefix + "-cli-stdout.txt", result.stdout);
  writeFileSync(receiptPrefix + "-cli-stderr.txt", result.stderr);
  writeRecords(receiptPrefix + "-cli-exit.jsonl", [
    { code: result.code, timedOut: result.timedOut },
  ]);
  if (result.code !== 0 || result.timedOut)
    throw Error(backend + " failed; inspect CLI receipts");
  const answerPath = join(dir, "answer.json");
  return cliAnswer(
    backend,
    result.stdout,
    existsSync(answerPath) ? readFileSync(answerPath, "utf8") : undefined,
  );
}

export async function runCli(
  backend: CliBackend,
  actor: CliActor,
  prompt: string,
  schema: unknown,
  receiptPrefix: string,
  timeoutMs = 240000,
) {
  return traceCli({ backend, actor, prompt, schema, receiptPrefix }, () =>
    runCliUntraced(backend, actor, prompt, schema, receiptPrefix, timeoutMs),
  );
}
