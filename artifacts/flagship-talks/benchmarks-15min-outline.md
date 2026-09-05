# Stop Looking at My Benchmarks… Get Your Own!

15 minutes · 9 slides · Dan Levy

## 1. Stop Looking at My Benchmarks…

0.0–1.0 minutes

Get Your Own!
15-minute talk · Product engineering & evals

Open with the question teams keep asking: which model should we use? Explain that the talk replaces that question with a more useful one: what work must this system perform, and what counts as a passing result? Public benchmarks still help with an initial shortlist. They cannot choose the shipping configuration for your product. Promise one practical method people can start with a handful of real examples, rather than an evaluation platform procurement project. Move directly to the fictional leaderboard.

## 2. The winner disappears

1.0–3.0 minutes

Illustrative fictional data
A: 89.7 public · 71% ours · $0.34/run
B: 88.9 public · 94% ours · $0.09/run
C: 84.3 public · 92% ours · $0.01/run

Ask the audience to pick a model using only the public scores, then read the workload pass rates and prices. Say explicitly that these are invented teaching numbers, not measured model results. The apparent winner changes because the question changes. Even C is not automatically the production choice: a two-point difference might matter in a critical slice, and we have said nothing about sample size or latency. The example establishes why a leaderboard supplies a candidate list, while a workload evaluation supplies decision evidence.

## 3. Start with the work

3.0–5.0 minutes

Jobs → slices → pass criteria
Include frequency and failure severity
Keep rare, costly mistakes visible

Use a support assistant as the running example. Password resets, billing lookups, cancellations, and technical diagnosis require different behavior. Sample enough ordinary traffic to estimate routine performance, then deliberately add rare cases whose failure is costly. Keep those two views separate so an oversampled challenge set does not masquerade as production prevalence. Define success before generating answers: a cancellation might require the correct account, policy, and confirmed state change. Transition from workload definition to where the examples come from.

## 4. Your failures are an eval backlog

5.0–7.0 minutes

Save inputs, context and expectations
Record failure class and severity
Freeze a holdout before tuning

Failed traces, corrected answers, escalations, and human overrides give you concrete cases to investigate. Record the relevant context and the desired observable behavior; a transcript without an acceptance criterion is only a souvenir. Remove sensitive data where appropriate and retain the permissions the test requires. Separate development cases from a held-out set that you do not tune against repeatedly. Production changes over time, so refresh coverage deliberately and keep old regressions. Now we can discuss how each example receives its result.

## 5. Use the cheapest trustworthy check

7.0–9.0 minutes

Assertions → scores → LLM judge
Calibrate against expert labels
Escalate ambiguity and high-risk cases

Start with checks whose answers the system can establish directly: valid schema, correct record, permitted tool, and required state transition. Use scored checks where exact equality would punish acceptable variation. An LLM judge is useful for some open-ended qualities, but it needs a rubric and calibration against human judgments. Inspect disagreements rather than treating the judge as ground truth. Keep answer quality separate from persuasive explanations. For high-risk or ambiguous cases, expert review may remain necessary. Each test should say what evidence justifies its verdict.

## 6. An average can hide a broken product

9.0–10.5 minutes

Pass rates by job and failure class
Track critical violations separately
Show sample counts and uncertainty

A system can score well overall while failing cancellations because the workload contains many easy account questions. Do not claim that a specific overall percentage follows from an unspecified workload mix. Instead show the shape of the problem: frequent successes conceal a small, completely broken slice. Report per-slice counts, rates, and critical failures alongside the weighted total. A slice with three cases supports less confidence than one with three hundred. Repeat stochastic runs when variation could change your decision. The goal is a shipping decision with visible limitations.

## 7. Price the successful task

10.5–12.0 minutes

Cost per success = total cost ÷ successes
Count retries, tools, judges, fallbacks
Test the full routing policy

Token price is a component of cost, not the business outcome. Count unsuccessful attempts and the extra calls used to recover from them. Decide explicitly whether human handling and infrastructure are included, then keep that accounting consistent. A cheap first model can become expensive if most requests escalate. Evaluate the routing policy end to end, including its mistakes, rather than combining the best isolated numbers from each model. Compare quality, latency, and cost under the same workload and acceptance criteria. There may be several acceptable configurations.

## 8. Regression-test the system you ship

12.0–14.0 minutes

Model + prompt + retrieval
Tools + policy
Version the system and test data
Failure → test → improve → ship

The user experiences the whole system. A stronger model cannot rescue a missing document, an incorrectly described tool, or a policy that blocks the required action. Version these dependencies with your results so a comparison means something. Every production failure should prompt a decision about whether it belongs in the regression set; duplicates can share a case, while a new failure mode deserves coverage. Run the relevant suite when any behavior-shaping component changes. Monitor after release because offline coverage is always incomplete. Close with a concrete first step.

## 9. What does good mean here?

14.0–15.0 minutes

Write it down. Test it.
Make models compete on your work.
Start: 20 real cases + pass criteria.

Leave the audience with a small next action: collect twenty representative and consequential cases, agree on observable success, and run the current system before trying replacements. Twenty is a starting exercise, not a claim of statistical sufficiency. Add slices and examples as uncertainty and failure costs demand. Public benchmarks remain useful orientation, but the product decision belongs to the workload and the acceptance criteria. Repeat the title as an invitation to own the definition of good, then allow a brief pause for the audience to identify their first failure case.

