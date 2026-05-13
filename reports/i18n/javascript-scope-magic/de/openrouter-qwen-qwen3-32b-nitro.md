# Translation Candidate
- Slug: javascript-scope-magic
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/de/index.mdx
- Validation: passed
- Runtime seconds: 5.67
- Input tokens: 2061
- Output tokens: 2268
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000709
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JavaScript-Kunst
subTitle: '[Entwurf] Imperativ vs. Rekursiv vs. Funktional'
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
## Imperativ vs. Rekursiv vs. Funktional

> [ Work-in-progress ]

```javascript
// Imperativ: Die schnellste Methode ( + sehr einfach, keine neuen Pointer oder unnötige Zuweisungen ):
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

// Rekursiv: (NUR FIREFOX oder BABELJS) ES6-Funktionsdefinition mit
//  Standardparametern für Initialisierungswerte (internen/rekursiven)
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// Lehrbuchschlechtes Beispiel - schlechte Funktionsumgebung mit mehreren äußeren veränderbaren Werten
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // Schlecht
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
    // Schlecht: innere rekursive Funktion unnötig, Hinweis: Verwendete Variablen stammen aus der Elternfunktionsumgebung
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## Promises: Klasse!

```js
// Beispiel mit Bluebird Promises und
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird macht so etwas möglicherweise unangenehm einfach und prägnant:
fs.readFileAsync("./style.less") // Promisified readFile() aufrufen
  .then(less.renderAsync) // An less.render weitergeben
  .then(writeFileData); // Funktion, die die CSS-Inhalte erhält (1. Parameter)
```

1. Während native ES6-Promises großartig sind, bevorzuge ich die robuste [Bluebird Promise Library](https://github.com/petkaantonov/bluebird/blob/master/API.md).
1. Mit oder ohne Bibliothek: Moderne Browser unterstützen Promises seit Jahren.
1. Promises können ohne komplexe Muster genutzt werden - implizites `deferred` ist vorzuziehen.
1. **$q ist einfach schlecht** - nutze Bluebird, siehe oben.
1. Wichtig: Bluebirds Benchmarks sind Best-Case-Tests, beachte das bei komplexen Promise-Ketten

1. In JavaScript [implementierte David Walsh debounce](http://davidwalsh.name/essential-javascript-functions) in weniger als 20 Zeilen!  
1. In Java ist JDebounce, eine deutlich komplexere Bibliothek, mit ~500+ Zeilen.  
1. _ Vergleich der beiden: _  
1. Das JavaScript ist schnell und nutzt first-class Functions, um brillante Einfachheit zu erzielen.  
1. Das Java hingegen hat deutlich mehr bewegliche Teile, Annotationen werden verwendet, um Verhalten zur Kompilierzeit anzuwenden, und es gibt eine Menge XML, einfach zur Unterhaltung!  

<!--  
## Inversion of Control Techniques  

Work-in-progress  
-->  

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
