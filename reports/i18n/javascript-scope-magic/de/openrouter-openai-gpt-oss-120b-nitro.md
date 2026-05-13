# Translation Candidate
- Slug: javascript-scope-magic
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/de/index.mdx
- Validation: passed
- Runtime seconds: 1.80
- Input tokens: 2525
- Output tokens: 1000
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.000278
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JavaScript‑Magie
subTitle: '[draft] Imperativ vs. Rekursiv vs. Funktional'
date: '2015-06-06'
modified: '2024-07-30'
category: Code
subCategory: javascript
draft: true
publish: true
tags:
  - javascript
  - programming
  - performance
  - patterns
cover: ../markus-spiske-197281-unsplash.webp
cover_mobile: ../w300_markus-spiske-197281-unsplash.webp
cover_icon: ../icon_markus-spiske-197281-unsplash.webp
---
## Imperative vs. Recursive vs. Functional

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

## Promises: Awesome!

```js
// Example Using bluebird Promises and it's
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird makes something like this perhaps uncomfortably simple and succinct:
fs.readFileAsync("../style.less") // Call promisified readFile()
  .then(less.renderAsync) // Hand off to less.render
  .then(writeFileData); // Function to recieve the css contents (1st parameter)
```

1.  Während native ES6‑Promises gut sind, bevorzuge ich die robuste [Bluebird Promise Library](https://github.com/petkaantonov/bluebird/blob/master/API.md).
1.  Bibliothek oder nicht, moderne Browser unterstützen Promises seit Jahren.
1.  Promises lassen sich ohne verrückte Muster nutzen – implizites `deferred` ist vorzuziehen.
1.  **$q ist einfach nur schlecht** – nutze Bluebird, siehe oben.
1.  Erwähnenswert: Bluebirds Benchmarks sind Best‑Case‑Tests, also berücksichtige das, wenn du ausgefallene Promise‑Ketten baust.

## Java vs JavaScript

### Rate Limiting / Debouncing / Throttling

1.  In JavaScript hat **David Walsh** das Debounce‑Verfahren in weniger als 20 Zeilen implementiert!  
2.  In Java gibt es **JDebounce**, eine Bibliothek, die mit rund 500 + Zeilen deutlich komplexer ist.  
3.  _Vergleich der beiden:_  
4.  JavaScript ist schnell und nutzt First‑Class‑Functions, um eine brillante Schlichtheit zu erreichen.  
5.  Java hingegen hat viel mehr bewegliche Teile: Annotationen werden zur Compile‑Time‑Verhaltenszuweisung eingesetzt und es gibt jede Menge XML – einfach nur zum Spaß!
````
