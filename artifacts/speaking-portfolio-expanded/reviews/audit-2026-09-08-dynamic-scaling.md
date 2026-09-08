# Audit: Dynamic Scaling of Agentic Workloads — 8 September 2026

Paths are relative to `artifacts/speaking-portfolio-expanded/` unless they begin with `public/` or `artifacts/`.
Prior review: [audit-dynamic-scaling.md](audit-dynamic-scaling.md) (6 Sept, pre-reorg paths) and [AUDIT-2026-09-06.md](AUDIT-2026-09-06.md).

## Verdict

**Not ready. Three blocking findings, one of them an arithmetic error on the climax slide that a FinOps or platform engineer will catch in the room.** The 7 September rebuild fixed everything the last audit asked for — slide 12's 806 words are gone, the arc is better, the dangling Adaptive deferral is closed — and in the process it exposed the problem the density was hiding: the Council of Guards slide asserts an economic claim it has never priced, and when you price it at today's rates the claim inverts. Separately, the pacing table was computed with both `Story:` slots empty, and the two slots sit on the two densest slides in the talk. Structure, citations and the $2 ledger are sound.

## Status against the prior audit

Only items not cleanly fixed are listed; everything else from the 6 Sept edit list (headings, `queued →`, Depot "stream output", `twenty-seven programmers`, the `Independent artifact` SVG, contracts.md `$0.90`, the fourth gate in the short, formats.md workshop row, demo.md compression note, evidence-bank "Council of attempts" and Cuts row 5, the env-var line, the muddy council sentence) verified FIXED.

| Prior finding | Status | Evidence |
| --- | --- | --- |
| Slide 12: 806 words in 5 min (161 wpm); cut to ≤450 | **FIXED, and better than asked** | Split into slides 12 + 13. Recounted: 238 + 216 = **454 spoken words across 8.0 min = 57 wpm**. Neither slide exceeds 68 wpm. |
| `evidence-bank.md:5` "Council of attempts" (wrong name, wrong half) | **FIXED** | `evidence-bank.md:5-6` now splits it: "Barrel of monkeys (slide 12), generation claim" / "Council of Guards (slide 13), judging claim". |
| Cuts table row 5 contradicted the barrel text | **FIXED** | `evidence-bank.md:47`: "Bounded fan-out at named graph nodes with an env var to set it to one; the review budget is declared". |
| Dangling deferral: slide 12 hands fan-out tuning to Adaptive, which never said it | **FIXED** | `talks/adaptive-systems/index.md:248`: "It is also the loop that tunes its own fan-out: acceptance up and false repairs flat, that job class gets more parallel attempts and a bigger budget". The deferral now points at something. |
| Fly Sprites "a second or two" is a goal, not a measurement | **FIXED in the talk, STILL OPEN in the short** | `talks/.../index.md:64` correctly says "stated creation target is under a second". `shorts/the-job-asks-for-its-own-compute.md:21` still says "hardware-isolated VMs, **created in a second or two**". |
| Slide 2 "never got a vote" echoes the rejected sense of *vote* | **FIXED in the talk, STILL OPEN in the short** | `index.md:41` "The workload never got a say." `shorts/the-job-asks-for-its-own-compute.md:5`: "The workload never got a **vote**. Now it can." |
| `13-synthesis-must-pass-the-gates-again.svg` retained for the workshop | **REGRESSED** | The file is gone from `public/talks/assets/dynamic-scaling/`. `visuals.md:22` still says it is "retained in assets for the workshop". Dangling reference. |
| Retitle the talk | STILL OPEN (deliberately deferred to Dan) | See Part B.3. |
| `build-talk.ts` route config edits | N/A — the generator is gone; adaptations are hand files. |

---

## Per-slide pacing, 40-minute route

Spoken prose only (blockquote on-screen lines, `Story:`, `Stage direction:` and `Source:` excluded). Band: 41–77 wpm; 40-minute routes should sit in the 40s and 50s.

