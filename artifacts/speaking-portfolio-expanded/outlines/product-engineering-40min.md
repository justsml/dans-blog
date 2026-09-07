# The Future of Product Engineering: Break the Mirror on Purpose

40 minutes, 17 slides. Timings include the exercises and delivery pauses, without Q&A. Sources checked 6 September 2026. Story prompts belong in speaker notes and require Dan’s own records before delivery. Slides 14 and 15 are labelled predictions, once, on slide 14; everything before them is the operating model as it stands.

## 1. The architecture you could read off the org chart

00:00 to 02:30 · warm

> Conway, 1968: communication structures constrain designs
> Which of those boundaries still earns its keep?

Conway said organizations designing systems "are constrained to produce designs which are copies of the communication structures of these organizations." Constrained. Communication structures. The wires matter more than the boxes.

This is a proposed operating model. The demo uses synthetic numbers to execute a policy, not measure customer benefit. My bet is that cheaper coordination makes some of our current boundaries obsolete. We should find those boundaries before we photocopy them onto agents.

Look at the handoffs in a product you own. Research writes a brief. Product translates it into tickets. Engineering translates the tickets into software. Support translates the software back into complaints. Which translations carry judgment, and which just carry the same sentence into another tool?

Story: A system whose API boundaries reproduced the team handoffs, and the change that got stuck between them.

