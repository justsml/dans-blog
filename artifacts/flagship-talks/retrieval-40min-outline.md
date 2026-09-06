# From RAGs to Retrievals: Learn the New Engineering Speak

40 minutes · 18 slides · Dan Levy

## 1. From RAGs to Retrievals

0.0–1.0 minutes

Learn the New Engineering Speak
40-minute talk

Frame the talk as a bridge for experienced software engineers entering AI work. Their knowledge of search, state, testing, permissions, and failure handling remains useful. The challenge is learning enough new vocabulary to recognize where those ideas apply, while avoiding the opposite mistake of assuming nothing changed. Tell the audience that each analogy will come with a boundary. The talk follows one system from retrieval through evaluation and action, then ends with the changes that deserve special attention.

## 2. Can we translate this vocabulary?

1.0–3.0 minutes

RAG. Embeddings. Memory. MCP.
Structured output. Judges. Traces.
A lot of nouns. A recognizable system.

The sentence to read, in full and with increasing speed if that fits the delivery: “Our agent uses RAG over an embedding store, adds memories to context, calls MCP tools, emits structured outputs, gets evaluated by an LLM judge, and traces the whole thing through our agent observability platform.” Read it Pause before translating it into search, state, API calls, typed data, automated checks, and traces. The humor should target the language rather than people learning it. Say that the shorthand is deliberately incomplete: generation is part of RAG, and an LLM judge is not a deterministic assertion. Those gaps are the point of the talk. Invite the audience to hold both the familiar behavior and the new failure modes in mind.

## 3. The translation is useful, but imperfect

3.0–5.0 minutes

Embeddings → feature representations
Vector database → similarity index
Structured output → typed data
Routing → workload allocation

Explain that these mappings identify an engineering concern, not exact equivalence. Embeddings encode learned representations; distance reflects the representation and does not certify meaning. A vector database can include storage and filtering beyond a similarity index. Schema-bound output helps consumers parse a response without proving that its values are correct. Routing resembles workload allocation, but deciding which model can meet a requirement often needs workload-specific evidence. Keep the table moving; it should orient the audience rather than become a glossary lecture. Next, inspect retrieval in depth.

## 4. RAG has more than one moving part

5.0–7.0 minutes

Query → candidate retrieval → ranking
Context construction → generation
Inspect the handoffs.

Walk through the pipeline as separate responsibilities. Query formation determines what can be found. Candidate retrieval determines the available pool. Ranking orders candidates. Context construction selects and assembles what the model sees. Generation produces the answer. Real systems can combine or repeat steps, but this separation makes failures easier to locate. If the correct document never entered the candidate set, a different generation prompt may not help. Ask where the audience would record evidence at each handoff, then introduce the retrieval choices behind that candidate set.

## 5. Similarity is one retrieval signal

7.0–9.0 minutes

Lexical / full-text / fuzzy matching
Metadata filters / vector similarity
Hybrid retrieval / reranking

Give each method a job rather than a sales pitch. Exact identifiers often benefit from lexical matching; fuzzy matching can tolerate spelling variation; metadata can restrict scope; vector similarity can find related language; hybrid retrieval combines signals; reranking can reconsider a candidate set. The best mixture depends on the corpus and the questions. Avoid implying that vectors supersede full-text search or that hybrid search always wins. The practical question is which relevant evidence each approach misses, and whether later stages can recover from that miss.

## 6. The consumer changes the relevance problem

9.0–11.0 minutes

Search: what should a person inspect?
RAG: what should a model reason over?
Relevant can still be misleading.

Traditional search also deals with trust, freshness, and conflicting evidence. The distinction here is that the RAG system passes selected material to another probabilistic component before a person may inspect it. A highly similar passage can be outdated, incomplete, or applicable to another customer. Context construction therefore needs more than a ranking score. It needs the information relationships that make a passage usable. Ask the audience to imagine a result that is topically perfect and operationally wrong. Use the following contract example to make that mismatch visible.

## 7. A contract question needs provenance

11.0–14.0 minutes

Hypothetical: cancel without paying?
Customer identity • effective version
Cancellation clause • renewal terms
Source authority • missing evidence

Mark the scenario as hypothetical. Present a customer asking whether cancellation has a fee. A pricing page, cancellation clause, FAQ, renewal policy, and older contract may all match the wording. Ask which document governs this customer at this time, and whether the system has enough evidence to answer. The point is not to teach contract interpretation; it is to expose identity, versioning, authority, and missing-context requirements. Those belong in the information design and tests. Close with the supplied claim that RAG is an information architecture, then move to evaluation.

## 8. An eval starts with a requirement

14.0–16.0 minutes

What behavior matters?
What evidence establishes it?
What failures must block release?

Translate eval into an automated check, then qualify the analogy. Some outcomes can be verified exactly; others need scoring or review. Before choosing an evaluator, identify what the product needs and what failure would mean. A fluent answer to the wrong customer’s question can pass a generic quality rubric while failing the requirement that matters. For the contract example, separate evidence selection from answer quality. Ask whether a single overall score would tell the team which component to fix. The next slide gives a way to choose checks.

## 9. Choose the cheapest sufficient oracle

16.0–19.0 minutes

Deterministic → constrained
Probabilistic → subjective
Use judgment only where needed.

Explain the spectrum through examples. Valid JSON and a known database row often permit direct checks. Required facts, citation support, and completed state transitions range from direct verification to interpreted assessment depending on the task. Helpfulness and tone usually need a rubric and judgment. Expert excellence may require expert review. These are not rigid bins, and probabilistic does not mean untestable. The key is matching the evaluator to the property. A deterministic check that measures the wrong thing can be precise and still useless.

