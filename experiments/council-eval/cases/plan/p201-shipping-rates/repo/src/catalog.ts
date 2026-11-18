export interface Product {
  sku: string;
  name: string;
  priceCents: number;
  weightGrams: number;
  /** Packed size of one unit, in cm. */
  size: [number, number, number];
}

export const catalog: Record<string, Product> = {
  KETTLE: { sku: "KETTLE", name: "Stovetop kettle", priceCents: 4_500, weightGrams: 1_150, size: [22, 18, 20] },
  MUGSET: { sku: "MUGSET", name: "Mug set (4)", priceCents: 3_200, weightGrams: 1_400, size: [26, 18, 12] },
  BEANS: { sku: "BEANS", name: "Coffee beans 1 kg", priceCents: 2_400, weightGrams: 1_020, size: [24, 14, 8] },
  FILTERS: { sku: "FILTERS", name: "Paper filters", priceCents: 650, weightGrams: 180, size: [14, 12, 4] },
  GRINDER: { sku: "GRINDER", name: "Burr grinder", priceCents: 12_900, weightGrams: 3_300, size: [32, 20, 18] },
};