| Slide | Title | Words | Min | wpm |
| ---: | --- | ---: | ---: | ---: |
| 1 | Four callers, forty images, one customer | 134 | 2.0 | **67.0** |
| 2 | Infra Is a Tool Call | 260 | 4.0 | **65.0** |
| 3 | Torn Down by Default | 157 | 3.0 | 52.3 |
| 4 | Fifty Containers Don't Render Faster | 106 | 2.0 | 53.0 |
| 5 | Count items and attempts, not tool slots | 84 | 2.0 | 42.0 |
| 6 | Put admission below every caller | 94 | 2.5 | 37.6 |
| 7 | Money, concurrency and rate are three limits | 91 | 2.0 | 45.5 |
| 8 | A durable job survives the caller | 97 | 2.5 | 38.8 |
| 9 | Adapt pressure inside a fixed ceiling | 104 | 2.0 | 52.0 |
| 10 | Walkthrough: restart the batch *(excluded — walkthrough)* | 133 | 5.0 | 26.6 |
| 11 | Ten Workers Buy You Five | 143 | 2.5 | 57.2 |
| 12 | The Barrel-of-Monkeys Maneuver | 238 | 3.5 | 68.0 |
| 13 | Council of Guards | 216 | 4.5 | 48.0 |
| 14 | Put the limit where the work begins | 116 | 2.5 | 46.4 |
| | **Route (excl. slide 10)** | **1,840** | **35.0** | **52.6** |

Route totals: 40-min **52.6** wpm (excl. walkthrough) · 30-min **62.2** · 15-min **66.4** (both including bridge lines: 56 and 111 words respectively). All three routes are in band **as written**. Every timing sums correctly (40.0 / 30.0 / 15.0).

The problem is what the table omits — see BLOCKING 2.

---

## BLOCKING

### 1. The Council of Guards is priced backwards. The stated reason is arithmetically false at every current price point, and the conclusion inverts under the talk's own slide-12 assumption.

`talks/dynamic-scaling/index.md:228` (and `script-40min.md:204`, `script-30min.md`, `bullets.md:237`, `shorts/council-of-guards.md:21`, and **on screen** in `public/talks/assets/dynamic-scaling/12-monkeys-then-guards.svg`):

> The cheap half is judging. A judge reads a thousand tokens and writes fifty, and **output is what costs**, so five judges from different models on every candidate is affordable. […] it reads everything, writes almost nothing, and costs a fraction of what it guards.

Two errors.

**(a) "Output is what costs" is false for this judge.** Output carries roughly a 5× per-token premium, but the judge's read:write ratio is 20:1. Input therefore dominates the judge's bill by 4:1 — **80% of the cost is the reading**, at every tier:

| Model (Anthropic first-party, $/1M) | 1,000 in | 50 out | total | input share |
| --- | ---: | ---: | ---: | ---: |
| Fable 5.1 ($10 / $50) | $0.01000 | $0.00250 | $0.01250 | 80% |
| Opus 5 ($5 / $25) | $0.00500 | $0.00125 | $0.00625 | 80% |
| Sonnet 5 ($2 / $10) | $0.00200 | $0.00050 | $0.00250 | 80% |
| Haiku 4.5 ($1 / $5) | $0.00100 | $0.00025 | $0.00125 | 80% |

The conclusion (judges are cheap in absolute terms) is right. The reason given is exactly inverted, and it is inverted *on the slide where the talk does arithmetic on stage*. It is also inconsistent with slide 12's own framing four minutes earlier — `index.md:212` "a frontier model reads them all, **input tokens being the cheap ones**" — which is correct for a synthesizer (~63% output there). The same fact is used to mean opposite things two slides apart.

**(b) "Costs a fraction of what it guards" fails under slide 12's premise.** Slide 12 says the monkeys run "at a hundredth of the frontier's price" (`index.md:212`). Take one design candidate at ~300 in / 1,500 out and five judges each reading the candidate plus the brief (~1,800 in) and writing 50:

