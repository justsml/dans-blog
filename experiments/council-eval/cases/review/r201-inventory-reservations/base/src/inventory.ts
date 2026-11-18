export class InventoryError extends Error {}

interface Level {
  onHand: number;
  held: number;
}

/**
 * Stock levels per SKU. `onHand` is what is physically in the warehouse; `held` is
 * the part of it promised to open carts that have not paid yet.
 */
export class Inventory {
  private levels = new Map<string, Level>();

  receive(sku: string, qty: number) {
    if (!Number.isInteger(qty) || qty <= 0) throw new InventoryError("received quantity must be a positive integer");
    this.level(sku).onHand += qty;
  }

  onHand(sku: string): number {
    return this.levels.get(sku)?.onHand ?? 0;
  }

  held(sku: string): number {
    return this.levels.get(sku)?.held ?? 0;
  }

  /** What a new cart can still reserve. The storefront shows this as "in stock". */
  available(sku: string): number {
    return this.onHand(sku) - this.held(sku);
  }

  hold(sku: string, qty: number) {
    const free = this.available(sku);
    if (qty > free) throw new InventoryError(`only ${free} of ${sku} available`);
    this.level(sku).held += qty;
  }

  unhold(sku: string, qty: number) {
    this.level(sku).held -= qty;
  }

  /** Turns a hold into a sale: the units leave both `held` and `onHand`. */
  fulfil(sku: string, qty: number) {
    const level = this.level(sku);
    level.held -= qty;
    level.onHand -= qty;
  }

  private level(sku: string): Level {
    let level = this.levels.get(sku);
    if (!level) {
      level = { onHand: 0, held: 0 };
      this.levels.set(sku, level);
    }
    return level;
  }
}
