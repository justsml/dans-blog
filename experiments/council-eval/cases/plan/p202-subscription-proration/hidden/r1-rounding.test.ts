import { expect, test } from "bun:test";
import * as proration from "../src/proration";

const active = (planId: string) => ({
  id: "s1",
  customerId: "c1",
  planId,
  status: "active" as const,
  currency: "usd" as const,
  currentPeriodStart: Date.UTC(2027, 3, 1),
  currentPeriodEnd: Date.UTC(2027, 4, 1),
  creditCents: 0,
});
const tenDaysLeft = new Date(Date.UTC(2027, 3, 21));

test("prorated charges round down and prorated credits round up", () => {
  expect(proration.changePlan(active("starter"), "team", tenDaysLeft).prorationCents).toBe(2_666);
  expect(proration.changePlan(active("pro"), "team", tenDaysLeft).prorationCents).toBe(1_666);
  expect(proration.changePlan(active("team"), "starter", tenDaysLeft).prorationCents).toBe(-2_667);
  expect(proration.changePlan(active("starter"), "pro", tenDaysLeft).prorationCents).toBe(1_000);
});
