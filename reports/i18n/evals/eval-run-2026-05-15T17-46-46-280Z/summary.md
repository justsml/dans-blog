# Translation Eval Run — 2026-05-15T17-46-46-280Z

**1 passed, 0 failed** | total cost $0.00116
Models: deepseek/deepseek-v4-flash
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T17-46-46-280Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | the-last-to-think | ja | deepseek/deepseek-v4-flash | ✓ | 95.1 | 91.3 | 100 | 95 | 80 | 85 | 100 | 75✗ | 90 | 100 | 95 | 85 | $0.00116 | [txt](translation-article-the-last-to-think-ja-deepseek-deepseek-v4-flash.txt) |

## Score Details

### article:the-last-to-think · ja · deepseek/deepseek-v4-flash ✓
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
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 80 | ✓ | |
| judge:languagePurity | 85 | ✓ | |
| judge:overall | 91 | ✓ | The candidate followed all MDX preservation rules, including the relative path adjustments for assets. The translation i |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The word 'panic' should be in katakana for better readability and consistency in Japanese prose. | medium: The w |