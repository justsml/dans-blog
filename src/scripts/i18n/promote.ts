import { readFileSync, writeFileSync } from "node:fs";
import {
  getPostPaths,
  gitCommit,
  parseArgs,
  relativeToRepo,
  requireActiveLocale,
  requireString,
  runInherited,
} from "./utils.ts";

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const shouldSkipCommit = options["no-commit"] === true;
const { targetPath } = getPostPaths(slug, locale);
const targetRelPath = relativeToRepo(targetPath);

let contents = readFileSync(targetPath, "utf8");
contents = contents
  .replace(/^draft:\s*true\s*$/gm, "draft: false")
  .replace(/^hidden:\s*true\s*$/gm, "hidden: false")
  .replace(/^unlisted:\s*true\s*$/gm, "unlisted: false");

writeFileSync(targetPath, contents, "utf8");
runInherited("bun", ["run", "i18n:validate", "--slug", slug, "--locale", locale]);

if (!shouldSkipCommit) {
  gitCommit(`i18n final(${locale}): polish ${slug}`, [targetRelPath]);
}
