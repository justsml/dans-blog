# Audit: Turn Your Thinkin' Tokens Up to 11 (`judgment`)

Audited 8 September 2026 against `talks/judgment/` (all fourteen files), the three inherited shorts, `README.md`, `reviews/README.md`, `reviews/audit-judgment.md`, `reviews/judgment-review.md`, `reviews/AUDIT-2026-09-06.md`, both SVGs, and `artifacts/speaking-opportunity-research/`. Pacing recomputed from the three scripts by parser; all arithmetic recomputed; citations checked against sources.

## Verdict

**It is a talk, not a scaffold — with a hinge at 26:00 that nobody has welded.** The rewrite fixed the disease the 6 September review named: eleven self-retractions are down to four, the queueing residue is gone to the last line, pacing is clean on all three routes (51.8 / 54.1 / 63.5 wpm, no slide above 77), and the talk now contains a claim a senior platform engineer will genuinely fight about. Seven blocking items, all small and all fixable in an afternoon; six of the seven are drift the rewrite created and did not sweep. The two real ceiling problems are not on that list: the designated peak apologises three times in four minutes, and the two predictions argue the opposite of the talk's own thesis without a sentence anywhere reconciling them.

---

## Status against prior audits

| Prior finding | Source | Status |
| --- | --- | --- |
| 15-min script says 30s and 60s for the same pair exercise | `audit-judgment.md:13`, `AUDIT-2026-09-06.md:10` | **REGRESSED** — the 6 Sept fix ("sixty here, thirty in the 15-minute cut") survived into four files while the 15-minute route lost the slide entirely. See BLOCKING 1–2. |
| Eleven self-retractions across eighteen slides | `judgment-review.md:17`, `reviews/README.md:29` | **PARTIALLY FIXED** — four spoken beyond the allowed one, three of them on the peak. See hedge inventory. |
| "Correct and therefore uncontestable" | `reviews/README.md:19` | **PARTIALLY FIXED** — contestability now exists but lives entirely in the two predictions, i.e. in the one register that cannot be checked. Part B §1. |
| No hallway number / no price | `judgment-review.md:23`, `:155` | **PARTIALLY FIXED** — replaced, but headlined in its least memorable form. Part B §5. |
| No `Story:` slots, everything hypothetical | `judgment-review.md:27` | **FIXED** — two named, unfilled (`index.md:20`, `:124`). No invented result anywhere. |
| Zero audience moments, no pacing tags | `judgment-review.md:31` | **FIXED** — tags on every slide, one show of hands (`:50`), one paired exercise (`:95`). |
| Judgment slide 12 duplicates Dynamic Scaling 12–13 | `reviews/README.md:33` | **FIXED** — slide 12 is now shareable configuration profiles; no overlap with the barrel-of-monkeys maneuver or the Council of Guards. |
| Image alts were headings, not descriptions | `audit-judgment.md:25` | **FIXED** — `index.md:39` and `:166` match the SVGs' own `<title>` elements verbatim. |
| Timings sum, contiguous, monotonic | `audit-judgment.md:17` | **FIXED / holds** — 40:00, 30:00, 15:00 exactly, verified by parser. |

---

## Residue table

Grepped the whole portfolio for `code is cheap`, `judgment is expensive`, `kingman`, `deming`, `elish`, `crumple`, `rubber stamp`, `ρ/(1−…)`, `19×`, `utilization`, `queue`.

| file:line | text | verdict |
| --- | --- | --- |
| `talks/judgment/CFP.md:3` | "replacing the retired *Code Is Cheap. Judgment Is Expensive.*" | **legitimate** — provenance note, not stage copy |
| `talks/judgment/visuals.md:8` | "`queue.svg` remains on disk … It is no longer part of this talk." | **legitimate** — and correct; the file is on disk |
| `README.md:137` | the whole Judgment-rewrite paragraph | **legitimate** — but its `shorts/fixtures` link is dead (BLOCKING 5) |
| `shorts/you-ate-their-slack.md:3,13,25,29` | Kingman, ρ/(1−ρ), 4×/9×/19× | **legitimate** — the short owns it now, and it is self-contained |
| `shorts/human-crumple-zone.md:3,9,17,33` | Elish, Deming, Bacchelli & Bird | **legitimate** — self-contained |
| `shorts/test-that-loves-the-bug.md:3` | retired-parent line; fixture inline at `:11–14` | **legitimate** — self-contained |
| `shorts/README.md:15,18,48` | "Judgment (retired)" in the parent column | **legitimate** |
| `reviews/*` (31 hits) | historical audits and the roll-up | **legitimate** — `reviews/README.md:4` labels the whole directory historical |
| `reviews/README.md:49` | Judgment → "**Queueing arc**" / "Personal **review-delay** story" | **RESIDUE** — in a table headed "Current source." Both cells are wrong post-rewrite; the two live Story slots are the long-absent customer and the pulled-forward release. |
| `artifacts/speaking-opportunity-research/` (20+ rows) | old title on every match row | **RESIDUE, out of folder** — see SHARPEN |

