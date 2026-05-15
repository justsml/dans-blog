# Translation Judge Summary

- Slug: llm-evals-are-broken
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug llm-evals-are-broken --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-evals-are-broken --locale ar --skip-global
78 | 
79 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
80 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
81 |   if (issues.length === 0) return;
82 | 
83 |   throw new Error(
                 ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-06--llm-evals-are-broken/ar/index.mdx failed translation integrity checks:
- [high] html-unclosed-tag: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-06--llm-evals-are-broken/ar/index.mdx:140 opens <number> without a closing tag.
- [high] html-unclosed-tag: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-06--llm-evals-are-broken/ar/index.mdx:140 opens <one> without a closing tag.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:83:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.34
- Input tokens: 12357
- Output tokens: 197
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006770
- Estimated cost: $0.006770

## Candidates
- current src/content/posts/2026-05-06--llm-evals-are-broken/ar/index.mdx
- 58c8500ea0173857e900b689289220ab0c7f0ed5 i18n candidate(ar): llm-evals-are-broken via openrouter/openai/gpt-oss-120b:nitro
