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
| Promises | 9 | All outputs and handler sequences represented. No translation-specific answer edit. Source explanations flagged below. |
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
