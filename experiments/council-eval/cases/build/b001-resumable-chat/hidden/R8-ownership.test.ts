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
test("R8: ownership", async () => {
  await reset();
  const s = await start(160, 10);
  const r = new Reader(s.response);
  await r.prefix();
  const foreign = await api(`/api/messages/${s.id}/stream`, {}, "bob");
  expect([403, 404]).toContain(foreign.status);
  expect(await foreign.text()).not.toContain("t0 ");
  const stop = await api(
    `/api/messages/${s.id}/cancel`,
    { method: "POST" },
    "bob",
  );
  expect([403, 404]).toContain(stop.status);
  const own = await attach(s.id);
  expect(own.status).toBe(200);
  const [events, viewer] = await Promise.all([r.all(), new Reader(own).all()]);
  done(events);
  done(viewer);
  expect((await terminal(s.chat, s.id)).status).toBe("complete");
}, 55000);
