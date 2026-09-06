# Cry Me a Free Tier: 30-minute presenter script

Use slides 1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Slides 4, 8 and 13 are cut with bridges. Keep the acceptance-multiplier arithmetic and the volume caveat in the demo.

## 00:00 to 02:00: slide 1, Free electricity for a year

A startup gets free electricity for a year. What does it build? Sit with that for five seconds, because the answer is not "the same thing, but cheaper." It builds a different company. Now: what survives when the offer ends?

Swap electricity for inference and that is the whole talk. Here is my one disclaimer, and then I am done qualifying: nobody outside a provider knows its margins, I am not going to guess at one, and every dollar figure in my arithmetic is invented. What I do have is a hundred and fifty years of economists working on exactly this problem in coal, parking, highways and car factories, and they gave it names.

That is what you are getting today. Eight words. Engineers lose this argument in budget meetings because the best we can say is "it feels wasteful," and finance says "the bill looks fine." These eight words are how you say it so it lands.

Story: The first time a bill, a quota, or a rate change broke an assumption in something you built.

Delivery: Take the five seconds. Actually take them. The silence is the slide.

## 02:00 to 04:00: slide 2, Price, cost, and value are three different numbers

Four boxes. The invoice is the first one. It tells you what you paid and nothing about utilization, depreciation, amortized training, or margin. The second box is what the machine actually burned. The third is how a provider chooses to allocate that internally, which you will never see. The fourth is what the customer got.

The gap between what you pay and what you would have been willing to pay has a name: consumer surplus. Yours is enormous right now. That is the pleasant explanation for why nobody in your organization is measuring any of this. When something is dramatically cheaper than it is worth to you, measuring it is not worth the afternoon.

Which of these four does your system actually measure, and which does it assume?

Delivery: Draw the four boxes with your hands. Ask for a show of hands on box two. Count them; it is usually a third of the room.

## 04:00 to 07:00: slide 3, Why would anyone sell below cost?

There are four respectable explanations for a low price, and an engineer arguing about this in a meeting should be able to name all four.

Penetration pricing: buy the market now, raise later. Standard, legal, taught in every business school. Loss leader in a bundle: the cheap thing funds the expensive thing next to it, which is what a two-sided market does for a living. Predation: below cost specifically to remove rivals. In US law that is not a vibe, it is a test. Brooke Group, 1993: you need below-cost pricing and a dangerous probability of recoupment. And the fourth explanation, the one that keeps me honest: it is genuinely cheap, and getting cheaper, because the engineering is real.

Here is the useful part. You cannot distinguish these from the price. You can distinguish them from what happens next. Penetration predicts prices rise at renewal, after switching gets hard. Predation predicts a rival disappears and then prices rise. Genuine efficiency predicts prices keep falling without anyone tightening the terms. So watch renewal terms, watch rate limits, watch what happens to the free tier, and stop trying to read a margin off a token rate.

Source: Brooke Group Ltd. v. Brown & Williamson Tobacco Corp., 509 U.S. 209 (1993), on the recoupment requirement in predatory-pricing claims.

Source: Rochet and Tirole (2003), Platform Competition in Two-Sided Markets, Journal of the European Economic Association, on cross-subsidy between sides of a market.

Bridge: the enormous compute commitments everyone quotes are credible commitments in Schelling's sense, moves in a war of attrition, not disclosures about cost.

## 07:00 to 09:00: slide 5, Free parking was never free

Donald Shoup spent a career on the least glamorous subject in urban economics and was right about all of it. Cities required developers to build minimum parking. Nobody paid at the meter, so the cost went somewhere else: into rents, into retail prices, into land that became asphalt. And because drivers saw no price, demand looked infinite, so the minimums grew to match.

That is your first word: externality. A cost that is real, and paid, but not by the person making the decision. It does not vanish. It relocates, and it usually relocates somewhere you are not looking.

Then the environment reorganized around it. Buildings spread apart, so density fell. Formats that need a big lot won; the storefront that could not fit one never opened. Every apartment carried a parking space, paid for by tenants who do not drive. Transit lost, because everything was far apart and parking was free at the other end. Every single step was locally reasonable.

Source: Shoup (2005, updated 2011), The High Cost of Free Parking, American Planning Association. Also Shoup (2011), [Free parking or free markets](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/), ACCESS Magazine.

