# The Future of Product Engineering: Big Idea

15 minutes · 8 slides

**In one line.** Conway's law now includes your agents. Give every function an agent, every agent an owner, and every risk spike a guard.

**Arc.** Warm open on Conway's law and the thesis, steady through the roster, peak at the demo, steady through the guards, land on Conway read forward.

**Scope.** Proposed operating model, synthetic demo numbers that show a guard. Say it once on slide 1.

**Demo.** Compact version of [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Fallback: the table on slide 5.

**Before each delivery.** Fill the `Story` line.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Conway's law still applies

0:00–2:00 · warm

<!-- image: an org chart drawn as boxes and lines on the left, a system architecture diagram on the right with the identical shape, a thin mirror line between them, dark slate background, amber accent on the mirror line, flat vector, no text -->

> Your code reflects your organization, and vice versa
> From a five-person startup to a thousand-person change committee, every process is about to adapt

Conway, 1968. The organization now includes agents, and their shape will show up in the product. Whether you are five people shipping without a meeting or thousands with a risk and reward rubric, every process you run is a candidate for automation and a place judgment can leak out.

Scope, once: proposed operating model, synthetic numbers, guard behavior only.

Source: Conway (1968), [How Do Committees Invent?](http://www.melconway.com/Home/Committees_Paper.html)

Story: [thirty seconds: a system whose architecture you could read off the org chart]

## 2. Who gets rewarded, and who suffers

2:00–3:30 · warm

<!-- image: two hands side by side, the left hand holding a precise set of calipers, the right hand holding a party balloon, dark slate background, amber accent on the calipers, flat vector, no text -->

> Automate the right things: rewarded richly
> Trade taste and judgment for AI vibes: suffer

Taste is knowing what the product should refuse to do. Judgment is knowing which decisions get a human. Keep both, automate nearly everything else.

## 3. One agent per function, one owner per agent

3:30–5:30 · steady

<!-- image: a row of six desks each with a small robot seated at it, behind each desk a standing human figure with one hand resting on the robot's shoulder, dark slate background, amber accent on the human hands, flat vector, no text -->

> Mimic each function of the product group as an agent
> Map each agent to the person who owns that responsibility

Conway's law used deliberately. Draw the roster before it draws itself. The owner owns the agent's instructions, inputs, limits, and mistakes.

## 4. The roster, in the order work flows

5:30–7:30 · steady

<!-- image: five small robots in a row along a conveyor, the first at a periscope, the second at a funnel, the third holding a magnifying glass over a phone, the fourth turning a valve between tanks, the fifth holding open a door with a toggle switch, dark slate background, amber accent on the toggle switch, flat vector, no text -->

> Research agent: competitors, the landscape, people talking about you
> Feedback agent: ingest, cluster, link to customers, feed the weekly review
> Gap analysis agent: walk the product, flag usability defects
> Marketing and sales agents: analytics, customer records, the warehouse; propose, then test narrowly
> Beta enrollment: find users like the feedback cluster, invite them to opt in behind a flag

I have not heard a team discuss level of effort in months, and I have stopped asking. Say it as your own observation and invite the room to disagree. What remains is evidence and risk. This roster produces the evidence cheaply. Ideas come from a cluster of customers, so invite users like them into a flag with honest beta language, and collect narrow feedback before anything widens.

## 5. Demo: the guard blocks the apparent winner

7:30–11:00 · peak

<!-- image: a podium with three places, the tallest position has a barrier gate closed in front of it, the second position has an open gate and a small review stamp hovering, dark slate background, amber accent on the closed gate, flat vector, no text -->

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

Activation from 40% to 48%. Win? Then support triples and the copy invents urgency. Give the room a moment to change its answer. Rules written before the scorecard: support at most 5%, no fabricated urgency. Pressure copy blocked. Clear first step eligible for the owner's review, not shipped.

## 6. Put the guards where risk spikes

11:00–12:30 · steady

<!-- image: a winding road seen from above with three toll gates placed exactly at the points where the road widens, one gate at a bridge, one at a construction site, one at a demolition site with a wrecking ball, dark slate background, amber accent on the gate arms, flat vector, no text -->

> Subset → all users · Cheap run → expensive run
> Deploying infrastructure → tearing it down

Human in the loop means guards where exposure spikes, owned by the person who owns the agent. Below those thresholds, the work runs without a human reading every token.

## 7. Every experiment carries a hypothesis and reports itself

12:30–13:30 · land

<!-- image: a single index card with an arrow drawn from one shape to another, beneath it a small gauge and a paper airplane in flight toward a chat bubble, dark slate background, amber accent on the gauge needle, flat vector, no text -->

> If we do X, we expect Y to move
> Generate the measurement with the hypothesis; post the outcome where the team already looks

Success, failure, and surprise reach the channel automatically. Customers who see you respond become forthcoming, so the feedback agent has to be ready for the volume.

## 8. Conway's law, read forward

13:30–15:00 · land

<!-- image: the org chart and architecture diagram from slide 1, now with a third mirrored panel showing a row of small robots each standing beside a person, all three panels sharing one shape, dark slate background, amber accent on the people, flat vector, no text -->

> Your agents will mirror your organization
> Draw the roster on purpose. Name the owners. Place the guards.
> Automate the right things. Keep the taste.

Pause. Leave the three mirrored panels on screen.
