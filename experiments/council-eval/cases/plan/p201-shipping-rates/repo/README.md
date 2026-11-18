# storefront-shipping

Checkout totals and parcel packing for the storefront. Everything ships from the
Columbus, OH warehouse with one ground carrier.

- `src/catalog.ts`: products, prices, and per-unit weight and size.
- `src/packaging.ts`: picks a box for a set of order lines and works out the parcel
  that goes to the carrier.
- `src/checkout.ts`: order totals shown on the review page.
- `data/zones.json`: the carrier's zone chart, keyed by destination ZIP prefix. Most
  entries are one digit, but Puerto Rico, Hawaii, and Alaska have their own
  three-digit entries, and a more specific prefix always takes precedence over a
  shorter one.
- `data/rates.json`: the carrier's current price list per zone. Finance updates it
  when the carrier sends a new rate card.
- `docs/carrier-rate-card.md`: how the carrier bills a parcel.

All weights are grams, all lengths centimetres, all money integer cents.
