# Translation judge comparison — 2026-09-22

10 OpenRouter judges; identical frozen inputs and production scoreTranslation contract. Original models use low reasoning; additions show their requested minimum setting in each row. No retries, concurrency 4 per phase. GPT models omit unsupported temperature. Latest Gemini Flash and Flash Lite selected from the saved live catalog. This is a small pilot, not a language-quality leaderboard.

Original corpus: one public article (named vs. default exports), in Spanish, Japanese, and Arabic. The ten-case expansion, when present, is reported separately below. Source and translations verified byte-for-byte against public GitHub main before API submission. Controlled cases cover clean translations, reversed payment-retry prohibitions, and held-out executable-code changes. Corpus cases have no independent numeric gold scores. Opus agreement is diagnostic, not correctness.

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
- lowest10-calibrated / openai/gpt-6-astra / ru-docker-security-tips-for-self-hosting: Missing judge scores
- lowest10-calibrated / openai/gpt-6-astra / hi-you-may-not-need-axios: Missing judge scores
- lowest10-calibrated / deepseek/deepseek-v4.1-flash / ru-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason
- lowest10-calibrated / deepseek/deepseek-v4.1-flash / he-quiz-is-your-memory-rusty: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason
- lowest10-calibrated / deepseek/deepseek-v4.1-flash / ja-you-may-not-need-axios: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason
- lowest10-calibrated / openai/gpt-6-astra / ja-you-may-not-need-axios: Missing judge scores
- lowest10-calibrated / z-ai/glm-5.3-flash / de-quiz-postgres-sql-mastery-pt1: Missing judge scores
- lowest10-calibrated / deepseek/deepseek-v4.1-flash / hi-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason
- lowest10-calibrated / openai/gpt-6-luna / hi-honest-priorities: Missing judge scores
- lowest10-calibrated / openai/gpt-6-astra / hi-honest-priorities: Missing judge scores
- lowest10-limit-rerun / deepseek/deepseek-v4.1-flash / ja-you-may-not-need-axios: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason
- lowest10-limit-rerun / deepseek/deepseek-v4.1-flash / hi-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason
- lowest10-limit-rerun / deepseek/deepseek-v4.1-flash / ru-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason
- lowest10-limit-rerun / deepseek/deepseek-v4.1-flash / he-quiz-is-your-memory-rusty: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason

Sol original-prompt Arabic failure was a harness parser error, not malformed model JSON. Offline replay after the code-fence extraction fix recovered score 80 and publishReady=false without new inference. Original observed pipeline statistics and the original failure remain above; see gpt6-sol-parser-recovery.json.

GPT-6 Terra was absent from both OpenRouter and the configured first-party OpenAI catalog. Per user instruction it remains unavailable; GPT-5.6 Terra was not substituted. Astra was requested at low (mandatory reasoning); Sol at none. Zero reasoning tokens reported by a provider do not prove that no internal reasoning occurred.

## Output-limit reruns at 16k

The original comparison used an 8,000-token cap. The user requested a 16,000-token cap and reruns of every limit-hit row. These new-budget attempts are reported separately, without replacing the original failures.

| Model | Fixture | Valid | Output tokens | Seconds | Catalog USD |
|---|---|---|---:|---:|---:|
| deepseek/deepseek-v4.1-flash (low) | es-2023-08-18--should-you-use-named-or-default-exports | yes | 7907 | 28.455 | 0.006668 |

## Ten additional lowest-scoring translations

100/100 planned calls recorded across 10 additional translations and 10 judges. Full current texts, no truncation, frozen before inference. Calibrated site-convention prompt, 16,000 output tokens, four concurrent calls, no automatic retries. Astra low; Sol none; other judges low. GPT-6 Terra remains unavailable.

Selection uses the latest translation_scored record per slug/locale in reports/translations-log.jsonl, then the ten lowest scores not already in the corpus. Ties use slug then locale. These historical scores select cases; they are not gold labels or confirmed scores of the current files. Every target differs from its scored hash, and two quiz sources also changed. All twenty current source/target texts were verified byte-identical to public GitHub before inference. This cohort includes eight article translations and two quizzes, with six Hindi cases; it is not a representative locale sample.

