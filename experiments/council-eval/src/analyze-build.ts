#!/usr/bin/env bun
// Build-family report. One task, so the unit is the run (seed), not the case: this is a
// case study with uncertainty over agent runs, and the report says so.
//
//   bun src/analyze-build.ts --run-id build-01

import { Glob } from "bun";
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { BUILD_PRIMARY, BUILD_SECONDARY } from "./build";
import { RUNS_DIR, parseArgs, readJson } from "./lib";
import { mean } from "./stats";

const args = parseArgs(process.argv.slice(2));
const runId = String(args["run-id"]);
const runDir = join(RUNS_DIR, runId);

type Row = { provider: string; arm: string; seed: number; pass: number; per: Record<string, boolean>; cost: number | null; rounds: number; clean: boolean | null; wallMs: number; diffLines: number; ok: boolean };
const rows: Row[] = [];
for await (const f of new Glob("build/*/*/*/*/result.json").scan(runDir)) {
  const r = readJson(join(runDir, f));
  const sp = join(runDir, dirname(f), "score.json");
  if (!existsSync(sp)) continue;
  const s = readJson(sp);
  rows.push({
    provider: r.provider, arm: r.arm, seed: r.seed, pass: s.passRate ?? 0, per: s.perRequirement ?? {},
    cost: r.costUsd, rounds: r.roundsUsed, clean: r.stoppedClean, wallMs: r.wallMs, diffLines: r.diffLines, ok: r.ok,
  });
}

const pct = (x: number) => (Number.isFinite(x) ? `${(x * 100).toFixed(1)}%` : "–");
const usd = (x: number) => (Number.isFinite(x) ? `$${x.toFixed(2)}` : "?");
const out: string[] = [`# Build eval: ${runId}`, "", `Scored runs: ${rows.length}. One task, so n = seeds per arm. Read this as a case study.`, ""];

for (const provider of [...new Set(rows.map((r) => r.provider))].sort()) {
  const P = rows.filter((r) => r.provider === provider);
  const arms = [...new Set(P.map((r) => r.arm))];
  arms.sort((a, b) => mean(P.filter((r) => r.arm === b).map((r) => r.pass)) - mean(P.filter((r) => r.arm === a).map((r) => r.pass)));
  const reqs = [...new Set(P.flatMap((r) => Object.keys(r.per)))].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));

  out.push(`## ${provider}`, "", "| Arm | Hidden tests passed (mean) | Per seed | Rounds | Stopped clean | Cost / run | Wall / run | Diff lines |", "|---|---:|---|---:|---:|---:|---:|---:|");
  for (const a of arms) {
    const R = P.filter((r) => r.arm === a).sort((x, y) => x.seed - y.seed);
    const loops = R.filter((r) => r.clean !== null);
    out.push(
      `| ${a} | ${pct(mean(R.map((r) => r.pass)))} | ${R.map((r) => pct(r.pass)).join(", ")} | ${loops.length ? mean(loops.map((r) => r.rounds)).toFixed(1) : "–"} | ${loops.length ? `${loops.filter((r) => r.clean).length}/${loops.length}` : "–"} | ${usd(mean(R.map((r) => r.cost ?? NaN)))} | ${Math.round(mean(R.map((r) => r.wallMs)) / 60000)}m | ${Math.round(mean(R.map((r) => r.diffLines)))} |`,
    );
  }
  out.push("", "### Requirements passed (runs passing / runs)", "", `| Arm | ${reqs.join(" | ")} |`, `|---|${reqs.map(() => "---:").join("|")}|`);
  for (const a of arms) {
    const R = P.filter((r) => r.arm === a);
    out.push(`| ${a} | ${reqs.map((q) => `${R.filter((r) => r.per[q]).length}/${R.length}`).join(" | ")} |`);
  }
  out.push("", "### Contrasts (difference in mean pass rate; CI resamples runs within each arm)", "", "| Contrast | Diff | 95% CI | Cost ratio |", "|---|---:|---|---:|");
  for (const [kind, list] of [["primary", BUILD_PRIMARY], ["secondary", BUILD_SECONDARY]] as const)
    for (const [a, b] of list) {
      const A = P.filter((r) => r.arm === a), Bs = P.filter((r) => r.arm === b);
      if (!A.length || !Bs.length) continue;
      // Unpaired: seeds of different arms are independent runs. Resample each arm, difference the means.
      const diffs: number[] = [];
      let x = 7;
      const rnd = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
      for (let i = 0; i < 10000; i++) {
        const ma = mean(A.map(() => A[Math.floor(rnd() * A.length)].pass));
        const mb = mean(Bs.map(() => Bs[Math.floor(rnd() * Bs.length)].pass));
        diffs.push(ma - mb);
      }
      diffs.sort((p, q) => p - q);
      const d = mean(A.map((r) => r.pass)) - mean(Bs.map((r) => r.pass));
      const ratio = mean(A.map((r) => r.cost ?? NaN)) / mean(Bs.map((r) => r.cost ?? NaN));
      out.push(`| ${a} − ${b} (${kind}) | ${(d * 100).toFixed(1)} pts | [${(diffs[249] * 100).toFixed(1)}, ${(diffs[9749] * 100).toFixed(1)}] | ${ratio.toFixed(2)}× |`);
    }
  out.push("");
}
out.push("## Reading this report", "", "- Pass rate: share of hidden black-box requirement tests passing against the final working tree, brought up with its own compose file.", "- Loop arms review, fix every Medium+ finding, and repeat; \"stopped clean\" means a review round found nothing Medium+ before the round cap.", "- With 3 seeds, the CIs are wide by design. Treat differences under ~1 requirement (9 pts) as noise.");
writeFileSync(join(runDir, "build-report.md"), out.join("\n") + "\n");
console.log(out.join("\n"));
