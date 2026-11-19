import { expect, test } from "bun:test";
import { MemorySettingsSource, SettingsService, buildContext } from "../src";

test("one request's overrides never show up in another request's settings", async () => {
  const svc = new SettingsService(new MemorySettingsSource([{ tenantId: "acme", locale: "de-DE" }]), { clock: () => 0 });

  const staff = await buildContext(svc, "acme", {
    headers: new Headers({ "x-locale": "ja-JP", "x-preview-features": "new-checkout" }),
    staff: true,
  });
  expect(staff.settings.locale).toBe("ja-JP");
  expect(staff.settings.features["new-checkout"]).toBe(true);

  const customer = await buildContext(svc, "acme", { headers: new Headers(), userId: "u_1" });
  expect(customer.settings.locale).toBe("de-DE");
  expect(customer.settings.features["new-checkout"]).toBeUndefined();
  expect((await svc.get("acme")).locale).toBe("de-DE");
});
