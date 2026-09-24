# Fresh translation battle against frozen consensus gold

Gold preferred in 122/130 valid reviews; generated preferred in 6; ties 2. Reviewer preference agreement: 59/65 fully reviewed pairs.

Five cases (Spanish/Japanese); 65/65 generation attempts. Each generator sees only English. Max output 24,000 tokens; lowest supported reasoning; no retries. Whole-document requests, concurrency 4. GPT-6 Terra unavailable.

Two independent blinded reviewers: GPT-6 Sol and Opus 5.5 at high reasoning. X/Y order is assigned independently by deterministic hash; ties allowed. Quality is the mean of ten 1–5 dimensions. Gold is scored alongside each candidate, never assumed perfect. Scores are model assessments on five cases, not calibrated human accuracy. Judge self-preference remains possible.

Raw responses are preserved. Common mechanical import/asset normalization and inherited-frontmatter omission occur before evaluation. Strict deterministic checks can flag intentional locale formatting: inspect individual receipts. Failures are retained; quality means exclude failed/missing reviews. Review costs are separate.

| Model | Effort | Complete | Checks pass | Reviews | Quality /5 | Gap vs gold | W/T/L | Median s | p95 s | Catalog $ | Input tokens | Output tokens | Reasoning |
|---|---|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|---:|---:|
| anthropic/claude-opus-5.5 | low | 5/5 | 1/5 | 10/10 | 4.37 | -0.10 | 1/1/8 | 19.07 | 23.43 | 0.3090 | 18872 | 11677 | 0 |
| openai/gpt-6-astra | low | 5/5 | 4/5 | 10/10 | 4.32 | -0.15 | 2/0/8 | 28.34 | 29.48 | 0.5323 | 11752 | 7709 | 0 |
| openai/gpt-6-sol | none | 5/5 | 1/5 | 10/10 | 4.06 | -0.35 | 2/0/8 | 15.99 | 17.07 | 0.1045 | 11752 | 7514 | 0 |
| anthropic/claude-fable-5.1 | low | 5/5 | 1/5 | 10/10 | 3.95 | -0.58 | 0/0/10 | 31.49 | 36.66 | 0.7652 | 18872 | 11529 | 0 |
| openai/gpt-5.6-luna | none | 5/5 | 2/5 | 10/10 | 3.95 | -0.59 | 1/0/9 | 14.04 | 19.46 | 0.0119 | 11752 | 7507 | 0 |
| openai/gpt-6-luna | none | 5/5 | 3/5 | 10/10 | 3.88 | -0.69 | 0/1/9 | 12.99 | 22.70 | 0.0052 | 11752 | 7509 | 0 |
| google/gemini-3.8-flash | low | 5/5 | 2/5 | 10/10 | 3.81 | -0.67 | 0/0/10 | 11.04 | 11.98 | 0.0388 | 12710 | 7795 | 0 |
| z-ai/glm-5.3-flash | low | 5/5 | 1/5 | 10/10 | 3.80 | -0.87 | 0/0/10 | 12.06 | 27.76 | 0.0057 | 11851 | 7916 | 299 |
| deepseek/deepseek-v4.1-flash | none | 5/5 | 1/5 | 10/10 | 3.72 | -0.94 | 0/0/10 | 12.63 | 14.10 | 0.0045 | 12175 | 7633 | 0 |
| z-ai/glm-5.3-flashx | low | 5/5 | 1/5 | 10/10 | 3.67 | -0.98 | 0/0/10 | 11.94 | 14.43 | 0.0139 | 11850 | 7642 | 0 |
| google/gemini-3.5-flash-lite | minimal | 4/5 | 1/5 | 10/10 | 3.42 | -1.14 | 0/0/10 | 4.91 | 6.23 | unknown | 10328 | 6276 | 0 |
| qwen/qwen3.8-27b | none | 5/5 | 1/5 | 10/10 | 3.28 | -1.40 | 0/0/10 | 8.17 | 11.40 | 0.0278 | 12560 | 7510 | 0 |
| qwen/qwen3.8-flash | none | 5/5 | 1/5 | 10/10 | 3.18 | -1.48 | 0/0/10 | 22.46 | 28.65 | 0.0051 | 12560 | 7578 | 0 |

