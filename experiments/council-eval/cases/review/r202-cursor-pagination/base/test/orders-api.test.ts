import { expect, test } from "bun:test";
import { MemoryDirectory, OrderDb, handleListOrders, listOrders } from "../src";

function fixture(n: number) {
  const db = new OrderDb();
  for (let i = 0; i < n; i++) {
    db.insert({
      id: `ord_${String(i).padStart(4, "0")}`,
      accountId: "acct_1",
      customerId: `cus_${i % 3}`,
      status: i % 4 === 0 ? "refunded" : "paid",
      totalCents: 1_000 + i,
      createdAt: 1_700_000_000 + i * 60,
    });
  }
  const customers = new MemoryDirectory([
    { id: "cus_0", name: "Ada", email: "ada@example.com" },
    { id: "cus_1", name: "Grace", email: "grace@example.com" },
  ]);
  return { db, customers };
}

test("first page is newest first with customer names", async () => {
  const page = await listOrders(fixture(5), "acct_1", { limit: 2 });
  expect(page.items.map((o) => o.id)).toEqual(["ord_0004", "ord_0003"]);
  expect(page.items.map((o) => o.customerName)).toEqual(["Grace", "Ada"]);
});

test("unknown customers get a placeholder name", async () => {
  const page = await listOrders(fixture(3), "acct_1");
  expect(page.items[0].customerName).toBe("Unknown customer");
});

test("rejects page sizes over the maximum", async () => {
  await expect(listOrders(fixture(1), "acct_1", { limit: 500 })).rejects.toThrow("limit");
});

test("handler maps bad input to 400", async () => {
  const res = await handleListOrders(fixture(1), { userId: "u", accountId: "acct_1" }, new URL("http://x/api/orders?status=lost"));
  expect(res.status).toBe(400);
});

test("offset pages walk the whole list", async () => {
  const deps = fixture(7);
  const seen: string[] = [];
  let offset: number | null = 0;
  while (offset !== null) {
    const page = await listOrders(deps, "acct_1", { limit: 3, offset });
    seen.push(...page.items.map((o) => o.id));
    offset = page.nextOffset;
  }
  expect(seen).toHaveLength(7);
  expect(new Set(seen).size).toBe(7);
});
