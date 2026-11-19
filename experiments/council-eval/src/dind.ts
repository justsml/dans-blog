// A Docker daemon owned by the eval. Agents and scoring run their compose stacks here,
// never on the host daemon, so a test subject cannot see or stop the user's own
// containers. One shared daemon keeps the image cache warm across runs.
//
//   bun src/dind.ts up | down | status

import { mkdirSync } from "node:fs";
import { WS_ROOT, sh } from "./lib";

const NAME = "council-eval-dind";
const IMAGE = "docker:29-dind";
const HOST_PORT = 23750;

export interface Dind {
  /** DOCKER_HOST for the docker CLI. */
  dockerHost: string;
  /** Address where ports published by inner stacks are reachable from this machine. */
  stackHost: string;
}

async function hostDocker(args: string[]) {
  return sh(["docker", ...args], { cwd: process.cwd(), timeoutMs: 300_000 });
}

export async function ensureDind(): Promise<Dind> {
  const st = await hostDocker(["inspect", "-f", "{{.State.Running}}", NAME]);
  mkdirSync(WS_ROOT, { recursive: true });
  const mounted = (await hostDocker(["inspect", "-f", "{{range .Mounts}}{{.Destination}} {{end}}", NAME])).stdout.includes(WS_ROOT);
  if (st.stdout.trim() !== "true" || !mounted) {
    await hostDocker(["rm", "-f", NAME]);
    const r = await hostDocker([
      "run", "-d", "--privileged", "--name", NAME,
      "-e", "DOCKER_TLS_CERTDIR=",
      "-p", `127.0.0.1:${HOST_PORT}:2375`,
      "-v", `${NAME}-data:/var/lib/docker`,
      // Compose bind mounts (e.g. ./nginx.conf) resolve on the daemon's filesystem, so the
      // workspace root is mounted at the same path inside it.
      "-v", `${WS_ROOT}:${WS_ROOT}`,
      IMAGE, "--host=tcp://0.0.0.0:2375",
    ]);
    if (r.code !== 0) throw new Error(`dind start failed: ${r.stderr}`);
  }
  const ip = (await hostDocker(["inspect", "-f", "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}", NAME])).stdout.trim();
  const dockerHost = `tcp://127.0.0.1:${HOST_PORT}`;
  for (let i = 0; i < 60; i++) {
    const ok = await sh(["docker", "info", "--format", "{{.ServerVersion}}"], { cwd: process.cwd(), env: { DOCKER_HOST: dockerHost }, timeoutMs: 10_000 });
    if (ok.code === 0) return { dockerHost, stackHost: ip };
    await Bun.sleep(1000);
  }
  throw new Error("dind did not become ready");
}

/** Ports for one stack. Each run gets its own block so concurrent stacks never collide. */
export function portBlock(slot: number) {
  const base = 20000 + (slot % 2000) * 10;
  return { LB_PORT: String(base), LLM_PORT: String(base + 1), PG_PORT: String(base + 2), REDIS_PORT: String(base + 3) };
}

if (import.meta.main) {
  const cmd = process.argv[2] ?? "status";
  if (cmd === "up") console.log(await ensureDind());
  else if (cmd === "down") console.log((await hostDocker(["rm", "-f", NAME])).stdout.trim() || "removed");
  else console.log((await hostDocker(["ps", "-a", "--filter", `name=${NAME}`, "--format", "{{.Status}}"])).stdout.trim() || "not running");
}
