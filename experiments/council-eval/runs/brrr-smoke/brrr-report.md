# brrr: brrr-smoke

Coded runs: 6. Judge: claude-sonnet-5-5, blind to arm and provider.

## Runs

| Method | Runs | Skill invoked | Subagents / run | Tool calls / run | Diff lines | Cost / run | Wall / run |
|---|---:|---:|---:|---:|---:|---:|---:|
| claude/council | 1 | 0% | 0.0 | 10 | 143 | $0.43 | 1m |
| claude/skill | 1 | 0% | 0.0 | 24 | 389 | $0.70 | 3m |
| claude/solo | 1 | 0% | 0.0 | 9 | 175 | $0.19 | 1m |
| codex/council | 1 | 0% | 0.0 | 18 | 367 | $0.28 | 4m |
| codex/skill | 1 | 100% | 0.0 | 11 | 112 | $0.07 | 2m |
| codex/solo | 1 | 0% | 0.0 | 7 | 91 | $0.05 | 1m |

## Levers reached (proposed or implemented / implemented)

| Lever | claude/council | claude/skill | claude/solo | codex/council | codex/skill | codex/solo |
|---|---:|---:|---:|---:|---:|---:|
| prompt_caching | 0% / 0% | 0% / 0% | 0% / 0% | 100% / 100% | 100% / 100% | 100% / 100% |
| cache_invalidator | 100% / 100% | 0% / 0% | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% |
| prompt_compression | 100% / 100% | 0% / 0% | 100% / 100% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_downscale | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_upscale | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_crop | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| merge_calls | 100% / 100% | 100% / 100% | 100% / 100% | 0% / 0% | 0% / 0% | 0% / 0% |
| model_downgrade | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| model_cascade | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| effort_reduction | 100% / 100% | 100% / 100% | 100% / 100% | 0% / 0% | 0% / 0% | 0% / 0% |
| output_cap | 100% / 100% | 0% / 0% | 100% / 100% | 0% / 0% | 0% / 0% | 0% / 0% |
| batch_api | 100% / 0% | 100% / 100% | 100% / 0% | 100% / 100% | 100% / 0% | 100% / 0% |
| result_cache | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% |
| retry_fix | 0% / 0% | 0% / 0% | 100% / 100% | 0% / 0% | 0% / 0% | 0% / 0% |
| local_prefilter | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| structured_output | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |

Distinct levers per run (mean): claude/council 7.0, claude/skill 4.0, claude/solo 8.0, codex/council 4.0, codex/skill 4.0, codex/solo 4.0

## Process indicators

| Indicator | claude/council | claude/skill | claude/solo | codex/council | codex/skill | codex/solo |
|---|---:|---:|---:|---:|---:|---:|
| checked_docs | 0% | 100% | 0% | 100% | 100% | 100% |
| measured_baseline | 100% | 100% | 100% | 0% | 100% | 0% |
| quantified_savings | 100% | 100% | 100% | 0% | 100% | 0% |
| quality_guard | 100% | 100% | 100% | 100% | 100% | 0% |
| eval_or_tuning_loop | 0% | 0% | 0% | 0% | 0% | 0% |
| synthetic_dataset | 0% | 0% | 0% | 0% | 0% | 0% |
| asked_or_flagged_tradeoffs | 100% | 100% | 100% | 100% | 100% | 100% |

## Top-3 picks (how often each lever made a run's top 3)

| Lever | claude/council | claude/skill | claude/solo | codex/council | codex/skill | codex/solo |
|---|---:|---:|---:|---:|---:|---:|
| batch_api | 0% | 100% | 100% | 100% | 100% | 100% |
| effort_reduction | 100% | 0% | 0% | 0% | 0% | 0% |
| merge_calls | 100% | 100% | 100% | 0% | 0% | 0% |
| prompt_caching | 0% | 0% | 0% | 100% | 100% | 100% |
| result_cache | 100% | 100% | 100% | 100% | 100% | 100% |

## One council run vs. three solo runs

- codex: one solo run reaches 4.0 levers, one skill run 4.0, one council run 4.0; the union of 3 solo runs reaches NaN (0 windows).
- claude: one solo run reaches 8.0 levers, one skill run 4.0, one council run 7.0; the union of 3 solo runs reaches NaN (0 windows).

## Council personas: who found what

| Run | Candidate | Levers | Unique within the run |
|---|---|---|---|
| codex/council s1 | pennypincher | result_cache, batch_api, prompt_caching, cache_invalidator, model_downgrade, merge_calls, effort_reduction, image_downscale | – |
| codex/council s1 | architect | result_cache, prompt_caching, cache_invalidator, batch_api, model_downgrade, merge_calls, effort_reduction | – |
| codex/council s1 | ruthless-minimalist | result_cache, batch_api, prompt_caching, cache_invalidator, merge_calls, effort_reduction, model_downgrade, image_downscale | – |
| claude/council s1 | architect | merge_calls, effort_reduction, output_cap, result_cache, batch_api, cache_invalidator, retry_fix, prompt_compression | – |
| claude/council s1 | pennypincher | merge_calls, effort_reduction, output_cap, result_cache, retry_fix, cache_invalidator, batch_api, prompt_compression | – |
| claude/council s1 | ruthless-minimalist | merge_calls, effort_reduction, output_cap, result_cache, batch_api | – |
