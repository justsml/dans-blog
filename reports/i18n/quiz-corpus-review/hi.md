# Hindi quiz translation review

Reviewed all **19 quizzes, 267 questions and 1,231 options**, including every question, answer choice, option hint, explanation, and available hints slot against the current English source. Applied fixes to final Hindi MDX files. Full source and target SHA-256 hashes and the question-by-question answer/option ledger are in [hi-evidence.json](./hi-evidence.json).

## Validation

- All267 question indices, option counts and accepted-answer positions match English. No duplicate option labels remain.
- Executable code blocks in questions and explanations match English after whitespace normalization. This check is code parity, not a claim that every snippet was executed.
- All19 final files compile with the MDX compiler; targeted whitespace/diff validation passes. Browser selection, persistence and layout verification are owned by the parent corpus Playwright run.
- Existing Hindi HTML per-option hints are useful adaptations; the strict integrity checker flags them because English lacks those hints. Remaining code-option flags concern translated diagnostic prose and “Only in Node.js”, not changed JavaScript output. These were reported to the parent for the shared validator fix.
- No external AI judge/provider was used and no fresh model score is claimed.

## Review ledger

| Quiz | Questions | Options | Changes / assessment |
|---|---:|---:|---|
| quiz-master-modern-html5 | 14 | 56 | Q2/Q3 distinct semantic options; preserve useful existing localized hints. |
| quiz-in-the-aws-cloud | 26 | 119 | Translate leaked English intro; Q9 fixed limit, Q10 one-item scope, Q11 cost caveat, Q19 incomplete hint, Q24 consistency scope; all26 learning-objective sets restored. |
| quiz-js-interfaces-symbols-and-enumerables | 7 | 29 | Localized heading; literal booleans/undefined Q4; restored seven hints slots. |
| quiz-can-you-count-to-bigint | 13 | 63 | Replace generated editorial summary with actual introduction; Q8 literal booleans; summary table clarifies parseInt only infers hexadecimal prefixes. |
| js-quiz-14-date-time-questions-test-your-knowledge | 14 | 59 | Q3 string-vs-Date; Q7 NaN before TypeError; Q9 offset/DST; per-question GMT−7 and display caveats. |
| quiz-destructuring-delights | 12 | 74 | Restore literal outputs Q1–8/Q10/Q12; Q7/Q8 parameter vs property defaults; Q4 plaintext diagnostic; TypeScript section heading. |
| quiz-data-structures-algorithms | 20 | 92 | Q1 LIFO/FIFO phrasing; Q3 stored-length assumption; Q7 DFS criterion; Q11 Dijkstra criterion; Q13/Q16 recursion terminology; Q20 strict comparison; all20 hints. |
| quiz-advanced-js-error-mastery | 14 | 56 | Q4 same-origin frame/code and tag spoofing; Q8/Q10 output literals; Q9 V8 assumption; Q14 tag caveat; all14 hints. |
| quiz-do-you-know-esnext | 11 | 46 | Q5 object/Q6 fulfilled/Q10 null+undefined literals; Q11 reclaimed-memory wording; all11 hints. |
| quiz-nodejs-files-streams-buffers-oh-my | 15 | 64 | Q8 duplicate Hindi casing choices replaced by exact hello world/HELLO WORLD; Q1 allocUnsafe safety; Q6 chunk buffering; Q13 null exception. |
| javascript-promises-quiz | 9 | 37 | Q3 returning Error can fulfill; Q5 recovery needs no later then; Q8 localized prose around exact output. |
| quiz-sql-query-fundamentals | 11 | 47 | Q5 correlation definition/optimizer; Q8 index eligibility and UNIQUE caveat. |
| quiz-postgres-sql-mastery-pt2 | 12 | 58 | Q3 SQL standards; Q8 period means dot, not duration; Q9 red-herring idiom; Q10 partial-index implication; intro and mixed words. |
| quiz-modern-css-2025 | 11 | 52 | Q3 explicit16px root assumption and max accepts one or more calculations. |
| quiz-css-core-fundamentals | 14 | 77 | Q3 Hindi negation and omitted explanation; Q9 text alignment and nonexistent align property. |
| quiz-regex-or-wreckage | 16 | 71 | Q5/Q8 ahead/behind direction; Q6 entire untranslated explanation; Q10 case-insensitive backtracking; Q12 literal backslash. |
| quiz-bash-in-the-shell | 16 | 84 | Q2 quote boundary explanation; Q4/Q7/Q8/Q9 literal outputs; Q14 do is part of loop syntax. |
| quiz-is-your-memory-rusty | 18 | 78 | Literal outputs/distractors; Q5/Q6/Q14 untranslated hints; Q9 exact panic point; Q18 optimizer caveat; all18 learning-objective sets restored. |
| quiz-postgres-sql-mastery-pt1 | 14 | 69 | Q10 built-in vs extension scope; Q12 fractional-digit wording and timezone-offset terminology. |

## Terminology decisions

Use familiar developer terms with Hindi explanations, and keep identifiers, commands and literal program outputs unchanged.

- **प्रॉमिस** for explanatory prose, `Promise` for the API: consistent with [visualizing-promises](../../../src/content/posts/2018-09-30--visualizing-promises/hi/index.mdx), title line3, and the existing Promises quiz.
- **कैप्चर ग्रुप**, **लुक-अहेड**, **लुक-बिहाइंड**: compare the [URL regex article](../../../src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/hi/index.mdx), lines113,256,267. Explain the direction explicitly; “preceded by” means the prefix occurs before the matched digits.
- **टाइमस्टैम्प**, **टाइमज़ोन**, and **निरपेक्ष क्षण**: the [timestamp article](../../../src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/hi/index.mdx), lines27–31, supports the distinction between stored instant and display timezone.
- **इंडेक्स** stays a searchable SQL term; use **बिंदु (.)** for punctuation, not **अवधि** (duration).
- **रिकर्सन / रिकर्सिव** and **आधार शर्त (base case)** distinguish recursive calls from ordinary loop iteration. This also matches the existing Rust quiz's recurring रिकर्सिव terminology.
- **आंतरिक परिवर्तनशीलता (interior mutability)** retains the existing Rust Q10 explanation; `RefCell`, `RwLock`, `Copy`, `Clone` remain exact.

## Source issues escalated

PostgreSQL part2's original SQL-standard history was inaccurate; the parent corrected it and Hindi now matches. The BigInt summary table's blanket parseInt binary/octal/hex support claim was corrected in English and aligned in Hindi.
