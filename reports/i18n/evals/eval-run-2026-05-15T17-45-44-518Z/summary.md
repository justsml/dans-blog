# Translation Eval Run — 2026-05-15T17-45-44-518Z

**0 passed, 1 failed** | total cost $0.00067
Models: deepseek/deepseek-v4-flash
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T17-45-44-518Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | the-last-to-think | ja | deepseek/deepseek-v4-flash | ✗ | 92.7 | 94.0 | 0✗ | 95 | 85 | 95 | 100 | 100 | 90 | 100 | 95 | 92 | $0.00067 | [txt](translation-article-the-last-to-think-ja-deepseek-deepseek-v4-flash.txt) |

## Score Details

### article:the-last-to-think · ja · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-language | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:subCategory | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:date | 100 | ✓ | |
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 90 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 94 | ✓ | The candidate followed all MDX preservation rules, including the correct relative pathing for assets (../). The translat |
| judge:blocking-suggestions | 0 | ✗ medium | high: The term 'juvenile delinquency' was left untranslated in the middle of a Japanese sentence, which breaks language  |
| judge:medium-suggestions | 100 | ✓ | |