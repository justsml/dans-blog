# Translation Score

- Slug: quiz-postgres-sql-mastery-pt1
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 96.6/100
- Recommendation: accept
- Hash: 28c3e554ad62254a84efec6e1418180afe7396e1ba9fc4dcd074d8f95a160873
- JSON archive: reports/i18n/quiz-postgres-sql-mastery-pt1/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-33-30-972Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 95 |
| technicalAccuracy | 98 |
| coherence | 96 |
| relevance | 100 |
| translationQuality | 94 |

## Analysis

The translation is of high quality, effectively capturing the technical nuance and the author's conversational tone. It correctly handles MDX components and preserves code blocks. The Hindi used is natural and technically sound, using appropriate terminology like 'मध्यिका' for median and 'पूर्णांक' for integer while keeping industry-standard terms like 'aggregates' and 'constraints' where appropriate.

## Strengths

- Excellent preservation of MDX structure and component props.
- Natural translation of the author's 'voice' (e.g., 'शेखी बघा सकें' for 'gloat about').
- Accurate handling of technical concepts like 'NOT VALID' constraints and 'timestamptz' semantics.

## Issues

- low / readability: Minor inconsistency in translating 'Postgres Types' group name across challenges (sometimes 'Postgres टाइप्स', 'पोस्टग्रेस टाइप्स', or 'PostgreSQL टाइप्स'). (group="Postgres टाइप्स" vs group="पोस्टग्रेस टाइप्स")
- low / translationQuality: The subtitle 'Does SQL make you squeal?' is translated literally as 'सिर घूमता है' (head spins), which loses the rhyme but keeps the sentiment. (क्या SQL से आपका सिर घूमता है?)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 11237 | 305 | 0 | 0 | 3592 | $0.006534 |
