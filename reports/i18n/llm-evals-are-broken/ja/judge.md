# Translation Judge Detail

- Slug: llm-evals-are-broken
- Locale: ja
- Primary judge: openrouter/google/gemini-3-flash-preview
- Second judge: openrouter/deepseek/deepseek-v4-flash
- Escalation: not run
- Selected candidate: cfc27fa469f4f845c2128a64cb83785bf6948ff1
- Selected model: openrouter/deepseek/deepseek-v4-flash

Both judges selected the DeepSeek V4 Flash candidate. The primary judge preferred it for technical fidelity, direct tone, MDX preservation, and consistent Eval terminology. The second judge agreed that it should remain as-is and noted no escalation was needed.

Rejected candidate notes:

- 200749ff77df00a184f960a73d8d335afb07c900, openrouter/z-ai/glm-5-turbo: weaker phrasing and regressions around code-comment localization.
- cd999209b0d859ea1b9ba81ac96000f09387ab44, openrouter/z-ai/glm-4.7-flash: mistranslated the opening "tuxedo" image and had weaker preservation of localized image/code text.
