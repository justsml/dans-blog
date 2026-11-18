# ADR 0001: Billing periods

Status: accepted

Each subscription has a billing anchor: the moment its first paid period started.
Periods run anchor to anchor (calendar months for monthly plans), and nothing except
renewal moves `currentPeriodStart` / `currentPeriodEnd`.

Trials are a period of their own. A trialing subscription is not invoiced; its first
invoice is the renewal at `trialEndsAt`.
