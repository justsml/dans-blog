# Buy Me a Free Tier: 15-minute presenter script

Use slides 1, 3, 6, 7, 10, 12, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Lightning route: the MoviePass question, the four explanations for a low price and the terrain line that names the talk, Jevons, the software map, the acceptance multiplier, the hold-up problem, and the eight words. Slide 5 is cut; Shoup and path dependence ride in the slide-3 bridge.

## 00:00 to 02:30: slide 1, Unlimited for $9.95

On screen:

> August 2017: one movie a day, $9.95 a month. Average US ticket that year: $9.11.
> What survived the offer? The habit. Not the company.

August 2017. MoviePass drops to nine ninety-five a month for one movie a day. The average American ticket cost nine dollars and eleven cents, and MoviePass paid full retail every time. Pay for one movie, see thirty.

Twenty thousand subscribers became three million in eighteen months. May 2018 lost forty million dollars in that month alone. By September 2019 it was gone.

What did the cheap price build? An audience that drove across town on a Tuesday for films it had never heard of. And what survived the offer? The habit did. The company did not.

Swap the ticket for a token. One disclaimer, then I stop qualifying: nobody outside a provider knows its margins, and every dollar figure here is invented. What I have is a hundred and fifty years of economists on this problem, and the names they gave it.

Eight words. Engineers lose this argument in budget meetings because the best we can say is "it feels wasteful," and finance says "the bill looks fine."

Source: MoviePass subscriber and loss figures are widely reported contemporaneous press; the litigated detail comes from the FTC action cited on slide 3. Average US ticket price $9.11 (2017) is the National Association of Theatre Owners annual average.

Story: The first time a bill, a quota, or a rate change broke an assumption in something you built.

Delivery: Let "pay for one movie, see thirty" sit for a beat before the collapse numbers. The room does the arithmetic faster than you can say it.

Bridge: four boxes on one invoice - price paid, resources consumed, cost allocated, value delivered - and the gap between the last two is why nobody is measuring.

## 02:30 to 05:15: slide 3, Why would anyone sell below cost?

On screen:

> Penetration pricing · Loss leader in a bundle · Predation · It is genuinely cheap
> The price cannot tell you which. What happens next can.

Penetration pricing: buy the market now, raise later. Loss leader in a bundle: the cheap thing funds the expensive thing next to it, which is what a two-sided market does for a living. Predation: below cost specifically to remove rivals — in US law a test, not a vibe. Brooke Group, 1993: below-cost pricing plus a dangerous probability of recoupment. And the fourth, the one that keeps me honest: it is genuinely cheap, and getting cheaper, because the engineering is real.

You cannot tell which from the price, only from what happens next: penetration raises prices at renewal once switching is hard, predation waits for a rival to die, genuine efficiency keeps cutting without tightening the terms.

MoviePass already ran that experiment. The FTC's 2021 complaint records what happened next: passwords invalidated for the seventy-five thousand heaviest users under a false fraud claim, a photograph-your-ticket step, undisclosed caps. No announced price rise — the product just got harder to use, heaviest users first. That is rate limiting, and it is the tell.

Source: Brooke Group Ltd. v. Brown & Williamson Tobacco Corp., 509 U.S. 209 (1993), on the recoupment requirement in predatory-pricing claims.

Source: [FTC, 7 June 2021](https://www.ftc.gov/news-events/news/press-releases/2021/06/operators-moviepass-subscription-service-agree-settle-ftc-allegations-they-limited-usage-failed), settlement with MoviePass Inc., Helios and Matheson Analytics, Lowe and Farnsworth, on password invalidation, ticket verification and undisclosed caps. Allegations settled without monetary relief; both companies were already bankrupt.

Source: Rochet and Tirole (2003), Platform Competition in Two-Sided Markets, Journal of the European Economic Association, on cross-subsidy between sides of a market.

Bridge: those commitments are Schelling moves in a war of attrition. Note who is not a player. Somebody is buying your free tier, and it is not you. You are not a combatant, you are the terrain. And the terrain keeps its asphalt: repealing a parking minimum does not remove the lot — path dependence.

## 05:15 to 07:15: slide 6, Jevons, coal, and the extra lane

On screen:

> 1865: better engines burned more coal, not less
> Add a lane, get traffic. Elasticity near one.
> Spend = price × jobs × calls per job × tokens per call

In 1865 William Stanley Jevons noticed something that annoyed everyone. Steam engines had gotten dramatically more efficient, and Britain was burning far more coal than before, not less. Efficiency made coal useful for more things, so people used it for more things. That is the Jevons paradox, and it is word two.

The transport version is word three, induced demand. Add a lane to a congested highway and you get more traffic. Duranton and Turner measured it across US cities in 2011 and found the elasticity of driving with respect to lane-kilometres is roughly one. Build ten percent more road, get ten percent more driving. The congestion comes back.

Source: Jevons (1865), The Coal Question, chapter VII. Duranton and Turner (2011), The Fundamental Law of Road Congestion, American Economic Review 101(6).

Source: Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025), [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends). Check for a newer edition before each delivery.

