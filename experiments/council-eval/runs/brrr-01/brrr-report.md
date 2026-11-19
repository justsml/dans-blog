# brrr: brrr-01

Coded runs: 30. Judge: claude-sonnet-5-5, blind to arm and provider.

## Runs

| Method | Runs | Skill invoked | Subagents / run | Tool calls / run | Diff lines | Cost / run | Wall / run |
|---|---:|---:|---:|---:|---:|---:|---:|
| claude/council | 5 | 0% | 0.0 | 8 | 424 | $0.60 | 3m |
| claude/skill | 5 | 20% | 0.6 | 33 | 181 | $1.14 | 4m |
| claude/solo | 5 | 0% | 0.0 | 12 | 272 | $0.28 | 2m |
| codex/council | 5 | 0% | 0.0 | 20 | 341 | $0.29 | 4m |
| codex/skill | 5 | 100% | 0.0 | 16 | 107 | $0.09 | 2m |
| codex/solo | 5 | 0% | 0.0 | 12 | 113 | $0.06 | 2m |

## Levers reached (proposed or implemented / implemented)

| Lever | claude/council | claude/skill | claude/solo | codex/council | codex/skill | codex/solo |
|---|---:|---:|---:|---:|---:|---:|
| prompt_caching | 40% / 40% | 80% / 80% | 20% / 20% | 100% / 100% | 100% / 100% | 100% / 100% |
| cache_invalidator | 80% / 80% | 100% / 100% | 60% / 60% | 100% / 100% | 100% / 100% | 100% / 100% |
| prompt_compression | 40% / 40% | 0% / 0% | 60% / 60% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_downscale | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_upscale | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| image_crop | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| merge_calls | 100% / 100% | 100% / 80% | 100% / 100% | 20% / 20% | 20% / 0% | 20% / 0% |
| model_downgrade | 20% / 0% | 40% / 0% | 60% / 0% | 0% / 0% | 20% / 0% | 20% / 0% |
| model_cascade | 0% / 0% | 0% / 0% | 20% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| effort_reduction | 100% / 100% | 100% / 60% | 100% / 100% | 0% / 0% | 20% / 0% | 0% / 0% |
| output_cap | 100% / 100% | 40% / 40% | 100% / 100% | 0% / 0% | 20% / 0% | 0% / 0% |
| batch_api | 100% / 80% | 80% / 60% | 100% / 40% | 100% / 80% | 100% / 0% | 100% / 0% |
| result_cache | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% | 100% / 100% |
| retry_fix | 80% / 80% | 20% / 20% | 40% / 40% | 20% / 20% | 0% / 0% | 0% / 0% |
| local_prefilter | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |
| structured_output | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% | 0% / 0% |

Distinct levers per run (mean): claude/council 7.6, claude/skill 6.6, claude/solo 7.6, codex/council 4.4, codex/skill 4.8, codex/solo 4.4

## Process indicators

| Indicator | claude/council | claude/skill | claude/solo | codex/council | codex/skill | codex/solo |
|---|---:|---:|---:|---:|---:|---:|
| checked_docs | 0% | 100% | 60% | 100% | 100% | 100% |
| measured_baseline | 100% | 100% | 100% | 40% | 100% | 80% |
| quantified_savings | 100% | 100% | 100% | 40% | 80% | 100% |
| quality_guard | 100% | 100% | 100% | 80% | 60% | 80% |
| eval_or_tuning_loop | 40% | 60% | 20% | 0% | 0% | 0% |
| synthetic_dataset | 0% | 0% | 0% | 0% | 0% | 0% |
| asked_or_flagged_tradeoffs | 100% | 100% | 100% | 100% | 100% | 100% |

## Top-3 picks (how often each lever made a run's top 3)

| Lever | claude/council | claude/skill | claude/solo | codex/council | codex/skill | codex/solo |
|---|---:|---:|---:|---:|---:|---:|
| batch_api | 80% | 60% | 80% | 100% | 100% | 100% |
| effort_reduction | 40% | 0% | 40% | 0% | 0% | 0% |
| merge_calls | 80% | 80% | 80% | 0% | 20% | 0% |
| output_cap | 0% | 0% | 0% | 0% | 20% | 0% |
| prompt_caching | 0% | 60% | 0% | 100% | 60% | 100% |
| result_cache | 100% | 100% | 100% | 100% | 100% | 100% |

## One council run vs. three solo runs

- codex: one solo run reaches 4.4 levers, one skill run 4.8, one council run 4.4; the union of 3 solo runs reaches 6.0 (3 windows).
- claude: one solo run reaches 7.6 levers, one skill run 6.6, one council run 7.6; the union of 3 solo runs reaches 10.3 (3 windows).

## Council personas: who found what

