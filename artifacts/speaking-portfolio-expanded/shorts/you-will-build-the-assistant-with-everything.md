# Sorry, You're Building It

6 min · lightning · parent: [Conjure Exactly Enough](../talks/adaptive-systems/index.md), slides 3, 4, 5

It's coming one integration at a time and you can't opt out. The hazard isn't the tool count. It's the pathways.

## Hook (0:00)

Open with [`--no-agent`](no-agent.md) compressed to forty seconds: browser chats, WebMCP, CLIs taking English, the kids, the rocking chair. Then: so here's the actual hazard, and it applies to the small systems too.

## Beat: pathways, not tools (1:00)

Count the possible read-to-write pairings. Assume five read tools and five write tools, all allowed to connect: twenty-five. Add one SaaS with six reads and six writes: eleven times eleven, a hundred and twenty-one. Ninety-six new pairings from one integration. Those are potential routes before policy filtering, not ninety-six proven exploits. Nobody reviews the combinations. The dangerous pairing is never on the roadmap. It gets discovered.

## Beat: accidents first (2:15)

Most of the damage will be accidents: a confident mapping, a helpful cleanup, a tool called with the wrong ID. Then the people who mean it: a vendor payload is untrusted input now read by something that can act. A renamed field can carry a sentence aimed at the model.

## Beat: keep the live set countable (3:00)

So the question isn't whether to give access. It's how many pathways are live at once. An orchestrator reads the job and conjures a small agent for it: tailored prompt, the two or three tools it needs, a hard budget, a stop condition. A schema-diff agent gets two samples and a contract. It does not get the database. If it needs more, it asks; policy decides; the request is logged either way. That log of denied requests taught me more about my own permissions than any audit.

## Beat: two guards (4:15)

Tools come in risk classes: read is cheap; write, send, pay, delete, deploy, export each need their own approval, and a job gets at most one. And an agent that reads customer data and an agent that posts to a vendor are two agents with a filter between them, because that's where leaks happen: not through a malicious model but through a tool result flowing into the next tool call.

## Landing (5:15)

The big assistant still exists. It just never has all of its hands full at the same time. Not one agent holding every combination, which nobody can check. Many small ones you can afford to.

## On screen

`5 reads × 5 writes = 25 → 11 × 11 = 121`: one SaaS adds six reads and six writes, 96 potential pairings before policy filtering. Then a single small box: *this job: 3 tools, 2 minutes, $2.*

## Source

Saltzer and Schroeder (1975), least privilege, principle (f). The per-job generator is Dan's prototype; no success rate is claimed.

## Story slot

The tool pairing you only noticed after it fired.
