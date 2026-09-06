# Stop Looking at My Benchmarks… Get Your Own!

40 minutes · 18 slides · Dan Levy

## 1. Stop Looking at My Benchmarks…

0.0–1.5 minutes

Get Your Own!
40-minute talk · Evaluate the system you ship

Open with the question teams keep asking: which model should we use? Explain that the talk replaces that question with a more useful one: what work must this system perform, and what counts as a passing result? Public benchmarks still help with an initial shortlist. They cannot choose the shipping configuration for your product. Promise one practical method people can start with a handful of real examples, rather than an evaluation platform procurement project. Move directly to the fictional leaderboard.

## 2. Which model would you choose?

1.5–3.5 minutes

Illustrative fictional data
Model A · 89.7
Model B · 88.9
Model C · 84.3

Present the leaderboard alone and invite a quick show of hands. Do not identify these fictional labels with actual vendors or imply that the scores come from a real evaluation. Ask what information is missing: task definition, sample size, price, latency, and the meaning of a point. A public score can tell us something about performance under its published conditions. The trouble starts when we silently substitute our own product requirements for those conditions. Reveal that the next slide changes the task distribution without changing the candidates.

## 3. Now give them your workload

3.5–5.5 minutes

Illustrative fictional data
A · 71% pass · $0.34/run
B · 94% pass · $0.09/run
C · 92% pass · $0.01/run

Ask the audience to pick a model using only the public scores, then read the workload pass rates and prices. Say explicitly that these are invented teaching numbers, not measured model results. The apparent winner changes because the question changes. Even C is not automatically the production choice: a two-point difference might matter in a critical slice, and we have said nothing about sample size or latency. The example establishes why a leaderboard supplies a candidate list, while a workload evaluation supplies decision evidence.

## 4. Benchmarks are somebody else's requirements

5.5–7.5 minutes

A benchmark is a compressed specification
Useful for research and shortlists
Missing: your users, tools, failure costs
Scores depend on test conditions

Give public benchmarks their due. Shared datasets and protocols make research comparisons and some regression tracking possible. Their limitation is scope, not moral failure. Your assistant might use specialized terminology, unusually long tool chains, or a cancellation policy that the benchmark never tests. Explain the compressed-specification line: every benchmark encodes choices about what matters and how success is counted. Read those choices before applying the result. Then turn to why a single score feels so attractive even when engineers know their product has multiple constraints.

## 5. One number is a comforting fiction

7.5–9.5 minutes

Quality · latency · cost · consistency
Tool reliability · policy adherence
Set constraints before choosing

A leaderboard reduces a hard decision to an apparently objective rank. Production asks harder questions: how long may a request take, what failure rate is tolerable, and which actions must never occur? Separate constraints from preferences. A configuration that violates an authorization requirement should not win by being faster on average. Among configurations that pass, there may be a cost-quality tradeoff rather than one universal winner. Avoid inventing weights just to manufacture a single answer. The team must own those tradeoffs before shopping for a model.

## 6. Inventory the jobs

9.5–11.5 minutes

Support: account, billing, cancellation
Diagnosis, escalation, unusual cases
Frequency · consequence · success

Use a support assistant as the running example. Password resets, billing lookups, cancellations, and technical diagnosis require different behavior. Sample enough ordinary traffic to estimate routine performance, then deliberately add rare cases whose failure is costly. Keep those two views separate so an oversampled challenge set does not masquerade as production prevalence. Define success before generating answers: a cancellation might require the correct account, policy, and confirmed state change. Transition from workload definition to where the examples come from.

## 7. Write observable acceptance criteria

11.5–13.5 minutes

Cancellation case
Correct customer + applicable policy
Authorized action + verified state

Take cancellation beyond whether the final message sounds helpful. A passing run might need to resolve the right account, retrieve the applicable policy, obtain any required confirmation, perform the permitted action, and verify the resulting state. Some checks belong on tool traces or backend fixtures, not on the final prose. Include the expected refusal or escalation path when prerequisites are missing. These criteria also expose product ambiguity: engineers cannot evaluate a policy nobody has agreed on. That ambiguity is useful to find before thousands of test runs make it look quantitative.

## 8. Capture labelled production reality

13.5–15.5 minutes

Input and relevant context
Expected behavior and observed failure
Failure class · severity · scoring method

Walk through the anatomy of one regression case. Preserve the information needed to reproduce the problem, including tool outputs or a controlled fixture when live systems would drift. Record what happened and what should have happened separately. Attach a failure class and severity so later reports can group related problems. Be deliberate about sensitive information and access permissions in the dataset. Corrections, overrides, retry loops, and surprising successes can all reveal missing coverage. A pile of traces becomes useful evaluation material only after somebody supplies an answerable question.

## 9. Protect the holdout

15.5–17.5 minutes

Development set: iterate and diagnose
Holdout: estimate generalization
Refresh for drift; retain regressions

If you repeatedly tune prompts against every available example, improvements may reflect familiarity with the set rather than broader reliability. Reserve examples for a held-out comparison and limit how often their detailed results feed development. Keep provenance so near-duplicate cases do not quietly straddle the split. A frozen set also ages: new products, policies, and users create coverage gaps. Maintain both stable regression cases and fresh coverage, with their roles visible. A holdout is evidence under a sampling design, not a permanent certificate that the system will handle anything.

## 10. Build the eval ladder

17.5–20.5 minutes

