export interface Flag {
  key: string;
  enabled: boolean;
  percent?: number;
  salt?: string;
}
export interface FlagRepository {
  get(key: string): Promise<Flag | undefined>;
  getMany(keys: string[]): Promise<Flag[]>;
}
export class MemoryFlags implements FlagRepository {
  private rows = new Map<string, Flag>();
  constructor(flags: Flag[] = []) {
    for (const flag of flags) this.save(flag);
  }
  save(flag: Flag): void {
    if (!flag.key) throw new Error("flag key required");
    if (flag.percent !== undefined && (flag.percent < 0 || flag.percent > 100)) {
      throw new Error("percent outside range");
    }
    this.rows.set(flag.key, { ...flag });
  }
  async get(key: string): Promise<Flag | undefined> {
    const row = this.rows.get(key);
    return row && { ...row };
  }
  // Remote implementation charges one query for up to 100 keys.
  async getMany(keys: string[]): Promise<Flag[]> {
    return keys.flatMap(key => {
      const row = this.rows.get(key);
      return row ? [{ ...row }] : [];
    });
  }
  remove(key: string): boolean {
    return this.rows.delete(key);
  }
}
// Browser and API workers share this deterministic bucket algorithm.
export function bucket(subject: string, salt: string): number {
  let hash = 2166136261;
  for (const char of salt + ":" + subject) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % 10000;
}
