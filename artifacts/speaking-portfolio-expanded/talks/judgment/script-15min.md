# Turn Your Thinkin' Tokens Up to 11: 15-minute presenter script

Use slides 1, 4, 5, 8, 10, 12, 14. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill bounded Story substitutions before delivery; no extra words or minutes. Timings are rehearsal targets without Q&A. Lightning route: the cost of change, the plan-space arithmetic, then both predictions. The pair exercise is cut; slide 5 names the release questions without asking pairs to answer.

Budget: 14 spoken minutes including bounded Story substitutions and bridges + 1 interaction minutes = 15. [Per-slide spoken-time checks](pacing.md) include exercise narration.

## 00:00 to 02:00: slide 1, These go to eleven

On screen:

> Generating got cheap.
> Attention is the budget.

Four features shipped before lunch. All four work. All four have tests. Your best customer opens the app for the first time in six weeks and cannot find the button she used every Friday. Nobody filed a bug.

Here is the line this talk has to earn. Don't count what the feature cost you to build, count what it costs them to relearn.

Turn the reasoning budget up to eleven. More tokens can buy a more carefully reasoned proposal. They do not buy taste, and they do not tell you which Tuesday.


Bridge: scope, once — the arithmetic ahead is counting, not a measurement of your team. Ninety days is forty-six of your deploys and four of her sessions, and between two visits she meets twenty-one changes at once.

## 02:00 to 03:45: slide 4, Feature fatigue is a measured effect

On screen:

> Before use: capability wins
> After use: usability wins
> Delighters decay into expectations

Thompson, Hamilton and Rust ran this in 2005 and named it feature fatigue. Before use, people prefer the product with more capabilities. After using it, satisfaction tracks usability instead. The same person picks the loaded one and then resents it.

That is not a quirk, it is a structural problem. Applied to software, that raises a question: does capability win the signup while usability keeps the renewal? Measure both; the consumer experiment does not establish your retention effect.

