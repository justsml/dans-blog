# Your Eval Suite Has a Grandfather: 40-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A.

## 00:00 to 02:30: slide 1, The sentence

Our agent uses RAG over an embedding store, adds memories to context, calls MCP tools, emits structured outputs, gets evaluated by an LLM judge, and traces the whole thing through our agent observability platform.

That sentence used to be the talk. Translate the nouns and everybody feels less behind. But knowing what the nouns mean does not tell us whether the retrieval works. The useful question is what the people who studied it already found out.

We spent years calling it search. Then we called it a vector database and raised a round. The product category changed. The problem of deciding whether the returned material is useful did not wait for the funding announcement.

Delivery: Read the opening sentence quickly and straight-faced. Pause after it. Keep this hook in every route.

## 02:30 to 04:30: slide 2, The bet, and the eight words

This is an engineer's reading of information retrieval, with synthetic exercises and sources attached. The claim is that we skipped useful evaluation work, not that IR researchers solved every problem in RAG.

Eight words will do the work: term specificity, vector space model, vocabulary problem, passage retrieval, relevance judgment, the Cranfield paradigm, pooling, and assessor disagreement.

By the end we will use them to find a hole in a golden dataset. The hole will make a better retriever look worse. Then we will ask whether that happens in a collection built by people who knew to look for it.

Story: The retrieval improvement your eval rejected because it found evidence outside the original expected set. Bring the query, old labels, new document, and rejudgment.

## 04:30 to 07:30: slide 3, 1972: rare words matter more

Karen Sparck Jones published a statistical interpretation of term specificity in 1972. A word that appears in almost every document tells you less about which document you want than a rare term does.

Think of an error code in a support query. The words "application error" occur everywhere. The exact identifier narrows the search. That is a concrete reason to keep lexical evidence in a retrieval system that also understands paraphrases.

Fifty-four years. We have had time to put her name on the slide. The point is not that every rare word is relevant. A typo can be rare. The point is that corpus frequency supplies evidence, and the evidence has a history and assumptions you can inspect.

