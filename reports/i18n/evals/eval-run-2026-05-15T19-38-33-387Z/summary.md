# Translation Eval Run — 2026-05-15T19-38-33-387Z

**0 passed, 3 failed** | total cost $0.02030
Models: deepseek/deepseek-v4-flash
Judge: qwen/qwen3-32b:nitro
Run log: reports/i18n/evals/eval-run-2026-05-15T19-38-33-387Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| quiz | quiz-modern-css-2025 | es | deepseek/deepseek-v4-flash | ✗ | 92.3 | 90.0 | 0✗ | 90 | 95 | 80 | 90 | 75✗ | 90 | 95 | 95 | 85 | $0.00722 | translation-quiz-quiz-modern-css-2025-es-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | ru | deepseek/deepseek-v4-flash | ✗ | 94.7 | 97.3 | 0✗ | 97 | 94 | 99 | 100 | 75✗ | 95 | 99 | 98 | 96 | $0.00709 | translation-quiz-quiz-modern-css-2025-ru-deepseek-deepseek-v4-flash-assembled |
| quiz | quiz-modern-css-2025 | zh | deepseek/deepseek-v4-flash | ✗ | 91.2 | 86.6 | 0✗ | 88 | 82 | 75 | 98 | 75✗ | 85 | 90 | 95 | 80 | $0.00600 | translation-quiz-quiz-modern-css-2025-zh-deepseek-deepseek-v4-flash-assembled |

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
| judge:readability | 90 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 90 | ✓ | |
| judge:relevance | 95 | ✓ | |
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 95 | ✓ | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 90 | ✓ | The candidate maintains technical accuracy and structural fidelity to the English source. Headings, code blocks, and qui |
| judge:blocking-suggestions | 0 | ✗ medium | high: Typo in explanation class name ("explanation" instead of "explicación") breaks HTML/MDX markup |
| judge:medium-suggestions | 75 | ✗ low | medium: English technical prose mixed into Spanish translation violates language purity requirements | medium: English t |
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
| judge:readability | 95 | ✓ | |
| judge:technicalAccuracy | 98 | ✓ | |
| judge:coherence | 97 | ✓ | |
| judge:relevance | 99 | ✓ | |
| judge:translationQuality | 96 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 94 | ✓ | |
| judge:languagePurity | 99 | ✓ | |
| judge:overall | 97 | ✓ | The translation is technically accurate with proper MDX structure preservation. Challenges maintain correct answer posit |
| judge:blocking-suggestions | 0 | ✗ medium | high: The English text in this option breaks language purity and should be translated to maintain consistent Russian pro |
| judge:medium-suggestions | 75 | ✗ low | medium: The label field in frontmatter should be translated to maintain full Russian localization. |
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
| judge:readability | 85 | ✓ | |
| judge:technicalAccuracy | 95 | ✓ | |
| judge:coherence | 88 | ✓ | |
| judge:relevance | 90 | ✓ | |
| judge:translationQuality | 80 | ✓ | |
| judge:mdxPreservation | 98 | ✓ | |
| judge:culturalAdaptation | 82 | ✓ | |
| judge:languagePurity | 75 | ✓ | |
| judge:overall | 87 | ✓ | 候选翻译在技术准确性和MDX结构上表现优秀，但存在多处英文选项未翻译的问题，影响语言纯度。代码块和路径处理符合规范，文化适应性较好但部分选项翻译不够自然。 |
| judge:blocking-suggestions | 0 | ✗ medium | high: 未翻译的英文选项违反语言纯度要求，需保持读者面向内容全中文 | high: 未翻译的英文选项违反语言纯度要求，需保持读者面向内容全中文 | high: 未翻译的英文选项违反语言纯度要求，需保持读者面向内容全中文 | high:  |
| judge:medium-suggestions | 75 | ✗ low | medium: 英文选项需要翻译以保持语言一致性 | medium: 英文选项需要翻译以保持语言一致性 | medium: 英文选项需要翻译以保持语言一致性 |