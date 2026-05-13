# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/it/index.mdx
- Validation: deferred
- Runtime seconds: 7.76
- Input tokens: 10741
- Output tokens: 2874
- Thinking tokens: unknown
- Cached input tokens: 3840
- Cache write tokens: 0
- Estimated cost: $0.000936
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Smetti di forzare async/await
subTitle: Le promesse sono davvero di tendenza.
date: '2018-10-03'
modified: '2024-08-03'
category: Guides
subCategory: promises
tags:
  - promises
  - async
  - await
  - async-await
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - you-may-not-need-axios
cover: ../matt-nelson-414464-unsplash.webp
cover_mobile: ../w300_matt-nelson-414464-unsplash.webp
cover_icon: ../icon_matt-nelson-414464-unsplash.webp
---
Dal principio dei tempi, gli sviluppatori hanno combattuto molte lotte inutili. Dal classico _“Tabs vs. Spaces”_ al senza tempo dibattito _“Mac vs. PC”_, siamo bravi a trovare argomenti di distrazione.

<br />
<small>_Risposte:_ Linux & Spaces.</small>

<!-- We're going to look at 2 rules to improve your life with Promises. -->

## La lotta…?

### Promises vs. Async/Await!

Aspetta, è una lotta? Deve esserlo, vero? Non ne parliamo più di callback?

No,non è una lotta. In definitiva è semplicemente un altro possibile strumento nel tuo arsenale. Tuttavia, poiché `async`/`await` non sostituisce tutte le funzionalità di Promise (in particolare `Promise.all`, `.race`) **presentarlo come un sostituto è fuorviante**.

Molte persone influenti promuovono questo equivoco: `async`/`await` è il [sostituto](https://developers.google.com/web/fundamentals/primers/async-functions) delle Promise [che tutti](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [hanno](https://x.com/umaar/status/1045655069478334464) [aspettato](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [per](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba).

> **Suggerimento: No, assolutamente no, e neanche per poco.**

Una recente aggiunta a VS Code alimenta questo bias. Come ha twittato [@umaar](https://x.com/umaar):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Visual Studio Code can now convert your long chains of Promise.then()&#39;s into async/await! 🎊 Works very well in both JavaScript and TypeScript files. .catch() is also correctly converted to try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">September 28, 2018</a></blockquote>

Se odi le Promise e vuoi questa funzionalità di refactoring, non ti biasimo.

<br />

_Empatizzo. Capisco._

<br />

Ci sono passato. 🤗

<br />

Usavo odiare le Promise. Oggi sono tornato indietro completamente. **Le Promise sono fantastiche.** Ti consentono/incentivano a **sfruttare la composizione di funzioni**.

Ci sono 2 aree su cui consiglio di concentrarsi per prima cosa per migliorare la tua tecnica con le Promise.

1. [Funzioni con nome (niente anonime)](#rule-1)
1. [Funzioni a scopo unico](#rule-2)

<h2 id="rule-1">#1: Funzioni con nome!</h2>

Elimina i metodi anonimi. L’uso di **funzioni con nome** fa sì che il codice legga come poesia dei tuoi requisiti.

Diamo un’occhiata a un esempio comune:

Eseguire una richiesta HTTP GET usando `fetch`:

<!-- la specifica fetch afferma che i [codici di stato HTTP](https://http.cat/) superiori a 400 o 500 **non generano automaticamente un errore**. Il comportamento predefinito in molte librerie AJAX (jQuery, axios). -->

<!-- Prima di vedere la soluzione, diamo un’occhiata a un’implementazione “raccomandata” comune: -->

### Anti‑Pattern

```js
// ❌ Using anonymous inline functions 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### Soluzione: Metodi con nome

```js
// ✅ Clarity emerges: named functions
fetch(url)
  .then(checkResponse)
  .then(getText)


// Reusable general-purpose functions
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> I vantaggi di questo approccio diventano sempre più evidenti man mano che il codice diventa più DRY.

**Risorse aggiuntive:** Dai un'occhiata ai miei **video da 1 minuto** su [log di base](https://youtu.be/xR_MZE1SIkk) e [debug avanzato](https://youtu.be/P_tghqWj72M) usando questa tecnica.

<h2 id="rule-2">#2: Scopo Unico (Funzioni)</h2>

Suona _sorprendentemente preciso_: Scopo Unico.

Eppure è così soggettivo, arbitrario e, a volte, persino privo di senso.

```js
// 1 punto: il return & ternario sono effettivamente una riga unica
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 punto: il return & l'espressione sono anch'essi una riga unica
function getText(response) {
  return response.text()
}
```

Dato il codice di una funzione, aggiungi 1 punto per ogni riga che contiene uno dei seguenti token: `if`, `return`, ternario, `for`, `const`, `let`, `var`, `switch`, `while`, `[].map/filter/reduce/etc`. Aggiungi 1 punto per ogni istruzione (ignora le righe vuote). Una catena di espressioni o metodi conta solo come 1 punto.

Uff, un po' di gergo.

Interessante, la maggior parte degli sviluppatori afferma di essere **abbastanza bravi** a mantenere il **Singolo Scopo** del loro codice. Non è un caso isolato: dicono anche di essere ottimi guidatori!

Diamo un’occhiata a un esempio presentato dal (incredibilmente talentuoso) [Jake Archibald](https://x.com/jaffathecake) nel suo articolo su async/await per il sito Google Developers (nota: 2024, link rimosso).

```js
// source: https://developers.google.com/web/fundamentals/primers/async-functions
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

### Scopo unico?

Direi di no. Cosa fa `logInOrder`?

1. itera su una lista di `urls`
2. le passa a una chiamata HTTP GET inline:
   1. `fetch` HTTP
   2. restituisce il corpo della risposta come testo
3. aggiunge un `.then(text => console.log(text))` dopo ogni promessa in `textPromise`
   1. stampa i risultati in serie

Ci sono 5 metodi anonimi definiti in questa singola funzione. Come osserva Jake, il `.reduce` è troppo complesso. Non ha senso scrivere a mano meccanismi sfumati in tutto il codice. In altre parole, non scriviamo codice di creazione DOM con infinite chiamate a `document.createElement()`, `element.setAttribute()`, ecc. Invece scegliamo lo strumento migliore tra le varie opzioni: funzioni di supporto/utility, librerie o framework.

<!-- **Nota:** Se l'intento era quello di _avviare le richieste_ in sequenza, anziché semplicemente stampare i risultati in ordine, questo codice non lo fa realmente. Lo rifattorizzeremo di conseguenza. -->

#### Soluzione: Funzioni a Scopo Unico

### Inizia **estrapolando i metodi**...

![VS Code refactor extracting async methods from Promise code](../async-refactor-google-extract-methods-resized-75.webp "Estrazione dei metodi")

### Prosegui sostituendo il `.reduce()` e `logPromise()` con un `Promise.all` e un `..map()`...

![Refactored Promise chain using Promise all and map for readability](../async-refactor-google-chain-methods-resized-75.webp "Miglioramento della leggibilità")

### Riepilogo

Prova ad applicare queste tecniche al tuo codice! Poi [mandami un tweet](https://x.com/justsml) e fammi sapere come è andata. Oppure, se hai domande o commenti, contattami pure!

Aiuta a diffondere #PromiseTruth e condividi questo articolo. ❤️

![credit: matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### Letture correlate

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
