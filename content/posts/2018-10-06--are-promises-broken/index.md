---
title: Are Promises Broken?
subTitle: Promised errors. Broken promises?
date: 2018-10-06
modified: null
tags: [promises, javascript, errors, catch]
cover: lennart-heim-766366-unsplash.jpg
---

![credit: lennart-heim-766366-unsplash](lennart-heim-766366-unsplash.jpg)


I used to run into 2 issues seemingly constantly: no visibility into errors and undefined data.

3 possible Fixes:
* 80% of the time: Failed to return from function. ALWAYS return!!!
* 15% it is a bug in calling using Promise.reject() or throw. Errors in all of JavaScript require a valid Error instance for stack traces to work. Always use `NEW` keyword when creating errors to throw/reject.
* 5% of the time it's a complicated hierarchy - say +3 Promise chains deep. This will resemble callback hell. Don't do this. It's virtually never needed. Break apart the Promise chain depth by moving functions 'up' into sequential `.then`'s. Use named functions to add clarity.

