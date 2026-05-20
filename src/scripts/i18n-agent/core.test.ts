import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { resolveLlmConfig } from "../i18n/core/model-config.ts";
import { reverseTranslation, scoreTranslation, scoreTranslationConsensus } from "../i18n/core/score.ts";
import { translateWithModel, type GenerateTextLike } from "../i18n/core/translate.ts";
import { usageFromResult } from "../i18n/llm-telemetry.ts";
import { validateTranslation } from "../i18n/core/validate.ts";
import {
  createPromptProfileVersion,
  resolvePromptProfile,
} from "./prompt-profiles.ts";
import { parseCliArgs } from "./index.ts";
import {
  DEFAULT_AGENT_LOCALES,
  DEFAULT_AGENT_MODEL,
  DEFAULT_MAX_AGENT_STEPS,
  DEFAULT_TRANSLATION_MODEL,
} from "./runtime.ts";
import { ACTIVE_LOCALES } from "../../shared/i18n.ts";

describe("resolveLlmConfig", () => {
  test("maps llm-strings OpenRouter config into AI SDK settings", () => {
    const config = resolveLlmConfig("llm://openrouter/google/gemini-3-flash-preview?temp=0.2&max=1234&effort=minimal");
    expect(config.provider).toBe("openrouter");
    expect(config.modelId).toBe("google/gemini-3-flash-preview");
    expect(config.mastraModel).toBe("openrouter/google/gemini-3-flash-preview");
    expect(config.temperature).toBe(0.2);
    expect(config.maxTokens).toBe(1234);
    expect(config.reasoningEffort).toBe("minimal");
    expect(config.providerSettings.baseURL).toBeUndefined();
  });

  test("normalizes bare OpenRouter model ids", () => {
    const config = resolveLlmConfig("openrouter/deepseek/deepseek-v4-flash");
    expect(config.modelId).toBe("deepseek/deepseek-v4-flash");
    expect(config.mastraModel).toBe("openrouter/deepseek/deepseek-v4-flash");
  });
});

describe("i18n agent CLI", () => {
  test("defaults to interactive thread mode without a prompt", () => {
    expect(parseCliArgs([]).interactive).toBe(true);
  });

  test("uses DeepSeek Nitro as the default agent model", () => {
    expect(parseCliArgs([]).agentModel).toBe(DEFAULT_AGENT_MODEL);
    expect(DEFAULT_AGENT_MODEL).toContain("openrouter/deepseek/deepseek-v4-flash:nitro");
  });

  test("uses a high configurable max step budget", () => {
    expect(parseCliArgs([]).maxSteps).toBe(DEFAULT_MAX_AGENT_STEPS);
    expect(parseCliArgs(["--max-steps", "123"]).maxSteps).toBe(123);
  });

  test("accepts --models as judge consensus model shorthand", () => {
    expect(parseCliArgs(["--models", "a,b"]).judgeModels).toEqual(["a", "b"]);
    expect(parseCliArgs(["--judge-models", "c,d", "--models", "a,b"]).judgeModels).toEqual(["c", "d"]);
  });

  test("accepts multiple configured translation models", () => {
    const args = parseCliArgs(["--translation-models", "model-a,model-b"]);
    expect(args.translationModel).toBe("model-a");
    expect(args.translationModels).toEqual(["model-a", "model-b"]);
  });

  test("keeps --translation-model as primary when combined with --translation-models", () => {
    const args = parseCliArgs(["--translation-model", "primary", "--translation-models", "model-a,model-b"]);
    expect(args.translationModel).toBe("primary");
    expect(args.translationModels).toEqual(["primary", "model-a", "model-b"]);
  });

  test("preserves inline llm URL query strings while parsing options", () => {
    const model = "llm://openrouter/google/gemini-3-flash-preview?temp=0&max=32000&cache=true";
    const args = parseCliArgs([`--translation-models=${model},plain-model`]);
    expect(args.translationModels).toEqual([model, "plain-model"]);
  });

  test("defaults translation model pool to the single configured translation model", () => {
    const args = parseCliArgs([]);
    expect(args.translationModel).toBe(DEFAULT_TRANSLATION_MODEL);
    expect(args.translationModels).toEqual([DEFAULT_TRANSLATION_MODEL]);
  });

  test("defaults broad agent locale work to all active locales", () => {
    expect(DEFAULT_AGENT_LOCALES).toEqual([...ACTIVE_LOCALES]);
    expect(DEFAULT_AGENT_LOCALES).toEqual(["es", "hi", "ja", "ru", "de", "fr", "it", "ar", "he", "zh"]);
  });

  test("uses a positional prompt as the first interactive turn by default", () => {
    const args = parseCliArgs(["score", "the", "translation"]);
    expect(args.prompt).toBe("score the translation");
    expect(args.interactive).toBe(true);
    expect(parseCliArgs(["--thread-mode", "score", "the", "translation"]).interactive).toBe(true);
  });

  test("keeps --once prompt runs one-shot", () => {
    expect(parseCliArgs(["--once", "score", "the", "translation"]).interactive).toBe(false);
    expect(parseCliArgs(["--once"]).interactive).toBe(false);
  });
});

