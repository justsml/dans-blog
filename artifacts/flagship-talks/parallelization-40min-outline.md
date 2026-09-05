# Rethinking Parallelization in the Agentic Era

40 minutes · 18 slides · Dan Levy

## 1. Rethinking Parallelization in the Agentic Era

0.0–2.0 minutes

Parallelize uncertainty.
Select with evidence.
Compile what you learn.

Open with the familiar objection: don't have five engineers independently solve the same problem. Then ask what changes if another attempt costs nine cents. Make clear that nine cents is an illustrative thought experiment, not a price claim or a complete cost estimate. Review, tool use, latency, and integration still cost something. The question for this talk is where additional attempts buy useful information. Give the audience the destination: spending less effort guessing which approach will work, and more effort testing alternatives.

## 2. What are we actually parallelizing?

2.0–4.0 minutes

Traditional: execute known work
Agentic: explore uncertain work
Produce evidence as well as code.

Keep the history brief. Data parallelism applies an operation to many inputs; task parallelism overlaps separable work. Both remain useful. Agents add another practical option: explore several possible answers while the right approach is still unclear. That might mean competing hypotheses, implementations, or reviews. This does not make the alternatives independent or correct. It changes the economics of gathering evidence. Use a debugging example: three plausible causes of a failure can be investigated concurrently, provided the investigations do not interfere with each other.

## 3. Six patterns, six different jobs

4.0–6.0 minutes

Decompose · compete · perspective
Search · verify · speculate
Match the pattern to the uncertainty.

Introduce these as an engineering vocabulary, not six mandatory components of every agent system. Decomposition addresses separable work. Competition addresses uncertain solution quality. Perspective changes what an attempt pays attention to. Search explores branches. Verification looks for defects. Speculation overlaps work before a decision is settled. A single workflow can combine them, but every extra worker needs a reason to exist. Tell the audience that the next slides distinguish these jobs so they can stop treating every fan-out as the same architecture.

## 4. 1 / Decompose separable work

6.0–8.0 minutes

Research → findings
Implementation → candidate
Validation → evidence
Define the handoff before spawning.

Use a concrete boundary: one worker inspects an interface, another investigates existing implementations, and a third defines acceptance checks. These can proceed together when the outputs have clear contracts. Architecture and implementation often depend on earlier findings, so drawing four sibling boxes does not magically remove dependencies. Ask what each worker consumes, produces, and is allowed to change. Shared files and changing assumptions create coordination costs. Move from splitting different tasks to the more surprising choice: assigning the same task more than once.

## 5. 2 / Compete on the same task

8.0–10.0 minutes

One problem → several candidates
Same acceptance checks
Independent attempts → selection

Give several workers the same bounded task when you do not know which approach will be best. They should receive the same acceptance criteria and initially work independently. Compare outputs with tests before asking for subjective preferences. Otherwise the most polished explanation can beat the most useful implementation. Candidate count is a budget choice, not a quality guarantee. Extra attempts help only if they produce meaningful variation and someone can evaluate it. This leads naturally to deliberately changing the assumptions and priorities behind those attempts.

## 6. 3 / Change the perspective

10.0–12.0 minutes

Security · performance · simplicity
Give reviewers concrete questions.
Role labels do not ensure diversity.

A role label alone is a weak source of diversity. A security review becomes useful when it has a threat model, permission boundaries, and specific misuse cases. A performance review needs a workload and a latency target. A simplicity review needs to identify removable state or dependencies. These perspectives can expose different defects without generating several whole implementations. They can also share blind spots, especially with the same model and context. Transition to search: once alternatives expose distinct hypotheses, decide which branches deserve further investigation.

## 7. 4 / Search a solution tree

12.0–14.0 minutes

Generate hypotheses.
Test the cheapest discriminator.
Prune weak branches; expand winners.

Describe a failing background job with several plausible explanations: a stale credential, a queue problem, or a bad payload. Each investigation should seek evidence that discriminates among causes, not produce a confident essay. Stop a branch when the evidence contradicts it. Expand branches with useful evidence, while keeping competing explanations visible. A coordinator must retain the observations and why each branch was abandoned. Without that record, a workflow can keep rediscovering the same dead ends. Next, separate finding a solution from trying to break one.

## 8. 5 / Spend attempts on verification

14.0–16.0 minutes

One candidate
Several independent challenges
Tests, counterexamples, failure cases

Five generators are not automatically better than one generator and four reviewers. A verifier can probe edge cases, reproduce a claimed fix, check invariants, or challenge an assumption. Give reviewers concrete evidence to inspect and ask for reproducible counterexamples. Their disagreement is information, not a majority vote on truth. Their agreement is also not proof: correlated failures can survive every review. Keep deterministic checks wherever possible. Having established why duplicate effort can be useful, move to work that starts before the team knows it will be needed.

## 9. 6 / Speculate before the decision

16.0–18.0 minutes

Explore A, B, and existing software.
Keep speculative work isolated.
Select before committing side effects.

Borrow the intuition of speculative execution without pretending an agent workflow behaves like a CPU. Run two architectural investigations while a third checks whether an existing project already solves the problem. This is useful when waiting costs more than discarded exploration. Use isolated branches, sandboxes, and read-only access where appropriate. Do not let losing branches send messages, mutate production data, or create commitments that cannot be withdrawn. Cancellation and cleanup belong in the design. Then ask whether every branch even needs the same model.

