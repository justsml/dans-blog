# Translation Score

- Slug: llm-generative-ui-landscape-2026
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 90.0/100
- Recommendation: accept
- Hash: 754ac1fc6d340710a4a8ac47a901c54e0f6a25593a43875f3468ea8c0de6730e
- JSON archive: reports/i18n/llm-generative-ui-landscape-2026/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-31-38-166Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 88 |
| technicalAccuracy | 92 |
| coherence | 90 |
| relevance | 95 |
| translationQuality | 85 |

## Analysis

The translation is technically robust, correctly handling complex concepts like 'sandboxed iframes' and 'event protocols' in Hindi. It maintains the structural integrity of the MDX, including frontmatter and code blocks. However, there is some inconsistency in terminology (e.g., 'Component' is translated as both 'घटक' and 'कॉम्पोनेंट') and a few minor grammatical awkwardnesses in complex technical sentences.

## Strengths

- Excellent preservation of technical nuance in Pattern descriptions.
- Accurate translation of security-related warnings (XSS, CSP, sandboxing).
- Consistent handling of MDX metadata and structural elements.

## Issues

- low / coherence: Inconsistent translation of 'Component'. (घटक vs कॉम्पोनेंट)
- low / readability: Transliteration of 'hallucination' as 'हॉलूसिनेशन' is technically correct but feels non-native in some contexts. (हॉलूसिनेटेड संरचना)
- medium / relevance: The title and subtitle in the frontmatter were left empty. (title: ''
subTitle: '')

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 19275 | 403 | 0 | 0 | 3880 | $0.010847 |
