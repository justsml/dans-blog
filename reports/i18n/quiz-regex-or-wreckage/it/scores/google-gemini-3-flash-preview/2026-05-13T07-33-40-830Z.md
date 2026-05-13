# Translation Score

- Slug: quiz-regex-or-wreckage
- Locale: it
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 90.0/100
- Recommendation: polish
- Hash: 5b2b9312d76702651f0b29026607e5d2c33a2f41f192f3db8352ac5f15f4cd89
- JSON archive: reports/i18n/quiz-regex-or-wreckage/it/scores/google-gemini-3-flash-preview/2026-05-13T07-33-40-830Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 85 |
| coherence | 90 |
| relevance | 95 |
| translationQuality | 88 |

## Analysis

The translation is generally high quality, maintaining the author's informal yet technical tone. However, there are critical omissions in the MDX component data (empty options arrays in Challenges 2 and 13) which would break the quiz functionality. The terminology for 'greedy/lazy' is inconsistent, using 'avido/non avido' in some places and 'avido/pigro' in others.

## Strengths

- Excellent preservation of the 'Dan' voice (e.g., 'Anticipazione-infernale' for 'Look-into-hell')
- Natural flow of technical explanations in Italian
- Correct handling of MDX syntax and code blocks

## Issues

- high / technicalAccuracy: The 'options' array is empty in Challenge 2 and Challenge 13, making the quiz unplayable for those questions. (options: [
  ]
>)
- medium / coherence: Inconsistent translation of 'lazy matching'. Used 'non avido', 'pigro', and 'lazy' across different sections. ([Scopri di più sul matching avido vs pigro] vs [Il pattern utilizza il matching lazy])
- low / readability: Occasional use of 'escaped' or 'escappalo' which are common but less formal than 'eseguire l'escape'. (Per corrispondere a un simbolo del dollaro letterale, escappalo)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 12755 | 350 | 0 | 0 | 4346 | $0.007428 |
