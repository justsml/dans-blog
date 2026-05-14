# Translation Judge Summary

- Slug: docker-makes-everything-better
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
- Runtime seconds: 2.72
- Input tokens: 3483
- Output tokens: 257
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002512
- Estimated cost: $0.002512

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.21
- Input tokens: 3537
- Output tokens: 411
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003001
- Estimated cost: $0.003001

### Pass 2
- Runtime seconds: 2.67
- Input tokens: 3609
- Output tokens: 329
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002792
- Estimated cost: $0.002792

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "'דוקר יכול לעשות :הכל:!'" Replacement: "'Docker יכול לעשות :הכל:!'" Reason: The term 'Docker' is usually kept in English in Hebrew technical contexts, and the candidate used 'Docker' in the H2 but 'דוקר' in the subTitle. Consistency is better. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "subTitle: 'Docker יכול לעשות :הכל:!'" Replacement: "subTitle: 'Docker יכול לעשות :allthethings:!'" Reason: The emoji shortcode :allthethings: is a specific technical identifier/custom emoji used in the original and should not be translated to Hebrew text inside the colons, as it will break the emoji rendering. Note: Exact match not found in selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "title: דוקר === אהבה" Replacement: "title: \"Docker === Love\"" Reason: Maintaining the English 'Docker === Love' in the title is more consistent with the technical 'Docker === Love' branding and the author's style, and matches the H2 usage of 'Docker' in English. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- bac51fa924d2ae8e696b2fa99dc52c633893a889 i18n candidate(he): docker-makes-everything-better via openrouter/deepseek/deepseek-v4-flash
- 07c50187293b7853b04a9e0a1aa637cb8c9afcd6 i18n candidate(he): docker-makes-everything-better via openrouter/openai/gpt-oss-120b:nitro
