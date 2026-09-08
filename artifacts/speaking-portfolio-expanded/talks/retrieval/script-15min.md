# Three Search Methods in a Fundable Trenchcoat: 15-minute presenter script

Stable slide IDs, reordered around the early judgment exercise. Speak prose and bridges; do not read screen text, sources or stage directions as extra copy. Timings include interaction, exclude Q&A. Story substitutions never add time. [Per-slide budgets](timing.md).

## 00:00 to 01:20: slide 1, The sentence

> RAG · embeddings · memory · MCP · judges · traces
> Your retriever finds the hole in your ruler.

Our agent uses RAG over an embedding store, adds memories to context, calls MCP tools, emits structured outputs, gets evaluated by an LLM judge, and traces the whole thing through our agent observability platform.

We called it search. Then we called it a vector database and raised a round. Knowing the nouns does not tell us whether retrieval works. The useful question is what the people who studied it already found out.

Stage direction: Read the first sentence straight. Pause before the funding line.

## 01:20 to 02:45: slide 2, You are joining an old field late

> Lexical · dense · hybrid
> Three search methods in the trenchcoat.

This is an engineer's reading of information retrieval, with synthetic exercises and sources attached. The claim is that we skipped useful evaluation work, not that IR researchers solved every problem in RAG.

Lexical, dense, hybrid: those are the three search methods in the trenchcoat. We will judge documents before opening the reading list. Then we will test the scoring instrument that claims our new retriever got worse.

Bridge: the longer route diagnoses vocabulary, rare identifiers, and passage boundaries. Today we keep the pool, the judges, and the handoff.

## 02:45 to 04:55: slide 8, Judge these five documents

> Acme: “Can we cancel today without a fee?”
> A generic current policy · B signed Acme addendum: see Schedule R
> C expired Acme terms · D another customer’s terms · E unchecked guess

Which documents belong in the evidence? Pairs: sixty seconds.

Use current governing evidence for Acme as the scoring rule. A and B qualify. C is expired, D another customer, E an unchecked guess. This is applicability, not topical relevance. A positive label is not enough to authorize cancellation.

Stage direction: Give 60 seconds before labels. Take one reason. Keep Schedule R's contents hidden until slide 10. Do not manufacture disagreement.

## 04:55 to 06:10: slide 9, Cranfield, Bedfordshire, 1966

> Corpus + queries + judgments + a fixed scoring rule

Cleverdon, Mills, and Keen's Cranfield report is dated 1966. Fix a collection, define questions, judge relevance, compare systems under the same conditions. Sixty years later, you recognize the shape of an eval harness.

Your golden dataset is a test collection with a flattering filename. Write down its protocol. If it contains only what the first retriever found, the next slide is about you.

Source: [Cranfield report, 1966](https://sigir.org/files/museum/Factors%20Determining%20the%20Performance%20of%20Indexing%20Systems%20Volume%20I.%20Design%20-%20Part%202.%20Appendices/pdfs/frontmatter.pdf).

## 06:10 to 09:10: slide 10, Fool's Golden Dataset

> Old pool: A–E. Old top two: B,A. New top two: B,F.
> Unjudged is a missing label, not a negative judgment.

F is the signed Schedule R. It allows Acme to cancel immediately without a fee. Nobody judged it because nobody retrieved it. Our scorer treats unjudged as negative. Higher, lower, or the same score? Commit before we calculate.

Old run: two positives out of two. New run: only B gets credit, one out of two. Judge F using the same applicability rule: two out of two again. No output changed. The instrument did. Better answering evidence, but the metric only returns to a tie.

This is a shallow synthetic pool. Voorhees, Soboroff, and Lin's 2022 TREC-8 ad hoc recheck expanded judgments with new runs, including transformer models and BM25 baselines. All-run rankings by mean score had Kendall's tau correlations above 0.99 across old and expanded judgments. Deep, diverse pools held up. Rank correlation, not a percentage of scores that changed.

Stage direction: Show F, collect hands, then expose old-label scores. Ask what changes when F is judged; reveal that result separately. Reserve 55 seconds for prediction, arithmetic and reveal.

Source: [Voorhees, Soboroff, Lin (2022)](https://arxiv.org/abs/2201.11086).

## 09:10 to 10:45: slide 11, Assessors disagree. Rankings can survive.

> Different labels can leave the same ordering.

Voorhees's 2000 experiments varied relevance judgments; comparative rankings remained stable despite substantial label differences. That is a reason to test robustness, not to trust any model judge.

The twelve marks shown here are an authored illustration. Four differ; do not infer a disagreement rate. Keep the reasons: ambiguous case, two questions hidden in one rubric, or different evidence available to each assessor. Relabel independently and check which conclusions survive.

Source: [Voorhees (2000)](https://www.nist.gov/publications/variations-relevance-judgments-and-measurement-retrieval-effectiveness).

## 10:45 to 12:50: slide 12, The Reader Stopped Being a Person

> Useful to inspect ≠ sufficient to answer

A person can notice that B refers to missing Schedule R and look for it. A generator may turn the generic thirty-day policy into a fluent answer about Acme. A missing schedule is not a creative-writing prompt.

Check the handoff: did retrieval find B and F? Did context assembly preserve their relationship? Did the answer cite the exception? A retrieval score does not tell you that. Name who updates the schedule and what invalidates cached answers.

Bridge: a retrieved instruction cannot grant tool permission. Keep evidence, answer correctness, and action authority separate.

## 12:50 to 15:00: slide 15, Eight words. Sixty years. One instruction.

> Go find the documents your eval never judged.

The longer reading list gives names to the failures: rare identifiers, vocabulary mismatch, passage boundaries, and judgment holes. These are tools for investigating a failure, not a history quiz.

Lexical, dense, hybrid: we inherited all three. What we left behind was sixty years of checking whether the score was telling the truth. Your retriever found the hole in your ruler. Go find the documents your eval never judged.

Stage direction: Before the closing paragraph, give 45 seconds to name an unjudged document to inspect, take one share for 20 seconds, then reserve ten seconds for the final pause. Leave B and F visible. Stop talking.
