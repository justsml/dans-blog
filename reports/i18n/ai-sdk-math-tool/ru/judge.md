# Judge Report: ai-sdk-math-tool (ru)

## Candidates

| Model | Commit | Status |
| :--- | :--- | :--- |
| Qwen 3.6 Plus | `e79c7ba` | Selected |
| DeepSeek V4 Flash | `a4f4a38` | Rejected (Over-translated frontmatter, technical terminology) |
| MiniMax M2.7 | `80607f1` | Rejected (Untranslated code block comments/descriptions, literalisms) |

## Decision: Qwen 3.6 Plus

The Qwen translation is the strongest because it captures Dan's direct, technical tone without falling into common translation traps.

### Why Qwen Won:
- **Tone & Style:** It uses natural technical Russian (e.g., "ставло меня в ступор", "столкнулся в лоб"). It preserves the "Dan Levy" voice—authoritative but conversational.
- **Technical Accuracy:** Correctly translates "pattern-matching engine" as "движок сопоставления паттернов" (DeepSeek used "движок поиска шаблонов", which is less idiomatic in modern ML context).
- **MDX Preservation:** Handled relative asset paths correctly and kept frontmatter keys intact.
- **Completeness:** Unlike MiniMax, it translated the comments and descriptions inside the code blocks, which is essential for a technical tutorial.

### Issues with Others:
- **DeepSeek:** Added a `lang: ru` frontmatter key (unnecessary for this project's schema) and over-translated "tool calling" to "вызов инструментов (tool calling)", which clutters the prose.
- **MiniMax:** Left the `description` and `describe` strings in the `mathTool` definition in English. Also used "actually" as an English word in the middle of a Russian sentence.

## Final Polishing
I applied light polishing to the Qwen candidate:
- Adjusted "матанализ" (calculus) in the tool description to be more general where appropriate, but kept it as it's a valid translation for technical audiences.
- Verified all relative paths (`../wide.webp`) match the standard for nested locale folders in this repo.
- Ensured consistent use of "LLM" vs "языковые модели".
