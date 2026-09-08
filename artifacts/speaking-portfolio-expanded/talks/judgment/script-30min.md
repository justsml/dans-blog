# Turn Your Thinkin' Tokens Up to 11: 30-minute presenter script

Use slides 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Drops the architecture bill and the configured-fleet slide; both ride in bridges. The exercise keeps its full sixty seconds and the arithmetic keeps 3:30.

## 00:00 to 02:30: slide 1, These go to eleven

On screen:

> Code is free. Features are free.
> Attention is the budget.

Four features shipped before lunch. All four work. All four have tests. Your best customer opens the app for the first time in six weeks and cannot find the button she used every Friday. Nobody filed a bug.

Here is the line this talk has to earn. Don't count what the feature cost you to build, count what it costs them to relearn.

The title is a Spinal Tap joke and it is load-bearing. Turn the reasoning budget up to eleven. More tokens buy more consideration of situations the model has already seen. They do not buy taste, and they do not tell you which Tuesday.

Scope, once. The arithmetic later is counting, not a measurement of your team, and the two futures at the end are labeled predictions I have not measured.

Story: The feature you were proudest of that a long-absent customer experienced as a broken workflow. Bring the ticket, the gap between their sessions, and what they actually said.

## 02:30 to 04:30: slide 2, What got cheap, and what didn't

On screen:

> Someone has to want it · build it · learn it
> We only automated the middle one

Three things used to gate a feature. Someone had to want it, someone had to build it, and someone had to learn it. We spent a decade attacking the middle one and this year we finished the job. The other two did not move.

Build cost is now close enough to zero that it stops being the selection mechanism, and that is the part nobody plans for. Scarcity was doing your prioritization for free. When the constraint dies, the decision it was quietly making lands on your desk, unlabeled.

## 04:30 to 07:00: slide 3, Nobody lives in your app

On screen:

> 90 days · 46 releases · 4 sessions
> Between visits two and three: 21 changes, at once

Here is ninety days. The top track is your deploys: forty-six of them, roughly every other day, which any DORA-literate team would call healthy. The bottom track is one customer's sessions: four. Day three, day nineteen, day sixty-one, day eighty-eight.

Between her second visit and her third you shipped twenty-one changes. She does not receive twenty-one changes. She receives one change, all at once, and it is enormous. Your release cadence and her absorption rate are different meters, and only one of them is on a dashboard.

DORA's four keys measure delivery capability: deployment frequency, lead time, change failure rate, time to restore. They are good measures of your pipeline. None of them describes what a returning user walks into. That measurement does not exist at most companies, and it is the one this talk is about.

