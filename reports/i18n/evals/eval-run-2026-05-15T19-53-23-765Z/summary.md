# Translation Eval Run — 2026-05-15T19-53-23-765Z

**1 passed, 9 failed** | total cost $0.10654
Models: openai/gpt-oss-120b:nitro
Judge: google/gemini-3-flash-preview
Run log: reports/i18n/evals/eval-run-2026-05-15T19-53-23-765Z/run.jsonl

## Results

| Kind | Slug | Locale | Model | Pass | Overall | Judge | blocking-suggestions | coherence | culturalAdaptation | languagePurity | mdxPreservation | medium-suggestions | readability | relevance | technicalAccuracy | translationQuality | Cost | Stream Id |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| quiz | quiz-modern-css-2025 | es | openai/gpt-oss-120b:nitro | ✗ | 92.3 | 90.0 | 0✗ | 90 | 85 | 80 | 95 | 75✗ | 90 | 100 | 95 | 85 | $0.01167 | translation-quiz-quiz-modern-css-2025-es-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | hi | openai/gpt-oss-120b:nitro | ✓ | 97.6 | 95.3 | 100 | 95 | 90 | 95 | 100 | 75✗ | 90 | 100 | 100 | 92 | $0.01138 | translation-quiz-quiz-modern-css-2025-hi-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | ja | openai/gpt-oss-120b:nitro | ✗ | 92.2 | 86.9 | 0✗ | 90 | 80 | 80 | 90 | 100 | 85 | 90 | 95 | 85 | $0.01199 | translation-quiz-quiz-modern-css-2025-ja-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | ru | openai/gpt-oss-120b:nitro | ✗ | 92.5 | 90.6 | 0✗ | 90 | 90 | 90 | 90 | 75✗ | 85 | 100 | 95 | 85 | $0.01116 | translation-quiz-quiz-modern-css-2025-ru-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | de | openai/gpt-oss-120b:nitro | ✗ | 93.1 | 92.5 | 0✗ | 95 | 85 | 90 | 95 | 75✗ | 90 | 100 | 95 | 90 | $0.00907 | translation-quiz-quiz-modern-css-2025-de-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | fr | openai/gpt-oss-120b:nitro | ✗ | 92.9 | 91.9 | 0✗ | 95 | 90 | 85 | 95 | 75✗ | 90 | 100 | 95 | 85 | $0.00932 | translation-quiz-quiz-modern-css-2025-fr-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | it | openai/gpt-oss-120b:nitro | ✗ | 92.8 | 88.8 | 0✗ | 90 | 85 | 80 | 95 | 100 | 85 | 100 | 95 | 80 | $0.01044 | translation-quiz-quiz-modern-css-2025-it-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | ar | openai/gpt-oss-120b:nitro | ✗ | 92.1 | 89.4 | 0✗ | 90 | 85 | 80 | 90 | 75✗ | 90 | 100 | 95 | 85 | $0.00996 | translation-quiz-quiz-modern-css-2025-ar-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | he | openai/gpt-oss-120b:nitro | ✗ | 94.0 | 95.3 | 0✗ | 95 | 90 | 95 | 100 | 75✗ | 90 | 100 | 100 | 92 | $0.01032 | translation-quiz-quiz-modern-css-2025-he-openai-gpt-oss-120b-nitro-assembled |
| quiz | quiz-modern-css-2025 | zh | openai/gpt-oss-120b:nitro | ✗ | 87.0 | 81.9 | 0✗ | 80 | 80 | 85 | 70✗ | 100 | 85 | 90 | 90 | 75 | $0.01122 | translation-quiz-quiz-modern-css-2025-zh-openai-gpt-oss-120b-nitro-assembled |

## Score Details

