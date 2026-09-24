# Settled cost audit

Re-fetched all 195 OpenRouter generation IDs. All gateway amounts and native input/output counters match the original receipts. The run used 85 BYOK calls and 110 non-BYOK calls. No new model inference was performed.

| Phase | OpenRouter charges | BYOK inference reference | Calls (BYOK/other) |
|---|---:|---:|---:|
| Translation generation | $1.19812168 | $0.653993775 | 20/45 |
| Evaluation | $8.382072 | $4.2589423 | 65/65 |
| Total | $9.58019368 | $4.912936075 | 85/110 |

$14.493129755 is the OpenRouter charge plus BYOK reference estimate, not a verified combined invoice. Actual BYOK provider invoices have not been reconciled. Credit-purchase fees/taxes/discounts are outside these request receipts.

The earlier completion-response `upstream_inference_cost` duplicated the gateway charge on non-BYOK calls. The settled generation endpoint returns zero there. Therefore the earlier $1.852115455 / $12.6410143 totals happened to equal charge-plus-BYOK-reference estimates; calling them all “upstream costs” was misleading. Raw fields remain intact for provenance; use `openRouterChargeUsd` and `byokInferenceReferenceUsd` in the updated reports.

Model catalog rates are not the selected provider's invoice rates. Two models differed:

- DeepSeek V4.1 Flash: $0.011946564 actual OpenRouter charge versus $0.0045105648 catalog estimate (2.65×).
- Qwen 3.8 27B: $0.029684 actual OpenRouter charge versus $0.0278052 catalog estimate (1.068×).

Flash Lite's total OpenRouter charge is known: $0.0187884 for five attempts, including a zero-charge partial response. That response still has zero native usage and an unknown complete catalog-equivalent estimate. Its router estimates are not native provider token counts.

Reasoning tokens are already included in output totals; cache buckets are not added to input totals. The existing 195 Langfuse generations were enriched in place with verified BYOK status, OpenRouter charge, BYOK-only reference cost, and an explicit unreconciled-provider-invoice flag. No duplicate billed observations were created. Read-back results are in langfuse-settlement-verification.jsonl.

Sources: [OpenRouter usage accounting](https://openrouter.ai/docs/cookbook/administration/usage-accounting), [generation lookup](https://openrouter.ai/docs/api/api-reference/generations/get-request-&-usage-metadata-for-a-generation), [cost provenance and BYOK reference guidance](https://openrouter.ai/docs/guides/features/broadcast).
