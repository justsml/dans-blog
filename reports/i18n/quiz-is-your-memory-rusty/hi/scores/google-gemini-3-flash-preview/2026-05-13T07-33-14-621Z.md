# Translation Score

- Slug: quiz-is-your-memory-rusty
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 94.2/100
- Recommendation: accept
- Hash: 2ef6bf4d6aecba8881cb0a0a4cf8b9572132a6ac001ba37b26cfbb3e3fa3fd3c
- JSON archive: reports/i18n/quiz-is-your-memory-rusty/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-33-14-621Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 95 |
| coherence | 94 |
| relevance | 100 |
| translationQuality | 90 |

## Analysis

The translation is technically robust and maintains the structural integrity of the MDX components. It successfully adapts complex Rust concepts like 'Ownership' and 'Borrowing' into Hindi while keeping the technical terms accessible. The tone remains direct and educational, consistent with the source.

## Strengths

- Excellent preservation of MDX slots and component attributes.
- Accurate translation of technical hints and explanations without losing the nuance of Rust's compiler behavior.
- Natural phrasing for complex concepts like 'Zero-Cost Abstractions' (शून्य-लागत अमूर्तन).

## Issues

- low / readability: Some English comments inside code blocks were left untranslated, though this is often preferred for code consistency. (// What happens to our wisdom?)
- low / translationQuality: The translation of 'Borrow check yo self' is a bit literal; while creative, the slang nuance is difficult to capture in Hindi. ((Borrow) चेक: पहले खुद को जांचो)
- low / technicalAccuracy: Missing options in Challenge index 4, 5, and 13 in the translation block compared to the source. (options={[
  ]})

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 27114 | 408 | 0 | 0 | 3547 | $0.014781 |
