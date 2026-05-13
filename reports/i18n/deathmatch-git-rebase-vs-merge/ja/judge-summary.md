# Translation Judge Summary

- Slug: deathmatch-git-rebase-vs-merge
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug deathmatch-git-rebase-vs-merge --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug deathmatch-git-rebase-vs-merge --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/ja/index.mdx changed comparable body length from 6705 chars in English to 4049 chars. Expected 4358-9052 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.69
- Input tokens: 9654
- Output tokens: 295
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005712

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.43
- Input tokens: 7585
- Output tokens: 277
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004624

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: デスマッチ：Git リベース vs マージ" Replacement: "title: 'デスマッチ: Git リベース vs. マージ'" Reason: The title was missing in the current version and the candidate's title format should ideally match the original's quoted style for consistency in frontmatter. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/ja/index.mdx
- ae806cc48703d6ec8e4e6e414227e807b9d60485 i18n candidate(ja): deathmatch-git-rebase-vs-merge via openrouter/openai/gpt-oss-120b:nitro
- 5396157be2945d2146a1d3b67a54d030f14d17de i18n candidate(ja): deathmatch-git-rebase-vs-merge via openrouter/qwen/qwen3-32b:nitro