**Nothing in any of the fourteen talk files carries the old argument.** Grep for Kingman, Deming, Elish, crumple, rubber-stamp, ρ or 19× in `talks/judgment/` returns zero hits in prose. All three shorts are self-contained: none says "as I showed on slide N", each restates its own hook, curve and source. That part of the rewrite was done properly.

---

## Per-route pacing

Spoken paragraphs and bridge lines only; visible lines, `Source:`, `Delivery:`, `Story:` and tables excluded. Slide 6 (paired exercise) excluded from route totals per the skill.

**40-minute** — 1,918 words / 37.00 min = **51.8 wpm** (band 41–77; 40-min routes should sit in the 40s–50s ✓)

| slide | window | min | words | wpm |
| --- | --- | ---: | ---: | ---: |
| 1 These go to eleven | 00:00–02:30 | 2.50 | 133 | 53.2 |
| 2 What got cheap | 02:30–05:00 | 2.50 | 124 | 49.6 |
| 3 Nobody lives in your app | 05:00–08:00 | 3.00 | 137 | 45.7 |
| 4 Feature fatigue | 08:00–11:00 | 3.00 | 144 | 48.0 |
| 5 A change is a loss | 11:00–13:30 | 2.50 | 133 | 53.2 |
| *6 "Ship it Tuesday"* | *13:30–16:30* | *3.00* | *129* | *43.0 (excluded)* |
| 7 Five axes | 16:30–19:30 | 3.00 | 130 | 43.3 |
| **8 Turn the tokens up (peak)** | 19:30–23:30 | 4.00 | 251 | **62.8** |
| 9 What the machine is for | 23:30–26:00 | 2.50 | 136 | 54.4 |
| 10 Version picker | 26:00–29:30 | 3.50 | 182 | 52.0 |
| 11 What that costs | 29:30–32:00 | 2.50 | 144 | 57.6 |
| 12 Neighbor configured | 32:00–35:00 | 3.00 | 146 | 48.7 |
| 13 Everyone runs a different app | 35:00–38:00 | 3.00 | 157 | 52.3 |
| 14 Knowing what not to ship | 38:00–40:00 | 2.00 | 101 | 50.5 |

**30-minute** — 1,487 / 27.50 = **54.1 wpm**. Range 41.0 (slide 9) to 64.7 (slide 10). In band throughout.

**15-minute** — 953 / 15.00 = **63.5 wpm** (15-min routes should sit in the 60s–70s ✓).

| slide | window | min | words | wpm |
| --- | --- | ---: | ---: | ---: |
| **1** | 00:00–02:00 | 2.00 | 143 | **71.5** |
| 4 | 02:00–03:45 | 1.75 | 99 | 56.6 |
| 5 | 03:45–05:30 | 1.75 | 120 | 68.6 |
| **8** | 05:30–08:45 | 3.25 | 238 | **73.2** |
| 10 | 08:45–11:15 | 2.50 | 128 | 51.2 |
| 12 | 11:15–13:30 | 2.25 | 124 | 55.1 |
| 14 | 13:30–15:00 | 1.50 | 101 | 67.3 |

**No pacing drift.** This was the predicted failure of a one-day rewrite and it did not happen; every route was retimed. Two pressure points, neither out of band:

- 15-min slide 1 is 71.5 wpm **before** the `Story:` is filled. Every other route's slide 1 leaves an anecdote's worth of air; this one does not. It also carries the arithmetic-and-predictions scope line at `script-15min.md:20`. Either give it 2:30 (take it from slide 8) or mark the Story cut in the 15.
- 15-min slide 8 is 73.2 wpm **and** carries two board calculations (`script-15min.md:70`: "Do 6! × 3⁶ on the board … Do the final division on the board rather than reading it"). 238 words plus two live calculations in 3:15 is the one place the 15 will overrun.

