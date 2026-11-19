You are coding one run of a coding agent for a study. The agent was asked to make an app
cheaper. The app is a pizza classifier: one photo goes in, an official deadpan
"pizza or not" ruling comes out. It calls the Claude API.

Below are four things:
- the agent's final message to the user
- the diff it left in the repo
- any working notes or candidate proposals it wrote to disk
- a list of the tools it called

Code what the agent **proposed** (recommended to the user) and what it **implemented**
(the diff actually does it), for each lever. Be literal: a lever counts only if it is
clearly present. Mentioning a lever only to reject it is `rejected`, not proposed.

Levers:
- prompt_caching: cache_control / prompt caching on the handbook or shared prefix
- cache_invalidator: removes or moves the per-request timestamp that breaks caching
- prompt_compression: shortens or rewrites the 2.5K-token handbook
- image_downscale: resizes or recompresses the image before sending
- image_upscale: enlarges the image
- image_crop: crops or tiles the image
- merge_calls: merges the examine and rule steps into one call
- model_downgrade: a cheaper model (Sonnet, Haiku) for all traffic
- model_cascade: a cheap model first, escalating to a bigger one when unsure
- effort_reduction: lowers effort or thinking
- output_cap: lowers max_tokens or asks for shorter output
- batch_api: Message Batches for /bulk
- result_cache: caches rulings by image hash (dedupe)
- retry_fix: stops retrying non-retryable errors, or adds backoff
- local_prefilter: a non-LLM check before calling the model
- structured_output: structured outputs / a JSON schema instead of parsing prose

Process indicators (from the whole record):
- checked_docs: looked up API docs or pricing (web fetch, web search, a docs skill)
- measured_baseline: computed current cost or tokens from the logs or code with numbers
- quantified_savings: gives a dollar or percentage estimate per lever
- quality_guard: says how to keep verdict quality (A/B, eval, spot checks)
- eval_or_tuning_loop: builds or specifies a repeatable eval / tuning loop
- synthetic_dataset: builds or proposes synthetic test photos or cases
- asked_or_flagged_tradeoffs: names a tradeoff the user must decide (quality vs. cost)

Also return `top3`: the agent's top three recommendations in its order, each mapped to
the closest lever key (or "other: <short name>").

If the record contains separate candidate proposals (from different personas or
sub-agents), return `candidates`: for each, its label exactly as written and the lever
keys it proposed.

<final_message>
{{final}}
</final_message>

<diff>
{{diff}}
</diff>

<notes>
{{notes}}
</notes>

<tool_calls>
{{tools}}
</tool_calls>
