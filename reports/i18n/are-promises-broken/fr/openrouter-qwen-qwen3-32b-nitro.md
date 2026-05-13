# Translation Candidate
- Slug: are-promises-broken
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/fr/index.mdx
- Validation: passed
- Runtime seconds: 30.10
- Input tokens: 8755
- Output tokens: 9031
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002868
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promesses brisées?
unlisted: true
subTitle: 'Ignorer les erreurs, perdre les résultats...'
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## Les Promises JavaScript sont-elles défectueuses ?

### À l'époque

L'un des mythes les plus courants sur les Promises est l'affirmation de leurs insuffisances en matière d'erreurs.

**Il y a de nombreuses années**, les Promises **étaient effectivement très mauvaises** en matière de gestion des erreurs. **Beaucoup de travail a été consacré à les corriger.**

> Et voilà, **cela a été corrigé**, voire même **largement déployé**.

#### Les gens ont célébré

Et malheureusement, certains n'ont pas remarqué.

### Les temps actuels

Le mythe persiste encore, je le vois partout : [articles populaires sur Medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [sur DZone](#redacted), et [beaucoup](https://medium.com/@avaq/broken-promises-2ae92780f33) d'autres sources.

Je dois admettre, même les ressources et documentations "officielles" proposent majoritairement [des exemples fragiles et des mauvaises habitudes](../promise-gotchas/). Ces derniers sont souvent utilisés pour "prouver" le mauvais côté des Promises. Certains suggèrent même des "remèdes" qui aggravent encore la situation. (note : lien supprimé)

<!-- Un tel conseil que j'ai vu plusieurs fois : ne jamais utiliser `.catch`, et préférer l'événement global `"unhandledRejection"`. **NE JAMAIS** faire cela. unhandledRejection est conçu pour le nettoyage des références globales, comme les connexions à la base de données, avant un arrêt imminent. ) -->

<br />
<br />

## Règles pour éviter les problèmes

1. [Les Promises ont besoin de quelque chose à quoi se raccrocher](#1-promises-need-something-to-hang-on-to)  
    * **Toujours** `return` dans vos fonctions.  
1. [Utiliser des instances `Error` réelles](#2-use-real-error-instances)  
    * **Toujours** utiliser des instances `Error`.  
1. [Gérer les erreurs là où cela a du sens](#3-handle-errors-where-it-makes-sense)  
    * **Toujours** utiliser `.catch()`, au moins une fois.  
1. [Ajouter de la clarté avec des fonctions nommées 🦄✨](#4-add-clarity-with-named-functions-)  
    * __Préférer__ des fonctions nommées.  

-------------------------------------------  

#### #1 Les Promises ont besoin de quelque chose à quoi se raccrocher  

Il est crucial de **toujours `return`** dans vos fonctions.  

Les fonctions de rappel des Promises suivent un certain schéma dans `.then(callback)` et `.catch(callback)`.

Chaque valeur retournée est transmise à la fonction de rappel du `.then()` suivant.

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> Avantage de "toujours retourner" : le code est bien plus facile à tester en unité.

**Question :** Combien d'états de Promise distincts (résolus et rejetés) ont été créés ?

**Question :** Combien de promesses ont été créées dans l'exemple précédent ?

#### #2 Utiliser des instances d'`Error` réelles

JavaScript a un comportement intéressant concernant les erreurs (qui s'applique au code asynchrone et synchrone).

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>voir l'exemple sur repl.it: `throwing errors in javascript`</i>]</a>
<img alt="lancer des erreurs en JavaScript" src="../throwing-errors-in-javascript.webp" />

Pour **obtenir des détails utiles sur le numéro de ligne** et la pile d'appel, vous devez utiliser des instances `Error`. Lancer des chaînes ne fonctionne pas comme en Python ou Ruby.

Bien que JavaScript **semble** gérer `throw "string"`, comme vous verrez la chaîne dans votre gestionnaire `catch`. Cependant, les données sont tout ce que vous verrez*. Aucun des cadres de pile précédents ne sera inclus.

Exemples corrects avec `new Error` :

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

Les modèles suivants sont des anti-modèles courants :

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="../@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 Gérer les erreurs là où cela a du sens

Les Promesses offrent une manière élégante de gérer les erreurs, en utilisant `.catch()`. C'est essentiellement un type spécial de `.then()` — où n'importe quelle erreur provenant des `.then()` précédents est gérée. Examinons un exemple...

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('ne sera pas atteint'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('SERA atteint'))
```

Bien que `.catch()` puisse sembler similaire à un gestionnaire d'événements DOM (comme `click`, `keypress`), son emplacement est crucial, car il ne peut 'attraper' les erreurs lancées **au-dessus de lui**.

**Écraser les erreurs est relativement trivial** : retournez une valeur non-erreur dans votre rappel `.catch()`, et la chaîne de promesses passe à l'exécution des rappels `.then()` en séquence. (En pratique.)

Essayez de suivre la séquence de l'exemple suivant :

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // sortie attendue : 100
```

**La séquence est ce qui est important à comprendre.**

Bien qu'exemple simpliste, il est conçu pour **illustrer le flux des erreurs et des données** dans les promesses.

Voici un aperçu de la séquence :

1. 42 est la valeur initiale.
1. `hello` est toujours renvoyé par la méthode suivante.
1. nous ignorons la valeur précédente et lançons une erreur avec le message 'totes fail'.
1. `.catch()` intercepte l'erreur, renvoie `99` qui sera géré par toute `.then()` subséquente.
1. incrémente `num`, renvoyant `100`
1. la méthode `console.log` reçoit `100` et l'affiche ! :tada:

**Question :** Que se passe-t-il lorsqu'il y a deux `.catch()` en séquence ? Le second peut-il jamais s'exécuter ? Pouvez-vous imaginer un cas d'utilisation ?

**Question :** Comment `.catch()` peut-il ignorer les erreurs ? Comment empêcher les erreurs de forcer une sortie prématurée de `Promise.all` ?

#### #4 Ajouter de la clarté avec des fonctions nommées 🦄✨

Comparez la **lisibilité** des deux exemples suivants :

**Anonymes :** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```

**Nommées :** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // expected output: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)
```

**BONUS :** ✅

> Compatible avec les méthodes de tableau !!!

Vous pouvez réutiliser vos fonctions nommées avec nos amis provenant de `Array.prototype.` y compris `.map()`, `.filter()`, `.every()`, `.some()`, `.find()` !

Collection pipelines #FTW :

```js
// C'EST COMME LA MÊME CHOSE :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // sortie attendue : 2 lignes "25.00", "100.00"

```

Et si vous ne souhaitez pas faire ce style de programmation linéaire... Eh bien, vous avez des fonctions simples !

Vous pouvez les utiliser comme bon vous semble :

```js
// Modèle d'imbrication
// ❌ veuillez ne pas faire cela, cependant

const result = format(square(quarter(double(10))))

log(result)
// sortie attendue : "25.00"
```

**Pourquoi l'imbrication de fonctions est-elle un anti-pattern ?**

1. Moins lisible pour un grand nombre de personnes  
2. Les diffs git ne révèlent pas facilement qui a apporté quelles modifications  
3. Difficile à déboguer ou à logger depuis le milieu des fonctions imbriquées
````
