# shop

Cart and checkout for the storefront. Customers mostly shop on phones.

- `src/catalog.ts`: products and prices.
- `src/cart.ts`: cart contents and totals.
- `src/checkout.ts`: hands the cart total to the payment provider.
- `data/codes.json`: promotional codes from marketing. Marketing types these in upper
  case, but customers type them however their phone keyboard feels like, so any code
  lookup has to ignore case.
