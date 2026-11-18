export interface RawSettings {
  tenantId: string;
  locale?: string;
  currency?: string;
  features?: Record<string, boolean>;
  rateLimitPerMinute?: number;
  branding?: { primaryColor?: string; logoUrl?: string | null };
}

/** Client for the central config service. Each call is a network request. */
export interface SettingsSource {
  fetch(tenantId: string): Promise<RawSettings | undefined>;
  update(tenantId: string, patch: Omit<RawSettings, "tenantId">): Promise<void>;
}

export class MemorySettingsSource implements SettingsSource {
  fetches = 0;
  private rows = new Map<string, RawSettings>();

  constructor(rows: RawSettings[] = []) {
    for (const r of rows) this.rows.set(r.tenantId, structuredClone(r));
  }

  async fetch(tenantId: string) {
    this.fetches++;
    const row = this.rows.get(tenantId);
    return row && structuredClone(row);
  }

  async update(tenantId: string, patch: Omit<RawSettings, "tenantId">) {
    const row = this.rows.get(tenantId);
    if (!row) throw new Error(`no tenant ${tenantId}`);
    this.rows.set(tenantId, { ...row, ...structuredClone(patch) });
  }
}
