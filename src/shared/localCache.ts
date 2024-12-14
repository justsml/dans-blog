import * as zlib from "zlib";
import { promisify } from "util";
import { makeLogs } from "@/components/LogHelper.ts";
import Database from "libsql";
import type { LocalCache } from "../types.ts";
import ms from "ms";

const DEFAULT_TTL_MS = ms("1d");

type Database = ReturnType<typeof Database>;

const log = makeLogs(`localCache`);

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

export default function createLocalCache<TData = unknown>(dbFilePath: string): LocalCache {
  log(`Creating local cache at ${dbFilePath}`);
  const db = new Database(dbFilePath);
  return _createLocalCache<TData>(db);
}

export function _createLocalCache<TData = any>(db: Database): LocalCache {
  // Initialize schema if not exists
  db.exec(`
  CREATE TABLE IF NOT EXISTS cache (
    key TEXT PRIMARY KEY,
    value BLOB,
    expiresAt INTEGER,
    compress INTEGER
  );`);

  const stat = db.prepare("SELECT COUNT(*) as count FROM cache").get() as any;

  console.log(`Cache started with ${stat.count} entries`);

  return {
    async get<T = TData>(key: string): Promise<T | undefined> {
      const row: any = db
        .prepare("SELECT value, expiresAt, compress FROM cache WHERE key = ?")
        .get(key);
      if (!row) {
        log(`Cache miss for key "${key}"`);
        return undefined;
      }
      if (row.expiresAt && Date.now() > row.expiresAt) {
        log(`Cache key "${key}" expired`);
        db.prepare("DELETE FROM cache WHERE key = ?").run(key);
        return undefined;
      }
      let data = row.value;
      if (row.compress) {
        log(`Decompressing data for key "${key}"`);
        data = await gunzip(data);
      }
      log(`Cache HIT for key "${key}"`);
      return JSON.parse(data.toString()) as T;
    },

    async set<T = TData>(
      key: string,
      value: T,
      opts?: { ttlMs?: number; compress?: boolean },
    ) {
      const expiresAt = opts?.ttlMs ? Date.now() + opts.ttlMs : DEFAULT_TTL_MS;
      let data = Buffer.from(JSON.stringify(value));
      let compressFlag = 0;
      if (opts?.compress) {
        log(`Compressing data for key "${key}"`);
        data = await gzip(data);
        compressFlag = 1;
      }
      log(`Setting cache key "${key}" with expiresAt ${expiresAt}`);
      return void db
        .prepare(`
          INSERT
            INTO cache (key, value, expiresAt, compress) VALUES (?, ?, ?, ?)
          ON CONFLICT(key)
            DO UPDATE SET value=excluded.value, 
              expiresAt=excluded.expiresAt, 
              compress=excluded.compress`,
        )
        .run(key, data, expiresAt, compressFlag);
    },

    delete(key: string) {
      return void db.prepare("DELETE FROM cache WHERE key = ?").run(key);
    },

    clear() {
      log(`WARNING: Clearing ALL cache in ${db.name}`);
      return void db.prepare("DELETE FROM cache").run();
    },

    close() {
      try {
        log(`Closing database ${db.name}`);
        return void db.close();
      } catch (e) {
        // @ts-expect-error
        log(`Error closing database %o %o`, e.message, e.stack);
        // Ignore so we can try re-peat calls in a failure situation
        console.error("Error closing database", e);
      }
    },
  };
}

