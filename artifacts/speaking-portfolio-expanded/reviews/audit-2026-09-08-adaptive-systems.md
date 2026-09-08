# Audit: Adaptive, agentic apps (2026-09-08)

Scope: `talks/adaptive-systems/` (index, three scripts, two adaptations, bullets, packet, formats, CFP, evidence-bank, contracts, demo, visuals, memory-pattern), the four child shorts, `README.md`, and the two prior reviews. Review only; no talk file was edited.

## Verdict

**The design is the best in the portfolio and the argument that carries it does not survive arithmetic.** Every fix from the 6 September audit landed. What is left is worse than what was fixed: the load-bearing combinatorics counts the wrong object, the peak is a fixture nobody can fail, two of the three routes are undeliverable at the slide level, and the talk still goes to CFP under a category label its own packet has already retired. Six blocking items. All six are half-hour fixes; none require rebuilding the arc.

## Status vs prior audit (`audit-adaptive-systems.md`, `AUDIT-2026-09-06.md`)

Fixed items are omitted except where the fix created a new problem.

| Prior item | Status | Evidence |
| --- | --- | --- |
| Item 7 — short's on-screen "6 minutes" → "2 minutes" to match `deadlineSeconds: 120` | **REGRESSED into a fixture conflict** | Fix applied (`shorts/you-will-build-the-assistant-with-everything.md:33` "3 tools, 2 minutes, $2"), but the same `jobId: "ingest-1042"` still leases 360 s of compute (`contracts.md:105-107`) and slide 11 still says "six minutes" (`index.md:209`). See BLOCKING 2. |
| Item 13 — 15-min route dropping the walkthrough landing line | FIXED | `script-15min.md:110` "Three events, three different right answers…" restored. |
| Items 12–13 — 15-min bridge/trim after slide 10 | FIXED | `script-15min.md:114` now "that is slide 11 in the long version, and the mechanics are a companion talk." |
| Items 12–13 (residual) — slides 3 and 4 keep on-screen lines the 15-min route never speaks | **STILL OPEN (knowingly)** | `script-15min.md:29` shows "an agent layer you opt out of with `--no-agent`"; the paragraph that explains it is cut. Prior audit accepted this "without a time rebalance" — but the 15-min route has since been rebalanced (slide 3 went 1:30 → 3:30), and the line is still unspoken while slide 3 runs at 63 wpm with room to spare. |
| Item 14 — Skitka qualifier | FIXED and verified against the paper | `index.md:232` "on the events the aid got wrong…". Search confirms: "Participants in non-automated settings out-performed their counterparts who had a very — but not perfectly — reliable automated aid on a monitoring task." |
| Item 15 — WebMCP softened | FIXED, tense now optimistic | `index.md:59` "WebMCP lets an agent act on any site that opts in". Model is right; it is a Draft Community Group Report (Feb 2026) in a Chrome origin trial (149–156), not shipped. SHARPEN 8. |
| Item 16 — dangling deferral from Dynamic Scaling slide 12 / `barrel-of-monkeys.md:29` | **FIXED, partially** | `index.md:248` now says "It is also the loop that tunes its own fan-out…". But `shorts/barrel-of-monkeys.md:29` promises Adaptive covers this "including when to bother and at what level of direct control" — neither appears anywhere in the talk. |
| Item 17 — heading rewrites | FIXED | Slides 2, 3, 11, 12, 13 carry the new names. |
| Roll-up item 8 — Bainbridge near-verbatim with `what-happened-to-sarah` short; "vary one" | **STILL OPEN** | `index.md:232` "promotes them to monitoring a system that is almost always right" vs `shorts/what-happened-to-sarah.md:13` "what remains for the human is monitoring a system that's almost always right". Unchanged in both. |
| Voice item — `packet.md` title candidates | FIXED in the packet, **NOT PROPAGATED** | `packet.md:9-13` leads with three names and demotes "Adaptive, agentic apps" to "Descriptor for programs and schedules." Every other file — `index.md:1`, `bullets.md:1`, all three scripts, `CFP.md:1`, `README.md:39,53,71` — still uses the descriptor as the name. See Part B.3. |
| Items 9, 10, 18, 19 (decks, PPTX, `build-talk.ts`, `reveal-talks/`) | OBSOLETE | Generators and generated decks were removed on 7 September; `artifacts/reveal-talks/` no longer exists. |

