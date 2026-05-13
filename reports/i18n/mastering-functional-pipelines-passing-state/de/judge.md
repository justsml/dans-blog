# Translation Judge

- Selected candidate: 32fea135ed3d04921067af2ca434abd709ec1f5e
- Selected model: openrouter/qwen/qwen3.6-plus
- Judge model: openrouter/google/gemini-3-flash-preview

The candidate 32fea135ed3d04921067af2ca434abd709ec1f5e is the only one that correctly preserves the MDX structure. Both the 'current' version and the deepseek candidate have a broken code block (a stray triple backtick '```' in the middle of the text) which disrupts the formatting. The selected candidate also provides a high-quality translation that maintains the technical tone and Dan's direct style while correctly translating terms like 'State' or keeping them as 'State' where appropriate in a German technical context.