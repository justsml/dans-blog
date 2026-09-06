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

For this toy topical-relevance rubric, A and B are relevant, C/D/E are not. Old run: B,A. New run: B,F. A naive precision@2 scorer treating unjudged as nonrelevant gives 1.0 versus 0.5. Judge F relevant under the same rubric and both score 1.0. The new evidence is more useful for answering even though this coarse metric only returns to a tie. Relevance alone does not establish sufficiency, authority, or a better ranking overall.

Run `bun artifacts/speaking-portfolio-expanded/packets/retrieval/pooling.ts`. Scores are arithmetic over fixed IDs, not a measured retrieval benchmark.

The example demonstrates a possible incomplete-pool failure, not a universal property of TREC. Voorhees, Soboroff, and Lin’s 2022 recheck found TREC-8 run rankings almost identical after expanded judgments, with Kendall’s tau above 0.99. Collection quality and diversity matter.
