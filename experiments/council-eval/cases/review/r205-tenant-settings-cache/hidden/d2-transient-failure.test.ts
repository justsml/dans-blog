import { expect, test } from "bun:test";
import { MemorySettingsSource, SettingsService } from "../src";

class FlakySource extends MemorySettingsSource {
  failuresLeft = 1;
  override async fetch(tenantId: string) {
    if (this.failuresLeft > 0) {
      this.failuresLeft--;
      throw new Error("config service timed out");
    }
    return super.fetch(tenantId);
  }
}

test("a failed fetch is not served from the cache to later requests", async () => {
  const src = new FlakySource([{ tenantId: "acme", currency: "EUR" }]);
  const svc = new SettingsService(src, { clock: () => 1_000 });

  await expect(svc.get("acme")).rejects.toThrow("timed out");
  expect((await svc.get("acme")).currency).toBe("EUR");
});
