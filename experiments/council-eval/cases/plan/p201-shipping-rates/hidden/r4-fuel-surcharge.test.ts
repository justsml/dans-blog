import { expect, test } from "bun:test";
import * as shipping from "../src/shipping";

const small = { lengthCm: 10, widthCm: 10, heightCm: 10 };

test("the fuel surcharge is added and rounded to the nearest cent, halves up", () => {
  // zone 1, 1 kg: 525 + 45 = 570, surcharge 42.75
  expect(shipping.quoteShipping({ ...small, weightGrams: 1_000 }, "43215").amountCents).toBe(613);
  // zone 2, 0.5 kg: 580, surcharge 43.5
  expect(shipping.quoteShipping({ ...small, weightGrams: 500 }, "60601").amountCents).toBe(624);
  // zone 8, 2 kg: 1450 + 3 * 210 = 2080, surcharge 156
  expect(shipping.quoteShipping({ ...small, weightGrams: 2_000 }, "96813").amountCents).toBe(2_236);
});
