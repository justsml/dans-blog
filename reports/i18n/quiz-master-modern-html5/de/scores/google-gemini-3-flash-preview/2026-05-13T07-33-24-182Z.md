# Translation Score

- Slug: quiz-master-modern-html5
- Locale: de
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 80.4/100
- Recommendation: polish
- Hash: ad50c9fcd1268d1b257f2f504ab54b41f516591ed012ff8badacb3111259885c
- JSON archive: reports/i18n/quiz-master-modern-html5/de/scores/google-gemini-3-flash-preview/2026-05-13T07-33-24-182Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 60 |
| coherence | 85 |
| relevance | 95 |
| translationQuality | 70 |

## Analysis

The translation of the prose is excellent, capturing Dan's direct and slightly cheeky tone perfectly in German. However, there is a major technical failure: almost all `<Challenge>` components have had their `options` arrays and `title` strings emptied. This renders the quiz non-functional and removes the core educational content of the article.

## Strengths

- Excellent localization of the 'legal' warning and the conversational closing.
- Natural use of technical German (e.g., 'Dokumenten-Outline', 'Barrierefreiheit').
- Maintains MDX structure and imports correctly.

## Issues

- high / technicalAccuracy: The 'options' array and 'title' attribute are empty for challenges 0 through 12, losing all quiz answers and metadata. (options={[
  ]})
- medium / readability: Inconsistent translation of the 'group' attribute (e.g., 'Aufwärmphase' vs 'Fortgeschrittenes semantisches HTML'). (group="Aufwärmphase")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 9545 | 358 | 0 | 0 | 5239 | $0.005847 |
