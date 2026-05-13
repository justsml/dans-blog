# Translation Score

- Slug: quiz-do-you-know-esnext
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 93.8/100
- Recommendation: accept
- Hash: 506949ee2b771476f41ef6660115dcc48f1b8c835e45fe0c71c253b42a878221
- JSON archive: reports/i18n/quiz-do-you-know-esnext/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-33-06-806Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 98 |
| coherence | 95 |
| relevance | 90 |
| translationQuality | 94 |

## Analysis

The translation is of high quality, effectively balancing technical terminology with natural Hindi phrasing. It successfully maintains the MDX structure and code integrity. However, it consistently omits the 'hints' slot present in the source, which impacts the completeness of the educational content.

## Strengths

- Excellent use of transliteration for technical terms (e.g., 'नल कोएलेसिंग', 'ऑप्शनल चेनिंग') which is standard in Indian tech circles.
- Natural flow in explanations, making complex JS concepts accessible in Hindi.
- Perfect preservation of MDX components and frontmatter structure.

## Issues

- medium / relevance: The 'hints' slot for every single challenge has been omitted in the translation. (<slot name='hints'>...)
- low / coherence: Inconsistent translation of 'Null Coalescing' - used both English and 'नल कोएलिसिंग' in different titles. (title="Null Coalescing" vs title="नल कोएलिसिंग")

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7412 | 350 | 0 | 0 | 3102 | $0.004756 |
