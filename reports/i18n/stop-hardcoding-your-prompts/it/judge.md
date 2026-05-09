# Judge Report: it translation for stop-hardcoding-your-prompts

## Selected Candidate
**Gemini 3 Flash Preview** (SHA: `295d73845cd3340abad5e29e710d478d041c45b8`)

## Decision Logic
The Gemini 3 candidate was selected because it best captured Dan's direct, technical, and slightly informal tone while maintaining high technical accuracy.

- **Natural Language & Tone**: Gemini 3 used natural technical Italian (e.g., "ritocco al prompt", "carico portante"). Gemini 2.5 was also good but slightly more formal/dry. MiniMax failed significantly by leaving all code-block strings in English.
- **Technical Accuracy**: Gemini 3 correctly translated concepts like "retrieval", "injection", and "tier", which are often tricky in Italian technical contexts.
- **MDX Preservation**: Both Gemini models preserved the MDX structure perfectly. Gemini 3's frontmatter was cleaner (though it omitted the tags and visibility flags, which were restored in the final polish).

## Polishing Steps
1. **Frontmatter**: Restored full frontmatter tags, categories, and visibility flags from the English original to ensure site-wide consistency.
2. **Consistency**: Ensured consistent use of "supporto" vs "assistenza" and verified that code block translations (where appropriate for descriptive text) were accurate while keeping implementation details (like Zod schemas) correct.
3. **Flow**: Lightly adjusted some sentence transitions to better match the punchy rhythm of the original English text.

## Final Result
The polished version combines Gemini 3's linguistic flow with the project's metadata requirements.
