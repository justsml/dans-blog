# Translation Judge Summary

- Slug: beware-the-single-purpose-people
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.876)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug beware-the-single-purpose-people --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug beware-the-single-purpose-people --locale ja --skip-global
210 |     ]
211 |     : [];
212 | 
213 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
214 | 
215 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-04-03--beware-the-single-purpose-people/ja/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:215:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.15
- Input tokens: 11596
- Output tokens: 299
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006695
- Estimated cost: $0.006695

## Candidates
- current src/content/posts/2025-04-03--beware-the-single-purpose-people/ja/index.mdx
- 74720cb1af70e71860bf70055ed076d322bd7e44 i18n candidate(ja): beware-the-single-purpose-people via openrouter/qwen/qwen3.6-plus
- a70476e5a9137c5d82769dc9d5bb4db2c22992c8 i18n candidate(ja): beware-the-single-purpose-people via openrouter/openai/gpt-oss-120b:nitro
