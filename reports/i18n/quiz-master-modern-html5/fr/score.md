# Translation Score

- Slug: quiz-master-modern-html5
- Locale: fr
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 68.0/100
- Recommendation: polish
- Hash: 29c80ee17cdb7398c49c1cca5ac22d0771b98003a5a3e9d5bb48bf550fc79355
- JSON archive: reports/i18n/quiz-master-modern-html5/fr/scores/google-gemini-3-flash-preview/2026-05-13T07-33-23-382Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 85 |
| technicalAccuracy | 60 |
| coherence | 70 |
| relevance | 70 |
| translationQuality | 55 |

## Analysis

The translation is critically flawed because it omits nearly all quiz options and titles within the MDX `<Challenge>` components. While the prose translation is high quality and captures the author's tone well, the functional part of the technical content (the quiz itself) is missing in 13 out of 14 instances, rendering the interactive component useless. Technical terms and MDX structure are otherwise preserved correctly.

## Strengths

- Excellent preservation of the author's direct and slightly humorous tone.
- Correct localization of MDN links to the French documentation where available.
- High quality of the prose in the 'explanation' slots.

## Issues

- high / relevance: Massive omission of content: 13 out of 14 'options' arrays and 'title' attributes are empty in the translation. (options: [
  ]
>)
- medium / technicalAccuracy: The 'group' names are inconsistently translated (e.g., 'Échauffement' vs 'HTML sémantique avancé' vs 'HTML Sémantique Avancé'). (group="HTML Sémantique Avancé")
- low / readability: Switching between 'tu' (informal) in the intro and 'vous' (formal) in the outro. (Alors, tu penses avoir des compétences... vs ...dans votre prochain projet ?)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 9434 | 339 | 0 | 0 | 4001 | $0.005734 |
