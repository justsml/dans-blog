# Translation Score

- Slug: quiz-do-you-know-esnext
- Locale: de
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 92.0/100
- Recommendation: accept
- Hash: 72ca6f7798394f62116b018e88f2035fde25d861cd0737cc07966f742c9cc125
- JSON archive: reports/i18n/quiz-do-you-know-esnext/de/scores/google-gemini-3-flash-preview/2026-05-13T07-33-07-758Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 98 |
| coherence | 95 |
| relevance | 85 |
| translationQuality | 90 |

## Analysis

The translation is technically sound and uses appropriate German terminology for JavaScript concepts (e.g., 'Null-Koaleszenz', 'falsy-Werte'). However, it completely omits the 'hints' slot from every single challenge component present in the source. While the core quiz remains functional, this is a significant omission of source content.

## Strengths

- Accurate translation of technical error messages (e.g., 'Kann Eigenschaft von undefined nicht lesen')
- Maintains the informal but professional tone ('Skillz', 'Wie schwer kann das schon sein')
- Correct handling of MDX components and code blocks

## Issues

- high / relevance: Complete omission of the 'hints' slot in all 11 challenges. (<slot name='hints'>...</slot>)
- low / coherence: Inconsistent translation of 'Nullish Coalescing' (translated as 'Null-Koaleszenz' in index 0 and 'Nullish Coalescing' in index 1). (title="Null-Koaleszenz" vs title="Nullish Coalescing")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7324 | 377 | 0 | 0 | 3326 | $0.004793 |