Source: Nicole Forsgren, Jez Humble and Gene Kim (2018), [Accelerate: The Science of Lean Software and DevOps](https://itrevolution.com/product/accelerate/), IT Revolution. The four key metrics describe delivery performance, not user absorption; the tracks in this diagram are an illustration, not measured telemetry.

Delivery: Ask for a show of hands on median return interval before revealing the bottom track. Most rooms have never measured it; say so and move on.

## 07:00 to 09:30: slide 4, Feature fatigue is a measured effect

On screen:

> Before use: capability wins
> After use: usability wins
> Delighters decay into expectations

Thompson, Hamilton and Rust ran this in 2005 and named it feature fatigue. Before purchase, people prefer the product with more capabilities. After using it, satisfaction tracks usability instead. The same person picks the loaded one and then resents it.

That is not a quirk, it is a structural problem. Your acquisition signal and your retention signal point in opposite directions, and the feature list is exactly where they diverge. Adding capability makes the sale and costs the renewal. Both effects are real and they arrive at different times, which is why no single dashboard shows you the trade.

Kano's model from 1984 splits attributes into must-be, one-dimensional and attractive. The attractive ones are the delighters, and Kano's own point is that they do not stay attractive. Today's delight is next year's baseline expectation, and the year after that its absence is a defect.

Source: Debora Viana Thompson, Rebecca W. Hamilton and Roland T. Rust (2005), [Feature Fatigue: When Product Capabilities Become Too Much of a Good Thing](https://doi.org/10.1509/jmkr.2005.42.4.431), Journal of Marketing Research 42(4), 431–442. Noriaki Kano, Nobuhiko Seraku, Fumio Takahashi and Shinichi Tsuji (1984), Attractive Quality and Must-Be Quality, Journal of the Japanese Society for Quality Control 14(2), 39–48.

## 09:30 to 11:30: slide 5, A change is a loss before it is a gain

On screen:

> Status quo bias · endowment effect
> Recognition, not recall
> The gain is yours. The loss is theirs, today.

Samuelson and Zeckhauser named status quo bias in 1988: across lab and field decisions, people over-select the option they already hold. Kahneman, Knetsch and Thaler measured the endowment effect the same way — you want more for the mug once it is yours. Your user owns a workflow, and you are proposing to take it.

The gain from a redesign is real, and it arrives later, spread thin. The loss is small, specific and arrives on first login. Individually every change was an improvement. In aggregate, at your cadence, it reads as instability.

Source: William Samuelson and Richard Zeckhauser (1988), [Status Quo Bias in Decision Making](https://doi.org/10.1007/BF00055564), Journal of Risk and Uncertainty 1(1), 7–59. Daniel Kahneman, Jack L. Knetsch and Richard H. Thaler (1990), [Experimental Tests of the Endowment Effect and the Coase Theorem](https://doi.org/10.1086/261737), Journal of Political Economy 98(6), 1325–1348. Jakob Nielsen (1994), [Ten Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/).

## 11:30 to 14:00: slide 6, "Ship it Tuesday"

On screen:

> "Ship it Tuesday."
> That is the whole request.

Ship it Tuesday. That is the entire request, somebody senior said it, and everyone in the room nodded.

Sixty seconds with the person next to you. Write down what else has to be true for Tuesday to be the right answer. You do not get a second page of context; that is the point.

Which customers get it Tuesday? Do they get it with the other three things in the branch, or on its own? Who is on support Tuesday afternoon? Has anyone told the people who write the docs, the people who trained the account team, or the customer whose renewal is Thursday? Is Tuesday reversible?

None of those are engineering questions and all of them are release questions. We made building free and left the sequencing expensive.

Delivery: Read the request once, exactly as written. Give pairs sixty seconds here, thirty in the 15-minute cut. Collect two answers, then add the renewal date and the support roster yourself.

## 14:00 to 16:30: slide 7, Five axes, one of them a date

On screen:

> What · who · when · shape · reversibility
> Every axis commits somebody who is not in this room

Five axes, not one. Most roadmap tools model exactly one of them, the date, which is why the date is the only one that ever gets argued about.

Read the right-hand column. Every one of these commits a person who is not in this room: support staffing, a documentation rewrite, an account executive who already promised it, a renewal conversation on Thursday. Marketing wants a date it can build a campaign against, and a campaign is a promise you cannot flag off.

You also have to keep all of it flexible, because a competitor ships something on a Wednesday and now you want to pull a feature forward. Pulling it forward is not free. It costs you the sequence, and the sequence was the part you had actually reasoned about.

| Axis | Question | Commits |
| --- | --- | --- |
| What | Should it exist at all? | Docs, support surface |
| Who | Everyone, or a cohort? | Sales, contracts |
| When | Tuesday, or next quarter? | Marketing, renewals |
| Shape | One batch or rolling? | Rollback, triage |
| Reversible | Flag, migration, one-way? | On-call, data model |

Story: The release you pulled forward to answer a competitor. Bring what slipped, what support absorbed, and whether it worked.

## 16:30 to 20:00: slide 8, Turn the tokens up

On screen:

> 6 features · 3 cohorts → 524,880 plans
> 12,000 weekly actives · 4 weeks → 16 arms
> 32,805 plans per arm of evidence

Six features. Order them: seven hundred and twenty sequences. Assign each to one of three cohorts: three to the sixth, seven hundred and twenty-nine. Multiply. Five hundred and twenty-four thousand, eight hundred and eighty distinct plans, and that is before batching and before dates.

Now the evidence you can buy. Twelve thousand weekly actives, a four-week window, forty-eight thousand exposures. At an eight percent baseline, detecting a two-point lift needs roughly three thousand per arm, so sixteen arms. Divide: thirty-two thousand, eight hundred and five plans for every arm of evidence you can afford. Benchmarks owns the power arithmetic; here I only need the count.

So turn the thinkin' tokens up. Chollet's 2019 definition treats intelligence as skill acquisition over novel tasks, and a system that has already seen the situation is not demonstrating that. Your product's next six months is a task nobody has seen, including you.

My claim is weaker and safer. The model has not met your users. More tokens do not fix that, and neither does more of you, because your judgment is biased too. The difference is that you can write your prediction down before the release and check it afterward.

Source: François Chollet (2019), [On the Measure of Intelligence](https://arxiv.org/abs/1911.01547), arXiv:1911.01547. Parshin Shojaee and colleagues (2025), [The Illusion of Thinking](https://machinelearning.apple.com/research/illusion-of-thinking), Apple Machine Learning Research; and the rebuttal, [The Illusion of the Illusion of Thinking](https://arxiv.org/abs/2506.09250), arXiv:2506.09250. Present as a contested exchange, not a settled result.

Delivery: Do 6! × 3⁶ on the board for the plan count, then exposures over the per-arm sample size for the arm count. Do the final division on the board rather than reading it. Say once that the numbers are six features and three cohorts, not their company.

## 20:00 to 22:00: slide 9, What the machine is actually for

On screen:

> Cluster 4,000 support threads → yes
> Choose the order → no
> It proposes. You sequence.

This is not an anti-AI slide, and the useful list is long. Cluster four thousand support threads by complaint. Find the twelve accounts whose usage pattern matches the cohort you are about to change. Draft the rollout plan, the docs diff and the support macro at once.

What it cannot do is care which one your users will love, because it has never met them and because the answer does not exist yet. It proposes. You sequence. Then you own the sequence.

## 22:00 to 25:00: slide 10, Prediction: the version picker

On screen:

> Theme · Language · Version
> "You're on 4.2. It's 43 days old. Update, or turn on auto-update."

First prediction, labeled once as a prediction. Version becomes a first-class user-facing control, sitting in settings beside theme and language, because those two are already there for exactly this reason. They are preferences about how the software meets you.

A returning user lands on the version she left. The banner reads: you are on 4.2, it is forty-three days old, here is what changed, update now or turn on auto-update. Change stops being something that happened to her while she was away and becomes something she asks for. That is the whole move.

The web spent twenty years removing this control and calling it a feature. Everyone runs current, nobody sits on an old build, support reasons about one thing. That was the right trade when shipping was expensive and rare. Ask whether it is still the right trade at forty-six deploys a quarter.

Bridge: serving many live versions costs a versioned runtime and a semi-persistent sandbox per user. Privacy improves, patching gets worse, and under Hyrum's law every live version is a live contract, including the behaviors you consider bugs. Pick the number of supported versions on purpose and give it an expiry.

## 25:00 to 28:00: slide 12, Prediction: the app your neighbor configured

On screen:

> "Turn on what people like me have on"
> Shareable configuration profiles
> Developers have done this for thirty years

Second prediction. Feature flags stop being your deployment tool and become the user's preference surface. Not a wall of switches: a profile. Turn on what people who use this the way I do have turned on. Follow this person's setup. Adopt my team's.

This is not new, it is unevenly distributed. Dotfiles. VS Code extension packs. Home Assistant blueprints. Excel templates. Figma community files. Mod lists. Developers have been shipping configuration to each other as a social object for thirty years and we never offered it to anybody else.

Von Hippel's lead-user work found users at the leading edge of a market inventing what the rest will want, and his toolkit work in 2002 is about shipping them the means to do it. Rogers gives you the shape of who adopts first. A shared profile is a toolkit and a diffusion channel in the same object.

Source: Eric von Hippel (1986), [Lead Users: A Source of Novel Product Concepts](https://doi.org/10.1287/mnsc.32.7.791), Management Science 32(7), 791–805. Eric von Hippel and Ralph Katz (2002), [Shifting Innovation to Users via Toolkits](https://doi.org/10.1287/mnsc.48.7.821.2817), Management Science 48(7), 821–833. Everett M. Rogers (2003), Diffusion of Innovations, 5th edition, Free Press.

Bridge: a configured fleet breaks support's first question, your documentation screenshots and your A/B baseline, and somebody still owns the default a new user gets before they have a neighbor. Distribution concentrates, defaults win, and curating the shared profiles becomes the job.

## 28:00 to 30:00: slide 14, Knowing what not to ship

On screen:

> Don't count what it cost you to build.
> Count what it costs them to relearn.

Back to the two tracks. Forty-six releases, four sessions. You did not get slower and she did not get dumber. You filled the space between her visits with work she has to do.

Turn the reasoning up as far as it goes. It will hand you a better-argued plan for a market it has never seen. The part it cannot do is the part you were hired for: knowing which of these your people will love, and knowing when they can stand to receive it.

Sometimes the right release is a smaller one. Sometimes it is the same app they left.

Delivery: Step back to slide 3 for the two tracks, then return here. Stop talking.
