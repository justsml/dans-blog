import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

/** Include assets/notes as well as article text, including uncommitted local work. */
export async function getChangedPostDirectories(cwd = process.cwd()) {
  const git = async (...args: string[]) => {
    const { stdout } = await exec("git", ["-C", cwd, ...args]);
    return stdout;
  };

  try {
    let base: string | undefined;
    for (const ref of ["origin/main", "main"]) {
      try {
        await git("rev-parse", "--verify", ref);
        base = ref;
        break;
      } catch { /* Try the next main reference. */ }
    }
    if (!base) throw new Error("No main reference available");

    // Prefer PR changes since the common ancestor. Shallow deploy checkouts
    // may only have the tips; comparing those still permits a useful index.
    let comparison = base;
    try {
      comparison = (await git("merge-base", base, "HEAD")).trim();
    } catch { /* Use the available main tip. */ }

    const paths = [
      await git("diff", "--name-only", "--no-renames", "-z", comparison, "HEAD", "--", "src/content/posts"),
      await git("diff", "--name-only", "--no-renames", "-z", "HEAD", "--", "src/content/posts"),
      await git("ls-files", "--others", "--exclude-standard", "-z", "--", "src/content/posts"),
    ].flatMap((output) => output.split("\0").filter(Boolean));

    return {
      available: true,
      directories: new Set(paths.flatMap((path) => {
        const directory = /^src\/content\/posts\/([^/]+)\//.exec(path)?.[1];
        return directory ? [directory] : [];
      })),
    };
  } catch {
    // Missing Git metadata must never hide drafts from a preview build.
    return { available: false, directories: new Set<string>() };
  }
}
