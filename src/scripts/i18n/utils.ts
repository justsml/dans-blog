import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { ACTIVE_LOCALES, isActiveLocale, type ActiveLocale } from "../../shared/i18n.ts";

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

export function findPostDirectory(slug: string) {
  const postsDir = join(process.cwd(), "src/content/posts");
  const matches = readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => name === slug || name.endsWith(`--${slug}`));

  if (matches.length === 0) {
    throw new Error(`No post directory found for slug "${slug}".`);
  }

  if (matches.length > 1) {
    throw new Error(`Multiple post directories match slug "${slug}": ${matches.join(", ")}`);
  }

  return join(postsDir, matches[0]);
}

export function getPostPaths(slug: string, locale: ActiveLocale) {
  const postDir = findPostDirectory(slug);
  const sourcePath = findSourcePath(postDir);
  const targetPath = join(postDir, locale, "index.mdx");
  const reportDir = join(process.cwd(), "reports/i18n", slug, locale);

  return {
    postDir,
    sourcePath,
    targetPath,
    reportDir,
  };
}

function findSourcePath(postDir: string) {
  const mdxPath = join(postDir, "index.mdx");
  const mdPath = join(postDir, "index.md");
  if (existsSync(mdxPath)) return mdxPath;
  if (existsSync(mdPath)) return mdPath;
  throw new Error(`No English index.md or index.mdx found in ${postDir}`);
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
