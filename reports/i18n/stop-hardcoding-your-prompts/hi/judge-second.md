# Judge Review: Selected hi Translation

**Reviewer**: i18n judge agent  
**Selected SHA**: `4ad891b55528ea4f92c4373fcee54be0e13d639d`  
**Model**: openrouter/minimax/minimax-m2.5  
**Prior SHAs**: `b5c0acea` (minimax-m2.7), `ae199255` (z-ai/glm-5-turbo)

## Verdict: DISAGREE

The selected candidate (`4ad891b5`, minimax-m2.5) regresses significantly from candidate `ae199255` (glm-5-turbo). It should not be the final translation without heavy revision.

## Issues with the Selected Candidate

### 1. Excessive Hinglish (English-in-Hindi) in narrative prose

Candidate 3 introduces far more English words embedded in Hindi sentences than either prior candidate, reducing readability and consistency:

| Location | Selected (C3) | Better (C2) |
|---|---|---|
| Title | `दफ़ना बंद करो` (informal) | `दफनाना बंद करें` (formal) |
| Paragraph 2 | `product को एक गर्माटून टोन चाहिए थी` | `प्रोडक्ट टीम ने ज़्यादा सौहार्दपूर्ण टोन माँगा` |
| Paragraph 2 | `jurisdiction-विशिष्ट Disclaimer` | `क्षेत्र-विशिष्ट डिस्क्लेमर` |
| Section headings | `String Interpolation`, `Typed Prompt Templates`, `Composable Prompt Sections`, `Prompt Versioning`, `Environment-Specific Behavior` | Hindi equivalents throughout |
| Intro line | `String business logic में दबी हुई` | `बिज़नेस लॉजिक में दफन` |
| Summary list | `bad input को boundary पर catch करो`, `complex prompts build करो`, `injection risk reduce करो`, `debug prompts ship मत करो` | All in Hindi |
| Last line | `तुमारा model AI engineering का hard part नहीं है। तुमारा prompt infrastructure है।` | Full Hindi |

### 2. Register mismatch: informal `तुम`/`करो` vs. formal `आप`/`करें`

C3 shifts to informal second-person (`तुम`, `तुमारा`, `करो`) while both prior candidates use the formal register (`आप`, `आपकी`, `करें`). This blog uses a professional/technical register — informal tone is inappropriate.

Examples from C3:
- `प्रॉम्प्ट दफ़ना बंद करो`
- `तुमारा model`
- `prompt builder में scatter मत करो`
- `traceable और reversible बनाओ`

### 3. Removed Hindi code comments added by C2

C2 added useful Hindi inline comments in the TypeScript code blocks (e.g., `// प्रॉम्प्ट को जो चाहिए उसकी शेप डिफाइन करें`, `// अगर vars मैच नहीं करते तो Zod थ्रो करता है`). C3 stripped all of them back to English or removed them entirely. The code blocks are already in English — the Hindi comments helped Hindi readers understand the code intent.

### 4. Typos and odd transliterations

- `गर्माटून` — should be `गर्म` or `सौहार्दपूर्ण`; this is not standard Hindi
- `कम्प्लायंस` — misspelled vs. `कॉम्प्लायंस`
- `hope किया कि runtime सही guess करेगा` — gratuitous English

### 5. Added `cover_alt` frontmatter not in original

C3 adds a `cover_alt` field (`cover_alt: "कोड स्क्रीन पर प्रॉम्प्ट टेम्पलेट"`) that wasn't in the English original and isn't present in the other candidates. This is scope creep for a translation task.

## Recommendation

**Escalate with SHA `4ad891b55528ea4f92c4373fcee54be0e13d639d` for revision.**

The strongest translation is from candidate `ae1992555935dbb7a025a3e2682658e9085df675` (glm-5-turbo). It uses consistent formal Hindi register, translates technical terms to Hindi, adds Hindi code comments for developer accessibility, and keeps English only where standard (e.g., technical terms like `TypeScript`, `Zod`, `LLM`).

To salvage the selected version, revert C3's changes and apply C2's translation as the base, or at minimum:
1. Revert to formal register (`आप`/`करें`, not `तुम`/`करो`)
2. Restore Hindi section headings
3. Restore Hindi code block comments from C2
4. Replace gratuitous Hinglish with the Hindi equivalents from C2
5. Remove the `cover_alt` field
