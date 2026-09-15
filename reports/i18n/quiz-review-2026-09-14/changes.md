# Quiz translation fixes and verification

Implemented September 14, 2026, following the [critical review](./report.md).

## Changes

- **Hebrew Rust:** corrected terminology, literal output choices, the lifetime-bound explanation, implicit Copy semantics, and thread/process confusion. Hebrew prose remains RTL; code blocks and inline code use isolated LTR layout. Answer labels isolate their text direction.
- **German PostgreSQL:** repaired the damaged timestamp choice, doubled wording, typed-literal terminology, `NOT VALID` wording, missing section heading, and ambiguous fractional-second question.
- **Hindi PostgreSQL:** corrected the reversed timestamp explanation and misleading distractor, removed duplicated explanation text, fixed terminology and typos, restored literal SQL type choices and the missing section heading.
- **French JavaScript errors:** restored literal error messages and booleans, repaired titles and terminology, restored hint slots, clarified the iframe/V8 assumptions, and qualified the `Symbol.toStringTag` authenticity claim.
- **Chinese dates:** clarified single-answer selection, repeated the GMT−7 assumption where needed, distinguished represented dates from console formatting, and corrected explanations of `Date()` without `new`, `Date.UTC()` returning `NaN`, and timezone offsets. Restored literal error choices and hint-slot placement.
- **English sources:** corrected the shared technical errors so future translations can inherit accurate content. Rust explanation fixes were applied to all ten translations: the corrected RefCell example releases its mutable borrow; the mutex answer permits deadlock or panic; iterator performance is conditional rather than guaranteed; the borrowed Range example clones before consuming it.
- **Quiz behavior:** navigation and scoring initialize independently of delayed decorative effects. An immediate answer safely handles the scoring callback. Individual questions retain lazy hydration. Controls, hints, score summaries, reset, and completion messages have translations for all supported languages. RTL navigation arrows and keyboard direction are aligned.
- **Translation tooling:** syntax-based option parsing preserves escaped apostrophes, braces, backslashes, quoted property names, and literal values without evaluating expressions. Integrity checks distinguish actual fields from colons inside answer text and permit translation of the prose prefix “Prints:” while preserving its output.

## Verified results

Chromium, production build served locally on port 4244, desktop 1440×1000 and mobile 390×844. These are local production-preview results, not a deployed-site claim.

| Language | Correct answers | Restored after reload | Correct after reset | Ready after navigation | Prose / code |
|---|---:|---:|---:|---:|---|
| Hebrew | 18/18 | 18 | 0 | 1.25 s | RTL / LTR |
| German | 14/14 | 14 | 0 | 1.39 s | LTR / LTR |
| Hindi | 14/14 | 14 | 0 | 1.39 s | LTR / LTR |
| French | 14/14 | 14 | 0 | 1.39 s | LTR / LTR |
| Chinese | 14/14 | 14 | 0 | 1.39 s | LTR / LTR |

All 74 explanations opened, wrong-answer feedback worked, and Enter/Space selected answers. No page errors occurred. All five mobile pages had a 390px document width in a 390px viewport; long code remains horizontally scrollable within its own block. The startup timings are observations from this run, not a general performance benchmark.

Additional checks:

- Six browser regression tests passed: English plus all five reviewed translations, immediate answering, localized explanation controls, and code direction.
- 123 targeted parser, integrity, structural-validation, and judge unit tests passed.
- All five reviewed translations passed structural and integrity validation.
- All 2,937 quiz questions in the corpus parsed successfully.
- All 44 corrected Rust explanation examples (four examples × English and ten translations) compiled and ran successfully.
- Applicable JavaScript examples were executed again; cross-realm and spoofed-tag behavior is recorded separately from UI grading.
- Astro check: 0 errors, 0 warnings, 93 hints. Content check: 0 errors, 52 warnings. The production build completed: 1,597 pages, with Pagefind indexing 1,599 pages.

## Evidence and reproduction

- [Browser results for all 74 questions](./after/final-browser-results.json)
- [Startup regression results](./after/startup-tests.txt)
- [Translation validation](./after/validation.txt)
- [Unit tests](./after/unit-tests.txt)
- [Rust execution results](./after/rust-examples.json)
- [JavaScript execution results](./after/js-results.json)
- [Hebrew code on mobile](./after/he-mobile.png), [settled Hebrew explanation](./after/he-explanation-settled.png), [Chinese mobile view](./after/zh-mobile.png)

With the production preview on port 4244, run `bun reports/i18n/quiz-review-2026-09-14/after/verify-quizzes.mjs` from the repository root to repeat the five complete quizzes and regenerate browser evidence. The script fails if grading, explanation display, restoration, reset, completion, code direction, or viewport width checks fail. Routine startup coverage lives in `tests/e2e/quiz-runtime.spec.ts`.

## Remaining boundary

The historical translation scores remain unchanged and must not be presented as scores for these corrected files. Automatic approval review rejected the attempted external rescoring because it would send quiz text to an external judge. No inference ran and no new score was fabricated. Rescoring requires permission to send these five source/translation pairs to the configured OpenRouter judge.

No deployment was performed. PostgreSQL answers remain documentation-checked rather than executed against a live database. Browser coverage is Chromium; other engines and physical devices were not tested. Other quizzes and the unreviewed translations of the PostgreSQL/JavaScript source corrections have not received this full editorial and browser review.
