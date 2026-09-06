# Visual review: parallelization

Reviewed against the current 16-slide outline. Diagrams are editable SVG source files and render offline in the browser deck. They show proposed designs and illustrative scenarios, not observed production traces. Other slides deliberately use typography.

| Slide | Visual | Purpose |
| --- | --- | --- |
| 1 | [Four calls hide forty provider jobs](../../../reveal-talks/assets/parallelization/01-four-calls-hide-forty-provider-jobs.svg) | Each of four batch-tool calls starts ten jobs: 4 × 10 = 40, before retries. |
| 2 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 3 | [Count items and attempts separately](../../../reveal-talks/assets/parallelization/03-count-items-and-attempts-separately.svg) | One retry per item can turn 40 logical items into 80 provider attempts. |
| 4 | [Every caller crosses shared admission](../../../reveal-talks/assets/parallelization/04-every-caller-crosses-shared-admission.svg) | One coordinated reservation protects tenant spend and entitlement across all callers. |
| 5 | [Reservations and charges share one ceiling](../../../reveal-talks/assets/parallelization/05-reservations-and-charges-share-one-ceiling.svg) | Illustrative $2 run cap: settled + reserved ≤ $2. Prices here are invented fixture values. |
| 6 | [Adapt pressure within a fixed limit](../../../reveal-talks/assets/parallelization/06-adapt-pressure-within-a-fixed-limit.svg) | The scheduler reduces admission after throttling; every increase remains inside the approved maximum. |
| 7 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 8 | [A job survives the caller](../../../reveal-talks/assets/parallelization/08-a-job-survives-the-caller.svg) | Persist intent and provider identity; uncertain acceptance goes to reconciliation, not blind replay. |
| 9 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 10 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 11 | [Independent attempts share requirements](../../../reveal-talks/assets/parallelization/11-independent-attempts-share-requirements.svg) | Different priorities expose tradeoffs. Common requirements and checks apply to every candidate. |
| 12 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 13 | [Synthesis must pass the gates again](../../../reveal-talks/assets/parallelization/13-synthesis-must-pass-the-gates-again.svg) | Useful parts can conflict. A combined design is a new candidate, not an inherited pass. |
| 14 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 15 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 16 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |

All earlier unused illustration prompts have been replaced with these asset references or explicit typography directions. Each diagram has accessible title and description text and a corresponding HTML alt attribute.
