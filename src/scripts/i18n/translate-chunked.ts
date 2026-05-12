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
import { LOCALE_LABELS } from "../../shared/i18n.ts";
import { parseQuiz, assembleQuiz } from "./quiz-parser.ts";
import { translateChallenge, generateQuizDescription } from "./quiz-translator.ts";

interface LlmConfig {
  modelId: string;
  providerSettings: OpenRouterProviderSettings;
  providerOptions: {
    openrouter: {
      reasoning: {
        effort: string;
      };
    };
  };
  reasoningEffort: string;
  temperature: number;
  maxTokens: number;
}

const DEFAULT_REASONING_EFFORT = "low";

function resolveLlmConfig(modelInput: string): LlmConfig {
  if (modelInput.startsWith("llm://")) {
    const parsed = parseLlmString(modelInput);
    const reasoningEffort = String(
      parsed.params.reasoning_effort
        ?? parsed.params.reasoningEffort
        ?? parsed.params.effort
        ?? DEFAULT_REASONING_EFFORT,
    );

    return {
      modelId: parsed.model,
      providerSettings: {
        apiKey: parsed.apiKey,
        baseURL: parsed.host ? `https://${parsed.host}` : undefined,
      },
      providerOptions: {
        openrouter: {
          reasoning: {
            effort: reasoningEffort,
          },
        },
      },
      reasoningEffort,
      temperature: Number(parsed.params.temperature ?? parsed.params.temp ?? 0.3),
      maxTokens: Number(parsed.params.max_tokens ?? parsed.params.maxTokens ?? 16000),
    };
  }

  // Normalize opencode-style model IDs like "openrouter/qwen/qwen3.6-plus"
  const modelId = modelInput.replace(/^openrouter\//, "");

  return {
    modelId,
    providerSettings: {},
    providerOptions: {
      openrouter: {
        reasoning: {
          effort: DEFAULT_REASONING_EFFORT,
        },
      },
    },
    reasoningEffort: DEFAULT_REASONING_EFFORT,
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
    .replace(/from '\.\.\/..\/..\//g, "from '../../../../")
    .replace(/from "\.\.\/..\/..\//g, 'from "../../../../');

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
  isQuiz: boolean,
): Promise<{ text: string; inputTokens: number; outputTokens: number; durationMs: number }> {
  const start = performance.now();

  const system = buildSystemPrompt(locale, isQuiz);
  const user = buildUserPrompt(chunk.text, locale, {
    chunkIndex: chunk.index,
    totalChunks: chunk.totalChunks ?? chunk.index + 1,
    previousTranslation,
    articleSummary,
  }, isQuiz);

  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);

  const result = await generateText({
    model,
    system,
    prompt: user,
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    providerOptions: llmConfig.providerOptions,
  });

  const durationMs = Math.round(performance.now() - start);

  return {
    text: result.text,
    inputTokens: result.usage?.inputTokens ?? 0,
    outputTokens: result.usage?.outputTokens ?? 0,
    durationMs,
  };
}

async function generateSummary(
  title: string,
  body: string,
  llmConfig: LlmConfig,
  isQuiz: boolean,
): Promise<string> {
  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);
  const result = await generateText({
    model,
    system:
      "You are a technical editor. Write concise, accurate summaries of technical articles.",
    prompt: buildSummaryPrompt(title, body, isQuiz),
    temperature: llmConfig.temperature,
    maxOutputTokens: 500,
    providerOptions: llmConfig.providerOptions,
  });
  return result.text.trim();
}

async function translateQuiz(
  sourceBody: string,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  skipSummary: boolean,
  dryRun: boolean,
): Promise<{ body: string; telemetry: Telemetry; articleSummary: string }> {
  console.log("🧩 Parsing quiz structure...");
  const quiz = parseQuiz(sourceBody);
  console.log(`   ${quiz.challenges.length} challenges found\n`);

  // Generate quiz description
  let quizDescription = "";
  if (!skipSummary) {
    console.log("📝 Generating quiz description...");
    quizDescription = await generateQuizDescription(quiz, llmConfig);
    console.log(`   ${quizDescription.split("\n")[0]}\n`);
  } else {
    quizDescription = "Technical quiz. Translate each challenge precisely.";
  }

  if (dryRun) {
    console.log("🧪 Dry run — printing first challenge payload:");
    console.log("---");
    const first = quiz.challenges[0];
    if (first) {
      console.log(JSON.stringify({
        title: first.title,
        group: first.group,
        options: first.options.map(o => ({ text: o.text, hint: o.hint })),
      }, null, 2));
    }
    console.log("---");
    console.log("\nExiting without translation.");
    return { body: sourceBody, telemetry: createEmptyTelemetry(llmConfig, "quiz"), articleSummary: quizDescription };
  }

  // Translate intro text using normal chunking
  let translatedIntro = quiz.intro;
  if (quiz.intro) {
    console.log("🔄 Translating quiz intro...");
    translatedIntro = await translateProse(quiz.intro, locale, llmConfig, quizDescription);
    console.log("   ✅ Intro done\n");
  }

  // Translate each challenge one at a time
  const translatedChallenges = [];
  const telemetry: Telemetry = {
    model: llmConfig.modelId,
    chunkSize: "quiz",
    totalChunks: quiz.challenges.length,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalDurationMs: 0,
    chunks: [],
  };

  for (let i = 0; i < quiz.challenges.length; i++) {
    const challenge = quiz.challenges[i];
    console.log(`🎯 Translating challenge ${i + 1}/${quiz.challenges.length}: "${challenge.title}"`);

    const { challenge: translatedChallenge, telemetry: t } = await translateChallenge(
      challenge,
      locale,
      llmConfig,
      quizDescription,
      true,
    );

    translatedChallenges.push(translatedChallenge);
    telemetry.chunks.push({ index: i, inputTokens: t.inputTokens, outputTokens: t.outputTokens, durationMs: t.durationMs });
    telemetry.totalInputTokens += t.inputTokens;
    telemetry.totalOutputTokens += t.outputTokens;
    telemetry.totalDurationMs += t.durationMs;

    console.log(
      `   ✅ Done in ${t.durationMs}ms | input: ${t.inputTokens} | output: ${t.outputTokens}`,
    );
  }

  // Translate outro text using normal chunking
  let translatedOutro = quiz.outro;
  if (quiz.outro) {
    console.log("\n🔄 Translating quiz outro...");
    translatedOutro = await translateProse(quiz.outro, locale, llmConfig, quizDescription);
    console.log("   ✅ Outro done\n");
  }

  const translatedQuiz = {
    intro: translatedIntro,
    challenges: translatedChallenges,
    outro: translatedOutro,
  };

  const body = assembleQuiz(translatedQuiz);
  return { body, telemetry, articleSummary: quizDescription };
}

async function translateProse(
  text: string,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  context: string,
): Promise<string> {
  const provider = createOpenRouter(llmConfig.providerSettings);
  const model = provider.chat(llmConfig.modelId);

  const result = await generateText({
    model,
    system: buildSystemPrompt(locale, true),
    prompt: [
      `QUIZ CONTEXT:`,
      context,
      ``,
      `Translate the following prose into ${LOCALE_LABELS[locale]}:`,
      `---`,
      text,
      `---`,
    ].join("\n"),
    temperature: llmConfig.temperature,
    maxOutputTokens: llmConfig.maxTokens,
    providerOptions: llmConfig.providerOptions,
  });

  return result.text.trim();
}

function createEmptyTelemetry(llmConfig: LlmConfig, chunkSize: string): Telemetry {
  return {
    model: llmConfig.modelId,
    chunkSize,
    totalChunks: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalDurationMs: 0,
    chunks: [],
  };
}

async function main() {
  const options = parseArgs();
  const slug = requireString(options, "slug");
  const locale = requireActiveLocale(options);
  const modelId = requireString(options, "model");
  const chunkSizeInput = options["chunk"] as string | undefined;
  const skipSummary = options["skip-summary"] === true;
  const dryRun = options["dry-run"] === true;

  const llmConfig = resolveLlmConfig(modelId);
  const { sourcePath, targetPath, reportDir } = getPostPaths(slug, locale);

  if (!existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  const sourceRaw = readFileSync(sourcePath, "utf8");
  const parsed = matter(sourceRaw);
  const sourceBody = parsed.content;
  const isQuiz = parsed.data.category === "Quiz";

  console.log(`\n📄 Source: ${relativeToRepo(sourcePath)}`);
  console.log(`🎯 Target: ${relativeToRepo(targetPath)}`);
  console.log(`🌐 Locale: ${locale}`);
  if (isQuiz) {
    console.log(`✂️  Strategy: 1 question per API call`);
  } else {
    if (!chunkSizeInput) throw new Error(`Missing required --chunk for non-quiz articles`);
    console.log(`✂️  Chunk strategy: ${chunkSizeInput}`);
  }
  console.log(`🤖 Model: ${llmConfig.modelId} (temp=${llmConfig.temperature}, maxTokens=${llmConfig.maxTokens}, effort=${llmConfig.reasoningEffort})\n`);

  let translatedBody: string;
  let telemetry: Telemetry;
  let articleSummary: string;

  if (isQuiz) {
    console.log(`🎯 Quiz detected: ${slug}\n`);
    const result = await translateQuiz(sourceBody, locale, llmConfig, skipSummary, dryRun);
    if (dryRun) return;
    translatedBody = result.body;
    telemetry = result.telemetry;
    articleSummary = result.articleSummary;
  } else {
    // Regular article translation
    const strategy = parseChunkSize(chunkSizeInput!);

    if (!skipSummary) {
      console.log("📝 Generating article summary...");
      articleSummary = await generateSummary(parsed.data.title ?? slug, sourceBody, llmConfig, false);
      console.log(`   Summary: ${articleSummary.slice(0, 120)}...\n`);
    } else {
      articleSummary = "No summary provided. Translate each chunk independently.";
    }

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

    const result = await translateArticleChunks(chunks, locale, llmConfig, articleSummary);
    translatedBody = reassembleChunks(result.translatedChunks);
    telemetry = result.telemetry;
  }

  const normalizedBody = normalizeCandidateForLocale(sourceRaw, translatedBody);

  // Build frontmatter
  const frontmatter: Record<string, unknown> = { ...parsed.data };
  const translatedFrontmatter = await translateFrontmatter(frontmatter, locale, llmConfig, isQuiz);
  const frontmatterYaml = matter.stringify("", translatedFrontmatter).trim();

  const finalOutput = frontmatterYaml + "\n" + normalizedBody;

  // Write output
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, finalOutput, "utf8");

  // Write telemetry report
  const reportName = chunkSizeInput ?? (isQuiz ? "quiz" : "article");
  const reportPath = join(reportDir, `chunked-${reportName.replace(/[^a-z0-9]/gi, "")}.md`);
  writeTextFile(reportPath, formatTelemetryReport(telemetry, articleSummary));

  console.log(`\n✅ Translation written to ${relativeToRepo(targetPath)}`);
  console.log(`📊 Report written to ${relativeToRepo(reportPath)}`);
  console.log(
    `   Total: ${telemetry.totalInputTokens} input tokens, ${telemetry.totalOutputTokens} output tokens, ${telemetry.totalDurationMs}ms`,
  );
}

async function translateArticleChunks(
  chunks: Chunk[],
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  articleSummary: string,
): Promise<{ translatedChunks: Chunk[]; telemetry: Telemetry }> {
  const translatedChunks: Chunk[] = [];
  const telemetry: Telemetry = {
    model: llmConfig.modelId,
    chunkSize: "article",
    totalChunks: chunks.length,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalDurationMs: 0,
    chunks: [],
  };

  let previousTranslation: string | undefined;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    chunk.totalChunks = chunks.length;

    console.log(`🔄 Translating chunk ${i + 1}/${chunks.length}...`);

    const { text, inputTokens, outputTokens, durationMs } = await translateChunk(
      chunk,
      locale,
      llmConfig,
      articleSummary,
      previousTranslation,
      false,
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

  return { translatedChunks, telemetry };
}

async function translateFrontmatter(
  frontmatter: Record<string, unknown>,
  locale: ActiveLocale,
  llmConfig: LlmConfig,
  isQuiz: boolean,
): Promise<Record<string, unknown>> {
  const result = { ...frontmatter };

  for (const key of ["date", "modified", "minReleaseDate"]) {
    const value = result[key];
    if (value instanceof Date) {
      result[key] = value.toISOString().slice(0, 10);
    }
  }

  for (const [key, value] of Object.entries(result)) {
    if (
      /(?:image|cover|icon|hero|thumbnail)/i.test(key)
      && typeof value === "string"
      && /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(value)
      && !value.startsWith("../")
      && !value.startsWith("./")
      && !value.startsWith("/")
      && !/^https?:\/\//i.test(value)
    ) {
      result[key] = `../${value}`;
    }
  }

  // Only translate reader-facing strings
  const keysToTranslate = ["title", "subTitle", "cover_alt"];

  for (const key of keysToTranslate) {
    const value = result[key];
    if (typeof value !== "string" || !value.trim()) continue;

    const provider = createOpenRouter(llmConfig.providerSettings);
    const model = provider.chat(llmConfig.modelId);
    const translation = await generateText({
      model,
      system: buildSystemPrompt(locale, isQuiz),
      prompt: `Translate the following ${key} into ${locale}. Keep it concise and natural.\n\n${value}`,
      temperature: llmConfig.temperature,
      maxOutputTokens: 500,
      providerOptions: llmConfig.providerOptions,
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
