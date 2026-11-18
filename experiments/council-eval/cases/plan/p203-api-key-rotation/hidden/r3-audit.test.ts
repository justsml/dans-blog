import { expect, test } from "bun:test";
import { AuditLog } from "../src/audit";
import * as keys from "../src/keys";

test("rotation is recorded in the audit trail, without the secret", () => {
  const store = new keys.KeyStore();
  const audit = new AuditLog();
  const old = keys.createKey(store, audit, "acct_1", "live", 0);
  const fresh = (keys as any).rotateKey(store, audit, "acct_1", old.id, 500);

  const rotated = audit.forAccount("acct_1").filter((e) => e.type === "key.rotated");
  expect(rotated).toHaveLength(1);
  expect(rotated[0]).toMatchObject({ accountId: "acct_1", at: 500 });
  expect([old.id, fresh.id]).toContain(rotated[0].keyId);
  expect(JSON.stringify(audit.events)).not.toContain(fresh.secret);
  expect(JSON.stringify(audit.events)).not.toContain(fresh.secret.slice(8));
});
