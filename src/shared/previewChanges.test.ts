import { expect, test } from "bun:test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const exec = promisify(execFile);
import { mkdtempSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getChangedPostDirectories } from "./previewChanges";

test("finds committed, staged, unstaged, and new article changes without switching branches", async () => {
  const cwd = mkdtempSync(join(tmpdir(), "blog-preview-git-"));
  const git = async (...args: string[]) => {
    const { stdout } = await exec("git", ["-C", cwd, ...args]);
    return stdout;
  };
  const write = (directory: string, file: string, contents: string) => {
    const path = join(cwd, "src/content/posts", directory);
    mkdirSync(path, { recursive: true });
    writeFileSync(join(path, file), contents);
  };
  try {
    await git("init", "-b", "main");
    await git("config", "user.name", "Preview Test");
    await git("config", "user.email", "preview@example.invalid");
    for (const dir of ["unchanged", "committed", "staged", "unstaged"]) write(dir, "index.mdx", "baseline");
    await git("add", ".");
    await git("commit", "-m", "baseline");
    await git("update-ref", "refs/remotes/origin/main", "HEAD");
    await git("checkout", "-b", "article-review");
    write("committed", "image.webp", "new asset");
    await git("add", ".");
    await git("commit", "-m", "article asset");
    write("staged", "index.mdx", "staged text");
    await git("add", ".");
    write("unstaged", "index.mdx", "unstaged text");
    write("new-draft", "index.mdx", "draft: true");

    // Exercise Git collection in the same fresh Bun process used by a build.
    // Bun 1.3's test runner drops captured child stdout in this environment;
    // exchange results through a fixture file instead.
    const moduleUrl = new URL("./previewChanges.ts", import.meta.url).href;
    const process = Bun.spawn([Bun.which("bun")!, "-e", `
      import { getChangedPostDirectories } from ${JSON.stringify(moduleUrl)};
      import { execFileSync } from "node:child_process";
      import { writeFileSync } from "node:fs";
      const cwd = ${JSON.stringify(cwd)};
      const result = await getChangedPostDirectories(cwd);
      writeFileSync(cwd + "/result.json", JSON.stringify({
        available: result.available,
        directories: [...result.directories],
        branch: execFileSync("git", ["-C", cwd, "branch", "--show-current"], {encoding: "utf8"}).trim(),
      }));
    `], { stdout: "pipe", stderr: "pipe" });
    expect(await process.exited).toBe(0);
    const changes = JSON.parse(readFileSync(join(cwd, "result.json"), "utf8"));
    expect(changes.available).toBe(true);
    expect([...changes.directories].sort()).toEqual(["committed", "new-draft", "staged", "unstaged"]);
    expect(changes.branch).toBe("article-review");
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("missing Git metadata returns a visible fallback instead of throwing", async () => {
  const cwd = mkdtempSync(join(tmpdir(), "blog-preview-no-git-"));
  try {
    expect(await getChangedPostDirectories(cwd)).toEqual({ available: false, directories: new Set() });
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
