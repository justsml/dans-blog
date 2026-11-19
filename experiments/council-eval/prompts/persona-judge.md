You are coding one proposal from a study of coding agents. The agent was one of three people
asked to make an app cheaper, each working alone under a different priority. The app is a
pizza classifier: one photo goes in, an official deadpan "pizza or not" ruling comes out. It
calls the Claude API.

Below are the agent's written proposal and the diff it left in its own copy of the repo.

Code what it **proposed** (recommended) and what it **implemented** (the diff does it) for
each lever. Be literal: a lever counts only if clearly present. A lever mentioned only to
reject it is `rejected`.

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

Also return:
- `sources`: every external page the proposal cites as the basis for a claim (docs, specs,
  pricing, changelogs). For each: `url`; `tier` = "official" (the vendor's own docs, API
  reference, spec, or pricing page), "secondary" (blog, forum, third-party summary), or
  "unknown"; `specific` = true when the proposal states a concrete fact taken from it (a
  number, limit, parameter, or behavior), false when it only names the page.
- `source_changed_plan`: true when the proposal says a source changed, corrected, or
  constrained what it recommends (for example: a limit, price, or behavior it did not
  already know).
- `unverified_claims`: how many specific technical or price claims (limits, prices,
  parameter names, behaviors) the proposal makes without a source for them.

<proposal>
{{proposal}}
</proposal>

<diff>
{{diff}}
</diff>