Prior items 1–6, 8, 11 (evidence-bank story slot, Fly.io retarget, Council of Guards rename, "ledger arithmetic", `qualityFloor`, `run-fixtures`, 45-minute row, CFP outcome) all verified FIXED.

## BLOCKING

### 1. The pathway arithmetic counts a different object than the sentence it supports

`index.md:61` (also `script-40min.md:51`, `script-30min.md:47`, `script-15min.md:35`, `formats.md:20`, `bullets.md:60`, `shorts/you-will-build-the-assistant-with-everything.md:13`):

> Risk does not grow with the number of tools. It grows with the pathways between them, and every integration multiplies those. Ten tools is forty-five pairs before you count chains. Plug in one SaaS with a dozen endpoints and you did not add twelve capabilities; you added **hundreds of routes from something the agent can read to something it can do**.

The arithmetic, in full:

| Count | 10 tools | 22 tools | New |
| --- | ---: | ---: | ---: |
| Unordered pairs, C(n,2) | 45 | 231 | 186 |
| Ordered pairs, n(n−1) | 90 | 462 | 372 |
| **Read→write routes** (half reads, half writes) | **25** | **121** | **96** |

The sentence defines the hazard as a *directed* route, "from something the agent can read to something it can do." C(10,2) = 45 counts read↔read and write↔write pairs, which are not that. Under the talk's own definition a 5-read/5-write toolset has 25 such routes, not 45 — the headline number overstates the thing it names by 80%. And "hundreds" is false under both honest counts: 186 new unordered pairs is not "hundreds," and 96 new read→write routes is under one hundred. "Hundreds" is true only of all 462 ordered pairs, a set that includes exactly the pairs the sentence excludes.

Row three will do this on a napkin during slide 4. Worse, the wrong number is the weaker argument: C(n,2) is not a multiplication, and the sentence one clause earlier says "every integration **multiplies** those." R × W *is* a multiplication.

