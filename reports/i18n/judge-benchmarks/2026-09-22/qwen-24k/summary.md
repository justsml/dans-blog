# Matched 24k translation judge comparison — 2026-09-22–23

13 selected models, the same ten frozen public translations and eight Spanish synthetic controls, identical v2 audit prompts, 24,000 output tokens, and minimum supported thinking. Each phase runs four concurrent calls without automatic retries. Prompts, raw responses, fixture hashes, catalogs, and all failures are retained. GPT-6 Terra remains unavailable as requested.

Optional reasoning is disabled with `reasoning.enabled=false`; mandatory reasoning uses its lowest advertised effort. These are requested settings, not proof of internal model behavior. Capability metadata comes from the saved [OpenRouter model catalog](https://openrouter.ai/api/v1/models); [reasoning controls](https://openrouter.ai/docs/guides/best-practices/reasoning-tokens) distinguish disabling from merely hiding reasoning.

## Quality and observed cost

Controlled correctness counts invalid responses as incorrect. The ten real translations have no independent numeric gold scores; mean translation scores do not measure judge quality. The controls and natural cases were used during prior prompt development/validation, so this is a regression comparison, not a new held-out quality estimate.

Cost per parsed real verdict includes captured failed-call catalog costs in its numerator. Missing usage stays unknown. Seconds average parsed real verdicts only. Provider routing and cache state are uncontrolled.

| Model | Thinking | Controls correct / 8 | Real parsed / 10 | Ready with medium/high fixes | USD / parsed real verdict | Seconds / parsed real verdict |
|---|---|---:|---:|---:|---:|---:|
| qwen/qwen3.8-flash | none | 8/8 | 10/10 | 1 | 0.0029 | 23.14 |
| qwen/qwen3.8-27b | none | 8/8 | 6/10 | 0 | 0.0327 | 12.18 |
| openai/gpt-6-luna | none | 7/8 | 9/10 | 0 | 0.0022 | 10.71 |
| openai/gpt-5.6-luna | none | 7/8 | 10/10 | 0 | 0.0038 | 9.93 |
| google/gemini-3.8-flash | low | 8/8 | 10/10 | 0 | 0.0042 | 10.05 |
| google/gemini-3.5-flash-lite | minimal | 8/8 | 10/10 | 3 | 0.0027 | 3.62 |
| deepseek/deepseek-v4.1-flash | none | 8/8 | 7/10 | 0 | 0.0082 | 16.76 |
| z-ai/glm-5.3-flash | low | 8/8 | 8/10 | 0 | 0.0061 | 17.67 |
| z-ai/glm-5.3-flashx | low | 8/8 | 10/10 | 1 | 0.0067 | 9.86 |
| anthropic/claude-opus-5.5 | low | 8/8 | 10/10 | 0 | 0.1088 | 11.19 |
| openai/gpt-6-astra | low | 8/8 | 7/10 | 0 | 0.2545 | 26.03 |
| openai/gpt-6-sol | none | 8/8 | 10/10 | 0 | 0.0355 | 8.72 |
| anthropic/claude-fable-5.1 | low | 8/8 | 10/10 | 0 | 0.3414 | 36.34 |

A parsed result is not necessarily schema-complete: DeepSeek returned 81 suggestions without required fields on hi/deathmatch-git-rebase-vs-merge; production normalization discarded all 81. Thus only 6/10 of its first-attempt real results retain complete suggestion arrays. See suggestion-schema-audit.json. The superseded Omni variant also omitted suggestion reasons. These are model contract failures, not clean verdicts.

## Recorded cost accounting

Catalog estimates include input/cache-read/cache-write/output rates and count reasoning within output once. Provider credits, upstream spend, and estimates are distinct; zero charged OpenAI credits do not imply free inference. All completed attempts with captured usage are included below, including superseded Qwen variants. Interrupted unrecorded requests may incur additional charges; this is not a complete billing reconciliation.

| Model | Attempts | Catalog USD | Charged USD | Upstream USD | Reported reasoning tokens |
|---|---:|---:|---:|---:|---:|
| qwen/qwen3.8-omni-flash | 11 | 0.0259 | 0.0259 | 0.0259 | 0 |
| qwen/qwen3.8-flash | 18 | 0.0312 | 0.0312 | 0.0312 | 0 |
| qwen/qwen3.8-2.4t-a95b | 10 | 0.4618 | 0.4618 | 0.4618 | 25053 |
| deepseek/deepseek-v4.1-flash | 25 | 0.1017 | 0.1479 | 0.1479 | 0 |
| qwen/qwen3.8-max-0902 | 10 | 0.4827 | 0.4825 | 0.4825 | 21926 |
| qwen/qwen3.8-27b | 18 | 0.2034 | 0.1991 | 0.1991 | 0 |
| google/gemini-3.5-flash-lite | 18 | 0.0331 | 0.0331 | 0.0331 | 0 |
| openai/gpt-5.6-luna | 18 | 0.0412 | 0.0000 | 0.0412 | 0 |
| openai/gpt-6-luna | 18 | 0.0206 | 0.0000 | 0.0206 | 0 |
| z-ai/glm-5.3-flash | 20 | 0.0575 | 0.0575 | 0.0575 | 53641 |
| google/gemini-3.8-flash | 18 | 0.0534 | 0.0534 | 0.0534 | 273 |
| z-ai/glm-5.3-flashx | 18 | 0.0701 | 0.0701 | 0.0701 | 3203 |
| anthropic/claude-opus-5.5 | 18 | 1.1565 | 1.1565 | 1.1565 | 0 |
| openai/gpt-6-sol | 18 | 0.3800 | 0.0000 | 0.3800 | 0 |
| openai/gpt-6-astra | 18 | 1.9129 | 0.0000 | 1.9129 | 214 |
| anthropic/claude-fable-5.1 | 18 | 3.5836 | 3.5836 | 3.5836 | 9279 |

## Prior output-limit recovery

The new matched run revisits all five previously limited real cases. Four DeepSeek cases also have a separate recovery phase preserving the older site-conventions prompt; both its output cap and reasoning mode changed, so improvement cannot be attributed solely to the cap. No old failures are overwritten.

| Model | Fixture | Phase | Valid | Output tokens | Finish |
|---|---|---|---|---:|---|
| deepseek/deepseek-v4.1-flash | he-quiz-is-your-memory-rusty | deepseek-limit-recovery | true | 619 | stop |
| deepseek/deepseek-v4.1-flash | ja-you-may-not-need-axios | deepseek-limit-recovery | true | 1829 | stop |
| deepseek/deepseek-v4.1-flash | ru-docker-security-tips-for-self-hosting | deepseek-limit-recovery | false | 24000 | length |
| deepseek/deepseek-v4.1-flash | hi-docker-security-tips-for-self-hosting | deepseek-limit-recovery | false | 24000 | length |
| deepseek/deepseek-v4.1-flash | ru-docker-security-tips-for-self-hosting | references-lowest-24k | true | 4953 | stop |
| deepseek/deepseek-v4.1-flash | he-quiz-is-your-memory-rusty | references-lowest-24k | false | 24000 | length |
| deepseek/deepseek-v4.1-flash | ja-you-may-not-need-axios | references-lowest-24k | false | 24000 | length |
| deepseek/deepseek-v4.1-flash | hi-docker-security-tips-for-self-hosting | references-lowest-24k | false | 24000 | length |
| z-ai/glm-5.3-flash | hi-beware-the-single-purpose-people | references-lowest-24k | false | 24000 | length |
| deepseek/deepseek-v4.1-flash | he-quiz-is-your-memory-rusty | references-limit-retry | true | 512 | stop |
| z-ai/glm-5.3-flash | hi-beware-the-single-purpose-people | references-limit-retry | true | 1245 | stop |
| deepseek/deepseek-v4.1-flash | ja-you-may-not-need-axios | references-limit-retry | true | 3286 | stop |
| deepseek/deepseek-v4.1-flash | hi-docker-security-tips-for-self-hosting | references-limit-retry | true | 7099 | stop |

## Failed attempts

- qwen-lowest-24k / qwen/qwen3.8-27b / hi-serverless-database-magic: Missing judge scores
- deepseek-limit-recovery / deepseek/deepseek-v4.1-flash / ru-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=24000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- deepseek-limit-recovery / deepseek/deepseek-v4.1-flash / hi-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=24000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- qwen-lowest-24k / qwen/qwen3.8-27b / hi-you-may-not-need-axios: Missing judge scores
- references-lowest-24k / openai/gpt-6-astra / hi-you-may-not-need-axios: Missing judge scores
- references-lowest-24k / openai/gpt-6-astra / ja-you-may-not-need-axios: Missing judge scores
- references-lowest-24k / deepseek/deepseek-v4.1-flash / he-quiz-is-your-memory-rusty: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=24000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- references-lowest-24k / openai/gpt-6-astra / hi-docker-security-tips-for-self-hosting: Missing judge scores
- references-lowest-24k / deepseek/deepseek-v4.1-flash / ja-you-may-not-need-axios: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=24000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- qwen-lowest-24k / qwen/qwen3.8-27b / hi-docker-security-tips-for-self-hosting: Missing judge scores
- references-lowest-24k / z-ai/glm-5.3-flash / hi-docker-security-tips-for-self-hosting: Translation judge z-ai/glm-5.3-flash stopped because it hit maxOutputTokens=24000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- references-lowest-24k / deepseek/deepseek-v4.1-flash / hi-docker-security-tips-for-self-hosting: Translation judge deepseek/deepseek-v4.1-flash stopped because it hit maxOutputTokens=24000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- qwen-lowest-24k / qwen/qwen3.8-27b / hi-honest-priorities: Missing judge scores
- references-lowest-24k / openai/gpt-6-luna / hi-deathmatch-git-rebase-vs-merge: Missing judge scores
- references-lowest-24k / z-ai/glm-5.3-flash / hi-beware-the-single-purpose-people: Translation judge z-ai/glm-5.3-flash stopped because it hit maxOutputTokens=24000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length

Matched completion: 234/234 attempts; 221 parsed. Supplemental completed attempts: 40. Interrupted requests are listed in interruption.json; their outcome and cost are unknown and excluded from recorded totals.
