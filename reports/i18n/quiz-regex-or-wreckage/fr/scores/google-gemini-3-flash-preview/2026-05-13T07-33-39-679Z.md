# Translation Score

- Slug: quiz-regex-or-wreckage
- Locale: fr
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 88.0/100
- Recommendation: polish
- Hash: f2b90f9576a46e0e174161f5b726101822d39afe2eb82d6eb4bdbc2445f10280
- JSON archive: reports/i18n/quiz-regex-or-wreckage/fr/scores/google-gemini-3-flash-preview/2026-05-13T07-33-39-679Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 88 |
| technicalAccuracy | 85 |
| coherence | 90 |
| relevance | 95 |
| translationQuality | 82 |

## Analysis

The translation is technically sound but suffers from inconsistent terminology for 'look-behind' (alternating between 'Regard en arrière', 'Rétrospection', and 'Anticipation arrière'). There are critical omissions in the options for Challenge 2 and 13, which breaks the quiz functionality. The tone successfully captures Dan's direct and slightly playful technical voice.

## Strengths

- Excellent adaptation of the 'gym' and 'wrestle' metaphors into natural French ('en découdre', 'gymnase').
- Preserves all MDX components and code blocks perfectly.
- Accurate translation of complex regex explanations.

## Issues

- high / technicalAccuracy: Empty options arrays in Challenge 2 and 13 make the quiz unplayable for those questions. (options=[
  ]
>)
- medium / coherence: Inconsistent translation of 'look-behind'. 'Anticipation arrière' is a literal but non-standard term; 'Rétrospection' or 'Look-behind' is preferred. (Anticipation arrière positive)
- low / readability: Unnecessary escaping of quotes inside JSX strings which can lead to rendering backslashes in some MDX parsers. (✅ \"cat\" (entouré d'espaces))

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 12821 | 440 | 0 | 0 | 4504 | $0.007731 |
