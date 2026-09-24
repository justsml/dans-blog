import { test, expect } from "bun:test";
import { removeTrailingJsonCommas } from "./translation-battle-repair.ts";
test("removes only structural trailing commas and preserves evidence strings", () => {
  const bad = String.raw`{"quote":"code,} and ,] and escaped \"comma,}\"", "ratings":[{"score":4,},],}`;
  expect(JSON.parse(removeTrailingJsonCommas(bad))).toEqual({
    quote: 'code,} and ,] and escaped "comma,}"',
    ratings: [{ score: 4 }],
  });
});
test("does not repair semantic or unrelated syntax errors", () => {
  expect(() =>
    JSON.parse(removeTrailingJsonCommas('{"score":NaN,}')),
  ).toThrow();
  expect(removeTrailingJsonCommas('{"score":4}')).toBe('{"score":4}');
});
