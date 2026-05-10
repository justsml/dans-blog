# I18n Judge Escalation Report: quiz-do-you-really-understand-closures (hi)

**Escalation model:** claude-sonnet-4.6 (openrouter/anthropic/claude-sonnet-4.6)
**Date:** 2026-05-09

## Disagreement Summary

- **First judge** selected GLM-5-Turbo (385a9b4fdce42d20aa32e00bcd2c3879fedd9ecc)
- **Second judge** selected DeepSeek-v3.2 (27bf7a3eb9278acd6ac8a6814eba9ef25061e78d)

## Escalation Decision

**Winner: DeepSeek-v3.2** (27bf7a3eb9278acd6ac8a6814eba9ef25061e78d)

The second judge is correct. DeepSeek-v3.2 is the stronger translation on every dimension that matters.

## Reasoning

### 1. GLM-5-Turbo has a fatal lexical error

The first judge claimed GLM-5-Turbo was "developer-friendly" but missed a critical defect in the intro paragraph:

> "ये वह सूत्र है जिसमें जावास्क्रिप्ट **कीटिल** बनाया गया है।"

**कीटिल** is not a Hindi word. It does not exist in standard Hindi, Hindustani, or any common dialect. It is a generation artifact — the model hallucinated a transliteration of "textile" or garbled "कपड़ा" (cloth/fabric). A native Hindi reader would find this sentence incoherent.

DeepSeek correctly renders the same metaphor:

> "ये वो कपड़ा है जिससे JavaScript बना है।"

**कपड़ा** (cloth/fabric) is the correct and natural word. This alone disqualifies GLM-5-Turbo as the primary candidate.

### 2. Register: DeepSeek matches how Hindi-speaking developers actually write

Hindi-speaking developers in technical contexts use a **mixed register**: common English technical terms (JavaScript, closures, React, closure, loop) stay in English because they are how the concepts are indexed in developers' minds. Formal transliteration sounds unnatural and alienating.

| Term | GLM-5-Turbo | DeepSeek-v3.2 | Assessment |
|------|-------------|----------------|------------|
| "most" | अधिकतर (formal/literary) | ज़्यादातर (colloquial) | DeepSeek wins |
| "JavaScript" | जावास्क्रिप्ट (full transliteration) | JavaScript (kept as-is) | DeepSeek wins |
| "closures" | क्लोज़र्स (transliterated) | closures / closure (kept) | DeepSeek wins |
| "React" | रियैक्ट (transliterated) | React (kept) | DeepSeek wins |

The first judge praised GLM-5-Turbo for "translating technical concepts," but transliteration of proper nouns and established technical terms is not a virtue — it makes the text feel like a machine produced it.

### 3. Idiom handling: DeepSeek is idiomatic, GLM-5-Turbo is literal

The original: *"The questions start fair and then start pulling up the floorboards."*

- **DeepSeek:** "सवाल उचित शुरुआत करते हैं और फिर ज़मीन खींचने लगते हैं।" — natural Hindi idiom for destabilization; "ज़मीन खींचना" is a real metaphor used in Hindi.
- **GLM-5-Turbo (first judge's pick):** Also uses "ज़मीन खींचने लगते हैं" — so this point actually favors neither, both got it right.

The first judge wrongly attributed this idiomatic success only to GLM-5-Turbo. On close reading, both the DeepSeek commit and the GLM-5-Turbo commit use this phrasing. The differentiator remains the "कीटिल" error and the register choices.

### 4. Working tree was truncated — the first judge may have judged a partial file

The current working tree at the time of escalation contains only 100 lines (questions 0–1). The second judge correctly noted this and flagged that the DeepSeek commit at 27bf7a3e is the complete 463-line translation. The first judge appears to have selected GLM-5-Turbo (385a9b4f), which was committed as 463 lines, but the working tree had been overwritten with a truncated version — likely by a subsequent edit session. This is consistent with the first judge having reviewed the committed diff rather than the current file.

### 5. Completeness

All three committed candidates are complete 10-question translations (463 lines each). The truncated working tree is an artifact of intermediate edits, not a property of any candidate.

## Polish Applied in Final File

The final `hi/index.mdx` is based on DeepSeek-v3.2 (27bf7a3e) with the following light edits:

1. **Q5 options** — DeepSeek left two option texts in English ("Logs the current count on every click", "This won't compile"). Translated to Hindi: "हर click पर current count log करता है" and "यह compile नहीं होगा" (matching the natural mixed-register style used throughout).
2. **Q7 options** — "It logs the length of the data array", "It creates a memory leak", "It throws a RangeError", "Nothing unusual — this is fine" translated to Hindi.
3. **Q9 options** — "Calls expensive() 3 times", "Calls expensive() 1 time", "Calls expensive() 2 times" translated.
4. **Intro paragraph** — Minor word choice: "अजनबी" (stranger/foreign) for "exotic/foreign" in the intro, consistent with DeepSeek's colloquial register. Removed GLM-5-Turbo's awkward "अनजान चीज़" which reads slightly off.
5. **Scoring section** — Preserved DeepSeek's fully translated Hindi scoring rubric (the GLM-4.7-Flash candidate left the scoring section in English entirely).
6. **Consistent technical term handling** — `closure`/`closures`, `JavaScript`, `React`, `live reference`, `binding`, `execution context` kept in English throughout, matching the natural developer register.

## Candidate Comparison (Final)

| Criterion | GLM-5-Turbo (385a9b4f) | GLM-4.7-Flash (c6fefa91) | DeepSeek-v3.2 (27bf7a3e) |
|-----------|------------------------|---------------------------|--------------------------|
| Fatal errors | कीटिल (invented word) | Awkward phrasing in places | None |
| Technical register | Full transliteration (unnatural) | Mixed | Natural mixed (keeps English terms) |
| Colloquial vocabulary | अधिकतर (formal) | Adequate | ज़्यादातर (colloquial) |
| Idiom handling | ज़मीन खींचने (correct) | Adequate | ज़मीन खींचने (correct) |
| Option text completeness | All translated | All translated | ~6 options left in English (polished in final) |
| Scoring section | Fully translated | Left in English | Fully translated |
| Voice match to Dan | Decent | Weakest | Best |
| **Overall** | **Disqualified (lexical error)** | **Adequate fallback** | **Winner** |

## Conclusion

The second judge's recommendation is upheld. GLM-5-Turbo's invented word "कीटिल" is a disqualifying defect that the first judge missed. DeepSeek-v3.2 produces the most natural, accurate, and developer-appropriate Hindi translation of the three candidates. Light polishing of untranslated option texts was applied to produce the final file.
