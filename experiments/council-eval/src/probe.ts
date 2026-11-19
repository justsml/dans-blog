#!/usr/bin/env bun
// One cheap call per provider and tier, before any real run. Checks three things:
// the CLI's structured output and token usage parse, the model id resolves, and the
// isolated config home really hides the user's skills, memory, and AGENTS.md.
//
//   bun src/probe.ts                    # both providers, both tiers
//   bun src/probe.ts --providers claude

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { type Provider, RUNS_DIR, WS_ROOT, config, list, parseArgs, sh, writeJson } from "./lib";
import { callAgent } from "./providers";

const args = parseArgs(process.argv.slice(2));
const providers = list(args.providers || "claude,codex") as Provider[];
const cfg = config();
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const ws = join(WS_ROOT, `probe-${stamp}`);
mkdirSync(ws, { recursive: true });
await sh(["git", "init", "-q"], { cwd: ws });

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["model", "instructions", "skills"],
  properties: {
    model: { type: "string" },
    instructions: { type: "array", items: { type: "string" }, description: "Every instruction file, memory, or custom guidance in your context besides this message, by name or path." },
    skills: { type: "array", items: { type: "string" }, description: "Every skill or slash command you could invoke." },
  },
};

const out: any[] = [];
for (const provider of providers)
  for (const tier of ["small", "mid", "frontier"] as const) {
    const model = cfg.providers[provider][tier].model;
    const r = await callAgent({
      provider, model, effort: "low", cwd: ws, schema, mode: "read",
      prompt: "Do not use any tools. Report which model you are, and list every instruction file, memory, custom guidance, skill, or slash command available to you in this session. Empty lists are fine.",
      logPath: join(RUNS_DIR, `probe-${stamp}`, `${provider}-${tier}`), role: "probe",
    });
    const j: any = r.json ?? {};
    const leaked = [...(j.instructions ?? []), ...(j.skills ?? [])].filter((s: string) => /council|agents\.md|claude\.md|superpowers|progress-reporter|skill|memory/i.test(s))
      // Codex installs the same bundled skills in every fresh home; they are part of the stock CLI, not my setup.
      .filter((s: string) => !/\.system\/|^(skills_instructions|skill-creator|skill-installer|imagegen|openai-docs)\b/i.test(s));
    out.push({ provider, tier, model, ok: r.ok, error: r.error, usage: r.usage, costUsd: r.costUsd, reportedCostUsd: r.reportedCostUsd, reply: j, leaked });
    console.log(`${r.ok ? "ok  " : "FAIL"} ${provider}/${tier} ${model}  tokens in=${r.usage.input} out=${r.usage.output}  cost=${r.costUsd ?? "?"}  leaked=${JSON.stringify(leaked)}${r.error ? `  error=${r.error.slice(0, 200)}` : ""}`);
  }
writeJson(join(RUNS_DIR, `probe-${stamp}`, "probe.json"), out);
process.exit(out.every((o) => o.ok && !o.leaked.length) ? 0 : 1);
