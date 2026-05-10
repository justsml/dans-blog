# Translation Judge Report: your-foreign-keys-are-killing-performance (it)

## Candidate Comparison

| Model | Commit | Directness | Technical Accuracy | Naturalness | MDX/Structure |
|-------|--------|------------|--------------------|-------------|---------------|
| Gemini 3 Flash | `d03ea088` | Good | High | High | Good |
| Qwen 3.6 Plus | `37b3f43c` | Good | High | High | Excellent |
| DeepSeek V4 Flash | `5d103140` | Excellent | High | Medium | Good |

## Analysis

### Gemini 3 Flash (`d03ea088`)
- **Pros**: Very natural flow. Uses "Foreign Keys" (English term) in the first paragraph but then switches to "chiavi esterne".
- **Cons**: Frontmatter is minimal (missing tags/categories which were present in the source and other candidates). Some phrasing is a bit formal ("Esiste questa idea pervasiva").

### Qwen 3.6 Plus (`37b3f43c`)
- **Pros**: Excellent preservation of frontmatter. Phrasing is very idiomatic ("anytime soon", "cargo-culting"). Good balance between technical terms and Italian.
- **Cons**: "Smetti di Chiederti Se Sono Veloci" is a bit wordy in the title.

### DeepSeek V4 Flash (`5d103140`)
- **Pros**: Captures Dan's direct tone very well ("Smettetela di Chiedervi Se Sono Veloce").
- **Cons**: "Foreign Key" is left in English throughout most of the text. While common in dev circles, "chiavi esterne" is usually preferred for a general technical article in Italian to avoid sounding like a lazy translation. It misses some nuances in natural flow ("per cosa vi state davvero ottimizzando" is slightly clunky).

## Decision: Qwen 3.6 Plus (`37b3f43c`)

Qwen provided the most complete MDX (preserving all frontmatter fields) and the best balance of "Dan's voice" in Italian. It used idiomatic expressions that fit the blog's style perfectly.

## Polishing Notes
- Adjusted the title to be slightly more punchy ("Smetti di chiederti se sono veloci").
- Fixed a few instances where "Foreign Key" (FK) and "chiavi esterne" were mixed inconsistently.
- Ensured "anytime soon" (left in English by Qwen) was translated or better integrated.
- Verified asset paths (they were already correct in the candidates using `../`).
