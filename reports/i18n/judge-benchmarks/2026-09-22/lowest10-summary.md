# Ten additional lowest-scoring translations

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
