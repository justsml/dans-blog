# Translation judge comparison — 2026-09-22

10 OpenRouter judges; identical frozen inputs and production scoreTranslation contract. Original models use low reasoning; additions show their requested minimum setting in each row. No retries, concurrency 4 per phase. GPT models omit unsupported temperature. Latest Gemini Flash and Flash Lite selected from the saved live catalog. This is a small pilot, not a language-quality leaderboard.

Corpus: one public article (named vs. default exports), in Spanish, Japanese, and Arabic. Source and translations verified byte-for-byte against public GitHub main before API submission. Controlled cases cover clean translations, reversed payment-retry prohibitions, and held-out executable-code changes. Corpus cases have no independent numeric gold scores. Opus agreement is diagnostic, not correctness.

All prompts, fixture texts, fixture SHA-256, raw responses, token usage, cost metadata, failures, and phase settings are saved alongside this report. Initial canary connection failures were sandbox infrastructure failures; they remain in results.jsonl and are excluded from model ranking.

## Controlled baseline

| Model | Correct / attempts | Mean latency (s) | Mean catalog cost ($) |
|---|---:|---:|---:|
| google/gemini-3.5-flash-lite (low) | 6/6 | 2.140 | 0.000758 |
| deepseek/deepseek-v4.1-flash (low) | 6/6 | 2.509 | 0.000601 |
| openai/gpt-6-luna (low) | 6/6 | 3.438 | 0.000169 |
| openai/gpt-5.6-luna (low) | 6/6 | 4.315 | 0.000405 |
| z-ai/glm-5.3-flash (low) | 6/6 | 1.122 | 0.000172 |
| google/gemini-3.8-flash (low) | 6/6 | 4.552 | 0.001328 |
| z-ai/glm-5.3-flashx (low) | 6/6 | 2.311 | 0.000423 |
| anthropic/claude-opus-5.5 (low) | 6/6 | 4.299 | 0.008853 |
| openai/gpt-6-sol (none) | 6/6 | 2.175 | 0.002590 |
| openai/gpt-6-astra (low) | 6/6 | 5.071 | 0.014248 |

## Original article prompt

| Model | Valid / attempts | Mean score | Ready | Agreement with Opus¹ | Mean latency (s) | Mean catalog cost ($) | Credits charged ($) |
|---|---:|---:|---:|---:|---:|---:|---:|
| google/gemini-3.5-flash-lite (low) | 3/3 | 97.3 | 3/3 | 0/3 | 2.243 | 0.001437 | 0.004311 |
| deepseek/deepseek-v4.1-flash (low) | 3/3 | 86.7 | 0/3 | 3/3 | 32.996 | 0.005737 | 0.027108 |
| openai/gpt-6-luna (low) | 3/3 | 86.3 | 0/3 | 3/3 | 8.388 | 0.000790 | 0.000000 |
| openai/gpt-5.6-luna (low) | 3/3 | 85.3 | 0/3 | 3/3 | 9.319 | 0.001786 | 0.000000 |
| z-ai/glm-5.3-flash (low) | 3/3 | 89.0 | 0/3 | 3/3 | 2.690 | 0.000822 | 0.002465 |
| google/gemini-3.8-flash (low) | 3/3 | 94.3 | 2/3 | 1/3 | 4.651 | 0.003607 | 0.010821 |
| z-ai/glm-5.3-flashx (low) | 2/3 | 87.0 | 0/2 | 2/2 | 5.697 | 0.002123 | 0.006139 |
| anthropic/claude-opus-5.5 (low) | 3/3 | 82.0 | 0/3 | 3/3 | 9.280 | 0.040591 | 0.121772 |
| openai/gpt-6-sol (none) | 2/3 | 79.0 | 0/2 | 2/2 | 7.370 | 0.016661 | 0.000000 |
| openai/gpt-6-astra (low) | 3/3 | 86.3 | 0/3 | 3/3 | 19.495 | 0.085484 | 0.000000 |

## Repository-calibrated article prompt

| Model | Valid / attempts | Mean score | Ready | Agreement with Opus¹ | Mean latency (s) | Mean catalog cost ($) | Credits charged ($) |
|---|---:|---:|---:|---:|---:|---:|---:|
| google/gemini-3.5-flash-lite (low) | 3/3 | 97.3 | 3/3 | 0/3 | 2.510 | 0.001606 | 0.004819 |
| deepseek/deepseek-v4.1-flash (low) | 2/3 | 88.5 | 0/2 | 2/2 | 36.052 | 0.005218 | 0.027123 |
| openai/gpt-6-luna (low) | 3/3 | 88.7 | 0/3 | 3/3 | 7.655 | 0.000810 | 0.000000 |
| openai/gpt-5.6-luna (low) | 3/3 | 91.0 | 0/3 | 3/3 | 9.381 | 0.001844 | 0.000000 |
| z-ai/glm-5.3-flash (low) | 3/3 | 92.0 | 1/3 | 2/3 | 2.341 | 0.000740 | 0.002218 |
| google/gemini-3.8-flash (low) | 3/3 | 93.3 | 2/3 | 1/3 | 5.386 | 0.004083 | 0.012250 |
| z-ai/glm-5.3-flashx (low) | 3/3 | 92.3 | 3/3 | 0/3 | 5.585 | 0.001672 | 0.005015 |
| anthropic/claude-opus-5.5 (low) | 3/3 | 86.0 | 0/3 | 3/3 | 8.635 | 0.042563 | 0.127689 |
| openai/gpt-6-sol (none) | 3/3 | 85.7 | 0/3 | 3/3 | 5.471 | 0.013505 | 0.000000 |
| openai/gpt-6-astra (low) | 3/3 | 89.3 | 0/3 | 3/3 | 13.801 | 0.073892 | 0.000000 |

