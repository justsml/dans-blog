# Translation Score

- Slug: quiz-modern-css-2025
- Locale: it
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 73.0/100
- Recommendation: polish
- Hash: 51ffeedcebf99eb4295b9e13a1e239f36894c0187ce5d94d8b5f1982699c945f
- JSON archive: reports/i18n/quiz-modern-css-2025/it/scores/google-gemini-3-flash-preview/2026-05-13T07-33-27-871Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 85 |
| technicalAccuracy | 65 |
| coherence | 70 |
| relevance | 75 |
| translationQuality | 70 |

## Analysis

The translation suffers from a major hallucination/copy-paste error in the first Challenge explanation, where content about PostgreSQL 'timestamptz' was inserted into a CSS quiz. While the rest of the technical translation is accurate and uses appropriate Italian terminology (e.g., 'annidamento', 'fase di esecuzione'), this structural failure significantly impacts the score. The MDX structure is preserved, but the content mismatch is a critical quality issue.

## Strengths

- Correct use of Italian technical terminology for CSS features (e.g., 'design responsive', 'selettore per figli diretti').
- Preservation of MDX components and code blocks.

## Issues

- high / technicalAccuracy: Major hallucination/content mismatch in the first explanation slot. (Sono entrambi di 8 byte, ma non memorizzano lo stesso tipo di valore... timestamptz)
- low / coherence: Inconsistent translation of 'Nesting' (used both 'Nidificazione' and 'Annidamento'). (Nidificazione CSS nativa vs Annidamento CSS)
- low / readability: Left English comment inside a CSS code block in the question slot. (/* How do we use --main-color here? */)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 8853 | 433 | 0 | 0 | 4379 | $0.005725 |
