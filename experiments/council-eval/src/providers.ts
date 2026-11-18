import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { symlinkSync, lstatSync } from "node:fs";
import { type CallResult, type Provider, type Usage, config, sh, sha256 } from "./lib";

export interface CallSpec {
  provider: Provider;
  model: string;
  effort: string;
  cwd: string;
  prompt: string;
  /** JSON Schema for structured output, or undefined for free text. */
  schema?: object;
  /** read: inspect only. write: may edit files and run commands inside cwd. */
  mode: "read" | "write";
  /** Path prefix for transcript files. */
  logPath: string;
  role: string;
  /** Mock provider only: deterministic seed and a callback that fabricates output. */
  mock?: () => unknown;
}

/** Words that should never appear in an uninstructed arm's output. Checked by analyze.ts. */
const CANARY = /council of dans|council-of-dans|council-of-experts|detail detective|doomsayer|ruthless minimalist|security paranoid/gi;

type Price = { input: number | null; output: number | null; cacheRead: number | null };

function priceFor(model: string): Price | null {
  const cfg = config();
  for (const p of Object.values<any>(cfg.providers))
    for (const t of Object.values<any>(p)) if (t.model === model) return t;
  return cfg.extraPrices?.[model] ?? null;
}

export function listCost(model: string, u: Usage): number | null {
  const p = priceFor(model);
  if (!p || p.input == null || p.output == null) return null;
  // Cache writes are billed at a premium on Anthropic; we price them as input to stay
  // conservative and vendor-neutral. The CLI's own reported cost is kept alongside.
  return (u.input * p.input + u.cacheWrite * p.input + u.cacheRead * (p.cacheRead ?? p.input) + u.output * p.output) / 1e6;
}

/**
 * A clean config home per CLI: no skills, plugins, hooks, memory, global AGENTS.md or
 * CLAUDE.md. Only the login is shared, by symlink, so nothing secret is copied.
 * The user's own setup includes the council skill under test, so this is not optional.
 */
function isolatedHome(kind: "claude" | "codex"): string {
  const dir = join(homedir(), ".cache/council-eval", `${kind}-home`);
  mkdirSync(dir, { recursive: true });
  const cred = kind === "claude" ? ".credentials.json" : "auth.json";
  const src = kind === "claude" ? join(homedir(), ".claude", cred) : join(homedir(), ".codex", cred);
  const dst = join(dir, cred);
  let present = false;
  try {
    lstatSync(dst);
    present = true;
  } catch {}
  if (!present && existsSync(src)) symlinkSync(src, dst);
  if (kind === "codex" && !existsSync(join(dir, "config.toml"))) writeFileSync(join(dir, "config.toml"), "# isolated eval home\n");
  return dir;
}

/**
 * A clean HOME too: both CLIs also read user-level files straight from $HOME
 * (~/.claude/CLAUDE.md, ~/.agents/skills, ~/AGENTS.md) regardless of their config dir.
 * The probe caught both leaks before this existed.
 */
/**
 * Real CLI paths. Version-manager shims (mise) read config from $HOME, so they
 * break under the clean HOME; resolve them once with the real HOME.
 */
const bins: Record<string, string> = {};
function bin(name: "claude" | "codex"): string {
  if (bins[name]) return bins[name];
  const viaMise = Bun.spawnSync(["mise", "which", name], { stderr: "ignore" });
  const p = viaMise.success ? viaMise.stdout.toString().trim() : "";
  return (bins[name] = p || Bun.which(name) || name);
}

function cleanHomeEnv(): Record<string, string> {
  const home = join(homedir(), ".cache/council-eval", "home");
  mkdirSync(join(home, ".config"), { recursive: true });
  return { HOME: home, XDG_CONFIG_HOME: join(home, ".config") };
}

const zero = (): Usage => ({ input: 0, output: 0, cacheRead: 0, cacheWrite: 0 });

