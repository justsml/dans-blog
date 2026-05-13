# Translation Judge Summary

- Slug: should-you-use-named-or-default-exports
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.63
- Input tokens: 7331
- Output tokens: 264
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004457

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.47
- Input tokens: 5896
- Output tokens: 421
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004211

### Pass 2
- Runtime seconds: 2.47
- Input tokens: 5961
- Output tokens: 318
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003934

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "क्या हमने शुरू में ही `export` करने का मकसद ही भूल गए हैं?" Replacement: "क्या हम शुरू में ही `export` करने का मकसद भूल गए हैं?" Reason: Grammar fix: 'हमने... भूल गए हैं' is incorrect; it should be 'हम... भूल गए हैं'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "चलोउन सामान्य" Replacement: "चलो उन सामान्य" Reason: Missing space between words. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "अगर कोड संचार है, तो कृपया `export` को पूरी ताकत से करें।" Replacement: "अगर कोड संचार है, तो कृपया `export` ऐसे करें जैसे आपका सच में यही मतलब हो।" Reason: The original 'like you fucking mean it' is an idiom for intentionality/conviction. 'पूरी ताकत से' (with full strength) is okay but 'जैसे आपका सच में यही मतलब हो' captures the 'mean it' nuance better in a technical communication context. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "एकल नेम्ड एक्सपोर्ट भी डिफ़ॉल्ट के रूप में एक्सपोर्ट किया गया।" Replacement: "एकल नेम्ड एक्सपोर्ट जिसे डिफ़ॉल्ट के रूप में भी एक्सपोर्ट किया गया है।" Reason: Improved flow for the table cell description. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2023-08-18--should-you-use-named-or-default-exports/hi/index.mdx
- 8eb6bfb338589453cc31b265fe456d586f4b233f i18n candidate(hi): should-you-use-named-or-default-exports via openrouter/openai/gpt-oss-120b:nitro
- 1b00f1d2a436bf3fae514f4b8622d125942b94d8 i18n candidate(hi): should-you-use-named-or-default-exports via openrouter/qwen/qwen3-32b:nitro