### quiz:quiz-modern-css-2025 · es · openai/gpt-oss-120b:nitro ✗
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
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 90 | ✓ | The candidate generally follows the MDX structure and technical requirements, but it failed to translate the subtitle (l |
| judge:blocking-suggestions | 0 | ✗ medium | high: The model leaked a placeholder/instruction instead of translating the subtitle. |
| judge:medium-suggestions | 75 | ✗ low | medium: Unfinished translation in quiz option. | medium: Unfinished translation in quiz option. | medium: Unfinished tra |
### quiz:quiz-modern-css-2025 · hi · openai/gpt-oss-120b:nitro ✓
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
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 95 | ✓ | The candidate followed all structural requirements, including MDX preservation, heading counts, and asset path adjustmen |
| judge:blocking-suggestions | 100 | ✓ | |
| judge:medium-suggestions | 75 | ✗ low | medium: The subtitle was left in English, but the instructions require reader-facing frontmatter to be translated. | med |
### quiz:quiz-modern-css-2025 · ja · openai/gpt-oss-120b:nitro ✗
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
| judge:relevance | 90 | ✓ | |
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 80 | ✓ | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 87 | ✓ | The candidate correctly preserved the MDX structure and technical code blocks, but it failed significantly on the frontm |
| judge:blocking-suggestions | 0 | ✗ medium | high: The LLM failed to translate the subtitle and leaked an instruction-following error message into the frontmatter. | |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · ru · openai/gpt-oss-120b:nitro ✗
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
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 91 | ✓ | The candidate provides a high-quality translation that captures Dan's direct style. It correctly handles MDX structure a |
| judge:blocking-suggestions | 0 | ✗ medium | high: Missing space and hyphen in technical term. | high: Missing space between words. | high: Missing space between wor |
| judge:medium-suggestions | 75 | ✗ low | medium: Option text left in English. | medium: Option text left in English. |
### quiz:quiz-modern-css-2025 · de · openai/gpt-oss-120b:nitro ✗
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
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 90 | ✓ | |
| judge:overall | 93 | ✓ | The candidate followed MDX structural requirements well and provided a high-quality German translation of the technical  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The LLM leaked a placeholder instruction instead of translating the subtitle. |
| judge:medium-suggestions | 75 | ✗ low | medium: Partial English leak in quiz option. | medium: Partial English leak in quiz option. | medium: Partial English le |
### quiz:quiz-modern-css-2025 · fr · openai/gpt-oss-120b:nitro ✗
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
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 85 | ✓ | |
| judge:overall | 92 | ✓ | The candidate provides a high-quality translation that respects the MDX structure and Dan's direct tone. However, it mis |
| judge:blocking-suggestions | 0 | ✗ medium | high: The question text in Challenge index 5 was left in English. |
| judge:medium-suggestions | 75 | ✗ low | medium: Option text in Challenge index 3 was left in English. | medium: Option text in Challenge index 3 was left in Eng |
### quiz:quiz-modern-css-2025 · it · openai/gpt-oss-120b:nitro ✗
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
| judge:translationQuality | 80 | ✓ | |
| judge:mdxPreservation | 95 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 89 | ✓ | The candidate followed structural requirements well but failed significantly on the frontmatter subtitle (leaking a ques |
| judge:blocking-suggestions | 0 | ✗ medium | high: The LLM leaked a question asking for the subtitle instead of translating it. | high: Untranslated option text. | h |
| judge:medium-suggestions | 100 | ✓ | |
### quiz:quiz-modern-css-2025 · ar · openai/gpt-oss-120b:nitro ✗
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
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 85 | ✓ | |
| judge:mdxPreservation | 90 | ✓ | |
| judge:culturalAdaptation | 85 | ✓ | |
| judge:languagePurity | 80 | ✓ | |
| judge:overall | 89 | ✓ | The candidate generally followed the MDX structure and technical requirements, but it failed to translate several quiz o |
| judge:blocking-suggestions | 0 | ✗ medium | high: The model leaked LLM instruction/query text into the frontmatter instead of translating the subtitle. | high: The  |
| judge:medium-suggestions | 75 | ✗ low | medium: The option text was left in English. |
### quiz:quiz-modern-css-2025 · he · openai/gpt-oss-120b:nitro ✗
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
| judge:technicalAccuracy | 100 | ✓ | |
| judge:coherence | 95 | ✓ | |
| judge:relevance | 100 | ✓ | |
| judge:translationQuality | 92 | ✓ | |
| judge:mdxPreservation | 100 | ✓ | |
| judge:culturalAdaptation | 90 | ✓ | |
| judge:languagePurity | 95 | ✓ | |
| judge:overall | 95 | ✓ | The translation is technically accurate and preserves all MDX structures, including the correct number of challenges and |
| judge:blocking-suggestions | 0 | ✗ medium | high: Missing space between words in the title of Challenge 4. | high: Missing space between words in the title of Chall |
| judge:medium-suggestions | 75 | ✗ low | medium: Grammatical error: 'צבע' (color) is masculine in Hebrew, so it should be 'איזה' instead of 'איזו'. | medium: Gra |
### quiz:quiz-modern-css-2025 · zh · openai/gpt-oss-120b:nitro ✗
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
| mdx-syntax-parse | 0 | ✗ high | quiz-modern-css-2025/zh does not parse as MDX: Could not parse import/exports with acorn |
| judge:readability | 85 | ✓ | |
| judge:technicalAccuracy | 90 | ✓ | |
| judge:coherence | 80 | ✓ | |
| judge:relevance | 90 | ✓ | |
| judge:translationQuality | 75 | ✓ | |
| judge:mdxPreservation | 70 | ✗ low | |
| judge:culturalAdaptation | 80 | ✓ | |
| judge:languagePurity | 85 | ✓ | |
| judge:overall | 82 | ✓ | The candidate translated most of the content correctly but had a significant failure in the frontmatter (leaking an LLM  |
| judge:blocking-suggestions | 0 | ✗ medium | high: The model failed to translate the subtitle and instead output an LLM refusal/error message. | high: Duplicate and  |
| judge:medium-suggestions | 100 | ✓ | |