export interface Invoice {
  id: string;
  companyId: string;
  totalCents: number;
  status: "draft" | "issued" | "void";
  number?: number;
}
export class InvoiceStore {
  private invoices = new Map<string, Invoice>();
  private locks = new Map<string, Promise<void>>();
  add(invoice: Invoice): void {
    if (this.invoices.has(invoice.id)) throw new Error("duplicate invoice");
    this.invoices.set(invoice.id, { ...invoice });
  }
  get(id: string): Invoice | undefined {
    const invoice = this.invoices.get(id);
    return invoice && { ...invoice };
  }
  list(company: string): Invoice[] {
    return [...this.invoices.values()]
      .filter(row => row.companyId === company)
      .map(row => ({ ...row }));
  }
  failNextSave = false;
  async save(invoice: Invoice): Promise<void> {
    await Promise.resolve();
    if (this.failNextSave) {
      this.failNextSave = false;
      throw new Error("storage unavailable");
    }
    this.invoices.set(invoice.id, { ...invoice });
  }
  // Company locks also serialize concurrent issuance of the same invoice.
  async withCompany<T>(company: string, work: () => Promise<T>): Promise<T> {
    const previous = this.locks.get(company) ?? Promise.resolve();
    let release!: () => void;
    const lock = new Promise<void>(resolve => { release = resolve; });
    const tail = previous.then(() => lock);
    this.locks.set(company, tail);
    await previous;
    try {
      return await work();
    } finally {
      release();
      if (this.locks.get(company) === tail) this.locks.delete(company);
    }
  }
}
