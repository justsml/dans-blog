# Conference submission package

Prepared 2026-09-04. Abstracts are exact 50- and 150-word versions by whitespace count; titles and labels are excluded. Submit one Product Engineering variant per event unless the organizer explicitly requests a series.

## Cry Me a Free Tier

**Subtitle:** What cheap intelligence teaches us to build

**Format:** 40 minutes; 18 slides. Economics and architecture talk.

**Audience:** Staff engineers, architects, founders, CTOs, platform and engineering leaders. Familiarity with operating a software product helps; no economics degree or model expertise is assumed.

### 50-word abstract

Free AI changes what software teams consider worth optimizing. But low prices can reflect both temporary offers and genuine efficiency. This talk separates price from cost, stress-tests a synthetic workload, and asks how to build businesses that survive either explanation without guessing a vendor's margins or predicting an inevitable crash.

### 150-word abstract

Imagine building a company with free electricity, then discovering that its architecture learned to expect the offer forever. AI raises a similar question: what does cheap intelligence encourage us to build?

This talk examines how free tiers, credits, and aggressive pricing can shape context size, retries, agent fan-out, product packaging, and supplier dependence. It separates what customers pay from what providers spend, avoiding invented subsidy figures and confident predictions about a price cliff. The counterargument matters: useful inference has become cheaper, and tomorrow's efficiency may justify today's prices.

A live, offline simulation changes inference prices while holding a fictional workload constant. We calculate cost per accepted outcome, test an assumed efficiency improvement, and expose the assumptions that still need evidence. Attendees leave with a practical price sensitivity review, a way to compare optimization effort with recurring savings, and a clearer answer to which architectural commitments they can afford to make.

### Three audience outcomes

1. Calculate gross cost per accepted outcome, including failed attempts, and distinguish it from the net invoice.
2. Run an inference price sensitivity review while stating which assumptions remain fixed.
3. Choose reversible architecture investments without assuming either permanent subsidies or inevitable repricing.

### Notes for reviewers

The contrarian tension is conditional: cheap access creates real benefits, and genuine efficiency is a serious alternative to the subsidy story. This talk is not a claim about a named provider’s margins. Its parking analogy is brief and labelled. The distinctive artifact is a workload sensitivity calculation that works without forecasting industry economics. The four-minute demo is offline and synthetic. No proprietary results or personal case study is claimed.

## The Future of Product Engineering

**Subtitle:** When the product team becomes an executable loop

**Format:** 15 minutes; 9 slides. Big-idea lightning talk.

**Audience:** Product engineers, founders, product managers, designers, engineering leaders; suitable for a broad technology audience.

### 50-word abstract

AI can generate an onboarding screen. The more interesting question is whether that screen should exist. This lightning talk follows the product learning loop from evidence to decision, then rejects a synthetic activation winner that violates product guardrails. Machines prepare options; humans retain taste, direction, and accountability for what ships.

### 150-word abstract

Producing thirty onboarding screens is becoming easier than deciding which one deserves to exist. That changes the question for product engineers: how do we automate learning, rather than simply produce more software?

This talk follows one product decision through customer signals, research, hypotheses, experiments, and remembered outcomes. It distinguishes evidence from interpretation and shows where agents can reduce handoff delays without becoming the owner of product strategy.

The demonstration is deliberately uncomfortable. A synthetic onboarding treatment improves activation, then fails a support guardrail and a rule against fabricated urgency. A quieter alternative becomes eligible for human review, not automatic release. No live customer experiment or statistical win is claimed.

Attendees leave with a learning loop, a way to turn product principles into explicit constraints, and a sharper account of where human judgment belongs. When generating products becomes cheap, deciding what deserves to exist becomes the product skill that matters most.

### Three audience outcomes

1. Describe where AI assistance fits across the product learning loop beyond code generation.
2. Distinguish a metric improvement from a product decision supported by evidence and constraints.
3. Name the human owners of taste, strategy, and release accountability.

### Notes for reviewers

The short version makes one argument through one onboarding choice. It avoids infrastructure and statistical implementation detail. A three-minute synthetic policy replay creates the central reversal: the highest activation result is blocked. The final takeaway is organizational ownership, not a tool shopping list. This can work as a conference opening session or a lightning slot.

## The Future of Product Engineering

**Subtitle:** Shorter feedback loops, explicit product boundaries

**Format:** 30 minutes; 14 slides. Systems-thinking talk.

**Audience:** Product and engineering leaders, senior product engineers, designers, analysts, growth and experimentation teams.

### 50-word abstract

