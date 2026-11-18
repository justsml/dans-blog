import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const CASES_DIR = join(ROOT, "cases");
export const RUNS_DIR = join(ROOT, "runs");
export const PROMPTS_DIR = join(ROOT, "prompts");
/**
 * Agent workspaces live OUTSIDE the blog repo. Inside it, the agents under test would
 * auto-load the repo's CLAUDE.md / AGENTS.md and stop being comparable.
 */
export const WS_ROOT = process.env.COUNCIL_WS_ROOT ?? join(process.env.TMPDIR ?? join(homedir(), "tmp/agents"), "council-eval-ws");

export type Provider = "claude" | "codex" | "mock";
export type Tier = "mid" | "frontier";
export type Family = "review" | "plan";
export type Split = "dev" | "heldout";

export const SEVERITIES = ["critical", "high", "medium", "low"] as const;
export type Severity = (typeof SEVERITIES)[number];
export const SEVERITY_WEIGHT: Record<Severity, number> = { critical: 4, high: 3, medium: 2, low: 1 };

export interface Defect {
  id: string;
  class: string;
  severity: Severity;
  file: string;
  lines: [number, number];
  mechanism: string;
  /** Hidden test file under hidden/, fails on PR head, passes after fixes/<id>.diff. */
  test: string;
}

export interface ReviewCase {
  id: string;
  family: "review";
  author: string;
  description: string;
  defects: Defect[];
  /** Hidden tests that must pass on the PR head (used by clean controls). */
  passingTests?: string[];
}

export interface Requirement {
  id: string;
  text: string;
  /** Hidden test file under hidden/ that encodes this requirement. */
  test: string;
  /** Where in the repo an attentive planner can discover it. */
  clue: string;
  /** new: fails before the change. preserve: existing behavior the change must not break. */
  kind?: "new" | "preserve";
}

export interface PlanCase {
  id: string;
  family: "plan";
  author: string;
  task: string;
  requirements: Requirement[];
}

export type Case = (ReviewCase | PlanCase) & { dir: string; split: Split; digest: string };

export interface Finding {
  file: string;
  line_start: number;
  line_end: number;
  severity: Severity;
  category: string;
  claim: string;
  evidence: string;
}

export interface Usage {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
}

export interface CallResult {
  ok: boolean;
  provider: Provider;
  model: string;
  role: string;
  text: string;
  json?: unknown;
  usage: Usage;
  /** List-price USD from token counts; null when the price table has no entry. */
  costUsd: number | null;
  /** Cost the CLI itself reported, when it reports one. Informational only. */
  reportedCostUsd?: number;
  wallMs: number;
  error?: string;
  transcriptPath: string;
  canaryHits: string[];
}

export const sha256 = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");

export const readJson = <T = any>(p: string): T => JSON.parse(readFileSync(p, "utf8"));
export const writeJson = (p: string, v: unknown) => {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, `${JSON.stringify(v, null, 2)}\n`);
};

export const config = () => readJson(join(ROOT, "config/models.json"));
export const personas = () => readJson(join(PROMPTS_DIR, "personas.json"));

