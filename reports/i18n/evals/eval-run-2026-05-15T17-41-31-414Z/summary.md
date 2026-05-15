# Translation Eval Run — 2026-05-15T17-41-31-414Z

**0 passed, 1 failed** | total cost $0.00202
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T17-41-31-414Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | the-last-to-think | es | openai/gpt-oss-120b:nitro | ✗ | 93.3 | 96.3 | 0✗ | 98 | 90 | 100 | 100 | 95 | 100 | 95 | 92 | $0.00202 | [txt](translation-article-the-last-to-think-es-openai-gpt-oss-120b-nitro.txt) |

## Score Details

### article:the-last-to-think · es · openai/gpt-oss-120b:nitro ✗
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 98 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 96 | ✓ | The candidate followed all MDX constraints, including the specific pathing requirements for assets in locale folders (.. |
| judge:blocking-suggestions | 0 | ✗ medium | high: The verb 'cojear' means 'to limp'. The English source 'hobble' in this context means to impede or cripple. 'Cojear |