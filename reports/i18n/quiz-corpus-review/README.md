# Quiz translation corpus review

Status: language review and regression verification in progress, 2026-09-14.

## Scope

The corpus contains 19 English quizzes and 190 translations across Arabic, Chinese, French, German, Hebrew, Hindi, Italian, Japanese, Russian and Spanish. Each language has 267 questions and 1,231 answer choices. Including English, browser coverage targets 209 pages, 2,937 questions and 13,541 choices.

Each language has its own review agent and answer ledger. The ledgers document semantic review; matching the source answer positions alone does not establish correctness. Historical AI quality scores are not refreshed by this work.

## Source corrections

The English source was corrected alongside translations so the fixes remain available to future translation runs:

- Removed ambiguous HTML, graph algorithm and CSS questions; clarified fixed timezone and root-font assumptions.
- Corrected Promise recovery and nested destructuring explanations, including the distinction between an absent object and an absent property.
- Clarified Node uninitialized buffers and stream object mode. [Node Buffer documentation](https://nodejs.org/api/buffer.html), [object-mode documentation](https://nodejs.org/api/stream.html#object-mode).
- Narrowed DynamoDB single-item updates, batch limits, capacity tradeoffs and S3 consistency statements to their documented scope. [UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html), [BatchGetItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html), [on-demand capacity](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode.html), [S3 consistency](https://aws.amazon.com/s3/consistency/).
- Corrected partial-index predicate matching and PostgreSQL SQL-standard claims. [Partial indexes](https://www.postgresql.org/docs/current/indexes-partial.html), [INSERT compatibility](https://www.postgresql.org/docs/18/sql-insert.html).
- Corrected BigInt/parseInt prefix comparisons, Bash quoting, regex backtracking, Rust borrowing and misleading error-recognition hints.

## Shared fixes

A wrong answer previously scheduled automatic navigation after 950 ms. Navigation now advances only after a correct answer, cancels stale timers, and checks that the reader is still on the answered slide. The final celebration requires every answer to be correct.

Translation checks now parse option fields instead of confusing quoted colons and braces with properties. They distinguish natural prose from executable output, preserve inline code, and recognize indented MDX fences and JSX attributes. Added optional hints remain visible as editorial review findings rather than invalid component fields.

## Regression coverage

- Static corpus tests check every page for question counts, sequential indices, distinct nonempty choices, exactly one answer and agreement with the English answer position.
- The browser suite attempts every distractor and correct choice, checks rendered labels and local feedback, uses keyboard selection, and verifies the final score.
- A mobile pass for every language checks explanation controls, page/code direction, saved scores, reset and page overflow.

Final test results and the source-hash alignment manifest will be recorded here after all language changes settle. No production deployment or fresh external AI rescoring is included.
