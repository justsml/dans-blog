# Translation Judge Summary

- Slug: breaking-unicorns
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale de --skip-global
12 |   const minimumTargetLength = 600;
13 |   const minimumRatio = 0.65;
14 |   const maximumRatio = 1.35;
15 | 
16 |   if (targetLength <= minimumTargetLength) {
17 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/de/index.mdx is too short after translation. Comparable body length is 0 chars; expected more than 600.
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:17:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.89
- Input tokens: 8756
- Output tokens: 499
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005875

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2024-09-01--breaking-unicorns/de/index.mdx
- 1eb6b4de53b09d972526b6748450761489bd7fae i18n candidate(de): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
- 67148c78de7ed95df7b6c0daff5db46febf2a529 i18n candidate(de): breaking-unicorns via openrouter/qwen/qwen3-32b:nitro
- a59be6644861f75769295fa28290899d71c59d0b i18n candidate(de): breaking-unicorns via deepseek/deepseek-v4-flash