**Fix** (`index.md:61`, then propagate to the three scripts, `formats.md:20`, `bullets.md:60`, the board direction at `index.md:69` "Write 10 → 45", and the short's on-screen `10 tools → 45 pairs` at `you-will-build-the-assistant-with-everything.md:33`):

> Call it five reads and five writes. That is twenty-five ways for something the agent can read to reach something it can do. Now plug in one SaaS with a dozen endpoints: eleven and eleven, a hundred and twenty-one. One integration, ninety-six new routes. Nobody reviews those combinations.

Board becomes `25 → 121`. This is checkable in the room, it makes "multiplies" literally true, and it hands the talk the hallway number it currently lacks (Part B.4).

### 2. The compute lease outlives the job that requested it

Same `jobId` across two fixtures:

- `contracts.md:20` — `"jobId": "ingest-1042"`, `"deadlineSeconds": 120`
- `contracts.md:103-107` — `"jobId": "ingest-1042"`, `"durationSeconds": 360`
- `index.md:209` — "eight sandboxes for **six minutes** would clear the backlog"
- `contracts.md:23` — `"stopOn": [..., "budget-exhausted"]`

A two-minute job leases six minutes of compute, and the handout is the file the security-minded half of the room reads on the train. The 6 September fix pushed the short's on-screen text down to "2 minutes" to match the deadline and never checked the lease. **Fix:** set `deadlineSeconds: 600` (and restore "6 minutes" in the short), or drop `durationSeconds` to 120 and change the spoken line to "eight sandboxes for two minutes." The first is more plausible — a provider-wait batch does not finish in 120 seconds.

### 3. Three slides of the 15-minute route are above the deliverable band

Words ÷ minutes, spoken paragraphs and bridge lines, excluding nothing but the on-screen quotes, stage directions and unfilled `Story:` slots.

| Route | wpm excl. walkthrough | Offending slides |
| --- | ---: | --- |
| 15-min | 72.1 | **slide 6: 100.8** · slide 5: 88.7 · slide 1: 87.4 |
| 30-min | 65.8 | **slide 11: 91.4** · slide 7: 80.8 |
| 40-min | 63.8 | none (slide 3 highest at 72.9) |

`script-15min.md:81-94`, slide 6: 126 words in 1:15. The 25-word bridge at `:94` carries the Boolean-status paragraph *and* slides 7 and 8. Even stripped of the bridge it is 80.8. Meanwhile slide 3 (`:25-43`) has 3:30 for 222 words — 63.4 wpm, with 45 seconds of slack.

Slide 1 is worse than the table shows. `script-15min.md:21` reserves an explicit audience moment — "Take one story, thirty seconds" — inside a 1:45 slot. 153 words in the remaining 1:15 is **122 wpm**. The same defect exists in the 40-minute route: `index.md:29` in a 2:00 slot leaves 1:30 for 128 words = 85.3 wpm.

**Fix:** move 45 s from 15-min slide 3 to slides 6 (+30 s) and 1 (+15 s); or drop the hands-up moment from the lightning route, where there is no time to take a story and return.

### 4. Every route tells the speaker to run a five-minute walkthrough in a shorter slot

| Route | Slot for slide 10 | Delivery note |
| --- | --- | --- |
| 40-min | 4:30 (`index.md:181`) | "Five minutes from demo.md" (`index.md:197`) |
| 30-min | 4:00 (`adaptation-30min.md:15`) | "Five minutes from demo.md" (`script-30min.md:159`) |
| 15-min | 3:00 (`adaptation-15min.md:12`) | "Five minutes from demo.md" (`script-15min.md:112`) |

`demo.md:24` supplies a four-minute compression and a two-minute lightning version; nothing at three minutes, and no route points at the compressions that exist. The peak slide overruns on every route, which is how a 40-minute talk becomes a 42-minute talk in front of a track chair with a hook.

**Fix:** 40-min slot → 5:00 (funded by BLOCKING 7 below); 30-min note → "Four-minute route in demo.md"; 15-min note → "Two-minute lightning route in demo.md," and its 3:00 becomes 2:30, releasing 30 s into BLOCKING 3.

### 5. 30-minute slide 11 is undeliverable because it is carrying a cut slide

`script-30min.md:161-177`: 160 words in 1:45 = 91.4 wpm. The body is only 105 words (60.0 wpm); the overrun is the 55-word bridge at `:177`, which staples the catalog guard *and* all of cut slide 12 *and* the widening criteria onto the end of a slide about compute:

> Bridge: the compute guard is the tool guard — an approved catalog, enforced leases, and no unapproved region no matter how good the latency looks. Whatever the app changed today, an engineer sees it in one report, and authority widens only from measured outcomes on the same recorded incidents: recoveries, but also false repairs, dropped records, cost and human corrections.

Two separable ideas fused into one paragraph — exactly the structural failure the voice rules name. **Fix:** split it in the canonical outline: the catalog-guard sentence belongs to slide 11's body, the report-and-widening sentence to the head of slide 13. Then the 30-min route inherits a deliverable slide instead of a compression.

### 6. The first number the room hears has no denominator, in the talk that says "watch the denominator"

`index.md:23`:

> keep the other **ninety-eight percent** of records flowing

No record count exists anywhere in the folder. `contracts.md:119` has "18 records quarantined"; `contracts.md:122` has "100 records checked"; `demo.md` has four fixtures. Nothing produces 98%, and `index.md:160` — slide 8 — instructs the room: "A high success count is worthless if the denominator quietly shrank."

**Fix:** give ingest-1042 a size and let the arithmetic be real. 18 quarantined of 900 records is exactly 2%. Then slide 1's promise, the daily report and the walkthrough are one incident with one denominator, and the opening number becomes checkable instead of decorative.

## SHARPEN

1. **The 30-minute route drops the warning the 40-minute route calls central.** `index.md:232` — "One warning about that report, and it is the warning for this whole talk" — is slide 12, and `adaptation-30min.md:21` cuts slide 12. The bridge at `script-30min.md:177` carries the report but not Bainbridge. The 30 is the most bookable length; it should not be the one route with no answer to "what does this do to the person reading the digest?" One sentence in the slide-13 body costs 8 seconds.

2. **Both short routes lose the only joke.** `index.md:59` — "I know who to blame: the kids. Actually, the kids hate AI… the internet was better on vinyl" — is the talk's one real laugh, and `adaptation-30min.md:21` names it "the first thing to go when compressing." The 15-min route (`script-15min.md:33-37`) cuts it too. What survives in both is wry ("a very boring way to have a very expensive morning") but nothing the room laughs at out loud. Fifteen minutes with no laugh is a long fifteen minutes. Keep the two-sentence version: "I know who to blame: the kids. Actually, the kids hate AI."

3. **"Four audience moments" (`index.md:5`) undercounts by half, and none of it is budgeted.** Stage directions that ask the room and take an answer: `:29` (hands up, thirty seconds), `:69` (who could list every read-to-write pathway), `:132` (two answers), `:197` (ask before showing), `:254` (take one answer), `:273` (ask which observation proves). That is six, plus rhetorical asks at `:115` and `:217`. The timings assume none of them cost anything; see BLOCKING 3.

4. **Bainbridge sentence is still near-verbatim with the short** (`index.md:232` / `shorts/what-happened-to-sarah.md:13`). The roll-up said "vary one" on 6 September; neither moved. Adaptive's *use* is distinct and defensible — digest length, not reviewer skill decay — so vary the wording, not the claim: "Bainbridge, 1983: automate the routine and the human's new job is watching something that is nearly always right. Nearly." Separately and outside this talk's scope: the short at `:13` still lacks the "on the events the aid got wrong" qualifier that Adaptive, Outsmart and Judgment all received.

5. **`CFP.md` and `packet.md` disagree on outcomes.** `CFP.md:13-17` lists five; `packet.md:37-41` lists four. The one missing from the packet is the best of them — "Count the live pathways in an agentic system rather than its tools" — which is the talk's actual thesis in outcome form.

6. **`visuals.md:3` points at a directory that no longer exists**: "Diagrams are editable SVG in `reveal-talks/assets/adaptive-systems/`". `artifacts/reveal-talks/` was deleted in the 7 September reorg; the nine SVGs live in `public/talks/assets/adaptive-systems/` and the table's own links are correct. One-line fix.

7. **`README.md:110`** — "Adaptive-systems evidence and stage sequence." — is the only bullet in that list with no links, a leftover from the deleted `engineering/` pointer stubs. Point it at `talks/adaptive-systems/evidence-bank.md` and `demo.md`.

8. **WebMCP tense** (`index.md:59`). Verified: sites declare tools via `navigator.modelContext`, agents discover them, opt-in is the model — the claim is right. But it is a Draft Community Group Report (10 Feb 2026) in a Chrome origin trial (149–156), with ChatGPT's desktop browser shipping "Site tools." The talk's present tense implies a shipped standard. "WebMCP is in an origin trial in Chrome right now; it lets an agent act on any site that opts in, and that list only goes one direction" is stronger, not weaker — it dates the claim, which is the point of the slide.

9. **`barrel-of-monkeys.md:29` still over-promises.** It defers to this talk for the self-tuning fan-out "including when to bother and at what level of direct control." `index.md:248` covers the tuning rule in one clause and says nothing about when it is worth doing or how much direct control to keep. Either add a sentence to slide 13 or trim the short's promise.

10. **`contracts.md:121`** — "3 denied tool requests: write-database from ingest-repair jobs" — reads as three denials of one tool, while the gate table (`:37-39`) denies three different tools. Say "3 denied tool requests, all write class."

## Part B — the ceiling

### 1. What is the better talk inside this one

The arc is ~80% right and the weight is wrong. There are two spines here and only one of them is funded.

- **Spine A** — the assistant with everything is inevitable; keep the live pathway set countable. Slides 3, 4, 5, 15 = 13:30.
- **Spine B** — an app can repair its own ingest with proof. Slides 1, 2, 6, 7, 8, 9, 10 = 15:00.

The title, both abstracts (`packet.md:17,21`), the CFP (`CFP.md:9`) and the close all sell Spine A. The minutes go to Spine B. That would be fine — B is A's proof — except that **slides 6, 7, 8 and 9 (6:30 of stage time) never mention a tool, a permission or a pathway.** Read cold, they are a competent data-quality talk that happens to sit between two agent-architecture slides.

The 20% reorder, no slides added:

- **Label each repair beat with the pathway it keeps dark.** Slide 6 ends: "the diff agent that proposed this never held a write." Slide 9 ends: "the thing that reconciled the payment never held `pay`." Slide 7's versioned artifact exists *because* the proposing agent could not promote it — say so. Six sentences turn the ingest story from an interlude into the demonstration.
- **Cut slide 8** (see Dead weight) and give its 1:30 to the walkthrough, which is over budget on all three routes.
- **Fix the denominator** (BLOCKING 6) so slide 1's promise, the walkthrough and the daily report are one incident.

### 2. The thesis line

Current, `index.md:3`:

> Give each job exactly enough agent. Prove every repair. Let the app ask for its own scale.

Three imperatives. That is a table of contents, not a load-bearing statement: no second person, no present-tense claim, and nothing reverses. The closest thing to a reversal in the whole talk is buried at `index.md:65` — "The big assistant still exists; it just never has all of its hands full at the same time" — and even there the acting party is the system, not the room.

Candidates in his voice:

1. **"You are not deciding whether to give the assistant access; your integration list has been deciding for you."** — the reversal the talk actually earns: the inert-seeming backlog turns out to be the thing making the security decision. Pairs with `--no-agent` and with slide 3's whole argument.
2. **"Don't count the tools you handed it, count the routes you opened between them."** — closest to *don't fear training the model, worry how it's training you* in shape; also the one that survives compression to a landing line.
3. **"You didn't build the assistant with everything; you approved it, one integration at a time."**

Take (1) for slide 1 and shorten to (2) for the close.

### 3. The title

"Adaptive, agentic apps" is two adjectives and a plural noun. It is a conference-programme category, and `packet.md:13` already admits it — "Descriptor for programs and schedules" — while `packet.md:9-11` lists three real names. But nothing propagated: `index.md:1`, `bullets.md:1`, all three script headers, `CFP.md:1` and `README.md:39,53,71` still submit the talk under the descriptor. The name exists in one file and the CFP goes out under the label.

Note the collision before promoting the packet's first choice: **"Sorry, You're Building It" is already the name of a short** (`shorts/you-will-build-the-assistant-with-everything.md:1`). One name, two artifacts, is the thing the voice rules forbid.

Three alternatives, three different moves:

- **Conjure Exactly Enough** *(name the technique)* — Dan's own coinage, `index.md:65` "conjures a small agent per job with exactly enough." Three words, says nothing and names everything, and it frees "Sorry, You're Building It" for the short that already owns it. **My pick.**
- **Nobody Reviews the Combinations.** *(flat verdict)* — lifted whole from `index.md:61`. One clause, no comma, sounds like a finding. Slightly darker than the talk, which is an argument for it.
- **The Field Formerly Known as `zip`** *(hijacked phrase)* — hijacks Prince, leads with the concrete field name exactly as the prose rules ask. Funniest of the three; least indicative of the architecture content.

Keep "Adaptive, agentic apps" as the descriptor line under whichever name wins, and change it in `index.md:1` first — everything else is downstream by hand.

### 4. The hallway number

The intended one is "Ten tools is forty-five pairs" and it fails BLOCKING 1: it is checkable, memorable, and describes a different set than the sentence around it.

The better one is latent in the same paragraph and is *more* alarming, not less: under the talk's own read→write definition, ten tools is 25 routes and one twelve-endpoint SaaS takes you to 121. **"One integration, ninety-six new ways for a read to reach a write."** A listener can rebuild that on a napkin (5×5, then 11×11), it makes the word "multiplies" true, and unlike 45 it survives contact with the person in row three who knows what C(n,2) counts.

### 5. The peak

`index.md` marks two (`:73` slide 4, `:181` slide 10). The real one is slide 10, and right now it is a replay with the answer in plain sight.

`demo.md:8` asks "Which record must not be silently repaired?" against `{"zip":"02108","postal_code":"90210"}` (`demo.md:18`). Nobody in a technical room gets that wrong — two different values in two fields is a conflict a junior spots from the back row. The room is invited to be right, which produces a nod, not a peak.

The trap is sitting two lines away, unused. The talk says **"keep the leading zero"** twice (`index.md:126`, `demo.md:17`) and never once lets the room lose it. Show a candidate repair that passes schema validation, passes type checking, and returns `2108`. Ask the room to approve it. Let them. *Then* show the undeliverable address. That is a reversal inside the peak, it costs no extra minutes, and it retroactively justifies slide 8's entire existence — the fixture the agent would have written itself would also have passed.

### 6. The hostile expert

**Strongest attack:** *"You didn't shrink the attack surface, you relocated it. `index.md:81` — 'An orchestrator reads the failure and writes a job.' The orchestrator reads the poisoned vendor payload, holds the union of every capability in your catalog, and decides which agent gets what. That is a confused deputy one level up, and now it's the one component nobody audits because it's 'just' the planner."*

Does the talk survive? Barely, and only in the handout. `contracts.md:27` has the two sentences that answer it — "Evidence IDs and policy IDs refer to server-owned definitions; generated output cannot redefine them. Tools validate authorization on their own, independent of what the model believes it was granted" — and neither is on a slide or in any script.

**Inoculating sentence, raised first, on slide 4:**

> Fair question before you ask it: the orchestrator reads the poisoned payload too. That is why the orchestrator holds no tools at all — it can only name a job class that policy already defines, and policy is server-owned. If you have to trust the orchestrator, I have moved the problem and not solved it.

The second-strongest attack is BLOCKING 1's arithmetic; the third is "you traded one auditable principal for thousands of ephemeral ones," which the denied-request log answers well (`contracts.md:43`) but the talk never states as an answer to that objection.

### 7. Dead weight

**Slide 8, `index.md:150-162`, 1:30.** Its own stage direction hands the payload forward:

> Keep the fixtures hidden. They are revealed in the walkthrough.

A slide whose closing instruction is that its evidence appears two slides later is a trailer. Keep the two sentences that do work — "The agent that proposed the mapping does not author the only tests that judge it" and "A high success count is worthless if the denominator quietly shrank" — as the last beat of slide 7 and the third beat of the walkthrough, where the second one lands on a real denominator instead of a warning about one.

Buys 1:30: 30 s to the walkthrough (BLOCKING 4), 30 s to the unbudgeted slide-1 audience moment (BLOCKING 3), 30 s to the six pathway labels in Part B.1.

Runner-up: slide 14 (3:30) is a second talk with its own example, its own vocabulary and its own copyable prompt, arriving at minute 34 *after* slide 13 is marked `land`. The file's own energy labels say the talk lands, climbs, and lands again. It survives because it is the only Monday-morning on-ramp — but compress it to 2:00 and let it be part of the close rather than a stop before it.

### 8. The landing

Current last spoken line, `index.md:287`:

> That is enough to start.

It is soft, it is the tail of an either/or ("Pick one integration… **Or** start with one reporting agent…"), and it hedges the instruction it just gave. The strongest sentence in the close is three lines earlier and buried mid-paragraph at `index.md:285`: "Many small ones you can afford to."

Two better endings, both short, declarative, silence after:

- **"Give it everything. Just never both hands at once."** — lands the reversal, closes the loop opened on slide 3, and is sayable while stepping away from the podium.
- Or move the Monday instruction ahead of the summary and end on the restored line: **"Not one agent holding every combination. Many small ones you can afford to check."**

Stage direction stays: *Stop talking.*

## What I could not verify

- **First-hand claims.** The prototype (`evidence-bank.md:5`), the client with local models (`:6`), and `index.md:26` "I have had this exact morning more than once" — the last is not listed in the evidence bank's first-hand section. All five `Story:` slots (`index.md:27, 67, 89, 111, 215`) are named and unfilled, which is correct at this stage. Nothing is invented as Dan's own; the composite disclaimer at `index.md:26` is the one scope disclaimer and it is on slide 1, per the rule.
- **The 98%.** No source, no denominator, nothing in the folder produces it (BLOCKING 6).
- **Timings.** Rehearsal targets only; no recording exists, so the wpm bands are the only available check.
- **Vaughan (1996).** Book; attribution and the term "normalization of deviance" are standard and correctly scoped by `evidence-bank.md:28`, but I did not open the text.
- **Decks.** None exists for this talk (`README.md:53` "not yet rebuilt"), so no deck-level drift could be checked.

Verified externally this pass: Saltzer and Schroeder (1975), least privilege is principle **(f)** — confirmed against the MIT text, principles (a) economy of mechanism through (h) psychological acceptability. Bainbridge (1983), *Automatica* 19(6), 775–779 — confirmed. Skitka, Mosier and Burdick (1999), *IJHCS* 51(5), 991–1006 — confirmed, and the qualified claim at `index.md:232` is what the paper supports. WebMCP opt-in model — confirmed; maturity overstated (SHARPEN 8).
