#!/usr/bin/env bun
// "Make it cheaper, go brrrrr": one human-sounding request to a coding agent, with and
// without the Council of Dans skill installed. Records the final message, the diff, any
// candidate proposals written to disk, and every tool call, for coding by src/brrr-report.ts.
//
//   bun src/brrr.ts --providers claude,codex --arms solo,skill --seeds 5 --run-id brrr-01

import { Glob } from "bun";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { CASES_DIR, PROMPTS_DIR, RUNS_DIR, Semaphore, WS_ROOT, type Provider, config, dirDigest, list, parseArgs, readJson, sh, writeJson } from "./lib";
import { callAgent } from "./providers";

/**
 * solo:    the request as a person types it.
 * skill:   the same, with council-of-dans installed and invoked; the agent decides whether to fan out.
 * council: the fan-out the skill describes, done by the harness: 3 persona builders in their
 *          own copies (Architect, Ruthless Minimalist, Pennypincher per the skill's picking
 *          rule: two defaults plus the persona for the task's main risk, cost), then one
 *          agent picks the top 3 across them and implements those.
 */
export const BRRR_ARMS = ["solo", "skill", "council", "council-v1", "council-v2"] as const;
export const COUNCIL = ["Architect", "Ruthless Minimalist", "Pennypincher"];
type Arm = (typeof BRRR_ARMS)[number];
const SKILL_SRC = process.env.COUNCIL_SKILL_DIR ?? join(homedir(), ".agents/skills/council-of-dans");
// Same tools for both arms: the only difference is whether the skill exists and is invoked.
const CLAUDE_TOOLS = ["Read", "Grep", "Glob", "Edit", "Write", "Bash", "WebFetch", "WebSearch", "Agent", "Skill"];

/** council-v1 / council-v2 run only the persona stage with a skill-brief variant (prompts/briefs/). */
const briefOf = (arm: Arm) => (arm === "council-v1" ? "v1-grounded" : arm === "council-v2" ? "v2-focused" : "v0-current");
const isCouncil = (arm: Arm) => arm.startsWith("council");
const fill = (tpl: string, v: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? `{${k}}`);

export function taskPrompt(provider: Provider, arm: Arm): string {
  const task = readFileSync(join(PROMPTS_DIR, "brrr-task.md"), "utf8").trim();
  if (arm !== "skill") return task;
  // How a person actually calls the skill in each CLI.
  return provider === "claude" ? `/council-of-dans ${task}` : `Use the council-of-dans skill.\n\n${task}`;
}

/** Tool calls as short lines: name plus the part of the input that says what it did. */
export function toolCalls(provider: Provider, raw: string): { name: string; detail: string; sub: boolean }[] {
  const out: { name: string; detail: string; sub: boolean }[] = [];
  for (const line of raw.split("\n")) {
    let ev: any;
    try { ev = JSON.parse(line); } catch { continue; }
    if (provider === "claude" && ev.type === "assistant") {
      for (const b of ev.message?.content ?? []) {
        if (b.type !== "tool_use") continue;
        const i = b.input ?? {};
        const detail = i.url ?? i.query ?? i.command ?? i.skill ?? i.description ?? i.file_path ?? i.pattern ?? "";
        out.push({ name: b.name, detail: String(detail).slice(0, 160), sub: Boolean(ev.parent_tool_use_id) });
      }
    }
    if (provider === "codex" && ev.type === "item.started" && ev.item) {
      const it = ev.item;
      const detail = it.command ?? it.query ?? it.tool ?? it.prompt ?? it.path ?? "";
      out.push({ name: it.type, detail: String(detail).slice(0, 160), sub: false });
    }
  }
  return out;
}

