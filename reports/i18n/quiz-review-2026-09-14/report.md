# Critical review of the five lowest-scoring quiz translations

**Update:** The requested fixes have been implemented. See [changes and final verification](./changes.md). The findings below preserve the original pre-fix review.

Reviewed 2026-09-14 against local checkout `be53a2d71`. This is a review report, not a translation rewrite.

## Verdict

These translations need corrections before being described as fully reviewed for technical accuracy. The most serious translation errors change the meaning of a correct answer or remove the literal output from the answer choices. The Hebrew page also displays code right-to-left, visibly scrambling punctuation and making Rust harder to read.

## Selection and evidence

Selected the latest `translation_scored` record per quiz/locale from `reports/translations-log.jsonl`, sorted by `overallScore` ascending. The separate per-post `scores/` artifacts contain older May results and are not the authoritative current ranking. All selected records are dated September 13. Scores are historical: **none of the five recorded translation hashes matches the current file**. I reviewed the current files and did not invent replacement scores.

| Rank | Quiz | Language | Last recorded score | Questions |
|---|---|---|---:|---:|
| 1 | Rust memory | Hebrew, RTL | 64.8 | 18 |
| 2 | PostgreSQL Part 1 | German, LTR | 65.8 | 14 |
| 3 | PostgreSQL Part 1 | Hindi, LTR | 68.4 | 14 |
| 4 | Advanced JavaScript errors | French, LTR | 69.2 | 14 |
| 5 | JavaScript dates/time | Chinese, CJK/LTR | 71.2 | 14 |

Chinese dates/time ties with Hindi ESNext at 71.2. The alphabetical slug tie-break selects Chinese and satisfies the requested CJK coverage. These are five translation instances, covering four distinct quizzes and 74 question instances.

I compared every question, choice, hint, and explanation with English; reasoned through the answers; compiled the Rust question examples; ran the applicable JavaScript examples; checked official documentation for technical boundaries; and tested the local pages in Chromium. Compiler/runtime checks are recorded separately from browser grading: selecting an `isAnswer` choice proves that grading works, not that its text is correct.

## Priority findings

### 1. Hebrew: code is displayed right-to-left — high priority

The page correctly has `lang="he"` and `dir="rtl"`, but plain Rust code blocks inherit RTL direction. In the screenshot, `fn main() {` and punctuation around assignments/semicolons render in the wrong visual order. Keep Hebrew prose RTL while giving code blocks `direction: ltr`, left alignment, and suitable bidi isolation. Apply equivalent isolation to inline code and code-only answer choices where needed. Do not reverse the whole quiz into LTR. See [RTL code screenshot](./he-rtl-code.png).

### 2. French: two literal-output questions have no exact correct choice — high priority

Source: `src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/fr/index.mdx`.

- **Q8:** code creates `new Error('Original error')`, but the marked answer is `Erreur d'origine`. The actual result is **`Original error`**, which the explanation itself correctly states. Restore the literal English output in the answer.
- **Q10:** code uses `` `Value ${value} is invalid` ``, but the marked answer is `"Valeur undefined est invalide"`. Actual output is **`Value undefined is invalid`**. Restore literal strings in all relevant choices while translating surrounding explanations.
- **Q3:** `true`/`false` are translated to `vrai`/`faux` in output choices. Meaning remains understandable, but preserve literal booleans for consistency with a code-output question.
- **Q6:** the distractor `"Error"` becomes `"Erreur"`. This makes the distractor less plausible and changes the exercise.

This is a concrete reason to distinguish natural-language options from literal code/output during translation.

### 3. Hindi: timestamp explanation reverses the source — high priority

Source: `src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/hi/index.mdx`, Q5.

The explanation says `वे अलग-अलग प्रकार के मान संग्रहीत नहीं करते` — they **do not** store different kinds of values. The English source says they do not store the **same** kind of value. This reverses the key lesson and contradicts the marked answer.

Suggested replacement: **`दोनों 8 बाइट लेते हैं, लेकिन उनके अर्थ अलग हैं: timestamptz किसी निश्चित क्षण को दर्शाता है, जबकि timestamp बिना समय-क्षेत्र के तारीख और समय को दर्शाता है।`**

The correct choice also contains `लेकिnt`. The second choice now says both have different timestamp semantics, making it a partially correct alternative; replace it with the intended clearly false distractor. Remove the repeated `timestamp` explanation section.

