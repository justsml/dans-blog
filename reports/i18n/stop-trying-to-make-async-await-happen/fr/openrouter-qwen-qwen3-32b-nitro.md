# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/fr/index.mdx
- Validation: passed
- Runtime seconds: 23.12
- Input tokens: 9504
- Output tokens: 9012
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.002923
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Arrêtez d'essayer de faire fonctionner async/await
subTitle: Les promesses sont tellement Fetch en ce moment
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
Depuis la nuit des temps, les développeurs se sont battus dans de nombreuses querelles absurdes. De la classique _"Tabs vs. Spaces"_ au débat éternel _"Mac vs. PC"_, nous sommes doués pour trouver des arguments distrayants.

<br />
<small>Réponses : Linux et espaces.</small>

<!-- We're going to look at 2 rules to improve your life with Promises. -->

## La querelle... ?

### Promesses vs. Async/Await !

Attendez, est-ce une querelle ? C’est forcément le cas ? On ne parle plus des fonctions de rappel, semble-t-il ?

Non, ce n'est pas une querelle. Au final, il s'agit d'un outil supplémentaire dans votre trousseau d'outils. Cependant, puisque `async`/`await` ne remplace pas toute la fonctionnalité des Promises (notamment `Promise.all`, `.race`), **il est trompeur de le présenter comme un remplacement**.  

