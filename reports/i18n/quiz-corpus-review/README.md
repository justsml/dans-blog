# Quiz translation corpus review

Status: language review and regression verification in progress, 2026-09-14.

## Scope

The corpus contains 19 English quizzes and 190 translations across Arabic, Chinese, French, German, Hebrew, Hindi, Italian, Japanese, Russian and Spanish. Each language has 267 questions and 1,231 answer choices. Including English, browser coverage targets 209 pages, 2,937 questions and 13,541 choices.

Each language has its own review agent and answer ledger. The ledgers document semantic review; matching the source answer positions alone does not establish correctness. Historical AI quality scores are not refreshed by this work.

## Translation findings and repairs

- Restored literal console output, error text and code tokens that had been translated or altered, including Bash, Node streams, destructuring and Promise answers.
- Repaired duplicated or truncated choices, ambiguous distractors, missing hints, learning objectives, explanatory paragraphs and documentation links.
- Added localized text where an English annotated image had been the only explanation.
- Used related articles to settle terminology within each language. API names remain intact; explanations use the language's established technical vocabulary. Each ledger gives concrete examples.

## Language ledgers

Each ledger records answer choices and terminology decisions against related articles in that language.

| Language | Review |
|---|---|
| Arabic | [Arabic ledger](ar.md) |
| Chinese | [Chinese ledger](zh.md) |
| French | [French ledger](fr.md) |
| German | [German ledger](de.md) |
| Hebrew | [Hebrew ledger](he.md) |
| Hindi | [Hindi ledger](hi.md) |
| Italian | [Italian ledger](it.md) |
| Japanese | [Japanese ledger](ja.md) |
| Russian | [Russian ledger](ru.md) |
| Spanish | [Spanish ledger](es.md) |

## Source corrections

The English source was corrected alongside translations so the fixes remain available to future translation runs:

- Removed ambiguous HTML, graph algorithm and CSS questions; clarified fixed timezone and root-font assumptions.
- Corrected Promise recovery and nested destructuring explanations, including the distinction between an absent object and an absent property.
- Clarified Node uninitialized buffers and stream object mode. [Node Buffer documentation](https://nodejs.org/api/buffer.html), [object-mode documentation](https://nodejs.org/api/stream.html#object-mode).
- Narrowed DynamoDB single-item updates, batch limits, capacity tradeoffs and S3 consistency statements to their documented scope. [UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html), [BatchGetItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html), [on-demand capacity](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode.html), [S3 consistency](https://aws.amazon.com/s3/consistency/).
- Corrected partial-index predicate matching and PostgreSQL SQL-standard claims. [Partial indexes](https://www.postgresql.org/docs/current/indexes-partial.html), [INSERT compatibility](https://www.postgresql.org/docs/18/sql-insert.html).
- Corrected BigInt/parseInt prefix comparisons, Bash quoting, regex backtracking, Rust borrowing and misleading error-recognition hints. Unicode property escapes support either Unicode-aware flag, `u` or `v`; removed an unsupported historical claim about `toLocaleFormat()`. [Unicode-aware regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode).

## Shared fixes

Two Promise questions use client-only rendering. Navigation previously counted only question elements already in the DOM, so startup timing could turn the nine-question quiz into a seven-question navigation list. The manager now retains those islands in order and waits for their markup. A controlled slow-load regression reproduced seven navigation buttons before the fix; the full corpus test also checks the navigation count against authored questions.

A wrong answer previously scheduled automatic navigation after 950 ms. Navigation now advances only after a correct answer, cancels stale timers, and checks that the reader is still on the answered slide. The final celebration requires every answer to be correct.

Translation checks now parse option fields instead of confusing quoted colons and braces with properties. They distinguish natural prose from executable output, preserve inline code, and recognize indented MDX fences and JSX attributes. Added optional hints remain visible as editorial review findings rather than invalid component fields.

## Regression coverage

- Static corpus tests check every page for question counts, sequential indices, distinct nonempty choices, exactly one answer and agreement with the English answer position.
- The browser suite attempts every distractor and correct choice, checks rendered labels and local feedback, uses keyboard selection, and verifies the final score.
- A mobile pass for every language checks explanation controls, page/code direction, horizontal code scrolling, saved scores, reset and page overflow. A separate test verifies that English, Arabic and Japanese progress stays independent.

## Verification results

| Check | Result |
|---|---|
| Final source alignment | 19 source hashes represented in every language ledger |
| Scoped translation validation | 190/190 passed |
| Static corpus and targeted unit tests | 342 passed |
| Astro type check | 0 errors; 94 hints |
| Site-wide content check | 0 errors; 64 warnings |
| Production build | Passed; 1,597 pages |
| Complete browser regression | In progress |

The nine additional Hindi HTML hints were reviewed and retained as useful adaptations. Optional extra hints are advisory; missing hints, changed answer flags and unsupported option fields remain failures.

Browser testing uses Chromium against a stable production preview, with no development hot reload. It checks interaction and representation; the language ledgers document semantic review. AWS and PostgreSQL behavior was checked against documentation, not by running live cloud/database operations. Historical AI scores were preserved. No production deployment or fresh external AI rescoring is included.

To repeat the regression with the project's configured local test server:

```sh
bun test src/scripts/i18n/quiz-corpus.test.ts src/scripts/i18n/quiz-parser.test.ts src/scripts/i18n/structural-validation.test.ts src/scripts/i18n/judge.test.ts
bunx playwright test tests/e2e/quiz-corpus.spec.ts tests/e2e/quiz-runtime.spec.ts --workers=8
```
