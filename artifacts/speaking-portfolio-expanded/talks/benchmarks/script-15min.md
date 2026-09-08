# Stop Looking at My Benchmarks… Get Your Own!: 15-minute presenter script

Clock: **13:35 scripted speech + 01:25 interaction/reserved story = 15:00**. [Per-slide budget](pacing.md).

Use slides 1, 3, 4, 5, 6, 7, 8, 9, 15. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. The Story slot is omitted in this route. Timings are rehearsal targets without Q&A. The number and its sampling assumptions stay together. Calibration uses the always-pass confusion matrix.

## 00:00 to 01:30: slide 1, Tuxedo of Benchmarks

On screen:

> A · 89.7
> B · 88.9
> C · 84.3
> You built a test to grade the model, and nobody has graded the test.

Every new model arrives wearing a tuxedo of benchmarks. Here are three scores. Pick the model you would try first.

The model scores and workload are invented. The arithmetic and research are checkable. A won the displayed competition. Which tasks, whose answers, what scorer, and how much uncertainty? The decimal point has persuaded us without answering any of those questions.

You built a test to grade the model, and nobody has graded the test.

Delivery: Allow 15 seconds for one show of hands.

Bridge: our cancellation workload reverses the fictional leaderboard. The scoring question changed.

## 01:30 to 03:00: slide 3, Goodhart, Campbell, and the target

On screen:

> Reward a proxy and behavior changes
> Credit Strathern for the familiar Goodhart wording

Goodhart described regularities breaking under pressure from their use in control. Campbell described what social decision-making does to indicators and the processes they measure. Credit Strathern for the familiar measure-becomes-target wording.

What improves the number without improving the service? Close the conversation before solving the problem. Reward confident prose while the backend stays wrong. Write that exploit before optimizing. If your evaluator applauds it, you found work worth doing.

