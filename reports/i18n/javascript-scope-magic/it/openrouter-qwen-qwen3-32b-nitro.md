# Translation Candidate
- Slug: javascript-scope-magic
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.31
- Input tokens: 2064
- Output tokens: 2451
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000753
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-06--javascript-scope-magic/it/index.mdx reports/i18n/javascript-scope-magic/it
## Raw Output

````mdx
---
title: Magia JavaScript
subTitle: '[bozza] Imperativo contro Ricorsivo contro Funzionale'
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

> [ Lavoro in corso ]

```javascript
// Imperativo: Il più veloce ( + molto semplice, senza nuovi puntatori o allocazioni eccessive ):
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

// Ricorsivo: (SOLO FIREFOX O BABELJS) Definizione di funzione ES6 con
//  parametri predefiniti utilizzati per impostare valori iniziali (interno/ricorsivo)
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// Esempio di testo-pessimo - cattiva gestione dello scope della funzione con valori mutabili esterni
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // Cattivo
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
    // Cattivo: funzione ricorsiva interna non necessaria, suggerimento: le variabili utilizzate provengono dallo scope della funzione padre
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## Promesse: Fantastico!

```js
// Esempio utilizzando le Promesse di Bluebird e
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird rende qualcosa come questo forse troppo semplice e conciso:
fs.readFileAsync("./style.less") // Chiama readFile() promessificata
  .then(less.renderAsync) // Passa a less.render
  .then(writeFileData); // Funzione per ricevere i contenuti css (primo parametro)
```

1. Sebbene le Promesse native di ES6 siano ottime, preferisco la robusta [Libreria delle Promesse Bluebird](https://github.com/petkaantonov/bluebird/blob/master/API.md).
1. Con o senza libreria, i browser moderni supportano le Promesse da anni.
1. Le Promesse possono essere utilizzate senza pattern complicati - preferibile l'uso implicito di deferred.
1. **$q è pessimo** usa semplicemente bluebird, vedi sopra.
1. Degno di nota: I benchmark di Bluebird sono test nel miglior scenario, quindi tieni presente se stai creando catene di promesse complesse

## Java vs JavaScript

### Limitazione di Velocità / Debounce / Throttle

1. In JavaScript [David Walsh ha implementato debounce](http://davidwalsh.name/essential-javascript-functions) in meno di 20 righe!  
1. In Java, JDebounce, una libreria molto più complessa, con circa 500+ righe.  
1. _ Confrontando i due: _  
1. Il JavaScript è veloce e utilizza le funzioni di primo livello per raggiungere un'elevata semplicità.  
1. Mentre il Java ha molti più componenti, vengono utilizzate le annotazioni per applicare il comportamento in fase di compilazione, e c'è un sacco di XML, solo per divertimento!  

<!--  
## Inversion of Control Techniques  

Work-in-progress  
-->  

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
