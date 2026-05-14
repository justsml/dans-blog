# Translation Judge Summary

- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-js-interfaces-symbols-and-enumerables --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug quiz-js-interfaces-symbols-and-enumerables --locale ar --skip-global
153 | 
154 |   for (const slotName of ["hints", "explanation"] as const) {
155 |     const sourceSlots = countSlot(sourceContents, slotName);
156 |     const targetSlots = countSlot(targetContents, slotName);
157 |     if (sourceSlots !== targetSlots) {
158 |       throw new Error(
                      ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/ar/index.mdx changed hints slot count from 7 to 0
      at assertQuizStructure (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:158:17)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:30:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.88
- Input tokens: 8397
- Output tokens: 195
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004784
- Estimated cost: $0.004784

## Candidates
- current not present
- 0c260f5c0cc8135636faa1f2b931c8546be878a6 i18n candidate(ar): quiz-js-interfaces-symbols-and-enumerables via openrouter/deepseek/deepseek-v4-flash
- 173866f49ed693b03a82c6d0c21bc39e12a1c3fc i18n candidate(ar): quiz-js-interfaces-symbols-and-enumerables via openrouter/openai/gpt-oss-120b:nitro
