# Translation Score

- Slug: javascript-promises-quiz
- Locale: de
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.8/100
- Recommendation: accept
- Hash: 8a014091f8b32b0fac725d70d5e0b64bf61b7c8c75e5eb06adb2a0bdf750f003
- JSON archive: reports/i18n/javascript-promises-quiz/de/scores/google-gemini-3-flash-preview/2026-05-13T07-32-39-539Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 98 |
| coherence | 95 |
| relevance | 100 |
| translationQuality | 94 |

## Analysis

The translation is technically precise and maintains the educational tone of the original quiz. It correctly handles MDX components and code-related terminology. While the flow is natural, there is a minor inconsistency in the translation of 'Promise' (alternating between masculine and neuter gender, though masculine is more common in German dev circles).

## Strengths

- Preserves all MDX component structures and props perfectly.
- Accurately translates technical nuances like 'executor' and 'host environment'.
- Maintains the direct, encouraging voice of the author.

## Issues

- low / readability: Inconsistent gender for 'Promise'. Used 'der Promise' (masculine) in some places and 'das Promise' (neuter) is implied in others. 'Der Promise' is generally preferred in German technical documentation. (nicht behandelter abgelehnter Promise)
- low / readability: The translation of 'skillz' to 'Fähigkeiten' loses the informal 'z' flavor, though it is safer for a general audience. (Beweise deine JavaScript-Fähigkeiten!)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7156 | 375 | 0 | 0 | 3480 | $0.004703 |
