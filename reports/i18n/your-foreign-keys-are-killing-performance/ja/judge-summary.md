# Translation Judge Summary

- Slug: your-foreign-keys-are-killing-performance
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug your-foreign-keys-are-killing-performance --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug your-foreign-keys-are-killing-performance --locale ja --skip-global
20 |   }
21 | 
22 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
23 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
24 |   if (targetLength < minimumLength || targetLength > maximumLength) {
25 |     throw new Error(
                   ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/ja/index.mdx changed comparable body length from 10906 chars in English to 5421 chars. Expected 7088-14724 chars (within 35%).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:25:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:26:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.75
- Input tokens: 15410
- Output tokens: 260
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008485

### Round 1, Batch 2
- Runtime seconds: 2.37
- Input tokens: 12201
- Output tokens: 212
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006737

## Primary Judge Telemetry
- Runtime seconds: 2.73
- Input tokens: 12191
- Output tokens: 273
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006914

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.41
- Input tokens: 9481
- Output tokens: 652
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006697

### Pass 2
- Runtime seconds: 2.25
- Input tokens: 9806
- Output tokens: 232
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005599

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "人生を進めよう" Replacement: "作業を進めよう" Reason: 'Move on with your life' in this technical context is a colloquialism meaning 'get on with the task at hand' or 'don't overthink it'. The literal translation 'move on with your life' (人生を進める) sounds overly dramatic in Japanese. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied medium priority suggestion. Match: "ripped out したりはしない" Replacement: "引き剥がしたりはしない" Reason: The English phrase 'ripped out' was left untranslated in the candidate. Translating it to '引き剥がす' or '取り外す' makes the sentence more natural for Japanese readers. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "disconnect が起きるのは" Replacement: "認識の乖離が起きるのは" Reason: The English word 'disconnect' was left untranslated. In this context, '認識の乖離' (gap in understanding) or '食い違い' is more appropriate. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "absurd なJOINの増殖" Replacement: "不条理なJOINの増殖" Reason: The English word 'absurd' was left untranslated. '不条理な' or '馬鹿げた' fits the tone better. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "prematurely に最適化するのは" Replacement: "時期尚早に最適化するのは" Reason: The English word 'prematurely' was left untranslated. '時期尚早に' is the standard technical translation for 'premature optimization'. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied medium priority suggestion. Match: "cargo cult することになる" Replacement: "カーゴ・カルト（盲目的追従）することになる" Reason: While 'cargo cult' is a known term, providing the katakana or a brief explanation helps clarity in a Japanese technical context. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/ja/index.mdx
- a5f69728163ec7175fe8f648e2b7a1f48f00b01e i18n candidate(ja): your-foreign-keys-are-killing-performance via openrouter/qwen/qwen3.6-plus
- 8ababeeed2cbfa498e412eae4dcbaa5dcf09df29 i18n candidate(ja): your-foreign-keys-are-killing-performance via openrouter/moonshotai/kimi-k2.6
- da3ba7242675827764f2896a98ea857b5cd6b59c i18n candidate(ja): your-foreign-keys-are-killing-performance via openrouter/google/gemini-3-flash-preview
- 9062bf9e792ef2db7bad95692a68a4cbcd031cc0 i18n candidate(ja): your-foreign-keys-are-killing-performance via openrouter/z-ai/glm-5.1
- cc6a6dc37be9cec503fcdc793f1ba976d5e2065a i18n candidate(ja): your-foreign-keys-are-killing-performance via openrouter/minimax/minimax-m2.7