## 10. A judge needs calibration too

19.0–21.0 minutes

Write a bounded rubric
Compare with expert labels
Inspect disagreements
Keep direct checks beside the score

An LLM judge can make evaluation practical for qualities that lack a simple exact answer, but it can also be inconsistent or reward superficial features. Ask reviewers to define examples of acceptable and unacceptable outputs before treating a score as a release decision. Examine disagreement cases rather than hiding them in an average. Keep direct checks for structure, permissions, and known facts even when a judge evaluates overall quality. Avoid assigning a numerical accuracy claim to judges without measurements. Transition to agents by noting that the observable result includes actions, not just prose.

## 11. An agent is a worker with a chosen path

21.0–23.0 minutes

Observe → select action → act
Update state → continue or stop
The execution path is part of the output.

Contrast a worker following a predetermined procedure with a loop that can choose its next action from observations. Real systems mix deterministic orchestration and model-selected steps, so avoid a strict agent-versus-workflow taxonomy. The runtime choice creates questions about allowed actions, progress, and stopping conditions. A reasonable answer can conceal a wasteful or unauthorized path, so evaluation should inspect the path as well as the final message. Ask what successful completion means for a task that modifies external state. That leads naturally to familiar operational concerns.

## 12. The old failure questions still apply

23.0–26.0 minutes

Retries and idempotency
Checkpoints and partial completion
Budgets and termination
Traces and recovery

Use a hypothetical timed-out tool call. The agent sees no response, but the external system may already have applied the change. Retrying without an idempotency strategy can duplicate the effect. A checkpoint can help restore progress, but it needs a clear relationship to external state. Budgets and stopping rules limit unproductive loops; traces help explain what occurred. State explicitly that an agent is not inherently distributed. Remote dependencies and multiple workers introduce distributed-systems concerns, not the word agent itself. Next, examine what those workers are permitted to call.

## 13. MCP exposes capabilities; policy grants authority

26.0–28.0 minutes

Discover tools → invoke capabilities
Descriptions guide the caller
Credentials and policy constrain effects

Treat MCP as an integration protocol that exposes capabilities in a form a client can use. Do not reduce it to authorization or suggest that protocol adoption makes tools safe. The important architectural question is what the caller can discover and invoke, under whose identity, and with which limits. Tool descriptions influence how an autonomous caller chooses, while enforcement must happen at an appropriate boundary. Discovery and a model’s willingness to comply are not substitutes for permissions. Transition to a concrete comparison between viewing an invoice and refunding it.

## 14. Tool availability expands the action surface

28.0–30.0 minutes

Read invoice ≠ issue refund
Scope credentials to the task
Gate consequential actions
Record who did what and why

Use read-only invoice lookup and refund issuance as a hypothetical capability pair. Both are useful, but their consequences and required authority differ. Discuss least privilege, separate capabilities, narrowly scoped credentials, and approval for consequential actions according to the product’s policy. Confirmations should be meaningful and tied to a concrete operation, not an endless prompt that users learn to ignore. Per-agent identities and audit logs can improve attribution where the architecture supports them. Avoid security guarantees: these controls reduce risk and limit blast radius.

## 15. Context is selected state, not a bigger prompt

30.0–33.0 minutes

Policy + conversation + retrieved data
Tool results + memory + user input
Persistent state lives outside it too.

Explain that the context is a selected view of a larger system state. Conversation history, retrieved material, and tool results may be included, summarized, omitted, or refreshed. Persistent memory is not automatically useful memory; retrieval policy decides whether it returns at the right moment. The practical work resembles query planning, caching, and state management. It also involves distinguishing instruction authority from data. Ask the audience what should happen when a previously useful memory becomes stale. Use that question to introduce explicit admission and retention decisions.

## 16. Give every context item a reason to be there

33.0–36.0 minutes

Source and trust level
Freshness and scope
Token cost and expected value
Retention and removal

Walk through a context item as if reviewing an input record. Where did it come from? Is it an instruction or evidence? Which task and user does it belong to? When can it become stale? Is it worth its cost and distraction? A long context window increases capacity without resolving those questions. Removing information can improve the system when it eliminates irrelevant or misleading material. Language adds a special concern because untrusted text may influence action selection. Transition by separating these familiar management questions from the combined changes introduced by model-driven execution.

## 17. What actually changed?

36.0–38.0 minutes

Probabilistic runtime choices
Language can influence control flow
Model capability can be provisioned
Old abstractions need new boundaries.

Present these as shifts in practical system design, not claims that probability, interpreters, or rented computation are new inventions. Repeated runs can take different paths. Open-ended language from users and retrieved sources can influence those paths. Teams can select and budget model services, although models differ in behavior and cannot be swapped without evaluation. The combination changes how we specify and test systems. Ask the audience which of their familiar assumptions breaks first: reproducibility, input trust, or interchangeable dependencies. Leave room for one or two responses.

## 18. Keep the engineering. Check the analogy.

38.0–40.0 minutes

Translate the term
Find the broken assumption
Test the behavior that matters

Return to the opening sentence and translate it once more, this time carrying the caveats. Search must deliver usable evidence. Tests may include calibrated judgment. Workers can choose actions. Interfaces expose an authorization surface. Context is a selected state view with trust boundaries. Close with the supplied message: “You don’t need to relearn engineering. You need to know which parts got renamed, which abstractions started leaking, and which parts genuinely changed.” Invite questions about a concrete system or failure rather than a debate over vocabulary.