if (import.meta.main) {
  const args = parseArgs(process.argv.slice(2));
  const providers = list(args.providers || "claude,codex") as Provider[];
  const arms = (list(args.arms).length ? list(args.arms) : [...BRRR_ARMS]) as Arm[];
  const seeds = Number(args.seeds ?? 1);
  const runId = String(args["run-id"] ?? `brrr-${Date.now()}`);
  const caseId = String(args.case ?? "pizza-or-not");
  const tier = (args.tier as "small" | "mid" | "frontier") ?? "mid";
  const maxUsd = Number(args["max-usd"] ?? 40);
  const sem = new Semaphore(Number(args.concurrency ?? 4));
  const cfg = config();
  const caseDir = join(CASES_DIR, "brrr", caseId);
  const runDir = join(RUNS_DIR, runId);
  if (!existsSync(join(SKILL_SRC, "SKILL.md"))) throw new Error(`skill not found at ${SKILL_SRC}`);

  const manifestPath = join(runDir, "manifest.json");
  const manifest = existsSync(manifestPath) ? readJson(manifestPath) : { runId, createdAt: new Date().toISOString(), batches: [] };
  manifest.batches.push({
    at: new Date().toISOString(), family: "brrr", providers, arms, seeds, tier,
    case: { id: caseId, digest: dirDigest(caseDir) },
    skill: { path: SKILL_SRC, digest: dirDigest(SKILL_SRC) },
    prompts: Object.fromEntries(providers.flatMap((p) => arms.map((a) => [`${p}/${a}`, taskPrompt(p, a)]))),
    config: cfg, claudeTools: CLAUDE_TOOLS,
  });
  writeJson(manifestPath, manifest);

  let spent = 0;
  const jobs: Promise<void>[] = [];
  for (let s = 1; s <= seeds; s++)
    for (const arm of arms)
      for (const provider of providers)
        jobs.push(
          sem.run(async () => {
            if (spent >= maxUsd) return console.log(`SKIP ${provider} ${arm} s${s}: budget $${maxUsd} reached`);
            spent += await runOne(provider, arm, s);
          }).catch((e) => console.error(`ERR  ${provider} ${arm} s${s}: ${e.message}`)),
        );
  await Promise.all(jobs);
  console.log(`done: ${runDir}  spent ~$${spent.toFixed(2)}`);

  async function runOne(provider: Provider, arm: Arm, seed: number): Promise<number> {
    const outDir = join(runDir, "brrr", caseId, provider, arm, `s${seed}`);
    const resultPath = join(outDir, "result.json");
    if (existsSync(resultPath)) return readJson(resultPath).costUsd ?? 0;
    mkdirSync(outDir, { recursive: true });
    const ws = join(WS_ROOT, runId, "brrr", caseId, provider, arm, `s${seed}`);
    rmSync(ws, { recursive: true, force: true });
    cpSync(join(caseDir, "repo"), ws, { recursive: true });
    const git = (a: string[]) => sh(["git", ...a], { cwd: ws });
    await git(["init", "-q"]);
    await git(["add", "-A"]);
    await git(["-c", "user.name=eval", "-c", "user.email=eval@example.invalid", "commit", "-qm", "base"]);

    const t0 = performance.now();
    const model = cfg.providers[provider][tier].model;
    const base = { provider, model, effort: cfg.effort, mode: "write" as const, timeoutSec: 2400, tools: CLAUDE_TOOLS, transcript: true };
    let councilMeta: any;
    let extraCost = 0;
    if (isCouncil(arm)) {
      const P = readJson(join(PROMPTS_DIR, "personas.json"));
      // v2: a lead step gives each persona a narrow focus and where to look it up, as the skill's lead would.
      let foci: Record<string, { focus: string; sources: string }> = {};
      if (arm === "council-v2") {
        const lead = await callAgent({
          ...base, mode: "read", tools: undefined, cwd: ws, role: "brrr:lead", logPath: join(outDir, "lead"), variant: "brrr-solo",
          prompt: fill(readFileSync(join(PROMPTS_DIR, "briefs", "focus-lead.md"), "utf8"), {
            task: taskPrompt(provider, "solo"), priorities: COUNCIL.map((n) => `${n}: ${P.council[n]}`).join("\n"),
          }),
          schema: { type: "object", additionalProperties: false, required: ["people"], properties: { people: { type: "array", items: { type: "object", additionalProperties: false, required: ["persona", "focus", "sources"], properties: { persona: { type: "string" }, focus: { type: "string" }, sources: { type: "string" } } } } } },
        });
        for (const x of (lead.json as any)?.people ?? []) foci[x.persona] = x;
        extraCost += lead.costUsd ?? 0;
        await Bun.write(join(outDir, "lead.json"), JSON.stringify(foci, null, 2));
      }
      const cands = await Promise.all(
        COUNCIL.map(async (name, i) => {
          const cws = `${ws}.cand-${i}`;
          rmSync(cws, { recursive: true, force: true });
          cpSync(ws, cws, { recursive: true });
          const c = await callAgent({
            ...base, cwd: cws, role: `brrr:cand:${name}`, logPath: join(outDir, `cand-${i}`), variant: "brrr-solo",
            prompt: fill(readFileSync(join(PROMPTS_DIR, "briefs", `${briefOf(arm)}.md`), "utf8"), {
              persona: name, priority: P.council[name], task: taskPrompt(provider, "solo"),
              focus: foci[name]?.focus ?? "", sources: foci[name]?.sources ?? "",
            }),
          });
          await sh(["git", "add", "-A", "--", ".", ":(exclude)node_modules"], { cwd: cws });
          const d = (await sh(["git", "diff", "--cached", "HEAD", "--", ".", ":(exclude)bun.lock"], { cwd: cws })).stdout;
          const dir = join(ws, ".scratch", "council", name.toLowerCase().replace(/\s+/g, "-"));
          mkdirSync(dir, { recursive: true });
          await Bun.write(join(dir, "proposal.md"), c.text || "(no final message)");
          await Bun.write(join(dir, "change.diff"), d);
          return { name, ok: c.ok, costUsd: c.costUsd, tools: toolCalls(provider, readFileSync(join(outDir, `cand-${i}.${provider === "claude" ? "stdout.json" : "events.jsonl"}`), "utf8")).length };
        }),
      );
      extraCost += cands.reduce((a, c) => a + (c.costUsd ?? 0), 0);
      councilMeta = cands;
    }
    const personasOnly = arm !== "council" && isCouncil(arm);
    const prompt = isCouncil(arm)
      ? `${taskPrompt(provider, "solo")}\n\nThree people already worked on this independently, each with a different priority. Their proposals and changes are in .scratch/council/<name>/proposal.md and change.diff. Pick the top 3 ways across all of them, implement those here, and say which proposal each came from.`
      : taskPrompt(provider, arm);
    // Persona-only arms stop before the merge: the unit under test is the persona stage.
    const r = personasOnly
      ? { ok: true, error: undefined, text: "(persona stage only; no merge)", costUsd: 0, usage: undefined, model, json: undefined }
      : await callAgent({
          ...base, cwd: ws, prompt, role: `brrr:${arm}`, logPath: join(outDir, "agent"),
          variant: `brrr-${isCouncil(arm) ? "solo" : arm}`, skills: arm === "skill" ? [SKILL_SRC] : [],
          slashCommands: arm === "skill",
        });
    if (r.costUsd != null) r.costUsd += extraCost;
    await git(["add", "-A", "--", ".", ":(exclude)node_modules"]);
    const diff = (await git(["diff", "--cached", "HEAD", "--", ".", ":(exclude)bun.lock", ":(exclude).scratch"])).stdout;
    const notes: Record<string, string> = {};
    for await (const f of new Glob(".scratch/**/*").scan({ cwd: ws, dot: true, onlyFiles: true }))
      notes[f] = readFileSync(join(ws, f), "utf8").slice(0, 20000);
    const raw = personasOnly ? "" : readFileSync(join(outDir, provider === "claude" ? "agent.stdout.json" : "agent.events.jsonl"), "utf8");
    const tools = toolCalls(provider, raw);
    await Bun.write(join(outDir, "final.diff"), diff);
    writeJson(resultPath, {
      caseId, family: "brrr", provider, arm, seed, model: r.model, ok: r.ok, error: r.error,
      final: r.text, notes, tools,
      // The skill body reached the agent: a slash-command expansion (Claude) or a read of SKILL.md (Codex).
      skillInvoked: arm === "skill" && /under different priorities|Council of Dans/.test(raw),
      council: councilMeta,
      subagents: tools.filter((t) => /^(Agent|Task)$/.test(t.name) || /spawn|collab/i.test(t.name)).length,
      diffLines: diff.split("\n").filter((l) => /^[+-][^+-]/.test(l)).length,
      costUsd: r.costUsd, tokens: r.usage, wallMs: Math.round(performance.now() - t0), workspace: ws,
    });
    console.log(`${r.ok ? "ok  " : "FAIL"} ${provider} ${arm} s${seed}  $${r.costUsd?.toFixed(2)}  tools=${tools.length}  ${Math.round((performance.now() - t0) / 60000)}m`);
    return r.costUsd ?? 0;
  }
}
