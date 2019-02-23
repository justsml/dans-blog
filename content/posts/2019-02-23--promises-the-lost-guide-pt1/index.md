---
title: "Promises: The Lost Guides Part 1"
subTitle: Essential Techniques!
date: 2019-01-18
modified: 2019-02-22
tags: [promises, programming, async, javascript, guides]
category: promises
cover: null
---


> [Fun quiz below!](#fun-quiz)

<!--
## Fundamentals

### Key Details

### Illustrated
-->

## Techniques

1. Logging values
1. 2 ways to create Promises
1. 3 parameter tricks with Promises
1. Show `Promise.all()` Progress
1. `Auto-Retry` helper function


## Fun quiz!


<div class="challenge" title="Logging 1">
  <div class="description">
    What does the following code print?

![challenge-1.png](challenge-1.png)

  </div>
  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li>42</li>
    <li class="answer">Other</li>
  </ul>
  <div class="explanation">The Promise method `.then()` must be given a function.

  Here, we are executing a `console.log` with an undefined variable `result`. The essential problem here is that `console.log` isn't being passed as a function to `.then()`, instead it executes immediately and passes `undefined` into `.then()`. This leads to some confusing behavior, see later challenges will</div>
</div>



<div class="challenge" title="Logging 2">
  <div class="description">
    What does the following code print?

![challenge-2.png](challenge-2.png)

  </div>
  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>Other</li>
  </ul>
  <div class="explanation">The Promise method `.then()` must be given a function.

  Here, we are executing a `console.log` with an undefined variable `result`. The essential problem here is that `console.log` isn't being passed as a function to `.then()`, instead it executes immediately and passes `undefined` into `.then()`. This leads to some confusing behavior, see later challenges will</div>
</div>
