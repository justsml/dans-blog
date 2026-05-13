# Translation Candidate
- Slug: intro-to-promises
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/fr/index.mdx
- Validation: passed
- Runtime seconds: 7.33
- Input tokens: 3467
- Output tokens: 2840
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000959
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Introduction aux Promesses
subTitle: ''
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
## Les Promises... Quel est leur intérêt ?

Chaque fois que vous exécutez un code informatique, il y a deux résultats possibles : **succès** ou **échec**.

Si ce code est asynchrone, il peut être plus difficile d'exploiter de manière fiable ce résultat.

Les **`Promises`** offrent une solution pratique pour gérer cela.

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

> Note latérale : Bien qu'une Promise devrait résoudre ou rejeter, elle pourrait échouer à le faire. Cela entraîne des applications bloquées, et peut être très difficile à déboguer.

### D'où proviennent les Promises ?

Vous n'aurez souvent pas besoin de créer vous-même une Promise. Des APIs natives comme `fetch` et des bibliothèques populaires comme `axios` renvoient déjà des Promises.

Cependant, si vous devez créer une Promise, il existe 2 méthodes pour le faire :

### Création de Promises #1/2 :

La méthode la plus simple pour créer une Promise est d'utiliser la méthode d'aide : `Promise.resolve()`.

Vous pouvez envelopper (ou "convertir") n'importe quelle valeur en une Promise en utilisant `Promise.resolve(valeur)`.

```js
// Sans Promises :
function add10(num) {
  return num + 10
}

// Avec Promises :
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Création de Promises #2/2 :

Une méthode plus flexible : utiliser le constructeur `Promise`.

`new Promise(callback)` accepte une fonction `callback` avec l'interface suivante :

```js
new Promise(function(resolve, reject) {
  // Les arguments `resolve` et `reject` sont tous deux des fonctions.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` doit être exécuté lorsque la promesse est résolue
  // `reject(Error)` doit être exécuté si la promesse est rejetée
})
```

### API des Promises

L'API des Promises se compose en réalité d'un petit nombre de méthodes.

2 méthodes d'instance, et 4 fonctions statiques/utiles.

#### Méthodes d'instance des Promises

Il n'est pas possible d'accéder aux valeurs d'une Promise avec les méthodes habituelles (i.e. `console.log(promise)`).

Toutes les Promises retournent soit une réussite (via `.then(fn)`) soit un échec (via `.catch(fn)`).

#### Méthodes utilitaires des Promises

* `Promise.resolve(valeur)` - Convertit toute valeur en une Promise
* `Promise.reject(Erreur)` - Crée une valeur de Promise d'échec, déclenche le `.catch()` suivant
* `Promise.all([...promises])` - Attend qu'un tableau de Promises soit TOUT terminé
* `Promise.race([...promises])` - Résout dès que la première Promise est résolue
````
