# Translation Eval Run — 2026-05-21T19-47-06-937Z

**0 passed, 2 failed** | total cost $0.02140
Experiment: gptoss-tuning-2026-05-21
Variant: profile-v1
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Prompt profiles: enabled


Run log: reports/i18n/evals/eval-run-2026-05-21T19-47-06-937Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | into-the-breach | es | openai/gpt-oss-120b:nitro | ✗ | 75.6 | 57.5✗ | 0✗ | 100 | 10✗ | 10✗ | 100 | 100 | 30✗ | 100 | 100 | 10✗ | $0.00313 | translation-article-into-the-breach-es-openai-gpt-oss-120b-nitro |
| quiz | quiz-advanced-js-error-mastery | es | openai/gpt-oss-120b:nitro | ✗ | 92.0 | 90.0 | 0✗ | 90 | 80 | 90 | 95 | 75✗ | 85 | 100 | 95 | 85 | $0.01827 | translation-quiz-quiz-advanced-js-error-mastery-es-openai-gpt-oss-120b-nitro-assembled |

## Score Details

### article:into-the-breach · es · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:mixed-language-heavy-english | 0 | ✗ medium | /into-the-breach/es/index.mdx has many common English prose words and few locale-specific function words for es. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=8, H3=0, H4=0, H5=0, H6=0). |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:subCategory | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:related | 100 | ✓ | |
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 0 | ✗ medium | Frontmatter title is still the English source title. |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 30 | ✗ low | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 10 | ✗ low | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 10 | ✗ low | |
| judge:languagePurity | 10 | ✗ low | |
| judge:overall | 57 | ✗ medium | The candidate failed to translate the vast majority of the content. While it correctly updated asset paths to '../' and  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The title should be translated or at least quoted as in the source, and the rest of the document is entirely untra |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-advanced-js-error-mastery · es · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=1, H4=0, H5=0, H6=0). |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 100 | ✓ | |
| frontmatter-preserve:subCategory | 100 | ✓ | |
| frontmatter-preserve:tags | 100 | ✓ | |
| frontmatter-preserve:label | 100 | ✓ | |
| frontmatter-preserve:modified | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 85 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 90 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 80 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 90 | ✓ | The translation is technically accurate and preserves the MDX structure perfectly. However, it contains several typos (m |
| judge:blocking-suggestions | 0 | ✗ medium | high: Typo: 'deerrores' should be 'de errores'. | high: Typo: 'excepcionesrealmente' should be 'excepciones realmente'. |
| judge:medium-suggestions | 75 | ✗ low | medium: Typo: 'Sorprensas' should be 'Sorpresas'. | medium: The option text was left in English. | medium: The option te |