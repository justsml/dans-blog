import { getPlan } from "./plans";
import type { Subscription } from "./subscription";

export interface InvoiceLine {
  description: string;
  amountCents: number;
}

export interface Invoice {
  subscriptionId: string;
  currency: string;
  lines: InvoiceLine[];
  totalCents: number;
}

/**
 * The invoice for the period a subscription is entering, issued at renewal. Credit on
 * the subscription comes off the plan price, up to the full amount; what is left over
 * stays on the subscription for the next invoice.
 */
export function renewalInvoice(sub: Subscription): { invoice: Invoice; subscription: Subscription } {
  const plan = getPlan(sub.planId);
  const lines: InvoiceLine[] = [{ description: `${plan.name} plan`, amountCents: plan.priceCents }];
  const applied = Math.min(sub.creditCents, plan.priceCents);
  if (applied > 0) lines.push({ description: "Account credit", amountCents: -applied });
  return {
    invoice: {
      subscriptionId: sub.id,
      currency: sub.currency,
      lines,
      totalCents: plan.priceCents - applied,
    },
    subscription: { ...sub, creditCents: sub.creditCents - applied },
  };
}
