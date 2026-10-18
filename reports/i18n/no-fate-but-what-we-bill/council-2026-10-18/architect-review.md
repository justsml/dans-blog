# Architect review — No Fate But What We Bill

Reviewed 2026-10-18. Scope: English article and four adjacent SVGs. Read-only review of tracked files. No critical findings; seven high-priority corrections needed before publication. Line numbers refer to the original review snapshot.

## High priority

### A1. METR measures human task duration, not agent runtime

`index.mdx:40-51`, `capability-curves.svg:20-21,26,32-37`.

The argument turns a human-expert task-duration benchmark into literal hours of autonomous agent work. METR defines its horizon at a specified success rate using how long humans take; that does not establish an agent's wall-clock endurance. The figure compounds the confusion by calling eight hours a benchmark number. Correct the definition to human-expert time at 50% success, distinguish elapsed agent runtime, and present the historical curve as evidence of increasing task complexity rather than a runtime measurement. Make extrapolation conditional. Reject simply adding “wide error bars”: that cannot repair a unit mismatch.

Source: [METR original report](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/).

### A2. Campaign target count does not establish concurrency or an exponential breadth curve

`index.mdx:58-79`, `capability-curves.svg:22,33-37`.

Thirty targeted organizations is treated as dozens of concurrent subagents under one orchestrator, then as an eight-hour operation and a measured anchor for future doublings. These are different quantities. Anthropic reports groups of orchestrators and agents, roughly thirty targets, substantial automation, and retained human decision-making; the article invents concurrency and duration. Say what the report supports, attribute to Anthropic, and label duration × breadth as an illustrative workload model with coordination/resource constraints. Remove “three doublings later,” eight-hour GTG attribution, and the assertion that security review universally scales linearly. Reject discarding the incident entirely: it still supports practical orchestration.

Source: [Anthropic full report](https://assets.anthropic.com/m/ec212e6566a0d47/original/Disrupting-the-first-reported-AI-orchestrated-cyber-espionage-campaign.pdf).

### A3. Stolen billing authority does not disable all capability/access controls

`index.mdx:89-101`, `who-pays.svg:15,68`.

“Every” gate assumes a paying attacker and “no answer for a tenant” erase quotas, scoped authorization, abuse detection and revocation. They also contradict the cited campaign being disrupted. Narrow to economic deterrence: stolen credentials shift model charges to the victim while remaining subject to the stolen principal's permissions and provider controls. Relabel $0 as “model charges shifted to victim”; acquisition, infrastructure, operator and detection costs remain. Reject replacing this with generic risk hedging: preserve the specific economic insight.

Source: [Amazon Bedrock quotas](https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html), plus Anthropic's account bans in its report above.

### A4. Probability example is being sold as an empirical inevitability

`index.mdx:110-129`, `swarm-odds.svg:10,13,36-40`.

The arithmetic is correct for independent attempts at fixed p, but “MOST SWARMS LIVE HERE” has no empirical basis. Independence is not inherently “generous to the defender”: perfectly correlated attempts leave the success probability at p regardless of n. “No human triage” versus “1 human ... every time” is also unsupported. Keep illustrative numbers; state that shared model errors, common target defenses, rate limits and detection invalidate naive extrapolation. Remove empirical region label and zero-cost/human-per-attempt claims. Describe benchmark improvements as potentially improving attack capability, not directly measuring intrusion p. Reject deleting the formula: it is useful when its assumptions are explicit in both prose and figure.

### A5. Persistence section conflates inference with the whole agent system and observations with scenarios

`index.mdx:136-158`.

Calling an agent stateless conflicts with the very memory, filesystem and scheduler state described afterward. Text copying alone is not successful replication: future ingestion, instruction-following, permissions and tool execution are prerequisites. “None ... hypothetical” requires evidence for each specific scenario, especially cleanup-induced reactivation; none is provided. Rewrite as: individual model calls may be stateless, but agent systems persist state; malicious instructions can survive in that state and influence later authorized runs. Mark cleanup/reconciliation behavior as a conditional threat-model scenario unless a specific incident is cited. Reject calling all injected text “executed”: the trust-boundary crossing needs explanation.

Sources: [Anthropic context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Anthropic NIST agent-security submission](https://www-cdn.anthropic.com/43ec7e770925deabc3f0bc1dbf0133769fd03812.pdf). The latter distinguishes red-team/research vectors from observed incidents.

### A6. Credential advice promises prevention that the article's own mechanism bypasses

`index.mdx:171-174`, `defense-layers.svg:14-16,24,32,40`.

“No standing access, no persistence” is false when a legitimate scheduled agent obtains a fresh short-lived token and rereads a poisoned durable artifact. Short-lived credentials limit exposure but do not remove the principal's persistent authority or clean stored prompts. Use defense-in-depth wording and add least privilege plus tool/action authorization outside model instructions. Preserve short-lived federation as a useful control. Replace all figure “STOPS” guarantees with concrete risk-reduction labels. Reject retaining the absolute promise as rhetorical shorthand: it contradicts the central example and repository security-prose requirements.

### A7. Edit monitoring must supplement execution and spend telemetry

`index.mdx:181-190`, `defense-layers.svg:29-39`.

“Detect edits, not executions” tells readers to omit the telemetry needed to see the article's principal billing threat; LLMjacking need not edit victim configuration at all. Explain monitoring both durable-state changes and actual API/tool actions, inference usage/spend anomalies and suspicious destinations. Incident response should first contain compromised identities/runners and preserve evidence, then disable malicious triggers/reconciliation before cleaning durable payloads. Make cleanup-as-tripwire conditional. Reject an exhaustive incident response runbook: a few concrete sentences repair the actionable guidance.

## Lesser observations

- `index.mdx:7`: `draft: true` means production deployment will not publish this article. Coordinator should explicitly reconcile intended publication state; do not call it published while this remains true.
- `index.mdx:205-208`: add verification date and primary sources for persistence; current source tail does not cover that section.
- Links to Anthropic's named news path and Sysdig's `llm-jacking` path were inaccessible through the web tool. Use confirmed canonical primary-source links rather than assuming this proves the URLs broken.

## Rationale and alternatives

Keep the thesis that longer useful tasks, orchestration and externalized compute costs can increase attacker capacity. The fixes separate measurements, reported observations, illustrative models and hypothetical persistence scenarios. I rejected a full rewrite or stripping the Terminator framing: neither is needed to make the security argument defensible. The seven findings are publication-blocking because they alter what the evidence establishes or what defensive controls readers would implement.
