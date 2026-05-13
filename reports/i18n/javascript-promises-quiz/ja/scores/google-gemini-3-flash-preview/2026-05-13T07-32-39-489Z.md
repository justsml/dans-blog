# Translation Score

- Slug: javascript-promises-quiz
- Locale: ja
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.8/100
- Recommendation: accept
- Hash: 4fb93d7962d262c8850b1e2baf7bf5aefb5ebbf844a58e1765bf15de448037d5
- JSON archive: reports/i18n/javascript-promises-quiz/ja/scores/google-gemini-3-flash-preview/2026-05-13T07-32-39-489Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 98 |
| coherence | 95 |
| relevance | 100 |
| translationQuality | 94 |

## Analysis

The translation is of high quality, maintaining the technical nuance of JavaScript Promises while adopting a natural instructional tone in Japanese. MDX structures and component props are preserved correctly. The translator successfully handled the distinction between 'pending' and 'unhandled' states in the explanations.

## Strengths

- Accurate translation of technical concepts like 'executor', 'pending', and 'unhandled rejection'.
- Consistent use of polite but direct technical Japanese (Desu/Masu style).
- Correct adjustment of relative image paths (e.g., adding '../') to maintain functionality in the localized directory structure.

## Issues

- low / readability: The subTitle in the frontmatter was left empty in the translation, whereas the source had 'Never drop a promise again!'. (subTitle: '')
- low / coherence: Slight inconsistency in translating the 'group' prop: 'Handling Errors' is translated as both 'エラーの処理' and 'エラーのハンドリング'. (group="エラーの処理" vs group="エラーのハンドリング")
- low / readability: A minor syntax error in the explanation of Challenge #7 where a closing parenthesis and backtick are missing in the hint text. (`.then(value => /* ハンドリング */)に順番に渡します。)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 7002 | 443 | 0 | 0 | 3430 | $0.004830 |