| Generation model | Judges | Generation | Council (×5) | Council as % of generation |
| --- | --- | ---: | ---: | ---: |
| Haiku 4.5 (the "cheap monkey") | 5 × Haiku 4.5 | $0.0078 | $0.0102 | **131%** |
| Haiku 4.5 | 5 × Opus 5 | $0.0078 | $0.0512 | **657%** |
| Sonnet 5 | 5 × Haiku 4.5 | $0.0156 | $0.0102 | 66% |
| Opus 5 | 5 × Haiku 4.5 | $0.0390 | $0.0102 | 26% |

The clean statement of the problem: **the council reads about six times more tokens than the barrel writes, and a 5× output premium does not cover a 6× read volume.** The cheaper you make the monkeys — which is the entire point of slide 12 — the more the council dominates. "Reads everything, writes almost nothing, costs a fraction of what it guards" is a charming line and it is only true when the judges are a tier *below* the generator. Slide 13 never says the judges are cheap models; it says "five judges from different models".

Also: the obvious defence (prompt-cache the candidate across the five judges) does not apply, because caches are model-scoped and the whole design is "five judges from **different models**". That is a good line, not a problem — but it has to be said.

**Fix (one paragraph, and it hands you the hallway number).** Replace `index.md:228` sentence one and the SVG caption with something like:

> A judge reads a whole design and writes fifty words. Five of them, on a model a tier below the one that wrote the draft, price a verdict at about a penny — call it a quarter of what generating that candidate cost. That is the trade, and I want you to hear it honestly: you are buying disagreement, and it costs roughly one more generation.

Then delete "output is what costs" everywhere it appears (`index.md:228`, `script-40min.md:204`, `script-30min.md`, `bullets.md:237`, `shorts/council-of-guards.md:21`, and the on-screen line `COUNCIL OF GUARDS · EACH JUDGE READS ~1000 TOKENS AND WRITES ~50 — OUTPUT IS WHAT COSTS` in `12-monkeys-then-guards.svg`).

### 2. The pacing table was computed with both `Story:` slots empty, and both slots sit on the two densest slides in the talk.

`index.md:27` (slide 1) and `index.md:49` (slide 2):

> Story: The fan-out you found on a bill before you found it in a dashboard.
> Story: The moment an agent-sized request would have replaced a capacity-planning meeting.

Slide 1 already runs 67.0 wpm and slide 2 runs 65.0 — the two highest non-Act-3 densities in a route the voice skill says should "sit in the 40s and 50s". A spoken anecdote is 60–120 words. Fill them and:

| Slide | As written | +50-word story | +80-word story |
| ---: | ---: | ---: | ---: |
| 1 (2.0 min) | 67.0 | **92.0** | **107.0** |
| 2 (4.0 min) | 65.0 | 77.5 | **85.0** |

Both go over 80 — undeliverable — on the same six minutes of stage time. The 30-minute route is worse: slide 2 gets 3.5 min there, so a 50-word story puts it at **88.6 wpm**. Every route in the portfolio has this hazard in principle; this talk has it acutely because both slots are front-loaded onto the opener and the inversion, and because `README.md:26` makes filling them mandatory ("Before each delivery. Fill every `Story` line with a first-hand example").

**Fix, pick one:** (i) move the slide-1 story to slide 10, which runs 26.6 wpm with five minutes and is *about* a recovered batch — the bill anecdote is the same shape; or (ii) budget it — slide 1 to 2:30 and drop the 49-word third paragraph at `index.md:25` down to its last two sentences, which are the only ones the arc needs ("the same system that hid the fan-out can now ask for its own compute" + the scope line); or (iii) state in the front matter that the timings assume a 40-second story and re-derive. Whatever the choice, `index.md:5` should say the timings include the stories, because right now nothing does.

### 3. Slide 13 performs its climax and *then* does two minutes of homework.

`index.md:232` is the intellectual peak of the talk:

