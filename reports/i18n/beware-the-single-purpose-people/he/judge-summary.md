# Translation Judge Summary

- Slug: beware-the-single-purpose-people
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
- Runtime seconds: 3.19
- Input tokens: 10009
- Output tokens: 324
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005977
- Estimated cost: $0.005977

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.56
- Input tokens: 9051
- Output tokens: 458
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005900
- Estimated cost: $0.005900

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "ייצוא חבית" Replacement: "barrel export" Reason: 'Barrel export' is a specific technical term in JavaScript/TypeScript. Translating it literally to 'ייצוא חבית' (barrel export) is confusing and not standard Hebrew dev slang; keeping the English term or transliterating is better. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "קורא מחלים מפוריות" Replacement: "קורא מחלים מטהרנות" Reason: The word 'פוריות' means 'fertility'. The source text meant 'purist' (טהרנות). This is a significant mistranslation. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "barrel export" Replacement: "barrel export" Reason: The current text already uses 'barrel export' in the MDX provided, but the judge report suggested it was 'ייצוא חבית'. Checking the actual MDX content, it is 'barrel export'. No change needed if it matches, but I will ensure the mistranslation of 'purist' is fixed. Note: Exact match and replacement are identical; no MDX change needed.
4. Pass 2: logged high priority suggestion. Match: "קורא מחלים מטהרנות" Replacement: "קורא מחלים מטהרנות" Reason: The judge report mentioned a mistranslation of 'purist' as 'fertility' (פוריות), but the MDX provided actually already contains 'טהרנות' (purism). It seems the fixes were already partially applied or the judge misread the candidate. I will verify the 'barrel export' string. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- e241a43c7154d6cd80967fb3045a999a37eea6a9 i18n candidate(he): beware-the-single-purpose-people via openrouter/deepseek/deepseek-v4-flash
- 257884c5f1f4310307bff72eb5d26021f0c7664f i18n candidate(he): beware-the-single-purpose-people via openrouter/openai/gpt-oss-120b:nitro
