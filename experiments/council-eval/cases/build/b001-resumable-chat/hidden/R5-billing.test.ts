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
test("R5: billing", async () => {
  await reset();
  const s = await start(120, 10);
  const r = new Reader(s.response);
  const first = await r.prefix();
  await r.close();
  const a = new Reader(await attach(s.id, first.at(-1)!.id));
  const b = new Reader(await attach(s.id, first.at(-1)!.id));
  const [ea, eb] = await Promise.all([a.all(), b.all()]);
  done(ea);
  done(eb);
  expect(ea).toEqual(eb);
  expect(text([...first, ...ea])).toBe(full(120));
  const late = await new Reader(await attach(s.id)).all();
  done(late);
  const usage = await stats();
  expect(usage.requests).toBe(1);
  expect(usage.completed).toBe(1);
  expect(usage.client_disconnects).toBe(0);
}, 55000);
