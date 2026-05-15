# Translation Eval Run — 2026-05-15T18-37-05-094Z

**0 passed, 1 failed** | total cost $0.00760
Models: minimax/minimax-m2.5:nitro
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T18-37-05-094Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | minimax/minimax-m2.5:nitro | ✗ | 67.7 | 55.0✗ | 0✗ | 40✗ | 60✗ | 90 | 20✗ | 100 | 40✗ | 100 | 50✗ | 40✗ | $0.00760 | translation-article-llm-connection-strings-es-minimax-minimax-m2.5-nitro-assembled |

## Score Details

### article:llm-connection-strings · es · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed H3 headings from 1 to 0. |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 40 | ✗ low | |
| judge:technicalAccuracy | 50 | ✗ low | |
| judge:coherence | 40 | ✗ low | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 40 | ✗ low | |
| judge:mdxPreservation | 20 | ✗ low | |
| judge:culturalAdaptation | 60 | ✗ low | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 55 | ✗ medium | The candidate is severely truncated, missing more than half of the original content including several sections, blockquo |
| judge:blocking-suggestions | 0 | ✗ medium | high: The title contains a typo (:: instead of ://) and the candidate is severely truncated. |
| judge:medium-suggestions | 100 | ✓ | |