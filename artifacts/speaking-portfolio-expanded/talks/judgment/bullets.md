# Turn Your Thinkin' Tokens Up to 11: bullet outline

What to ship, to whom, and when, now that building it is the cheap part.

Generated from [the 40-minute outline](outline-40min.md) by `bun artifacts/speaking-portfolio-expanded/bullets.ts`. Edit the outline, not this file. 14 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](adaptation-15min.md) · [30](adaptation-30min.md).

## Spine

1. **These go to eleven** — 00:00 · warm · 02:30
2. **What got cheap, and what didn't** — 02:30 · warm · 02:30
3. **Nobody lives in your app** — 05:00 · build · 03:00
4. **Feature fatigue is a measured effect** — 08:00 · build · 03:00
5. **A change is a loss before it is a gain** — 11:00 · build · 02:30
6. **"Ship it Tuesday"** — 13:30 · build · 03:00
7. **Five axes, one of them a date** — 16:30 · build · 03:00
8. **Turn the tokens up** — 19:30 · peak · 04:00
9. **What the machine is actually for** — 23:30 · build · 02:30
10. **Prediction: the version picker** — 26:00 · build · 03:30
11. **What that costs to build** — 29:30 · build · 02:30
12. **Prediction: the app your neighbor configured** — 32:00 · build · 03:00
13. **Everyone runs a different app now** — 35:00 · build · 03:00
14. **Knowing what not to ship** — 38:00 · land · 02:00

## Slides

### 1. These go to eleven

00:00–02:30 · warm · 02:30

> Code is free. Features are free.
> Attention is the budget.

- Four features shipped before lunch. All four work.
- Here is the line this talk has to earn. Don't count what the feature cost you to build, count what it costs them to relearn.
- The title is a Spinal Tap joke and it is load-bearing.
- Scope, once. The arithmetic later is counting, not a measurement of your team, and the two futures at the end are labeled predictions I have not measured.
- Story — The feature you were proudest of that a long-absent customer experienced as a broken workflow. Bring the ticket, the gap between their sessions, and what they actually said.

### 2. What got cheap, and what didn't

02:30–05:00 · warm · 02:30

> Someone has to want it · build it · learn it
> We only automated the middle one

- Three things used to gate a feature. Someone had to want it, someone had to build it, and someone had to learn it.
- Build cost is now close enough to zero that it stops being the selection mechanism, and that is the part nobody plans for.
- So the interesting question stopped being what can we build.

### 3. Nobody lives in your app

05:00–08:00 · build · 03:00

> 90 days · 46 releases · 4 sessions
> Between visits two and three: 21 changes, at once

