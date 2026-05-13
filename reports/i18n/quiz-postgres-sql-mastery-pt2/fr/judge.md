# Translation Judge

- Selected candidate: 481c8f10491ea96e541f8df0a587b7e5f3c0ab08
- Selected model: openrouter/openai/gpt-oss-120b:nitro
- Judge model: openrouter/google/gemini-3-flash-preview

Candidate 481c8f10491ea96e541f8df0a587b7e5f3c0ab08 is the only one that correctly translated the frontmatter (title/subtitle). However, it accidentally stripped out the 'options' arrays for two challenges (index 4 and 8) and corrupted a string in index 7. These are high-priority fixes to make the quiz functional, but this candidate remains the best starting point due to its superior prose and metadata handling.