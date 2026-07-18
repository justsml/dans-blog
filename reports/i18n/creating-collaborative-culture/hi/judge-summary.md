# Translation Judge Summary

- Slug: creating-collaborative-culture
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug creating-collaborative-culture --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug creating-collaborative-culture --locale hi --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2021-03-03--creating-collaborative-culture/hi/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2021-03-03--creating-collaborative-culture/hi/index.mdx:28 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.19
- Input tokens: 5177
- Output tokens: 200
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003188
- Estimated cost: $0.003188

### Round 1, Batch 2
- Runtime seconds: 2.05
- Input tokens: 3343
- Output tokens: 206
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002289
- Estimated cost: $0.002289

## Primary Judge Telemetry
- Runtime seconds: 2.63
- Input tokens: 4248
- Output tokens: 277
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002955
- Estimated cost: $0.002955

## Candidates
- current not present
- b8449ca7eee9a7e6185eef40efbea07d8b54d4fd i18n candidate(hi): creating-collaborative-culture via openrouter/openai/gpt-oss-120b:nitro
- 206a7f8835c08c4e62dc77ee012a8ba409983686 i18n candidate(hi): creating-collaborative-culture via openrouter/qwen/qwen3-32b:nitro
- f49134af2bcf6d524d0c608d65b4768c80fa2c71 i18n candidate(hi): creating-collaborative-culture via deepseek/deepseek-v4-flash
- 3f6de99db90bbe557c751d06defbb10d9c938432 i18n candidate(hi): creating-collaborative-culture via qwen/qwen3.6-35b-a3b
