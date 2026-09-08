# The Future of Product Engineering: 15-minute presenter script

Use slides 1, 3, 5, 10, 11, 12, 15, 17. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. The worked example gets 3:00. Show activation first, then reveal support and copy evidence. Preserve the vote and the written rule. Slide 14 is cut; its fuel prediction and slide 15's channel question both ride in the slide-12 bridge, so slide 15 opens on the Minority Report image and lands on the AI-native opportunity.

## 00:00 to 01:45: slide 1, The architecture you could read off the org chart

On screen:

> Conway, 1968: communication structures constrain designs
> Which of those boundaries still earns its keep?

Conway said organizations designing systems "are constrained to produce designs which are copies of the communication structures of these organizations." Constrained. Communication structures. The wires matter more than the boxes.

This is a proposed operating model. The worked example uses synthetic numbers to explain a policy, not measure customer benefit. My bet is that cheaper coordination makes some of our current boundaries obsolete. We should find those boundaries before we photocopy them onto agents.

Look at the handoffs in a product you own. Research writes a brief. Product translates it into tickets. Engineering translates the tickets into software. Support translates the software back into complaints. Which translations carry judgment, and which just carry the same sentence into another tool?

Source: Melvin E. Conway (1968), [How Do Committees Invent?](https://melconway.com/Home/pdf/committees.pdf), Datamation, April, 28–31.

Story: A system whose API boundaries reproduced the team handoffs, and the change that got stuck between them.

Bridge: mirroring has empirical support and documented exceptions. We can choose different communication structures.

## 01:45 to 03:00: slide 3, Your org chart is a fossil of coordination cost

On screen:

> Coase, 1937: coordination has a cost
> Reprice the handoff before copying it

Coase asked why firms exist when people could contract through the market. Using the market costs something; coordinating inside the firm costs something too. The boundary depends on that comparison.

That is the inversion. Do not start with one agent per box on the current org chart. Start with the outcome and price the handoffs again. Agents do not delete coordination cost. They move some of it into verification, permissions, and maintenance. Count those before declaring the meeting extinct.

Source: Ronald H. Coase (1937), [The Nature of the Firm](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-0335.1937.tb00002.x), Economica 4(16), 386–405. The agent-design application is the speaker’s argument.

## 03:00 to 04:30: slide 5, Draw the wires between agents

On screen:

> Research → sourced brief → product review
> Feedback → cited clusters → product review
> Review → accepted hypothesis → build

The inverse Conway manoeuvre is the name people use for changing the organization to encourage the architecture they want. Here that means designing communication between agents and people, not putting a robot beside every job title.

Research delivers a brief with source URLs and dates. Feedback delivers clusters with the original complaints attached. The product review resolves disagreement between them and writes the accepted hypothesis. A build agent consumes that artifact. It does not poll six chat histories and guess which decision won.

Source: [Thoughtworks, Inverse Conway Maneuver](https://www.thoughtworks.com/en-br/radar/techniques/inverse-conway-maneuver), 2014/2015. Skelton and Pais, [Team Topologies interaction modes](https://teamtopologies.com/key-concepts).

Bridge: research and feedback deliver evidence to a product review; accepted hypotheses feed build and opt-in beta proposals.

## 04:30 to 05:45: slide 10, Campbell's law arrives on schedule

On screen:

> Activation is the target
> What behavior did we just pay for?

Give the system a target and it will search for ways to improve it. So will a team. Campbell described the pressure that decision-making puts on quantitative indicators and on the activity they are supposed to measure.

Our target is onboarding activation. The next screen has three candidates. Before we inspect anything else, choose the one you would investigate. Do not reverse-engineer the answer from the names; they are A, B, and C.

Source: Donald T. Campbell (1979), [Assessing the impact of planned social change](https://doi.org/10.1016/0149-7189%2879%2990048-X), Evaluation and Program Planning 2(1), 67–90.

## 05:45 to 08:45: slide 11, The metric winner fails the product

On screen:

> A · 40% activation
> B · 48% activation
> C · 45% activation

Which candidate gets your attention? B has the largest activation number. Now open the rest of its record.

Support contacts rose to nine percent, against a five-percent ceiling. The copy invents urgency. Raise the support ceiling to ten and it still fails the urgency rule. A metric win cannot buy off a product principle.

C has forty-five percent activation, four percent support, and no fabricated urgency. It is eligible for human review. It is not shipped. These point estimates have no sample size or uncertainty behind them; our opening scope statement matters here.

Write the rule you wish you had before the first vote. Compare it with the policy we saved before opening the scorecard. The gap is what this exercise was for.

Delivery: Begin with the three activation figures and take the vote. Then reveal the support and copy evidence from the worked-example notes. Allow 45 seconds to write the rule.

## 08:45 to 10:45: slide 12, Where guards go, including the two we forgot

On screen:

> Wider rollout · expensive runs · infrastructure changes
> Customer messaging · customer data deletion

The example gave us a reason for the guard. Put it where the consequence changes, before the action happens.

Widening a cohort spends more customer exposure. An expensive run spends money. Creating infrastructure adds ongoing obligations; tearing it down may remove somebody's recovery path. Name the budget, the owner, and the evidence needed at each crossing.

Then add the two missing from the old list. Sending a message to a real customer. Deleting their records. Those are consequences for another person, even when the API call costs a fraction of a cent. A person approves them, and the system enforces that permission rather than mentioning it in a prompt.

Bridge: ownership consumes attention, and it is about to consume fuel. Two predictions close this talk and I will label them as predictions once, because I have measured neither. The first: tokens stop being a build cost and become a running cost, defensive agents run forever, and the ongoing burn belongs in the design doc beside the latency budget, with an owner who is not whoever wrote the prompt.

## 10:45 to 13:30: slide 15, Minority Report, With Terminals

On screen:

> Generated UI, adapting in real time, per person
> Yes, the software you mastered is going away. As you know it.
> The channel is not spoken for.

Second prediction, and this one is less comfortable. AI does not magically make software work. Well-understood software still gets harder to operate as the world moves under it: you outgrow a performance envelope, you accumulate features, somebody deprecates your dependency. Generation makes the first version cheap. It does not make the tenth year cheap.

What replaces it looks less like a grid of apps and more like Minority Report, with a surprise revival of the terminal. Which is a Matrix ending when you think about it. Thanks, AI. Skynet is not so bad if I get to keep my CLIs.

Here is the part I want you to leave with. That future is not spoken for. GPT image being pretty good does not mean image creation belongs to the big players, and the same holds in whichever industry you work in. Those of us who do not work at a frontier lab — the organic agents in the room — get to rethink any and every app as an AI-native system, from the boundary up. That is this whole talk one level higher: do not photocopy today's product categories onto tomorrow's substrate either.

Delivery: Ask which product they use daily that would not survive somebody else rebuilding it AI-native. Take one answer. Do not resolve it.

Bridge: every experiment still reports its hypothesis, its exposure count and its owner.

## 13:30 to 15:00: slide 17, Break the mirror on purpose

On screen:

> Reprice the handoffs. Draw the interfaces.
> Automate the right things. Keep the taste.

Take one boundary. What arrives, what leaves, who decides, and what did it cost last week? Make collection cheaper without erasing the disagreement the handoff used to expose. Keep the product review where the evidence conflicts, and give the decision a durable artifact so the next agent does not have to guess.

And then do the larger version of the same move. The org chart is a record of earlier tradeoffs; so is the product category you are working inside. You are allowed to make new ones, and the channel is not spoken for yet. Break the mirror on purpose. Automate the right things. Keep the taste.
