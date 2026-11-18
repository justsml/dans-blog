import { expect, test } from "bun:test";
import * as cart from "../src/cart";
import { checkoutRequest } from "../src/checkout";

test("carts without a code are unchanged", () => {
  const c = cart.addItem(cart.addItem(cart.emptyCart(), "TEE", 3), "MUG");
  expect(cart.cartTotal(c)).toBe(3 * 2_450 + 999);
  expect(checkoutRequest(c)).toEqual({ amountCents: 8_349, currency: "usd" });
});
