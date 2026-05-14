# Translation Judge Summary

- Slug: quiz-master-modern-html5
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-master-modern-html5 --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-master-modern-html5" --locale he --skip-global
191 |     ]
192 |     : [];
193 | 
194 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
195 | 
196 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-01--quiz-master-modern-html5/he/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:196:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:31:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.64
- Input tokens: 16693
- Output tokens: 174
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008868
- Estimated cost: $0.008868

## Candidates
- current not present
- 2d7e18677b9ec0d881dd560081ceb40062916dd0 i18n candidate(he): quiz-master-modern-html5 via openrouter/deepseek/deepseek-v4-flash
- 1a430cb8d5ca428b28bfb9ac5192bc4db45cc58e i18n candidate(he): quiz-master-modern-html5 via openrouter/openai/gpt-oss-120b:nitro
