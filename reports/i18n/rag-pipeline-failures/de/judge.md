# I18n Judge Report: rag-pipeline-failures (de)

## Candidates
- `ccd4a258`: openrouter/qwen/qwen3.6-plus
- `07c4c645`: openrouter/qwen/qwen3.5-flash-02-23
- `0a177fb7`: openrouter/google/gemini-3-flash-preview

## Decision
**Winner: Qwen 3.6 Plus (ccd4a258)**

## Reasoning
- **Technical Accuracy**: Qwen 3.6 Plus correctly translated technical concepts like "chunking", "embeddings", and "retrieval precision" while maintaining the correct technical tone.
- **Natural Language Quality**: It used the informal "Du" (implied via "Deine Chunks"), which matches Dan's direct, developer-to-developer style better than the formal "Sie" used by other candidates.
- **MDX Preservation**: It correctly updated asset paths to `../` for the nested locale folder and preserved all frontmatter fields and code blocks.
- **Dan's Style**: It captured the "no-nonsense" attitude well, using terms like "verdrahtet" for "wired" and "zuversichtlich falsche Antworten".

## Rejections
- **Qwen 3.5 Flash**: Contained grammatical errors (e.g., "Sie einbetten") and used an overly formal tone.
- **Gemini 3 Flash Preview**: Stripped significant portions of the frontmatter, failing basic MDX preservation requirements.

## Polish Applied
- Standardized "Embedding" as neuter ("das Embedding").
- Lightly tuned the prose for better rhythm while maintaining the winning candidate's directness.
