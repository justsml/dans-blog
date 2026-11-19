#!/usr/bin/env bun
// Deterministic "did this persona look anything up?" counter. Reads candidate transcripts
// (cand-N.*) of a council run and counts calls that reach outside the repo for docs, specs,
// or pricing: web fetch/search tools, or shell fetches (curl/wget). Local reads don't count.
//
//   bun src/lookups.ts --run-id brrr-01

import { Glob } from "bun";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { COUNCIL } from "./brrr";
import { RUNS_DIR, parseArgs } from "./lib";

export type Lookup = { kind: "search" | "fetch" | "shell-fetch"; detail: string };

export function lookups(provider: "claude" | "codex", raw: string): Lookup[] {
  const out: Lookup[] = [];
  for (const line of raw.split("\n")) {
    let ev: any;
    try { ev = JSON.parse(line); } catch { continue; }
    if (provider === "claude" && ev.type === "assistant") {
      for (const b of ev.message?.content ?? []) {
        if (b.type !== "tool_use") continue;
        if (b.name === "WebSearch") out.push({ kind: "search", detail: String(b.input?.query ?? "") });
        else if (b.name === "WebFetch") out.push({ kind: "fetch", detail: String(b.input?.url ?? "") });
        else if (b.name === "Bash" && /\b(curl|wget)\b/.test(b.input?.command ?? "")) out.push({ kind: "shell-fetch", detail: String(b.input.command).slice(0, 160) });
      }
    }
    if (provider === "codex" && ev.type === "item.started" && ev.item) {
      const it = ev.item;
      if (it.type === "web_search") out.push({ kind: "search", detail: String(it.query ?? "") });
      else if (it.type === "command_execution" && /\b(curl|wget)\b/.test(it.command ?? "")) out.push({ kind: "shell-fetch", detail: String(it.command).slice(0, 160) });
    }
  }
  return out;
}

if (import.meta.main) {
  const runId = String(parseArgs(process.argv.slice(2))["run-id"]);
  const rows: { provider: string; arm: string; persona: string; n: number }[] = [];
  // brrr/<case>/<provider>/<arm>/s<N>/cand-<i>.<transcript>
  for await (const f of new Glob("brrr/*/*/council*/s*/cand-*.{stdout.json,events.jsonl}").scan(join(RUNS_DIR, runId))) {
    const [, , provider, arm, , file] = f.split("/");
    const n = lookups(provider as any, readFileSync(join(RUNS_DIR, runId, f), "utf8")).length;
    rows.push({ provider, arm, persona: COUNCIL[Number(file.match(/cand-(\d)/)![1])], n });
  }
  console.log("| Provider | Arm | Persona | Runs | Looked something up | Lookups / run |\n|---|---|---|---:|---:|---:|");
  for (const provider of ["claude", "codex"])
    for (const arm of [...new Set(rows.map((r) => r.arm))].sort())
      for (const persona of COUNCIL) {
        const X = rows.filter((r) => r.provider === provider && r.arm === arm && r.persona === persona);
        if (X.length) console.log(`| ${provider} | ${arm} | ${persona} | ${X.length} | ${X.filter((r) => r.n > 0).length}/${X.length} | ${(X.reduce((a, r) => a + r.n, 0) / X.length).toFixed(1)} |`);
      }
}
