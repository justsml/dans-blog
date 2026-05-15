# Translation Eval Run — 2026-05-15T18-21-07-814Z

**0 passed, 10 failed** | total cost $0.03458
Models: minimax/minimax-m2.5:nitro
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T18-21-07-814Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | minimax/minimax-m2.5:nitro | ✗ | 60.0 | 20.0✗ | 100 | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 5✗ | $0.00307 | [txt](translation-article-llm-connection-strings-es-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | hi | minimax/minimax-m2.5:nitro | ✗ | 81.7 | 87.5 | 100 | 100 | 100 | 100 | 50✗ | 100 | 100 | 100 | 100 | 50✗ | $0.00562 | [txt](translation-article-llm-connection-strings-hi-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | ja | minimax/minimax-m2.5:nitro | ✗ | 60.0 | 20.0✗ | 100 | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 5✗ | $0.00286 | [txt](translation-article-llm-connection-strings-ja-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | ru | minimax/minimax-m2.5:nitro | ✗ | 60.0 | 20.0✗ | 100 | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 5✗ | $0.00325 | [txt](translation-article-llm-connection-strings-ru-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | de | minimax/minimax-m2.5:nitro | ✗ | 60.0 | 20.0✗ | 100 | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 5✗ | $0.00328 | [txt](translation-article-llm-connection-strings-de-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | fr | minimax/minimax-m2.5:nitro | ✗ | 60.2 | 20.6✗ | 100 | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 10✗ | $0.00296 | [txt](translation-article-llm-connection-strings-fr-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | it | minimax/minimax-m2.5:nitro | ✗ | 80.1 | 93.8 | 0✗ | 100 | 100 | 100 | 50✗ | 100 | 100 | 100 | 100 | 100 | $0.00301 | [txt](translation-article-llm-connection-strings-it-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | ar | minimax/minimax-m2.5:nitro | ✗ | 56.4 | 20.0✗ | 0✗ | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 5✗ | $0.00296 | [txt](translation-article-llm-connection-strings-ar-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | he | minimax/minimax-m2.5:nitro | ✗ | 60.2 | 20.6✗ | 100 | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 10✗ | $0.00500 | [txt](translation-article-llm-connection-strings-he-minimax-minimax-m2.5-nitro.txt) |
| article | llm-connection-strings | zh | minimax/minimax-m2.5:nitro | ✗ | 60.0 | 20.0✗ | 100 | 10✗ | 10✗ | 100 | 5✗ | 100 | 10✗ | 10✗ | 10✗ | 5✗ | $0.00256 | [txt](translation-article-llm-connection-strings-zh-minimax-minimax-m2.5-nitro.txt) |

## Score Details

### article:llm-connection-strings · es · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/es/index.mdx changed H2 headings from 6 to 0. |
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
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 5 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 20 | ✗ medium | The candidate is completely unusable as it only contains a partial frontmatter and has truncated the entire body of the  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · hi · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 50 | ✗ low | |
| judge:mdxPreservation | 50 | ✗ low | |
| judge:culturalAdaptation | 100 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 88 | ✓ | The candidate is completely unusable as it only contains the frontmatter and has truncated the entire body of the articl |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ja · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 5 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 20 | ✗ medium | The candidate is completely unusable as it only translated the frontmatter and then truncated the entire body of the art |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ru · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/ru/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/ru/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/ru/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 5 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 20 | ✗ medium | The candidate is severely truncated. It only contains the frontmatter and none of the actual article content. However, a |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · de · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 5 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 20 | ✗ medium | The candidate is critically incomplete. It only translated the frontmatter and then truncated the entire body of the art |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · fr · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 10 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 21 | ✗ medium | The candidate is severely truncated. It only contains the frontmatter and none of the actual article content. However, a |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · it · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/it/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/it/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/it/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 100 | ✓ | |
| judge:mdxPreservation | 50 | ✗ low | |
| judge:culturalAdaptation | 100 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 94 | ✓ | The candidate failed significantly by providing only the frontmatter and truncating the entire body of the article. Howe |
| judge:blocking-suggestions | 0 | ✗ medium | high: The candidate provided only the frontmatter and truncated the entire body of the article. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ar · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/ar/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/ar/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/ar/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 5 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 20 | ✗ medium | The candidate is severely truncated. It only translated the frontmatter and stopped immediately, failing to provide the  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The candidate is incomplete and only contains the frontmatter, missing the entire body of the article. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · he · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/he/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/he/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/he/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 10 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 21 | ✗ medium | The candidate is severely truncated. It only contains a partial frontmatter and no body content. However, as it is the o |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · zh · minimax/minimax-m2.5:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/zh/index.mdx changed fenced code block markers from 10 to 0. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/zh/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/zh/index.mdx changed H2 headings from 6 to 0. |
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
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 10 | ✗ low | |
| judge:coherence | 10 | ✗ low | |
| judge:relevance | 10 | ✗ low | |
| judge:translationQuality | 5 | ✗ low | |
| judge:mdxPreservation | 5 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 20 | ✗ medium | The candidate is severely truncated, containing only the frontmatter and no body content. However, as it is the only sel |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |