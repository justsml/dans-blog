import { expect, test } from "bun:test";
import * as cart from "../src/cart";

test("percentage discounts round the discount down to the cent", () => {
  const c = cart.addItem(cart.emptyCart(), "MUG");
  const d = (cart as any).applyDiscount(c, "SPRING15", new Date("2027-01-01T00:00:00Z"));
  expect(cart.cartTotal(d)).toBe(850);
});
