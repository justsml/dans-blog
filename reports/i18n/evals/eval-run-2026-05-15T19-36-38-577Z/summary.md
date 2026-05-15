# Translation Eval Run — 2026-05-15T19-36-38-577Z

**0 passed, 3 failed** | total cost $0.01918
Models: deepseek/deepseek-v4-flash
Judge: deepseek/deepseek-v4-flash
Run log: reports/i18n/evals/eval-run-2026-05-15T19-36-38-577Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| quiz | quiz-modern-css-2025 | es | deepseek/deepseek-v4-flash | ✗ | 82.8 | 57.5✗ | 0✗ | 70✗ | 40✗ | 30✗ | 50✗ | 100 | 60✗ | 100 | 70✗ | 40✗ | $0.00615 | translation-quiz-quiz-modern-css-2025-es-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | ru | deepseek/deepseek-v4-flash | ✗ | 89.8 | 79.4 | 0✗ | 90 | 85 | 50✗ | 70✗ | 100 | 85 | 100 | 95 | 60✗ | $0.00670 | translation-quiz-quiz-modern-css-2025-ru-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | zh | deepseek/deepseek-v4-flash | ✗ | 90.8 | 82.5 | 0✗ | 75 | 90 | 70✗ | 85 | 100 | 70✗ | 100 | 90 | 80 | $0.00633 | translation-quiz-quiz-modern-css-2025-zh-deepseek-deepseek-v4-flash-assembled |

## Score Details

### quiz:quiz-modern-css-2025 · es · deepseek/deepseek-v4-flash ✗
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
| judge:readability | 60 | ✗ low | |
| judge:technicalAccuracy | 70 | ✗ low | |
| judge:coherence | 70 | ✗ low | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 40 | ✗ low | |
| judge:mdxPreservation | 50 | ✗ low | |
| judge:culturalAdaptation | 40 | ✗ low | |
| judge:languagePurity | 30 | ✗ low | |
| judge:overall | 57 | ✗ medium | Only candidate available, but has multiple high-priority issues: missing frontmatter fields (unlisted, date, cover comme |
| judge:blocking-suggestions | 0 | ✗ medium | high: Option text left in English; must be translated to Spanish. | high: Option text left in English; must be translate |
| judge:medium-suggestions | 100 | ✓ | |
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
| judge:readability | 85 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 90 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 60 | ✗ low | |
| judge:mdxPreservation | 70 | ✗ low | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 50 | ✗ low | |
| judge:overall | 79 | ✓ | Only candidate available; selected despite high-priority issues: missing frontmatter fields (unlisted, date) and several |
| judge:blocking-suggestions | 0 | ✗ medium | high: Missing frontmatter field 'unlisted: false' from English source. | high: Missing frontmatter field 'date' from Eng |
| judge:medium-suggestions | 100 | ✓ | |
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
| judge:readability | 70 | ✗ low | |
| judge:technicalAccuracy | 90 | ✓ | |
| judge:coherence | 75 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 80 | ✓ | |
| judge:mdxPreservation | 85 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 70 | ✗ low | |
| judge:overall | 83 | ✓ | Only selectable candidate. Translation is generally accurate and natural, but missing frontmatter fields (unlisted, date |
| judge:blocking-suggestions | 0 | ✗ medium | high: Missing frontmatter field 'unlisted: false' required for post visibility. | high: Missing frontmatter field 'date' |
| judge:medium-suggestions | 100 | ✓ | |