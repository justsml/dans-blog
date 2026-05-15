import { describe, expect, test } from "bun:test";
import {
  averageJudgeScore,
  buildEscalationPrompt,
  buildPrePublishRescorePrompt,
  buildPrimaryJudgePrompt,
  buildSecondJudgePrompt,
  extractJsonObject,
  isBlockingSuggestion,
  normalizeLegacySuggestedChanges,
  normalizeJudgeScore,
  normalizeJudgeScores,
  normalizePriority,
  normalizeSelectedCandidate,
  normalizeSuggestions,
  parseJudgeOutput,
  parseSelectedCommit,
  shouldEscalateSecondJudge,
  type CandidateRef,
  type JudgeSuggestion,
} from "./judge-utils.ts";
import {
  analyzeTranslationIntegrity,
  countHeadingsByLevel,
} from "./integrity-checks.ts";
import { resolveCheapFastTranslationModel } from "./model-presets.ts";

const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);
const SHA_C = "c".repeat(40);

function makeCandidate(id: string, model = "test-model"): CandidateRef {
  return { id, label: `<candidate id="${id}">`, source: "commit", model };
}

// ---------------------------------------------------------------------------
// model preset resolution
// ---------------------------------------------------------------------------

describe("resolveCheapFastTranslationModel", () => {
  test("passes full model IDs through", () => {
    expect(resolveCheapFastTranslationModel("openrouter/qwen/qwen3-32b:nitro")).toBe("openrouter/qwen/qwen3-32b:nitro");
  });

  test("resolves loose substrings to the first cheap/fast model match", () => {
    expect(resolveCheapFastTranslationModel("nitro")).toBe("openrouter/google/gemma-4-26b-a4b-it:nitro");
    expect(resolveCheapFastTranslationModel("32b")).toBe("openrouter/qwen/qwen3-32b:nitro");
    expect(resolveCheapFastTranslationModel("deepseek")).toBe("openrouter/deepseek/deepseek-v4-flash");
  });

  test("returns unmatched input unchanged for custom or downstream handling", () => {
    expect(resolveCheapFastTranslationModel("not-a-real-model")).toBe("not-a-real-model");
  });
});

// ---------------------------------------------------------------------------
// extractJsonObject
// ---------------------------------------------------------------------------

describe("extractJsonObject", () => {
  test("extracts bare JSON object", () => {
    expect(extractJsonObject(`{"selectedCommit":"${SHA_A}"}`)).toBe(`{"selectedCommit":"${SHA_A}"}`);
  });

  test("strips usage line before extracting", () => {
    const input = [`{"usage":{"inputTokens":100}}`, `{"selectedCommit":"${SHA_A}"}`].join("\n");
    expect(extractJsonObject(input)).toBe(`{"selectedCommit":"${SHA_A}"}`);
  });

  test("extracts from fenced JSON block", () => {
    const input = ["```json", `{"selectedCommit":"${SHA_A}"}`, "```"].join("\n");
    expect(extractJsonObject(input)).toBe(`{"selectedCommit":"${SHA_A}"}`);
  });

  test("extracts from unfenced code block", () => {
    const input = ["```", `{"selectedCommit":"${SHA_A}"}`, "```"].join("\n");
    expect(extractJsonObject(input)).toBe(`{"selectedCommit":"${SHA_A}"}`);
  });

  test("returns undefined for no JSON object", () => {
    expect(extractJsonObject("No JSON here.")).toBeUndefined();
    expect(extractJsonObject("")).toBeUndefined();
  });

  test("handles leading prose before first brace", () => {
    const input = `Here is my response:\n{"selectedCommit":"${SHA_A}"}`;
    expect(extractJsonObject(input)).toBe(`{"selectedCommit":"${SHA_A}"}`);
  });
});

// ---------------------------------------------------------------------------
// parseJudgeOutput
// ---------------------------------------------------------------------------

