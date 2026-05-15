# Translation Eval Run — 2026-05-15T18-17-50-381Z

**2 passed, 8 failed** | total cost $0.02366
Models: qwen/qwen3-32b:nitro
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T18-17-50-381Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | qwen/qwen3-32b:nitro | ✓ | 98.0 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00243 | [txt](translation-article-llm-connection-strings-es-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | hi | qwen/qwen3-32b:nitro | ✗ | 54.6 | 14.4✗ | 0✗ | 5✗ | 10✗ | 10✗ | 30✗ | 100 | 10✗ | 20✗ | 20✗ | 10✗ | $0.00317 | [txt](translation-article-llm-connection-strings-hi-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | ja | qwen/qwen3-32b:nitro | ✗ | 92.2 | 93.1 | 0✗ | 95 | 85 | 90 | 100 | 75✗ | 90 | 100 | 95 | 90 | $0.00230 | [txt](translation-article-llm-connection-strings-ja-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | ru | qwen/qwen3-32b:nitro | ✗ | 93.2 | 95.6 | 0✗ | 95 | 90 | 98 | 100 | 75✗ | 95 | 100 | 95 | 92 | $0.00239 | [txt](translation-article-llm-connection-strings-ru-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | de | qwen/qwen3-32b:nitro | ✗ | 93.9 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00226 | [txt](translation-article-llm-connection-strings-de-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | fr | qwen/qwen3-32b:nitro | ✗ | 93.9 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00225 | [txt](translation-article-llm-connection-strings-fr-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | it | qwen/qwen3-32b:nitro | ✗ | 93.9 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00239 | [txt](translation-article-llm-connection-strings-it-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | ar | qwen/qwen3-32b:nitro | ✗ | 90.8 | 89.4 | 0✗ | 90 | 80 | 85 | 100 | 75✗ | 85 | 100 | 90 | 85 | $0.00229 | [txt](translation-article-llm-connection-strings-ar-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | he | qwen/qwen3-32b:nitro | ✗ | 75.2 | 45.0✗ | 0✗ | 40✗ | 20✗ | 20✗ | 90 | 100 | 30✗ | 80 | 50✗ | 30✗ | $0.00218 | [txt](translation-article-llm-connection-strings-he-qwen-qwen3-32b-nitro.txt) |
| article | llm-connection-strings | zh | qwen/qwen3-32b:nitro | ✓ | 99.3 | 98.1 | 100 | 100 | 95 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00199 | [txt](translation-article-llm-connection-strings-zh-qwen-qwen3-32b-nitro.txt) |

## Score Details

### article:llm-connection-strings · es · qwen/qwen3-32b:nitro ✓
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The candidate followed all technical constraints, including the specific pathing requirements for assets in locale folde |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is an English idiom; while 'tocar césped' is gaining traction online, 'sal a que te dé el aire' or |
### article:llm-connection-strings · hi · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed fenced code block markers from 10 to 2. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/hi/index.mdx changed H2 headings from 6 to 1. |
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
| judge:readability | 10 | ✗ low | |
| judge:technicalAccuracy | 20 | ✗ low | |
| judge:coherence | 5 | ✗ low | |
| judge:relevance | 20 | ✗ low | |
| judge:translationQuality | 10 | ✗ low | |
| judge:mdxPreservation | 30 | ✗ low | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 10 | ✗ low | |
| judge:overall | 14 | ✗ medium | The candidate is severely broken. It entered an infinite repetition loop (hallucination/degradation) in the middle of th |
| judge:blocking-suggestions | 0 | ✗ medium | high: The model entered an infinite loop repeating a phrase and failed to translate the rest of the document. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ja · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 90 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 90 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 93 | ✓ | The candidate followed all MDX structural requirements, including heading counts and asset path adjustments (../). It ca |
| judge:blocking-suggestions | 0 | ✗ medium | high: The candidate leaked Cyrillic characters ('педantic') and the idiom 'touch grass' is translated too literally ('草を |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Dare I say' was translated as 'not knowing fear', which is a literal but incorrect interpretation of the idiom  |
### article:llm-connection-strings · ru · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 98 | ✓ | |
| judge:overall | 96 | ✓ | The translation is technically accurate and preserves all MDX structures, including the required path adjustments (../). |
| judge:blocking-suggestions | 0 | ✗ medium | high: Grammar: 'рухнуть' is intransitive; 'обрушить' is transitive. Also 'production' is better translated as 'рабочая'  |
| judge:medium-suggestions | 75 | ✗ low | medium: The original 'vibe-year' is a play on 'light-year' or 'dog-year'. 'Полвайба' loses the 'year' component of the j |
### article:llm-connection-strings · de · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is technically accurate and preserves all MDX structures, including the heading counts and asset paths.  |
| judge:blocking-suggestions | 0 | ✗ medium | high: Grammar error and missing 'single' nuance from the source 'Pass a single argument'. |
| judge:medium-suggestions | 75 | ✗ low | medium: Grammar: 'Schublade' is feminine, so it should be 'Eine unordentliche'. |
### article:llm-connection-strings · fr · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The candidate followed all instructions, including the relative path adjustment for assets (../) and heading preservatio |
| judge:blocking-suggestions | 0 | ✗ medium | high: The date format should match the English source (YYYY-MM-DD) to maintain consistency in frontmatter. |
| judge:medium-suggestions | 75 | ✗ low | medium: While 'toucher l'herbe' is a literal translation of 'touch grass', 'toucher de l'herbe' is slightly more idiomat |
### article:llm-connection-strings · it · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It follows all MDX preserva |
| judge:blocking-suggestions | 0 | ✗ medium | high: 'Caccio' is technically correct but sounds like 'I hunt' in a literal sense; 'vado a caccia di' is the more natura |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is an English internet idiom. While 'toccare l'erba' is gaining traction, a more natural Italian e |
### article:llm-connection-strings · ar · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 85 | ✓ | |
| judge:technicalAccuracy | 90 | ✓ | |
| judge:coherence | 90 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 80 | ✓ | |
| judge:languagePurity | 85 | ✓ | |
| judge:overall | 89 | ✓ | The candidate followed all MDX structural requirements, including heading counts and asset path adjustments (../). Howev |
| judge:blocking-suggestions | 0 | ✗ medium | high: The candidate leaked English/garbled text '重writing' into the Arabic prose. | high: The translation of 'touch gras |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Hyperparameters' is better translated as 'المعلمات الفائقة' rather than 'differential parameters'. |
### article:llm-connection-strings · he · qwen/qwen3-32b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 30 | ✗ low | |
| judge:technicalAccuracy | 50 | ✗ low | |
| judge:coherence | 40 | ✗ low | |
| judge:relevance | 80 | ✓ | |
| judge:translationQuality | 30 | ✗ low | |
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 20 | ✗ low | |
| judge:languagePurity | 20 | ✗ low | |
| judge:overall | 45 | ✗ medium | The candidate is severely flawed, leaking multiple languages (Russian, Chinese, Thai, Arabic) into the Hebrew text. Howe |
| judge:blocking-suggestions | 0 | ✗ medium | high: The model leaked Russian text ('префиксы') into the Hebrew translation. | high: The model leaked Russian text ('ст |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · zh · qwen/qwen3-32b:nitro ✓
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent. It captures Dan's direct and slightly irreverent tone perfectly (e.g., '该死的', '摸草'). It co |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |