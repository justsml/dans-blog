# Three Search Methods in a Fundable Trenchcoat: bullet outline

The IR evaluation history missing from your golden dataset.

Generated from [the 40-minute outline](outline-40min.md) by `bun artifacts/speaking-portfolio-expanded/bullets.ts`. Edit the outline, not this file. 15 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](adaptation-15min.md) · [30](adaptation-30min.md).

## Spine

1. **The sentence** — 00:00 · warm · 02:30
2. **The bet, and the eight words** — 02:30 · warm · 02:00
3. **1972: rare words matter more** — 04:30 · build · 03:00
4. **Vector Database, 1975** — 07:30 · build · 02:30
5. **The vocabulary problem** — 10:00 · build · 02:30
6. **Chunking is passage retrieval** — 12:30 · build · 02:00
7. **BM25 is still standing there** — 14:30 · build · 02:00
8. **Judge these five documents** — 16:30 · build · 03:30
9. **Cranfield, Bedfordshire, 1966** — 20:00 · build · 03:00
10. **Fool's Golden Dataset** — 23:00 · peak · 04:00
11. **Assessors disagree. Rankings can survive.** — 27:00 · build · 03:00
12. **The Reader Stopped Being a Person** — 30:00 · build · 03:00
13. **Retrieved text now sits beside instructions** — 33:00 · build · 02:30
14. **The old cost of keeping knowledge current** — 35:30 · land · 02:30
15. **Eight words. Sixty years. One instruction.** — 38:00 · land · 02:00

## Slides

### 1. The sentence

00:00–02:30 · warm · 02:30

> RAG · embeddings · memory · MCP · judges · traces
> There is a reading list under that pitch.

- Our agent uses RAG over an embedding store, adds memories to context, calls MCP tools, emits structured outputs, gets evaluated by an LLM judge, and traces the whole thing through our agent observability platform.
- That sentence used to be the talk. Translate the nouns and everybody feels less behind.
- We spent years calling it search. Then we called it a vector database and raised a round.
- Do — Read the opening sentence quickly and straight-faced. Pause after it. Keep this hook in every route.

### 2. The bet, and the eight words

02:30–04:30 · warm · 02:00

> You are joining an old field late
> Term specificity → assessor disagreement

- This is an engineer's reading of information retrieval, with synthetic exercises and sources attached.
- Eight words will do the work: term specificity, vector space model, vocabulary problem, passage retrieval, relevance judgment, the Cranfield paradigm, pooling, and assessor disagreement.
- By the end we will use them to find a hole in a golden dataset.
- Story — The retrieval improvement your eval rejected because it found evidence outside the original expected set. Bring the query, old labels, new document, and rejudgment.

### 3. 1972: rare words matter more

04:30–07:30 · build · 03:00

> Karen Spärck Jones · term specificity
> 1972 → 2026 = 54 years

