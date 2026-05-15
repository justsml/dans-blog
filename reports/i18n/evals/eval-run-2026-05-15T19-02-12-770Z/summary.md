# Translation Eval Run — 2026-05-15T19-02-12-770Z

**0 passed, 10 failed** | total cost $0.03089
Models: deepseek/deepseek-v4-flash
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T19-02-12-770Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| article | one-weird-trick-to-speed-up-feature-teams | es | deepseek/deepseek-v4-flash | ✗ | 88.7 | 99.4 | 100 | 100 | 95 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00370 | translation-article-one-weird-trick-to-speed-up-feature-teams-es-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | hi | deepseek/deepseek-v4-flash | ✗ | 91.6 | 96.9 | 100 | 100 | 90 | 95 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00466 | translation-article-one-weird-trick-to-speed-up-feature-teams-hi-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | ja | deepseek/deepseek-v4-flash | ✗ | 83.7 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00193 | translation-article-one-weird-trick-to-speed-up-feature-teams-ja-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | ru | deepseek/deepseek-v4-flash | ✗ | 90.6 | 96.9 | 100 | 100 | 90 | 95 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00198 | translation-article-one-weird-trick-to-speed-up-feature-teams-ru-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | de | deepseek/deepseek-v4-flash | ✗ | 91.8 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00388 | translation-article-one-weird-trick-to-speed-up-feature-teams-de-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | fr | deepseek/deepseek-v4-flash | ✗ | 91.8 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00211 | translation-article-one-weird-trick-to-speed-up-feature-teams-fr-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | it | deepseek/deepseek-v4-flash | ✗ | 91.8 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00325 | translation-article-one-weird-trick-to-speed-up-feature-teams-it-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | ar | deepseek/deepseek-v4-flash | ✗ | 91.8 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00371 | translation-article-one-weird-trick-to-speed-up-feature-teams-ar-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | he | deepseek/deepseek-v4-flash | ✗ | 86.9 | 96.9 | 100 | 100 | 90 | 95 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00403 | translation-article-one-weird-trick-to-speed-up-feature-teams-he-deepseek-deepseek-v4-flash |
| article | one-weird-trick-to-speed-up-feature-teams | zh | deepseek/deepseek-v4-flash | ✗ | 92.4 | 99.4 | 100 | 100 | 95 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00165 | translation-article-one-weird-trick-to-speed-up-feature-teams-zh-deepseek-deepseek-v4-flash |

## Score Details

### article:one-weird-trick-to-speed-up-feature-teams · es · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/es/index.mdx:16 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/es/index.mdx:17 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| title-translated | 0 | ✗ medium | Frontmatter title is still the English source title. |
| no-wrapper-text | 100 | ✓ | |
| mdx-syntax-parse | 100 | ✓ | |
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 100 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 99 | ✓ | The translation is excellent. it maintains Dan's direct and informal tone ('¡adivina qué!', 'atascarse'). It perfectly p |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:one-weird-trick-to-speed-up-feature-teams · hi · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/hi/index.mdx:16 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/hi/index.mdx:17 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| judge:overall | 97 | ✓ | The translation is excellent. It follows all technical constraints, including the relative path adjustment for assets (. |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:one-weird-trick-to-speed-up-feature-teams · ja · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:invalid-localized-asset-path | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/ja/index.mdx has 3 inherited asset path(s) that must start with ../ inside locale folders. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
| frontmatter-preserved | 100 | ✓ | |
| frontmatter-omitted:date | 100 | ✓ | |
| frontmatter-omitted:draft | 100 | ✓ | |
| frontmatter-omitted:unlisted | 100 | ✓ | |
| frontmatter-omitted:hidden | 100 | ✓ | |
| frontmatter-omitted:publish | 100 | ✓ | |
| frontmatter-omitted:popularity | 100 | ✓ | |
| frontmatter-preserve:category | 0 | ✗ medium | Expected category to stay "Engineering"; got undefined. |
| frontmatter-preserve:tags | 0 | ✗ medium | Expected tags to stay ["\"agile\"","\"teams\""]; got undefined. |
| frontmatter-preserve:modified | 0 | ✗ medium | Expected modified to stay 2024-09-30; got undefined. |
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
| judge:overall | 98 | ✓ | The translation is excellent. It maintains Dan's direct and slightly provocative tone ('Staff engineers hate this!'). It |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:one-weird-trick-to-speed-up-feature-teams · ru · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/ru/index.mdx:16 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/ru/index.mdx:17 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| judge:overall | 97 | ✓ | The translation is excellent, preserving all MDX structures, heading counts, and asset paths correctly (using the requir |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The word 'neat' was left untranslated in the prose, which feels like a minor oversight in language purity. |
### article:one-weird-trick-to-speed-up-feature-teams · de · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/de/index.mdx:17 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/de/index.mdx:18 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| judge:overall | 98 | ✓ | The translation is excellent. it maintains Dan's direct tone, preserves all MDX structures (headings, code blocks, comme |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:one-weird-trick-to-speed-up-feature-teams · fr · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/fr/index.mdx:16 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/fr/index.mdx:17 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| judge:overall | 98 | ✓ | The translation is excellent. it preserves the technical tone and direct style of the author. It correctly handles the M |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:one-weird-trick-to-speed-up-feature-teams · it · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/it/index.mdx:16 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/it/index.mdx:17 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| judge:overall | 98 | ✓ | The translation is excellent. It correctly handles the relative paths for assets (../), preserves all MDX structures and |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:one-weird-trick-to-speed-up-feature-teams · ar · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/ar/index.mdx:17 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/ar/index.mdx:18 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| judge:overall | 98 | ✓ | The translation is excellent. It maintains Dan's direct and slightly provocative tone ('Staff engineers hate this!'). It |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### article:one-weird-trick-to-speed-up-feature-teams · he · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/he/index.mdx:16 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/he/index.mdx:17 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| mdx-syntax-parse | 0 | ✗ high | one-weird-trick-to-speed-up-feature-teams/he does not parse as MDX: Could not parse expression with acorn |
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 95 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 97 | ✓ | The translation is excellent. it preserves all MDX structures, heading counts, and asset paths (correctly adding ../). I |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The English 'you' in a blog context usually refers to the audience (plural) or a general 'one'. In Hebrew, using |
### article:one-weird-trick-to-speed-up-feature-teams · zh · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/zh/index.mdx:16 closes </a> without a matching opening tag. |
| integrity:html-unmatched-closing-tag | 0 | ✗ high | /one-weird-trick-to-speed-up-feature-teams/zh/index.mdx:17 closes </a> without a matching opening tag. |
| heading-counts-by-level | 100 | ✓ | English and translation heading counts match by level (H1=0, H2=3, H3=8, H4=0, H5=0, H6=0). |
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
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 99 | ✓ | The translation is excellent. It preserves the technical accuracy and Dan's direct tone. It correctly handles the MDX st |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |