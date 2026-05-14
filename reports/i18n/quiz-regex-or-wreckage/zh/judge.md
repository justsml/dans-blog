# Translation Judge

- Selected candidate: 7eb325c1d34ef02f33b03d20d69f1f220ef5457a
- Selected model: deepseek/deepseek-v4-flash
- Judge model: openrouter/google/gemini-3-flash-preview

The DeepSeek candidate provides the most natural and technically accurate translation. It correctly handles the terminology for look-around assertions (环视断言, 先行断言, 后顾断言) which are notoriously difficult to translate consistently. It also correctly preserves the MDX structure and asset paths. The other candidates had minor issues like duplicate import statements (gpt-oss) or slightly less natural phrasing.