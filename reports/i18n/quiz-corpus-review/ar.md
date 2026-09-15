# Arabic quiz review — 2026-09-14

## Scope and evidence

Reviewed all 19 Arabic quiz articles: 267 questions and 1,231 options. Compared question intent, options, marked answers, explanations, and code against English. The parser check confirms matching question counts, option counts and marked-answer positions. This ledger describes editorial/source review; it does not claim a browser run or live AWS/PostgreSQL execution. The parent task owns browser regression coverage and shared source corrections.

No external AI judge was used. Existing historical quality scores were not replaced.

## Review ledger

| Quiz | Questions | Result / changes |
|---|---:|---|
| PostgreSQL mastery 1 | 14 | Q2 typed literal terminology; Q5 removed duplicated timestamp paragraph; Q12 specifies smallest fractional-digit count above six; restored section heading. Answer choices retain SQL syntax. |
| Rust memory | 18 | Restored English output literals in Q1/Q6/Q8 so choices match code. Fixed malformed Arabic compilation wording; translated leftover error labels. Retained previous corrected lifetime, RefCell, mutex, Clone and iterator examples. Q18 hint no longer promises universally equal performance. |
| Bash | 16 | Restored literal output choices in Q4/Q5/Q9/Q13; Q5 previously collapsed distinct `meow` and `Meow` choices into identical Arabic text. Q7/Q8 keep literal output while explaining diagnostics in Arabic. |
| Regex | 16 | Preserved regex/code/output. Q10 now explains `i` case insensitivity and backtracking from `123` to `12`. |
| CSS fundamentals | 14 | All options represented, including 15-choice unit question. No translation-specific answer changes required. |
| Modern CSS | 11 | Translated leftover “Invalid syntax” and human-readable width labels; corrected plural grammar. CSS property syntax remains literal. |
| PostgreSQL mastery 2 | 12 | Repaired “planner still loop” mixed-language sentence. Q10 clarifies query implication of a partial-index predicate rather than literal text equality. |
| SQL fundamentals | 11 | Distinguished NULL from empty strings in COUNT/COALESCE language. Q5 uses correlated per-row semantics without mandating a physical execution strategy; Q8 removes unsupported UNIQUE-index advice. |
| Promises | 9 | All outputs and handler sequences represented. Catch recovery explanations distinguish returned Error objects from thrown errors and do not require a later then. |
| Node files/streams | 15 | Q3 `Done` stays literal; standardized تدفق/الضغط الخلفي; translated mixed-language Transform explanation. Q1 allocUnsafe means uninitialized memory, Q6 chunk buffering is not zero buffering, Q13 excludes null from object data. |
| ESNext | 11 | Q6 restores `fulfilled: success`, `Rejected: error`, and `Pending` output literals. Other syntax and outputs intact. |
| JS errors | 14 | Q8 literal `Original error`; Q14 boolean literals and non-authenticity caveat; Q4 same-origin iframe assumptions and corrected demonstration; Q9 explicitly V8/Node; translated leftover browser-dependent distractor. |
| Data structures | 20 | Replaced ambiguous تكراري with ذاتي الاستدعاء for recursion/Fibonacci. Other options and complexity notation retained. |
| Destructuring | 12 | Restored literal `Name:`, `First:`, `Hi` outputs rather than translating strings that code does not translate. Q7 whole-argument default also applies to explicit undefined; Q8 property defaults depend on property value. Fixed intro mistranslation “destruction” to “destructuring”; restored TypeScript heading and collection link. |
| Dates | 14 | Localized calendar answers are framed as represented dates, not exact console formatting. Repeated GMT−07:00 in dependent questions. Q3 valid Date function call vs constructor; Q7 NaN then TypeError; Q9 offset depends on date/environment. Restored RangeError literal distractors. |
| BigInt/numbers | 13 | Q8 literal true/false; removed incorrect “triple hexadecimal” description of base36; restored opening blockquote. |
| Symbols/enumeration | 7 | Q4 true/false/undefined and Q5 true/false kept literal; prevents Arabic “error” being confused with the boolean false. |
| AWS | 26 | Arbitrary attributes means unspecified attributes, not random attributes. Removed duplicate standby wording; completed truncated Streams hint. Q10 explicitly UpdateItem; Q11 capacity-cost tradeoff without always-cheapest claim; Q24 scopes consistency to object GET/LIST after PUT/DELETE. TTL wording states no exact timing guarantee. |
| HTML | 14 | Restored example `image.jpg` path changed by translation asset rewriting. API/element names and semantic descriptions represented. |

## Terminology decisions

