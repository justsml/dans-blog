# Translation Candidate
- Slug: promise-gotchas
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/de/index.mdx
- Validation: passed
- Runtime seconds: 6.60
- Input tokens: 2489
- Output tokens: 2705
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000848
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise Fallen
subTitle: Häufige Fehler vermeiden
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
### Promises funktionieren nicht wie andere Werte

Sie können ihren Wert nicht wie die meisten anderen Werte ausgeben:

```js
// Das ergibt mit Promises keinen Sinn:
console.log(Promise.resolve(42));

// Wir müssen die `.then`-Schnittstelle verwenden:
Promise.resolve(42).then(value => console.log(value));
```

### Promises warnen Sie nicht, wenn Sie einen Fehler machen

Nun, ein häufiger Fehler.

Aus verschiedenen Gründen wurde von TC39 entschieden, dass `.then` und `.catch` mit `null` übergeben werden dürfen. Zum Beispiel ist `.then(null, null)` gültig, und das erforderliche Verhalten besteht darin, diesen „Schritt“ in der Kette zu überspringen.

Die unerwünschte Folge hiervon ist, dass es sehr einfach ist, Fehler zu machen.

##### Beispielsweise

Betrachten wir ein kleines Rätsel: Welche der folgenden Optionen wird `console.log` 42 ausgeben?

```js
// Option #1:
Promise.resolve(42).then(console.log());

// Option #2:
Promise.resolve(42).then(console.log);

// Option #3:
Promise.resolve(42).then(value => console.log(value));

// Option #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### Die Antwort

Die Antwort ist Option #2, #3 und #4.

Warum? Schauen wir uns die **Typen** an, die an `.then()` übergeben wurden:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

Noch immer unsicher, wie die vierte Option funktioniert?

Es verhält sich effektiv so:

```js
// Option #4 - effektiv
Promise.resolve(42)
  .then(undefined) // dies hat keinen Einfluss auf den Wert, er wird an den folgenden `.then(fn)` weitergegeben
  .then(console.log);
```
````
