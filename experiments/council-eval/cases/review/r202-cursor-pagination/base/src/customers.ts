export interface Customer {
  id: string;
  name: string;
  email: string;
}

/** Client for the CRM service. Every method call is one HTTP round trip. */
export interface CustomerDirectory {
  get(id: string): Promise<Customer | undefined>;
  /** Up to 500 ids per call. Unknown ids are left out of the map. */
  getMany(ids: string[]): Promise<Map<string, Customer>>;
}

export class MemoryDirectory implements CustomerDirectory {
  constructor(private customers: Customer[] = []) {}

  async get(id: string) {
    return this.customers.find((c) => c.id === id);
  }

  async getMany(ids: string[]) {
    const wanted = new Set(ids);
    return new Map(this.customers.filter((c) => wanted.has(c.id)).map((c) => [c.id, c]));
  }
}