Source: Debora Viana Thompson, Rebecca W. Hamilton and Roland T. Rust (2005), [Feature Fatigue: When Product Capabilities Become Too Much of a Good Thing](https://doi.org/10.1509/jmkr.2005.42.4.431), Journal of Marketing Research 42(4), 431–442. Noriaki Kano, Nobuhiko Seraku, Fumio Takahashi and Shinichi Tsuji (1984), Attractive Quality and Must-Be Quality, Journal of the Japanese Society for Quality Control 14(2), 39–48.

## 03:45 to 05:30: slide 5, A change is a loss before it is a gain

On screen:

> Status quo bias · endowment effect
> Recognition, not recall
> The gain is yours. The loss is theirs, today.

Samuelson and Zeckhauser named status quo bias in 1988: across lab and field decisions, people over-select the option they already hold. Kahneman, Knetsch and Thaler measured the endowment effect the same way — you want more for the mug once it is yours. Your user owns a workflow, and you are proposing to take it.

Nielsen calls for recognition rather than recall: moving a familiar control taxes memory. The gain from a redesign is real, and it arrives later, spread thin. The loss is small, specific and arrives on first login. Individually every change was an improvement. In aggregate, at your cadence, it reads as instability.

Source: William Samuelson and Richard Zeckhauser (1988), [Status Quo Bias in Decision Making](https://doi.org/10.1007/BF00055564), Journal of Risk and Uncertainty 1(1), 7–59. Daniel Kahneman, Jack L. Knetsch and Richard H. Thaler (1990), [Experimental Tests of the Endowment Effect and the Coase Theorem](https://doi.org/10.1086/261737), Journal of Political Economy 98(6), 1325–1348. Jakob Nielsen (1994), [Ten Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/).

Bridge: ship it Tuesday for whom, with what else, with which support roster, and can we reverse it? Those are release questions as well as engineering questions.

## 05:30 to 08:45: slide 8, Turn the tokens up

On screen:

> Half a million candidate plans. At most sixteen arms.
> 6! × 3⁶ = 524,880
> 48,000 distinct eligible users; two-arm sizing heuristic

Six distinct features, every ordering allowed, each assigned to one of three cohorts. Six factorial times three to the sixth gives 524,880 candidate plans.

The handout budgets 48,000 distinct eligible users, not repeat weekly visits. A two-arm heuristic needs roughly 3,000 independent outcomes per arm for an eight-percent baseline and a two-point absolute lift. At most sixteen arms fit, including control, before multiplicity or attrition. Half a million plans; sixteen arms. These are not sixteen fully powered experiments.

Why not make ten the top number? Because these go to eleven.

We need not test every plan: constraints and prior results narrow the choice. Extra reasoning can improve a proposal; it does not create customer evidence. Write down the decision and check it afterward.

Delivery: Spend forty-five seconds on 6! × 3⁶ only. The arm sizing is provided in the handout; do not derive it or the final quotient on this route.

Bridge: let the machine search the support threads and find the rollout conflict. You own the supported choices and the rollout policy.

## 08:45 to 11:15: slide 10, Prediction: the version picker

On screen:

> Theme · Language · Version
> "You're on 4.2. It's 42 days old. Update, or turn on auto-update."

You still own the supported choices, defaults, patch deadlines and rollout policy. A user choosing among those options supplies feedback; it does not take away your responsibility.

First prediction. Version becomes a first-class user-facing control, sitting in settings beside theme and language, because those two are already there for exactly this reason. They are preferences about how the software meets you.

A returning user lands on the version she left. The banner reads: you are on 4.2, it is forty-two days old, here is what changed, update now or turn on auto-update. Change stops being something that happened to her while she was away and becomes something she asks for. That is the whole move.

Bridge: supported versions need compatibility and patch deadlines. A per-tenant sandbox can limit exposure, but shared infrastructure remains a risk. Pinning is feedback to investigate, not a pure fatigue measure.

## 11:15 to 13:30: slide 12, Prediction: the app your neighbor configured

On screen:

> "Turn on what people like me have on"
> Shareable configuration profiles
> Developers have done this for thirty years

Second prediction. Feature flags stop being your deployment tool and become the user's preference surface. Not a wall of switches: a profile. Turn on what people who use this the way I do have turned on. Follow this person's setup. Adopt my team's.

This is not new, it is unevenly distributed. Dotfiles. VS Code extension packs. Home Assistant blueprints. Excel templates. Figma community files. Mod lists. Shared configurations already travel well beyond developers. I expect more general-purpose apps to make them a first-class user preference.

Source: Eric von Hippel (1986), [Lead Users: A Source of Novel Product Concepts](https://doi.org/10.1287/mnsc.32.7.791), Management Science 32(7), 791–805. Eric von Hippel and Ralph Katz (2002), [Shifting Innovation to Users via Toolkits](https://doi.org/10.1287/mnsc.48.7.821.2817), Management Science 48(7), 821–833. Everett M. Rogers (2003), Diffusion of Innovations, 5th edition, Free Press.

Bridge: a configured fleet breaks support's first question, your screenshots and your A/B baseline, and somebody still owns the default a new user gets. Distribution concentrates, defaults win, and curating shared profiles becomes the job.

## 13:30 to 15:00: slide 14, Knowing what not to ship

On screen:

> Don't count what it cost you to build.
> Count what it costs them to relearn.

Back to the two tracks. Forty-six releases, four sessions. You did not get slower and she did not get dumber. You filled the space between her visits with work she has to do.

Turn the reasoning up as far as it goes. It will hand you a better-argued plan for a market it has never seen. You remain responsible for checking which proposals help these users, and when they can absorb them.

A bigger dial does not choose their Tuesday.

Delivery: Recall forty-six releases and four sessions verbally. Slide 3 is omitted on this route; stay on the closing slide. Stop talking.
