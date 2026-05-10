# Translation Judge Summary

- Slug: postgres-text-search-guide
- Locale: it
- Selected candidate: `6f3ea908af8ed048d542e8dc76ff24f0ea4bd774`
- Selected model: `openrouter/qwen/qwen3.6-plus`
- Final status: accepted with one grammar polish from the second judge
- Escalation judge model: not run

## Candidates

- `6f3ea908af8ed048d542e8dc76ff24f0ea4bd774` i18n candidate(it): postgres-text-search-guide via `openrouter/qwen/qwen3.6-plus`
- `9a05f57b7c4cf4c7175f585725283596311668c4` i18n candidate(it): postgres-text-search-guide via `openrouter/qwen/qwen3.5-flash-02-23`
- `fec8601b2ed9b71c6356cf460caef8c05ceaa5b2` i18n candidate(it): postgres-text-search-guide via `openrouter/deepseek/deepseek-v4-flash`

## Judges

- Primary judge: `openrouter/google/gemini-3-flash-preview`; selected Qwen 3.6 Plus and accepted the current final as a light polish. No escalation needed.
- Second judge: `openrouter/deepseek/deepseek-v4-flash`; agreed with Qwen 3.6 Plus, scored the current final 8.5/10, and flagged one grammar issue.

## Final Polish

- Fixed `RRF punteggio ogni risultato` to `RRF assegna a ogni risultato un punteggio`.

## Failures / Notes

- The standard `bun run i18n:judge` wrapper timed out at 240 seconds for Gemini 3 Flash after it had written a partial primary report.
- A second wrapper attempt with DeepSeek V4 Flash + GLM 4.7 Flash also timed out at 240 seconds before completing.
- To avoid burning more tokens, the final two judge checks were run directly with `/Users/dan/.opencode/bin/opencode run --pure` against pre-materialized candidate files.
