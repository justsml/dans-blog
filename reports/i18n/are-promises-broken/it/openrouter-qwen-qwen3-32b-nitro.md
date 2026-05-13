# Translation Candidate
- Slug: are-promises-broken
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/it/index.mdx
- Validation: passed
- Runtime seconds: 19.77
- Input tokens: 8943
- Output tokens: 8531
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002763
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promesse rotte?
unlisted: true
subTitle: 'Ignorare gli errori, perdita di risultati...'
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
## I Promises JavaScript sono rotti?

### Nel periodo precedente

Uno dei miti più comuni sui Promises è il loro presunto difetto di gestione degli errori.

**Molti anni fa**, i Promises **erano davvero pessimi** nella gestione degli errori. **Molto lavoro è stato dedicato a risolvere il problema.**

> Ecco, **è stato risolto**, addirittura **ampiamente distribuito**.

#### Le persone hanno festeggiato

E purtroppo, alcuni non l'hanno notato.

### I tempi attuali

Il mito persiste, lo vedo ovunque: [articoli popolari su Medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [su DZone](#redacted), e [molti](https://medium.com/@avaq/broken-promises-2ae92780f33) altri fonti.

Ammetto che anche le risorse e la documentazione "ufficiali" offrono prevalentemente [esempi fragili e cattive abitudini](../promise-gotchas/). Questi vengono spesso utilizzati per "dimostrare" il caso contro i Promises. Alcuni addirittura suggeriscono "rimedi" che peggiorano le cose in modo significativo. (nota: link rimosso)

<!-- Uno di questi consigli che ho visto più volte è di non usare mai `.catch`, ma invece utilizzare l'evento globale "unhandledRejection". **MAI** fare questo. unhandledRejection è progettato per la pulizia di riferimenti globali, come connessioni al database, prima di uno spegnimento imminente.) -->

<br />
<br />

## Regole per rimanere fuori dai guai

1. [Le Promises hanno bisogno di qualcosa a cui aggrapparsi](#1-promises-hanno-bisogno-di-qualcosa-a-cui-aggrapparsi)  
    * **Sempre** `restituisci` un valore.
1. [Usa istanze reali di `Error`](#2-usa-istanze-real-di-error)  
    * **Sempre** usare istanze di `Error`.
1. [Gestisci gli errori dove ha senso](#3-gestisci-gli-errori-dove-ha-senso)  
    * **Sempre** usare `.catch()`, almeno una volta.
1. [Aggiungi chiarezza con funzioni denominate 🦄✨](#4-aggiungi-chiarezza-con-funzioni-denominate-)  
    * __Preferisci__ funzioni denominate.

-------------------------------------------

#### #1 Le Promises hanno bisogno di qualcosa a cui aggrapparsi

È fondamentale che tu **sempre restituisca** un valore dalle tue funzioni.

Le funzioni callback delle Promises seguono uno schema specifico in `.then(callback)` e `.catch(callback)`.

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

> Bonus del "sempre restituisci": il codice è molto più semplice da testare in unità.

**Domanda:** Quanti stati distinti delle Promises (risolti & rifiutati) sono stati creati?

**Domanda:** Quante promesse sono state create nell'esempio precedente?

#### #2 Usa istanze reali di `Error`

JavaScript ha un comportamento interessante riguardo agli errori (che si applica al codice **sincrono** e **asincrono**).

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>vedi esempio su repl.it: `lancio di errori in JavaScript`</i>]</a>  
<img alt="lancio di errori in JavaScript" src="../throwing-errors-in-javascript.webp" />  

Per **ottenere dettagli utili sul numero della riga** e sullo stack di chiamate, devi utilizzare istanze `Error`. Lanciare stringhe non funziona come in Python o Ruby.  

JavaScript **sembra** gestire `throw "string"`, poiché vedrai la stringa nel tuo gestore `catch`. Tuttavia, i dati saranno tutto ciò che vedrai*. Nessun frame dello stack precedente verrà incluso.  

Esempi corretti con `new Error`:  

```js  
throw new Error('message')           // ✅  
Promise.reject(new Error('message')) // ✅  
throw Error('message')               // ✅  
Promise.reject(Error('message'))     // ✅  
```  

Questi sono anti-pattern comuni:  

```js  
throw 'error message'  // ❌  
Promise.reject(-42)    // ❌  
```  

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 Gestisci gli errori dove ha senso  

Le Promises offrono un modo elegante per gestire gli errori, utilizzando `.catch()`. Si tratta essenzialmente di un tipo speciale di `.then()` - dove vengono gestiti eventuali errori generati dai `.then()` precedenti. Vediamo un esempio...  

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```  

Sebbene `.catch()` possa sembrare simile a un gestore di eventi DOM (es. `click`, `keypress`), la sua posizione è importante, poiché può "catturare" solo gli errori generati **sopra di esso**.  

**Sovrascrivere gli errori è relativamente semplice**. Restituisci un valore non errore nel callback `.catch()`, e la catena delle Promises riprenderà l'esecuzione dei callback `.then()` in sequenza. (In pratica.)  

Prova a seguire la sequenza dell'esempio seguente:  

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // output previsto: 100
```  

**La sequenza è ciò che è importante capire.**

Sebbene l'esempio possa sembrare banale, è progettato per **illustrare come scorrono errori e dati** all'interno delle Promises.  

Ecco un riepilogo della sequenza:  

1. 42 è il valore iniziale.  
1. `hello` viene sempre restituito dal metodo successivo.  
1. ignoriamo il valore precedente e generiamo un errore con il messaggio `'totes fail'`.  
1. `.catch()` intercetta l'errore e restituisce invece `99`, che verrà gestito da qualsiasi `.then()` successivo.  
1. incrementiamo `num`, restituendo `100`  
1. il metodo `console.log` riceve `100` e lo stampa! :tada:  

**Domanda:** Cosa succede quando ci sono due `.catch()` in sequenza? Può mai eseguirsi il secondo? Puoi pensare a un caso d'uso?  

**Domanda:** Come può `.catch()` ignorare gli errori? Come impediresti agli errori di forzare un'uscita anticipata da `Promise.all`?  

#### #4 Aggiungi chiarezza con funzioni denominate 🦄✨

Confronta la **leggibilità** dei seguenti 2 esempi:

**Anonima:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```

**Denominate:** ✅

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

> Compatibili con i metodi degli array!!!

Puoi riutilizzare le tue funzioni denominate con i nostri amici da `Array.prototype.` Inclusi `.map()`, `.filter()`, `.every()`, `.some()`, `.find()`!

Collection pipelines #FTW:

```js
// IT'S LIKE THE SAME THING :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // expected 2 lines of output: "25.00", "100.00"

```

E se non vuoi usare questo stile lineare... Beh, hai le semplici funzioni!

Puoi usarle come ti serve:

```js
// Nesting pattern
// ❌ non farlo comunque

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**Perché annidare le funzioni è un anti-pattern?**

1. Non leggibile per molte persone
2. I diff di git non mostrano facilmente chi ha apportato quali modifiche
3. Difficile da debuggare o registrare dal mezzo delle funzioni annidate
````