Source: Karen Sparck Jones (1972), A statistical interpretation of term specificity and its application in retrieval, Journal of Documentation 28(1), 11–21. [Author’s publication archive](https://www.cl.cam.ac.uk/archive/ksj21/ksjdigipapers/ksjbib3.html).

Delivery: Compare a generic support phrase with an exact error identifier. Ask the room which term it would retain in a hybrid query.

## 07:30 to 10:00: slide 4, 1975 and 1990: the vector was already there

Salton, Wong, and Yang described a vector space model for automatic indexing in 1975. Documents become weighted representations that support comparisons. In 1990, Deerwester and colleagues described latent semantic analysis using a low-rank representation of term-document structure.

Modern neural embeddings differ in how they learn and what they represent. The useful continuity is representing text numerically so related material can be retrieved despite imperfect word matching.

A vector store gives you a place to search those representations. It does not choose the right relevance definition. It does not tell you that a highly similar contract governs this customer. That work is still ours.

Source: Salton, Wong, and Yang (1975), [A vector space model for automatic indexing](https://doi.org/10.1145/361219.361220), Communications of the ACM 18(11), 613–620. Deerwester, Dumais, Furnas, Landauer, and Harshman (1990), [Indexing by Latent Semantic Analysis](https://www.cs.csustan.edu/~mmartin/LDS/Deerwester-et-al.pdf), JASIS 41(6), 391–407.

## 10:00 to 12:30: slide 5, The vocabulary problem

Two people can refer to the same thing using different words. Furnas, Landauer, Gomez, and Dumais studied that vocabulary problem in human-system communication in 1987.

Our customer says stop billing. The policy says terminate renewal. Exact matching has a problem. A semantic representation is one answer. So are aliases, expansion, and better indexing. An embedding is a method, not the reason the problem exists.

Now reverse it. Two documents both say cancel, but one cancels a meeting and one cancels a subscription. Shared words do not establish shared intent. Evaluation needs cases for both vocabulary mismatch and misleading overlap.

Source: Furnas, Landauer, Gomez, and Dumais (1987), [The vocabulary problem in human-system communication](https://doi.org/10.1145/32206.32212), Communications of the ACM 30(11), 964–971.

Delivery: Ask for two phrases a customer uses that never appear in the internal docs. Allow 30 seconds.

## 12:30 to 14:30: slide 6, Chunking is passage retrieval

Passage retrieval was being studied before our chunk-size arguments acquired a token budget. Salton, Allan, and Buckley compared approaches in 1993.

Take a policy paragraph that says cancellation is allowed, followed by an exception for annual contracts. Split between those paragraphs and the first chunk becomes a very persuasive wrong answer. Make the chunk enormous and the exception competes with a page of irrelevant material.

The old papers do not contain the perfect chunk size for your current generator. They give you experimental questions. What unit are we retrieving? What counts as enough evidence? Are we measuring the passage, the document, or the answer produced from it? Change one and the score may mean something else.

Source: Salton, Allan, and Buckley (1993), [Approaches to passage retrieval in full text information systems](https://doi.org/10.1145/160688.160693), SIGIR, 49–58.

## 14:30 to 16:30: slide 7, BM25 is still standing there

BEIR's 2021 experiments found BM25 a robust baseline across heterogeneous retrieval tasks. Reranking and late-interaction models performed best on average in that study, at higher computational cost.

That is a dated experimental result, not a claim that BM25 wins in 2026. It is a reason to include a cheap lexical baseline when measuring a new retriever. Exact identifiers and unfamiliar domain language are places where a semantic-looking system can disappoint you.

Run the comparison on the same corpus, queries, and judgments. Otherwise you have compared two demonstrations and called the difference a model improvement.

Source: Thakur et al. (2021), [BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models](https://openreview.net/pdf?id=wCu6T5xFjeJ), NeurIPS Datasets and Benchmarks. This slide reports the 2021 experiment.

## 16:30 to 20:00: slide 8, Judge these five documents

Acme asks whether it can cancel today without a fee. Which documents belong in the evidence supplied to answer it? Work in pairs for sixty seconds.

A is current but generic. B is signed and specific, but refers to a schedule we have not supplied. C has the answer we might like and is expired. D is about somebody else. E is an employee's guess.

Now compare answers. You just made relevance judgments. Relevant to the topic, applicable to this customer, authoritative, and sufficient to answer are different criteria. If the room agrees perfectly, change the question from "useful evidence" to "enough to authorize cancellation" and compare again. Do not manufacture disagreement for the punchline.

Delivery: Give 60 seconds in pairs and collect two judgments with reasons. Do not reveal the missing schedule until slide 10. Use contracts.md for the full synthetic fixture.

## 20:00 to 23:00: slide 9, Cranfield, Bedfordshire, 1966

Cleverdon, Mills, and Keen's Cranfield report is dated 1966. Fix a document collection, define questions, judge relevance, and compare systems under the same conditions. Sixty years later, that is a recognizable shape for an eval harness.

The name is the Cranfield paradigm. It gives you a controlled comparison. It also forces choices about who writes the questions, who judges the evidence, and what the collection represents.

Your golden dataset is a test collection with a flattering filename. Write down its collection protocol. If it consists of whatever your first retriever happened to find, the next slide is about you.

Source: Cleverdon, Mills, and Keen (1966), [Factors Determining the Performance of Indexing Systems, Volume I, Design, Part 2, front matter](https://sigir.org/files/museum/Factors%20Determining%20the%20Performance%20of%20Indexing%20Systems%20Volume%20I.%20Design%20-%20Part%202.%20Appendices/pdfs/frontmatter.pdf).

## 23:00 to 27:00: slide 10, Demo: the hole in the golden set

The old retrievers contributed A through E to the judgment pool. Our new retriever finds F: the signed Schedule R referenced by B. It waives Acme's cancellation fee. Nobody judged it because nobody retrieved it.

Our naive scorer treats unjudged as nonrelevant. Old top two, B and A: two judged relevant, precision at two equals one. New top two, B and F: only B gets credit, precision at two equals point five. Judge F under the same rubric and the new run returns to one. We changed no retrieval output. We fixed the instrument.

TREC used pooling because judging every document for every query was impractical. Zobel investigated reliability with incomplete judgments. The risk is real; universal failure is not. In a 2022 recheck, Voorhees, Soboroff, and Lin expanded TREC-8 judgments and found system-rank correlations above point nine nine. Deep, diverse pools had held up.

That is the lesson we missed. They tested whether the shortcut damaged the comparison. We called our first results golden.

Source: Justin Zobel (1998), [How reliable are the results of large-scale information retrieval experiments?](https://doi.org/10.1145/290941.291014), SIGIR, 307–314. Voorhees, Soboroff, and Lin (2022), [Can Old TREC Collections Reliably Evaluate Modern Neural Retrieval Models?](https://arxiv.org/abs/2201.11086). [NIST TREC overview](https://trec.nist.gov/overview.html), started 1992.

Delivery: Run `bun artifacts/speaking-portfolio-expanded/packets/retrieval/pooling.ts` after revealing F. Walk through 2/2, 1/2, then 2/2. Explain that the metric measures topical relevance, not sufficiency or permission.

## 27:00 to 30:00: slide 11, Assessors disagree. Rankings can survive.

Voorhees varied relevance judgments and examined the resulting system rankings. The comparative results stayed stable despite substantial judgment differences in those experiments.

An absolute score and an A-versus-B ordering make different demands on the labels. That does not mean a model judge is trustworthy because it ranks two answers. It means we have a specific test to run: relabel a sample independently, then see which conclusions survive.

Keep disagreement as data. Was the case ambiguous? Did the rubric ask two questions at once? Did one assessor have the signed schedule and another not? A consensus label without that explanation can conceal exactly the distinction the next system needs.

Source: Ellen M. Voorhees (2000), [Variations in Relevance Judgments and the Measurement of Retrieval Effectiveness](https://www.nist.gov/publications/variations-relevance-judgments-and-measurement-retrieval-effectiveness), Information Processing & Management 36(5), 697–716.

## 30:00 to 33:00: slide 12, What changed: the next reader is a generator

A person inspecting a ranked list can notice that the signed addendum refers to a missing schedule and go looking. Our generator may instead turn the generic thirty-day policy into a fluent answer about Acme.

We can build abstention and verification into that system. We cannot infer that it will use them from a good retrieval score. The retrieved material must be applicable, sufficiently complete, and represented with the qualifiers the answer needs.

Evaluate the handoff. Did retrieval find B and F? Did context assembly keep their relationship? Did the answer cite the actual exception? If the answer is wrong, those checks locate the failure instead of blaming the nearest model. IR also studied machine consumers before modern RAG; the change here is this particular generative handoff and its failure modes.

## 33:00 to 35:30: slide 13, Retrieved text now sits beside instructions

Put a sentence in the retrieved support note telling the assistant to ignore policy and issue a credit. It may be relevant text in a support corpus. It is still untrusted input.

The ranking score answers how well the content matches a retrieval objective. It does not authorize an action. Keep tool permissions and policy checks outside the retrieved document's control. A signed cancellation exception can supply facts for a decision; it cannot change which account the tool is permitted to modify.

Keep this boundary in the end-to-end evaluation. Retrieval success, answer correctness, and action authorization are separate results. A useful citation does not turn a document into a supervisor.

Delivery: Use a harmless printed instruction in the synthetic support note. Do not connect the exercise to live tools.

## 35:30 to 38:00: slide 14, The old cost of keeping knowledge current

McDermott's R1 configured computer systems at DEC. The journal paper is from 1982. This was working software, not a cautionary fable about people foolish enough to use rules.

The useful question is who supplies and maintains the domain knowledge. Our retrieved policies and signed schedules have the same operational obligation: somebody must know when they change, what supersedes them, and which decisions depend on them.

A model does not remove that obligation. It makes stale knowledge easier to turn into a confident sentence. Name the owner of the corpus and the invalidation path. We do not need a grand theory of why expert systems declined to ask who updates Schedule R.

Source: John McDermott (1982), [R1: A rule-based configurer of computer systems](https://www.sciencedirect.com/science/article/abs/pii/0004370282900212), Artificial Intelligence 19(1), 39–88. The maintenance application is the speaker’s argument, not a claim that this paper explains the industry’s decline.

## 38:00 to 40:00: slide 15, Eight words. Sixty years. One instruction.

Term specificity. Vector space model. Vocabulary problem. Passage retrieval. Relevance judgment. The Cranfield paradigm. Pooling. Assessor disagreement.

Those words tell us why rare identifiers matter, why synonyms are hard, why a passage needs its exception, and why the score depends on who judged which documents. They are tools for investigating a failure, not a history quiz.

Sixty years since the Cranfield report. The field did not just build evaluations. It investigated when they could be trusted. Go find the documents your eval set never judged.

Delivery: Leave the B/F example up during questions. Keep all eight terms in the notes; the screen closes on the instruction.
