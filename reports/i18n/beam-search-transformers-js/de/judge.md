# German Translation Judge

- Slug: beam-search-transformers-js
- Locale: de
- Primary judge: openrouter/google/gemini-3-flash-preview
- Selected candidate: 7c1e9df4aab66ccbeabf7ace1ad058e6cafc49fc
- Selected model: openrouter/qwen/qwen3.6-plus

## Decision

Gemini selected the Qwen 3.6 Plus candidate as the strongest German translation. It preserved the MDX structure, inherited asset paths, code blocks, and technical terminology while keeping the prose more natural and less error-prone than the MiniMax and GLM alternatives.

MiniMax introduced several awkward literal choices and typos. GLM improved parts of the MiniMax text but left residual phrasing issues and a stray fragment in the Beam Search explanation. The Qwen candidate was the cleanest standalone base and needed only selection as the final file.

## Candidate Commits

- 7c1e9df4aab66ccbeabf7ace1ad058e6cafc49fc: openrouter/qwen/qwen3.6-plus
- f07b808faff2f34f1d7a99b2790a766d2b544d31: openrouter/minimax/minimax-m2.7
- 2df6a0b7b585b9f85506c32f49e9f7e8b219cc61: openrouter/z-ai/glm-5-turbo

Rejected attempt:

- 3587cb2b36ce305e44f0c650f1d43e8f3e46aa0d: openrouter/deepseek/deepseek-v4-flash, rejected for touching an unrelated file.
