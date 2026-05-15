# Translation Eval Run — 2026-05-15T19-09-22-510Z

**0 passed, 10 failed** | total cost $0.04231
Models: deepseek/deepseek-v4-flash
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T19-09-22-510Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| quiz | quiz-modern-css-2025 | es | deepseek/deepseek-v4-flash | ✗ | 60.0 | 100.0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00338 | translation-quiz-quiz-modern-css-2025-es-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | hi | deepseek/deepseek-v4-flash | ✗ | 74.2 | 96.9 | 100 | 100 | 90 | 95 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00510 | translation-quiz-quiz-modern-css-2025-hi-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | ja | deepseek/deepseek-v4-flash | ✗ | 81.7 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00370 | translation-quiz-quiz-modern-css-2025-ja-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | ru | deepseek/deepseek-v4-flash | ✗ | 75.5 | 99.4 | 100 | 100 | 95 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00434 | translation-quiz-quiz-modern-css-2025-ru-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | de | deepseek/deepseek-v4-flash | ✗ | 66.7 | 100.0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00531 | translation-quiz-quiz-modern-css-2025-de-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | fr | deepseek/deepseek-v4-flash | ✗ | 73.0 | 100.0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00415 | translation-quiz-quiz-modern-css-2025-fr-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | it | deepseek/deepseek-v4-flash | ✗ | 60.0 | 100.0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00277 | translation-quiz-quiz-modern-css-2025-it-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | ar | deepseek/deepseek-v4-flash | ✗ | 78.8 | 97.5 | 100 | 100 | 90 | 100 | 100 | 100 | 95 | 100 | 100 | 95 | $0.00549 | translation-quiz-quiz-modern-css-2025-ar-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | he | deepseek/deepseek-v4-flash | ✗ | 78.0 | 97.5 | 100 | 100 | 90 | 100 | 100 | 75✗ | 95 | 100 | 100 | 95 | $0.00435 | translation-quiz-quiz-modern-css-2025-he-deepseek-deepseek-v4-flash |
| quiz | quiz-modern-css-2025 | zh | deepseek/deepseek-v4-flash | ✗ | 65.9 | 100.0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | $0.00371 | translation-quiz-quiz-modern-css-2025-zh-deepseek-deepseek-v4-flash |

## Score Details

