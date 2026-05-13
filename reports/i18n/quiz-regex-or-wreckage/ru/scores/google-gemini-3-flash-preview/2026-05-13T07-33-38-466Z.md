# Translation Score

- Slug: quiz-regex-or-wreckage
- Locale: ru
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.8/100
- Recommendation: accept
- Hash: 36ff35663a27fe832c91458e9453a617b3ed39d20355ded8a6aa03f7dfeed35a
- JSON archive: reports/i18n/quiz-regex-or-wreckage/ru/scores/google-gemini-3-flash-preview/2026-05-13T07-33-38-466Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 95 |
| coherence | 98 |
| relevance | 100 |
| translationQuality | 94 |

## Analysis

The translation is high quality, maintaining the technical nuance and the author's playful tone. It correctly handles MDX components and technical terminology (e.g., 'look-around assertions' as 'look-around утверждения'). There is a minor formatting issue in Challenge 3 where double backslashes were introduced in the explanation text, and Challenge 2/13 have empty options arrays in the translation provided.

## Strengths

- Excellent adaptation of the informal technical voice ('укротить дикий RegEx', 'Заглядывание в ад')
- Consistent use of Russian technical terms for RegEx concepts (захватывающие группы, квантификаторы, экранирование)
- Preservation of all MDX structural elements and links

## Issues

- medium / technicalAccuracy: Double backslashes introduced in explanation text for Challenge 3, which might confuse readers looking at the code context. (Шаблон \\w+ соответствует...)
- low / readability: Challenge 2 and 13 have empty 'options' arrays in the translation, though the source had them populated. (options: [
  ])
- low / readability: Inconsistent translation of 'Look-ahead' - sometimes 'Опережающая проверка', sometimes 'Опережающий просмотр'. (group="Опережающая проверка" vs title="Отрицательный опережающий просмотр")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 12817 | 349 | 0 | 0 | 3950 | $0.007456 |
