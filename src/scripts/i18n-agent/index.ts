#!/usr/bin/env bun
import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { table, truncate, ui } from "../i18n/terminal-ui.ts";
import {
  createTranslationAgentRuntime,
  DEFAULT_AGENT_MODEL,
  DEFAULT_AGENT_TIMEOUT_SECONDS,
  DEFAULT_JUDGE_MODEL,
  DEFAULT_MAX_AGENT_STEPS,
  DEFAULT_SECOND_JUDGE_MODEL,
  DEFAULT_TRANSLATION_MODEL,
} from "./runtime.ts";

type CliArgs = {
  prompt?: string;
  interactive: boolean;
  thread: string;
  resource: string;
  dryRun: boolean;
  maxSteps: number;
  agentTimeoutSeconds: number;
  agentModel: string;
  translationModel: string;
  translationModels: string[];
  judgeModel: string;
  judgeModels: string[];
  escalationJudgeModels: string[];
};

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const runId = createRunId();
  const runtime = await createTranslationAgentRuntime({
    threadId: args.thread,
    resourceId: args.resource,
    runId,
    dryRun: args.dryRun,
    maxSteps: args.maxSteps,
    agentModel: args.agentModel,
    translationModel: args.translationModel,
    translationModels: args.translationModels,
    judgeModel: args.judgeModel,
    judgeModels: args.judgeModels,
    escalationJudgeModels: args.escalationJudgeModels,
  });

  printHeader(args, runId);

  if (args.interactive) {
    await runThread(runtime.translationAgent, args);
    return;
  }

  if (args.prompt == null || args.prompt.trim() === "") {
    throw new Error("Provide a prompt argument, or omit --once to use the default interactive thread.");
  }

  const response = await generate(runtime.translationAgent, args.prompt, args);
  printAgentResponse(response.text);
}

async function runThread(agent: Awaited<ReturnType<typeof createTranslationAgentRuntime>>["translationAgent"], args: CliArgs) {
  const rl = createInterface({ input, output });
  let closing = false;
  const closeRepl = () => {
    closing = true;
    rl.close();
  };
  rl.on("SIGINT", closeRepl);
  process.once("SIGINT", closeRepl);
  try {
    console.log("");
    console.log(ui.info("Interactive thread is ready."));
    console.log(ui.dim("Exit with Ctrl-C or Ctrl-D. Memory is scoped to the thread/resource shown above."));
    if (args.prompt != null && args.prompt.trim() !== "") {
      await runPromptTurn(agent, args.prompt, args);
    }
    while (!closing) {
      const answer = await questionUntilClosed(rl, `\n${ui.title("i18n-agent")} ${ui.dim(args.thread)}> `);
      if (answer == null) break;
      const prompt = answer.trim();
      if (prompt === "") continue;
      if (prompt === "/exit" || prompt === "/quit") break;
      await runPromptTurn(agent, prompt, args);
    }
  } finally {
    process.off("SIGINT", closeRepl);
    rl.off("SIGINT", closeRepl);
    if (!closing) {
      rl.close();
    }
  }
}

async function runPromptTurn(
  agent: Awaited<ReturnType<typeof createTranslationAgentRuntime>>["translationAgent"],
  prompt: string,
  args: CliArgs,
) {
  const response = await generate(agent, prompt, args);
  printAgentResponse(response.text);
}

function questionUntilClosed(rl: ReturnType<typeof createInterface>, query: string): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const onClose = () => resolve(undefined);
    rl.once("close", onClose);
    rl.question(query).then((answer) => {
      rl.off("close", onClose);
      resolve(answer);
    }, (error) => {
      rl.off("close", onClose);
      if (isReadlineClosedError(error)) {
        resolve(undefined);
        return;
      }
      reject(error);
    });
  });
}

function isReadlineClosedError(error: unknown) {
  return error instanceof Error && (
    error.message.includes("readline was closed")
    || error.message.includes("closed")
    || error.name === "AbortError"
  );
}