### quiz:quiz-modern-css-2025 · es · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx:135 closes </slot> while <div> from line 127 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx:126 opens <slot> without a closing tag. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 0 question code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 1 explanation code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 2 explanation code block 1 changed code or language. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/es/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 0 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 0 has unexpected field(s): Ancho. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 1 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 1 has unexpected field(s): Ancho. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 2 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 2 has unexpected field(s): Ancho. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 3 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/es/index.mdx Challenge 10 option 3 has unexpected field(s): Ancho. |
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
| frontmatter-preserve:label | 0 | ✗ medium | Expected label to stay "Advanced CSS"; got "CSS Avanzado". |
| frontmatter-preserve:modified | 100 | ✓ | |
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:overall | 100 | ✓ | The translation is excellent. It perfectly preserves the MDX structure, including all Challenge props and answer flags.  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · hi · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/hi/index.mdx:136 closes </slot> while <div> from line 128 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/hi/index.mdx:127 opens <slot> without a closing tag. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/hi/index.mdx Challenge 1 explanation code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/hi/index.mdx Challenge 2 explanation code block 1 changed code or language. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/hi/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/hi/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/hi/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/hi/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
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
| frontmatter-preserve:label | 0 | ✗ medium | Expected label to stay "Advanced CSS"; got "उन्नत CSS". |
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
| judge:overall | 97 | ✓ | The translation is excellent. It maintains the technical accuracy of the CSS concepts while translating the prose into n |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · ja · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/ja/index.mdx:135 closes </slot> while <div> from line 127 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/ja/index.mdx:126 opens <slot> without a closing tag. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ja/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ja/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ja/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/ja/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
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
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent. It perfectly preserves the MDX structure, including all Challenge props and answer flags.  |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · ru · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx:136 closes </slot> while <div> from line 128 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx:127 opens <slot> without a closing tag. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx Challenge 0 question code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx Challenge 1 explanation code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx Challenge 2 explanation code block 1 changed code or language. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ru/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/ru/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
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
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 100 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 99 | ✓ | The translation is excellent. It perfectly preserves the MDX structure, including all Challenge props and indices. The R |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · de · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx:136 closes </slot> while <div> from line 128 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx:127 opens <slot> without a closing tag. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/de/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 0 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 0 has unexpected field(s): Breite. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 1 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 1 has unexpected field(s): Breite. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 2 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 2 has unexpected field(s): Breite. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 3 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/de/index.mdx Challenge 10 option 3 has unexpected field(s): Breite. |
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
| judge:readability | 100 | ✓ | |
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 100 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 100 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 100 | ✓ | |
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 100 | ✓ | The translation is excellent. it maintains the technical accuracy of the CSS concepts while adopting a natural, direct G |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · fr · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx:135 closes </slot> while <div> from line 127 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx:126 opens <slot> without a closing tag. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx Challenge 0 question code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx Challenge 1 explanation code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx Challenge 2 explanation code block 1 changed code or language. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/fr/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/fr/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
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
| frontmatter-preserve:label | 0 | ✗ medium | Expected label to stay "Advanced CSS"; got "CSS avancé". |
| frontmatter-preserve:modified | 100 | ✓ | |
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:overall | 100 | ✓ | The translation is excellent. it preserves all MDX structures, heading counts, and quiz logic perfectly. The French pros |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · it · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx:135 closes </slot> while <div> from line 127 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx:126 opens <slot> without a closing tag. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 0 question code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 1 explanation code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 2 explanation code block 1 changed code or language. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/it/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 0 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 0 has unexpected field(s): Larghezza. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 1 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 1 has unexpected field(s): Larghezza. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 2 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 2 has unexpected field(s): Larghezza. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 3 is missing expected field(s): Width. |
| integrity:quiz-option-unexpected-field | 0 | ✗ high | /quiz-modern-css-2025/it/index.mdx Challenge 10 option 3 has unexpected field(s): Larghezza. |
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
| frontmatter-preserve:label | 0 | ✗ medium | Expected label to stay "Advanced CSS"; got "CSS Avanzato". |
| frontmatter-preserve:modified | 100 | ✓ | |
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:overall | 100 | ✓ | The translation is excellent. it accurately captures Dan's direct and informal tone ('eh?', 'riscaldamento', 'nessuna no |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · ar · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/ar/index.mdx:135 closes </slot> while <div> from line 127 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/ar/index.mdx:126 opens <slot> without a closing tag. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ar/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ar/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/ar/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/ar/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
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
| frontmatter-preserve:label | 0 | ✗ medium | Expected label to stay "Advanced CSS"; got "CSS متقدم". |
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
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is excellent. it preserves all MDX structures, heading counts, and quiz logic perfectly. The Arabic pros |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · he · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/he/index.mdx:135 closes </slot> while <div> from line 127 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/he/index.mdx:126 opens <slot> without a closing tag. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/he/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/he/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/he/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/he/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
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
| frontmatter-preserve:label | 0 | ✗ medium | Expected label to stay "Advanced CSS"; got "CSS מתקדם". |
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
| judge:languagePurity | 100 | ✓ | |
| judge:overall | 98 | ✓ | The translation is technically accurate and preserves all MDX structures, including the complex Challenge components and |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The word 'להתקנה' (for installation) is a mistranslation of 'to scale'. 'להשתנות' or 'להתרחב' is more appropriat |
### quiz:quiz-modern-css-2025 · zh · deepseek/deepseek-v4-flash ✗
| Scorer | Score | Status |
| --- | --- | --- |
| integrity:html-mismatched-closing-tag | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx:135 closes </slot> while <div> from line 127 is still open. |
| integrity:html-unclosed-tag | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx:126 opens <slot> without a closing tag. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 0 question code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 1 explanation code block 1 changed code or language. |
| integrity:quiz-code-block-preservation | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 2 explanation code block 1 changed code or language. |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 3 changed code-like quiz option "Set Columns to 100px, Rows to 200px". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 7 changed code-like quiz option "Filename must end w/ .scss". |
| integrity:quiz-code-option-preservation | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 7 changed code-like quiz option "`.title` must precede properties like `color`". |
| integrity:quiz-code-line-length | 0 | ✗ medium | /quiz-modern-css-2025/zh/index.mdx Challenge 9 explanation slot has a code line 67 chars long; keep quiz code lines near 63 chars for mobile readability. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 10 option 0 is missing expected field(s): Width. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 10 option 1 is missing expected field(s): Width. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 10 option 2 is missing expected field(s): Width. |
| integrity:quiz-option-missing-field | 0 | ✗ high | /quiz-modern-css-2025/zh/index.mdx Challenge 10 option 3 is missing expected field(s): Width. |
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
| frontmatter-preserve:label | 0 | ✗ medium | Expected label to stay "Advanced CSS"; got "高级CSS". |
| frontmatter-preserve:modified | 100 | ✓ | |
| frontmatter-preserve:minReleaseDate | 100 | ✓ | |
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
| judge:overall | 100 | ✓ | The translation is excellent. It accurately captures Dan's direct and slightly informal technical style while maintainin |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 100 | ✓ | |