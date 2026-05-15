# Translation Eval Run — 2026-05-15T19-49-59-607Z

**4 passed, 6 failed** | total cost $0.05779
Models: deepseek/deepseek-v4-flash
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T19-49-59-607Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| quiz | quiz-modern-css-2025 | es | deepseek/deepseek-v4-flash | ✗ | 0.0 | — | — | — | — | — | — | — | — | — | — | — | — | — |
| quiz | quiz-modern-css-2025 | hi | deepseek/deepseek-v4-flash | ✓ | 98.1 | 96.9 | 100 | 100 | 90 | 95 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00799 | translation-quiz-quiz-modern-css-2025-hi-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | ja | deepseek/deepseek-v4-flash | ✗ | 94.5 | 96.9 | 0✗ | 100 | 95 | 100 | 90 | 75✗ | 95 | 100 | 100 | 95 | $0.00687 | translation-quiz-quiz-modern-css-2025-ja-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | ru | deepseek/deepseek-v4-flash | ✗ | 93.3 | 93.1 | 0✗ | 95 | 90 | 90 | 95 | 75✗ | 90 | 100 | 95 | 90 | $0.00826 | translation-quiz-quiz-modern-css-2025-ru-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | de | deepseek/deepseek-v4-flash | ✓ | 98.3 | 97.5 | 100 | 100 | 95 | 95 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00711 | translation-quiz-quiz-modern-css-2025-de-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | fr | deepseek/deepseek-v4-flash | ✗ | 0.0 | — | — | — | — | — | — | — | — | — | — | — | — | — |
| quiz | quiz-modern-css-2025 | it | deepseek/deepseek-v4-flash | ✗ | 95.0 | 95.6 | 0✗ | 100 | 95 | 98 | 95 | 100 | 90 | 100 | 95 | 92 | $0.00645 | translation-quiz-quiz-modern-css-2025-it-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | ar | deepseek/deepseek-v4-flash | ✓ | 98.3 | 97.5 | 100 | 100 | 95 | 95 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00704 | translation-quiz-quiz-modern-css-2025-ar-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | he | deepseek/deepseek-v4-flash | ✓ | 98.0 | 96.5 | 100 | 100 | 95 | 90 | 100 | 75✗ | 95 | 100 | 100 | 92 | $0.00786 | translation-quiz-quiz-modern-css-2025-he-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | zh | deepseek/deepseek-v4-flash | ✗ | 94.7 | 97.5 | 0✗ | 100 | 95 | 95 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00620 | translation-quiz-quiz-modern-css-2025-zh-deepseek-deepseek-v4-flash-assembled |

## Score Details

### quiz:quiz-modern-css-2025 · es · deepseek/deepseek-v4-flash ✗
**Error**: Quiz translation changed array counts for Challenge 9: explanationProse: expected 2, got 1
| Scorer | Score | Status |
| --- | --- | --- |
### quiz:quiz-modern-css-2025 · hi · deepseek/deepseek-v4-flash ✓
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:overall | 97 | ✓ | The translation is excellent, maintaining Dan's direct tone while accurately translating technical CSS concepts into Hin |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The comment inside the code block was left in English; translating it improves language purity for the reader. |
### quiz:quiz-modern-css-2025 · ja · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 97 | ✓ | The candidate provided a high-quality translation that captures Dan's direct tone well. It correctly preserved all Chall |
| judge:blocking-suggestions | 0 | ✗ medium | high: The English source uses ../../../ depth. While the instructions mention locale files are one folder deeper, this s |
| judge:medium-suggestions | 75 | ✗ low | medium: Translating comments in code blocks improves readability for the target audience. |
### quiz:quiz-modern-css-2025 · ru · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 90 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 90 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 93 | ✓ | The translation is technically sound and follows the structural requirements. However, several quiz options in Challenge |
| judge:blocking-suggestions | 0 | ✗ medium | high: Option text was left in English. | high: Correct answer option text was left in English. |
| judge:medium-suggestions | 75 | ✗ low | medium: Option text was left in English. | medium: Consistency: other instances of 'Invalid syntax' were translated, but |
### quiz:quiz-modern-css-2025 · de · deepseek/deepseek-v4-flash ✓
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 98 | ✓ | The translation is technically accurate and preserves all MDX structures and quiz logic. It correctly handles the relati |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The option text was left in English. | medium: The option text was left in English. | medium: The option text wa |
### quiz:quiz-modern-css-2025 · fr · deepseek/deepseek-v4-flash ✗
**Error**: Quiz translation changed array counts for Challenge 9: explanationProse: expected 2, got 1
| Scorer | Score | Status |
| --- | --- | --- |
### quiz:quiz-modern-css-2025 · it · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 90 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 98 | ✓ | |
| judge:overall | 96 | ✓ | The translation is technically accurate and follows the requested style. It correctly handles MDX structure and asset pa |
| judge:blocking-suggestions | 0 | ✗ medium | high: Option text was left in English. | high: Option text was left in English. | high: Option text was left in English. |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · ar · deepseek/deepseek-v4-flash ✓
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent, preserving all MDX structures, component props, and technical accuracy. It correctly handl |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: Option text was left in English while other options in the same challenge were translated. | medium: Option text |
### quiz:quiz-modern-css-2025 · he · deepseek/deepseek-v4-flash ✓
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
| title-translated | 100 | ✓ | |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 97 | ✓ | The translation is technically accurate and preserves all MDX structures, including the correct relative paths for asset |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: Consistency: This option was left in English while others in the same block were translated. | medium: Consisten |
### quiz:quiz-modern-css-2025 · zh · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=1, H3=0, H4=0, H5=0, H6=0). |
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
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 98 | ✓ | The candidate followed all structural requirements, including MDX preservation and heading counts. It correctly adjusted |
| judge:blocking-suggestions | 0 | ✗ medium | high: The English source uses ../../../ and the instructions state locale files live one folder deeper, but the English  |
| judge:medium-suggestions | 75 | ✗ low | medium: Inconsistent translation: some options in this challenge were left in English while others were translated. | me |