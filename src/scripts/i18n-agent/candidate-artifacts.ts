import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import type { ActiveLocale } from "../../shared/i18n.ts";
import type { PostPaths } from "../i18n/corpus-inventory.ts";
import { safeModelPathName } from "../i18n/translation-costs.ts";

type ArtifactRootOptions = {
  repoRoot?: string;
};

type WriteCandidateArtifactInput = ArtifactRootOptions & {
  runId: string;
  slug: string;
  locale: ActiveLocale;
  model: string;
  contents: string;
  paths: Pick<PostPaths, "sourcePath" | "targetPath">;
  sourcePath?: string;
  notes?: string;
};

const defaultRepoRoot = process.cwd();

export const agentReportsRoot = join(defaultRepoRoot, "reports/i18n-agent");
export const candidateRunsRoot = join(agentReportsRoot, "runs");

export function candidateRunDir(runId: string, options: ArtifactRootOptions = {}) {
  return join(candidateRunsRootFor(options), safePathSegment(runId));
}

export function candidateFilePath(runId: string, locale: ActiveLocale, model: string, options: ArtifactRootOptions = {}) {
  return join(candidateRunDir(runId, options), "candidates", locale, `${safeModelPathName(model)}.mdx`);
}

export function consensusCandidateFilePath(
  runId: string,
  locale: ActiveLocale,
  iteration: number,
  options: ArtifactRootOptions = {},
) {
  return join(candidateRunDir(runId, options), "candidates", locale, `consensus-iteration-${iteration}.mdx`);
}

export function latestCandidatePath(runId: string, options: ArtifactRootOptions = {}) {
  const manifestPath = join(candidateRunDir(runId, options), "manifest.json");
  if (!existsSync(manifestPath)) throw new Error(`No candidate manifest found for run ${runId}.`);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { latestCandidatePath?: string };
  if (typeof manifest.latestCandidatePath !== "string") {
    throw new Error(`Candidate manifest for run ${runId} does not include latestCandidatePath.`);
  }
  return manifest.latestCandidatePath;
}

