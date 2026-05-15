# Translation Eval Run — 2026-05-15T17-42-24-698Z

**0 passed, 1 failed** | total cost $0.00151
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T17-42-24-698Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | the-last-to-think | es | openai/gpt-oss-120b:nitro | ✗ | 89.4 | 97.5 | 0✗ | 100 | 92 | 100 | 100 | 95 | 100 | 98 | 95 | $0.00151 | [txt](translation-article-the-last-to-think-es-openai-gpt-oss-120b-nitro.txt) |

## Score Details

### article:the-last-to-think · es · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:invalid-localized-asset-path | 0 | ✗ high | /the-last-to-think/es/index.mdx has 4 inherited asset path(s) that must start with ../ inside locale folders. |
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
| judge:technicalAccuracy | 98 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 92 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent, preserving the tone and structure of the original text perfectly. It maintains all MDX com |
| judge:blocking-suggestions | 0 | ✗ medium | medium: The English idiom 'set your watch by' refers to punctuality/predictability, which is better captured by 'poner e |