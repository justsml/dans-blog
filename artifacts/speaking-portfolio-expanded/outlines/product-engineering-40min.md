# The Future of Product Engineering: Conway's Law, Applied on Purpose

40 minutes · 15 slides

**In one line.** Every function in a product organization becomes an agent with a human owner; the people who automate the right things win, and the people who trade taste for AI vibes lose.

**Arc.** Warm open on Conway's law and the scale spectrum, steady through the thesis and the agent roster, build through the loop from outside-in research to targeted beta enrollment, steady through the deluge and the guards, peak at the demo, land on hypothesis-backed reporting and Conway's law read forward.

**Scope.** A proposed operating model, not a report from a deployment. The demo is a deterministic policy replay with synthetic numbers; it shows guard behavior, not significance or customer benefit. Tools named in the notes are examples, not endorsements. Say it once on slide 1.

**Demo.** [Runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering) · [Kit](../demos/index.html). Fallback: the table on slide 13.

**Before each delivery.** Fill the `Story` lines.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Conway's law still applies

0:00–2:30 · warm

<!-- image: an org chart drawn as boxes and lines on the left, a system architecture diagram on the right with the identical shape, a thin mirror line between them, dark slate background, amber accent on the mirror line, flat vector, no text -->

> Your code reflects your organization. Your organization reflects your code.
> In the agentic era, both start reflecting your agents.

Conway wrote it down in 1968: a system's structure copies the communication structure of the organization that built it. Nothing about language models repeals that. What changes is that the "organization" now includes agents, and the shape you give them will show up in your product whether you planned it or not.

Scope, once: proposed operating model, synthetic demo numbers, guard behavior only, example tools not endorsements. Then the question for the next forty minutes: which functions become agents, who owns each one, and where do the guards go?

