# Findings and decision

GPT-6 Luna at low reasoning is a promising inexpensive article judge, but this pilot does not justify replacing the default judge globally. The article-only Luna profile now supplies repository conventions that were missing from the core scoring prompt. It is automatically selected by agent workflows that resolve judge profiles; direct scoreTranslation callers must pass the tuning explicitly. No article translations or global judge defaults were changed.

## Cost and latency on the calibrated article cases

| Judge | Valid calls | Mean seconds | Catalog USD / valid call | Observations |
|---|---:|---:|---:|---|
| GPT-6 Luna | 3/3 | 7.655 | 0.000725 | Caught reversed Japanese meaning and Arabic list nesting; missed debate-argument mistranslation and Arabic tree-shaking meaning |
| GPT-5.6 Luna | 3/3 | 9.381 | 0.001676 | Caught Japanese punctuation and Arabic list nesting; missed the reversed Japanese sentence |
| Gemini 3.8 Flash | 3/3 | 5.386 | 0.004083 | Caught Japanese debate-argument mistranslation; missed reversed sentence |
| Gemini 3.5 Flash Lite | 3/3 | 2.510 | 0.001606 | Missed the inspected Japanese defects; proposed an incorrect Arabic anchor rollback |
| DeepSeek v4.1 Flash | 2/3 | 36.052 | 0.005218 | Caught all three inspected Japanese defects; Spanish call exhausted 8,000 output tokens |
| GLM 5.3 Flash | 3/3 | 2.341 | 0.000740 | Fast; caught Japanese punctuation and Arabic list nesting |
| GLM 5.3 FlashX | 3/3 | 5.585 | 0.001672 | Similar inspected catches to Flash; all three ready=true outputs contained medium-priority fixes |
| Opus 5.5 | 3/3 | 8.635 | 0.037441 | Broadest inspected findings; uniquely caught the Arabic tree-shaking mistranslation |

These are three translations of one article, not three independent articles. Cost and latency means exclude invalid responses; their charged cost remains in summary.md and raw records. OpenRouter routing, cache state, and simultaneous calls can affect timings. Catalog cost is an estimate at the saved rates, not the invoice. The provider returned zero charged credits for both Luna models and a positive upstream inference cost. All token and cost metadata is preserved.

Luna was about 57% cheaper and 18% faster than GPT-5.6 Luna in this article sample, and about 52 times cheaper than Opus. These ratios are workload-specific. Opus caught more substantive defects; matching its publish-ready decision on all three cases does not mean matching its recall.

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
