import { expect, test } from "bun:test";
import { AuditLog } from "../src/audit";
import { AuthError, KeyError, KeyStore, authenticate, createKey, revokeKey } from "../src/keys";

test("creating, checking, revoking, and expiring keys work as before", () => {
  const store = new KeyStore();
  const audit = new AuditLog();
  const live = createKey(store, audit, "acct_1", "live", 0);
  const ci = createKey(store, audit, "acct_1", "test", 0, { ttlMs: 60_000 });

  expect(authenticate(store, live.secret, 10)).toEqual({ accountId: "acct_1", keyId: live.id, env: "live" });
  expect(store.get(live.id)?.expiresAt).toBeUndefined();
  expect(() => authenticate(store, ci.secret, 60_000)).toThrow(AuthError);

  revokeKey(store, audit, "acct_1", live.id, 20);
  expect(() => authenticate(store, live.secret, 21)).toThrow(AuthError);
  expect(() => revokeKey(store, audit, "acct_2", ci.id, 30)).toThrow(KeyError);
  expect(JSON.stringify(store.forAccount("acct_1"))).not.toContain(live.secret);

  for (let i = 0; i < 9; i++) createKey(store, audit, "acct_2", "live", 0);
  createKey(store, audit, "acct_2", "live", 0);
  expect(() => createKey(store, audit, "acct_2", "live", 0)).toThrow(KeyError);
});
