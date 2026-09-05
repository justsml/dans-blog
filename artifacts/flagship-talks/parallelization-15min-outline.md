# Rethinking Parallelization in the Agentic Era

15 minutes · 9 slides · Dan Levy

## 1. Rethinking Parallelization in the Agentic Era

0.0–1.0 minutes

Parallelize uncertainty.
Select with evidence.
Compile what you learn.

Open with the familiar objection: don't have five engineers independently solve the same problem. Then ask what changes if another attempt costs nine cents. Make clear that nine cents is an illustrative thought experiment, not a price claim or a complete cost estimate. Review, tool use, latency, and integration still cost something. The question for this talk is where additional attempts buy useful information. Give the audience the destination: spending less effort guessing which approach will work, and more effort testing alternatives.

## 2. Duplicate work can buy evidence

1.0–3.0 minutes

One problem → several attempts
Alternatives must differ.
Budget selection and integration.

Keep the history brief. Data parallelism applies an operation to many inputs; task parallelism overlaps separable work. Both remain useful. Agents add another practical option: explore several possible answers while the right approach is still unclear. That might mean competing hypotheses, implementations, or reviews. This does not make the alternatives independent or correct. It changes the economics of gathering evidence. Use a debugging example: three plausible causes of a failure can be investigated concurrently, provided the investigations do not interfere with each other. Use the debugging example to make the uncertainty concrete.

## 3. Three ways to generate alternatives

3.0–5.0 minutes

Decompose: split separable work
Compete: independent solutions
Perspective: change the questions

Compress the first three patterns into a single example. A team is changing a service interface. Decomposition assigns interface research, compatibility checks, and a candidate implementation to separate workers. Competition asks for two independent implementations under the same acceptance criteria. Perspective asks reviewers to examine security, performance, and simplicity using specific questions. These are different reasons to add workers. Labels alone do not create diversity, and dependencies still need handoffs. Transition to the patterns that decide where to investigate next and how to challenge what comes back.

## 4. Three ways to challenge uncertainty

5.0–7.0 minutes

Search: test and prune hypotheses
Verify: challenge a candidate
Speculate: explore before deciding

Use search to investigate distinct explanations for a failure, stopping branches when evidence contradicts them. Use verification to seek counterexamples against a candidate rather than generating yet another replacement. Use speculation when overlapping alternatives saves enough waiting to justify discarded work. Keep speculative branches isolated, and delay irreversible side effects until a choice has been made. These patterns work only when observations are preserved and somebody owns the decision. Move from the shape of the work to the resources and models that should perform it.

## 5. Match resources to the workload

7.0–8.0 minutes

Small, local, specialist, frontier
Example budget: $25 · five minutes
Include review, tools, integration.

Present the budget as an illustrative interface: spend up to twenty-five dollars and five minutes investigating this problem, with at most twenty candidates. These numbers are not a performance promise. A useful controller budgets the whole workflow, including judge calls, tool charges, retries, and selection. Human integration costs also matter, even when they are outside the API bill. Define what happens when time expires with no acceptable candidate. This moves the discussion from how many workers are available to how much evidence the task warrants.

## 6. Escalate on evidence; stop on acceptance

8.0–10.0 minutes

Cheap attempt → acceptance checks
Unresolved → expand or verify
Agreement is not correctness.

Walk through an adaptive workflow. Try the inexpensive path first, then run the checks that match the task. If a concrete requirement fails or uncertainty remains consequential, allocate more attempts or stronger verification. Do not treat a model saying it is confident as a calibrated probability. Do not stop just because three workers agree. Agreement can trigger another check, but acceptance still rests on evidence. Define stopping conditions in advance, including an honest unresolved result. That brings us to the uncomfortable cost at the center of this architecture: selection.

## 7. Use reasoning to discover cheap determinism

10.0–12.0 minutes

Investigate a recurring problem.
Reuse a tested script, query, or rule.
Keep uncertain cases visible.

This is the climax. Ask whether the successful solution still needs an agent on the next run. Sometimes the useful output is a SQL query, parser, script, decision tree, schema, test, or cached mapping. The reasoning phase discovers the structure; the resulting artifact executes it repeatedly. This is a design opportunity, not a claim that every judgment can be reduced to rules. Identify what became stable enough to encode and what remains uncertain. Pause on the line: use expensive nondeterminism to discover cheap determinism. Explain that unknown cases should remain outside the compiled contract.

## 8. Make each run improve the next

12.0–14.0 minutes

Generate → test → judge → select
Compile → cache → reuse
New failures become new checks.

Show the sequence as an operating loop rather than a funnel that guarantees success. Candidate generation produces possibilities. Tests reject known failures. Judgment handles the remaining tradeoffs. Selection creates one accountable result. Reusable structure becomes an implementation or cached result with explicit validity conditions. New failures feed back into the acceptance checks and future search. Over time, familiar work may require less reasoning while genuinely new cases still receive attention. Keep records of why a candidate won so the next person can audit the decision instead of reverse-engineering a score.

## 9. Parallelize uncertainty

14.0–15.0 minutes

Select with evidence.
Compile what you learn.
Agent count is not a success metric.

Return to the opening objection about five engineers solving the same problem. The answer is conditional: duplicate work when exploration is cheap enough, the alternatives are meaningfully different, and you can evaluate them. Stop when another attempt is unlikely to change the decision or the budget expires. Leave three actions: choose a recurring uncertain task, define its acceptance checks, and compare a small portfolio of attempts against the current process. The goal is a better validated outcome and a reusable lesson, not a larger crowd of agents.

