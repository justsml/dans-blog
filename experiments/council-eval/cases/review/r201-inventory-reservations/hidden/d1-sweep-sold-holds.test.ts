import { expect, test } from "bun:test";
import { Inventory, ReservationService, completeCheckout } from "../src";

test("expiring holds never gives back stock that was already sold or released", () => {
  let now = 0;
  const inv = new Inventory();
  inv.receive("LAMP", 10);
  const svc = new ReservationService(inv, { clock: () => now, ttlMs: 1_000 });

  svc.reserve("paid", "LAMP", 3);
  completeCheckout(svc, "paid");
  const removed = svc.reserve("browsing", "LAMP", 1);
  svc.release(removed.id);
  svc.reserve("abandoned", "LAMP", 2);

  now = 5_000;
  svc.releaseExpired();
  svc.releaseExpired();

  expect(inv.onHand("LAMP")).toBe(7);
  expect(inv.held("LAMP")).toBe(0);
  expect(inv.available("LAMP")).toBe(7);
  expect(svc.get(removed.id)?.status).toBe("released");
});
