import { catalog } from "./catalog";

export interface CartLine {
  sku: string;
  qty: number;
}

export interface Cart {
  lines: CartLine[];
}

export const emptyCart = (): Cart => ({ lines: [] });

export function addItem(cart: Cart, sku: string, qty = 1): Cart {
  if (!catalog[sku]) throw new Error(`unknown sku ${sku}`);
  const lines = cart.lines.some((l) => l.sku === sku)
    ? cart.lines.map((l) => (l.sku === sku ? { ...l, qty: l.qty + qty } : l))
    : [...cart.lines, { sku, qty }];
  return { ...cart, lines };
}

export function subtotal(cart: Cart): number {
  return cart.lines.reduce((sum, l) => sum + catalog[l.sku].priceCents * l.qty, 0);
}

/**
 * Amount to charge, in cents. Checkout sends this straight to the payment provider,
 * which rejects negative amounts.
 */
export function cartTotal(cart: Cart): number {
  return subtotal(cart);
}
