# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/de/index.mdx
- Validation: passed
- Runtime seconds: 22.73
- Input tokens: 9942
- Output tokens: 9198
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003003
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Hör auf, async/await zum Laufen zu bringen'
subTitle: ''
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
Seit Anbeginn der Zeit haben Entwickler viele sinnlose Streitigkeiten ausgetragen. Von der klassischen _"Tabs vs. Spaces"_-Debatte bis hin zum zeitlosen _"Mac vs. PC"_-Streit – wir sind gut darin, ablenkende Argumente zu finden.  

<br />
<small>_Antworten:_ Linux & Leerzeichen.</small>

<!-- Wir werden uns 2 Regeln ansehen, um das Leben mit Promises zu verbessern. -->

## Der Streit...?

### Promises vs. Async/Await!

Warte, ist das ein Streit? Muss es sein? Wir sprechen nicht mehr über Callbacks?

Es ist kein Streit. Letztendlich ist es ein weiteres potenzielles Werkzeug in deinem Werkzeugkasten. Da `async`/`await` nicht alle Funktionalitäten von Promises ersetzt (insbesondere `Promise.all`, `.race`) ist es irreführend, es als Ersatz darzustellen.  

Viele einflussreiche Personen fördern diese Fehlvorstellung, dass `async`/`await` die Promises [Ersetzung](https://developers.google.com/web/fundamentals/primers/async-functions) [für alle](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [gewesen](https://x.com/umaar/status/1045655069478334464) [zu](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [warten](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba) [war].  

> **Hinweis: Nein, nein und nicht im Geringsten.**  

Ein kürzlich hinzugefügtes Feature in VS Code fördert diese Verzerrung. Wie [@umaar](https://x.com/umaar) in einem Tweet schrieb:  

<blockquote class="twitter-tweet" data-lang="de"><p lang="de" dir="ltr">Visual Studio Code kann jetzt deine langen Ketten von Promise.then()-Aufrufen in async/await umwandeln! 🎊 Funktioniert hervorragend in JavaScript- und TypeScript-Dateien. .catch() wird ebenfalls korrekt in try/catch konvertiert ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">28. September 2018</a></blockquote>

Wenn Sie Promises hassen und diese Refaktorierungs-Funktion wünschen, kann ich das verstehen.  
*Ich kann das nachvollziehen. Ich verstehe.*  
<br />  
Ich war schon da. 🤗

Ich hasste Promises früher. Heute bin ich vollständig umgeschwenkt. **Promises sind großartig.** Sie können Ihnen **ermöglichen, von der Funktionskomposition zu profitieren.**  

Es gibt zwei Bereiche, auf die ich mich zuerst konzentrieren würde, um Ihre Promise-Technik zu verbessern:  

1. [Benannte Funktionen (keine anonymen)](#rule-1)  
1. [Einzelzweckfunktionen](#rule-2)  

<h2 id="rule-1">#1: Benannte Funktionen!</h2>  

Töten Sie Ihre anonymen Methoden. Der Einsatz von **benannten Funktionen** macht den Code zu einem Gedicht Ihrer Anforderungen.  

Schauen wir uns ein häufiges Beispiel an:

Ein HTTP GET-Antrag mithilfe von `fetch`:

<!-- Die fetch-Spezifikation besagt, dass [HTTP-Statuscodes](https://http.cat/) über 400 oder 500 **nicht automatisch einen Fehler auslösen.** Der Standard in vielen AJAX-Bibliotheken (jQuery, axios). -->

<!-- Bevor wir die Lösung sehen, werfen wir einen Blick auf eine gängige "empfohlene" Implementierung: -->

### Anti-Muster

```js
// ❌ Anonyme Inline-Funktionen verwenden 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### Lösung: Benannte Methoden

```js
// ✅ Klarheit entsteht: benannte Funktionen
fetch(url)
  .then(checkResponse)
  .then(getText)


// Wiederverwendbare allgemeine Funktionen
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> Die Vorteile dieses Ansatzes werden offensichtlicher, je drierter der Code wird.

**Zusätzliche Ressourcen:** Schauen Sie sich meine **1-minütigen Videos** zu [Grundlagen der Protokollierung](https://youtu.be/xR_MZE1SIkk) und [Erweitertes Debuggen](https://youtu.be/P_tghqWj72M) mit dieser Technik an.

<h2 id="rule-2">#2: Eindeutiger Zweck (Funktionen)</h2>

Es klingt _trügerisch präzise_: Eindeutiger Zweck.

Doch es ist so subjektiv, willkürlich und sicher, manchmal sogar sinnlos.

<!-- Statt zu diskutieren, ob eine gegebene Funktion ausreichend fokussiert ist.

Ich habe eine grobe Maßnahme dafür entwickelt: `Purpose Cost`. Je höher die Punktzahl, desto wahrscheinlicher tut sie zu viel. -->

```js
// 1 Punkt: return & ternärer Operator sind effektiv eine Einzeiler
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 Punkt: return & Ausdruck sind effektiv eine Einzeiler
function getText(response) {
  return response.text()
}
```

Bei einer Funktion zählt man 1 Punkt für jede Zeile, die eines der folgenden enthält: `if`, `return`, ternärer Operator, `for`, `const`, `let`, `var`, `switch`, `while`, `[].map/filter/reduce/etc`. Zählt 1 Punkt pro Anweisung (ignoriert zusätzliche Leerzeilen). Eine Kette von Ausdrücken oder Methoden zählt nur zu 1 Punkt.

Das war eine Menge Fachbegriffe. 

Interessanterweise behaupten viele Entwickler, sie seien _ziemlich gut_ darin, ihren Code auf **Eindeutigen Zweck** zu reduzieren. Nicht unbedingt überraschend: Sie behaupten auch, hervorragende Fahrer zu sein!

<!-- Dieses Problem ist **nicht einzigartig für Promises**, Array-Methoden und alle anderen HoF-basierten (Higher Order Function) APIs haben dieselben Ergonomie-Probleme. -->

Schauen wir uns ein Beispiel an, das (der unglaublich talentierte) [Jake Archibald](https://x.com/jaffathecake) in seinem async/await Artikel für die Google Developers Seite erwähnt (Hinweis: 2024, Link entfernt).

<!-- 
Schauen wir uns eines der sogenannten "❌ Nicht empfohlen" Promise-Beispiele an. (Die Beschreibung lautet: "Angenommen, wir wollten eine Serie von URLs abrufen und sie so bald wie möglich in der richtigen Reihenfolge protokollieren.") 
-->

```js
// Quelle: https://developers.google.com/web/fundamentals/primers/async-functions
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

### Einzelner Zweck?

Ich sage nein. Was tut `logInOrder`?

1. Durchlaufen einer Liste von `urls`
1. Anwenden auf einen inline HTTP GET:
  1. HTTP `fetch`
  1. Rückgabe des Text-Body der Antwort
1. Nach jedem Promise in `textPromise` ein `.then(text => console.log(text))` anhängen
  1. Ergebnisse nacheinander ausgeben

In dieser einzelnen Funktion sind 5 anonyme Methoden definiert. Wie Jake bereits anmerkt, ist die `.reduce`-Implementierung zu komplex. Es macht keinen Sinn, überall im Code manuell nuancierte Mechanismen zu schreiben. Um es anders auszudrücken: Wir schreiben nicht endlos `document.createElement()`, `element.setAttribute()` usw. für DOM-Erstellung. Stattdessen wählen wir das beste Tool aus vielen Optionen: Hilfsfunktionen, Bibliotheken oder Frameworks.

<!-- Wir müssen jeden 'Schritt' isolieren: Es gibt eine HTTP-Anfrage, eine Transformation einer URL-Liste in eine Ergebnisliste. Außerdem ist ein `console.log` erforderlich. -->

<!-- > 🤔 Warum führen `Promises` dazu, dass Entwickler Praktiken aufgeben, die sie an anderen Stellen anwenden? -->

**Hinweis:** Wenn das Ziel darin bestand, _Anfragen_ nacheinander zu initiieren, anstatt lediglich die Ergebnisse in Reihenfolge auszugeben, tut dieser Code das tatsächlich nicht. Wir werden entsprechend refaktorisieren.

#### Lösung: Funktionen mit eindeutigem Zweck

### Beginnen Sie mit der **Extraktion von Methoden**...

![VS Code Refaktorisierung: Asynchrone Methoden aus Promise-Code extrahieren](../async-refactor-google-extract-methods-resized-75.webp "Methoden extrahieren")

### Setzen Sie fort, indem Sie `.reduce()` und `logPromise()` durch `Promise.all` und `..map()` ersetzen...

![Refaktorisierte Promise-Kette mit Promise.all und map für bessere Lesbarkeit](../async-refactor-google-chain-methods-resized-75.webp "Lesbarkeit verbessern")

### Zusammenfassung

Wenden Sie diese Techniken an Ihrem eigenen Code an! Dann [tweeten Sie mir](https://x.com/justsml) und lassen Sie mich wissen, wie es gelaufen ist. Oder wenn Sie Fragen oder Kommentare haben, melden Sie sich ebenfalls! 

Helfen Sie mit, die #PromiseTruth zu verbreiten & diesen Artikel zu teilen. ❤️

![Bildnachweis: matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### Weitere Leseempfehlungen

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
