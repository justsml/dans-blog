# Judge Report: your-foreign-keys-are-killing-performance (fr)

## Candidates
- **GLM-4 (b37a8c87)**: `i18n candidate(fr): your-foreign-keys-are-killing-performance via openrouter/z-ai/glm-5-turbo`
- **DeepSeek (5cbc0618)**: `i18n candidate(fr): your-foreign-keys-are-killing-performance via openrouter/deepseek/deepseek-v3.2`
- **MiniMax (77a9087f)**: `i18n candidate(fr): your-foreign-keys-are-killing-performance via openrouter/minimax/minimax-m2.5`

## Decision
**Winner: GLM-4 (b37a8c87)**

## Reasoning
GLM-4 provided the most natural and professional French translation while maintaining Dan's direct, slightly cynical tone.

Key factors:
- **Natural Language**: GLM-4 used more idiomatic French (e.g., "roulettes" for training wheels, "goulot d'étranglement" for bottleneck). DeepSeek and MiniMax felt slightly more literal/robotic in their phrasing ("roues d'apprentissage").
- **Title/Tone**: GLM-4's title translation ("arrêtez de demander si c'est rapide") felt more impactful and less wordy than the others.
- **MDX Preservation**: All candidates preserved the code blocks and basic structure well.
- **Technical Accuracy**: All candidates correctly handled database terminology (Foreign Keys -> Clés étrangères, etc.).

## Polishing applied
- Ensured asset paths in frontmatter use parent-relative paths (`../`).
- Added `lang: fr` to frontmatter.
- Lightly adjusted a few phrases for better flow.