- Keep machine outputs, identifiers, booleans, SQL syntax, regex and code strings literal; explain them in Arabic. Translate human descriptions, rather than turning code output into an Arabic paraphrase.
- Use **التفكيك** for destructuring, consistent with the Arabic destructuring article and existing Arabic ES2016 discussion (`love-computer-languages`); reserve التدمير for the introductory music joke.
- Use **تدفق** for streams and **الضغط الخلفي** for backpressure consistently within the Node article. Retain English API names for lookup.
- Use **ذاتي الاستدعاء** for recursive behavior so it is distinguishable from iterative loops. Keep O-notation literal.
- Use **ليست NULL** rather than “non-empty”; empty text and NULL are different values.
- Use **مدة البقاء (TTL)**, **ملكية**, **استعارة**, and **عمر** with API names such as Rc/RefCell unchanged. This is an editorial consistency decision, not a claim of external Arabic standards consensus.

## Validation limits and remaining shared issues

The initial per-locale integrity run identified genuine omissions (headings, link, example path) that were repaired. It also flags valid translated prose containing punctuation as “code-like” (examples: “Input & output modes”, “Groups rows by the specified column(s)”). Regex validation reports inline literal `<b>` text as unbalanced HTML. These are shared validator issues reported to the parent; retaining English prose would hide localization defects rather than fix validation.

Source-level follow-ups sent to parent include Promises Q3–5 explanations (catch recovery need not return a non-Error value and does not require a later then), HTML figure distractors overlap legitimate uses, and data-structures shortest-path distractors can also solve the stated problem. Arabic preserves source answer positions pending coordinated source refinements; those questions should not be treated as proven uniquely correct merely because the answer key matches.


## Final source alignment

Aligned every quiz to frozen source commit 35c81f213 plus the final Date formatting and Unicode-regex corrections. Resolved the earlier pending HTML/DSA ambiguity, source-level CSS assumptions, AWS limits and tradeoffs, BigInt parsing table, PostgreSQL standards wording, and diagnostic literal choices. Rechecked all nonempty source hints against nonempty Arabic hints. The historical validator limitations above were repaired centrally; final scoped validation is recorded in ar-integrity.txt and ar-static.txt. No remaining Arabic editorial blocker is recorded. Browser evidence remains owned by the corpus suite.

### English source SHA-256 at final alignment

| Quiz | SHA-256 |
|---|---|
| javascript-promises-quiz | e764fa63c7b596684e65aa43df3b758eef30b31aadae917a28a5e1ca32d7ab12 |
| js-quiz-14-date-time-questions-test-your-knowledge | ec43802cb19367d4f6404bcba2d9de192622f887999917d08f48645c5e3bd04d |
| quiz-data-structures-algorithms | bbe16f991f17d61caaf6a3d510caa7d4dd771d1113bbbdd157319831abc66dd7 |
| quiz-do-you-know-esnext | 63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb |
| quiz-js-interfaces-symbols-and-enumerables | c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9 |
| quiz-master-modern-html5 | 9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74 |
| quiz-can-you-count-to-bigint | f7af3ca5f8ef55272d24882cc3612f0492277f3ce73ad21ddc7a952a7f4d6a8e |
| quiz-modern-css-2025 | 7254e27e26db35a72ca971a9fce8ae96d3cba30163bc6958ec3118e52e39704b |
| quiz-css-core-fundamentals | ee5866dcab74b29fcaf99765c78fd8c474d51fbd357ed07af1c02059c59d81c7 |
| quiz-sql-query-fundamentals | 4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad |
| quiz-destructuring-delights | 0aa930822ea8a6b38914c30bcdb73e22de3e8910a0f92e5f0f6ab8c090fabd4d |
| quiz-nodejs-files-streams-buffers-oh-my | 77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930 |
| quiz-regex-or-wreckage | 0b087416a4feeb151ae3aaa3f19d785b8edc4860522fe150845f43141d7444e9 |
| quiz-bash-in-the-shell | ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631 |
| quiz-postgres-sql-mastery-pt1 | 8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6 |
| quiz-postgres-sql-mastery-pt2 | 442e06417de424ae712b9a4016865482fd1050ef479a9719f3c28d4709b2d808 |
| quiz-in-the-aws-cloud | 8f073f151596d04141eec7cd5a1517d350fc7a7ebb7a42725eac544d8cb8dba9 |
| quiz-is-your-memory-rusty | e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c |
| quiz-advanced-js-error-mastery | e00c048b44ae6dec4bee8aedf31356a8c002564399f9e3525175ace3b2fe3bbb |

### Promises Q9 text explanation follow-up

Added Arabic explanation above the retained annotated image, preserving the literal `The fails!`. Source SHA-256: `e764fa63c7b596684e65aa43df3b758eef30b31aadae917a28a5e1ca32d7ab12`. Arabic SHA-256: `06ed876ac8a6ed6c4ef5361f36be11e8270846edfc986b62cd7bbf1837b49f7f`. Other source evidence is unchanged.
