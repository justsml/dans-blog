# Translation Candidate
- Slug: are-promises-broken
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/it/index.mdx
- Validation: passed
- Runtime seconds: 3.11
- Input tokens: 9218
- Output tokens: 2794
- Thinking tokens: unknown
- Cached input tokens: 4480
- Cache write tokens: 0
- Estimated cost: $0.000862
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promesse infrante?
unlisted: true
subTitle: 'Errori scartati, risultati persi...'
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## Sono i JavaScript Promise rotti?

### Nei tempi passati

Uno dei miti più diffusi sui Promise è la sua **presunta** carenza di gestione degli errori.

**Molti anni fa** i Promise _erano_ davvero pessimi nella gestione degli errori. **Molto lavoro è stato dedicato a correggerli.**

> Ecco, **sono stati corretti**, anche **ampiatamente distribuiti**.

#### La gente esultò

E, sfortunatamente, alcuni non se ne sono accorti.

### I tempi attuali

Il mito persiste ancora, lo vedo ovunque: [articoli popolari su Medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [su DZone](#redacted) e [molti](https://medium.com/@avaq/broken-promises-2ae92780f33) altri fonti.

Ammetto che anche le risorse “ufficiali” e la documentazione offrono per lo più [esempi fragili e cattive abitudini](../promise-gotchas/). Questi vengono spesso usati per “dimostrare” il caso contro i Promise. Alcuni suggeriscono persino “cure” che peggiorano notevolmente la situazione. (nota: link rimosso)

<!-- One such tip I've seen multiple times: is to never use `.catch`, and instead use an `"unhandledRejection"` global event. **NEVER** do this. unhandledRejection is designed for cleanup of global references, like database connections, before an impending shutdown.) -->

<br />
<br />

## Regole per non incorrere in problemi

1. [Le Promise hanno bisogno di qualcosa a cui aggrapparsi](#1-promises-need-something-to-hang-on-to)
    * **Sempre** `return` dalle tue funzioni.
1. [Usa vere istanze di `Error`](#2-use-real-error-instances)
    * **Sempre** usa istanze di `Error`.
1. [Gestisci gli errori dove ha senso](#3-handle-errors-where-it-makes-sense)
    * **Sempre** usa `.catch()`, almeno una volta.
1. [Aggiungi chiarezza con funzioni nominate 🦄✨](#4-add-clarity-with-named-functions-)
    * __Preferisci__ le funzioni nominate.

-------------------------------------------

#### #1 Le Promise hanno bisogno di qualcosa a cui aggrapparsi

È fondamentale che **sempre `return`** dalle tue funzioni.

Le funzioni di callback delle Promise seguono un certo schema in `.then(callback)` e `.catch(callback)`.

Ogni valore restituito viene passato al callback del successivo `.then()`.

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> Vantaggio del “sempre restituire”: il codice è molto più facile da testare unitariamente.

**Domanda:** Quanti stati distinti di Promise (risolti e rifiutati) sono stati creati?

**Domanda:** Quante promesse sono state create nell’esempio precedente?

#### #2 Usa vere istanze di `Error`

JavaScript ha un comportamento interessante riguardo agli errori (che si applica sia al codice asincrono **che** a quello sincrono).

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>vedi l'esempio su repl.it: `throwing errors in javascript`</i>]</a>
<img alt="throwing errors in javascript" src="../throwing-errors-in-javascript.webp" />

Per ottenere **informazioni utili sul numero di riga** e sullo stack di chiamate, è necessario utilizzare istanze di `Error`. Lanciare stringhe non funziona come in Python o Ruby.

Sebbene JavaScript **sembri** gestire `throw "string"`, vedrai la stringa nel tuo gestore `catch`. Tuttavia, i dati saranno tutto ciò che otterrai*. Nessun frame di stack precedente sarà incluso.

Esempi corretti di `new Error`:

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

I seguenti sono anti‑pattern comuni:

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 Gestisci gli errori dove ha senso

Le Promise offrono un modo elegante per gestire gli errori, usando `.catch()`. È fondamentalmente una variante speciale di `.then()` – dove vengono gestiti tutti gli errori provenienti dai `.then()` precedenti. Vediamo un esempio…

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

Sebbene `.catch()` possa ricordare un gestore di eventi DOM (ad es. `click`, `keypress`), la sua posizione è cruciale, perché può “catturare” solo gli errori lanciati **sopra di esso**.

**Sovrascrivere gli errori è relativamente banale** Restituendo un valore non di errore nel callback di `.catch()`, la catena di Promise riprende a eseguire i callback di `.then()` in sequenza. (In pratica.)

Prova a seguire la sequenza del seguente esempio:

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // expected output: 100
```

**È la sequenza che è importante comprendere.**

Mentre l'esempio è volutamente banale, è pensato per **illustrare come fluiscono errori e dati** nelle Promise.

Ecco lo schema della sequenza:

1. 42 è il valore iniziale.  
1. `hello` è sempre restituito dal metodo successivo.  
1. ignoriamo il valore precedente e solleviamo un errore con il messaggio `'totes fail'`.  
1. `.catch()` intercetta l'errore e, invece, restituisce `99`, che sarà gestito da qualsiasi `.then()` successivo.  
1. incrementiamo `num`, restituendo `100`.  
1. il metodo `console.log` riceve `100` e lo stampa! :tada:

**Domanda:** Cosa succede quando ci sono 2 `.catch()` in sequenza? Il secondo può mai essere eseguito? Riesci a immaginare un caso d'uso?

**Domanda:** Come può `.catch()` ignorare gli errori? Come faresti in modo che gli errori non forzino un'uscita anticipata di `Promise.all`?

#### #4 Aggiungi chiarezza con funzioni nominate 🦄✨

Confronta la **leggibilità** dei seguenti 2 esempi:

**Anonimo:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```

**Nominato:** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // expected output: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)

```

**BONUS:** ✅

> Compatibile con i metodi degli array!!!

Puoi riutilizzare le tue funzioni nominate con i nostri amici di `Array.prototype.` Inclusi `.map()`, `.filter()`, `.every()`, `.some()`, `.find()`!

Pipeline di collezioni #FTW:

```js
// IT'S LIKE THE SAME THING :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // expected 2 lines of output: "25.00", "100.00"

```

E se non vuoi scrivere codice lineare… Beh, hai a disposizione funzioni semplici!

Puoi usarle come preferisci:

```js
// Nesting patern
// ❌ please don't do this, however

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**Perché l’annidamento delle funzioni è un anti‑pattern?**

1. Non è leggibile per molte persone  
2. I diff di git non mostrano subito chi ha cambiato cosa  
3. È difficile fare debug o log dal mezzo delle funzioni annidate
````
