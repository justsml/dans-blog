# billing

Subscriptions and invoices for the SaaS product.

- `data/plans.json`: the price list. Each plan has a fixed currency.
- `src/plans.ts`: plan lookup.
- `src/subscription.ts`: the subscription record and its lifecycle (trial, renew,
  cancel).
- `src/invoices.ts`: the invoice issued at the start of each billing period.
- `docs/adr/`: decisions about how we bill.

A subscription's currency is fixed when it is created, because it decides which tax
registration its invoices are issued under. A customer who needs another currency gets
a new subscription; we never move an existing one between currencies.

Times are epoch milliseconds (UTC). Money is integer cents.
