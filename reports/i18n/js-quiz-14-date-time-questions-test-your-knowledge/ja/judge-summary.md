# Translation Judge Summary

- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: ja
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
- Validation error: Command failed: bun run i18n:validate --slug js-quiz-14-date-time-questions-test-your-knowledge --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "js-quiz-14-date-time-questions-test-your-knowledge" --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx failed structural parity with score 0.983 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":-2,"linkTargets":2}. Differences: {"links":-2,"linkTargets":2}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.47
- Input tokens: 17977
- Output tokens: 175
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009513
- Estimated cost: $0.009513

## Candidates
- current src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx
- a92e3ccbbd78286bf93bc6f75925ad2df9c00c83 i18n candidate(ja): js-quiz-14-date-time-questions-test-your-knowledge via openrouter/openai/gpt-oss-120b:nitro
