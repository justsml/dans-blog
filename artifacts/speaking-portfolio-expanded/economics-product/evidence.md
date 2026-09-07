# Economics and product engineering: evidence and claim boundaries

Verified 2026-09-04; Free Tier section reverified 2026-09-06. The user’s six-concept brief controls the argument. The material below supports factual claims; proposed architectures, principles, synthetic fixtures, and conditional market mechanisms are labelled as such.

## Buy Me a Free Tier

Rewritten and retitled 2026-09-06. The full claim ledger, including every economic concept with its primary source and its stated boundary, lives in the [evidence bank](../packets/free-tier/evidence-bank.md) — that file is authoritative and this section no longer duplicates its table. Also there: the slide-4 dated announcements and their recheck note, and the slide 10, 11 and 13 arithmetic worked out for a challenge from the floor.

The counterargument is part of the thesis and now appears in the first ten minutes: today's low prices might reflect, or precede, genuinely lower costs. The practical answer is to measure exposure and keep important choices reversible, not to predict a cliff. The talk also tells low-volume teams explicitly not to optimize.

## The Future of Product Engineering

| Claim | Primary evidence | Scope and stage wording |
|---|---|---|
| A system's structure copies the communication structure of the organization that built it. | Melvin E. Conway, [How Do Committees Invent?](http://www.melconway.com/Home/Committees_Paper.html), Datamation, 1968. | Quote the thesis as Conway's observation. The extension to agent rosters is the speaker's argument, not Conway's claim. |
| Experiment design needs a clear hypothesis and a complementary metric set. | [Microsoft Research: Pre-Experiment Stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/), 2020. | Supports the "every experiment carries a hypothesis" slide. It does not validate the proposed agent roster or the synthetic onboarding treatment. |
| Guardrail metrics track product properties that should not degrade. | [Microsoft Research: During-Experiment Stage](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/), 2020. | Background for the support ceiling in the demo. Cited in the evidence notes, not on a slide in the current outlines. |
| Effort estimation has largely left engineering planning conversations. | **Speaker's firsthand observation**, stated as such ("I have not heard a team discuss level of effort in months"). | Do not present as an industry measurement. Invite the room to disagree. |
| Every function of a product group can be mimicked as an agent with a human owner; guards belong where risk spikes. | **Proposed operating model.** | Describe the roster, owners, targeted beta enrollment, and guards as design choices. Do not claim a production deployment or measured organizational improvement. Tools named in notes are examples. |
| Customers become more forthcoming once they see a response to their feedback. | **Speaker's firsthand observation.** | State as experience, not as a measured effect. Fill the evidence-bank story slot before using a specific example. |
| A locally better activation number can violate another objective. | **Synthetic policy replay**, detailed in demo.md. | Control 40% activation / 3% support; pressure 48% / 9% plus false urgency; clearer step 45% / 4%. The 5% ceiling is fictional policy. Passing gates means eligible for human review, never automatic shipping. No causal or significance claim. |

## Claims intentionally removed or narrowed

- No estimate of vendor loss per query, hidden subsidy, sustainable margin, or a date when subsidies end.
- No assertion that customer willingness to pay necessarily tends to zero.
- No claim that cloud credits prove the economics of all AI services.
- No assertion that faster experimentation guarantees better learning or product quality.
- No implication that support percentages establish a causal experiment result; the demo has no randomized user-level data or sampling uncertainty.
- No equation that lets a metric win compensate for a prohibited pattern.
- No claim that model confidence authorizes exposure, pricing changes, or external communications.

## Source upkeep before a booking

Recheck offer terms immediately before presenting a named credit program. Preserve dates on historical research. If adding a current model price example, verify the model, token categories, currency, region, and date; keep it distinct from provider cost. If replacing synthetic product fixtures with real experiments, obtain an authorized, de-identified dataset and document assignment, observation window, design, analysis, uncertainty, and decision history.
