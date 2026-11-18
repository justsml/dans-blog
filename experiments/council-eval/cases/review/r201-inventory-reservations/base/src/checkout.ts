import { ReservationError, type ReservationService } from "./reservations";

export interface OrderLine {
  sku: string;
  qty: number;
}

/**
 * Called when the customer submits payment. Converts every open hold on the cart into
 * a sale and returns the lines to charge for.
 */
export function completeCheckout(service: ReservationService, cartId: string): OrderLine[] {
  const holds = service.forCart(cartId);
  if (!holds.length) throw new ReservationError(`cart ${cartId} has nothing reserved`);
  for (const r of holds) service.commit(r.id);
  return holds.map((r) => ({ sku: r.sku, qty: r.qty }));
}
