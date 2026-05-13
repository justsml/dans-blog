# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug semantic-vector-search-landscape --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug semantic-vector-search-landscape --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-01--semantic-vector-search-landscape/ja/index.mdx changed comparable body length from 25549 chars in English to 16408 chars. Expected 16606-34492 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.82
- Input tokens: 31056
- Output tokens: 221
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.016191

## Candidates
- current src/content/posts/2026-05-01--semantic-vector-search-landscape/ja/index.mdx
- 4fd17cca9c8ca612008ab4c9b35dbff866425157 i18n candidate(ja): semantic-vector-search-landscape via openrouter/moonshotai/kimi-k2.6
- 409f05574b8e0ed839a8ac5aadde5eba2f7deb9e i18n candidate(ja): semantic-vector-search-landscape via openrouter/openai/gpt-oss-120b:nitro
