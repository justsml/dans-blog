# Translation Judge Summary

- Slug: javascript-promises-quiz
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug javascript-promises-quiz --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug javascript-promises-quiz --locale ar --skip-global
191 |     ]
192 |     : [];
193 | 
194 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
195 | 
196 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2019-11-26--javascript-promises-quiz/ar/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:196:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:31:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.78
- Input tokens: 10834
- Output tokens: 236
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006125
- Estimated cost: $0.006125

## Judge Suggestions
1. Pass 1: logged medium priority suggestion. Match: "**تلميح:**" Replacement: "**تلميح:**" Reason: The candidate used 'تلميح' which is correct, but some instances in other candidates used 'Hint' (English). Deepseek was consistent in translating it, which is better. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- 09cedfcdc213937e97d4a216d1024d5bf8edca31 i18n candidate(ar): javascript-promises-quiz via openrouter/deepseek/deepseek-v4-flash
- ee56ef4258985441d224d79467660836ab012411 i18n candidate(ar): javascript-promises-quiz via openrouter/openai/gpt-oss-120b:nitro
