# Translation Score

- Slug: your-laptop-is-the-breach
- Locale: es
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 93.8/100
- Recommendation: accept
- Hash: 1f353adaced8f9249c7d50de525e59247a6851ee1990213c9cb88b0dd03e0ed6
- JSON archive: reports/i18n/your-laptop-is-the-breach/es/scores/google-gemini-3-flash-preview/2026-05-13T07-31-51-806Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 98 |
| coherence | 95 |
| relevance | 90 |
| translationQuality | 94 |

## Analysis

The translation is technically excellent, maintaining the punchy, authoritative tone of the original. It correctly handles security terminology (infostealers, canary tokens, sandboxing) and preserves MDX structure. However, the frontmatter 'title' and 'subTitle' keys were left empty in the translation, which is a significant omission for a production-ready article.

## Strengths

- Preserves the direct, cynical 'security voice' of the author.
- Accurate translation of complex technical concepts like 'outbound firewall' and 'scoped credentials'.
- Excellent localization of idiomatic technical phrases (e.g., 'habitual engineering discipline' to 'disciplina de ingeniería habitual').

## Issues

- high / relevance: Frontmatter title and subTitle are empty strings. (title: ''
subTitle: '')
- low / readability: Inconsistent use of 'tú' vs 'usted' in the intro section. (antes de que usted lo note... Tan solo como tú.)
- low / technicalAccuracy: Typo in table header. (Artifactor local)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 10520 | 401 | 0 | 0 | 4050 | $0.006463 |
