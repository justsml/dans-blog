import { expect, test } from "bun:test";
import * as proration from "../src/proration";

test("changing plans during a trial charges and credits nothing", () => {
  const start = Date.UTC(2027, 3, 1);
  const sub = {
    id: "s1",
    customerId: "c1",
    planId: "starter",
    status: "trialing" as const,
    currency: "usd" as const,
    currentPeriodStart: start,
    currentPeriodEnd: start + 14 * 86_400_000,
    trialEndsAt: start + 14 * 86_400_000,
    creditCents: 0,
  };
  const up = proration.changePlan(sub, "team", new Date(start + 3 * 86_400_000));
  expect(up.prorationCents).toBe(0);
  expect(up.subscription.planId).toBe("team");
  const down = proration.changePlan(up.subscription, "starter", new Date(start + 5 * 86_400_000));
  expect(down.prorationCents).toBe(0);
  expect(down.subscription.creditCents).toBe(0);
});
