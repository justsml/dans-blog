# Audit: Cry Me a Free Tier (free-tier)

Audited 2026-09-06 against the canonical outline `outlines/free-tier-40min.md`, its generated scripts and adaptations, the packet, `build-talk.ts`, the five shorts, both READMEs, the browser decks, the demo kit, and the three dated vendor URLs on slide 4. No talk files were edited.

## 1. Verdict

Ready after fixes. One arithmetic slip on slide 13 ($10 vs $100), one heading that says "three" above four boxes, and three route-trim choices in the 15-minute cut that orphan on-screen lines; everything else is consistent, the citations check out, and all three slide-4 announcements resolve and match their figures as of today. The talk holds its own bar on disclaimers (one on slide 1) but carries two more on slides 11 and 13, and slide 10's heading is the "Your X Is a Y" formula the voice skill rejects.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `outlines/free-tier-40min.md:253` | "At a million attempts a month, ten cents each is a hundred thousand dollars a month and you should have started yesterday. At a thousand attempts a month it is ten dollars and you should never do it." | The sentence has just fixed the saving at ten cents per attempt (10× pricing). 1,000 × $0.10 = $100, not $10. $10 is the 1× figure (1,000 × $0.01). A room doing the arithmetic on stage, as the talk invites, catches it. | "At a thousand attempts a month it is a hundred dollars, ten at today's price, and you should never do it." Propagates to `script-40min.md:225` on rebuild. |
| `outlines/free-tier-40min.md:32` | "## 2. Price, cost, and value are three different numbers" | Spoken text opens "Four boxes." and the visible line lists four items (Price paid · Resources consumed · Cost allocated · Value delivered). Heading contradicts the slide it titles. | Heading: "Four boxes, one invoice". Propagates to scripts, adaptations, decks, `reveal-talks/free-tier.html:46`. |
| `decks/README.md:3,7` (staged, from another talk's sync) | "These 6 PowerPoint files are generated… \| Dynamic Scaling of Agentic Workloads \| 14 \|" | The deck index now lists only dynamic-scaling; free-tier rows are gone. `packet.md:5` and `README.md:39` point to it for "Current screen and handout PowerPoints". `sync-talks.ts:76` regenerates the index from only the slugs passed. | Run `bun artifacts/speaking-portfolio-expanded/sync-talks.ts` for all registered slugs (or make `deckRows` read every `*-40min-screen.pptx` present) before committing the staged `decks/README.md`. |

## 3. Consistency findings

- Timings: outline 40-min slides are monotonic and sum to 40:00 (2.5+2+3+2.5+2.5+2.5+3+2+2+3+4+3+3+3+2). Deck `data-timing` sums: 40-min 2400 s, 30-min 1800 s, 15-min 900 s. Route `times` in `build-talk.ts:601` sum to 30, `:614` sum to 15. All match.
- Bridges (`build-talk.ts:602-606, 615-620`) are keyed on the slide *after which* they play; each covers exactly the cut slides (30: 4, 8, 13; 15: 2, 8-9, 11, 13-14). Correct.
- `build-talk.ts:621` `trim: { 3: [0, 2] }` (15-min) drops paragraph 1, the one that names the four explanations. The route note (`:623`) promises "the four explanations for a low price" and the Brooke Group / Rochet-Tirole sources remain under a script that never mentions them (`script-15min.md:29-35`). Fix: `3: [1, 2]`.
- `build-talk.ts:621` `trim: { 6: [0, 1, 3] }` drops paragraph 2 ("your per-token price has fallen off a cliff… Spend is price times consumption"). The visible line "Spend = price × jobs × calls per job × tokens per call" (`script-15min.md:57`) is then never spoken, and the kept paragraph 3 opens "Both things can be fine" with no antecedent (`script-15min.md:63`). Fix: `6: [0, 1, 2]`.
- `build-talk.ts:621` `trim: { 1: [0, 1] }` drops "Eight words." Slide 15 then lands "There are your eight words" (`script-15min.md:130`) with no setup. Fix: `1: [0, 1, 2]` (adds ~20 s) or add "eight words" to the slide-1 bridge.
- `script-15min.md:134,136` "Leave the table up." / "Leave the sweep table on screen for questions." Slide 11 is cut from the 15-min route; there is no table. Add `15: [0, 1, 2]` to the 15-min trim or reword (next bullet).
- `outlines/free-tier-40min.md:289-291` Slide 15 is the eight-word slide; "Leave the sweep table on screen" requires navigating back to slide 11. Make it explicit: "Jump back to slide 11 for questions" or drop.
- `outlines/free-tier-40min.md:237` "everything on the next three slides" is true only in the 40-min route (30: two slides; 15: one, and trim 12 keeps this paragraph). Reword to "everything after this".
- `economics-product/demo.md:7` "The 40-minute deck reserves slide 9 for this run." and `:43` "use deck slide 9" — the demo is slide 11 (`outlines/free-tier-40min.md:199`). Stale since the rewrite.
- `demos/DEMO-RUNBOOK.md:3-7` vs slide 11: fixture (1,000 / $0.02 / $0.01 / 75%), rows 1×-10× and $30/$210, $0.040/$0.280 match. But slide 11 spoken (`outline:215`) leads with "Then move the acceptance rate and watch it beat the price change"; the runbook only says "Increase the success rate… to expose which assumption matters" and never gives the number. Add the beat: set 45% at 1× → $0.0667, identical to the 2× row.
- `demos/index.html:11,24` and `DEMO-RUNBOOK.md:3` say "Successful attempts", "Cost / success", "75% success"; the talk says "accepted outcome" everywhere and slide 10 makes the distinction load-bearing. Relabel the panel to "Accepted attempts (%)" and "Cost / accepted outcome".
- `README.md:97` "Sources added in this revision (… Shoup) are cited in the outlines and not yet in the evidence notes." Shoup is in `packets/free-tier/evidence-bank.md:11` and `economics-product/evidence.md`. Stale.
- `economics-product/CFP.md:3` "Prepared 2026-09-04. Abstracts are exact 50- and 150-word versions by whitespace count" — the 150-word abstract (`:19-23`) is 153 words by `wc -w`; the outline was rewritten 09-06.
- `packets/free-tier/packet.md:20-22` "### 100 words" is 106 words.
- `packets/free-tier/packet.md:57` "The talk names AWS credit terms and Epoch AI's public data as sources." Slide 4 also names Microsoft and Amazon announcements; list them or the "not a product pitch" claim reads incomplete.
- `packets/free-tier/packet.md:71` and `evidence-bank.md:22` cite `aws.amazon.com/awscredits/` (promotional terms); slide 4 cites `aws.amazon.com/startups/credits/` (the $200K offer). Both are valid; the packet's reference list should carry the offer URL the slide shows.
- `economics-product/evidence.md:3` "Verified 2026-09-04" heads a section that says "Rewritten 2026-09-06". Update the header date.
- Shorts: parent slide references all point at the right content (`acceptance-rate…:3` slide 10; `cheaper-coal…:3` slide 6; `free-parking…:3` slide 5; `the-third-price:3` slides 9, 10, 14; `you-are-getting-married:3` slides 12 and 13). `shorts/README.md:22-24,41-42` titles match the files. Staged rename "Free Parking Cost You a City" → "Free Parking Isn't" is consistent with README.
- `reveal-talks/free-tier.html` slide 4 visible lines, slide 10 multipliers, slide 11 table, and slide headings match the outline. The deck has no `<img>` elements (all 15 slides are typographic; image prompts are unrendered), so there is no alt text to check; `README.md:74` says as much.
- `formats.md` slide references (lightning 1, 5, 6, 12, 15; workshop blocks 1-2, 3-4, 5-7, 8-9, 10-11, 12, 13-14, 15; "slide 11's sweep") all match the current outline.

## 4. Correctness findings

- Slide 10 / evidence-bank:26. 1,000 × ($0.02 + $0.01) = $30. 1,000 × 0.75 = 750. $30 / 750 = $0.040. Multipliers 1/0.75 = 1.333, 1/0.45 = 2.222. Equivalence: $0.03 / 0.45 = $0.0667; doubling inference ($0.04 + $0.01) / 0.75 = $0.0667. Both equal 1/15 exactly. Correct.
- Slide 11 table. 2×: (0.04+0.01)=0.05 → $50, /0.75 = $0.0667 → "$0.067". 5×: 0.11 → $110, $0.1467 → "$0.147". 10×: 0.21 → $210, $0.280. Correct; matches `demo-logic.js:21` and `demo.test.js:14` (5× → 110, 0.14667).
- Slide 13. Halving inference at 1× saves $0.01/attempt; at 10× saves $0.10. 1,000,000 × $0.10 = $100,000/month. Correct. 1,000 × $0.10 = $100, **not $10** (see Blocking).
- `economics-product/demo.md:36` at 10× with inference $0.01: (0.10+0.01)/0.75 = $0.1467, batch $110. Correct.
- Slide 6 "elasticity … roughly one. Build ten percent more road, get ten percent more driving." Duranton and Turner (2011), AER 101(6) 2616-2652, report an elasticity of VKT to interstate lane-km of about 1.03. Supported.
- Slide 3. Brooke Group Ltd. v. Brown & Williamson Tobacco Corp., 509 U.S. 209 (1993): below-cost pricing plus a "dangerous probability" of recoupment. Supported. Rochet and Tirole (2003), JEEA 1(4), 990-1029. Supported.
- Slide 4. Schelling (1960), The Strategy of Conflict; Nobel 2005. Supported. "War of attrition" used as a model, labelled as such in the evidence bank.
- Slide 5. Shoup, The High Cost of Free Parking (APA 2005; updated ed. 2011); Shoup, "Free Parking or Free Markets", ACCESS 38, Spring 2011. Supported.
- Slide 6. Jevons (1865), The Coal Question, ch. VII "Of the Economy of Fuel". Supported. Epoch AI data insight: title, four authors, and date (March 12, 2025) verified by fetch today.
- Slide 8. David (1985) AER 75(2) Papers and Proceedings; Liebowitz and Margolis (1990) JLE 33(1); Arthur (1989) Economic Journal 99(394). All supported; the "cited to be set aside" use of the QWERTY dispute is what the papers say.
- Slide 9. Holmström (1979), Bell Journal of Economics 10(1), 74-91; Nobel 2016. Supported.
- Slide 12. Williamson (1985); Nobel 2009. Supported.
- Slide 13. Dixit and Pindyck (1994), Princeton. Supported.
- Slide 4 vendor items, checked today (2026-09-06):
  - Microsoft, 28 Oct 2025: URL resolves; page states "OpenAI has contracted to purchase an incremental $250B of Azure services". Matches the slide.
  - Amazon: URL resolves; page states "Anthropic to spend more than $100 billion over the next ten years on AWS technologies" and "Amazon will invest $5 billion in Anthropic today and up to an additional $20 billion". Date 20 Apr 2026 confirmed via press coverage (the page itself shows no date in the fetched text). Matches the slide. Note the slide's link text says "Apr 2026" while the visible line says "20 Apr 2026"; harmless.
  - AWS Activate: URL resolves; "Up to $200,000 USD in Activate Credits" for the Portfolio Pre-Series B tier. The slide's "eligible startups" is accurate; the tier name is not on the slide and need not be.
  - Recheck before delivery: coverage dated today (Motley Fool, 2026-09-06) says Anthropic's IPO prospectus, expected late September, may disclose contract details of the $100B commitment; the figure or its framing could move. The Microsoft/OpenAI restructuring figures ($135B stake) are adjacent and easy to misquote. `outline:84` already instructs a recheck the week of the talk; the fixture argument survives either way.
- Unlabelled numbers: `outline:47` "it is usually a third of the room" and `:173` "sixty days later" are illustrative and read as such in stage direction / prose; no fix needed. `evidence-bank.md:65` "$22,500 monthly auth-cost engagement" is backed by `src/data/consultingServices.ts:144,167`.

## 5. Direction alignment

- No drift on (a): the talk never argues against building anything; slide 15 "Use the cheap input. It is genuinely great."
- No drift on (b)/(c): `outline:139` "three parallel attempts are sometimes exactly right" treats parallel generation as a purchase to be measured, not a correctness vote. Knight and Leveson, Council of Guards and barrel-of-monkeys are not this talk's material and are not mentioned.
- (d) is stated plainly: `outline:139` "Redundancy is worth paying for, big context is worth paying for"; `:283` "keep the expensive decisions reversible while you find out". No hedge into mush.
- Ownership: `outlines/benchmarks-40min.md:33` "The cost-per-success arithmetic belongs to Cry Me a Free Tier." Free-tier still owns it (slides 10-11); the duplication noted in `reviews/README.md:28` is resolved. Free-tier defers nothing to a companion talk.
- `evidence-bank.md:71` supports slide 14's "rehearse one replacement" with the llm:// post; consistent with the adaptive talk's portability material, not a duplicate of it.

## 6. Voice

- Disclaimer count beyond the slide-1 allowance: slide 11 visible line "Sensitivity, not prediction. Quality is held fixed, which is itself an assumption." (`outline:205`); slide 13 "And preserved acceptance is an assumption until an eval says otherwise" (`:253`); slide 10 "The fixture, synthetic and deliberately small" (`:193`, mild; "deliberately small" carries information). Three extra, two on screen. Move the slide-11 caveat to the evidence bank per the skill ("Caveats go in the evidence bank, not the script").
- `outline:181` "## 10. Your acceptance rate is a price multiplier" → "Doubling on a Tuesday" (already the short's approved title; the skill's canonical reject is exactly this "Your X Is a Y" shape).
- `outline:32` "Price, cost, and value are three different numbers" → "Four boxes, one invoice".
- `outline:66` "Those enormous commitments are moves, not measurements" → "Burn the boats" (the spoken text already says it; hijacked phrase, two words).
- `outline:239` "Reversibility has a price and you can compute it" → "Reversible is a line item" or "Options have premiums".
- `outline:199` "Demo: change one assumption, watch the unit cost" → "Turn the dial".
- `outline:205` visible "Sensitivity, not prediction. Quality is held fixed, which is itself an assumption." → "Sensitivity, not prediction." (keep the second visible line as is).
- `packets/free-tier/packet.md:12` alternate title "What Did the Cheap Input Teach Your Architecture to Expect?" is a question title where the question is not the joke; drop it. `:11` "You Are Not Shopping, You Are Contracting" is seven words; acceptable as a subtitle, not a title.

## 7. Cruft

| path | verdict | reason |
| --- | --- | --- |
| `decks/free-tier-40min.pptx` | DROP | Unsuffixed file from commit 9b404415b; identical size to `free-tier-40min-screen.pptx`; nothing in `sync-talks.ts` writes it. |
| `economics-product/demo.md` §1 | MERGE | Its stage sequence (`:28-37`) is better than `DEMO-RUNBOOK.md` §4 and includes the acceptance move the slide asks for; fold it into the runbook and fix "slide 9" → 11. |
| `economics-product/evidence.md` §Cry Me a Free Tier | KEEP (trim) | Pointer to the evidence bank is useful; the nine-row table duplicates `evidence-bank.md:9-22`. Keep the pointer and the closing paragraph, drop the table, fix the header date. |
| `economics-product/CFP.md` §Cry Me a Free Tier | KEEP | Only CFP copy for this talk; fix "Prepared 2026-09-04" and the 153-word abstract. |
| `README.md:97` sentence about Shoup | DROP | Superseded by the evidence bank. |
| `packets/free-tier/packet.md:12` question-form alt title | DROP | Fails the voice skill's title rules. |
| `packets/free-tier/evidence-bank.md` Candidate 1-4 | KEEP | Correct story-slot scaffolding; slots are named and unfilled as the skill requires. |
| `reviews/README.md:3,20,24,28` mentions | KEEP | Historical record that free-tier was the grading standard; all four statements are still true. |
| `artifacts/flagship-talks/free-tier-*` | (none) | No parallel copy exists. |
| `reviews/free-tier-review.md` | (none) | No pre-rewrite review exists; nothing to reconcile. |
| Five shorts | KEEP | All parent slide refs current; titles match README. |

## 8. Proposed edit list

1. `outlines/free-tier-40min.md:253` change "it is ten dollars" to "it is a hundred dollars, ten at today's price".
2. `outlines/free-tier-40min.md:32` change heading to "Four boxes, one invoice".
3. `outlines/free-tier-40min.md:181` change heading to "Doubling on a Tuesday".
4. `outlines/free-tier-40min.md:205` shorten the first visible line to "Sensitivity, not prediction." and move the quality-held-fixed caveat to `packets/free-tier/evidence-bank.md` under "Arithmetic in the talk".
5. `outlines/free-tier-40min.md:237` change "the next three slides" to "everything after this".
6. `outlines/free-tier-40min.md:291` change stage direction to "Say the last line slowly. For questions, jump back to slide 11 and leave the sweep table up."
7. `build-talk.ts:621` change the 15-min trim to `{ 1: [0, 1, 2], 3: [1, 2], 5: [0, 1], 6: [0, 1, 2], 7: [0, 1], 10: [0, 2], 12: [0, 1, 3], 15: [0, 1, 2] }` and rebalance `times` if slide 1 runs long.
8. `README.md:97` delete the "Sources added in this revision … not yet in the evidence notes" sentence.
9. `economics-product/demo.md:7,43` change "slide 9" to "slide 11".
10. `economics-product/evidence.md:3` update "Verified 2026-09-04" to 2026-09-06 and delete the duplicated table at `:9-19`.
11. `economics-product/CFP.md:3,19-23` update the prepared date and cut the 150-word abstract by three words.
12. `packets/free-tier/packet.md:12` delete the question-form alternate title; `:22` trim the 100-word abstract by six words; `:57` add "and dated Microsoft and Amazon announcements" to the sources sentence; `:71` add the `aws.amazon.com/startups/credits/` offer URL.
13. `demos/index.html:11,24` and `demos/DEMO-RUNBOOK.md:3` relabel "Successful attempts" / "Cost / success" / "75% success" to "Accepted" wording.
14. `demos/DEMO-RUNBOOK.md` §4 add the acceptance beat from `economics-product/demo.md:28-37`: "Set acceptance to 45% at 1×: $0.0667, the same as the 2× row."
15. `decks/free-tier-40min.pptx` delete.
16. Run `bun artifacts/speaking-portfolio-expanded/sync-talks.ts` for every registered slug so `decks/README.md` lists all talks again, then rebuild free-tier scripts, adaptations and decks.

## Fixes applied 2026-09-06

### Retitle: Cry Me a Free Tier → Buy Me a Free Tier

Applied across every file this agent owns. `build-talk.ts` already carried the new title (`:469-473`), so the outline and the hand-written packet now match it.

- `outlines/free-tier-40min.md:1` H1; `:5` header note records the former title.
- `packets/free-tier/packet.md:1,9`, `packets/free-tier/formats.md:13`, `packets/free-tier/evidence-bank.md:1`.
- `economics-product/CFP.md` section heading and the portfolio-fit line ("Buy Me a Free Tier owns cost per accepted outcome"); `economics-product/evidence.md` section heading; `economics-product/demo.md` §1 heading.
- `demos/DEMO-RUNBOOK.md` §4 heading.
- Parent lines in all five shorts: `acceptance-rate-is-a-price-multiplier.md`, `cheaper-coal-more-coal.md`, `free-parking-cost-you-a-city.md`, `the-third-price.md`, `you-are-getting-married.md`. No filenames changed.

Joke check, per the rename instruction. No text anywhere in the talk, packet, shorts or demo files played on "cry me a river" — the old pun lived entirely in the title, so nothing was orphaned. Slide 1's "Swap electricity for inference and that is the whole talk" and slide 15's "Back to the electricity" callback are built on the electricity premise, not on the title, and both still read cleanly. To let the new joke land where the argument already makes it, one sentence was added to slide 4 (`outline:78`), between "Note who is not a player in that game" and the existing landing: **"Somebody is buying your free tier, and it is not you."** It sits on the war-of-attrition beat, which is exactly the slide that earns the title, and it leaves "You are not a combatant. You are the terrain." as the closer.

Voice note for the record: `dans-voice/SKILL.md:16` still lists *Cry Me a Free Tier* as an approved title example. Someone should update that line centrally, since the skill now cites a title the portfolio no longer uses.

### 1. Changes

**`outlines/free-tier-40min.md`**

- `:253` **arithmetic (Blocking).** Verified the whole paragraph independently before rewriting. The halving inference saves $0.01/attempt at 1× ($0.02 → $0.01) and $0.10/attempt at 10× ($0.20 → $0.10). 1,000,000 × $0.10 = $100,000/month — the existing figure is right. 1,000 × $0.10 = **$100**, not $10; $10 is the 1× figure. Rewritten to "At a thousand attempts a month it is a hundred dollars, ten at today's price, and you should never do it." Both the 10× and the 1× figures are now on stage, which is what makes the "identical project, two worlds" line land.
- `:32` heading "Price, cost, and value are three different numbers" → **"Four boxes, one invoice"**. The spoken text opens "Four boxes." and the visible line lists four.
- `:181` heading "Your acceptance rate is a price multiplier" → **"Doubling on a Tuesday"** (short #12's approved title; the old one was the exact "Your X Is a Y" shape the voice skill rejects).
- Three further headings from §6 of this audit, same reasoning, cheap to take: `:66` "Those enormous commitments are moves, not measurements" → **"Burn the boats"** (the spoken text already says it); `:199` "Demo: change one assumption, watch the unit cost" → **"Turn the dial"**; `:239` "Reversibility has a price and you can compute it" → **"Reversible is a line item"**.
- **Hedges (two beyond the slide-1 allowance), both removed from the script and relocated to the evidence bank.** `:205` visible line trimmed to "Sensitivity, not prediction." (dropped "Quality is held fixed, which is itself an assumption."). `:253` dropped "And preserved acceptance is an assumption until an eval says otherwise;" while keeping the concrete half, "A router that costs more to run than it saves is not better engineering." Slide 10's "synthetic and deliberately small" is left alone — it carries information about the fixture rather than apologising for it.
- `:237` "everything on the next three slides" → "everything after this". True in all three routes; this was also the only thing making the 15-min trim of slide 12 read wrong.
- `:84` slide-4 stage direction now names the specific recheck risk: Anthropic's IPO prospectus is expected late September 2026 and may disclose contract detail behind the $100B AWS commitment, and the adjacent Microsoft/OpenAI restructuring figures must not be misquoted into this slide.
- `:289` dropped "Leave the table up." from the closing spoken line, so slide 15 lands on "Cheap intelligence changes incentives before it changes organizations." and stops. `:291` stage direction now reads "Say the last line slowly, then stop talking. For questions, jump back to the sweep table if this route kept slide 11." Deliberately route-conditional: stage directions are emitted for every route (`build-talk.ts:642`) and are not trimmable, and slide 11 is cut from the 15-minute route — so a flat "jump back to slide 11" would have been wrong there. This removes the `script-15min.md:134,136` orphan at the source rather than by adding a trim.
- Timings untouched. Re-verified monotonic, non-overlapping, and summing to 40:00 (2.5+2+3+2.5+2.5+2.5+3+2+2+3+4+3+3+3+2).

**`packets/free-tier/evidence-bank.md`**

- "Arithmetic in the talk" now carries the two relocated caveats (slide 11 sweep: sensitivity not prediction, quality held fixed; slide 13 payback: acceptance assumed preserved), flagged as answers to a challenge from the floor rather than script lines.
- Added the slide-13 payback arithmetic in full ($0.01 and $0.10 per attempt; $100,000 vs $100 vs $10) so the corrected figure is checkable off-stage.
- "Credits expire" row now leads with the `aws.amazon.com/startups/credits/` offer URL that slide 4 actually shows, keeping the promotional-terms URL beside it.
- "Before presenting" carries a dated live-recheck note on the $100B AWS figure and the late-September IPO prospectus.

**`packets/free-tier/packet.md`**

- Dropped the question-form alternate title "What Did the Cheap Input Teach Your Architecture to Expect?" (fails the title rules).
- 100-word abstract was 106; now exactly 100 by `wc -w`. The 50-word abstract was 51; now exactly 50.
- `:57` sources sentence now names the dated Microsoft and Amazon announcements alongside AWS credit terms and Epoch AI.
- References gained the AWS Activate offer URL and the two dated announcement URLs.

**`economics-product/CFP.md`** — prepared line now reads "Prepared 2026-09-04; Free Tier copy revised 2026-09-06". The 150-word abstract was 153; now exactly 150. The 50-word abstract was 51; now exactly 50 (same edit as the packet, so the two copies stay identical).

**`economics-product/evidence.md`** — header date updated; the nine-row table that duplicated `evidence-bank.md:9-22` deleted in favour of a pointer that names the evidence bank as authoritative and says what else is there. The counterargument paragraph is kept.

**`economics-product/demo.md`** — "slide 9" → "slide 11" at `:7` and in the fallback. Stage sequence gains the acceptance beat the slide leads with (new 1:45–2:15 row: restore 1×, drop acceptance to 45%, land $0.0667 = the 2× row), and the 2:30–3:15 row now says "Restore 75%" first so the two moves do not compound.

**`demos/DEMO-RUNBOOK.md` §4** — retitled; now names slide 11; "success" wording replaced with "accepted"; and the acceptance beat added with its number ($0.0667 at 45%/1×, identical to the 2× row, no price change). This is the beat slide 11 opens with and the runbook previously only gestured at.

**`demos/index.html`** (economics panel only) — "Price sensitivity per successful outcome" → "per accepted outcome", "Successful attempts (%)" → "Accepted attempts (%)", "Cost / success" → "Cost / accepted outcome". `demo-logic.js` is untouched: `costPerSuccess` is a code identifier asserted by `demo.test.js:14`. `bun test demo.test.js` still passes 15/15.

### 2. Deliberately skipped

- **Edit 8, `README.md:97`** (delete the stale Shoup sentence). The finding is correct, but the portfolio-root README is on this pass's never-edit list. Handing it to the caller below.
- **Edit 7, the 15-minute trim in `build-talk.ts:497`.** Route config; reported below instead of edited, as instructed.
- **Edit 15/16, `decks/free-tier-40min.pptx` and the `decks/README.md` regeneration.** Already done centrally before this pass started.
- **Adding `15: [0, 1, 2]` to the 15-min trim** (audit §3, to suppress the "leave the table up" orphan). Not needed: the orphan is gone from the outline itself, so no route needs a trim to hide it. Adding one would have cut a paragraph from the closing slide for no reason.
- **`outline:193` "synthetic and deliberately small"** left in place — §6 rated it mild and it carries information about the fixture.
- **Slide-10 15-min trim `10: [0, 2]`**, which drops the fixture paragraph. Considered and left alone: slide 10's visible lines carry the $0.040 and the two multipliers, so the kept paragraph still stands up. Flagging it only so the next audit knows it was looked at.

### 3. Route config changes for the caller

```
build-talk.ts, talk "free-tier", route 15 (currently line 497):

  field: trim
  old:   { 1: [0, 1], 3: [0, 2], 5: [0, 1], 6: [0, 1, 3], 7: [0, 1], 10: [0, 2], 12: [0, 1, 3] }
  new:   { 1: [0, 1, 2], 3: [1, 2], 5: [0, 1], 6: [0, 1, 2], 7: [0, 1], 10: [0, 2], 12: [0, 1, 3] }

  why:
    1: adds the "Eight words." paragraph. Without it slide 15's "There are your
       eight words" has no setup in the 15-minute route.
    3: [0,2] drops the paragraph that NAMES the four explanations, while the route
       note promises them and the Brooke Group / Rochet-Tirole sources stay attached.
       [1,2] keeps the naming and the "what happens next" turn.
    6: [0,1,3] drops the paragraph containing "Spend is price times consumption",
       leaving the visible line "Spend = price x jobs x calls per job x tokens per
       call" unspoken and making the kept "Both things can be fine" open with no
       antecedent. [0,1,2] speaks the equation.

  field: times  (rebalance for the added slide-1 paragraph, ~20 s)
  old:   [1.5, 2, 1.5, 2, 2.5, 2, 2, 1.5]     (keep: [1, 3, 5, 6, 7, 10, 12, 15])
  new:   [1.75, 2, 1.5, 2, 2.25, 2, 2, 1.5]
  check: 1.75 + 2 + 1.5 + 2 + 2.25 + 2 + 2 + 1.5 = 15.0  (slide 7 keeps both of its
         two paragraphs at 2.25; it was the most generously timed slide in the route)

  field: bridges, key 1
  old:   "Bridge: price, cost and value are three different numbers, and the gap
          between what you pay and what it is worth to you is why nobody is measuring."
  new:   "Bridge: four boxes on one invoice - price paid, resources consumed, cost
          allocated, value delivered - and the gap between the last two is why nobody
          is measuring."
  why:   the bridge quotes slide 2's old heading, which this pass changed to
         "Four boxes, one invoice".

Also outside this agent's scope:
  README.md (portfolio root), line 97: delete the sentence "Sources added in this
  revision (... Shoup) are cited in the outlines and not yet in the evidence notes."
  Shoup is in packets/free-tier/evidence-bank.md:11 and economics-product/evidence.md.

  .claude/skills/dans-voice/SKILL.md:16 lists "Cry Me a Free Tier" as an approved
  title example. Update it to "Buy Me a Free Tier" so the skill does not cite a
  retired title.

Then rebuild: bun artifacts/speaking-portfolio-expanded/build-talk.ts free-tier
(the arithmetic fix propagates to script-40min.md:225, and every heading change
propagates to the scripts, adaptations and reveal-talks/free-tier*.html).
```

### 4. Morning-review proposals

There is no `reviews/free-tier-review.md`. This talk was the grading standard the other morning reviews were written against, so there is nothing to reconcile and nothing was adopted or skipped from that source.
