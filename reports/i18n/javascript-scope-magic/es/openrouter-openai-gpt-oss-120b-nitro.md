# Translation Candidate
- Slug: javascript-scope-magic
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/es/index.mdx
- Validation: passed
- Runtime seconds: 0.67
- Input tokens: 2541
- Output tokens: 974
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000274
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Magia de JavaScript
subTitle: Imperativo vs. Recursivo vs. Funcional
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

> [ Trabajo en progreso ]

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
fs.readFileAsync("./style.less") // Call promisified readFile()
  .then(less.renderAsync) // Hand off to less.render
  .then(writeFileData); // Function to recieve the css contents (1st parameter)
```

1.  Mientras que las Promesas nativas de ES6 son excelentes, prefiero la robusta [Biblioteca de Promesas Bluebird](https://github.com/petkaantonov/bluebird/blob/master/API.md).
1.  Biblioteca o no, los navegadores modernos llevan años soportando Promise.
1.  Las Promesas pueden usarse sin patrones extravagantes – el `deferred` implícito es preferible.
1.  **$q simplemente apesta**; usa Bluebird, como se mostró arriba.
1.  Vale la pena mencionar: los benchmarks de Bluebird son pruebas de mejor caso, así que tenlo en cuenta si construyes cadenas de promesas muy complejas.

## Java vs JavaScript

### Rate Limiting / Debouncing / Throttling

1.  En JavaScript [David Walsh implementó debounce](http://davidwalsh.name/essential-javascript-functions) en menos de 20 líneas!  
2.  En Java, JDebounce, una biblioteca que es mucho más complicada, con ~500+ líneas.  
3.  _Comparando los dos:_  
4.  JavaScript es rápido y usa funciones de primera clase para lograr una simplicidad brillante.  
5.  Mientras que Java tiene muchas más piezas móviles; se usan anotaciones para aplicar comportamiento en tiempo de compilación y hay un montón de XML, ¡solo por diversión!

<!--
## Inversion of Control Techniques

Work-in-progress
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
