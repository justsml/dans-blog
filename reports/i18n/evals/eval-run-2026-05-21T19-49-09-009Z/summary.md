# Translation Eval Run — 2026-05-21T19-49-09-009Z

**0 passed, 2 failed** | total cost $0.02117
Experiment: gptoss-tuning-2026-05-21
Variant: profile-v2-quiz-only-heuristic-fix
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Prompt profiles: enabled


Run log: reports/i18n/evals/eval-run-2026-05-21T19-49-09-009Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | into-the-breach | es | openai/gpt-oss-120b:nitro | ✗ | 75.6 | 57.5✗ | 0✗ | 100 | 10✗ | 10✗ | 100 | 100 | 30✗ | 100 | 100 | 10✗ | $0.00295 | translation-article-into-the-breach-es-openai-gpt-oss-120b-nitro |
| quiz | quiz-advanced-js-error-mastery | es | openai/gpt-oss-120b:nitro | ✗ | 80.4 | 93.1 | 0✗ | 95 | 95 | 95 | 85 | 75✗ | 90 | 100 | 95 | 90 | $0.01822 | translation-quiz-quiz-advanced-js-error-mastery-es-openai-gpt-oss-120b-nitro-assembled |

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
| judge:overall | 57 | ✗ medium | The candidate failed to translate the body of the document, leaving almost all prose in English. It correctly handled te |
| judge:blocking-suggestions | 0 | ✗ medium | high: The title should be translated or at least quoted as in the source. | high: The subTitle must be translated into S |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-advanced-js-error-mastery · es · openai/gpt-oss-120b:nitro ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-advanced-js-error-mastery/es/index.mdx Challenge 4 changed code-like quiz option "undefined behavior". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-advanced-js-error-mastery/es/index.mdx Challenge 8 changed code-like quiz option "Throws a TypeError". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-advanced-js-error-mastery/es/index.mdx Challenge 9 changed code-like quiz option "\"Value undefined is invalid\"". |
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
| mdx-syntax-parse | 0 | ✗ high | quiz-advanced-js-error-mastery/es does not parse as MDX: Could not parse import/exports with acorn |
| judge:readability | 90 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 90 | ✓ | |
| judge:mdxPreservation | 85 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 93 | ✓ | The candidate provides a high-quality translation that captures Dan's direct style well (e.g., 'profesionales dañados'). |
| judge:blocking-suggestions | 0 | ✗ medium | high: Duplicate and malformed import line (Challengefrom) found in the candidate. | high: The option text was left in En |
| judge:medium-suggestions | 75 | ✗ low | medium: These reader-facing props should be translated for consistency with the rest of the quiz. |