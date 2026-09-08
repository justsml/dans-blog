# Talk Intent Distillation — Claude Side

Extracted 2026-09-08. **This is the Claude side** of the distillation; a Codex-side pass
exists separately and should be read against it, not merged into it.

## Method

Source: all 67 Claude Code transcripts under `~/.claude/projects/**/*.jsonl`. Every
`type: "user"` / `role: "user"` entry was pulled, then filtered down to messages Dan
actually typed — tool results, task notifications, skill loads, compaction summaries,
slash-command echoes, IDE selection wrappers and image placeholders removed. 94 messages
survived. Nothing below comes from files on disk; the existing talk artifacts were
deliberately not read, since they are out of date relative to these instructions.

Talk work runs 2026-09-04 → 2026-09-08, concentrated in `dans-blog`, spilling into
`agentic-parallelism` and `ai-skillz`. The earliest voice rule dates to 2026-05-21.

---

## The Talk Portfolio

### 1. Rethinking Parallelization → Dynamic Scaling of Agentic Workloads

Original scope (09-05): "different ways to work: building multiple competing solutions
across models (or agent profiles), structuring/breaking up work, usually across agents,
new ways to constrain (limiting time / cost), fan out across hardware/clouds, dynamic
resource allocation, and optimizing: turn non-deterministic into fast, dumb &
deterministic code/scripts/tests."

Crystallized into five verbs: **Compete / Decompose / Constrain / Distribute / Compile.**

Renamed 09-06, with orders: "Tighten it way the fuck up. Fix confusing errors or wrong
examples." Compare to traditional horizontal/vertical scaling; show "how agents can now
self direct work allocation"; frame as a "wild inversion of Infra & Ops" embracing least
privilege, restricted sandboxes, ephemeral instances and hardware. Name the ecosystem:
Depot, MetalSmith, Fly.io Sprites, Vast.ai, Modal.ai, alongside Cloudflare
Workers/Durable Objects and EC2 Spot.

Latest instruction (09-08): "the sequence... is terrible, please redesign for optimal arc
to maximize appeal amongst AI Conference attendees."

### 2. Automating Improvement from Failure ("the fail-to-win loop")

Full replacement arc dictated 09-06, opening with: "The main thrust of it should not be
any of the shit that's currently in our artifacts."

- Step one is unglamorous: **point an agent at your production logs.** Enrich with
  codebase access, observability MCPs, cloud-platform MCPs (CloudWatch etc.). "The more
  you enrich it with, the more you can rely on it."
- **Grow it organically. One problem at a time.** Explicitly warn against wiring up total
  auto-remediation on day one.
- Out-of-band scheduled checks (GitHub Actions, dev machines, servers) distilling failures
  since last check → loop to identify patterns, estimate severity/risk, flag security
  classes.
- Next level: classify and tag → push tickets and PRs into a queue for human review or
  agent testing / security audit.
- **LLM-driven E2E as a cost story:** instead of a vast flaky Playwright suite run in
  triplicate across 16 shards, give the agent Chrome CDP/MCP and scope it to "only the
  changes or features that may be impacted by the current PR." Cheap models suffice for
  bounded multi-step tool calls. "Consider LLMs as a potential savings over your vast
  library of E2E scripts that aren't really helping and they fail half the time."
- **Connect it to user feedback**, not just errors. Thumbs-down plus rage text are "gold
  if you can run them through an automated PR creation process." Personalized feature flag
  → expand to similar usage profiles → agentic guards → maybe a human check.
- **Escalation:** correlate a support ticket's session ID with a logged error,
  auto-escalate, auto-issue credits — with the caveat "be very careful with things that
  affect dispensing money, as LLMs are notoriously easy to finagle."
- **Proactive alerts:** three tickets about the same shipping-integration bug become an
  outbound "we're having issues, we'll notify you when resolved."
- Closing thesis: if you aren't turning failures into wins, "we are losing out on one of
  the most impressive capabilities that is low lift, high leverage."

### 3. Adaptive / Agentic Apps

Opening image (09-06): "an assistant that's been given access to all your customers'
personal data, and wide access to tools that could be easy to accidentally use in
dangerous ways, nevermind bad actors."

- **Dynamic agent generator** — narrowly-scoped agents get a tailored prompt and only the
  tools they expect to need, with a policy-gated dynamic tool search escape hatch; an
  orchestrator loops to decide if more are needed and guards high-risk tools and
  cross-system data-leak boundaries.
