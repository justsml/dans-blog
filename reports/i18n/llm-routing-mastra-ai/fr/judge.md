# French Translation Judge Notes

Automated model judging did not produce a usable evaluation for `llm-routing-mastra-ai` in `fr`.

- `openrouter/google/gemini-3-flash-preview` failed with an OpenRouter credit/max_tokens error.
- `openrouter/deepseek/deepseek-v4-flash` failed with an OpenRouter credit/max_tokens error.
- `openrouter/anthropic/claude-sonnet-4.6` was attempted as the allowed escalation for structurally broken judge output and also failed with an OpenRouter credit/max_tokens error.

Final selection therefore keeps the latest successful DeepSeek V4 Flash candidate, `2deb04ba730126f90d4e8af01ab044ec934af9f7`, with a manual structural polish pass for French casing, one grammar issue, inherited asset path depth, and localized series links.
