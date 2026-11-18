#!/usr/bin/env bun
// Scores every result.json in a run. Writes score.json (and score.<judge>.json for a
// second judge) next to each result. Resumable.
//
//   bun src/score.ts --run-id pilot-01                  # primary judge
//   bun src/score.ts --run-id pilot-01 --second-judge   # agreement check
//   bun src/score.ts --run-id dry --mock

import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  type Case,
  type Finding,
  type PlanCase,
  type Provider,
  type ReviewCase,
  RUNS_DIR,
  WS_ROOT,
  SEVERITY_WEIGHT,
  Semaphore,
  config,
  loadCases,
  parseArgs,
  prepareWorkspace,
  readJson,
  runHiddenTests,
  sha256,
  template,
  writeJson,
} from "./lib";
import { callAgent } from "./providers";
import { judgePlanSchema, judgeReviewSchema } from "./schemas";

const args = parseArgs(process.argv.slice(2));
const runId = String(args["run-id"]);
const mock = Boolean(args.mock);
const cfg = config();
const judge = args["second-judge"] ? cfg.secondJudge : cfg.judge;
const judgeTag = args["second-judge"] ? `.${judge.provider}` : "";
const sem = new Semaphore(Number(args.concurrency ?? 4));
const runDir = join(RUNS_DIR, runId);
/** Judges run in an empty directory outside the repo so no project instructions load. */
const judgeCwd = join(WS_ROOT, runId, "__judge");
mkdirSync(judgeCwd, { recursive: true });

const caseIndex = new Map<string, Case>();
for (const f of ["review", "plan"] as const) for (const c of loadCases(f)) caseIndex.set(`${f}/${c.id}`, c);

function findResults(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "ws" || name === "__score_ws") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...findResults(p));
    else if (name === "result.json") out.push(p);
  }
  return out;
}

/** Strip anything that could reveal the arm: only the substance of each finding reaches the judge. */
const anonymize = (fs: Finding[]) =>
  fs.map((f, index) => ({ index, file: f.file, lines: `${f.line_start}-${f.line_end}`, severity: f.severity, claim: f.claim, evidence: f.evidence }));

async function scoreReview(c: ReviewCase, res: any, outDir: string) {
  const findings: Finding[] = res.ok ? res.output.findings : [];
  const defects = c.defects.map(({ id, class: cls, file, lines, mechanism }) => ({ id, class: cls, file, lines, mechanism }));
  let verdict: any;
  if (findings.length === 0) {
    verdict = { defects: c.defects.map((d) => ({ id: d.id, finding_index: null, rationale: "no findings" })), findings: [] };
  } else {
    const call = await sem.run(() =>
      callAgent({
        provider: (mock ? "mock" : judge.provider) as Provider,
        model: judge.model,
        effort: judge.effort,
        cwd: judgeCwd,
        prompt: template("judge-review.md", {
          defects: JSON.stringify(defects, null, 2),
          findings: JSON.stringify(anonymize(findings), null, 2),
        }),
        schema: judgeReviewSchema,
        mode: "read",
        logPath: join(outDir, `judge${judgeTag}`),
        role: "judge",
        mock: () => {
          const n = parseInt(sha256(outDir).slice(0, 6), 16);
          return {
            defects: c.defects.map((d, i) => ({ id: d.id, finding_index: (n >> i) % 2 ? 0 : null, rationale: "mock" })),
            findings: findings.map((_, i) => ({ index: i, label: (["match", "valid", "invalid", "nit"] as const)[(n >> i) % 4], rationale: "mock" })),
          };
        },
      }),
    );
    if (!call.ok) throw new Error(`judge failed: ${call.error}`);
    verdict = call.json;
  }

  const matched = new Set<string>(
    verdict.defects.filter((d: any) => d.finding_index != null && d.finding_index < findings.length).map((d: any) => d.id),
  );
  const total = c.defects.reduce((a, d) => a + SEVERITY_WEIGHT[d.severity], 0);
  const got = c.defects.filter((d) => matched.has(d.id)).reduce((a, d) => a + SEVERITY_WEIGHT[d.severity], 0);
  const labels = verdict.findings.map((f: any) => f.label);
  const highInvalid = verdict.findings.filter(
    (f: any) => f.label === "invalid" && ["critical", "high"].includes(findings[f.index]?.severity),
  ).length;
  // Deterministic location check, recorded so judge matches can be audited for plausibility.
  const locationAgrees = c.defects.map((d) => {
    const idx = verdict.defects.find((v: any) => v.id === d.id)?.finding_index;
    const f = idx != null ? findings[idx] : undefined;
    return { id: d.id, judged: idx != null, nearby: Boolean(f && f.file.endsWith(d.file) && f.line_start <= d.lines[1] + 10 && f.line_end >= d.lines[0] - 10) };
  });
  return {
    family: "review",
    clean: c.defects.length === 0,
    recall: c.defects.length ? matched.size / c.defects.length : null,
    weightedRecall: c.defects.length ? got / total : null,
    perDefect: c.defects.map((d) => ({ id: d.id, class: d.class, severity: d.severity, matched: matched.has(d.id) })),
    nFindings: findings.length,
    labels: { match: count(labels, "match"), valid: count(labels, "valid"), invalid: count(labels, "invalid"), nit: count(labels, "nit") },
    highSeverityFalseAlarms: highInvalid,
    precision: findings.length ? (count(labels, "match") + count(labels, "valid")) / findings.length : null,
    locationAgrees,
    verdict,
  };
}

