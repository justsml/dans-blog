# The Future of Product Engineering: 30-minute presenter script

Use slides 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 15, 17. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. The demo runs at four and a half minutes and precedes guards. Slide 15 keeps the generated-UI prediction and the AI-native opportunity; the fuel prediction rides in the slide-12 bridge.

## 00:00 to 02:00: slide 1, The architecture you could read off the org chart

On screen:

> Conway, 1968: communication structures constrain designs
> Which of those boundaries still earns its keep?

Conway said organizations designing systems "are constrained to produce designs which are copies of the communication structures of these organizations." Constrained. Communication structures. The wires matter more than the boxes.

This is a proposed operating model. The demo uses synthetic numbers to execute a policy, not measure customer benefit. My bet is that cheaper coordination makes some of our current boundaries obsolete. We should find those boundaries before we photocopy them onto agents.

Look at the handoffs in a product you own. Research writes a brief. Product translates it into tickets. Engineering translates the tickets into software. Support translates the software back into complaints. Which translations carry judgment, and which just carry the same sentence into another tool?

Source: Melvin E. Conway (1968), [How Do Committees Invent?](https://melconway.com/Home/pdf/committees.pdf), Datamation, April, 28–31.

Story: A system whose API boundaries reproduced the team handoffs, and the change that got stuck between them.

Bridge: Colfer and Baldwin found mirroring prevalent, with documented ways to break it; prevalence is not destiny.

## 02:00 to 04:30: slide 3, Your org chart is a fossil of coordination cost

On screen:

> Coase, 1937: coordination has a cost
> Reprice the handoff before copying it

Coase asked why firms exist when people could contract through the market. Using the market costs something; coordinating inside the firm costs something too. The boundary depends on that comparison.

Apply that question inside a product group. A weekly brief may have existed because collecting it took somebody two days. A separate triage meeting may have existed because linking a complaint to a trace required three people and a spreadsheet. If those costs change, the old boundary deserves another look.

That is the inversion. Do not start with one agent per box on the current org chart. Start with the outcome and price the handoffs again. Agents do not delete coordination cost. They move some of it into verification, permissions, and maintenance. Count those before declaring the meeting extinct.

Source: Ronald H. Coase (1937), [The Nature of the Firm](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-0335.1937.tb00002.x), Economica 4(16), 386–405. The agent-design application is the speaker’s argument.

## 04:30 to 06:30: slide 4, The spectrum, and the two ways to lose

On screen:

> Committee at one end. Five people at the other.
> The suffering arrives later than the speed does.

At one end, thousands of employees and millions of customers. Change procedures, risk analysis, a prioritization rubric. At the other, five people around a laptop who can all hear the person making the decision.

The small team can acquire research and feedback capacity it could never afford to staff. The large team can shorten a handoff. Both can also generate proposals faster than anyone understands them.

Automate the right things and keep the taste. Trade judgment for AI vibes and the suffering arrives later than the speed does. That delay is what makes the trade look good.

Delivery: Take 30 seconds: where is your team on the spectrum, and what is its heaviest handoff? Keep the answers for the close.

## 06:30 to 09:00: slide 5, Draw the wires between agents

On screen:

> Research → sourced brief → product review
> Feedback → cited clusters → product review
> Review → accepted hypothesis → build

The inverse Conway manoeuvre is the name people use for changing the organization to encourage the architecture they want. Here that means designing communication between agents and people, not putting a robot beside every job title.

Research delivers a brief with source URLs and dates. Feedback delivers clusters with the original complaints attached. The product review resolves disagreement between them and writes the accepted hypothesis. A build agent consumes that artifact. It does not poll six chat histories and guess which decision won.

Team Topologies distinguishes collaboration, service consumption, and facilitation. Use collaboration while discovering the interface. Make the repeated delivery a service once the contract is understood. Keep facilitation temporary. An agent roster without these wires is a seating plan.

Source: [Thoughtworks, Inverse Conway Maneuver](https://www.thoughtworks.com/en-br/radar/techniques/inverse-conway-maneuver), 2014/2015. Skelton and Pais, [Team Topologies interaction modes](https://teamtopologies.com/key-concepts).

## 09:00 to 11:00: slide 6, Two directions of attention

On screen:

> Research looks out. Feedback looks in.
> Keep the meeting where the evidence disagrees.

The research agent watches competitors and people talking about your product. The feedback agent ingests support tickets, interviews, reviews, and in-app complaints. Both preserve the evidence behind their summaries.

Now make them disagree. Research says onboarding lacks a feature. Feedback says users cannot find the feature we already have. A clustering agent might merge those into "onboarding problems" and confidently bury the distinction.

Keep the review where somebody opens the source material and argues about what belongs at the top. It is the integrating interface in this system. Taste gets exercised in public there.

Story: A feedback cluster that merged different complaints and changed the wrong priority. Bring one original complaint that the summary obscured.

## 11:00 to 12:30: slide 7, Effort left the rubric. Argue with me.

On screen:

> My observation, not your sprint report
> Who estimated a ticket last week?

I have not heard an engineering team discuss level of effort on a ticket in months. That is the observation in my working notes. Let us test how badly it travels.

We still have to choose what to ship. Even when the first implementation is cheap, rollout, review, customer support, and maintenance have costs. Put those beside evidence for the idea. Do not replace story points with a model's confidence and call that prioritization.

Delivery: Ask who estimated a ticket last week, take the show of hands, and say the count without inventing a denominator. Confirm the first-person observation with Dan before delivery; if it no longer holds, open with the question instead.

Bridge: the build-walking agent adds screenshots and reasons to the same evidence queue.

## 12:30 to 14:30: slide 9, Targeted beta enrollment, and the deluge

On screen:

> Keep the customers behind the cluster
> Invite an opt-in cohort. Keep the exit.

This idea came from a cluster of customers. Preserve that provenance. Find people with the same task, then ask whether they want to try the change. Similar company size is not necessarily a similar problem.

The invitation explains what changes, that it is a beta, and how to turn it off. A person approves the message and the recipients. Narrow feedback tells us what to try next; it does not establish a causal improvement.

Prepare the intake before inviting people. If customers answer and nobody follows up, you have taught your best customers that responding is a one-time event. The feedback loop needs an owner even when the summarizer runs itself.

Story: A beta invitation that selected users on the wrong axis, or feedback that arrived faster than the team could act on it.

## 14:30 to 16:30: slide 10, Campbell's law arrives on schedule

On screen:

> Activation is the target
> What behavior did we just pay for?

Give the system a target and it will search for ways to improve it. So will a team. Campbell described the pressure that decision-making puts on quantitative indicators and on the activity they are supposed to measure.

Our target is onboarding activation. The next screen has three candidates. Before we inspect anything else, choose the one you would investigate. Do not reverse-engineer the answer from the names; they are A, B, and C.

The interesting question is what the winning candidate did to earn the number. A metric tells you that something moved. It does not tell you whether you wanted the movement.

Source: Donald T. Campbell (1979), [Assessing the impact of planned social change](https://doi.org/10.1016/0149-7189%2879%2990048-X), Evaluation and Program Planning 2(1), 67–90.

## 16:30 to 21:00: slide 11, Demo: run it before you know the rule

On screen:

> A · 40% activation
> B · 48% activation
> C · 45% activation

Which candidate gets your attention? B has the largest activation number. Now open the rest of its record.

Support contacts rose to nine percent, against a five-percent ceiling. The copy invents urgency. Raise the support ceiling to ten and it still fails the urgency rule. A metric win cannot buy off a product principle.

C has forty-five percent activation, four percent support, and no fabricated urgency. It is eligible for human review. It is not shipped. These point estimates have no sample size or uncertainty behind them; our opening scope statement matters here.

Write the rule you wish you had before the first vote. Compare it with the policy we saved before opening the scorecard. The gap is what this exercise was for.

Delivery: Four and a half minutes in the 40/30 routes, 3:30 in the 15. Begin with only this slide, never the answer-labelled kit. After the vote open the kit and map B to Pressure copy, C to Clearer first step. Follow economics-product/demo.md. Allow 45 seconds to write the rule.

## 21:00 to 23:30: slide 12, Where guards go, including the two we forgot

On screen:

> Wider rollout · expensive runs · infrastructure changes
> Customer messaging · customer data deletion

The demo gave us a reason for the guard. Put it where the consequence changes, before the action happens.

Widening a cohort spends more customer exposure. An expensive run spends money. Creating infrastructure adds ongoing obligations; tearing it down may remove somebody's recovery path. Name the budget, the owner, and the evidence needed at each crossing.

Then add the two missing from the old list. Sending a message to a real customer. Deleting their records. Those are consequences for another person, even when the API call costs a fraction of a cent. A person approves them, and the system enforces that permission rather than mentioning it in a prompt.

Bridge: Graicunas counted 222 possible relationships at six reports, which is a warning about interfaces rather than a staffing ratio, and Bainbridge asks who still gets recovery practice. One more ownership line for the years ahead: tokens stop being a build cost and become fuel, defensive agents run forever, and somebody owns that meter.

## 23:30 to 26:30: slide 15, Minority Report, With Terminals

On screen:

> Generated UI, adapting in real time, per person
> Yes, the software you mastered is going away. As you know it.
> The channel is not spoken for.

Second prediction, and this one is less comfortable. AI does not magically make software work. Well-understood software still gets harder to operate as the world moves under it: you outgrow a performance envelope, you accumulate features, somebody deprecates your dependency. Generation makes the first version cheap. It does not make the tenth year cheap.

And throwaway software is a taste most of this room has and most of the world does not. We are early adopters; we are delighted to regenerate a tool rather than maintain it. Normal people are not turned on by the idea of vibe coding their own recipe tracker, never mind a Slack replacement. What they will accept is an interface generated for them, adapting in real time, that they never had to choose from a menu of products.

Which raises the question this room should actually be arguing about. Should OpenAI and Anthropic end up owning every software channel? Watch what happens when the assistants ship real-time collaboration: who spends less time in email, Slack and Google Docs then? I can already make and edit images and video in ways that make me less likely to open Photoshop or DaVinci. If I need a jingle for the company, I ask Suno and it is done. So is everything you spent a lifetime learning, mastering and fighting with about to be irrelevant? Yes. At least as you know it.

What replaces it looks less like a grid of apps and more like Minority Report, with a surprise revival of the terminal. Which is a Matrix ending when you think about it. Thanks, AI. Skynet is not so bad if I get to keep my CLIs.

Here is the part I want you to leave with. That future is not spoken for. GPT image being pretty good does not mean the story of image creation belongs to the big players, and the same is true in whichever industry you work in. Those of us who do not work at a frontier lab, the organic agents in the room, get to rethink any and every app as an AI-native system from the boundary up. That is this whole talk one level higher: do not photocopy today's product categories onto tomorrow's substrate either.

Delivery: Ask which product they use daily that would not survive somebody else rebuilding it AI-native. Take one answer. Do not resolve it.

## 26:30 to 30:00: slide 17, Break the mirror on purpose

On screen:

> Reprice the handoffs. Draw the interfaces.
> Automate the right things. Keep the taste.

Back to the org chart. Some of those boundaries exist because the work really is different. Some exist because the person with the spreadsheet sat in another department. We should know which before teaching agents to repeat them.

Take one boundary. What arrives, what leaves, who decides, and what did it cost last week? Make collection cheaper without erasing the disagreement the handoff used to expose. Keep the product review where the evidence conflicts, and give the decision a durable artifact so the next agent does not have to guess.

Then price ownership, and price the fuel. Six agents do not become free because one person has their names in a config file, and neither does the burn that keeps them running. Put permission before customer consequences.

And then do the larger version of the same move. The org chart is a record of earlier tradeoffs; so is the product category you are working inside. You are allowed to make new ones, and the channel is not spoken for yet. Break the mirror on purpose. Automate the right things. Keep the taste.
