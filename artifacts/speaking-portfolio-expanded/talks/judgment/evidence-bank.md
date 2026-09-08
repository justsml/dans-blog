# Evidence: Turn Your Thinkin' Tokens Up to 11

Sources were checked 7 September 2026 and are attached to the canonical outline. This bank records what each one does *not* establish.

**Feature fatigue.** Thompson, Hamilton and Rust (2005) is consumer-product research: capability dominates choice before use, usability dominates satisfaction after use. It is not a study of software release cadence, and the inference to SaaS is mine. Kano et al. (1984) is a classification model, widely applied and rarely validated as a predictive instrument; the decay of delighters into expectations is the model's claim, not a measured longitudinal result.

**The cost of change.** Samuelson and Zeckhauser (1988) and Kahneman, Knetsch and Thaler (1990) are decision-research results about ownership and defaults, not about user interfaces. Nielsen's recognition-over-recall heuristic is a design heuristic, not an experiment. Memory decay across a session gap is real — see Murre and Dros (2015), *Replication and Analysis of Ebbinghaus' Forgetting Curve*, PLoS ONE 10(7) — but that work uses nonsense syllables and a single subject, so it supports the direction of the effect and nothing about its size in a product.

**The two tracks.** The absorption diagram is an illustration with internally consistent arithmetic: 46 releases across 90 days on roughly an every-other-day cadence, sessions on days 3, 19, 61 and 88, so exactly 21 releases fall in the 19-to-61 gap. It is not telemetry from any product. DORA's four keys (Forsgren, Humble, Kim, 2018) measure delivery performance; the claim that they do not measure user absorption is a statement about their definitions, not a criticism of the research.

**The plan-space arithmetic.** 720 × 729 = 524,880 is exact. The per-arm figure uses n ≈ 16·p(1−p)/δ², a standard sizing heuristic approximating 80% power at α = 0.05; it is not a derivation and the talk says so. Benchmarks owns instrument validation and small-sample inference.

**Reasoning budgets.** Chollet (2019) is a definition and a benchmark proposal, not a measurement of any current model. The *Illusion of Thinking* exchange is presented as contested: the Apple paper reports collapse past a complexity threshold and declining token spend near it; the rebuttal (arXiv:2506.09250) argues that output-token limits and one unsolvable River Crossing instance account for much of it. Deliver both, take neither as settled. The load-bearing claim is weaker and does not depend on the outcome: the model has not met your users.

**Predictions.** Slides 10 and 12 are labeled as predictions once, on slide 1 and again on each slide. No adoption figure, no company, no timeline is asserted. The privacy-versus-patching trade on slide 11 is an engineering argument, not a measured comparison. Hyrum's law is an observation about interface consumers with no study attached.

**Choice overload.** Iyengar and Lepper (2000) is cited in order to be set aside: Scheibehenne, Greifeneder and Todd (2010) meta-analyzed roughly fifty published experiments and found a mean effect near zero. Do not use the jam study as support for anything on stage.

**Unfilled stories.** Slide 1: the feature you were proudest of that a long-absent customer met as a broken workflow — bring the ticket, the session gap, and their words. Slide 7: the release you pulled forward to answer a competitor — bring what slipped, what support absorbed, and whether it worked. Both remain unfilled; no personal anecdote was invented.

**Audience and boundaries.** Product engineers, engineering and product leaders, founders, and anyone who owns a release calendar. Product Engineering owns coordination cost, agent interfaces and human ownership inside the org; this talk stays out of the org chart and owns the decision about what reaches users and when. Adaptive owns runtime repair and per-job agent generation; the personalization prediction here is about a user-facing configuration surface, not about an agent rewriting the app at runtime. Free Tier owns cost per accepted outcome.
