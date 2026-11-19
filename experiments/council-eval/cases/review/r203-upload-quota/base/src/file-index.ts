export interface FileMeta {
  key: string;
  ownerId: string;
  name: string;
  size: number;
  contentType: string;
  uploadedAt: number;
}

/**
 * Metadata row for every stored file (Postgres in production). FileService writes it in
 * the same request as the blob, so it always describes what is in the bucket.
 */
export class FileIndex {
  private rows = new Map<string, FileMeta>();

  get(key: string): FileMeta | undefined {
    return this.rows.get(key);
  }

  set(meta: FileMeta) {
    this.rows.set(meta.key, meta);
  }

  delete(key: string) {
    this.rows.delete(key);
  }

  forOwner(ownerId: string): FileMeta[] {
    return [...this.rows.values()].filter((m) => m.ownerId === ownerId);
  }
}