> None of this looks like the engineering we were raised on. Do not do the work twice. […] I am not a shill for Big Token. Cheaper, safer and faster now sometimes come from spending exactly where yesterday's wisdom told you not to.

`index.md:234`, immediately after it:

> Stage direction: Score the three candidates in demo.md. Have the room find each candidate's failed gate before revealing it. Then show the council split per candidate…

As written, the presenter delivers the biggest line in the talk and then runs a 2–3 minute scoring exercise before the closing slide. The energy is spent and then dissipated. The exercise belongs between the gates paragraph (`:230`) and the axioms paragraph (`:232`) — find the gates, reveal the split, *then* say "none of this looks like the engineering we were raised on" and walk to slide 14.

This is blocking on the **30-minute route** for a second reason: `adaptation-30min.md:20` says "slides 12 and 13 keep every paragraph, including the hedge and the full candidate exercise", but slide 13 gets 3.5 minutes there. 216 spoken words is ~1.7 minutes at delivery pace, leaving ~1.8 minutes for three candidates, three gate reveals and a council split. That does not fit. Either trim a paragraph on the 30 route or cut the exercise to one candidate and say so.

**Fix:** reorder the stage direction into the spoken sequence at `index.md:230-234` (and `script-40min.md:206-210`, `bullets.md:240-244`), and add a 30-route note: "one candidate only on the 30 route; the maintainer, because the split is the point".

---

## SHARPEN

1. **Amdahl is quoted without its assumption, and the assumption is the rhetorical payload.** `index.md:190`: "if a tenth of the job is serial, ten workers get you five and a quarter times, and a hundred workers get you nine." Arithmetic verified: S(10) = 1/(0.1 + 0.9/10) = 5.263; S(100) = 1/(0.1 + 0.009) = 9.174. Correct. But Amdahl assumes fixed work, perfect division of the parallel part, and free coordination — so 5.26× is the *ceiling*, not the estimate. Saying so makes the slide hit harder, and it pre-empts the HPC person who will say "Gustafson". One clause: "and that is the optimistic bound — Amdahl assumes the parallel part divides perfectly and coordination is free, which it never is." Related nit: the sentence opens "Starting **three** workers does not delete the serial parts" and then computes ten and a hundred; make it ten.

2. **The compute request from slide 2 never appears in the walkthrough.** `index.md:38` puts `{ shape: provider-wait, n: 8, ttl: 6m, cap: $1.50 }` on screen and `contracts.md:26-51` builds the whole request/catalog/lease fixture around it. Then `index.md:172` runs the walkthrough on "a spot worker" — singular, different shape, no lease ID, no catalog class. Act 1's one concrete artifact is decorative. Run the walkthrough *on the lease from slide 2* (`lease-88f1` expires mid-batch; that is literally the reclaim event) and the two acts become one talk. This is the cheapest structural fix in the audit — see Part B.1.

3. **The $2 cap is constructed so that it never binds.** `contracts.md:69`: "$0.10 per attempt, ten items, two attempts each" = exactly $2.00 = `maxRunSpendUsd: 2` (`contracts.md:15`). The cap and the pessimistic reservation are the same number by construction, so the ledger never shows the decision the slide tells you to make ("Pick a tightness on purpose and write it down", `index.md:128`). Set the cap to $1.50 and the ledger admits seven items and explicitly rejects three — which is the interesting row, and the one a finance stakeholder in the room actually wants to see.

4. **The ecosystem slide is current but is telling January's story.** `index.md:66` and `evidence-bank.md:16`. Re-verified today, 2026-09-08: Fly's page still frames sub-second creation as a **goal** ("The project's stated goal is creation in under a second"); Depot agent sandboxes are still $0.01/minute tracked by the second; EC2 Spot still gives a two-minute interruption notice ("*A Spot Instance interruption notice* is a warning that is issued two minutes before Amazon EC2 stops or terminates your Spot Instance"); Cloudflare Workflows is GA and now scales to 50,000 concurrent instances per account. But the newest item on the slide is Fly Sprites. Cloudflare shipped **Dynamic Workflows in May 2026** — durable workflow code that differs per tenant, per agent, per request, framed by Cloudflare as being for "durable background agents". That is this talk's thesis shipping as a product four months ago and going unmentioned on the slide that exists to prove the substrate is real. One line. Also worth knowing for Q&A: Depot's sandboxes are shared-kernel containers, not microVMs — the slide groups them with Sprites under "Sandboxes" and someone will ask.