describe("validateTranslation", () => {
  const source = [
    "---",
    "title: Hello",
    "subTitle: A small test",
    "category: Code",
    "---",
    "import Thing from '../../../components/Thing.astro'",
    "",
    "## Heading",
    "",
    "```ts",
    "const value = 1;",
    "```",
    "",
    "<Thing />",
  ].join("\n");

  test("passes a structurally preserved translation", () => {
    const target = source
      .replace("title: Hello", "title: Hola")
      .replace("subTitle: A small test", "subTitle: Una prueba pequena")
      .replace("## Heading", "## Encabezado")
      .replace("../../../components/Thing.astro", "../../../../components/Thing.astro");
    const result = validateTranslation({
      sourceContents: source,
      targetContents: target,
      targetPath: "src/content/posts/2026-01-01--hello/es/index.mdx",
      locale: "es",
    });
    expect(result.passed).toBe(true);
  });

  test("reports structural failures without throwing", () => {
    const target = [
      "---",
      "title: Hola",
      "subTitle: Una prueba pequena",
      "category: Code",
      "---",
      "## Encabezado",
      "",
      "<Thing />",
    ].join("\n");
    const result = validateTranslation({
      sourceContents: source,
      targetContents: target,
      targetPath: "src/content/posts/2026-01-01--hello/es/index.mdx",
      locale: "es",
    });
    expect(result.passed).toBe(false);
    expect(result.issues.map((issue) => issue.code)).toContain("protected-tokens");
  });

  test("requires reader-facing frontmatter title and subTitle to be translated", () => {
    const target = source
      .replace("## Heading", "## Encabezado")
      .replace("../../../components/Thing.astro", "../../../../components/Thing.astro");
    const result = validateTranslation({
      sourceContents: source,
      targetContents: target,
      targetPath: "src/content/posts/2026-01-01--hello/es/index.mdx",
      locale: "es",
    });
    expect(result.passed).toBe(false);
    expect(result.issues).toContainEqual(expect.objectContaining({
      code: "frontmatter",
      severity: "high",
    }));
    expect(result.issues.find((issue) => issue.code === "frontmatter")?.message)
      .toContain("must translate frontmatter title");
  });

  test("requires subTitle when the English source has one", () => {
    const target = source
      .replace("title: Hello", "title: Hola")
      .replace("subTitle: A small test\n", "")
      .replace("## Heading", "## Encabezado")
      .replace("../../../components/Thing.astro", "../../../../components/Thing.astro");
    const result = validateTranslation({
      sourceContents: source,
      targetContents: target,
      targetPath: "src/content/posts/2026-01-01--hello/es/index.mdx",
      locale: "es",
    });
    expect(result.passed).toBe(false);
    expect(result.issues.find((issue) => issue.code === "frontmatter")?.message)
      .toContain("must include localized subTitle frontmatter");
  });
});

