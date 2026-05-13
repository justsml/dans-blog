# Translation Score

- Slug: quiz-do-you-know-esnext
- Locale: it
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 92.0/100
- Recommendation: accept
- Hash: cb00d6c31f4b7f9d6b63562b08b5f1e72e7017d013c85109e4b68151ba8126e0
- JSON archive: reports/i18n/quiz-do-you-know-esnext/it/scores/google-gemini-3-flash-preview/2026-05-13T07-33-08-440Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 98 |
| coherence | 95 |
| relevance | 85 |
| translationQuality | 90 |

## Analysis

The translation is technically sound and uses appropriate Italian terminology for modern JavaScript features (e.g., 'coalescenza nulla', 'catena opzionale'). The tone remains direct and professional. However, there is a significant omission: the 'hints' slot present in every challenge in the source MDX has been completely removed in the translation, which reduces the educational value of the quiz.

## Strengths

- Accurate translation of technical error messages (e.g., 'Impossibile mescolare BigInt e number').
- Natural flow in the explanations while maintaining code-adjacent nuance.
- Consistent use of terminology for logical assignments.

## Issues

- high / relevance: Complete omission of the 'hints' slot in all Challenge components. (<slot name='hints'>...)
- low / readability: Inconsistent translation of 'Null Coalescing' in titles (sometimes left in English, sometimes translated). (title="Null Coalescing" vs title="Coalescenza nulla")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7283 | 355 | 0 | 0 | 3232 | $0.004706 |
