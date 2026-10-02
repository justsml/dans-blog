# Vector search article refresh - October 2, 2026

Moved the 16-option comparison immediately after the opening paragraph, clarified its heading and columns, updated the article headings, and set modified to 2026-10-02. Added automatic ToC navigation for articles with at least 8 minutes of source/local reading time and 4 main sections; use rendered localized h2/h3 anchors. Date-only metadata now formats in UTC so publication/update dates are not a day early.

Migrated active DeepSeek V4 Flash defaults, scripts, tests, documentation and skill examples to DeepSeek V4.1 Flash. Historical measurements, old pricing entries, and provider capability snapshots retain their original model identities. Current catalog price for V4.1 Flash: $0.015/M input, $0.75/M output, checked 2026-10-02. Provider routing for this refresh was capped at $0.30/M input and $1.20/M output for DeepSeek; candidate/judge requests were guarded by a shared $4 ledger.

## Translation results

Fresh DeepSeek V4.1 Flash and Qwen 3 32B candidates were generated first. Qwen runs timed out, several DeepSeek candidates had broken forward anchors, French/Hindi candidates omitted content, and Italian/Hebrew candidates lacked metadata. Preserved rejected raw outputs and immutable attempt reports. Six DeepSeek candidates became valid after deterministic anchor repair; GPT-5.6 Luna supplied a valid candidate for every locale. Gemini 3.8 Flash selected the Luna candidates and ran up to three fix/rescore passes.

| Locale | Selected model | Translation quality / 100 | Final local validator | Rendered missing anchors |
|---|---|---|---|---|
| es | openrouter/openai/gpt-5.6-luna | 96 | passed | 0 |
| hi | openrouter/openai/gpt-5.6-luna | 95 | passed | 0 |
| ja | openrouter/openai/gpt-5.6-luna | 96 | passed | 0 |
| ru | openrouter/openai/gpt-5.6-luna | 98 | passed | 0 |
| de | openrouter/openai/gpt-5.6-luna | 95 | passed | 0 |
| fr | openrouter/openai/gpt-5.6-luna | 96 | passed | 0 |
| it | openrouter/openai/gpt-5.6-luna | 96 | passed | 0 |
| ar | openrouter/openai/gpt-5.6-luna | 96 | passed | 0 |
| he | openrouter/openai/gpt-5.6-luna | 94 | passed | 0 |
| zh | openrouter/openai/gpt-5.6-luna | 96 | passed | 0 |

Five high-priority judge suggestions were exact no-ops (Spanish, German, French, Italian, Hebrew); rendered-page inspection confirmed their anchors already matched. Japanese had a real judge-introduced bad anchor, caught by rendered-page verification, repaired with the repository heading-anchor utility, and revalidated. Direct final local validators are authoritative: the temporary budget wrapper initially mishandled nested Bun run arguments in the judge's internal validation subprocess; those internal pass flags are not relied upon. The wrapper was corrected, and all final validators were run with the normal Bun executable.

## Accounting

- Budget: $4 maximum.
- Recorded OpenRouter credits: $0.732524.
- Conservative total bound, including full reservations for zero-credit and interrupted calls: $1.956186.
- Zero-credit/BYOK responses are not counted as evidence of free inference.
- Detailed request reservations and credit receipts: budget.json.

## Verification

- Content check: 0 errors, 110 convention warnings (includes existing wide SQL lines in this article).
- Astro type check: 0 errors.
- 170 focused model/translation tests and 25 navigation/locale/redirect tests passed.
- English plus all ten translated routes returned 200, each with 16 comparison rows, ToC navigation and no missing same-page heading anchors.
- Desktop sticky navigation and section-link clicks verified in T3's collaborative browser.
- Mobile viewport verification unavailable: T3 resize requests timed out; mobile CSS and native collapsible markup are implemented.
- Final full static build passed after the Japanese anchor repair: 1,597 pages in 1m 42s. Built HTML for English plus all ten locales also has the full comparison, ToC, and no missing heading links.
- Changes are local commits; no push or deployment was requested.
