---
title: "Master of Pipelines: Passing State"
subTitle: Hello Closure, My Old Friend.
date: 2023-08-09
modified: 2024-07-30
tags: [typescript,closure,stateful,scoping,hoisting,functional,pipeline]
category: Guides
subCategory: JavaScript
cover: sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.jpg
cover_mobile: w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.jpg
cover_tablet: w600_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.jpg
cover_desktop: w900_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.jpg
cover_icon: icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.jpg
---

## Master of Pipelines: Passing State - Part 1

Have you run into challenges passing state around using Functional Pipelines?

The organization (or lack thereof) of your code directly impacts the ease with which state is passed around.

In this article we’ll explore an effective technique for passing state through a pipeline. Along the way we'll improve the organization & readability of our code.

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

It does suffer from a few subtle issues which can combine into more substantial problems.

One problem is that we're repeatedly passing `userId` around to each (logically-related) function.
Now combine that with another issue that's easily missed by developers & TypeScript too: flipping the numeric arguments easily creates a silent bug. (See `applyTaxes` and `purchaseProducts`. _Was it `userId` or `amount` that goes first?_)

Before we decide how to improve this code, let's identify some pros/cons.

### Pros & Cons

#### Pros

- Good use of a closure! Passing in `userId` & `products` once!
- Consistent argument naming.
- Relatively effective & succinct composition of 4 key functions for checkout.
- “Free” error flow control. (Errors bubble up from any nested functions, rejecting on the Promise returned by `checkout()`.)

#### Cons

- Repeatedly passing `userId` around is tedious.
- Functions are not single-parameter (aka unary.) _This affects composability. See [final example](#checkout-with-further-improvements) for why?_
- Can be non-obvious what each function returns. (Is it the email send result, or that `result` var? Or?)
- Not obvious how to add functionality (e.g. Say we needed to load customer discount/credit/points/etc.)
- Sometimes “temp” parameter names (like in each `.then(param => {})`) add context. However given time, they’ll likely become home to naming cruft.

### Solution, Part 1: Make a module!

This technique is about organizing related functions into a single module (e.g. `CartHelpers`.) It doesn’t demand a specific pattern. Explore [factory functions](#carthelpers-factory), [Classes](#carthelpers-class), Closures, Mixins, etc. Find what makes sense for your project & team.

#### CartHelpers Factory

Example of a `CartHelpers` module, where `userId` is passed in once, and all methods are single-argument.

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### CartHelpers Class

If classes are your thing, it's easy to adapt:

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

Some immediate benefits:

- Eliminate repetitive variable passing.
  - DRY: `CartHelpers` abstracts away the repeated argument `userId`.
  - Each method accepts **_only_** the necessary arguments. Making `cart.applyTaxes(subTotal)` entirely unsurprising to read.
- Single-argument functions in `CartHelpers` are more readable, with clearer purpose.

By grouping related functions, we create an opportunity to reduce exposed surface area (e.g. `checkout()`, `CartHelpers` ’public’ methods.)

> Less surface area === less cognitive load, better testing & maintainability.
> _Design systems with intention & focus. ✨_

#### Checkout & CartHelpers Usage

Let's see how the `checkout()` function looks now:

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### Checkout with further improvements

> Can it be improved further? Yes! We don't have to repeat arguments at all!

When a functions’ arguments are provided by the output of prior functions, you can simplify the code even further.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Functions stack like Lego & read like normal "Human Words!" 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**If it feels unnatural combining parameters into single (object) arguments,** consider breaking up your functions **OR** combining them into more appropriately scoped modules.

#### Where to Start?

Find related functions, and group them together. (e.g. `CartHelpers`.)

Part of the challenge when finding possible logical modules is identifying related code in the first place.

##### What makes functions related?

One neat trick: Find repetition in function parameters. Ask is there a relationship at play? Or an underlying responsibility?

- ✅ Functions with repeated, common arguments. (e.g. If 4 methods accept `userRewards`, chances are you need a `Rewards` or other module.)
- ✅ Functions whose arguments are provided directly by the output of prior functions. (Sequences of steps. e.g. `Extract`, `Transform`, `Load`.)
- ❌ Anything vaguely related to the feature area, “product purchasing?”
- ❌ Functions featuring common prefix or suffix naming?
- ❌ Functions which require large objects as arguments, despite only using a few values from inside those object(s). (e.g. `applyTaxes({ user, business, rewards, kitchenSink })` vs `applyTaxes({ subTotal })`)

While there is no single “right answer” to designing modules, it helps to identify 2-3 options for organization - draw an outline, write “fantasy” code, ask "does it spark joy?"

<aside>
📌 It often takes a few attempts at module organization before your Domain Model shakes out. Don’t agonize getting it perfect.
</aside>

> You might feel `cart.sendReceipt()` doesn’t belong with payment-related methods. Perhaps `customerNotifications.sendReceipt()` is a better home for customer messaging. If `CartHelper` is high-enough in importance, it may act as a **_controller_** internally calling all necessary **_services_**, like `customerNotifications`.

#### How do you know if you’re helping?

If readability doesn’t suffer as you eliminate ad-hoc arguments, **CONGRATULATIONS!!!** You’ve likely built a module with a clear and durable scope!

- Removing intermediate arguments has a way of forcing 'layers' to emerge.
- It _should_ be hard to dump ad-hoc code in the wrong place!

So, that begs the question, where do we add functionality?

In my experience there are 2 primary strategies to evaluate when adding functionality:

1.  Extend/refactor existing method. (When new code is close enough to existing code.)
2.  Create a new (5th) function at the desired place in the chain. (Assuming new code is unrelated to existing functions.)

Ultimately this makes it easier to decide where new functionality belongs. (e.g. `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`.)

### Conclusion

Passing state through a complex pipeline can be tricky. However, with a little refactor practice, you’ll find yourself writing more readable code, with less cognitive load.

Questions? Comments? Concerns? Feel free to reach out [@justsml](https://twitter.com/justsml) or [email](mailto:dan@danlevy.net).

#### Stay tuned for the next part in the series

We’ll explore externalizing state, and extending functionality in our module!

#### Related Reading

- [Similar struggles exist in the Component-driven React world.](https://kyleshevlin.com/quit-your-yapping)
