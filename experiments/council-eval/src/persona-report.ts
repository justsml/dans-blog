#!/usr/bin/env bun
// Persona-stage report for the skill improvement loop. Codes each persona's proposal on its
// own (levers reached, sources cited, whether a source changed the plan), joins in the
// deterministic lookup counts, and reports per method: lookups, source quality, levers the
// three personas reach together, how much they overlap, and unique finds.
//
//   bun src/persona-report.ts --run-ids loop-01,brrr-01 [--out runs/loop-01/persona-report.md]
//
// brrr-01's `council` arm is the v0 baseline: its persona stage is the same brief.

import { Glob } from "bun";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { COUNCIL, LEVERS } from "./brrr";
import { RUNS_DIR, WS_ROOT, Semaphore, config, parseArgs, readJson, template, writeJson } from "./lib";
import { lookups } from "./lookups";
import { callAgent } from "./providers";

const schema = {
  type: "object", additionalProperties: false, required: ["levers", "sources", "source_changed_plan", "unverified_claims"],
  properties: {
    levers: { type: "object", additionalProperties: false, required: [...LEVERS], properties: Object.fromEntries(LEVERS.map((l) => [l, { type: "string", enum: ["none", "rejected", "proposed", "implemented"] }])) },
    sources: { type: "array", items: { type: "object", additionalProperties: false, required: ["url", "tier", "specific"], properties: { url: { type: "string" }, tier: { type: "string", enum: ["official", "secondary", "unknown"] }, specific: { type: "boolean" } } } },
    source_changed_plan: { type: "boolean" },
    unverified_claims: { type: "integer" },
  },
};

const args = parseArgs(process.argv.slice(2));
const runIds = String(args["run-ids"]).split(",");
const sem = new Semaphore(Number(args.concurrency ?? 4));
const judge = config().judge;
const cap = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}\n[... truncated]` : s);
const slug = (n: string) => n.toLowerCase().replace(/\s+/g, "-");

type Row = { method: string; provider: string; persona: string; seed: string; n: number; code: any };
const jobs: Promise<Row | null>[] = [];
for (const runId of runIds) {
  const runDir = join(RUNS_DIR, runId);
  mkdirSync(join(WS_ROOT, runId, "__judge"), { recursive: true });
  for await (const f of new Glob("brrr/*/*/council*/s*/result.json").scan(runDir)) {
    const dir = dirname(join(runDir, f));
    const r = readJson(join(runDir, f));
    const method = r.arm === "council" ? "v0 (current)" : r.arm.replace("council-", "");
    COUNCIL.forEach((persona, i) =>
      jobs.push(sem.run(async () => {
        const proposal = r.notes?.[`.scratch/council/${slug(persona)}/proposal.md`];
        if (!proposal) return null;
        const out = join(dir, `persona-${slug(persona)}.json`);
        if (!existsSync(out)) {
          const c = await callAgent({
            provider: judge.provider, model: judge.model, effort: judge.effort, cwd: join(WS_ROOT, runId, "__judge"), mode: "read", role: "persona-judge",
            logPath: out.replace(/\.json$/, ""), schema,
            prompt: template("persona-judge.md", { proposal: cap(proposal, 30000), diff: cap(r.notes[`.scratch/council/${slug(persona)}/change.diff`] ?? "", 30000) || "(no changes)" }),
          });
          writeJson(out, { ok: c.ok, error: c.error, ...(c.json as any), judgeCostUsd: c.costUsd });
        }
        const code = readJson(out);
        if (!code.ok) return null;
        const t = join(dir, `cand-${i}.${r.provider === "claude" ? "stdout.json" : "events.jsonl"}`);
        return { method, provider: r.provider, persona, seed: `${runId}/s${r.seed}`, n: lookups(r.provider, readFileSync(t, "utf8")).length, code };
      })),
    );
  }
}
const rows = (await Promise.all(jobs)).filter((x): x is Row => !!x);

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
const f1 = (x: number) => (Number.isNaN(x) ? "–" : x.toFixed(1));
const pct = (n: number, d: number) => (d ? `${Math.round((100 * n) / d)}%` : "–");
const reached = (x: Row) => new Set(LEVERS.filter((l) => ["proposed", "implemented"].includes(x.code.levers[l])));
const methods = [...new Set(rows.map((r) => r.method))].sort();
const md: string[] = [`# Persona stage: ${runIds.join(", ")}`, "", `Coded proposals: ${rows.length}. Judge: ${judge.model}.`, ""];

for (const provider of ["claude", "codex"]) {
  md.push(`## ${provider}`, "", "| Method | Personas | Looked up | Lookups / persona | Official sources / persona | Source changed the plan | Unverified claims / persona | Levers per persona | Levers, all three | Pairwise overlap | Unique finds / run |", "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|");
  for (const m of methods) {
    const X = rows.filter((r) => r.provider === provider && r.method === m);
    if (!X.length) continue;
    const bySeed = new Map<string, Row[]>();
    for (const x of X) bySeed.set(x.seed, [...(bySeed.get(x.seed) ?? []), x]);
    const trios = [...bySeed.values()].filter((t) => t.length === 3);
    const union = trios.map((t) => new Set(t.flatMap((x) => [...reached(x)])).size);
    const overlap = trios.map((t) => {
      const J = (a: Set<string>, b: Set<string>) => { const u = new Set([...a, ...b]); return u.size ? [...a].filter((l) => b.has(l)).length / u.size : 0; };
      const [a, b, c] = t.map(reached);
      return (J(a, b) + J(a, c) + J(b, c)) / 3;
    });
    const unique = trios.map((t) => t.reduce((n, x) => n + [...reached(x)].filter((l) => !t.some((o) => o !== x && reached(o).has(l))).length, 0));
    md.push(`| ${m} | ${X.length} | ${pct(X.filter((x) => x.n > 0).length, X.length)} | ${f1(mean(X.map((x) => x.n)))} | ${f1(mean(X.map((x) => x.code.sources.filter((s: any) => s.tier === "official" && s.specific).length)))} | ${pct(X.filter((x) => x.code.source_changed_plan).length, X.length)} | ${f1(mean(X.map((x) => x.code.unverified_claims)))} | ${f1(mean(X.map((x) => reached(x).size)))} | ${f1(mean(union))} | ${f1(mean(overlap))} | ${f1(mean(unique))} |`);
  }
  md.push("");
}

md.push("## Who found what (unique to one persona within a run)", "", "| Method | Persona | Unique finds | Levers |", "|---|---|---:|---|");
for (const m of methods)
  for (const persona of COUNCIL) {
    const uniq: string[] = [];
    const bySeed = new Map<string, Row[]>();
    for (const x of rows.filter((r) => r.method === m)) bySeed.set(`${x.provider}${x.seed}`, [...(bySeed.get(`${x.provider}${x.seed}`) ?? []), x]);
    for (const t of bySeed.values()) for (const x of t.filter((x) => x.persona === persona)) uniq.push(...[...reached(x)].filter((l) => !t.some((o) => o !== x && reached(o).has(l))));
    md.push(`| ${m} | ${persona} | ${uniq.length} | ${[...new Set(uniq)].join(", ") || "–"} |`);
  }
const out = String(args.out ?? join(RUNS_DIR, runIds[0], "persona-report.md"));
writeFileSync(out, md.join("\n") + "\n");
console.log(md.join("\n"));
