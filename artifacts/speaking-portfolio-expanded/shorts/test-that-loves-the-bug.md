# The Test Who Loved Me

2 min · video · parent: [Code Is Cheap. Judgment Is Expensive.](../outlines/judgment-40min.md), slide 9

Two confident artifacts, identically wrong, and a green check between them.

## Hook

Here's the implementation. Here's its test. Would you approve it?

```ts
canEdit(user) = user.roles.includes("admin")
// test: admin user → allowed → PASS
```

## Beat: the case nobody asked

The admin belongs to tenant A. The resource belongs to tenant B. The function says yes. The test never asked. It was accurate about the behavior it checked, and the behavior was incomplete in exactly the same way as the code, because the same model wrote both from the same missing sentence in the ticket.

## Beat: why the green wins

Bainbridge asked what automation leaves the human doing. Automation-bias experiments show people defer to the aid even against other evidence. In a review queue the green check gets the attention; the missing case didn't get a check at all. It couldn't. Nobody wrote it.

## Landing

The agent doesn't get to write the only exam it sits. Hold out the cross-tenant case under separate control, and require the behavioral cases in the ticket before generation, not after the diff.

## On screen

The three lines above, then `admin@tenantA edits resource@tenantB → allowed`. Then: **PASS**, in green, slightly too big.

## Source

Bainbridge (1983), Ironies of automation. Mosier and Skitka (1999), Automation Use and Automation Bias.

## Demo

`bun artifacts/speaking-portfolio-expanded/packets/judgment/demo.ts` for PASS, then `--holdout` for the failing assertion.
