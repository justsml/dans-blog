# Break the Mirror on Purpose: 30-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 15, 17. [Timing](timing.md) includes all audience work. The scorecard is authored policy arithmetic, not a live experiment. Keep candidate labels neutral until the vote; name Campbell only afterward. Optional stories replace rehearsed prose.

## 00:00 to 02:00: slide 1, The architecture you could read off the org chart

> You design the agents; your org chart chooses their handoffs.
> Conway, 1968: communication structures constrain designs

You design the agents; your org chart chooses their handoffs. Unless you make those handoffs a decision too.

Conway's 1968 argument connects system design with communication structure. Research writes a brief; product translates it into tickets; support translates the software back into complaints. Which translations carry judgment, and which copy a sentence between tools?

This is a proposed operating model with a synthetic policy exercise. Mirroring has empirical support and exceptions; hidden technical dependencies make premature modularization dangerous. Price a handoff before removing it.



## 02:00 to 04:15: slide 2, Mirroring is measured. It is not destiny.

> Industry/firm descriptive subset: 50 studies
> 35 strong / 11 partial / 4 no support = 70% / 22% / 8%
> Map dependencies before splitting the work

Colfer and Baldwin reviewed a hundred and forty-two studies. In the fifty descriptive studies of industries and firms, thirty-five strongly supported mirroring, eleven partly supported it, and four did not: seventy, twenty-two and eight percent. Those are studies, not percentages of companies that deliberately broke the mirror.

The same review found ten poorly performing unmirrored cases in its normative firm sample. The common problem was premature modularization: hidden technical dependencies outlived the organizational split. Partial mirroring keeps knowledge broader than the work boundary.

So map what depends on what before reorganizing it. The research supports exceptions and a warning, not a guarantee that a new org chart improves software. MacCormack and colleagues also studied associations between development arrangements and modularity. Neither paper ran our proposed agent organization as an experiment.



## 04:15 to 06:15: slide 3, Who Ordered This Handoff?

> Coase, 1937: coordination has a cost
> Reprice the handoff before copying it

Coase's 1937 question was why firms exist when transactions could go through markets. Compare the cost of using the market with organizing work inside the firm. Lower internal costs can support a larger firm; Coase does not prescribe deleting departments.

Here is my narrower application. An agent may make collecting, translating and transmitting evidence across a handoff cheaper. Verification, permissions and maintenance can grow at the same time. Price both changes.

A weekly brief that took two days to assemble might no longer need the same preparation process. The decision meeting may still be valuable. Start with the outcome and the handoff cost, not one agent per box on the current org chart.



## 06:15 to 08:15: slide 4, The spectrum, and the two ways to lose

> Committee at one end. Five people at the other.
> The suffering arrives later than the speed does.

At one end, thousands of employees and millions of customers. Change procedures, risk analysis, a prioritization rubric. At the other, five people around a laptop who can all hear the person making the decision.

The small team can acquire research and feedback capacity it could never afford to staff. The large team can shorten a handoff. Both can also generate proposals faster than anyone understands them.

Automate the right things and keep the taste. Trade judgment for AI vibes and the suffering arrives later than the speed does. That delay is what makes the trade look good.

Delivery: Take 30 seconds: where is your team on the spectrum, and what is its heaviest handoff? Keep the answers for the close.

## 08:15 to 10:45: slide 5, Draw the wires between agents

> Research → sourced brief → product review
> Feedback → cited clusters → product review
> Review → accepted hypothesis → build

Draw one wire: feedback sends cited clusters to product review. What arrives, what leaves, who decides, and what did it cost last week?

Price collection and translation separately from checking the claims, resolving disagreement and maintaining the integration. If the agent saves an hour of collection and adds two hours of correction, the new wire costs more. That is a synthetic comparison, not a productivity result.

Research delivers dated sources. Feedback keeps original complaints. Review produces an accepted hypothesis; build consumes that artifact instead of guessing across six chat histories.

Thoughtworks popularized the inverse Conway manoeuvre. Team Topologies distinguishes collaboration, service consumption and facilitation. Collaborate while discovering the contract; make repeated delivery a service once understood. An agent roster without these wires is a seating plan.



## 10:45 to 12:45: slide 6, Two directions of attention

> Research looks out. Feedback looks in.
> Keep the meeting where the evidence disagrees.

The research agent watches competitors and people talking about your product. The feedback agent ingests support tickets, interviews, reviews, and in-app complaints. Both preserve the evidence behind their summaries.

Now make them disagree. Research says onboarding lacks a feature. Feedback says users cannot find the feature we already have. A clustering agent might merge those into "onboarding problems" and confidently bury the distinction.

Keep the review where somebody opens the source material and argues about what belongs at the top. It is the integrating interface in this system. Taste gets exercised in public there.

Price the disagreement separately from collecting the evidence. Making both summaries cheaper does not make deciding between them free.

Bridge: a browser proposal also needs account state. A hidden feature might be a permissions issue, not evidence for redesign.



