<!-- BEGIN GENERATED EDITIONS -->
# Synchronized editions

Generated from [the current 40-minute outline](../../outlines/free-tier-40min.md).

| Length | Browser | Screen PPTX | Handout PPTX | Presenter script |
| ---: | --- | --- | --- | --- |
| 15 min | [Open](../../../reveal-talks/free-tier-15min.html) | [Download](../../decks/free-tier-15min-screen.pptx) | [Download](../../decks/free-tier-15min-handout.pptx) | [Script](script-15min.md) |
| 30 min | [Open](../../../reveal-talks/free-tier-30min.html) | [Download](../../decks/free-tier-30min-screen.pptx) | [Download](../../decks/free-tier-30min-handout.pptx) | [Script](script-30min.md) |
| 40 min | [Open](../../../reveal-talks/free-tier-40min.html) | [Download](../../decks/free-tier-40min-screen.pptx) | [Download](../../decks/free-tier-40min-handout.pptx) | [Script](script-40min.md) |
<!-- END GENERATED EDITIONS -->

# Formats: Cry Me a Free Tier

The 15-slide [browser deck](../../../reveal-talks/free-tier.html) follows the [40-minute outline](../../outlines/free-tier-40min.md). Scripts, adaptations, browser decks, and PowerPoints are generated from the outline by `sync-talks.ts`; edit the outline, then rebuild.

| Slot | Preparation |
| --- | --- |
| 7 minutes | Lightning script below; slides 1, 5, 6, 12, 15 |
| 5 to 10 minute live demo | AI Tinkerers format, below |
| 15 minutes | [Script](script-15min.md) and [route](../../outlines/free-tier-15min-adaptation.md) |
| 25 minutes | 30-minute route with slide 11's sweep compressed to two rows |
| 30 minutes | [Script](script-30min.md) and [route](../../outlines/free-tier-30min-adaptation.md) |
| 40 minutes | [Script](script-40min.md) and [outline](../../outlines/free-tier-40min.md) |
| 45 minutes | 40-minute route plus five minutes of Q&A |
| 60 minutes | Workshop below |
| 75 minutes | Workshop plus 15-minute peer review |

Recheck the three dated items on slide 4 the week of any delivery.

## Seven-minute lightning script

0:00 to 1:00, slide 1. A startup gets free electricity for a year. What does it build? Take the five seconds. It does not build the same company more cheaply, it builds a different company. Now: what survives when the offer ends? Swap electricity for inference.

1:00 to 2:15, slide 5. Free parking was never free. Nobody paid at the meter, so the cost moved into rents, retail prices and land, and because drivers saw no price, demand looked infinite. That is an externality: a real cost, paid, but not by the person deciding. Then the environment reorganized around it, and each step was locally reasonable.

2:15 to 3:30, slide 6. In 1865 Jevons noticed that more efficient steam engines made Britain burn more coal, not less. Duranton and Turner measured the same thing on highways in 2011: add ten percent more road, get ten percent more driving. So your token price fell and your bill went up, and that is the prediction, not a contradiction. Spend is price times consumption, and cheapness moved every term.

3:30 to 5:30, slide 12. Here is the reframe. Williamson won a Nobel for what happens when you make an investment that is worth a lot inside one relationship and little outside it. Your prompts, your evals, your fine-tunes, your unlimited-usage clause. That is asset specificity, and the trouble it produces is called hold-up. You are not shopping, where the customer holds the power because they can leave. You are contracting, with a much better capitalized counterparty, and your architecture is the collateral.

5:30 to 7:00, slide 15. Eight words: externality, induced demand, Jevons paradox, path dependence, moral hazard, credible commitment, asset specificity, real option. Three prices for your next design review: what you pay today, what you pay without the offer, and the most you could survive paying. Cheap intelligence changes incentives before it changes organizations.

## Five to ten minute live demo (AI Tinkerers)

The calculator alone is not a system you built. A qualifying demo runs the sensitivity model against real usage: pull last month's token consumption from a provider dashboard or a Langfuse or Helicone export, define a real acceptance rule, compute cost per accepted outcome, and sweep the price live. Five minutes: import, define acceptance, sweep, then show which assumption moved the number most, which is usually the acceptance rate rather than the price. Requires an exported dataset you are permitted to show.

## Sixty-minute workshop

Participants bring one product or feature and leave with its three prices, a sensitivity table, and a specific-asset inventory.

**Sent in advance:** last month's inference spend or an estimate, a count of attempts and accepted outcomes for one workload, and the current pricing page for the provider in use.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00 to 0:10 | Opening | Slides 1 and 2. Each participant fills the four boxes for one feature. Most leave two blank. |
| 0:10 to 0:22 | Why is it cheap? | Slides 3 and 4. Pairs argue which of the four explanations fits their provider, and name the observation at renewal that would settle it. |
| 0:22 to 0:35 | Parking and Jevons | Slides 5 to 7. List second-order effects of free parking, then match each to something in your own stack. Everyone names one frontier call where a lookup would do. |
| 0:35 to 0:45 | Lock-in and the meter | Slides 8 and 9. Pick one model call and estimate the hours to remove it. Then check whether anyone in the room can see per-feature cost without filing a ticket. |
| 0:45 to 1:00 | Denominator and sweep | Slides 10 and 11 with the kit. Write the acceptance rule in one sentence, compute cost per accepted outcome, convert the acceptance rate to a multiplier, then sweep and multiply by real volume. |
| 1:00 to 1:15 | Specific assets | Slide 12. Inventory the assets worth more inside this relationship than outside it. Rank by hours to replace. |
| 1:15 to 1:28 | Three prices | Slides 13 and 14. Fill the worksheet, estimate the option premium, assign an owner and a review date. |
| 1:28 to 1:35 | Close | Slide 15. |

**Facilitation notes.** The denominator block is where most participants discover they cannot define an accepted outcome; let it run long and shorten the specific-asset block if needed. The volume caveat on slide 11 matters more than anything else in the room: several participants will be about to optimize a thirty-dollar bill.

**Participants leave with:** the four-boxes card, the parking-to-software mapping, their sensitivity table, the specific-asset inventory, the three-price worksheet.
