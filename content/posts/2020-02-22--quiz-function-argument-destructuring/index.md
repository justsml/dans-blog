---
title: "JS Quiz: Function Argument Destructuring"
subTitle: Have you mastered this powerful features?
date: 2020-02-22
modified: 2020-02-22
tags: [javascript,quiz,challenge,]
category: Quiz
# cover: pocket-watch.jpg
---

# Have you mastered ES2015 Destructuring?

In this quiz we'll cover Object Arguments and how destructuring can be used to create self-documenting functions (VS Code's tool tips infer types based on the arguments).

Topic areas we'll touch on: default values, nested structures, re-assigning/aliasing names, rest operator.


### If you get stuck

1. **Read the Hints** (Green button, lower right corner). Some include a few animated answers w/ detailed annotations, while others offer only a few clues. I can't give away all the answers so easy!  <br>Seriously though, this is intentional, the answers are there. Skip ahead or try the code snippets out, then change it, and play some more.
2. Try the code in your browser's Console (try shortcut `F12` on Windows, or `Command + Option + J` on Mac).
3. Please feel free to [Tweet me @justsml](https://twitter.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20Destructuring%20quiz%2E%2E%2E&url=https://danlevy.net/). **I'd love to hear your thoughts!**
4. Post comment at the end of the post.

<div style="text-align: center; width: 75%; margin: 0 auto 10rem auto; white-space: nowrap; font-size: 1.4em;" class="quiz-loading">

  <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
  <h4 style="text-align: left">Loading...<br />A few more seconds...</h4>

</div>

<div style="text-align: center; display: none;" class="quiz-ready">

## 👇 Complete The Questions Below 👇

</div>


<!-- #6 -->
<section class="challenge" group="Handling Dates">
  <div class="description">

# Date Constructor Part 1

```js
const d1 = new Date(2020, 1, 1)
console.log(d1)
```

## What will the output include?

  </div>
  <ul class="options">
    <li>Jan 01 2020</li>
    <li class="answer">Feb 01 2020</li>
    <li>RangeError: Invalid argument.</li>
  </ul>
  <div class="explanation">

The Month argument is zero-based. With a range of 0-11 (using western calendars.)

'February' has an index value of one. (Think of it like an array lookup.)

  </div>
</section>


