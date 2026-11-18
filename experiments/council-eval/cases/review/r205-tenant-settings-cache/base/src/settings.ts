import type { RawSettings, SettingsSource } from "./settings-source";

export interface TenantSettings {
  tenantId: string;
  locale: string;
  currency: string;
  features: Record<string, boolean>;
  rateLimitPerMinute: number;
  branding: { primaryColor: string; logoUrl: string | null };
}

export const DEFAULT_SETTINGS: Omit<TenantSettings, "tenantId"> = {
  locale: "en-US",
  currency: "USD",
  features: { exports: true, sso: false },
  rateLimitPerMinute: 600,
  branding: { primaryColor: "#1f6feb", logoUrl: null },
};

export class UnknownTenantError extends Error {}

/** Fills anything the tenant has not set. Always returns a fresh object. */
export function withDefaults(raw: RawSettings): TenantSettings {
  return {
    tenantId: raw.tenantId,
    locale: raw.locale ?? DEFAULT_SETTINGS.locale,
    currency: raw.currency ?? DEFAULT_SETTINGS.currency,
    features: { ...DEFAULT_SETTINGS.features, ...raw.features },
    rateLimitPerMinute: raw.rateLimitPerMinute ?? DEFAULT_SETTINGS.rateLimitPerMinute,
    branding: { ...DEFAULT_SETTINGS.branding, ...raw.branding },
  };
}

export class SettingsService {
  constructor(private source: SettingsSource) {}

  async get(tenantId: string): Promise<TenantSettings> {
    const raw = await this.source.fetch(tenantId);
    if (!raw) throw new UnknownTenantError(`unknown tenant ${tenantId}`);
    return withDefaults(raw);
  }

  async update(tenantId: string, patch: Omit<RawSettings, "tenantId">): Promise<void> {
    await this.source.update(tenantId, patch);
  }
}
