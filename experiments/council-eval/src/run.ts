#!/usr/bin/env bun
// Runs arms over cases and writes one result.json per (case, provider, arm, seed).
// Resumable: an existing result.json is skipped.
//
//   bun src/run.ts --family review --providers claude,codex --arms M1,F1,M3council \
//     --seeds 3 --split heldout --concurrency 6 --run-id pilot-01
//   bun src/run.ts --family review --mock --run-id dry      # $0 pipeline check

import { existsSync } from "node:fs";
import { join } from "node:path";
import { ARMS, DEFAULT_ARMS, type ArmSpec, type Lens } from "./arms";
import {
  type Case,
  type CallResult,
  type Family,
  type Finding,
  type Provider,
  RUNS_DIR,
  Semaphore,
  config,
  list,
  loadCases,
  parseArgs,
  personas,
  prepareWorkspace,
  readJson,
  sh,
  sha256,
  template,
  truncateWords,
  writeJson,
  dirDigest,
  PROMPTS_DIR,
  WS_ROOT,
} from "./lib";
import { callAgent } from "./providers";
import { reviewSchema } from "./schemas";

const args = parseArgs(process.argv.slice(2));
const family = (args.family as Family) ?? "review";
const mock = Boolean(args.mock);
const providers = (mock ? ["mock"] : list(args.providers || "claude,codex")) as Provider[];
const armIds = list(args.arms) .length ? list(args.arms) : DEFAULT_ARMS.concat(family === "plan" ? ["P0"] : []);
const seeds = Number(args.seeds ?? 1);
const runId = String(args["run-id"] ?? new Date().toISOString().replace(/[:.]/g, "-"));
const cases = loadCases(family, { split: (args.split as any) ?? "all", ids: list(args.cases) });
const sem = new Semaphore(Number(args.concurrency ?? 4));
const cfg = config();
const P = personas();
const runDir = join(RUNS_DIR, runId);

for (const a of armIds) if (!ARMS[a]) throw new Error(`unknown arm ${a}`);
if (!cases.length) throw new Error(`no ${family} cases found`);

async function versions() {
  const v = async (cmd: string[]) => (await sh(cmd, { cwd: process.cwd() }).catch(() => ({ stdout: "n/a" }))).stdout.trim();
  return { claude: await v(["claude", "--version"]), codex: await v(["codex", "--version"]), bun: Bun.version };
}

const manifestPath = join(runDir, "manifest.json");
const manifest = existsSync(manifestPath) ? readJson(manifestPath) : { runId, createdAt: new Date().toISOString(), batches: [] };
manifest.batches.push({
  at: new Date().toISOString(),
  family,
  providers,
  arms: armIds,
  seeds,
  cases: cases.map((c) => ({ id: c.id, split: c.split, digest: c.digest, author: c.author })),
  promptsDigest: dirDigest(PROMPTS_DIR),
  config: cfg,
  versions: await versions(),
  isolation: { claude: process.env.ANTHROPIC_API_KEY ? "--bare" : "CLAUDE_CONFIG_DIR=~/.cache/council-eval/claude-home + setting-sources=user, clean HOME, auto memory off", codex: "CODEX_HOME=~/.cache/council-eval/codex-home + --ignore-user-config --ignore-rules, clean HOME; stock .system skills remain", workspaces: WS_ROOT },
});
writeJson(manifestPath, manifest);

const other = (p: Provider): Provider => (p === "claude" ? "codex" : p === "codex" ? "claude" : "mock");

function lensesFor(arm: ArmSpec): Lens[] {
  if (Array.isArray(arm.members)) return arm.members;
  if (arm.members === "council") return P.selection[family].map((name: string) => ({ kind: "council", name }));
  return Object.keys(P.placebo).map((name) => ({ kind: "placebo", name }));
}

function lensText(l: Lens): string {
  if (l.kind === "none") return "";
  if (l.kind === "council") return template("lens-council.md", { name: l.name, text: P.council[l.name] });
  return template("lens-placebo.md", { name: l.name, text: P.placebo[l.name] });
}

function draftPrompt(c: Case, l: Lens): string {
  const lens = lensText(l);
  const k = cfg.limits;
  return c.family === "review"
    ? template("review.md", { lens, description: c.description, maxFindings: k.reviewMaxFindings })
    : template("plan.md", { lens, task: c.task, maxWords: k.planMaxWords });
}

/** Drafts are shown to the synthesizer without persona names, so it cannot weight by label. */
function renderDrafts(c: Case, drafts: CallResult[]): string {
  return drafts
    .map((d, i) => {
      const body = c.family === "review" ? JSON.stringify((d.json as any)?.findings ?? [], null, 2) : d.text;
      return `<draft index="${i + 1}">\n${d.ok ? body : "(this draft failed)"}\n</draft>`;
    })
    .join("\n\n");
}

function finalizePrompt(c: Case, kind: "refine" | "synth", drafts: CallResult[]): string {
  const k = cfg.limits;
  const vars = { drafts: renderDrafts(c, drafts) };
  if (c.family === "review")
    return template(`${kind}-review.md`, { ...vars, description: c.description, maxFindings: k.reviewMaxFindings });
  return template(`${kind}-plan.md`, { ...vars, task: c.task, maxWords: k.planMaxWords });
}

