import { expect, test } from "bun:test";
import { RefundError, Store, refundPartial } from "../src";

test("a different user cannot partially refund someone else's order", () => {
  const s = new Store();
  s.addOrder({ id: "o1", userId: "alice", totalCents: 10_000, status: "paid" });
  expect(() => refundPartial(s, "mallory", "o1", 1_000)).toThrow(RefundError);
  expect(s.getOrder("o1")?.refundedCents).toBe(0);
});
