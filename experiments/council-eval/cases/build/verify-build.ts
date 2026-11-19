#!/usr/bin/env bun
import { cpSync, mkdtempSync, readFileSync, rmSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { createServer } from "node:net";
type Options = {
  projectName?: string;
  env?: Record<string, string>;
  /** Where published ports are reachable (the eval's dind daemon IP). Default 127.0.0.1. */
  host?: string;
  rounds?: number;
};
type Result = {
  perRequirement: Record<string, boolean>;
  passRate: number;
  logs: string;
};
const root = process.env.TMPDIR ?? "/home/dan/tmp/agents";
process.env.TMPDIR = root;
process.env.TMP ??= root;
process.env.TEMP ??= root;
mkdirSync(root, { recursive: true });
async function port() {
  const s = createServer();
  await new Promise<void>((r) => s.listen(0, "127.0.0.1", r));
  const p = (s.address() as any).port;
  await new Promise<void>((r, j) => s.close((e) => (e ? j(e) : r())));
  return p as number;
}
async function exec(
  args: string[],
  cwd: string,
  env: Record<string, string>,
  timeout = 180000,
) {
  const p = Bun.spawn(args, {
    cwd,
    env: { ...process.env, ...env },
    stdout: "pipe",
    stderr: "pipe",
  });
  const timer = setTimeout(() => p.kill("SIGKILL"), timeout);
  try {
    const [out, err, code] = await Promise.all([
      new Response(p.stdout).text(),
      new Response(p.stderr).text(),
      p.exited,
    ]);
    return { code, output: out + err };
  } finally {
    clearTimeout(timer);
  }
}
async function hidden(
  caseDir: string,
  work: string,
  env: Record<string, string>,
  rounds = 1,
): Promise<Result> {
  const spec = JSON.parse(readFileSync(join(caseDir, "case.json"), "utf8"));
  const perRequirement: Record<string, boolean> = {};
  let logs = "";
  for (const r of spec.requirements) {
    perRequirement[r.id] = true;
    for (let n = 1; n <= rounds; n++) {
      const result = await exec(
        ["bun", "test", "--timeout", "55000", join(caseDir, "hidden", r.test)],
        work,
        env,
        60000,
      );
      perRequirement[r.id] &&= result.code === 0;
      console.log(`${r.id} round ${n}: ${result.code === 0 ? "pass" : "FAIL"}`);
      logs += `\n${r.id} round ${n}\n${result.output}`;
    }
  }
  const values = Object.values(perRequirement);
  return {
    perRequirement,
    passRate: values.filter(Boolean).length / values.length,
    logs,
  };
}
async function stack(
  work: string,
  opts: Options,
  run: (
    env: Record<string, string>,
    command: (args: string[]) => Promise<void>,
  ) => Promise<Result>,
) {
  const project =
    opts.projectName ??
    `b001-${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 6)}`;
  if (!project.startsWith("b001-"))
    throw Error("Project must start with b001-");
  const ports = new Set<number>();
  while (ports.size < 4) ports.add(await port());
  const [lb, llm, pg, redis] = [...ports];
  const env = {
    ...opts.env,
    LB_PORT: String(lb),
    LLM_PORT: String(llm),
    PG_PORT: String(pg),
    REDIS_PORT: String(redis),
    CHAT_BASE_URL: `http://${opts.host ?? "127.0.0.1"}:${lb}`,
    FAKE_LLM_URL: `http://${opts.host ?? "127.0.0.1"}:${llm}`,
    COMPOSE_PROJECT_NAME: project,
    COMPOSE_FILE: join(work, "compose.yaml"),
  };
  let logs = "";
  const command = async (args: string[]) => {
    const r = await exec(
      ["docker", "compose", "-p", project, "-f", env.COMPOSE_FILE, ...args],
      work,
      env,
      300000,
    );
    logs += `\n$ compose ${args.join(" ")}\n${r.output}`;
    if (r.code) throw Error(r.output);
  };
  let result: Result | undefined;
  try {
    await command(["up", "-d", "--build", "--wait"]);
    result = await run(env, command);
  } catch (error) {
    throw Error(`${error}\n${logs}`);
  } finally {
    const dump = await exec(
      [
        "docker",
        "compose",
        "-p",
        project,
        "-f",
        env.COMPOSE_FILE,
        "logs",
        "--no-color",
        "--tail",
        "100",
      ],
      work,
      env,
    );
    logs += dump.output;
    const down = await exec(
      [
        "docker",
        "compose",
        "-p",
        project,
        "-f",
        env.COMPOSE_FILE,
        "down",
        "-v",
        "--remove-orphans",
      ],
      work,
      env,
    );
    if (down.code) throw Error(`Cleanup failed: ${down.output}`);
  }
  result!.logs = logs + result!.logs;
  return result!;
}
export async function scoreBuild(
  caseDir: string,
  workDir: string,
  opts: Options = {},
): Promise<Result> {
  caseDir = resolve(caseDir);
  workDir = resolve(workDir);
  return stack(workDir, opts, (env) =>
    hidden(caseDir, workDir, env, opts.rounds ?? 1),
  );
}
async function verify(id: string) {
  if (!/^[a-z0-9-]+$/.test(id)) throw Error("Invalid case id");
  const started = Date.now(),
    dir = resolve("cases/build", id);
  const scratch = mkdtempSync(join(root, `${id}-`)),
    work = join(scratch, "repo");
  cpSync(join(dir, "repo"), work, { recursive: true });
  try {
    await stack(work, {}, async (env, command) => {
      let logs = "";
      const failures: string[] = [];
      for (const stage of ["baseline", "reference"]) {
        if (stage === "reference") {
          const patch = await exec(
            [
              "git",
              "apply",
              "--whitespace=nowarn",
              join(dir, "reference.diff"),
            ],
            work,
            env,
          );
          if (patch.code) throw Error(patch.output);
          await command(["up", "-d", "--build", "--wait", "--force-recreate"]);
        }
        const visible = await exec(["bun", "test"], work, env);
        logs += visible.output;
        if (visible.code) failures.push(stage + " visible tests");
        const r = await hidden(dir, work, env, stage === "baseline" ? 1 : 3);
        logs += r.logs;
        const spec = JSON.parse(readFileSync(join(dir, "case.json"), "utf8"));
        for (const req of spec.requirements) {
          const expected = stage === "reference" || req.kind === "preserve";
          if (r.perRequirement[req.id] !== expected)
            failures.push(`${stage} ${req.id}`);
        }
      }
      if (failures.length) throw Error(failures.join(", ") + "\n" + logs);
      return { perRequirement: {}, passRate: 1, logs };
    });
    console.log(`ok ${id} (${((Date.now() - started) / 1000).toFixed(1)} s)`);
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}
if (import.meta.main) {
  try {
    await verify(process.argv[2] ?? "");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