async function generate(
  agent: Awaited<ReturnType<typeof createTranslationAgentRuntime>>["translationAgent"],
  prompt: string,
  args: CliArgs,
) {
  return withTimeout(agent.generate(prompt, {
    memory: {
      thread: args.thread,
      resource: args.resource,
    },
    maxSteps: args.maxSteps,
    onIterationComplete: ({ iteration, toolCalls, isFinal }) => {
      if (toolCalls.length > 0) {
        printToolStep(iteration, toolCalls);
      } else if (isFinal) {
        console.log(`${ui.good("step")} ${ui.title(String(iteration))} ${ui.dim("final response")}`);
      }
    },
  }), args.agentTimeoutSeconds * 1000, `Agent turn timed out after ${args.agentTimeoutSeconds}s. The last printed step may be a completed tool call; the wait is usually the next model response.`);
}

export function parseCliArgs(argv: string[]): CliArgs {
  const options = new Map<string, string | true>();
  const positional: string[] = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }

    const equalsIndex = arg.indexOf("=");
    const key = equalsIndex === -1 ? arg.slice(2) : arg.slice(2, equalsIndex);
    const inlineValue = equalsIndex === -1 ? undefined : arg.slice(equalsIndex + 1);
    const next = argv[i + 1];
    if (booleanOptions.has(key)) {
      options.set(key, true);
    } else if (inlineValue != null) {
      options.set(key, inlineValue);
    } else if (next != null && !next.startsWith("--")) {
      options.set(key, next);
      i += 1;
    } else {
      options.set(key, true);
    }
  }

  const prompt = positional.join(" ").trim() || undefined;
  const once = options.get("once") === true;
  const explicitInteractive =
    options.get("thread-mode") === true
    || options.get("repl") === true
    || options.get("interactive") === true;

  const explicitTranslationModel = stringOption(options, "translation-model") ?? process.env.I18N_TRANSLATION_MODEL;
  const parsedTranslationModels = listOption(options, "translation-models")
    ?? listEnv("I18N_TRANSLATION_MODELS");
  const translationModel = explicitTranslationModel
    ?? parsedTranslationModels?.[0]
    ?? DEFAULT_TRANSLATION_MODEL;
  const translationModels = parsedTranslationModels == null
    ? [translationModel]
    : uniqueNonEmpty(explicitTranslationModel == null
      ? parsedTranslationModels
      : [explicitTranslationModel, ...parsedTranslationModels]);

  return {
    prompt,
    interactive: explicitInteractive || !once,
    thread: stringOption(options, "thread") ?? "default",
    resource: stringOption(options, "resource") ?? "dan-blog-i18n",
    dryRun: options.get("dry-run") === true,
    maxSteps: parsePositiveInteger(
      stringOption(options, "max-steps") ?? process.env.I18N_AGENT_MAX_STEPS,
      DEFAULT_MAX_AGENT_STEPS,
      "max-steps",
    ),
    agentTimeoutSeconds: parsePositiveInteger(
      stringOption(options, "agent-timeout-seconds") ?? process.env.I18N_AGENT_TIMEOUT_SECONDS,
      DEFAULT_AGENT_TIMEOUT_SECONDS,
      "agent-timeout-seconds",
    ),
    agentModel: stringOption(options, "agent-model") ?? process.env.I18N_AGENT_MODEL ?? DEFAULT_AGENT_MODEL,
    translationModel,
    translationModels,
    judgeModel: stringOption(options, "judge-model") ?? process.env.I18N_JUDGE_MODEL ?? DEFAULT_JUDGE_MODEL,
    judgeModels: listOption(options, "judge-models")
      ?? listOption(options, "models")
      ?? listEnv("I18N_JUDGE_MODELS")
      ?? [
        stringOption(options, "judge-model") ?? process.env.I18N_JUDGE_MODEL ?? DEFAULT_JUDGE_MODEL,
        DEFAULT_SECOND_JUDGE_MODEL,
      ],
    escalationJudgeModels: listOption(options, "escalation-judge-models")
      ?? listEnv("I18N_ESCALATION_JUDGE_MODELS")
      ?? [],
  };
}

const booleanOptions = new Set([
  "dry-run",
  "interactive",
  "once",
  "repl",
  "thread-mode",
]);

