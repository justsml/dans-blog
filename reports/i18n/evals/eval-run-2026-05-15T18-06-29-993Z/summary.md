# Translation Eval Run — 2026-05-15T18-06-29-993Z

**3 passed, 7 failed** | total cost $0.03314
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T18-06-29-993Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | openai/gpt-oss-120b:nitro | ✗ | 93.7 | 97.0 | 0✗ | 100 | 90 | 98 | 100 | 75✗ | 95 | 100 | 98 | 95 | $0.00400 | [txt](translation-article-llm-connection-strings-es-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | hi | openai/gpt-oss-120b:nitro | ✗ | 93.2 | 95.9 | 0✗ | 95 | 90 | 95 | 100 | 75✗ | 95 | 100 | 100 | 92 | $0.00307 | [txt](translation-article-llm-connection-strings-hi-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | ja | openai/gpt-oss-120b:nitro | ✗ | 71.8 | 48.8✗ | 100 | 40✗ | 60✗ | 80 | 30✗ | 100 | 40✗ | 50✗ | 50✗ | 40✗ | $0.00408 | [txt](translation-article-llm-connection-strings-ja-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | ru | openai/gpt-oss-120b:nitro | ✗ | 93.6 | 96.9 | 0✗ | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 95 | 95 | $0.00274 | [txt](translation-article-llm-connection-strings-ru-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | de | openai/gpt-oss-120b:nitro | ✗ | 70.0 | 51.2✗ | 100 | 40✗ | 60✗ | 90 | 30✗ | 100 | 50✗ | 50✗ | 50✗ | 40✗ | $0.00397 | [txt](translation-article-llm-connection-strings-de-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | fr | openai/gpt-oss-120b:nitro | ✗ | 69.6 | 50.0✗ | 100 | 40✗ | 60✗ | 90 | 30✗ | 100 | 40✗ | 50✗ | 50✗ | 40✗ | $0.00397 | [txt](translation-article-llm-connection-strings-fr-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | it | openai/gpt-oss-120b:nitro | ✗ | 81.4 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00308 | [txt](translation-article-llm-connection-strings-it-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | ar | openai/gpt-oss-120b:nitro | ✓ | 97.8 | 96.9 | 100 | 95 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00249 | [txt](translation-article-llm-connection-strings-ar-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | he | openai/gpt-oss-120b:nitro | ✓ | 98.3 | 98.1 | 100 | 100 | 95 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00300 | [txt](translation-article-llm-connection-strings-he-openai-gpt-oss-120b-nitro.txt) |
| article | llm-connection-strings | zh | openai/gpt-oss-120b:nitro | ✓ | 97.4 | 95.9 | 100 | 95 | 90 | 95 | 100 | 75✗ | 95 | 100 | 100 | 92 | $0.00274 | [txt](translation-article-llm-connection-strings-zh-openai-gpt-oss-120b-nitro.txt) |

## Score Details

### article:llm-connection-strings · es · openai/gpt-oss-120b:nitro ✗
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
| judge:technicalAccuracy | 98 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 98 | ✓ | |
| judge:overall | 97 | ✓ | The candidate followed all MDX preservation rules, including the specific requirement to use '../' for local assets. The |
| judge:blocking-suggestions | 0 | ✗ medium | high: Typo in the title: 'Eshora' should be 'Es hora'. |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is an English idiom; while 'tocar pasto' is becoming known online, 'sal a que te dé el aire' or 's |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 96 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone well. It correctly handles the MDX req |
| judge:blocking-suggestions | 0 | ✗ medium | high: The original metaphor 'grab-bag' is better translated as a 'heap' or 'mess' in this context; 'jar' is too literal  |
| judge:medium-suggestions | 75 | ✗ low | medium: 'भाषा-अज्ञेय' is a literal translation of 'Language Agnostic' that sounds very unnatural in technical Hindi; kee |
### article:llm-connection-strings · ja · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed fenced code block markers from 10 to 6. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed Markdown images from 2 to 1. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/ja/index.mdx changed H2 headings from 6 to 3. |
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
| judge:relevance | 50 | ✗ low | |
| judge:translationQuality | 40 | ✗ low | |
| judge:mdxPreservation | 30 | ✗ low | |
| judge:culturalAdaptation | 60 | ✗ low | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 49 | ✗ medium | The candidate is severely truncated, ending abruptly in the middle of a sentence in the 'Auth' section. It fails to pres |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
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
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 97 | ✓ | The translation is excellent, preserving all MDX structures, heading counts, and asset paths (correctly adding ../). It  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The original text uses 'vibe-year', a slang term in the AI community. 'Полвека' (half a century) completely change |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is a specific internet idiom. While the translation is safe, the literal 'потрогайте траву' is wel |
### article:llm-connection-strings · de · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed fenced code block markers from 10 to 2. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/de/index.mdx changed H2 headings from 6 to 2. |
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
| judge:readability | 50 | ✗ low | |
| judge:technicalAccuracy | 50 | ✗ low | |
| judge:coherence | 40 | ✗ low | |
| judge:relevance | 50 | ✗ low | |
| judge:translationQuality | 40 | ✗ low | |
| judge:mdxPreservation | 30 | ✗ low | |
| judge:culturalAdaptation | 60 | ✗ low | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 51 | ✗ medium | The candidate is severely truncated, ending mid-sentence in the middle of the document. It fails all MDX preservation re |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · fr · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:fenced-code-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed fenced code block markers from 10 to 2. |
| integrity:markdown-image-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed Markdown images from 2 to 0. |
| integrity:heading-h2-count | 0 | ✗ high | /llm-connection-strings/fr/index.mdx changed H2 headings from 6 to 1. |
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
| judge:readability | 40 | ✗ low | |
| judge:technicalAccuracy | 50 | ✗ low | |
| judge:coherence | 40 | ✗ low | |
| judge:relevance | 50 | ✗ low | |
| judge:translationQuality | 40 | ✗ low | |
| judge:mdxPreservation | 30 | ✗ low | |
| judge:culturalAdaptation | 60 | ✗ low | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 50 | ✗ medium | The candidate is severely truncated, cutting off mid-sentence in the second section. It fails to preserve the heading co |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · it · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 0 | ✗ medium | Expected category to stay "AI"; got undefined. |
| frontmatter-preserve:tags | 0 | ✗ medium | Expected tags to stay ["\"ai\"","\"llm\"","\"api\"","\"developer-experience\"","\"standards\""]; got undefined. |
| frontmatter-preserve:modified | 0 | ✗ medium | Expected modified to stay 2026-02-26; got undefined. |
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
| judge:overall | 98 | ✓ | The candidate followed all technical constraints, including the relative path adjustments for assets (../) and MDX struc |
| judge:blocking-suggestions | 0 | ✗ medium | high: Missing space after colon in frontmatter title. |
| judge:medium-suggestions | 75 | ✗ low | medium: While 'toccare l'erba' is becoming known in internet slang, 'esci all'aria aperta' or a more localized idiom cap |
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
| judge:overall | 97 | ✓ | The candidate followed all technical constraints, including the critical requirement to update asset paths to '../' for  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The phrase 'touch grass' is a specific internet idiom; while the translation is polite, the literal-but-explaine |
### article:llm-connection-strings · he · openai/gpt-oss-120b:nitro ✓
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
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It follows all technical co |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: Grammar: 'כבוד' (respect) is masculine in Hebrew. |
### article:llm-connection-strings · zh · openai/gpt-oss-120b:nitro ✓
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
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 96 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It correctly handles the MD |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'juggling' was left untranslated in the first paragraph, which breaks the flow for a Chinese reader. |