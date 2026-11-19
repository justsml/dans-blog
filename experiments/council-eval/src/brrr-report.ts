#!/usr/bin/env bun
// Codes every brrr run with a blind judge (arm and provider hidden), then reports how often
// each method reached each lever, what each method put in its top 3, process indicators,
// which council personas contributed levers nobody else found, and cost.
//
//   bun src/brrr-report.ts --run-id brrr-01 [--second-judge]

import { Glob } from "bun";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { RUNS_DIR, WS_ROOT, Semaphore, config, parseArgs, readJson, template, writeJson } from "./lib";
import { callAgent } from "./providers";

export const LEVERS = [
  "prompt_caching", "cache_invalidator", "prompt_compression", "image_downscale", "image_upscale", "image_crop",
  "merge_calls", "model_downgrade", "model_cascade", "effort_reduction", "output_cap", "batch_api",
  "result_cache", "retry_fix", "local_prefilter", "structured_output",
] as const;
export const PROCESS = [
  "checked_docs", "measured_baseline", "quantified_savings", "quality_guard",
  "eval_or_tuning_loop", "synthetic_dataset", "asked_or_flagged_tradeoffs",
] as const;

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["levers", "process", "top3", "candidates"],
  properties: {
    levers: {
      type: "object", additionalProperties: false, required: [...LEVERS],
      properties: Object.fromEntries(LEVERS.map((l) => [l, { type: "string", enum: ["none", "rejected", "proposed", "implemented"] }])),
    },
    process: {
      type: "object", additionalProperties: false, required: [...PROCESS],
      properties: Object.fromEntries(PROCESS.map((p) => [p, { type: "boolean" }])),
    },
    top3: { type: "array", maxItems: 3, items: { type: "string" } },
    candidates: {
      type: "array",
      items: {
        type: "object", additionalProperties: false, required: ["label", "levers"],
        properties: { label: { type: "string" }, levers: { type: "array", items: { type: "string" } } },
      },
    },
  },
};

const args = parseArgs(process.argv.slice(2));
const runId = String(args["run-id"]);
const runDir = join(RUNS_DIR, runId);
const cfg = config();
const judge = args["second-judge"] ? cfg.secondJudge : cfg.judge;
const scoreName = args["second-judge"] ? `code.${judge.provider}.json` : "code.json";
const sem = new Semaphore(Number(args.concurrency ?? 4));
mkdirSync(join(WS_ROOT, runId, "__judge"), { recursive: true });
const cap = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}\n[... ${s.length - n} more characters]` : s);

const results: any[] = [];
for await (const f of new Glob("brrr/*/*/*/*/result.json").scan(runDir)) results.push({ path: join(runDir, f), r: readJson(join(runDir, f)) });

await Promise.all(
  results.map(({ path, r }) =>
    sem.run(async () => {
      const out = join(dirname(path), scoreName);
      if (existsSync(out)) return;
      const prompt = template("brrr-judge.md", {
        final: cap(r.final || "(no final message)", 20000),
        diff: cap(await Bun.file(join(dirname(path), "final.diff")).text(), 40000) || "(no changes)",
        notes: cap(Object.entries(r.notes ?? {}).map(([k, v]) => `--- ${k}\n${v}`).join("\n\n"), 30000) || "(none)",
        tools: cap(r.tools.map((t: any) => `${t.sub ? "  [sub] " : ""}${t.name}: ${t.detail}`).join("\n"), 12000) || "(none)",
      });
      const c = await callAgent({
        provider: judge.provider, model: judge.model, effort: judge.effort, cwd: join(WS_ROOT, runId, "__judge"),
        prompt, schema, mode: "read", role: "brrr-judge", logPath: join(dirname(path), scoreName.replace(".json", "")),
      });
      writeJson(out, { ok: c.ok, error: c.error, ...(c.json as any), judgeCostUsd: c.costUsd });
      console.log(`${c.ok ? "coded" : "FAIL "} ${r.provider} ${r.arm} s${r.seed}`);
    }),
  ),
);

// ---------- report ----------
const rows = results
  .map(({ path, r }) => ({ r, c: existsSync(join(dirname(path), "code.json")) ? readJson(join(dirname(path), "code.json")) : null }))
  .filter((x) => x.c?.ok);
const pct = (n: number, d: number) => (d ? `${Math.round((100 * n) / d)}%` : "–");
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
const md: string[] = [`# brrr: ${runId}`, "", `Coded runs: ${rows.length}. Judge: ${cfg.judge.model}, blind to arm and provider.`, ""];
const groups = [...new Set(rows.map((x) => `${x.r.provider}/${x.r.arm}`))].sort();
const G = (g: string) => rows.filter((x) => `${x.r.provider}/${x.r.arm}` === g);

