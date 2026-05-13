# Translation Judge Summary

- Slug: breaking-unicorns
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale es --skip-global
73 |   const sourceComponents = new Set(
74 |     [...sourceContents.matchAll(/<\/?([A-Z][A-Za-z0-9_.]*)\b/g)].map((match) => match[1]),
75 |   );
76 |   for (const component of sourceComponents) {
77 |     if (!new RegExp(`</?${escapeRegExp(component)}\\b`).test(targetContents)) {
78 |       throw new Error(`Missing preserved MDX component in ${targetPath}: ${component}`);
                     ^
error: Missing preserved MDX component in /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/es/index.mdx: Insert
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:78:17)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.39
- Input tokens: 26230
- Output tokens: 197
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.013706

## Candidates
- current src/content/posts/2024-09-01--breaking-unicorns/es/index.mdx
- 9f56865156b2b8a948d8408e985455f8a6882169 i18n candidate(es): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
- f159edbbec631f485d9b373388f6ea7e496bb923 i18n candidate(es): breaking-unicorns via openrouter/qwen/qwen3-32b:nitro
- b03eb802a044b49fa43f59598b7ccd5b3f860343 i18n candidate(es): breaking-unicorns via deepseek/deepseek-v4-flash
