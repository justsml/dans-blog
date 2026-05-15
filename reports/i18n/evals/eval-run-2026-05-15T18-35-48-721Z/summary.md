# Translation Eval Run — 2026-05-15T18-35-48-721Z

**0 passed, 10 failed** | total cost $0.07595
Models: minimax/minimax-m2.5:nitro
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T18-35-48-721Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | minimax/minimax-m2.5:nitro | ✗ | 66.7 | 0.0✗ | — | — | — | — | — | — | — | — | — | — | $0.00658 | translation-article-llm-connection-strings-es-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | hi | minimax/minimax-m2.5:nitro | ✗ | 66.7 | 0.0✗ | — | — | — | — | — | — | — | — | — | — | $0.00837 | translation-article-llm-connection-strings-hi-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | ja | minimax/minimax-m2.5:nitro | ✗ | 59.7 | 41.3✗ | 0✗ | 40✗ | 30✗ | 20✗ | 40✗ | 100 | 30✗ | 100 | 50✗ | 20✗ | $0.00653 | translation-article-llm-connection-strings-ja-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | ru | minimax/minimax-m2.5:nitro | ✗ | 62.9 | 51.2✗ | 0✗ | 40✗ | 50✗ | 80 | 20✗ | 100 | 40✗ | 100 | 50✗ | 30✗ | $0.00768 | translation-article-llm-connection-strings-ru-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | de | minimax/minimax-m2.5:nitro | ✗ | 62.5 | 38.8✗ | 100 | 30✗ | 40✗ | 80 | 10✗ | 100 | 30✗ | 50✗ | 40✗ | 30✗ | $0.00751 | translation-article-llm-connection-strings-de-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | fr | minimax/minimax-m2.5:nitro | ✗ | 66.7 | 0.0✗ | — | — | — | — | — | — | — | — | — | — | $0.00733 | translation-article-llm-connection-strings-fr-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | it | minimax/minimax-m2.5:nitro | ✗ | 66.7 | 0.0✗ | — | — | — | — | — | — | — | — | — | — | $0.00757 | translation-article-llm-connection-strings-it-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | ar | minimax/minimax-m2.5:nitro | ✗ | 54.9 | 26.3✗ | 0✗ | 30✗ | 20✗ | 10✗ | 10✗ | 100 | 30✗ | 50✗ | 40✗ | 20✗ | $0.00744 | translation-article-llm-connection-strings-ar-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | he | minimax/minimax-m2.5:nitro | ✗ | 61.7 | 47.5✗ | 0✗ | 30✗ | 50✗ | 80 | 20✗ | 100 | 30✗ | 100 | 40✗ | 30✗ | $0.00960 | translation-article-llm-connection-strings-he-minimax-minimax-m2.5-nitro-assembled |
| article | llm-connection-strings | zh | minimax/minimax-m2.5:nitro | ✗ | 56.9 | 32.5✗ | 0✗ | 30✗ | 40✗ | 40✗ | 10✗ | 100 | 30✗ | 50✗ | 40✗ | 20✗ | $0.00733 | translation-article-llm-connection-strings-zh-minimax-minimax-m2.5-nitro-assembled |

## Score Details

