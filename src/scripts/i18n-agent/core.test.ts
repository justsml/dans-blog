import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { resolveLlmConfig } from "../i18n/core/model-config.ts";
import { scoreTranslation } from "../i18n/core/score.ts";
import { translateWithModel, type GenerateTextLike } from "../i18n/core/translate.ts";
import { validateTranslation } from "../i18n/core/validate.ts";
import {
  createPromptProfileVersion,
  resolvePromptProfile,
} from "./prompt-profiles.ts";

describe("resolveLlmConfig", () => {
  test("maps llm-strings OpenRouter config into AI SDK settings", () => {
    const config = resolveLlmConfig("llm://openrouter/google/gemini-3-flash-preview?temp=0.2&max=1234&effort=minimal");
    expect(config.provider).toBe("openrouter");
    expect(config.modelId).toBe("google/gemini-3-flash-preview");
    expect(config.mastraModel).toBe("openrouter/google/gemini-3-flash-preview");
    expect(config.temperature).toBe(0.2);
    expect(config.maxTokens).toBe(1234);
    expect(config.reasoningEffort).toBe("minimal");
  });

  test("normalizes bare OpenRouter model ids", () => {
    const config = resolveLlmConfig("openrouter/deepseek/deepseek-v4-flash");
    expect(config.modelId).toBe("deepseek/deepseek-v4-flash");
    expect(config.mastraModel).toBe("openrouter/deepseek/deepseek-v4-flash");
  });
});

describe("validateTranslation", () => {
  const source = [
    "---",
    "title: Hello",
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
    expect(result.rationale).toBe("solid");
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

      const resolved = resolvePromptProfile({
        locale: "ja",
        model: "llm://openrouter/deepseek/deepseek-v4-flash",
      });

      expect(first.version).toBe(1);
      expect(second.version).toBe(2);
      expect(resolved?.version).toBe(2);
      expect(resolved?.appendDynamic).toContain("technical loanwords");
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
