# Judge Report: de translation for stop-hardcoding-your-prompts

## Candidates
- **dd22f2c77c2a30d7a8def7a8e50c373df252c41a**: Gemini 2.5 Flash Lite
- **88c4cb106ed8855fe0a804ae5ac8882d31602b71**: Qwen 3.5 Flash
- **e84807f7614d39f42bfcf541daf588f7404a2626**: Gemini 3 Flash Preview

## Decision
**Winner:** Gemini 3 Flash Preview (e84807f7614d39f42bfcf541daf588f7404a2626)

## Reasoning
1. **Direct Style:** Gemini 3 captured Dan's direct, technical voice the best. "Hör auf, Prompts im Code zu vergraben" is a stronger and more idiomatic translation for "Stop Burying" than the more literal "Verstecke Prompts nicht" from Qwen.
2. **Technical Accuracy:** Gemini 3 used natural German developer phrasing while preserving the article's TypeScript examples.
3. **MDX Preservation:** Qwen missed important frontmatter, and Gemini 2.5 left the body largely in English. Gemini 3 translated the content but needed metadata restored from the English post.
4. **Natural Language:** Gemini 3 feels like German technical prose rather than a literal translation. Phrases like "flachklopfst" preserve the article's direct tone.

## Polishing Notes
- Restored controlled frontmatter fields, including tags, category, visibility, popularity, and image paths.
- Corrected inherited image paths to use `../` from the nested locale directory.
- Kept code sample defaults such as `en-US` unchanged to preserve code-block behavior.