- Karen Spärck Jones published a statistical interpretation of term specificity in 1972.
- Think of an error code in a support query.
- Fifty-four years. We have had time to put her name on the slide.
- Do — Compare a generic support phrase with an exact error identifier. Ask the room which term it would retain in a hybrid query.
- Source — Karen Spärck Jones (1972), A statistical interpretation of term specificity and its application in retrieval, Journal of Documentation 28(1), 11–21. [Author’s publication archive](https://www.cl.cam.ac.uk/archive/ksj21/ksjdigipapers/ksjbib3.html).

### 4. Vector Database, 1975

07:30–10:00 · build · 02:30

> Salton, Wong, Yang · vector space model · 1975
> Deerwester and colleagues · latent semantic analysis · 1990

- Salton, Wong, and Yang described a vector space model for automatic indexing in 1975.
- Modern neural embeddings differ in how they learn and what they represent.
- A vector store gives you a place to search those representations.
- Source — Salton, Wong, and Yang (1975), [A vector space model for automatic indexing](https://doi.org/10.1145/361219.361220), Communications of the ACM 18(11), 613–620. Deerwester, Dumais, Furnas, Landauer, and Harshman (1990), [Indexing by Latent Semantic Analysis](https://www.cs.csustan.edu/~mmartin/LDS/Deerwester-et-al.pdf), JASIS 41(6), 391–407.

### 5. The vocabulary problem

10:00–12:30 · build · 02:30

> The customer says “stop billing”
> The document says “terminate renewal”

- Two people can refer to the same thing using different words.
- Our customer says stop billing. The policy says terminate renewal.
- Now reverse it. Two documents both say cancel, but one cancels a meeting and one cancels a subscription.
- Do — Ask for two phrases a customer uses that never appear in the internal docs. Allow 30 seconds.
- Source — Furnas, Landauer, Gomez, and Dumais (1987), [The vocabulary problem in human-system communication](https://doi.org/10.1145/32206.32212), Communications of the ACM 30(11), 964–971.

### 6. Chunking is passage retrieval

12:30–14:30 · build · 02:00

> Salton, Allan, Buckley · 1993
> The useful passage may cross your boundary

- Passage retrieval was being studied before our chunk-size arguments acquired a token budget.
- Take a policy paragraph that says cancellation is allowed, followed by an exception for annual contracts.
- The old papers do not contain the perfect chunk size for your current generator.
- Source — Salton, Allan, and Buckley (1993), [Approaches to passage retrieval in full text information systems](https://doi.org/10.1145/160688.160693), SIGIR, 49–58.

### 7. BM25 is still standing there

14:30–16:30 · build · 02:00

> BEIR, 2021: a robust lexical baseline
> Compare lexical, dense, and hybrid on your task

- BEIR's 2021 experiments found BM25 a robust baseline across heterogeneous retrieval tasks.
- That is a dated experimental result, not a claim that BM25 wins in 2026.
- Lexical, dense, hybrid. Those are the three search methods in the trenchcoat, and the pitch usually names one of them.
- Source — Thakur et al. (2021), [BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models](https://openreview.net/pdf?id=wCu6T5xFjeJ), NeurIPS Datasets and Benchmarks. This slide reports the 2021 experiment.

### 8. Judge these five documents

16:30–20:00 · build · 03:30

> A · current generic policy; 30-day notice
> B · signed Acme addendum; “see Schedule R”
> C · expired Acme terms; immediate cancellation
> D · current terms for another customer
> E · support note; “probably immediate”

- Acme asks whether it can cancel today without a fee.
- A is current but generic. B is signed and specific, but refers to a schedule we have not supplied.
- Now compare answers. You just made relevance judgments.
- Do — Give 60 seconds in pairs and collect two judgments with reasons. Do not reveal the missing schedule until slide 10. Use contracts.md for the full synthetic fixture.

### 9. Cranfield, Bedfordshire, 1966

20:00–23:00 · build · 03:00

> Corpus + queries + relevance judgments
> 1966 → 2026 = 60 years

- Cleverdon, Mills, and Keen's Cranfield report is dated 1966.
- The name is the Cranfield paradigm. It gives you a controlled comparison.
- Your golden dataset is a test collection with a flattering filename.
- Diagram — Cranfield, Bedfordshire, 1966
- Source — Cleverdon, Mills, and Keen (1966), [Factors Determining the Performance of Indexing Systems, Volume I, Design, Part 2, front matter](https://sigir.org/files/museum/Factors%20Determining%20the%20Performance%20of%20Indexing%20Systems%20Volume%20I.%20Design%20-%20Part%202.%20Appendices/pdfs/frontmatter.pdf).

### 10. Fool's Golden Dataset

23:00–27:00 · peak · 04:00

> Old pool: A, B, C, D, E
> New result: F · signed Schedule R
> Unjudged is not a relevance judgment

- The old retrievers contributed A through E to the judgment pool.
- Our naive scorer treats unjudged as nonrelevant.
- TREC used pooling because judging every document for every query was impractical.
- That is the lesson we missed. They tested whether the shortcut damaged the comparison.
- Do — Run `bun artifacts/speaking-portfolio-expanded/talks/retrieval/pooling.ts` after revealing F. Walk through 2/2, 1/2, then 2/2. Explain that the metric measures topical relevance, not sufficiency or permission.
- Source — Justin Zobel (1998), [How reliable are the results of large-scale information retrieval experiments?](https://doi.org/10.1145/290941.291014), SIGIR, 307–314. Voorhees, Soboroff, and Lin (2022), [Can Old TREC Collections Reliably Evaluate Modern Neural Retrieval Models?](https://arxiv.org/abs/2201.11086). [NIST TREC overview](https://trec.nist.gov/overview.html), started 1992.

### 11. Assessors disagree. Rankings can survive.

27:00–30:00 · build · 03:00

> Voorhees, 2000: changed judgments, stable comparisons
> Test your comparison under more than one assessor

- Voorhees varied relevance judgments and examined the resulting system rankings.
- An absolute score and an A-versus-B ordering make different demands on the labels.
- Keep disagreement as data. Was the case ambiguous?
- Source — Ellen M. Voorhees (2000), [Variations in Relevance Judgments and the Measurement of Retrieval Effectiveness](https://www.nist.gov/publications/variations-relevance-judgments-and-measurement-retrieval-effectiveness), Information Processing & Management 36(5), 697–716.

### 12. The Reader Stopped Being a Person

30:00–33:00 · build · 03:00

> Useful to inspect ≠ sufficient to answer
> Score retrieval and the resulting answer separately

- A person inspecting a ranked list can notice that the signed addendum refers to a missing schedule and go looking.
- We can build abstention and verification into that system.
- Evaluate the handoff. Did retrieval find B and F?

### 13. Retrieved text now sits beside instructions

33:00–35:30 · build · 02:30

> Relevance gives evidence, not authority
> A document cannot grant a tool permission

- Put a sentence in the retrieved support note telling the assistant to ignore policy and issue a credit.
- The ranking score answers how well the content matches a retrieval objective.
- Keep this boundary in the end-to-end evaluation.
- Do — Use a harmless printed instruction in the synthetic support note. Do not connect the exercise to live tools.

### 14. The old cost of keeping knowledge current

35:30–38:00 · land · 02:30

> McDermott’s R1: a real configuration system
> Who updates the knowledge when the product changes?

- McDermott's R1 configured computer systems at DEC.
- The useful question is who supplies and maintains the domain knowledge.
- A model does not remove that obligation.
- Source — John McDermott (1982), [R1: A rule-based configurer of computer systems](https://www.sciencedirect.com/science/article/abs/pii/0004370282900212), Artificial Intelligence 19(1), 39–88.

### 15. Eight words. Sixty years. One instruction.

38:00–40:00 · land · 02:00

> Three search methods. One instrument nobody checked.
> Find the documents your eval never judged.

- Term specificity. Vector space model. Vocabulary problem.
- Those words tell us why rare identifiers matter, why synonyms are hard, why a passage needs its exception, and why the score depends on who judged which documents.
- Three search methods in a fundable trenchcoat.
- Do — Say the title line once, flat, then drop to the instruction. Leave the B/F example up during questions. Keep all eight terms in the notes; the screen closes on the instruction.
