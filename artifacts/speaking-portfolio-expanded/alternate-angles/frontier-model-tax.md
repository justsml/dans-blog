# When Every Feature Needs the Expensive Brain

**Alternate title:** The Frontier Model Tax  
**Best format:** 30–40 minutes with a model-substitution exercise  
**Audience:** Product engineers, architects, platform teams, founders, CTOs, engineering and product leaders

## The angle

Teams are learning what intelligent software feels like through the most capable hosted models. Then they design products that only work if that level of capability, context, tool use, and long-horizon behavior remains available at today's price and terms.

The risk is not simply vendor lock-in. It is capability lock-in: the product promise itself may depend on a class of model that is hard to replace.

## Thesis

An intelligent product needs a capability portfolio, not a favorite model. The architecture should reveal which work truly needs a frontier model, which work can move, and what the product does when price, latency, availability, policy, or model behavior changes.

## Opening

> You did not integrate a model. You promised a level of intelligence to your customer. Can anyone else supply it?

Start with a feature that looks like one model call but actually depends on long context, tool use, retries, memory, and review. Remove the frontier model. What still works?

## Talk arc

### 1. From model choice to product promise

- Users experience a capability, not a provider SKU.
- A model upgrade can quietly become part of the product contract.
- The more ambitious the feature, the more hidden assumptions collect underneath it.

### 2. Capability lock-in

Inventory the things a replacement must reproduce:

- task success on local cases;
- tool-call reliability;
- usable context length;
- latency and streaming behavior;
- safety and policy behavior;
- language or domain specialization;
- recovery after partial failure;
- cost per accepted outcome.

This is the substitution surface. “Supports the same API” covers almost none of it.

### 3. The replacement drill

Take one production-shaped workflow and route it through three lanes:

1. the current frontier model;
2. a smaller hosted or specialist model;
3. a local or open-weight option where operationally plausible.

Do not compare eloquence. Compare accepted outcomes, failure classes, time, total cost, and human repair.

### 4. Build a model portfolio

- Route by task and evidence, not brand loyalty.
- Keep a deterministic path for work that should never have become inference.
- Make the expensive lane explicit and bounded.
- Preserve an exit test: the same local cases must run against a candidate replacement.
- Treat safety as an evaluated system property, not something granted by provider nationality or marketing.

### 5. Degrade the promise deliberately

When the preferred model is unavailable or unaffordable, the product needs a designed behavior:

- narrower scope;
- queued work;
- a smaller model plus review;
- deterministic fallback;
- explicit handoff to a person;
- refusal to make a promise it cannot keep.

Close on the question: what does your product become when its smartest dependency is removed?

## Audience takeaway

Attendees leave with a capability-lock-in inventory, a three-lane substitution test, and a fallback ladder that protects the product promise without pretending every model is interchangeable.

## Event alignment

| Priority | Target | Relevance | Focus for this room |
| --- | --- | --- | --- |
| 1 | PlatformCon | Direct fit for platform governance, routing, and AI infrastructure | Present the capability portfolio as a paved road with measured escape hatches. |
| 1 | ProductWorld | Exact product/product-engineering audience | Center the customer promise, margin, and which degradations remain acceptable. |
| 1 | ACM Austin: Enterprise AI & Engineering | Broad technical and enterprise fit | Use a concrete substitution matrix and one real tool-using workflow. |
| 1 | AI & Product Colorado | Strong local product route | Make this a decision workshop: what capability did the team accidentally promise? |
| 2 | Boston / NYC / Denver AI Developers | Strong builder audience | Go deeper on routing, eval cases, streaming differences, and recovery. |
| 2 | Data Summit | Agentic AI and operational AI fit | Use a data workflow and focus on operational evidence, not general product strategy. |
| 2 | KubeCon + CloudNativeCon North America | Strong infrastructure audience; future CFP details were not yet published in the snapshot | Emphasize serving boundaries, policy, observability, and graceful degradation. |
| 3 | ProductTank chapters | Good strategic route if stripped of infrastructure detail | Focus on product promises, switching cost, and what users experience during degradation. |
| 3 | AI Tinkerers / Colorado AI Builders | Only as a working demo | Live-route one task across two or three models and show the failures; no slide-only version. |

## Relationship to existing talks

**Buy Me a Free Tier** owns the economics of cheap inputs and cost per accepted outcome. **Adaptive, agentic apps** owns access, recovery, and per-job agent design. **Dynamic Scaling** owns compute admission and resource policy. This angle owns the substitution surface between a product promise and the model portfolio beneath it.

If the outline drifts into compute leases, scheduling, or concurrency, send that material back to Dynamic Scaling. If it becomes a general prediction about rebuilding product organizations, send it to Product Engineering.

## Evidence needed before delivery

- A real or synthetic workflow with an explicit acceptance rule.
- Results from at least two materially different model classes.
- Effective context and output limits recorded separately.
- Total cost including retries, tools, review, and repair.
- A clear statement that open-weight, local, Chinese, US-hosted, and specialist models are categories to test, not quality or safety conclusions.
