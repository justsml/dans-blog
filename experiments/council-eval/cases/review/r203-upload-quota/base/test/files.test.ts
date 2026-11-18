import { expect, test } from "bun:test";
import { FileError, FileIndex, FileService, MemoryBlobStore } from "../src";

const bytes = (n: number) => new Uint8Array(n).fill(7);
const service = () => new FileService(new MemoryBlobStore(), new FileIndex(), { clock: () => 1_000 });

test("upload then download round-trips", async () => {
  const svc = service();
  await svc.upload("u1", "notes.txt", bytes(10), "text/plain");
  const { meta, data } = await svc.download("u1", "notes.txt");
  expect(meta.size).toBe(10);
  expect(data).toEqual(bytes(10));
});

test("users cannot reach each other's files", async () => {
  const svc = service();
  await svc.upload("u1", "notes.txt", bytes(10), "text/plain");
  await expect(svc.download("u2", "notes.txt")).rejects.toThrow(FileError);
  await expect(svc.upload("u2", "../u1/notes.txt", bytes(1), "text/plain")).rejects.toThrow(FileError);
});

test("uploading the same name replaces the file", async () => {
  const svc = service();
  await svc.upload("u1", "a.txt", bytes(10), "text/plain");
  await svc.upload("u1", "a.txt", bytes(4), "text/plain");
  expect(svc.list("u1").map((f) => [f.name, f.size])).toEqual([["a.txt", 4]]);
});

test("remove deletes blob and metadata", async () => {
  const svc = service();
  await svc.upload("u1", "a.txt", bytes(3), "text/plain");
  await svc.remove("u1", "a.txt");
  expect(svc.list("u1")).toEqual([]);
  await expect(svc.download("u1", "a.txt")).rejects.toThrow(FileError);
});
