import { expect, test } from "bun:test";
import { type Customer, type CustomerDirectory, OrderDb, listOrders } from "../src";

class CountingDirectory implements CustomerDirectory {
  calls = 0;
  constructor(private customers: Customer[]) {}
  async get(id: string) {
    this.calls++;
    return this.customers.find((c) => c.id === id);
  }
  async getMany(ids: string[]) {
    this.calls++;
    return new Map(this.customers.filter((c) => ids.includes(c.id)).map((c) => [c.id, c]));
  }
}

test("a page of orders costs a bounded number of CRM round trips", async () => {
  const db = new OrderDb();
  const customers: Customer[] = [];
  for (let i = 0; i < 100; i++) {
    customers.push({ id: `cus_${i}`, name: `Customer ${i}`, email: `c${i}@example.com` });
    db.insert({
      id: `ord_${i}`,
      accountId: "acct_1",
      customerId: `cus_${i}`,
      status: "paid",
      totalCents: 1_000,
      createdAt: 1_700_000_000 + i,
    });
  }
  const directory = new CountingDirectory(customers);
  const page = await listOrders({ db, customers: directory }, "acct_1", { limit: 100 });
  expect(page.items).toHaveLength(100);
  expect(page.items[0].customerName).toBe("Customer 99");
  expect(directory.calls).toBeLessThanOrEqual(2);
});
