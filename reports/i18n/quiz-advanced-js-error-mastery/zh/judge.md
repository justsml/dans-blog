# Translation Judge

- Selected candidate: 18f9a089d467222d1805bee91550f5a8625c14ab
- Selected model: openrouter/openai/gpt-oss-120b:nitro
- Judge model: openrouter/deepseek/deepseek-v4-flash

Candidate 18f9a089 (GPT-oss-120b) remains selected for its natural translation quality. However, the current zh file has a structural issue: all 14 hints are incorrectly placed inside Challenge 0, and one option text is untranslated. Scores reflect these issues. The suggestions first remove the misplaced hints block from Challenge 0, then add the correct hint to each challenge, and fix the untranslated option. After applying these fixes, the translation will be structurally correct and complete.