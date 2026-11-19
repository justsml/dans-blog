import type { OrderStatus } from "./db";
import { type Deps, ListError, type ListParams, listOrders } from "./orders-api";

export interface Session {
  userId: string;
  accountId: string;
}

const STATUSES: OrderStatus[] = ["open", "paid", "refunded"];

function parseParams(url: URL): ListParams {
  const params: ListParams = {};
  const status = url.searchParams.get("status");
  if (status) {
    if (!STATUSES.includes(status as OrderStatus)) throw new ListError(`unknown status ${status}`);
    params.status = status as OrderStatus;
  }
  const limit = url.searchParams.get("limit");
  if (limit) params.limit = Number(limit);
  const offset = url.searchParams.get("offset");
  if (offset) params.offset = Number(offset);
  return params;
}

/** GET /api/orders */
export async function handleListOrders(deps: Deps, session: Session, url: URL): Promise<Response> {
  try {
    const page = await listOrders(deps, session.accountId, parseParams(url));
    return Response.json(page);
  } catch (e) {
    if (e instanceof ListError) return Response.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
