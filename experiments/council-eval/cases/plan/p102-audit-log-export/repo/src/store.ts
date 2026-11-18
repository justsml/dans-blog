export interface AuditEntry {
  id: string;
  companyId: string;
  at: string;
  action: string;
  actor: string;
  details: Record<string, unknown>;
}
export interface Page {
  entries: AuditEntry[];
  next?: string;
}
export interface AuditReader {
  page(company: string, cursor?: string): Promise<Page>;
}
export class AuditStore implements AuditReader {
  private rows: AuditEntry[] = [];
  constructor(private pageSize = 100) {
    if (pageSize < 1) throw new Error("page size must be positive");
  }
  append(entry: AuditEntry): void {
    if (this.rows.some(row => row.id === entry.id)) throw new Error("duplicate entry");
    if (!Number.isFinite(Date.parse(entry.at))) throw new Error("invalid timestamp");
    this.rows.push({ ...entry, details: { ...entry.details } });
  }
  async page(company: string, cursor?: string): Promise<Page> {
    const rows = this.rows.filter(row => row.companyId === company)
      .sort((a, b) => Date.parse(a.at) - Date.parse(b.at) || a.id.localeCompare(b.id));
    const offset = cursor ? Number(cursor) : 0;
    const entries = rows.slice(offset, offset + this.pageSize);
    const nextOffset = offset + entries.length;
    return {
      entries: entries.map(row => ({ ...row, details: { ...row.details } })),
      next: nextOffset < rows.length ? String(nextOffset) : undefined,
    };
  }
  size(company: string): number {
    return this.rows.filter(row => row.companyId === company).length;
  }
}
export function publicDetails(details: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(details).filter(([key]) => !key.startsWith("private_")));
}
