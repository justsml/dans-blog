# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.874)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-workflows-memory --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-workflows-memory --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/ja/index.mdx failed structural parity with score 0.978 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-05--mastra-workflows-memory/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.59
- Input tokens: 8299
- Output tokens: 468
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005554
- Estimated cost: $0.005554

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.27
- Input tokens: 11573
- Output tokens: 320
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006746
- Estimated cost: $0.006746

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: '不安定なエージェント開発はやめよう：ワークフローとメモリの活用'" Reason: The frontmatter title is empty in the candidate, which is a major omission for reader-facing content. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "social_image: ../desktop-social.webp" Replacement: "social_image: desktop-social.webp" Reason: The social_image path in the English source is a bare filename, not a relative path. While the instructions mention adding ../ for inherited local assets, social_image is often treated as a key/slug in some CMS setups, but more importantly, the English source didn't use a path prefix here. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/ja/index.mdx
- 39c9694f00976ed3c7c5b39543928e32a4507e3f i18n candidate(ja): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
