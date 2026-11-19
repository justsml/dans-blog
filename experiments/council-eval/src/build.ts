#!/usr/bin/env bun
// Build family: an agent implements a ticket in a real multi-service repo. Some arms then loop:
// review → fix every Medium+ finding → review again, until a round finds none or the cap hits.
// Hidden black-box tests score the final working tree (src/score-build.ts).
//
//   bun src/build.ts --providers claude,codex --arms BM1,BF1,BM3loopCouncil --seeds 3 \
//     --cases b001-resumable-chat --concurrency 3 --run-id build-01

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ensureDind, portBlock } from "./dind";
import {
  CASES_DIR, PROMPTS_DIR, RUNS_DIR, Semaphore, WS_ROOT,
  type CallResult, type Provider, type Tier,
  config, dirDigest, list, parseArgs, personas, readJson, sh, sha256, template, writeJson,
} from "./lib";
import { callAgent } from "./providers";
import { reviewSchema } from "./schemas";

type Reviewers = "self" | "same3" | "council3";
interface BuildArm { id: string; tier: Tier; loop?: Reviewers }

export const BUILD_ARMS: Record<string, BuildArm> = {
  BM1: { id: "BM1", tier: "mid" },
  BF1: { id: "BF1", tier: "frontier" },
  BM1loop: { id: "BM1loop", tier: "mid", loop: "self" },
  BM3loopSame: { id: "BM3loopSame", tier: "mid", loop: "same3" },
  BM3loopCouncil: { id: "BM3loopCouncil", tier: "mid", loop: "council3" },
  BF1loop: { id: "BF1loop", tier: "frontier", loop: "self" },
};
export const BUILD_PRIMARY: [string, string][] = [
  ["BM3loopCouncil", "BF1"],
  ["BM3loopCouncil", "BM3loopSame"],
  ["BM3loopCouncil", "BM1loop"],
];
/** Run by default. BF1loop exists but is opt-in: frontier loops are the expensive corner. */
export const BUILD_DEFAULT_ARMS = ["BM1", "BF1", "BM1loop", "BM3loopSame", "BM3loopCouncil"];
export const BUILD_SECONDARY: [string, string][] = [
  ["BF1loop", "BF1"],
  ["BM1loop", "BM1"],
  ["BF1", "BM1"],
];

const BLOCKING = new Set(["critical", "high", "medium"]);