| Rank | Translation | Kind | Selection score | Scored at | Current source matches scored hash | Current target matches scored hash |
|---:|---|---|---:|---|---|---|
| 1 | hi/serverless-database-magic | article | 62 | 2026-09-13 | yes | no |
| 2 | ru/docker-security-tips-for-self-hosting | article | 62.4 | 2026-09-13 | yes | no |
| 3 | hi/you-may-not-need-axios | article | 64.4 | 2026-09-13 | yes | no |
| 4 | he/quiz-is-your-memory-rusty | quiz | 64.8 | 2026-09-13 | no | no |
| 5 | ja/you-may-not-need-axios | article | 65 | 2026-09-13 | yes | no |
| 6 | hi/docker-security-tips-for-self-hosting | article | 65.6 | 2026-09-13 | yes | no |
| 7 | de/quiz-postgres-sql-mastery-pt1 | quiz | 65.8 | 2026-09-13 | no | no |
| 8 | hi/honest-priorities | article | 67 | 2026-09-13 | yes | no |
| 9 | hi/beware-the-single-purpose-people | article | 67.6 | 2026-09-13 | yes | no |
| 10 | hi/deathmatch-git-rebase-vs-merge | article | 68 | 2026-09-13 | yes | no |

## Judge comparison

| Model (reasoning) | Valid / attempted | Mean translation score | Ready | Ready with medium/high fixes | Opus decision agreement | Mean seconds | Catalog USD / valid call | Charged USD total | Upstream USD total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| anthropic/claude-opus-5.5 (low) | 10/10 | 65.2 | 0/10 | 0 | 10/10 | 11.880 | 0.109084 | 1.090844 | 1.090844 |
| deepseek/deepseek-v4.1-flash (low) | 6/10 | 70.2 | 0/6 | 0 | 6/6 | 58.959 | 0.008360 | 0.179777 | 0.179777 |
| google/gemini-3.5-flash-lite (low) | 10/10 | 91.5 | 7/10 | 6 | 3/10 | 3.565 | 0.002286 | 0.022861 | 0.022861 |
| google/gemini-3.8-flash (low) | 10/10 | 81.0 | 1/10 | 0 | 9/10 | 9.134 | 0.004914 | 0.049141 | 0.049141 |
| openai/gpt-5.6-luna (low) | 10/10 | 71.8 | 0/10 | 0 | 10/10 | 11.030 | 0.004134 | 0.000000 | 0.041337 |
| openai/gpt-6-astra (low) | 6/10 | 76.8 | 0/6 | 0 | 6/6 | 26.762 | 0.219484 | 1.407193 | 2.196362 |
| openai/gpt-6-luna (low) | 9/10 | 70.9 | 0/9 | 0 | 9/9 | 13.376 | 0.002078 | 0.000000 | 0.019655 |
| openai/gpt-6-sol (none) | 10/10 | 74.3 | 0/10 | 0 | 10/10 | 11.314 | 0.038248 | 0.000000 | 0.382483 |
| z-ai/glm-5.3-flash (low) | 9/10 | 74.2 | 0/9 | 0 | 9/9 | 19.427 | 0.003303 | 0.031562 | 0.031562 |
| z-ai/glm-5.3-flashx (low) | 10/10 | 76.2 | 1/10 | 1 | 9/10 | 11.066 | 0.006899 | 0.068994 | 0.068994 |

Higher translation scores indicate more generous assessments, not better judges. Agreement with Opus is diagnostic, not correctness. Cost/latency means above cover valid calls only; charged/upstream totals also include captured invalid responses. Zero provider credits do not imply free inference. Catalog estimates include cache-read discounts and cache-write premiums; provider routing may cost more than headline catalog rates. This cohort uses larger inputs and a 16k cap, so it is reported separately from the original three-translation/8k comparison.

## Failure-inclusive operating cost

| Model | Mean seconds / attempt | Upstream USD / usable result, including failed-call cost |
|---|---:|---:|
| anthropic/claude-opus-5.5 | 11.880 | 0.109084 |
| deepseek/deepseek-v4.1-flash | 66.503 | 0.029963 |
| google/gemini-3.5-flash-lite | 3.565 | 0.002286 |
| google/gemini-3.8-flash | 9.134 | 0.004914 |
| openai/gpt-5.6-luna | 11.030 | 0.004134 |
| openai/gpt-6-astra | 35.198 | 0.366060 |
| openai/gpt-6-luna | 12.807 | 0.002184 |
| openai/gpt-6-sol | 11.314 | 0.038248 |
| z-ai/glm-5.3-flash | 18.255 | 0.003507 |
| z-ai/glm-5.3-flashx | 11.066 | 0.006899 |

