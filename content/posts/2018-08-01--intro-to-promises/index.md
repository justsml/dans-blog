---
layout: post
title:  "Intro to Promises"
subTitle: JavaScript Promises Are Fun!
date: 2018-08-01
modified: 2018-09-30
category: promises
tags: [promises, async, javascript, composition]
cover: joe-yates-480485-unsplash.jpg
---

![credit: joe-yates-480485-unsplash.jpg](joe-yates-480485-unsplash.jpg)

## Promises... What's their deal?

Whenever you execute any computer code, there are 2 possible outcomes: **success** or **failure**.

If that code is async in nature, it can be harder to reliably depend on that result.

**`Promises`** provide a handy way to deal with this.

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> Side note: While Promises ought to resolve or reject, they might fail to do either. This causes apps to hang, and can be very hard to debug.


## Where do Promises come from?

Many times you will not need to create a promise yourself. Native APIs like `fetch` and popular libraries like `axios` already return Promises.

However if you must create a promise, there are 2 ways to do so:

### Creating Promises #1/2:

The simplest way to create a Promise is with the helper method: `Promise.resolve()`.

You can wrap (or "convert") any value into a Promise using `Promise.resolve(value)`.

```js
// Without Promises:
function add10(num) {
  return num + 10
}

// With Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Creating Promises #2/2:

Another more flexible method: use the `Promise` constructor.

`new Promise(callback)` accepts a `callback` function with the following interface:

```js
new Promise(function(resolve, reject) {
  // The arguments `resolve` and `reject` are both functions.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` must get executed when the promise is fulfilled
  // `reject(Error)` must get executed if the promise is rejected
})
```

## Promises API

The Promises API is actually a small number of methods.

2 instance functions, and 4 static/utility functions.

### Promise instance methods

Accessing values from a promise will not work using usual tricks (i.e. `console.log(promise)`).

All Promises return either success (via `.then(fn)`) or failure (via `.catch(fn)`).

### Promise utility methods

* `Promise.resolve(value)` - Convert any value into a Promise
* `Promise.reject(Error)` - Creates a failure Promise value, triggers subsequent `.catch()`
* `Promise.all([...promises])` - Wait for an array of Promises to ALL complete
* `Promise.race([...promises])` - Resolves as soon as the first promise resolves
