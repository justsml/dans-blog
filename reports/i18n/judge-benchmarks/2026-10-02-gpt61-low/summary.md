# GPT-6.1 Sol at low: judge calibration

Verified 2026-10-02. **Eligible as an opt-in primary judge with an independent secondary check. Keep Gemini Flash as the default:** both achieved 25/25 readiness decisions after the scoring contract was corrected; this pilot shows no quality lead for Sol. Do not infer sole-judge safety or native-language quality from controlled fixtures and synthetic-consensus references.

## What was tested

- Exact OpenRouter model `openai/gpt-6.1-sol`, low reasoning, no temperature, no retries, 6,000 output-token cap. The comparator was Gemini 3.8 Flash at low, its current lowest supported effort.
- Initial controls: clean/code-change/URL-change triplets in Spanish, Japanese, French and Chinese (12 cases).
- Five existing immutable synthetic-consensus reference documents: Spanish/Japanese articles and a Spanish quiz. They are regression/calibration inputs, not fresh human-heldout ratings.
- Fresh holdout after freezing the corrected prompt: clean/defect pairs covering Spanish table omission, Japanese quiz answer flags, Arabic heading anchors and German negation (8 cases). No further tuning followed.
- Real production article translation and structured quiz translation canaries preserved executable code, inherited-date omission and quiz answer flags. The article canary saves request/response text; the quiz canary saves its source Challenge, raw JSON and usage. First-party routing is tested offline; paid calls here used OpenRouter only.

## Results

| Phase | Model | Correct / attempts | Valid JSON | Median seconds | Catalog estimate USD |
|---|---|---:|---:|---:|---:|
| sol-baseline | openai/gpt-6.1-sol | 12/17 | 17/17 | 5.30 | 0.105103 |
| gemini-low | google/gemini-3.8-flash | 17/17 | 17/17 | 3.42 | 0.030653 |
| repository-contract | openai/gpt-6.1-sol | 17/17 | 17/17 | 5.03 | 0.089498 |
| repository-contract | google/gemini-3.8-flash | 17/17 | 17/17 | 4.30 | 0.032439 |
| fresh-heldout | openai/gpt-6.1-sol | 8/8 | 8/8 | 5.09 | 0.023770 |
| fresh-heldout | google/gemini-3.8-flash | 8/8 | 8/8 | 4.18 | 0.012554 |

The unchanged prompt made Sol reject all five good references because it required inherited publication metadata and English-relative asset/import paths. This was a contract defect: the actual locale-folder layout requires the adjusted paths. The production scoring contract now states these rules explicitly. No model identity preference or fixture-specific exception was added. Sol then accepted all five while retaining detection of every seeded defect.

The original Gemini `minimal` phase produced 17 deterministic connection-string rejections before inference. They remain in results.jsonl. The live catalog supports low/medium/high, so the corrected low phase is the valid comparator; the runner now checks unsupported efforts before constructing a paid matrix. These are configuration failures, not Gemini generation failures.

All paid judge generations returned valid JSON. No publish-ready/medium-high contradiction or no-op blocking suggestion occurred in the corrected-contract or fresh-holdout phases. Initial failures and initial false rejects remain separate; they were not overwritten or removed from their denominators.

## Cost and reproducibility

All calibration and translation-canary requests stayed inside a fresh $4 guard: conservative upper bound **$3.4034**, including zero-charge/BYOK reservations. Positive OpenRouter credits reported **$0.075645**. These are distinct cost bases; zero credit charges are not zero economic cost. Per-phase catalog estimates above include cache-read discounts and cache-write premiums without adding reasoning twice. Raw upstream cost fields are preserved.

Sol pricing verified from the live catalog and official model docs: $2/M input, $0.10/M cached input, $2.50/M cache-write input and $10/M output. Above 272k input tokens, the rates are $4/$0.20/$5/$15 respectively. This pilot is below that tier. Sources: https://developers.openai.com/api/docs/models/gpt-6.1-sol and https://openrouter.ai/api/v1/models.

Rerun with a new output directory and the frozen `fixtures.json` or `fresh-heldout.json`; use `--models openai/gpt-6.1-sol,google/gemini-3.8-flash --effort low --max-output-tokens 6000`. The production prompt hash, fixture hashes, catalog snapshots, phase manifests, per-call prompts, raw responses, failures and receipts are retained. Existing dataset manifests were not changed.

Known output prices at/above $50/M are cached in a separately dated denylist, including Astra and Fable; new SDK, shared resolver and CLI calls reject them. Allowed active panels retain distinct Sol 6.1/Sol 6 and Opus/Sonnet identities. Historical price/capability and result evidence is retained.

## Validation

- 488 offline tests passed across i18n, i18n-agent and focused news-watch concurrency tests.
- Astro check: zero errors. Git whitespace check passed.
- The published Netlify article was verified separately: English and ten locale routes returned 200, all retained 16 comparison rows, modified date October 2, and no broken ToC fragment targets; a live desktop ToC click navigated to Terms Used in This Guide.
- A browser viewport resize timeout prevents claiming mobile visual verification.

Implementation commit: `ef2cb404e`. Content conventions passed (0 errors, 110 existing warnings). The eval CLI dry-run selected the exact new model for the Spanish landscape article.