| Run | Candidate | Levers | Unique within the run |
|---|---|---|---|
| codex/council s5 | Pennypincher | result_cache, batch_api, prompt_caching, cache_invalidator | – |
| codex/council s5 | Architect | result_cache, prompt_caching, cache_invalidator, batch_api | – |
| codex/council s5 | Ruthless Minimalist | result_cache, batch_api, prompt_caching, cache_invalidator | – |
| codex/council s4 | architect | result_cache, prompt_caching, cache_invalidator, retry_fix, merge_calls, batch_api, model_downgrade, image_downscale | retry_fix |
| codex/council s4 | pennypincher | result_cache, batch_api, prompt_caching, cache_invalidator, merge_calls, effort_reduction, model_downgrade, image_downscale | effort_reduction |
| codex/council s4 | ruthless-minimalist | result_cache, prompt_caching, batch_api, model_downgrade, merge_calls, image_downscale | – |
| codex/council s3 | architect | result_cache, prompt_caching, cache_invalidator, batch_api | – |
| codex/council s3 | ruthless-minimalist | result_cache, prompt_caching, cache_invalidator, batch_api | – |
| codex/council s3 | pennypincher | merge_calls, result_cache, batch_api, prompt_caching, cache_invalidator | merge_calls |
| codex/council s2 | ruthless-minimalist | result_cache, batch_api, prompt_caching, cache_invalidator, merge_calls, model_downgrade | – |
| codex/council s2 | pennypincher | merge_calls, batch_api, result_cache, prompt_caching, cache_invalidator, model_downgrade, image_downscale | – |
| codex/council s2 | architect | result_cache, prompt_caching, cache_invalidator, batch_api, model_downgrade, merge_calls, effort_reduction, image_downscale | effort_reduction |
| codex/council s1 | Architect | result_cache, prompt_caching, cache_invalidator, batch_api | – |
| codex/council s1 | Pennypincher | result_cache, prompt_caching, cache_invalidator, batch_api, retry_fix | retry_fix |
| codex/council s1 | Ruthless Minimalist | result_cache, prompt_caching, cache_invalidator, batch_api | – |
| claude/council s5 | architect | merge_calls, effort_reduction, output_cap, retry_fix, cache_invalidator, prompt_compression, prompt_caching, result_cache, batch_api | prompt_caching |
| claude/council s5 | pennypincher | result_cache, merge_calls, effort_reduction, output_cap, retry_fix, cache_invalidator, batch_api | – |
| claude/council s5 | ruthless-minimalist | merge_calls, effort_reduction, output_cap, prompt_compression, result_cache, batch_api, cache_invalidator, retry_fix | – |
| claude/council s4 | architect | merge_calls, effort_reduction, output_cap, cache_invalidator, prompt_caching, retry_fix, result_cache, batch_api | retry_fix |
| claude/council s4 | pennypincher | merge_calls, effort_reduction, output_cap, result_cache, batch_api, cache_invalidator, prompt_caching | – |
| claude/council s4 | ruthless-minimalist | merge_calls, effort_reduction, prompt_compression, cache_invalidator, output_cap | prompt_compression |
| claude/council s3 | architect | merge_calls, effort_reduction, cache_invalidator, retry_fix, output_cap, result_cache, batch_api | – |
| claude/council s3 | pennypincher | merge_calls, effort_reduction, output_cap, prompt_compression, cache_invalidator, retry_fix, result_cache, batch_api | prompt_compression |
| claude/council s3 | ruthless-minimalist | merge_calls, effort_reduction, output_cap, cache_invalidator, retry_fix, result_cache | – |
| claude/council s2 | architect | merge_calls, effort_reduction, output_cap, result_cache, batch_api, cache_invalidator, retry_fix, prompt_compression | – |
| claude/council s2 | pennypincher | merge_calls, effort_reduction, output_cap, result_cache, batch_api, cache_invalidator, retry_fix, prompt_compression, prompt_caching | prompt_caching |
| claude/council s1 | architect | result_cache, merge_calls, effort_reduction, output_cap, prompt_caching, cache_invalidator, batch_api | – |
| claude/council s1 | pennypincher | merge_calls, effort_reduction, output_cap, result_cache, prompt_caching, cache_invalidator, retry_fix, batch_api | retry_fix |
| claude/council s1 | ruthless-minimalist | merge_calls, effort_reduction, output_cap, prompt_compression, result_cache, batch_api | prompt_compression |
| claude/skill s5 | Ruthless Minimalist | result_cache, merge_calls, batch_api | – |
| claude/skill s5 | Pennypincher | result_cache, batch_api, merge_calls, prompt_caching, cache_invalidator, model_downgrade, effort_reduction | – |
| claude/skill s5 | Doomsayer | result_cache, batch_api, prompt_caching, cache_invalidator, retry_fix, model_downgrade, effort_reduction | retry_fix |
