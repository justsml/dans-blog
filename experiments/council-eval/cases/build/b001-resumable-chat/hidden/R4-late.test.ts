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
test("R4: late", async () => {
  await reset();
  const s = await start(35);
  await new Reader(s.response).all();
  const events = await new Reader(await attach(s.id)).all();
  done(events);
  expect(text(events)).toBe(full(35));
}, 55000);
