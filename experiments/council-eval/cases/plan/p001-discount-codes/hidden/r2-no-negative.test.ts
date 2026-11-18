import { expect, test } from "bun:test";
import * as cart from "../src/cart";
import { checkoutRequest } from "../src/checkout";

test("a fixed discount never makes the total negative", () => {
  const c = cart.addItem(cart.emptyCart(), "PIN");
  const d = (cart as any).applyDiscount(c, "TENOFF", new Date("2027-01-01T00:00:00Z"));
  expect(cart.cartTotal(d)).toBe(0);
  expect(checkoutRequest(d).amountCents).toBe(0);
});
