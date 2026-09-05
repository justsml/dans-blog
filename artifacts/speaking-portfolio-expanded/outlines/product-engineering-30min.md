# The Future of Product Engineering: The Agent Roster

30 minutes · 11 slides

**In one line.** Conway's law now includes your agents, so draw the roster on purpose: one agent per function, one owner per agent, guards where risk spikes.

**Arc.** Warm open on Conway's law and the scale spectrum, steady through the roster and the two research agents, build through prioritization, the wider loop, and targeted beta enrollment, steady through the guards, peak at the demo, land on self-reporting experiments and Conway read forward.

**Scope.** A proposed operating model, not a deployment report. Synthetic demo numbers show guard behavior, not significance. Tools named in the notes are examples. Say it once on slide 1.

**Demo.** [Runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering) · [Kit](../demos/index.html). Fallback: the table on slide 9.

**Before each delivery.** Fill the `Story` lines.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Conway's law still applies

0:00–2:30 · warm

<!-- image: an org chart drawn as boxes and lines on the left, a system architecture diagram on the right with the identical shape, a thin mirror line between them, dark slate background, amber accent on the mirror line, flat vector, no text -->

> Your code reflects your organization. Your organization reflects your code.
> In the agentic era, both start reflecting your agents.

Conway, 1968: a system copies the communication structure of the organization that built it. Language models do not repeal that. The organization now includes agents, and their shape will show up in the product whether or not you planned it.

Scope, once: proposed operating model, synthetic demo numbers, guard behavior only, example tools not endorsements.

