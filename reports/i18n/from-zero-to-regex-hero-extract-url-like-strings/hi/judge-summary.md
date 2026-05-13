# Translation Judge Summary

- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug from-zero-to-regex-hero-extract-url-like-strings --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug from-zero-to-regex-hero-extract-url-like-strings --locale hi --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/hi/index.mdx changed heading counts. H3: English has 8, translation has 7
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.57
- Input tokens: 18394
- Output tokens: 265
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009992

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.63
- Input tokens: 11122
- Output tokens: 195
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006146

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "## 🛠️ Parsing Example" Replacement: "## 🛠️ पार्सिंग उदाहरण" Reason: The heading was left in English while other headings were translated. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Terms जैसे`extract` और `parse`" Replacement: "`extract` और `parse` जैसे शब्द" Reason: Mixing English 'Terms' with Hindi 'जैसे' is slightly awkward; using the Hindi word for terms is more natural. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/hi/index.mdx
- d1c2ee1c83cac46811af2c144b553700ba51c85a i18n candidate(hi): from-zero-to-regex-hero-extract-url-like-strings via openrouter/openai/gpt-oss-120b:nitro
- fff3825230ce1d830de5662aa6aac5206852b288 i18n candidate(hi): from-zero-to-regex-hero-extract-url-like-strings via openrouter/qwen/qwen3-32b:nitro
- 5599b1be0fe29d16bc2b3afda915b53d31e56344 i18n candidate(hi): from-zero-to-regex-hero-extract-url-like-strings via deepseek/deepseek-v4-flash
