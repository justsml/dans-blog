export interface Product {
  sku: string;
  name: string;
  priceCents: number;
}

export const catalog: Record<string, Product> = {
  MUG: { sku: "MUG", name: "Mug", priceCents: 999 },
  TEE: { sku: "TEE", name: "T-shirt", priceCents: 2_450 },
  PIN: { sku: "PIN", name: "Enamel pin", priceCents: 300 },
};
