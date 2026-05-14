# Translation Judge Summary

- Slug: the-last-to-think
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
- Runtime seconds: 2.89
- Input tokens: 3792
- Output tokens: 316
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002844
- Estimated cost: $0.002844

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.19
- Input tokens: 3786
- Output tokens: 265
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002688
- Estimated cost: $0.002688

### Pass 2
- Runtime seconds: 1.86
- Input tokens: 3599
- Output tokens: 185
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002354
- Estimated cost: $0.002354

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "מי מעקם עכשיו אצבעות" Replacement: "מי כוסס עכשיו ציפורניים" Reason: The Hebrew idiom for 'hand-wringing' (anxiety/worry) is closer to 'biting nails' or 'wringing hands' (שילוב ידיים/דאגה), 'bending fingers' is not a standard idiom here. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "language: English" Replacement: "language: Hebrew" Reason: The language frontmatter field should reflect the target language of the translation. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- e3b96a2bba48630e9f99707fea2f98b79a880c9a i18n candidate(he): the-last-to-think via openrouter/deepseek/deepseek-v4-flash
- 208ecfd911a213f9208f953db99e1747ff056874 i18n candidate(he): the-last-to-think via openrouter/openai/gpt-oss-120b:nitro
