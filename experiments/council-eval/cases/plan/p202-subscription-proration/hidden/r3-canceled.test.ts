import { expect, test } from "bun:test";
import * as proration from "../src/proration";

test("a canceled subscription cannot change plans", () => {
  const sub = {
    id: "s1",
    customerId: "c1",
    planId: "starter",
    status: "canceled" as const,
    currency: "usd" as const,
    currentPeriodStart: Date.UTC(2027, 3, 1),
    currentPeriodEnd: Date.UTC(2027, 4, 1),
    creditCents: 0,
  };
  expect(() => proration.changePlan(sub, "pro", new Date(Date.UTC(2027, 3, 10)))).toThrow();
  expect(sub.planId).toBe("starter");
});
