import { catalog } from "./catalog";
import type { OrderLine } from "./packaging";

/** Orders at or above this subtotal ship free. Marketing promises this sitewide. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 10_000;
export const FLAT_SHIPPING_CENTS = 799;

export interface CheckoutTotal {
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}

export function subtotal(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + catalog[l.sku].priceCents * l.qty, 0);
}

export function checkoutTotal(lines: OrderLine[]): CheckoutTotal {
  const subtotalCents = subtotal(lines);
  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : FLAT_SHIPPING_CENTS;
  return { subtotalCents, shippingCents, totalCents: subtotalCents + shippingCents };
}
