import { existsSync } from "node:fs";
import {
  getPostPaths,
  gitCommit,
  optionalString,
  parseArgs,
  parseList,
  relativeToRepo,
  requireActiveLocale,
  requireString,
  runInherited,
  writeTextFile,
} from "./utils.ts";

const DEFAULT_CANDIDATE_MODELS = [
  "openrouter/qwen/qwen3.6-plus",
  "openrouter/moonshotai/kimi-k2.6",
  "google/gemini-3-flash-preview",
];

const options = parseArgs();
const slug = requireString(options, "slug");
const locale = requireActiveLocale(options);
const models = parseList(optionalString(options, "models"), DEFAULT_CANDIDATE_MODELS);
const shouldSkipValidation = options["skip-validation"] === true;
const shouldSkipCommit = options["no-commit"] === true;
const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);
const targetRelPath = relativeToRepo(targetPath);

for (const model of models) {
  const prompt = [
    `Translate ${relativeToRepo(sourcePath)} into ${locale}.`,
    `Write the complete translated MDX to ${targetRelPath}.`,
    "Preserve MDX structure, imports, component names, prop names, code blocks, URLs, asset paths, and anchors.",
    "Translate reader-facing prose, frontmatter title/subTitle, image alt text, quiz questions/options/explanations, and visible UI copy inside MDX props.",
    "Do not add commentary outside the file. Replace any previous candidate in the target file.",
    "Keep frontmatter lean: localized title/subTitle/body and optional localized cover_alt only unless a field must override English.",
  ].join("\n");

  runInherited("opencode", [
    "run",
    "--model",
    model,
    "--file",
    sourcePath,
    "--dangerously-skip-permissions",
    prompt,
  ]);

  if (!existsSync(targetPath)) {
    throw new Error(`Model ${model} did not create ${targetRelPath}`);
  }

  const validationStatus = shouldSkipValidation ? "skipped" : validateCandidate();
  const reportPath = `${reportDir}/${safeModelName(model)}.md`;
  writeTextFile(
    reportPath,
    [
      `# Translation Candidate`,
      ``,
      `- Slug: ${slug}`,
      `- Locale: ${locale}`,
      `- Model: ${model}`,
      `- Target: ${targetRelPath}`,
      `- Validation: ${validationStatus}`,
      ``,
    ].join("\n"),
  );

  if (!shouldSkipCommit) {
    gitCommit(`i18n candidate(${locale}): ${slug} via ${model}`, [
      targetRelPath,
      relativeToRepo(reportPath),
    ]);
  }
}

function validateCandidate() {
  runInherited("bun", ["run", "i18n:validate", "--slug", slug, "--locale", locale]);
  return "passed";
}

function safeModelName(model: string) {
  return model.replace(/[^a-z0-9._-]+/gi, "-");
}
