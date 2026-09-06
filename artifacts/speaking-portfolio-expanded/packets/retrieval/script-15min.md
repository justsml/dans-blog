# Your Eval Suite Has a Grandfather: 15-minute presenter script

Use slides 1, 2, 8, 9, 10, 11, 12, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Pairs get 45 seconds. Keep the missing schedule hidden until the pooling demonstration. The opening survives.

## 00:00 to 01:30: slide 1, The sentence

On screen:

> RAG · embeddings · memory · MCP · judges · traces
> There is a reading list under that pitch.

Our agent uses RAG over an embedding store, adds memories to context, calls MCP tools, emits structured outputs, gets evaluated by an LLM judge, and traces the whole thing through our agent observability platform.

That sentence used to be the talk. Translate the nouns and everybody feels less behind. But knowing what the nouns mean does not tell us whether the retrieval works. The useful question is what the people who studied it already found out.

We spent years calling it search. Then we called it a vector database and raised a round. The product category changed. The problem of deciding whether the returned material is useful did not wait for the funding announcement.

Delivery: Read the opening sentence quickly and straight-faced. Pause after it. Keep this hook in every route.

## 01:30 to 02:30: slide 2, The bet, and the eight words

On screen:

> You are joining an old field late
> Term specificity → assessor disagreement

This is an engineer's reading of information retrieval, with synthetic exercises and sources attached. The claim is that we skipped useful evaluation work, not that IR researchers solved every problem in RAG.

Eight words will do the work: term specificity, vector space model, vocabulary problem, passage retrieval, relevance judgment, the Cranfield paradigm, pooling, and assessor disagreement.

By the end we will use them to find a hole in a golden dataset. The hole will make a better retriever look worse. Then we will ask whether that happens in a collection built by people who knew to look for it.

Story: The retrieval improvement your eval rejected because it found evidence outside the original expected set. Bring the query, old labels, new document, and rejudgment.

Bridge: term specificity, vectors, vocabulary mismatch, and passage retrieval explain how we obtain candidates. Now judge the evidence they returned.

## 02:30 to 05:00: slide 8, Judge these five documents

On screen:

> A · current generic policy; 30-day notice
> B · signed Acme addendum; “see Schedule R”
> C · expired Acme terms; immediate cancellation
> D · current terms for another customer
> E · support note; “probably immediate”

Acme asks whether it can cancel today without a fee. Which documents belong in the evidence supplied to answer it? Work in pairs for sixty seconds.

A is current but generic. B is signed and specific, but refers to a schedule we have not supplied. C has the answer we might like and is expired. D is about somebody else. E is an employee's guess.

Now compare answers. You just made relevance judgments. Relevant to the topic, applicable to this customer, authoritative, and sufficient to answer are different criteria. If the room agrees perfectly, change the question from "useful evidence" to "enough to authorize cancellation" and compare again. Do not manufacture disagreement for the punchline.

Delivery: Give 60 seconds in pairs and collect two judgments with reasons. Do not reveal the missing schedule until slide 10. Use contracts.md for the full synthetic fixture.

## 05:00 to 06:30: slide 9, Cranfield, Bedfordshire, 1966

On screen:

> Corpus + queries + relevance judgments
> 1966 → 2026 = 60 years

Cleverdon, Mills, and Keen's Cranfield report is dated 1966. Fix a document collection, define questions, judge relevance, and compare systems under the same conditions. Sixty years later, that is a recognizable shape for an eval harness.

The name is the Cranfield paradigm. It gives you a controlled comparison. It also forces choices about who writes the questions, who judges the evidence, and what the collection represents.

Your golden dataset is a test collection with a flattering filename. Write down its collection protocol. If it consists of whatever your first retriever happened to find, the next slide is about you.