**Exercise duration:** stated in four places as sixty seconds (`index.md:95`, `:101`; `script-40min.md:93`, `:99`; `script-30min.md:89`, `:95`; `bullets.md:98`, `:101`; `adaptation-30min.md:20`) — consistent. But four of those add "thirty in the 15-minute cut", and the 15-minute cut has no slide 6. See BLOCKING 2.

---

## Hedge inventory

Rule: one scope disclaimer, slide 1, then stop apologizing. Current spoken count: **the allowed one, plus four.** (Prior: eleven.)

| # | file:line | quoted |
| --- | --- | --- |
| 0 (allowed) | `index.md:18` | "Scope, once. The arithmetic later is counting, not a measurement of your team, and the two futures at the end are labeled predictions I have not measured." |
| 1 | `index.md:136` | "Benchmarks owns the power arithmetic; here I only need the count." — a portfolio-internal deferral spoken to a room that has never heard of Benchmarks. On the peak. |
| 2 | `index.md:140` | "I am citing the exchange, not a verdict." On the peak. |
| 3 | `index.md:142` | "My claim is weaker and safer." On the peak. Also the weakest sentence in the talk: it is a talk announcing that it is retreating. |
| 4 | `index.md:156` | "This is not an anti-AI slide, and the useful list is long." Pre-apology to an imaginary heckler. |
| 4b (stage-directed) | `index.md:144` | "Say once that the numbers are six features and three cohorts, not their company." Instructs a *fifth* spoken disclaimer, uncounted in the word budget, also on the peak. |

Not counted, correctly: `:223` "Choice overload is the obvious objection and I will raise it myself … So I cite it and set it aside" — the sanctioned cited-to-set-aside move. `:52`, `:146`, `:193` are `Source:` lines, not spoken.

**Three of the four sit on slide 8, the designated peak.** All three are already carried by `evidence-bank.md:11,13`, so all three can go tonight.

---

## Jokes

Two, in forty minutes. The Spinal Tap frame (slide 1 heading "These go to eleven", `:16`; callback `:138` "turn the thinkin' tokens up"; callback `:238` "Turn the reasoning up as far as it goes") and the Talking Heads hijack on a visible bullet at `:217` — "Same as it ever was: defaults still win." The Talking Heads line is the better joke and it is on a slide bullet rather than in his mouth.

The body does carry the title's frame past slide 1 — three touches — so the hijack is not abandoned. But it is never *performed*, only explained. See Part B §4.

---

## BLOCKING

**1. The 15-minute route promises exercise content it does not contain.**
`script-15min.md:3` and `adaptation-15min.md:15`: *"The pair exercise is cut; its questions ride in the slide-5 bridge."*
The slide-5 bridge is `script-15min.md:50`: *"Bridge: the release decision has five axes, not one — what, who, when, batched or rolling, and reversible. Every one of them commits somebody outside this room."* That is slide 7's content. The exercise's questions — which customers, with the other three things or alone, who is on support, who told the docs writers, is it reversible — appear nowhere in the 15-minute script. "Tuesday" occurs exactly once in the entire file, at `:16`, and not as a question.
**Fix:** replace the slide-5 bridge with the questions themselves ("Somebody senior says ship it Tuesday. Which customers, with what else in the branch, who is on support that afternoon, and is Tuesday reversible? None of those are engineering questions"), then let the five axes ride into slide 8 — or delete the claim from both files.

**2. Four files instruct a thirty-second exercise that exists in no route. REGRESSION.**
`index.md:101`, `script-40min.md:99`, `script-30min.md:95`, `bullets.md:101`, identical: *"Give pairs sixty seconds here, thirty in the 15-minute cut."*
This sentence was written on 6 September specifically to fix the prior audit's only blocking item. The 7 September rewrite dropped slide 6 from the 15-minute route and left the note. A presenter reading the delivery note now believes a route exists that does not.
**Fix:** "Give pairs sixty seconds. The 15-minute route drops this slide." in all four files.

