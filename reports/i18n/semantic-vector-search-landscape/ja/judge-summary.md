# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: ja
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.887)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug semantic-vector-search-landscape --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug semantic-vector-search-landscape --locale ja --skip-global
257 | export function assertStructuralParity(input: CompareMdxStructureInput) {
258 |   const comparison = compareMdxStructure(input);
259 |   if (comparison.valid) return;
260 | 
261 |   const targetLabel = input.targetPath ?? "translation";
262 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-01--semantic-vector-search-landscape/ja/index.mdx failed structural parity with score 0.997 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-01--semantic-vector-search-landscape/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:262:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.28
- Input tokens: 24592
- Output tokens: 319
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.019640
- Estimated cost: $0.019640

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.29
- Input tokens: 23416
- Output tokens: 179
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.018233
- Estimated cost: $0.018233

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[この比較表の読み方](#比較表の読み方)" Replacement: "[この比較表の読み方](#比較の読み方)" Reason: The anchor link target must match the slug of the translated H3 heading '### 比較の読み方' (#比較の読み方), not '#比較表の読み方'. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-01--semantic-vector-search-landscape/ja/index.mdx
- dca7d44842f9016d7128a9edc2a6089c043afdc7 i18n candidate(ja): semantic-vector-search-landscape via openrouter/deepseek/deepseek-v4.1-flash
- 12dee3198a6f6b114fbab9ea4bbef23207dc90d5 i18n candidate(ja): semantic-vector-search-landscape via openrouter/openai/gpt-5.6-luna
