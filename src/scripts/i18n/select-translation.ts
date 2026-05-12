import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import "dotenv/config";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  getPostPaths,
  optionalString,
  parseArgs,
  relativeToRepo,
  requireActiveLocale,
  requireString,
} from "./utils.ts";
import { safeModelPathName } from "./translation-costs.ts";

interface CandidateRecord {
  runId: string;
  slug: string;
  locale: string;
  model: string;
  modelPath: string;
  createdAt: string;
  sourcePath: string;
  targetPath: string;
  candidatePath: string;
  sourceHash: string;
  outputHash: string;
  totalCostUsd?: number;
  telemetry?: {
    totalInputTokens?: number;
    totalOutputTokens?: number;
    totalCacheReadTokens?: number;
    totalCacheWriteTokens?: number;
    totalDurationMs?: number;
    totalCostUsd?: number;
  };
}

const DEFAULT_JUDGE_MODEL = "openrouter/google/gemini-3-flash-preview";

async function main() {
  const options = parseArgs();
  const slug = requireString(options, "slug");
  const locale = requireActiveLocale(options);
  const selection = optionalString(options, "select") ?? "judge";
  const judgeModel = optionalString(options, "judge-model") ?? optionalString(options, "model") ?? DEFAULT_JUDGE_MODEL;
  const limit = parseLimit(options.limit);
  const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);
  const candidates = readCandidates(slug, locale).slice(-limit);

  if (candidates.length === 0) {
    throw new Error(`No stored candidates found for ${slug} [${locale}]. Run i18n:translate:chunked first.`);
  }

  const selected = selection === "judge"
    ? await judgeCandidates({ slug, locale, sourcePath, reportDir, candidates, judgeModel })
    : selectCandidate(candidates, selection);

  const candidateAbsPath = join(process.cwd(), selected.candidatePath);
  if (!existsSync(candidateAbsPath)) {
    throw new Error(`Selected candidate file does not exist: ${selected.candidatePath}`);
  }

  const output = readFileSync(candidateAbsPath, "utf8");
  const outputHash = hashText(output);
  if (selected.outputHash && selected.outputHash !== outputHash) {
    throw new Error(`Selected candidate hash mismatch for ${selected.runId}. Expected ${selected.outputHash}, got ${outputHash}.`);
  }

  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, output, "utf8");

  const selectionRecord = {
    event: "translation_selected",
    at: new Date().toISOString(),
    slug,
    locale,
    selectedRunId: selected.runId,
    selectedModel: selected.model,
    selectedCandidatePath: selected.candidatePath,
    targetPath: relativeToRepo(targetPath),
    outputHash,
    selection,
    judgeModel: selection === "judge" ? judgeModel : undefined,
  };
  appendJsonl(join(reportDir, "selections.jsonl"), selectionRecord);

  console.log(`Selected ${selected.runId} (${selected.model})`);
  console.log(`Published ${selected.candidatePath} -> ${relativeToRepo(targetPath)}`);
}

function parseLimit(value: string | boolean | undefined) {
  if (value === undefined || value === true) return 6;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`--limit must be a positive integer. Received "${value}".`);
  }
  return parsed;
}

