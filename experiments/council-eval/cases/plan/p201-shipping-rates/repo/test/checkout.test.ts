import { expect, test } from "bun:test";
import { checkoutTotal, subtotal } from "../src/checkout";
import { parcelFor } from "../src/packaging";

test("subtotal sums lines", () => {
  expect(subtotal([{ sku: "BEANS", qty: 2 }, { sku: "FILTERS", qty: 1 }])).toBe(5_450);
});

test("orders over the threshold ship free", () => {
  const t = checkoutTotal([{ sku: "GRINDER", qty: 1 }]);
  expect(t).toEqual({ subtotalCents: 12_900, shippingCents: 0, totalCents: 12_900 });
});

test("parcels use the smallest box that fits and include its weight", () => {
  expect(parcelFor([{ sku: "FILTERS", qty: 2 }])).toEqual({ weightGrams: 510, lengthCm: 25, widthCm: 20, heightCm: 10 });
  expect(parcelFor([{ sku: "KETTLE", qty: 1 }, { sku: "BEANS", qty: 1 }])).toMatchObject({ lengthCm: 35, weightGrams: 2_470 });
});
