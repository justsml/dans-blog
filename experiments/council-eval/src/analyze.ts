#!/usr/bin/env bun
// Aggregates scored results into report.md + results.json for a run.
//
//   bun src/analyze.ts --run-id pilot-01                # held-out only (headline)
//   bun src/analyze.ts --run-id pilot-01 --split all    # include dev

import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PRIMARY_CONTRASTS, SECONDARY_CONTRASTS } from "./arms";
import { RUNS_DIR, parseArgs, personas, readJson, writeJson } from "./lib";
import { bootstrapCI, holm, mean, sd, wilcoxon } from "./stats";

const args = parseArgs(process.argv.slice(2));
const runId = String(args["run-id"]);
const split = String(args.split ?? "heldout");
const runDir = join(RUNS_DIR, runId);
const aligned: string[] = personas().alignedDefectClasses.review;
const LENS_ARMS = new Set(["M3council", "F3council", "X3council", "M3style"]);

type Row = { family: string; provider: string; arm: string; caseId: string; seed: number; author: string; split: string; res: any; score: any; score2?: any };

function walk(dir: string, out: Row[] = []) {
  for (const name of readdirSync(dir)) {
    if (name === "ws" || name === "__score_ws") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === "result.json") {
      const res = readJson(p);
      const sp = join(dir, "score.json");
      if (!existsSync(sp)) continue;
      const second = readdirSync(dir).find((f) => /^score\.\w+\.json$/.test(f));
      out.push({
        family: res.family, provider: res.provider, arm: res.arm, caseId: res.caseId, seed: res.seed,
        author: res.author, split: res.split, res, score: readJson(sp), score2: second ? readJson(join(dir, second)) : undefined,
      });
    }
  }
  return out;
}

const all = walk(runDir).filter((r) => split === "all" || r.split === split);
if (!all.length) throw new Error(`no scored results in ${runDir} for split=${split}`);

const primaryMetric = (r: Row): number | null =>
  r.family === "review" ? (r.score.clean ? null : r.res.ok ? r.score.weightedRecall : 0) : r.res.ok ? r.score.hiddenPassRate : 0;

/** Mean over seeds per case. Returns Map<caseId, value>. */
function perCase(rows: Row[], f: (r: Row) => number | null) {
  const by = new Map<string, number[]>();
  for (const r of rows) {
    const v = f(r);
    if (v == null || Number.isNaN(v)) continue;
    by.set(r.caseId, [...(by.get(r.caseId) ?? []), v]);
  }
  return new Map([...by].map(([k, v]) => [k, mean(v)]));
}

function contrast(rows: Row[], a: string, b: string, f = primaryMetric) {
  const A = perCase(rows.filter((r) => r.arm === a), f);
  const B = perCase(rows.filter((r) => r.arm === b), f);
  const ids = [...A.keys()].filter((k) => B.has(k));
  if (ids.length < 2) return null;
  const diffs = ids.map((k) => A.get(k)! - B.get(k)!);
  const ci = bootstrapCI(diffs);
  const costA = mean([...perCase(rows.filter((r) => r.arm === a), (r) => r.res.costUsd).values()]);
  const costB = mean([...perCase(rows.filter((r) => r.arm === b), (r) => r.res.costUsd).values()]);
  return { a, b, n: ids.length, diff: mean(diffs), sdDiff: sd(diffs), ci: [ci.lo, ci.hi], pBoot: ci.p, wilcoxon: wilcoxon(diffs), costRatio: costA / costB };
}

const fmt = (x: number | null | undefined, d = 3) => (x == null || Number.isNaN(x) ? "–" : x.toFixed(d));
const pct = (x: number | null | undefined) => (x == null || Number.isNaN(x) ? "–" : `${(x * 100).toFixed(1)}%`);
const money = (x: number | null | undefined) => (x == null || Number.isNaN(x) ? "?" : `$${x.toFixed(3)}`);

const report: string[] = [`# Council eval: ${runId}`, "", `Split: **${split}**. Rows scored: ${all.length}.`, ""];
const results: any = { runId, split, groups: [] };

