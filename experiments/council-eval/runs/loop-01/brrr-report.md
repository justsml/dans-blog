# brrr: loop-smoke

Coded runs: 4. Judge: claude-sonnet-5-5, blind to arm and provider.

## Runs

| Method | Runs | Skill invoked | Subagents / run | Tool calls / run | Diff lines | Cost / run | Wall / run |
|---|---:|---:|---:|---:|---:|---:|---:|
| claude/council-v1 | 1 | 0% | 0.0 | 0 | 0 | $1.47 | 5m |
| claude/council-v2 | 1 | 0% | 0.0 | 0 | 0 | $1.27 | 5m |
| codex/council-v1 | 1 | 0% | 0.0 | 0 | 0 | $0.23 | 1m |
| codex/council-v2 | 1 | 0% | 0.0 | 0 | 0 | $0.26 | 2m |

## Levers reached (proposed or implemented / implemented)

| Lever | claude/council-v1 | claude/council-v2 | codex/council-v1 | codex/council-v2 |
|---|---:|---:|---:|---:|
| prompt_caching | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% |
| cache_invalidator | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% |
| prompt_compression | 100% / 100% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_downscale | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_upscale | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_crop | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| merge_calls | 100% / 100% | 0% / 0% | 0% / 0% | 100% / 0% |
| model_downgrade | 0% / 0% | 100% / 0% | 0% / 0% | 100% / 0% |
| model_cascade | 100% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| effort_reduction | 100% / 100% | 100% / 0% | 0% / 0% | 100% / 0% |
| output_cap | 100% / 100% | 100% / 0% | 0% / 0% | 0% / 0% |
| batch_api | 100% / 100% | 100% / 100% | 100% / 0% | 100% / 0% |
| result_cache | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% |
| retry_fix | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| local_prefilter | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| structured_output | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |

Distinct levers per run (mean): claude/council-v1 9.0, claude/council-v2 7.0, codex/council-v1 4.0, codex/council-v2 7.0

## Process indicators

| Indicator | claude/council-v1 | claude/council-v2 | codex/council-v1 | codex/council-v2 |
|---|---:|---:|---:|---:|
| checked_docs | 100% | 100% | 100% | 100% |
| measured_baseline | 100% | 100% | 100% | 100% |
| quantified_savings | 100% | 100% | 100% | 100% |
| quality_guard | 100% | 0% | 100% | 100% |
| eval_or_tuning_loop | 100% | 0% | 0% | 100% |
| synthetic_dataset | 0% | 0% | 0% | 0% |
| asked_or_flagged_tradeoffs | 100% | 100% | 100% | 100% |

## Top-3 picks (how often each lever made a run's top 3)

| Lever | claude/council-v1 | claude/council-v2 | codex/council-v1 | codex/council-v2 |
|---|---:|---:|---:|---:|
| batch_api | 100% | 100% | 100% | 100% |
| effort_reduction | 0% | 100% | 0% | 0% |
| merge_calls | 100% | 0% | 0% | 0% |
| prompt_caching | 0% | 0% | 100% | 100% |
| result_cache | 100% | 100% | 100% | 100% |

## One council run vs. three solo runs

- codex: one solo run reaches NaN levers, one skill run NaN, one council run NaN; the union of 3 solo runs reaches NaN (0 windows).
- claude: one solo run reaches NaN levers, one skill run NaN, one council run NaN; the union of 3 solo runs reaches NaN (0 windows).

## Council personas: who found what

| Run | Candidate | Levers | Unique within the run |
|---|---|---|---|
| codex/council-v2 s1 | architect | result_cache, cache_invalidator, batch_api | – |
| codex/council-v2 s1 | pennypincher | result_cache, batch_api, prompt_caching, cache_invalidator | prompt_caching |
| codex/council-v2 s1 | ruthless-minimalist | merge_calls, effort_reduction, model_downgrade | merge_calls, effort_reduction, model_downgrade |
| codex/council-v1 s1 | pennypincher | result_cache, batch_api, prompt_caching, cache_invalidator | – |
| codex/council-v1 s1 | architect | result_cache, batch_api, prompt_caching, cache_invalidator | – |
| codex/council-v1 s1 | ruthless-minimalist | result_cache, batch_api, prompt_caching, cache_invalidator | – |
| claude/council-v2 s1 | architect | result_cache, batch_api, effort_reduction, model_downgrade, output_cap | result_cache, batch_api, effort_reduction, model_downgrade, output_cap |
| claude/council-v2 s1 | pennypincher | prompt_caching, cache_invalidator | prompt_caching, cache_invalidator |
| claude/council-v1 s1 | architect | merge_calls, effort_reduction, prompt_caching, cache_invalidator, prompt_compression, output_cap, result_cache, batch_api, model_cascade | prompt_compression, output_cap, result_cache, model_cascade |
| claude/council-v1 s1 | pennypincher | merge_calls, effort_reduction, prompt_caching, cache_invalidator, batch_api | – |
