# Translation Candidate
- Slug: javascript-scope-magic
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2015-06-06--javascript-scope-magic/it/index.mdx
- Validation: deferred
- Runtime seconds: 26.84
- Input tokens: 1588
- Output tokens: 6202
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006440
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Magia JavaScript
subTitle: '[bozza] Imperativa vs. Ricorsiva vs. Funzionale'
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
## Imperativo vs. Ricorsivo vs. Funzionale

> [ In corso di sviluppo ]

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

## Promises: Straordinarie!

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

1.  Sebbene le Promise native ES6 siano ottime, preferisco la robusta [Libreria Bluebird Promise](https://github.com/petkaantonov/bluebird/blob/master/API.md).
1.  Che si usi una libreria o meno, i browser moderni supportano le Promise da anni.
1.  Le Promise possono essere utilizzate senza pattern complessi: è preferibile l'uso implicito di `deferred`.
1.  **$q è terribile**, usate semplicemente Bluebird, come visto sopra.
1.  Vale la pena menzionare: i benchmark di Bluebird sono test in condizioni ideali, quindi tenetelo a mente se create catene di Promise troppo elaborate.

## Java vs JavaScript

### Rate Limiting / Debouncing / Throttling

1.  In JavaScript [David Walsh ha implementato il debounce](http://davidwalsh.name/essential-javascript-functions) in meno di 20 righe!
1.  In Java, JDebounce è una libreria molto più complessa, che supera le ~500 righe.
1.  _ Confronto tra i due: _
1.  La versione JavaScript è veloce e utilizza funzioni di prima classe per raggiungere una semplicità brillante.
1.  La versione Java, invece, ha molte più componenti in gioco: vengono utilizzate annotazioni per applicare il comportamento a tempo di compilazione, e c'è un sacco di XML, solo per il gusto di farlo!

<!--
## Tecniche di Inversione del Controllo

Lavori in corso
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
