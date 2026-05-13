# Translation Score

- Slug: quiz-sql-query-fundamentals
- Locale: ja
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 93.0/100
- Recommendation: polish
- Hash: 7d4f088679ae69b763b287ce3d5d00fd4ee968119d99d5107742899923006aa3
- JSON archive: reports/i18n/quiz-sql-query-fundamentals/ja/scores/google-gemini-3-flash-preview/2026-05-13T07-33-40-769Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 88 |
| coherence | 95 |
| relevance | 100 |
| translationQuality | 90 |

## Analysis

The translation is generally high quality, maintaining the technical nuance and the author's direct tone. However, a critical data corruption issue exists in the first challenge's code options. The Japanese flow is natural for a technical audience, and terminology like '相関サブクエリ' and '集約関数' is correctly applied.

## Strengths

- Natural localization of the intro text ('スキル面で甘くなっていませんか？').
- Consistent use of technical terminology across all quiz components.
- Accurate translation of complex explanations like the 'IN' operator and 'COALESCE'.

## Issues

- high / technicalAccuracy: The correct answer option for the first challenge is truncated/corrupted, making the quiz item broken. ({text: 'SELECT * FROM users WHERE name = "', isAnswer: true})
- low / readability: Inconsistent spacing in group names (e.g., 'SQL 基礎' vs 'SQL基礎'). (group="SQL 基礎")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 6791 | 352 | 0 | 0 | 3650 | $0.004451 |
