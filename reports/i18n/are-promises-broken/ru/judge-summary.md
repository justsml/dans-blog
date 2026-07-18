# Translation Judge Summary

- Slug: are-promises-broken
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.883)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug are-promises-broken --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug are-promises-broken --locale ru --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-06--are-promises-broken/ru/index.mdx failed structural parity with score 0.984 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-06--are-promises-broken/ru/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":3}. Differences: {"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.47
- Input tokens: 12521
- Output tokens: 244
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006992
- Estimated cost: $0.006992

## Candidates
- current not present
- 410f051b9d9eb8664f060d80581de2df456bd7b5 i18n candidate(ru): are-promises-broken via openrouter/openai/gpt-oss-120b:nitro
- 6d5fad94c59bcdd5ae44825a9d6b54ed3a984c9f i18n candidate(ru): are-promises-broken via openrouter/qwen/qwen3-32b:nitro
- bd2c5956a6f2ef8a576153bdc3205a7023e4283c i18n candidate(ru): are-promises-broken via deepseek/deepseek-v4-flash
