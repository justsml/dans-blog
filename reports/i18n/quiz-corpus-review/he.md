# Hebrew quiz corpus review — 2026-09-14

## Scope and evidence

Reviewed all 19 Hebrew quizzes, all 267 questions, and all 1,231 answer options against the corresponding English questions. Read the questions and explanations critically, including the code examples. Correct-answer positions were preserved. The syntax-aware parser confirms equal source/translation question counts, equal option counts and answer flags, unique option labels, and nonempty questions/explanations. See `he-integrity.txt`.

This is a content and structural review. The parent task owns the full Playwright interaction suite and shared-source/tooling corrections. This ledger does not claim that cloud services or SQL were executed. No external AI judge was used and no quality scores were fabricated.

## Review ledger

Question numbers are one-based. Every question in each stated range was reviewed; the notes name actionable changes or important observations.

| Quiz | Questions reviewed | Findings and final Hebrew changes |
|---|---:|---|
| JavaScript promises | 1–9 | Q3 explains that returning an Error object also fulfills the next promise. Q4 explains that `console.log` returns `undefined`, not a function. Q5 replaces untranslated and incorrect English assertion that a later `.then` is necessary to handle rejection; recovery occurs without it. Corrected repeated grammatical error in prompts. Literal output strings preserved. Q9 still uses an English annotated-code image inherited from source; adjacent question/options remain accessible. |
| Date/time | 1–14 | Q1–2 and Q10–14 ask for the represented local date rather than browser-specific console formatting; dates use readable Hebrew month names consistently. Q4–5/9 repeat GMT−07:00 assumption. Q3 explains legal `Date()` call returns current local string and ignores arguments. Q7 explains `NaN` followed by `TypeError`. Q9 removes invariant-timezone-offset claim and explains DST/date dependence. Preserved literal RangeError choices. |
| Data structures/algorithms | 1–20 | Standardized complexity, traversal and queue vocabulary; added English operation names to distinguish enqueue/dequeue from push/pop. Q3 specifies no stored size counter. Q11 narrows Dijkstra prompt to greedy single-source/priority-queue algorithm; other listed algorithms can also compute shortest paths. Q20 specifies strict-greater swaps to make stability unambiguous. |
| ESNext | 1–11 | Q1 no longer references nonexistent `result` binding. Q6 restores exact `fulfilled: success` and other output choices. Kept literal TypeError wording. |
| Symbols/enumerables | 1–7 | Replaced property mistranslation “asset” (נכס) with מאפיין. Standardized enumeration as מנייה. Q6 title no longer implies Symbol properties themselves cannot be enumerable. |
| HTML5 | 1–14 | Fixed grouping grammar and native-feature wording. Restored source `image.jpg` inside illustrative code (the translation had incorrectly rewritten it as a real nested asset). Flagged Q2 definition/details and Q3 figure distractor ambiguity for central source repair. |
| BigInt/numbers | 1–13 | Q4 restores actual `Infinity` token, not translated prose. Restored missing introductory blockquote. Arithmetic and literal numerical answer choices retained. |
| Modern CSS | 1–11 | Localized “Invalid syntax” prose. Q3 explicitly supplies 16px root font assumption. Q4 says first column, not an arbitrary single column. |
| CSS core | 1–14 | Standardized selector vocabulary as בורר. Q1 explains vmin/vmax as 1% of smaller/larger viewport dimension. Q9 asks about text directly. No answer-key change. |
| SQL fundamentals | 1–11 | Q5 defines correlation via outer-column references and separates logical evaluation from optimized physical execution. Q8 fixes “any” versus “all” membership semantics and removes unsupported UNIQUE-index recommendation. |
| Destructuring | 1–12 | Restored literal output labels/names for Q1–5 and Q7–8; translated output had made correct program output unavailable. Q2 title identifies array destructuring and missing element. Q4 replaces contradictory nested-default explanation and untranslated English paragraph. Q7 recognizes explicit `undefined` argument too. Q8 distinguishes property defaults from whole-parameter defaults. Restored missing TypeScript section heading and quiz-collection closing link. |
| Regex | 1–16 | Q10 accounts for case-insensitive `i` flag; Q13 fixes reversed/ungrammatical lookbehind wording. Literal regexes and answer arrays retained. Shared validator falsely treats inline-code `<b>` as real unclosed HTML; parent informed. |
| Node files/streams | 1–15 | Q1 distinguishes uninitialized memory from random data. Q6 correct option says chunked copying without loading the whole file, not no buffering. Q9 replaces “dubbing” false friend with debouncing explanation. Q13 excludes `null` from objectMode data and standardizes “stream” as זרם. |
| Bash | 1–16 | Restored literal Cost, File exists, Different cats, good cat output choices. Q4 states missing positional argument assumption. Q14 asks about loop-syntax keywords so `do` remains valid. Q16 uses file descriptor terminology and correct title. Escaped quote/backslash command choices preserved. |
| PostgreSQL I | 1–14 | Typed literal terminology; transaction commit and next-query distractors mistranslated as engagement/request corrected. Q5 duplicate timestamp section removed. Q12 asks for fewest fractional digits exceeding six, not smallest timestamp; rounding wording corrected. Restored missing intermediate heading. |
| PostgreSQL II | 1–12 | Corrected literal “red herrings” wording, rollback and hash-join terminology. Q9 says approximately 10%. Q10 partial index explanation uses provable predicate implication and planner choice, not exact text matching. |
| Rust memory | 1–18 | Preserved previous corrected borrow/Mutex/Clone/zero-cost examples. Standardized threads to תהליכונים, lifetimes to זמני חיים, borrowing to השאלה. Corrected “baptized borrows” mistranslation, moved-value wording, compiler/translation confusion, and remaining lifetime-elision mistranslation. |
| AWS cloud | 1–26 | S3 acronym choices include original English expansions plus Hebrew meaning. Fixed failover/standby, scaling, best-effort TTL mistranslations; TTL no longer promises optimal timing. Q10 specifically asks single UpdateItem operation. Q11 removes blanket cheaper claim. Q24 scopes strong consistency to object reads/writes/deletes/lists. Completed truncated Streams hint. |