Beaucoup de figures influentes promeuvent cette idée erronée selon laquelle `async`/`await` est le [remplacement](https://developers.google.com/web/fundamentals/primers/async-functions) [idéal](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [des](https://x.com/umaar/status/1045655069478334464) [Promises](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [attendu](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba).  

> **Indice : Non, non, et pas même un peu.**  

Une récente fonctionnalité de VS Code renforce cette idée fausse. Comme l'a tweeté [@umaar](https://x.com/umaar) :  

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Visual Studio Code peut désormais convertir vos longues chaînes de Promise.then() en async/await ! 🎊 Fonctionne très bien dans les fichiers JavaScript et TypeScript. .catch() est également correctement converti en try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">September 28, 2018</a></blockquote>

Si vous détestez les Promises et que vous souhaitez cette fonctionnalité de refactorisation, je ne vous en veux pas.  

<br />  

_Je comprends. Je sais ce que c'est._  

<br />  

J'y suis passé. 🤗  

<br />

Je détestais les Promises. Aujourd'hui, j'ai complètement changé d'avis. **Les Promises sont incroyables.** Elles vous permettent d'**exploiter la composition des fonctions.**

Il y a 2 domaines sur lesquels je recommande de se concentrer en premier pour améliorer sa maîtrise des Promises.

1. [Fonctions nommées (pas anonymes)](#rule-1)  
1. [Fonctions à usage unique](#rule-2)  

<h2 id="rule-1">#1 : Fonctions nommées !</h2>  

Éliminez les méthodes anonymes. L'utilisation de **fonctions nommées** fait en sorte que le code exprime vos exigences comme de la poésie.  

Examinons un exemple courant :

Effectuer une requête HTTP GET avec `fetch` :

<!-- la spécification fetch indique que les [codes d'état HTTP](https://http.cat/) supérieurs à 400 ou 500 **n'entraînent pas automatiquement une erreur.** Le comportement par défaut dans de nombreuses bibliothèques AJAX (jQuery, axios). -->

<!-- Avant de voir la solution, examinez une implémentation couramment "recommandée" : -->

### Anti-Pattern

```js
// ❌ Utilisation de fonctions anonymes en ligne 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### Solution : Méthodes nommées

```js
// ✅ La clarté émerge : fonctions nommées
fetch(url)
  .then(checkResponse)
  .then(getText)


// Fonctions réutilisables génériques
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> Les avantages de cette approche sont de plus en plus évidents lorsque votre code devient plus DRY.

**Ressources supplémentaires :** Découvrez mes **vidéos de 1 minute** sur le [journalisation de base](https://youtu.be/xR_MZE1SIkk) et le [débogage avancé](https://youtu.be/P_tghqWj72M) en utilisant cette technique.

<h2 id="rule-2">#2: Objectif Unique (Fonctions)</h2>

Il semble _précisément trompeur_ : Objectif Unique.

Pourtant, c'est si subjectif, arbitraire, et oui, parfois même sans sens.

<!-- Au lieu de débattre si une fonction donnée est suffisamment focalisée.

J'ai élaboré une mesure approximative pour cela : le `Coût de l'Objectif`. Plus le score est élevé, plus il est probable que la fonction fait trop de choses. -->

```js
// 1 point : le return & l'opérateur ternaire forment une ligne unique
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 point : le return & l'expression forment une ligne unique
function getText(response) {
  return response.text()
}
```

Étant donné le code d'une fonction, ajoutez 1 point pour chaque ligne contenant l'un des éléments suivants : `if`, `return`, opérateur ternaire, `for`, `const`, `let`, `var`, `switch`, `while`, `[].map/filter/reduce/etc`. Ajoutez 1 point pour chaque instruction (ignorez les lignes supplémentaires dues aux espaces). Une série d'expressions ou de méthodes enchaînées ne compte que pour 1 point.

Whaou, c'était un peu technique. 

Intéressant, la plupart des développeurs affirment être _assez bons_ dans l'application du principe **Objectif Unique** à leur code. Coïncidence non liée : ils affirment aussi être de très bons conducteurs !

<!-- Ce **n'est pas un problème unique aux Promises**, les méthodes de tableau et toutes les autres APIs basées sur les fonctions d'ordre supérieur (Higher Order Functions) souffrent des mêmes ergonomiques. -->

Examinons un exemple présenté par (exceptionnellement talentueux) [Jake Archibald](https://x.com/jaffathecake) dans son article sur async/await pour le site Google Developers (note : lien retiré en 2024). 

<!-- 
Examinons l'un des exemples de Promises soi-disant "❌ Non recommandé". (La description est "disons que nous voulons charger une série d'URLs et les enregistrer dès que possible, dans l'ordre correct.") -->
---

```js
// source: https://developers.google.com/web/fundamentals/primers/async-functions
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

### Fonction à usage unique ?

Je dirais non. Qu'est-ce que `logInOrder` fait exactement ?

1. Parcourir une liste d'`urls`
1. Appliquer une requête HTTP GET inline :
  1. Requête HTTP `fetch`
  1. Retourner le corps de texte de la réponse
1. Ajouter un `.then(text => console.log(text))` après chaque promesse dans `textPromise`
  1. Afficher les résultats de manière séquentielle

Il y a 5 fonctions anonymes définies au sein de cette unique fonction. Comme le souligne Jake, la méthode `.reduce` est trop complexe. Il ne fait pas de sens de rédiger manuellement des mécanismes détaillés un peu partout dans son code. Pour reformuler, nous n'écrivons pas des codes de création de DOM avec des appels infinis à `document.createElement()`, `element.setAttribute()`, etc. Au lieu de cela, nous choisissons l'outil le plus adapté parmi plusieurs options : fonctions utilitaires, bibliothèques ou frameworks.

<!-- Nous devons isoler chaque 'étape' en jeu : il y a une requête HTTP, une transformation d'une liste d'URLs en une liste de résultats. Un `console.log` est également nécessaire. -->

<!-- > 🤔 Pourquoi les `Promises` poussent-elles les développeurs à abandonner les pratiques qu'ils utilisent ailleurs ? -->

**Remarque :** Si l'intention était de _lancer des requêtes_ de manière séquentielle, plutôt que simplement d'afficher les résultats dans l'ordre, ce code ne le fait pas effectivement. Nous allons procéder à un refactor correspondant.

#### Solution : Fonctions à objectif unique

### Commencez par **extraire des méthodes**...

![VS Code refactor extrayant des méthodes async de code Promise](../async-refactor-google-extract-methods-resized-75.webp "Extraire des méthodes")

### Poursuivez en remplaçant le `.reduce()` et `logPromise()` par un `Promise.all` et un `..map()`...

![Chaîne de promesses refactorisée utilisant Promise.all et map pour une meilleure lisibilité](../async-refactor-google-chain-methods-resized-75.webp "Améliorer la lisibilité")

### Résumé

Essayez d'appliquer ces techniques à votre propre code ! Puis [envoyez-moi un tweet](https://x.com/justsml) pour me dire comment ça s'est passé. Ou si vous avez des questions ou des commentaires, contactez-moi également !

Aidez à faire connaître le #PromiseTruth et partagez cet article. ❤️

![Crédit : matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### Lectures connexes

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
