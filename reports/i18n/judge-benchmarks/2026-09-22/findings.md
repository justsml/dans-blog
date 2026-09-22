# Findings and decision

GPT-6 Luna at low reasoning is a promising inexpensive article judge, but this pilot does not justify replacing the default judge globally. The article-only Luna profile now supplies repository conventions that were missing from the core scoring prompt. It is automatically selected by agent workflows that resolve judge profiles; direct scoreTranslation callers must pass the tuning explicitly. No article translations or global judge defaults were changed.

## Original eight models: calibrated article cases

| Judge | Valid calls | Mean seconds | Catalog USD / valid call | Observations |
|---|---:|---:|---:|---|
| GPT-6 Luna | 3/3 | 7.655 | 0.000810 | Caught reversed Japanese meaning and Arabic list nesting; missed debate-argument mistranslation and Arabic tree-shaking meaning |
| GPT-5.6 Luna | 3/3 | 9.381 | 0.001844 | Caught Japanese punctuation and Arabic list nesting; missed the reversed Japanese sentence |
| Gemini 3.8 Flash | 3/3 | 5.386 | 0.004083 | Caught Japanese debate-argument mistranslation; missed reversed sentence |
| Gemini 3.5 Flash Lite | 3/3 | 2.510 | 0.001606 | Missed the inspected Japanese defects; proposed an incorrect Arabic anchor rollback |
| DeepSeek v4.1 Flash | 2/3 | 36.052 | 0.005218 | Caught all three inspected Japanese defects; Spanish call exhausted 8,000 output tokens |
| GLM 5.3 Flash | 3/3 | 2.341 | 0.000740 | Fast; caught Japanese punctuation and Arabic list nesting |
| GLM 5.3 FlashX | 3/3 | 5.585 | 0.001672 | Similar inspected catches to Flash; all three ready=true outputs contained medium-priority fixes |
| Opus 5.5 | 3/3 | 8.635 | 0.042563 | Broadest inspected findings; uniquely caught the Arabic tree-shaking mistranslation |

These are three translations of one article, not three independent articles. Cost and latency means exclude invalid responses; their charged cost remains in summary.md and raw records. OpenRouter routing, cache state, and simultaneous calls can affect timings. Catalog cost is an estimate at the saved rates, not the invoice. These estimates now include cache-write premiums, correcting the earlier table for Luna and Opus. The provider returned zero charged credits for both Luna models and a positive upstream inference cost. All token and cost metadata is preserved.

Luna was about 56% cheaper and 18% faster than GPT-5.6 Luna in this article sample, and about 53 times cheaper than Opus. These ratios are workload-specific. Opus caught more substantive defects; matching its publish-ready decision on all three cases does not mean matching its recall.

## Calibration rounds

1. Baseline low reasoning: 6/6 correct synthetic decisions (Spanish/Japanese/Arabic clean vs. reversed prohibition), mean 3.438 seconds.
2. Medium reasoning, same prompt and cases: 6/6, mean 4.114 seconds. No demonstrated accuracy gain; keep low.
3. Low reasoning plus site conventions: 6/6 calibration decisions, mean 3.436 seconds. Separate held-out source with clean/code-change pairs: 6/6, mean 4.060 seconds.

The corpus exposed six Luna suggestion objects contrary to known repository rules: three attempts to restore inherited dates, two Spanish asset-path corrections (one covering three cover fields), and a provenance-field removal. After tuning, none of Luna's corpus suggestions attempted these forbidden metadata/path/provenance corrections. The corpus was used to design the tuning, so this is an in-sample improvement. The synthetic holdout checks basic regression behavior, not natural-language generalization.

## Inspected corpus defects

This diagnostic set was identified after reading the model outputs and source text. It is not a preregistered or independently human-labeled recall benchmark.

| Concrete defect | 6 Luna | 5.6 Luna | Flash | Lite | DeepSeek | GLM Flash | FlashX | Opus |
|---|---|---|---|---|---|---|---|---|
| Japanese debate arguments translated as function parameters | missed | missed | found | missed | found | missed | missed | found |
| Japanese “wait until you learn” reversed to “no need to know” | found | missed | missed | missed | found | missed | missed | found |
| Japanese closing quotation mark is an opening mark | found | found | found | missed | found | found | found | found |
| Arabic tree-shaking translated as bundling | missed | missed | missed | missed | missed | missed | missed | found |
| Arabic list item loses nesting indentation | found | found | found | missed | missed | found | found | found |

