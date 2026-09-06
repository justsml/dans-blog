# Visual review: adaptive-systems

Reviewed against the current 16-slide outline. Diagrams are editable SVG source files and render offline in the browser deck. They show proposed designs and illustrative scenarios, not observed production traces. Other slides deliberately use typography.

| Slide | Visual | Purpose |
| --- | --- | --- |
| 1 | [A successful response can break ingest](../../../reveal-talks/assets/adaptive-systems/01-a-successful-response-can-break-ingest.svg) | HTTP success does not establish that the payload still matches your contract. |
| 2 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 3 | [Proposal and authority are separate](../../../reveal-talks/assets/adaptive-systems/03-proposal-and-authority-are-separate.svg) | The planner proposes a mapping; trusted code validates and controls its activation. |
| 4 | [A rename is not a new meaning](../../../reveal-talks/assets/adaptive-systems/04-a-rename-is-not-a-new-meaning.svg) | A documented rename can preserve meaning; an undefined business state needs an owner. |
| 5 | [A repair has a version and a scope](../../../reveal-talks/assets/adaptive-systems/05-a-repair-has-a-version-and-a-scope.svg) | Promote a tested mapping within its allowed scope; reconcile writes if you roll back. |
| 6 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 7 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 8 | [Recovery stays inside approved regions](../../../reveal-talks/assets/adaptive-systems/08-recovery-stays-inside-approved-regions.svg) | Check the entire dependency path; lower latency alone does not authorize a destination. |
| 9 | [A lost response leaves an unknown outcome](../../../reveal-talks/assets/adaptive-systems/09-a-lost-response-leaves-an-unknown-outcome.svg) | Reconcile the operation identity before another submission; retain unresolved reservations. |
| 10 | [Three events require three decisions](../../../reveal-talks/assets/adaptive-systems/10-three-events-require-three-decisions.svg) | Recovery, quarantine and reconciliation are all legitimate outcomes of the same ingest job. |
| 11 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 12 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 13 | [Keep access capabilities out of the planner](../../../reveal-talks/assets/adaptive-systems/13-keep-access-capabilities-out-of-the-planner.svg) | Proposed boundary: the dispatcher grants worker access; only allowlisted status returns to the planner. |
| 14 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 15 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |
| 16 | Typography | Keep the current slide's comparison, checklist or closing argument readable. |

All earlier unused illustration prompts have been replaced with these asset references or explicit typography directions. Each diagram has accessible title and description text and a corresponding HTML alt attribute.
