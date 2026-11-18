import { expect, test } from "bun:test";
import { MemoryDirectory, OrderDb, listOrders } from "../src";

test("paging visits every order when several share a creation second", async () => {
  const db = new OrderDb();
  const ids: string[] = [];
  for (let i = 0; i < 11; i++) {
    const id = `ord_${String(i).padStart(3, "0")}`;
    ids.push(id);
    db.insert({
      id,
      accountId: "acct_1",
      customerId: "cus_1",
      status: "paid",
      totalCents: 500,
      createdAt: i < 3 ? 1_700_000_000 + i : 1_700_000_100,
    });
  }
  const deps = { db, customers: new MemoryDirectory() };

  const seen: string[] = [];
  let cursor: string | undefined;
  for (let guard = 0; guard < 20; guard++) {
    const page = await listOrders(deps, "acct_1", { limit: 3, cursor });
    seen.push(...page.items.map((o) => o.id));
    if (!page.nextCursor) break;
    cursor = page.nextCursor;
  }
  expect([...seen].sort()).toEqual(ids);
});