Gemini can report overlapping cache-read and cache-write counts. Its catalog write rate is an additive storage charge, while the other tested providers include base input in their write rate. The estimator applies these separately, matching the observed Gemini upstream costs. See [OpenRouter prompt caching documentation](https://openrouter.ai/docs/guides/best-practices/prompt-caching).

## Per-translation scores

| Translation | anthropic/claude-opus-5.5 | deepseek/deepseek-v4.1-flash | google/gemini-3.5-flash-lite | google/gemini-3.8-flash | openai/gpt-5.6-luna | openai/gpt-6-astra | openai/gpt-6-luna | openai/gpt-6-sol | z-ai/glm-5.3-flash | z-ai/glm-5.3-flashx |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| hi-serverless-database-magic | 55 | 62 | 95 ready | 69 | 73 | 75 | 70 | 74 | 67 | 77 |
| ru-docker-security-tips-for-self-hosting | 60 | FAILED | 88 | 80 | 58 | FAILED | 63 | 66 | 70 | 69 |
| hi-you-may-not-need-axios | 66 | 72 | 89 | 83 | 65 | FAILED | 68 | 78 | 73 | 76 |
| he-quiz-is-your-memory-rusty | 82 | FAILED | 96 ready | 96 ready | 87 | 87 | 84 | 89 | 87 | 93 ready |
| ja-you-may-not-need-axios | 57 | FAILED | 87 | 66 | 75 | FAILED | 79 | 76 | 69 | 68 |
| hi-docker-security-tips-for-self-hosting | 58 | FAILED | 91 ready | 78 | 63 | 65 | 66 | 66 | 72 | 73 |
| de-quiz-postgres-sql-mastery-pt1 | 74 | 83 | 98 ready | 95 | 88 | 89 | 83 | 87 | FAILED | 83 |
| hi-honest-priorities | 73 | 65 | 92 ready | 75 | 70 | FAILED | FAILED | 75 | 69 | 69 |
| hi-beware-the-single-purpose-people | 71 | 74 | 91 ready | 84 | 71 | 76 | 69 | 73 | 83 | 80 |
| hi-deathmatch-git-rebase-vs-merge | 56 | 65 | 88 ready | 84 | 68 | 69 | 56 | 59 | 78 | 74 |

## Failures

- openai/gpt-6-astra / ru-docker-security-tips-for-self-hosting: Missing judge scores
- openai/gpt-6-astra / hi-you-may-not-need-axios: Missing judge scores
- deepseek/deepseek-v4.1-flash / ru-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- deepseek/deepseek-v4.1-flash / he-quiz-is-your-memory-rusty: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- deepseek/deepseek-v4.1-flash / ja-you-may-not-need-axios: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- openai/gpt-6-astra / ja-you-may-not-need-axios: Missing judge scores
- z-ai/glm-5.3-flash / de-quiz-postgres-sql-mastery-pt1: Missing judge scores
- deepseek/deepseek-v4.1-flash / hi-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- openai/gpt-6-luna / hi-honest-priorities: Missing judge scores
- openai/gpt-6-astra / hi-honest-priorities: Missing judge scores

## Scored-file drift audit

8/10 frozen targets match their scored versions after removing only the added sourceHash frontmatter line. The two quizzes have additional source/target changes. See lowest10-drift.json; frozen inputs were not modified.

## One retry of output-limit rows at the same 16k cap

These explicit reruns preserve the original fixture hash, prompt tuning, and reasoning effort. They do not replace first-attempt statistics above. No malformed-JSON rows were retried.

| Model | Fixture | Valid | Finish reason | Output tokens | Seconds | Charged USD |
|---|---|---|---|---:|---:|---:|
| deepseek/deepseek-v4.1-flash | ja-you-may-not-need-axios | no | length | 16000 | 53.261 | 0.019269 |
| deepseek/deepseek-v4.1-flash | hi-docker-security-tips-for-self-hosting | no | length | 16000 | 54.683 | 0.019366 |
| deepseek/deepseek-v4.1-flash | ru-docker-security-tips-for-self-hosting | no | length | 16000 | 56.562 | 0.024789 |
| deepseek/deepseek-v4.1-flash | he-quiz-is-your-memory-rusty | no | length | 16000 | 57.967 | 0.019364 |
