# Translation Candidate
- Slug: visualizing-promises
- Locale: de
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2018-09-30--visualizing-promises/de/index.mdx
- Validation: deferred
- Runtime seconds: 48.55
- Input tokens: 3491
- Output tokens: 13168
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.013692
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
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
Um die Ausführung von Promises zu visualisieren, definieren wir eine neue Methode `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

Diese Hilfsfunktion löst das Promise auf, sobald das Timeout abgelaufen ist.

Die Verzögerung in Millisekunden wird an den Callback von `.then` übergeben.

Betrachten wir vier Beispiele (mit animierten Zeitstrahlen).

## Beispiel #1/4

Dies zeigt, wie die Ausführung von `console.log()` durch `delay(msec)` verzögert wird.

```js
delay(1000).then(() => console.log("done"));
```

![Zeitstrahl: delay 1000, dann console.log nach einer Sekunde](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Beispiel #2/4

_Dies zeigt einen häufigen Fehler._

`console.log` wird genau dann ausgeführt, wenn `delay(1000)` **beginnt**. Nicht **nach** der Verzögerung, wie Sie es wahrscheinlich wollten.

Da `console.log` `undefined` zurückgibt, wird unser `.then()`-Aufruf stillschweigend ignoriert.

Beachten Sie den Unterschied zwischen `typeof console.log === 'function'` und `typeof console.log() === undefined`.

Die gewünschte Verwendung von `console.log` wird in Beispiel #1 gezeigt. Stellen Sie sicher, dass Sie Funktionen an `.then` und `.catch` übergeben.

```js
delay(1000).then(console.log("done"));
```

![Zeitstrahl: console.log wird sofort ausgeführt, bevor die Verzögerung endet](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Beispiel #3/4

3 Promises werden gleichzeitig ausgeführt.

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![Zeitstrahl: drei delay-Promises lösen sich nach ein, zwei und drei Sekunden auf](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## Beispiel #4/4

`` `Promise.all` `` mit 3 `` `delay` ``-Promises. Sie werden parallel ausgeführt.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Zeitstrahl, der zeigt, wie Promise.all auf alle drei delay-Promises wartet](../N_3000ms_PromiseAll.webp)

<!--

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

-->

> Quellen:
>
> - Animierte Async-Diagramme von [Patrick Biffle](https://github.com/Piglacquer)
> - Inspirationsquelle für diesen Artikel: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Question #1: Meaning of life:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">What is the meaning of life?</div>

</div> -->
````
