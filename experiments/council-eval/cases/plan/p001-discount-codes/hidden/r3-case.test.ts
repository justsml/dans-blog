import { expect, test } from "bun:test";
import * as cart from "../src/cart";

test("codes match regardless of case", () => {
  const c = cart.addItem(cart.emptyCart(), "TEE");
  const d = (cart as any).applyDiscount(c, "tenOff", new Date("2027-01-01T00:00:00Z"));
  expect(cart.cartTotal(d)).toBe(1_450);
});
