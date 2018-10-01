---
layout: post
title:  "Promise Gotchas"
subTitle: Avoiding common mistakes
date:   2018-09-26
category: promises
cover: michal-parzuchowski-224092-unsplash.jpg
---

# Promise Gotchas

![credit: michal-parzuchowski-224092-unsplash.jpg](michal-parzuchowski-224092-unsplash.jpg)

## Promises don't work like other values

You cannot print their value like most values:

```js
// This doesn't make sense w/ promises:
console.log(Promise.resolve(42))

// We must use the `.then` interface:
Promise.resolve(42)
  .then(value => console.log(value))
```

## Promises don't check for functions

For a variety of reasons, it was decided by TC39 that `.then` and `.catch` may be passed null. For example, `.then(null, null)` is valid and the required behavior is to skip that 'step' in the chain.

The unfortunate consequence of this is it's very easy to screw things up.

#### By Example

Let's look at a mini challenge: which of the following option(s) will `console.log` 42?

```js
// Option #1:
Promise.resolve(42)
  .then(console.log())

// Option #2:
Promise.resolve(42)
  .then(console.log)

// Option #3:
Promise.resolve(42)
  .then(value => console.log(value))
```

#### The Answer

The answer is #2 & #3.

Why? Let's look at the **types** of what was passed to `.then()`:

```js
var arg1 = console.log()
var arg2 = console.log
var arg3 = value => console.log(value)

typeof arg1 === "undefined"
typeof arg2 === "function"
typeof arg3 === "function"
```

