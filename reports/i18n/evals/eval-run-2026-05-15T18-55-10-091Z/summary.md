# Translation Eval Run — 2026-05-15T18-55-10-091Z

**6 passed, 4 failed** | total cost $0.14533
Models: z-ai/glm-5-turbo
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T18-55-10-091Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | llm-connection-strings | es | z-ai/glm-5-turbo | ✓ | 98.1 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.02421 | translation-article-llm-connection-strings-es-z-ai-glm-5-turbo |
| article | llm-connection-strings | hi | z-ai/glm-5-turbo | ✗ | 0.0 | — | — | — | — | — | — | — | — | — | — | — | — | translation-article-llm-connection-strings-hi-z-ai-glm-5-turbo |
| article | llm-connection-strings | ja | z-ai/glm-5-turbo | ✗ | 94.6 | 96.3 | 0✗ | 100 | 90 | 95 | 100 | 100 | 95 | 100 | 95 | 95 | $0.02199 | translation-article-llm-connection-strings-ja-z-ai-glm-5-turbo |
| article | llm-connection-strings | ru | z-ai/glm-5-turbo | ✓ | 97.9 | 96.9 | 100 | 100 | 90 | 95 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.02256 | translation-article-llm-connection-strings-ru-z-ai-glm-5-turbo |
| article | llm-connection-strings | de | z-ai/glm-5-turbo | ✓ | 98.2 | 97.9 | 100 | 100 | 95 | 98 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.02133 | translation-article-llm-connection-strings-de-z-ai-glm-5-turbo |
| article | llm-connection-strings | fr | z-ai/glm-5-turbo | ✓ | 99.3 | 98.1 | 100 | 100 | 95 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.02112 | translation-article-llm-connection-strings-fr-z-ai-glm-5-turbo |
| article | llm-connection-strings | it | z-ai/glm-5-turbo | ✗ | 0.0 | — | — | — | — | — | — | — | — | — | — | — | — | translation-article-llm-connection-strings-it-z-ai-glm-5-turbo |
| article | llm-connection-strings | ar | z-ai/glm-5-turbo | ✓ | 99.1 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.02185 | translation-article-llm-connection-strings-ar-z-ai-glm-5-turbo |
| article | llm-connection-strings | he | z-ai/glm-5-turbo | ✗ | 0.0 | — | — | — | — | — | — | — | — | — | — | — | — | translation-article-llm-connection-strings-he-z-ai-glm-5-turbo |
| article | llm-connection-strings | zh | z-ai/glm-5-turbo | ✓ | 100.0 | 100.0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.01227 | translation-article-llm-connection-strings-zh-z-ai-glm-5-turbo |

## Score Details

### article:llm-connection-strings · es · z-ai/glm-5-turbo ✓
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
| judge:overall | 98 | ✓ | The translation is excellent. It follows all technical constraints, including the relative path adjustments for assets ( |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Vibe-year' is a play on 'dog-year'. 'Vibe-año' or keeping 'vibe-year' is more natural in tech-slang than 'año-v |
### article:llm-connection-strings · hi · z-ai/glm-5-turbo ✗
**Error**: The operation timed out. (partial stream id: translation-article-llm-connection-strings-hi-z-ai-glm-5-turbo)
| Scorer | Score | Status |
| --- | --- | --- |
### article:llm-connection-strings · ja · z-ai/glm-5-turbo ✗
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
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 96 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly (e.g., 'touch grass' as '外に出 |
| judge:blocking-suggestions | 0 | ✗ medium | high: The word 'logic' was partially translated as '逻辑' (Chinese characters) instead of the Japanese Katakana 'ロジック'. |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · ru · z-ai/glm-5-turbo ✓
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
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 97 | ✓ | The candidate provided a high-quality translation that captures Dan's direct and slightly informal tone. It correctly ha |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The word 'beats' was left untranslated in the middle of a sentence. | medium: The translation of 'are you treati |
### article:llm-connection-strings · de · z-ai/glm-5-turbo ✓
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
| judge:languagePurity | 98 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent, capturing Dan's direct and slightly irreverent tone perfectly. It correctly handles the as |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: 'Touch grass' is a specific internet idiom; while the translation is natural, the literal equivalent 'Gras anfas |
### article:llm-connection-strings · fr · z-ai/glm-5-turbo ✓
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
| judge:overall | 98 | ✓ | The translation is excellent. It perfectly captures Dan's direct, slightly irreverent tone (e.g., 'allez donc toucher un |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · it · z-ai/glm-5-turbo ✗
**Error**: The operation timed out. (partial stream id: translation-article-llm-connection-strings-it-z-ai-glm-5-turbo)
| Scorer | Score | Status |
| --- | --- | --- |
### article:llm-connection-strings · ar · z-ai/glm-5-turbo ✓
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
| judge:overall | 98 | ✓ | The candidate provided an excellent translation that captures Dan's direct and slightly irreverent tone perfectly. It co |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:llm-connection-strings · he · z-ai/glm-5-turbo ✗
**Error**: The operation timed out. (partial stream id: translation-article-llm-connection-strings-he-z-ai-glm-5-turbo)
| Scorer | Score | Status |
| --- | --- | --- |
### article:llm-connection-strings · zh · z-ai/glm-5-turbo ✓
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
| judge:overall | 100 | ✓ | The translation is excellent. It perfectly captures Dan's direct and slightly irreverent tone (e.g., 'touch grass' trans |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |