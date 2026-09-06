# The Future of Product Engineering: 40-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A.

## 00:00 to 02:30: slide 1, The architecture you could read off the org chart

On screen:

> Conway, 1968: communication structures constrain designs
> Which of those boundaries still earns its keep?

Conway said organizations designing systems "are constrained to produce designs which are copies of the communication structures of these organizations." Constrained. Communication structures. The wires matter more than the boxes.

This is a proposed operating model. The demo uses synthetic numbers to execute a policy, not measure customer benefit. My bet is that cheaper coordination makes some of our current boundaries obsolete. We should find those boundaries before we photocopy them onto agents.

Look at the handoffs in a product you own. Research writes a brief. Product translates it into tickets. Engineering translates the tickets into software. Support translates the software back into complaints. Which translations carry judgment, and which just carry the same sentence into another tool?

Source: Melvin E. Conway (1968), [How Do Committees Invent?](https://melconway.com/Home/pdf/committees.pdf), Datamation, April, 28–31.

Story: A system whose API boundaries reproduced the team handoffs, and the change that got stuck between them.

## 02:30 to 05:00: slide 2, Mirroring is measured. It is not destiny.

On screen:

> 142 studies reviewed
> Firm/industry descriptive studies: 70% strong, 22% partial, 8% no support

Colfer and Baldwin reviewed 142 empirical studies. The firm and industry descriptive studies mostly supported mirroring: seventy percent strongly, twenty-two percent partially, eight percent not at all. The open collaborative projects looked different. Do not turn that into a claim that one third of companies broke Conway's law.

Their useful finding is that firms can deliberately break the mirror through modular partitions or relationships across organizational boundaries. MacCormack, Rusnak, and Baldwin also found differences in modularity across development arrangements. These are studies of association and organization, not a randomized trial of rearranging your teams.

So the org chart is evidence about why the software looks like this. It is not an instruction to make the next system look identical.

Source: Colfer and Baldwin (2016), [The mirroring hypothesis: theory, evidence, and exceptions](https://doi.org/10.1093/icc/dtw027), Industrial and Corporate Change 25(5), 709–738. MacCormack, Rusnak, and Baldwin (2012), [Exploring the duality between product and organizational architectures](https://www.hbs.edu/ris/Publication%20Files/Research%20Policy%2041%20%282012%29%201309%E2%80%93%201324_c5c2350e-013c-4065-a2f9-d95eb32177d5.pdf), Research Policy 41(8), 1309–1324.

## 05:00 to 07:30: slide 3, Your org chart is a fossil of coordination cost

On screen:

> Coase, 1937: coordination has a cost
> Reprice the handoff before copying it

Coase asked why firms exist when people could contract through the market. Using the market costs something; coordinating inside the firm costs something too. The boundary depends on that comparison.

Apply that question inside a product group. A weekly brief may have existed because collecting it took somebody two days. A separate triage meeting may have existed because linking a complaint to a trace required three people and a spreadsheet. If those costs change, the old boundary deserves another look.

That is the inversion. Do not start with one agent per box on the current org chart. Start with the outcome and price the handoffs again. Agents do not delete coordination cost. They move some of it into verification, permissions, and maintenance. Count those before declaring the meeting extinct.

Source: Ronald H. Coase (1937), [The Nature of the Firm](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-0335.1937.tb00002.x), Economica 4(16), 386–405. The agent-design application is the speaker’s argument.

## 07:30 to 09:30: slide 4, The spectrum, and the two ways to lose

On screen:

> Committee at one end. Five people at the other.
> The suffering arrives later than the speed does.

At one end, thousands of employees and millions of customers. Change procedures, risk analysis, a prioritization rubric. At the other, five people around a laptop who can all hear the person making the decision.

The small team can acquire research and feedback capacity it could never afford to staff. The large team can shorten a handoff. Both can also generate proposals faster than anyone understands them.

Automate the right things and keep the taste. Trade judgment for AI vibes and the suffering arrives later than the speed does. That delay is what makes the trade look good.

Delivery: Take 30 seconds: where is your team on the spectrum, and what is its heaviest handoff? Keep the answers for slide 14.

## 09:30 to 12:00: slide 5, Draw the wires between agents

On screen:

> Research → sourced brief → product review
> Feedback → cited clusters → product review
> Review → accepted hypothesis → build

The inverse Conway manoeuvre is the name people use for changing the organization to encourage the architecture they want. Here that means designing communication between agents and people, not putting a robot beside every job title.

Research delivers a brief with source URLs and dates. Feedback delivers clusters with the original complaints attached. The product review resolves disagreement between them and writes the accepted hypothesis. A build agent consumes that artifact. It does not poll six chat histories and guess which decision won.

Team Topologies distinguishes collaboration, service consumption, and facilitation. Use collaboration while discovering the interface. Make the repeated delivery a service once the contract is understood. Keep facilitation temporary. An agent roster without these wires is a seating plan.

Source: [Thoughtworks, Inverse Conway Maneuver](https://www.thoughtworks.com/en-br/radar/techniques/inverse-conway-maneuver), 2014/2015. Skelton and Pais, [Team Topologies interaction modes](https://teamtopologies.com/key-concepts).

## 12:00 to 14:30: slide 6, Two directions of attention

On screen:

> Research looks out. Feedback looks in.
> Keep the meeting where the evidence disagrees.

The research agent watches competitors and people talking about your product. The feedback agent ingests support tickets, interviews, reviews, and in-app complaints. Both preserve the evidence behind their summaries.

Now make them disagree. Research says onboarding lacks a feature. Feedback says users cannot find the feature we already have. A clustering agent might merge those into "onboarding problems" and confidently bury the distinction.

Keep the review where somebody opens the source material and argues about what belongs at the top. It is the integrating interface in this system. Taste gets exercised in public there. A standing brief is useful; a dashboard nobody opens is just another place to store the mistake.

Story: A feedback cluster that merged different complaints and changed the wrong priority. Bring one original complaint that the summary obscured.

## 14:30 to 16:30: slide 7, Effort left the rubric. Argue with me.

On screen:

> My observation, not your sprint report
> Who estimated a ticket last week?

I have not heard an engineering team discuss level of effort on a ticket in months. That is the observation in my working notes. Let us test how badly it travels.

Who estimated a ticket last week? Keep your hands up long enough to count. That is this room, not an industry survey. If half the room did it yesterday, then effort has left some rubrics and is alive in others.

We still have to choose what to ship. Even when the first implementation is cheap, rollout, review, customer support, and maintenance have costs. Put those beside evidence for the idea. Do not replace story points with a model's confidence and call that prioritization.

Delivery: Count the hands and say the count without inventing a denominator. Confirm the first-person observation with Dan before delivery; if it no longer holds, start with the audience question.

## 16:30 to 18:30: slide 8, Gap analysis, past engineering

On screen:

> Walk the build. Attach screenshots and reasons.
> A candidate should be cheap to reject.

Point an agent with a browser at a build. Ask it to walk onboarding as a new user, compare the result with the sourced brief, and propose changes to the information hierarchy. Each proposal carries the screenshot, the attempted task, and the reason the current page got in the way.

Make one proposal wrong in review. The screenshot may show a feature hidden because the test account lacks permission. That is a setup defect, not evidence to redesign the product. The reviewer needs the account state to tell the difference.

Analytics and warehouse queries can feed the same proposal queue. Marketing can draft an ad from an accepted idea. Those functions share provenance and owners; they do not all need write access to customer records.

## 18:30 to 21:00: slide 9, Targeted beta enrollment, and the deluge

On screen:

> Keep the customers behind the cluster
> Invite an opt-in cohort. Keep the exit.

This idea came from a cluster of customers. Preserve that provenance. Find people with the same task, then ask whether they want to try the change. Similar company size is not necessarily a similar problem.

The invitation explains what changes, that it is a beta, and how to turn it off. A person approves the message and recipients. Acceptance enrolls the customer behind a flag. Narrow feedback tells us what to try next; it does not automatically establish a causal improvement.

Prepare the intake before inviting people. If customers answer and nobody follows up, you have taught your best customers that responding is a one-time event. The feedback loop needs an owner even when the summarizer runs itself.

Story: A beta invitation that selected users on the wrong axis, or feedback that arrived faster than the team could act on it.

## 21:00 to 23:00: slide 10, Campbell's law arrives on schedule

On screen:

> Activation is the target
> What behavior did we just pay for?

Give the system a target and it will search for ways to improve it. So will a team. Campbell described the pressure that decision-making puts on quantitative indicators and on the activity they are supposed to measure.

Our target is onboarding activation. The next screen has three candidates. Before we inspect anything else, choose the one you would investigate. Do not reverse-engineer the answer from the names; they are A, B, and C.

The interesting question is what the winning candidate did to earn the number. A metric tells you that something moved. It does not tell you whether you wanted the movement.

Source: Donald T. Campbell (1979), [Assessing the impact of planned social change](https://doi.org/10.1016/0149-7189%2879%2990048-X), Evaluation and Program Planning 2(1), 67–90.

## 23:00 to 28:00: slide 11, Demo: run it before you know the rule

On screen:

> A · 40% activation
> B · 48% activation
> C · 45% activation

Which candidate gets your attention? B has the largest activation number. Now open the rest of its record.

Support contacts rose to nine percent, against a five-percent ceiling. The copy invents urgency. Raise the support ceiling to ten and it still fails the urgency rule. A metric win cannot buy off a product principle.

C has forty-five percent activation, four percent support, and no fabricated urgency. It is eligible for human review. It is not shipped. These point estimates have no sample size or uncertainty behind them; our opening scope statement matters here.

Write the rule you wish you had before the first vote. Compare it with the policy we saved before opening the scorecard. The gap is what this exercise was for.

Delivery: Five minutes in the 40/30 routes, 3:30 in the 15. Begin with only this slide, never the answer-labelled kit. After the vote open the kit and map B to Pressure copy, C to Clearer first step. Follow economics-product/demo.md. Allow 45 seconds to write the rule.

## 28:00 to 31:00: slide 12, Where guards go, including the two we forgot

On screen:

> Wider rollout · expensive runs · infrastructure changes
> Customer messaging · customer data deletion

The demo gave us a reason for the guard. Put it where the consequence changes, before the action happens.

Widening a cohort spends more customer exposure. An expensive run spends money. Creating infrastructure adds ongoing obligations; tearing it down may remove somebody's recovery path. Name the budget, the owner, and the evidence needed at each crossing.

Then add the two missing from the old list. Sending a message to a real customer. Deleting their records. Those are consequences for another person, even when the API call costs a fraction of a cent. A person approves them. The system must enforce that permission, not merely mention it in the prompt.

## 31:00 to 34:00: slide 13, How many agents can one person own?

On screen:

> 6 × (32 + 5) = 222 possible relationships
> Ownership costs attention. Budget it.

Six agents, six owners. Somehow you own four of them and are on call for all six.

Graicunas counted possible direct, cross, and group relationships. His maximum counting formula is n times two to the n minus one, plus n minus one. For six, that is six times thirty-seven: 222. This is combinatorics, not a staffing limit. It does not mean your six agents generate 222 meetings.

The lesson for our design is to restrict the interfaces we actually require. Bainbridge adds the human problem: automation leaves monitoring and exceptional interventions while removing routine practice. Assign recovery drills and review time along with the agent. An owner field without capacity is a forwarding address for blame.

Source: V. A. Graicunas, [Relationship in Organization](https://nickols.us/relationship.pdf), reprinted in Papers on the Science of Administration, 1937, maximum-basis table. Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468).

Delivery: Do 6 × (32 + 5) aloud. Ask who owns more automated jobs than they could inspect in one afternoon. Take 20 seconds.

## 34:00 to 37:00: slide 14, Every experiment reports its hypothesis

On screen:

> If we do X, we expect Y to move
> Report success, failure, and surprise where the team looks

Every beta, ad test, and feature flag gets a hypothesis. If we change this, we expect that to increase. State who it is for, what would make us stop, and when we will look.

Generate the measurement with the change. A scheduled report is fine. It needs the exposure count, the intended outcome, the unwanted outcomes, and the owner who will act. The report goes where the team already looks. A dashboard is optional. Remembering to check it is a bad dependency.

Take the handoff you named near the start. Write the artifact an agent would produce, who receives it, and the observation that would make them reject it. If that last field is blank, you have designed a suggestion machine.

Source: Microsoft ExP (2020), [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).

Delivery: Give 45 seconds to write. Walk through one answer for the remaining discussion time.

## 37:00 to 40:00: slide 15, Break the mirror on purpose

On screen:

> Reprice the handoffs. Draw the interfaces.
> Automate the right things. Keep the taste.

Back to the org chart. Some of those boundaries exist because the work really is different. Some exist because the person with the spreadsheet sat in another department. We should know which before teaching agents to repeat them.

Take one boundary. What arrives, what leaves, who decides, and what did it cost last week? Make collection cheaper without erasing the disagreement that the handoff used to expose. Keep the product review where the evidence conflicts. Give the resulting decision a durable artifact so the next agent does not have to guess.

Then price ownership. Six agents do not become free because one person has their names in a config file. Reserve the person's attention and practise the exceptional work. Put permission before customer consequences.

The org chart is a record of earlier tradeoffs. You are allowed to make new ones. Automate the right things. Keep the taste.
