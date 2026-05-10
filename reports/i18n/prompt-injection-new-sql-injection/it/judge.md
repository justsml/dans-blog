# I18n Judge Report: Prompt Injection Is SQL Injection for Agents (it)

## Decision
**Winner**: DeepSeek V4 Flash (`e9c79f18b7ec4d0368c88558d46ed58bde4a80f7`)

## Analysis

### Candidates
1. **Qwen 3.6 Plus** (`7abbeca0`): Solid, but used "shipa" (incorrect) and some slightly more formal phrasing that felt less like Dan.
2. **DeepSeek V4 Flash** (`e9c79f18`): Excellent. Captured the punchy, technical, and slightly informal tone ("spedito", "modulo"). Correctly translated technical analogies.
3. **Gemini 3 Flash Preview** (`16e2228f`): Also good, but some phrasing felt a bit more "translated" (e.g., "Il Prompt Injection è il nuovo SQL Injection" - extra "il nuovo" not in original).

### Comparison
| Feature | Qwen | DeepSeek | Gemini |
| :--- | :--- | :--- | :--- |
| **Technical Accuracy** | High | High | High |
| **Natural Language** | Good | Excellent | Good |
| **Dan's Style** | Moderate | High | Moderate |
| **MDX Preservation** | Good | Excellent | Excellent |

### Choice Justification: DeepSeek V4 Flash
DeepSeek's translation felt the most natural and "Dan-like". For example, translating "ship it" as "spedito" (shipped) fits the developer context better than "si shipa" (unnatural) or Gemini's more literal "si va in produzione". The use of "modulo" for form is standard and clean.

## Polishing applied
- Fixed title capitalization to be consistent with the blog style.
- Ensured consistency in "SQL injection" (kept as-is as it's a technical term in IT Italian).
- Verified parent-relative image paths (`../`).
