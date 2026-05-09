# I18n Model Performance

Generated from `reports/i18n` and Git history at `2026-05-08T19:11:36-06:00`.

## Model Stats

| Model | Attempts | Passed | Rejected | Judged candidates | Wins | Win rate | ES wins | HI wins | JA wins |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| openrouter/qwen/qwen3.6-plus | 61 | 50 | 11 | 49 | 24 | 49% | 8 | 7 | 9 |
| openrouter/moonshotai/kimi-k2.6 | 61 | 49 | 12 | 48 | 14 | 29% | 5 | 5 | 4 |
| openrouter/google/gemini-3-flash-preview | 61 | 42 | 19 | 42 | 4 | 10% | 1 | 1 | 2 |
| openrouter/z-ai/glm-5.1 | 60 | 49 | 11 | 49 | 4 | 8% | 1 | 2 | 1 |
| openrouter/minimax/minimax-m2.7 | 60 | 40 | 20 | 40 | 3 | 8% | 2 | 1 | 0 |

## Winners By Article

| Article | ES | HI | JA | Locales judged | Notes |
| --- | --- | --- | --- | ---: | --- |
| ai-sdk-math-tool | moonshotai/kimi-k2.6 (783fc530) | qwen/qwen3.6-plus (87c627ed) | qwen/qwen3.6-plus (a17b3e24) | 3 |  |
| beam-search-transformers-js | qwen/qwen3.6-plus (964308c8) | moonshotai/kimi-k2.6 (3d7e766d) | qwen/qwen3.6-plus (d4ea9dd0) | 3 |  |
| lancedb-wasm-browser-client | unjudged | unjudged | unjudged | 0 | es: no judged winner; hi: no judged winner; ja: no judged winner |
| llm-connection-strings | google/gemini-3-flash-preview | minimax/minimax-m2.7 (960723bb) | qwen/qwen3.6-plus (a4343c45) | 3 |  |
| llm-evals-are-broken | qwen/qwen3.6-plus (cbb0b09b) | unjudged | unjudged | 1 | hi: no judged winner; ja: no judged winner |
| llm-generative-ui-landscape | moonshotai/kimi-k2.6 (1a8d701e) | qwen/qwen3.6-plus (ffa24b36) | qwen/qwen3.6-plus (2de44191) | 3 |  |
| llm-generative-ui-landscape-2026 | qwen/qwen3.6-plus (fae479cd) | moonshotai/kimi-k2.6 (9f8e8a1b) | z-ai/glm-5.1 | 3 |  |
| llm-routing-mastra-ai | qwen/qwen3.6-plus (3e1478bf) | z-ai/glm-5.1 (c4ea4d56) | moonshotai/kimi-k2.6 (a0d37ceb) | 3 |  |
| mastra-mcp-tool-integrations | moonshotai/kimi-k2.6 (fe060743) | moonshotai/kimi-k2.6 (5d47c4b7) | moonshotai/kimi-k2.6 (96ccb815) | 3 |  |
| mastra-security-guardrails | z-ai/glm-5.1 (be1268df) | qwen/qwen3.6-plus | moonshotai/kimi-k2.6 (c05809c0) | 3 |  |
| mastra-workflows-memory | qwen/qwen3.6-plus (033a3be9) | qwen/qwen3.6-plus (1e22fa84) | qwen/qwen3.6-plus (4bf40b82) | 3 |  |
| postgres-text-search-guide | moonshotai/kimi-k2.6 (74d85d02) | moonshotai/kimi-k2.6 (6a520356) | qwen/qwen3.6-plus (55f12900) | 3 |  |
| prompt-injection-new-sql-injection | minimax/minimax-m2.7 (b31ff955) | qwen/qwen3.6-plus (fc6d16e4) | qwen/qwen3.6-plus (b7ba0dd7) | 3 |  |
| quiz-context-engineering | unjudged |  |  | 0 | es: no judged winner |
| quiz-do-you-really-understand-closures | unjudged | unjudged | unjudged | 0 | es: no judged winner; hi: no judged winner; ja: no judged winner |
| rag-pipeline-failures | unjudged | unjudged | unjudged | 0 | es: no judged winner; hi: no judged winner; ja: no judged winner |
| securing-clawdbot-tailscale | qwen/qwen3.6-plus (243137a0) | qwen/qwen3.6-plus (e8c037ce) | qwen/qwen3.6-plus (6e3019e2) | 3 |  |
| semantic-vector-search-landscape | qwen/qwen3.6-plus (8e35a85c) | moonshotai/kimi-k2.6 (af140620) | moonshotai/kimi-k2.6 (4fd17cca) | 3 |  |
| the-last-to-think | qwen/qwen3.6-plus (26a900ed) | google/gemini-3-flash-preview (09fa8793) | qwen/qwen3.6-plus | 3 |  |
| weakmap-the-javascript-feature-you-dont-use | minimax/minimax-m2.7 (84229cd0) | z-ai/glm-5.1 (04da79ba) | google/gemini-3-flash-preview (3a82ddad) | 3 |  |
| your-foreign-keys-are-killing-performance | moonshotai/kimi-k2.6 (340963e1) | qwen/qwen3.6-plus (0b4edc89) | google/gemini-3-flash-preview | 3 |  |