Source: Melvin E. Conway (1968), [How Do Committees Invent?](https://melconway.com/Home/pdf/committees.pdf), Datamation, April, 28–31.

## 2. Mirroring is measured. It is not destiny.

02:30 to 05:00 · warm

> 142 studies reviewed
> Mostly supported, with a documented minority that was not

Colfer and Baldwin reviewed 142 empirical studies. The firm and industry descriptive studies mostly supported mirroring, with a documented minority that did not. Read the split off their table before you quote a percentage at anyone. The open collaborative projects looked different. Do not turn that into a claim that one third of companies broke Conway's law.

Their useful finding is that firms can deliberately break the mirror through modular partitions or relationships across organizational boundaries. MacCormack, Rusnak, and Baldwin also found differences in modularity across development arrangements. These are studies of association and organization, not a randomized trial of rearranging your teams.

So the org chart is evidence about why the software looks like this. It is not an instruction to make the next system look identical.

Source: Colfer and Baldwin (2016), [The mirroring hypothesis: theory, evidence, and exceptions](https://doi.org/10.1093/icc/dtw027), Industrial and Corporate Change 25(5), 709–738. MacCormack, Rusnak, and Baldwin (2012), [Exploring the duality between product and organizational architectures](https://www.hbs.edu/ris/Publication%20Files/Research%20Policy%2041%20%282012%29%201309%E2%80%93%201324_c5c2350e-013c-4065-a2f9-d95eb32177d5.pdf), Research Policy 41(8), 1309–1324.

## 3. Your org chart is a fossil of coordination cost

05:00 to 07:30 · build

> Coase, 1937: coordination has a cost
> Reprice the handoff before copying it

Coase asked why firms exist when people could contract through the market. Using the market costs something; coordinating inside the firm costs something too. The boundary depends on that comparison.

Apply that question inside a product group. A weekly brief may have existed because collecting it took somebody two days. A separate triage meeting may have existed because linking a complaint to a trace required three people and a spreadsheet. If those costs change, the old boundary deserves another look.

That is the inversion. Do not start with one agent per box on the current org chart. Start with the outcome and price the handoffs again. Agents do not delete coordination cost. They move some of it into verification, permissions, and maintenance. Count those before declaring the meeting extinct.

Source: Ronald H. Coase (1937), [The Nature of the Firm](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-0335.1937.tb00002.x), Economica 4(16), 386–405. The agent-design application is the speaker’s argument.

## 4. The spectrum, and the two ways to lose

07:30 to 09:30 · build

> Committee at one end. Five people at the other.
> The suffering arrives later than the speed does.

At one end, thousands of employees and millions of customers. Change procedures, risk analysis, a prioritization rubric. At the other, five people around a laptop who can all hear the person making the decision.

The small team can acquire research and feedback capacity it could never afford to staff. The large team can shorten a handoff. Both can also generate proposals faster than anyone understands them.

Automate the right things and keep the taste. Trade judgment for AI vibes and the suffering arrives later than the speed does. That delay is what makes the trade look good.

Stage direction: Take 30 seconds: where is your team on the spectrum, and what is its heaviest handoff? Keep the answers for the close.

## 5. Draw the wires between agents

09:30 to 12:00 · build

![Draw the wires between agents](../../reveal-talks/assets/product-engineering/interfaces.svg)

> Research → sourced brief → product review
> Feedback → cited clusters → product review
> Review → accepted hypothesis → build

The inverse Conway manoeuvre is the name people use for changing the organization to encourage the architecture they want. Here that means designing communication between agents and people, not putting a robot beside every job title.

Research delivers a brief with source URLs and dates. Feedback delivers clusters with the original complaints attached. The product review resolves disagreement between them and writes the accepted hypothesis. A build agent consumes that artifact. It does not poll six chat histories and guess which decision won.

Team Topologies distinguishes collaboration, service consumption, and facilitation. Use collaboration while discovering the interface. Make the repeated delivery a service once the contract is understood. Keep facilitation temporary. An agent roster without these wires is a seating plan.

Source: [Thoughtworks, Inverse Conway Maneuver](https://www.thoughtworks.com/en-br/radar/techniques/inverse-conway-maneuver), 2014/2015. Skelton and Pais, [Team Topologies interaction modes](https://teamtopologies.com/key-concepts).

## 6. Two directions of attention

12:00 to 14:00 · build

> Research looks out. Feedback looks in.
> Keep the meeting where the evidence disagrees.

The research agent watches competitors and people talking about your product. The feedback agent ingests support tickets, interviews, reviews, and in-app complaints. Both preserve the evidence behind their summaries.

Now make them disagree. Research says onboarding lacks a feature. Feedback says users cannot find the feature we already have. A clustering agent might merge those into "onboarding problems" and confidently bury the distinction.

Keep the review where somebody opens the source material and argues about what belongs at the top. It is the integrating interface in this system. Taste gets exercised in public there.

Story: A feedback cluster that merged different complaints and changed the wrong priority. Bring one original complaint that the summary obscured.

## 7. Effort left the rubric. Argue with me.

14:00 to 15:00 · build

> My observation, not your sprint report
> Who estimated a ticket last week?

I have not heard an engineering team discuss level of effort on a ticket in months. That is the observation in my working notes. Let us test how badly it travels.

We still have to choose what to ship. Even when the first implementation is cheap, rollout, review, customer support, and maintenance have costs. Put those beside evidence for the idea. Do not replace story points with a model's confidence and call that prioritization.

Stage direction: Ask who estimated a ticket last week, take the show of hands, and say the count without inventing a denominator. Confirm the first-person observation with Dan before delivery; if it no longer holds, open with the question instead.

## 8. Gap analysis, past engineering

15:00 to 16:30 · build

> Walk the build. Attach screenshots and reasons.
> A candidate should be cheap to reject.

Point an agent with a browser at a build. Ask it to walk onboarding as a new user, compare the result with the sourced brief, and propose changes to the information hierarchy. Each proposal carries the screenshot, the attempted task, and the reason the current page got in the way.

Make one proposal wrong in review. The screenshot may show a feature hidden because the test account lacks permission. That is a setup defect, not evidence to redesign the product. The reviewer needs the account state to tell the difference.

Analytics, warehouse queries and marketing drafts feed the same queue. They share provenance and owners, and none of them needs write access to customer records.

## 9. Targeted beta enrollment, and the deluge

16:30 to 18:30 · build

> Keep the customers behind the cluster
> Invite an opt-in cohort. Keep the exit.

This idea came from a cluster of customers. Preserve that provenance. Find people with the same task, then ask whether they want to try the change. Similar company size is not necessarily a similar problem.

The invitation explains what changes, that it is a beta, and how to turn it off. A person approves the message and the recipients. Narrow feedback tells us what to try next; it does not establish a causal improvement.

Prepare the intake before inviting people. If customers answer and nobody follows up, you have taught your best customers that responding is a one-time event. The feedback loop needs an owner even when the summarizer runs itself.

Story: A beta invitation that selected users on the wrong axis, or feedback that arrived faster than the team could act on it.

## 10. Campbell's law arrives on schedule

18:30 to 20:30 · build

> Activation is the target
> What behavior did we just pay for?

Give the system a target and it will search for ways to improve it. So will a team. Campbell described the pressure that decision-making puts on quantitative indicators and on the activity they are supposed to measure.

Our target is onboarding activation. The next screen has three candidates. Before we inspect anything else, choose the one you would investigate. Do not reverse-engineer the answer from the names; they are A, B, and C.

The interesting question is what the winning candidate did to earn the number. A metric tells you that something moved. It does not tell you whether you wanted the movement.

Source: Donald T. Campbell (1979), [Assessing the impact of planned social change](https://doi.org/10.1016/0149-7189%2879%2990048-X), Evaluation and Program Planning 2(1), 67–90.

## 11. Demo: run it before you know the rule

20:30 to 25:00 · peak

> A · 40% activation
> B · 48% activation
> C · 45% activation

Which candidate gets your attention? B has the largest activation number. Now open the rest of its record.

Support contacts rose to nine percent, against a five-percent ceiling. The copy invents urgency. Raise the support ceiling to ten and it still fails the urgency rule. A metric win cannot buy off a product principle.

C has forty-five percent activation, four percent support, and no fabricated urgency. It is eligible for human review. It is not shipped. These point estimates have no sample size or uncertainty behind them; our opening scope statement matters here.

Write the rule you wish you had before the first vote. Compare it with the policy we saved before opening the scorecard. The gap is what this exercise was for.

Stage direction: Four and a half minutes in the 40/30 routes, 3:30 in the 15. Begin with only this slide, never the answer-labelled kit. After the vote open the kit and map B to Pressure copy, C to Clearer first step. Follow economics-product/demo.md. Allow 45 seconds to write the rule.

## 12. Where guards go, including the two we forgot

25:00 to 27:30 · build

> Wider rollout · expensive runs · infrastructure changes
> Customer messaging · customer data deletion

The demo gave us a reason for the guard. Put it where the consequence changes, before the action happens.

Widening a cohort spends more customer exposure. An expensive run spends money. Creating infrastructure adds ongoing obligations; tearing it down may remove somebody's recovery path. Name the budget, the owner, and the evidence needed at each crossing.

Then add the two missing from the old list. Sending a message to a real customer. Deleting their records. Those are consequences for another person, even when the API call costs a fraction of a cent. A person approves them, and the system enforces that permission rather than mentioning it in a prompt.

## 13. How many agents can one person own?

27:30 to 30:00 · build

> 6 × (32 + 5) = 222 possible relationships
> Ownership costs attention. Budget it.

Six agents, six owners. Somehow you own four of them and are on call for all six.

Graicunas counted possible direct, cross, and group relationships. His maximum counting formula is n times the quantity two-to-the-n-minus-one plus n-minus-one. For six that is six times the quantity thirty-two plus five, which is six times thirty-seven: 222. This is combinatorics, not a staffing limit. It does not mean your six agents generate 222 meetings.

The lesson is to restrict the interfaces we actually require. Bainbridge adds the human problem: automation leaves monitoring and exceptional interventions while removing routine practice. Assign recovery drills and review time along with the agent. An owner field without capacity is a forwarding address for blame.

Stage direction: Do 6 × (32 + 5) aloud. Ask who owns more automated jobs than they could inspect in one afternoon. Take 20 seconds.

Source: V. A. Graicunas, [Relationship in Organization](https://nickols.us/relationship.pdf), reprinted in Papers on the Science of Administration, 1937, maximum-basis table. Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468).

## 14. Software Runs on Petrol Now

30:00 to 32:30 · build

> Tokens stop being a build cost and become a running cost
> Sentry bots hunting your own vulnerabilities, 24/7, forever
> Be careful firing the security bots. They know who you are.

Two predictions to close on, and I will label them as predictions once: this is where I think the operating model goes, not something I have measured. Here is the first. Today you buy tokens to build software. Before long most software will need a steady stream of them just to keep running: to stay current with its dependencies, to re-derive the integration a vendor renamed last night, to keep its own documentation true. Steady for some systems, bursty for others. Either way it stops being a build cost and becomes fuel, and you will meter it the way you meter electricity, which is to say you will only notice it when it moves.

And some of that burn is not features at all. It is defense. If an attacker can point a tireless agent at your surface, the only symmetric answer is a tireless agent of your own: self-hacking around the clock, finding and mitigating faster than the countless people trying to get in. That is a permanent line item on a product that is otherwise finished. It never completes.

Be careful when you fire the security sentry bots, incidentally. They know who you are. They know where the keys are. They have read all of your commits. Underneath the joke is the question from slide 12: an agent whose account you revoked while its credential is still live is the boring version of this, and it happens today.

So price it now. When you draw the wires between agents, one of those wires is a fuel line. The ongoing burn of a function belongs in the design doc beside its latency budget, and somebody owns that meter. It is not the person who wrote the prompt. Buy Me a Free Tier owns the arithmetic; what belongs on this org chart is the owner.

Story: The first time an always-on agent showed up as a recurring cost nobody had budgeted.

Stage direction: Ask who has a security agent running right now with credentials nobody has rotated. Do not take an answer.

## 15. Minority Report, With Terminals

32:30 to 35:30 · land

> Generated UI, adapting in real time, per person
> Yes, the software you mastered is going away. As you know it.
> The channel is not spoken for.

Second prediction, and this one is less comfortable. AI does not magically make software work. Well-understood software still gets harder to operate as the world moves under it: you outgrow a performance envelope, you accumulate features, somebody deprecates your dependency. Generation makes the first version cheap. It does not make the tenth year cheap.

And throwaway software is a taste most of this room has and most of the world does not. We are early adopters; we are delighted to regenerate a tool rather than maintain it. Normal people are not turned on by the idea of vibe coding their own recipe tracker, never mind a Slack replacement. What they will accept is an interface generated for them, adapting in real time, that they never had to choose from a menu of products.

Which raises the question this room should actually be arguing about. Should OpenAI and Anthropic end up owning every software channel? Watch what happens when the assistants ship real-time collaboration: who spends less time in email, Slack and Google Docs then? I can already make and edit images and video in ways that make me less likely to open Photoshop or DaVinci. If I need a jingle for the company, I ask Suno and it is done. So is everything you spent a lifetime learning, mastering and fighting with about to be irrelevant? Yes. At least as you know it.

What replaces it looks less like a grid of apps and more like Minority Report, with a surprise revival of the terminal. Which is a Matrix ending when you think about it. Thanks, AI. Skynet is not so bad if I get to keep my CLIs.

Here is the part I want you to leave with. That future is not spoken for. GPT image being pretty good does not mean the story of image creation belongs to the big players, and the same is true in whichever industry you work in. Those of us who do not work at a frontier lab, the organic agents in the room, get to rethink any and every app as an AI-native system from the boundary up. That is this whole talk one level higher: do not photocopy today's product categories onto tomorrow's substrate either.

Stage direction: Ask which product they use daily that would not survive somebody else rebuilding it AI-native. Take one answer. Do not resolve it.

## 16. Every experiment reports its hypothesis

35:30 to 37:30 · land

> If we do X, we expect Y to move
> Report success, failure, and surprise where the team looks

Every beta, ad test, and feature flag gets a hypothesis. If we change this, we expect that to increase. State who it is for, what would make us stop, and when we will look.

Generate the measurement with the change. It needs the exposure count, the intended outcome, the unwanted outcomes, and the owner who will act, and it goes where the team already looks. Remembering to check a dashboard is a bad dependency.

Take the handoff you named near the start. Write the artifact an agent would produce, who receives it, and the observation that would make them reject it. If that last field is blank, you have designed a suggestion machine.

Stage direction: Give 45 seconds to write. Walk through one answer for the remaining discussion time.

Source: Microsoft ExP (2020), [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).

## 17. Break the mirror on purpose

37:30 to 40:00 · land

> Reprice the handoffs. Draw the interfaces.
> Automate the right things. Keep the taste.

Back to the org chart. Some of those boundaries exist because the work really is different. Some exist because the person with the spreadsheet sat in another department. We should know which before teaching agents to repeat them.

Take one boundary. What arrives, what leaves, who decides, and what did it cost last week? Make collection cheaper without erasing the disagreement the handoff used to expose. Keep the product review where the evidence conflicts, and give the decision a durable artifact so the next agent does not have to guess.

Then price ownership, and price the fuel. Six agents do not become free because one person has their names in a config file, and neither does the burn that keeps them running. Put permission before customer consequences.

And then do the larger version of the same move. The org chart is a record of earlier tradeoffs; so is the product category you are working inside. You are allowed to make new ones, and the channel is not spoken for yet. Break the mirror on purpose. Automate the right things. Keep the taste.
