# From RAGs to Retrievals: Learn the New Engineering Speak

15 minutes · 9 slides · Dan Levy

## 1. From RAGs to Retrievals

0.0–1.0 minutes

Learn the New Engineering Speak
15-minute talk

Open with the vocabulary problem, not a prediction about the future. A competent engineer can understand every underlying concern and still feel excluded by the current terminology. Promise a translation layer, then make its limitation explicit: an analogy helps us ask better questions, but it is not an implementation specification. This short version follows retrieval, evaluation, agents, and context before identifying what changed. The audience should leave with familiar engineering questions they can apply on Monday.

## 2. We renamed a surprising amount

1.0–3.0 minutes

RAG → retrieval + generation
Tool calling → API invocation
Memory → persistence + retrieval
Evals → tests + judgment

Read the deliberately ridiculous sentence from the proposal aloud: “Our agent uses RAG over an embedding store, adds memories to context, calls MCP tools, emits structured outputs, gets evaluated by an LLM judge, and traces the whole thing through our agent observability platform.” Then translate the actions into search, state, APIs, typed data, tests, and traces. Let the audience recognize the shape of the system. Emphasize that RAG includes generation and that the translations are starting points. Next, show where one familiar analogy breaks.

## 3. Retrieval got a second audience

3.0–5.0 minutes

Query → retrieve → rank
Build context → generate
The consumer is another model.

Traditional search commonly puts results in front of a person who can inspect and reject them. In RAG, selected material becomes input to a generator, so relevance must also account for what that material might cause the system to conclude. Lexical search, metadata filters, vector similarity, hybrid retrieval, and reranking remain useful choices. None makes context construction disappear. Avoid claiming that human search never faces this problem; the difference is where interpretation and rejection happen. Move to a concrete, explicitly hypothetical contract question.

## 4. “Can this customer cancel without paying?”

5.0–7.0 minutes

Correct clause
Wrong customer
Obsolete contract
All can look relevant.

Label this as a hypothetical example rather than legal guidance. Imagine retrieval returning a cancellation clause, a pricing page, a support FAQ, and an obsolete contract. Each can share vocabulary with the question, yet the wrong customer or version can undermine the answer. Ask which checks belong before generation: customer scope, effective date, governing document, and source provenance. The teaching point is information architecture, not a better similarity threshold. Transition by asking how the team would test that the right evidence was used.

## 5. Spend judgment where it is needed

7.0–9.0 minutes

Deterministic: valid JSON, correct row
Constrained: required facts, citations
Judged: usefulness and completeness

Start with the cheapest reliable check that matches the requirement. A schema validator can establish valid structure; it cannot establish whether the answer is helpful. A citation can point to a real source without supporting the claim. Required facts might be checked directly in some workloads and need expert interpretation in others. Use LLM judges for bounded rubrics and calibrate them against human review. Their scores are evidence, not truth. Transition from checking answers to checking the actions that produced them.

## 6. Agents choose the next step

9.0–11.0 minutes

Observe → choose → act → repeat
Retries • checkpoints • budgets
Permissions • termination

The worker analogy is useful because it brings state, retries, idempotency, and failure handling back into view. The additional concern is that the next action may be selected dynamically by a model. An agent is not inherently a distributed system; a local loop can be simple. Once it calls remote tools or spans persistent workers, familiar distributed failure modes become relevant. Ask what happens after a timeout if the action might already have succeeded. That question is more useful than arguing about whether the program qualifies as an agent.

## 7. Context is selected runtime state

11.0–13.0 minutes

Policy + conversation + retrieved data
Tool results + memory + user input
What enters? Who trusts it?

Context engineering involves deciding which information reaches the model at a particular step. Some state persists outside the prompt and only selected parts enter context. Distinguish trusted instructions from retrieved text and tool output; placing them together does not make their authority equal. Tokens, freshness, provenance, and relevance all constrain the selection. The cache and memory-management analogies help, but language can also influence behavior. Transition from familiar state concerns to the changes that make these systems different enough to deserve new techniques.

## 8. What changed enough to matter?

13.0–14.0 minutes

Probabilistic decisions at runtime
Language influences control flow
Model capability is a budgeted service

Avoid claiming that randomness, interpreters, or rented compute were invented by AI. The change is their combination in systems that interpret open-ended language and choose actions. Repeated runs may take different paths. Retrieved text can affect decisions even when it was intended as evidence. Model capability can be selected and budgeted as a service, though models are not interchangeable and confidentiality or availability can limit routing. These differences explain why familiar abstractions help but do not remove the need to examine their boundaries.

## 9. Keep the engineering. Check the analogy.

14.0–15.0 minutes

What was renamed?
Where does the analogy fail?
What evidence says this works?

Close by returning to the engineer from the opening. The vocabulary is worth learning, but it should lead to questions about behavior, boundaries, and evidence. Ask the audience to translate one unfamiliar term into a familiar concern, then name the place where that translation becomes misleading. End with the supplied line: “You don’t need to relearn engineering. You need to know which parts got renamed, which abstractions started leaking, and which parts genuinely changed.” Leave the final questions on screen for discussion.

