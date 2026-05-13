# Translation Score

- Slug: javascript-promises-quiz
- Locale: ru
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 94.2/100
- Recommendation: accept
- Hash: c1af1e5806399cddcf0dbfdeec6fa8592756f75ae618a21a0c6604ec3dae49d0
- JSON archive: reports/i18n/javascript-promises-quiz/ru/scores/google-gemini-3-flash-preview/2026-05-13T07-32-39-887Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 95 |
| coherence | 98 |
| relevance | 96 |
| translationQuality | 90 |

## Analysis

The translation is high quality, maintaining the technical nuance of JavaScript Promises while adapting the tone for a Russian-speaking developer audience. It correctly handles MDX components and frontmatter. However, there is a minor inconsistency in Question 7 where the answer options were left in English, and some technical terms like 'Promise Gotchas' were left untranslated in the frontmatter while others were localized.

## Strengths

- Accurate translation of complex technical explanations (e.g., the behavior of the Promise constructor).
- Natural use of Russian technical jargon (e.g., 'колбэк', 'цепочки', 'среда выполнения').
- Preservation of MDX structure and component props.

## Issues

- medium / translationQuality: Answer options in Challenge index 7 were left entirely in English. ({text: 'print "SUCCESS!"'})
- low / readability: Inconsistent localization of the 'label' field in frontmatter compared to the title. (label: Promise Gotchas)
- low / technicalAccuracy: The translation of 'The Fails!' to 'Провал!' in the final question options is fine, but the code itself still uses 'The fails!', which might slightly confuse beginners looking for exact string matches. ({text: 'выводит "Провал!"', isAnswer: true})

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7073 | 449 | 0 | 0 | 3793 | $0.004883 |
