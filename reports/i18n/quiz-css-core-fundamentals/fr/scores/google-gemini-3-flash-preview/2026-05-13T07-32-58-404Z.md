# Translation Score

- Slug: quiz-css-core-fundamentals
- Locale: fr
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 92.0/100
- Recommendation: polish
- Hash: de1c9577b92e433b65fc635adc9926dab7200a39b2c47962c71fe8c1e647220f
- JSON archive: reports/i18n/quiz-css-core-fundamentals/fr/scores/google-gemini-3-flash-preview/2026-05-13T07-32-58-404Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 85 |
| coherence | 95 |
| relevance | 100 |
| translationQuality | 88 |

## Analysis

The translation is generally high quality, maintaining the author's informal yet technical tone. However, a critical technical error exists in Challenge index 5 where the 'options' array was left empty in the translation, rendering that specific quiz question unplayable. Terminology for CSS units and selectors is correctly localized.

## Strengths

- Maintains the 'Dan Levy' voice (e.g., 'Qu'est-ce que ça peut être difficile, hein ?')
- Accurate translation of complex CSS specificity explanations
- Consistent use of technical terms like 'sélecteur de type' and 'combinateur enfant'

## Issues

- high / technicalAccuracy: The 'options' array for Challenge index 5 is empty in the translation but contains 4 options in the source. (options: [
  ])
- low / readability: Inconsistent translation of the string 'HOME' in code examples; sometimes left as 'HOME', once changed to 'ACCUEIL' in the question text but not the code block. (pour le lien "ACCUEIL" dans le HTML suivant ?
```html
<a>HOME</a>)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 9639 | 286 | 0 | 0 | 3113 | $0.005678 |
