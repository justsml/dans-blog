# Translation Candidate
- Slug: intro-to-promises
- Locale: de
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2018-08-01--intro-to-promises/de/index.mdx
- Validation: deferred
- Runtime seconds: 59.28
- Input tokens: 3853
- Output tokens: 12617
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Einführung in Promises
subTitle: JavaScript-Promises machen Spaß!
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
## Promises... wofür braucht man sie?

Bei der Ausführung von Code gibt es immer zwei mögliche Ergebnisse: **Erfolg** oder **Fehler**.

Ist der Code asynchron, ist es schwieriger, sich zuverlässig auf das Ergebnis zu verlassen.

**`Promises`** bieten einen praktischen Mechanismus, um damit umzugehen.

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

> Hinweis: Promises sollten entweder resolved oder rejected werden, können dies aber auch unterlassen. Das führt zu hängenden Anwendungen und ist häufig schwer zu debuggen.

### Woher kommen Promises?

Oftmals ist es nicht erforderlich, ein Promise selbst zu erstellen. Native APIs wie `fetch` und beliebte Bibliotheken wie `axios` geben bereits Promises zurück.

Falls Sie ein Promise dennoch selbst erstellen müssen, stehen zwei Wege zur Verfügung:

### Promises erstellen #1/2:

Der einfachste Weg, ein Promise zu erstellen, ist die Hilfsmethode `Promise.resolve()`.

Mithilfe von `Promise.resolve(value)` können Sie jeden beliebigen Wert in ein Promise verpacken (oder „konvertieren“).

```js
// Without Promises:
function add10(num) {
  return num + 10
}

// With Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Promises erstellen #2/2:

Eine weitere, flexiblere Methode: Nutzen Sie den `Promise`-Konstruktor.

`new Promise(callback)` erwartet eine `callback`-Funktion mit folgender Signatur:

```js
new Promise(function(resolve, reject) {
  // The arguments `resolve` and `reject` are both functions.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` must get executed when the promise is fulfilled
  // `reject(Error)` must get executed if the promise is rejected
})
```

### Promises-API

Die Promises-API besteht tatsächlich nur aus wenigen Methoden.

2 Instanzmethoden und 4 statische/Utility-Methoden.

#### Promise-Instanzmethoden

Der Zugriff auf Werte aus einem Promise funktioniert nicht mit den üblichen Tricks (z. B. `console.log(promise)`).

Alle Promises liefern entweder Erfolg (via `.then(fn)`) oder Fehler (via `.catch(fn)`).

#### Promise-Utility-Methoden

* `Promise.resolve(value)` - Konvertiert beliebige Werte in ein Promise
* `Promise.reject(Error)` - Erzeugt einen Promise mit Fehlerstatus, löst nachfolgendes `.catch()` aus
* `Promise.all([...promises])` - Wartet, bis alle Promises im Array abgeschlossen sind
* `Promise.race([...promises])` - Löst aus, sobald das erste Promise im Array aufgelöst ist
````
