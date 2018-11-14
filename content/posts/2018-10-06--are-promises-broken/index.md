---
title: Broken Promises?
subTitle: Dropping errors, losing results...
date: 2018-10-06
modified: 2018-10-12
tags: [promises, javascript, errors, catch]
category: promises
cover: lennart-heim-766366-unsplash.jpg
---

# Are JavaScript Promises Broken?

![credit: lennart-heim-766366-unsplash](lennart-heim-766366-unsplash.jpg)

## In the Before Times

One of the most common myths about Promises is it's **alleged** error shortcomings.

**Many years ago** Promises _were_ actually awful with errors. **Lots of work went into fixing it.**

> And lo, **it got fixed**, even **widely deployed**.

#### People rejoiced.

And sadly, some didn't notice.

## The Now Times

The myth still persists, I see it everywhere: [popular articles on medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [on dzone](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba), and [many](https://medium.com/@avaq/broken-promises-2ae92780f33) other sources.

I'll admit, even "official" resources and documentation offer mostly [flimsy examples and bad habits](/promise-gotchas/). These are often used to "prove" the case against Promises. Some even suggest "cures" which make things so much worse.

<!-- One such tip I've seen multiple times: is to never use `.catch`, and instead use an `"unhandledRejection"` global event. **NEVER** do this. unhandledRejection is designed for cleanup of global references, like database connections, before an impending shutdown.) -->


# Rules to Stay Out of Trouble

1. **Always** `return` from your functions.
1. **Always** use `Error` instances.
1. **Always** use `.catch()`, at least once.
1. __Prefer__ named functions.

### #1 Promises need something to hold on

It is critical that you **always `return`** from your functions.

Promise callback functions follow a certain pattern in `.then(callback)` and `.catch(callback)`.

Each returned value gets passed to the next `.then()`'s callback.

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // 40
```

> Bonus of "always returning": code is much easier to unit test.

### #2 Errors work best using `new`

JavaScript has an interesting behavior around errors (which applys to asynchronous and synchronous code.)

In order to **get useful details about the line number** and call stack, you must use `new` (the constructor) to get this to work properly. Throwing strings does not work like in Python or Ruby. Making things perhaps more confusing, JavaScript will **seem** to handle `throw "string"`, as you will see the string in any `catch`.

Correct `new Error` examples:

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

The following are common anti-patterns:

```js
throw 'error message'            // ❌
Promise.reject(-42)              // ❌
Promise.reject('error message')  // ❌
```

### #3 Handle errors where it makes sense

Promises provide a slick way to handle errors, using `.catch()`. It is basically a special kind of `.then()` - where any errors from preceding `.then()`'s get handled. Let's look at an example.

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

While `.catch()` may seem like a DOM event handler (i.e. `click`, `keypress`). It's placement is important, as it can only 'catch' errors thrown **above it.**

**Overriding errors is relatively trivial** Return a non-error value in your `.catch()` callback, the Promise chain switches to running the `.then()` callbacks in sequence. (Effectively .)

For example, after we catch the `totes fail` error below, we return an arbitrary value `99`:

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(console.log) // expected output: 99
```

### #4 Add clarity with named functions 🦄✨

Compare the **readability** of the following 2 examples:

**Anonymous:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```


**Named:** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // expected output: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)
```