md.push("## Runs", "", "| Method | Runs | Skill invoked | Subagents / run | Tool calls / run | Diff lines | Cost / run | Wall / run |", "|---|---:|---:|---:|---:|---:|---:|---:|");
for (const g of groups) {
  const X = G(g);
  md.push(`| ${g} | ${X.length} | ${pct(X.filter((x) => x.r.skillInvoked).length, X.length)} | ${mean(X.map((x) => x.r.subagents)).toFixed(1)} | ${Math.round(mean(X.map((x) => x.r.tools.length)))} | ${Math.round(mean(X.map((x) => x.r.diffLines)))} | $${mean(X.map((x) => x.r.costUsd ?? NaN)).toFixed(2)} | ${Math.round(mean(X.map((x) => x.r.wallMs)) / 60000)}m |`);
}

md.push("", "## Levers reached (proposed or implemented / implemented)", "", `| Lever | ${groups.join(" | ")} |`, `|---|${groups.map(() => "---:").join("|")}|`);
for (const l of LEVERS)
  md.push(`| ${l} | ${groups.map((g) => { const X = G(g); const p = X.filter((x) => ["proposed", "implemented"].includes(x.c.levers[l])).length; const i = X.filter((x) => x.c.levers[l] === "implemented").length; return `${pct(p, X.length)} / ${pct(i, X.length)}`; }).join(" | ")} |`);
md.push("", "Distinct levers per run (mean): " + groups.map((g) => `${g} ${mean(G(g).map((x) => LEVERS.filter((l) => x.c.levers[l] !== "none" && x.c.levers[l] !== "rejected").length)).toFixed(1)}`).join(", "));

md.push("", "## Process indicators", "", `| Indicator | ${groups.join(" | ")} |`, `|---|${groups.map(() => "---:").join("|")}|`);
for (const p of PROCESS) md.push(`| ${p} | ${groups.map((g) => pct(G(g).filter((x) => x.c.process[p]).length, G(g).length)).join(" | ")} |`);

md.push("", "## Top-3 picks (how often each lever made a run's top 3)", "", `| Lever | ${groups.join(" | ")} |`, `|---|${groups.map(() => "---:").join("|")}|`);
const topKeys = [...new Set(rows.flatMap((x) => x.c.top3 as string[]))].sort();
for (const k of topKeys) md.push(`| ${k} | ${groups.map((g) => pct(G(g).filter((x) => x.c.top3.includes(k)).length, G(g).length)).join(" | ")} |`);

// Sample-count control, free from the data: does one council run reach more levers than
// the union of three independent solo runs?
md.push("", "## One council run vs. three solo runs", "");
for (const provider of [...new Set(rows.map((x) => x.r.provider))]) {
  const solo = rows.filter((x) => x.r.provider === provider && x.r.arm === "solo");
  const reach = (xs: any[]) => new Set(xs.flatMap((x) => LEVERS.filter((l) => ["proposed", "implemented"].includes(x.c.levers[l]))));
  const unions: number[] = [];
  for (let i = 0; i + 2 < solo.length; i++) unions.push(reach(solo.slice(i, i + 3)).size);
  const per = (arm: string) => mean(rows.filter((x) => x.r.provider === provider && x.r.arm === arm).map((x) => reach([x]).size)).toFixed(1);
  md.push(`- ${provider}: one solo run reaches ${per("solo")} levers, one skill run ${per("skill")}, one council run ${per("council")}; the union of 3 solo runs reaches ${mean(unions).toFixed(1)} (${unions.length} windows).`);
}

md.push("", "## Council personas: who found what", "", "| Run | Candidate | Levers | Unique within the run |", "|---|---|---|---|");
// A lever is "unique" when no other candidate in the same run proposed it.
for (const x of rows.filter((x) => x.r.arm !== "solo")) {
  for (const cand of x.c.candidates ?? []) {
    const others = new Set((x.c.candidates ?? []).filter((o: any) => o !== cand).flatMap((o: any) => o.levers));
    md.push(`| ${x.r.provider}/${x.r.arm} s${x.r.seed} | ${cand.label} | ${cand.levers.join(", ")} | ${cand.levers.filter((l: string) => !others.has(l)).join(", ") || "–"} |`);
  }
}
writeFileSync(join(runDir, "brrr-report.md"), md.join("\n") + "\n");
writeJson(join(runDir, "brrr-results.json"), rows.map((x) => ({ provider: x.r.provider, arm: x.r.arm, seed: x.r.seed, costUsd: x.r.costUsd, skillInvoked: x.r.skillInvoked, subagents: x.r.subagents, code: x.c })));
console.log(md.join("\n"));
