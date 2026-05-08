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
  run,
  runInherited,
  writeTextFile,
} from "./utils.ts";

const DEFAULT_CANDIDATE_MODELS = [
  "openrouter/qwen/qwen3.6-plus",
  "openrouter/moonshotai/kimi-k2.6",
  "openrouter/google/gemini-3-flash-preview",
  "openrouter/z-ai/glm-5.1",
  "openrouter/minimax/minimax-m2.7",
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
    "You are a constrained translation file-rewrite worker.",
    `Translate ${relativeToRepo(sourcePath)} into ${locale}.`,
    `Write the complete translated MDX to ${targetRelPath}.`,
    "Do not run shell commands, git commands, Bun scripts, validation scripts, or translation scripts.",
    "Do not inspect or follow repository skills. Do not create commits. The wrapper script owns validation, reports, and Git.",
    "Preserve MDX structure, imports, component names, prop names, code blocks, URLs, asset paths, and anchors.",
    "Translate reader-facing prose, frontmatter title/subTitle, image alt text, quiz questions/options/explanations, and visible UI copy inside MDX props.",
    "Do not add commentary outside the file. Replace any previous candidate in the target file.",
    "Keep frontmatter lean: localized title/subTitle/body and optional localized cover_alt only unless a field must override English.",
  ].join("\n");

  const reportPath = `${reportDir}/${safeModelName(model)}.md`;

  try {
    runInherited("opencode", [
      "run",
      "--pure",
      "--model",
      model,
      "--file",
      sourcePath,
      "--dangerously-skip-permissions",
      prompt,
    ]);
  } catch (error) {
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: opencode command failed",
      note: error instanceof Error ? error.message : String(error),
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }

    continue;
  }

  if (!existsSync(targetPath)) {
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: missing output file",
      note: `Model did not create ${targetRelPath}.`,
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }

    continue;
  }

  if (!hasGitDiff(targetRelPath)) {
    writeCandidateReport({
      reportPath,
      model,
      validationStatus: "rejected: target file unchanged",
      note: [
        `Model did not leave a diff in ${targetRelPath}.`,
        "This usually means the provider failed, refused, or only inspected the existing candidate.",
      ].join(" "),
    });

    if (!shouldSkipCommit) {
      gitCommit(`i18n rejected(${locale}): ${slug} via ${model}`, [
        relativeToRepo(reportPath),
      ]);
    }

    continue;
  }

  const validationStatus = shouldSkipValidation ? "skipped" : validateCandidate();
  writeCandidateReport({ reportPath, model, validationStatus });

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

function hasGitDiff(path: string) {
  const status = run("git", ["status", "--porcelain", "--", path]);
  return status.trim().length > 0;
}

function writeCandidateReport({
  reportPath,
  model,
  validationStatus,
  note,
}: {
  reportPath: string;
  model: string;
  validationStatus: string;
  note?: string;
}) {
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
      note ? `- Note: ${note}` : undefined,
      ``,
    ].filter(Boolean).join("\n"),
  );
}

function safeModelName(model: string) {
  return model.replace(/[^a-z0-9._-]+/gi, "-");
}
