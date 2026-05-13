# Translation Candidate
- Slug: intro-to-promises
- Locale: it
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2018-08-01--intro-to-promises/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug intro-to-promises --locale it --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Introduzione alle Promesse
subTitle: ''
date: '2018-08-01'
modified: '2024-07-31'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - javascript
  - composition
related:
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
cover: ../joe-yates-480485-unsplash.webp
cover_mobile: ../w300_joe-yates-480485-unsplash.webp
cover_icon: ../icon_joe-yates-480485-unsplash.webp
---
## Promises... Qual è il loro problema?

Ogni volta che esegui qualsiasi codice informatico, ci sono 2 possibili esiti: **successo** o **fallimento**.

Se quel codice è di natura asincrona, può essere più difficile contare in modo affidabile su quel risultato.

**`Promises`** forniscono un modo utile per gestire questo.

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> Nota laterale: Sebbene le Promises dovrebbero risolvere o rifiutare, potrebbero non riuscire a farlo. Questo fa sì che le app si blocchino, e può essere molto difficile da risolvere.

### Da dove vengono le Promises?

Molte volte non avrai bisogno di creare una Promise da solo. API native come `fetch` e librerie popolari come `axios` restituiscono già Promises.

Tuttavia, se devi creare una Promise, ci sono 2 modi per farlo:

### Creazione di Promises #1/2:

Il modo più semplice per creare una Promise è utilizzare il metodo helper: `Promise.resolve()`.

Puoi avvolgere (o "convertire") qualsiasi valore in una Promise utilizzando `Promise.resolve(value)`.

```js
// Senza Promises:
function add10(num) {
  return num + 10
}

// Con Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Creazione di Promises #2/2:

### Creazione di Promises #2/2:

Un altro metodo più flessibile: utilizzare il costruttore `Promise`.

`new Promise(callback)` accetta una `callback` funzione con l'interfaccia seguente:

```js
new Promise(function(resolve, reject) {
  // Gli argomenti `resolve` e `reject` sono entrambi funzioni.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` deve essere eseguito quando la promise è completata
  // `reject(Error)` deve essere eseguito se la promise è rifiutata
})
```

### API delle Promises

L'API delle Promises è in realtà un numero ridotto di metodi.

2 metodi di istanza e 4 funzioni statiche/utilità.

#### Metodi di istanza delle Promises

Accesso ai valori da una Promise non funzionerà utilizzando metodi usuali (ad esempio `console.log(promise)`).

Tutte le Promises restituiscono successo (tramite `.then(fn)`) o fallimento (tramite `.catch(fn)`).

#### Metodi utilità delle Promises

* `Promise.resolve(value)` - Converte qualsiasi valore in una Promise  
* `Promise.reject(Error)` - Crea un valore Promise di fallimento, attiva il successivo `.catch()`  
* `Promise.all([...promises])` - Aspetta che un array di Promises venga completato da TUTTE  
* `Promise.race([...promises])` - Si risolve non appena la prima Promise si risolve
````
