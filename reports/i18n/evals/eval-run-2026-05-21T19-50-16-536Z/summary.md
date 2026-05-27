# Translation Eval Run — 2026-05-21T19-50-16-536Z

**0 passed, 2 failed** | total cost $0.01456
Experiment: gptoss-tuning-2026-05-21
Variant: settings-heuristic-v3-no-profile
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Prompt profiles: disabled


Run log: reports/i18n/evals/eval-run-2026-05-21T19-50-16-536Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | into-the-breach | es | openai/gpt-oss-120b:nitro | ✗ | 94.5 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00324 | translation-article-into-the-breach-es-openai-gpt-oss-120b-nitro |
| quiz | quiz-advanced-js-error-mastery | es | openai/gpt-oss-120b:nitro | ✗ | 94.5 | 97.5 | 0✗ | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.01132 | translation-quiz-quiz-advanced-js-error-mastery-es-openai-gpt-oss-120b-nitro-assembled |

## Score Details

### article:into-the-breach · es · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The candidate followed all structural MDX rules, including the specific instruction to use ../ for asset paths in the lo |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The instructions state that inherited local image paths in frontmatter must start with ../, but the English sour |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is technically accurate and preserves all MDX structures and quiz logic. It correctly handles the relati |
| judge:blocking-suggestions | 0 | ✗ medium | high: Missing space between words and missing quotes for frontmatter string consistency. |
| judge:medium-suggestions | 75 | ✗ low | medium: The group name should be translated for consistency with other challenges. | medium: The title should be transla |