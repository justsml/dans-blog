# Buy Me a Free Tier: bullet outline

What the cheap input taught your architecture to expect, in eight words from economics and game theory.

Rehearsal sheet for [the 40-minute outline](outline-40min.md). 15 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](adaptation-15min.md) · [30](adaptation-30min.md).

## Spine

1. **Free electricity for a year** — 00:00 · warm · 02:15
2. **Four boxes, one invoice** — 02:15 · warm · 01:45
3. **Why would anyone sell below cost?** — 04:00 · steady · 02:45
4. **Burn the boats** — 06:45 · build · 02:45
5. **Free parking was never free** — 09:30 · build · 02:15
6. **Jevons, coal, and the extra lane** — 11:45 · build · 03:15
7. **Now do it to software** — 15:00 · build · 02:00
8. **The lots are already built** — 17:00 · steady · 02:45
9. **Whoever chooses is not whoever pays** — 19:45 · steady · 02:30
10. **Doubling on a Tuesday** — 22:15 · steady · 02:30
11. **Turn the dial** — 24:45 · peak · 04:00
12. **You are not shopping, you are contracting** — 28:45 · peak · 03:15
13. **Reversible is a line item** — 32:00 · build · 03:00
14. **Three prices for the next design review** — 35:00 · land · 02:15
15. **Cheap intelligence changes incentives first** — 37:15 · land · 02:45

## Slides

### 1. Free electricity for a year

00:00–02:15 · warm · 02:15

> A startup gets free electricity for a year.
> What does it build? What survives when the offer ends?

- A startup gets free electricity for a year.
- Swap electricity for inference and that is the whole talk.
- That is what you are getting today. Eight words.
- Story — The first time a bill, a quota, or a rate change broke an assumption in something you built.
- Do — Take the five seconds. Actually take them. The silence is the slide.

### 2. Four boxes, one invoice

02:15–04:00 · warm · 01:45

> Price paid · Resources consumed · Cost allocated · Value delivered
> The gap between the last two is why nobody is measuring

- Four boxes. The invoice is the first one.
- The gap between what you pay and what you would have been willing to pay has a name: consumer surplus.
- Which of these four does your system actually measure, and which does it assume?
- Do — Draw the four boxes with your hands. Ask for a show of hands on box two. Count them; it is usually a third of the room.

### 3. Why would anyone sell below cost?

04:00–06:45 · steady · 02:45

> Penetration pricing · Loss leader in a bundle · Predation · It is genuinely cheap
> The price cannot tell you which. What happens next can.

- There are four respectable explanations for a low price, and an engineer arguing about this in a meeting should be able to name all four.
- Penetration pricing: buy the market now, raise later.
- Here is the useful part. You cannot distinguish these from the price.
- Source — Brooke Group Ltd. v. Brown & Williamson Tobacco Corp., 509 U.S. 209 (1993), on the recoupment requirement in predatory-pricing claims.
- Source — Rochet and Tirole (2003), Platform Competition in Two-Sided Markets, Journal of the European Economic Association, on cross-subsidy between sides of a market.

### 4. Burn the boats

06:45–09:30 · build · 02:45

> $250B incremental Azure services contracted by OpenAI · Microsoft, 28 Oct 2025
> More than $100B AWS commitment over ten years · Amazon, 20 Apr 2026
> Up to $200K AWS Activate credits · offer checked 5 Sep 2026

- Three numbers everyone quotes. Microsoft announced in October 2025 that OpenAI contracted to purchase an incremental two hundred and fifty billion dollars of Azure services.
- Everyone reads these as evidence about cost.
- Which tells you something about the game underneath.
- Do — Recheck all three items the week of the talk. If a number has moved, the frame still works; say the new number. Specifically: Anthropic's IPO prospectus is expected late September 2026 and may disclose contract detail behind the $100B AWS commitment, so that figure or its framing can move. Do not confuse it with the adjacent Microsoft/OpenAI restructuring figures.
- Source — [Microsoft, 28 Oct 2025](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/) · [Amazon, Apr 2026](https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai) · [AWS Activate, accessed 5 Sep 2026](https://aws.amazon.com/startups/credits/).
- Source — Schelling (1960), The Strategy of Conflict, Harvard University Press. Nobel 2005.

### 5. Free parking was never free

09:30–11:45 · build · 02:15

> The driver sees no meter, so demand looks infinite
> The cost moves into rents, prices, and land
> Word one: externality

- Donald Shoup spent a career on the least glamorous subject in urban economics and was right about all of it.
- That is your first word: externality. A cost that is real, and paid, but not by the person making the decision.
- Then the environment reorganized around it.
- Source — Shoup (2005, updated 2011), The High Cost of Free Parking, American Planning Association. Also Shoup (2011), [Free parking or free markets](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/), ACCESS Magazine.

### 6. Jevons, coal, and the extra lane

11:45–15:00 · build · 03:15

> 1865: better engines burned more coal, not less
> Add a lane, get traffic. Elasticity near one.
> Spend = price × jobs × calls per job × tokens per call

- In 1865 William Stanley Jevons noticed something that annoyed everyone.
- The transport version is word three, induced demand.
- So: your per-token price fell off a cliff and your bill went up.
- Both things can be fine. A falling price and a growing bill coexist comfortably as long as customer value grows faster.
- Source — Jevons (1865), The Coal Question, chapter VII. Duranton and Turner (2011), The Fundamental Law of Road Congestion, American Economic Review 101(6).
- Source — Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025), [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends). Check for a newer edition before each delivery.

