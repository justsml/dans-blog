# Translation Eval Run — 2026-05-15T19-44-17-828Z

**0 passed, 3 failed** | total cost $0.01979
Models: deepseek/deepseek-v4-flash
Judge: qwen/qwen3.6-flash
Run log: reports/i18n/evals/eval-run-2026-05-15T19-44-17-828Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| quiz | quiz-modern-css-2025 | es | deepseek/deepseek-v4-flash | ✗ | 94.8 | 95.0 | 0✗ | 95 | 90 | 95 | 95 | 100 | 95 | 100 | 95 | 95 | $0.00591 | translation-quiz-quiz-modern-css-2025-es-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | ru | deepseek/deepseek-v4-flash | ✗ | 93.0 | 89.4 | 0✗ | 90 | 90 | 82 | 85 | 100 | 92 | 100 | 88 | 88 | $0.00745 | translation-quiz-quiz-modern-css-2025-ru-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | zh | deepseek/deepseek-v4-flash | ✗ | 94.4 | 0.0✗ | — | — | — | — | — | — | — | — | — | — | $0.00643 | translation-quiz-quiz-modern-css-2025-zh-deepseek-deepseek-v4-flash-assembled |

## Score Details

### quiz:quiz-modern-css-2025 · es · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:subCategory | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:label | 100 | ✓ | |
| frontmatter-preserve:modified | 100 | ✓ | |
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 95 | ✓ | The candidate delivers a highly accurate and natural Spanish translation that faithfully preserves all MDX structure, Ch |
| judge:blocking-suggestions | 0 | ✗ medium | high: YAML requires quotes for strings containing special characters like ? and - to prevent parsing errors in Astro/MDX |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · ru · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:subCategory | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:label | 100 | ✓ | |
| frontmatter-preserve:modified | 100 | ✓ | |
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 92 | ✓ | |
| judge:technicalAccuracy | 88 | ✓ | |
| judge:coherence | 90 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 88 | ✓ | |
| judge:mdxPreservation | 85 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 82 | ✓ | |
| judge:overall | 89 | ✓ | Strong technical translation that preserves Dan's direct tone and MDX structure. Frontmatter paths and import depths are |
| judge:blocking-suggestions | 0 | ✗ medium | high: Untranslated reader-facing option in Challenge 3 | high: Untranslated correct option in Challenge 3 | high: Untran |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · zh · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:subCategory | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:label | 100 | ✓ | |
| frontmatter-preserve:modified | 100 | ✓ | |
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:overall | 0 | ✗ medium | Judge returned no parseable scores. |