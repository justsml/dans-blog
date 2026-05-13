# Translation Score

- Slug: quiz-master-modern-html5
- Locale: ru
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 68.0/100
- Recommendation: polish
- Hash: 22c531b696321b343176acbf5bf20873b357b5aa27750fb2e61f989bf7bafbc6
- JSON archive: reports/i18n/quiz-master-modern-html5/ru/scores/google-gemini-3-flash-preview/2026-05-13T07-33-21-954Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 85 |
| technicalAccuracy | 60 |
| coherence | 70 |
| relevance | 70 |
| translationQuality | 55 |

## Analysis

The translation is critically incomplete. While the prose and explanations are well-translated into natural Russian, almost all quiz options (the 'options' array in MDX) and most 'title' attributes for the Challenge components are empty strings, rendering the quiz non-functional. The technical terminology used in the translated portions is accurate.

## Strengths

- Natural and direct technical tone in the intro and outro.
- Accurate translation of complex semantic explanations.
- Correct preservation of MDX structure and code blocks.

## Issues

- high / relevance: The majority of quiz options and challenge titles are missing/empty in the translation. (options: [
  ]
>)
- medium / technicalAccuracy: Untranslated technical strings inside the explanation blocks. (показывают `percent of completion`)
- low / coherence: Inconsistent translation of 'Advanced Semantic HTML' group name across different challenges. (Продвинутый семантический HTML vs Продвинутая семантика HTML)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 9375 | 265 | 0 | 0 | 3474 | $0.005483 |
