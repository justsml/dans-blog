import { expect, test } from "bun:test";
import { RefundError, Store, refundPartial } from "../src";

test("partial refunds cannot add up to more than the order total", () => {
  const s = new Store();
  s.addOrder({ id: "o1", userId: "alice", totalCents: 10_000, status: "paid" });
  refundPartial(s, "alice", "o1", 6_000);
  expect(() => refundPartial(s, "alice", "o1", 6_000)).toThrow(RefundError);
  expect(s.getOrder("o1")?.refundedCents).toBe(6_000);
});
