# Translation Score

- Slug: quiz-do-you-know-esnext
- Locale: ru
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.0/100
- Recommendation: accept
- Hash: 9d6ef62c2e9e37641e0230ba9be2c27f5e1f998fe2d01f46edd224fc3aad9800
- JSON archive: reports/i18n/quiz-do-you-know-esnext/ru/scores/google-gemini-3-flash-preview/2026-05-13T07-33-07-323Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 95 |
| technicalAccuracy | 98 |
| coherence | 100 |
| relevance | 90 |
| translationQuality | 92 |

## Analysis

The translation is technically sound and uses appropriate Russian terminology for JavaScript concepts (e.g., 'оператор нулевого слияния', 'опциональная цепочка'). The tone is professional yet maintains the original's directness. However, the translator omitted all 'hints' slots present in the source, which reduces the educational value of the quiz.

## Strengths

- Accurate translation of technical terms like 'falsy' (ложные значения) and 'garbage collected' (собранным сборщиком мусора).
- Natural phrasing in Russian that avoids 'translationese'.
- Correct handling of MDX components and code blocks.

## Issues

- medium / relevance: Omission of all 'hints' slots across all 11 challenges. (<slot name='hints'>...</slot>)
- low / translationQuality: Inconsistent translation of 'Null Coalescing' in group/title (sometimes left in English, sometimes translated). (group="ES2020" title="Null Coalescing" vs title="Нулевое слияние")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7263 | 373 | 0 | 0 | 3437 | $0.004751 |
