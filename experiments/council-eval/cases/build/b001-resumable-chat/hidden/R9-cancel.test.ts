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
test("R9: cancel", async () => {
  await reset();
  const s = await start(1000, 10);
  const r = new Reader(s.response);
  await r.prefix();
  const other = new Reader(await attach(s.id));
  const otherEvents = other.all();
  const stop = await api(`/api/messages/${s.id}/cancel`, { method: "POST" });
  expect(stop.ok).toBe(true);
  done(await r.all(), "cancelled");
  done(await otherEvents, "cancelled");
  const m = await terminal(s.chat, s.id);
  expect(m.status).toBe("cancelled");
  await until(async () => (await stats()).client_disconnects === 1);
  expect((await stats()).active).toBe(0);
  done(await new Reader(await attach(s.id)).all(), "cancelled");
}, 55000);
