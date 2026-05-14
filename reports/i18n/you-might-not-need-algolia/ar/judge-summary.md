# Translation Judge Summary

- Slug: you-might-not-need-algolia
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.23
- Input tokens: 5658
- Output tokens: 364
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003921
- Estimated cost: $0.003921

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.04
- Input tokens: 5681
- Output tokens: 214
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003482
- Estimated cost: $0.003482

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Image by Dan Levy" Replacement: "صورة بواسطة دان ليفي" Reason: The cover_credit field was left in English; translating it improves localization consistency. Note: Applied exact replacement to selected MDX.
2. Pass 1: logged medium priority suggestion. Match: "![فهرسة موقعي باستخدام PageFind](../PageFind-Cleaner-better-15fps-720p2.webp \"فهرسة موقعي باستخدام PageFind\")" Replacement: "![فهرسة موقعي باستخدام PageFind](../PageFind-Cleaner-better-15fps-720p2.webp \"فهرسة موقعي باستخدام PageFind\")" Reason: The candidate correctly updated the image path to include ../, but the alt text and title are already translated. No change needed, just confirming path correctness. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- 3a9e51b60dfc67493d5e788c6a34bb1c1549b73d i18n candidate(ar): you-might-not-need-algolia via openrouter/deepseek/deepseek-v4-flash
- 09bedfd13e37a0421a34dc655a9ce377c809269f i18n candidate(ar): you-might-not-need-algolia via openrouter/openai/gpt-oss-120b:nitro
