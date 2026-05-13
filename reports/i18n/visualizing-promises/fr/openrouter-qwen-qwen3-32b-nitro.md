# Translation Candidate
- Slug: visualizing-promises
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/fr/index.mdx
- Validation: passed
- Runtime seconds: 10.42
- Input tokens: 4506
- Output tokens: 4047
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001332
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Visualisation des Promesses
subTitle: ''
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
Pour visualiser l'exécution des Promises, définissons une nouvelle méthode `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

C'est une méthode utilitaire qui se résout une fois que le délai d'attente est écoulé.

Le délai en millisecondes sera transmis au callback de `.then`.

Examinons 4 exemples (avec des chronologies animées).

## Exemple #1/4

Cela montre comment l'exécution de `console.log()` sera retardée par `delay(msec)`.

```js
delay(1000).then(() => console.log("done"));
```

![Chronologie montrant delay 1000 puis console log s'exécutant après une seconde](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Exemple #2/4

_Cela illustre une erreur courante._

Le `console.log` s'exécute dès le début de `delay(1000)`. Pas **après** le délai comme vous le vouliez probablement.

Car `console.log` retourne `undefined`, notre `.then()` est ignoré en silence.

Notez la différence entre `typeof console.log === 'function'` et `typeof console.log() === undefined`.

En général, l'utilisation souhaitée de `console.log` est illustrée dans l'Exemple #1. Assurez-vous de passer des fonctions dans `.then` et `.catch`.

```js
delay(1000).then(console.log("done"));
```

![Chronologie montrant le console.log s'exécutant immédiatement avant la fin du délai](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Exemple #3/4

3 Promises s'exécutent simultanément.

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![Chronologie montrant trois promesses delay résolues après 1, 2 et 3 secondes](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## Exemple #4/4

`Promise.all` avec 3 promesses `delay`. Elles s'exécuteront simultanément.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Chronologie montrant Promise.all en attente des trois promesses delay](../N_3000ms_PromiseAll.webp)

<!-- ```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
``` -->

delay(1000) ---| [résolue]------------------v
delay(2000) ---|--------------| [résolue]---v
delay(3000) ---|--------------|--------------v [résolue]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec

> Crédits :
> 
> - Diagrammes asynchrones animés par [Patrick Biffle](https://github.com/Piglacquer)
> - Inspiration pour cet article : https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Question #1 : Sens de la vie :">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">Quel est le sens de la vie ?</div>

</div> -->
````
