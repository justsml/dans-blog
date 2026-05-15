# Translation Eval Run — 2026-05-15T19-05-27-292Z

**9 passed, 1 failed** | total cost $0.02121
Models: deepseek/deepseek-v4-flash
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T19-05-27-292Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | deepseek/deepseek-v4-flash | ✓ | 98.5 | 98.8 | 100 | 100 | 95 | 100 | 100 | 75✗ | 100 | 100 | 100 | 95 | $0.00177 | translation-article-llm-connection-strings-es-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | hi | deepseek/deepseek-v4-flash | ✓ | 98.6 | 96.3 | 100 | 95 | 90 | 95 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00153 | translation-article-llm-connection-strings-hi-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | ja | deepseek/deepseek-v4-flash | ✓ | 99.1 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00261 | translation-article-llm-connection-strings-ja-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | ru | deepseek/deepseek-v4-flash | ✓ | 98.3 | 98.1 | 100 | 100 | 95 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00254 | translation-article-llm-connection-strings-ru-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | de | deepseek/deepseek-v4-flash | ✗ | 95.1 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00264 | translation-article-llm-connection-strings-de-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | fr | deepseek/deepseek-v4-flash | ✓ | 99.5 | 98.8 | 100 | 100 | 95 | 100 | 100 | 100 | 100 | 100 | 100 | 95 | $0.00188 | translation-article-llm-connection-strings-fr-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | it | deepseek/deepseek-v4-flash | ✓ | 99.5 | 98.8 | 100 | 100 | 95 | 100 | 100 | 100 | 100 | 100 | 100 | 95 | $0.00256 | translation-article-llm-connection-strings-it-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | ar | deepseek/deepseek-v4-flash | ✓ | 98.1 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00229 | translation-article-llm-connection-strings-ar-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | he | deepseek/deepseek-v4-flash | ✓ | 98.3 | 98.1 | 100 | 100 | 95 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00201 | translation-article-llm-connection-strings-he-deepseek-deepseek-v4-flash |
| article | llm-connection-strings | zh | deepseek/deepseek-v4-flash | ✓ | 100.0 | 100.0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00138 | translation-article-llm-connection-strings-zh-deepseek-deepseek-v4-flash |

## Score Details

### article:llm-connection-strings · es · deepseek/deepseek-v4-flash ✓
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
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 99 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It adheres to all technical |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: While 'tocar pasto' is a literal translation of 'touch grass', it is less common in Spanish than 'que te dé el a |
### article:llm-connection-strings · hi · deepseek/deepseek-v4-flash ✓
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
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 96 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly (e.g., 'vibe-year' translate |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ja · deepseek/deepseek-v4-flash ✓
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
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent. It captures Dan's direct and slightly irreverent tone perfectly (e.g., 'touch grass' trans |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ru · deepseek/deepseek-v4-flash ✓
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
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly snarky tone perfectly (e.g., 'идите потрогайте траву'  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The original English 'are you treating your .env file much better?' is a rhetorical question implying the user i |
### article:llm-connection-strings · de · deepseek/deepseek-v4-flash ✗
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
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is technically excellent and preserves all MDX structures and asset paths correctly. It follows the requ |
| judge:blocking-suggestions | 0 | ✗ medium | high: Dan's style is direct and informal (Du-form), not formal (Sie-form). | high: Consistency in informal tone and bett |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · fr · deepseek/deepseek-v4-flash ✓
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
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 99 | ✓ | The translation is excellent. It captures Dan's direct, slightly irreverent tone perfectly (e.g., 'nom d'un chien' for ' |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · it · deepseek/deepseek-v4-flash ✓
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
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 99 | ✓ | The translation is excellent. it correctly handles the technical terminology while maintaining Dan's direct and slightly |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ar · deepseek/deepseek-v4-flash ✓
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
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The candidate followed all technical constraints, including the critical requirement to update asset paths to '../' for  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The term 'vibe-year' is a play on 'dog-year' using the tech slang 'vibe'. 'الاهتزاز' is a literal translation of |
### article:llm-connection-strings · he · deepseek/deepseek-v4-flash ✓
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
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly in Hebrew (e.g., 'חצי שנת וי |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The 'ai-response' class was missing from the blockquote, which affects the visual styling of the AI-themed quote |
### article:llm-connection-strings · zh · deepseek/deepseek-v4-flash ✓
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
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 100 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 100 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 100 | ✓ | The translation is excellent. It perfectly captures Dan's direct, slightly irreverent tone (e.g., 'touch grass' translat |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |