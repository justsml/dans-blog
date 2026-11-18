import { expect, test } from "bun:test";
import { MemorySettingsSource, SettingsService, UnknownTenantError, buildContext } from "../src";

const source = () =>
  new MemorySettingsSource([
    { tenantId: "acme", locale: "de-DE", features: { sso: true } },
    { tenantId: "globex", currency: "EUR" },
  ]);

test("missing settings fall back to defaults", async () => {
  const svc = new SettingsService(source());
  const s = await svc.get("globex");
  expect(s).toMatchObject({ locale: "en-US", currency: "EUR", rateLimitPerMinute: 600 });
  expect(s.features).toEqual({ exports: true, sso: false });
});

test("unknown tenants are an error", async () => {
  await expect(new SettingsService(source()).get("initech")).rejects.toThrow(UnknownTenantError);
});

test("the language picker overrides the tenant locale for that request", async () => {
  const svc = new SettingsService(source());
  const ignored = await buildContext(svc, "acme", { headers: new Headers({ "x-locale": "xx-XX" }) });
  expect(ignored.settings.locale).toBe("de-DE");
  const ctx = await buildContext(svc, "acme", { headers: new Headers({ "x-locale": "fr-FR" }) });
  expect(ctx.settings.locale).toBe("fr-FR");
});

test("only staff can preview features", async () => {
  const svc = new SettingsService(source());
  const headers = new Headers({ "x-preview-features": "new-checkout" });
  expect((await buildContext(svc, "acme", { headers })).settings.features["new-checkout"]).toBeUndefined();
  expect((await buildContext(svc, "acme", { headers, staff: true })).settings.features["new-checkout"]).toBe(true);
});

test("updates are visible on the next read", async () => {
  const svc = new SettingsService(source());
  await svc.update("globex", { rateLimitPerMinute: 60 });
  expect((await svc.get("globex")).rateLimitPerMinute).toBe(60);
});