PostgreSQL documents both types as eight bytes and distinguishes timestamp without time zone from an instant converted to/from the session time zone. [Official date/time documentation](https://www.postgresql.org/docs/current/datatype-datetime.html).

### 4. German: a distractor is visibly truncated — high priority

Source: `src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/de/index.mdx`, Q5.

One option is literally **`They"`**. It is neither a German sentence nor a usable answer choice. Restore a complete German distractor; for the source idea “They're the same,” use **`Sie sind identisch.`** The marked answer and main explanation are otherwise consistent. Remove the duplicate `timestamp` section.

### 5. Quiz startup can throw before navigation is ready — high priority

On all five pages, an immediate wrong/correct answer sequence produced **`window?.__updateCounts is not a function`**. The first question still changed its local state, but navigation and aggregate scoring were not ready at the time of interaction.

Relevant code:

- `src/layouts/Post.astro`: post enhancements initially wait on decorative-hero timing.
- `src/layouts/postEnhancements.ts`: quiz initialization is deferred again.
- `src/components/QuizUI/Challenge.tsx:97`: the optional chain guards `window`, not the missing function.
- `src/components/QuizUI/index.css`: later questions are hidden before navigation activates.

Initialize the functional quiz runtime independently of decorative effects. Guard the optional callback if it can legitimately be absent. Preserve lazy hydration of individual questions. The early-interaction evidence is in `browser-results.json`.

## Detailed language review

### Hebrew Rust — substantial terminology repair needed

Source: `src/content/posts/2024-12-28--quiz-is-your-memory-rusty/he/index.mdx`.

- **Q4:** `זמנים מפורשים במשתמע` is a contradictory rendering of “Implicit Lifetimes.” Prefer `זמני חיים משתמעים`; explain lifetime elision as omission of explicit lifetime annotations, not reducing the lifetime itself.
- **Q3:** “data races” becomes `תנודות נתונים` (data fluctuations). Prefer `מרוצי נתונים (data races)`.
- **Q8:** a distractor hint says no lifetimes were specified “therefore there is a mismatch.” The actual problem is a missing lifetime specifier, not an established mismatch. The source hint correctly says no mismatch has yet been established.
- **Q10:** `מוטיביות פנימית` is not a clear rendering of interior mutability. Use a consistent phrase such as `שינוי פנימי (interior mutability)`.
- **Q12:** translations mix threads with processes and contain `חד‑תהליטיות`. Use `תהליכונים (threads)` consistently. More precisely, `RefCell<T>` is not `Sync`; it can be moved to another thread when `T: Send`. “Only used in single-threaded environments” is an oversimplification inherited from English. [RefCell traits](https://doc.rust-lang.org/std/cell/struct.RefCell.html).
- **Q16:** Copy is described as **explicit** (`מפורשת`), reversing the English **implicit**. Correct to `העתקה משתמעת, ביט־לביט` and avoid implying Copy is determined by stack versus heap location.
- **Q6:** the literal `Reference count: 3` becomes a Hebrew output string. Keep code output unchanged or label the choice as a description of the output.
- **Q5/Q17:** `Compilation Error`, `Depends on platform`, `Considerations`, and `Best practices` remain in English. Translate explanatory labels while keeping Rust names intact.

### German PostgreSQL — generally answerable, one damaged choice

Beyond Q5:

- Q8 has a doubled `muss` construction; rewrite the sentence naturally.
- Q14's `Validieren nicht vorhandene Zeilen` can read as “validate nonexistent rows.” Prefer **`Bereits vorhandene Zeilen werden zunächst nicht geprüft.`**
- Q12 should ask for the example with the **fewest fractional digits beyond six**, rather than the “smallest timestamp.” Seven digits is the intended choice; “smallest” otherwise suggests comparing times.
- Q2 calls `type 'literal'` a type function. It is a typed-literal form; preserve the distinction from actual function-call cast syntax.

The aggregate, type-name, integer-overflow, NULL uniqueness, and `NOT VALID` answers are consistent with PostgreSQL documentation. No live PostgreSQL server was started; these SQL conclusions are documentation-backed, not database execution results. [Types](https://www.postgresql.org/docs/current/datatype.html), [aggregates](https://www.postgresql.org/docs/current/functions-aggregate.html), [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html).

### Hindi PostgreSQL — broader prose cleanup needed

Beyond Q5:

- Q9 calls the collection of specialized types `धीमा सेट` (“slow set”). Use `विविध प्रकार` or `समृद्ध सेट`.
- Q14 repeatedly uses `रोकट नियम`, an unclear/nonstandard rendering of constraint. Prefer `CHECK constraint` with a clear Hindi explanation, or consistently use `प्रतिबंध`.
- The introduction contains `पसंदीना`; use `पसंदीदा`.
- `साइन किया हुआ` literally means “signed [a document]”; use `signed integer` with an explanation that negative and positive values are allowed.
- Q2 translates placeholder names inside syntax notation. That can be understandable, but clearly mark them as placeholders rather than runnable SQL.
- Q12 has the same “smallest timestamp” ambiguity as German.

### French JavaScript errors — mostly readable, literal preservation is the blocker

Beyond Q8/Q10, fix joined words in `Mystèrede`, `Héritageinstanceof`, and `Valeursde`. Prefer `levée d’une exception`/`lever` over the literal `lancer` where it improves idiomatic French. “Littéraux de gabarit” is understandable; use a consistent familiar term such as `littéraux de modèle (template literals)`.

Inherited technical issues:

- **Q4/Q14:** `Object.prototype.toString` is not a reliable authenticity check: `{ [Symbol.toStringTag]: 'Error' }` produces `[object Error]`. The stated Q14 result is correct for its exact object, but the general explanation overclaims and refers to an outdated `[[Class]]` model.
- **Q9:** specify V8/Node.js in the question itself, not only after answering. `Error.captureStackTrace` is environment-specific.
- **Q4:** iframe comments alone do not create a second realm. Clarify that the error object is created in, and passed from, a same-origin iframe. The cross-realm condition was tested using a separate JavaScript context.

### Chinese dates/time — answers hold under the stated timezone

Source: `src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/zh/index.mdx`.

- **Introduction:** `多选题` suggests more than one selectable correct answer. Use **`单项选择题`** or `每题只有一个正确答案`.
- **Q4/Q5/Q9:** the GMT−7 assumption is preserved in the introduction; their 1969 / 2019 2020 / 420 answers are correct under it. Repeat the assumption beside these questions so a reader in China does not mistake local execution differences for a grading bug.
- **Q2/Q10–Q14:** choices translate date output into Chinese while Q1 retains English. Choose one policy: preserve literal output, or ask which date the object represents. Console rendering is environment-dependent.
- **Q7:** `Date.UTC('2020-01-02T00:00')` returns **NaN**, which is a number; then calling `.toUTCString()` throws TypeError. The selected answer is correct, but saying this particular call returns a millisecond integer is misleading.
- **Q9:** do not suggest timezone offset never changes across dates; daylight-saving rules can change it. The specified January date at GMT−7 remains 420 minutes.
- **Q3:** explain confidently that calling `Date` without `new` returns a current-date string and ignores arguments. Remove “seems to always” language.

[ECMAScript Date specification](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-constructor).

## Rust issues inherited from English

These require source corrections followed by propagation to translations:

1. **Q9 explanation still panics.** `let second = data.borrow_mut()` remains alive when `data.borrow()` runs. Reproduced with rustc 1.95.0. Add `drop(second)` or end its scope before shared borrows.
2. **Q8 lifetime explanation reverses the bound.** The returned reference cannot outlive the valid shared lifetime of its inputs; it need not live “at least as long as both inputs.”
3. **Q13 is not guaranteed to deadlock on every implementation.** This machine hung until the two-second timeout; Rust's API says recursively locking the same mutex will not return normally and may panic or deadlock. The “panic” choice must not be universally rejected. [Mutex::lock](https://doc.rust-lang.org/std/sync/struct.Mutex.html#method.lock).
4. **Q18 overpromises identical performance.** Optimization level/compiler/code generation matter; “depends on optimization level” is a defensible choice. Ask about the zero-cost-abstraction principle or optimized builds, and avoid claiming a benchmark you have not run. The two functions returned the same sum in the runtime check; that is not a performance measurement. [Rust book performance discussion](https://doc.rust-lang.org/book/ch13-04-performance.html).
5. **Q18 explanation contains another compile issue:** consuming a `Range` via `self.fold` from `&self` attempts to move it. Use an owned receiver or clone the range for the demonstration.

Q15 now correctly explains automatic field cleanup without a custom Drop implementation, and Q17 explicitly qualifies the typical current 64-bit layout. The compiled size was 32 bytes. Do not resurrect older incorrect answers from historical score feedback.

## Browser results

Chromium on the local development server; 1440 × 1000 desktop and 390 × 844 mobile viewport. The successful completion suite used reduced motion to avoid timing-dependent animation interference. No Safari, Firefox, physical mobile device, production deployment, or cross-language progress-sharing claim is made.

| Language | Correct/total shown | Restored after reload | Correct after reset | Mobile page width | Code direction |
|---|---:|---:|---:|---:|---|
| he | 18/18 | 18 | 0 | 390px / 390px | rtl |
| de | 14/14 | 14 | 0 | 390px / 390px | ltr |
| hi | 14/14 | 14 | 0 | 390px / 390px | ltr |
| fr | 14/14 | 14 | 0 | 390px / 390px | ltr |
| zh | 14/14 | 14 | 0 | 390px / 390px | ltr |

All 74 questions accepted the marked answer. All 74 explanation panels opened with nonempty content. Each quiz rejected a deliberately wrong first answer, then accepted the correct one; Enter and Space both worked. Completion cards appeared, and all five quizzes returned to zero correct after reset. No page exceptions occurred in this initialized-runtime pass.

The first usable navigation appeared about 29–31 seconds after opening pages in this run (a preceding German run measured 27.6 seconds). This is local dev timing, not a production performance benchmark. The separate immediate-answer pass reproduced the missing `__updateCounts` exception on all five pages.

French and Chinese code blocks scroll horizontally on narrow screens (`overflow-x: auto`, measured positive scroll offsets). Hebrew code inherits RTL, so syntax remains visually reordered; this is a real readability defect. All five pages had correct `lang` and document direction and no page-wide horizontal overflow in the sampled mobile state.

**UI localization is incomplete on every page:** `Hint Explainer`, `Hide Explainer`, `Score`, `Retake quiz`, and completion/missed-answer messages remain English. Navigation accessible names also remain English. In Hebrew the arrow icons should be reviewed/mirrored to match RTL previous/next positions.

Screenshots: [Hebrew mobile](./he-mobile.png), [German mobile](./de-mobile.png), [Hindi explanation](./hi-explanation-mobile.png), [French mobile](./fr-mobile.png), [Chinese mobile](./zh-mobile.png). Full observations: [final-browser-results.json](./final-browser-results.json).

Testing note: initial harness attempts tried to scroll to hidden slides or click the old question after automatic advance. Those harness timeouts are not counted as product defects. The successful pass uses quiz navigation and checks explanations before answering; the early-answer JavaScript exception is independently reproducible.

## Automated validation

All five locale-integrity commands returned nonzero. See `validation.txt` for exact diagnostics. Hebrew failed structural parity at 0.978 against a 0.980 threshold; German and Hindi each reported a missing heading at 0.905; French reported 14 source hints slots versus zero translated slots; Chinese flagged translated code-like error choices. The French source hints slots are empty, so their omission is a structural mismatch rather than proof of missing instructional hint text. Structural heuristics can mistake code-like type names for components, so these results need triage, not blind rewriting. Actual rendered choices and source text were checked independently.

A further pipeline defect was reproduced in `src/scripts/i18n/quiz-parser.ts`: escaped apostrophes truncate parsed text, e.g. French `Erreur d\'origine` becomes `Erreur d\` in extracted JSON. The browser renders the full choice correctly. This is a parser/translation-pipeline issue, not evidence that the displayed French text is truncated. Replace regex-only string extraction with syntax-aware parsing and test escaped quotes.

The initial dev command's Astro check finished with 0 errors, 0 warnings, and 93 hints. This review did not run a full production build or change quiz content.

## Recommended order of work

1. Fix quiz startup timing and isolate code direction on RTL pages.
2. Restore French literal outputs, German Q5's missing choice, and Hindi Q5's meaning.
3. Correct inherited Rust examples/answer ambiguities in English and propagate them.
4. Polish terminology and untranslated UI, then repair the escaped-string parser.
5. Re-run targeted integrity/browser checks and generate fresh scores tied to the resulting file hashes.

## Question-by-question answer ledger

The option number is one-based and identifies the site’s marked answer. “Intended” does not endorse disputed wording; exceptions are explicit below.

### he: quiz-is-your-memory-rusty

| Question | Marked option | Critical result |
|---:|---:|---|
| 1 | 5 | Compile error E0382 confirmed. |
| 2 | 3 | Compile error E0382 confirmed. |
| 3 | 2 | Compile error E0499 confirmed; mistranslated data-race explanation. |
| 4 | 1 | Compiles; prints Hello, Seneca. Fix lifetime terminology. |
| 5 | 3 | Compile error E0072 confirmed. |
| 6 | 3 | Prints literal Reference count: 3; choice translates output. |
| 7 | 2 | Missing lifetime E0106 confirmed. |
| 8 | 2 | Missing lifetime E0106 confirmed; explanation/hint need correction. |
| 9 | 2 | Runtime panic confirmed; proposed fix also panics. |
| 10 | 1 | Prints 42 then 43. |
| 11 | 1 | Shared ownership within one thread; code compiles. |
| 12 | 4 | Intended choice; qualify !Sync versus Send. |
| 13 | 5 | Hung locally; panic is also permitted by the API. |
| 14 | 2 | Prints Value: None. |
| 15 | 1 | Compiles; automatic field drop is the correct rule. |
| 16 | 2 | String fields clone independently; Copy prose reverses implicit/explicit. |
| 17 | 3 | 32 bytes measured on this target. |
| 18 | 2 | Same sum confirmed; equal performance is not established. |

### de: quiz-postgres-sql-mastery-pt1

| Question | Marked option | Critical result |
|---:|---:|---|
| 1 | 4 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 2 | 3 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 3 | 3 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 4 | 4 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 5 | 1 | Marked answer is sound; second option is truncated. |
| 6 | 4 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 7 | 6 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 8 | 3 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 9 | 4 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 10 | 6 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 11 | 2 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 12 | 4 | Intended seven-digit choice; wording ambiguous. |
| 13 | 5 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 14 | 1 | Correct; polish German negation. |

### hi: quiz-postgres-sql-mastery-pt1

| Question | Marked option | Critical result |
|---:|---:|---|
| 1 | 4 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 2 | 3 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 3 | 3 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 4 | 4 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 5 | 1 | Marked answer typo, competing partly true option, reversed explanation. |
| 6 | 4 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 7 | 6 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 8 | 3 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 9 | 4 | Answer correct; slow set is mistranslated. |
| 10 | 6 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 11 | 2 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 12 | 4 | Intended seven-digit choice; wording ambiguous. |
| 13 | 5 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 14 | 1 | Answer correct; constraint terminology is garbled. |

### fr: quiz-advanced-js-error-mastery

| Question | Marked option | Critical result |
|---:|---:|---|
| 1 | 2 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 2 | 2 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 3 | 1 | Logical answer correct; preserve true/false literals. |
| 4 | 3 | Cross-realm false reproduced; authenticity claim is too strong. |
| 5 | 2 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 6 | 2 | Correct literal; translated Error distractor needs restoration. |
| 7 | 2 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 8 | 1 | NO EXACT CORRECT CHOICE: actual output is Original error. |
| 9 | 1 | V8/Node-specific premise should be explicit. |
| 10 | 2 | NO EXACT CORRECT CHOICE: actual output is Value undefined is invalid. |
| 11 | 2 | Serialization reasoning checked; no live Express server run. |
| 12 | 2 | Intended answer is consistent with the question; no answer-changing translation error found. |
| 13 | 2 | Environment-dependent; no filesystem-route execution. |
| 14 | 2 | false/false for this object; general anti-spoofing claim is wrong. |

### zh: js-quiz-14-date-time-questions-test-your-knowledge

| Question | Marked option | Critical result |
|---:|---:|---|
| 1 | 2 | February 1, 2020; display format depends on console. |
| 2 | 1 | January 1, 2020; translated output formatting. |
| 3 | 4 | Current-date string; argument ignored. |
| 4 | 1 | 1969 under stated GMT-7. |
| 5 | 1 | 2019 2020 under stated GMT-7. |
| 6 | 2 | toLocaleFormat is not standard. |
| 7 | 3 | TypeError; Date.UTC returns NaN for this input first. |
| 8 | 3 | 1577836800000 milliseconds. |
| 9 | 2 | 420 under stated GMT-7; explain DST caveat. |
| 10 | 1 | January 1, 2020. |
| 11 | 2 | February 1, 2020. |
| 12 | 2 | January 1, 2021. |
| 13 | 4 | February 1, 2021. |
| 14 | 4 | December 1, 2019. |