if (import.meta.main) {
  const args = parseArgs(process.argv.slice(2));
  const providers = list(args.providers || "claude,codex") as Provider[];
  const armIds = list(args.arms).length ? list(args.arms) : BUILD_DEFAULT_ARMS;
  // Hard spend cap in list-price USD. No new run starts once spend reaches it.
  const maxUsd = Number(args["max-usd"] ?? 60);
  let spent = 0;
  const seeds = Number(args.seeds ?? 1);
  const runId = String(args["run-id"] ?? `build-${Date.now()}`);
  const caseIds = list(args.cases).length ? list(args.cases) : ["b001-resumable-chat"];
  const sem = new Semaphore(Number(args.concurrency ?? 3));
  for (const a of armIds) if (!BUILD_ARMS[a]) throw new Error(`unknown build arm ${a}`);

  const cfg = config();
  const P = personas();
  const B = cfg.build;
  const dind = await ensureDind();
  const runDir = join(RUNS_DIR, runId);

  const manifestPath = join(runDir, "manifest.json");
  const manifest = existsSync(manifestPath) ? readJson(manifestPath) : { runId, createdAt: new Date().toISOString(), batches: [] };
  manifest.batches.push({
    at: new Date().toISOString(), family: "build", providers, arms: armIds, seeds,
    cases: caseIds.map((id) => ({ id, digest: dirDigest(join(CASES_DIR, "build", id)) })),
    promptsDigest: dirDigest(PROMPTS_DIR), config: cfg, reviewers: P.selection.build,
    isolation: "clean HOME + clean CLI homes; Docker via the eval's own dind daemon",
  });
  writeJson(manifestPath, manifest);

  let slot = 0;
  const jobs: Promise<void>[] = [];
  // Seed-major, frontier arms last in each seed: a budget stop leaves complete low-cost
  // seeds rather than a few expensive runs.
  const ordered = [...armIds].sort((a, b) => Number(BUILD_ARMS[a].tier === "frontier") - Number(BUILD_ARMS[b].tier === "frontier"));
  for (let s = 1; s <= seeds; s++)
    for (const caseId of caseIds)
      for (const armId of ordered)
        for (const provider of providers) {
          const mySlot = slot++;
          jobs.push(
            sem.run(async () => {
              if (spent >= maxUsd) return console.log(`SKIP ${caseId} ${provider} ${armId} s${s}: budget $${maxUsd} reached`);
              spent += await runOne(caseId, provider, BUILD_ARMS[armId], s, mySlot);
            }).catch((e) =>
              console.error(`ERR  ${caseId} ${provider} ${armId} s${s}: ${e.message}`),
            ),
          );
        }
  await Promise.all(jobs);
  console.log(`done: ${runDir}`);

  async function runOne(caseId: string, provider: Provider, arm: BuildArm, seed: number, mySlot: number): Promise<number> {
    const caseDir = join(CASES_DIR, "build", caseId);
    const c = readJson(join(caseDir, "case.json"));
    const outDir = join(runDir, "build", caseId, provider, arm.id, `s${seed}`);
    const resultPath = join(outDir, "result.json");
    if (existsSync(resultPath)) return readJson(resultPath).costUsd ?? 0;
    mkdirSync(outDir, { recursive: true });

    const ws = join(WS_ROOT, runId, "build", caseId, provider, arm.id, `s${seed}`);
    rmSync(ws, { recursive: true, force: true });
    mkdirSync(ws, { recursive: true });
    cpSync(join(caseDir, "repo"), ws, { recursive: true });
    const git = (a: string[]) => sh(["git", ...a], { cwd: ws });
    await git(["init", "-q"]);
    await git(["add", "-A"]);
    await git(["-c", "user.name=eval", "-c", "user.email=eval@example.invalid", "commit", "-qm", "base"]);
    const base = (await git(["rev-parse", "HEAD"])).stdout.trim();
    // Agents add files; stage everything so the diff includes them (nothing is committed).
    const changeDiff = async () => {
      await git(["add", "-A", "--", ".", ":(exclude)CHANGE.diff", ":(exclude)node_modules"]);
      return (await git(["diff", "--cached", base, "--", ".", ":(exclude)CHANGE.diff"])).stdout;
    };

    const project = `ce-${sha256(`${runId}:${caseId}:${provider}:${arm.id}:${seed}`).slice(0, 10)}`;
    const env = { DOCKER_HOST: dind.dockerHost, COMPOSE_PROJECT_NAME: project, STACK_HOST: dind.stackHost, ...portBlock(mySlot) };
    const down = () => sh(["docker", "compose", "down", "-v", "--remove-orphans"], { cwd: ws, env, timeoutMs: 180_000 });
    const model = cfg.providers[provider][arm.tier].model;
    const envBlock = template("build-env.md", {});
    const calls: CallResult[] = [];
    const snaps: string[] = [];
    const t0 = performance.now();
    const call = async (role: string, logName: string, prompt: string, mode: "read" | "write", schema?: object) => {
      const r = await callAgent({
        provider, model, effort: cfg.effort, cwd: ws, prompt, schema, mode, role,
        logPath: join(outDir, logName), env, timeoutSec: mode === "write" ? B.implementTimeoutSec : undefined,
      });
      calls.push(r);
      if (mode === "write") {
        await down();
        // Snapshot after every write step, so each round's tree can be scored on its own.
        writeFileSync(join(outDir, `snap-${String(snaps.length).padStart(2, "0")}-${logName}.diff`), await changeDiff());
        snaps.push(logName);
      }
      return r;
    };

    const impl = await call("implement", "implement", template("build-implement.md", { task: c.task, env: envBlock }), "write");
    const rounds: any[] = [];
    let stoppedClean: boolean | null = null;

    if (arm.loop && impl.ok) {
      stoppedClean = false;
      for (let r = 1; r <= B.maxRounds; r++) {
        writeFileSync(join(ws, "CHANGE.diff"), await changeDiff());
        const lenses: { name: string | null }[] =
          arm.loop === "self" ? [{ name: null }] : arm.loop === "same3" ? [{ name: null }, { name: null }, { name: null }] : P.selection.build.map((name: string) => ({ name }));
        const reviewPrompt = (name: string | null) =>
          template("build-review.md", {
            task: c.task,
            maxFindings: cfg.limits.reviewMaxFindings,
            lens: name ? template("lens-council.md", { name, text: P.council[name] }) : "",
          });
        const schema = reviewSchema(cfg.limits.reviewMaxFindings);
        const drafts = await Promise.all(lenses.map((l, i) => call(`review:${l.name ?? "none"}`, `r${r}-review-${i}`, reviewPrompt(l.name), "read", schema)));
        let final = drafts[0];
        if (drafts.length > 1) {
          // Drafts reach the synthesizer without persona names.
          const rendered = drafts
            .map((d, i) => `<draft index="${i + 1}">\n${d.ok ? JSON.stringify((d.json as any)?.findings ?? [], null, 2) : "(this draft failed)"}\n</draft>`)
            .join("\n\n");
          final = await call("synth", `r${r}-synth`, template("build-synth.md", { task: c.task, drafts: rendered, maxFindings: cfg.limits.reviewMaxFindings }), "read", schema);
        }
        rmSync(join(ws, "CHANGE.diff"), { force: true });
        const findings: any[] = final.ok ? ((final.json as any)?.findings ?? []) : [];
        const blocking = findings.filter((f) => BLOCKING.has(f.severity));
        const bySeverity = Object.fromEntries(["critical", "high", "medium", "low"].map((s) => [s, findings.filter((f) => f.severity === s).length]));
        rounds.push({ round: r, reviewOk: final.ok, bySeverity, findings });
        if (!final.ok) break; // a failed review cannot certify the change; recorded, not retried
        if (!blocking.length) {
          stoppedClean = true;
          break;
        }
        const fix = await call("fix", `r${r}-fix`, template("build-fix.md", { task: c.task, env: envBlock, findings: JSON.stringify(blocking, null, 2) }), "write");
        rounds[rounds.length - 1].fixOk = fix.ok;
      }
    }

    await down();
    const diff = await changeDiff();
    writeFileSync(join(outDir, "final.diff"), diff);
    const sum = (f: (r: CallResult) => number | null) => calls.reduce<number | null>((a, r) => (a == null || f(r) == null ? null : a + (f(r) as number)), 0);
    writeJson(resultPath, {
      caseId, caseDigest: dirDigest(caseDir), family: "build", provider, arm: arm.id, seed, model,
      ok: impl.ok, error: impl.error,
      loop: arm.loop ?? null, rounds, roundsUsed: rounds.length, stoppedClean, snapshots: snaps,
      diffLines: diff.split("\n").filter((l) => /^[+-][^+-]/.test(l)).length,
      costUsd: sum((r) => r.costUsd),
      tokens: { input: sum((r) => r.usage.input), output: sum((r) => r.usage.output) },
      wallMs: Math.round(performance.now() - t0),
      workspace: ws, project, ports: portBlock(mySlot),
      calls: calls.map(({ text, json, ...rest }) => rest),
    });
    console.log(`${impl.ok ? "ok  " : "FAIL"} ${caseId} ${provider} ${arm.id} s${seed} rounds=${rounds.length} clean=${stoppedClean} $${sum((r) => r.costUsd)?.toFixed(2)}`);
    return sum((r) => r.costUsd) ?? 0;
  }
}
