export type OrderStatus = "open" | "paid" | "refunded";

export interface OrderRow {
  id: string;
  accountId: string;
  customerId: string;
  status: OrderStatus;
  totalCents: number;
  /** Unix seconds. */
  createdAt: number;
}

export interface OrderQuery {
  accountId: string;
  status?: OrderStatus;
  offset?: number;
  limit: number;
}

/** Newest first. Ties on createdAt fall back to id, descending, so the order is total. */
function byNewest(a: OrderRow, b: OrderRow): number {
  if (a.createdAt !== b.createdAt) return b.createdAt - a.createdAt;
  return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
}

/** Stand-in for the orders table. Mirrors the SQL the production adapter issues. */
export class OrderDb {
  private rows: OrderRow[] = [];

  insert(row: OrderRow) {
    this.rows.push(row);
  }

  query(q: OrderQuery): OrderRow[] {
    const matching = this.rows
      .filter((r) => r.accountId === q.accountId && (!q.status || r.status === q.status))
      .sort(byNewest);
    const start = q.offset ?? 0;
    return matching.slice(start, start + q.limit);
  }

  count(q: Omit<OrderQuery, "offset" | "limit">): number {
    return this.rows.filter((r) => r.accountId === q.accountId && (!q.status || r.status === q.status)).length;
  }
}
