import { InvoiceStore } from "./store";
import { amountDue, invoiceLabel, companyBalance } from "./service";
export function ledgerView(store: InvoiceStore, companyId: string) {
  const invoices = store.list(companyId);
  return {
    companyId,
    balanceCents: companyBalance(store, companyId),
    rows: invoices.map(invoice => ({
      id: invoice.id,
      label: invoiceLabel(invoice),
      amountCents: amountDue(invoice),
      status: invoice.status,
    })),
  };
}
