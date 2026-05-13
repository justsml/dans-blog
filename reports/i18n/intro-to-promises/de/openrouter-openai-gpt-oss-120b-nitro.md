# Translation Candidate
- Slug: intro-to-promises
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/de/index.mdx
- Validation: passed
- Runtime seconds: 1.95
- Input tokens: 3892
- Output tokens: 794
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000295
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Einführung in Promises
subTitle: JavaScript‑Promises machen Spaß!
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
## Promises… Was ist ihr Zweck?

Immer wenn Sie irgendeinen Code ausführen, gibt es 2 mögliche Ergebnisse: **Erfolg** oder **Fehler**.

Ist dieser Code asynchron, ist es schwieriger, sich zuverlässig auf das Ergebnis zu verlassen.

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

> Hinweis: Obwohl Promises auflösen oder ablehnen sollten, können sie beide Möglichkeiten unterbleiben. Das führt dazu, dass Anwendungen hängen bleiben und ist oft schwer zu debuggen.

### Woher kommen Promises?

Viele Male benötigen Sie keinen eigenen Promise. Native APIs wie `fetch` und populäre Bibliotheken wie `axios` geben bereits Promises zurück.

Falls Sie jedoch selbst einen Promise erzeugen müssen, gibt es 2 Vorgehensweisen:

### Promises erstellen #1/2:

Der einfachste Weg, einen Promise zu erzeugen, ist die Hilfsmethode `Promise.resolve()`.

Sie können jeden beliebigen Wert in einen Promise „verpacken“ (oder „konvertieren“) mit `Promise.resolve(value)`.

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

Eine flexiblere Methode: den `Promise`‑Konstruktor verwenden.

`new Promise(callback)` akzeptiert eine `callback`‑Funktion mit folgender Signatur:

```js
new Promise(function(resolve, reject) {
  // Die Argumente `resolve` und `reject` sind beide Funktionen.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` muss ausgeführt werden, wenn das Promise erfüllt wird
  // `reject(Error)` muss ausgeführt werden, wenn das Promise abgelehnt wird
})
```

### Promise‑API

Die Promise‑API besteht tatsächlich nur aus wenigen Methoden.

2 Instanz‑Funktionen und 4 statische/Utility‑Funktionen.

#### Promise‑Instanzmethoden

Zugriff auf Werte aus einem Promise funktioniert nicht mit den üblichen Tricks (z. B. `console.log(promise)`).

Alle Promises liefern entweder Erfolg (via `.then(fn)`) oder Fehler (via `.catch(fn)`).

#### Promise‑Utility‑Methoden

* `Promise.resolve(value)` – Konvertiert einen beliebigen Wert in ein Promise  
* `Promise.reject(Error)` – Erzeugt ein fehlerhaftes Promise, löst nachfolgende `.catch()` aus  
* `Promise.all([...promises])` – Wartet, bis ein Array von Promises **alle** abgeschlossen sind  
* `Promise.race([...promises])` – Wird erfüllt, sobald das erste Promise erfüllt ist
````