## 09:00 to 11:30: slide 6, Jevons, coal, and the extra lane

In 1865 William Stanley Jevons noticed something that annoyed everyone. Steam engines had gotten dramatically more efficient, and Britain was burning far more coal than before, not less. Efficiency made coal useful for more things, so people used it for more things. That is the Jevons paradox, and it is word two.

The transport version is word three, induced demand. Add a lane to a congested highway and you get more traffic. Duranton and Turner measured it across US cities in 2011 and found the elasticity of driving with respect to lane-kilometres is roughly one. Build ten percent more road, get ten percent more driving. The congestion comes back.

So: your per-token price has fallen off a cliff over the last few years, and your bill went up. Everyone in this room has had that conversation with a CFO and lost it. You are not being gouged and you did not do anything wrong. Spend is price times consumption, and consumption is jobs times calls per job times tokens per call. Cheapness moved every term on the right. Epoch's data through 2025 shows the price of a fixed capability falling fast and very unevenly by task, which is real and worth knowing, and is also exactly the condition under which total spend rises.

Source: Jevons (1865), The Coal Question, chapter VII. Duranton and Turner (2011), The Fundamental Law of Road Congestion, American Economic Review 101(6).

Source: Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025), [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends). Check for a newer edition before each delivery.

## 11:30 to 14:30: slide 7, Now do it to software

Walk the same chain through your stack. Density: a frontier call where a cache, a regex, or a dictionary lookup would have done, because the call looked free. Longer context, more retries, more competing branches, frontier by default. Business mix: products whose unit economics only work at promotional rates, crowding out products that would have worked at any price. Bundled rent: unlimited-usage promises to customers, baked into a contract, priced against an input you do not control. And the small format: boring deterministic code losing the design review to "just ask the model."

I call it architectural obesity. It is not that any one of those calls is wrong. Redundancy is worth paying for, big context is worth paying for, three parallel attempts are sometimes exactly right. The failure is that nobody measured what the extra call bought, because at these prices nobody had to.

Story: A design review where "inference is basically free" ended the discussion.

Delivery: Ask for one show of hands: who has shipped a frontier call where a lookup would do? Then admit you have too.

Bridge: and the lots stay built. Repealing a parking minimum does not remove asphalt, which is path dependence; measure yours by trying to remove one model call and counting the hours.

## 14:30 to 16:30: slide 9, Whoever chooses is not whoever pays

Word five, and this one is about your org chart, not your vendor. Moral hazard: when the person making a decision does not bear its cost, they make a different decision. Not a worse person. A different decision.

An engineer picks the architecture in a design review on a Tuesday. Finance sees the consequence in an aggregated line item sixty days later, in a different building, attributed to nothing in particular. Nobody in that loop is behaving badly. The meter is invisible at the moment of choice, so consumption is not a moral failure, it is the equilibrium. This is the same structure as the parking lot, running inside your company.

And notice what Shoup actually recommended, because everyone gets this wrong. He never said ban parking. He said charge the right price for it, and give the money back to the neighborhood. Same here. The fix is not austerity and it is not a policy forbidding the model. It is putting the number in front of the person making the choice, at the moment they make it. Estimated cost per accepted outcome, in the design doc, next to the latency budget.

Delivery: Ask who can see a per-feature inference cost without filing a ticket. Very few hands. That is the slide.

## 16:30 to 19:00: slide 10, Your acceptance rate is a price multiplier

Before any dollar figure, define the denominator. An accepted outcome meets a rule you wrote down. An impressive answer that a human quietly repairs afterwards is not a success, it is a success plus a hidden salary. Count inference, tools, infrastructure and recovery. A blended token rate is not a unit economics model.

The fixture, synthetic and deliberately small: a thousand attempts a month, two cents of inference and one cent of everything else per attempt, seventy-five percent accepted. Thirty dollars, seven hundred and fifty accepted outcomes, four cents each.

Now the part worth remembering. Divide by the acceptance rate and you get a multiplier on your sticker price. Seventy-five percent acceptance means you are paying one and a third times the list price for every result you keep. Forty-five percent means two point two. Run those two numbers together: dropping from seventy-five to forty-five percent acceptance costs you exactly the same as every token in your stack doubling in price overnight. One of those is on the front page. The other one is a Tuesday.

