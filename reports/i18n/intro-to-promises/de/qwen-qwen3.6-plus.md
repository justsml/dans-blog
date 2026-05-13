# Translation Candidate
- Slug: intro-to-promises
- Locale: de
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2018-08-01--intro-to-promises/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.06
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug intro-to-promises --locale de --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Einführung in Promises
subTitle: JavaScript Promises machen Spaß!
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
## Promises – worum geht es?

Bei jeder Ausführung von Computercode gibt es zwei mögliche Ergebnisse: **Erfolg** oder **Fehlschlag**.

Wenn dieser Code asynchron ist, wird es schwieriger, sich zuverlässig auf das Ergebnis zu verlassen.

**`Promises`** bieten eine praktische Möglichkeit, damit umzugehen.

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

> Randbemerkung: Obwohl Promises eigentlich auflösen oder ablehnen sollten, können sie beides verfehlen. Das führt zu hängenden Apps und kann sehr schwer zu debuggen sein.

### Woher kommen Promises?

Oft müssen Sie kein Promise selbst erstellen. Native APIs wie `fetch` und beliebte Bibliotheken wie `axios` geben bereits Promises zurück.

Falls Sie dennoch ein Promise erstellen müssen, gibt es zwei Möglichkeiten:

### Promises erstellen #1/2:

Der einfachste Weg, ein Promise zu erstellen, ist die Hilfsmethode: `Promise.resolve()`.

Sie können jeden Wert mit `Promise.resolve(value)` in ein Promise verpacken (oder „umwandeln“).

```js
// Ohne Promises:
function add10(num) {
  return num + 10
}

// Mit Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Promises erstellen #2/2:

Eine weitere, flexiblere Methode: der `Promise`-Konstruktor.

`new Promise(callback)` akzeptiert eine `callback`-Funktion mit folgendem Interface:

```js
new Promise(function(resolve, reject) {
  // Die Argumente `resolve` und `reject` sind beides Funktionen.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` muss ausgeführt werden, wenn das Promise erfüllt ist
  // `reject(Error)` muss ausgeführt werden, wenn das Promise abgelehnt wird
})
```

### Promises API

Die Promises API besteht tatsächlich aus nur wenigen Methoden.

2 Instanzmethoden und 4 statische/Hilfsfunktionen.

#### Promise-Instanzmethoden

Der Zugriff auf Werte aus einem Promise funktioniert nicht mit den üblichen Tricks (z.B. `console.log(promise)`).

Alle Promises geben entweder Erfolg (via `.then(fn)`) oder Fehlschlag (via `.catch(fn)`) zurück.

#### Promise-Hilfsmethoden

* `Promise.resolve(value)` - Wandelt einen beliebigen Wert in ein Promise um
* `Promise.reject(Error)` - Erzeugt einen Fehler-Promise-Wert, löst nachfolgendes `.catch()` aus
* `Promise.all([...promises])` - Wartet, bis ALLE Promises in einem Array abgeschlossen sind
* `Promise.race([...promises])` - Wird aufgelöst, sobald das erste Promise aufgelöst wird
````