### article:llm-connection-strings · es · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed H2 headings from 6 to 3. |
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
| frontmatter-preserve:modified | 0 | ✗ medium | Expected modified to stay 2026-02-26; got "2026-02-26". |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:overall | 0 | ✗ medium | Judge returned no parseable scores. |
### article:llm-connection-strings · hi · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed H3 headings from 1 to 0. |
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
### article:llm-connection-strings · ja · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:invalid-localized-asset-path | 0 | ✗ high | /llm-connection-strings/ja/index.mdx has 1 inherited asset path(s) that must start with ../ inside locale folders. |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed fenced code block markers from 10 to 4. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed Markdown images from 2 to 1. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed H3 headings from 1 to 0. |
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
| judge:readability | 30 | ✗ low | |
| judge:technicalAccuracy | 50 | ✗ low | |
| judge:coherence | 40 | ✗ low | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 20 | ✗ low | |
| judge:mdxPreservation | 40 | ✗ low | |
| judge:culturalAdaptation | 30 | ✗ low | |
| judge:languagePurity | 20 | ✗ low | |
| judge:overall | 41 | ✗ medium | The candidate is severely flawed, containing mixed languages (English, Chinese, and Korean) within the Japanese prose. I |
| judge:blocking-suggestions | 0 | ✗ medium | high: The protocol scheme should include the double slashes as per the source and technical standards. | high: Mixed Eng |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ru · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/ru/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/ru/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/ru/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/ru/index.mdx changed H3 headings from 1 to 0. |
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
| judge:readability | 40 | ✗ low | |
| judge:technicalAccuracy | 50 | ✗ low | |
| judge:coherence | 40 | ✗ low | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 30 | ✗ low | |
| judge:mdxPreservation | 20 | ✗ low | |
| judge:culturalAdaptation | 50 | ✗ low | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 51 | ✗ medium | The candidate is severely truncated. It stops mid-file, missing the entire 'Anatomy' section, the 'Alternative Formats'  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The title is truncated and contains a typo (-> instead of ://). | high: The candidate truncated about 60% of the a |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · de · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed fenced code block markers from 10 to 6. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed H2 headings from 6 to 4. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed H3 headings from 1 to 0. |
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
| judge:readability | 30 | ✗ low | |
| judge:technicalAccuracy | 40 | ✗ low | |
| judge:coherence | 30 | ✗ low | |
| judge:relevance | 50 | ✗ low | |
| judge:translationQuality | 30 | ✗ low | |
| judge:mdxPreservation | 10 | ✗ low | |
| judge:culturalAdaptation | 40 | ✗ low | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 39 | ✗ medium | The candidate is severely truncated. It missing the introduction, several sections, the anatomy diagram, the alternative |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · fr · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed H3 headings from 1 to 0. |
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
### article:llm-connection-strings · it · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/it/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/it/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/it/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/it/index.mdx changed H3 headings from 1 to 0. |
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
### article:llm-connection-strings · ar · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/ar/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/ar/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/ar/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/ar/index.mdx changed H3 headings from 1 to 0. |
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
| judge:readability | 30 | ✗ low | |
| judge:technicalAccuracy | 40 | ✗ low | |
| judge:coherence | 30 | ✗ low | |
| judge:relevance | 50 | ✗ low | |
| judge:translationQuality | 20 | ✗ low | |
| judge:mdxPreservation | 10 | ✗ low | |
| judge:culturalAdaptation | 20 | ✗ low | |
| judge:languagePurity | 10 | ✗ low | |
| judge:overall | 26 | ✗ medium | The candidate is severely flawed. It contains leaked Chinese characters ('这不是'), leaves large blocks of English source t |
| judge:blocking-suggestions | 0 | ✗ medium | high: The candidate leaked Chinese text ('这不是') into the Arabic translation. | high: The candidate left the original Eng |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · he · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/he/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/he/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/he/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/he/index.mdx changed H3 headings from 1 to 0. |
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
| judge:readability | 30 | ✗ low | |
| judge:technicalAccuracy | 40 | ✗ low | |
| judge:coherence | 30 | ✗ low | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 30 | ✗ low | |
| judge:mdxPreservation | 20 | ✗ low | |
| judge:culturalAdaptation | 50 | ✗ low | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 48 | ✗ medium | The candidate is unusable as it is severely truncated. It cuts off mid-sentence/mid-code block and misses approximately  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The candidate is severely truncated, missing more than half of the content including several sections, the blockqu |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · zh · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/zh/index.mdx changed fenced code block markers from 10 to 5. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/zh/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/zh/index.mdx changed H2 headings from 6 to 2. |
| integrity:heading-h3-count | 0 | ✗ high | /llm-connection-strings/zh/index.mdx changed H3 headings from 1 to 0. |
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
| judge:readability | 30 | ✗ low | |
| judge:technicalAccuracy | 40 | ✗ low | |
| judge:coherence | 30 | ✗ low | |
| judge:relevance | 50 | ✗ low | |
| judge:translationQuality | 20 | ✗ low | |
| judge:mdxPreservation | 10 | ✗ low | |
| judge:culturalAdaptation | 40 | ✗ low | |
| judge:languagePurity | 40 | ✗ low | |
| judge:overall | 33 | ✗ medium | The candidate is severely flawed. It contains a Russian word ('глядит') in the Chinese text, it truncated more than half |
| judge:blocking-suggestions | 0 | ✗ medium | high: The title is corrupted with '->' and missing quotes from the source. | high: The candidate contains a Russian word |
| judge:medium-suggestions | 100 | ✓ | |