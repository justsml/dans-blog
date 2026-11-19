export type OrderStatus = "pending" | "paid" | "refunded" | "partially_refunded";

export interface Order {
  id: string;
  userId: string;
  totalCents: number;
  refundedCents: number;
  status: OrderStatus;
}

export interface RefundRecord {
  orderId: string;
  amountCents: number;
  at: number;
}

export class Store {
  orders = new Map<string, Order>();
  refunds: RefundRecord[] = [];

  addOrder(order: Omit<Order, "refundedCents">): Order {
    const o = { ...order, refundedCents: 0 };
    this.orders.set(o.id, o);
    return o;
  }

  getOrder(id: string): Order | undefined {
    return this.orders.get(id);
  }
}
