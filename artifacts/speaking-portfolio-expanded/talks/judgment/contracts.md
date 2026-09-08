# Rubber-stamp fixture

The demo contains a deliberately incomplete authorization predicate. It is synthetic, offline, and makes no model calls.

```ts
const canEdit = (user, resourceTenant) => user.roles.includes("admin");
```

The first assertion allows an admin in A to edit A. The held-out assertion denies that same admin an edit in B. The implementation ignores the resource tenant, so the first assertion passes and the second genuinely fails.

Run `bun artifacts/speaking-portfolio-expanded/packets/judgment/demo.ts`, take the vote, then run it with `--holdout`. Exit 1 is the intended failed gate. Do not display the second case before the vote. If someone spots the bug, have them identify the missing invariant rather than pretending the room approved it.

A repaired predicate must check tenant-scoped authority. This fixture does not implement role revocation, audited writes, or a complete authorization system.
