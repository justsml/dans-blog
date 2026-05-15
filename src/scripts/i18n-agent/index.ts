#!/usr/bin/env bun
import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { table, truncate, ui } from "../i18n/terminal-ui.ts";
import {
  createTranslationAgentRuntime,
  DEFAULT_AGENT_MODEL,
  DEFAULT_JUDGE_MODEL,
  DEFAULT_SECOND_JUDGE_MODEL,
  DEFAULT_TRANSLATION_MODEL,
} from "./runtime.ts";

type CliArgs = {
  prompt?: string;
  interactive: boolean;
  thread: string;
  resource: string;
  dryRun: boolean;
  agentModel: string;
  translationModel: string;
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
    agentModel: args.agentModel,
    translationModel: args.translationModel,
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
  try {
    console.log("");
    console.log(ui.info("Interactive thread is ready."));
    console.log(ui.dim("Commands: /exit or /quit to leave. Memory is scoped to the thread/resource shown above."));
    while (true) {
      const prompt = (await rl.question(`\n${ui.title("i18n-agent")} ${ui.dim(args.thread)}> `)).trim();
      if (prompt === "" || prompt === "/exit" || prompt === "/quit") break;
      const response = await generate(agent, prompt, args);
      printAgentResponse(response.text);
    }
  } finally {
    rl.close();
  }
}

async function generate(
  agent: Awaited<ReturnType<typeof createTranslationAgentRuntime>>["translationAgent"],
  prompt: string,
  args: CliArgs,
) {
  return agent.generate(prompt, {
    memory: {
      thread: args.thread,
      resource: args.resource,
    },
    maxSteps: 12,
    onIterationComplete: ({ iteration, toolCalls, isFinal }) => {
      if (toolCalls.length > 0) {
        printToolStep(iteration, toolCalls);
      } else if (isFinal) {
        console.log(`${ui.good("step")} ${ui.title(String(iteration))} ${ui.dim("final response")}`);
      }
    },
  });
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

    const [key, inlineValue] = arg.slice(2).split("=", 2);
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

  return {
    prompt,
    interactive: explicitInteractive || (prompt == null && !once),
    thread: stringOption(options, "thread") ?? "default",
    resource: stringOption(options, "resource") ?? "dan-blog-i18n",
    dryRun: options.get("dry-run") === true,
    agentModel: stringOption(options, "agent-model") ?? process.env.I18N_AGENT_MODEL ?? DEFAULT_AGENT_MODEL,
    translationModel: stringOption(options, "translation-model")
      ?? process.env.I18N_TRANSLATION_MODEL
      ?? DEFAULT_TRANSLATION_MODEL,
    judgeModel: stringOption(options, "judge-model") ?? process.env.I18N_JUDGE_MODEL ?? DEFAULT_JUDGE_MODEL,
    judgeModels: listOption(options, "judge-models")
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
    ["Agent model", ui.model(args.agentModel)],
    ["Translation model", ui.model(args.translationModel)],
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

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
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
