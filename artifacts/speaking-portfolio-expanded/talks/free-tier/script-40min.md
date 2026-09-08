# Buy Me a Free Tier: 40-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A.

## 00:00 to 02:15: slide 1, Unlimited for $9.95

On screen:

> August 2017: one movie a day, $9.95 a month. Average US ticket that year: $9.11.
> What survived the offer? The habit. Not the company.

August 2017. MoviePass drops to nine ninety-five a month for one movie a day. The average American ticket cost nine dollars and eleven cents, and MoviePass paid full retail every time. Pay for one movie, see thirty.

Twenty thousand subscribers became three million in eighteen months. May 2018 lost forty million dollars in that month alone. By September 2019 it was gone.

What did the cheap price build? Not the same moviegoing, cheaper — an audience that drove across town on a Tuesday for films it had never heard of. And what survived the offer? The habit did. The company did not.

Swap the ticket for a token. One disclaimer, then I stop qualifying: nobody outside a provider knows its margins, I will not guess at one, and every dollar figure here is invented. What I have is a hundred and fifty years of economists on this problem, and the names they gave it.

Eight words. Engineers lose this argument in budget meetings because the best we can say is "it feels wasteful," and finance says "the bill looks fine."

Source: MoviePass subscriber and loss figures are widely reported contemporaneous press; the litigated detail comes from the FTC action cited on slide 3. Average US ticket price $9.11 (2017) is the National Association of Theatre Owners annual average.

Story: The first time a bill, a quota, or a rate change broke an assumption in something you built.

Delivery: Let "pay for one movie, see thirty" sit for a beat before the collapse numbers. The room does the arithmetic faster than you can say it.

## 02:15 to 04:00: slide 2, Four boxes, one invoice

On screen:

> Price paid · Resources consumed · Cost allocated · Value delivered
> The gap between the last two is why nobody is measuring

Four boxes. The invoice is the first one. It tells you what you paid and nothing about utilization, depreciation, amortized training, or margin. The second box is what the machine actually burned. The third is how a provider chooses to allocate that internally, which you will never see. The fourth is what the customer got.

The gap between what you pay and what you would have been willing to pay has a name: consumer surplus. Yours is enormous right now. That is the pleasant explanation for why nobody in your organization is measuring any of this. When something is dramatically cheaper than it is worth to you, measuring it is not worth the afternoon.

Which of these four does your system actually measure, and which does it assume?

Delivery: Draw the four boxes with your hands. Ask for a show of hands on box two. Count them; it is usually a third of the room.

## 04:00 to 06:45: slide 3, Why would anyone sell below cost?

On screen:

> Penetration pricing · Loss leader in a bundle · Predation · It is genuinely cheap
> The price cannot tell you which. What happens next can.

There are four respectable explanations for a low price, and an engineer arguing about this in a meeting should be able to name all four.

Penetration pricing: buy the market now, raise later. Standard, legal, taught in every business school. Loss leader in a bundle: the cheap thing funds the expensive thing next to it, which is what a two-sided market does for a living. Predation: below cost specifically to remove rivals. In US law that is not a vibe, it is a test. Brooke Group, 1993: you need below-cost pricing and a dangerous probability of recoupment. And the fourth explanation, the one that keeps me honest: it is genuinely cheap, and getting cheaper, because the engineering is real.

You cannot tell which from the price. You can tell from what happens next. Penetration raises prices at renewal, once switching is hard. Predation waits for a rival to die. Genuine efficiency keeps cutting without tightening the terms.

MoviePass already ran that experiment. The FTC's 2021 complaint records what happened next: passwords invalidated for the seventy-five thousand heaviest users under a false fraud claim, a photograph-your-ticket step, undisclosed caps. No price rise was ever announced. The product just got harder to use, heaviest users first — which is rate limiting, and you already know that smell. Watch renewal terms, watch rate limits, watch the free tier, and stop trying to read a margin off a token rate.

Source: Brooke Group Ltd. v. Brown & Williamson Tobacco Corp., 509 U.S. 209 (1993), on the recoupment requirement in predatory-pricing claims.

