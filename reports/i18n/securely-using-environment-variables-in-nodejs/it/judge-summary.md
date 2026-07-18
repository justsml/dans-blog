# Translation Judge Summary

- Slug: securely-using-environment-variables-in-nodejs
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.886)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug securely-using-environment-variables-in-nodejs --locale it --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug securely-using-environment-variables-in-nodejs --locale it --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/it/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/it/index.mdx:55 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/it/index.mdx:71 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.55
- Input tokens: 7649
- Output tokens: 209
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004451
- Estimated cost: $0.004451

### Round 1, Batch 2
- Runtime seconds: 2.68
- Input tokens: 4609
- Output tokens: 241
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003027
- Estimated cost: $0.003027

## Primary Judge Telemetry
- Runtime seconds: 3.04
- Input tokens: 6132
- Output tokens: 279
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003903
- Estimated cost: $0.003903

## Candidates
- current not present
- ade14d53d4819f52d6c39924bbc43e8b6dfcb866 i18n candidate(it): securely-using-environment-variables-in-nodejs via qwen/qwen3.6-35b-a3b
- 80334eecc35f087d9622ada51a46e366ada9eab9 i18n candidate(it): securely-using-environment-variables-in-nodejs via openrouter/openai/gpt-oss-120b:nitro
- afd3aba18250ce2224b796ad608cee5182c0974a i18n candidate(it): securely-using-environment-variables-in-nodejs via deepseek/deepseek-v4-flash
- 112682cdaf7a38ef5982d575e8369daba90b2ee8 i18n candidate(it): securely-using-environment-variables-in-nodejs via openrouter/qwen/qwen3-32b:nitro