Other outputs deserve caution: Gemini Flash and Flash Lite each returned ready=true with a medium-priority Arabic suggestion; FlashX did this in all three calibrated article calls. The report retains the model's boolean rather than silently repairing it. FlashX's original Spanish response was malformed JSON (an unquoted replacement key); its failure remains counted. DeepSeek's token-limit failure remains counted, without an opportunistic retry that would make its budget incomparable.

## Reproduction and validation

See summary.md, fixtures.json, catalog.json, the phase manifests, and raw response files. Prompt files for this run were reconstructed offline after the calls from frozen fixtures, recorded tuning/settings, and unchanged prompt builders, and are labeled as reconstructed. The runner now saves prompts before inference for subsequent runs. The first six canary failures were sandbox connectivity failures, not model-quality failures.

Relevant unit tests cover zero-vs-unknown costs, failure denominators, inclusive reasoning-token accounting, both Luna temperature settings, and article-only profile selection. No full site build is necessary for these script/profile/report changes.

## GPT-6 extension: minimum reasoning

Astra and Sol were added using the same frozen fixtures and both the original and repository-calibrated prompts. Each model received six synthetic baseline cases and three article translations under each prompt: 24 additional API calls total. Earlier responses were reused, so timings are not simultaneous cross-model trials.

| Model | Requested reasoning | Synthetic decisions | Calibrated article valid | Mean seconds | Catalog USD / valid article call |
|---|---|---:|---:|---:|---:|
| GPT-6 Astra | low (mandatory reasoning; none unsupported) | 6/6 | 3/3 | 13.801 | 0.073892 |
| GPT-6 Sol | none | 6/6 | 3/3 | 5.471 | 0.013505 |
| GPT-6 Terra | unavailable | — | — | — | — |

The configured OpenAI account and OpenRouter both list Astra, Sol, and Luna, but no GPT-6 Terra. The current Terra model is GPT-5.6 Terra. The user explicitly chose to leave GPT-6 Terra unavailable; no substitute was run. Availability evidence is in gpt6-availability.json and per-phase catalog snapshots.

On the five post-hoc inspected defects listed above, Astra identified all five; Sol identified four, missing Arabic tree-shaking. Both caught the Japanese debate-argument mistranslation, reversed sentence, quotation mark, and Arabic list nesting. This is a diagnostic observation from one article, not an independently labeled recall estimate. Sol also proposed changing the table's named-export flag while acknowledging that the English source has the same error; that is an upstream editorial correction, not a translation defect, and should not be automatically applied by a translation judge.

Astra's catalog requires at least low reasoning. Its responses reported zero reasoning tokens even with low requested; this metadata does not establish that the model did no internal reasoning. Sol was explicitly requested at none and also reported zero reasoning tokens. Provider credits were zero but upstream costs were nonzero; the table uses catalog estimates including cache writes rather than calling these requests free.

Sol's original-prompt Arabic call initially failed in the harness. Its raw output was valid JSON containing fenced code inside suggestion strings. The parser incorrectly treated an inner code fence as a response wrapper. A failing regression test reproduced the bug; restricting wrapper detection to standalone Markdown fence lines fixed it. Offline replay of the exact saved response recovered score 80, publishReady=false, and seven suggestions. No additional inference was used, and the original failure remains in results.jsonl and original-pipeline statistics. See gpt6-sol-parser-recovery.json. The calibrated Sol calls did not encounter this parser failure.

## Requested 16k limit and rerun audit

The core translation scorer and benchmark now default to 16,000 output tokens.
An audit of every saved row found exactly one output-limit hit: the calibrated
Spanish DeepSeek v4.1 Flash call stopped at 8,000 tokens. It was rerun once with
all other input, prompt, and reasoning settings preserved, at a 16,000-token
cap. The retry returned valid output (score 93, publishReady=false) in 28.455
seconds, using 7,907 output tokens. Catalog-estimated cost was $0.006668; the
provider reported $0.0105165 charged/upstream cost. Different provider routes
can charge above catalog headline rates.

Because the retry actually used fewer than 8,000 tokens, this establishes a
successful rerun under the new cap, not that increasing the cap was necessarily
the cause. Both attempts are retained, and changed-budget results are separated
from the original model table. See output-limit-audit.json and the report's
output-limit-rerun section. No other saved row hit an output limit.