## Locale Details

| Article | Locale | Winner | Winner commit | Candidate commits | Attempts | Rejected | Judge |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| ai-sdk-math-tool | es | openrouter/moonshotai/kimi-k2.6 | `783fc530` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| ai-sdk-math-tool | hi | openrouter/qwen/qwen3.6-plus | `87c627ed` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| ai-sdk-math-tool | ja | openrouter/qwen/qwen3.6-plus | `a17b3e24` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| beam-search-transformers-js | es | openrouter/qwen/qwen3.6-plus | `964308c8` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| beam-search-transformers-js | hi | openrouter/moonshotai/kimi-k2.6 | `3d7e766d` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| beam-search-transformers-js | ja | openrouter/qwen/qwen3.6-plus | `d4ea9dd0` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| lancedb-wasm-browser-client | es |  |  | 0 | 5 | 5 |  |
| lancedb-wasm-browser-client | hi |  |  | 0 | 5 | 5 |  |
| lancedb-wasm-browser-client | ja |  |  | 0 | 5 | 5 |  |
| llm-connection-strings | es | openrouter/google/gemini-3-flash-preview |  | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-connection-strings | hi | openrouter/minimax/minimax-m2.7 | `960723bb` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-connection-strings | ja | openrouter/qwen/qwen3.6-plus | `a4343c45` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| llm-evals-are-broken | es | openrouter/qwen/qwen3.6-plus | `cbb0b09b` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-evals-are-broken | hi |  |  | 3 | 5 | 2 | openrouter/openai/gpt-5.4-mini |
| llm-evals-are-broken | ja |  |  | 0 | 5 | 5 |  |
| llm-generative-ui-landscape | es | openrouter/moonshotai/kimi-k2.6 | `1a8d701e` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-generative-ui-landscape | hi | openrouter/qwen/qwen3.6-plus | `ffa24b36` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-generative-ui-landscape | ja | openrouter/qwen/qwen3.6-plus | `2de44191` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-generative-ui-landscape-2026 | es | openrouter/qwen/qwen3.6-plus | `fae479cd` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-generative-ui-landscape-2026 | hi | openrouter/moonshotai/kimi-k2.6 | `9f8e8a1b` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| llm-generative-ui-landscape-2026 | ja | openrouter/z-ai/glm-5.1 |  | 3 | 5 | 2 | openrouter/openai/gpt-5.4-mini |
| llm-routing-mastra-ai | es | openrouter/qwen/qwen3.6-plus | `3e1478bf` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-routing-mastra-ai | hi | openrouter/z-ai/glm-5.1 | `c4ea4d56` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| llm-routing-mastra-ai | ja | openrouter/moonshotai/kimi-k2.6 | `a0d37ceb` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| mastra-mcp-tool-integrations | es | openrouter/moonshotai/kimi-k2.6 | `fe060743` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| mastra-mcp-tool-integrations | hi | openrouter/moonshotai/kimi-k2.6 | `5d47c4b7` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| mastra-mcp-tool-integrations | ja | openrouter/moonshotai/kimi-k2.6 | `96ccb815` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| mastra-security-guardrails | es | openrouter/z-ai/glm-5.1 | `be1268df` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| mastra-security-guardrails | hi | openrouter/qwen/qwen3.6-plus |  | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| mastra-security-guardrails | ja | openrouter/moonshotai/kimi-k2.6 | `c05809c0` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| mastra-workflows-memory | es | openrouter/qwen/qwen3.6-plus | `033a3be9` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| mastra-workflows-memory | hi | openrouter/qwen/qwen3.6-plus | `1e22fa84` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| mastra-workflows-memory | ja | openrouter/qwen/qwen3.6-plus | `4bf40b82` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| postgres-text-search-guide | es | openrouter/moonshotai/kimi-k2.6 | `74d85d02` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| postgres-text-search-guide | hi | openrouter/moonshotai/kimi-k2.6 | `6a520356` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| postgres-text-search-guide | ja | openrouter/qwen/qwen3.6-plus | `55f12900` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| prompt-injection-new-sql-injection | es | openrouter/minimax/minimax-m2.7 | `b31ff955` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| prompt-injection-new-sql-injection | hi | openrouter/qwen/qwen3.6-plus | `fc6d16e4` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| prompt-injection-new-sql-injection | ja | openrouter/qwen/qwen3.6-plus | `b7ba0dd7` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| quiz-context-engineering | es |  |  | 0 | 3 | 1 |  |
| quiz-do-you-really-understand-closures | es |  |  | 0 | 5 | 5 |  |
| quiz-do-you-really-understand-closures | hi |  |  | 0 | 5 | 5 |  |
| quiz-do-you-really-understand-closures | ja |  |  | 0 | 5 | 5 |  |
| rag-pipeline-failures | es |  |  | 0 | 5 | 5 |  |
| rag-pipeline-failures | hi |  |  | 0 | 5 | 5 |  |
| rag-pipeline-failures | ja |  |  | 0 | 5 | 5 |  |
| securing-clawdbot-tailscale | es | openrouter/qwen/qwen3.6-plus | `243137a0` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| securing-clawdbot-tailscale | hi | openrouter/qwen/qwen3.6-plus | `e8c037ce` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| securing-clawdbot-tailscale | ja | openrouter/qwen/qwen3.6-plus | `6e3019e2` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| semantic-vector-search-landscape | es | openrouter/qwen/qwen3.6-plus | `8e35a85c` | 3 | 5 | 2 | openrouter/openai/gpt-5.4-mini |
| semantic-vector-search-landscape | hi | openrouter/moonshotai/kimi-k2.6 | `af140620` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| semantic-vector-search-landscape | ja | openrouter/moonshotai/kimi-k2.6 | `4fd17cca` | 1 | 5 | 4 | openrouter/openai/gpt-5.4-mini |
| the-last-to-think | es | openrouter/qwen/qwen3.6-plus | `26a900ed` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| the-last-to-think | hi | openrouter/google/gemini-3-flash-preview | `09fa8793` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| the-last-to-think | ja | openrouter/qwen/qwen3.6-plus |  | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| weakmap-the-javascript-feature-you-dont-use | es | openrouter/minimax/minimax-m2.7 | `84229cd0` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| weakmap-the-javascript-feature-you-dont-use | hi | openrouter/z-ai/glm-5.1 | `04da79ba` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| weakmap-the-javascript-feature-you-dont-use | ja | openrouter/google/gemini-3-flash-preview | `3a82ddad` | 4 | 5 | 1 | openrouter/openai/gpt-5.4-mini |
| your-foreign-keys-are-killing-performance | es | openrouter/moonshotai/kimi-k2.6 | `340963e1` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| your-foreign-keys-are-killing-performance | hi | openrouter/qwen/qwen3.6-plus | `0b4edc89` | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
| your-foreign-keys-are-killing-performance | ja | openrouter/google/gemini-3-flash-preview |  | 5 | 5 | 0 | openrouter/openai/gpt-5.4-mini |
