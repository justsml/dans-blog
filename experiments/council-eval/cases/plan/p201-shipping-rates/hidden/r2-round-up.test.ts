import { expect, test } from "bun:test";
import * as shipping from "../src/shipping";

const small = { lengthCm: 10, widthCm: 10, heightCm: 10 };

test("billable weight rounds up to the next half kilogram", () => {
  expect(shipping.quoteShipping({ ...small, weightGrams: 1_001 }, "43215").billableGrams).toBe(1_500);
  expect(shipping.quoteShipping({ ...small, weightGrams: 501 }, "43215").billableGrams).toBe(1_000);
  expect(shipping.quoteShipping({ ...small, weightGrams: 500 }, "43215").billableGrams).toBe(500);
});