**3. Canonical outline disagrees with all three scripts and the CFP inside the thesis paragraph.**
`index.md:16`: *"They do not buy taste, and they do not tell you which features to launch & when."*
`script-40min.md:16`, `script-30min.md:16`, `script-15min.md:16`, `CFP.md:7`: *"They do not buy taste, and they do not tell you which Tuesday."*
`index.md` is canonical by rule, so four files are wrong; by taste the four files are right — "which Tuesday" is concrete, plants slide 6 twelve minutes early, and does not put an ampersand in a spoken sentence.
**Fix:** put "which Tuesday" in `index.md:16`.

**4. `formats.md` is empty and two files point at it as a table.**
`talks/judgment/formats.md` is one byte. `packet.md:5`: *"The edition table is generated; see [formats.md](formats.md) for every browser deck, PPTX export and presenter script."* `README.md:34`: *"`formats.md` indexes the available talk lengths and workshop material."* Neither is true, and "is generated" contradicts the standing no-scaffolding position.
**Fix:** delete the sentence from `packet.md` and the Formats column entry from `README.md`'s table, or hand-write three lines. (`benchmarks` and `retrieval` have the same empty file — portfolio-wide, not judgment's alone, but judgment's `packet.md` is the one that advertises it.)

**5. `README.md:137` links to a directory that does not exist.**
*"…whose fixture now lives in [shorts/fixtures/](shorts/fixtures)."* `shorts/fixtures/` is absent. It is the only broken relative link in the portfolio README. The fixture is in fact inline at `shorts/test-that-loves-the-bug.md:11–14`, and that short says so itself at `:3` ("The fixture travels with the short").
**Fix:** "…whose fixture travels inline with [The Test Who Loved Me](shorts/test-that-loves-the-bug.md)."

**6. A cited source is misstated on stage, and the misstatement discards the source's best feature.**
`index.md:223` and `script-40min.md:219`: *"A 2010 meta-analysis across fifty **published** experiments put the mean effect near zero."* Repeated at `evidence-bank.md:17`: *"meta-analyzed roughly fifty published experiments."*
Scheibehenne, Greifeneder & Todd (2010), JCR 37(3), 409–425, analysed **63 conditions from 50 published *and unpublished* experiments** (N = 5,036). Including unpublished work is the methodological point — it is the file-drawer guard, and it is precisely why the near-zero result is credible enough to set the jam study aside with.
**Fix:** "Fifty experiments, published and unpublished — they went looking in the file drawer on purpose — and the mean effect came out near zero."

**7. "A published rebuttal" is wrong about status, and the citation omits the author.**
`index.md:140`: *"There is also a **published** rebuttal arguing the collapse was token limits and one unsolvable puzzle."* `index.md:146` cites it as *"the rebuttal, [The Illusion of the Illusion of Thinking](https://arxiv.org/abs/2506.09250), arXiv:2506.09250"* — **the only source line in the talk that names no author**, while every other names authors and year.
arXiv:2506.09250 is an unrefereed comment. Its v1 byline is "C. Opus (Anthropic), A. Lawsen"; v2 lists A. Lawsen alone. In a talk whose credibility rests on source hygiene, "published rebuttal" plus a missing byline is the exact seam a hostile expert opens — and the byline story is funnier told than discovered.
**Fix:** "There is a comment on arXiv from Alex Lawsen arguing the collapse was output-token limits and one River Crossing instance that has no solution." Cite as "A. Lawsen (2025), *The Illusion of the Illusion of Thinking*, arXiv:2506.09250 (a comment, not refereed)." The content of the summary is accurate; only the status and the byline are wrong.

---

## SHARPEN

