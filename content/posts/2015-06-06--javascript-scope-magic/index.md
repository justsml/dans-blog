---
layout: post
title:  "JavaScript Magic"
date: 2015-06-06
modified: 2015-09-24
category: javascript
tags: [javascript, programming, performance, patterns]
cover: markus-spiske-197281-unsplash.jpg
---

# Imperative vs. Recursive vs. Functional

![credit: markus-spiske-197281-unsplash.jpg](markus-spiske-197281-unsplash.jpg)

> [ Work-in-progress ]

```javascript
// Imperative: The Fastest ( + very simple, no new pointers or excess allocs ):
function fib(n) {
  var a = 1,
    b = 1,
    c = 0;
  for (var i = 1; i < n - 1; ++i) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// Recursive: (FIREFOX or BABELJS Only) ES6 function definition with
//  parameter defaults used to set initial (internal/recursive) values
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// Text-book-Bad Example - poor function scope w/ multiple mutable external values
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // Bad
  if (n === -1) {
    return [arr[0]];
  }
  if (n === 0) {
    return arr;
  }
  var proc = function() {
    --n;
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return n === 0 ? arr : proc();
    // Bad: inner recursive function not needed, hint: variables used are from parent function scope
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

# Promises: Awesome!

```js
// Example Using bluebird Promises and it's
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird makes something like this perhaps uncomfortably simple and succinct:
fs.readFileAsync("./style.less") // Call promisified readFile()
  .then(less.renderAsync) // Hand off to less.render
  .then(writeFileData); // Function to recieve the css contents (1st parameter)
```

1.  While, native ES6 Promises are great, I prefer the robust [Bluebird Promise Library](https://github.com/petkaantonov/bluebird/blob/master/API.md).
1.  Library or not, modern browsers have supported Promise for years.
1.  Promises can be utilized without crazy patterns - implicit `deferred` is preferable.
1.  **$q just sucks** just use bluebird, see above.
1.  Worth mentioning: Bluebirds Benchmarks are best-case tests, so take note if doing crazy fancy promise chains

# Java vs JavaScript

## Rate Limiting / Debouncing / Throttling

1.  In JavaScript [David Walsh implemented debounce](http://davidwalsh.name/essential-javascript-functions) in less than 20 lines!
1.  In Java, JDebounce, an library which is a lot more complicated, at ~500+ lines.
1.  _ Comparing the two: _
1.  The JavaScript is fast & uses first-class functions to achieve brilliant simplicity.
1.  Whereas the Java has many more moving parts, annotations are used to apply behaviour at compile-time, and there's a ton of XML, just for funsies!

<!--
# Inversion of Control Techniques

Work-in-progress
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
