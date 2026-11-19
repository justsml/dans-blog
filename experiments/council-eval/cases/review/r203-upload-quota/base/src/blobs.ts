/**
 * Client for the object storage bucket. Every method is one billed request to the
 * storage provider (list and head included), so call sites should not fan out.
 */
export interface BlobStore {
  put(key: string, data: Uint8Array, contentType: string): Promise<void>;
  get(key: string): Promise<Uint8Array | undefined>;
  delete(key: string): Promise<void>;
  head(key: string): Promise<{ size: number; contentType: string } | undefined>;
  /** Up to 1,000 keys under a prefix per call; pass `next` back to continue. */
  list(prefix: string, next?: string): Promise<{ keys: string[]; next?: string }>;
}

const PAGE = 1_000;

export class MemoryBlobStore implements BlobStore {
  private objects = new Map<string, { data: Uint8Array; contentType: string }>();

  async put(key: string, data: Uint8Array, contentType: string) {
    this.objects.set(key, { data: data.slice(), contentType });
  }

  async get(key: string) {
    return this.objects.get(key)?.data.slice();
  }

  async delete(key: string) {
    this.objects.delete(key);
  }

  async head(key: string) {
    const o = this.objects.get(key);
    return o && { size: o.data.byteLength, contentType: o.contentType };
  }

  async list(prefix: string, next?: string) {
    const keys = [...this.objects.keys()].filter((k) => k.startsWith(prefix)).sort();
    const start = next ? Number(next) : 0;
    const page = keys.slice(start, start + PAGE);
    return { keys: page, next: start + PAGE < keys.length ? String(start + PAGE) : undefined };
  }
}
