---
title: "Master of Pipelines: Passing State - Part 1"
subTitle: Hello Closure, my old friend
date: 2023-07-01
modified: 2023-08-10
tags: [typescript,closure,stateful,scoping,hoisting,functional,pipeline]
category: JavaScript
cover: sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.jpg
---

# Master of Pipelines: Passing State - Part 1

Have you ever run into challenges passing state around Functional Pipelines?

> In this article we’ll explore a few techniques for passing state through a pipeline. We’ll also look at how to improve the readability of your code, and how to identify opportunities for refactoring.

The following "real" snippet will be our focus for this article: A checkout function, which accepts a `userId` and an array of `products`. It returns a Promise-chain which executes 4 functions in sequence.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

Wait a sec, this code is actually pretty decent, as far as pipelines in JS are concerned!

Before we decide how to improve it, let's identify some pros/cons.

## Pros & Cons

### Pros

- Good use of a closure! Passing in `userId` & `products` once!
- Consistent argument naming.
- Relatively effective & succinct composition of 4 key functions for checkout.
- “Free” error flow control. (Errors bubble up from any nested functions, rejecting on the Promise returned by `checkout()`.)

### Cons

- Sometimes “temp” parameter names (like in each `.then(param => {})`) add context. However given time, they’ll likely become home to naming cruft.
- Functions are not unary (single argument.) _This greatly affects versatility._
  - Subtle bugs are easily missed by Devs & TypeScript! Just flip the numeric arguments for `applyTaxes` and `purchaseProducts`. _(Was it `userId` or `money` that goes first?)_
  - **If it feels unnatural combining parameters into single object arguments,** consider breaking up your functions **OR** combining them into more appropriately scoped closure/module.
- Can be non-obvious what the function returns. (Is it the email send result, or that `result` var? Or?)
- Not obvious how to add functionality (e.g. Say we needed to load customer discount/credit/points/etc.)

## Solution, Part 1: Make a module!

This technique doesn’t demand a specific pattern. Explore factory functions, Classes, Closures, etc. Find what makes sense for your project & team.

Some immediate benefits:

- Eliminate repetitive variable passing.
  - DRY: `CartHelpers` abstracts away the repeated argument `userId`.
  - Each method accepts **_only_** the necessary arguments. Making `cart.applyTaxes(subTotal)` entirely unsurprising to read.
- Single-argument functions in `CartHelpers` are more readable, with clearer purpose.
- Even the “temp” `.then` arg names line up with a little symmetry!

By grouping related functions, we create an opportunity to reduce surface area (e.g. `checkout()`, `CartHelpers` ’public’ methods.)

> Less surface area === less cognitive load, better testing & maintainability.
> _Design systems with intention & focus. ✨_

```tsx
export const checkout = (userId: number, products: number[]) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

<aside>
📌 It often takes a few attempts at module organization before your Domain Model shakes out. Don’t agonize getting it perfect.

</aside>

### What makes functions related?

- ✅ Functions with repeated, common arguments. (e.g. If 4 methods accept `userRewards`, chances are you need a `Rewards` module.)
- ✅ Functions whose arguments are provided directly by the output of prior functions. (Sequences of steps. e.g. `Extract`, `Transform`, `Load`.)
- ❌ Anything vaguely related to the feature area, “product purchasing?”
- ❌ Functions featuring common prefix or suffix naming?
- ❌ Functions which require large objects as arguments, despite only using a few values from inside those object(s). (e.g. `applyTaxes({ user, business, rewards, kitchenSink })` vs `applyTaxes({ subTotal })`)

Find repetition in function parameters. Ask is there a fundamental relationship at play? Or an underlying common responsibility?

While there is no single “right answer” to designing modules, it helps to identify 2-3 options for organization - draw an outline, write “fantasy” code, does it spark joy?

> You might feel `cart.sendReceipt()` doesn’t belong with payment-related methods. Perhaps `customerNotifications.sendReceipt()` is a better home for customer messaging. If `CartHelper` is high-enough in importance, it may act as a **_controller_** internally calling all necessary **_services_**, like `customerNotifications`.

### How do you know if you’re helping?

If you remove ad-hoc arguments to zero, **and readability doesn’t suffer… CONGRATULATIONS!!! You’ve likely built a module with a clear and durable scope!**

```tsx
// Removing intermediate arguments has a way of forcing 'layers' to emerge.
// It *should* be hard to dump ad-hoc one-off code in the wrong place!

// The "correct" behavior is encouraged, while messy
//   ad-hoc code is discouraged (by leaving it no place it doesn't belong.).

// There are 2 main Options for adding functionality:
// 1. Create a 5th function, added to the desired place in the chain.
// 2. Extend/refactor a prior existing method.

// 🌈 Functions stack like legos & read like normal "Human Words!" 💅
return Promise.resolve(products)
  .then(cart.getProductsSubtotal)
  .then(cart.applyTaxes)
  .then(cart.purchaseProducts)
  .then(cart.sendReceipt);
```

### 💡 Module Code: Object Factory Pattern

```tsx
const CartHelpers = (userId: number) => {
  // (Add init logic & state vars here)
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

## Conclusion

Passing state through a complex pipeline can be tricky. However, with a little refactor practice, you’ll find yourself writing more readable code, with less cognitive load.

Questions? Comments? Concerns? Feel free to reach out [@justsml](https://twitter.com/justsml) or [email](mailto:dan@danlevy.net).

> Stay tuned for the next part in the series. We’ll explore how to add functionality to our module, without breaking the pipeline.
