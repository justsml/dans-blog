# Translation Judge

- Slug: your-foreign-keys-are-killing-performance
- Locale: de
- Primary cheap judge: openrouter/google/gemini-3-flash-preview
- Second cheap judge: openrouter/deepseek/deepseek-v4-flash
- Escalation judge: openrouter/anthropic/claude-sonnet-4.6
- Selected candidate: fa19bd0443cfe54d38b3c5e2d8085ebf746c62d8

## Result

The official judge wrapper attempted both required cheap judges. Both provider calls failed with OpenRouter credit/max-token errors before producing usable judge output.

Because the cheap judge outputs were structurally broken, Sonnet escalation was attempted once with `/Users/dan/.opencode/bin/opencode` and also failed with an OpenRouter credit/max-token error. No judge model produced a substantive comparison.

The selected file remains the latest validated candidate commit, `fa19bd0443cfe54d38b3c5e2d8085ebf746c62d8`, which is a small DeepSeek V3.2 polish pass on top of the full DeepSeek V4 Flash candidate. The final file passed `bun run i18n:validate -- --slug your-foreign-keys-are-killing-performance --locale de`.