- **"Agents that conjure up prescribed custom agents on demand."**
- **Scaling moves from an infra/devops concern to an agent-directed capability** —
  enabling per-customer or per-job pay-for-performance and novel cost controls. Flagged
  in-message as "a fresh ish idea."
- Original scope also listed: orchestrator, horizontal/vertical, elastic compute,
  intermediate agent-builder, work planner, feedback, scoring, dynamic A/B, observability,
  cost controls, and **what your AGENT.md should include** — including standing goals like
  "regularly add major new models from frontier labs & mirror traffic to them and/or run
  them through eval+tuning loops."

### 4. Cry Me a Free Tier → Buy Me a Free Tier

Thesis (09-05): "how llm/cloud companies are playing with fire around the reported amount
of subsidization." Original analogy: **"free" parking** — it limits which businesses can
succeed, artificially caps retail density, moves rental and property prices. Second- and
third-order effects wanted.

- (09-06) "Make it informative and introduce economics, game theory, and other related
  areas/disciplines/concepts."
- (09-07) "come up with an alternative arc or lighter format."
- (09-08) The analogy becomes **MoviePass**: "the infamous MoviePass's promise of unlimited
  movies. And the silly obvious trainwreck that followed. And that was just a bunch of
  teens and stay at home parents who were this close to burning down AMC/Regal HQ. It
  wasn't even their fault."
- Load-bearing line: **"Don't fear training the model, worry how it's training you."**
  Explicitly clarified: "i didn't mean title, it's meant to be the load bearing
  statement" — replacing the rejected "You Are Not Shopping, You Are Contracting."

### 5. Outsmart Your Lying, Cheating Students

Dictated in full 09-06.

- **Open by conceding.** Horse out of the barn — then immediately acknowledge those
  references are beaten to death. Calculators, the Casio watch panic, "math class is
  dead." Confess you used one.
- **The pivot:** "kids these days are cheaters, what I was doing was wholesome" — then
  undercut it.
- The **doom loop**: proctoring tools readily fail; pop quizzes only prove Johnny can't
  reach level one of Bloom's; no stigma attaches to tools "as common as a cell phone";
  "little benefit to pummeling your students with gotcha questions just to prove what you
  already know."
- **Lockdowns don't work**: "you lock down GPT on the network. Guess what? They'll figure
  out a VPN on their phone and share it." Students are "the original adversarial hacking
  actors" — Jurassic Park nod.
- **Preserve the foundational, then teach the tool.** Pencil, paper, whiteboard, talking
  problems over with peers — for the spatial and coordination dimensions. Then: "we're
  going to show you how to use all this stuff... and even make it feel like cheating to
  them."
- **The killer exercise:** photograph 100 arithmetic problems, make the LLM do them — but
  plant a smudged 7-that-looks-like-1 or 8-that-looks-like-9. "Oh, wait, you didn't check
  your results."
- **New classroom metric: AI time.** We already measure teacher talk time, student talk
  time, think time. Add: how much AI time, how much educator guidance, how much individual
  student-AI interaction.
- **Transcript-scale qualitative analysis** across 30 or 300 students: "show me the 5
  examples where students led novel lines of inquiry," spot the giant copy-pasted blocks.
- **Voice as an integrity signal** — recall-mode errors are a different class than
  reading-aloud errors; mispronouncing a word you'd never have chosen yourself is a tell.
  Paired with a hard warning: student voice is highly sensitive, fingerprintable,
  clonable — "utmost care... strong preference for maximizing privacy and lowering risk,"
  offline models, zero-retention district rules.