describe("scoreTranslation", () => {
  test("normalizes judge scores into agent-facing dimensions", async () => {
    const fakeGenerateText = (async () => ({
      text: JSON.stringify({
        scores: {
          readability: 90,
          technicalAccuracy: 88,
          coherence: 91,
          relevance: 89,
          translationQuality: 87,
          mdxPreservation: 95,
          culturalAdaptation: 84,
          languagePurity: 92,
        },
        publishReady: true,
        suggestions: [],
        rationale: "solid",
      }),
      usage: { inputTokens: 10, outputTokens: 20 },
      providerMetadata: undefined,
    })) as unknown as GenerateTextLike;

    const result = await scoreTranslation({
      sourceContents: "---\ntitle: Hello\n---\nText",
      targetContents: "---\ntitle: Hola\n---\nTexto",
      locale: "es",
      model: "openrouter/google/gemini-3-flash-preview",
      generateText: fakeGenerateText,
    });

    expect(result.publishReady).toBe(true);
    expect(result.scores.mdxPreservation).toBe(95);
    expect(result.scores.fidelity).toBe(88);
    expect(result.confidence).toBe("high");
    expect(result.confidenceScore).toBeGreaterThan(0.75);
    expect(result.issueCounts.high).toBe(0);
    expect(result.rationale).toBe("solid");
  });

  test("orders judge prompt messages for cache-friendly stable prefixes", async () => {
    let capturedSettings: { messages?: Array<{ content: unknown }> } | undefined;
    const fakeGenerateText = (async (settings: { messages?: Array<{ content: unknown }> }) => {
      capturedSettings = settings;
      return {
        text: JSON.stringify({
          scores: {
            readability: 90,
            technicalAccuracy: 88,
            coherence: 91,
            relevance: 89,
            translationQuality: 87,
            mdxPreservation: 95,
            culturalAdaptation: 84,
            languagePurity: 92,
          },
          publishReady: true,
          suggestions: [],
          rationale: "solid",
        }),
        usage: { inputTokens: 10, outputTokens: 20 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    await scoreTranslation({
      sourceContents: "---\ntitle: Hello\n---\nText",
      targetContents: "---\ntitle: Hola\n---\nTexto",
      locale: "es",
      model: "openrouter/google/gemini-3-flash-preview",
      slug: "hello",
      targetRelPath: "src/content/posts/hello/es/index.mdx",
      candidateId: "candidate-1",
      priorAssessments: [{
        model: "other-judge",
        overallScore: 70,
        publishReady: false,
        scores: {
          fidelity: 70,
          mdxPreservation: 80,
          localeQuality: 70,
          tone: 70,
          publishReadiness: 70,
        },
        suggestions: [],
        rationale: "Critical note.",
      }],
      generateText: fakeGenerateText,
    });

    const messages = capturedSettings?.messages ?? [];
    expect(messages.length).toBe(5);
    expect(JSON.stringify(messages[1])).toContain("Score these dimensions");
    expect(JSON.stringify(messages[1])).not.toContain("candidate-1");
    expect(JSON.stringify(messages[2])).toContain("<english-source>");
    expect(JSON.stringify(messages[3])).toContain("<candidate>");
    expect(JSON.stringify(messages[4])).toContain("Candidate id: candidate-1");
    expect(JSON.stringify(messages[4])).toContain("Critical reconsideration round");
    expect(JSON.stringify(messages[4])).not.toContain("<english-source>");
  });

  test("injects judge prompt tuning overlays into scoring calls", async () => {
    let capturedSettings: { messages?: Array<{ content: unknown }> } | undefined;
    const fakeGenerateText = (async (settings: { messages?: Array<{ content: unknown }> }) => {
      capturedSettings = settings;
      return {
        text: JSON.stringify({
          scores: {
            readability: 90,
            technicalAccuracy: 90,
            coherence: 90,
            relevance: 90,
            translationQuality: 90,
            mdxPreservation: 95,
            culturalAdaptation: 90,
            languagePurity: 90,
          },
          publishReady: true,
          suggestions: [],
          rationale: "solid",
        }),
        usage: { inputTokens: 10, outputTokens: 20 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    await scoreTranslation({
      sourceContents: "---\ntitle: Hello\n---\nText",
      targetContents: "---\ntitle: Hola\n---\nTexto",
      locale: "es",
      model: "openrouter/google/gemini-3-flash-preview",
      promptTuning: {
        appendSystem: "JUDGE_SYSTEM_TUNE",
        appendCachedContext: "JUDGE_CACHED_TUNE",
        appendDynamic: "JUDGE_DYNAMIC_TUNE",
      },
      generateText: fakeGenerateText,
    });

    const serialized = JSON.stringify(capturedSettings);
    expect(serialized).toContain("JUDGE_SYSTEM_TUNE");
    expect(serialized).toContain("JUDGE_CACHED_TUNE");
    expect(serialized).toContain("JUDGE_DYNAMIC_TUNE");
  });

  test("builds consensus through peer reconsideration", async () => {
    const calls: string[] = [];
    const fakeGenerateText = (async (settings: { messages?: Array<{ content: unknown }> }) => {
      const serialized = JSON.stringify(settings);
      calls.push(serialized);
      const isReconsideration = serialized.includes("Critical reconsideration round");
      const publishReady = isReconsideration;
      return {
        text: JSON.stringify({
          scores: {
            readability: publishReady ? 91 : 72,
            technicalAccuracy: publishReady ? 90 : 70,
            coherence: publishReady ? 90 : 72,
            relevance: publishReady ? 92 : 70,
            translationQuality: publishReady ? 91 : 68,
            mdxPreservation: publishReady ? 96 : 80,
            culturalAdaptation: publishReady ? 88 : 70,
            languagePurity: publishReady ? 90 : 70,
          },
          publishReady,
          suggestions: publishReady ? [] : [{
            priority: "medium",
            match: "Texto",
            replacement: "Texto mejor",
            reason: "Needs stronger Spanish.",
          }],
          rationale: publishReady ? "solid after reconsideration" : "maybe weak",
        }),
        usage: { inputTokens: 10, outputTokens: 20 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    const result = await scoreTranslationConsensus({
      sourceContents: "---\ntitle: Hello\n---\nText",
      targetContents: "---\ntitle: Hola\n---\nTexto",
      locale: "es",
      models: [
        "openrouter/google/gemini-3-flash-preview",
        "openrouter/deepseek/deepseek-v4-flash",
      ],
      escalationModels: ["openrouter/anthropic/claude-haiku"],
      generateText: fakeGenerateText,
      reconsiderationRounds: 1,
    });

    expect(calls.some((call) => call.includes("Critical reconsideration round"))).toBe(true);
    expect(result.escalated).toBe(false);
    expect(result.assessments.length).toBe(4);
    expect(result.totals.inputTokens).toBeGreaterThan(0);
  });

  test("escalates unresolved judge disagreement", async () => {
    let calls = 0;
    const fakeGenerateText = (async () => {
      calls += 1;
      const publishReady = calls !== 2;
      return {
        text: JSON.stringify({
          scores: {
            readability: publishReady ? 92 : 60,
            technicalAccuracy: publishReady ? 92 : 58,
            coherence: publishReady ? 92 : 60,
            relevance: publishReady ? 92 : 58,
            translationQuality: publishReady ? 92 : 60,
            mdxPreservation: publishReady ? 98 : 80,
            culturalAdaptation: publishReady ? 90 : 60,
            languagePurity: publishReady ? 92 : 60,
          },
          publishReady,
          suggestions: publishReady ? [] : [{
            priority: "high",
            match: "Texto",
            replacement: "Texto corregido",
            reason: "Major mistranslation.",
          }],
          rationale: publishReady ? "publishable" : "not publishable",
        }),
        usage: { inputTokens: 10, outputTokens: 20 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    const result = await scoreTranslationConsensus({
      sourceContents: "---\ntitle: Hello\n---\nText",
      targetContents: "---\ntitle: Hola\n---\nTexto",
      locale: "es",
      models: [
        "openrouter/google/gemini-3-flash-preview",
        "openrouter/deepseek/deepseek-v4-flash",
      ],
      escalationModels: ["openrouter/anthropic/claude-haiku"],
      generateText: fakeGenerateText,
      reconsiderationRounds: 0,
    });

    expect(result.escalated).toBe(true);
    expect(result.assessments.length).toBe(3);
    expect(result.totals.inputTokens).toBeGreaterThan(0);
  });
});

describe("reverseTranslation", () => {
  test("back-translates before comparing against the English reference", async () => {
    const calls: Array<{ messages?: Array<{ content: unknown }> }> = [];
    const fakeGenerateText = (async (settings: { messages?: Array<{ content: unknown }> }) => {
      calls.push(settings);
      if (calls.length === 1) {
        return {
          text: JSON.stringify({
            reverseTranslation: "Hello, this keeps the API claim.",
            errors: [],
          }),
          usage: { inputTokens: 5, outputTokens: 7 },
          providerMetadata: undefined,
        };
      }
      return {
        text: JSON.stringify({
          scores: {
            similarity: 91,
            faithfulness: 88,
            coverage: 90,
            technicalFidelity: 95,
            structuralCorrespondence: 84,
          },
          issues: [{
            severity: "medium",
            category: "meaning",
            referenceExcerpt: "keeps the API claim and caveat",
            reverseExcerpt: "keeps the API claim",
            message: "The caveat is weaker in the reverse translation.",
          }],
          errors: [],
          confidence: "medium",
          confidenceScore: 72,
          rationale: "Mostly equivalent with one softened caveat.",
        }),
        usage: { inputTokens: 11, outputTokens: 13 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    const result = await reverseTranslation({
      locale: "es",
      translatedInput: Buffer.from("Hola, esto conserva la afirmacion de la API."),
      referenceInput: Buffer.from("Hello, this keeps the API claim and caveat."),
      model: "openrouter/google/gemini-3-flash-preview",
      generateText: fakeGenerateText,
    });

    expect(calls.length).toBe(2);
    expect(JSON.stringify(calls[0])).toContain("<translated-input>");
    expect(JSON.stringify(calls[0])).not.toContain("<english-reference>");
    expect(JSON.stringify(calls[1])).toContain("<english-reference>");
    expect(result.referenceCompared).toBe(true);
    expect(result.reverseTranslation).toBe("Hello, this keeps the API claim.");
    expect(result.similarityScore).toBe(91);
    expect(result.faithfulness).toBe(88);
    expect(result.scores?.technicalFidelity).toBe(95);
    expect(result.issues[0]?.severity).toBe("medium");
    expect(result.convergence.converged).toBeNull();
    expect(result.interpretationNotes.join(" ")).toContain("diagnostic");
    expect(result.telemetry.inputTokens).toBe(16);
  });

  test("returns reverse text with null scores when no reference is supplied", async () => {
    const fakeGenerateText = (async () => ({
      text: JSON.stringify({
        reverseTranslation: "A reverse-only English draft.",
        errors: [],
      }),
      usage: { inputTokens: 3, outputTokens: 4 },
      providerMetadata: undefined,
    })) as unknown as GenerateTextLike;

    const result = await reverseTranslation({
      locale: "ja",
      translatedInput: Buffer.from("逆翻訳だけの本文。"),
      model: "openrouter/deepseek/deepseek-v4-flash",
      generateText: fakeGenerateText,
    });

    expect(result.referenceCompared).toBe(false);
    expect(result.similarityScore).toBeNull();
    expect(result.faithfulness).toBeNull();
    expect(result.errors.map((error) => error.code)).toContain("missing-reference");
  });
});

describe("usageFromResult", () => {
  test("reads OpenRouter snake_case usage metadata including reasoning and cost", () => {
    const telemetry = usageFromResult(undefined, 123, {
      openrouter: {
        usage: {
          prompt_tokens: 100,
          completion_tokens: 50,
          total_tokens: 175,
          cost: 0.0012,
          prompt_tokens_details: {
            cached_tokens: 25,
            cache_write_tokens: 10,
          },
          completion_tokens_details: {
            reasoning_tokens: 25,
          },
          cost_details: {
            upstream_inference_cost: 0.0009,
          },
        },
      },
    });

    expect(telemetry.inputTokens).toBe(100);
    expect(telemetry.outputTokens).toBe(50);
    expect(telemetry.totalTokens).toBe(175);
    expect(telemetry.reasoningTokens).toBe(25);
    expect(telemetry.cacheReadTokens).toBe(25);
    expect(telemetry.cacheWriteTokens).toBe(10);
    expect(telemetry.providerCostUsd).toBe(0.0012);
    expect(telemetry.providerUpstreamCostUsd).toBe(0.0009);
  });

  test("keeps finish diagnostics from the AI SDK result", () => {
    const telemetry = usageFromResult(
      { inputTokens: 10, outputTokens: 20 },
      123,
      undefined,
      {
        finishReason: "length",
        rawFinishReason: "max_tokens",
        warnings: [{ type: "unsupported-setting" }],
      },
    );

    expect(telemetry.finishReason).toBe("length");
    expect(telemetry.rawFinishReason).toBe("max_tokens");
    expect(telemetry.warnings?.length).toBe(1);
  });
});

describe("translateWithModel", () => {
  test("translates article body and frontmatter through injected model calls", async () => {
    let calls = 0;
    const fakeGenerateText = (async (settings: { prompt?: string; messages?: Array<{ content: unknown }> }) => {
      calls += 1;
      const serialized = JSON.stringify(settings);
      if (settings.prompt != null) {
        return { text: "A short summary.", usage: { inputTokens: 1, outputTokens: 1 }, providerMetadata: undefined };
      }
      if (serialized.includes("Translate the following title")) {
        return { text: "Hola mundo", usage: { inputTokens: 1, outputTokens: 1 }, providerMetadata: undefined };
      }
      return {
        text: "## Encabezado\n\nTexto traducido.",
        usage: { inputTokens: 2, outputTokens: 3 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    const result = await translateWithModel({
      sourceContents: [
        "---",
        "title: Hello world",
        "category: Code",
        "---",
        "## Heading",
        "",
        "Original text.",
      ].join("\n"),
      locale: "es",
      model: "openrouter/deepseek/deepseek-v4-flash",
      generateText: fakeGenerateText,
    });

    expect(calls).toBeGreaterThanOrEqual(3);
    expect(result.contents).toContain("title: Hola mundo");
    expect(result.contents).toContain("## Encabezado");
    expect(result.telemetry.totalInputTokens).toBeGreaterThan(0);
  });

  test("injects prompt tuning overlays into translation calls", async () => {
    const serializedCalls: string[] = [];
    const fakeGenerateText = (async (settings: { messages?: Array<{ content: unknown }> }) => {
      serializedCalls.push(JSON.stringify(settings));
      if (serializedCalls.at(-1)?.includes("Translate the following title")) {
        return { text: "Titulo afinado", usage: { inputTokens: 1, outputTokens: 1 }, providerMetadata: undefined };
      }
      return {
        text: "## Encabezado afinado\n\nTexto traducido.",
        usage: { inputTokens: 2, outputTokens: 3 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    const result = await translateWithModel({
      sourceContents: [
        "---",
        "title: Tuned title",
        "category: Code",
        "---",
        "## Heading",
        "",
        "Original text.",
      ].join("\n"),
      locale: "es",
      model: "openrouter/deepseek/deepseek-v4-flash",
      skipSummary: true,
      promptTuning: {
        appendSystem: "SYSTEM_TUNE",
        appendCachedContext: "CACHED_TUNE",
        appendDynamic: "DYNAMIC_TUNE",
        appendFrontmatter: "FRONTMATTER_TUNE",
      },
      generateText: fakeGenerateText,
    });

    const serialized = serializedCalls.join("\n");
    expect(result.contents).toContain("Titulo afinado");
    expect(serialized).toContain("SYSTEM_TUNE");
    expect(serialized).toContain("CACHED_TUNE");
    expect(serialized).toContain("DYNAMIC_TUNE");
    expect(serialized).toContain("FRONTMATTER_TUNE");
  });

  test("puts cached translation context before dynamic chunk text", async () => {
    const calls: Array<{ prompt?: string; messages?: Array<{ content: unknown }> }> = [];
    const fakeGenerateText = (async (settings: { prompt?: string; messages?: Array<{ content: unknown }> }) => {
      calls.push(settings);
      const serialized = JSON.stringify(settings);
      if (serialized.includes("Translate the following title")) {
        return { text: "Titulo", usage: { inputTokens: 1, outputTokens: 1 }, providerMetadata: undefined };
      }
      return {
        text: "Texto traducido.",
        usage: { inputTokens: 2, outputTokens: 3 },
        providerMetadata: undefined,
      };
    }) as unknown as GenerateTextLike;

    await translateWithModel({
      sourceContents: [
        "---",
        "title: Cache shape",
        "category: Code",
        "---",
        "Original text.",
      ].join("\n"),
      locale: "es",
      model: "openrouter/deepseek/deepseek-v4-flash",
      skipSummary: true,
      generateText: fakeGenerateText,
    });

    const chunkCall = calls.find((call) => JSON.stringify(call).includes("--- CHUNK START ---"));
    const messages = chunkCall?.messages ?? [];
    expect(messages.length).toBe(3);
    expect(JSON.stringify(messages[1])).toContain("STABLE TRANSLATION CONTRACT");
    expect(JSON.stringify(messages[1])).not.toContain("--- CHUNK START ---");
    expect(JSON.stringify(messages[1])).toContain("cacheControl");
    expect(JSON.stringify(messages[2])).toContain("--- CHUNK START ---");
  });

  test("fails fast when a translation chunk hits the output token limit", async () => {
    const fakeGenerateText = (async () => ({
      text: "partial translation",
      finishReason: "length",
      rawFinishReason: "max_tokens",
      usage: { inputTokens: 2, outputTokens: 7 },
      providerMetadata: undefined,
    })) as unknown as GenerateTextLike;

    try {
      await translateWithModel({
        sourceContents: [
          "---",
          "title: Token ceiling",
          "category: Code",
          "---",
          "A paragraph that needs translation.",
        ].join("\n"),
        locale: "es",
        model: "llm://openrouter/deepseek/deepseek-v4-flash?max=7",
        skipSummary: true,
        generateText: fakeGenerateText,
      });
      throw new Error("Expected translation to fail");
    } catch (error) {
      expect(error instanceof Error ? error.message : String(error)).toContain("hit maxOutputTokens=7");
    }
  });
});

describe("prompt profiles", () => {
  test("creates versioned active prompt overlays per locale and model", () => {
    const originalPath = process.env.I18N_AGENT_PROMPT_PROFILES_PATH;
    const tempDir = mkdtempSync(join(tmpdir(), "i18n-agent-prompts-"));
    process.env.I18N_AGENT_PROMPT_PROFILES_PATH = join(tempDir, "prompt-profiles.json");

    try {
      const first = createPromptProfileVersion({
        locale: "ja",
        modelPattern: "openrouter/deepseek/deepseek-v4-flash",
        appendDynamic: "Prefer concise Japanese phrasing.",
      });
      const second = createPromptProfileVersion({
        locale: "ja",
        modelPattern: "openrouter/deepseek/deepseek-v4-flash",
        appendDynamic: "Prefer concise Japanese phrasing and preserve technical loanwords.",
      });
      const judge = createPromptProfileVersion({
        kind: "judge",
        locale: "ja",
        modelPattern: "openrouter/google/gemini-3-flash-preview",
        appendCachedContext: "Be extra strict about Japanese loanword drift.",
      });

      const resolved = resolvePromptProfile({
        locale: "ja",
        model: "llm://openrouter/deepseek/deepseek-v4-flash",
      });
      const resolvedJudge = resolvePromptProfile({
        kind: "judge",
        locale: "ja",
        model: "openrouter/google/gemini-3-flash-preview",
      });

      expect(first.version).toBe(1);
      expect(second.version).toBe(2);
      expect(judge.kind).toBe("judge");
      expect(resolved?.version).toBe(2);
      expect(resolved?.appendDynamic).toContain("technical loanwords");
      expect(resolvedJudge?.appendCachedContext).toContain("loanword drift");
    } finally {
      if (originalPath == null) {
        delete process.env.I18N_AGENT_PROMPT_PROFILES_PATH;
      } else {
        process.env.I18N_AGENT_PROMPT_PROFILES_PATH = originalPath;
      }
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