function mockOutput(c: Case, seedKey: string) {
  return () => {
    if (c.family === "plan") return `Plan (mock ${seedKey.slice(0, 6)}): edit the files the task names and keep existing tests green.`;
    // Mock findings aim at random changed hunks so the scorer path is exercised end to end.
    const n = parseInt(sha256(seedKey).slice(0, 6), 16);
    const findings: Finding[] = Array.from({ length: 1 + (n % 3) }, (_, i) => ({
      file: "src/index.ts",
      line_start: 1 + ((n >> i) % 40),
      line_end: 3 + ((n >> i) % 40),
      severity: (["high", "medium", "low"] as const)[(n >> (i + 2)) % 3],
      category: "mock",
      claim: `mock finding ${i}`,
      evidence: "mock",
    }));
    return { findings };
  };
}

async function runOne(c: Case, provider: Provider, arm: ArmSpec, seed: number) {
  const outDir = join(runDir, family, c.id, provider, arm.id, `s${seed}`);
  const resultPath = join(outDir, "result.json");
  if (existsSync(resultPath)) return;
  const effort = cfg.effort;
  const schema = c.family === "review" ? reviewSchema(cfg.limits.reviewMaxFindings) : undefined;
  const modelFor = (p: Provider) => (p === "mock" ? `mock-${arm.tier}` : cfg.providers[p][arm.tier].model);

  const ws = await prepareWorkspace(c, join(WS_ROOT, runId, family, c.id, provider, arm.id, `s${seed}`));
  const lenses = arm.noPlan ? [] : lensesFor(arm);
  const t0 = performance.now();

  const drafts = await Promise.all(
    lenses.map((l, i) => {
      const p = arm.memberHome && !arm.memberHome[i] ? other(provider) : provider;
      return sem.run(() =>
        callAgent({
          provider: p,
          model: modelFor(p),
          effort,
          cwd: ws,
          prompt: draftPrompt(c, l),
          schema,
          mode: "read",
          logPath: join(outDir, `draft-${i}`),
          role: `draft:${l.kind}${"name" in l ? `:${l.name}` : ""}`,
          mock: mockOutput(c, `${c.id}:${arm.id}:${seed}:${i}`),
        }),
      );
    }),
  );

  let final: CallResult | undefined = drafts.length === 1 && arm.finalize === "none" ? drafts[0] : undefined;
  if (arm.finalize !== "none" && drafts.length) {
    final = await sem.run(() =>
      callAgent({
        provider,
        model: modelFor(provider),
        effort,
        cwd: ws,
        prompt: finalizePrompt(c, arm.finalize as "refine" | "synth", drafts),
        schema,
        mode: "read",
        logPath: join(outDir, "final"),
        role: arm.finalize,
        mock: mockOutput(c, `${c.id}:${arm.id}:${seed}:final`),
      }),
    );
  }

  const calls = final && !drafts.includes(final) ? [...drafts, final] : drafts;
  const sum = (f: (r: CallResult) => number | null) =>
    calls.reduce<number | null>((acc, r) => (acc == null || f(r) == null ? null : acc + (f(r) as number)), 0);
  // Members run in parallel, so the critical path is the slowest draft plus the finalizer.
  const criticalMs = Math.max(0, ...drafts.map((d) => d.wallMs)) + (final && !drafts.includes(final) ? final.wallMs : 0);

  let output: unknown = null;
  let planMeta: unknown;
  if (final?.ok) {
    if (c.family === "review") {
      const findings = ((final.json as any)?.findings ?? []).slice(0, cfg.limits.reviewMaxFindings);
      output = { findings };
    } else {
      const t = truncateWords(final.text, cfg.limits.planMaxWords);
      output = t.text;
      planMeta = { words: t.words, truncated: t.truncated };
    }
  }

  writeJson(resultPath, {
    caseId: c.id,
    caseDigest: c.digest,
    split: c.split,
    author: c.author,
    family,
    provider,
    arm: arm.id,
    seed,
    ok: arm.noPlan ? true : Boolean(final?.ok),
    error: arm.noPlan ? undefined : final?.error ?? (final ? undefined : "no final output"),
    output,
    planMeta,
    costUsd: sum((r) => r.costUsd),
    tokens: { input: sum((r) => r.usage.input), output: sum((r) => r.usage.output), cacheRead: sum((r) => r.usage.cacheRead) },
    criticalPathMs: criticalMs,
    totalWallMs: Math.round(performance.now() - t0),
    workspace: ws,
    calls: calls.map(({ text, json, ...rest }) => rest),
  });
  console.log(`${final?.ok || arm.noPlan ? "ok  " : "FAIL"} ${c.id} ${provider} ${arm.id} s${seed}`);
}

const jobs: Promise<void>[] = [];
for (const c of cases)
  for (const p of providers)
    for (const a of armIds)
      for (let s = 1; s <= seeds; s++)
        jobs.push(runOne(c, p, ARMS[a], s).catch((e) => console.error(`ERR  ${c.id} ${p} ${a} s${s}: ${e.message}`)));
await Promise.all(jobs);
console.log(`done: ${runDir}`);
