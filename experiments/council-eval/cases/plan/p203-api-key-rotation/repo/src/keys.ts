import { createHash, randomInt } from "node:crypto";
import type { AuditLog } from "./audit";
import { MAX_KEYS_PER_ACCOUNT } from "./config";

export type KeyEnv = "live" | "test";

export interface ApiKeyRecord {
  id: string;
  accountId: string;
  env: KeyEnv;
  hash: string;
  hint: string;
  createdAt: number;
  /** The key stops working at this time. Unset for keys that do not expire. */
  expiresAt?: number;
  revokedAt?: number;
}

export interface CreatedKey {
  id: string;
  /** Shown to the customer once. Not stored. */
  secret: string;
}

export interface Principal {
  accountId: string;
  keyId: string;
  env: KeyEnv;
}

export class KeyError extends Error {}
export class AuthError extends Error {}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

export class KeyStore {
  private byId = new Map<string, ApiKeyRecord>();
  private byHash = new Map<string, string>();
  private seq = 0;

  nextId(): string {
    return `key_${++this.seq}`;
  }

  insert(record: ApiKeyRecord) {
    this.byId.set(record.id, { ...record });
    this.byHash.set(record.hash, record.id);
  }

  update(id: string, patch: Partial<Pick<ApiKeyRecord, "expiresAt" | "revokedAt">>) {
    const r = this.byId.get(id);
    if (r) Object.assign(r, patch);
  }

  get(id: string): ApiKeyRecord | undefined {
    const r = this.byId.get(id);
    return r && { ...r };
  }

  findByHash(hash: string): ApiKeyRecord | undefined {
    const id = this.byHash.get(hash);
    return id ? this.get(id) : undefined;
  }

  forAccount(accountId: string): ApiKeyRecord[] {
    return [...this.byId.values()].filter((r) => r.accountId === accountId).map((r) => ({ ...r }));
  }
}

function isActive(r: ApiKeyRecord, now: number): boolean {
  return r.revokedAt === undefined && (r.expiresAt === undefined || now < r.expiresAt);
}

export interface CreateKeyOptions {
  /** For short-lived keys, e.g. CI. */
  ttlMs?: number;
}

export function createKey(
  store: KeyStore,
  audit: AuditLog,
  accountId: string,
  env: KeyEnv,
  now = Date.now(),
  opts: CreateKeyOptions = {},
): CreatedKey {
  const active = store.forAccount(accountId).filter((r) => isActive(r, now));
  if (active.length >= MAX_KEYS_PER_ACCOUNT) throw new KeyError(`accounts can have at most ${MAX_KEYS_PER_ACCOUNT} active keys`);

  let random = "";
  for (let i = 0; i < 32; i++) random += BASE62[randomInt(62)];
  const secret = `sk_${env}_${random}`;
  const id = store.nextId();
  store.insert({
    id,
    accountId,
    env,
    hash: sha256(secret),
    hint: `sk_${env}_${random.slice(0, 4)}`,
    createdAt: now,
    expiresAt: opts.ttlMs ? now + opts.ttlMs : undefined,
  });
  audit.record({ type: "key.created", accountId, keyId: id, at: now });
  return { id, secret };
}

export function authenticate(store: KeyStore, secret: string, now = Date.now()): Principal {
  const record = store.findByHash(sha256(secret));
  if (!record || !isActive(record, now)) throw new AuthError("invalid API key");
  return { accountId: record.accountId, keyId: record.id, env: record.env };
}

/** Immediate and permanent. Only the owning account can revoke its keys. */
export function revokeKey(store: KeyStore, audit: AuditLog, accountId: string, keyId: string, now = Date.now()) {
  const record = store.get(keyId);
  if (!record || record.accountId !== accountId) throw new KeyError("key not found");
  if (record.revokedAt !== undefined) return;
  store.update(keyId, { revokedAt: now });
  audit.record({ type: "key.revoked", accountId, keyId, at: now });
}
