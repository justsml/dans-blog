# Translation Candidate
- Slug: intro-to-promises
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-08-01--intro-to-promises/fr/index.mdx
- Validation: deferred
- Runtime seconds: 25.21
- Input tokens: 3878
- Output tokens: 3741
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001538
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Introduction aux Promesses
subTitle: 'Les promesses JavaScript, c''est amusant !'
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
## Promises... Quel est leur intérêt ?

Quand vous exécutez du code, deux résultats sont possibles : **succès** ou **échec**.

Si ce code est asynchrone, il peut être plus difficile de dépendre de ce résultat de manière fiable.

**`Promises`** offrent un moyen pratique de gérer cela.

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

> Note : Bien que les Promises soient censées se résoudre ou être rejetées, il peut arriver qu'elles ne fassent ni l'un ni l'autre. Cela fait planter les applications et peut être très difficile à déboguer.

### D'où viennent les Promises ?

Souvent, vous n'aurez pas besoin de créer une Promise vous-même. Des API natives comme `fetch` et des bibliothèques populaires comme `axios` retournent déjà des Promises.

Cependant, si vous devez créer une Promise, il y a deux façons de le faire :

### Créer des Promises #1/2 :

La façon la plus simple de créer une Promise est d'utiliser la méthode utilitaire `Promise.resolve()`.

Vous pouvez envelopper (ou « convertir ») n'importe quelle valeur en une Promise en utilisant `Promise.resolve(valeur)`.

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

### Créer des Promises #2/2 :

Une autre méthode plus flexible : utiliser le constructeur `Promise`.

`new Promise(callback)` accepte une fonction `callback` avec l'interface suivante :

```js
new Promise(function(resolve, reject) {
  // Les arguments `resolve` et `reject` sont tous deux des fonctions.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` doit être exécuté lorsque la promesse est tenue
  // `reject(Error)` doit être exécuté si la promesse est rejetée
})
```

### API des Promises

L'API des Promises est en fait un petit nombre de méthodes.

2 fonctions d'instance, et 4 fonctions statiques/utilitaires.

#### Méthodes d'instance de Promise

Accéder aux valeurs d'une promesse ne fonctionnera pas avec les astuces habituelles (par exemple `console.log(promise)`).

Toutes les promesses renvoient soit un succès (via `.then(fn)`) soit un échec (via `.catch(fn)`).

#### Méthodes utilitaires de Promise

* `Promise.resolve(value)` - Convertit n'importe quelle valeur en une promesse
* `Promise.reject(Error)` - Crée une promesse d'échec, déclenche le `.catch()` suivant
* `Promise.all([...promises])` - Attend que TOUTES les promesses d'un tableau soient terminées
* `Promise.race([...promises])` - Se résout dès que la première promesse se résout
````