export async function callAgent(spec: CallSpec): Promise<CallResult> {
  mkdirSync(dirname(spec.logPath), { recursive: true });
  writeFileSync(`${spec.logPath}.prompt.md`, spec.prompt);
  const t0 = performance.now();
  let r: Omit<CallResult, "wallMs" | "canaryHits" | "costUsd" | "transcriptPath" | "role"> & { _cost?: number | null };
  try {
    if (spec.provider === "claude") r = await callClaude(spec);
    else if (spec.provider === "codex") r = await callCodex(spec);
    else r = callMock(spec);
  } catch (e) {
    r = { ok: false, provider: spec.provider, model: spec.model, text: "", usage: zero(), error: String(e) };
  }
  const wallMs = Math.round(performance.now() - t0);
  const canaryHits = [...new Set((r.text.match(CANARY) ?? []).map((s) => s.toLowerCase()))];
  const { _cost, ...rest } = r;
  const result: CallResult = {
    ...rest,
    role: spec.role,
    wallMs,
    costUsd: spec.provider === "mock" ? 0 : _cost !== undefined ? _cost : listCost(spec.model, r.usage),
    transcriptPath: spec.logPath,
    canaryHits,
  };
  writeFileSync(`${spec.logPath}.result.json`, JSON.stringify(result, null, 2));
  return result;
}

async function callClaude(spec: CallSpec) {
  const timeoutMs = config().limits.callTimeoutSec * 1000;
  const isolation = process.env.ANTHROPIC_API_KEY
    ? ["--bare"]
    : ["--setting-sources", "user", "--disable-slash-commands", "--strict-mcp-config"]; // plus CLAUDE_CONFIG_DIR below
  const tools = spec.mode === "write" ? ["Read", "Grep", "Glob", "Edit", "Write", "Bash"] : ["Read", "Grep", "Glob"];
  const args = [
    bin("claude"),
    "-p",
    spec.prompt,
    "--model",
    spec.model,
    "--effort",
    spec.effort,
    "--output-format",
    "json",
    "--no-session-persistence",
    ...isolation,
    "--tools",
    ...tools,
    "--permission-mode",
    spec.mode === "write" ? "bypassPermissions" : "default",
  ];
  if (spec.schema) args.push("--json-schema", JSON.stringify(spec.schema));
  const env: Record<string, string> = process.env.ANTHROPIC_API_KEY
    ? cleanHomeEnv()
    : { ...cleanHomeEnv(), CLAUDE_CONFIG_DIR: isolatedHome("claude"), CLAUDE_CODE_DISABLE_AUTO_MEMORY: "1" };
  const res = await sh(args, { cwd: spec.cwd, timeoutMs, env });
  writeFileSync(`${spec.logPath}.stdout.json`, res.stdout);
  if (res.stderr) writeFileSync(`${spec.logPath}.stderr.txt`, res.stderr);
  if (res.timedOut) throw new Error(`timeout after ${timeoutMs}ms`);
  const out = JSON.parse(res.stdout);
  const usage = zero();
  // modelUsage covers helper calls Claude Code makes on other models; price each by its own model.
  let cost = 0;
  let costKnown = true;
  if (out.modelUsage) {
    for (const [model, m] of Object.entries<any>(out.modelUsage)) {
      const u = {
        input: m.inputTokens ?? 0,
        output: m.outputTokens ?? 0,
        cacheRead: m.cacheReadInputTokens ?? 0,
        cacheWrite: m.cacheCreationInputTokens ?? 0,
      };
      usage.input += u.input;
      usage.output += u.output;
      usage.cacheRead += u.cacheRead;
      usage.cacheWrite += u.cacheWrite;
      const c = listCost(model, u) ?? m.costUSD;
      if (c == null) costKnown = false;
      else cost += c;
    }
  } else if (out.usage) {
    usage.input = out.usage.input_tokens ?? 0;
    usage.output = out.usage.output_tokens ?? 0;
    usage.cacheRead = out.usage.cache_read_input_tokens ?? 0;
    usage.cacheWrite = out.usage.cache_creation_input_tokens ?? 0;
  }
  const text: string = typeof out.result === "string" ? out.result : "";
  let json: unknown;
  if (spec.schema) json = out.structured_output ?? tryParse(text);
  const ok = !out.is_error && (!spec.schema || json !== undefined);
  return {
    ok,
    provider: "claude" as const,
    model: spec.model,
    text: text || (json ? JSON.stringify(json) : ""),
    json,
    usage,
    reportedCostUsd: out.total_cost_usd,
    error: ok ? undefined : out.is_error ? String(out.result ?? out.subtype) : "schema output missing",
    _cost: costKnown ? cost : null,
  };
}