5. **Two more on-screen disclaimers past the allowance.** Rule is one, on slide 1 (`index.md:25` "Numbers here are fixtures; the vendors later are real"). `public/talks/assets/dynamic-scaling/05-…svg` prints "Prices here are invented fixture values"; `08-the-ephemeral-ecosystem.svg` prints "Checked 2026-09-06". The second is now two days stale and will be staler; make it a version-free "vendor claims: see evidence bank" or drop it. Spoken hedges are clean — the only one is `index.md:214` "Speculative optimization in a lab coat? Possibly", which is a self-aware admission and in bounds.

6. **Front matter says "four audience moments"; there are seven.** `index.md:5`. Counted at `:29, :70, :130, :178, :196, :218, :234`. Seven interaction beats in 40 minutes is a lot of stage time the pacing table does not account for, and it compounds BLOCKING 2. Either the count is wrong or three of them are decorative — decide which.

7. **The packet and CFP standard abstracts have diverged, and the packet one drops both named techniques.** `packet.md:17` ends "Then the third scaling axis, attempts, with gates before preferences." `CFP.md:9` ends "Then the third axis: the barrel-of-monkeys maneuver and a Council of Guards that reports disagreement." The named version is right (voice rule: once named, use the name everywhere). Word counts also run over their labels: 52 / 104 / 234 for the packet's 50 / 100 / 230, and **109** for the CFP's 100-word field, which some submission forms hard-truncate.

8. **`visuals.md:22` points at a deleted file.** `13-synthesis-must-pass-the-gates-again.svg` is not in `public/talks/assets/dynamic-scaling/`. Either restore it for the workshop or drop the sentence.

9. **The parent talk's own short still carries two corrected errors.** `shorts/the-job-asks-for-its-own-compute.md:5` "The workload never got a **vote**" and `:21` "hardware-isolated VMs, **created in a second or two**". Both were fixed in `index.md` on 6 September and both are the exact phrasings the last audit flagged. The short is a bookable 6-minute lightning slot; it should not ship the version with the unsupported measurement in it.

10. **Slide 6 has no failure mode.** `index.md:112`: "every external dispatch crosses one shared admission controller. It atomically checks tenant entitlement, budget, provider concurrency, rate and deadline, then reserves." The talk never says what happens when that controller is slow or down, which is the first question any SRE asks about a coordinated write on the hot path of every dispatch. See Part B.6 for the one-sentence inoculation.

## NIT

- `index.md:248` closing line: "Put the limit where that **actually** begins" — the front-matter thesis at `:3` says the same sentence without "actually". Cut the filler; the two should be identical.
- `shorts/council-of-guards.md:13` says "**independently** written versions"; `index.md:210` says "**separately** written versions". The talk's word is the deliberate one (it avoids the term being set aside). Align the short.
- `index.md:190` "compare against one competent attempt on the same task set" — good line, no number. The cost bullet on screen ("every candidate, every retry, every held reservation, review time") is the only place the full cost is enumerated and it never gets summed.
- `formats.md:3` and `packet.md:3` both say "deck not yet rebuilt". Consistent with `README.md:56`. Fine, just noting it is the last talk-level gap.

---

## Part B — the ceiling

### 1. What is the better talk inside this one?

**It is two talks, and the seam is visible at minute 11.** Slides 5–10 (16 of 40 minutes) are a distributed-systems correctness talk that would be true in 2019 with "batch tool" swapped for "third-party API": count items separately from calls, put admission below every caller, separate money from concurrency from rate, persist the job, back off politely, walk a restart. Nothing in those sixteen minutes requires an agent. Slides 2 and 12–13 are the genuinely new material and get twelve.