Product teams already run feedback systems; their evidence often arrives through slow, disconnected handoffs. This talk redesigns the loop from customer signal to remembered decision. A synthetic experiment exposes a metric win that harms the product, showing why faster learning needs trustworthy measurement, explicit constraints, and accountable human decision owners.

### 150-word abstract

Support sees confusion. Analytics sees an activation drop. Sales wants more invitations. The product meeting has signals and no shared explanation. What would it take to make that organization learn faster?

This systems talk treats product development as a feedback loop. Agents can connect customer evidence, preserve competing explanations, prepare experiments, and retrieve decisions. But faster response is dangerous when the measurement is wrong or the objective rewards behavior the product should refuse.

Using a synthetic onboarding experiment, we watch an apparent activation winner fail a support threshold and a rule against fabricated urgency. We then distinguish blocked, review-eligible, and genuinely supported decisions. The talk covers experiment contracts, delayed outcomes, instrumentation failures, bounded reactivation, and practical examples of product taste.

Attendees leave able to map a product loop, identify its slowest evidence transfer, and define the constraints and owners required to shorten it without surrendering customer trust or product direction.

### Three audience outcomes

1. Map a product feedback loop and identify where evidence is delayed, lost, or overcompressed.
2. Write an experiment contract with outcomes, guardrails, stopping behavior, and an accountable owner.
3. Create a scoped decision record that future teams and agents can retrieve without turning one result into a universal rule.

### Notes for reviewers

This is a control-loop and organizational design talk, not a shortened technical implementation lecture. Competing explanations, delayed outcomes, trustworthy measurement, bounded reactivation, and decision memory form its spine. The four-minute demo shows how a local metric gain can violate system goals. Human taste is made explicit through examples and owners, not reduced to an unexplained numeric score.

## The Future of Product Engineering

**Subtitle:** Designing the product learning loop

**Format:** 40 minutes; 18 slides. Technical systems-builder talk.

**Audience:** Staff and senior engineers, AI architects, experimentation platform builders, technical product leaders. Assumes familiarity with events, feature flags, and basic A/B testing.

### 50-word abstract

Build a product learning system whose intermediate decisions can be inspected. This technical talk connects signal ingestion, structured hypotheses, reversible implementation, experiment validation, and scoped memory. A synthetic policy replay rejects an activation winner that breaches guardrails. Statistical design and human authority remain explicit, even when agents prepare the work.

### 150-word abstract

How should a product agent discover onboarding friction, prepare an experiment, and refuse to promote a manipulative treatment that improves activation? This talk designs that path as an inspectable system rather than an unbounded conversation.

We follow durable records through ingestion, evidence packets, structured hypotheses, approval, flagged implementation, exposure, measurement, and learned memory. The architecture separates scoring from permission and ties approval to a revision. Ordinary engineering controls make retries and rollback understandable.

A deterministic replay uses synthetic activation and support rates to demonstrate why hard guardrails cannot be traded away for a higher score. The technical discussion covers instrumentation checks, sample ratio mismatch, fixed-horizon versus sequential monitoring, and why arbitrary adaptive allocation cannot inherit A/B assumptions.

Attendees leave with a starting architecture, a decision contract, and a plan for expanding automation only after its evidence is trustworthy. Human owners retain product strategy, disputed judgments, consequential exposure, and release accountability.

### Three audience outcomes

1. Design durable records and state transitions for evidence, hypotheses, approvals, experiments, and decisions.
2. Separate scoring, hard permission gates, evidence sufficiency, and the accountable release decision.
3. Identify where instrumentation, adaptive allocation, stopping rules, and human authority constrain automation.

### Notes for reviewers

The technical variant supplies a reference architecture with deliberately ordinary tables, identifiers, feature flags, and idempotent actions. It is a proposed design, not a reported production deployment. The offline replay proves deterministic policy behavior only. Statistical methods are explained at the decision-boundary level; the talk does not claim to implement an experiment analysis engine. The practical endpoint is the smallest trustworthy loop, not an autonomous product manager.

## Portfolio fit and duplication boundary

Cry Me a Free Tier asks how low input prices shape architectural and business commitments. Product Engineering asks how a company can learn what to build while retaining its product promise. The economics talk uses a cost calculation; Product Engineering uses an onboarding policy replay. Product variants are deliberately alternatives: 15 minutes changes the audience’s framing, 30 minutes redesigns evidence flow and ownership, and 40 minutes designs durable state and execution controls. Do not book all three as independent flagship talks without disclosing the shared example.

## Submission integrity

Use the speaker’s real biography separately; none is invented here. Do not describe the demonstrations as live production results, statistically significant experiments, measured ROI, or a customer case study. Source and uncertainty details are in [evidence.md](./evidence.md); exact stage sequences and fallback plans are in [demo.md](./demo.md).
