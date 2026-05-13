# Translation Score

- Slug: quiz-postgres-sql-mastery-pt2
- Locale: fr
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 90.0/100
- Recommendation: polish
- Hash: 00a8af8576d43495f0d6c4022eaa0ce9bff770f11bb1a1696618643706f1c8af
- JSON archive: reports/i18n/quiz-postgres-sql-mastery-pt2/fr/scores/google-gemini-3-flash-preview/2026-05-13T07-33-35-074Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 85 |
| coherence | 90 |
| relevance | 95 |
| translationQuality | 88 |

## Analysis

The translation is high quality with a natural French technical tone ('SQL en guimauve' is a great idiomatic touch). However, there are critical omissions in the MDX components: two `Challenge` components (index 4 and 8) have empty `options` arrays, rendering those quiz questions unplayable in the translated version. Technical terminology is handled correctly throughout.

## Strengths

- Excellent localization of idioms (e.g., 'SQL d'acier' vs 'SQL en guimauve').
- Consistent use of technical terms like 'littéraux de chaîne' and 'identifiants'.
- Maintains the author's encouraging and slightly playful voice.

## Issues

- high / technicalAccuracy: The 'options' array for Challenge index 4 (Hash Join) is empty in the translation. (options=[
  ]
>)
- high / technicalAccuracy: The 'options' array for Challenge index 8 (TABLESAMPLE) is empty in the translation. (options=[
  ]
>)
- low / readability: Inconsistent use of 'tu' vs 'vous' in the conclusion vs the introduction. (Bien joué ! Tu es allé en profondeur... vs Bienvenue dans la Partie 2 de mon Quiz)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 11133 | 436 | 0 | 0 | 3865 | $0.006875 |
