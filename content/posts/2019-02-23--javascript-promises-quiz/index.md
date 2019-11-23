---
title: "Promises: 9 Questions to Test Your Knowledge"
subTitle: JavaScript
date: 2019-11-18
modified: 2019-11-23
tags: [promises, programming, async, javascript, guides]
category: promises
cover: olav-ahrens-rotne-jvBXiynINGE-unsplash-quiz-difficult.jpg
---

# Test your Knowledge of JavaScript Promises

![olav-ahrens-rotne-jvBXiynINGE-unsplash-quiz-difficult.jpg](olav-ahrens-rotne-jvBXiynINGE-unsplash-quiz-difficult.jpg)
<!-- QUIZ HTML HERE WILL BE AUTO-EXTRACTED BY
`AutoLoader` COMPONENT HELPER CLASS  -->

## 9 Question Mini Quiz

<!-- #1 -->
<section class="challenge" group="Handling Errors">
  <div class="description">

# Multiple `.catch`'s

```js
var promise = new Promise((resolve, reject) => {
  reject(Error('The Fails!'))
})
promise.catch(error => console.log(error.message))
promise.catch(error => console.log(error.message))
```

## What will the output be?

  </div>
  <ul class="options">
    <li>print message once</li>
    <li class="answer">print message twice</li>
    <li>UnhandledPromiseRejectionWarning</li>
    <li>process exits</li>
  </ul>
  <div class="explanation">

First, inside the Promise constructor we trigger an error by invoking `reject`.

Then the `.catch` handler works like the DOM's `.addEventListener(event, callback)` or Event Emitter's `.on(event, callback)` where **multiple handler callbacks can be added.** Usually this is undesirable as it's hard to visualize any cleanup or overriding you might want to do.

  </div>
</section>


<!-- #2 -->
<section class="challenge" group="Handling Errors">
  <div class="description">

# Multiple `.catch`'s

```js
var promise = new Promise((resolve, reject) => {
  return Promise.reject(Error('The Fails!'))
})
promise.catch(error => console.log(error.message))
promise.catch(error => console.log(error.message))
```

## What will the output be?

  </div>
  <ul class="options">
    <li>print message once</li>
    <li>print message twice</li>
    <li class="answer">UnhandledPromiseRejectionWarning</li>
    <li>process exits</li>
  </ul>
  <div class="explanation">

The Promise constructor doesn't use your return value. You must invoke one of the provided `resolve` and `reject` arguments. 

In this example the `Promise.reject(Error('The Fails!'))` effectively creates a new Promise chain which never gets a `.catch` and therefore triggers an unhandled promise rejection.

  </div>
</section>

<!-- #3 -->
<section class="challenge" group="Handling Errors">
  <div class="description">

# Chaining `.then` and `.catch`'s

```js
var promise = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
  })
  .catch(error => console.log(error))
  .then(error => console.log(error))
```

## What will the output be?

  </div>
  <ul class="options">
    <li class="answer">print error and `undefined`</li>
    <li>print error twice</li>
    <li>UnhandledPromiseRejectionWarning</li>
    <li>undefined</li>
  </ul>
  <div class="explanation">

When chaining `.then`'s and `.catch`'s it is helpful to think of them as a series of steps. Each `.then` receives the value returned by the previous `.then` (as its argument.) However, if your "step" encountered an error, any subsequent `.then` "steps" will be skipped until a `.catch` is encountered. If you want to override an error, all you need to do is return a non-error value. It can be accessed via any subsequent `.then`.

**Hint:** `console.log()` always return `undefined`.

  </div>
</section>

<!-- #4 -->
<section class="challenge" group="Handling Errors">
  <div class="description">

# Chaining `.catch`'s

```js
var promise = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
  })
  .catch(error => console.log(error.message))
  .catch(error => console.log(error.message))
```

## What will the output be?

  </div>
  <ul class="options">
    <li class="answer">print error message once</li>
    <li>print error message twice</li>
    <li>UnhandledPromiseRejectionWarning</li>
    <li>process exits</li>
  </ul>
  <div class="explanation">

When chaining `.catch`'s, each one only handles errors thrown in previous `.then` or `.catch` "steps". In this example the first `.catch` returns the `console.log` which could only be accessed via adding a `.then()` after both the `.catch`'s.

  </div>
</section>



<!-- #5 -->
<section class="challenge" group="Handling Errors">
  <div class="description">

# Multiple `.catch`'s

```js
var promise = new Promise((resolve, reject) => {
    resolve('Success!')
  })
  .then(() => {
    throw Error('Oh noes!')
  })
  .catch(error => {
    return "actually, that worked"
  })
  .catch(error => console.log(error.message))
```

## What will the output be?

  </div>
  <ul class="options">
    <li>print message once</li>
    <li>print message twice</li> 
    <li>UnhandledPromiseRejectionWarning</li>
    <li class="answer">nothing prints</li>
  </ul>
  <div class="explanation">

**TODO:**

  </div>
</section>



<!-- #6 -->
<section class="challenge" group="Handling Errors">
  <div class="description">

# Flow between `.then`'s

```js
var promise = Promise.resolve('Success!')
  .then(data => {
    return data.toUpperCase()
  })
  .then(data => {
    console.log(data)
  })
```

## What will the output be?

  </div>
  <ul class="options">
    <li>print "Success!" and "SUCCESS!"</li>
    <li>print "Success!"</li>
    <li class="answer">print "SUCCESS!"</li>
    <li>nothing prints</li>
  </ul>
  <div class="explanation">

**TODO:**

  </div>
</section>



<!-- #7 -->
<section class="challenge" group="Handling Data">
  <div class="description">

# Flow between `.then`'s

```js
Promise.resolve('Success!')
  .then(data => {
    return data.toUpperCase()
  })
  .then(data => {
    console.log(data)
    return data
  })
  .then(console.log)
```

## What will the output be?

  </div>
  <ul class="options">
    <li>print "SUCCESS!"</li>
    <li>print "Success!"</li>
    <li class="answer">print "SUCCESS!" and "SUCCESS!"</li>
    <li>nothing prints</li>
  </ul>
  <div class="explanation">

**TODO:**

  </div>
</section>



<!-- #8 -->
<section class="challenge" group="Handling Data">
  <div class="description">

# Flow between `.then`'s

```js
Promise.resolve('Success!')
  .then(data => {
    return data.toUpperCase()
  })
  .then(data => {
    console.log(data)
  })
```

## What will the output be?

  </div>
  <ul class="options">
    <li class="answer">print "SUCCESS!"</li>
    <li>print "Success!"</li>
    <li>print "SUCCESS!" and "SUCCESS!"</li>
    <li>nothing prints</li>
  </ul>
  <div class="explanation">

**TODO:**

  </div>
</section>



<!-- #9 -->
<section class="challenge" group="Handling Data">
  <div class="description">

# Flow between `.then`'s and `.catch`'s

```js
Promise.resolve('Success!')
  .then(() => {
    throw Error('Oh noes!')
  })
  .catch(error => {
    return 'actually, that worked'
  })
  .then(data => {
    throw new Error('The fails!')
  })
  .catch(error => console.log(error.message))
```

## What will the output be?

  </div>
  <ul class="options">
    <li>print "Oh noes!" and "The fails!"</li>
    <li>print "Oh noes!"</li>
    <li class="answer">print "The fails!"</li>
    <li>print "actually, that worked"</li>
    <li>nothing prints</li>
  </ul>
  <div class="explanation">

**TODO:**

  </div>
</section>


