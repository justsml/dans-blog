# Translation Judge Summary

- Slug: javascript-scope-magic
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.876)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug javascript-scope-magic --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug javascript-scope-magic --locale hi --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-06-06--javascript-scope-magic/hi/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2015-06-06--javascript-scope-magic/hi/index.mdx:100 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2015-06-06--javascript-scope-magic/hi/index.mdx:104 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.99
- Input tokens: 7999
- Output tokens: 258
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004773
- Estimated cost: $0.004773

## Candidates
- current src/content/posts/2015-06-06--javascript-scope-magic/hi/index.mdx
- 75148d707ec20a241b12b0af8b9b0ee8caacc1e8 i18n candidate(hi): javascript-scope-magic via openrouter/openai/gpt-oss-120b:nitro
- 2114fc9f6509814aa3eced7e60521c378a877289 i18n candidate(hi): javascript-scope-magic via openrouter/qwen/qwen3-32b:nitro
- d9788bde62e6e55c52cf8c6764795a66845ebd63 i18n candidate(hi): javascript-scope-magic via openrouter/qwen/qwen3.6-plus
