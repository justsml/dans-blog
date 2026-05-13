import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";
import {
  findPostDirectory as findInventoryPostDirectory,
  getPostPaths as getInventoryPostPaths,
} from "./corpus-inventory.ts";
export { normalizeLocaleImportPaths } from "./localized-mdx.ts";

export type CliOptions = Record<string, string | boolean>;

export function parseArgs(argv = process.argv.slice(2)): CliOptions {
  const options: CliOptions = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;

    const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
    const nextValue = argv[index + 1];
    if (inlineValue != null) {
      options[rawKey] = inlineValue;
    } else if (nextValue != null && !nextValue.startsWith("--")) {
      options[rawKey] = nextValue;
      index += 1;
    } else {
      options[rawKey] = true;
    }
  }

  return options;
}

export function requireString(options: CliOptions, key: string) {
  const value = options[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing required --${key}`);
  }
  return value.trim();
}

export function optionalString(options: CliOptions, key: string) {
  const value = options[key];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

export function requireActiveLocale(options: CliOptions): ActiveLocale {
  const locale = requireString(options, "locale");
  if (!isActiveLocale(locale)) {
    throw new Error(
      `--locale must be one of ${ACTIVE_LOCALES.join(", ")}. Received "${locale}".`,
    );
  }
  return locale;
}

export function parseList(value: string | undefined, fallback: string[]) {
  if (!value) return fallback;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function randomizeListOrder<T>(values: T[]) {
  const shuffled = [...values];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function findPostDirectory(slug: string) {
  return findInventoryPostDirectory(slug);
}

export function getPostPaths(slug: string, locale: ActiveLocale) {
  return getInventoryPostPaths(slug, locale);
}

export function run(command: string, args: string[], options: { input?: string } = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    input: options.input,
    stdio: options.input ? ["pipe", "pipe", "pipe"] : ["ignore", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    throw new Error(
      [
        `Command failed: ${command} ${args.join(" ")}`,
        result.stdout,
        result.stderr,
      ].filter(Boolean).join("\n"),
    );
  }

  return result.stdout.trim();
}

export function runInherited(
  command: string,
  args: string[],
  options: { timeoutMs?: number } = {},
) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: "inherit",
    timeout: options.timeoutMs,
  });

  if (result.status !== 0) {
    const timeoutNote =
      result.error?.name === "TimeoutError" || result.signal === "SIGTERM"
        ? ` after ${options.timeoutMs}ms`
        : "";
    throw new Error(`Command failed${timeoutNote}: ${command} ${args.join(" ")}`);
  }
}

export function writeTextFile(path: string, contents: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents, "utf8");
}

type RunLockPayload = {
  runId: string;
  pid: number;
  startedAt: string;
  label?: string;
};

export function createRunLock(lockPath: string, runId: string, label?: string) {
  mkdirSync(dirname(lockPath), { recursive: true });
  const payload: RunLockPayload = {
    runId,
    pid: process.pid,
    startedAt: new Date().toISOString(),
    label,
  };
  writeFileSync(lockPath, JSON.stringify(payload, null, 2), "utf8");
}

export function assertRunLock(lockPath: string | undefined, expectedRunId: string | undefined) {
  if (lockPath == null || expectedRunId == null) return;

  const current = readRunLock(lockPath);
  if (current?.runId === expectedRunId) return;

  throw new Error([
    "Stale i18n translation worker stopped before writing output.",
    `Expected run id: ${expectedRunId}`,
    `Current run id: ${current?.runId ?? "missing"}`,
    `Lock: ${relativeToRepo(lockPath)}`,
  ].join(" "));
}

export function releaseRunLock(lockPath: string | undefined, expectedRunId: string | undefined) {
  if (lockPath == null || expectedRunId == null || !existsSync(lockPath)) return;
  const current = readRunLock(lockPath);
  if (current?.runId !== expectedRunId) return;
  rmSync(lockPath, { force: true });
}

function readRunLock(lockPath: string): RunLockPayload | undefined {
  if (!existsSync(lockPath)) return undefined;

  try {
    const parsed = JSON.parse(readFileSync(lockPath, "utf8"));
    return parsed != null && typeof parsed === "object" && typeof parsed.runId === "string"
      ? parsed as RunLockPayload
      : undefined;
  } catch {
    return undefined;
  }
}

export function gitCommit(message: string, paths: string[]) {
  withGitCommitLock(() => {
    runInherited("git", ["add", ...paths]);
    runInherited("git", ["commit", "--only", "-m", message, "--", ...paths]);
  });
}

export function gitShow(commit: string, filePath: string) {
  return run("git", ["show", `${commit}:${filePath}`]);
}

export function relativeToRepo(path: string) {
  return path.replace(`${process.cwd()}/`, "");
}

function withGitCommitLock(callback: () => void) {
  const lockDir = join(process.cwd(), ".git/codex-commit.lock");
  const deadline = Date.now() + 30 * 60 * 1000;

  while (true) {
    try {
      mkdirSync(lockDir);
      break;
    } catch (error) {
      if (!existsSync(lockDir)) throw error;
      if (Date.now() > deadline) {
        throw new Error(`Timed out waiting for git commit lock at ${relativeToRepo(lockDir)}.`);
      }
      sleep(500);
    }
  }

  try {
    callback();
  } finally {
    rmSync(lockDir, { recursive: true, force: true });
  }
}

function sleep(milliseconds: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}
