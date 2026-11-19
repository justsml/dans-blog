import { expect, test } from "bun:test";
import { FileIndex, FileService, MemoryBlobStore } from "../src";

class CountingBlobStore extends MemoryBlobStore {
  calls = 0;
  override async put(key: string, data: Uint8Array, contentType: string) {
    this.calls++;
    return super.put(key, data, contentType);
  }
  override async get(key: string) {
    this.calls++;
    return super.get(key);
  }
  override async delete(key: string) {
    this.calls++;
    return super.delete(key);
  }
  override async head(key: string) {
    this.calls++;
    return super.head(key);
  }
  override async list(prefix: string, next?: string) {
    this.calls++;
    return super.list(prefix, next);
  }
}

test("one upload costs a constant number of storage requests, however many files the user has", async () => {
  const blobs = new CountingBlobStore();
  const svc = new FileService(blobs, new FileIndex(), { quotaBytes: 1_000_000 });
  for (let i = 0; i < 200; i++) await svc.upload("u1", `photo-${i}.jpg`, new Uint8Array(100), "image/jpeg");

  blobs.calls = 0;
  await svc.upload("u1", "one-more.jpg", new Uint8Array(100), "image/jpeg");
  expect(blobs.calls).toBeLessThanOrEqual(3);
  expect((await svc.storage("u1")).usedBytes).toBe(20_100);
});
