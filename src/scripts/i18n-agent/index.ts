#!/usr/bin/env bun
import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  createTranslationAgentRuntime,
  DEFAULT_AGENT_MODEL,
  DEFAULT_JUDGE_MODEL,
  DEFAULT_TRANSLATION_MODEL,
} from "./runtime.ts";

type CliArgs = {
  prompt?: string;
  repl: boolean;
  thread: string;
  resource: string;
  dryRun: boolean;
  agentModel: string;
  translationModel: string;
  judgeModel: string;
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
  });

  console.log(`TranslationAgent run ${runId}`);
  console.log(`Thread: ${args.thread} | Resource: ${args.resource}${args.dryRun ? " | dry-run" : ""}`);

  if (args.repl) {
    await runRepl(runtime.translationAgent, args);
    return;
  }

  if (args.prompt == null || args.prompt.trim() === "") {
    throw new Error("Provide a prompt argument or use --repl.");
  }

  const response = await generate(runtime.translationAgent, args.prompt, args);
  console.log(response.text);
}

async function runRepl(agent: Awaited<ReturnType<typeof createTranslationAgentRuntime>>["translationAgent"], args: CliArgs) {
  const rl = createInterface({ input, output });
  try {
    while (true) {
      const prompt = (await rl.question("\ni18n-agent> ")).trim();
      if (prompt === "" || prompt === "/exit" || prompt === "/quit") break;
      const response = await generate(agent, prompt, args);
      console.log(`\n${response.text}`);
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
        const names = toolCalls.map((call) => call.name).filter(Boolean).join(", ");
        console.log(`step ${iteration}: ${names}`);
      } else if (isFinal) {
        console.log(`step ${iteration}: final`);
      }
    },
  });
}

function parseCliArgs(argv: string[]): CliArgs {
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
    if (inlineValue != null) {
      options.set(key, inlineValue);
    } else if (next != null && !next.startsWith("--")) {
      options.set(key, next);
      i += 1;
    } else {
      options.set(key, true);
    }
  }

  return {
    prompt: positional.join(" ").trim() || undefined,
    repl: options.get("repl") === true,
    thread: stringOption(options, "thread") ?? "default",
    resource: stringOption(options, "resource") ?? "dan-blog-i18n",
    dryRun: options.get("dry-run") === true,
    agentModel: stringOption(options, "agent-model") ?? process.env.I18N_AGENT_MODEL ?? DEFAULT_AGENT_MODEL,
    translationModel: stringOption(options, "translation-model")
      ?? process.env.I18N_TRANSLATION_MODEL
      ?? DEFAULT_TRANSLATION_MODEL,
    judgeModel: stringOption(options, "judge-model") ?? process.env.I18N_JUDGE_MODEL ?? DEFAULT_JUDGE_MODEL,
  };
}

function stringOption(options: Map<string, string | true>, key: string) {
  const value = options.get(key);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
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
