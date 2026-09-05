# Formats: The Future of Product Engineering

This talk already has three purpose-built lengths rather than one deck with adaptations.

| Length | Format | Source |
| --- | --- | --- |
| 5–10 min | Lightning or live demo | Below |
| 15 min | Big idea | [15-minute outline](../../outlines/product-engineering-15min.md) |
| 25–30 min | Feedback systems | [30-minute outline](../../outlines/product-engineering-30min.md); drop slide 9 for 25 |
| 40–45 min | Technical blueprint | [40-minute outline](../../outlines/product-engineering-40min.md) plus five minutes of questions |
| 60–75 min | Workshop | Below |

## 5–10 minute lightning talk (slides)

Seven minutes from the 15-minute deck: slides 1, 5, 6, 8.

| Time | Beat |
| --- | --- |
| 0:00–1:00 | Invite teammates before value? Either screen in seconds. |
| 1:00–4:00 | The table. Activation first, show of hands, then support and urgency. |
| 4:00–5:30 | Rules shown before the decision. Eligible for review, not shipped. |
| 5:30–7:00 | Automate how the company learns. |

## 5–10 minute live demo (AI Tinkerers format)

A qualifying demo runs the loop live on a real product event stream you are permitted to show: a research agent produces an evidence packet with links to source records, a typed hypothesis is validated against the schema, and the evaluation layer scores two candidates and blocks one on a gate with the reason printed. Five minutes. Requires a working packet generator, schema, and gate script against real or realistic data.

## 60–75 minute workshop

Participants map one product loop from their own organization and leave with a typed hypothesis, a gate list, and a decision record for it.

**Prerequisites sent in advance:** one recent product change that was measured, with the metric used, the result, and who decided to ship it.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Opening | 30-minute deck slide 1. Each participant writes their change and the three explanations different teams offered for the result. |
| 0:10–0:25 | Map the loop | Slide 2. Participants draw their loop and mark the two slowest evidence transfers. |
| 0:25–0:40 | Falsifiable hypothesis | Slides 3–4. Rewrite the change as a typed hypothesis with segment, primary metric, counter-hypothesis, guardrails, owner. Pairs check for a missing counter-hypothesis. |
| 0:40–0:50 | Wrong objective | Slide 5. Each participant names one metric their org optimizes that arrives sooner than the harm it might cause. |
| 0:50–1:00 | Demo | Slide 6 at full length. |
| 1:00–1:10 | Gates | 40-minute deck slide 9. Participants list the nonnegotiable gates for their change and mark which are deterministic and which need review. |
| 1:10–1:20 | Instrument | Slide 8. What would an A/A check or sample ratio test have shown for the original change? |
| 1:20–1:30 | Decision record | Slide 10. Write the record: hypothesis, evidence, uncertainty, decision, revisit trigger. |
| 1:30–1:35 | Close | Slide 11. |

**Facilitation notes.** The counter-hypothesis step is where most participants discover their original experiment had none. For product-heavy rooms, skip the instrument block and extend the gates discussion.

**Artifacts participants leave with:** the loop map, the typed hypothesis, the gate list, the decision record.