Source: Conway (1968), [How Do Committees Invent?](http://www.melconway.com/Home/Committees_Paper.html)

Story: [a system whose architecture you could read straight off the org chart]

## 2. The scale spectrum: committees at one end, five people at the other

2:30–5:00 · warm

<!-- image: a long horizontal slider bar, at the left end a tiny huddle of five figures around one laptop, at the right end a large boardroom table with many chairs and a stack of binders, the slider handle sitting in the middle, dark slate background, amber accent on the slider handle, flat vector, no text -->

> Thousands of employees, millions of customers: change procedure, risk and reward analysis, prioritization rubric
> Fewer than five people: no committee, no meeting, ship the feature
> Every process on this range is about to adapt

At one end, a company with thousands of employees and millions of customers. It has a change procedure, a risk and reward analysis, a prioritization rubric, and it should. At the other end, a scrappy startup that does not need a committee to ship. Most rooms sit somewhere between.

The point is not that one end is right. Every system and process that exists anywhere on this range is something that will adapt in the AI age. The rubric, the standup, the release checklist, the quarterly roadmap review. Each one is a candidate for automation, and each one is a place where judgment can quietly leak out.

Ask (30 s): where on the slider is your team, and what is the heaviest process you run?

## 3. Who gets rewarded, and who suffers

5:00–7:00 · steady

<!-- image: two hands side by side, the left hand holding a precise set of calipers, the right hand holding a party balloon, dark slate background, amber accent on the calipers, flat vector, no text -->

> Automate the right things: rewarded richly
> Trade taste and judgment for AI vibes: suffer

The thesis in one line. The teams that automate the right things, with taste intact, will be rewarded richly. The teams that hand judgment to whatever the model says will suffer, and the suffering arrives later than the speed does, which is what makes it dangerous.

Taste here means knowing what the product should refuse to do. Judgment means knowing which decisions get a human. The rest of the talk is about keeping both while automating almost everything else.

## 4. Map every function to an agent, and every agent to an owner

7:00–9:30 · steady

<!-- image: a row of six desks each with a small robot seated at it, behind each desk a standing human figure with one hand resting on the robot's shoulder, dark slate background, amber accent on the human hands, flat vector, no text -->

> Mimic each function of the product group as an agent
> Map each agent to a person who owns that responsibility
> Owning the function means owning the agent

The craft of building a product engineering group in this era is to mimic each function you already have, or would have at scale, as an agent, and then map each agent to a person. The person owns the responsibility, so the person owns the agent: its instructions, its inputs, its limits, and its mistakes.

This is Conway's law used deliberately. If your agent roster is going to mirror your org chart anyway, draw the roster first. A five-person startup gets the research function, the feedback function, and the analytics function it could never afford to staff. A large company gets the same functions with the accountability lines it already has.

The next six slides walk that roster in the order work flows through it.

## 5. The product research agent looks outward

9:30–12:00 · steady

<!-- image: a small robot at a periscope, the periscope rising above a wall and pointing at a distant skyline of competitor buildings, a few speech bubbles floating in the sky, dark slate background, amber accent on the periscope lens, flat vector, no text -->

> Competitors and the landscape · People talking about you · Features others have that you lack
> A web-crawling bot with browser tools you control

Start outside-in. A product research agent scans competitors, watches the landscape, and finds people talking about you, especially when they mention a feature someone else has. Much of this is a web-crawling bot with a browser, scheduled, with a summary at the end.

Integrated marketing platforms already scrape social media for you. The difference is ownership. Your own agent with your own browser tools means you decide what it looks at, what it keeps, and what it ignores. The output is a standing brief, not a dashboard nobody opens.

## 6. The feedback agent looks inward, and the review is a ritual

12:00–14:30 · steady

<!-- image: a funnel with many small envelopes and speech bubbles pouring in at the top, a single neat stack of cards coming out the bottom onto a table with a wall calendar behind it, dark slate background, amber accent on one calendar day, flat vector, no text -->

> Ingest support tickets, interviews, reviews, and in-app feedback automatically
> Daily or weekly review with leadership and the product team
> Output: what belongs at the top of the list, and why

Organizations already collect feedback from users. What changes is that ingestion is automated: clustering, deduplication, linking each cluster back to the customers who said it. The agent prepares; it does not decide.

Then a ritual. A daily or weekly review where the product team and leadership look at the brief from slide 5 and the clusters from this slide and argue about exactly which features belong at the top. Keep the meeting. It is where taste gets exercised in public, and it is the first guard in the system.

Story: [a feedback cluster that changed what the team built that quarter]

## 7. Prioritization needs a rethink, because estimation is already gone

14:30–17:00 · build

<!-- image: a planning poker deck of cards fanned out on a table with a thin layer of dust on it, beside it a single clean card with a question mark, dark slate background, amber accent on the clean card, flat vector, no text -->

> Effort used to be half the rubric
> Nobody t-shirt sizes anymore; points, if they exist, are assigned by an agent
> We still have to decide what to ship

The rankings that dominated software planning were effort against value. Effort is evaporating as an input. I have not heard an engineering team discuss level of effort on a ticket in months. No t-shirt sizing; story points, where they survive, are auto-assigned by an agent and nobody argues about them.

That does not remove the need to choose. It moves the rubric. What is left is evidence for the idea, risk of the change, and what it does to the product promise. Slides 8 through 10 are about producing that evidence cheaply, and slides 12 through 14 are about the risk side.

## 8. Gap analysis agents on your own product

17:00–19:00 · build

<!-- image: a magnifying glass held over a phone screen, revealing under the lens a tangle of overlapping buttons and misaligned labels while the rest of the screen looks clean, dark slate background, amber accent on the lens rim, flat vector, no text -->

> Walk the product as a new user
> Find usability defects and gaps against the research brief
> Propose ways to streamline the visual information hierarchy

Once you think in terms of agents with responsibilities, a general-purpose agent can also review the product itself. Point it at a build with a browser and ask it to walk the onboarding, compare what it finds with the competitor brief, and flag usability defects and opportunities to simplify the information hierarchy.

The output is a list of candidate changes with screenshots and reasons, feeding the same review as the customer feedback. It is cheap to produce and cheap to reject, which is exactly the property you want in a proposal pipeline.

## 9. Extend the loop past product and engineering

19:00–21:30 · build

<!-- image: a set of pipes connecting four labeled-by-shape tanks, a bar chart tank, a shopping cart tank, a customer card tank, and a large warehouse tank, with a small robot turning a valve where they join, dark slate background, amber accent on the valve, flat vector, no text -->

> Website analytics and engagement → ecommerce and customer records → the warehouse
> Ask the agents to find opportunities
> Draft ads and videos into a proposal queue, or auto-test them

The same pattern applies to the full life cycle. Connect agents to website analytics and engagement metrics, connect those to your ecommerce platform or customer records, connect all of it to your warehouse. Then you can ask: where are the opportunities?

From there the marketing agent drafts ads and videos into a proposal queue, or, for low-stakes media, tests them automatically. That is the same shape as the feature pipeline: propose cheaply, test narrowly, escalate before anything broad. Tool names here are placeholders. The ownership pattern is the point.

## 10. Test features the way you test ads: targeted beta enrollment

21:30–24:30 · build

<!-- image: a cluster of five figures highlighted among a crowd of grey figures, a dotted line from the cluster to a small door marked only with a toggle switch, one figure stepping through, dark slate background, amber accent on the toggle switch, flat vector, no text -->

> This idea came from a cluster of feedback
> Find users similar to that cluster
> Invite them to opt in; enroll them in a feature flag; collect narrow feedback

Every feature idea from slides 5 through 8 can be tested the same way media assets are. A/B tests where the traffic supports it. Where it does not, use the provenance: this idea came from a cluster of customers, so find the users similar to them and push an invitation.

The invitation is opt-in. It says this is a beta, it may break things, here is how to turn it off, with whatever warning language your context requires. Accepting drops them into feature flag enrollment. You get an automatic loop of narrow data collection that starts as a safety check on a small subset and widens only when the evidence and the owner say so.

## 11. Customers reward attention, so be ready for the deluge

24:30–26:30 · steady

<!-- image: a single person shouting into a dark void on the left, on the right the same person now at a table with a small robot taking notes, a stream of letters arriving in a tray, dark slate background, amber accent on the notepad, flat vector, no text -->

> Even a fumbled feature earns goodwill from the people who asked for it
> Once customers see you respond, they tell you exactly what they think
> Your systems must capture and act on that automatically

Even if you fumble the feature, the customers who asked for it will notice that someone heard them screaming into the void. They are more likely to tell you what needs to change, and it is remarkable how forthcoming people become once they see a response.

That is the good news and the operational problem. The volume of feedback goes up sharply. If the feedback agent from slide 6 is not ready to ingest it, cluster it, and route it, you have taught your best customers that responding is a one-time event.

Story: [the customer who became a collaborator after one beta invitation]

## 12. Put the guards where risk spikes

26:30–29:00 · steady

<!-- image: a winding road seen from above with three toll gates placed exactly at the points where the road widens, one gate at a bridge, one at a construction site, one at a demolition site with a wrecking ball, dark slate background, amber accent on the gate arms, flat vector, no text -->

> A subset of users → all users
> A cheap run → an expensive model or API run
> Deploying new infrastructure → tearing down existing infrastructure

The human-in-the-loop part is not "a human reads everything." It is placing guards where the risk exposure spikes. Going from a subset to all users. Running a test that burns an expensive model or a metered API. Deploying new infrastructure. Riskier still, tearing down infrastructure that exists.

Any agent action that could lead to one of these needs a guard in front of it, and the guard belongs to the owner from slide 4. Everything below those thresholds should run without a human reading every token, or you have automated nothing.

## 13. Demo: the guard blocks the apparent winner

29:00–34:00 · peak

<!-- image: a podium with three places, the tallest position has a barrier gate closed in front of it, the second position has an open gate and a small review stamp hovering, dark slate background, amber accent on the closed gate, flat vector, no text -->

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

Follow [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Reveal activation first. Show of hands: which ships?

Reveal support and urgency. Pressure copy breaches the 5% support ceiling and invents urgency: blocked. Raise the ceiling to 10%: the urgency rule still rejects it. Clear first step passes and becomes eligible for the owner's review. It is not shipped. This is the guard from slide 12 in code: the rule was written before the scorecard, so a metric win cannot buy off a product principle.

Compression: at two minutes, the table and the block; skip the threshold change.

## 14. Every experiment carries a hypothesis and reports itself

34:00–37:00 · land

<!-- image: a single index card with an arrow drawn from one shape to another, beneath it a small gauge and a paper airplane in flight toward a chat bubble, dark slate background, amber accent on the gauge needle, flat vector, no text -->

> If we do X, we expect Y to move
> For every experiment, a metric that runs automatically
> Success, failure, and surprise reported to wherever the team already looks

Every beta, every ad test, every feature flag from slides 9 and 10 gets a hypothesis. If we change this, we expect that to increase. Vague expectations become invisible failures.

For every hypothesis, generate the measurement with it. A dashboard in your metrics tool if you like, but it does not need to be visual. A scheduled check that posts stats to the team channel is enough. What matters is that success, failure, and unexpected outcomes reach the logging, reporting, or notification system the team already watches, without a human remembering to look.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).

Write it (45 s): one process from your slider position, the agent that would run it, and the person who would own it.

## 15. Conway's law, read forward

37:00–40:00 · land

<!-- image: the org chart and architecture diagram from slide 1, now with a third mirrored panel showing a row of small robots each standing beside a person, all three panels sharing one shape, dark slate background, amber accent on the people, flat vector, no text -->

> Your agents will mirror your organization
> So draw the roster on purpose, name the owners, place the guards
> Automate the right things. Keep the taste.

We started with Conway. Your product mirrors your organization, and your organization is about to include a roster of agents. Left alone, that roster will mirror whatever accidents your org chart already has.

So draw it deliberately. One agent per function, one owner per agent, guards where risk spikes, a hypothesis and a report on everything that touches a customer. The teams that do this will be rewarded richly. The teams that trade their taste for vibes will discover the cost later, when it is expensive. Automate the right things. Keep the judgment.
