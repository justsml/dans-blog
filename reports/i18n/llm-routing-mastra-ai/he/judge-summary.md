# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.331)
- Confidence signals: 2 high and 0 medium issues; single judge
- High/medium/low issue counts: 2/0/0
- Validation error: Command failed: bun run i18n:validate --slug llm-routing-mastra-ai --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-routing-mastra-ai --locale he --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-02--llm-routing-mastra-ai/he/index.mdx failed structural parity with score 0.969 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-02--llm-routing-mastra-ai/he/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.18
- Input tokens: 8303
- Output tokens: 400
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005352
- Estimated cost: $0.005352

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.43
- Input tokens: 7627
- Output tokens: 353
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004873
- Estimated cost: $0.004873

### Pass 2
- Runtime seconds: 3.30
- Input tokens: 7586
- Output tokens: 407
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005014
- Estimated cost: $0.005014

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: אל תתחתן עם המודל שלך" Replacement: "title: \"אל תתחתן עם המודל שלך\"" Reason: The English source uses quotes for the title in frontmatter; preserving them is safer for YAML parsing and matches the source style. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "להטוטף" Replacement: "ללהטט" Reason: Typo in the Hebrew word for 'to juggle'. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "title: אל תתחתן עם המודל שלך" Replacement: "title: \"אל תתחתן עם המודל שלך\"" Reason: The English source uses quotes for the title in frontmatter; preserving them is safer for YAML parsing and matches the source style. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/he/index.mdx
- bc434b698a4dbb118423d645fa4fe37e58521440 i18n candidate(he): llm-routing-mastra-ai via openrouter/qwen/qwen3.6-plus
- 9247e7cd890c0993ed01f1503cd5dbfde4b5335f i18n candidate(he): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
