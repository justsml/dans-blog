# Translation Judge Summary

- Slug: the-unassuming-power-of-multiple-choice-questions
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
- Runtime seconds: 3.23
- Input tokens: 5571
- Output tokens: 316
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003733
- Estimated cost: $0.003733

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.54
- Input tokens: 5365
- Output tokens: 338
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003697
- Estimated cost: $0.003697

### Pass 2
- Runtime seconds: 3.12
- Input tokens: 5239
- Output tokens: 390
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003789
- Estimated cost: $0.003789

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "המסיח הוא תכנית הלימודים" Replacement: "המסיח הוא תוכנית הלימודים" Reason: Standard Hebrew spelling (Ktiv Male) for 'program/curriculum' is תוכנית. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "הוא חושף איזה מודל הוא משתמש" Replacement: "הוא חושף באיזה מודל הוא משתמש" Reason: Grammatical correction: 'using' requires the preposition 'in' (be-) in Hebrew. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "מהי התחביר" Replacement: "מהו התחביר" Reason: Grammatical gender agreement: 'Syntax' (Tachbir) is masculine in Hebrew, so it should be 'Mahu' not 'Mahi'. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "בין תחביר דומים" Replacement: "בין תחבירים דומים" Reason: Grammatical number agreement: 'Similar' is plural, so 'Syntax' must be pluralized to 'Tachbirim'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- f1036a6517336256ef1f7132ade5e1de2e2ac3b9 i18n candidate(he): the-unassuming-power-of-multiple-choice-questions via openrouter/deepseek/deepseek-v4-flash
- b34b9f7ab7c4467d7fe18daa9202706a73bd6423 i18n candidate(he): the-unassuming-power-of-multiple-choice-questions via openrouter/openai/gpt-oss-120b:nitro
