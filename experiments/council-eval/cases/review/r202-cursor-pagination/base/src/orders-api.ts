import type { CustomerDirectory } from "./customers";
import type { OrderDb, OrderRow, OrderStatus } from "./db";

export interface Deps {
  db: OrderDb;
  customers: CustomerDirectory;
}

export interface ListParams {
  status?: OrderStatus;
  limit?: number;
  offset?: number;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  totalCents: number;
  createdAt: number;
  customerName: string;
}

export interface OrderPage {
  items: OrderSummary[];
  nextOffset: number | null;
}

export class ListError extends Error {}

export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

function pageSize(limit = DEFAULT_PAGE_SIZE): number {
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_PAGE_SIZE) {
    throw new ListError(`limit must be between 1 and ${MAX_PAGE_SIZE}`);
  }
  return limit;
}

/**
 * Orders for the signed-in merchant, newest first. `accountId` always comes from the
 * session, never from anything the client sends.
 */
export async function listOrders(deps: Deps, accountId: string, params: ListParams = {}): Promise<OrderPage> {
  const limit = pageSize(params.limit);
  const offset = params.offset ?? 0;
  if (!Number.isInteger(offset) || offset < 0) throw new ListError("offset must be a non-negative integer");

  const rows = deps.db.query({ accountId, status: params.status, offset, limit: limit + 1 });
  const page = rows.slice(0, limit);
  return {
    items: await summarize(deps.customers, page),
    nextOffset: rows.length > limit ? offset + limit : null,
  };
}

async function summarize(customers: CustomerDirectory, rows: OrderRow[]): Promise<OrderSummary[]> {
  const byId = await customers.getMany([...new Set(rows.map((r) => r.customerId))]);
  return rows.map((r) => ({
    id: r.id,
    status: r.status,
    totalCents: r.totalCents,
    createdAt: r.createdAt,
    customerName: byId.get(r.customerId)?.name ?? "Unknown customer",
  }));
}
