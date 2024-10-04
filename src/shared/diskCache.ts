import { SqliteCache } from "cache-sqlite-lru-ttl";
import fs from "fs/promises";
import ms from "ms";

const IS_PRODUCTION = import.meta.env.NODE_ENV !== "development";
const GIST_TTL_DAYS = import.meta.env.GIST_TTL_DAYS ?? 31;
const ttl = Number(GIST_TTL_DAYS) < 1 ? 10 : Number(GIST_TTL_DAYS);

const dbFilePath = ".data/danlevy-net-cache.db";

const cache = new SqliteCache({
  database: dbFilePath,
  defaultTtlMs: 1000 * 60 * 60 * 24 * ttl,
  maxItems: 10000,
  // compress: true,
});

if (IS_PRODUCTION) {
  const info = await getDbInfo();
  console.log("Disk cache info", info);
}

export const diskCache = {
  async get(key: string): Promise<Record<string, unknown> | null> {
    const data = await cache.get(key);
    if (!data) return null;
    return JSON.parse(data);
  },
  async set(
    key: string,
    value: unknown,
    opts: {
      ttlMs?: number;
      compress?: boolean;
    } = {}
  ) {
    cache.set(key, JSON.stringify(value), opts);
    return value;
  },
  async del(key: string) {
    return cache.delete(key);
  },
  async clear() {
    return cache.clear();
  },
};

export async function getDbInfo() {
  const stat = await fs.stat(dbFilePath);
  const sizeMb = stat.size / 1024 / 1024;
  const createdAt = stat.ctime || stat.birthtime;
  const modifiedAt = stat.mtime;
  return {
    sizeMb,
    createdAt,
    modifiedAt,
    createdAgo: ms(Date.now() - createdAt.getTime(), { long: true }),
    modifiedAgo: ms(Date.now() - modifiedAt.getTime(), { long: true }),
  };
}
