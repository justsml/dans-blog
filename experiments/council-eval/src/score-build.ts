#!/usr/bin/env bun
// Scores build runs: brings up each final working tree's own compose stack on the eval's
// dind daemon and runs the case's hidden black-box tests against it. Resumable.
//
//   bun src/score-build.ts --run-id build-01 [--concurrency 2] [--rounds 1]

import { Glob } from "bun";
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { ensureDind } from "./dind";
import { CASES_DIR, RUNS_DIR, Semaphore, dirDigest, parseArgs, readJson, sh, sha256, writeJson } from "./lib";

const args = parseArgs(process.argv.slice(2));
const runId = String(args["run-id"]);
const runDir = join(RUNS_DIR, runId);
const sem = new Semaphore(Number(args.concurrency ?? 2));
const rounds = Number(args.rounds ?? 1);
const dind = await ensureDind();

const jobs: Promise<void>[] = [];
let n = 0;
for await (const f of new Glob("build/*/*/*/*/result.json").scan(runDir)) {
  const resultPath = join(runDir, f);
  const scorePath = join(dirname(resultPath), "score.json");
  if (existsSync(scorePath) && !args.rescore) continue;
  jobs.push(
    sem.run(async () => {
      const r = readJson(resultPath);
      const caseDir = join(CASES_DIR, "build", r.caseId);
      if (dirDigest(caseDir) !== r.caseDigest) {
        console.log(`SKIP ${f}: case changed since the run`);
        return;
      }
      const { scoreBuild } = await import(join(CASES_DIR, "build", "verify-build.ts"));
      const t0 = performance.now();
      let s: any;
      try {
        s = await scoreBuild(caseDir, r.workspace, {
          projectName: `b001-s-${sha256(resultPath).slice(0, 10)}`,
          env: { DOCKER_HOST: dind.dockerHost },
          host: dind.stackHost,
          rounds,
        });
      } catch (e) {
        // The agent's tree did not come up (build or healthcheck failed): every requirement fails.
        const reqs = readJson(join(caseDir, "case.json")).requirements.map((q: any) => q.id);
        s = { perRequirement: Object.fromEntries(reqs.map((q: string) => [q, false])), passRate: 0, logs: String(e), stackFailed: true };
      }
      // Intermediate trees: apply each snapshot diff to a fresh copy of the base repo and score it.
      const snapScores: Record<string, any> = {};
      if (args.snapshots) {
        const dir = dirname(resultPath);
        for (const snap of (await Array.fromAsync(new Glob("snap-*.diff").scan(dir))).sort()) {
          const tree = join(r.workspace + ".snaps", snap.replace(/\.diff$/, ""));
          rmSync(tree, { recursive: true, force: true });
          cpSync(join(caseDir, "repo"), tree, { recursive: true });
          const ap = await sh(["git", "apply", "--whitespace=nowarn", join(dir, snap)], { cwd: tree });
          let ss: any;
          try {
            if (ap.code) throw new Error(ap.stderr);
            ss = await scoreBuild(caseDir, tree, { projectName: `b001-n-${sha256(tree).slice(0, 10)}`, env: { DOCKER_HOST: dind.dockerHost }, host: dind.stackHost, rounds });
          } catch (e) {
            ss = { perRequirement: {}, passRate: 0, stackFailed: true, logs: String(e) };
          }
          snapScores[snap] = { passRate: ss.passRate, perRequirement: ss.perRequirement, stackFailed: ss.stackFailed ?? false };
          console.log(`     snap ${snap}: ${(ss.passRate * 100).toFixed(0)}%`);
        }
      }
      writeJson(scorePath, {
        snapshots: snapScores, ...s, logs: undefined, stackFailed: s.stackFailed ?? false, scoredAt: new Date().toISOString(), scoreMs: Math.round(performance.now() - t0) });
      await Bun.write(join(dirname(resultPath), "score.log"), s.logs ?? "");
      n++;
      console.log(`${(s.passRate * 100).toFixed(0).padStart(3)}%  ${f}${s.stackFailed ? "  (stack failed to start)" : ""}`);
    }),
  );
}
await Promise.all(jobs);
console.log(`scored ${n} build runs in ${runDir}`);
