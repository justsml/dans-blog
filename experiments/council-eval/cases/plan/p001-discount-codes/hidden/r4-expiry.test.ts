import { expect, test } from "bun:test";
import * as cart from "../src/cart";

test("expired codes are rejected with DiscountError", () => {
  const c = cart.addItem(cart.emptyCart(), "TEE");
  const DiscountError = (cart as any).DiscountError;
  expect(typeof DiscountError).toBe("function");
  expect(() => (cart as any).applyDiscount(c, "WINTER20", new Date("2026-06-01T00:00:00Z"))).toThrow(DiscountError);
  expect(() => (cart as any).applyDiscount(c, "SPRING15", new Date("2027-04-01T00:00:00Z"))).toThrow(DiscountError);
});
