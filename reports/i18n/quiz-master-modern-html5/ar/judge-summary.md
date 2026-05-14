# Translation Judge Summary

- Slug: quiz-master-modern-html5
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-master-modern-html5 --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-master-modern-html5" --locale ar --skip-global
191 |     ]
192 |     : [];
193 | 
194 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
195 | 
196 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-01--quiz-master-modern-html5/ar/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:196:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:31:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.74
- Input tokens: 15821
- Output tokens: 211
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008544
- Estimated cost: $0.008544

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.85
- Input tokens: 15478
- Output tokens: 286
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008597
- Estimated cost: $0.008597

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "لاستخدام <div>\\'" Replacement: "لاستخدام <div> فقط" Reason: The candidate has a trailing backslash and missing word in the Arabic translation of 'To only use <div>\'s'. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "{text: 'لاستخدام <div>\\'s'," Replacement: "{text: 'لاستخدام <div> فقط'," Reason: The candidate contains a broken string with a trailing backslash and 's' from the English source, which is invalid in the Arabic context and looks like a technical leak. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- f39470436e2e42673dcf6bbd875e16b84b4e3cd5 i18n candidate(ar): quiz-master-modern-html5 via openrouter/deepseek/deepseek-v4-flash
- 4d9ef595e6ba0b4be2d7064bf33109654359e427 i18n candidate(ar): quiz-master-modern-html5 via openrouter/openai/gpt-oss-120b:nitro
