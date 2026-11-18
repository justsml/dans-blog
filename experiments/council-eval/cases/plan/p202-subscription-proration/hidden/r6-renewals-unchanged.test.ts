import { expect, test } from "bun:test";
import { renewalInvoice } from "../src/invoices";
import { renew, startSubscription } from "../src/subscription";

test("renewal and invoicing for subscriptions that never change plan are unchanged", () => {
  const start = Date.UTC(2027, 0, 15, 12);
  const sub = startSubscription({ id: "s1", customerId: "c1", planId: "pro", at: start });
  const next = renew(sub);
  expect(next.currentPeriodStart).toBe(sub.currentPeriodEnd);
  expect(new Date(next.currentPeriodEnd).toISOString()).toBe("2027-03-15T12:00:00.000Z");
  const { invoice, subscription } = renewalInvoice({ ...next, creditCents: 400 });
  expect(invoice).toEqual({
    subscriptionId: "s1",
    currency: "usd",
    lines: [
      { description: "Pro plan", amountCents: 4_900 },
      { description: "Account credit", amountCents: -400 },
    ],
    totalCents: 4_500,
  });
  expect(subscription.creditCents).toBe(0);
});
