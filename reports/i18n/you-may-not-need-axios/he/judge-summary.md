# Translation Judge Summary

- Slug: you-may-not-need-axios
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.65
- Input tokens: 10169
- Output tokens: 276
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005913
- Estimated cost: $0.005913

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.01
- Input tokens: 9769
- Output tokens: 388
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006049
- Estimated cost: $0.006049

### Pass 2
- Runtime seconds: 5.18
- Input tokens: 9827
- Output tokens: 906
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007632
- Estimated cost: $0.007632

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: אולי לא צריך Axios" Replacement: "title: \"אולי לא צריך Axios\"" Reason: The English title is quoted; Hebrew should follow the same style for consistency. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "[יידע אותי ✉️](../contact/)" Replacement: "[יידע אותי ✉️](/contact/)" Reason: The link to /contact/ is an absolute path from the root in the original; changing it to ../contact/ might break if the structure doesn't match, though the instructions mentioned assets, usually internal site links are kept as root-relative. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "[יידע אותי ✉️](/contact/)" Replacement: "[יידע אותי ✉️](/contact/)" Reason: The previous judge suggested changing this to a relative path, but the original English uses a root-relative path '/contact/'. Keeping it root-relative is safer for site-wide navigation consistency. Note: Exact match and replacement are identical; no MDX change needed.
4. Pass 2: applied medium priority suggestion. Match: "- [סקירה כללית](#overview)" Replacement: "- [סקירה כללית](#overview) - [השוואת תכונות](#feature-comparison) - [מתכוני Fetch](#fetch-recipes)" Reason: Ensuring the TOC list formatting is clean and matches the English structure exactly. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- c9ea7d21ed2c9df737acf18053eecf9601972cd2 i18n candidate(he): you-may-not-need-axios via openrouter/deepseek/deepseek-v4-flash
- c0f8706d3fa8819c93ca6807c0a2bbe6c9e916d0 i18n candidate(he): you-may-not-need-axios via openrouter/openai/gpt-oss-120b:nitro
