import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { DEFAULT_USER_AGENT } from "./config.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const NODE_FETCH_SCRIPT = join(__dirname, "impersonated-fetch-node.mjs");

const NODE_BINARY_CANDIDATES: readonly string[] = [
  process.env.NEWS_WATCH_NODE_BINARY,
  "/Users/dan/.nvm/versions/node/v24.14.1/bin/node",
  "/usr/local/bin/node",
  "/opt/homebrew/bin/node",
  "/usr/bin/node",
].filter((value): value is string => typeof value === "string" && value.length > 0);

function resolveNodeBinary(): string {
  if (process.env.NEWS_WATCH_NODE_BINARY && existsSync(process.env.NEWS_WATCH_NODE_BINARY)) {
    return process.env.NEWS_WATCH_NODE_BINARY;
  }
  for (const candidate of NODE_BINARY_CANDIDATES) {
    if (existsSync(candidate)) return candidate;
  }
  return "node";
}

const NODE_BINARY = resolveNodeBinary();

export const SUPPORTED_BROWSER_PROFILES = [
  "chrome99",
  "chrome100",
  "chrome101",
  "chrome104",
  "chrome107",
  "chrome110",
  "chrome116",
  "chrome119",
  "chrome120",
  "chrome123",
  "chrome124",
  "chrome131",
  "chrome133a",
  "chrome136",
  "chrome142",
  "chrome145",
  "chrome146",
  "chrome99_android",
  "chrome131_android",
  "safari153",
  "safari155",
  "safari170",
  "safari180",
  "safari184",
  "safari260",
  "safari2601",
  "safari172_ios",
  "safari180_ios",
  "safari184_ios",
  "safari260_ios",
  "firefox133",
  "firefox135",
  "firefox144",
  "firefox147",
  "tor145",
  "edge99",
  "edge101",
] as const;

export type BrowserProfile = (typeof SUPPORTED_BROWSER_PROFILES)[number];

export const DEFAULT_BROWSER_PROFILE: BrowserProfile = "chrome146";

export function isSupportedBrowserProfile(value: string): value is BrowserProfile {
  return (SUPPORTED_BROWSER_PROFILES as readonly string[]).includes(value);
}

export type FingerprintFetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export interface FingerprintFetchOptions {
  url: string;
  method?: FingerprintFetchMethod;
  headers?: Record<string, string>;
  body?: string;
  json?: unknown;
  params?: Record<string, string>;
  proxy?: string;
  timeoutSeconds?: number;
  followRedirects?: boolean;
  insecureSkipVerify?: boolean;
  impersonate?: BrowserProfile;
  userAgent?: string;
  cookies?: Record<string, string>;
}

export interface FingerprintFetchResult {
  ok: boolean;
  status: number;
  statusText: string;
  finalUrl: string;
  headers: Record<string, string>;
  setCookie: string[];
  body: string;
  bytes: number;
  durationSeconds: number;
  impersonated: BrowserProfile;
  usedProxy: boolean;
  json?: unknown;
  transport: "node-impers-subprocess";
  nodeVersion?: string;
}

function buildCookieHeader(cookies: Record<string, string> | undefined): string | undefined {
  if (!cookies) return undefined;
  const entries = Object.entries(cookies);
  if (entries.length === 0) return undefined;
  return entries.map(([k, v]) => `${k}=${v}`).join("; ");
}

function buildRequestHeaders(options: FingerprintFetchOptions): Record<string, string> {
  const userAgent = options.userAgent ?? DEFAULT_USER_AGENT;
  const headers: Record<string, string> = {
    "User-Agent": userAgent,
    Accept: "application/json, text/html;q=0.9, */*;q=0.5",
    "Accept-Language": "en-US,en;q=0.9",
  };
  if (!options.url.includes("reddit.com")) {
    headers["Upgrade-Insecure-Requests"] = "1";
  }
  for (const [key, value] of Object.entries(options.headers ?? {})) {
    headers[key] = value;
  }
  return headers;
}

interface NodeRequestPayload {
  url: string;
  profile: BrowserProfile;
  headers: Record<string, string>;
  params?: Record<string, string>;
  body?: string;
  json?: unknown;
  cookies?: Record<string, string>;
  proxy?: string;
  timeoutSeconds: number;
  followRedirects: boolean;
  userAgent: string;
}

function buildNodeRequest(options: FingerprintFetchOptions): NodeRequestPayload {
  const profile: BrowserProfile = isSupportedBrowserProfile(options.impersonate ?? "")
    ? (options.impersonate as BrowserProfile)
    : DEFAULT_BROWSER_PROFILE;
  const headers = buildRequestHeaders(options);
  const cookieHeader = buildCookieHeader(options.cookies);
  if (cookieHeader) headers.Cookie = cookieHeader;
  return {
    url: options.url,
    profile,
    headers,
    params: options.params,
    body: options.body,
    json: options.json,
    cookies: options.cookies,
    proxy: options.proxy,
    timeoutSeconds: options.timeoutSeconds ?? 30,
    followRedirects: options.followRedirects ?? true,
    userAgent: options.userAgent ?? DEFAULT_USER_AGENT,
  };
}

function spawnNode(request: NodeRequestPayload, timeoutMs: number): Promise<FingerprintFetchResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(NODE_BINARY, [NODE_FETCH_SCRIPT, JSON.stringify(request)], {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill("SIGKILL");
      reject(new Error(`impersonated fetch timed out after ${timeoutMs}ms (url=${request.url})`));
    }, timeoutMs);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8");
    });
    child.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(new Error(`failed to spawn node for impersonated fetch: ${err.message}`));
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`impersonated fetch exited ${code} (url=${request.url}): ${stderr.trim()}`));
        return;
      }
      try {
        const result = JSON.parse(stdout) as Omit<FingerprintFetchResult, "transport" | "nodeVersion">;
        resolve({ ...result, transport: "node-impers-subprocess", nodeVersion: process.version });
      } catch (err) {
        reject(new Error(
          `impersonated fetch returned invalid JSON (url=${request.url}): ${err instanceof Error ? err.message : String(err)} | stderr: ${stderr.trim()} | stdout-prefix: ${stdout.slice(0, 200)}`,
        ));
      }
    });
  });
}

export async function fingerprintFetch(options: FingerprintFetchOptions): Promise<FingerprintFetchResult> {
  const request = buildNodeRequest(options);
  const timeoutMs = (request.timeoutSeconds + 5) * 1000;
  return spawnNode(request, timeoutMs);
}

export async function shutdownFingerprintClient(): Promise<void> {
  // no persistent client to close — each call spawns a subprocess
}
