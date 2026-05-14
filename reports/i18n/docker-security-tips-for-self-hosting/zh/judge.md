# Translation Judge

- Selected candidate: d2aeb239d71875755de67f0d4f1eadb4dd3df7b4
- Selected model: openrouter/openai/gpt-oss-120b:nitro
- Judge model: openrouter/deepseek/deepseek-v4-flash

Selected gpt-oss candidate because it has no MDX preservation errors: correct heading counts (no duplicate H3), correct asset path (../lsof-scan-listen.webp), and properly formatted code blocks. The deepseek candidate has a duplicate H3 heading, an incorrect image path (missing ../), and a malformed code block, which are higher-priority issues. The gpt-oss candidate has some untranslated headings and labels, which are minor and can be improved with the provided suggestions.