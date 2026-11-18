import { expect, test } from "bun:test";
import { RefundError, Store, refundOrder } from "../src";

const paid = () => {
  const s = new Store();
  s.addOrder({ id: "o1", userId: "alice", totalCents: 10_000, status: "paid" });
  return s;
};

test("full refund marks the order refunded", () => {
  const s = paid();
  expect(refundOrder(s, "alice", "o1")).toEqual({ orderId: "o1", amountCents: 10_000 });
  expect(s.getOrder("o1")?.status).toBe("refunded");
});

test("another user cannot refund the order", () => {
  expect(() => refundOrder(paid(), "mallory", "o1")).toThrow(RefundError);
});
