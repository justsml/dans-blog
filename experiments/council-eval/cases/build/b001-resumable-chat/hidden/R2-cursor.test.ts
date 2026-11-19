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
test("R2: cursor", async () => {
  await reset();
  const s = await start();
  const r = new Reader(s.response);
  const first = await r.prefix();
  ordered(first);
  await r.close();
  const rest = await new Reader(
    await attach(s.id, first.at(-1)!.id, true),
  ).all();
  done(rest);
  expect(rest[0].id).toBeGreaterThan(first.at(-1)!.id);
  expect(text([...first, ...rest])).toBe(full(100));
  const query = await new Reader(await attach(s.id, first.at(-1)!.id)).all();
  expect(query).toEqual(rest);
}, 55000);
