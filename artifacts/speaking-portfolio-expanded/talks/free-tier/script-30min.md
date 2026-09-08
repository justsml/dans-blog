# Buy Me a Free Tier: 30-minute presenter script

Use slides 1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 14, 15. [Timing](timing.md) separates spoken delivery from interaction. Optional Story material replaces prose; it never extends the slot. Sources and visuals live in [the outline](index.md). The eight terms are a glossary, not a numbered countdown.

## 00:00 to 02:30: slide 1, Unlimited for $9.95

On screen:

> August 2017: $9.95 monthly offer; $8.97 average US ticket.
> Don't fear training the model, worry how it's training you.

August 2017. MoviePass offers one movie a day for nine ninety-five a month. The average American ticket costs eight dollars and ninety-seven cents. MoviePass buys the tickets at retail. Pay for one movie, see thirty.

By June 2018, three million subscribers. About ten months after the cheap offer launched. Service suspended in September 2019; the brand later returned with a different offer.

Think about the incentive: another film costs the subscriber nothing. That price rewards another visit. Swap the ticket for a token and ask what your design reviews have been rewarding.

Don't fear training the model, worry how it's training you. Training is the analogy here: repeated cheap decisions become defaults. Nobody outside a provider knows its margins; our workload dollars are synthetic. MoviePass is a completed case, not a prediction about an AI vendor.

Delivery: Pause after the ticket arithmetic. The optional Story replaces prose within this budget; it is not extra time.

## 02:30 to 04:30: slide 2, Four boxes, one invoice

On screen:

> Price paid · Resources consumed · Cost allocated · Value delivered
> The gap between the last two is why nobody is measuring

The invoice tells you what you paid. It does not tell you what the machine consumed, how the provider allocated its costs, or what the customer got. Those are four different boxes.

The useful gap for your own design review is between what you spent and what the customer accepted. A cheap attempt can still be an expensive failure. A costly attempt can be excellent value.

When the invoice looks trivial, measuring that gap feels like more work than it saves. That is the first reward: skipping the measurement gets the feature shipped faster. Which box does your dashboard actually measure?

Delivery: Show of hands, 15 seconds: which box can your dashboard answer?

## 04:30 to 07:00: slide 3, Why would anyone sell below cost?

On screen:

> Penetration pricing · Loss leader in a bundle · Predation · It is genuinely cheap
> The price cannot tell you which. What happens next can.

Four explanations for a low price. Penetration pricing buys adoption now. A loss leader supports another paid product. Predation seeks to remove rivals; the US Brooke Group decision requires below-cost pricing and a dangerous probability of recoupment. Or production really is getting cheaper.

The price alone cannot choose among them. Renewal terms and usage restrictions give you more evidence, though they do not prove a motive.

The FTC's 2021 MoviePass complaint alleged password invalidation for the seventy-five thousand heaviest users, misleading fraud explanations, ticket verification and undisclosed caps. Those allegations settled without admission of liability. Watch what access your payment buys, not just the number on the invoice.

Customers who used the advertised allowance were responding to the offer. If your economics depend on customers forgetting to use what you sold them, the customers are not your bug.

Bridge: the enormous compute commitments everyone quotes are credible commitments in Schelling's vocabulary, not margin disclosures. Somebody is buying your free tier, and it is not you. You are not a combatant. You are the terrain.

## 07:00 to 09:00: slide 5, Free parking was never free

On screen:

> The driver sees no meter, so demand looks infinite
> The cost moves into rents, prices, and land
> externality

Shoup's free parking gives us externality: a cost borne outside the decision that creates it. Parking requirements put costs into land, rents and retail prices even when the driver saw no meter.

The analogy has limits. A provider's discounted invoice does not itself establish an externality. You need to identify a cost and who bears it.

In your system, start with recovery work. A model call can look almost free while a support team repairs the output. The engineering dashboard sees the call. Someone else's afternoon disappears. Find that afternoon before congratulating the architecture.

## 09:00 to 11:45: slide 6, Jevons, coal, and the extra lane

On screen:

> 1865: less coal per unit of work; more coal used in total
> Add a lane, get traffic. Elasticity near one.
> Spend = price × jobs × calls per job × tokens per call

Jevons wrote about coal in 1865. More efficient engines used less coal per unit of work, while Britain consumed more coal overall. Efficiency can expand the uses of an input enough to increase total demand. Backfire is a possibility, not a law.

Induced demand is the related transport idea. Duranton and Turner found road travel growing roughly with highway capacity across US cities in their 2011 study. That is a finding about roads, not a measured elasticity for tokens.

For software, use the equation: spend equals price times jobs times calls per job times tokens per call. A lower first term can coexist with a bigger product. It need not.

Epoch's March 2025 series, ending in February 2025, documents falling prices at fixed benchmark milestones. It does not establish today's production costs. Measure your own four terms and the value they bought.

## 11:45 to 14:15: slide 7, Now do it to software

On screen:

> Cheap call → easy approval → repeated default
> What did the extra call buy?

A frontier call where a lookup would do. More context because it fits. Another retry because it is cheap. A customer contract promising unlimited usage because last month's bill was tiny.

Each decision gets an immediate reward: less implementation work, a smoother demo, an easier sale. Measuring the extra call's value comes later, if at all. The promotional price becomes a curriculum; every design review is another rep.

Those calls may be worth it. Parallel attempts and long context sometimes buy exactly the result you need. The question is whether the extra spend bought more accepted outcomes. If you never measured, you have learned a habit without learning its price.

Bridge: path dependence means the offer ends but the defaults remain. On the asset inventory, count the hours to remove one call.

