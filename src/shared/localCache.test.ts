import { _createLocalCache } from "./localCache.ts"; // Update with the actual path
import Database from "libsql";
import * as fs from "fs";
import * as path from "path";
import { describe, beforeAll, afterAll, test, expect } from "bun:test";
import { makeLogs } from "../components/LogHelper.ts";

const log = makeLogs(`SqliteCache`);

type Database = ReturnType<typeof Database>;

describe("SqliteCache", () => {
  const testDbPath = path.join(__dirname, "test-db.sqlite");
  let db: Database;
  let cache: Awaited<ReturnType<typeof _createLocalCache>>;

  beforeAll(async () => {
    log("Creating test database");
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    db = new Database(`${testDbPath}`);
    cache = await _createLocalCache(db);
  });

  afterAll(async () => {
    await cache.close();
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  test("get should return undefined for non-existent keys", async () => {
    const result = await cache.get("no-such-key");
    expect(result).toBeUndefined();
  });

  test("set and get should store and retrieve data", async () => {
    await cache.set("test-key", { foo: "bar" });

    const result = await cache.get("test-key");
    expect(result).toEqual({ foo: "bar" });
  });

  test("ttl should expire keys properly", async () => {
    await cache.set("expiring-key", { data: true }, { ttlMs: 10 });
    const immediate = await cache.get("expiring-key");
    expect(immediate).toEqual({ data: true });
    // wait for expiry
    await new Promise((r) => setTimeout(r, 20));
    const expired = await cache.get("expiring-key");
    expect(expired).toBeUndefined();
  });

  test("compression should store and retrieve compressed data", async () => {
    const largeObject = { text: "x".repeat(1000) };
    await cache.set("large-key", largeObject, { compress: true });
    const retrieved = await cache.get("large-key");
    expect(retrieved).toEqual(largeObject);
  });

  test("delete should remove keys", async () => {
    await cache.set("delete-key", "value");
    await cache.delete("delete-key");
    const result = await cache.get("delete-key");
    expect(result).toBeUndefined();
  });

  test("clear should remove all keys", async () => {
    await cache.set("clear-key1", "val1");
    await cache.set("clear-key2", "val2");
    await cache.clear();
    const result1 = await cache.get("clear-key1");
    const result2 = await cache.get("clear-key2");
    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
  });

  test("keys should expire after the specified TTL", async () => {
    await cache.set("ttl-key", { foo: "bar" }, { ttlMs: 50 });
    const immediateResult = await cache.get("ttl-key");
    expect(immediateResult).toEqual({ foo: "bar" });

    // wait for expiry
    await new Promise((r) => setTimeout(r, 60));
    const expiredResult = await cache.get("ttl-key");
    expect(expiredResult).toBeUndefined();
  });
});
