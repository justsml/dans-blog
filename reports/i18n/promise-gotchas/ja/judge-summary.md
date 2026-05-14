# Translation Judge Summary

- Slug: promise-gotchas
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug promise-gotchas --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug promise-gotchas --locale ja --skip-global
146 |   const targetLength = getComparablePostLength(targetContents);
147 |   const minimumTargetLength = 600;
148 |   const { minimumRatio, maximumRatio, label } = getLengthRatioBounds(targetPath);
149 | 
150 |   if (targetLength <= minimumTargetLength) {
151 |     throw new Error(
                    ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-09-26--promise-gotchas/ja/index.mdx is too short after translation. Comparable body length is 425 chars; expected more than 600.
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:151:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.61
- Input tokens: 3963
- Output tokens: 481
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003425
- Estimated cost: $0.003425

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.38
- Input tokens: 3708
- Output tokens: 264
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002646
- Estimated cost: $0.002646

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: \"Promise Gotchas\"" Replacement: "title: \"Promise の落とし穴\"" Reason: The title should be translated into Japanese as per the other candidates and general localization expectations. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "cover: michal-parzuchowski-224092-unsplash.webp" Replacement: "cover: ../michal-parzuchowski-224092-unsplash.webp" Reason: The relative path for images in the ja/ subdirectory needs to point one level up to match the actual file structure. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "cover_mobile: w300_michal-parzuchowski-224092-unsplash.webp" Replacement: "cover_mobile: ../w300_michal-parzuchowski-224092-unsplash.webp" Reason: The relative path for images in the ja/ subdirectory needs to point one level up. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied medium priority suggestion. Match: "cover_icon: icon_michal-parzuchowski-224092-unsplash.webp" Replacement: "cover_icon: ../icon_michal-parzuchowski-224092-unsplash.webp" Reason: The relative path for images in the ja/ subdirectory needs to point one level up. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-09-26--promise-gotchas/ja/index.mdx
- cabf121ac75d4b15cc2610c4d27a60b525b11eb0 i18n candidate(ja): promise-gotchas via openrouter/qwen/qwen3.6-plus
- ab8f0e0d53d3fb510b566a915d3ae2b365715f36 i18n candidate(ja): promise-gotchas via openrouter/openai/gpt-oss-120b:nitro
