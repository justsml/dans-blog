# Translation Score

- Slug: quiz-master-modern-html5
- Locale: ja
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 75.0/100
- Recommendation: polish
- Hash: ff5b6fd3e0f3fa97fdc21142533ce90876915dab7c73ff4b4e3eeda8a328adf1
- JSON archive: reports/i18n/quiz-master-modern-html5/ja/scores/google-gemini-3-flash-preview/2026-05-13T07-33-22-336Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 85 |
| technicalAccuracy | 95 |
| coherence | 70 |
| relevance | 60 |
| translationQuality | 65 |

## Analysis

The translation of the prose and explanations is high quality, maintaining the author's direct and slightly provocative tone. However, there is a major structural failure in the localization of the MDX components: almost all quiz options and titles were left empty or untranslated in the first 13 challenges, rendering the quiz unusable for a Japanese reader. Only the final challenge (index 13) was fully translated.

## Strengths

- Excellent preservation of the author's 'voice' (e.g., '甘んじる覚悟？').
- Accurate technical terminology for HTML5 elements and ARIA attributes.
- Correct handling of MDX slots and code blocks.

## Issues

- high / relevance: Massive omission of content: 'options' arrays and 'title' attributes are empty for challenges 0 through 12. (title=""
  options={[
  ]})
- medium / coherence: Inconsistent localization: Challenge 12 has a translated title but empty options, while Challenge 13 is fully translated. (title="ARIA属性の目的")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 9257 | 374 | 0 | 0 | 3887 | $0.005751 |