export function template(name: string, vars: Record<string, string | number>): string {
  const raw = readFileSync(join(PROMPTS_DIR, name), "utf8");
  return raw
    .replace(/\{\{(\w+)\}\}/g, (_, k) => {
      if (!(k in vars)) throw new Error(`template ${name}: missing var ${k}`);
      return String(vars[k]);
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Digest of a directory tree, so every run records exactly which case content it saw. */
export function dirDigest(dir: string): string {
  const h = createHash("sha256");
  const walk = (d: string) => {
    for (const name of readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (name.name === "node_modules" || name.name === ".git") continue;
      const p = join(d, name.name);
      if (name.isDirectory()) walk(p);
      else h.update(p.slice(dir.length)).update(readFileSync(p));
    }
  };
  walk(dir);
  return h.digest("hex");
}

/** Deterministic 25/75 dev/held-out split by case id. Never reassign by hand. */
export const splitOf = (id: string): Split => (parseInt(sha256(`split:v1:${id}`).slice(0, 8), 16) % 4 === 0 ? "dev" : "heldout");

export function loadCases(family: Family, filter?: { split?: Split | "all"; ids?: string[] }): Case[] {
  const base = join(CASES_DIR, family);
  if (!existsSync(base)) return [];
  return readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(base, d.name, "case.json")))
    .map((d) => {
      const dir = join(base, d.name);
      const c = readJson(join(dir, "case.json"));
      return { ...c, dir, split: splitOf(c.id), digest: dirDigest(dir) } as Case;
    })
    .filter((c) => !filter?.ids?.length || filter.ids.includes(c.id))
    .filter((c) => !filter?.split || filter.split === "all" || c.split === filter.split)
    .sort((a, b) => a.id.localeCompare(b.id));
}

export async function sh(cmd: string[], opts: { cwd: string; timeoutMs?: number; env?: Record<string, string> }) {
  const proc = Bun.spawn(cmd, {
    cwd: opts.cwd,
    stdout: "pipe",
    stderr: "pipe",
    stdin: "ignore",
    env: { ...process.env, ...opts.env },
  });
  let timedOut = false;
  const timer = opts.timeoutMs
    ? setTimeout(() => {
        timedOut = true;
        proc.kill("SIGKILL");
      }, opts.timeoutMs)
    : undefined;
  const [stdout, stderr] = await Promise.all([new Response(proc.stdout).text(), new Response(proc.stderr).text()]);
  const code = await proc.exited;
  if (timer) clearTimeout(timer);
  return { code, stdout, stderr, timedOut };
}

/** Copy a case into a fresh workspace. Hidden tests, fixes, and answer keys never enter it. */
export async function prepareWorkspace(c: Case, dest: string): Promise<string> {
  mkdirSync(dest, { recursive: true });
  if (c.family === "review") {
    cpSync(join(c.dir, "base"), dest, { recursive: true });
    const diff = join(c.dir, "pr.diff");
    const r = await sh(["git", "apply", "--whitespace=nowarn", diff], { cwd: dest });
    if (r.code !== 0) throw new Error(`${c.id}: pr.diff does not apply: ${r.stderr}`);
    cpSync(diff, join(dest, "PR.diff"));
  } else {
    cpSync(join(c.dir, "repo"), dest, { recursive: true });
  }
  // A real checkout: Codex treats the git root as the project root, so nothing above leaks in.
  const git = (a: string[]) => sh(["git", ...a], { cwd: dest });
  await git(["init", "-q"]);
  await git(["add", "-A"]);
  await git(["-c", "user.email=eval@localhost", "-c", "user.name=eval", "commit", "-qm", "checkout", "--no-gpg-sign"]);
  return dest;
}

/** Run hidden test files against a workspace. Each file is one pass/fail unit. */
export async function runHiddenTests(c: Case, ws: string, files: string[]) {
  const hiddenDest = join(ws, "__hidden__");
  mkdirSync(hiddenDest, { recursive: true });
  cpSync(join(c.dir, "hidden"), hiddenDest, { recursive: true });
  const results: Record<string, boolean> = {};
  for (const f of files) {
    const r = await sh(["bun", "test", `./__hidden__/${f}`], { cwd: ws, timeoutMs: 120_000 });
    results[f] = r.code === 0 && !r.timedOut;
  }
  return results;
}

export class Semaphore {
  private queue: (() => void)[] = [];
  constructor(private slots: number) {}
  async run<T>(fn: () => Promise<T>): Promise<T> {
    if (this.slots <= 0) await new Promise<void>((r) => this.queue.push(r));
    else this.slots--;
    try {
      return await fn();
    } finally {
      const next = this.queue.shift();
      if (next) next();
      else this.slots++;
    }
  }
}

export function parseArgs(argv: string[]) {
  const out: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const [k, v] = a.slice(2).split("=", 2);
    if (v !== undefined) out[k] = v;
    else if (argv[i + 1] && !argv[i + 1].startsWith("--")) out[k] = argv[++i];
    else out[k] = true;
  }
  return out;
}

export const list = (v: unknown) => (typeof v === "string" && v ? v.split(",").map((s) => s.trim()) : []);

export const truncateWords = (s: string, max: number) => {
  const words = s.split(/\s+/);
  return { text: words.length > max ? words.slice(0, max).join(" ") : s, truncated: words.length > max, words: words.length };
};
