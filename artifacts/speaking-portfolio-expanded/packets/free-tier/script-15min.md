# Cry Me a Free Tier: 15-minute presenter script

Use slides 1, 3, 5, 6, 7, 10, 12, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Lightning route: the electricity question, the four explanations for a low price, parking, Jevons, the software map, the acceptance multiplier, the hold-up problem, and the eight words.

## 00:00 to 01:30: slide 1, Free electricity for a year

A startup gets free electricity for a year. What does it build? Sit with that for five seconds, because the answer is not "the same thing, but cheaper." It builds a different company. Now: what survives when the offer ends?

Swap electricity for inference and that is the whole talk. Here is my one disclaimer, and then I am done qualifying: nobody outside a provider knows its margins, I am not going to guess at one, and every dollar figure in my arithmetic is invented. What I do have is a hundred and fifty years of economists working on exactly this problem in coal, parking, highways and car factories, and they gave it names.

Story: The first time a bill, a quota, or a rate change broke an assumption in something you built.

Delivery: Take the five seconds. Actually take them. The silence is the slide.

Bridge: price, cost and value are three different numbers, and the gap between what you pay and what it is worth to you is why nobody is measuring.

## 01:30 to 03:30: slide 3, Why would anyone sell below cost?

There are four respectable explanations for a low price, and an engineer arguing about this in a meeting should be able to name all four.

Here is the useful part. You cannot distinguish these from the price. You can distinguish them from what happens next. Penetration predicts prices rise at renewal, after switching gets hard. Predation predicts a rival disappears and then prices rise. Genuine efficiency predicts prices keep falling without anyone tightening the terms. So watch renewal terms, watch rate limits, watch what happens to the free tier, and stop trying to read a margin off a token rate.

Source: Brooke Group Ltd. v. Brown & Williamson Tobacco Corp., 509 U.S. 209 (1993), on the recoupment requirement in predatory-pricing claims.

Source: Rochet and Tirole (2003), Platform Competition in Two-Sided Markets, Journal of the European Economic Association, on cross-subsidy between sides of a market.

## 03:30 to 05:00: slide 5, Free parking was never free

Donald Shoup spent a career on the least glamorous subject in urban economics and was right about all of it. Cities required developers to build minimum parking. Nobody paid at the meter, so the cost went somewhere else: into rents, into retail prices, into land that became asphalt. And because drivers saw no price, demand looked infinite, so the minimums grew to match.

That is your first word: externality. A cost that is real, and paid, but not by the person making the decision. It does not vanish. It relocates, and it usually relocates somewhere you are not looking.

Source: Shoup (2005, updated 2011), The High Cost of Free Parking, American Planning Association. Also Shoup (2011), [Free parking or free markets](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/), ACCESS Magazine.

## 05:00 to 07:00: slide 6, Jevons, coal, and the extra lane

In 1865 William Stanley Jevons noticed something that annoyed everyone. Steam engines had gotten dramatically more efficient, and Britain was burning far more coal than before, not less. Efficiency made coal useful for more things, so people used it for more things. That is the Jevons paradox, and it is word two.

The transport version is word three, induced demand. Add a lane to a congested highway and you get more traffic. Duranton and Turner measured it across US cities in 2011 and found the elasticity of driving with respect to lane-kilometres is roughly one. Build ten percent more road, get ten percent more driving. The congestion comes back.

Both things can be fine. A falling price and a growing bill coexist comfortably as long as customer value grows faster. That is the relationship to measure, and almost nobody measures it.

Source: Jevons (1865), The Coal Question, chapter VII. Duranton and Turner (2011), The Fundamental Law of Road Congestion, American Economic Review 101(6).

Source: Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025), [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends). Check for a newer edition before each delivery.

## 07:00 to 09:30: slide 7, Now do it to software

Walk the same chain through your stack. Density: a frontier call where a cache, a regex, or a dictionary lookup would have done, because the call looked free. Longer context, more retries, more competing branches, frontier by default. Business mix: products whose unit economics only work at promotional rates, crowding out products that would have worked at any price. Bundled rent: unlimited-usage promises to customers, baked into a contract, priced against an input you do not control. And the small format: boring deterministic code losing the design review to "just ask the model."

I call it architectural obesity. It is not that any one of those calls is wrong. Redundancy is worth paying for, big context is worth paying for, three parallel attempts are sometimes exactly right. The failure is that nobody measured what the extra call bought, because at these prices nobody had to.

Story: A design review where "inference is basically free" ended the discussion.

Delivery: Ask for one show of hands: who has shipped a frontier call where a lookup would do? Then admit you have too.

Bridge: the lots stay built, and whoever chooses the architecture is not whoever pays the bill sixty days later.

## 09:30 to 11:30: slide 10, Your acceptance rate is a price multiplier

Before any dollar figure, define the denominator. An accepted outcome meets a rule you wrote down. An impressive answer that a human quietly repairs afterwards is not a success, it is a success plus a hidden salary. Count inference, tools, infrastructure and recovery. A blended token rate is not a unit economics model.

Now the part worth remembering. Divide by the acceptance rate and you get a multiplier on your sticker price. Seventy-five percent acceptance means you are paying one and a third times the list price for every result you keep. Forty-five percent means two point two. Run those two numbers together: dropping from seventy-five to forty-five percent acceptance costs you exactly the same as every token in your stack doubling in price overnight. One of those is on the front page. The other one is a Tuesday.

Delivery: Do the division on stage. Thirty seconds: name your product's accepted outcome in one sentence. If that is hard, the economics conversation just found a product problem.

Bridge: run the sweep at one, two, five and ten times price, then multiply by your own volume before you feel anything about it.

## 11:30 to 13:30: slide 12, You are not shopping, you are contracting

This is the slide I would keep if you cut every other one. Oliver Williamson won a Nobel in 2009 for working out what happens when two parties make investments that only pay off inside their relationship. He called it asset specificity, and the trouble it produces is called hold-up.

The shape is always the same. You make an investment that is worth a great deal here and very little anywhere else. That surplus, the part that exists only because you are locked in, is a prize, and at renewal your counterparty can reach for it. Nobody has to be a villain. It is simply what the structure permits, and rational parties do it.

So stop thinking of this as shopping, where the customer holds the power because they can leave. You are contracting, with a much better capitalized counterparty, and your architecture is the collateral. That reframe is the whole talk, and everything on the next three slides is just a way of reducing specificity or pricing the exposure.

Bridge: so price reversibility as the option it is, and bring three prices to the design review: today, without the offer, and the most you could survive.

## 13:30 to 15:00: slide 15, Cheap intelligence changes incentives first

Back to the electricity. Use the cheap input. It is genuinely great and I am not asking anyone to be miserable about it. Just understand what it encouraged you to build, and keep the expensive decisions reversible while you find out.

There are your eight words. Externality, because the cost moved rather than vanished. Induced demand and Jevons, because cheaper made you use more, not less. Path dependence, because the lots stay built. Moral hazard, because whoever chooses is not whoever pays. Credible commitment, because those contracts are moves in a game and not disclosures about it. Asset specificity, because your architecture is worth more here than anywhere else. And real option, because reversibility is something you buy, not something you feel.

Some low prices are temporary. Some are a preview of genuinely cheaper production. You do not have to know which. You have to measure outcomes and keep the big choices reversible either way.

Cheap intelligence changes incentives before it changes organizations. Leave the table up.

Delivery: Say the last line slowly. Leave the sweep table on screen for questions.