1. **`reviews/README.md:49` is stale in a table headed "Current source."** — "Judgment | [Queueing arc](../talks/judgment/index.md) | Personal review-delay story". Neither cell survives the rewrite; the live Story slots are the long-absent customer (slide 1) and the release pulled forward against a competitor (slide 7). A reader preparing for delivery from this table prepares the wrong anecdote.
2. **A visible bullet nobody speaks, in two routes.** Slide 5 keeps "> Recognition, not recall" (`script-30min.md:71`, `script-15min.md:41`) and keeps Nielsen in the Source line (`:78`, `:48`) while the Nielsen paragraph is cut. Either cut the bullet and the citation with the paragraph, or fold Nielsen into one clause of the surviving paragraph.
3. **The 30-minute route loses its roadmap.** `index.md:33` — "which of these should exist, who should see it, and when. Those are three separate decisions and most roadmaps answer only the first" — is the sentence that tells the room what the next thirty minutes are. `script-30min.md` slide 2 drops it to hit 2:00. Cut the scarcity sentence instead; keep the roadmap.
4. **Turn the multiple-comparisons soft spot into a flex.** `contracts.md:18` correctly labels n ≈ 16·p(1−p)/δ² a two-proportion heuristic. Sixteen arms means multiplicity, which means *more* per arm, which means *fewer* affordable arms, which makes the ratio **bigger**. One clause on stage — "and that is before anyone corrects for sixteen comparisons, which only makes the number worse for me" — converts the one thing a statistician would object to into a concession that strengthens the count.
5. **Stop narrating the labeling policy.** `index.md:171`: "First prediction, labeled once as a prediction." Say "First prediction." And `evidence-bank.md:15` claims the predictions are "labeled as predictions once, on slide 1 and again on each slide" — which describes twice while asserting once.
6. **Do not explain the joke.** `index.md:16`: "The title is a Spinal Tap joke and it is load-bearing." See Part B §4; this is the single highest-value line in the talk to rewrite.
7. **Make the version banner her actual gap.** Slide 10 says "forty-three days old"; slide 3's gap between visits two and three is days 19→61 = **42 days**. Change 43 to 42 and the picker banner becomes a callback instead of a coincidence. Costs nothing. (`index.md:169`, `:173`, and `version-picker.svg`.)
8. **Match the mouth to the slide on feature fatigue.** Bullet: "Before use: capability wins." Spoken (`index.md:62`): "Before **purchase**, people prefer the product with more capabilities." Thompson et al. compare prior-to-use with after-use evaluations. Say "before use" in both places.
9. **The old-title CFP corpus is still live.** `artifacts/speaking-opportunity-research/talk_matches.csv` (20+ judgment rows), `composite-ranking.{json,csv}`, `judgment.md`, `README.md:22` and `build_composite_rankings.py:53` all carry *Code Is Cheap. Judgment Is Expensive.* with per-event abstracts about review queues and specification. One of those rows has a deadline of **today** (ProductWorld, `composite-ranking.csv`). Anyone submitting from that research submits the retired talk. Legitimate as a historical artifact; dangerous as a to-do list.
10. **Two jokes in forty minutes** is thin for this voice, and the better one ("Same as it ever was") is on a bullet rather than in his mouth. Say it.

---

## Part B — the ceiling

### 1. Did the rewrite fix the real problem?

Partly, and in a diagnosable way.

The most contestable sentence in the talk is `index.md:175`:

> "The web spent twenty years removing this control and calling it a feature. Everyone runs current, nobody sits on an old build, support reasons about one thing. That was the right trade when shipping was expensive and rare. Ask whether it is still the right trade at forty-six deploys a quarter."

That is a real fight. Every platform engineer who has maintained a supported-versions matrix, every SRE who lived through forced-upgrade migrations, will want the microphone. It is a genuine reversal of an industry consensus, stated flatly, with the counter-argument granted its strongest form first. This is exactly what the 6 September verdict said the talk did not have, and it now has it.

**But all of the contestable material is in the two predictions**, slides 10 and 12 — the one register in which nobody can be shown wrong today. The first twenty minutes, which is the part the README says the talk *owns*, remains in the uncontestable zone. Nobody disputes `index.md:120`:

> "Every one of these commits a person who is not in this room: support staffing, a documentation rewrite, an account executive who already promised it, a renewal conversation on Thursday."

That is true, useful and unarguable, which is what the old talk was. The rewrite bought contestability by **deferring it into the future tense**. The one contestable *present-tense, checkable* claim is `index.md:189` — "a breach costs you one tenant instead of one table" — which a security engineer will contest on the spot, and which sits on the slide the 30-minute route cuts.

Verdict: half a fix. To finish it, one of slides 3–7 has to say something a reasonable person can dispute *now*. The candidate is already there in the material and unstated: **forty-six deploys a quarter is not a healthy cadence, it is an externality**, and DORA rewards you for it. Slide 3 currently says DORA "does not measure" absorption (`:48`), which is a statement about definitions. Saying instead that a deployment-frequency target actively pays you to spend your users' attention would put a real argument in the first ten minutes.

### 2. Talk or scaffold?

**A talk.** The spine is real and it is better than the README's four assigned topics: build cost went to zero → the constraint it was silently enforcing landed on the user → so the decision is now selection and pacing → and the decision space is too big to measure → and the machine cannot make it → so hand the control to the user. That is a spine, not a staple; each slide's premise is the previous slide's conclusion, all the way to 26:00.

