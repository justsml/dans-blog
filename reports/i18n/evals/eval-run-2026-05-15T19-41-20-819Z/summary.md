# Translation Eval Run — 2026-05-15T19-41-20-819Z

**2 passed, 1 failed** | total cost $0.02029
Models: deepseek/deepseek-v4-flash
Judge: openai/gpt-oss-120b:nitro
Run log: reports/i18n/evals/eval-run-2026-05-15T19-41-20-819Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| quiz | quiz-modern-css-2025 | es | deepseek/deepseek-v4-flash | ✓ | 98.4 | 95.1 | 100 | 95 | 90 | 97 | 99 | 100 | 92 | 96 | 98 | 94 | $0.00693 | translation-quiz-quiz-modern-css-2025-es-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | ru | deepseek/deepseek-v4-flash | ✗ | 93.2 | 90.0 | 0✗ | 90 | 80 | 85 | 100 | 100 | 90 | 95 | 95 | 85 | $0.00756 | translation-quiz-quiz-modern-css-2025-ru-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | zh | deepseek/deepseek-v4-flash | ✓ | 98.1 | 94.0 | 100 | 94 | 90 | 94 | 98 | 100 | 92 | 95 | 96 | 93 | $0.00580 | translation-quiz-quiz-modern-css-2025-zh-deepseek-deepseek-v4-flash-assembled |

## Score Details

### quiz:quiz-modern-css-2025 · es · deepseek/deepseek-v4-flash ✓
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
| judge:technicalAccuracy | 98 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 96 | ✓ | |
| judge:translationQuality | 94 | ✓ | |
| judge:mdxPreservation | 99 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 97 | ✓ | |
| judge:overall | 95 | ✓ | The candidate preserves the MDX structure, headings, and quiz component props exactly, with accurate technical translati |
| judge:blocking-suggestions | 100 | ✓ | |
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
| judge:readability | 90 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 90 | ✓ | |
| judge:relevance | 95 | ✓ | |
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 80 | ✓ | |
| judge:languagePurity | 85 | ✓ | |
| judge:overall | 90 | ✓ | The candidate translation is technically accurate, preserves MDX structure, and reads naturally in Russian. The only cri |
| judge:blocking-suggestions | 0 | ✗ medium | high: Maintain the original English group identifier for consistency with the source. | high: Group prop values are part |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · zh · deepseek/deepseek-v4-flash ✓
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
| judge:technicalAccuracy | 96 | ✓ | |
| judge:coherence | 94 | ✓ | |
| judge:relevance | 95 | ✓ | |
| judge:translationQuality | 93 | ✓ | |
| judge:mdxPreservation | 98 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 94 | ✓ | |
| judge:overall | 94 | ✓ | The candidate preserves all MDX structure, headings, and Challenge props exactly, with accurate technical translations a |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |