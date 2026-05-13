# Translation Candidate
- Slug: intro-to-promises
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.32
- Input tokens: 3970
- Output tokens: 830
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000304
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-08-01--intro-to-promises/it/index.mdx reports/i18n/intro-to-promises/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Introduzione allePromise
subTitle: Le Promise JavaScript sono divertenti!
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
## Promises... Qual è il loro affare?

Ogni volta che esegui del codice, ci sono 2 possibili esiti: **successo** o **fallimento**.

Se quel codice è di natura asincrona, può essere più difficile fare affidamento sul risultato.

**`Promises`** offrono un modo pratico per gestirlo.

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

> Nota a margine: sebbene le Promise dovrebbero risolversi o essere rifiutate, potrebbero non fare nessuno dei due. Questo blocca le applicazioni e può essere molto difficile da debug.

### Da dove provengono le Promise?

Molte volte non è necessario creare una promise manualmente. Le API native come `fetch` e le librerie popolari come `axios` restituiscono già delle Promise.

Tuttavia, se devi creare una promise, ci sono 2 modalità per farlo:

### Creare Promise #1/2:

Il modo più semplice per creare una Promise è usare il metodo di supporto: `Promise.resolve()`.

Puoi avvolgere (o “convertire”) qualsiasi valore in una Promise usando `Promise.resolve(value)`.

```js
// Senza Promise:
function add10(num) {
  return num + 10
}

// Con Promise:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Creare Promise #2/2:

Un altro metodo più flessibile: usa il costruttore `Promise`.

`new Promise(callback)` accetta una funzione `callback` con la seguente interfaccia:

```js
new Promise(function(resolve, reject) {
  // Gli argomenti `resolve` e `reject` sono entrambi funzioni.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` deve essere eseguito quando la promise è soddisfatta
  // `reject(Error)` deve essere eseguito se la promise viene rifiutata
})
```

### API delle Promise

L'API delle Promise è in realtà composta da un numero limitato di metodi.

2 funzioni di istanza e 4 funzioni statiche/di utilità.

#### Metodi di istanza della Promise

Accedereai valori di una promise non funzionerà con i trucchi abituali (ad es. `console.log(promise)`).

Tutte le Promise restituiscono o il successo (tramite `.then(fn)`) o il fallimento (tramite `.catch(fn)`).

#### Metodi di utilità delle Promise

* `Promise.resolve(value)` – Converte qualsiasi valore in una Promise  
* `Promise.reject(Error)` – Crea una Promise di fallimento, attiva il successivo `.catch()`  
* `Promise.all([...promises])` – Attende che **tutte** le Promise di un array siano completate  
* `Promise.race([...promises])` – Si risolve non appena la prima Promise si risolve
````
