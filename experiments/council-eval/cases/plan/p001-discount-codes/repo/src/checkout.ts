import { type Cart, cartTotal } from "./cart";

export function checkoutRequest(cart: Cart) {
  return { amountCents: cartTotal(cart), currency: "usd" };
}
