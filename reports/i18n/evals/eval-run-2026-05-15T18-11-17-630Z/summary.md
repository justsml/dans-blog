# Translation Eval Run — 2026-05-15T18-11-17-630Z

**5 passed, 5 failed** | total cost $0.02472
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T18-11-17-630Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | openai/gpt-oss-120b:nitro | ✓ | 98.0 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00176 | [txt](translation-article-llm-connection-strings-es-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | hi | openai/gpt-oss-120b:nitro | ✗ | 93.4 | 93.6 | 0✗ | 94 | 88 | 90 | 100 | 100 | 92 | 100 | 95 | 90 | $0.00198 | [txt](translation-article-llm-connection-strings-hi-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | ja | openai/gpt-oss-120b:nitro | ✓ | 97.8 | 96.9 | 100 | 95 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00321 | [txt](translation-article-llm-connection-strings-ja-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | ru | openai/gpt-oss-120b:nitro | ✗ | 94.9 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00169 | [txt](translation-article-llm-connection-strings-ru-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | de | openai/gpt-oss-120b:nitro | ✗ | 62.4 | 27.5✗ | 100 | 20✗ | 30✗ | 90 | 10✗ | 100 | 20✗ | 20✗ | 20✗ | 10✗ | $0.00397 | [txt](translation-article-llm-connection-strings-de-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | fr | openai/gpt-oss-120b:nitro | ✓ | 98.0 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00274 | [txt](translation-article-llm-connection-strings-fr-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | it | openai/gpt-oss-120b:nitro | ✓ | 97.8 | 96.9 | 100 | 95 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00169 | [txt](translation-article-llm-connection-strings-it-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | ar | openai/gpt-oss-120b:nitro | ✓ | 98.8 | 96.9 | 100 | 95 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00303 | [txt](translation-article-llm-connection-strings-ar-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | he | openai/gpt-oss-120b:nitro | ✗ | 94.0 | 97.9 | 0✗ | 100 | 95 | 98 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00194 | [txt](translation-article-llm-connection-strings-he-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | zh | openai/gpt-oss-120b:nitro | ✗ | 94.4 | 96.3 | 0✗ | 95 | 90 | 95 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00270 | [txt](translation-article-llm-connection-strings-zh-openai-gpt-oss-120b-nitro.txt) |

## Score Details

### article:llm-connection-strings · es · openai/gpt-oss-120b:nitro ✓
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
| judge:overall | 98 | ✓ | The translation is excellent. It perfectly preserves the MDX structure, including the heading counts and asset path adju |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Vibe-year' is a play on 'dog year' or 'internet year'. 'Año-vibra' sounds slightly more natural in this technic |
### article:llm-connection-strings · hi · openai/gpt-oss-120b:nitro ✗
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
| judge:readability | 92 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 94 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 90 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 88 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 94 | ✓ | The candidate followed all MDX preservation rules, including the correct relative path adjustments for assets (../). The |
| judge:blocking-suggestions | 0 | ✗ medium | high: The update block was left partially in English. It should be translated while keeping the link. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ja · openai/gpt-oss-120b:nitro ✓
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
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 97 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It correctly handles the re |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The original text uses 'vibe-year', a slang term in the AI community. Translating it to just 'half a year' loses |
### article:llm-connection-strings · ru · openai/gpt-oss-120b:nitro ✗
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
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly informal tone perfectly. It correctly handles the asse |
| judge:blocking-suggestions | 0 | ✗ medium | high: The update block was left untranslated. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · de · openai/gpt-oss-120b:nitro ✗
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
| judge:readability | 20 | ✗ low | |
| judge:technicalAccuracy | 20 | ✗ low | |
| judge:coherence | 20 | ✗ low | |
| judge:relevance | 20 | ✗ low | |
| judge:translationQuality | 10 | ✗ low | |
| judge:mdxPreservation | 10 | ✗ low | |
| judge:culturalAdaptation | 30 | ✗ low | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 28 | ✗ medium | The candidate is severely truncated, cutting off mid-sentence after only a few paragraphs. It fails to preserve the head |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · fr · openai/gpt-oss-120b:nitro ✓
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
| judge:overall | 98 | ✓ | The candidate followed all instructions perfectly. It preserved the MDX structure, heading counts, and component slots.  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: While 'vibe-year' is understandable, 'vibe-an' or keeping the English term in italics is more common in French t |
### article:llm-connection-strings · it · openai/gpt-oss-120b:nitro ✓
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
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 97 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It correctly handles the as |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Vibe-year' is a slang technical term; 'anno-vibra' sounds slightly unnatural in Italian tech circles compared t |
### article:llm-connection-strings · ar · openai/gpt-oss-120b:nitro ✓
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
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 97 | ✓ | The translation is excellent. It captures Dan's direct, slightly informal technical tone perfectly (e.g., 'تلمس العشب' f |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · he · openai/gpt-oss-120b:nitro ✗
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
| judge:languagePurity | 98 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly snarky tone perfectly (e.g., 'לכו ותגעו בדשא' for 'tou |
| judge:blocking-suggestions | 0 | ✗ medium | high: 'Hyperparameters' should be translated as 'היפר-פרמטרים' in Hebrew; the current translation splits the word awkwar |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Language Agnostic' is standardly translated as 'אגנוסטי לשפה'. 'אגרגטיבית' is a mistranslation/hallucination of |
### article:llm-connection-strings · zh · openai/gpt-oss-120b:nitro ✗
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
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 96 | ✓ | The candidate provides a high-quality translation that captures Dan's direct and slightly irreverent tone (e.g., '纸牌屋',  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The link text in the update block was left in English; translating it improves language purity while keeping the t |
| judge:medium-suggestions | 100 | ✓ | |