1 · Deterministic assertions
2 · Heuristic or scored checks
3 · Calibrated LLM judges
4 · Expert review

Describe the ladder as a choice of evidence, not a maturity contest in which everyone eventually replaces assertions with a model. Schema validation and state checks are often better answered deterministically. Heuristics can provide cheap signals but may reward superficial matches. Judges can assess a specified quality when acceptable responses vary. Experts handle ambiguity and help calibrate those judges. A single case may combine several levels: a verified account change, grounded explanation, and human review of a novel exception. Use the least expensive method that supports the decision you actually need.

## 11. Calibrate the judge before trusting the score

20.5–23.5 minutes

Define a rubric; get expert labels
Inspect judge–expert disagreements
Version judge, prompt and rubric

Take a small set of outputs with expert labels and run the judge against them. Look for systematic disagreements: excessive preference for verbosity, failures to notice unsupported claims, or inconsistent treatment of refusals. Revise the rubric using development examples and recheck on separate cases. For comparisons, conceal candidate identity and test whether answer order changes the verdict. A judge may be consistent and still be wrong, so agreement alone is insufficient. Keep the judge configuration fixed during a candidate comparison and disclose its limitations beside the score.

## 12. Stop averaging away failure

23.5–26.0 minutes

Report workload slices and severity
Show counts and run-to-run variation
Report uncertainty
Track critical violations separately

A system can score well overall while failing cancellations because the workload contains many easy account questions. Do not claim that a specific overall percentage follows from an unspecified workload mix. Instead show the shape of the problem: frequent successes conceal a small, completely broken slice. Report per-slice counts, rates, and critical failures alongside the weighted total. A slice with three cases supports less confidence than one with three hundred. Repeat stochastic runs when variation could change your decision. The goal is a shipping decision with visible limitations.

## 13. Measure the cost of success

26.0–28.5 minutes

Total operating cost ÷ successful tasks
Count failures, retries and fallbacks
Also report latency and human effort

Define the accounting boundary before doing arithmetic. At minimum, a model-centric comparison should include all calls made by the evaluated workflow, including unsuccessful attempts, retrieval, tools, judges, and recovery where applicable. Human intervention and infrastructure can be included or reported separately, but should not vanish. Divide that total by tasks meeting the stated acceptance criteria. Also show the success rate: cheap cost per success can coexist with an unacceptable number of abandoned tasks. Keep latency distributions visible because retries can improve completion while making the experience too slow.

## 14. Routing is a system to evaluate

28.5–31.0 minutes

Easy case → small model
Hard case → stronger model
Failed check → fallback or human
Test routing and the final result

Routing can exploit differences between models, but its classifier introduces its own errors and costs. Evaluate the full policy on held-out workloads: which requests are misrouted, which fallbacks recover them, and how much delay recovery adds. A model's self-reported confidence is not sufficient evidence that escalation is unnecessary. Prefer observable checks and calibrated signals where available. Do not stitch together ideal slice scores as though the router already knows the right branch. The cheapest acceptable system may include deterministic handling, caching, and a human path as well as models.

## 15. Evaluate the system you ship

31.0–33.5 minutes

Model + prompt + retrieval + context
Tools + orchestration + permissions
Any change can affect the result

Show how a model-only comparison misses the actual product. Retrieval chooses the evidence; tool descriptions influence actions; orchestration controls retries; permissions bound what can happen. Freeze and record those settings when comparing candidates, then evaluate intended changes as complete configurations. Use controlled tool fixtures for repeatable tests and selected integration checks to detect mismatches with real services. This does not require testing every imaginable combination. It requires knowing what changed and running checks that can expose its likely effects. The resulting report is a system release artifact.

## 16. Make the eval part of the release

33.5–35.5 minutes

Version cases, scorers and system
Compare with the baseline by slice
Investigate regressions before rollout

A useful report identifies the baseline and candidate, the dataset version, and the scoring configuration. Report slice-level changes with counts, costs, and latency instead of only an aggregate improvement. Define release gates before seeing the new model's flattering number. A critical regression may block rollout even if routine cases improve. When uncertainty remains, add targeted examples or use a limited rollout with monitoring. Keep offline tests and production observation connected: neither sees every failure mode alone. This turns evaluation from an occasional bake-off into ordinary release discipline.

## 17. Every failure should leave a test behind

35.5–37.5 minutes

Ship → observe → classify → label
Add cases → improve → regression-test
The corpus records lessons learned

Use the flywheel as a work queue, not a promise that each incident warrants a unique permanent test. Deduplicate recurring symptoms and preserve cases that represent a distinct failure mechanism or important boundary. Assign ownership for label quality, stale fixtures, and policy updates; otherwise the corpus becomes a museum. Track whether fixes survive later changes, and remove tests only with a reason recorded. Some problems belong in deterministic code rather than a better prompt. Over time, the collection should make previous mistakes easier to detect and new decisions easier to justify.

## 18. What does good mean here?

37.5–40.0 minutes

Write it down. Test it.
Make models compete on your work.
Start with 20 real cases.
Expand coverage with evidence.

Ask the room to choose one real workflow and list the first twenty cases they would collect tomorrow. Clarify that twenty starts the conversation; it does not establish reliability for every failure rate or workload. Their next steps are to agree on acceptance criteria, preserve a holdout, run the current system, and inspect failures before selecting alternatives. Return to the opening leaderboard: it was useful information answering a different question. The team now has a method for asking its own. Finish with the title and leave space for questions about particular workloads.

