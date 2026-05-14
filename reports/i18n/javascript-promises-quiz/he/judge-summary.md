# Translation Judge Summary

- Slug: javascript-promises-quiz
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug javascript-promises-quiz --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug javascript-promises-quiz --locale he --skip-global
191 |     ]
192 |     : [];
193 | 
194 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
195 | 
196 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2019-11-26--javascript-promises-quiz/he/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:196:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:31:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.81
- Input tokens: 11317
- Output tokens: 246
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006397
- Estimated cost: $0.006397

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.07
- Input tokens: 11006
- Output tokens: 242
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006229
- Estimated cost: $0.006229

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "This trick works only when there is a subsequent `.then` to receive the value." Replacement: "הטריק הזה עובד רק כאשר יש `.then` עוקב שיקבל את הערך." Reason: The candidate left one sentence in English in the explanation for Challenge index 4. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- cde65ba57e45dba6a927365dd8c71b9b1fcbdc19 i18n candidate(he): javascript-promises-quiz via openrouter/deepseek/deepseek-v4-flash
- 8583066d91a2eca2bb8ce32f60f251c7ba63785d i18n candidate(he): javascript-promises-quiz via openrouter/openai/gpt-oss-120b:nitro