The proof that they are two talks is SHARPEN 2: **Act 1's one concrete artifact never appears in Act 2's walkthrough.** Slide 2 puts a compute request on screen, `contracts.md` builds a catalog and a lease around it, and then the walkthrough at `index.md:172` runs on "a spot worker" with no lease, no class, no cap. If the ledger act were really the payoff of the inversion act, the lease would be the thing that expires.

The spine is already in the talk, said once and never named: `index.md:47`, **"The agent chooses; it does not grant."** Everything after it is a lease. Slide 2 is a lease on a box. Slide 7 is a lease on dollars ("Reserved ≠ charged"). Slide 8 is a lease on remote work you cannot cancel ("A worker lease expiring proves the worker died, not that the remote render stopped" — `index.md:126` — which is the best sentence in Act 2 and it is a lease sentence). Slide 9 is a lease on throughput. Slide 13's gates are a lease on what may ship. Slide 14 already almost says it: "A lease on every box, a gate on every candidate."

**The 20% reorder.** Say "the agent chooses; it does not grant" on slide 2 as a named idea, then open slides 7, 8 and 13 by naming what each one leases — three sentences, no new slides. Cut slide 9 entirely (Part B.7). Run the walkthrough on `lease-88f1` from `contracts.md:44` so the reclaim event *is* the lease expiring. Spend the recovered 2 minutes on slide 13, where the arithmetic now has to be done out loud. That is a 20% edit and it converts a two-act anthology into one argument.

### 2. The thesis line

`index.md:3`, current:

> Agents now direct their own compute. Put the limits where the work begins.

It is flat, and it is doing two jobs badly. It is two sentences where the rule is one. The second sentence is *also* the landing line (`index.md:248`), so the close has nothing to shorten *into* — the skill's shape is that the statement returns shortened at the end, and here it returns identical. And there is no reversal: "agents direct their own compute" is a description, not a turn.

The reversal is sitting right there and the talk never says it. The whole point of slide 1 is that four systems you built spent your customer's money without any of them being wrong. Candidates, second person, present tense, one breath:

- **You are not sizing the fleet any more, the fleet is being sized by a job nobody reviewed.**
- **You stopped deciding how much compute to buy; your agent decides, and the bill still has your name on it.**
- **Don't ask what your agent is allowed to do, ask what it is allowed to spend while you're asleep.**

The first is closest to the *terrain* shape and to the talk as built. If the statement changes to any of these, slide 14 gets its shortened return for free: "Put the limit where the work begins" stops being the thesis and becomes the answer to it.

### 3. The title

**"Dynamic Scaling of Agentic Workloads" is a conference track name, not a talk name.** Five words, zero jokes, zero swaps, and it fails the bar test badly — you cannot say it to a stranger without appending "…which is about how four legitimate callers spend your customer's money". It is the exact register the voice skill calls compliance-training. It has now survived two audits on the grounds that "CFP fields use the descriptive one", which is not a reason: the descriptive version is what `packet.md:11-25` is for.

Three alternatives, one per move:

1. **Hijack a known phrase** — **Buy Ten, Get Forty.** Retail BOGO with one word swapped, four words, it *is* the cold open, and an attendee can repeat it at lunch without explaining it. Already the name of `shorts/four-legal-calls-forty-images.md`, which is a point in its favour, not against — shorts name their parent. Cost: it names Act 1 only.
2. **Parenthetical stinger** — **Compute, Please (and a Receipt).** Already the name of `shorts/the-job-asks-for-its-own-compute.md`, and it appears in the voice skill's own list of approved stingers, which means Dan has already blessed the construction. It names the whole arc: the request *and* the ledger. This is my pick.
3. **Flat declarative verdict** — **The Agent Has Your Credit Card.** One clause, one joke, sounds like a verdict, and it is literally the risk sentence at `index.md:47`.

