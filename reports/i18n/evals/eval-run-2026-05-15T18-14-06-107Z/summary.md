# Translation Eval Run — 2026-05-15T18-14-06-107Z

**1 passed, 9 failed** | total cost $0.00809
Models: google/gemma-4-26b-a4b-it:nitro
Judge: google/gemini-3-flash-preview
Streams: reports/i18n/evals/eval-run-2026-05-15T18-14-06-107Z

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | google/gemma-4-26b-a4b-it:nitro | ✗ | 94.9 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00081 | [txt](translation-article-llm-connection-strings-es-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | hi | google/gemma-4-26b-a4b-it:nitro | ✗ | 93.2 | 95.9 | 100 | 95 | 90 | 95 | 100 | 75✗ | 95 | 100 | 100 | 92 | $0.00078 | [txt](translation-article-llm-connection-strings-hi-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | ja | google/gemma-4-26b-a4b-it:nitro | ✗ | 86.3 | 96.9 | 0✗ | 95 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00083 | [txt](translation-article-llm-connection-strings-ja-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | ru | google/gemma-4-26b-a4b-it:nitro | ✗ | 95.4 | 98.8 | 100 | 100 | 95 | 100 | 100 | 100 | 100 | 100 | 100 | 95 | $0.00080 | [txt](translation-article-llm-connection-strings-ru-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | de | google/gemma-4-26b-a4b-it:nitro | ✗ | 94.1 | 98.1 | 100 | 100 | 95 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00079 | [txt](translation-article-llm-connection-strings-de-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | fr | google/gemma-4-26b-a4b-it:nitro | ✓ | 98.0 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00080 | [txt](translation-article-llm-connection-strings-fr-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | it | google/gemma-4-26b-a4b-it:nitro | ✗ | 93.8 | 97.3 | 0✗ | 100 | 90 | 98 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00079 | [txt](translation-article-llm-connection-strings-it-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | ar | google/gemma-4-26b-a4b-it:nitro | ✗ | 90.5 | 96.9 | 0✗ | 100 | 90 | 95 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00086 | [txt](translation-article-llm-connection-strings-ar-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | he | google/gemma-4-26b-a4b-it:nitro | ✗ | 92.0 | 92.5 | 0✗ | 95 | 90 | 85 | 100 | 75✗ | 90 | 100 | 95 | 85 | $0.00090 | [txt](translation-article-llm-connection-strings-he-google-gemma-4-26b-a4b-it-nitro.txt) |
| article | llm-connection-strings | zh | google/gemma-4-26b-a4b-it:nitro | ✗ | 94.9 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00074 | [txt](translation-article-llm-connection-strings-zh-google-gemma-4-26b-a4b-it-nitro.txt) |

## Score Details

### article:llm-connection-strings · es · google/gemma-4-26b-a4b-it:nitro ✗
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
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly (e.g., 'sal a que te dé el a |
| judge:blocking-suggestions | 0 | ✗ medium | high: The frontmatter date format should be preserved as YYYY-MM-DD to match the source and avoid potential parsing issu |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · hi · google/gemma-4-26b-a4b-it:nitro ✗
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
| frontmatter-preserve:modified | 0 | ✗ medium | Expected modified to stay 2026-02-26; got undefined. |
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
| judge:overall | 96 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It adheres to all MDX prese |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: Replaced a pipe/vertical bar with the correct Hindi full stop (Purna Viram). | medium: 'Touch grass' is a specif |
### article:llm-connection-strings · ja · google/gemma-4-26b-a4b-it:nitro ✗
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
| frontmatter-preserve:modified | 0 | ✗ medium | Expected modified to stay 2026-02-26; got undefined. |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 0 | ✗ high | llm-connection-strings/ja does not parse as MDX: Unexpected character `"` (U+0022) in attribute name, expected an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag |
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 97 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly (e.g., 'touch grass' as '外の空 |
| judge:blocking-suggestions | 0 | ✗ medium | high: Broken markdown link syntax: extra backtick after the closing bracket. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ru · google/gemma-4-26b-a4b-it:nitro ✗
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
| frontmatter-preserve:modified | 0 | ✗ medium | Expected modified to stay 2026-02-26; got undefined. |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 99 | ✓ | The translation is excellent. It perfectly captures Dan's direct, slightly irreverent tone (e.g., 'сходите погуляйте на  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · de · google/gemma-4-26b-a4b-it:nitro ✗
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
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly (e.g., 'geht bitte mal eine  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: Grammatical error: 'parsbare' should be 'parsbar' to match the predicate adjective form. |
### article:llm-connection-strings · fr · google/gemma-4-26b-a4b-it:nitro ✓
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
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It correctly handles the MD |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is a specific internet idiom that has a direct equivalent in French internet culture ('touche de l |
### article:llm-connection-strings · it · google/gemma-4-26b-a4b-it:nitro ✗
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
| judge:languagePurity | 98 | ✓ | |
| judge:overall | 97 | ✓ | The translation is excellent, preserving all MDX structures, heading counts, and asset paths correctly. It captures Dan' |
| judge:blocking-suggestions | 0 | ✗ medium | high: 'Malabeni' is a typo or non-existent word; 'destreggiarti' or 'giocare di prestigio' fits the 'juggling' metaphor  |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is a specific internet idiom; while 'farti una passeggiata' is natural, 'toccare l'erba' is the di |
### article:llm-connection-strings · ar · google/gemma-4-26b-a4b-it:nitro ✗
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
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 97 | ✓ | The candidate followed all technical constraints, including MDX structure, heading counts, and asset path adjustments (. |
| judge:blocking-suggestions | 0 | ✗ medium | high: The idiom 'touch grass' is more accurately and humorously translated in tech circles as 'يلمس العشب' to maintain D |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · he · google/gemma-4-26b-a4b-it:nitro ✗
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
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 85 | ✓ | |
| judge:overall | 93 | ✓ | The candidate followed all MDX structural requirements, including heading counts and asset path adjustments (../). It ca |
| judge:blocking-suggestions | 0 | ✗ medium | high: The translation contains a Japanese/Chinese character '種類' (meaning 'type') instead of Hebrew text. This is a clea |
| judge:medium-suggestions | 75 | ✗ low | medium: Grammar: 'Shura' (line) is feminine in Hebrew, so the number should be 'Shalosh' (three, feminine). | medium: 'T |
### article:llm-connection-strings · zh · google/gemma-4-26b-a4b-it:nitro ✗
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
| judge:overall | 98 | ✓ | The translation is excellent. It captures Dan's direct and slightly irreverent tone perfectly (e.g., 'touch grass' trans |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |