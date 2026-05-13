# Translation Score

- Slug: quiz-regex-or-wreckage
- Locale: de
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.4/100
- Recommendation: polish
- Hash: 821bb14f74b18d0de911361adb9e873e9a3fe0213cf0ef56da196c1f94e44a7a
- JSON archive: reports/i18n/quiz-regex-or-wreckage/de/scores/google-gemini-3-flash-preview/2026-05-13T07-33-39-196Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 95 |
| technicalAccuracy | 92 |
| coherence | 98 |
| relevance | 98 |
| translationQuality | 94 |

## Analysis

The translation is of high quality, successfully capturing Dan's informal yet technical tone. It correctly handles complex MDX structures and preserves all code-related logic. However, there are significant omissions in the 'options' arrays for challenges 2 and 13, which would break the quiz functionality in the UI.

## Strengths

- Excellent use of German technical terminology (e.g., 'Erfassungsgruppen', 'Quantoren', 'Wortgrenze').
- Maintains the playful, direct voice of the author ('Blick-in-die-Hölle', 'zermalme noch mehr Challenges').
- Correct localization of MDX imports and relative file paths in frontmatter.

## Issues

- high / technicalAccuracy: The 'options' array for Challenge index 2 is empty in the translation, whereas the source contains 5 options. (options={[
  ]})
- high / technicalAccuracy: The 'options' array for Challenge index 13 is empty in the translation. (options={[
  ]})
- low / readability: Inconsistent translation of 'Warmup' group; used 'Aufwärmen' in index 0 and 'Aufwärmübung' in index 1. (group="Aufwärmübung")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 12782 | 438 | 0 | 0 | 4080 | $0.007705 |
