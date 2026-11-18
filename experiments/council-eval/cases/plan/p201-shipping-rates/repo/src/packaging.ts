import { catalog } from "./catalog";

export interface OrderLine {
  sku: string;
  qty: number;
}

/** What gets handed to the carrier. */
export interface Parcel {
  weightGrams: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

interface Box {
  name: string;
  dims: [number, number, number];
  tareGrams: number;
}

/** Smallest first. The warehouse packs into the first box with enough volume. */
export const BOXES: Box[] = [
  { name: "S", dims: [25, 20, 10], tareGrams: 150 },
  { name: "M", dims: [35, 25, 20], tareGrams: 300 },
  { name: "L", dims: [50, 40, 30], tareGrams: 550 },
  { name: "XL", dims: [70, 50, 50], tareGrams: 900 },
];

const volume = ([a, b, c]: [number, number, number]) => a * b * c;

/** Packing factor: items never fill a box completely. */
const FILL = 0.8;

export function parcelFor(lines: OrderLine[]): Parcel {
  let itemsVolume = 0;
  let itemsWeight = 0;
  for (const line of lines) {
    const p = catalog[line.sku];
    if (!p) throw new Error(`unknown sku ${line.sku}`);
    itemsVolume += volume(p.size) * line.qty;
    itemsWeight += p.weightGrams * line.qty;
  }
  const box = BOXES.find((b) => volume(b.dims) * FILL >= itemsVolume);
  if (!box) throw new Error("order does not fit in one box");
  const [lengthCm, widthCm, heightCm] = box.dims;
  return { weightGrams: itemsWeight + box.tareGrams, lengthCm, widthCm, heightCm };
}
