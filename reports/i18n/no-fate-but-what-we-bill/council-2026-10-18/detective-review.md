# Council of Dans — Detail Detective

Reviewed 2026-10-18. Read-only review of index.mdx and four adjacent SVGs. No tracked files edited. Verdict: high-priority factual corrections required; no critical finding.

## High importance

### H1 — METR task horizon is presented as agent runtime

Locations: index.mdx:40–51, 76–79; capability-curves.svg:20–21,32–37.

METR explicitly defines time horizon as human expert completion time at a stated predicted reliability, not elapsed autonomous agent runtime. The article uses this to establish multi-hour continuous autonomy, and omits that the usual trend is at 50% success. The current FAQ also says its series stopped updating September 8, 2026 and estimates above 16 hours are unreliable. A conceptual chart disclaimer does not repair incorrect measured anchors.

Fix: define the metric accurately, name 50% success and bounded software-task suite, identify the seven-month estimate as the original historical fit, remove the unsupported four-month numerical fit unless linked to its precise analysis, and distinguish implications from observations. Actual multi-hour operational examples can instead be attributed to Anthropic's report (PDF pp.9,11), which gives 1–4-hour and 2–6-hour examples. Remove the claim that the next generation necessarily compounds. Update SVG labels, and mark the duration × breadth illustration hypothetical.

Evidence: https://metr.org/time-horizons/ (definition and FAQ), https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ (original trend).

Rejected: deleting the endurance argument. Growing task complexity is useful evidence; it needs the correct units and uncertainty.

### H2 — Campaign evidence is stronger in some ways, narrower in others

Locations: index.mdx:58–69; capability-curves.svg:22,33–34.

The linked /news/disrupting-GTG-1002 URL was inaccessible; the canonical report is /news/disrupting-AI-espionage. Anthropic describes deliberate jailbreaking, misleading defensive-testing personas, and retained human authorization decisions. Saying someone merely asked omits the mechanism. Roughly thirty campaign targets is not a measured peak concurrency of dozens of subagents. The PDF supports subagents and multiple simultaneous targets, but does not supply that concurrency count. Nor does it document eight hours against thirty targets. The SVG also places its 2025 event at the 2028 x-position.

Fix: attribute the account to Anthropic, describe custom orchestration and guardrail evasion briefly, state thirty attempted targets and limited successes, retain human critical decisions and model errors, and replace concurrency claims with the reported multiple-target parallelism. Fix source URL. Separate hypothetical 8-hour scenarios from campaign observations and remove dates from conceptual x-axis or reposition its dated anchor.

Evidence: https://www.anthropic.com/news/disrupting-AI-espionage ; https://assets.anthropic.com/m/ec212e6566a0d47/original/Disrupting-the-first-reported-AI-orchestrated-cyber-espionage-campaign.pdf (pp.6–9).

Rejected: dropping the campaign or asserting no subagents; the full report explicitly documents them.

### H3 — Theft does not disable quotas or all safety controls

Locations: index.mdx:89–101; who-pays.svg gates/net-result/footer.

The central claim lumps price deterrence together with usage caps, authorization, and abuse detection and says they have no answer to stolen access. This is false: quotas still constrain the compromised account, authorization scopes still bound stolen credentials, and abuse detection may revoke access. AWS documents request/token quotas at account/model/Region scopes. The premise should be that stolen access transfers the inference bill and undermines price as deterrence, not defeats all gates.

Fix: narrow to pricing incentives, explicitly retain permission limits, quotas, budget monitoring and abuse detection as defenses, and change both prose and diagram. 'Attacker pays $0' should be 'Victim pays inference bill': acquiring credentials and operating campaigns can still cost attackers money.

Evidence: https://docs.aws.amazon.com/bedrock/latest/userguide/quotas-runtime.html ; https://www.sysdig.com/blog/growing-dangers-of-llmjacking .

Rejected: removing the cost asymmetry, which is the strong, supported core of the article.

### H4 — Probability graphic makes an incorrect directional claim and invents empirical evidence

Locations: index.mdx:120–129; swarm-odds.svg:13,36–40.

The four printed rounded probabilities are correct. However the SVG says independence is 'generous to the defender'. This is not generally true: perfectly correlated attempts give aggregate success p rather than 1−(1−p)^n; shared vulnerabilities and shared failure modes can reduce effective independent trial count. 'MOST SWARMS LIVE HERE' presents an unsupported distribution. '1 human ... every time' and zero-cost/no-human attacker triage contradict automation on defense and the cited campaign's human oversight. The drawn Bezier curves are approximations, not actual plotted formula samples.

Fix: retain formula and values as independent, equal-p illustrative trials; explicitly state correlation and defensive adaptation change results. Remove empirical swarm band and blanket human-cost assertions, describe potential triage burden, and plot formula-derived samples if retaining a quantitative chart. Do not equate benchmark capability mechanically to intrusion p.

Rejected: discarding probability section. It teaches a valid accumulation effect once the assumptions are honest.

### H5 — Persistent-text scenarios and defenses are stated as universal facts

Locations: index.mdx:136–154,171–189; defense-layers.svg all four badges.

An agent system can have persisted state, run code and create ordinary backdoors; 'stateless interpreter' describes neither all agents nor all their persistence. The cited campaign itself created persistent accounts and stored cross-session state. 'None ... hypothetical' provides no source for cleanup-triggered resurrection. Textual injection can persist, but that does not imply every guideline is obeyed, no beacon exists, or no standing access means no persistence. Fresh credentials issued to a compromised legitimate agent can still execute persisted malicious instructions. 'Detect edits, not executions' also discards valuable runtime evidence.

Fix: frame text poisoning as an additional persistence route with prerequisites, cite research or label the cleanup scenario hypothetical, retain both configuration and execution monitoring, and replace absolute 'STOPS' badges with 'reduces/limits' wording. Explain that short-lived credentials reduce credential exposure but do not clean poisoned trusted inputs. Response ordering should be conditional on identifying reactivation mechanisms rather than a universal rule.

Evidence: https://www.anthropic.com/engineering/how-we-contain-claude (persistent memory poisoning and layered containment); Anthropic campaign PDF pp.7,11–12 (state and conventional persistence). Repository explicitly requires nonabsolute security language.

Rejected: deleting persistence section. This is an important attack surface when framed as conditional threat modeling.

## Lesser findings

- index.mdx:83–87: original Sysdig link was inaccessible in browser tool. Use a verified canonical URL and add the September 2024 follow-up supporting $100k+. Those are historical modeled potential daily costs, not measured victim invoices or current pricing. https://www.sysdig.com/blog/growing-dangers-of-llmjacking supports the later estimate.
- Add verification date, consistent with repository editorial rules for fast-moving AI/security claims.
- Figure labels and captions need reconciliation with every substantive prose correction; leaving any of the four unchanged preserves the factual errors.
