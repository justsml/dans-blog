# Talk packet: Buy Me a Free Tier

[Formats](formats.md) · [40-minute script](script-40min.md) · [Evidence](evidence-bank.md) · Deck (deck not yet rebuilt; see [decks](../../../decks/README.md))

Outline: [40 min](index.md).

## Titles

- **Primary:** Buy Me a Free Tier
- Eight Words for the Budget Meeting

## Abstracts

### 50 words

Cheap inference rewards habits before anyone measures their value. This talk follows those incentives from a design review to an invoice, using MoviePass, economics and a synthetic workload. Learn to compute cost per accepted outcome, inventory expensive dependencies, and bring three prices to the next decision about what to build.

### 100 words

Cheap inference rewards habits before anyone measures their value. A frontier call replaces a lookup; another retry becomes the default; a customer receives an unlimited promise. This talk asks what those decisions bought. MoviePass opens the case, followed by eight economic terms for the budget meeting. A synthetic workload shows how declining acceptance can erase a cheaper input, and why optimization depends on volume. The close inventories provider-specific assets and prices the work of keeping an alternative usable. Bring three prices to the next design review: today, without the offer, and the highest price the product can survive paying profitably.

### 250 words

In 2017 MoviePass offered one movie a day for $9.95 while the average ticket cost $8.97. Cheap access made another visit easy. In software, cheap inference can make another call, retry or unlimited promise easy. Don't fear training the model, worry how it's training you.

This talk treats that training as an incentive analogy and asks what the repeated decisions bought. Eight economic terms supply vocabulary without pretending that a vendor's price discloses its margins. The worked example is a synthetic workload: a lower acceptance rate can cost exactly as much as doubling inference prices, under a stated cost split. The arithmetic fits on one slide.

Then inventory the prompts, evals, fine-tunes and customer promises that make switching expensive. Price the work of keeping an alternative usable against the exposure. Leave with three prices for the next design review: today, without the offer, and the highest rate you can survive.

The room does the division before discussing architecture. Failed attempts still consume resources, and recovery work belongs in the numerator. A four-row price sweep holds acceptance fixed, then asks which assumption deserves testing first. At low volume, the sensible answer may be to keep the existing system and cancel the optimization project. At high volume, the same change may pay for itself quickly. Neither answer requires guessing when an offer ends. Participants identify one dependency to replace, estimate the hours, and locate the person who owns that decision. The goal is a better design review, with costs visible while choosing.

## Learning outcomes

Attendees will be able to:

1. Name four explanations for a low price and observations that help distinguish them, instead of arguing about vendor margins.
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

The talk uses historical research, a dated Microsoft commitment and a synthetic workload. Optional AWS credit and Amazon references remain in the evidence bank. It recommends no provider, no cost tool, and no consulting service. The sweep is a four-row table on a slide; no tool or vendor data is required.

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
- Amazon Web Services. [AWS Activate credits](https://aws.amazon.com/startups/credits/) (optional evidence-bank reference) and [AWS Promotional Credit terms](https://aws.amazon.com/awscredits/).
- Microsoft, [The next chapter of the Microsoft–OpenAI partnership](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/), 28 October 2025. Amazon, [Amazon invests an additional $5 billion in Anthropic](https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai), April 2026.

## Audience-specific abstracts (approximately 100 words each)

### Engineering practitioner

Your architecture already learned what inference costs, and it learned from a promotional price. This session gives you the vocabulary to argue about that in a room where "it feels wasteful" loses. Externality, induced demand, Jevons paradox, path dependence, moral hazard, credible commitment, asset specificity, real option. Each attaches to a decision: measure your lock-in by trying to remove one model call and counting the hours; convert your acceptance rate into a multiplier on sticker price; compute the volume at which a caching layer pays back. Ends with three prices for the next design review and a rehearsal plan.

### Engineering leadership and product

Nobody outside a provider knows its margins, and this talk does not guess. It asks a sharper question: what kind of counterparty are you dealing with, and what have you posted as collateral? Four possible explanations for a low price, and observations at renewal that help distinguish them. The enormous compute commitments as Schelling commitments rather than cost disclosures. Then Williamson: your prompts, evals, fine-tunes and unlimited-usage clauses are relationship-specific assets, which makes this a contracting problem. The close prices reversibility as a real option against measured exposure and gives leaders three numbers to demand in any AI investment review.

### Education and instructional design

Schools and edtech products are adopting AI tools priced at promotional rates. This adaptation asks what happens to a curriculum, a procurement decision, or a student expectation built on a price that may not hold. It supplies the mechanism without jargon: a hidden cost does not vanish, it relocates; cheaper access can encourage more usage; and an environment reorganized around a free input does not snap back when the price returns. Then a simple cost-per-successful-outcome model any program office can run. No engineering background needed. You leave with three prices to ask a vendor for, before signing.

### Executive and general technology

Free parking was never free; its cost moved into rents, land, and the businesses that never opened. Something similar is happening in software, and it shows up in architecture, contracts and hiring plans long before it shows up on an invoice. This talk explains the mechanism without code and without a price forecast, distinguishes four possible explanations for a low price, and reframes the industry's headline compute commitments as strategic moves rather than accounting disclosures. Leaders leave with three numbers for any AI investment review: what we pay today, what we pay without the offer, and what we could survive paying.
