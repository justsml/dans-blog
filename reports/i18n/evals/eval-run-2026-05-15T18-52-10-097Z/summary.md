# Translation Eval Run — 2026-05-15T18-52-10-097Z

**3 passed, 7 failed** | total cost $0.09617
Models: minimax/minimax-m2.7
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T18-52-10-097Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | minimax/minimax-m2.7 | ✓ | 98.3 | 98.1 | 100 | 100 | 95 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.01042 | translation-article-llm-connection-strings-es-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | hi | minimax/minimax-m2.7 | ✗ | 88.1 | 90.6 | 0✗ | 92 | 85 | 80 | 95 | 75✗ | 90 | 100 | 95 | 88 | $0.01037 | translation-article-llm-connection-strings-hi-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | ja | minimax/minimax-m2.7 | ✗ | 78.0 | 50.0✗ | 0✗ | 40✗ | 40✗ | 20✗ | 90 | 100 | 30✗ | 100 | 50✗ | 30✗ | $0.00876 | translation-article-llm-connection-strings-ja-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | ru | minimax/minimax-m2.7 | ✗ | 94.4 | 95.6 | 0✗ | 100 | 90 | 95 | 90 | 100 | 95 | 100 | 100 | 95 | $0.00970 | translation-article-llm-connection-strings-ru-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | de | minimax/minimax-m2.7 | ✗ | 92.0 | 88.8 | 0✗ | 90 | 80 | 85 | 95 | 100 | 85 | 100 | 90 | 85 | $0.00896 | translation-article-llm-connection-strings-de-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | fr | minimax/minimax-m2.7 | ✓ | 98.3 | 98.1 | 100 | 100 | 95 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00922 | translation-article-llm-connection-strings-fr-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | it | minimax/minimax-m2.7 | ✓ | 97.9 | 96.9 | 100 | 95 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.01043 | translation-article-llm-connection-strings-it-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | ar | minimax/minimax-m2.7 | ✗ | 91.6 | 87.9 | 0✗ | 88 | 85 | 75 | 100 | 100 | 85 | 100 | 90 | 80 | $0.00929 | translation-article-llm-connection-strings-ar-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | he | minimax/minimax-m2.7 | ✗ | 91.5 | 87.5 | 0✗ | 88 | 85 | 82 | 95 | 100 | 85 | 95 | 90 | 80 | $0.01134 | translation-article-llm-connection-strings-he-minimax-minimax-m2.7-assembled |
| article | llm-connection-strings | zh | minimax/minimax-m2.7 | ✗ | 94.2 | 95.0 | 0✗ | 100 | 90 | 90 | 100 | 100 | 95 | 100 | 95 | 90 | $0.00768 | translation-article-llm-connection-strings-zh-minimax-minimax-m2.7-assembled |

## Score Details

### article:llm-connection-strings · es · minimax/minimax-m2.7 ✓
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:overall | 98 | ✓ | The translation is excellent. it captures Dan's direct, slightly irreverent tone perfectly ('¿Y dónde diablos va...?', ' |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'o wait' is a bit too much Spanglish; 'o espera' fits the tone better while remaining casual. |
### article:llm-connection-strings · hi · minimax/minimax-m2.7 ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:invalid-localized-asset-path | 0 | ✗ high | /llm-connection-strings/hi/index.mdx has 1 inherited asset path(s) that must start with ../ inside locale folders. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:coherence | 92 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 88 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 91 | ✓ | The candidate followed MDX preservation rules well, including the heading counts and asset path adjustments (../). It ca |
| judge:blocking-suggestions | 0 | ✗ medium | high: The subtitle was left entirely in English. | high: The image alt text was left in English and the path had an unne |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is an English idiom that doesn't translate literally well into Hindi; a more natural equivalent fo |
### article:llm-connection-strings · ja · minimax/minimax-m2.7 ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 30 | ✗ low | |
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 40 | ✗ low | |
| judge:languagePurity | 20 | ✗ low | |
| judge:overall | 50 | ✗ medium | The candidate is severely flawed, leaking multiple languages (Russian, Chinese, Korean) and leaving entire sentences in  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The candidate leaked Russian text and untranslated English source prose in the middle of a sentence. | high: The c |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ru · minimax/minimax-m2.7 ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 96 | ✓ | The candidate provides a high-quality translation that captures Dan's direct and slightly informal tone well (e.g., 'виб |
| judge:blocking-suggestions | 0 | ✗ medium | high: The subtitle was left untranslated in English. | high: The date field is missing from the frontmatter. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · de · minimax/minimax-m2.7 ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 80 | ✓ | |
| judge:languagePurity | 85 | ✓ | |
| judge:overall | 89 | ✓ | The candidate generally follows the MDX structure and preserves the technical meaning. However, it hallucinated two sent |
| judge:blocking-suggestions | 0 | ✗ medium | high: This text is not in the English source and appears to be LLM hallucination or commentary. | high: 'Touch grass' is |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · fr · minimax/minimax-m2.7 ✓
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone ('joyeux bordel', 'bon sang', 'allez t |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The word 'environment' was left untranslated in this specific instance. | medium: 'Syntaxe' is feminine in Frenc |
### article:llm-connection-strings · it · minimax/minimax-m2.7 ✓
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:overall | 97 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone (e.g., 'vai a toccare l'erba' for 'tou |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Agnostico dal linguaggio' is a literal translation; 'Indipendente dal linguaggio' or 'Indipendente dal linguagg |
### article:llm-connection-strings · ar · minimax/minimax-m2.7 ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:coherence | 88 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 80 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 75 | ✓ | |
| judge:overall | 88 | ✓ | The candidate correctly preserved the MDX structure, heading counts, and asset paths. However, it suffers from significa |
| judge:blocking-suggestions | 0 | ✗ medium | high: The word '面向' is Chinese (meaning 'oriented') and was accidentally leaked into the Arabic text. | high: The word ' |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · he · minimax/minimax-m2.7 ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:coherence | 88 | ✓ | |
| judge:relevance | 95 | ✓ | |
| judge:translationQuality | 80 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 82 | ✓ | |
| judge:overall | 88 | ✓ | The candidate follows the MDX structure well and correctly handles asset paths. However, it contains a German word ('ein |
| judge:blocking-suggestions | 0 | ✗ medium | high: The subtitle is truncated and missing the closing quote and full scheme name. | high: The word 'einfach' is German |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · zh · minimax/minimax-m2.7 ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=6, H3=1, H4=0, H5=0, H6=0). |
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
| judge:translationQuality | 90 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 95 | ✓ | The candidate followed all MDX preservation rules, including the relative path adjustments for assets. It captured Dan's |
| judge:blocking-suggestions | 0 | ✗ medium | high: The heading was left untranslated. | high: The heading was left untranslated. |
| judge:medium-suggestions | 100 | ✓ | |