function readCandidates(slug: string, locale: string) {
  const candidatesPath = join(process.cwd(), "reports/i18n", slug, locale, "candidates.jsonl");
  if (!existsSync(candidatesPath)) return [];

  const byRunId = new Map<string, CandidateRecord>();
  for (const line of readFileSync(candidatesPath, "utf8").split("\n")) {
    if (!line.trim()) continue;
    const record = JSON.parse(line) as CandidateRecord;
    if (!record.runId || !record.candidatePath) continue;
    byRunId.set(record.runId, record);
  }

  return [...byRunId.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

function selectCandidate(candidates: CandidateRecord[], selection: string) {
  if (selection === "latest") {
    const latest = candidates.at(-1);
    if (!latest) throw new Error("No candidates available.");
    return latest;
  }

  const selected = candidates.find((candidate) => (
    candidate.runId === selection
    || `${candidate.model}@${candidate.createdAt}` === selection
    || `${candidate.modelPath}@${candidate.createdAt.replace(/[:.]/g, "-")}` === selection
  ));
  if (!selected) {
    throw new Error(`No candidate matches --select ${selection}. Available run ids:\n${candidates.map(c => `- ${c.runId}`).join("\n")}`);
  }
  return selected;
}

async function judgeCandidates({
  slug,
  locale,
  sourcePath,
  reportDir,
  candidates,
  judgeModel,
}: {
  slug: string;
  locale: string;
  sourcePath: string;
  reportDir: string;
  candidates: CandidateRecord[];
  judgeModel: string;
}) {
  const source = readFileSync(sourcePath, "utf8");
  const candidateBlocks = candidates.map((candidate, index) => {
    const candidateAbsPath = join(process.cwd(), candidate.candidatePath);
    const body = existsSync(candidateAbsPath)
      ? readFileSync(candidateAbsPath, "utf8")
      : "";
    return [
      `## Candidate ${index + 1}`,
      `runId: ${candidate.runId}`,
      `model: ${candidate.model}`,
      `createdAt: ${candidate.createdAt}`,
      `candidatePath: ${candidate.candidatePath}`,
      ``,
      "```mdx",
      body,
      "```",
    ].join("\n");
  }).join("\n\n");

  const prompt = [
    "You are a constrained translation judge for DanLevy.net.",
    `Choose the best ${locale} translation candidate for ${slug}.`,
    "Prioritize technical accuracy, natural language quality, preserved MDX/frontmatter/imports, preserved code, and Dan's direct technical style.",
    "Return JSON only with this shape: {\"selectedRunId\":\"...\",\"reason\":\"...\",\"risks\":[\"...\"]}.",
    "",
    "# English Source",
    "```mdx",
    source,
    "```",
    "",
    "# Candidates",
    candidateBlocks,
  ].join("\n");

  const provider = createOpenRouter({});
  const result = await generateText({
    model: provider.chat(judgeModel.replace(/^openrouter\//, "")),
    system: "You judge translation candidates and return strict JSON only.",
    prompt,
    temperature: 0.1,
    maxOutputTokens: 2000,
    timeout: { totalMs: 200_000 },
    providerOptions: {
      openrouter: {
        reasoning: {
          effort: "low",
        },
      },
    },
  });

  const parsed = parseJudgeJson(result.text);
  const selected = candidates.find((candidate) => candidate.runId === parsed.selectedRunId);
  if (!selected) {
    throw new Error(`Judge selected unknown run id "${parsed.selectedRunId}". Available: ${candidates.map(c => c.runId).join(", ")}`);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const judgeDir = join(reportDir, "judges", safeModelPathName(judgeModel), timestamp);
  mkdirSync(judgeDir, { recursive: true });
  writeFileSync(join(judgeDir, "judge.json"), JSON.stringify({
    slug,
    locale,
    judgeModel,
    selectedRunId: selected.runId,
    response: parsed,
    rawText: result.text,
    candidates: candidates.map(({ runId, model, createdAt, candidatePath, outputHash }) => ({
      runId,
      model,
      createdAt,
      candidatePath,
      outputHash,
    })),
  }, null, 2), "utf8");
  writeFileSync(join(judgeDir, "judge.md"), [
    "# Translation Candidate Judge",
    "",
    `- Slug: ${slug}`,
    `- Locale: ${locale}`,
    `- Judge model: ${judgeModel}`,
    `- Selected run: ${selected.runId}`,
    `- Selected model: ${selected.model}`,
    "",
    "## Reason",
    parsed.reason,
    "",
    "## Risks",
    ...(parsed.risks?.length ? parsed.risks.map((risk: string) => `- ${risk}`) : ["- none noted"]),
  ].join("\n"), "utf8");

  return selected;
}

function parseJudgeJson(text: string): { selectedRunId: string; reason: string; risks?: string[] } {
  const trimmed = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(trimmed);
  if (typeof parsed.selectedRunId !== "string" || !parsed.selectedRunId) {
    throw new Error(`Judge response did not include selectedRunId: ${text}`);
  }
  return parsed;
}

function appendJsonl(path: string, data: Record<string, unknown>) {
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, JSON.stringify(data) + "\n", "utf8");
}

function hashText(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

main().catch((err) => {
  console.error("\n❌ Translation selection failed:", err.message);
  process.exit(1);
});
