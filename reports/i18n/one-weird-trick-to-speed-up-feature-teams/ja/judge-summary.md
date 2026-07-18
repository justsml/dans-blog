# Translation Judge Summary

- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.861)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug one-weird-trick-to-speed-up-feature-teams --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug one-weird-trick-to-speed-up-feature-teams --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/ja/index.mdx failed structural parity with score 0.989 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":5}. Differences: {"linkTargets":5}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.21
- Input tokens: 8744
- Output tokens: 521
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005935
- Estimated cost: $0.005935

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.37
- Input tokens: 8828
- Output tokens: 238
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005128
- Estimated cost: $0.005128

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: スタッフエンジニアはこれを嫌っています！" Reason: The subtitle was left empty in the frontmatter, but it is reader-facing content that should be translated. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "_最もシンプルな_データ永続化を試してみてください。新しいシステムや機能を設計する際には。" Replacement: "新しいシステムや機能を設計する際には、_最もシンプルな_データ永続化を試してみてください。" Reason: The Japanese sentence structure is inverted in a way that feels slightly unnatural for a technical tip; reordering improves flow. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 306ee59ac29c7d6c642b470e94fcb37a881f3859 i18n candidate(ja): one-weird-trick-to-speed-up-feature-teams via openrouter/openai/gpt-oss-120b:nitro
- 967145d557ee99511fbcf358ed57fd225f337c77 i18n candidate(ja): one-weird-trick-to-speed-up-feature-teams via openrouter/deepseek/deepseek-v4-flash