Delivery: Do the division on stage. Thirty seconds: name your product's accepted outcome in one sentence. If that is hard, the economics conversation just found a product problem.

## 19:00 to 23:00: slide 11, Demo: change one assumption, watch the unit cost

Read the one-times row, then the ten-times row. Then move the acceptance rate and watch it beat the price change, which is the thing nobody expects.

Then multiply by your own volume, because the table is meaningless without it. At a thousand attempts a month this entire talk is not worth an engineer's afternoon and you should go build features. At a million attempts a month the same four rows are a hiring plan. The most expensive mistake available in this room is not overspending on inference. It is spending three weeks optimizing a thirty-dollar bill because a conference talk made you anxious.

| Inference price | Monthly cost | Cost / accepted outcome |
| --- | --- | --- |
| 1× | $30 | $0.040 |
| 2× | $50 | $0.067 |
| 5× | $110 | $0.147 |
| 10× | $210 | $0.280 |

Delivery: Runbook section 4. Two-minute compression: the 1× and 10× rows only. Ask for 45 seconds: which assumption would you attack first before funding an optimization project?

## 23:00 to 26:00: slide 12, You are not shopping, you are contracting

This is the slide I would keep if you cut every other one. Oliver Williamson won a Nobel in 2009 for working out what happens when two parties make investments that only pay off inside their relationship. He called it asset specificity, and the trouble it produces is called hold-up.

The shape is always the same. You make an investment that is worth a great deal here and very little anywhere else. That surplus, the part that exists only because you are locked in, is a prize, and at renewal your counterparty can reach for it. Nobody has to be a villain. It is simply what the structure permits, and rational parties do it.

Now inventory your specific assets. Prompts tuned against one model's quirks. An eval suite that only means anything against one provider's outputs. A fine-tune. A latency budget that assumes one serving stack. And the sharpest one, an unlimited-usage promise you made to your customers, priced against an input you do not control and cannot cap. Every one of those is worth more inside the relationship than outside it.

So stop thinking of this as shopping, where the customer holds the power because they can leave. You are contracting, with a much better capitalized counterparty, and your architecture is the collateral. That reframe is the whole talk, and everything on the next three slides is just a way of reducing specificity or pricing the exposure.

Bridge: reversibility is a real option with a value and a premium, so price it against your exposure instead of arguing about it on vibes.

## 26:00 to 28:30: slide 14, Three prices for the next design review

Three numbers, and if you take nothing else, take these. The effective rate you pay today. The gross rate with no promotional treatment, which is your exposure if the offer ends. And the highest rate at which this product still makes sense, which is the number nobody has ever calculated and everybody should. Sweep downward too, so you can cancel the optimization project when efficiency makes it pointless.

Four actions, and each one is one of the words. Record gross consumption separately from credits, so price and subsidy stop being the same number on your dashboard. Keep a small representative acceptance suite, because that is the strike test on your option. Rehearse one provider replacement before you need it, latency and recovery included, because that is how you reduce asset specificity from a slide into a fact. And put the estimated cost per accepted outcome in the design doc next to the latency budget, because that is the meter, and the meter is the fix for moral hazard.

Delivery: 45 seconds in pairs on the third price. Most rooms have never computed it and the silence is useful.

## 28:30 to 30:00: slide 15, Cheap intelligence changes incentives first

Back to the electricity. Use the cheap input. It is genuinely great and I am not asking anyone to be miserable about it. Just understand what it encouraged you to build, and keep the expensive decisions reversible while you find out.

There are your eight words. Externality, because the cost moved rather than vanished. Induced demand and Jevons, because cheaper made you use more, not less. Path dependence, because the lots stay built. Moral hazard, because whoever chooses is not whoever pays. Credible commitment, because those contracts are moves in a game and not disclosures about it. Asset specificity, because your architecture is worth more here than anywhere else. And real option, because reversibility is something you buy, not something you feel.

Some low prices are temporary. Some are a preview of genuinely cheaper production. You do not have to know which. You have to measure outcomes and keep the big choices reversible either way.

Cheap intelligence changes incentives before it changes organizations. Leave the table up.

Delivery: Say the last line slowly. Leave the sweep table on screen for questions.
