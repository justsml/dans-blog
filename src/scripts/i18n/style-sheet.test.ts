import { describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { MockLanguageModelV4 } from "ai/test";
import { buildCachedChunkContextPrompt } from "./prompts.ts";
import type { StyleSheet } from "./style-sheet.ts";

// Bun auto-loads .env; keep mock generations out of Langfuse by clearing the
// credentials before ai-sdk.ts (via style-sheet.ts) decides whether to trace.
delete process.env.LANGFUSE_PUBLIC_KEY;
delete process.env.LANGFUSE_SECRET_KEY;
const {
  applyStyleSheetChallengeGroups,
  extractChallengeGroups,
  findUnusedStyleSheetTerms,
  getStyleSheetPath,
  hashStyleSheetSource,
  loadOrCreateStyleSheet,
  parseStyleSheetResponse,
  renderStyleSheet,
} = await import("./style-sheet.ts");

const ARTICLE = [
  "---",
  "title: Don't Fear the Model Router",
  "---",
  "",
  "Route accuracy is the metric. Your scorer decides everything.",
  "",
  "Later, route accuracy drops when the scorer drifts.",
].join("\n");

const QUIZ = [
  "---",
  "title: Promises Quiz",
  "category: Quiz",
  "---",
  "",
  "<QuizUI>",
  "<Challenge",
  "  index={0}",
  '  group="Warmup"',
  '  title="First"',
  "  options={[{text: 'a', isAnswer: true}]}",
  ">",
  '  <slot name="question">',
  '  <div className="question">Use group="Fake" here?</div>',
  "  </slot>",
  "</Challenge>",
  "<Challenge",
  "  index={1}",
  '  group="Advanced"',
  '  title="Second"',
  "  options={[{text: 'b', isAnswer: true}]}",
  ">",
  "</Challenge>",
  "<Challenge",
  "  index={2}",
  '  group="Warmup"',
  '  title="Third"',
  "  options={[{text: 'c', isAnswer: true}]}",
  ">",
  "</Challenge>",
  "</QuizUI>",
].join("\n");

function mockModel(text: string | (() => string)) {
  let calls = 0;
  const model = new MockLanguageModelV4({
    doGenerate: async () => {
      calls += 1;
      return {
        content: [{ type: "text", text: typeof text === "function" ? text() : text }],
        finishReason: { unified: "stop", raw: "stop" },
        usage: {
          inputTokens: { total: 100, noCache: 100, cacheRead: 0, cacheWrite: 0 },
          outputTokens: { total: 50, text: 50, reasoning: 0 },
        },
        warnings: [],
      };
    },
  });
  return { model, calls: () => calls };
}

function callFor(model: MockLanguageModelV4, modelId = "mock/sheet") {
  return () => ({ model, modelId, maxOutputTokens: 4000, timeoutMs: 10_000 });
}

const ARTICLE_RESPONSE = JSON.stringify({
  register: { addressForm: "du (informal)", guidance: "Direct and dry." },
  terms: [
    { source: "route accuracy", target: "Routengenauigkeit", keepEnglish: false, note: "the metric" },
    { source: "scorer", target: "ignored", keepEnglish: true },
    { source: "Route Accuracy", target: "Duplikat", keepEnglish: false },
    { source: "hallucinated term", target: "erfunden", keepEnglish: false },
  ],
  challengeGroups: [],
});

describe("extractChallengeGroups", () => {
  test("returns unique groups in source order and ignores slot content", () => {
    expect(extractChallengeGroups(QUIZ)).toEqual(["Warmup", "Advanced"]);
  });

  test("returns nothing for prose articles", () => {
    expect(extractChallengeGroups(ARTICLE)).toEqual([]);
  });
});

describe("parseStyleSheetResponse", () => {
  const meta = { locale: "de" as const, sourceHash: "abc", model: "m", sourceRaw: ARTICLE, groups: [] };

  test("normalizes terms: dedupes, drops invented terms, pins keepEnglish targets", () => {
    const sheet = parseStyleSheetResponse("```json\n" + ARTICLE_RESPONSE + "\n```", meta);
    expect(sheet.register.addressForm).toBe("du (informal)");
    expect(sheet.terms).toEqual([
      { source: "route accuracy", target: "Routengenauigkeit", keepEnglish: false, note: "the metric" },
      { source: "scorer", target: "scorer", keepEnglish: true },
    ]);
  });

  test("fails when a Challenge group has no translation", () => {
    expect(() => parseStyleSheetResponse(JSON.stringify({
      register: { addressForm: "Sie", guidance: "x" },
      terms: [],
      challengeGroups: [{ source: "Warmup", target: "Aufwärmen" }],
    }), { ...meta, sourceRaw: QUIZ, groups: ["Warmup", "Advanced"] })).toThrow(/"Advanced"/);
  });
});

describe("loadOrCreateStyleSheet", () => {
  test("generates once, then reuses the cached sheet without calling a model", async () => {
    const dir = mkdtempSync(join(tmpdir(), "i18n-style-sheet-"));
    try {
      const first = mockModel(ARTICLE_RESPONSE);
      const created = await loadOrCreateStyleSheet({ sourceRaw: ARTICLE, locale: "de", cacheDir: dir, call: callFor(first.model) });
      expect(created.generated).toBe(true);
      expect(created.telemetry?.inputTokens).toBe(100);
      expect(created.path).toBe(getStyleSheetPath(dir, "de", hashStyleSheetSource(ARTICLE)));
      expect(existsSync(created.path)).toBe(true);
      expect(first.calls()).toBe(1);

      const reused = await loadOrCreateStyleSheet({
        sourceRaw: ARTICLE,
        locale: "de",
        cacheDir: dir,
        call: () => { throw new Error("must not resolve a model for a cached sheet"); },
      });
      expect(reused.generated).toBe(false);
      expect(reused.hash).toBe(created.hash);
      expect(reused.sheet).toEqual(created.sheet);

      // A different locale or source is a different key.
      const otherLocale = mockModel(ARTICLE_RESPONSE);
      const fr = await loadOrCreateStyleSheet({ sourceRaw: ARTICLE, locale: "fr", cacheDir: dir, call: callFor(otherLocale.model) });
      expect(fr.generated).toBe(true);
      expect(fr.path).not.toBe(created.path);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("refresh regenerates and overwrites the cached sheet", async () => {
    const dir = mkdtempSync(join(tmpdir(), "i18n-style-sheet-"));
    try {
      await loadOrCreateStyleSheet({ sourceRaw: ARTICLE, locale: "de", cacheDir: dir, call: callFor(mockModel(ARTICLE_RESPONSE).model) });
      const refreshed = mockModel(ARTICLE_RESPONSE.replace("du (informal)", "Sie"));
      const result = await loadOrCreateStyleSheet({
        sourceRaw: ARTICLE,
        locale: "de",
        cacheDir: dir,
        refresh: true,
        call: callFor(refreshed.model, "mock/other"),
      });
      expect(refreshed.calls()).toBe(1);
      expect(result.sheet.register.addressForm).toBe("Sie");
      expect(result.sheet.model).toBe("mock/other");
      expect(JSON.parse(readFileSync(result.path, "utf8")).register.addressForm).toBe("Sie");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("does not cache a sheet that misses a quiz group", async () => {
    const dir = mkdtempSync(join(tmpdir(), "i18n-style-sheet-"));
    try {
      const { model } = mockModel(JSON.stringify({
        register: { addressForm: "です/ます体", guidance: "x" },
        terms: [],
        challengeGroups: [{ source: "Warmup", target: "ウォームアップ" }],
      }));
      await expect(loadOrCreateStyleSheet({ sourceRaw: QUIZ, locale: "ja", cacheDir: dir, call: callFor(model) }))
        .rejects.toThrow(/Advanced/);
      expect(existsSync(getStyleSheetPath(dir, "ja", hashStyleSheetSource(QUIZ)))).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("style sheet application", () => {
  const sheet: StyleSheet = {
    version: 1,
    locale: "ja",
    sourceHash: "abc",
    model: "m",
    createdAt: "2026-09-30T00:00:00.000Z",
    register: { addressForm: "です/ます体", guidance: "Plain and direct." },
    terms: [
      { source: "route accuracy", target: "ルート精度", keepEnglish: false },
      { source: "scorer", target: "scorer", keepEnglish: true },
    ],
    challengeGroups: [
      { source: "Warmup", target: "ウォームアップ" },
      { source: "Advanced", target: "上級" },
    ],
  };

  test("renders a binding block that the chunk prompt carries in its cached prefix", () => {
    const rendered = renderStyleSheet(sheet);
    expect(rendered).toContain("use EXACTLY these target terms");
    expect(rendered).toContain('"route accuracy" → "ルート精度"');
    expect(rendered).toContain('"scorer" → keep in English: "scorer"');
    expect(rendered).toContain('"Warmup" → "ウォームアップ"');
    expect(rendered).toContain("です/ます体");

    const cached = buildCachedChunkContextPrompt("ja", {
      chunkIndex: 0,
      totalChunks: 2,
      articleSummary: "Summary.",
      styleSheet: rendered,
    });
    expect(cached).toContain(rendered);
  });

  test("overwrites translated Challenge groups from the source group mapping", () => {
    const source = [{ group: "Warmup" }, { group: "Advanced" }, { group: "Warmup" }, { group: "Unmapped" }];
    const translated = [
      { group: "準備運動", title: "a" },
      { group: "高度", title: "b" },
      { group: "ウォーミングアップ", title: "c" },
      { group: "そのまま", title: "d" },
    ];
    expect(applyStyleSheetChallengeGroups(sheet, source, translated).map((c) => c.group))
      .toEqual(["ウォームアップ", "上級", "ウォームアップ", "そのまま"]);
  });

  test("lists glossary terms whose target never appears in the output", () => {
    const unused = findUnusedStyleSheetTerms(
      sheet,
      "Route accuracy matters. The scorer decides.",
      "ルート精度が重要です。評価器が決めます。",
    );
    expect(unused.map((term) => term.source)).toEqual(["scorer"]);
  });
});