Not available as titles: *Council of Guards* and *Barrel-of-Monkeys Maneuver* are named techniques and the rule forbids re-explaining a named thing in a title. *Put the Limit Where the Work Begins* is the landing line and cannot also be the poster.

### 4. The hallway number

**The $2 ledger is not it.** "$2" is a fixture, and a fixture is a number nobody repeats — nobody walks out of a room saying "his ledger was two dollars". Its job is to make an invariant visible on stage, which it does well, and that is a different job. Same for 4 × 10 = 40: memorable as a *shape* (the 20× gap between "4 tool calls" on the dashboard and 80 provider attempts on the bill), not as a figure.

**The hallway number is the price of a verdict, and the talk does not currently state it.** "Five judges, different models, reading a whole design and writing fifty words each, cost about a penny — a quarter of what it cost to generate the thing they're judging." That is checkable against any published price list, it is about real money instead of fixtures, and it is the number that converts the Council of Guards from sounding extravagant to sounding obvious. Fixing BLOCKING 1 produces it as a by-product. Right now the talk asserts affordability on its climax slide and never prices it, which is the one thing the voice rules say not to do: "A number the room can check beats an adjective."

### 5. The peak

Marked peaks are slides 2, 10 and 13. The **real** peak is **minutes 29:30–31:30**, on slide 12 — the Knight and Leveson pre-emption followed by the naming. It is real, and it is real for a structural reason: it is the only moment in forty minutes where the speaker takes a punch before it is thrown, and it is immediately followed by the only line in the talk with personal risk in it (`index.md:212`, "The generation side has a name I am not sorry about"). Naming a thing in public is a commitment; the room hears it.

Slide 13 is the *intellectual* climax and is marked "peak", but it currently arrives at minute 36 after 216 words of setup and then hands the room a scoring exercise (BLOCKING 3). Fix the ordering and 13 becomes the emotional peak too, landing at ~37:00 straight into the close. Until then the talk peaks at 31 and coasts.

### 6. The hostile expert

The expected attack — *"this is autoscaling with extra steps"* — does not land. Slide 2 already separates the two on the right axis (the autoscaler observes a metric after the fact; the job declares a shape at start), and "the agent chooses; it does not grant" is a better answer than most platform teams have.

**The attack that lands is the one this audit found in BLOCKING 1**, and it will come from a FinOps or platform-economics person, not a distributed-systems person:

> "Four minutes ago you told me the monkeys run at a hundredth of frontier price. Then you told me to run five judges from five different models on every candidate. Your council reads six times more tokens than your barrel writes, and a five-times output premium doesn't cover that. You haven't made anything cheaper — you've moved the bill from generation to judging and put 'guards' on it. And you can't cache your way out, because you specified five *different* models."

As written the talk has no answer, because it asserts the opposite ("output is what costs"). **The inoculation is to raise it first, in the same move the talk already makes with Knight and Leveson:**

> The council is not free. Read the whole barrel five times and you are spending roughly what you spent generating it — and no, you cannot cache it away, because the whole point is five *different* models. That is the trade: one more generation's worth of money, and what you buy with it is disagreement.

Second-strongest, from row three's SRE (SHARPEN 10): *"You just put a coordinated write in front of every external dispatch and made it the availability floor of the entire system. What is your admission controller's p99, and what happens at 3am when it's down?"* One sentence on slide 6 closes it: **"Yes, this is a coordinated write on the hot path. When it is unavailable you queue — an agentic system that fails open is a system that fails expensive."**

### 7. Dead weight

**Cut slide 9, "Adapt pressure inside a fixed ceiling" (`index.md:148-162`, 2:00, 104 words).** Everything on it is standard backoff the audience already implements: "respect retry guidance, add jitter, reduce admission, increase cautiously after a healthy window." The portfolio's own ownership table gives runtime recovery to Adaptive (`README.md:121`), and this slide is the one place Dynamic Scaling reaches across that line. Its only non-generic line is the spine sentence — "The scheduler still owns the range, the same way it owned the lease" — which belongs on slide 7 as a clause anyway.