type ToolCallSummary = {
  name?: string;
  toolName?: string;
  args?: unknown;
  input?: unknown;
};

function printHeader(args: CliArgs, runId: string) {
  console.log(ui.title("TranslationAgent"));
  console.log(table(["Field", "Value"], [
    ["Run", ui.path(runId)],
    ["Mode", args.interactive ? ui.good("interactive thread") : ui.info("one-shot")],
    ["Thread", args.thread],
    ["Resource", args.resource],
    ["Dry run", args.dryRun ? ui.warn("yes") : "no"],
    ["Max steps", String(args.maxSteps)],
    ["Agent timeout", `${args.agentTimeoutSeconds}s`],
    ["Agent model", ui.model(args.agentModel)],
    ["Translation model", ui.model(args.translationModel)],
    ["Translation models", args.translationModels.map(ui.model).join(", ")],
    ["Judge models", args.judgeModels.map(ui.model).join(", ")],
    ["Escalation judges", args.escalationJudgeModels.length === 0
      ? ui.dim("none")
      : args.escalationJudgeModels.map(ui.model).join(", ")],
  ]));
}

function printToolStep(iteration: number, toolCalls: ToolCallSummary[]) {
  const rows = toolCalls.map((call, index) => [
    String(index + 1),
    ui.info(call.name ?? call.toolName ?? "tool"),
    summarizeToolInput(call.args ?? call.input),
  ]);
  console.log("");
  console.log(`${ui.good("step")} ${ui.title(String(iteration))} ${ui.dim("tool calls")}`);
  console.log(table(["#", "Tool", "Input"], rows));
}

function summarizeToolInput(value: unknown) {
  if (value == null) return ui.dim("-");
  if (typeof value === "string") return truncate(value, 72);
  if (typeof value !== "object") return truncate(String(value), 72);

  const record = value as Record<string, unknown>;
  const interesting = ["slug", "locale", "model", "candidatePath", "current", "limit"];
  const pairs = interesting
    .filter((key) => record[key] != null)
    .map((key) => `${key}=${formatValue(record[key])}`);
  const summary = pairs.length > 0 ? pairs.join(" ") : JSON.stringify(value);
  return truncate(summary, 92);
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(formatValue).join(",")}]`;
  if (typeof value === "string") return value;
  return String(value);
}

function printAgentResponse(text: string) {
  console.log("");
  console.log(ui.title("Response"));
  console.log(styleMarkdown(text.trim()));
}

function styleMarkdown(text: string) {
  let inFence = false;
  return text.split(/\r?\n/).map((line) => {
    if (line.startsWith("```")) {
      inFence = !inFence;
      return ui.dim(line);
    }
    if (inFence) return ui.path(line);
    if (/^#{1,6}\s+/.test(line)) return ui.info(ui.title(line.replace(/^#{1,6}\s+/, "")));
    if (/^\s*[-*]\s+/.test(line)) return line.replace(/^(\s*)([-*])(\s+)/, (_, indent, marker, space) =>
      `${indent}${ui.info(marker)}${space}`
    );
    if (/^\s*\d+\.\s+/.test(line)) return line.replace(/^(\s*)(\d+\.)(\s+)/, (_, indent, marker, space) =>
      `${indent}${ui.info(marker)}${space}`
    );
    if (/^\|.*\|$/.test(line)) return ui.dim(line);
    return line;
  }).join("\n");
}

function stringOption(options: Map<string, string | true>, key: string) {
  const value = options.get(key);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function listOption(options: Map<string, string | true>, key: string) {
  const value = stringOption(options, key);
  return value == null ? undefined : splitList(value);
}

function listEnv(key: string) {
  const value = process.env[key];
  return value == null || value.trim() === "" ? undefined : splitList(value);
}

function parsePositiveInteger(value: string | undefined, fallback: number, label: string) {
  if (value == null) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`--${label} must be a positive integer. Received: ${value}`);
  }
  return parsed;
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => {
    if (timer != null) clearTimeout(timer);
  });
}

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function uniqueNonEmpty(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function createRunId() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