- **Assignment designs**: student verifies the LLM's work; hand out a paste-in system
  prompt like a worksheet; require screen recording or full session export; require
  personalization (summer camp, this week's unit) — which doubles as a **privacy lesson**
  ("maybe you don't want to share pictures of your grandparents' place on the water that
  any AI could fingerprint the coordinates of").
- **The equity argument**, from personal memory: being told you were bad at art (and it
  being true); the classmate who discovered they were a talented sculptor only after school
  and wouldn't carry a brick of clay in their bag. "Existing barriers... a reflection of
  our society and socioeconomic structure." AI expands who participates — and ratchets from
  sketch → animation → 3D → game asset.
- **AI as a study / executive-function partner**: proactive practice runs, flashcards, pop
  quizzes; progress correlation ("5 flashcards an hour before → 30% over your last 3
  tests"); personalized MP3 recaps for the ride to school; learning that "after band
  practice is not a great time to shove in complex chemistry." Grounded personally: "as
  someone with ADHD, I can tell you having a personal assistant with all my needs at the
  tip of my finger."
- **Frontier image**: learning objectives written on the whiteboard *addressed to the
  agents* — "Tutor bot, help my students with..."
- **The ethical spine:** "This is a great deal of data with a great deal of power, and the
  value of the data has to be proven constantly. It is too much power to just have
  casually... There is no point just ambling through casual conversations, just dispensing
  answers. This has to be treated as a purpose built machine."

Status: (09-06) "We may drop the Skeptic's Guide, so that content can live in another
talks" → (09-07) "Retire/merge Skeptic's Guide into Outsmart and retire Skeptics."

### 6. The Future of Product Engineering

Dictated 09-05, "let's focus on the future of product engineering."

- **Conway's law still applies** across the whole org-size range — thousand-person shops
  with change-risk rubrics and prioritization committees at one end, sub-five-person
  startups shipping without meetings at the other. Every process on that range adapts in
  the AI age.
- **"The people that automate the right things are gonna be rewarded richly, and the people
  who trade out taste and good judgment for AI vibes are gonna suffer."**
- **Mimic or map each org function to an owner plus their agents**: product research bot
  (competitor scans, mention monitoring, web crawling — owning it yourself rather than
  renting a marketing platform's scraping); feedback ingestion with daily/weekly reviews
  for leadership.
- **Estimation is dead**: "I don't think I've heard an engineering team talk about level of
  effort on a ticket in months. No t-shirt sizing, points are just auto-assigned by
  agents." What remains hard is *what to ship*.
- Agents for gap analysis, usability defects, visual information hierarchy.
- **Extend past product/eng** into sales, marketing, analytics, e-commerce, Snowflake —
  agents that find opportunities, draft ads and videos into a proposal queue, auto-test
  them.
- **Targeted automated feedback loops**: cluster the users a request came from, find
  similar users, invite them into a flag-gated beta with honest opt-in warnings. "Even if
  you fumble a feature, the customers that were asking for it will probably appreciate
  seeing they're getting some attention to their screaming to the void."
- **Human-in-the-loop is placed where risk spikes**: all-users vs. a subset, expensive
  model calls, deploying new infra, and "even more risky, tearing down existing
  infrastructure."
- **Every experiment carries a hypothesis and a dashboard** — Datadog or just stats pushed
  to Slack; "it doesn't need to be a visual dashboard platform, but somewhere we can report
  success or failure or unexpected results or outcomes."

Predictions to weave in (09-07):

- **Software will need a steady or bursty stream of tokens "almost like gas/petrol"** to
  stay running, current, patched — plus defensive self-hacking sentry bots working 24/7 to
  out-race attackers. ("maybe make joke about having to be careful firing your security
  sentry bots, they know who you are!")
- **AI can't magically make software just work.** Throwaway software is fine for early
  adopters; "most folks are low tech, and they aren't turned on by the idea of vibe coding
  a recipe tracker, nevermind a Slack replacement."
- **The future is dynamic, adaptive, generated UI in real time** — and the real question:
  "should OpenAI & Anthropic end up fully owning every software channel?" Once they add
  real-time collaboration, who still opens email, Slack, Google Docs, Photoshop, DaVinci?
  "Does this mean all the software you've spent a lifetime with, learning, mastering, yet
  often fighting with, will all be irrelevant? Yes. At least as you know them."
- The aesthetic bet: "more likely Minority Report with a surprise revival of terminals...
  Thanks AI, skynet isn't so bad if I can keep my CLIs, eh?"
- **The real point:** "we (and by we I mean non-frontier-employed organic agents) have an
  opportunity to rethink any and every app as an AI native system. Just because GPT image
  is pretty good doesn't mean the story of image creation is owned by the big players, same
  across all industries."

### 7. Code Is Cheap, Judgment Is Expensive → Turn Your Thinkin' Tokens Up to 11

Renamed and reworked 09-08. The joke: "no increase in AI think will overcome its struggle
with novel situations, innate human judgement (and biases), taste."

- Code and features are near-free to generate, so **picking the features that delight**
  matters more than ever.
- **Change velocity is itself a risk.** Users don't live on your site; they take long gaps;
  if they must re-learn the product or their workflow shifts enough to upset them, "your
  rate of change alone lost a customer who otherwise may have loved the changes."
- "Humans are the slow part in the process — well, after Apple App Store Reviews, humans
  are the next slowest link in the chain."
- **Timing and pacing releases** takes inspired judgment plus data, user chats, "and a
  WHOLE LOTTA luck": what to release, to whom, in what sequence, batched or rolling,
  aligned with marketing/sales/support, while staying flexible enough to pull a feature
  forward to beat a competitor — and understanding the cost of that.
- **Prediction: apps put version selection as prominently as a dark-mode toggle or language
  picker.** Returning users see "*X days old version — click here to update or enable
  autoupdate*."
- This forces rethinking data and compute architecture for **semi-persistent, per-user
  deployed and versioned sandboxes** — solving some privacy problems while trading for new
  classes of security ones.
- **Personalized apps plus social feature flags**: users opt in readily, or set profiles to
  auto-enable flags used by similar users; an adaptive system customizes the app; users
  share settings "almost as a social network."

### 8. `llm://` — LLM Connection Strings (lightning talk)

A complete 8–10 minute outline was supplied 09-06, with a request for up to 3 alternate
decks at 5 / 10 / 15 minutes, 3–5 beautifully designed slides each.

- Thesis: "Treat an LLM connection like a database connection. Put the provider, model, and
  runtime configuration into one portable URI." The syntax isn't sacred; the abstraction is.
- Structure: DB config hell → AI configuration is becoming infrastructure → steal the
  connection string → URLs already solve portable/parseable/serializable/composable →
  swapping models should be boring → expressing failover → the secrets slide (deliberately
  controversial; `?credential=env:OPENAI_API_KEY` indirection) → "but every provider
  differs" (so do Postgres/MySQL/Redis — you standardize **the envelope, not every
  underlying capability**) → why it matters more in an agentic world → stop making every
  library reinvent serialization → "It started as a blog post. Now it's an Internet-Draft."
- Lines to keep: "We don't need to invent AI-specific YAML for something URLs have handled
  for 30 years." / "If models are becoming infrastructure, they need infrastructure-grade
  addressing." / "I wrote this because I was annoyed at my `.env` file. Apparently that's
  how standards begin." / Close: "Databases are infrastructure. Message queues are
  infrastructure. Object storage is infrastructure. Models are becoming infrastructure too.
  **Let's give them connection strings.**"
- Three demo moments: CLI swap with zero app changes; an eval matrix that is just a
  `models.txt` of connection strings; a router config (fast / reasoning / local).
- Later edits (09-06): "Drop the `ollama://` or `llms://` distraction, focus up the
  argument." Use real frontier-model examples from the llm-strings repo/site
  (`llm://openai/gpt-5.6-sol?cache=false`, `llm://anthropic/fable-5.1?cache=true`,
  `llm://openrouter/glm-5.3-flash?thinking=low&cache=true`).

### 9. Retrieval — "Three search methods in a fundable trenchcoat"

Retitled 09-07. Also (09-07): "Fix missing/private retrieval."

---

## Cross-Cutting Concepts

| Name | Definition, as stated |
|---|---|
| **Council of Guards** | Parallel multi-model judges exploiting their low output-token ratio to detect high disagreement / low alignment, choose between 1–3 parallel generations, understand the models you depend on, compare new models, and synthesize better outputs. |
| **Barrel-of-monkeys manoeuvre** | Leading with parallel generation — "we are adding a controlled section of chaos we'll have to handle in the next stage (revision loop, routing, user labelling / A/B test)." |
| **Fail-to-win loop** | The failure-improvement talk's spine. "I like that fail to win loop. As a double meaning." |
| **Agentic-wrapped everything** | Already happening in browsers with chat-driven actions and WebMCP; CLIs defaulting to natural-language args, requiring `--no-agent` to opt out of "the increasingly ubiquitous intermediary intelligence layer." Punchline: "I think we all know who to blame, the kids these days. Actually, the kids hate AI, it'll be their kids who demand an AI safety blanket on everything. I don't have to worry about it, I'll be in a rocking chair going on about how the internet was better on Vinyl." |
| **Model router pattern** | To be pulled in from Dan's own articles. |

Two explicit framing corrections issued 09-06:

1. "Never Build the Assistant That Has Everything" is **the wrong message.** "It is
   inevitable, but even lesser systems present an ongoing hazard. It's more about how
   dangerous combinations of tools can sneak up on any team because it's impossible to
   fully consider all the pathways an agentic system can take. Especially/exponentially
   every time it's given access to tools/SaaS integrations."
2. **Knight & Leveson is not applicable** — "we're not necessarily fixated on achieving
   correctness, nor fooled into thinking this might magically give us perfect results."
   With the standing defense: "This way of thinking isn't because I'm a shill for Big
   Token, it's because you need to apply different ways of building and thinking in order
   to get to cheaper or better/safer or faster in ways that seem completely at odds with
   yesterday's engineering axioms and wisdom."

Standing note that parallel generation "borders between speculative learning and
speculative optimization. Yes, possibly? Or probably sometimes? We'll certainly find out!"
Plus the practical rule: never ship this behavior without env-var control, and ideally
build adaptive systems that tune their own token burn.

Citations requested: **Bainbridge's *Ironies of Automation* (1983)**, and "any appropriate
citations" of that kind.

---

## Voice, Titles, and Editorial Standards

The most consistent thread in the history, and the angriest.

- (05-21, founding rule) "**Never make me sound like a LinkedIn post hyperventilating at
  every turn. Never generate AI Corporate Speak.**" The specific shape called out: the "The
  old model was X. That model is finished." construction. "I don't care about the old model
  vs. new model!"
- (09-06) "Jesus, these titles are some of the most terrible soulless garbage i've ever
  read. Try again, but this time with exceptionally funny & incisive writing skills!"
- (09-06) "'The Your Eval Suite has a Grandfather' is bland and boring, gpt came up with
  it."
- (09-07) "The titles of the shorts are still kinda blah." Worked example: *"Run Your LLM
  Judge Five Times. Then Feel Something."* → **"Run the Judges"** (music ref) or **"Judge
  until it hurts (your budget)."** Then: "with that brilliant and refined taste, can you do
  better... and after you're done, distill your learnings and update my blog/writing
  skill(s) with better taste."
- (09-07) "add if useful any nuance and flavor of my naming/wording style in my voice/skill
  related files."
- (09-06) "Fix all this slop, restore/gift its soul!" — on the two engineering talks, which
  "share one disease."
- Standing modifier on nearly every rewrite request: "**Maintain my voice & /unslop it.**"
- The **title vs. load-bearing statement** distinction is explicit and load-bearing itself.

---

## Format and Asset System

Full packet spec (09-05), in stated priority order:

1. **Reusable talk packet per talk** — short title plus 2–3 alternatives; 50/100/250-word
   abstracts; three concrete learning outcomes; intended audience and prerequisites; three
   practical takeaways; an explicit "not a product pitch" statement.
2. **Multiple duration variants** — 5–10 min lightning / live demo, 25–30 min standard,
   40–45 min conference, 60–75 min workshop. 30/45/60 appear most often. **AI Tinkerers
   requires a genuine working demo, not compressed slides.**
3. **Evidence bank** — firsthand examples with problem and operating context, what Dan
   personally built or changed, what failed, before-and-after measurements, architecture
   diagrams or screenshots, what remains uncertain, and whether the org can be named
   publicly. Especially important for GIDS, PlatformCon, AI Agent Event, SREcon, and
   practitioner events.
4. **Speaker identity kit** — 50/100/200-word bios, square and landscape hi-res headshots,
   title/affiliation, website plus LinkedIn plus socials, pronunciation and pronouns if
   desired, Denver location and travel willingness, past speaking list.
5. **Public recording** — a strong 15–30 min recording with clear audio, captions, stable
   public URL; plus a separate five-minute technical-demo reel for meetup and AI Tinkerers
   routes.
6. **Supporting references** — 3–5 credible refs per education or research-adjacent talk;
   Lilly, academic-integrity, instructional-design and architecture programs expect
   literature support.
7. **Audience-specific variants** — engineering practitioner, engineering
   leadership/product, education/instructional design, executive/general tech. "Reusing the
   same abstract unchanged across these audiences would weaken the applications."

Plus:

- **Canonical file rule (09-08):** "The canonical complete full length talk should be in an
  `index.md` in the talk folder."
- **Shorts (09-06/07):** "Add a 'shorts' folder with markdown outlines of 1-10min sized
  ideas/concepts." Sourced by identifying "the strongest candidates for short form
  presentations: lightning talks (5min, 10-15min ish), short youtube vids 1-5min" — with a
  top 20–25 list of titles and descriptions.
- **Bullet outlines** per talk (09-08).
- **Consistency enforcement (09-07):** "review the smaller/alternative format files...
  ensure they align with the latest longer-form/original/main editorial revisions &
  clarifications. Ensure they clearly hit on the best angle, argument or arc." And:
  "Tighten up the focus on those long talks, and retime. Add missing CFP copy."
- **Bio hygiene:** no longer at MagicSchool; use resume files; "The short bios don't need to
  be littered with details like that"; and "remove mentions of discrepancies in my
  bio/resume, not for committing to git!"

---

## Deck and Visual Design

- (09-05) "Vary and adapt slide counts to content, prefer a fluid flow, natural-to-energized
  pacing. Include any image gen one-shot prompts per slide (in comment?)."
- (09-08, the rejection) "The reveal.js slide decks look like the worst slides i've ever
  seen for the most incoherent assemblage of ideas, painfully dull and confusing list after
  list, also **completely devoid of visual meaning, abstract/simplification, comparison,
  illustration**."
- (09-08, the replacement rule) "we want to do this with your brilliant ai tokens claude,
  **not cookie-cutter bulk slide scripts!!!** Each slide deck should ultimately have a
  unique & well thought out **color palette, font(s), information hierarchy, rhythm, tone
  matched to the audience**." Hand-authored, art-directed, per-deck visual identity, no
  templates.
- Visuals get audited individually: "wtf is happening in the queue.svg visual??" → "can you
  clean it up?"

---

## Tooling and Repo Hygiene

- (09-08) "should we get rid of any scripts for generating slide/deck files?" → "**get rid
  of the scripts for doing anything for talks, get rid of the deck commands/scripts! Delete
  anything calling them!!!!!**"
- (09-08) "i don't want `build-talk.ts` - useless. also, the http server, why the fuck did
  you add such noise to my git when there are 10 lower impact paths, ffs, **you are
  literally already in a web project**."
- (09-08) "What in gods name are 'on-stage demo fixtures'..." — inherited scaffolding gets
  deleted, not preserved.

---

## Companion Code Project (agentic-parallelism)

- (09-05) Plan a standalone mini example project with a local, minimal Mastra agent —
  observability, memory, feedback, datasets/evals/experiments. "Focus on the agent
  composition, use mock/fake auth via query-string based userId." Snippets per concept,
  single scripts of 600–1000 lines, imports to organize the largest chunks first.
- Plans for **Mastra, AI SDK, and LangChain.ts** covering the five verbs, plus A2A remote
  resources, work/task router, dynamic infra, parallel tool calling and batching.
- (09-07, the readability constraint) "this isn't like a 12-factor production app. It's more
  important that we make it **understandable and readable**." Inline model names, config and
  system instructions — no env vars in the way, no indirection, no extra layers. Snippets
  must "fit on my blog on a screen without scrolling too much," and **column width ~53–60
  chars**, no horizontal scroll — set biome / the linter to enforce it. "Combine the business
  advice profiles and files"; agents defined inline, "artificially short," plausible rather
  than production-real.
- Prefer native framework features over hand-rolled wrappers (dropped `withFallback`); open
  question raised on whether Agents/SubAgents/Networks can handle provider fallback.

---

## Working Process

- **"Roast" is the review verb.** "roast/critique my parallelization talk"; "roast and
  critically review my latest talks' content, argument & structure"; "Critically review and
  audit my latest talks, use a subagent per talk, **make it inspired & brilliant**."
- **Parallel subagents, one per talk, capped** — "up to 3 at a time."
- Review then apply: "reconsider the recent `*.review.md` and apply the top improvements to
  each talk and all its assets/artifacts."
- Drop cruft: "Consider dropping out of scope cruft from the original checkin."
- Terse continuation commands: "keep going, update all related assets" / "resume" / "just
  keep marching" / "try now."

---

## Known Gaps

- No surviving user message originates the conference-research / ranking work
  (`speaking-opportunity-research`). The earliest retained transcript already assumes
  `speaking-portfolio-expanded` exists, so that prompt predates the available transcripts.
- Conference targeting appears only implicitly, via the 09-05 packet spec: GIDS,
  PlatformCon, AI Agent Event, SREcon, AI Tinkerers, Lilly, plus Denver-local and
  academic-integrity / instructional-design programs.
