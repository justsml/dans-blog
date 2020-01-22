---
title: "JavaScript Promises: 9 Questions"
subTitle: Learn about promises & take the quiz!
date: 2019-11-26
modified: 2019-12-14
tags: [promises, programming, async, javascript, guides, quiz]
category: promises
cover: olav-ahrens-rotne-jvBXiynINGE-resized.png
---

# Do you know your JavaScript & Promises???

> * **Prove your JavaScript skillz!** 🚀
> * No login or signup required. ✨
> * Multiple choice. 🤖 ... _How difficult can it be, eh?_

<!-- ![olav-ahrens-rotne-jvBXiynINGE-resized.png](olav-ahrens-rotne-jvBXiynINGE-resized.png) -->
<!-- QUIZ HTML HERE WILL BE AUTO-EXTRACTED BY
`AutoLoader` COMPONENT HELPER CLASS  -->

<!-- #### This is not you old school quiz!  -->

## Goal

> My goal is to try a new 'quiz tool' I built for my blog, and get feedback on how well you learned from the excercise.

### If you get stuck

1. **Read the Hints** (Green button, lower left corner). Some include a few animated answers w/ detailed annotations, while others offer only a few clues. I can't give away all the answers so easy!  <br>Seriously though, this is intentional, the answers are there. Skip ahead or try the code snippets out, then change it, and play some more.
2. Try the code in your browser's Console (try shortcut `F12` or search it) or use [repl.it](https://repl.it)*.
3. Please feel free to [Tweet at me @justsml](https://twitter.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **I'd love to hear your thoughts!**


<!-- _I hopy you learn some fun, quirky and occasionally maddening things about Promises._ -->

<div style="text-align: center; width: 75%; margin: 0 auto 10rem auto; white-space: nowrap; font-size: 1.4em;" class="quiz-loading">

  <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">
    <path d="M0 0h24v24H0z" fill="none">
  </svg>
  <h4 style="text-align: left">Loading...<br />A few more seconds...</h4>

</div>

<div style="text-align: center; display: none;" class="quiz-ready">

## 👇 Complete 9 Questions Below👇

</div>

<!-- #1 -->
<section class="challenge" group="Async/Await">
  <div class="description">

# Async/Await Fundamentals

```js
async function getData() {
  return 5
}
```

## What will `getData()` return?

  </div>
  <ul class="options">
    <li>Promise&lt;null&gt;</li>
    <li class="answer">Promise&lt;5&gt;</li>
    <li>5</li>
    <li>Error: Missing `await`</li>
  </ul>
  <div class="explanation">

All `async` functions behave differently than traditional functions. They will always evaluate to a promise. And in this case the returned value `5` becomes the resolved value.

  </div>
</section>

<!-- #2 -->
<section class="challenge" group="Async/Await">
  <div class="description">

# Async/Await Fundamentals - Part 2

```js
async function getData() {
  await 5
}
```

## What will `getData()` return?

  </div>
  <ul class="options">
    <li>Promise&lt;null&gt;</li>
    <li class="answer">Promise&lt;5&gt;</li>
    <li>5</li>
    <li>Error: Missing `await`</li>
  </ul>
  <div class="explanation">

One unique aspect of `async` functions is that the last `await` behaves a lot like a `return` in _JS Original Recipe_. So, for this example whatever comes after `await` will be the promise's return value.

  </div>
</section>

<!-- #3 -->
<section class="challenge" group="Async/Await">
  <div class="description">

# Async/Await Fundamentals - Part 3

```js
async function getData() {
  await 5
  return 42
}
```

## What will `getData()` return?

  </div>
  <ul class="options">
    <li>Promise&lt;null&gt;</li>
    <li>Promise&lt;5&gt;</li>
    <li class="answer">Promise&lt;42&gt;</li>
    <li>5</li>
    <li>Error: Missing `await`</li>
  </ul>
  <div class="explanation">

One unique aspect of `async` functions is that the last `await` behaves a lot like a `return` in _JS Original Recipe_. So, for this example whatever comes after the last `await` (or `return`) will be the ultimate return value.

  </div>
</section>

<!-- #4 -->
<section class="challenge" group="Async/Await">
  <div class="description">

# Async/Await Fundamentals - Part 4

```js
async function getData() {
  await 5
  return 42
}
```

## What will `getData()` return?

  </div>
  <ul class="options">
    <li>Promise&lt;null&gt;</li>
    <li>Promise&lt;5&gt;</li>
    <li class="answer">Promise&lt;42&gt;</li>
    <li>42</li>
    <li>5</li>
  </ul>
  <div class="explanation">

One unique aspect of `async` functions is that the last `await` behaves a lot like a `return` in _JS Original Recipe_. So, for this example whatever comes after the last `await` (or `return`) will be the promise's return value.

  </div>
</section>

<!-- #5 -->
<section class="challenge" group="Async/Await">
  <div class="description">

# Async/Await Fundamentals - Part 5

```js
let data;

(async () => {
  data = 5
  return 42
})()

console.log(data)
```

## What will print in the console?

  </div>
  <ul class="options">
    <li>null</li>
    <li>Promise&lt;5&gt;</li>
    <li class="answer">5</li>
    <li>42</li>
    <li>undefined</li>
  </ul>
  <div class="explanation">

Here our `async` function is going to behave exactly like synchronous code - it's dealing exclusively with synchronous values. The IIFE (Immediately Invoked Function Expression) is the wrapped function in the middle. It will fully execute before the `console.log` line.

  </div>
</section>


<!-- #6 -->
<section class="challenge" group="Async/Await Errors">
  <div class="description">

# Async/Await Error Handling Part 1

```js
const getData = async () => {
  await 42
  throw Error('Not connected')
}

console.log(getData())
```

## What will print in the console?

  </div>
  <ul class="options">
    <li>Error: Not connected</li>
    <li>Promise&lt;42&gt;</li>
    <li class="answer">UnhandledPromiseRejectionWarning: Not Connected</li>
    <li>42</li>
  </ul>
  <div class="explanation">

This one is a bit tricky because it prints a little differently depending on the runtime.

  </div>
</section>

