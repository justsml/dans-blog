# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: hi
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug dont-fear-the-model-router --locale hi --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/hi/index.mdx failed structural parity with score 0.990 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-07-03--dont-fear-the-model-router/hi/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.70
- Input tokens: 19801
- Output tokens: 359
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016197
- Estimated cost: $0.016197

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.44
- Input tokens: 19092
- Output tokens: 188
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015024
- Estimated cost: $0.015024

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[अपने मॉडल से शादी न करें](/llm-routing-mastra-ai) ने आसान तर्क दिया था:" Replacement: "[अपने मॉडल से शादी न करें](../llm-routing-mastra-ai) ने आसान तर्क दिया था:" Reason: Locale files are nested one folder deeper; local internal links should point relative to the locale path as in the other links. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/hi/index.mdx
- 66c45a420a31e9425d51e39fd705639d006e1cc9 i18n candidate(hi): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
- 24b7d9ced785567b78faf5c7cd4c1fbfe86f9d32 i18n candidate(hi): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
