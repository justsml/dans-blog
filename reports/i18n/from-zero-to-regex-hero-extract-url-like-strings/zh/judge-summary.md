# Translation Judge Summary

- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: zh
- Judge model: openrouter/deepseek/deepseek-v4-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug from-zero-to-regex-hero-extract-url-like-strings --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug from-zero-to-regex-hero-extract-url-like-strings --locale zh --skip-global
81 |   }
82 | 
83 |   const sourceFences = sourceContents.match(/```/g)?.length ?? 0;
84 |   const targetFences = targetContents.match(/```/g)?.length ?? 0;
85 |   if (sourceFences !== targetFences) {
86 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/zh/index.mdx changed fenced code block count from 8 to 10
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:86:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 27.78
- Input tokens: 9944
- Output tokens: 5701
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004269
- Estimated cost: $0.004269

## Candidates
- current not present
- bf510fbcfdb50dee8add65e953f56b355255fd72 i18n candidate(zh): from-zero-to-regex-hero-extract-url-like-strings via openrouter/deepseek/deepseek-v4-flash
- b85e7bc502cac51c75579d547262b7c2d3ec6e97 i18n candidate(zh): from-zero-to-regex-hero-extract-url-like-strings via openrouter/openai/gpt-oss-120b:nitro
