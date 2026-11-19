import { expect, test } from "bun:test";
import { checkoutTotal } from "../src/checkout";

test("orders at or over the free shipping threshold still ship free, anywhere", () => {
  const big = [{ sku: "GRINDER", qty: 1 }];
  for (const zip of ["43215", "96813"]) {
    expect((checkoutTotal as any)(big, zip)).toEqual({ subtotalCents: 12_900, shippingCents: 0, totalCents: 12_900 });
  }
  const mixed = [{ sku: "KETTLE", qty: 1 }, { sku: "MUGSET", qty: 1 }, { sku: "BEANS", qty: 1 }];
  expect((checkoutTotal as any)(mixed, "99501")).toEqual({ subtotalCents: 10_100, shippingCents: 0, totalCents: 10_100 });
});
