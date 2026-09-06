# Talk packet: The Future of Product Engineering

[Browser deck](../../../reveal-talks/product-engineering.html) · [Presenter script](script-40min.md)

Outlines: [40 min Conway's law and the agent roster](../../outlines/product-engineering-40min.md) · [30 min the agent roster](../../outlines/product-engineering-30min.md) · [15 min big idea](../../outlines/product-engineering-15min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** The Future of Product Engineering
- Break the Mirror on Purpose
- Your Org Chart Is a Fossil of Coordination Cost
- Automate the Right Things. Keep the Taste.

## Abstracts

### Short abstract

Your org chart records what coordination used to cost. Before copying it onto agents, price the handoffs again. This talk uses Coase, Conway, and an onboarding reversal to design agent interfaces, budget human ownership, and put approval before customer consequences. Automate the right things. Keep the taste.

### Standard abstract

An agent per department sounds like organizational design. It may just preserve every expensive handoff your company already has. This talk argues for repricing coordination before copying the org chart. Research and feedback agents deliver cited evidence to a product review; the accepted hypothesis becomes the interface to build and experiment work. A synthetic onboarding demo makes the room choose from activation alone, then reveals support costs and fabricated urgency. The apparent winner is blocked. Attendees leave with artifact contracts, owners with review capacity, and explicit approval boundaries for rollout, spending, infrastructure, customer messaging, and data deletion.

### Extended abstract

Conway describes communication structures, not a row of boxes with robots in them. Coase asks what coordination costs. Together they give product engineers a harder question than which department gets an agent: which handoffs should survive when collecting and transmitting evidence becomes cheaper?

This talk follows one product decision through sourced research, customer-feedback clusters, product review, a candidate build, and an opt-in beta. Each handoff has an artifact and an owner. The review stays because the evidence can disagree. A cluster that merges two different complaints is a product mistake even when its JSON validates.

The demo comes before the rules. The audience sees three activation figures and chooses a candidate. Only then do support contacts and fabricated urgency appear. The highest activation result fails the saved policy. A quieter candidate becomes eligible for review, not automatically shipped. The numbers are synthetic; the policy execution is inspectable.

The back half prices the human work. Graicunas’s maximum relationship count gives 222 possibilities for six reports, an illustration of combinatorial growth rather than a staffing limit. Bainbridge asks what happens to the person left monitoring automation and handling its exceptions. Ownership needs time and recovery practice, not just a name in a config file.

The closing artifact is one redesigned handoff: what arrives, what leaves, who decides, what would stop it, and how the experiment reports its result. Agents do not erase the cost of coordination. They change where we need to look for it.

## Learning outcomes

Attendees will be able to:

1. Reprice one handoff, specify its artifact contract, and give its owner actual review capacity.
2. Place human-in-the-loop guards at the specific transitions where risk exposure spikes, rather than on every action.
3. Attach a falsifiable hypothesis and an automatic report to any beta, ad test, or feature flag before it reaches customers.

## Audience and prerequisites

Product engineers, engineering leaders, founders, and product managers building or evaluating AI-assisted product workflows. Familiarity with feature flags and basic A/B testing. No statistics beyond the basics.

## Practical takeaways

- Artifact contracts for research, feedback, product review, build, and experiment ownership.
- Approval boundaries for rollout, expensive runs, infrastructure creation and removal, customer messaging, and deletion.
- The hypothesis-plus-report rule for every experiment.

## Not a product pitch

The talk cites Conway's 1968 paper and Microsoft's experimentation guidance. It names no experimentation platform, analytics tool, warehouse, or agent framework; tools mentioned in speaker notes are examples. The demo is offline and vendor-free.

## References

- Conway (1968). [How Do Committees Invent?](http://www.melconway.com/Home/Committees_Paper.html)
- Microsoft ExP (2020). [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).
- Coase (1937). [The Nature of the Firm](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-0335.1937.tb00002.x).
- Colfer and Baldwin (2016). [The mirroring hypothesis](https://doi.org/10.1093/icc/dtw027).
- Bainbridge (1983). [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468).

## Audience adaptation

For engineering rooms, spend the interface example on code, evidence IDs, and review capacity. For product leadership, spend it on who reconciles contradictory research and feedback. Keep the same arc, demo order, and named customer-consequence boundaries. Use the standard abstract above as the source; do not restore the former one-agent-per-function thesis.
