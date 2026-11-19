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
test("R1: disconnect", async () => {
  await reset();
  const s = await start();
  const r = new Reader(s.response);
  await r.prefix();
  await r.close();
  const m = await terminal(s.chat, s.id);
  expect(m.status).toBe("complete");
  expect(m.content).toBe(full(100));
}, 55000);
