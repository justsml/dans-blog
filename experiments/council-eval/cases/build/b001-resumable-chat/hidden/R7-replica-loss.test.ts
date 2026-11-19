import { test, expect } from "bun:test";
import {
  api,
  reset,
  start,
  stats,
  terminal,
  Reader,
  attach,
  text,
  full,
  ordered,
  done,
  messages,
  compose,
  until,
} from "./http";

async function docker(args: string[]) {
  const p = Bun.spawn(["docker", ...args], { stdout: "pipe", stderr: "pipe" });
  const out = (await new Response(p.stdout).text()) + (await new Response(p.stderr).text());
  if (await p.exited) throw Error(out);
}
test("R7: replica-loss", async () => {
  await reset();
  const s = await start(2000, 10);
  const r = new Reader(s.response);
  await r.prefix();
  expect(s.replica).toBeTruthy();
  await r.close();
  expect((await stats()).active).toBe(1);
  const killedAt = Date.now();
  try {
    // Rolling-deploy shape: only the replica generating the reply dies; the other keeps serving.
    // X-Replica is the container hostname, which docker accepts as a container id prefix.
    await docker(["kill", s.replica!]);
  } finally {
    await compose(["up", "-d", "--wait", "app"]);
  }
  const events = await until(async () => {
    try {
      const res = await api(`/api/messages/${s.id}/stream`, {signal: AbortSignal.timeout(24000)});
      if (!res.ok) return false;
      return await new Reader(res).all();
    } catch {
      return false;
    }
  }, 28000);
  expect(["done", "error"]).toContain(events.at(-1)?.event);
  expect(["error", "complete"]).toContain(events.at(-1)?.data.status);
  expect(Date.now() - killedAt).toBeLessThan(30000);
  ordered(events);
  const m = await terminal(s.chat, s.id, 28000);
  expect(["error", "complete"]).toContain(m.status);
}, 55000);
