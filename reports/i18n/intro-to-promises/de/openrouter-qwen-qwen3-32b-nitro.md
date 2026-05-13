# Translation Candidate
- Slug: intro-to-promises
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/de/index.mdx
- Validation: passed
- Runtime seconds: 7.88
- Input tokens: 3358
- Output tokens: 3448
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001096
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Einführung in Promises
subTitle: JavaScript-Versprechen sind spaßig!
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
## Promises... Was ist daran besonders?

Wenn Sie irgendeinen Computercode ausführen, gibt es zwei mögliche Ergebnisse: **Erfolg** oder **Fehler**.  

Wenn dieser Code asynchron ist, kann es schwieriger sein, auf das Ergebnis verlässlich zu rechnen.  

**`Promises`** bieten eine nützliche Methode, um damit umzugehen.  

```
                        +--Promise---+
                        |            |
                        | <-entweder-> |
                        |            |
                <-------+            +-------->
                |Fehler?              Erfolg?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> Seitennotiz: Obwohl Promises entweder resolve oder reject sollten, können sie es unter Umständen nicht tun. Dies führt dazu, dass Anwendungen hängen bleiben, und kann sehr schwierig zu debuggen sein.  

### Woher kommen Promises?

Häufig müssen Sie selbst keine Promise erstellen. Native APIs wie `fetch` und populäre Bibliotheken wie `axios` liefern bereits Promises zurück.  

Wenn Sie jedoch eine Promise erstellen müssen, gibt es zwei Möglichkeiten dazu:  

### Erstellen von Promises #1/2:  

Die einfachste Art, eine Promise zu erstellen, ist die Hilfsmethode `Promise.resolve()`.  

Sie können jeden Wert mithilfe von `Promise.resolve(value)` in eine Promise umwickeln (oder "konvertieren").  

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

### Erstellen von Promises #2/2:

Ein weiterer flexiblerer Ansatz: Verwenden des `Promise`-Konstruktors.  

`new Promise(callback)` akzeptiert eine `callback`-Funktion mit der folgenden Schnittstelle:  

```js
new Promise(function(resolve, reject) {
  // Die Argumente `resolve` und `reject` sind beide Funktionen.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` muss ausgeführt werden, wenn der Promise erfüllt wird
  // `reject(Error)` muss ausgeführt werden, wenn der Promise abgelehnt wird
})
```

### Promises-API  

Die Promises-API besteht tatsächlich nur aus einer kleinen Anzahl von Methoden.  

2 Instanzmethoden und 4 statische/Utility-Methoden.  

#### Promise-Instanzmethoden

Der Zugriff auf Werte aus einer Promise funktioniert nicht mit üblichen Tricks (z. B. `console.log(promise)`).

Alle Promises geben entweder Erfolg (über `.then(fn)`) oder Fehler (über `.catch(fn)`) zurück.

#### Promise-Utility-Methoden

* `Promise.resolve(value)` - Umwandelt einen beliebigen Wert in eine Promise  
* `Promise.reject(Error)` - Erzeugt einen fehlerhaften Promise-Wert, löst anschließende `.catch()` aus  
* `Promise.all([...promises])` - Wartet, bis alle Promises in einem Array abgeschlossen sind  
* `Promise.race([...promises])` - Löst sich, sobald die erste Promise erfüllt ist
````