**Then it breaks.** Slides 1–9 argue that sequencing is *your* job and you own it. `index.md:160`:

> "It proposes. You sequence. Then you own the sequence."

Slides 10–13 argue that the user should pick her version and her neighbor should pick her features. That is handing the sequencing decision to the user, twelve minutes after the talk said it was the thing you were hired for. Then `index.md:238` closes back on "the part you were hired for: knowing which of these your people will love, and knowing when they can stand to receive it" — as if the intervening twelve minutes had not just proposed a mechanism for not deciding that at all.

Nothing on stage reconciles them, and the reconciliation is one sentence away and already half-written at `index.md:177`:

> "Their pin rate is your change-fatigue meter and it does not require a survey."

That is the weld. The version picker is not abdication; it is the first honest *instrument* for the cost slides 3–5 said nobody measures. Say that out loud at the top of slide 10 and the two halves become one argument. Leave it implicit and a sharp listener leaves thinking the speaker changed his mind at minute 26.

### 3. The thesis line

Current, `index.md:14` and the closing visible line at `:233`:

> "Don't count what the feature cost you to build, count what it costs them to relearn."

Second person ✓, present tense ✓, one breath ✓, no citation ✓, and it is the same *grammatical* mold as the Free Tier line. But it is not the same *move*. In "Don't fear training the model, worry how it's training you," the object becomes the subject — the tool you thought you were operating is operating you. Here nothing reverses; a pronoun changes and a cost is re-ledgered. It is a good line doing accounting.

The Spinal Tap frame is sitting right there with the reversal already in it. Candidates, in his shape:

- **"Don't ask how fast you can ship, ask how fast she can absorb."** — the two-meters image from slide 3, and the reversal is the meter, not the pronoun.
- **"You didn't make the software faster. You made her relearn it more often."** — flat verdict, the object becomes the one doing the work.
- **"Eleven isn't louder. It's the same amp with a bigger number on it."** — this one is the landing line, not the thesis, but it is the best sentence available to this talk and it is currently not in it.

### 4. The title

*Turn Your Thinkin' Tokens Up to 11.* Seven words against a 2–6 target — over, but forgivable, because the hijack is exact and there is exactly one swap. It does not use a rejected formula, it names rather than summarises, and said at a conference bar it needs no "…which is about…".

**Does the body cash it?** The talk argues *against* spending more inference compute on this decision — `:16` "They do not buy taste"; `:142` "More tokens do not fix that." So the title promises the opposite of the argument. **That is not a mismatch; that is the joke, and it is the right joke.** Nigel Tufnel's eleven is a fake number that buys nothing. A title whose payload is ironic is the strongest kind of hijack.

**The failure is that the talk defuses it on slide 1 instead of performing it.** `index.md:16`:

> "The title is a Spinal Tap joke and it is load-bearing."

Explaining a joke is the one thing a hijack title must never do, and doing it in the thesis paragraph spends the room's biggest laugh on a footnote. Worse: **the actual punchline is missing.** The scene has two halves. Nigel: "These go to eleven." Marty: "Why don't you just make ten louder and make ten be the top number?" Nigel: "…These go to eleven."

Marty's question **is this talk's entire argument** — the dial is arbitrary, the constraint is somewhere else, and turning it up is a way of not answering the question. It appears nowhere in the outline. Slide 1's heading is Nigel's half; nobody ever says Marty's.

This is the single highest-value free change in the talk. Cut `:16`'s explanation. Put Marty's line on slide 8, after the arithmetic, as the answer to the plan-space count. Then land slide 14 on "Eleven isn't louder."

### 5. The hallway number

The old one — 19× wait at 95% utilization — had three properties: derivable in the head (0.95 ÷ 0.05), *portable* (anyone could re-derive it for their own utilization), and shocking. Three candidates replaced it.

- **46 releases / 4 sessions / 21 changes at once** (slide 3). Memorable, vivid, and the most likely thing an attendee actually repeats. But `evidence-bank.md:9` is explicit: "It is not telemetry from any product." Repeating it repeats a fixture. It cannot be checked.
- **32,805 plans per arm of evidence** (slide 8, currently the headline third visible line). The *worst* of the three: a quotient nobody can verify by feel and nobody remembers.
- **524,880 plans** (6! × 3⁶). Derivable in the head, checkable, and the only true structural analogue to 19×.