## 12:45 to 14:30: slide 9, Targeted beta enrollment, and the deluge

> Keep the customers behind the cluster
> Invite an opt-in cohort. Keep the exit.

This idea came from a cluster of customers. Preserve that provenance. Find people with the same task, then ask whether they want to try the change. Similar company size is not necessarily a similar problem.

The invitation explains what changes, that it is a beta, and how to turn it off. A person approves the message and the recipients. Narrow feedback tells us what to try next. That is all it tells us.

Prepare the intake before inviting people. If customers answer and nobody follows up, you have taught your best customers that responding is a one-time event. The feedback loop needs an owner even when the summarizer runs itself.



## 14:30 to 15:30: slide 10, Ship Friday

> Onboarding activation
> A · B · C
> Which candidate gets your attention?

Friday's review has three onboarding candidates: A, B and C. The next screen shows activation rates. Choose which candidate to investigate, or ask for more information. We will open the rest of the record after the vote.

Delivery: Allow fifteen seconds to choose the additional fact. Do not name Campbell, urgency, support ceilings or a metric trap before the vote.

## 15:30 to 19:30: slide 11, Open the Rest of the Record

> A · 40% activation
> B · 48% activation
> C · 45% activation

Which candidate gets your attention? A is forty percent activation, B forty-eight, C forty-five. Vote before we open the rest of the record.

B's support rate is nine percent against a five-percent ceiling. Its copy invents urgency. Raise the ceiling to ten and it still fails the urgency rule. A metric win cannot buy off a product principle.

C has forty-five percent activation, four percent support and no fabricated urgency. It is eligible for human review. It is not shipped.

Write the rule you wish you had before the vote, then compare it with the policy saved before the scorecard. That policy belongs to the owner of the decision; an optimizer does not get to rewrite it.

Delivery: Thirty-second vote; twenty-second reveal reading; ten-second silence; forty-five seconds writing; fifteen-second comparison. Name Campbell on the next slide.

## 19:30 to 23:00: slide 12, Where guards go, including the two we forgot

> Wider rollout · expensive runs · infrastructure changes
> Customer messaging · customer data deletion

Campbell described what decision pressure can do to a quantitative indicator and the activity it measures. Now we have a reason to name it: the activation winner failed the product rules.

Put the guard where consequences change, before the action. Wider rollout spends customer exposure. Expensive runs spend money. Infrastructure changes create obligations or remove recovery paths. Name the budget, owner and evidence at each crossing.

Customer messaging and data deletion affect another person even when the API call is cheap. A person approves them; the tool layer enforces that permission. Consent to a beta is permission for a bounded experience, not every future experiment.

Bridge: two predictions close this talk. First, tokens become ongoing fuel for software and its defensive agents; price the burn and name its owner. Second, generated interfaces change the channel through which people find and use software. Who owns it?



## 23:00 to 27:00: slide 15, Minority Report, With Terminals

> Generated UI, adapting in real time, per person
> Yes, the software you mastered is going away. As you know it.
> The channel is not spoken for.

Second prediction: more software reaches people as an interface generated for their task, adapting in real time, rather than a grid of apps they chose off a shelf.

Throwaway software is a taste this room has and the world does not. Normal people do not want to vibe-code a recipe tracker, never mind a Slack replacement. They may accept an interface generated for them that they never had to build.

Who owns that software channel: the assistant through which a person finds, uses and shares the tool? Should the frontier labs own all of it? Collaboration inside assistants could move work out of email and specialist apps. The product categories we mastered can change underneath us.

It looks a little like Minority Report, with a surprise revival of the terminal. Thanks, AI. Skynet is not so bad if I get to keep my CLIs.

Here is the opportunity. GPT image being good does not mean image creation belongs to the big players. Those of us outside frontier labs, the organic agents in the room, get to rethink every app as an AI-native system. The channel is not spoken for.

If people keep choosing stable specialist apps instead of returning to generated task interfaces, that weakens the prediction. Watch repeated use, not a launch demo.

Delivery: Ask which product they use daily that would not survive somebody else rebuilding it AI-native. Take one answer. Do not resolve it.

## 27:00 to 30:00: slide 17, Break the mirror on purpose

> Reprice the handoffs. Draw the interfaces.
> Automate the right things. Keep the taste.

Back to the handoff you named. Some boundaries protect real differences in the work. Others survive because the spreadsheet used to live in another department.

What arrives, what leaves, who decides, and what did it cost last week? Make collection cheaper without erasing the disagreement the handoff exposed. Price verification, ownership and fuel alongside the saving.

Your org chart can choose the agents' handoffs for you, or you can make those choices explicit. The same is true of the product category you work inside. Builders outside frontier labs can redraw those boundaries too.

Break the mirror on purpose.

Bring one written hypothesis and rejection condition to your next product review. The owner receives exposure counts, wanted and unwanted outcomes, and a date to act. That report is part of the change.

Delivery: Return to the opening handoff. Stop talking.
