# Translation Score

- Slug: quiz-do-you-know-esnext
- Locale: fr
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.0/100
- Recommendation: accept
- Hash: 6739d9b4fe82f38d098371b8bceb999ee9ec66e1a5466b69c5e1a98a97095828
- JSON archive: reports/i18n/quiz-do-you-know-esnext/fr/scores/google-gemini-3-flash-preview/2026-05-13T07-33-07-682Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 95 |
| technicalAccuracy | 98 |
| coherence | 100 |
| relevance | 90 |
| translationQuality | 92 |

## Analysis

The translation is technically excellent and uses appropriate French terminology for JavaScript concepts (e.g., 'ramasse-miettes' for garbage collector). However, it completely omitted the 'hints' slot from every single challenge component, which is a significant content omission compared to the source. The tone remains professional and direct, matching the original author's voice.

## Strengths

- Accurate translation of technical terms like 'null coalescing' and 'optional chaining'
- Natural flow in French while maintaining code-adjacent nuance
- Correct handling of MDX components and slots

## Issues

- high / relevance: The 'hints' slot present in every source challenge was entirely omitted in the translation. (<slot name='hints'>... (missing in translation))
- low / translationQuality: Inconsistent translation of 'assignment' (used both 'assignation' and 'affectation'). (Assignation logique vs Affectation par coalescence nulle)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7289 | 244 | 0 | 0 | 2663 | $0.004377 |