So something did replace it, and **the talk headlined the wrong form.** The hallway number latent in this material is the *ratio*, not the quotient:

> **Half a million release plans. Sixteen experiments.**

Five words, both numbers checkable, and it states the argument rather than reporting a division. Re-headline slide 8 on the pair; keep 32,805 as the punchline the board arrives at, not as the thing on the slide. And move `contracts.md:3`'s instruction — "swap in the room's numbers if it supplies better ones" — onto the slide, because portability is what made 19× travel and what these numbers currently lack.

### 6. The peak

Tagged slide 8, 19:30–23:30 (`bullets.md:16`). **It is not the peak, for three reasons that are all quotable:**

- `:136` "Benchmarks owns the power arithmetic; here I only need the count" — a deferral to a talk the room has never heard of.
- `:140` "I am citing the exchange, not a verdict."
- `:142` "My claim is weaker and safer."
- and `:144` instructs a fourth: "Say once that the numbers are six features and three cohorts, not their company."

**Four retractions in four minutes at the designated high point.** A peak cannot be a slide that apologizes four times; the room can hear a speaker backing away from his own arithmetic. All four are already in `evidence-bank.md:11,13` and can be deleted tonight, which leaves 251 words of clean counting and a Chollet line — and *that* would be a peak.

The real emotional peak is **slide 10, 26:00–29:30, the version picker**, currently tagged "build." It is the only moment the room's assumption breaks. Retag it, and give it slide 9's 2:30 (see §9).

### 7. The hostile expert

The attack, near-verbatim as predicted: *"This is 2015 product management with tokens sprinkled on. Kano is 1984. Feature fatigue is 2005. Status quo bias is 1988. Your five axes are a release-planning checklist. What in this talk requires AI to exist?"*

**It lands, and hard, because the minute count is on his side.** Of forty minutes, roughly nine are AI-specific: slide 2 (2:30), slide 8 (4:00), slide 9 (2:30). Slides 3–7 — seventeen minutes, the load-bearing middle — contain no AI at all. Slides 10–13 — twelve minutes — are a personalization argument that also does not need it. The CFP concedes the whole AI content in one clause (`CFP.md:11`): "Generation is free, so scarcity has stopped doing your prioritization."

**Nothing in the talk raises this.** Slide 2 comes closest and argues past it, treating "this year we finished the job" as a settled given rather than as the thing under attack.

The inoculating sentence belongs on slide 2, and it should concede fully before it reverses:

> "Yes, this is product management, and most of it is older than the people in this room. It was survivable for thirty years because the backlog was doing the arguing for you. This year the backlog stopped arguing, and the question Kano was asking in 1984 now arrives every Tuesday with four working implementations already attached to it."

That converts the attack into the premise, which is the only reliable defence against it.

### 8. The predictions

**Labeled once? No — twice each, and one of the labels claims it is once.** `index.md:18` announces both on slide 1; `:171` says "First prediction, labeled once as a prediction"; `:203` says "Second prediction." `evidence-bank.md:15` states the situation and miscounts it in the same sentence: "Slides 10 and 12 are labeled as predictions once, on slide 1 and again on each slide." Two places is not once. Fix: keep the slide-1 announcement, cut the meta-commentary at `:171` to "First prediction."

**Falsifiable? Neither.** No date, no condition, no threshold — and `evidence-bank.md:15` presents that as a virtue ("No adoption figure, no company, no timeline is asserted"). A prediction with no date is a mood. Both can be made falsifiable in the talk's own vocabulary without asserting a single measurement:

- **Version picker.** "By the end of 2028, at least one of the five largest horizontal SaaS products ships a user-visible version control in settings — not an enterprise admin toggle, a setting one seat can change for herself. If nobody has, I was wrong."
- **Configuration profiles.** "By the end of 2028, a mainstream product with no terminal in it ships a shareable configuration profile with a public directory — a profile another *user* published, not a template gallery the vendor curated. If every example still has a terminal in it, I was wrong."

Both use distinctions the talk already draws (single seat vs. admin at `:171–173`; user-published vs. vendor-curated at `:225`), which is what makes them checks rather than rhetoric. And a speaker who names the condition under which he is wrong is the speaker the room believes on everything else.

### 9. Dead weight

**Slide 9, "What the machine is actually for," 23:30–26:00. Cut it. Buys 2:30.**

