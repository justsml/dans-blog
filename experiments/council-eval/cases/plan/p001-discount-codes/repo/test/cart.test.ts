import { expect, test } from "bun:test";
import { addItem, cartTotal, emptyCart } from "../src/cart";
import { checkoutRequest } from "../src/checkout";

test("totals add up line items", () => {
  const c = addItem(addItem(emptyCart(), "MUG", 2), "PIN");
  expect(cartTotal(c)).toBe(2 * 999 + 300);
  expect(checkoutRequest(c)).toEqual({ amountCents: 2_298, currency: "usd" });
});
