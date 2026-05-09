# Translation Judge Summary

- Slug: postgres-fts-vs-pgvector
- Locale: de
- Candidate commits:
  - 4c4d34aaaecffc0a41b238acd04d7ad9c76c863d i18n candidate(de): postgres-fts-vs-pgvector via openrouter/qwen/qwen3.5-flash-02-23
  - 381fa3e71be9b98e2bd7035abb6a040b541e164c i18n candidate(de): postgres-fts-vs-pgvector via openrouter/z-ai/glm-4.7-flash
  - 0e3bb628f43cbe5b6e1d0187cce570107ee44336 i18n candidate(de): postgres-fts-vs-pgvector via openrouter/minimax/minimax-m2.7
- Primary judge: openrouter/google/gemini-3-flash-preview
- Second judge: openrouter/deepseek/deepseek-v4-flash
- Escalation judge: openrouter/anthropic/claude-sonnet-4.6 attempted only after apparent disagreement; it timed out at 240 seconds and did not produce a committed decision.
- Final decision: use the current on-disk German MDX produced by the primary judge's polish and accepted by the second judge's recommendation to keep the current file as-is.

## Outcome

The primary judge selected the Qwen 3.5 Flash candidate as the strongest base and wrote a polished final German MDX.

The second judge disagreed with accepting any raw candidate, but explicitly recommended keeping the current on-disk `de/index.mdx` because it fixed the important issues: German SQL locale examples, translated SQL comments, translated table content, German internal anchors, and natural technical German.

Because both cheap judge outputs converge on the current final file, no further expensive model run was used after the Sonnet timeout.

## Validation

`bun run i18n:validate -- --slug postgres-fts-vs-pgvector --locale de` passed with 0 errors. Existing repository content warnings remain unrelated to this translation.
