# Translation Score

- Slug: quiz-regex-or-wreckage
- Locale: es
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 96.2/100
- Recommendation: accept
- Hash: 83a6a79a1f8cf5feb24802e2d597e9b26019e15be1a83f420e84960f0e1f1c87
- JSON archive: reports/i18n/quiz-regex-or-wreckage/es/scores/google-gemini-3-flash-preview/2026-05-13T07-33-36-884Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 95 |
| technicalAccuracy | 92 |
| coherence | 100 |
| relevance | 100 |
| translationQuality | 94 |

## Analysis

The translation is excellent, capturing Dan's informal yet technical tone ('dar guerra', 'se tragaría todo', 'te dejará tirado'). It successfully localizes technical concepts like 'greedy' to 'codicioso/voraz' and 'look-ahead' to 'aserciones look-around'. However, there is a significant technical omission in Challenge index 2 and 13 where the 'options' array was left empty in the translation, rendering those quiz questions unplayable.

## Strengths

- Excellent use of Spanish idioms to match the source's 'direct technical voice'.
- Consistent and accurate translation of complex RegEx terminology (look-behind, capture groups, word boundaries).
- Maintains MDX structure and component integrity perfectly.

## Issues

- high / technicalAccuracy: The 'options' array for Challenge index 2 and 13 is empty in the translation but populated in the source. (options: [
  ])
- low / readability: Inconsistent translation of 'Look-behind' (sometimes 'Lookbehind', sometimes 'Look-behind'). (group="Lookbehind" vs group="Look-behind")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 12842 | 393 | 0 | 0 | 3960 | $0.007600 |
