# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug llm-routing-mastra-ai --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-routing-mastra-ai --locale hi --skip-global
191 |     ]
192 |     : [];
193 | 
194 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
195 | 
196 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-02--llm-routing-mastra-ai/hi/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:196:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:31:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.64
- Input tokens: 10036
- Output tokens: 283
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005867
- Estimated cost: $0.005867

### Round 1, Batch 2
- Runtime seconds: 2.21
- Input tokens: 10216
- Output tokens: 194
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005690
- Estimated cost: $0.005690

### Round 1, Batch 3
- Runtime seconds: 3.98
- Input tokens: 6436
- Output tokens: 401
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004421
- Estimated cost: $0.004421

## Primary Judge Telemetry
- Runtime seconds: 3.99
- Input tokens: 8211
- Output tokens: 380
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005246
- Estimated cost: $0.005246

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.83
- Input tokens: 6785
- Output tokens: 471
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004805
- Estimated cost: $0.004805

### Pass 2
- Runtime seconds: 2.54
- Input tokens: 6785
- Output tokens: 215
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004038
- Estimated cost: $0.004038

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "जो आपके असली डॉक्यूमेंट्स से बचे बिना मिडल को सूप बना दे।" Replacement: "जो आपके असली डॉक्यूमेंट्स को बीच में खिचड़ी बनाए बिना संभाल ले।" Reason: The original English 'without turning the middle into soup' means the model should NOT fail. The candidate translation 'se bache bina' (without avoiding) combined with 'soup bana de' (makes soup) creates the opposite meaning in Hindi. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "बजट आपके कोडबेस में बिखरे" Replacement: "बजाय आपके कोडबेस में बिखरे" Reason: Typo: 'budget' (बजट) used instead of 'instead of' (बजाय). Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "जो आपके असली डॉक्यूमेंट्स से बचे बिना मिडल को सूप बना दे।" Replacement: "जो आपके असली डॉक्यूमेंट्स को बीच में खिचड़ी बनाए बिना संभाल ले।" Reason: The original English 'without turning the middle into soup' means the model should NOT fail. The candidate translation 'se bache bina' (without avoiding) combined with 'soup bana de' (makes soup) creates the opposite meaning in Hindi. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "बजट आपके कोडबेस में बिखरे" Replacement: "बजाय आपके कोडबेस में बिखरे" Reason: Typo: 'budget' (बजट) used instead of 'instead of' (बजाय). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/hi/index.mdx
- 7072928335c8244fd2b90f90d92de508f85b5f18 i18n candidate(hi): llm-routing-mastra-ai via openrouter/qwen/qwen3.6-plus
- deb4c1e19ca75a51104723c4fd2a89e81cfdb27b i18n candidate(hi): llm-routing-mastra-ai via openrouter/moonshotai/kimi-k2.6
- acb4794e0c785c075e115eba7410a3e2950d1ff9 i18n candidate(hi): llm-routing-mastra-ai via openrouter/google/gemini-3-flash-preview
- c4ea4d56ea6648e50c0119d71a1ab8130255822e i18n candidate(hi): llm-routing-mastra-ai via openrouter/z-ai/glm-5.1
- 0d365a3ce921dd6fcc484c135e060273172f98e7 i18n candidate(hi): llm-routing-mastra-ai via openrouter/minimax/minimax-m2.7
- e394e445a05403476ccbfb24162f2ffd7c0e87d0 i18n candidate(hi): llm-routing-mastra-ai via openrouter/openai/gpt-oss-120b:nitro
- 5b6d3fa804a940e637b3c62ece04bada934391cf i18n candidate(hi): llm-routing-mastra-ai via openrouter/qwen/qwen3-32b:nitro
