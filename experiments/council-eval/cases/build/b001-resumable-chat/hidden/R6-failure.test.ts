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
test("R6: failure", async () => {
  await reset();
  const s = await start(100, 10, 12);
  const [events, viewer] = await Promise.all([
    new Reader(s.response).all(),
    (async () => new Reader(await attach(s.id)).all())(),
  ]);
  done(events, "error");
  done(viewer, "error");
  expect(text(events)).toBe(full(12));
  const m = await terminal(s.chat, s.id);
  expect(m.status).toBe("error");
  expect(m.content).toBe(full(12));
  const late = await new Reader(await attach(s.id)).all();
  expect(late).toEqual(events);
  expect((await stats()).failed).toBe(1);
}, 55000);
