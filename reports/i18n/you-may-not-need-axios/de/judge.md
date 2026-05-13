# Translation Judge

- Selected candidate: ae7b7a03bb8ecd44f6e1e5adee9f3cf37e150e92
- Selected model: openrouter/openai/gpt-oss-120b:nitro
- Judge model: openrouter/google/gemini-3-flash-preview

The candidate ae7b7a03bb8ecd44f6e1e5adee9f3cf37e150e92 is the only one that correctly translates the frontmatter title and includes the missing 'Recursive Retry Helper' section content (which was empty in 'current' and the other candidate). It also uses a more natural and professional German tone. However, it incorrectly modified the Gist paths by adding '../', which needs to be reverted to match the English source exactly.