Three reasons. It opens defensively (`:156` "This is not an anti-AI slide"), which is the talk's fourth hedge. Its content is a list of things this room already believes AI is good at — clustering support threads, drafting a docs diff — delivered as though it were news. And its conclusion is restated verbatim eleven minutes later at `:238`, so cutting it costs the argument nothing.

Keep exactly one line, the concrete one, `:158`:

> "Your release week is the week two of your three support engineers are at a conference."

That belongs on slide 7, where the five axes already commit the support roster, and it is stronger there because it makes the "Commits" column bite.

Spend the 2:30 on slide 10 — develop the pin-rate-as-instrument argument that welds the two halves of the talk together (§2) — or give 30 seconds of it back to slide 1 in the 15-minute route, which currently has no room for its own story (§ pacing).

### 10. The landing

`index.md:240`:

> "Sometimes the right release is a smaller one. Sometimes it is the same app they left."

Two sentences, parallel, and the stage direction (`:242` "Stop talking") is right. But **the final beat of the talk is built on a hedge word, used twice.** After thirty-eight minutes of argument the last thing the room hears is a qualifier. Compare the standard: *Put the limit where the work begins.*

Two better options, both already earned by the material:

- Cut to one sentence: **"Sometimes the right release is the app they already had."** One "sometimes," one image, silence.
- Or land the frame instead: **"Eleven isn't louder. It's the same amp with a bigger number on it."** — then the visible line ("Count what it costs them to relearn") does the thesis work, and the last thing said out loud is the joke finally landing, thirty-eight minutes after it was explained away on slide 1.

---

## What I could not verify

- **The absorption fixture is internally exact but unverifiable as anything else.** Recomputed: releases on even days 0–90 gives 46; even days 20–60 gives exactly 21 in the day-19-to-day-61 gap. `evidence-bank.md:9`'s claim of internal consistency holds. Whether any real product's cadence and session distribution look like this is untested and the talk says so.
- **The plan-space arithmetic is exact.** 6! = 720; 3⁶ = 729; 720 × 729 = 524,880; 12,000 × 4 = 48,000; 16 × 0.08 × 0.92 ÷ 0.02² = 2,944; ⌊48,000 ÷ 2,944⌋ = 16; 524,880 ÷ 16 = 32,805. All confirmed. The n ≈ 16·p(1−p)/δ² heuristic is correctly stated as approximating 80% power at α = 0.05 for a *two*-arm comparison; its application to sixteen arms is conservative in the argument's favour (see SHARPEN 4), but I did not compute a multiplicity-corrected figure.
- **Citations verified against sources:** Thompson/Hamilton/Rust (2005) JMR 42(4) 431–442 — characterization of the capability-before-use / usability-after-use result is accurate. von Hippel & Katz (2002) Management Science 48(7) 821–833 — pages and DOI correct. Scheibehenne/Greifeneder/Todd (2010) JCR 37(3) 409–425 — verified, and the talk's description of it is wrong (BLOCKING 6). arXiv:2506.09250 — verified; the two-point summary is accurate, the status and byline are not (BLOCKING 7).
- **Not independently re-verified, checked only against the prior audit and standard reference:** Kano et al. (1984) JSQC 14(2) 39–48 (the standard citation form; the original is Japanese-language and I did not fetch it); Samuelson & Zeckhauser (1988) JRU 1(1) 7–59; Kahneman/Knetsch/Thaler (1990) JPE 98(6) 1325–1348; Rogers (2003) 5th ed.; Iyengar & Lepper (2000) JPSP 79(6) 995–1006; Forsgren/Humble/Kim (2018) and the four keys; Nielsen (1994); Chollet (2019) arXiv:1911.01547; von Hippel (1986) Management Science 32(7) 791–805; hyrumslaw.com.
- **Chollet's definition is compressed on stage.** `:138` "treats intelligence as skill acquisition over novel tasks" drops "efficiency" and "with respect to priors and experience." The argument the talk builds on it actually *depends* on the priors clause. Not wrong; imprecise, and precision here would cost four words.
- **Delivery.** Whether 251 words plus two board calculations fit 3:15 in the 15-minute route is a rehearsal question, not a document question. Flagged, not resolved.
- **Whether the two Story slots can be filled.** Both are named and unfilled, which is correct. Nothing in the talk presents an invented result as Dan's own — I checked every first-person claim.
