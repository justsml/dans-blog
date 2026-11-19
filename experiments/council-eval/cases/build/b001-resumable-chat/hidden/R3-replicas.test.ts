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
test("R3: replicas", async () => {
  await reset();
  const s = await start(180, 10);
  const r = new Reader(s.response);
  const first = await r.prefix();
  await r.close();
  let other: Response | undefined;
  for (let i = 0; i < 20; i++) {
    const candidate = await attach(s.id, first.at(-1)!.id);
    if (candidate.headers.get("X-Replica") !== s.replica) {
      other = candidate;
      break;
    }
    await candidate.body?.cancel();
  }
  expect(other).toBeDefined();
  expect(other!.headers.get("X-Replica")).toBeTruthy();
  const rest = await new Reader(other!).all();
  done(rest);
  expect(text([...first, ...rest])).toBe(full(180));
}, 55000);