Source: Goodhart (1975), Problems of Monetary Management: The U.K. Experience, Reserve Bank of Australia conference paper (reprinted 1981). Campbell (1979), [Assessing the impact of planned social change](https://doi.org/10.1016/0149-7189%2879%2990048-X). Strathern (1997), [Improving ratings](https://gwern.net/doc/statistics/decision/1997-strathern.pdf), European Review 5(3), 305–321.

## 03:00 to 04:15: slide 4, Your Eval Suite Needs Therapy

On screen:

> The suite needs an eval
> A green run is an inference, not a warranty

Your eval suite is a psychometric instrument somebody checked into Git. It produces scores from tasks and judgments. We use those scores to make decisions. Where is its validation?

Try a response that sounds excellent but leaves the account active. Try a correct cancellation with awkward wording. Try an unauthorized cancellation with a perfect explanation.

We need a counterexample and the nerve to keep it after it ruins the chart.

## 04:15 to 05:45: slide 5, One number is a comforting fiction

On screen:

> What is the score a score of?
> Construct validity: evidence for the interpretation

Cronbach and Meehl ask what evidence supports a construct claim. Messick asks what interpretation and use the score supports. Raji and colleagues bring that problem to broad AI benchmarks: tasks do not automatically justify general capability claims.

Cancellation is easier: an authorized state change has an observable criterion. Read the account. Keep state and authority separate from tone. Otherwise an unauthorized action can buy its way out with a nice paragraph.

Source: Cronbach and Meehl (1955), [Construct validity in psychological tests](https://psychclassics.yorku.ca/Cronbach/construct.htm). Messick (1990), [Validity of Test Interpretation and Use](https://www.ets.org/research/policy_research_reports/publications/report/1990/ihmy.html). Raji et al. (2021), [AI and the Everything in the Whole Wide World Benchmark](https://datasets-benchmarks-proceedings.neurips.cc/paper/2021/hash/084b6fbb10729ed4da8c3d3f5a3ae7c9-Abstract-round2.html).

## 05:45 to 07:15: slide 6, "Cancel my account."

On screen:

> Right account. Applicable policy. Authorized action.
> Verify state. Include the refusal path.

A customer asks to cancel. Identify the account through authenticated context, resolve policy, check authority, execute the allowed operation, and read the resulting state.

Now the tool times out after accepting the request. Did cancellation fail, or did we lose its response? Which state read distinguishes those cases?

That question becomes an acceptance criterion. Wrong tenant, expired session, and already-cancelled state need their own expected outcomes. A transcript without an acceptance criterion is only a souvenir.

Delivery: Give 15 seconds for one answer about the state read; no extended walkthrough.

## 07:15 to 09:00: slide 7, Run the Judges

On screen:

> 94, 82, 91, 97, 89
> 78, 79, 81, 82, 80 · pass at ≥ 80
> Majority disagreement: ? / 5

Your judge scores ninety-four, eighty-two, ninety-one, ninety-seven, eighty-nine. Same case. Noise wearing a lab coat.

Now use seventy-eight, seventy-nine, eighty-one, eighty-two, eighty. Pass at eighty. Which verdicts disagree with the majority?

Fail, fail, pass, pass, pass: two of five, forty percent. One adjacent transition. I wrote three in the post. I will take the correction.

My decision flip rate means majority disagreement. Keep that definition beside the result. An always-pass judge has zero flips. A stable liar is still a liar. Check correctness against independent labels.

Source: Dan Levy, [Auto-Tune Your LLM Judge](https://danlevy.net/auto-tune-your-llm-judge/), danlevy.net, 11 August 2026.

Delivery: Give 10 seconds to count before writing 2/5. Use the saved sequence.

## 09:00 to 11:30: slide 8, Twenty Green Tests

On screen:

> Zero failures in 20 independent representative trials
> (1 − p)^20 = 0.05 · solve for p

Twenty for twenty feels finished. What failure rate can we rule out? Assume independent, identically distributed trials from the population we care about.

The chance of no failures is one minus p raised to twenty. Set that to five percent and solve. The exact one-sided ninety-five-percent upper bound is thirteen point nine percent. One in seven point two. Three over twenty gives the approximate fifteen percent bound.

Twenty handpicked incidents do not meet that sampling design. They specify behaviors and acceptance criteria; they do not certify a population rate. More decimal places do not create more observations.

Source: James A. Hanley and Abby Lippman-Hand (1983), [If Nothing Goes Wrong, Is Everything All Right? Interpreting Zero Numerators](https://jhanley.biostat.mcgill.ca/c607/ch08/zero_numerator.pdf), JAMA 249(13), 1743–1745. Card et al. (2020), [With Little Power Comes Great Responsibility](https://aclanthology.org/2020.emnlp-main.745/).

Delivery: Keep the answer hidden. Give 15 seconds for a prediction, derive (1 − p)^20 = 0.05 aloud, then write 13.91% and the 15% approximation. Take 15 seconds for the sampling objection. The minute at the board includes spoken explanation.

## 11:30 to 13:45: slide 9, Agreeable to a Fault

On screen:

> 90 expert passes. Ten expert failures.
> Always-pass judge: agreement = ?; κ = ?

Experts pass ninety cases and fail ten. The judge passes everything. What agreement does it get?

Ninety percent. Congratulations, we have calibrated a button. Expected agreement from the marginal rates is also point nine. Kappa is point nine minus point nine, divided by one minus point nine: zero.

Kappa also changes with prevalence. Keep the confusion matrix and inspect the missed failures. Blind model identity, swap answer order, and repeat on your own judge. Where experts disagree, inspect the rubric before blaming the model.

Source: Cohen (1960), [A Coefficient of Agreement for Nominal Scales](https://journals.sagepub.com/doi/abs/10.1177/001316446002000104). Feinstein and Cicchetti (1990), [High agreement but low kappa](https://pubmed.ncbi.nlm.nih.gov/2348207/). Shi et al. (2025), [Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge](https://aclanthology.org/2025.ijcnlp-long.18/). Wataoka et al. (2024), [Self-Preference Bias in LLM-as-a-Judge](https://arxiv.org/abs/2410.21819).

Delivery: Give 15 seconds for agreement, then calculate kappa aloud. Omit the 45-second inspection in this route.

Bridge: record holdout exposure, slices, scorer version, and the rejection rule on your certificate.

## 13:45 to 15:00: slide 15, What does good mean here?

On screen:

> Calibration Certificate
> Six questions, evidence, limitations, owner

Take the Calibration Certificate with you. Six questions: validity, reliability, agreement, power, contamination, Goodhart. Each gets evidence, a limitation, and an owner.

Start with twenty regressions tomorrow. Each specifies an expected behavior. Fresh representative sampling answers the population question. Before seeing the candidate, write the rejection rule and the state that triggers it.

Go grade the test.

Delivery: Stop talking.
