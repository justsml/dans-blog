import plans from "../data/plans.json";

export type Currency = "usd" | "eur";

export interface Plan {
  id: string;
  name: string;
  currency: Currency;
  priceCents: number;
  interval: "month";
}

const byId = new Map((plans as Plan[]).map((p) => [p.id, p]));

export class UnknownPlanError extends Error {}

export function getPlan(id: string): Plan {
  const plan = byId.get(id);
  if (!plan) throw new UnknownPlanError(`unknown plan ${id}`);
  return plan;
}
