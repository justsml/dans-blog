# Translation Score

- Slug: quiz-is-your-memory-rusty
- Locale: de
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 97.8/100
- Recommendation: accept
- Hash: ec62289d7973c62f5cec6644bcd6d4850ae57c6fe30bf6583cc72db9b23383ec
- JSON archive: reports/i18n/quiz-is-your-memory-rusty/de/scores/google-gemini-3-flash-preview/2026-05-13T07-33-17-498Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 95 |
| technicalAccuracy | 98 |
| coherence | 100 |
| relevance | 100 |
| translationQuality | 96 |

## Analysis

The translation is excellent, capturing Dan's direct and encouraging technical voice while adapting cultural nuances (e.g., 'Zenon von Kition' for 'Zeno of Citium'). Technical terms like 'Ownership', 'Borrowing', and 'Lifetimes' are correctly handled—either kept in English where standard in the German Rust community or translated accurately. MDX structure and component props are perfectly preserved.

## Strengths

- Excellent adaptation of the subtitle pun ('Check dich selbst, bevor du dich zerschießt').
- Consistent use of German technical terminology (e.g., 'innere Veränderlichkeit' for 'interior mutability').
- Maintains the 50-character line formatting constraint mentioned in the intro.
- Accurate translation of quiz hints and explanations without losing technical nuance.

## Issues

- low / technicalAccuracy: In Challenge 4, the options list is empty in the translation, whereas the source has four options. (options={[
  ]})
- low / translationQuality: In Challenge 1, a comment inside a code block was left in English. (// What happens to our wisdom?)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 26710 | 383 | 0 | 0 | 4091 | $0.014504 |
