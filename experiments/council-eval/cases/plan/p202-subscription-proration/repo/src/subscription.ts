import { type Currency, getPlan } from "./plans";

export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled";

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: SubscriptionStatus;
  currency: Currency;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  trialEndsAt?: number;
  /** Credit owed to the customer. Taken off upcoming invoices until used up. */
  creditCents: number;
}

export class SubscriptionError extends Error {}

/** Same day of month, `n` months later (clamped to the month's last day), in UTC. */
export function addMonths(at: number, n: number): number {
  const d = new Date(at);
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(d.getUTCDate(), lastDay));
  target.setUTCHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
  return target.getTime();
}

export function startSubscription(input: { id: string; customerId: string; planId: string; at: number; trialDays?: number }): Subscription {
  const plan = getPlan(input.planId);
  const trialEndsAt = input.trialDays ? input.at + input.trialDays * 86_400_000 : undefined;
  return {
    id: input.id,
    customerId: input.customerId,
    planId: plan.id,
    status: trialEndsAt ? "trialing" : "active",
    currency: plan.currency,
    currentPeriodStart: input.at,
    currentPeriodEnd: trialEndsAt ?? addMonths(input.at, 1),
    trialEndsAt,
    creditCents: 0,
  };
}

/**
 * Canceled subscriptions are kept for history and are read-only. Every function that
 * changes a subscription calls this first.
 */
export function assertMutable(sub: Subscription) {
  if (sub.status === "canceled") throw new SubscriptionError(`subscription ${sub.id} is canceled`);
}

/** Moves to the next period. Called by the billing job at `currentPeriodEnd`. */
export function renew(sub: Subscription): Subscription {
  assertMutable(sub);
  return {
    ...sub,
    status: "active",
    currentPeriodStart: sub.currentPeriodEnd,
    currentPeriodEnd: addMonths(sub.currentPeriodEnd, 1),
  };
}

export function cancel(sub: Subscription): Subscription {
  assertMutable(sub);
  return { ...sub, status: "canceled" };
}