Source: Cleverdon, Mills, and Keen (1966), [Factors Determining the Performance of Indexing Systems, Volume I, Design, Part 2, front matter](https://sigir.org/files/museum/Factors%20Determining%20the%20Performance%20of%20Indexing%20Systems%20Volume%20I.%20Design%20-%20Part%202.%20Appendices/pdfs/frontmatter.pdf).

## 06:30 to 09:30: slide 10, Demo: the hole in the golden set

On screen:

> Old pool: A, B, C, D, E
> New result: F · signed Schedule R
> Unjudged is not a relevance judgment

The old retrievers contributed A through E to the judgment pool. Our new retriever finds F: the signed Schedule R referenced by B. It waives Acme's cancellation fee. Nobody judged it because nobody retrieved it.

Our naive scorer treats unjudged as nonrelevant. Old top two, B and A: two judged relevant, precision at two equals one. New top two, B and F: only B gets credit, precision at two equals point five. Judge F under the same rubric and the new run returns to one. We changed no retrieval output. We fixed the instrument.

TREC used pooling because judging every document for every query was impractical. Zobel investigated reliability with incomplete judgments. The risk is real; universal failure is not. In a 2022 recheck, Voorhees, Soboroff, and Lin expanded TREC-8 judgments and found system-rank correlations above point nine nine. Deep, diverse pools had held up.

That is the lesson we missed. They tested whether the shortcut damaged the comparison. We called our first results golden.

Source: Justin Zobel (1998), [How reliable are the results of large-scale information retrieval experiments?](https://doi.org/10.1145/290941.291014), SIGIR, 307–314. Voorhees, Soboroff, and Lin (2022), [Can Old TREC Collections Reliably Evaluate Modern Neural Retrieval Models?](https://arxiv.org/abs/2201.11086). [NIST TREC overview](https://trec.nist.gov/overview.html), started 1992.

Delivery: Run `bun artifacts/speaking-portfolio-expanded/packets/retrieval/pooling.ts` after revealing F. Walk through 2/2, 1/2, then 2/2. Explain that the metric measures topical relevance, not sufficiency or permission.

## 09:30 to 11:30: slide 11, Assessors disagree. Rankings can survive.

On screen:

> Voorhees, 2000: changed judgments, stable comparisons
> Test your comparison under more than one assessor

Voorhees varied relevance judgments and examined the resulting system rankings. The comparative results stayed stable despite substantial judgment differences in those experiments.

An absolute score and an A-versus-B ordering make different demands on the labels. That does not mean a model judge is trustworthy because it ranks two answers. It means we have a specific test to run: relabel a sample independently, then see which conclusions survive.

Keep disagreement as data. Was the case ambiguous? Did the rubric ask two questions at once? Did one assessor have the signed schedule and another not? A consensus label without that explanation can conceal exactly the distinction the next system needs.

Source: Ellen M. Voorhees (2000), [Variations in Relevance Judgments and the Measurement of Retrieval Effectiveness](https://www.nist.gov/publications/variations-relevance-judgments-and-measurement-retrieval-effectiveness), Information Processing & Management 36(5), 697–716.

## 11:30 to 13:30: slide 12, What changed: the next reader is a generator

On screen:

> Useful to inspect ≠ sufficient to answer
> Score retrieval and the resulting answer separately

A person inspecting a ranked list can notice that the signed addendum refers to a missing schedule and go looking. Our generator may instead turn the generic thirty-day policy into a fluent answer about Acme.

We can build abstention and verification into that system. We cannot infer that it will use them from a good retrieval score. The retrieved material must be applicable, sufficiently complete, and represented with the qualifiers the answer needs.

Evaluate the handoff. Did retrieval find B and F? Did context assembly keep their relationship? Did the answer cite the actual exception? If the answer is wrong, those checks locate the failure instead of blaming the nearest model. IR also studied machine consumers before modern RAG; the change here is this particular generative handoff and its failure modes.

Bridge: retrieved text supplies evidence, never tool authority. Name a corpus owner and an update path.

## 13:30 to 15:00: slide 15, Eight words. Sixty years. One instruction.

On screen:

> Your eval suite has a grandfather.
> Find the documents your eval never judged.

Term specificity. Vector space model. Vocabulary problem. Passage retrieval. Relevance judgment. The Cranfield paradigm. Pooling. Assessor disagreement.

Those words tell us why rare identifiers matter, why synonyms are hard, why a passage needs its exception, and why the score depends on who judged which documents. They are tools for investigating a failure, not a history quiz.

Sixty years since the Cranfield report. The field did not just build evaluations. It investigated when they could be trusted. Go find the documents your eval set never judged.

Delivery: Leave the B/F example up during questions. Keep all eight terms in the notes; the screen closes on the instruction.