## Deterministic findings
2 review responses required trailing-comma-only JSON syntax recovery. Original responses and failed parse records are preserved in parse-recovery.jsonl; no scores or wording changed.

google/gemini-3.5-flash-lite (gen-7a8e44a50c556f793bf5): nonempty partial output returned with finishReason=other and zero native token counters. OpenRouter generation lookup confirms zero native counters/charge but reports estimated tokens separately. Marked abnormal completion; catalog cost is unknown. Token sums are reported counters and undercount this attempt. See provider-accounting-anomaly.jsonl.
google/gemini-3.5-flash-lite: valid raw MDX became invalid in the existing import normalizer (gen-7a8e44a50c556f793bf5). This is a harness regression, not a raw model syntax failure; its paired quality review reflects the normalized file.
qwen/qwen3.8-flash: quiz signature check failed (gen-effd2456d5f835e8fc25): Error: Could not find <QuizUI> or </QuizUI> tags.

## Cost accounting

| Model | OpenRouter charge $ | BYOK reference $ | BYOK calls |
|---|---:|---:|---:|
| anthropic/claude-opus-5.5 | 0.309028 | 0.000000 | 0 |
| openai/gpt-6-astra | 0.000000 | 0.532312 | 5 |
| openai/gpt-6-sol | 0.000000 | 0.104512 | 5 |
| anthropic/claude-fable-5.1 | 0.765170 | 0.000000 | 0 |
| openai/gpt-5.6-luna | 0.000000 | 0.011946 | 5 |
| openai/gpt-6-luna | 0.000000 | 0.005223 | 5 |
| google/gemini-3.8-flash | 0.038764 | 0.000000 | 0 |
| z-ai/glm-5.3-flash | 0.005736 | 0.000000 | 0 |
| deepseek/deepseek-v4.1-flash | 0.011947 | 0.000000 | 0 |
| z-ai/glm-5.3-flashx | 0.013937 | 0.000000 | 0 |
| google/gemini-3.5-flash-lite | 0.018788 | 0.000000 | 0 |
| qwen/qwen3.8-27b | 0.029684 | 0.000000 | 0 |
| qwen/qwen3.8-flash | 0.005068 | 0.000000 | 0 |

generation: 65 calls; gateway reported $1.198122; BYOK-only inference reference $0.653994 across 20 calls; provider invoice unknown; catalog estimate $unknown (known subtotal $1.842801; 1 accounting anomalies); 0 unknown-cost attempts.
evaluation: 130 calls; gateway reported $8.382072; BYOK-only inference reference $4.258942 across 65 calls; provider invoice unknown; catalog estimate $12.641014 (known subtotal $12.641014; 0 accounting anomalies); 0 unknown-cost attempts.

Settled OpenRouter charges were verified against all 195 generation lookups. Raw completion upstream fields repeat gateway charges on non-BYOK routes: reportedUpstreamUsd is retained only as legacy raw evidence, not a provider invoice. BYOK inference references are separated using verified is_byok. Adding OpenRouter charges and BYOK-only reference values gives an inference-cost estimate, not reconciled provider spend. Catalog estimates use model-list prices; routed providers can charge differently. DeepSeek actual OpenRouter charge was $0.011946564 versus $0.0045105648 catalog estimate; Qwen 27B was $0.029684 versus $0.0278052. Flash Lite charged $0.0187884 including its zero-charge failed response; its complete catalog estimate remains unknown. Latency includes complete request time; effective output throughput is not streaming decode speed. p95 with only five samples is the maximum. All trace IDs and prompts are in calls/*.jsonl.
