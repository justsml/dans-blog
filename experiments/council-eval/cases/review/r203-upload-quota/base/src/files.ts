import type { BlobStore } from "./blobs";
import type { FileIndex, FileMeta } from "./file-index";

export class FileError extends Error {}

export const MAX_FILE_BYTES = 100 * 1024 * 1024;
const VALID_NAME = /^[\w. -]{1,200}$/;

export interface FileServiceOptions {
  clock?: () => number;
}

export class FileService {
  private clock: () => number;

  constructor(
    private blobs: BlobStore,
    private index: FileIndex,
    opts: FileServiceOptions = {},
  ) {
    this.clock = opts.clock ?? Date.now;
  }

  private keyFor(ownerId: string, name: string): string {
    if (!VALID_NAME.test(name) || name.startsWith(".")) throw new FileError(`invalid file name ${JSON.stringify(name)}`);
    return `users/${ownerId}/${name}`;
  }

  /** Stores a file. Uploading a name the user already has replaces that file. */
  async upload(ownerId: string, name: string, data: Uint8Array, contentType: string): Promise<FileMeta> {
    const key = this.keyFor(ownerId, name);
    if (data.byteLength === 0) throw new FileError("file is empty");
    if (data.byteLength > MAX_FILE_BYTES) throw new FileError("file is larger than 100 MB");

    await this.blobs.put(key, data, contentType);
    const meta: FileMeta = { key, ownerId, name, size: data.byteLength, contentType, uploadedAt: this.clock() };
    this.index.set(meta);
    return meta;
  }

  async download(ownerId: string, name: string): Promise<{ meta: FileMeta; data: Uint8Array }> {
    const key = this.keyFor(ownerId, name);
    const meta = this.index.get(key);
    const data = meta && (await this.blobs.get(key));
    if (!meta || !data) throw new FileError("file not found");
    return { meta, data };
  }

  async remove(ownerId: string, name: string): Promise<void> {
    const key = this.keyFor(ownerId, name);
    if (!this.index.get(key)) throw new FileError("file not found");
    await this.blobs.delete(key);
    this.index.delete(key);
  }

  list(ownerId: string): FileMeta[] {
    return this.index.forOwner(ownerId).sort((a, b) => a.name.localeCompare(b.name));
  }
}
