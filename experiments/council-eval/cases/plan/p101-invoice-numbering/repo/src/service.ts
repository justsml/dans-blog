import { InvoiceStore, type Invoice } from "./store";
export class InvoiceError extends Error {}
export function createDraft(store: InvoiceStore, id: string, companyId: string, totalCents: number): Invoice {
  if (!Number.isInteger(totalCents) || totalCents < 0) {
    throw new InvoiceError("invalid amount");
  }
  const invoice: Invoice = {
    id,
    companyId,
    totalCents,
    status: "draft",
  };
  store.add(invoice);
  return invoice;
}
export function amountDue(invoice: Invoice): number {
  return invoice.status === "void" ? 0 : invoice.totalCents;
}
export function invoiceLabel(invoice: Invoice): string {
  return invoice.number === undefined ? "Draft " + invoice.id : String(invoice.number);
}
export function companyBalance(store: InvoiceStore, company: string): number {
  return store.list(company)
    .filter(invoice => invoice.status === "issued")
    .reduce((sum, invoice) => sum + amountDue(invoice), 0);
}
