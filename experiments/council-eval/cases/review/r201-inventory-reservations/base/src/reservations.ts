import type { Inventory } from "./inventory";

export type ReservationStatus = "held" | "committed" | "released";

export interface Reservation {
  id: string;
  cartId: string;
  sku: string;
  qty: number;
  status: ReservationStatus;
  createdAt: number;
}

export class ReservationError extends Error {}

export interface ReservationOptions {
  clock?: () => number;
}

/**
 * Holds stock for a cart between "add to cart" and payment. Records stay in the map
 * after they are committed or released so order support can see what a cart held.
 */
export class ReservationService {
  private reservations = new Map<string, Reservation>();
  private nextId = 1;
  private clock: () => number;

  constructor(
    private inventory: Inventory,
    opts: ReservationOptions = {},
  ) {
    this.clock = opts.clock ?? Date.now;
  }

  reserve(cartId: string, sku: string, qty: number): Reservation {
    if (!Number.isInteger(qty) || qty <= 0) throw new ReservationError("quantity must be a positive integer");
    this.inventory.hold(sku, qty);
    const r: Reservation = {
      id: `res_${this.nextId++}`,
      cartId,
      sku,
      qty,
      status: "held",
      createdAt: this.clock(),
    };
    this.reservations.set(r.id, r);
    return r;
  }

  get(id: string): Reservation | undefined {
    return this.reservations.get(id);
  }

  /** Holds that are still open for a cart. */
  forCart(cartId: string): Reservation[] {
    return [...this.reservations.values()].filter((r) => r.cartId === cartId && r.status === "held");
  }

  /** The shopper removed the line from their cart. */
  release(id: string) {
    const r = this.mustBeHeld(id);
    this.inventory.unhold(r.sku, r.qty);
    r.status = "released";
  }

  /** Payment went through; the held units are sold. */
  commit(id: string) {
    const r = this.mustBeHeld(id);
    this.inventory.fulfil(r.sku, r.qty);
    r.status = "committed";
  }

  private mustBeHeld(id: string): Reservation {
    const r = this.reservations.get(id);
    if (!r) throw new ReservationError(`no reservation ${id}`);
    if (r.status !== "held") throw new ReservationError(`reservation ${id} is ${r.status}`);
    return r;
  }
}
