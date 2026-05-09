# I18n Judge Report: stop-hardcoding-your-prompts (ru)

## Decision
**Selected Candidate:** `218e86c72ab0bf6b4fb06ee186198e82b222181b` (via `openrouter/google/gemini-3-flash-preview`)

## Comparison

| Candidate | Technical Accuracy | Style / Tone | MDX Preservation | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Gemini 3 Flash** | Excellent | Perfect | Excellent | Uses natural Russian engineering slang ("зашивать", "несущая конструкция"). |
| **Gemini 3.1 Flash Lite** | Good | Fair | Poor | Failed to clean up English frontmatter flags. Phrasing was slightly more "translated". |
| **Qwen 3.5 Flash** | Fair | Poor | Good | Awkward terminology ("кодобазе", "митигация"). Feels like a low-effort literal translation. |

## Reasoning
Gemini 3 Flash produced the most idiomatic Russian engineering content. It correctly translated "hardcoding" as "зашивать" in the title and intro, which is the standard term in Russian developer circles. It also maintained the direct, slightly opinionated tone characteristic of Dan's writing style. 

The selected version was lightly polished to ensure:
1. Frontmatter aligns with project standards (removed redundant draft/unlisted flags from the candidate).
2. Code block formatting and comments were preserved exactly.
3. XML escaping example used proper Russian descriptions.

## Final Verification
- [x] MDX structure intact
- [x] Code blocks correct
- [x] Internal links preserved
- [x] Frontmatter metadata consistent