Source: Conway (1968), [How Do Committees Invent?](http://www.melconway.com/Home/Committees_Paper.html)

Story: [a system whose architecture you could read straight off the org chart]

## 2. The scale spectrum, and who gets rewarded

2:30–5:00 · warm

<!-- image: a long horizontal slider bar, at the left end a tiny huddle of five figures around one laptop, at the right end a large boardroom table with many chairs and a stack of binders, the slider handle sitting in the middle, dark slate background, amber accent on the slider handle, flat vector, no text -->

> Thousands of employees: change procedure, risk and reward analysis, prioritization rubric
> Fewer than five people: no committee, ship the feature
> Every process on this range will adapt. Automate the right things, or trade taste for vibes.

At one end, a company with millions of customers and the procedures it should have. At the other, a startup that ships without a meeting. Every process anywhere on that range is about to adapt to agents.

The thesis: teams that automate the right things with taste intact will be rewarded richly. Teams that hand judgment to whatever the model says will suffer, and the suffering arrives later than the speed does.

Ask (30 s): where on the slider is your team, and what is the heaviest process you run?

## 3. One agent per function, one owner per agent

5:00–7:30 · steady

<!-- image: a row of six desks each with a small robot seated at it, behind each desk a standing human figure with one hand resting on the robot's shoulder, dark slate background, amber accent on the human hands, flat vector, no text -->

> Mimic each function of the product group as an agent
> Map each agent to the person who owns that responsibility
> Owning the function means owning the agent

The craft: mimic each function you have, or would have at scale, as an agent, then map every agent to a person. The person owns the instructions, the inputs, the limits, and the mistakes.

This is Conway's law used deliberately. A five-person startup gets the research and analytics functions it could never staff. A large company gets the same functions with the accountability lines it already has. The next four slides walk the roster in the order work flows.

## 4. Two research agents: one looks out, one looks in

7:30–10:30 · steady

<!-- image: a small robot at a periscope looking over a wall at a distant skyline on the left, a second robot on the right at a funnel where envelopes and speech bubbles pour in and a neat stack of cards comes out, dark slate background, amber accent on the periscope lens and the card stack, flat vector, no text -->

> Outward: competitors, the landscape, people talking about you, features others have
> Inward: support tickets, interviews, reviews, in-app feedback, clustered and linked to customers
> Both feed a daily or weekly review where the team decides what goes to the top

The product research agent crawls competitors and mentions with browser tools you own. Marketing platforms already scrape social media; ownership means you decide what it looks at and keeps.

The feedback agent ingests what users already tell you, clusters it, and links each cluster to the customers who said it. Then a ritual: a daily or weekly review where product and leadership argue over what belongs at the top. Keep that meeting. It is where taste is exercised in public, and it is the first guard.

Story: [a feedback cluster that changed what the team built that quarter]

## 5. Prioritization needs a rethink, because estimation is gone

10:30–12:30 · build

<!-- image: a planning poker deck of cards fanned out on a table with a thin layer of dust on it, beside it a single clean card with a question mark, dark slate background, amber accent on the clean card, flat vector, no text -->

> Effort used to be half the rubric
> Nobody t-shirt sizes anymore; points, if they exist, are assigned by an agent
> What is left: evidence for the idea, risk of the change, effect on the product promise

I have not heard an engineering team discuss level of effort on a ticket in months. Effort is leaving the rubric. Choosing what to ship is not. The rubric moves to evidence, risk, and the product promise. The rest of the talk produces the evidence cheaply and handles the risk explicitly.

## 6. Gap analysis on your product, then the rest of the life cycle

12:30–14:30 · build

<!-- image: a magnifying glass over a phone screen revealing a tangle of misaligned buttons under the lens, beside it a set of pipes joining a bar chart tank, a shopping cart tank, a customer card tank, and a large warehouse tank with a small robot at the valve, dark slate background, amber accent on the valve, flat vector, no text -->

> A general agent walks the product as a new user and flags usability defects and hierarchy fixes
> Connect agents to analytics, engagement, customer records, and the warehouse
> Ask where the opportunities are; draft ads and videos into a proposal queue or auto-test them

Point an agent at a build with a browser and have it walk onboarding against the competitor brief. Cheap to produce, cheap to reject, which is what you want in a proposal pipeline.

Then widen the loop past product and engineering. Connect the marketing and sales agents to analytics, the ecommerce platform or customer records, and the warehouse, and ask them to find opportunities. Same shape as the feature pipeline: propose cheaply, test narrowly, escalate before anything broad.

## 7. Test features the way you test ads: targeted beta enrollment

14:30–17:00 · build

<!-- image: a cluster of five figures highlighted among a crowd of grey figures, a dotted line from the cluster to a small door marked only with a toggle switch, one figure stepping through, dark slate background, amber accent on the toggle switch, flat vector, no text -->

> This idea came from a cluster of feedback
> Find users similar to that cluster and invite them to opt in
> Enroll them in a feature flag; collect narrow feedback; widen only when owner and evidence agree

A/B test where traffic allows. Where it does not, use provenance: the idea came from a cluster of customers, so find users like them and push an opt-in invitation with honest beta language and an easy way out. Accepting drops them into a feature flag. A narrow, automatic collection loop that starts as a safety check on a small subset.

Even a fumbled feature earns goodwill from the people who asked for it, and once customers see you respond, they tell you exactly what they think. Your feedback agent has to be ready for that volume.

Story: [the customer who became a collaborator after one beta invitation]

## 8. Put the guards where risk spikes

17:00–19:00 · steady

<!-- image: a winding road seen from above with three toll gates placed exactly at the points where the road widens, one gate at a bridge, one at a construction site, one at a demolition site with a wrecking ball, dark slate background, amber accent on the gate arms, flat vector, no text -->

> A subset of users → all users
> A cheap run → an expensive model or API run
> Deploying new infrastructure → tearing down existing infrastructure

Human in the loop does not mean a human reads everything. It means guards at the points where exposure spikes: subset to everyone, cheap to expensive, deploying, and, riskiest, tearing down. The guard belongs to the owner from slide 3. Everything below those thresholds runs without a human reading every token.

## 9. Demo: the guard blocks the apparent winner

19:00–24:00 · peak

<!-- image: a podium with three places, the tallest position has a barrier gate closed in front of it, the second position has an open gate and a small review stamp hovering, dark slate background, amber accent on the closed gate, flat vector, no text -->

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

Follow [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Activation first; show of hands. Then support and urgency. Pressure copy breaches the 5% ceiling and invents urgency: blocked. Raise the ceiling to 10%: the urgency rule still rejects it. Clear first step is eligible for the owner's review, not shipped. The guard from slide 8, in code.

Compression: at two minutes, the table and the block only.

## 10. Every experiment carries a hypothesis and reports itself

24:00–27:00 · land

<!-- image: a single index card with an arrow drawn from one shape to another, beneath it a small gauge and a paper airplane in flight toward a chat bubble, dark slate background, amber accent on the gauge needle, flat vector, no text -->

> If we do X, we expect Y to move
> For every experiment, a metric that runs automatically
> Success, failure, and surprise reported to wherever the team already looks

Every beta, ad test, and flag gets a hypothesis, or its failure is invisible. For every hypothesis, generate the measurement with it: a dashboard if you like, or a scheduled check that posts to the team channel. Outcomes reach the logging or notification system the team already watches without a human remembering to look.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).

Write it (45 s): one process from your slider position, the agent that would run it, the person who would own it.

## 11. Conway's law, read forward

27:00–30:00 · land

<!-- image: the org chart and architecture diagram from slide 1, now with a third mirrored panel showing a row of small robots each standing beside a person, all three panels sharing one shape, dark slate background, amber accent on the people, flat vector, no text -->

> Your agents will mirror your organization
> So draw the roster on purpose, name the owners, place the guards
> Automate the right things. Keep the taste.

Left alone, the agent roster mirrors whatever accidents your org chart already has. Draw it deliberately: one agent per function, one owner per agent, guards where risk spikes, a hypothesis and a report on everything that touches a customer. Automate the right things. Keep the judgment.
