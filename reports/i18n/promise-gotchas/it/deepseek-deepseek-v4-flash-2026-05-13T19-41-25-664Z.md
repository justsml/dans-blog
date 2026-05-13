# Translation Candidate
- Slug: promise-gotchas
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-09-26--promise-gotchas/it/index.mdx
- Validation: deferred
- Runtime seconds: 12.54
- Input tokens: 2803
- Output tokens: 2171
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.000895
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Insidie delle Promise
subTitle: Evitare errori comuni
date: '2018-09-26'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - debugging
  - errors
  - javascript
  - composition
related:
  - intro-to-promises
  - visualizing-promises
  - are-promises-broken
  - javascript-promises-quiz
cover: ../michal-parzuchowski-224092-unsplash.webp
cover_mobile: ../w300_michal-parzuchowski-224092-unsplash.webp
cover_icon: ../icon_michal-parzuchowski-224092-unsplash.webp
---
### Le Promise non funzionano come altri valori

Non puoi stampare il loro valore come per la maggior parte dei valori:

```js
// Questo non ha senso con le Promise:
console.log(Promise.resolve(42));

// Dobbiamo usare l'interfaccia `.then`:
Promise.resolve(42).then(value => console.log(value));
```

### Le Promise non ti avvertono quando commetti un errore

Beh, un errore comune.

Per una serie di ragioni, TC39 ha deciso che a `.then` e `.catch` può essere passato `null`. Ad esempio, `.then(null, null)` è valido e il comportamento richiesto è saltare quel "passo" nella catena.

La sfortunata conseguenza di ciò è che è molto facile fare pasticci.

##### Per Esempio

Diamo un'occhiata a una mini sfida: quale delle seguenti opzioni stamperà `42` con `console.log`?

```js
// Opzione #1:
Promise.resolve(42).then(console.log());

// Opzione #2:
Promise.resolve(42).then(console.log);

// Opzione #3:
Promise.resolve(42).then(value => console.log(value));

// Opzione #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### La Risposta

La risposta è #2, #3 e #4.

Perché? Diamo un'occhiata ai **tipi** di ciò che è stato passato a `.then()`:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

Ancora ti stai chiedendo come funzioni la quarta opzione?

In pratica funziona così:

```js
// Opzione #4 - di fatto
Promise.resolve(42)
  .then(undefined) // non ha effetto sul valore, che verrà passato al successivo `.then(fn)`
  .then(console.log);
```
````
