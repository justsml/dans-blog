# Translation Candidate
- Slug: visualizing-promises
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 13.45
- Input tokens: 4459
- Output tokens: 4169
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001357
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale de
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Visualisierung von Promises
subTitle: Durchbrechen...
date: '2018-09-30'
modified: '2024-07-30'
category: Guides
subCategory: promises
cover: ../junior-ferreira-735237-unsplash.webp
cover_mobile: ../w300_junior-ferreira-735237-unsplash.webp
cover_icon: ../icon_junior-ferreira-735237-unsplash.webp
tags:
  - promises
  - async
  - visualizing
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
---
Um zu visualisieren, wie Promises ausgeführt werden, definieren wir eine neue Methode `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

Dies ist eine Hilfsmethode, die nach Ablauf des Timeouts aufgelöst wird.

Die Verzögerung in Millisekunden wird an den Callback von `.then` übergeben.

Schauen wir uns 4 Beispiele (mit animierten Zeitachsen) an.

## Beispiel #1/4

Dies zeigt, wie die Ausführung von `console.log()` durch `delay(msec)` verzögert wird.

```js
delay(1000).then(() => console.log("done"));
```

![Timeline showing delay 1000 then console log running after one second](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Beispiel #2/4

_Dies zeigt einen häufigen Fehler._

Der `console.log` wird direkt, sobald `delay(1000)` **beginnt**, ausgelöst. Nicht **nach** der Verzögerung, wie Sie es wahrscheinlich gewollt haben.

Weil `console.log` `undefined` zurückgibt, wird unser `.then()` stillschweigend ignoriert.

Beachten Sie den Unterschied zwischen `typeof console.log === 'function'` und `typeof console.log() === undefined`.

Im Allgemeinen ist die gewünschte Verwendung von `console.log` in Beispiel #1 dargestellt. Stellen Sie sicher, dass Sie Funktionen an `.then` und `.catch` übergeben.

```js
delay(1000).then(console.log("done"));
```

![Timeline showing console log running immediately before the delay finishes](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Beispiel #3/4

3 Promises führen gleichzeitig aus.

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![Zeitlinie, die drei delay-Versprechen zeigt, die nach einer, zwei und drei Sekunden gelöst werden](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## Beispiel #4/4

`Promise.all` mit 3 `delay`-Versprechen. Sie werden gleichzeitig ausgeführt.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Zeitlinie, die zeigt, wie Promise all auf alle drei delay-Versprechen wartet](../N_3000ms_PromiseAll.webp)

<!-- ``` 
--- CHUNK END ---
```

```
delay(1000) ---| [erfüllt]------------------v
delay(2000) ---|--------------| [erfüllt]---v
delay(3000) ---|--------------|--------------v [erfüllt]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

>

Credits:
> 
> - Animierte asynchrone Diagramme von [Patrick Biffle](https://github.com/Piglacquer)
> - Inspiration für diesen Artikel: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Frage #1: Sinn des Lebens:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">Was ist der Sinn des Lebens?</div>

</div> -->
````
