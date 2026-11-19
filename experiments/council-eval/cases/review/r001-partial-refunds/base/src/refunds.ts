import type { Store } from "./store";

export class RefundError extends Error {}

function ownedPaidOrder(store: Store, userId: string, orderId: string) {
  const order = store.getOrder(orderId);
  if (!order || order.userId !== userId) throw new RefundError("order not found");
  if (order.status !== "paid") throw new RefundError(`cannot refund a ${order.status} order`);
  return order;
}

/** Refund the whole order. Only the buyer can request it. */
export function refundOrder(store: Store, userId: string, orderId: string, now = Date.now()) {
  const order = ownedPaidOrder(store, userId, orderId);
  const amountCents = order.totalCents - order.refundedCents;
  order.refundedCents = order.totalCents;
  order.status = "refunded";
  store.refunds.push({ orderId, amountCents, at: now });
  return { orderId, amountCents };
}
