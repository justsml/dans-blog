# Talk packet: Cry Me a Free Tier

[Formats](formats.md) · [40-minute script](script-40min.md) · [Evidence](evidence-bank.md) · [Deck](../../../reveal-talks/free-tier.html)

Outline: [40 min](../../outlines/free-tier-40min.md). Current screen and handout PowerPoints are linked from the [deck index](../../decks/README.md).

## Titles

- **Primary:** Cry Me a Free Tier
- Eight Words for the Budget Meeting
- You Are Not Shopping, You Are Contracting
- What Did the Cheap Input Teach Your Architecture to Expect?

## Abstracts

### 50 words

Your token price fell and your bill went up. That is not a contradiction, it is the Jevons paradox, and economists have been describing your situation since 1865. This talk hands engineers eight words from economics and game theory that turn "it feels wasteful" into an argument finance cannot wave off.

### 100 words

Engineers lose the cost argument in budget meetings because the strongest thing we can say is "it feels wasteful," and the invoice looks fine. Economics has precise names for what we are worried about. This talk supplies eight: externality, induced demand, Jevons paradox, path dependence, moral hazard, credible commitment, asset specificity, and real option. Along the way it separates four legitimate reasons a price can be below cost and tells you which observation distinguishes them, reframes the enormous compute commitments as moves in a war of attrition rather than disclosures about margin, and runs a synthetic workload through a price sweep with the volume caveat attached.

### 250 words

A startup gets free electricity for a year. What does it build, and what survives when the offer ends? Swap electricity for inference and that is the question.

Nobody outside a provider knows its margins, and this talk never guesses one. It borrows instead from a century and a half of economists who worked on the same structure in coal, parking, highways and car factories, and it hands the room their vocabulary.

Four respectable explanations exist for a price below cost: penetration pricing, a loss leader inside a two-sided bundle, predation (which in US law requires a real probability of recoupment), and genuine efficiency. The price cannot tell you which. What happens at renewal can. The enormous compute commitments everyone quotes are not cost disclosures; they are credible commitments in Schelling's sense, moves in a war of attrition in which the customer is not a player but the terrain.

Then Shoup's parking argument supplies the mechanism: a hidden price makes demand look infinite, the environment reorganizes, and repealing the rule does not remove the asphalt. Jevons and induced demand explain why a falling unit price and a rising bill are the expected outcome rather than a paradox. Moral hazard explains why the engineer choosing the architecture never sees the meter.

The turn is Williamson: your prompts, evals, fine-tunes and unlimited-usage clauses are relationship-specific assets, which makes this a contracting problem, not a shopping problem. The close prices reversibility as a real option and leaves three numbers for the next design review.

## Learning outcomes

Attendees will be able to:

1. Name the four explanations for a below-cost price and the observation that distinguishes them, instead of arguing about vendor margins.
2. Compute cost per accepted outcome, convert an acceptance rate into a price multiplier, and state the volume at which an optimization is worth funding.
3. Inventory their relationship-specific assets and price reversibility as an option against their measured exposure.

## Audience and prerequisites

Engineering leaders, architects, and founders making build decisions on top of LLM APIs. Basic familiarity with token pricing. No economics background assumed; the talk defines every term it uses.

## Practical takeaways

- The eight-word glossary, each attached to a decision.
- The acceptance-rate-as-price-multiplier arithmetic, checkable on the spot.
- The three-price worksheet: effective rate today, gross rate without the offer, highest survivable rate.
- The specific-asset inventory and the payback formula for an optimization.

## Not a product pitch

The talk names AWS credit terms and Epoch AI's public data as sources. It recommends no provider, no cost tool, and no consulting service. The calculator is offline and vendor-free.

## References

- Shoup, D. (2005, updated 2011). *The High Cost of Free Parking*. American Planning Association. Also Shoup (2011), [Free parking or free markets](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/), ACCESS Magazine.
- Jevons, W. S. (1865). *The Coal Question*, chapter VII.
- Duranton, G. and Turner, M. (2011). The Fundamental Law of Road Congestion: Evidence from US Cities. *American Economic Review* 101(6).
- David, P. (1985). Clio and the Economics of QWERTY. *American Economic Review* 75(2). Contested by Liebowitz and Margolis (1990), The Fable of the Keys, *Journal of Law and Economics* 33(1). Arthur, W. B. (1989). Competing Technologies, Increasing Returns, and Lock-In by Historical Events. *The Economic Journal* 99(394).
- Williamson, O. (1985). *The Economic Institutions of Capitalism*. Nobel Prize in Economic Sciences, 2009.
- Schelling, T. (1960). *The Strategy of Conflict*. Harvard University Press. Nobel Prize, 2005.
- Dixit, A. and Pindyck, R. (1994). *Investment Under Uncertainty*. Princeton University Press.
- Rochet, J-C. and Tirole, J. (2003). Platform Competition in Two-Sided Markets. *Journal of the European Economic Association* 1(4).
- Brooke Group Ltd. v. Brown & Williamson Tobacco Corp., 509 U.S. 209 (1993).
- Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025). [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends).
- Amazon Web Services. [AWS Promotional Credit terms](https://aws.amazon.com/awscredits/).

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Your architecture already learned what inference costs, and it learned from a promotional price. This session gives you the vocabulary to argue about that in a room where "it feels wasteful" loses. Externality, induced demand, Jevons paradox, path dependence, moral hazard, credible commitment, asset specificity, real option. Each attaches to a decision: measure your lock-in by trying to remove one model call and counting the hours; convert your acceptance rate into a multiplier on sticker price; compute the volume at which a caching layer pays back. Ends with three prices for the next design review and a rehearsal plan.

### Engineering leadership and product

Nobody outside a provider knows its margins, and this talk does not guess. It asks a sharper question: what kind of counterparty are you dealing with, and what have you posted as collateral? Four legitimate explanations for a below-cost price, and the observation at renewal that distinguishes them. The enormous compute commitments as Schelling commitments rather than cost disclosures. Then Williamson: your prompts, evals, fine-tunes and unlimited-usage clauses are relationship-specific assets, which makes this a contracting problem. The close prices reversibility as a real option against measured exposure and gives leaders three numbers to demand in any AI investment review.

### Education and instructional design

Schools and edtech products are adopting AI tools priced at promotional rates. This adaptation asks what happens to a curriculum, a procurement decision, or a student expectation built on a price that may not hold. It supplies the mechanism without jargon: a hidden cost does not vanish, it relocates; cheaper access produces more usage rather than less; and an environment reorganized around a free input does not snap back when the price returns. Then a simple cost-per-successful-outcome model any program office can run. No engineering background needed. You leave with three prices to ask a vendor for, before signing.

### Executive and general technology

Free parking was never free; its cost moved into rents, land, and the businesses that never opened. Something similar is happening in software, and it shows up in architecture, contracts and hiring plans long before it shows up on an invoice. This talk explains the mechanism without code and without a price forecast, distinguishes four legitimate reasons a price can sit below cost, and reframes the industry's headline compute commitments as strategic moves rather than accounting disclosures. Leaders leave with three numbers for any AI investment review: what we pay today, what we pay without the offer, and what we could survive paying.
