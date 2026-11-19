import { expect, test } from "bun:test";
import { AuditLog } from "../src/audit";
import * as keys from "../src/keys";

test("a revoked key cannot be rotated back to life", () => {
  const store = new keys.KeyStore();
  const audit = new AuditLog();
  const key = keys.createKey(store, audit, "acct_1", "live", 0);
  keys.revokeKey(store, audit, "acct_1", key.id, 50);
  const rotateKey = (keys as any).rotateKey;
  expect(typeof rotateKey).toBe("function");

  expect(() => rotateKey(store, audit, "acct_1", key.id, 100)).toThrow(keys.KeyError);
  expect(store.forAccount("acct_1")).toHaveLength(1);
  expect(audit.events.map((e) => e.type)).toEqual(["key.created", "key.revoked"]);
});
