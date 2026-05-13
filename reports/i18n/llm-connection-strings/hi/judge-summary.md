# Translation Judge Summary

- Slug: llm-connection-strings
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug llm-connection-strings --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-connection-strings --locale hi --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-30--llm-connection-strings/hi/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.56
- Input tokens: 9958
- Output tokens: 250
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005729

### Round 1, Batch 2
- Runtime seconds: 2.19
- Input tokens: 9688
- Output tokens: 168
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005348

### Round 1, Batch 3
- Runtime seconds: 2.47
- Input tokens: 6219
- Output tokens: 304
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004021

## Primary Judge Telemetry
- Runtime seconds: 2.26
- Input tokens: 7929
- Output tokens: 223
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004633

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.00
- Input tokens: 6352
- Output tokens: 392
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004352

### Pass 2
- Runtime seconds: 2.74
- Input tokens: 6448
- Output tokens: 391
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004397

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "केलगबी" Replacement: "लगभग" Reason: Typo in the word 'लगभग' (approximately). Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "मूल लाभ अस्वीकार्य हैं" Replacement: "मूल लाभ निर्विवाद हैं" Reason: The translation 'अस्वीकार्य' means 'unacceptable', which is the opposite of 'undeniable'. 'निर्विवाद' correctly conveys that the benefits cannot be denied. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "आपकी धन्यवाद देगी" Replacement: "आपका धन्यवाद करेगी" Reason: Grammatical error: 'फ़ाइल' is feminine but the phrasing for 'thank you' should be 'आपका धन्यवाद करेगी' or 'आपको धन्यवाद देगी'. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-30--llm-connection-strings/hi/index.mdx
- 30b0bf3c0b05c35cf28669009416bd5470a9da0f i18n candidate(hi): llm-connection-strings via openrouter/qwen/qwen3.6-plus
- 9de27a1674d14176600c27844f0f84c4efac5931 i18n candidate(hi): llm-connection-strings via openrouter/moonshotai/kimi-k2.6
- 7ddc2dcdabf07e4e1878f7c92422ae362ffd78bd i18n candidate(hi): llm-connection-strings via openrouter/google/gemini-3-flash-preview
- c1aa7ed3bd9b8fbe5d0f5a117667b2ce7610fd6b i18n candidate(hi): llm-connection-strings via openrouter/z-ai/glm-5.1
- 960723bb1f42fa2d9b6a3ddad19a603ac2a8eb53 i18n candidate(hi): llm-connection-strings via openrouter/minimax/minimax-m2.7
- 0b57411a672a44f5aa575932f7b3dcb19dfdfbf8 i18n candidate(hi): llm-connection-strings via openrouter/openai/gpt-oss-120b:nitro
- d5420a149f3a6eb7e398c26c7a0d61f660deb17d i18n candidate(hi): llm-connection-strings via openrouter/qwen/qwen3-32b:nitro