for (const family of ["review", "plan"]) {
  for (const provider of [...new Set(all.map((r) => r.provider))]) {
    const rows = all.filter((r) => r.family === family && r.provider === provider);
    if (!rows.length) continue;
    const arms = [...new Set(rows.map((r) => r.arm))];
    const group: any = { family, provider, arms: {}, contrasts: {} };
    report.push(`## ${family} · ${provider}`, "");
    report.push(
      family === "review"
        ? "| Arm | Weighted recall | Recall | Precision | Hi-sev false alarms / case | Clean-control false alarms | Cost / case | Critical path | Failures | Canary |"
        : "| Arm | Hidden tests passed | Requirement coverage | Cost / case (plan) | Implementer cost | Critical path | Failures | Canary |",
      family === "review" ? "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|" : "|---|---:|---:|---:|---:|---:|---:|---:|",
    );
    for (const arm of arms) {
      const ar = rows.filter((r) => r.arm === arm);
      const m = (f: (r: Row) => number | null) => mean([...perCase(ar, f).values()]);
      const fails = ar.filter((r) => !r.res.ok).length;
      const canary = LENS_ARMS.has(arm) ? "n/a" : String(ar.filter((r) => r.res.calls.some((c: any) => c.canaryHits?.length)).length);
      const s: any = {
        primary: m(primaryMetric),
        cost: m((r) => r.res.costUsd),
        latencyS: m((r) => r.res.criticalPathMs / 1000),
        failures: fails,
        n: ar.length,
        cases: new Set(ar.map((r) => r.caseId)).size,
      };
      if (family === "review") {
        s.recall = m((r) => (r.score.clean ? null : r.res.ok ? r.score.recall : 0));
        s.precision = m((r) => r.score.precision);
        s.falseAlarms = m((r) => r.score.highSeverityFalseAlarms);
        s.cleanFalseAlarms = m((r) => (r.score.clean ? r.score.highSeverityFalseAlarms : null));
        report.push(
          `| ${arm} | ${pct(s.primary)} | ${pct(s.recall)} | ${pct(s.precision)} | ${fmt(s.falseAlarms, 2)} | ${fmt(s.cleanFalseAlarms, 2)} | ${money(s.cost)} | ${fmt(s.latencyS, 0)}s | ${fails}/${ar.length} | ${canary} |`,
        );
      } else {
        s.coverage = m((r) => r.score.coverage);
        s.implCost = m((r) => r.score.implementerCostUsd);
        report.push(
          `| ${arm} | ${pct(s.primary)} | ${pct(s.coverage)} | ${money(s.cost)} | ${money(s.implCost)} | ${fmt(s.latencyS, 0)}s | ${fails}/${ar.length} | ${canary} |`,
        );
      }
      group.arms[arm] = s;
    }
    report.push("");

    const prim = PRIMARY_CONTRASTS.map(([a, b]) => contrast(rows, a, b)).filter(Boolean) as any[];
    const adj = holm(prim.map((c) => c.pBoot));
    prim.forEach((c, i) => (c.pHolm = adj[i]));
    const sec = SECONDARY_CONTRASTS.map(([a, b]) => contrast(rows, a, b)).filter(Boolean) as any[];
    report.push("| Contrast | n cases | Mean diff | 95% CI | p (boot, Holm) | Wilcoxon p | Cost ratio |", "|---|---:|---:|---|---:|---:|---:|");
    for (const c of [...prim, ...sec]) {
      const tag = prim.includes(c) ? "**primary**" : "secondary";
      report.push(
        `| ${c.a} − ${c.b} (${tag}) | ${c.n} | ${fmt(c.diff)} | [${fmt(c.ci[0])}, ${fmt(c.ci[1])}] | ${fmt(c.pHolm ?? c.pBoot)} | ${fmt(c.wilcoxon.p)} | ${fmt(c.costRatio, 2)}× |`,
      );
    }
    report.push("");
    group.contrasts = { primary: prim, secondary: sec };

    if (family === "review") {
      // H4: per-class recall. Gains that follow persona priorities should be larger on aligned classes.
      const classes = [...new Set(rows.flatMap((r) => r.score.perDefect?.map((d: any) => d.class) ?? []))].sort();
      const classRecall = (arm: string, cls: string) => {
        const xs = rows.filter((r) => r.arm === arm).flatMap((r) => (r.score.perDefect ?? []).filter((d: any) => d.class === cls).map((d: any) => (r.res.ok && d.matched ? 1 : 0)));
        return xs.length ? mean(xs) : NaN;
      };
      report.push("### Recall by defect class (H4)", "", `| Class | aligned | ${arms.join(" | ")} |`, `|---|---|${arms.map(() => "---:").join("|")}|`);
      group.byClass = {};
      for (const cls of classes) {
        group.byClass[cls] = Object.fromEntries(arms.map((a) => [a, classRecall(a, cls)]));
        report.push(`| ${cls} | ${aligned.includes(cls) ? "yes" : "no"} | ${arms.map((a) => pct(classRecall(a, cls))).join(" | ")} |`);
      }
      report.push("");
      for (const ref of ["F1", "M3same"]) {
        if (!arms.includes("M3council") || !arms.includes(ref)) continue;
        const delta = (cs: string[]) => mean(cs.map((c) => classRecall("M3council", c) - classRecall(ref, c)).filter((x) => !Number.isNaN(x)));
        const al = delta(classes.filter((c) => aligned.includes(c)));
        const un = delta(classes.filter((c) => !aligned.includes(c)));
        group[`h4_vs_${ref}`] = { aligned: al, unaligned: un };
        report.push(`H4 vs ${ref}: aligned-class delta ${pct(al)}, unaligned-class delta ${pct(un)}.`);
      }
      report.push("");

      // Judge agreement on defect matches, when a second judge ran.
      const pairs = rows.filter((r) => r.score2 && !r.score.clean).flatMap((r) =>
        r.score.perDefect.map((d: any, i: number) => [d.matched, r.score2.perDefect[i]?.matched] as [boolean, boolean]),
      );
      if (pairs.length) {
        const agree = pairs.filter(([a, b]) => a === b).length / pairs.length;
        const pa = pairs.filter(([a]) => a).length / pairs.length;
        const pb = pairs.filter(([, b]) => b).length / pairs.length;
        const pe = pa * pb + (1 - pa) * (1 - pb);
        const kappa = (agree - pe) / (1 - pe);
        group.judgeAgreement = { n: pairs.length, agree, kappa };
        report.push(`Judge agreement on defect matches: ${pct(agree)} over ${pairs.length} decisions, Cohen's κ = ${fmt(kappa, 2)}.`, "");
      }
    }

    // Author slice: a provider doing better on its own cases is a contamination signal.
    const authors = [...new Set(rows.map((r) => r.author))];
    if (authors.length > 1) {
      report.push("### By case author", "", `| Author | ${arms.join(" | ")} |`, `|---|${arms.map(() => "---:").join("|")}|`);
      for (const au of authors)
        report.push(`| ${au} | ${arms.map((a) => pct(mean([...perCase(rows.filter((r) => r.arm === a && r.author === au), primaryMetric).values()]))).join(" | ")} |`);
      report.push("");
    }
    results.groups.push(group);
  }
}

report.push(
  "## Reading this report",
  "",
  "- Review primary metric: severity-weighted recall of seeded defects (clean controls excluded). Plan primary metric: share of hidden acceptance tests passing after the fixed implementer executes the plan.",
  "- A failed or refused final answer scores 0. Costs are list prices from token counts; `?` means the price table has no entry.",
  "- Canary: runs whose output names the council skill or its personas without being told to. Must be 0 for the result to stand.",
  "- Headline numbers come from the held-out split. Dev-split numbers may reflect prompt tuning.",
);
writeFileSync(join(runDir, "report.md"), `${report.join("\n")}\n`);
writeJson(join(runDir, "results.json"), results);
console.log(report.join("\n"));
