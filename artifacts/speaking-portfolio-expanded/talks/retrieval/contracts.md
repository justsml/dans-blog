# Five documents, then the missing sixth

Synthetic exercise. Query: Acme asks whether it can cancel today without a fee.

| ID | Document | Content |
| --- | --- | --- |
| A | Current generic policy | Cancellation requires 30 days’ notice unless a signed customer addendum overrides it. |
| B | Signed Acme addendum, current | Acme’s cancellation and fee terms are governed by Schedule R. |
| C | Expired Acme contract | Immediate cancellation allowed under the expired agreement. |
| D | Another customer’s current contract | A fee waiver for that customer. |
| E | Internal support note | Probably immediate; author has not checked the executed agreement. |

Ask pairs which documents are useful evidence, then which are sufficient to answer. Do not require disagreement. The missing evidence is itself an acceptable observation.

## Presenter reveal, slide 10 only

F is Acme’s signed, current Schedule R. It permits immediate cancellation without a fee. The earlier retrieval pool included A–E, not F.

For this toy applicability rubric, a positive document supplies current governing evidence for Acme: the generic policy or executed customer-specific terms. A and B are positive; C is expired, D concerns another customer, and E is an unchecked guess. C can be topically relevant while negative under this rubric. Old run: B,A. New run: B,F. A naive precision@2 scorer treating unjudged as negative gives 1.0 versus 0.5. Judge F positive under the same rubric and both score 1.0. The new evidence is more useful for answering even though this coarse metric only returns to a tie. An applicability label alone does not establish sufficiency, authority, or a better ranking overall.

Scores are arithmetic over fixed IDs, not a measured retrieval benchmark.

The example demonstrates a possible incomplete-pool failure, not a universal property of TREC. Voorhees, Soboroff, and Lin’s 2022 recheck found TREC-8 run rankings almost identical after expanded judgments. Collection quality and diversity matter. The 2022 abstract reports Kendall’s tau correlations above 0.99 for rankings of all runs by mean evaluation score using official versus expanded judgments. This is rank correlation, not a percentage of scores that changed.