export function writeJson(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function appendJsonl(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(value)}\n`, "utf8");
}

export function appendEvent(runId: string, event: Record<string, unknown>, options: ArtifactRootOptions = {}) {
  appendJsonl(join(candidateRunDir(runId, options), "events.jsonl"), {
    at: new Date().toISOString(),
    runId,
    ...event,
  });
}

export function agentEvalHistoryPath(options: ArtifactRootOptions = {}) {
  return join(agentReportsRootFor(options), "eval-history.jsonl");
}

export function writeCandidateArtifact({
  runId,
  slug,
  locale,
  model,
  contents,
  paths,
  sourcePath,
  notes,
  repoRoot = defaultRepoRoot,
}: WriteCandidateArtifactInput) {
  const candidatePath = candidateFilePath(runId, locale, model, { repoRoot });
  const manifestPath = join(candidateRunDir(runId, { repoRoot }), "manifest.json");
  const adjusted = preAdjustRelativeAssetPaths({
    sourcePath: paths.sourcePath,
    targetPath: paths.targetPath,
    contents,
  });
  mkdirSync(dirname(candidatePath), { recursive: true });
  writeFileSync(candidatePath, adjusted.contents, "utf8");
  writeJson(manifestPath, {
    runId,
    slug,
    locale,
    model,
    sourcePath: sourcePath ?? relative(repoRoot, paths.sourcePath),
    targetPath: relative(repoRoot, paths.targetPath),
    latestCandidatePath: relative(repoRoot, candidatePath),
    notes: [
      notes,
      adjusted.adjusted > 0 ? `Pre-adjusted ${adjusted.adjusted} relative asset path(s).` : undefined,
    ].filter(Boolean).join(" "),
    updatedAt: new Date().toISOString(),
  });
  appendEvent(runId, {
    event: "candidate_written",
    slug,
    locale,
    model,
    candidatePath: relative(repoRoot, candidatePath),
    adjustedRelativePaths: adjusted.adjusted,
  }, { repoRoot });
  return {
    candidatePath: relative(repoRoot, candidatePath),
    manifestPath: relative(repoRoot, manifestPath),
  };
}

export function appendConsensusMarkdown(runId: string, record: Record<string, unknown>, options: ArtifactRootOptions = {}) {
  const consensus = record.consensus as {
    overallScore?: number;
    publishReady?: boolean;
    confidence?: string;
    confidenceScore?: number;
    confidenceSignals?: string[];
    issueCounts?: {
      high?: number;
      medium?: number;
      low?: number;
    };
    rationale?: string;
  } | undefined;
  const totals = record.totals as {
    inputTokens?: number;
    outputTokens?: number;
    reasoningTokens?: number;
    cacheReadTokens?: number;
    cacheWriteTokens?: number;
    costUsd?: number;
  } | undefined;
  const disagreement = record.disagreement as {
    scoreRange?: number;
    publishReadyDisagreement?: boolean;
    blockingSuggestionDisagreement?: boolean;
    uncertaintyDetected?: boolean;
  } | undefined;
  const summaryPath = join(
    candidateRunDir(runId, options),
    `consensus-${safePathSegment(String(record.slug ?? "unknown"))}-${safePathSegment(String(record.locale ?? "unknown"))}.md`,
  );
  writeFileSync(summaryPath, [
    "# Translation Judge Consensus",
    "",
    `- Slug: ${record.slug}`,
    `- Locale: ${record.locale}`,
    `- Overall score: ${consensus?.overallScore ?? "unknown"}`,
    `- Publish ready: ${consensus?.publishReady ?? "unknown"}`,
    `- Confidence: ${consensus?.confidence ?? "unknown"}`,
    `- Confidence score: ${typeof consensus?.confidenceScore === "number" ? consensus.confidenceScore.toFixed(3) : "unknown"}`,
    `- Confidence signals: ${consensus?.confidenceSignals?.join("; ") ?? "unknown"}`,
    `- High/medium/low issue counts: ${consensus?.issueCounts == null
      ? "unknown"
      : `${consensus.issueCounts.high ?? 0}/${consensus.issueCounts.medium ?? 0}/${consensus.issueCounts.low ?? 0}`}`,
    `- Escalated: ${record.escalated ?? false}`,
    `- Score range: ${disagreement?.scoreRange ?? "unknown"}`,
    `- Publish-ready disagreement: ${disagreement?.publishReadyDisagreement ?? "unknown"}`,
    `- Blocking-suggestion disagreement: ${disagreement?.blockingSuggestionDisagreement ?? "unknown"}`,
    `- Uncertainty detected: ${disagreement?.uncertaintyDetected ?? "unknown"}`,
    `- Input tokens: ${totals?.inputTokens ?? 0}`,
    `- Output tokens: ${totals?.outputTokens ?? 0}`,
    `- Reasoning tokens: ${totals?.reasoningTokens ?? 0}`,
    `- Cache read tokens: ${totals?.cacheReadTokens ?? 0}`,
    `- Cache write tokens: ${totals?.cacheWriteTokens ?? 0}`,
    `- Cost USD: ${typeof totals?.costUsd === "number" ? totals.costUsd.toFixed(6) : "unknown"}`,
    "",
    consensus?.rationale ?? "",
  ].join("\n"));
}

export function isExternalOrAbsoluteUrl(value: string) {
  return value.startsWith("/")
    || value.startsWith("#")
    || /^[a-z][a-z0-9+.-]*:/i.test(value);
}

function agentReportsRootFor(options: ArtifactRootOptions) {
  return options.repoRoot == null ? agentReportsRoot : join(options.repoRoot, "reports/i18n-agent");
}

function candidateRunsRootFor(options: ArtifactRootOptions) {
  return options.repoRoot == null ? candidateRunsRoot : join(agentReportsRootFor(options), "runs");
}

export function preAdjustRelativeAssetPaths({
  sourcePath,
  targetPath,
  contents,
}: {
  sourcePath: string;
  targetPath: string;
  contents: string;
}) {
  const sourceDir = dirname(sourcePath);
  const targetDir = dirname(targetPath);
  const postAssets = new Map(
    readdirSync(sourceDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isAssetFilename(entry.name))
      .map((entry) => [entry.name, join(sourceDir, entry.name)]),
  );
  const localLocaleAssets = new Map(
    existsSync(targetDir)
      ? readdirSync(targetDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && isAssetFilename(entry.name))
        .map((entry) => [entry.name, join(targetDir, entry.name)])
      : [],
  );
  const references: Array<{ from: string; to: string }> = [];
  const adjustedContents = contents.replace(
    /(?<prefix>]\(|src=["']|href=["']|:\s*|=["'])(?<url>(?:\.\.?\/)?[^"')\s]+?\.(?:avif|gif|jpe?g|png|svg|webp))(?<suffix>(?:\s+["'][^)]+)?\)|["']|(?=\s|$))/gim,
    (match, prefix: string, url: string, suffix: string) => {
      if (isExternalOrAbsoluteUrl(url)) return match;
      const filename = basename(url);
      const resolvedAsset = localLocaleAssets.get(filename) ?? postAssets.get(filename);
      if (resolvedAsset == null) return match;
      const nextUrl = toMdxRelativePath(relative(targetDir, resolvedAsset));
      if (url === nextUrl) return match;
      references.push({ from: url, to: nextUrl });
      return `${prefix}${nextUrl}${suffix}`;
    },
  );

  return {
    contents: adjustedContents,
    adjusted: references.length,
    references,
  };
}

function isAssetFilename(value: string) {
  return /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(value);
}

function toMdxRelativePath(value: string) {
  const normalized = value.split(/[\\/]+/).join("/");
  return normalized.startsWith(".") ? normalized : `./${normalized}`;
}

function safePathSegment(value: string) {
  return value.replace(/[^a-z0-9._-]+/gi, "-");
}