## Terminology decisions

Compared terminology across this corpus and related Hebrew posts, including the WeakMap article (`2025-12-29--weakmap-the-javascript-feature-you-dont-use/he/index.mdx`) and foreign-key performance article (`2025-12-29--your-foreign-keys-are-killing-performance/he/index.mdx`). Existing related translations are useful consistency evidence, not an authority that overrides technical meaning.

- **Object property:** מאפיין; “asset/property” נכס is inappropriate here.
- **Enumerable:** ניתן למנייה; keep the API token `enumerable` alongside the concept.
- **Thread:** תהליכון, distinct from process and literal thread/fiber words.
- **Rust lifetime/borrow:** זמן חיים / השאלה. Keep `Copy`, `Clone`, `Rc`, `RefCell`, `Send`, `Sync` literal.
- **Selector:** בורר; retain CSS syntax unmodified.
- **Stream:** זרם; explain backpressure/debouncing rather than mistranslate them literally.
- **Database transaction:** טרנזקציה; keep `COMMIT`, `ROLLBACK`, `UPDATE` recognizable.
- **Program output:** preserve literal characters, casing, punctuation and names. Translate explanatory wrappers, not `fulfilled: success`, `Name: Dan Levy`, `Infinity`, or error-class tokens.
- **Dates:** translated month names are appropriate when asking what date an object represents; they are not claimed to match console text.
- **Named algorithms:** Hebrew explanation plus familiar English operation name where distinctions matter.

## Verification and shared follow-up

`he-integrity.txt` records 267/267 parsed questions and 1,231 options with preserved answer flags. `git diff --check` passed. Ran locale validation for every quiz. Several broad checks still reject legitimate translated prose as code because of `&`, semicolons, parentheses or CSS-unit fragments; these include “Width: 110px”, “Input & output modes”, and “Groups rows by the specified column(s)”. The older option counter also miscounts quoted object keys present in English Rust content. These were sent to the parent for shared parser/validator repair. Source-sensitive validation must be rerun after that repair and central English edits settle.

Technical corrections were cross-checked against the [Node stream documentation](https://nodejs.org/api/stream.html#object-mode) and [AWS S3 consistency explanation](https://aws.amazon.com/s3/consistency/). Central review owns AWS freshness and remaining shared-source issues, including potentially overbroad costs, limits, and HTML distractors.