describe("parseJudgeOutput", () => {
  test("parses valid JSON output", () => {
    const obj = { selectedCommit: SHA_A, rationale: "good" };
    expect(parseJudgeOutput(JSON.stringify(obj))).toEqual(obj);
  });

  test("returns empty object for invalid JSON", () => {
    expect(parseJudgeOutput("not json")).toEqual({});
  });

  test("returns empty object for empty string", () => {
    expect(parseJudgeOutput("")).toEqual({});
  });

  test("returns empty object when JSON is not an object", () => {
    expect(parseJudgeOutput("[1,2,3]")).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// parseSelectedCommit
// ---------------------------------------------------------------------------

describe("parseSelectedCommit", () => {
  test("reads selectedCommit SHA from JSON", () => {
    expect(parseSelectedCommit(JSON.stringify({ selectedCommit: SHA_A }))).toBe(SHA_A);
  });

  test("reads current from JSON", () => {
    expect(parseSelectedCommit(JSON.stringify({ selectedCommit: "current" }))).toBe("current");
  });

  test("returns undefined for missing commit", () => {
    expect(parseSelectedCommit("{}")).toBeUndefined();
  });

  test("extracts SHA from 'Selected candidate:' prose", () => {
    expect(parseSelectedCommit(`Selected candidate: ${SHA_A}`)).toBe(SHA_A);
  });

  test("extracts SHA from backtick-quoted prose", () => {
    expect(parseSelectedCommit(`Selected candidate: \`${SHA_A}\``)).toBe(SHA_A);
  });

  test("extracts SHA from recommendation+accept prose", () => {
    expect(parseSelectedCommit(`Recommendation: accept commit ${SHA_A}`)).toBe(SHA_A);
  });

  test("ignores malformed SHA (too short)", () => {
    const short = "abc123";
    expect(parseSelectedCommit(JSON.stringify({ selectedCommit: short }))).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// normalizeJudgeScore / normalizeJudgeScores
// ---------------------------------------------------------------------------

describe("normalizeJudgeScore", () => {
  test("clamps above 100 to 100", () => expect(normalizeJudgeScore(150)).toBe(100));
  test("clamps below 0 to 0", () => expect(normalizeJudgeScore(-10)).toBe(0));
  test("rounds fractional scores", () => expect(normalizeJudgeScore(82.7)).toBe(83));
  test("parses numeric string", () => expect(normalizeJudgeScore("75")).toBe(75));
  test("returns 0 for NaN", () => expect(normalizeJudgeScore("bad")).toBe(0));
  test("returns 0 for null", () => expect(normalizeJudgeScore(null)).toBe(0));
});

describe("normalizeJudgeScores", () => {
  test("returns undefined for null", () => {
    expect(normalizeJudgeScores(null)).toBeUndefined();
  });

  test("returns undefined when no numeric key present", () => {
    expect(normalizeJudgeScores({ readability: "bad", technicalAccuracy: "bad" })).toBeUndefined();
  });

  test("normalizes a full scores object", () => {
    const result = normalizeJudgeScores({
      readability: 90,
      technicalAccuracy: 85,
      coherence: 80,
      relevance: 75,
      translationQuality: 88,
      mdxPreservation: 95,
      culturalAdaptation: 82,
      languagePurity: 93,
    });
    expect(result).toEqual({
      readability: 90,
      technicalAccuracy: 85,
      coherence: 80,
      relevance: 75,
      translationQuality: 88,
      mdxPreservation: 95,
      culturalAdaptation: 82,
      languagePurity: 93,
    });
  });

  test("rescales judge outputs that use a 0-10 rubric", () => {
    const result = normalizeJudgeScores({
      readability: 10,
      technicalAccuracy: 10,
      coherence: 10,
      relevance: 10,
      translationQuality: 9,
      mdxPreservation: 10,
      culturalAdaptation: 9,
      languagePurity: 9,
    });
    expect(result).toEqual({
      readability: 100,
      technicalAccuracy: 100,
      coherence: 100,
      relevance: 100,
      translationQuality: 90,
      mdxPreservation: 100,
      culturalAdaptation: 90,
      languagePurity: 90,
    });
  });

  test("fills missing keys with 0 when at least one is present", () => {
    const result = normalizeJudgeScores({ readability: 80 });
    expect(result?.readability).toBe(80);
    expect(result?.technicalAccuracy).toBe(0);
  });
});

describe("averageJudgeScore", () => {
  test("averages six equal scores", () => {
    const scores = {
      readability: 80,
      technicalAccuracy: 80,
      coherence: 80,
      relevance: 80,
      translationQuality: 80,
      mdxPreservation: 80,
      culturalAdaptation: 80,
      languagePurity: 80,
    };
    expect(averageJudgeScore(scores)).toBe(80);
  });

  test("averages mixed scores", () => {
    const scores = {
      readability: 100,
      technicalAccuracy: 0,
      coherence: 50,
      relevance: 50,
      translationQuality: 50,
      mdxPreservation: 50,
      culturalAdaptation: 50,
      languagePurity: 50,
    };
    expect(averageJudgeScore(scores)).toBeCloseTo(50, 5);
  });
});

// ---------------------------------------------------------------------------
// translation integrity checks
// ---------------------------------------------------------------------------

describe("analyzeTranslationIntegrity", () => {
  const source = [
    "---",
    "title: Test",
    "---",
    "",
    "## Heading",
    "",
    "> quoted",
    "",
    "![Diagram](./diagram.webp)",
    "",
    "```js",
    "console.log('ok')",
    "```",
    "",
    "<section>",
    "Body",
    "</section>",
    "",
    "<Challenge",
    "  index={0}",
    "  options={[",
    "    { text: 'date.toLocaleFormat(\\'en-US\\')', isAnswer: true },",
    "    { text: 'date.toLocaleString(\\'en-GB\\')' },",
    "  ]}",
    ">",
    "</Challenge>",
  ].join("\n");

  test("flags raw HTML comments outside code fences", () => {
    const target = source.replace("Body", "<!-- hidden -->\nBody");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/zh/index.mdx",
      locale: "zh",
    });
    expect(issues.some((issue) => issue.code === "html-comment-outside-code")).toBe(true);
  });

  test("flags unclosed HTML markup", () => {
    const target = source.replace("</section>", "");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/es/index.mdx",
      locale: "es",
    });
    expect(issues.some((issue) => issue.code === "html-unclosed-tag")).toBe(true);
  });

  test("flags invalid inherited asset paths in locale files", () => {
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: source,
      targetPath: "/repo/src/content/posts/test/fr/index.mdx",
      locale: "fr",
    });
    expect(issues.some((issue) => issue.code === "invalid-localized-asset-path")).toBe(true);
  });

  test("flags bare inherited asset paths with Markdown image titles", () => {
    const target = source.replace(
      "![Diagram](./diagram.webp)",
      '![Diagram](diagram.webp "Translated diagram")',
    );
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/es/index.mdx",
      locale: "es",
    });
    expect(issues.some((issue) => issue.code === "invalid-localized-asset-path")).toBe(true);
  });

  test("flags external reference assets rewritten as local paths", () => {
    const sourceWithReference = `${source}\n\n[diagram_ref]: https://cdn.example.com/diagram.gif`;
    const target = `${source.replace("./diagram.webp", "diagram_ref")}\n\n[diagram_ref]: ../diagram/diagram.gif`;
    const issues = analyzeTranslationIntegrity({
      sourceContents: sourceWithReference,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/fr/index.mdx",
      locale: "fr",
    });
    expect(issues.some((issue) => issue.code === "external-asset-rewritten-local")).toBe(true);
  });

  test("flags malformed locale-relative Gist paths", () => {
    const target = `${source}\n\n<Gist path='../justsml/13915347d6c8413c73f4bd7240c68e51' />`;
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/de/index.mdx",
      locale: "de",
    });
    expect(issues.some((issue) => issue.code === "invalid-gist-path")).toBe(true);
  });

  test("flags locale component imports with the wrong relative depth", () => {
    const target = [
      "import CodeTabs from '../../../../../components/CodeTabs.astro'",
      "",
      source,
    ].join("\n");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/hi/index.mdx",
      locale: "hi",
    });
    expect(issues.some((issue) => issue.code === "invalid-localized-component-import")).toBe(true);
  });

  test("flags suspicious code fence languages created by glued prose", () => {
    const target = source.replace("```js", "```sqlWITH");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/it/index.mdx",
      locale: "it",
    });
    expect(issues.some((issue) => issue.code === "suspicious-code-fence-language")).toBe(true);
  });

  test("flags structural count drift", () => {
    const target = source.replace("> quoted", "");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/de/index.mdx",
      locale: "de",
    });
    expect(issues.some((issue) => issue.code === "blockquote-count")).toBe(true);
  });

  test("counts headings by level against the English source", () => {
    const target = source.replace("## Heading", "### Heading");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/es/index.mdx",
      locale: "es",
    });

    expect(countHeadingsByLevel(source)).toEqual([0, 1, 0, 0, 0, 0]);
    expect(countHeadingsByLevel(target)).toEqual([0, 0, 1, 0, 0, 0]);
    expect(issues.some((issue) => issue.code === "heading-h2-count")).toBe(true);
    expect(issues.some((issue) => issue.code === "heading-h3-count")).toBe(true);
  });

  test("does not count headings inside frontmatter or code fences", () => {
    const sourceWithNonBodyHashes = [
      "---",
      "title: '# Not a body heading'",
      "---",
      "",
      "## Real heading",
      "",
      "```md",
      "# Example fence heading",
      "```",
    ].join("\n");

    expect(countHeadingsByLevel(sourceWithNonBodyHashes)).toEqual([0, 1, 0, 0, 0, 0]);
  });

  test("flags changed code-like quiz options and answer counts", () => {
    const target = source
      .replace("date.toLocaleFormat(\\'en-US\\')", "date.toLocaleFormat(\\'")
      .replace("isAnswer: true", "isAnswer: false");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/ja/index.mdx",
      locale: "ja",
    });
    expect(issues.some((issue) => issue.code === "quiz-answer-count")).toBe(true);
    expect(issues.some((issue) => issue.code === "quiz-code-option-preservation")).toBe(true);
  });

  test("flags quiz challenges with options but no correct answer", () => {
    const target = source.replace("isAnswer: true", "hint: 'not the answer'");
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/ru/index.mdx",
      locale: "ru",
    });
    expect(issues.some((issue) => issue.code === "quiz-missing-answer")).toBe(true);
  });

  test("flags quiz prop, option field, hint, and answer-position drift", () => {
    const sourceQuiz = [
      "---",
      "title: Quiz",
      "---",
      "",
      "<Challenge",
      "  client:visible={{rootMargin: \"150px\"}}",
      "  index={0}",
      "  group=\"Warmup\"",
      "  title=\"Question\"",
      "  difficulty={QuizDifficulty.BEGINNER}",
      "  objectives={[",
      "    \"Read output\",",
      "  ]}",
      "  options={[",
      "    { text: 'A', isAnswer: true, hint: 'Correct path' },",
      "    { text: 'B' },",
      "  ]}",
      ">",
      "  <slot name=\"question\">Question?</slot>",
      "  <slot name=\"hints\">Think about it.</slot>",
      "  <slot name=\"explanation\">Because A.</slot>",
      "</Challenge>",
    ].join("\n");
    const targetQuiz = sourceQuiz
      .replace("difficulty={QuizDifficulty.BEGINNER}\n", "")
      .replace("    { text: 'A', isAnswer: true, hint: 'Correct path' },", "    { text: 'A' },")
      .replace("    { text: 'B' },", "    { text: 'B', isAnswer: true, extra: 'surprise' },")
      .replace("  <slot name=\"hints\">Think about it.</slot>\n", "");

    const issues = analyzeTranslationIntegrity({
      sourceContents: sourceQuiz,
      targetContents: targetQuiz,
      targetPath: "/repo/src/content/posts/test/de/index.mdx",
      locale: "de",
    });
    expect(issues.some((issue) => issue.code === "quiz-missing-prop")).toBe(true);
    expect(issues.some((issue) => issue.code === "quiz-option-missing-hint")).toBe(true);
    expect(issues.some((issue) => issue.code === "quiz-option-unexpected-field")).toBe(true);
    expect(issues.some((issue) => issue.code === "quiz-answer-position")).toBe(true);
    expect(issues.some((issue) => issue.code === "quiz-missing-hints-slot")).toBe(true);
  });

  test("flags quiz slot code block drift and long code lines", () => {
    const sourceQuiz = [
      "---",
      "title: Quiz",
      "---",
      "",
      "<Challenge",
      "  index={0}",
      "  options={[",
      "    { text: 'ok', isAnswer: true },",
      "  ]}",
      ">",
      "  <slot name=\"question\">",
      "  <div className=\"question\">",
      "    ```js",
      "    console.log('ok')",
      "    ```",
      "  </div>",
      "  </slot>",
      "  <slot name=\"explanation\">Done.</slot>",
      "</Challenge>",
    ].join("\n");
    const targetQuiz = sourceQuiz.replace(
      "    console.log('ok')",
      "    console.log('this line is intentionally too long for mobile quiz screenshots')",
    );
    const issues = analyzeTranslationIntegrity({
      sourceContents: sourceQuiz,
      targetContents: targetQuiz,
      targetPath: "/repo/src/content/posts/test/es/index.mdx",
      locale: "es",
    });
    expect(issues.some((issue) => issue.code === "quiz-code-block-preservation")).toBe(true);
    expect(issues.some((issue) => issue.code === "quiz-code-line-length")).toBe(true);
  });

  test("flags LLM instruction leakage", () => {
    const target = `${source}\n\nHere is the translation you requested.`;
    const issues = analyzeTranslationIntegrity({
      sourceContents: source,
      targetContents: target,
      targetPath: "/repo/src/content/posts/test/it/index.mdx",
      locale: "it",
    });
    expect(issues.some((issue) => issue.code === "llm-instruction-leak")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// normalizePriority
// ---------------------------------------------------------------------------

describe("normalizePriority", () => {
  test("passes through high/medium/low", () => {
    expect(normalizePriority("high")).toBe("high");
    expect(normalizePriority("medium")).toBe("medium");
    expect(normalizePriority("low")).toBe("low");
  });

  test("maps critical → high", () => {
    expect(normalizePriority("critical")).toBe("high");
    expect(normalizePriority("CRITICAL")).toBe("high");
  });

  test("returns undefined for unknown strings", () => {
    expect(normalizePriority("urgent")).toBeUndefined();
    expect(normalizePriority("")).toBeUndefined();
    expect(normalizePriority(42)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// isBlockingSuggestion
// ---------------------------------------------------------------------------

describe("isBlockingSuggestion", () => {
  test("high is blocking", () => expect(isBlockingSuggestion({ priority: "high" })).toBe(true));
  test("medium is blocking", () => expect(isBlockingSuggestion({ priority: "medium" })).toBe(true));
  test("low is not blocking", () => expect(isBlockingSuggestion({ priority: "low" })).toBe(false));
});

// ---------------------------------------------------------------------------
// normalizeSuggestions
// ---------------------------------------------------------------------------

describe("normalizeSuggestions", () => {
  test("parses well-formed suggestion array", () => {
    const input: JudgeSuggestion[] = [
      { priority: "high", match: "old text", replacement: "new text", reason: "accuracy" },
    ];
    expect(normalizeSuggestions(input)).toEqual(input);
  });

  test("drops items with missing fields", () => {
    const input = [
      { priority: "high", match: "x", replacement: "y" }, // no reason
      { priority: "low", match: "a", replacement: "b", reason: "ok" },
    ];
    expect(normalizeSuggestions(input)).toHaveLength(1);
    expect(normalizeSuggestions(input)[0].priority).toBe("low");
  });

  test("normalizes critical → high priority", () => {
    const input = [{ priority: "critical", match: "x", replacement: "y", reason: "r" }];
    expect(normalizeSuggestions(input)[0].priority).toBe("high");
  });

  test("returns empty for non-array", () => {
    expect(normalizeSuggestions(null)).toEqual([]);
    expect(normalizeSuggestions("string")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// normalizeLegacySuggestedChanges
// ---------------------------------------------------------------------------

describe("normalizeLegacySuggestedChanges", () => {
  test("maps severity/current/suggested fields to priority/match/replacement", () => {
    const input = [{ severity: "high", current: "old", suggested: "new", reason: "fix" }];
    expect(normalizeLegacySuggestedChanges(input)).toEqual([
      { priority: "high", match: "old", replacement: "new", reason: "fix" },
    ]);
  });

  test("drops items with missing legacy fields", () => {
    const input = [{ severity: "high", current: "old", reason: "r" }]; // missing suggested
    expect(normalizeLegacySuggestedChanges(input)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// normalizeSelectedCandidate
// ---------------------------------------------------------------------------

describe("normalizeSelectedCandidate", () => {
  const candidates = [makeCandidate(SHA_A), makeCandidate(SHA_B)];

  test("selects matched candidate by id", () => {
    expect(normalizeSelectedCandidate(SHA_A, candidates).id).toBe(SHA_A);
  });

  test("falls back to hint when value doesn't match", () => {
    expect(normalizeSelectedCandidate("unknown", candidates, SHA_B).id).toBe(SHA_B);
  });

  test("falls back to last candidate when nothing matches", () => {
    expect(normalizeSelectedCandidate("unknown", candidates).id).toBe(SHA_B);
  });

  test("throws when candidates is empty", () => {
    expect(() => normalizeSelectedCandidate("x", [])).toThrow("No candidate commits available");
  });

  test("selects current candidate", () => {
    const withCurrent: CandidateRef[] = [
      { id: "current", label: "<current>", source: "current", model: "current/pre-existing" },
      ...candidates,
    ];
    expect(normalizeSelectedCandidate("current", withCurrent).id).toBe("current");
  });
});

// ---------------------------------------------------------------------------
// shouldEscalateSecondJudge
// ---------------------------------------------------------------------------

describe("shouldEscalateSecondJudge", () => {
  test("escalates when primary and second select different SHAs", () => {
    const primary = JSON.stringify({ selectedCommit: SHA_A });
    const second = JSON.stringify({ selectedCommit: SHA_B });
    expect(shouldEscalateSecondJudge({ primaryOutput: primary, secondOutput: second })).toBe(true);
  });

  test("does not escalate when both select same SHA", () => {
    const primary = JSON.stringify({ selectedCommit: SHA_A });
    const second = JSON.stringify({ selectedCommit: SHA_A });
    expect(shouldEscalateSecondJudge({ primaryOutput: primary, secondOutput: second })).toBe(false);
  });

  test("does not escalate on explicit no-escalation phrase", () => {
    const phrases = [
      "No escalation required",
      "No escalation needed",
      "Escalation is not required",
      "Escalation not needed",
      "No disagreement",
    ];
    for (const phrase of phrases) {
      expect(shouldEscalateSecondJudge({
        primaryOutput: "{}",
        secondOutput: `{"rationale": "${phrase}"}`,
      })).toBe(false);
    }
  });

  test("escalates on explicit disagree keyword", () => {
    expect(shouldEscalateSecondJudge({
      primaryOutput: "{}",
      secondOutput: "I disagree with the primary judge selection.",
    })).toBe(true);
  });

  test("does not escalate on explicit agree keyword", () => {
    expect(shouldEscalateSecondJudge({
      primaryOutput: "{}",
      secondOutput: "I agree with the primary judge.",
    })).toBe(false);
  });

  test("escalates on 'escalat' keyword in output", () => {
    expect(shouldEscalateSecondJudge({
      primaryOutput: "{}",
      secondOutput: "This requires escalation.",
    })).toBe(true);
  });

  test("escalates on multilingual disagree signals", () => {
    const signals = [
      "不一致 between the versions",
      "同意しない with this selection",
      "no estoy de acuerdo",
    ];
    for (const signal of signals) {
      expect(shouldEscalateSecondJudge({ primaryOutput: "{}", secondOutput: signal })).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// Prompt builders — structural assertions (no LLM calls)
// ---------------------------------------------------------------------------

const ctx = {
  slug: "stop-hardcoding-your-prompts",
  locale: "es" as const,
  targetRelPath: "src/content/posts/2025-01-01--stop-hardcoding-your-prompts/es/index.mdx",
};

const CANDIDATES: CandidateRef[] = [
  makeCandidate(SHA_A, "deepseek/deepseek-v3"),
  makeCandidate(SHA_B, "google/gemini-flash"),
];

const CANDIDATE_SUMMARY = CANDIDATES.map((c) => `- ${c.id} ${c.model}`).join("\n");

describe("buildPrimaryJudgePrompt", () => {
  const prompt = buildPrimaryJudgePrompt(CANDIDATE_SUMMARY, CANDIDATES, "final", ctx);

  test("includes locale and slug", () => {
    expect(prompt).toContain("es");
    expect(prompt).toContain("stop-hardcoding-your-prompts");
  });

  test("lists selectable candidate ids", () => {
    expect(prompt).toContain(SHA_A);
    expect(prompt).toContain(SHA_B);
  });

  test("includes heading-preservation rule", () => {
    expect(prompt).toContain("per-level heading count");
  });

  test("includes asset path rule", () => {
    expect(prompt).toContain("../");
  });

  test("includes deploy-breaker structural rules", () => {
    expect(prompt).toContain("Gist component paths");
    expect(prompt).toContain("../../../../components");
    expect(prompt).toContain("suspicious code fence languages");
  });

  test("includes quiz answer faithfulness rules", () => {
    expect(prompt).toContain("answer faithfulness");
    expect(prompt).toContain("isAnswer positions");
    expect(prompt).toContain("same correct answer");
  });

  test("includes JSON shape", () => {
    expect(prompt).toContain("selectedCommit");
    expect(prompt).toContain("suggestions");
  });

  test("includes Dan's direct style criterion when no hint is set", () => {
    expect(prompt).toContain("Dan's direct style");
  });

  test("uses hint commit when selectedCommit is provided", () => {
    const hinted = buildPrimaryJudgePrompt(CANDIDATE_SUMMARY, CANDIDATES, "final", {
      ...ctx,
      selectedCommit: SHA_C,
    });
    expect(hinted).toContain(`Use ${SHA_C}`);
    expect(hinted).not.toContain("Dan's direct style");
  });
});

describe("buildPrePublishRescorePrompt", () => {
  const prompt = buildPrePublishRescorePrompt(1, CANDIDATE_SUMMARY, ctx);

  test("identifies itself as a rescore prompt with pass number", () => {
    expect(prompt).toContain("re-scoring");
    expect(prompt).toContain("pass 1");
  });

  test("forbids shell commands", () => {
    expect(prompt).toContain("Do not run shell commands");
  });

  test("requests empty suggestions array when no fixes remain", () => {
    expect(prompt).toContain('"suggestions": []');
  });

  test("mentions target path", () => {
    expect(prompt).toContain(ctx.targetRelPath);
  });

  test("includes quiz rescore contract", () => {
    expect(prompt).toContain("marked answer remains semantically faithful");
    expect(prompt).toContain("option field schema");
  });
});

describe("buildSecondJudgePrompt", () => {
  const prompt = buildSecondJudgePrompt(CANDIDATE_SUMMARY, ctx);

  test("identifies itself as a second-pass reviewer", () => {
    expect(prompt).toContain("second-pass reviewer");
  });

  test("includes the no-escalation phrase instruction", () => {
    expect(prompt).toContain("No escalation required");
  });

  test("mentions heading count checks", () => {
    expect(prompt).toContain("heading count");
  });

  test("checks quiz semantic answer faithfulness", () => {
    expect(prompt).toContain("semantic answer faithfulness");
  });
});

describe("buildEscalationPrompt", () => {
  const prompt = buildEscalationPrompt(CANDIDATE_SUMMARY, ctx);

  test("asks to resolve judge disagreement", () => {
    expect(prompt).toContain("Resolve the judge disagreement");
  });

  test("includes heading-preservation rule", () => {
    expect(prompt).toContain("per-level heading counts");
  });

  test("mentions target path for output", () => {
    expect(prompt).toContain(ctx.targetRelPath);
  });
});
