# Translation Judge Summary

- Slug: javascript-promises-quiz
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug javascript-promises-quiz --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug javascript-promises-quiz --locale zh --skip-global
191 |     ]
192 |     : [];
193 | 
194 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
195 | 
196 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2019-11-26--javascript-promises-quiz/zh/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:196:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:31:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.77
- Input tokens: 13600
- Output tokens: 182
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007346
- Estimated cost: $0.007346

## Candidates
- current not present
- cc8104d5014d73dd95046f15cbacaaf96529936c i18n candidate(zh): javascript-promises-quiz via openrouter/google/gemini-3-flash-preview
- 2b19ab21ddae13fdeace51f7a0cd70f743e54f7b i18n candidate(zh): javascript-promises-quiz via deepseek/deepseek-v4-flash
- 8f8c64d1ba4600242c9202cfbcab8cce1014af55 i18n candidate(zh): javascript-promises-quiz via openrouter/qwen/qwen3-32b:nitro