Source: [FTC, 7 June 2021](https://www.ftc.gov/news-events/news/press-releases/2021/06/operators-moviepass-subscription-service-agree-settle-ftc-allegations-they-limited-usage-failed), settlement with MoviePass Inc., Helios and Matheson Analytics, Lowe and Farnsworth, on password invalidation, ticket verification and undisclosed caps. Allegations settled without monetary relief; both companies were already bankrupt.

Source: Rochet and Tirole (2003), Platform Competition in Two-Sided Markets, Journal of the European Economic Association, on cross-subsidy between sides of a market.

## 06:45 to 09:30: slide 4, Burn the boats

On screen:

> $250B incremental Azure services contracted by OpenAI · Microsoft, 28 Oct 2025
> More than $100B AWS commitment over ten years · Amazon, 20 Apr 2026
> Up to $200K AWS Activate credits · offer checked 5 Sep 2026

Three numbers everyone quotes. Microsoft announced in October 2025 that OpenAI contracted to purchase an incremental two hundred and fifty billion dollars of Azure services. Amazon announced in April 2026 that Anthropic committed more than a hundred billion over ten years. AWS Activate offers eligible startups up to two hundred thousand in credits.

Everyone reads these as evidence about cost. They are evidence about strategy, and Thomas Schelling gave us the word in 1960: a credible commitment. You deliberately destroy your own ability to back out, precisely so everyone else updates. Burn the boats. A ten-year contract you cannot walk away from discloses nothing about your margins. It signals that you intend to still be here, aimed at competitors and at nervous customers.

Which tells you something about the game underneath. Two well-funded players racing to acquire the same customers, both burning capital, neither able to stop first, is a war of attrition. In that model the price stays low for as long as both sides can pay to keep it there. Note who is not a player in that game. Somebody is buying your free tier, and it is not you. You are not a combatant. You are the terrain.

Source: [Microsoft, 28 Oct 2025](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/) · [Amazon, Apr 2026](https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai) · [AWS Activate, accessed 5 Sep 2026](https://aws.amazon.com/startups/credits/).

Source: Schelling (1960), The Strategy of Conflict, Harvard University Press. Nobel 2005.

Delivery: Recheck all three items the week of the talk. If a number has moved, the frame still works; say the new number. Specifically: Anthropic's IPO prospectus is expected late September 2026 and may disclose contract detail behind the $100B AWS commitment, so that figure or its framing can move. Do not confuse it with the adjacent Microsoft/OpenAI restructuring figures.

## 09:30 to 11:45: slide 5, Free parking was never free

On screen:

> The driver sees no meter, so demand looks infinite
> The cost moves into rents, prices, and land
> Word one: externality

Donald Shoup spent a career on the least glamorous subject in urban economics and was right about all of it. Cities required developers to build minimum parking. Nobody paid at the meter, so the cost went somewhere else: into rents, into retail prices, into land that became asphalt. And because drivers saw no price, demand looked infinite, so the minimums grew to match.

That is your first word: externality. A cost that is real, and paid, but not by the person making the decision. It does not vanish. It relocates, and it usually relocates somewhere you are not looking.

Then the environment reorganized around it. Buildings spread apart, so density fell. Formats that need a big lot won; the storefront that could not fit one never opened. Every apartment carried a parking space, paid for by tenants who do not drive. Transit lost, because everything was far apart and parking was free at the other end. Every single step was locally reasonable.

Source: Shoup (2005, updated 2011), The High Cost of Free Parking, American Planning Association. Also Shoup (2011), [Free parking or free markets](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/), ACCESS Magazine.

## 11:45 to 15:00: slide 6, Jevons, coal, and the extra lane

On screen:

> 1865: better engines burned more coal, not less
> Add a lane, get traffic. Elasticity near one.
> Spend = price × jobs × calls per job × tokens per call

In 1865 William Stanley Jevons noticed something that annoyed everyone. Steam engines had gotten dramatically more efficient, and Britain was burning far more coal than before, not less. Efficiency made coal useful for more things, so people used it for more things. That is the Jevons paradox, and it is word two.

The transport version is word three, induced demand. Add a lane to a congested highway and you get more traffic. Duranton and Turner measured it across US cities in 2011 and found the elasticity of driving with respect to lane-kilometres is roughly one. Build ten percent more road, get ten percent more driving. The congestion comes back.

So: your per-token price fell off a cliff and your bill went up. Everyone here has had that conversation with a CFO and lost it. You are not being gouged and you did nothing wrong. Spend is price times jobs times calls per job times tokens per call, and cheapness moved every term on the right. Epoch's data through 2025 shows the price of a fixed capability falling fast and very unevenly by task — which is real, and is also exactly the condition under which total spend rises.

Both things can be fine. A falling price and a growing bill coexist comfortably as long as customer value grows faster. That is the relationship to measure, and almost nobody measures it.

Source: Jevons (1865), The Coal Question, chapter VII. Duranton and Turner (2011), The Fundamental Law of Road Congestion, American Economic Review 101(6).

Source: Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025), [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends). Check for a newer edition before each delivery.

## 15:00 to 17:00: slide 7, Now do it to software

On screen:

> Density: a frontier call where a lookup would do
> Business mix: products viable only at today's rate
> Bundled rent: unlimited usage promised in a contract
> Small format: deterministic code loses the design review

Walk the same chain through your stack. Density: a frontier call where a cache, a regex, or a dictionary lookup would have done, because the call looked free. Longer context, more retries, more competing branches, frontier by default. Business mix: products whose unit economics only work at promotional rates, crowding out products that would have worked at any price. Bundled rent: unlimited-usage promises to customers, baked into a contract, priced against an input you do not control. And the small format: boring deterministic code losing the design review to "just ask the model."

I call it architectural obesity. It is not that any one of those calls is wrong. Redundancy is worth paying for, big context is worth paying for, three parallel attempts are sometimes exactly right. The failure is that nobody measured what the extra call bought, because at these prices nobody had to.

Story: A design review where "inference is basically free" ended the discussion.

Delivery: Ask for one show of hands: who has shipped a frontier call where a lookup would do? Then admit you have too.

## 17:00 to 19:45: slide 8, The lots are already built

On screen:

> Repealing the parking minimum does not remove the asphalt
> Word four: path dependence
> The test: try to remove one model call and count the hours

Here is the part that should worry you more than the price. Shoup won. Cities have been repealing parking minimums for a decade. The lots are still there. The businesses that could have opened on that land still did not open. The environment outlived the rule that produced it.

That is path dependence, word four: where you can get to depends on how you got here, and reversal costs more than the original decision did. Paul David made it famous with QWERTY in 1985, and I will be straight with you because it matters for how you use this — economists have fought about that example ever since, and Liebowitz and Margolis argued in 1990 that the evidence was thin. The concept survives. The canonical example is contested.

Which is instructive, because path dependence is very easy to assert and very hard to prove, including about your own codebase. So do not assert it. Measure it. Pick one model call in your product and try to remove it. Count the hours. That number is your lock-in, and it is the only version of this argument that will survive contact with your staff engineer.

Source: David (1985), Clio and the Economics of QWERTY, American Economic Review 75(2). Contested by Liebowitz and Margolis (1990), The Fable of the Keys, Journal of Law and Economics 33(1). Arthur (1989), Competing Technologies, Increasing Returns, and Lock-In by Historical Events, The Economic Journal 99(394).

## 19:45 to 22:15: slide 9, Whoever chooses is not whoever pays

On screen:

> Word five: moral hazard
> The architecture is chosen in a design review. The bill arrives 60 days later, somewhere else.
> Shoup's fix was never a ban. It was a meter.

Word five, and this one is about your org chart, not your vendor. Moral hazard: when the person deciding does not bear the cost, they make a different decision. Not a worse person. A different decision.

Everyone wants the MoviePass subscriber to be the villain. It was teenagers, parents home with kids, retirees on a Wednesday, handed a card that said one movie a day and using it one movie a day. That is not abuse, that is reading. When the caps landed they were ready to burn down a theater lobby — the wrong lobby, and a reasonable mistake. It was never their fault. They answered a price.

An engineer picks the architecture on a Tuesday. Finance sees it sixty days later, in a different building, in a line item attributed to nothing. Nobody there is behaving badly. The meter is invisible at the moment of choice, so consumption is not a moral failure, it is the equilibrium.

And notice what Shoup recommended. He never said ban parking. He said charge the right price and give the money back. The fix is not austerity. It is putting the number in front of the person choosing, at the moment they choose: cost per accepted outcome, in the design doc, next to the latency budget.

Source: Holmstrom (1979), Moral Hazard and Observability, Bell Journal of Economics 10(1), 74 to 91. Nobel 2016.

Delivery: Ask who can see a per-feature inference cost without filing a ticket. Very few hands. That is the slide.

## 22:15 to 24:45: slide 10, Doubling on a Tuesday

On screen:

> Cost per accepted outcome = total spend ÷ accepted jobs
> 75% accepted means you pay 1.33× sticker. 45% means 2.22×.
> A 30-point acceptance drop costs exactly what doubling every token price costs.

Before any dollar figure, define the denominator. An accepted outcome meets a rule you wrote down. An impressive answer that a human quietly repairs afterwards is not a success, it is a success plus a hidden salary. Count inference, tools, infrastructure and recovery. A blended token rate is not a unit economics model.

The fixture, synthetic and deliberately small: a thousand attempts a month, two cents of inference and one cent of everything else per attempt, seventy-five percent accepted. Thirty dollars, seven hundred and fifty accepted outcomes, four cents each.

Now the part worth remembering. Divide by the acceptance rate and you get a multiplier on your sticker price. Seventy-five percent acceptance means you are paying one and a third times the list price for every result you keep. Forty-five percent means two point two. Run those two numbers together: dropping from seventy-five to forty-five percent acceptance costs you exactly the same as every token in your stack doubling in price overnight. One of those is on the front page. The other one is a Tuesday.

Delivery: Do the division on stage. Thirty seconds: name your product's accepted outcome in one sentence. If that is hard, the economics conversation just found a product problem.

## 24:45 to 28:45: slide 11, Turn the dial

On screen:

> Sensitivity, not prediction.
> Multiply by your volume before you feel anything about it.

Read the one-times row, then the ten-times row. Then move the acceptance rate and watch it beat the price change, which is the thing nobody expects.

Then multiply by your own volume, because the table is meaningless without it. At a thousand attempts a month this entire talk is not worth an engineer's afternoon and you should go build features. At a million attempts a month the same four rows are a hiring plan. The most expensive mistake available in this room is not overspending on inference. It is spending three weeks optimizing a thirty-dollar bill because a conference talk made you anxious.

| Inference price | Monthly cost | Cost / accepted outcome |
| --- | --- | --- |
| 1× | $30 | $0.040 |
| 2× | $50 | $0.067 |
| 5× | $110 | $0.147 |
| 10× | $210 | $0.280 |

Delivery: Walk the 1× and 10× rows, then change the acceptance assumption. Ask which assumption the room would test before funding an optimization project.

## 28:45 to 32:00: slide 12, You are not shopping, you are contracting

On screen:

> Word six: asset specificity. Word seven: hold-up.
> An investment worth a lot inside this relationship and little outside it
> Your prompts, evals, fine-tunes, and that unlimited-usage clause

This is the slide I would keep if you cut every other one. Oliver Williamson won a Nobel in 2009 for working out what happens when two parties make investments that only pay off inside their relationship. He called it asset specificity, and the trouble it produces is called hold-up.

The shape is always the same. You make an investment that is worth a great deal here and very little anywhere else. That surplus, the part that exists only because you are locked in, is a prize, and at renewal your counterparty can reach for it. Nobody has to be a villain. It is simply what the structure permits, and rational parties do it.

Now inventory your specific assets. Prompts tuned against one model's quirks. An eval suite that only means anything against one provider's outputs. A fine-tune. A latency budget that assumes one serving stack. And the sharpest one, an unlimited-usage promise you made to your customers, priced against an input you do not control and cannot cap. That sentence is the entire MoviePass balance sheet. Every one of those is worth more inside the relationship than outside it.

So stop thinking of this as shopping, where the customer holds the power because they can leave. You are contracting, with a much better capitalized counterparty, and your architecture is the collateral. That reframe is the whole talk, and everything after this is just a way of reducing specificity or pricing the exposure.

## 32:00 to 35:00: slide 13, Reversible is a line item

On screen:

> Word eight: real option
> The option has value. It also has a premium: abstraction tax, eval upkeep, rehearsal time.
> Same project, different answer, depending on which world you are in

Everyone says "keep it reversible" like it is a personality trait. It is not, it is an option in the financial sense, and Dixit and Pindyck wrote the book on valuing flexibility under uncertainty. The right to switch providers gains value as the price gets less certain and your exposure grows. It also has a monthly premium: the abstraction tax, a second eval suite, rehearsal time, and a generic wrapper that hides real differences between models.

So do not argue about portability on vibes. Price it. Exposure is the three prices on the next slide times your volume; the premium is the engineering you would spend. Compare the two numbers.

Same for optimization. Take a router that halves inference per attempt at the same acceptance rate: in our fixture it saves a cent per attempt at sticker price and ten cents at ten times. At a million attempts a month, ten cents each is a hundred thousand dollars and you should have started yesterday. At a thousand attempts it is a hundred dollars — ten at today's price — and you should never do it. Identical project. The sweep tells you which world you live in, and a router that costs more to run than it saves is not better engineering.

Source: Dixit and Pindyck (1994), Investment Under Uncertainty, Princeton University Press.

## 35:00 to 37:15: slide 14, Three prices for the next design review

On screen:

> What we pay today · What we pay without the offer · What we can survive paying
> Record gross usage separately from credits
> Keep an acceptance suite · Rehearse one replacement · Price the portability

Three numbers, and if you take nothing else, take these. The effective rate you pay today. The gross rate with no promotional treatment, which is your exposure if the offer ends. And the highest rate at which this product still makes sense, which is the number nobody has ever calculated and everybody should. Sweep downward too, so you can cancel the optimization project when efficiency makes it pointless.

Four actions, and each one is one of the words. Record gross consumption separately from credits, so price and subsidy stop being the same number on your dashboard. Keep a small representative acceptance suite, because that is the strike test on your option. Rehearse one provider replacement before you need it, latency and recovery included, because that is how you reduce asset specificity from a slide into a fact. And put the estimated cost per accepted outcome in the design doc next to the latency budget, because that is the meter, and the meter is the fix for moral hazard.

Delivery: 45 seconds in pairs on the third price. Most rooms have never computed it and the silence is useful.

## 37:15 to 40:00: slide 15, Cheap intelligence changes incentives first

On screen:

> Externality · Induced demand · Jevons paradox · Path dependence
> Moral hazard · Credible commitment · Asset specificity · Real option
> Build for more than one price.

Back to MoviePass, and the ending that gets left off. The idea was never the problem. Cinema subscriptions exist today and work — AMC, Regal, Cinemark, millions of subscribers. The chains shipped the sustainable version because they owned the screens and never paid retail for their own tickets. The company that died promised unlimited access to something it bought at full price from somebody else. Ask which of those two you are.

So use the cheap input. It is genuinely great and I am not asking anyone to be miserable about it. Just understand what it encouraged you to build, and keep the expensive decisions reversible while you find out.

There are your eight words. Externality, because the cost moved rather than vanished. Induced demand and Jevons, because cheaper made you use more, not less. Path dependence, because the lots stay built. Moral hazard, because whoever chooses is not whoever pays. Credible commitment, because those contracts are moves in a game and not disclosures about it. Asset specificity, because your architecture is worth more here than anywhere else. And real option, because reversibility is something you buy, not something you feel.

Some low prices are temporary. Some are a preview of genuinely cheaper production. You do not have to know which. You have to measure outcomes and keep the big choices reversible either way.

Cheap intelligence changes incentives before it changes organizations.

Delivery: Say the last line slowly, then stop talking. For questions, jump back to the sweep table if this route kept slide 11.
