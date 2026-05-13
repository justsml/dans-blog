# Translation Score

- Slug: quiz-bash-in-the-shell
- Locale: de
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 90.0/100
- Recommendation: polish
- Hash: dc84bb1674cf1843dd23f63b97f0cb422c71b4a97e4119fe49bcc90a3944d273
- JSON archive: reports/i18n/quiz-bash-in-the-shell/de/scores/google-gemini-3-flash-preview/2026-05-13T07-32-49-988Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 88 |
| coherence | 90 |
| relevance | 95 |
| translationQuality | 85 |

## Analysis

The translation captures Dan's informal yet technical tone well. However, there are critical omissions in the MDX components: the 'options' arrays for Challenge 9 and Challenge 15 are empty in the translation, rendering those quiz questions unplayable. Technical terms like 'expansion' and 'escaping' are handled correctly in context.

## Strengths

- Excellent adaptation of the 'voice' (e.g., 'verarschen wollen', 'durchgerüttelt')
- Accurate translation of complex shell explanations
- Consistent use of German technical terminology (Ganzzahl-Arithmetik, Befehlssubstitution)

## Issues

- high / technicalAccuracy: Missing quiz options for Challenge index 9 and 15. (options={[
  ]})
- medium / translationQuality: Inconsistent translation of 'Standard In/Out' group name; it was translated in the title but left as 'Standard In/Out' or changed to 'Standardeingabe/-ausgabe' inconsistently. (group="Standardeingabe/-ausgabe")
- low / readability: The term 'Warmup' is translated as 'Einstieg' in one place and 'Aufwärmen' in another. (group="Einstieg" ... group="Aufwärmen: Expansion")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 12180 | 325 | 0 | 0 | 3931 | $0.007065 |
