import { expect, test } from "bun:test";
import { ListError, MemoryDirectory, OrderDb, listOrders } from "../src";

test("a cursor issued to one account cannot list another account's orders", async () => {
  const db = new OrderDb();
  for (let i = 0; i < 6; i++) {
    for (const acct of ["acct_a", "acct_b"]) {
      db.insert({
        id: `${acct}_ord_${i}`,
        accountId: acct,
        customerId: "cus_1",
        status: "paid",
        totalCents: 100 * (i + 1),
        createdAt: 1_700_000_000 + i * 60,
      });
    }
  }
  const deps = { db, customers: new MemoryDirectory() };
  const bFirst = await listOrders(deps, "acct_b", { limit: 2 });
  expect(bFirst.nextCursor).toBeTruthy();

  let ids: string[] = [];
  try {
    const page = await listOrders(deps, "acct_a", { limit: 2, cursor: bFirst.nextCursor! });
    ids = page.items.map((o) => o.id);
  } catch (e) {
    expect(e).toBeInstanceOf(ListError);
  }
  expect(ids.filter((id) => id.startsWith("acct_b"))).toEqual([]);
});
