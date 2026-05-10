# Judge Escalation

- Slug: llm-routing-mastra-ai
- Locale: it
- Escalation model requested: openrouter/anthropic/claude-sonnet-4.6
- Escalation status: blocked by OpenRouter credit/max-token limit
- Selected candidate: 9fa5b4988512ca7d9e104e149ac4c5033af8b029
- Selected model: openrouter/minimax/minimax-m2.7

Sonnet escalation was warranted because the primary cheap judge, `openrouter/google/gemini-3-flash-preview`, returned a provider credit/max-token error instead of a usable judge report. The second cheap judge, `openrouter/deepseek/deepseek-v4-flash`, completed and agreed with the MiniMax candidate.

The Sonnet retry also failed before producing output:

```text
This request requires more credits, or fewer max_tokens. You requested up to 32000 tokens, but can only afford 1899.
```

With escalation blocked, the final file keeps the MiniMax candidate selected by the completed cheap judge and applies only the three polish-level idiom fixes noted in `judge-second.md`.
