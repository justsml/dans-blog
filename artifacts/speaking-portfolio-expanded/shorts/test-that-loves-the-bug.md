# The Test Who Loved Me

2 min · video · standalone. Retired parent: *Code Is Cheap. Judgment Is Expensive.*, slide 9, reworked into [Turn Your Thinkin' Tokens Up to 11](../talks/judgment/index.md) on 7 September 2026. The fixture travels with the short.

Two confident artifacts, identically wrong, and a green check between them.

## Hook

Here's the implementation. Here's its test. Would you approve it?

```ts
canEdit(user, resourceTenant) = user.roles.includes("admin")
// test: admin user → allowed → PASS
```

## Beat: the case nobody asked

The resource tenant is right there in the signature. Nothing reads it. The admin belongs to tenant A, the resource belongs to tenant B, the function says yes, and the test never asked. It was accurate about the behavior it checked, and the behavior was incomplete in exactly the same way as the code, because the same model wrote both from the same missing sentence in the ticket.

## Beat: why the green wins

Bainbridge asked what automation leaves the human doing. Skitka and colleagues ran a flight simulator with an automated monitoring aid and scored the trials where the aid was wrong: people missed what it failed to flag and acted on prompts the other instruments contradicted. In a review queue the green check gets the attention; the missing case didn't get a check at all. It couldn't. Nobody wrote it.

## Landing

The agent doesn't get to write the only exam it sits. Hold out the cross-tenant case under separate control, and require the behavioral cases in the ticket before generation, not after the diff.

## On screen

The three lines above, then `admin@tenantA edits resource@tenantB → allowed`. Then: **PASS**, in green, slightly too big.

## Source

Bainbridge (1983), Ironies of automation, Automatica 19(6). Skitka, Mosier and Burdick (1999), Does automation bias decision-making?, IJHCS 51(5), 991–1006 — a flight-simulation task, not a code-review trial.

## Demo

Type the three lines, assert that a tenant-A admin can edit tenant A, show PASS. Then add the tenant-B assertion and watch it fail.
