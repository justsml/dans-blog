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
test("R11: slow-reader", async () => {
  await reset();
  const before = Date.now();
  const s = await start(1800, 1);
  const stalled = s.response;
  try {
    const viewer = new Reader(await attach(s.id));
    const events = await viewer.all();
    done(events);
    expect(text(events)).toBe(full(1800));
    const m = await terminal(s.chat, s.id);
    expect(m.content).toBe(full(1800));
    expect(m.status).toBe("complete");
    expect(Date.now() - before).toBeLessThan(18000);
    expect((await stats()).requests).toBe(1);
  } finally {
    await stalled.body?.cancel();
  }
}, 55000);
