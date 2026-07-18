# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.885)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug security-agent-model-router --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug security-agent-model-router --locale de --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/de/index.mdx failed structural parity with score 0.991 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/de/index.mdx: Table count or row/column shape changed; errant line breaks may have broken a Markdown table. Differences: {"tableColumns":1,"tableShapes":1}. Differences: {"tableColumns":1,"tableShapes":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.17
- Input tokens: 27408
- Output tokens: 262
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.014490
- Estimated cost: $0.014490

## Candidates
- current not present
- ea524ebbc1b1c54fd7d001ddfef3f6002e722e58 i18n candidate(de): security-agent-model-router via openrouter/deepseek/deepseek-v4-flash
- e357a8e36e5db4c31e6bbb357844728f896dbb75 i18n candidate(de): security-agent-model-router via openrouter/openai/gpt-oss-120b:nitro
