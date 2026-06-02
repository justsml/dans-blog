import { afterEach, describe, expect, test } from "bun:test";
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import {
  appendJsonl,
  candidateFilePath,
  candidateRunDir,
  latestCandidatePath,
  writeCandidateArtifact,
} from "./candidate-artifacts.ts";

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function tempRepoRoot() {
  const root = `${join(tmpdir(), "i18n-agent-artifacts-")}${randomUUID()}`;
  mkdirSync(root, { recursive: true });
  tempRoots.push(root);
  return root;
}

describe("candidate artifact paths", () => {
  test("sanitizes run ids and model ids into stable artifact paths", () => {
    const repoRoot = tempRepoRoot();

    expect(candidateRunDir("Run: 42/alpha", { repoRoot }))
      .toBe(join(repoRoot, "reports/i18n-agent/runs/Run-42-alpha"));
    expect(candidateFilePath("Run: 42/alpha", "es", "openrouter/deepseek/deepseek-v4:flash", { repoRoot }))
      .toBe(join(repoRoot, "reports/i18n-agent/runs/Run-42-alpha/candidates/es/deepseek-deepseek-v4-flash.mdx"));
  });
});

describe("appendJsonl", () => {
  test("creates parent directories and appends newline-delimited JSON records", () => {
    const repoRoot = tempRepoRoot();
    const path = join(repoRoot, "reports/i18n-agent/runs/test/events.jsonl");

    appendJsonl(path, { event: "first", count: 1 });
    appendJsonl(path, { event: "second", count: 2 });

    const rows = readFileSync(path, "utf8").trim().split("\n").map((line) => JSON.parse(line));
    expect(rows).toEqual([
      { event: "first", count: 1 },
      { event: "second", count: 2 },
    ]);
  });
});

describe("writeCandidateArtifact", () => {
  test("writes adjusted candidate contents, manifest, and event record", () => {
    const repoRoot = tempRepoRoot();
    const postDir = join(repoRoot, "src/content/posts/2026-01-01--hello");
    const localeDir = join(postDir, "es");
    mkdirSync(localeDir, { recursive: true });
    writeFileSync(join(postDir, "index.mdx"), "---\ntitle: Hello\n---\n", "utf8");
    writeFileSync(join(postDir, "diagram.webp"), "fake image", "utf8");

    const runId = "artifact/run";
    const paths = {
      postDir,
      sourcePath: join(postDir, "index.mdx"),
      targetPath: join(localeDir, "index.mdx"),
      fallbackTargetPath: join(localeDir, "index.md"),
      reportDir: join(repoRoot, "reports/i18n/hello/es"),
    };

    const written = writeCandidateArtifact({
      runId,
      slug: "hello",
      locale: "es",
      model: "openrouter/deepseek/deepseek-v4-flash",
      contents: "![Diagram](./diagram.webp)\n",
      paths,
      notes: "draft candidate",
      repoRoot,
    });

    const absoluteCandidatePath = join(repoRoot, written.candidatePath);
    const absoluteManifestPath = join(repoRoot, written.manifestPath);
    expect(readFileSync(absoluteCandidatePath, "utf8")).toBe("![Diagram](../diagram.webp)\n");
    expect(existsSync(absoluteManifestPath)).toBe(true);
    expect(latestCandidatePath(runId, { repoRoot })).toBe(written.candidatePath);

    const manifest = JSON.parse(readFileSync(absoluteManifestPath, "utf8"));
    expect(manifest).toEqual(expect.objectContaining({
      runId,
      slug: "hello",
      locale: "es",
      model: "openrouter/deepseek/deepseek-v4-flash",
      sourcePath: relative(repoRoot, paths.sourcePath),
      targetPath: relative(repoRoot, paths.targetPath),
      latestCandidatePath: written.candidatePath,
    }));
    expect(manifest.notes).toContain("draft candidate");
    expect(manifest.notes).toContain("Pre-adjusted 1 relative asset path");

    const eventPath = join(candidateRunDir(runId, { repoRoot }), "events.jsonl");
    const event = JSON.parse(readFileSync(eventPath, "utf8").trim());
    expect(event).toEqual(expect.objectContaining({
      runId,
      event: "candidate_written",
      slug: "hello",
      locale: "es",
      candidatePath: written.candidatePath,
      adjustedRelativePaths: 1,
    }));
  });
});