## 10. Schedule across models and tools

18.0–20.0 minutes

Match capability to the work.
Price · latency · confidentiality
Context · uptime · tool reliability

A scheduler can choose between local models, smaller hosted models, stronger models, and deterministic programs. The selection should follow measured workload behavior and operational constraints. A cheap model that requires repeated repair may be expensive per completed task. A capable remote model may be unsuitable for particular data. Diversity across models can reduce some shared blind spots, but does not establish independent failure probabilities. Keep provider names out of the argument so it survives the next release. The next question is how to express the resources an entire search may consume.

## 11. Budget the whole search

20.0–23.0 minutes

Illustrative request:
Up to $25 · five minutes · 20 attempts
Budget generation through integration.

Present the budget as an illustrative interface: spend up to twenty-five dollars and five minutes investigating this problem, with at most twenty candidates. These numbers are not a performance promise. A useful controller budgets the whole workflow, including judge calls, tool charges, retries, and selection. Human integration costs also matter, even when they are outside the API bill. Define what happens when time expires with no acceptable candidate. This moves the discussion from how many workers are available to how much evidence the task warrants.

## 12. Allocate more work when evidence warrants it

23.0–26.0 minutes

Start cheap; run acceptance checks.
Escalate consequential uncertainty.
Stop: acceptance, budget, or deadline.

Walk through an adaptive workflow. Try the inexpensive path first, then run the checks that match the task. If a concrete requirement fails or uncertainty remains consequential, allocate more attempts or stronger verification. Do not treat a model saying it is confident as a calibrated probability. Do not stop just because three workers agree. Agreement can trigger another check, but acceptance still rests on evidence. Define stopping conditions in advance, including an honest unresolved result. That brings us to the uncomfortable cost at the center of this architecture: selection.

## 13. Selection can cost more than generation

26.0–28.0 minutes

More candidates → more evaluation
Shared blind spots → shared failures
Choose checks before candidate count.

Explain why twenty attempts can be worse than three. They may repeat the same mistake, exhaust the evaluation budget, or create a pile of plausible code nobody can safely integrate. Establish the acceptance checks before increasing candidate count. Preserve independent generation when early sharing would cause everyone to anchor on one answer. Use experts where the judgment really is subjective or high consequence. The scarce resource has shifted, but it has not vanished. The next move is to stop paying for recurring uncertainty once you understand its structure.

## 14. Reasoning can be a compilation step

28.0–31.0 minutes

Uncertainty → discovered structure
Structure → tested implementation
Costly reasoning → cheap determinism

This is the climax. Ask whether the successful solution still needs an agent on the next run. Sometimes the useful output is a SQL query, parser, script, decision tree, schema, test, or cached mapping. The reasoning phase discovers the structure; the resulting artifact executes it repeatedly. This is a design opportunity, not a claim that every judgment can be reduced to rules. Identify what became stable enough to encode and what remains uncertain. Pause on the line: use expensive nondeterminism to discover cheap determinism.

## 15. Compile the stable part; keep an escape hatch

31.0–34.0 minutes

Define scope and invariants.
Test typical and adversarial cases.
Version the artifact; detect drift.

Use a hypothetical recurring data-cleaning task. An agent investigates examples and proposes a transformation. A tested script can then handle the cases covered by its contract, while unfamiliar input is rejected or routed for review. The script is not correct merely because an agent produced it. Validate behavior, document the supported input, and retain counterexamples. If the upstream format changes, the artifact needs detection and maintenance. Compilation changes where uncertainty lives; it does not eliminate the responsibility to verify. Then assemble these pieces into one operating loop.

## 16. Build a loop that learns from the work

34.0–36.0 minutes

Generate → test → judge → select
Compile → cache → reuse
Failures → new checks → next attempt

Show the sequence as an operating loop rather than a funnel that guarantees success. Candidate generation produces possibilities. Tests reject known failures. Judgment handles the remaining tradeoffs. Selection creates one accountable result. Reusable structure becomes an implementation or cached result with explicit validity conditions. New failures feed back into the acceptance checks and future search. Over time, familiar work may require less reasoning while genuinely new cases still receive attention. Keep records of why a candidate won so the next person can audit the decision instead of reverse-engineering a score.

## 17. Engineers manage uncertainty and evidence

36.0–38.0 minutes

One deep attempt or several cheap?
Who owns acceptance and integration?
Measure validated results and cost.

Connect the systems choices to engineering management. An engineer can now commission competing implementations or independent reviews without staffing a separate team for each one. That makes task framing, boundaries, acceptance, and integration more important. Someone still owns the final decision and its consequences. Compare strategies on representative work rather than assuming more agents mean more throughput. Useful measures include completed acceptable outcomes, elapsed time, total cost, and escaped defects. Bring the audience back to the opening question: duplicate effort is worthwhile when it buys evidence you can use.

## 18. Parallelize uncertainty

38.0–40.0 minutes

Select with evidence.
Compile what you learn.
Spend where evidence guides choices.

Return to the opening objection about five engineers solving the same problem. The answer is conditional: duplicate work when exploration is cheap enough, the alternatives are meaningfully different, and you can evaluate them. Stop when another attempt is unlikely to change the decision or the budget expires. Leave three actions: choose a recurring uncertain task, define its acceptance checks, and compare a small portfolio of attempts against the current process. The goal is a better validated outcome and a reusable lesson, not a larger crowd of agents.

