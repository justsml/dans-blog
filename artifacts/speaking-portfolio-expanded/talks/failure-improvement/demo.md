# Supporting example: nothing leaves without evidence

The implementation belongs in the standalone `mastra-agent-lab` repository. The talk uses captured output from it; the repository is supporting material, not a stage dependency.

| Step | Action | Evidence |
| --- | --- | --- |
| 1 | Read the fixture log and distill it | Input count, family counts, first and last seen, redaction |
| 2 | Classify and route | Ticket-shaped artifact with its evidence trace |
| 3 | Execute regression and unchanged holdout | Regression passes, holdout fails, promotion held |
| 4 | Run an unexplained permission failure | Unknown result held for a person |
| 5 | Rerun collection | Stable incident key; known case; no duplicate artifact |

The slide shows the regression result, the failed holdout, and the unknown classification. The repository carries the commands, fixtures, and full output. Repair the candidate, never the holdout to force a pass.

## Validation
