# Translation Score

- Slug: quiz-is-your-memory-rusty
- Locale: ja
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.8/100
- Recommendation: accept
- Hash: 7cf83a4f063397baa074f4e75985003e0a56fc07e7a3b920ee1077b56fa7aa85
- JSON archive: reports/i18n/quiz-is-your-memory-rusty/ja/scores/google-gemini-3-flash-preview/2026-05-13T07-33-16-043Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 98 |
| coherence | 95 |
| relevance | 100 |
| translationQuality | 94 |

## Analysis

The translation is of high quality, maintaining the technical rigor and direct tone of the original. It correctly handles complex Rust concepts like ownership, borrowing, and interior mutability without softening the technical language. The MDX structure and component props are preserved perfectly.

## Strengths

- Excellent preservation of technical terminology (e.g., 'ムーブセマンティクス', '内部可変性').
- Natural localization of the 'subTitle' pun while keeping the crab emoji theme.
- Consistent translation of UI elements within the Challenge components (hints, options, explanations).

## Issues

- low / readability: Some English comments in code blocks were left untranslated, which is acceptable but inconsistent with other translated comments. (// What happens to our wisdom?)
- low / readability: The translation of 'Rustacean' as '熟練のRustacean' is accurate but misses the opportunity for a more common Japanese community term like 'Rust使い' or 'Rust師', though keeping the original term is technically safe.

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 26224 | 353 | 0 | 0 | 4090 | $0.014171 |
