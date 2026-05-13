# Translation Score

- Slug: quiz-master-modern-html5
- Locale: it
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 63.0/100
- Recommendation: polish
- Hash: 4cba59f0a550804a482e1208d5ce40501ec538054e7e4abe7d49518b95ede688
- JSON archive: reports/i18n/quiz-master-modern-html5/it/scores/google-gemini-3-flash-preview/2026-05-13T07-33-23-060Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 90 |
| technicalAccuracy | 45 |
| coherence | 60 |
| relevance | 70 |
| translationQuality | 50 |

## Analysis

The translation of the prose is excellent, capturing Dan's tone perfectly in Italian. However, the technical implementation is severely broken: 13 out of 14 'Challenge' components have had their 'options' arrays and 'title' attributes completely emptied, rendering the quiz non-functional. Only the final challenge contains translated options.

## Strengths

- Natural and engaging Italian prose that preserves the author's direct voice.
- Accurate translation of technical explanations and MDN-style terminology.
- Correct handling of MDX imports and frontmatter structure.

## Issues

- medium / technicalAccuracy: Data loss: The 'options' arrays for challenges 0 through 12 are empty in the translation, meaning the quiz answers are missing. (options: [
  ])
- high / relevance: The 'title' attribute for almost all Challenge components is empty, losing the specific topic header for each question. (title="")
- low / readability: Minor punctuation/spacing inconsistency in the 'role' explanation. (L'attributo `role` descrive

    lo scopo)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 9420 | 406 | 0 | 0 | 3402 | $0.005928 |