Bridge: your per-token price fell off a cliff and your bill went up, because spend is price times jobs times calls times tokens and cheapness moved every term on the right.

## 07:15 to 09:30: slide 7, Now do it to software

On screen:

> Density: a frontier call where a lookup would do
> Business mix: products viable only at today's rate
> Bundled rent: unlimited usage promised in a contract
> Small format: deterministic code loses the design review

Walk the same chain through your stack. Density: a frontier call where a cache, a regex, or a dictionary lookup would have done, because the call looked free. Longer context, more retries, more competing branches, frontier by default. Business mix: products whose unit economics only work at promotional rates, crowding out products that would have worked at any price. Bundled rent: unlimited-usage promises to customers, baked into a contract, priced against an input you do not control. And the small format: boring deterministic code losing the design review to "just ask the model."

I call it architectural obesity. It is not that any one of those calls is wrong. Redundancy is worth paying for, big context is worth paying for, three parallel attempts are sometimes exactly right. The failure is that nobody measured what the extra call bought, because at these prices nobody had to.

Story: A design review where "inference is basically free" ended the discussion.

Delivery: Ask for one show of hands: who has shipped a frontier call where a lookup would do? Then admit you have too.

Bridge: the lots stay built, and whoever chooses the architecture is not whoever pays the bill sixty days later.

## 09:30 to 11:30: slide 10, Doubling on a Tuesday

On screen:

> Cost per accepted outcome = total spend ÷ accepted jobs
> 75% accepted means you pay 1.33× sticker. 45% means 2.22×.
> A 30-point acceptance drop costs exactly what doubling every token price costs.

Before any dollar figure, define the denominator. An accepted outcome meets a rule you wrote down. An impressive answer that a human quietly repairs afterwards is not a success, it is a success plus a hidden salary. Count inference, tools, infrastructure and recovery. A blended token rate is not a unit economics model.

Now the part worth remembering. Divide by the acceptance rate and you get a multiplier on your sticker price. Seventy-five percent acceptance means you are paying one and a third times the list price for every result you keep. Forty-five percent means two point two. Run those two numbers together: dropping from seventy-five to forty-five percent acceptance costs you exactly the same as every token in your stack doubling in price overnight. One of those is on the front page. The other one is a Tuesday.

Delivery: Do the division on stage. Thirty seconds: name your product's accepted outcome in one sentence. If that is hard, the economics conversation just found a product problem.

Bridge: run the sweep at one, two, five and ten times price, then multiply by your own volume before you feel anything about it.

## 11:30 to 13:15: slide 12, You are not shopping, you are contracting

On screen:

> Word six: asset specificity. Word seven: hold-up.
> An investment worth a lot inside this relationship and little outside it
> Your prompts, evals, fine-tunes, and that unlimited-usage clause

This is the slide I would keep if you cut every other one. Oliver Williamson won a Nobel in 2009 for working out what happens when two parties make investments that only pay off inside their relationship. He called it asset specificity, and the trouble it produces is called hold-up.

So stop thinking of this as shopping, where the customer holds the power because they can leave. You are contracting, with a much better capitalized counterparty, and your architecture is the collateral. That reframe is the whole talk, and everything after this is just a way of reducing specificity or pricing the exposure.

Bridge: so price reversibility as the option it is, and bring three prices to the design review: today, without the offer, and the most you could survive.

## 13:15 to 15:00: slide 15, Cheap intelligence changes incentives first

On screen:

> Externality · Induced demand · Jevons paradox · Path dependence
> Moral hazard · Credible commitment · Asset specificity · Real option
> Build for more than one price.

Back to MoviePass. Cinema subscriptions work today, shipped by the chains that owned the screens and never paid retail. The company that died promised unlimited access to something it bought at full price from somebody else. Ask which you are.

So use the cheap input. Just understand what it encouraged you to build, and keep the big decisions reversible.

There are your eight words. Externality, because the cost moved rather than vanished. Induced demand and Jevons, because cheaper made you use more, not less. Path dependence, because the lots stay built. Moral hazard, because whoever chooses is not whoever pays. Credible commitment, because those contracts are moves in a game, not disclosures. Asset specificity, because your architecture is worth more here than anywhere else. And real option, because reversibility is something you buy, not something you feel.

Cheap intelligence changes incentives before it changes organizations.

Delivery: Say the last line slowly, then stop talking. For questions, jump back to the sweep table if this route kept slide 11.
