import { expect, test } from "bun:test";
import { AuditLog } from "../src/audit";
import * as keys from "../src/keys";

test("a rotated key stays in its environment", () => {
  const store = new keys.KeyStore();
  const audit = new AuditLog();
  const testKey = keys.createKey(store, audit, "acct_1", "test", 0);
  const fresh = (keys as any).rotateKey(store, audit, "acct_1", testKey.id, 100);
  expect(fresh.secret).toMatch(/^sk_test_[0-9A-Za-z]{32}$/);
  expect(keys.authenticate(store, fresh.secret, 200)).toEqual({ accountId: "acct_1", keyId: fresh.id, env: "test" });
});
