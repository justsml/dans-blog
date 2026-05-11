/**
 * Chunked translation script for technical articles.
 *
 * Translates MDX articles in configurable chunks to stay within context
 * windows, reduce per-request cost, and improve translation quality by
 * giving the model bounded context.
 *
 * Usage:
 *   bun run i18n:translate:chunked -- --slug my-article --locale es --chunk 5s --model openrouter/qwen/qwen3.6-plus
 *
 * Chunk formats:
 *   1p  = 1 paragraph per chunk
 *   5s  = 5 sentences per chunk
 *   1000t = ~1000 tokens per chunk
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import "dotenv/config";
import matter from "gray-matter";
import { generateText } from "ai";
import { createOpenRouter, type OpenRouterProviderSettings } from "@openrouter/ai-sdk-provider";
import { parse as parseLlmString } from "llm-strings";
import {
  parseArgs,
  requireString,
  requireActiveLocale,
  getPostPaths,
  writeTextFile,
  relativeToRepo,
} from "./utils.ts";
import {
  parseChunkSize,
  extractSegments,
  chunkSegments,
  reassembleChunks,
  type Chunk,
} from "./chunker.ts";
import {
  buildSystemPrompt,
  buildUserPrompt,
  buildSummaryPrompt,
} from "./prompts.ts";
import type { ActiveLocale } from "../../shared/i18n.ts";

interface LlmConfig {
  modelId: string;
  providerSettings: OpenRouterProviderSettings;
  temperature: number;
  maxTokens: number;
}

function resolveLlmConfig(modelInput: string): LlmConfig {
  if (modelInput.startsWith("llm://")) {
    const parsed = parseLlmString(modelInput);
    return {
      modelId: parsed.model,
      providerSettings: {
        apiKey: parsed.apiKey,
        baseURL: parsed.host ? `https://${parsed.host}` : undefined,
      },
      temperature: Number(parsed.params.temperature ?? parsed.params.temp ?? 0.3),
      maxTokens: Number(parsed.params.max_tokens ?? parsed.params.maxTokens ?? 16000),
    };
  }

  // Normalize opencode-style model IDs like "openrouter/qwen/qwen3.6-plus"
  const modelId = modelInput.replace(/^openrouter\//, "");

  return {
    modelId,
    providerSettings: {},
    temperature: 0.3,
    maxTokens: 16000,
  };
}

interface Telemetry {
  model: string;
  chunkSize: string;
  totalChunks: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalDurationMs: number;
  chunks: Array<{
    index: number;
    inputTokens: number;
    outputTokens: number;
    durationMs: number;
  }>;
}

function normalizeCandidateForLocale(source: string, translatedBody: string): string {
  // Adjust asset paths: locale files live one folder deeper
  let result = translatedBody
    .replace(/]\(\.\//g, "](../")
    .replace(/src="\.\//g, 'src="../')
    .replace(/from '\.\.\/..\/..\//g, "from '../../../")
    .replace(/from "\.\.\/..\/..\//g, 'from "../../../');

  // Ensure all source import lines are present (insert at top of body)
  const sourceImports = source.match(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm) || [];
  const translatedImports = result.match(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm) || [];

  const missing = sourceImports.filter(
    (imp) => !translatedImports.some((t) => t.trim() === imp.trim()),
  );

  if (missing.length > 0) {
    result = missing.join("\n") + "\n\n" + result;
  }

  return result;
}

async function translateChunk(
  chunk: Chunk,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  articleSummary: string,
  previousTranslation: string | undefined,
): Promise<{ text: string; inputTokens: number; outputTokens: number; durationMs: number }> {
  const start = performance.now();

  const system = buildSystemPrompt(locale);
  const user = buildUserPrompt(chunk.text, locale, {
    chunkIndex: chunk.index,
    totalChunks: chunk.totalChunks ?? chunk.index + 1,
    previousTranslation,
    articleSummary,
  });

  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);

  const result = await generateText({
    model,
    system,
    prompt: user,
    temperature: llmConfig.temperature,
    maxTokens: llmConfig.maxTokens,
  });

  const durationMs = Math.round(performance.now() - start);

  return {
    text: result.text,
    inputTokens: result.usage?.promptTokens ?? 0,
    outputTokens: result.usage?.completionTokens ?? 0,
    durationMs,
  };
}

async function generateSummary(
  title: string,
  body: string,
  llmConfig: LlmConfig,
): Promise<string> {
  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);
  const result = await generateText({
    model,
    system:
      "You are a technical editor. Write concise, accurate summaries of technical articles.",
    prompt: buildSummaryPrompt(title, body),
    temperature: llmConfig.temperature,
    maxTokens: 500,
  });
  return result.text.trim();
}

async function main() {
  const options = parseArgs();
  const slug = requireString(options, "slug");
  const locale = requireActiveLocale(options);
  const chunkSizeInput = requireString(options, "chunk");
  const modelId = requireString(options, "model");
  const skipSummary = options["skip-summary"] === true;
  const dryRun = options["dry-run"] === true;

  const strategy = parseChunkSize(chunkSizeInput);
  const llmConfig = resolveLlmConfig(modelId);
  const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);

  if (!existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  console.log(`\n📄 Source: ${relativeToRepo(sourcePath)}`);
  console.log(`🎯 Target: ${relativeToRepo(targetPath)}`);
  console.log(`🌐 Locale: ${locale}`);
  console.log(`✂️  Chunk strategy: ${chunkSizeInput}`);
  console.log(`🤖 Model: ${llmConfig.modelId} (temp=${llmConfig.temperature}, maxTokens=${llmConfig.maxTokens})\n`);

  const sourceRaw = readFileSync(sourcePath, "utf8");
  const parsed = matter(sourceRaw);
  const sourceBody = parsed.content;

  // Generate or skip summary
  let articleSummary = "";
  if (!skipSummary) {
    console.log("📝 Generating article summary...");
    articleSummary = await generateSummary(parsed.data.title ?? slug, sourceBody, llmConfig);
    console.log(`   Summary: ${articleSummary.slice(0, 120)}...\n`);
  } else {
    articleSummary = "No summary provided. Translate each chunk independently.";
  }

  // Chunk the body
  console.log("✂️  Chunking article...");
  const segments = extractSegments(sourceBody);
  const chunks = chunkSegments(segments, strategy);
  console.log(`   ${chunks.length} chunks created\n`);

  if (dryRun) {
    console.log("🧪 Dry run — printing first chunk:");
    console.log("---");
    console.log(chunks[0]?.text ?? "(no chunks)");
    console.log("---");
    console.log("\nExiting without translation.");
    return;
  }

  // Translate chunks
  const translatedChunks: Chunk[] = [];
  const telemetry: Telemetry = {
    model: llmConfig.modelId,
    chunkSize: chunkSizeInput,
    totalChunks: chunks.length,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalDurationMs: 0,
    chunks: [],
  };

  let previousTranslation: string | undefined;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    // Attach totalChunks for prompt context
    chunk.totalChunks = chunks.length;

    console.log(`🔄 Translating chunk ${i + 1}/${chunks.length}...`);

    const { text, inputTokens, outputTokens, durationMs } = await translateChunk(
      chunk,
      locale,
      llmConfig,
      articleSummary,
      previousTranslation,
    );

    telemetry.chunks.push({ index: i, inputTokens, outputTokens, durationMs });
    telemetry.totalInputTokens += inputTokens;
    telemetry.totalOutputTokens += outputTokens;
    telemetry.totalDurationMs += durationMs;

    translatedChunks.push({
      index: i,
      segments: [{ type: "text", content: text }],
      text,
    });

    previousTranslation = text;

    console.log(
      `   ✅ Done in ${durationMs}ms | input: ${inputTokens} | output: ${outputTokens}`,
    );
  }

  // Reassemble
  const translatedBody = reassembleChunks(translatedChunks);
  const normalizedBody = normalizeCandidateForLocale(sourceRaw, translatedBody);

  // Build frontmatter
  const frontmatter: Record<string, unknown> = { ...parsed.data };
  frontmatter.title = frontmatter.title; // Model should have translated inline, but we may need to extract
  // We don't auto-translate frontmatter here; the chunked body includes it
  // if gray-matter left it in parsed.content. Actually gray-matter strips it.
  // We need to handle frontmatter translation separately or assume the body
  // chunker doesn't see frontmatter. Let's translate frontmatter explicitly.

  const translatedFrontmatter = await translateFrontmatter(frontmatter, locale, llmConfig);
  const frontmatterYaml = matter.stringify("", translatedFrontmatter).trim();

  const finalOutput = frontmatterYaml + "\n" + normalizedBody;

  // Write output
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, finalOutput, "utf8");

  // Write telemetry report
  const reportPath = join(reportDir, `chunked-${chunkSizeInput.replace(/[^a-z0-9]/gi, "")}.md`);
  writeTextFile(reportPath, formatTelemetryReport(telemetry, articleSummary));

  console.log(`\n✅ Translation written to ${relativeToRepo(targetPath)}`);
  console.log(`📊 Report written to ${relativeToRepo(reportPath)}`);
  console.log(
    `   Total: ${telemetry.totalInputTokens} input tokens, ${telemetry.totalOutputTokens} output tokens, ${telemetry.totalDurationMs}ms`,
  );
}

async function translateFrontmatter(
  frontmatter: Record<string, unknown>,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
): Promise<Record<string, unknown>> {
  const result = { ...frontmatter };

  // Only translate reader-facing strings
  const keysToTranslate = ["title", "subTitle", "cover_alt"];

  for (const key of keysToTranslate) {
    const value = result[key];
    if (typeof value !== "string" || !value.trim()) continue;

    const provider = createOpenRouter(llmConfig.providerSettings);
    const model = provider.chat(llmConfig.modelId);
    const translation = await generateText({
      model,
      system: buildSystemPrompt(locale),
      prompt: `Translate the following ${key} into ${locale}. Keep it concise and natural.\n\n${value}`,
      temperature: llmConfig.temperature,
      maxTokens: 500,
    });

    result[key] = translation.text.trim();
  }

  return result;
}

function formatTelemetryReport(telemetry: Telemetry, summary: string): string {
  const lines: string[] = [];
  lines.push(`# Chunked Translation Report`);
  lines.push("");
  lines.push(`- **Model**: ${telemetry.model}`);
  lines.push(`- **Chunk size**: ${telemetry.chunkSize}`);
  lines.push(`- **Total chunks**: ${telemetry.totalChunks}`);
  lines.push(`- **Total input tokens**: ${telemetry.totalInputTokens}`);
  lines.push(`- **Total output tokens**: ${telemetry.totalOutputTokens}`);
  lines.push(`- **Total duration**: ${telemetry.totalDurationMs}ms`);
  lines.push("");
  lines.push(`## Article Summary`);
  lines.push(summary);
  lines.push("");
  lines.push(`## Per-Chunk Telemetry`);
  lines.push("");
  lines.push("| Chunk | Input Tokens | Output Tokens | Duration (ms) |");
  lines.push("|-------|-------------:|--------------:|--------------:|");
  for (const c of telemetry.chunks) {
    lines.push(`| ${c.index + 1} | ${c.inputTokens} | ${c.outputTokens} | ${c.durationMs} |`);
  }
  lines.push("");
  return lines.join("\n");
}

main().catch((err) => {
  console.error("\n❌ Translation failed:", err.message);
  process.exit(1);
});
