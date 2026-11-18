import { expect, test } from "bun:test";
import { renewalInvoice } from "../src/invoices";
import { SubscriptionError, addMonths, cancel, renew, startSubscription } from "../src/subscription";

const jan31 = Date.UTC(2027, 0, 31, 9, 30);

test("monthly periods keep the anchor day, clamped in short months", () => {
  expect(new Date(addMonths(jan31, 1)).toISOString()).toBe("2027-02-28T09:30:00.000Z");
  expect(new Date(addMonths(jan31, 2)).toISOString()).toBe("2027-03-31T09:30:00.000Z");
});

test("a trial is its own period, then renews monthly", () => {
  const sub = startSubscription({ id: "s1", customerId: "c1", planId: "pro", at: jan31, trialDays: 14 });
  expect(sub).toMatchObject({ status: "trialing", currency: "usd", currentPeriodEnd: jan31 + 14 * 86_400_000 });
  const next = renew(sub);
  expect(next.status).toBe("active");
  expect(next.currentPeriodStart).toBe(sub.currentPeriodEnd);
});

test("renewal invoices use up credit before charging", () => {
  const sub = { ...startSubscription({ id: "s1", customerId: "c1", planId: "starter", at: jan31 }), creditCents: 2_500 };
  const first = renewalInvoice(sub);
  expect(first.invoice.totalCents).toBe(0);
  expect(first.subscription.creditCents).toBe(600);
  expect(renewalInvoice(first.subscription).invoice.totalCents).toBe(1_300);
});

test("canceled subscriptions cannot renew", () => {
  const sub = cancel(startSubscription({ id: "s1", customerId: "c1", planId: "pro", at: jan31 }));
  expect(() => renew(sub)).toThrow(SubscriptionError);
});
