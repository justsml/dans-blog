import { expect, test } from "bun:test";
import * as shipping from "../src/shipping";

test("bulky light parcels bill on dimensional weight", () => {
  const q = shipping.quoteShipping({ weightGrams: 2_000, lengthCm: 40, widthCm: 30, heightCm: 20 }, "43215");
  expect(q.billableGrams).toBe(5_000);
});

test("dense parcels bill on actual weight", () => {
  const q = shipping.quoteShipping({ weightGrams: 4_000, lengthCm: 20, widthCm: 20, heightCm: 10 }, "43215");
  expect(q.billableGrams).toBe(4_000);
});
