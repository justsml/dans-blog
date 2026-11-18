import { expect, test } from "bun:test";
import { FileIndex, FileService, MemoryBlobStore, QuotaExceededError } from "../src";

test("replacing a file only counts the size difference against the quota", async () => {
  const svc = new FileService(new MemoryBlobStore(), new FileIndex(), { quotaBytes: 1_000 });
  await svc.upload("u1", "report.pdf", new Uint8Array(600), "application/pdf");
  await svc.upload("u1", "report.pdf", new Uint8Array(700), "application/pdf");
  expect(svc.list("u1").map((f) => f.size)).toEqual([700]);

  await expect(svc.upload("u1", "report.pdf", new Uint8Array(1_001), "application/pdf")).rejects.toThrow(QuotaExceededError);
  await expect(svc.upload("u1", "other.pdf", new Uint8Array(301), "application/pdf")).rejects.toThrow(QuotaExceededError);
});
