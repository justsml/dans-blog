# I18n Judge Report: ai-sdk-math-tool (de)

## Candidate Comparison

| Model | Technical Accuracy | Natural Language | MDX/Structure | Decision |
| :--- | :--- | :--- | :--- | :--- |
| **Qwen** (63ed2aac) | High | Excellent. "Weißt du, was an Sprachmodellen seltsam ist?" feels very Dan-like. | Perfect. | **Selected** |
| **DeepSeek** (f005b4d2) | High | Good, but slightly more formal ("Du weißt, was seltsam an Sprachmodellen ist?"). | Good. | Alternative |
| **Minimax** (d7616ef2) | High | Mixed. "realized", "straightforward" kept in English; phrasing is awkward. | Average. | Rejected |

## Decision: Qwen (63ed2aac)

Qwen captured Dan's direct, slightly irreverent technical style the best. It uses idiomatic German expressions (e.g., "gegen die Wand gefahren", "würfelst du im Grunde") that feel natural for a technical blog. It correctly handled the technical terminology (Tool Calling, Prompt-Engineering, Batching) while translating the prose effectively.

## Polish Applied
- Standardized currency formatting ($ vs €).
- Refined the "Turner" analogy for slightly better flow.
- Ensured consistency in code comments.
- Verified parent-relative asset paths (`../wide.webp`).
