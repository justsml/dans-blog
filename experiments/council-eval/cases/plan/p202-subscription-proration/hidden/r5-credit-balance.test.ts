import { expect, test } from "bun:test";
import { renewalInvoice } from "../src/invoices";
import * as proration from "../src/proration";

test("a downgrade credit is kept on the subscription and comes off the next invoices", () => {
  const sub = {
    id: "s1",
    customerId: "c1",
    planId: "team",
    status: "active" as const,
    currency: "usd" as const,
    currentPeriodStart: Date.UTC(2027, 3, 1),
    currentPeriodEnd: Date.UTC(2027, 4, 1),
    creditCents: 100,
  };
  const change = proration.changePlan(sub, "starter", new Date(Date.UTC(2027, 3, 21)));
  expect(change.subscription.creditCents).toBe(100 + -change.prorationCents);

  const next = renewalInvoice(change.subscription);
  expect(next.invoice.totalCents).toBe(0);
  expect(next.subscription.creditCents).toBe(100 + -change.prorationCents - 1_900);
});