async function callCodex(spec: CallSpec) {
  const timeoutMs = config().limits.callTimeoutSec * 1000;
  const lastMsg = `${spec.logPath}.last.txt`;
  const args = [
    bin("codex"),
    "exec",
    "--json",
    "-m",
    spec.model,
    "-c",
    `model_reasoning_effort="${spec.effort}"`,
    "-s",
    spec.mode === "write" ? "workspace-write" : "read-only",
    "--skip-git-repo-check",
    "--ephemeral",
    "--ignore-user-config",
    "--ignore-rules",
    "-C",
    spec.cwd,
    "-o",
    lastMsg,
  ];
  if (spec.schema) {
    const schemaPath = `${spec.logPath}.schema.json`;
    writeFileSync(schemaPath, JSON.stringify(spec.schema));
    args.push("--output-schema", schemaPath);
  }
  args.push(spec.prompt);
  const res = await sh(args, { cwd: spec.cwd, timeoutMs, env: { ...cleanHomeEnv(), CODEX_HOME: isolatedHome("codex") } });
  writeFileSync(`${spec.logPath}.events.jsonl`, res.stdout);
  if (res.stderr) writeFileSync(`${spec.logPath}.stderr.txt`, res.stderr);
  if (res.timedOut) throw new Error(`timeout after ${timeoutMs}ms`);
  const usage = zero();
  let failed: string | undefined;
  for (const line of res.stdout.split("\n")) {
    const ev = tryParse(line) as any;
    if (!ev) continue;
    if (ev.type === "turn.completed" && ev.usage) {
      const cached = ev.usage.cached_input_tokens ?? 0;
      usage.input += (ev.usage.input_tokens ?? 0) - cached; // OpenAI input_tokens includes cached
      usage.cacheRead += cached;
      usage.output += ev.usage.output_tokens ?? 0; // includes reasoning tokens
    }
    if (ev.type === "turn.failed" || ev.type === "error") failed = JSON.stringify(ev.error ?? ev);
  }
  const text = existsSync(lastMsg) ? readFileSync(lastMsg, "utf8") : "";
  const json = spec.schema ? tryParse(text) : undefined;
  const ok = res.code === 0 && !failed && (!spec.schema || json !== undefined);
  return {
    ok,
    provider: "codex" as const,
    model: spec.model,
    text,
    json,
    usage,
    error: ok ? undefined : (failed ?? `exit ${res.code}: ${res.stderr.slice(-500)}`),
  };
}

function callMock(spec: CallSpec) {
  const json = spec.mock?.();
  const text = typeof json === "string" ? json : JSON.stringify(json ?? {});
  const n = parseInt(sha256(spec.prompt).slice(0, 4), 16);
  return {
    ok: true,
    provider: "mock" as const,
    model: spec.model,
    text,
    json: typeof json === "string" ? undefined : json,
    usage: { input: 1000 + (n % 500), output: 200 + (n % 100), cacheRead: 0, cacheWrite: 0 },
  };
}

function tryParse(s: string): unknown {
  try {
    const t = s.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    return t ? JSON.parse(t) : undefined;
  } catch {
    return undefined;
  }
}