Buys **2 minutes**, which BLOCKING 1 and 3 both need on slide 13. It is already the 30-route's chosen cut (`adaptation-30min.md:20`), which is a signal: a slide the 30-minute route can lose without a bridge is a slide the 40-minute route was carrying out of politeness.

Runner-up is slide 4 (2:00, 106 words, also cut at 30). Keep it — it carries the best title line in the talk and the classification it teaches is load-bearing for slide 3.

### 8. The landing

`index.md:248`:

> Inspect one expensive tool in your system. Count the work it can launch underneath itself. Put the limit where that work actually begins.

Short, declarative, three imperatives descending in length, with "Stop talking." as the stage direction. Mechanically it is right, and the callback structure works — it returns to slide 1's multiplication.

Two problems. **"Actually" is filler** in the final beat and the front-matter version of the same sentence does not have it; cut it. And more importantly, **the close is a homework assignment, not a verdict.** After forty minutes arguing that the workload has become the subject and you have become the thing being billed, the last thing the room hears is a to-do item. The reversal from Part B.2 should land here, before the imperatives or in place of the third one — something the room repeats rather than something the room adds to a backlog. The talk earns a verdict; it currently settles for an action item.

---

## What I could not verify

- **Fly Sprites' actual creation latency.** `fly.io/learn/agent-sandbox/` re-fetched today still frames it as a target: "The project's stated goal is creation in under a second." I could not reach a primary Fly page stating a measured figure; the "1–2 seconds" number circulating in third-party writeups (Northflank, rywalker.com) has no primary source I could confirm. The talk's wording is correct; the short's is not.
- **Depot's isolation model.** Pricing ($0.01/min, tracked by the second) confirmed on `depot.dev/pricing` today. The shared-kernel-container claim comes from a competitor's comparison post, not Depot's docs — treat as a Q&A risk, not a slide correction.
- **Modal and Vast.ai** were not re-checked against their pricing pages; the slide's claims (scale-to-zero functions and GPUs; a marketplace for cheap short-lived GPUs) are generic and long-standing, and `evidence-bank.md:22-23` cites the right pages.
- **The 1/100 and 1/1000 price ratios** (`index.md:212`, `shorts/barrel-of-monkeys.md:17`). Within one vendor's current lineup the cheapest-to-frontier output ratio is about 1/10, not 1/100 — 1/100 requires reaching outside the frontier labs to hosted small or open-weight models, which the talk does not say. `evidence-bank.md:36` already labels them illustrative, so this is not a correction, but the number in the arithmetic on slide 13 should not lean on it.
- **1.33× / 2.22× and the four-row sweep** named in the brief belong to **Free Tier**, not this talk. No occurrence in `talks/dynamic-scaling/`.
- **WebMCP site opt-in** appears only in `shorts/no-agent.md:9` and `shorts/you-will-build-the-assistant-with-everything.md:9`, which are Adaptive/Product Engineering material. Out of this talk's remit.
- **Delivery pace.** Every wpm figure here is words ÷ allotted minutes, the portfolio's density measure. No recording exists, so nothing here validates that Dan actually delivers slide 12 in 3:30.
- **Knight and Leveson (1986)** — verified against the talk text: IEEE TSE SE-12(1), 96–109, DOI 10.1109/TSE.1986.6312924, twenty-seven versions from one specification, one million tests, coincident failures above the independence prediction. `index.md:210` correctly says "twenty-seven **programmers**" and the use is genuinely a set-aside ("Not this. I am not voting three models toward the truth"), reinforced at `:216` and `evidence-bank.md:35`. **Amdahl (1967)** — AFIPS Conference Proceedings 30, 483–485, title and venue as cited. Both citations pass. I did not re-fetch either paper; this is a check of the text against the record.
