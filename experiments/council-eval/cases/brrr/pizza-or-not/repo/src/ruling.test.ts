import { expect, test } from "bun:test";
import { parseRuling } from "./ruling";

test("extracts the ruling from surrounding prose", () => {
  const r = parseRuling('The Bureau finds:\n{"is_pizza": false, "label": "Not pizza (Calzone)", "confidence": 0.9, "evidence": ["folded"], "section": "2.2", "verdict": "Sealed."}');
  expect(r.label).toBe("Not pizza (Calzone)");
  expect(r.is_pizza).toBe(false);
});

test("rejects a reply with no ruling", () => {
  expect(() => parseRuling("The Bureau is closed.")).toThrow();
});