¹Publish-ready agreement on valid paired responses only. Shared prompt mistakes can produce agreement; the original prompt caused both Luna and Opus to flag allowed metadata/path changes. Costs and latency means cover valid responses only; charged totals also include captured failed responses when known. Raw usage preserves failure costs.

Catalog estimates use saved input/cache-read/cache-write/output rates; completion tokens already include reasoning. Cache-write premiums were added to the estimate during the GPT-6 extension, correcting the earlier report estimates where write usage was present. OpenRouter returned zero charged credits for the OpenAI calls despite nonzero upstream inference cost. Zero credits must not be interpreted as zero economic cost. Cache state and provider routing were not controlled, so latency/cost differences are observations from this run.

## Calibrated article accounting

| Model | Input tokens | Output tokens (includes reasoning) | Reasoning tokens | Cached input | Upstream USD | Ready with medium/high fixes |
|---|---:|---:|---:|---:|---:|---:|
| google/gemini-3.5-flash-lite (low) | 10573 | 659 | 0 | 0 | 0.004819 | 1 |
| deepseek/deepseek-v4.1-flash (low) | 10539 | 20156 | 19355 | 768 | 0.027123 | 0 |
| openai/gpt-6-luna (low) | 10116 | 2329 | 1137 | 0 | 0.002429 | 0 |
| openai/gpt-5.6-luna (low) | 10116 | 2503 | 1018 | 0 | 0.005532 | 0 |
| z-ai/glm-5.3-flash (low) | 10440 | 1305 | 498 | 0 | 0.002218 | 0 |
| google/gemini-3.8-flash (low) | 10573 | 1152 | 0 | 0 | 0.012250 | 1 |
| z-ai/glm-5.3-flashx (low) | 10440 | 1148 | 274 | 960 | 0.005015 | 3 |
| anthropic/claude-opus-5.5 (low) | 16126 | 2391 | 0 | 0 | 0.127689 | 0 |
| openai/gpt-6-sol (none) | 10116 | 1523 | 0 | 0 | 0.040515 | 0 |
| openai/gpt-6-astra (low) | 10116 | 1905 | 0 | 0 | 0.221677 | 0 |

Token and upstream totals above include captured invalid responses; no failed-call cost is erased. Raw provider metadata distinguishes missing fields where the shared telemetry helper normalizes token counts to zero.

## GPT-6 Luna calibration

| Round | Split | Correct / attempts | Mean latency (s) | Mean score |
|---|---|---:|---:|---:|---:|
| baseline | calibration | 6/6 | 3.438 | 87.7 |
| calibration-medium | calibration | 6/6 | 4.114 | 88.2 |
| calibration-site-rules | calibration | 6/6 | 3.436 | 89.3 |
| calibration-site-rules | heldout | 6/6 | 4.060 | 92.3 |

Round 1: unchanged low reasoning. Round 2: medium reasoning, unchanged prompt. Round 3: low reasoning plus explicit site conventions. Held-out code-change/clean pairs use a different source and were not used to choose the prompt. The public corpus was used for diagnosis and tuning, so its improvements are in-sample. No human-rated held-out natural-translation set was evaluated.

## Failure records

- canary / openai/gpt-6-luna / ja-negation: Cannot connect to API: Unable to connect. Is the computer able to access the url?
- canary / openai/gpt-6-luna / ja-clean: Cannot connect to API: Unable to connect. Is the computer able to access the url?
- canary / openai/gpt-6-luna / es-negation: Cannot connect to API: Unable to connect. Is the computer able to access the url?
- canary / openai/gpt-6-luna / es-clean: Cannot connect to API: Unable to connect. Is the computer able to access the url?
- canary / openai/gpt-6-luna / ar-clean: Cannot connect to API: Was there a typo in the url or port?
- canary / openai/gpt-6-luna / ar-negation: Cannot connect to API: Unable to connect. Is the computer able to access the url?
- corpus / z-ai/glm-5.3-flashx / es-2023-08-18--should-you-use-named-or-default-exports: Missing judge scores
- calibrated-corpus / deepseek/deepseek-v4.1-flash / es-2023-08-18--should-you-use-named-or-default-exports: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=8000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason:
- gpt6-corpus / openai/gpt-6-sol / ar-2023-08-18--should-you-use-named-or-default-exports: Missing judge scores

Sol original-prompt Arabic failure was a harness parser error, not malformed model JSON. Offline replay after the code-fence extraction fix recovered score 80 and publishReady=false without new inference. Original observed pipeline statistics and the original failure remain above; see gpt6-sol-parser-recovery.json.

GPT-6 Terra was absent from both OpenRouter and the configured first-party OpenAI catalog. Per user instruction it remains unavailable; GPT-5.6 Terra was not substituted. Astra was requested at low (mandatory reasoning); Sol at none. Zero reasoning tokens reported by a provider do not prove that no internal reasoning occurred.

## Output-limit reruns at 16k

The original comparison used an 8,000-token cap. The user requested a 16,000-token cap and reruns of every limit-hit row. These new-budget attempts are reported separately, without replacing the original failures.

| Model | Fixture | Valid | Output tokens | Seconds | Catalog USD |
|---|---|---|---:|---:|---:|
| deepseek/deepseek-v4.1-flash (low) | es-2023-08-18--should-you-use-named-or-default-exports | yes | 7907 | 28.455 | 0.006668 |
