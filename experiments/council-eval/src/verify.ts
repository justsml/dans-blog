#!/usr/bin/env bun
// Mechanically verifies every case. A case that fails is excluded from runs until fixed.
//
// Review case: visible tests pass on the PR head; each defect's hidden test fails on
// the head and passes after that defect's fix; all fixes together pass every hidden
// test; the diff does not leak the answer key.
// Plan case: visible tests pass on the repo; every requirement test fails on the
// untouched repo ("preserve" tests must pass on it); the reference solution passes them all.
//
//   bun src/verify.ts                 # all cases
//   bun src/verify.ts --cases r001    # some cases

import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { type Case, type PlanCase, type ReviewCase, SEVERITIES, list, loadCases, parseArgs, prepareWorkspace, runHiddenTests, sh } from "./lib";

const args = parseArgs(process.argv.slice(2));
const ids = list(args.cases);
const scratch = process.env.TMPDIR ?? tmpdir();
const LEAK = /\b(seed(ed)?|inject(ed)?|defect|answer key|planted|intentional(ly)? (bug|broken))\b/i;

let failed = 0;
for (const c of [...loadCases("review", { ids }), ...loadCases("plan", { ids })]) {
  const problems: string[] = [];
  const warnings: string[] = [];
  const tmp = mkdtempSync(join(scratch, `council-verify-${c.id}-`));
  try {
    if (c.family === "review") await verifyReview(c as ReviewCase & Case, tmp, problems, warnings);
    else await verifyPlan(c as PlanCase & Case, tmp, problems, warnings);
  } catch (e: any) {
    problems.push(e.message);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  const tag = problems.length ? "FAIL" : "ok  ";
  console.log(`${tag} ${c.family}/${c.id} [${c.split}, ${c.author}]`);
  for (const p of problems) console.log(`     ✗ ${p}`);
  for (const w of warnings) console.log(`     ! ${w}`);
  if (problems.length) failed++;
}
process.exit(failed ? 1 : 0);

async function visibleTestsPass(ws: string) {
  const r = await sh(["bun", "test"], { cwd: ws, timeoutMs: 120_000 });
  return r.code === 0 || /0 fail/.test(r.stdout + r.stderr) ? true : `visible tests fail:\n${(r.stdout + r.stderr).slice(-800)}`;
}

async function applyDiff(ws: string, diff: string) {
  const r = await sh(["git", "apply", "--whitespace=nowarn", diff], { cwd: ws });
  if (r.code !== 0) throw new Error(`${diff} does not apply: ${r.stderr.trim()}`);
}

async function verifyReview(c: ReviewCase & Case, tmp: string, problems: string[], warnings: string[]) {
  if (!c.description?.trim()) problems.push("missing description");
  const idsSeen = new Set<string>();
  for (const d of c.defects) {
    if (idsSeen.has(d.id)) problems.push(`duplicate defect id ${d.id}`);
    idsSeen.add(d.id);
    if (!SEVERITIES.includes(d.severity)) problems.push(`${d.id}: bad severity ${d.severity}`);
    if (!existsSync(join(c.dir, "hidden", d.test))) problems.push(`${d.id}: missing hidden/${d.test}`);
    if (!existsSync(join(c.dir, "fixes", `${d.id}.diff`))) problems.push(`${d.id}: missing fixes/${d.id}.diff`);
  }
  if (problems.length) return;
  const diffText = readFileSync(join(c.dir, "pr.diff"), "utf8");
  const leak = diffText.split("\n").filter((l) => l.startsWith("+") && LEAK.test(l));
  if (leak.length) problems.push(`pr.diff leaks the answer key: ${leak[0].slice(0, 120)}`);
  if (LEAK.test(c.description)) problems.push("description leaks the answer key");

  const head = await prepareWorkspace(c, join(tmp, "head"));
  const vis = await visibleTestsPass(head);
  if (vis !== true) problems.push(vis);
  const tests = [...c.defects.map((d) => d.test), ...(c.passingTests ?? [])];
  const onHead = await runHiddenTests(c, head, tests);
  for (const d of c.defects) if (onHead[d.test]) problems.push(`${d.id}: hidden test passes on the PR head, so it does not detect the defect`);
  for (const t of c.passingTests ?? []) if (!onHead[t]) problems.push(`passing test ${t} fails on the PR head`);

  for (const d of c.defects) {
    const ws = join(tmp, `fix-${d.id}`);
    cpSync(head, ws, { recursive: true });
    await applyDiff(ws, join(c.dir, "fixes", `${d.id}.diff`));
    const r = await runHiddenTests(c, ws, [d.test]);
    if (!r[d.test]) problems.push(`${d.id}: hidden test still fails after its own fix`);
  }
  if (c.defects.length > 1) {
    const ws = join(tmp, "fix-all");
    cpSync(head, ws, { recursive: true });
    for (const d of c.defects) await applyDiff(ws, join(c.dir, "fixes", `${d.id}.diff`));
    const r = await runHiddenTests(c, ws, tests);
    for (const t of tests) if (!r[t]) problems.push(`${t} fails with all fixes applied (fixes interact)`);
    const v = await visibleTestsPass(ws);
    if (v !== true) problems.push(`visible tests fail with all fixes applied`);
  }
  if (!c.defects.length && !(c.passingTests ?? []).length) warnings.push("clean control has no passingTests");
}

async function verifyPlan(c: PlanCase & Case, tmp: string, problems: string[], warnings: string[]) {
  if (!c.task?.trim()) problems.push("missing task");
  for (const r of c.requirements) {
    if (!existsSync(join(c.dir, "hidden", r.test))) problems.push(`${r.id}: missing hidden/${r.test}`);
    if (!r.clue) warnings.push(`${r.id}: no clue recorded; a planner may have no way to discover it`);
  }
  if (!existsSync(join(c.dir, "reference.diff"))) problems.push("missing reference.diff");
  if (problems.length) return;
  const repo = await prepareWorkspace(c, join(tmp, "repo"));
  const vis = await visibleTestsPass(repo);
  if (vis !== true) problems.push(vis);
  const tests = c.requirements.map((r) => r.test);
  const before = await runHiddenTests(c, repo, tests);
  for (const r of c.requirements) {
    const kind = r.kind ?? "new";
    if (kind === "new" && before[r.test]) problems.push(`${r.id}: hidden test passes before any change`);
    if (kind === "preserve" && !before[r.test]) problems.push(`${r.id}: preserve test fails on the untouched repo`);
  }
  if (c.requirements.every((r) => (r.kind ?? "new") === "preserve")) problems.push("no requirement needs a change");
  const ref = join(tmp, "ref");
  cpSync(join(c.dir, "repo"), ref, { recursive: true });
  await applyDiff(ref, join(c.dir, "reference.diff"));
  const after = await runHiddenTests(c, ref, tests);
  for (const r of c.requirements) if (!after[r.test]) problems.push(`${r.id}: reference solution fails ${r.test}`);
  const v = await visibleTestsPass(ref);
  if (v !== true) problems.push("visible tests fail on the reference solution");
}
