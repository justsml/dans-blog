import { expect, test } from "bun:test";
import * as shipping from "../src/shipping";

test("parcels the carrier refuses are rejected with ShippingError", () => {
  const ShippingError = (shipping as any).ShippingError;
  expect(typeof ShippingError).toBe("function");
  expect(() => shipping.quoteShipping({ weightGrams: 30_001, lengthCm: 50, widthCm: 40, heightCm: 30 }, "43215")).toThrow(ShippingError);
  expect(() => shipping.quoteShipping({ weightGrams: 5_000, lengthCm: 151, widthCm: 20, heightCm: 20 }, "43215")).toThrow(ShippingError);
  expect(() => shipping.quoteShipping({ weightGrams: 5_000, lengthCm: 20, widthCm: 20, heightCm: 151 }, "43215")).toThrow(ShippingError);
});

test("parcels right at the limits are accepted", () => {
  const q = shipping.quoteShipping({ weightGrams: 30_000, lengthCm: 150, widthCm: 20, heightCm: 20 }, "43215");
  expect(q.billableGrams).toBe(30_000);
});