- Here is ninety days. The top track is your deploys: forty-six of them, roughly every other day, which any DORA-literate team would call healthy.
- Between her second visit and her third you shipped twenty-one changes.
- DORA's four keys measure delivery capability: deployment frequency, lead time, change failure rate, time to restore.
- Diagram — Ninety days of releases against one user's four sessions
- Do — Ask for a show of hands on median return interval before revealing the bottom track. Most rooms have never measured it; say so and move on.
- Source — Nicole Forsgren, Jez Humble and Gene Kim (2018), [Accelerate: The Science of Lean Software and DevOps](https://itrevolution.com/product/accelerate/), IT Revolution. The four key metrics describe delivery performance, not user absorption; the tracks in this diagram are an illustration, not measured telemetry.

### 4. Feature fatigue is a measured effect

08:00–11:00 · build · 03:00

> Before use: capability wins
> After use: usability wins
> Delighters decay into expectations

- Thompson, Hamilton and Rust ran this in 2005 and named it feature fatigue.
- That is not a quirk, it is a structural problem.
- Kano's model from 1984 splits attributes into must-be, one-dimensional and attractive.
- Source — Debora Viana Thompson, Rebecca W. Hamilton and Roland T. Rust (2005), [Feature Fatigue: When Product Capabilities Become Too Much of a Good Thing](https://doi.org/10.1509/jmkr.2005.42.4.431), Journal of Marketing Research 42(4), 431–442. Noriaki Kano, Nobuhiko Seraku, Fumio Takahashi and Shinichi Tsuji (1984), Attractive Quality and Must-Be Quality, Journal of the Japanese Society for Quality Control 14(2), 39–48.

### 5. A change is a loss before it is a gain

11:00–13:30 · build · 02:30

> Status quo bias · endowment effect
> Recognition, not recall
> The gain is yours. The loss is theirs, today.

- Samuelson and Zeckhauser named status quo bias in 1988: across lab and field decisions, people over-select the option they already hold.
- Nielsen's heuristic says recognition rather than recall.
- The gain from a redesign is real, and it arrives later, spread thin.
- Source — William Samuelson and Richard Zeckhauser (1988), [Status Quo Bias in Decision Making](https://doi.org/10.1007/BF00055564), Journal of Risk and Uncertainty 1(1), 7–59. Daniel Kahneman, Jack L. Knetsch and Richard H. Thaler (1990), [Experimental Tests of the Endowment Effect and the Coase Theorem](https://doi.org/10.1086/261737), Journal of Political Economy 98(6), 1325–1348. Jakob Nielsen (1994), [Ten Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/).

### 6. "Ship it Tuesday"

13:30–16:30 · build · 03:00

> "Ship it Tuesday."
> That is the whole request.

- Ship it Tuesday. That is the entire request, somebody senior said it, and everyone in the room nodded.
- Sixty seconds with the person next to you.
- Which customers get it Tuesday? Do they get it with the other three things in the branch, or on its own?
- None of those are engineering questions and all of them are release questions.
- Do — Read the request once, exactly as written. Give pairs sixty seconds here, thirty in the 15-minute cut. Collect two answers, then add the renewal date and the support roster yourself.

### 7. Five axes, one of them a date

16:30–19:30 · build · 03:00

> What · who · when · shape · reversibility
> Every axis commits somebody who is not in this room

- Five axes, not one. Most roadmap tools model exactly one of them, the date, which is why the date is the only one that ever gets argued about.
- Read the right-hand column. Every one of these commits a person who is not in this room: support staffing, a documentation rewrite, an account executive who already promised it, a renewal conversation on Thursday.
- You also have to keep all of it flexible, because a competitor ships something on a Wednesday and now you want to pull a feature forward.
- Table — Axis · Question · Commits, 5 rows
- Story — The release you pulled forward to answer a competitor. Bring what slipped, what support absorbed, and whether it worked.

### 8. Turn the tokens up

19:30–23:30 · peak · 04:00

> 6 features · 3 cohorts → 524,880 plans
> 12,000 weekly actives · 4 weeks → 16 arms
> 32,805 plans per arm of evidence

- Six features. Order them: seven hundred and twenty sequences.
- Now the evidence you can buy. Twelve thousand weekly actives, a four-week window, forty-eight thousand exposures.
- So turn the thinkin' tokens up. Chollet's 2019 definition treats intelligence as skill acquisition over novel tasks, and a system that has already seen the situation is not demonstrating that.
- There is a paper about exactly this: the Apple group's Illusion of Thinking, 2025, reporting that reasoning models collapse past a complexity threshold and spend fewer tokens as problems get harder.
- My claim is weaker and safer. The model has not met your users.
- Do — Run `bun artifacts/speaking-portfolio-expanded/talks/judgment/demo.ts` for the plan count, then add `--evidence` for the arm count. Do the final division on the board rather than reading it. Say once that the numbers are six features and three cohorts, not their company.
- Source — François Chollet (2019), [On the Measure of Intelligence](https://arxiv.org/abs/1911.01547), arXiv:1911.01547. Parshin Shojaee and colleagues (2025), [The Illusion of Thinking](https://machinelearning.apple.com/research/illusion-of-thinking), Apple Machine Learning Research; and the rebuttal, [The Illusion of the Illusion of Thinking](https://arxiv.org/abs/2506.09250), arXiv:2506.09250. Present as a contested exchange, not a settled result.

### 9. What the machine is actually for

23:30–26:00 · build · 02:30

> Cluster 4,000 support threads → yes
> Choose the order → no
> It proposes. You sequence.

- This is not an anti-AI slide, and the useful list is long.
- Better, have it hunt the conflict you would have missed.
- What it cannot do is care which one your users will love, because it has never met them and because the answer does not exist yet.

### 10. Prediction: the version picker

26:00–29:30 · build · 03:30

> Theme · Language · Version
> "You're on 4.2. It's 43 days old. Update, or turn on auto-update."

- First prediction, labeled once as a prediction.
- A returning user lands on the version she left.
- The web spent twenty years removing this control and calling it a feature.
- The picker also makes the cost visible to you.
- Diagram — A settings panel where version sits beside theme and language

### 11. What that costs to build

29:30–32:00 · build · 02:30

> Versioned runtime + a sandbox per user
> Privacy: better. Patching: worse.
> Every live version is a live contract

- Now the engineering bill, because the prediction is easy and the architecture is not.
- That buys something real on privacy. Data that never leaves a user's sandbox is data you cannot leak in bulk, and a breach costs you one tenant instead of one table.
- Every live version is also a live contract.
- Source — Hyrum Wright, [Hyrum's Law](https://www.hyrumslaw.com/). Stated as an observation about interface consumers, not a measured result.

### 12. Prediction: the app your neighbor configured

32:00–35:00 · build · 03:00

> "Turn on what people like me have on"
> Shareable configuration profiles
> Developers have done this for thirty years

- Second prediction. Feature flags stop being your deployment tool and become the user's preference surface.
- This is not new, it is unevenly distributed.
- Von Hippel's lead-user work found users at the leading edge of a market inventing what the rest will want, and his toolkit work in 2002 is about shipping them the means to do it.
- Source — Eric von Hippel (1986), [Lead Users: A Source of Novel Product Concepts](https://doi.org/10.1287/mnsc.32.7.791), Management Science 32(7), 791–805. Eric von Hippel and Ralph Katz (2002), [Shifting Innovation to Users via Toolkits](https://doi.org/10.1287/mnsc.48.7.821.2817), Management Science 48(7), 821–833. Everett M. Rogers (2003), Diffusion of Innovations, 5th edition, Free Press.

### 13. Everyone runs a different app now

35:00–38:00 · build · 03:00

> Support: "which app do you have?"
> Screenshots · A/B baselines · accessibility defaults
> Same as it ever was: defaults still win

- Support opens with a new first question: which app do you have.
- A user can also configure themselves into a corner and never meet the thing that would have helped.
- Choice overload is the obvious objection and I will raise it myself: Iyengar and Lepper's jam study, 2000.
- It is that nobody is curating them. Somebody owns the default profile, somebody decides which shared setups get promoted, and somebody decides what a new user gets before they have a neighbor.
- Source — Sheena S. Iyengar and Mark R. Lepper (2000), [When Choice is Demotivating](https://doi.org/10.1037/0022-3514.79.6.995), Journal of Personality and Social Psychology 79(6), 995–1006. Benjamin Scheibehenne, Rainer Greifeneder and Peter M. Todd (2010), [Can There Ever Be Too Many Options?](https://doi.org/10.1086/651235), Journal of Consumer Research 37(3), 409–425. Cited to set aside.

### 14. Knowing what not to ship

38:00–40:00 · land · 02:00

> Don't count what it cost you to build.
> Count what it costs them to relearn.

- Back to the two tracks. Forty-six releases, four sessions.
- Turn the reasoning up as far as it goes.
- Sometimes the right release is a smaller one.
- Do — Step back to slide 3 for the two tracks, then return here. Stop talking.
