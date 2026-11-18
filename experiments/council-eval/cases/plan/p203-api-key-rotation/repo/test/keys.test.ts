import { expect, test } from "bun:test";
import { AuditLog } from "../src/audit";
import { AuthError, KeyError, KeyStore, authenticate, createKey, revokeKey } from "../src/keys";

test("a created key authenticates as its account and environment", () => {
  const store = new KeyStore();
  const key = createKey(store, new AuditLog(), "acct_1", "test", 0);
  expect(key.secret).toMatch(/^sk_test_[0-9A-Za-z]{32}$/);
  expect(authenticate(store, key.secret, 1)).toEqual({ accountId: "acct_1", keyId: key.id, env: "test" });
  expect(() => authenticate(store, `${key.secret}x`, 1)).toThrow(AuthError);
});

test("revoked keys stop working at once", () => {
  const store = new KeyStore();
  const audit = new AuditLog();
  const key = createKey(store, audit, "acct_1", "live", 0);
  expect(() => revokeKey(store, audit, "acct_2", key.id, 5)).toThrow(KeyError);
  revokeKey(store, audit, "acct_1", key.id, 5);
  expect(() => authenticate(store, key.secret, 6)).toThrow(AuthError);
  expect(audit.events.map((e) => e.type)).toEqual(["key.created", "key.revoked"]);
});

test("short-lived keys expire", () => {
  const store = new KeyStore();
  const key = createKey(store, new AuditLog(), "acct_1", "live", 0, { ttlMs: 1_000 });
  expect(authenticate(store, key.secret, 999).keyId).toBe(key.id);
  expect(() => authenticate(store, key.secret, 1_000)).toThrow(AuthError);
});
