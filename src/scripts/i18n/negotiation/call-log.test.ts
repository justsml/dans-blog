import { test, expect } from "bun:test";
import { appendFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { CallLog } from "./call-log.ts";

const freshLog = () =>
  new CallLog(join(mkdtempSync(join(tmpdir(), "call-log-")), "calls.jsonl"));

test("stages append to one log and resolve per call key", () => {
  const log = freshLog();
  log.append("r1-review-a", "request", { fingerprint: "f1" });
  log.append("r1-review-b", "request", { fingerprint: "f2" });
  log.append("r1-review-a", "exit", { code: 0, stdout: "line\nbreak", stderr: "" });
  log.append("r1-review-a", "parsed", { fingerprint: "f1", value: { ok: true } });
  expect(log.records()).toHaveLength(4);
  expect(log.latest("r1-review-a", "parsed")?.value).toEqual({ ok: true });
  expect(log.latest("r1-review-a", "exit")?.stdout).toBe("line\nbreak");
  expect(log.latest("r1-review-b", "parsed")).toBeUndefined();
});

test("a torn final line is ignored but mid-file corruption fails closed", () => {
  const log = freshLog();
  log.append("k", "request", { fingerprint: "f" });
  appendFileSync(log.path, '{"at":"2026-09-30","key":"k","sta');
  expect(log.records()).toHaveLength(1);
  appendFileSync(log.path, "\n" + JSON.stringify({ key: "k", stage: "raw" }) + "\n");
  expect(() => log.records()).toThrow("Corrupt call log line 2");
});

test("a missing log reads as empty", () => {
  expect(freshLog().records()).toEqual([]);
});
