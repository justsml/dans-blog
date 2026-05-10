# Escalation Judge Attempt: llm-routing-mastra-ai (de)

- Model: openrouter/anthropic/claude-sonnet-4.6
- Status: failed before producing judge output
- Trigger: primary cheap judge output from openrouter/google/gemini-3-flash-preview was structurally unusable because it returned only an OpenRouter credit/max-token error.
- Error: OpenRouter reported insufficient credits/max-token allowance; the key could only afford 669 tokens for a request capped at 32000.
- Result: no Sonnet decision was used. The final selected translation remains candidate a01efdb137c45fcde97c332d5bc765ce2959e2bd, which the successful second judge selected. The final polish commit applies only the second judge's concrete fixes.
