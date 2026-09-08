# Stop Looking at My Benchmarks… Get Your Own!: bullet outline

Validate the instrument before optimizing its score.

Generated from [the 40-minute outline](outline-40min.md) by `bun artifacts/speaking-portfolio-expanded/bullets.ts`. Edit the outline, not this file. 15 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](adaptation-15min.md) · [30](adaptation-30min.md).

## Spine

1. **Tuxedo of Benchmarks** — 00:00 · warm · 02:30
2. **Same three models, your work** — 02:30 · warm · 02:00
3. **Goodhart, Campbell, and the target** — 04:30 · build · 02:30
4. **Your Eval Suite Needs Therapy** — 07:00 · build · 02:30
5. **One number is a comforting fiction** — 09:30 · build · 02:30
6. **"Cancel my account."** — 12:00 · build · 03:00
7. **Run the Judges** — 15:00 · build · 03:00
8. **Twenty for Twenty, One in Seven** — 18:00 · build · 03:30
9. **Agreeable to a Fault (κ = 0)** — 21:30 · build · 03:30
10. **Cranfield had a test collection** — 25:00 · build · 02:30
11. **holdout.json Is Not Held Out** — 27:30 · build · 03:00
12. **Stop averaging away failure** — 30:30 · build · 02:30
13. **The Cheapest Honest No** — 33:00 · build · 02:00
14. **Write the Rejection Rule First** — 35:00 · land · 02:30
15. **What does good mean here?** — 37:30 · land · 02:30

## Slides

### 1. Tuxedo of Benchmarks

00:00–02:30 · warm · 02:30

> A · 89.7
> B · 88.9
> C · 84.3

- Every new model arrives wearing a tuxedo of benchmarks.
- One scope statement: the model names and workload numbers in this fixture are invented.
- A won the displayed competition. Before buying the result, ask what competition it was.
- Do — Take one show of hands. Do not ask the room to vote again on the next slide.

### 2. Same three models, your work

02:30–04:30 · warm · 02:00

> A · 71% pass · $0.34/run
> B · 82% pass · $0.28/run
> C · 90% pass · $0.20/run

- Now the same models attempt our cancellation workflow.
- We still need to know what pass meant. Did the system cancel the right account, or did it write a reassuring answer?
- Prices can help choose among acceptable systems.

### 3. Goodhart, Campbell, and the target

04:30–07:00 · build · 02:30

> Reward a proxy and behavior changes
> Credit Strathern for the familiar Goodhart wording

