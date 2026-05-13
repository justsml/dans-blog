# Translation Score

- Slug: quiz-is-your-memory-rusty
- Locale: es
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 93.4/100
- Recommendation: polish
- Hash: 56e3bd76eefdac3703b46366cc94b4797329cdefea7420ced36f685da397c9fc
- JSON archive: reports/i18n/quiz-is-your-memory-rusty/es/scores/google-gemini-3-flash-preview/2026-05-13T07-33-14-771Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 94 |
| coherence | 95 |
| relevance | 98 |
| translationQuality | 88 |

## Analysis

The translation is technically sound and maintains the educational tone of the original quiz. It correctly handles complex Rust concepts like 'ownership' (propiedad) and 'borrowing' (préstamo). However, there are significant instances of untranslated English prose within the explanation blocks of the later challenges (15, 16, 17), which impacts the overall translation quality.

## Strengths

- Accurate translation of Rust-specific terminology (lifetimes, smart pointers, interior mutability).
- Maintains MDX structure and component integrity perfectly.
- Natural flow in the introductory and concluding sections.

## Issues

- high / translationQuality: Large sections of English text were left untranslated in the explanation slots of Challenges 15, 16, and 17. (Key differences: 1. Copy: - Implicit, bitwise copy...)
- low / technicalAccuracy: Inconsistent translation of 'owned types'. Sometimes translated as 'tipos con propiedad', other times left as 'owned'. (Considera devolver tipos con propiedad (*owned*))
- medium / readability: Challenge 4 is missing its 'options' array content in the translation, making the quiz question unanswerable. (options: [
  ])

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 26378 | 436 | 0 | 0 | 3716 | $0.014497 |