async function scorePlan(c: PlanCase, res: any, outDir: string) {
  if (!res.ok) return { family: "plan", hiddenPassRate: 0, coverage: 0, failed: true };
  const ws = await prepareWorkspace(c as unknown as Case, join(WS_ROOT, runId, "__score", res.caseId, res.provider, res.arm, `s${res.seed}`));
  const plan = res.arm === "P0" ? "" : `<plan>\n${res.output}\n</plan>`;
  const impl = cfg.implementer;
  const run = await sem.run(() =>
    callAgent({
      provider: (mock ? "mock" : impl.provider) as Provider,
      model: impl.model,
      effort: impl.effort,
      cwd: ws,
      prompt: template("implement.md", { task: c.task, plan }),
      mode: "write",
      logPath: join(outDir, "implementer"),
      role: "implementer",
      mock: () => "mock implementation: no changes",
    }),
  );
  const tests = await runHiddenTests(c as unknown as Case, ws, c.requirements.map((r) => r.test));
  const passed = c.requirements.filter((r) => tests[r.test]).length;

  let coverage: number | null = null;
  let verdict: any;
  if (res.arm !== "P0") {
    const call = await sem.run(() =>
      callAgent({
        provider: (mock ? "mock" : judge.provider) as Provider,
        model: judge.model,
        effort: judge.effort,
        cwd: judgeCwd,
        prompt: template("judge-plan.md", {
          requirements: JSON.stringify(c.requirements.map(({ id, text }) => ({ id, text })), null, 2),
          plan: res.output,
        }),
        schema: judgePlanSchema,
        mode: "read",
        logPath: join(outDir, `judge${judgeTag}`),
        role: "judge",
        mock: () => ({ requirements: c.requirements.map((r) => ({ id: r.id, satisfied: false, rationale: "mock" })) }),
      }),
    );
    if (call.ok) {
      verdict = call.json;
      coverage = verdict.requirements.filter((r: any) => r.satisfied).length / c.requirements.length;
    }
  }
  return {
    family: "plan",
    hiddenPassRate: passed / c.requirements.length,
    perRequirement: c.requirements.map((r) => ({ id: r.id, passed: tests[r.test] })),
    coverage,
    implementerCostUsd: run.costUsd,
    implementerOk: run.ok,
    verdict,
  };
}

const count = (xs: string[], v: string) => xs.filter((x) => x === v).length;

const results = findResults(runDir);
let done = 0;
await Promise.all(
  results.map(async (p) => {
    const outDir = dirname(p);
    const scorePath = join(outDir, `score${judgeTag}.json`);
    if (existsSync(scorePath)) return;
    const res = readJson(p);
    const c = caseIndex.get(`${res.family}/${res.caseId}`);
    if (!c) return console.error(`missing case ${res.caseId}`);
    // The second judge checks review matching only; plan scores come from hidden tests.
    if (judgeTag && c.family === "plan") return;
    if (c.digest !== res.caseDigest) return console.error(`SKIP ${res.caseId}: case changed since the run (digest mismatch)`);
    try {
      const s = c.family === "review" ? await scoreReview(c, res, outDir) : await scorePlan(c, res, outDir);
      writeJson(scorePath, { judge: judge.model, ...s });
      done++;
    } catch (e: any) {
      console.error(`ERR score ${p}: ${e.message}`);
    }
  }),
);
console.log(`scored ${done} of ${results.length} results in ${runDir}`);
