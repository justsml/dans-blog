# Translation Score

- Slug: javascript-promises-quiz
- Locale: fr
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.0/100
- Recommendation: accept
- Hash: 734eb1e636688a3453a626d3c48036dc1e52af12708a7c1d80e9125823b3c6a2
- JSON archive: reports/i18n/javascript-promises-quiz/fr/scores/google-gemini-3-flash-preview/2026-05-13T07-32-39-218Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 95 |
| coherence | 98 |
| relevance | 100 |
| translationQuality | 90 |

## Analysis

The translation is technically sound and maintains the educational tone of the original quiz. It correctly handles MDX components and preserves code integrity. However, there is a minor inconsistency in Challenge #6 where the options were left in English ('print' instead of 'afficher'), whereas other challenges were fully localized.

## Strengths

- Accurate translation of technical concepts like 'executor', 'pending', and 'host environment'.
- Natural use of French typography (e.g., spaces before colons and guillemets).
- Correct adjustment of relative image and asset paths in the frontmatter and body.

## Issues

- medium / translationQuality: Untranslated text in Challenge #6 options. ({text: 'print "SUCCESS!"'})
- low / readability: Slightly inconsistent translation of 'Hint' (sometimes 'Indice', sometimes 'Astuce' in context). (Indice : Les .catch peuvent être utilisés...)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7071 | 342 | 0 | 0 | 3155 | $0.004561 |
