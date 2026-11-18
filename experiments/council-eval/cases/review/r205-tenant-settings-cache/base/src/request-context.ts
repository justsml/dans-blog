import type { SettingsService, TenantSettings } from "./settings";

export const SUPPORTED_LOCALES = ["en-US", "en-GB", "de-DE", "fr-FR", "ja-JP"];

export interface IncomingRequest {
  headers: Headers;
  userId?: string;
  /** Signed-in employee; may preview unreleased features. */
  staff?: boolean;
}

export interface RequestContext {
  tenantId: string;
  userId?: string;
  settings: TenantSettings;
}

/**
 * Settings as this request should see them: the tenant's settings with the request's
 * own overrides on top (the language picker, and feature previews for staff).
 */
export async function buildContext(service: SettingsService, tenantId: string, req: IncomingRequest): Promise<RequestContext> {
  const settings = await service.get(tenantId);

  const locale = req.headers.get("x-locale");
  if (locale && SUPPORTED_LOCALES.includes(locale)) settings.locale = locale;

  if (req.staff) {
    const previews = (req.headers.get("x-preview-features") ?? "").split(",");
    for (const f of previews.map((p) => p.trim()).filter(Boolean)) settings.features[f] = true;
  }

  return { tenantId, userId: req.userId, settings };
}
