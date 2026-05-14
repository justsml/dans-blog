# Translation Judge Summary

- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug from-zero-to-regex-hero-extract-url-like-strings --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug from-zero-to-regex-hero-extract-url-like-strings --locale ar --skip-global
82 |   }
83 | 
84 |   const sourceFences = sourceContents.match(/```/g)?.length ?? 0;
85 |   const targetFences = targetContents.match(/```/g)?.length ?? 0;
86 |   if (sourceFences !== targetFences) {
87 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/ar/index.mdx changed fenced code block count from 8 to 10
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:87:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.66
- Input tokens: 11497
- Output tokens: 327
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006730
- Estimated cost: $0.006730

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 17b5d04e395f53d769821ee4768de82e03cbd803 i18n candidate(ar): from-zero-to-regex-hero-extract-url-like-strings via openrouter/deepseek/deepseek-v4-flash
- 3a69376c8d3e0428487828df77c591136f2378fa i18n candidate(ar): from-zero-to-regex-hero-extract-url-like-strings via openrouter/openai/gpt-oss-120b:nitro
