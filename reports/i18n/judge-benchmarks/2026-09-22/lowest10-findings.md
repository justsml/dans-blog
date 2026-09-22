# Ten-case expansion findings

The test now includes ten more translations, selected from the latest score per slug/locale in `reports/translations-log.jsonl`: six Hindi cases and one each in Russian, Hebrew, Japanese, and German. Eight are articles and two are quizzes. Selection scores range from 62 to 68, all recorded September 13. Nine were selected using GLM 5.3 Flash scores and one using GPT-5.6 Luna, which may bias the cohort toward those judges' concerns. Scores are selection metadata, not ground truth.

Current source and translation files were frozen without truncation. All twenty texts were verified byte-identical to public GitHub. Eight target hashes differ from their scored versions only because of the later `sourceHash` field; the two quizzes have further changes. Neither the prior scores nor their judges were supplied in the new judge prompts. Earlier benchmark inputs and results were preserved.

## First-attempt results

The ten models made 100 calls with the site-convention prompt and a 16k output cap: 90 valid responses and ten failures. All retained reasoning settings were unchanged, including Astra low and Sol none. Terra remains unavailable.

- GPT-5.6 Luna, GPT-6 Sol, Gemini Flash, Gemini Flash Lite, GLM FlashX, and Opus returned 10/10 valid responses.
- GPT-6 Luna and GLM Flash each returned 9/10; one response apiece was malformed JSON.
- Astra returned 6/10; four responses contained invalid JSON. These are model-output failures, not the earlier inner-code-fence parser bug.
- DeepSeek returned 6/10; four calls exhausted 16,000 completion tokens. Saved raw responses and usage account for these failures and their cost.

The score table is in [lowest10-summary.md](./lowest10-summary.md). Mean scores describe how harshly each judge graded the translations; they are not judge-quality scores. The failure-inclusive table includes wasted calls in upstream cost per usable judgment and mean attempt latency. Provider-reported upstream cost is preserved separately from catalog estimates and charged credits.

## A confirmed miss by Flash Lite

For `hi/serverless-database-magic`, the frozen target contains several full English paragraphs, an untranslated comparison table, and HTML examples whose URLs changed from `/pagefind/pagefind-ui.css` and `/pagefind/pagefind-ui.js` to `../pagefind/...`. These are executable example URLs, not localized frontmatter images.

Flash Lite gave this translation 95/100 and `publishReady=true`, with only a medium-priority untranslated-heading suggestion. The other nine judges flagged both substantial untranslated prose and the changed code URLs. This was verified directly against the frozen source and target rather than inferred solely from agreement with Opus.

Across the cohort, Flash Lite marked 7/10 ready; six of those ready outputs also contained medium/high-priority fixes. GLM FlashX had one such ready/fix contradiction. Opus marked none ready. These decisions alone do not establish recall or false-positive rates: the cohort was selected using prior model judgments and was not independently human-labeled.

## Cost-accounting correction

The larger inputs triggered Gemini cache reads and writes on the same tokens. Subtracting both from input token totals would produce invalid negative estimates. The estimator now uses the additive Google cache-storage rate and a separate input-write premium for the other tested providers. A regression test uses an actual observed Gemini usage record and matches its upstream cost. The raw usage has not been altered.

## Limit reruns

All four DeepSeek limit-hit rows were rerun once at the same 16k cap. All four again exhausted 16,000 output tokens without a usable judgment. The complete saved prompt JSON was byte-identical between each original and retry; inputs, tuning, reasoning, and cap were unchanged. Original first-attempt failures remain in the comparison; retry outcomes are reported separately in the summary. Malformed JSON responses are not silently repaired or retried.

The completion audit confirms all 100 unique model/translation pairs and all four requested limit retries, with no fixture drift. See lowest10-completion-audit.json. The cap was not raised beyond the requested 16k.
