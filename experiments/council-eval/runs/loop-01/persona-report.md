# Persona stage: loop-01, brrr-01

Coded proposals: 90. Judge: claude-sonnet-5-5.

## claude

| Method | Personas | Looked up | Lookups / persona | Official sources / persona | Source changed the plan | Unverified claims / persona | Levers per persona | Levers, all three | Pairwise overlap | Unique finds / run |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| v0 (current) | 15 | 0% | 0.0 | 0.0 | 0% | 4.5 | 7.1 | 8.6 | 0.7 | 1.0 |
| v1 | 15 | 100% | 12.5 | 6.7 | 100% | 2.2 | 6.6 | 8.6 | 0.7 | 2.0 |
| v2 | 15 | 100% | 9.5 | 4.3 | 100% | 2.3 | 3.5 | 9.4 | 0.1 | 8.2 |

## codex

| Method | Personas | Looked up | Lookups / persona | Official sources / persona | Source changed the plan | Unverified claims / persona | Levers per persona | Levers, all three | Pairwise overlap | Unique finds / run |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| v0 (current) | 15 | 87% | 1.3 | 1.1 | 0% | 0.6 | 4.3 | 5.0 | 0.9 | 1.0 |
| v1 | 15 | 100% | 3.1 | 4.3 | 93% | 0.5 | 4.1 | 4.2 | 1.0 | 0.2 |
| v2 | 15 | 100% | 3.3 | 3.8 | 73% | 0.9 | 2.9 | 7.2 | 0.1 | 5.8 |

## Who found what (unique to one persona within a run)

| Method | Persona | Unique finds | Levers |
|---|---|---:|---|
| v0 (current) | Architect | 4 | merge_calls, retry_fix, prompt_caching |
| v0 (current) | Ruthless Minimalist | 2 | prompt_compression |
| v0 (current) | Pennypincher | 4 | merge_calls, retry_fix |
| v1 | Architect | 8 | retry_fix, local_prefilter, prompt_compression, output_cap |
| v1 | Ruthless Minimalist | 2 | prompt_compression |
| v1 | Pennypincher | 1 | image_downscale |
| v2 | Architect | 14 | retry_fix, batch_api, result_cache, local_prefilter |
| v2 | Ruthless Minimalist | 29 | model_downgrade, effort_reduction, prompt_compression, merge_calls, output_cap |
| v2 | Pennypincher | 27 | result_cache, cache_invalidator, model_downgrade, prompt_caching, image_downscale, retry_fix |
