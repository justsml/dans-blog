# Translation Judge Summary

- Slug: you-may-not-need-axios
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
- Runtime seconds: 2.85
- Input tokens: 9646
- Output tokens: 289
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005690
- Estimated cost: $0.005690

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.53
- Input tokens: 9549
- Output tokens: 451
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006128
- Estimated cost: $0.006128

### Pass 2
- Runtime seconds: 3.19
- Input tokens: 9594
- Output tokens: 371
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005910
- Estimated cost: $0.005910

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: قد لا تحتاج Axios" Replacement: "title: \"قد لا تحتاج Axios\"" Reason: The English title is wrapped in quotes; preserving this ensures consistency with the original frontmatter style. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "[أخبرني ✉️](../contact/)" Replacement: "[أخبرني ✉️](/contact/)" Reason: The English file uses a root-relative path '/contact/'. While the instructions mention assets, internal site links should generally remain as defined in the source unless they are relative file paths. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "title: \"قد لا تحتاج Axios\"" Replacement: "title: \"قد لا تحتاج Axios\"" Reason: The current text already has quotes in the provided MDX content, but the judge JSON suggested a fix. Verifying the actual content shows the quotes are present. No change needed if already present. Note: Exact match and replacement are identical; no MDX change needed.
4. Pass 2: logged medium priority suggestion. Match: "[أخبرني ✉️](/contact/)" Replacement: "[أخبرني ✉️](/contact/)" Reason: The current text already uses the correct root-relative path. No change needed. Note: Exact match and replacement are identical; no MDX change needed.
5. Pass 2: applied high priority suggestion. Match: "تفضّلي هي `الخيار رقم 1`" Replacement: "تفضيلِي هو `الخيار رقم 1`" Reason: The word 'تفضّلي' is a feminine imperative 'Please (female)', whereas the context is 'My preference is'. 'تفضيلِي' (My preference) is the correct translation. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- fee423804eacea0b685dda68aa306ef10657ccdd i18n candidate(ar): you-may-not-need-axios via openrouter/deepseek/deepseek-v4-flash
- ea7a2b801f2665c1b2a831198e21f022df0719ea i18n candidate(ar): you-may-not-need-axios via openrouter/openai/gpt-oss-120b:nitro
