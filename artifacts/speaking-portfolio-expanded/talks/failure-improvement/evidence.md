# Evidence and claim boundaries

Revised 2026-09-06 for the fail-to-win-loop arc. The loop's ordering (logs, enrichment, scheduled check, distill, classify, tickets, PRs, the evidence gate, the reviewer, compiled scripts, feedback, correlation, metrics) is Dan's design position drawn from practice. It is not an attributed research result.

| Claim used | Evidence | Boundary |
| --- | --- | --- |
| Coding agents can be given tool access through MCP servers, APIs, and CLIs, including observability and cloud platforms. | [Model Context Protocol specification](https://modelcontextprotocol.io); vendor MCP documentation for the platforms named on slide 3 | The specific MCP servers, their tool coverage, and their auth models change; verify each named platform before delivery. Do not claim a platform has an official MCP without checking. |
| Hooks and skills provide deterministic points and on-demand instructions in an agent loop. | [Claude Code hooks reference](https://docs.claude.com/en/docs/claude-code/hooks); [Agent Skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) | Vendor documentation. The talk says harness modifications help but are not required; that is a design position. |
| Scheduled workflows can run an agent out of band. | [GitHub Actions schedule trigger](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#schedule) | Any scheduler works; GitHub Actions is an example. |
| Agent evaluation combines code, model, and human graders; a successful transcript is not proof of a correct fix. | [Anthropic, Demystifying evals for AI agents, January 9, 2026](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Vendor engineering guidance, not a controlled comparison. |

## Claims that need a Story line or get softened

- **E2E cost savings from selective test runs.** The outline makes no measured cost claim; slide 10 says only that cheap selection must be compared against the full suite on retained changes. Do not add a number unless [evidence bank candidate 2](evidence-bank.md) is filled with a measured comparison.
- **Cheap models handle short multi-step tool calls.** No model names are spoken. Name only models you have run on this workload, and give the observed cost per session or none at all.
- **Agent-opened PRs merging.** Say "into a review queue," not "merged automatically," unless candidate 1 or 4 supplies a merged example.
- **Proactive notices and credits.** Described as what the loop can do. Do not imply a deployed system issued credits.

## Supporting-example boundaries

The planned supporting repository normalizes two connection errors, proposes a scoped readiness check, and requires regression, holdout, and scope before promotion. Permission denied stays unknown. All cases are authored fixtures. The talk uses captured output and does not claim production results.

## Claim hygiene

- Language models are easy to steer by whoever supplies the input. Never let the loop be the caller for money, deletion, or customer messaging; a person presses the button. Say this on slides 8 and 12.
- Untrusted log or feedback text is data, never instruction. A rage comment that says "refund me" is a classification input, not a command.
- Do not turn "low lift" into a time or cost estimate for someone else's system.
