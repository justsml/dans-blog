# Judge Escalation: hi Translation — stop-hardcoding-your-prompts

**Escalation reviewer**: openrouter/anthropic/claude-sonnet-4.6  
**Date**: 2026-05-09  
**Trigger**: Second judge (`judge-second.md`) disagreed with the first judge's selection

## Disagreement Summary

The primary judge output selected `b5c0acea170aa03e7f7ad294ce8a9ddb3c6f161e` (minimax-m2.7, C1).  
The second judge issued a **DISAGREE** verdict and recommended `ae1992555935dbb7a025a3e2682658e9085df675` (glm-5-turbo, C2), citing concrete regressions in the then-current selected file/register.

## Candidates Reviewed

| SHA (short) | Model | Notes |
|---|---|---|
| `b5c0acea` | openrouter/minimax/minimax-m2.7 (C1) | Solid formal Hindi; minor prose awkwardness |
| `ae199255` | openrouter/z-ai/glm-5-turbo (C2) | Best overall; formal register, Hindi headings, Hindi code comments |
| `4ad891b5` | openrouter/minimax/minimax-m2.5 (C3) | Valid candidate; more informal and Hinglish-heavy than C2 |

## Escalation Verdict: SELECT C2 (glm-5-turbo)

The second judge's core analysis is correct: C2 is the strongest candidate and is selected as the base for the final file.

### Rationale

**1. Register consistency**

C2 uses formal second-person throughout (`आप`, `आपकी`, `करें`, `बनाएँ`). C3 shifts to informal `तुम`/`तुमारा`/`करो` in narrative prose and the closing summary. This blog targets professional/technical readers; informal register is out of place and inconsistent within the article.

**2. Hindi section headings**

C2 translates all section headings into Hindi (e.g., "स्ट्रिंग इंटरपोलेशन की समस्या", "टाइप्ड प्रॉम्प्ट टेम्पलेट्स", "कंपोज़ेबल प्रॉम्प्ट सेक्शन्स"). C3 leaves them in English ("String Interpolation के साथ समस्या", "Typed Prompt Templates", "Composable Prompt Sections"). The Hindi headings in C2 are accurate, readable, and consistent with a complete translation.

**3. Hindi code comments**

C2 adds Hindi inline comments in the TypeScript code blocks (e.g., `// प्रॉम्प्ट को जो चाहिए उसकी शेप डिफाइन करें`, `// अगर vars मैच नहीं करते तो Zod थ्रो करता है`, `// इम्पोर्टेड कॉन्स्टेंट — सभी एजेंट्स में समान`). C3 stripped these back to English or removed them. For a Hindi reader, these comments are the primary aid to understanding code intent; removing them is a concrete quality regression.

**4. Prose quality and Hinglish density**

C3 introduces gratuitous Hinglish mid-sentence (`product को एक गर्माटून टोन चाहिए थी`, `jurisdiction-विशिष्ट Disclaimer`, `hope किया कि runtime सही guess करेगा`). C2 uses clean Hindi equivalents throughout. The non-word `गर्माटून` in C3 is a fabrication with no Hindi meaning and indicates model degradation at that passage.

**5. Spurious frontmatter**

C3 adds `cover_alt: "कोड स्क्रीन पर प्रॉम्प्ट टेम्पलेट"` — a field not present in the English source or in C1/C2. This is out-of-scope for a translation task and would introduce an undeclared schema field.

### C1 (minimax-m2.7) Assessment

C1 is a competent translation with consistent formal register and clean Hindi prose. Its main weaknesses relative to C2 are:
- Code block comments remain in English (C2's Hindi comments are a strict improvement)
- A few prose passages are slightly more literal/awkward (e.g., "गर्म स्वर" for "warmer tone" is fine but C2's "सौहार्दपूर्ण टोन" is more idiomatic)
- Conclusion paragraph in C1 reads slightly more stiffly than C2

C1 would be an acceptable fallback, but C2 is the better translation.

## Polishing Applied to C2

The final file at `src/content/posts/2026-05-07--stop-hardcoding-your-prompts/hi/index.mdx` uses C2 as the base with these minimal edits:

1. **Title**: Adopted C1's title `"प्रॉम्प्ट को कोड में दफ़नाना बंद करें"` over C2's `"कोड में प्रॉम्प्ट्स दफनाना बंद करें"`. The C1 phrasing better mirrors the English imperative structure and is slightly more natural.
2. **Subtitle**: Kept C2's `"प्रॉम्प्ट पैटर्न जो प्रोडक्शन में जीवित रह सकते हैं।"` (more idiomatic than C1's `"टिक सकें"`).
3. **Opening line**: Fixed grammatical gender agreement: `"ऐसा स्ट्रिंग है"` → `"ऐसी स्ट्रिंग है"` (स्ट्रिंग is treated as feminine in this context, consistent with how it is used throughout the article).
4. Everything else is verbatim C2 — no prose restructuring, no section reordering, no change to code blocks or frontmatter.

## Final Selection

**Selected SHA (base)**: `ae1992555935dbb7a025a3e2682658e9085df675` (openrouter/z-ai/glm-5-turbo)  
**Final file**: `src/content/posts/2026-05-07--stop-hardcoding-your-prompts/hi/index.mdx`  
**Commit type**: `i18n final(hi): resolve judge disagreement for stop-hardcoding-your-prompts`
