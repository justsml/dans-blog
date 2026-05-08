import {
  getPostPaths,
  gitCommit,
  optionalString,
  parseArgs,
  relativeToRepo,
  requireActiveLocale,
  requireString,
  run,
  runInherited,
  writeTextFile,
} from "./utils.ts";
import { existsSync } from "node:fs";

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const judgeModel = optionalString(options, "model") ?? "openai/gpt-5.4";
const selectedCommit = optionalString(options, "select");
const shouldSkipCommit = options["no-commit"] === true;
const { targetPath, reportDir } = getPostPaths(slug, locale);
const targetRelPath = relativeToRepo(targetPath);

const candidateCommits = getCandidateCommits();
if (candidateCommits.length === 0) {
  throw new Error(`No candidate commits found for ${slug} ${locale}.`);
}

const candidateSummary = candidateCommits
  .map((commit) => `- ${commit} ${run("git", ["show", "-s", "--format=%s", commit])}`)
  .join("\n");

const prompt = [
  `Judge the ${locale} translation candidates for ${slug}.`,
  `Candidate commits:`,
  candidateSummary,
  ``,
  selectedCommit
    ? `Use ${selectedCommit} as the selected candidate unless it is structurally broken.`
    : "Choose the best candidate by technical accuracy, natural language quality, Dan's direct style, and MDX preservation.",
  `Use git show <sha>:${targetRelPath} to inspect candidates.`,
  `Write the final selected and lightly polished MDX to ${targetRelPath}.`,
  `Also explain the decision in reports/i18n/${slug}/${locale}/judge.md.`,
].join("\n");

runInherited("opencode", [
  "run",
  "--model",
  judgeModel,
  "--dangerously-skip-permissions",
  prompt,
]);

runInherited("bun", ["run", "i18n:validate", "--slug", slug, "--locale", locale]);

const reportPath = `${reportDir}/judge-summary.md`;
writeTextFile(
  reportPath,
  [
    `# Translation Judge Summary`,
    ``,
    `- Slug: ${slug}`,
    `- Locale: ${locale}`,
    `- Judge model: ${judgeModel}`,
    `- Selected commit hint: ${selectedCommit ?? "judge selected"}`,
    ``,
    `## Candidates`,
    candidateSummary,
    ``,
  ].join("\n"),
);

if (!shouldSkipCommit) {
  const judgeDetailPath = `reports/i18n/${slug}/${locale}/judge.md`;
  gitCommit(`i18n judge(${locale}): select translation for ${slug}`, [
    targetRelPath,
    relativeToRepo(reportPath),
    ...(existsSync(judgeDetailPath) ? [judgeDetailPath] : []),
  ]);
}

function getCandidateCommits() {
  const grep = `i18n candidate(${locale}): ${slug} via`;
  const output = run("git", ["log", "--format=%H", "--grep", grep]);
  return output.split(/\r?\n/).filter(Boolean).reverse();
}
