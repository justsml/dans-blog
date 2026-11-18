import { expect, test } from "bun:test";
import { AuditLog } from "../src/audit";
import * as keys from "../src/keys";

test("an account cannot rotate another account's key", () => {
  const store = new keys.KeyStore();
  const audit = new AuditLog();
  const victim = keys.createKey(store, audit, "acct_a", "live", 0);
  const rotateKey = (keys as any).rotateKey;
  expect(typeof rotateKey).toBe("function");

  expect(() => rotateKey(store, audit, "acct_b", victim.id, 100)).toThrow(keys.KeyError);
  expect(store.forAccount("acct_b")).toEqual([]);
  expect(keys.authenticate(store, victim.secret, 100 + 48 * 60 * 60 * 1000).keyId).toBe(victim.id);
});
