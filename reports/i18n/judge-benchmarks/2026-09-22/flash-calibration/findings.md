# GLM and Gemini judge calibration — 2026-09-22

All calls use low reasoning, a 16,000-token cap, production scoreTranslation, and no automatic retries. Two development prompt versions were evaluated, then version 2 was frozen for validation. The baseline is the existing repository-conventions prompt. No translation files were changed.

## Controlled validation

Four new Spanish clean/error pairs test minimum/maximum reversal, untranslated paragraphs, executable paths versus permitted image relocation, and localized anchors. Fixtures were frozen before responses. The v2 prompt was written before baseline validation results were inspected; no tuning followed validation. Labels and defects are excluded from model prompts. This is a small synthetic check, not independent human-rated natural-language calibration.

| Model | Baseline correct | v2 correct | v2 clean rejected | v2 invalid | Mean baseline → v2 USD |
|---|---:|---:|---:|---:|---:|
| z-ai/glm-5.3-flash | 8/8 | 8/8 | 0/4 | 0 | 0.0002 → 0.0002 |
| google/gemini-3.8-flash | 8/8 | 8/8 | 0/4 | 0 | 0.0016 → 0.0013 |
| google/gemini-3.5-flash-lite | 6/8 | 8/8 | 0/4 | 0 | 0.0007 → 0.0008 |

## Ten lowest-scoring translations

The exact frozen ten-case corpus from the earlier comparison is reused. Two cases were used during development, so these are regression/diagnostic results, not held-out quality estimates. The historical selection scores are not gold labels.

| Model | Baseline → v2 valid | Ready with medium/high fixes | Mean USD/valid | Mean seconds/valid |
|---|---:|---:|---:|---:|
| z-ai/glm-5.3-flash | 9/10 → 9/10 | 0 → 0 | 0.0033 → 0.0027 | 19.4270 → 8.4004 |
| google/gemini-3.8-flash | 10/10 → 10/10 | 0 → 0 | 0.0049 → 0.0043 | 9.1339 → 10.1702 |
| google/gemini-3.5-flash-lite | 10/10 → 10/10 | 6 → 2 | 0.0023 → 0.0022 | 3.5650 → 2.7420 |

## Development and limitations

Version 1 requested a complete evidence audit and consistent readiness. GLM still emitted malformed quiz JSON; Flash Lite still reported only the first untranslated heading. Version 2 additionally requests all distinct defect categories, short exact spans, and complete suggestion objects. All six original clean/negation controls passed for all three models in both development rounds. GLM recovered valid quiz JSON in development v2. These are observed outcomes, not reliability guarantees.

Flash Lite corrected both validation misses (minimum/maximum and executable path) but still missed substantial untranslated paragraphs and changed Pagefind code paths in the full Hindi article during development v2. Its translation score remained 92 despite that flawed article. Do not use the score alone or describe higher scores as better judge quality. Short synthetic success does not establish full-document recall.

The overlay is registered for the three requested models, without changing the default judge. Flash Lite remains suitable only with independent checks or a stronger review for important decisions. Exact snippet suggestions are not automatically applied by this calibration.

Per-call prompts, raw responses, usage, phase manifests, fixture hashes, and both prompt versions are retained. Catalog estimates use the saved same-day rates, account for cache reads/writes, and count reasoning within output tokens once. Cache state and routing vary; costs and latency are observations, not controlled throughput benchmarks. Costs below include captured failures when known.

| Phase | Attempts | Valid | Charged USD |
|---|---:|---:|---:|
| development | 24 | 23 | 0.0285 |
| heldout-baseline | 24 | 24 | 0.0198 |
| development-v2 | 24 | 24 | 0.0264 |
| heldout-v2 | 24 | 24 | 0.0190 |
| corpus-v2 | 30 | 29 | 0.0980 |
| corpus-v2-limit-retry | 1 | 0 | 0.0085 |

## Verification and remaining failure

158 focused offline tests passed. Profile resolution was checked for all three models for article and quiz content, and the resolved prompt text matches the tested v2 overlay. All 12 defective validation outputs identify the planted error using an exact target snippet. GLM hit the 16k output limit on hi/beware-the-single-purpose-people twice: the explicitly requested same-cap retry also failed. Neither attempt is counted as a usable verdict. The first-attempt table excludes retry success/failure; the phase totals retain its cost.

## Failures

- development, z-ai/glm-5.3-flash, de-quiz-postgres-sql-mastery-pt1: Missing judge scores
- corpus-v2, z-ai/glm-5.3-flash, hi-beware-the-single-purpose-people: Translation judge z-ai/glm-5.3-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
- corpus-v2-limit-retry, z-ai/glm-5.3-flash, hi-beware-the-single-purpose-people: Translation judge z-ai/glm-5.3-flash stopped because it hit maxOutputTokens=16000. The output may be truncated; raise the model max= value or reduce the translation chunk size before trusting this candidate. Provider finish reason: length