Delivery: Show of hands, 15 seconds: who has shipped a frontier call where a lookup would do? Do not imply a personal admission without a verified example.

## 14:15 to 16:15: slide 9, Whoever chooses is not whoever pays

On screen:

> moral hazard
> The architecture is chosen in a design review. The bill arrives 60 days later, somewhere else.
> Shoup's fix was never a ban. It was a meter.

Moral hazard describes how decisions change when the person choosing does not bear their costs. It is about incentives, not bad people.

An engineer gets credit for shipping on Tuesday. Finance sees the bill later. Support repairs the failures. The reward is immediate and visible; the costs arrive elsewhere.

A MoviePass subscriber using one movie a day was reading the offer. An engineer using the available context window is responding to the same kind of invitation. Neither needs a lecture about virtue.

Put cost per accepted outcome next to the latency budget in the design review. Now the person choosing can see what the choice buys. The meter changes the next rep.

Delivery: Show of hands, 15 seconds: who sees per-feature cost without filing a ticket?

## 16:15 to 19:15: slide 10, Doubling on a Tuesday

On screen:

> Cost per accepted outcome = total spend ÷ accepted jobs
> Fixture: 2¢ inference + 1¢ other cost per attempt
> 3¢ ÷ 45% = 5¢ ÷ 75% = 6.67¢

Define an accepted outcome before doing the division. A result a human quietly repairs has recovery cost. Count that work alongside inference, tools and infrastructure.

Our fixture: a thousand attempts, two cents inference and one cent other cost each, seventy-five percent accepted. Thirty dollars divided by seven hundred and fifty outcomes: four cents each.

At forty-five percent acceptance, the same thirty dollars buys four hundred and fifty outcomes: six point six seven cents each. Double inference instead, holding acceptance at seventy-five percent: fifty dollars divided by seven hundred and fifty. The same answer.

That equivalence belongs to this two-cent-plus-one-cent fixture. One of those changes is on the front page. The other one is a Tuesday.

Delivery: Thirty seconds: write one sentence defining an accepted outcome. Spend another 15 seconds writing the two divisions.

## 19:15 to 21:15: slide 11, Turn the dial

On screen:

> Sensitivity, not prediction.
> Multiply by your volume before you feel anything about it.

| Inference price | Monthly cost | Cost / accepted outcome |
| --- | --- | --- |
| 1× | $30 | $0.040 |
| 2× | $50 | $0.067 |
| 5× | $110 | $0.147 |
| 10× | $210 | $0.280 |

Read the first and last rows: thirty dollars becomes two hundred and ten; four cents per accepted outcome becomes twenty-eight. Only inference price changes; acceptance stays fixed.

Multiply by your volume before you feel anything about it. Spending three weeks optimizing a thirty-dollar bill because a conference talk made you anxious is also a cost problem.

Delivery: Walk the printed table for 15 seconds, then ask for 45 seconds: which assumption would you test before funding optimization?

## 21:15 to 24:30: slide 12, Till Renewal Do Us Part

On screen:

> Asset specificity. Hold-up is what it lets your counterparty do.
> An investment worth a lot inside this relationship and little outside it
> Your prompts, evals, fine-tunes, and that unlimited-usage clause

Williamson called investments worth more inside one relationship than outside it asset specificity. Hold-up is the bargaining exposure that can follow: after you invest, switching gets harder and your counterparty has more room at renewal.

Inventory your prompts tuned to one model, provider-specific evals, fine-tunes and latency assumptions. Then the sharpest one: an unlimited-usage promise to customers, priced against an input you cannot control. That sentence is the entire MoviePass balance sheet.

Your architecture is the collateral. Pick one model call and count the hours to remove it. Include output compatibility, evaluation, latency and recovery. That turns the argument into work you can price, rather than a diagram that says portable.

Bridge: reversibility is a real option, a right to switch later. Its premium is the ongoing engineering and evaluation work. Compare that premium with your exposure.

## 24:30 to 27:00: slide 14, Three prices for the next design review

On screen:

> What we pay today · What we pay without the offer · What we can survive paying
> Record gross usage separately from credits
> Keep an acceptance suite · Rehearse one replacement · Price the portability

Bring three prices to the next design review: what you pay today, what you pay without promotional treatment, and the highest price the product can survive.

Record gross usage separately from credits. Keep an acceptance suite so a cheaper configuration has to earn its savings. Rehearse one replacement, including latency and recovery. Price that work against the exposure.

The third price needs a business answer: what is an accepted outcome worth, and how much of that value can inference consume? If nobody knows, start there. You cannot solve a missing product decision with a cheaper model.

Delivery: 45 seconds in pairs: identify the third price. No report-back inside this budget.

## 27:00 to 30:00: slide 15, Cheap intelligence changes incentives first

On screen:

> Externality · Induced demand · Jevons paradox · Path dependence
> Moral hazard · Credible commitment · Asset specificity · Real option
> The habit can outlive the offer.

Back to MoviePass. The original service suspended; the brand returned with a different offer. Theater operators also sell memberships. Owning the screens changes the economics of selling access to them. Promising unlimited access to someone else's retail input is another business.

The eight terms are on screen for your next budget meeting. Use them to name a decision, not to win a vocabulary contest. The number to remember is the acceptance denominator: a worse result can erase a cheaper input.

Use the cheap inference. Measure what it rewards you for repeating. Keep the expensive decisions reversible while you find out.

The habit can outlive the offer.

Delivery: Stop talking. If questions follow, leave the acceptance arithmetic on slide 10 visible.