- Goodhart described statistical regularities breaking under pressure from their use in control.
- The practical question is the same. What behavior improves the number without improving the thing we care about?
- Write that loophole down before optimizing.
- Source — Goodhart (1975), Problems of Monetary Management: The U.K. Experience, Reserve Bank of Australia conference paper (reprinted 1981). Campbell (1979), [Assessing the impact of planned social change](https://doi.org/10.1016/0149-7189%2879%2990048-X). Strathern (1997), [Improving ratings](https://gwern.net/doc/statistics/decision/1997-strathern.pdf), European Review 5(3), 305–321. Formulations above are attributed paraphrases, not claims that every optimized benchmark has stopped measuring anything.

### 4. Your Eval Suite Needs Therapy

07:00–09:30 · build · 02:30

> The suite needs an eval
> A green run is an inference, not a warranty

- Your eval suite is a psychometric instrument somebody checked into Git.
- Try a response that sounds excellent but leaves the account active.
- Nobody needs another dashboard to discover that the grader rewards tone.
- Story — The green eval run followed by a production failure. Bring the case, the score, the observed state, and the assumption the scorer missed.

### 5. One number is a comforting fiction

09:30–12:00 · build · 02:30

> What is the score a score of?
> Construct validity: evidence for the interpretation

- Cronbach and Meehl gave us construct validity.
- Raji and colleagues make the problem explicit for broad AI benchmarks.
- For cancellation, separate constraints from preferences.
- Source — Cronbach and Meehl (1955), [Construct validity in psychological tests](https://psychclassics.yorku.ca/Cronbach/construct.htm). Messick (1990), [Validity of Test Interpretation and Use](https://www.ets.org/research/policy_research_reports/publications/report/1990/ihmy.html). Raji et al. (2021), [AI and the Everything in the Whole Wide World Benchmark](https://datasets-benchmarks-proceedings.neurips.cc/paper/2021/hash/084b6fbb10729ed4da8c3d3f5a3ae7c9-Abstract-round2.html).

### 6. "Cancel my account."

12:00–15:00 · build · 03:00

> Right account. Applicable policy. Authorized action.
> Verify state. Include the refusal path.

- A customer asks to cancel. Identify the account through an authenticated context.
- Now vary one thing at a time. Wrong tenant.
- A trace becomes a test when it answers a specific question.
- Do — Walk through timeout-after-acceptance using the contracts handout. Ask which backend read distinguishes a failed cancellation from a lost response.

### 7. Run the Judges

15:00–18:00 · build · 03:00

> 94, 82, 91, 97, 89
> 78, 79, 81, 82, 80 · pass at ≥ 80
> Majority disagreement: 2 / 5 = 40%

- Your judge scores ninety-four, then eighty-two, then ninety-one, then ninety-seven, then eighty-nine.
- A narrower spread can still change a decision.
- In Auto-Tune Your LLM Judge I call majority disagreement the decision flip rate.
- Do — Ask who reruns a fixed case. Reveal the five verdicts and do the 2/5 calculation aloud. Use the saved sequence; do not claim a live model run.
- Source — Dan Levy, [Auto-Tune Your LLM Judge](https://danlevy.net/auto-tune-your-llm-judge/), danlevy.net, 11 August 2026. The sequence is reused as a teaching fixture, not a fresh measurement.

### 8. Twenty for Twenty, One in Seven

18:00–21:30 · build · 03:30

> Zero failures in 20 independent representative trials
> 95% upper bound: 3 / 20 ≈ 15%; exact 13.9%

- Twenty for twenty feels finished. Here is what it buys under independent, identically distributed sampling from the population you care about.
- With no failures, the chance of that observation at failure probability p is one minus p, raised to twenty.
- Now the uncomfortable part. Twenty cases hand-picked from your favorite incidents are not a random sample.
- Card and colleagues examined statistical power in NLP comparisons.
- Diagram — Twenty for Twenty, One in Seven
- Do — Spend one minute on (1 − p)^20 = 0.05. Ask what sample selection would make the bound inapplicable. Run arithmetic.ts if a calculator helps.
- Source — James A. Hanley and Abby Lippman-Hand (1983), [If Nothing Goes Wrong, Is Everything All Right? Interpreting Zero Numerators](https://www.medicine.mcgill.ca/epidemiology/hanley/c607/ch08/zero_numerator.pdf), JAMA 249(13), 1743–1745. Card et al. (2020), [With Little Power Comes Great Responsibility](https://aclanthology.org/2020.emnlp-main.745/).

### 9. Agreeable to a Fault (κ = 0)

21:30–25:00 · build · 03:30

> 90 expert passes. Ten expert failures.
> Always-pass judge: 90% agreement, κ = 0

- Take a hundred cases. Experts pass ninety and fail ten.
- Cohen's kappa compares observed agreement with agreement expected from the marginal label rates.
- Blind model identity. Swap A/B answer order.
- Do — Write the 90/10 confusion matrix. Compute (0.9 − 0.9)/(1 − 0.9). Allow 45 seconds to inspect the ten missed failures.
- Source — Cohen (1960), [A Coefficient of Agreement for Nominal Scales](https://journals.sagepub.com/doi/abs/10.1177/001316446002000104). Feinstein and Cicchetti (1990), [High agreement but low kappa](https://pubmed.ncbi.nlm.nih.gov/2348207/). Shi et al. (2024), [Judging the Judges: position bias in pairwise LLM comparisons](https://arxiv.org/abs/2406.07791). Wataoka et al. (2024), [Self-Preference Bias in LLM-as-a-Judge](https://arxiv.org/abs/2410.21819).

### 10. Cranfield had a test collection

25:00–27:30 · build · 02:30

> Fixed corpus. Queries. Relevance judgments.
> TREC started in 1992. It studied its own measurement.

- Cleverdon, Mills, and Keen documented the Cranfield test collections in 1966.
- The discipline also investigated its weak points.
- The Retrieval talk follows that history and its pooling problem.
- Source — Cleverdon, Mills, and Keen (1966), [Cranfield report front matter](https://sigir.org/files/museum/Factors%20Determining%20the%20Performance%20of%20Indexing%20Systems%20Volume%20I.%20Design%20-%20Part%202.%20Appendices/pdfs/frontmatter.pdf). [NIST TREC overview](https://trec.nist.gov/overview.html). Voorhees (2000), [Variations in Relevance Judgments](https://www.nist.gov/publications/variations-relevance-judgments-and-measurement-retrieval-effectiveness).

### 11. holdout.json Is Not Held Out

27:30–30:30 · build · 03:00

> Public tests may have entered training
> Repeated tuning spends the holdout

- Two different leaks. A public test may already be in the training data.
- The second leak is ours. We inspect the holdout, tune a prompt, inspect it again, and repeat until the result looks good.
- Keep development cases separate from release evidence.
- Source — Oren et al. (2024), [Proving Test Set Contamination in Black-Box Language Models](https://proceedings.iclr.cc/paper_files/paper/2024/hash/46e624c244cff669223d488defd4e835-Abstract-Conference.html). Dwork et al. (2015), [The reusable holdout](https://pubmed.ncbi.nlm.nih.gov/26250683/), Science 349(6248), 636–638.

### 12. Stop averaging away failure

30:30–33:00 · build · 02:30

> Slice by failure mechanism
> Show counts, variation, and critical violations

- An overall pass rate weights whatever mix you put in the file.
- Report cancellation by account type, authorization state, language, and tool outcome.
- Track critical violations separately. Nine friendly answers do not compensate for deleting the wrong account.

### 13. The Cheapest Honest No

33:00–35:00 · build · 02:00

> State and schema belong in code
> Use judgment where the criterion requires it

- Check the account state with code. Check whether a required field exists with code.
- Use a model grader where the criterion requires language judgment, and validate it against labeled cases.
- The ladder is a division of questions. It is not a contest to see how many things we can put behind an LLM call.

### 14. Write the Rejection Rule First

35:00–37:30 · land · 02:30

> Version cases, scorer, rubric, and candidate
> Write the rejection rule before the flattering result

- A release comparison needs the system version, prompt, tool configuration, corpus revision, scorer revision, and baseline.
- Set the rejection rule before viewing the candidate.
- What would block your next rollout? Write one answer that the current suite could actually detect.
- Do — Give 45 seconds to write. Take one rule and ask which observable state would trigger it.

### 15. What does good mean here?

37:30–40:00 · land · 02:30

> Validity · reliability · agreement
> Power · contamination · Goodhart

- Start with twenty cases tomorrow. Attach the acceptance criterion, the source, and the reason each case belongs.
- Validity asks what inference the score supports.
- The suite is an instrument. Test the instrument.
- Do — Stop talking.