### 7. Now do it to software

15:00–17:00 · build · 02:00

> Density: a frontier call where a lookup would do
> Business mix: products viable only at today's rate
> Bundled rent: unlimited usage promised in a contract
> Small format: deterministic code loses the design review

- Walk the same chain through your stack. Density: a frontier call where a cache, a regex, or a dictionary lookup would have done, because the call looked free.
- I call it architectural obesity. It is not that any one of those calls is wrong.
- Story — A design review where "inference is basically free" ended the discussion.
- Do — Ask for one show of hands: who has shipped a frontier call where a lookup would do? Then admit you have too.

### 8. The lots are already built

17:00–19:45 · steady · 02:45

> Repealing the parking minimum does not remove the asphalt
> Word four: path dependence
> The test: try to remove one model call and count the hours

- Here is the part that should worry you more than the price.
- That is path dependence, word four: where you can get to depends on how you got here, and reversal costs more than the original decision did.
- Which is instructive, because path dependence is very easy to assert and very hard to prove, including about your own codebase.
- Source — David (1985), Clio and the Economics of QWERTY, American Economic Review 75(2). Contested by Liebowitz and Margolis (1990), The Fable of the Keys, Journal of Law and Economics 33(1). Arthur (1989), Competing Technologies, Increasing Returns, and Lock-In by Historical Events, The Economic Journal 99(394).

### 9. Whoever chooses is not whoever pays

19:45–22:15 · steady · 02:30

> Word five: moral hazard
> The architecture is chosen in a design review. The bill arrives 60 days later, somewhere else.
> Shoup's fix was never a ban. It was a meter.

- Word five, and this one is about your org chart, not your vendor.
- An engineer picks the architecture in a design review on a Tuesday.
- And notice what Shoup actually recommended, because everyone gets this wrong.
- Do — Ask who can see a per-feature inference cost without filing a ticket. Very few hands. That is the slide.
- Source — Holmstrom (1979), Moral Hazard and Observability, Bell Journal of Economics 10(1), 74 to 91. Nobel 2016.

### 10. Doubling on a Tuesday

22:15–24:45 · steady · 02:30

> Cost per accepted outcome = total spend ÷ accepted jobs
> 75% accepted means you pay 1.33× sticker. 45% means 2.22×.
> A 30-point acceptance drop costs exactly what doubling every token price costs.

- Before any dollar figure, define the denominator.
- The fixture, synthetic and deliberately small: a thousand attempts a month, two cents of inference and one cent of everything else per attempt, seventy-five percent accepted.
- Now the part worth remembering. Divide by the acceptance rate and you get a multiplier on your sticker price.
- Do — Do the division on stage. Thirty seconds: name your product's accepted outcome in one sentence. If that is hard, the economics conversation just found a product problem.

### 11. Turn the dial

24:45–28:45 · peak · 04:00

> Sensitivity, not prediction.
> Multiply by your volume before you feel anything about it.

- Read the one-times row, then the ten-times row.
- Then multiply by your own volume, because the table is meaningless without it.
- Table — Inference price · Monthly cost · Cost / accepted outcome, 4 rows
- Do — Runbook section 4. Two-minute compression: the 1× and 10× rows only. Ask for 45 seconds: which assumption would you attack first before funding an optimization project?

### 12. You are not shopping, you are contracting

28:45–32:00 · peak · 03:15

> Word six: asset specificity. Word seven: hold-up.
> An investment worth a lot inside this relationship and little outside it
> Your prompts, evals, fine-tunes, and that unlimited-usage clause

- This is the slide I would keep if you cut every other one.
- The shape is always the same. You make an investment that is worth a great deal here and very little anywhere else.
- Now inventory your specific assets. Prompts tuned against one model's quirks.
- So stop thinking of this as shopping, where the customer holds the power because they can leave.

### 13. Reversible is a line item

32:00–35:00 · build · 03:00

> Word eight: real option
> The option has value. It also has a premium: abstraction tax, eval upkeep, rehearsal time.
> Same project, different answer, depending on which world you are in

- Everyone says "keep it reversible" like it is a personality trait.
- So do not argue about portability on vibes.
- Same for optimization. Take a router that halves inference per attempt at the same acceptance rate: in our fixture it saves a cent per attempt at sticker price and ten cents at ten times.
- Source — Dixit and Pindyck (1994), Investment Under Uncertainty, Princeton University Press.

### 14. Three prices for the next design review

35:00–37:15 · land · 02:15

> What we pay today · What we pay without the offer · What we can survive paying
> Record gross usage separately from credits
> Keep an acceptance suite · Rehearse one replacement · Price the portability

- Three numbers, and if you take nothing else, take these.
- Four actions, and each one is one of the words.
- Do — 45 seconds in pairs on the third price. Most rooms have never computed it and the silence is useful.

### 15. Cheap intelligence changes incentives first

37:15–40:00 · land · 02:45

> Externality · Induced demand · Jevons paradox · Path dependence
> Moral hazard · Credible commitment · Asset specificity · Real option
> Build for more than one price.

- Back to the electricity. Use the cheap input.
- There are your eight words. Externality, because the cost moved rather than vanished.
- Some low prices are temporary. Some are a preview of genuinely cheaper production.
- Cheap intelligence changes incentives before it changes organizations.
- Do — Say the last line slowly, then stop talking. For questions, jump back to the sweep table if this route kept slide 11.
