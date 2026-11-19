import { expect, test } from "bun:test";
import { Inventory, InventoryError, ReservationService, completeCheckout } from "../src";

const setup = (stock = 10) => {
  const inv = new Inventory();
  inv.receive("LAMP", stock);
  return { inv, svc: new ReservationService(inv) };
};

test("reserving holds stock away from other carts", () => {
  const { inv, svc } = setup(5);
  svc.reserve("c1", "LAMP", 3);
  expect(inv.available("LAMP")).toBe(2);
  expect(() => svc.reserve("c2", "LAMP", 3)).toThrow(InventoryError);
});

test("releasing a line puts the stock back", () => {
  const { inv, svc } = setup(5);
  const r = svc.reserve("c1", "LAMP", 2);
  svc.release(r.id);
  expect(inv.available("LAMP")).toBe(5);
  expect(svc.get(r.id)?.status).toBe("released");
});

test("checkout sells the held units", () => {
  const { inv, svc } = setup(5);
  svc.reserve("c1", "LAMP", 2);
  expect(completeCheckout(svc, "c1")).toEqual([{ sku: "LAMP", qty: 2 }]);
  expect(inv.onHand("LAMP")).toBe(3);
  expect(inv.held("LAMP")).toBe(0);
  expect(() => completeCheckout(svc, "c1")).toThrow();
});
