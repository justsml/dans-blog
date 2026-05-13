# Translation Score

- Slug: quiz-master-modern-html5
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 68.0/100
- Recommendation: polish
- Hash: d41454cda7cafc529e63da1ba174bbf78361a318575e2efcf9a6e2e998919c37
- JSON archive: reports/i18n/quiz-master-modern-html5/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-33-21-019Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 85 |
| technicalAccuracy | 70 |
| coherence | 60 |
| relevance | 65 |
| translationQuality | 60 |

## Analysis

The translation starts strong with a natural Hindi tone but suffers from a critical technical failure: nearly all `<Challenge>` components (indices 0-12) have empty `options` and `title` arrays/strings. This renders the quiz non-functional in the target language. While the prose translation is high quality and captures the author's voice well, the structural omission of the actual quiz content is a major localization error.

## Strengths

- Excellent use of conversational Hindi that matches the source's direct, slightly provocative tone.
- Accurate translation of technical explanations and MDN-style nuances.
- Preserved MDX structure and code blocks perfectly.

## Issues

- high / technicalAccuracy: The 'options' array and 'title' attribute are empty for almost all challenges, meaning the quiz questions have no selectable answers. (options: [
  ]
>)
- medium / relevance: Missing titles for the quiz sections which were present in the English source. (title: "")
- low / readability: Inconsistent translation of 'Advanced Semantic HTML' (sometimes 'उन्नत सेमेंटिक HTML', sometimes 'एडवांस्ड सेमेंटिक HTML'). (group="एडवांस्ड सेमेंटिक HTML")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 9564 | 312 | 0 | 0 | 3317 | $0.005718 |
