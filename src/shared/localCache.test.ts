import { describe, beforeEach, afterEach, test, expect, spyOn } from "bun:test";
import Database from "libsql";
import { _createLocalCache } from "./localCache.ts";

describe("SqliteCache", () => {
  let cache: ReturnType<typeof _createLocalCache>;

  beforeEach(() => {
    cache = _createLocalCache(new Database(":memory:"));
  });

  afterEach(() => {
    cache.close();
  });

  test("get returns undefined for non-existent keys", async () => {
    expect(await cache.get("no-such-key")).toBeUndefined();
  });

  test("default TTL preserves new values and expires them after one day", async () => {
    let now = 1_000_000_000_000;
    const clock = spyOn(Date, "now").mockImplementation(() => now);
    try {
      await cache.set("test-key", { foo: "answer" });
      expect(await cache.get<{ foo: string }>("test-key")).toEqual({ foo: "answer" });
      now += 86_400_001;
      expect(await cache.get<{ foo: string }>("test-key")).toBeUndefined();
    } finally {
      clock.mockRestore();
    }
  });

  test("compressed data survives a round trip", async () => {
    const largeObject = { text: "x".repeat(1000) };
    await cache.set("large-key", largeObject, { compress: true });
    expect(await cache.get<{ text: string }>("large-key")).toEqual(largeObject);
  });

  test("delete removes a live key and preserves other keys", async () => {
    await cache.set("delete-key", "value");
    await cache.set("keep-key", "kept");
    expect(await cache.get<string>("delete-key")).toBe("value");
    cache.delete("delete-key");
    expect(await cache.get<string>("delete-key")).toBeUndefined();
    expect(await cache.get<string>("keep-key")).toBe("kept");
  });

  test("clear removes all stored keys", async () => {
    await cache.set("clear-key1", "val1");
    await cache.set("clear-key2", "val2");
    expect(await cache.get<string>("clear-key1")).toBe("val1");
    expect(await cache.get<string>("clear-key2")).toBe("val2");
    cache.clear();
    expect(await cache.get<string>("clear-key1")).toBeUndefined();
    expect(await cache.get<string>("clear-key2")).toBeUndefined();
  });

  test("custom TTL expires only the short-lived key", async () => {
    let now = 1_000_000_000_000;
    const clock = spyOn(Date, "now").mockImplementation(() => now);
    try {
      await cache.set("ttl-key", { foo: "answer" }, { ttlMs: 2 });
      await cache.set("long-term-key", { foo: "answer" }, { ttlMs: 5_000 });
      expect(await cache.get<{ foo: string }>("ttl-key")).toEqual({ foo: "answer" });
      now += 10;
      expect(await cache.get<{ foo: string }>("ttl-key")).toBeUndefined();
      expect(await cache.get<{ foo: string }>("long-term-key")).toEqual({ foo: "answer" });
    } finally {
      clock.mockRestore();
    }
  });
});
