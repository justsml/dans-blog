import { expect, test } from "bun:test";
import { AuditLog } from "../src/audit";
import * as keys from "../src/keys";

const HOUR = 60 * 60 * 1000;

test("the old key keeps working for 24 hours after rotation, then stops", () => {
  const store = new keys.KeyStore();
  const audit = new AuditLog();
  const old = keys.createKey(store, audit, "acct_1", "live", 0);
  const t = 10 * HOUR;
  const fresh = (keys as any).rotateKey(store, audit, "acct_1", old.id, t);

  expect(keys.authenticate(store, old.secret, t + 24 * HOUR - 1).keyId).toBe(old.id);
  expect(() => keys.authenticate(store, old.secret, t + 24 * HOUR)).toThrow(keys.AuthError);
  expect(keys.authenticate(store, fresh.secret, t + 24 * HOUR).keyId).toBe(fresh.id);
  expect(keys.authenticate(store, fresh.secret, t + 365 * 24 * HOUR).keyId).toBe(fresh.id);
});
