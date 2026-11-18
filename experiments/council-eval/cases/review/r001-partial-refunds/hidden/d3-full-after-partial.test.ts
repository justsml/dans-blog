import { expect, test } from "bun:test";
import { Store, refundOrder, refundPartial } from "../src";

test("a full refund after a partial refund returns the remaining balance", () => {
  const s = new Store();
  s.addOrder({ id: "o1", userId: "alice", totalCents: 10_000, status: "paid" });
  refundPartial(s, "alice", "o1", 3_000);
  expect(refundOrder(s, "alice", "o1")).toEqual({ orderId: "o1", amountCents: 7_000 });
  expect(s.getOrder("o1")?.status).toBe("refunded");
});
