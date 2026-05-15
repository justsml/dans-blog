# Translation Eval Run — 2026-05-15T18-34-47-135Z

**0 passed, 1 failed** | total cost $0.00679
Models: minimax/minimax-m2.5:nitro
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T18-34-47-135Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge |  | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- |  | --- | --- |
| article | llm-connection-strings | es | minimax/minimax-m2.5:nitro | ✗ | 70.6 | 0.0✗ | $0.00679 | translation-article-llm-connection-strings-es-minimax-minimax-m2.5-nitro-assembled |

## Score Details

### article:llm-connection-strings · es · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed fenced code block markers from 10 to 4. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed Markdown images from 2 to 1. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed H2 headings from 6 to 4. |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:modified | 0 | ✗ medium | Expected modified to stay 2026-02-26; got "2026-02-26". |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:overall | 0 | ✗ medium | Judge returned no parseable scores. |