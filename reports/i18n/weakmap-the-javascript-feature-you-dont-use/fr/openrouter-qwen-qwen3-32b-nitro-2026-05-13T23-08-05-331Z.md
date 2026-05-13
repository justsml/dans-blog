# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/fr/index.mdx
- Validation: deferred
- Runtime seconds: 16.58
- Input tokens: 5499
- Output tokens: 6299
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001952
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Stoppez les fuites de mémoire avec WeakMap
subTitle: Corriger le code faible avec des références faibles !
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - javascript
  - memory
  - garbage-collection
  - performance
  - patterns
category: Code
subCategory: Best Practices
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Vous connaissez cette sensation où vous changez une seule ligne de code et regardez votre utilisation de la mémoire chuter de 50 % ? J'ai vécu ce moment en observant le moniteur de performance des outils de développement Chrome, où une application de tableau de bord passait d'une fuite de 100 Mo par heure à une exécution propre pendant toute l'après-midi.

La modification d'une seule ligne : `new Map()` est devenu `new WeakMap()`.

C'est tout. Même surface API, même modèle d'utilisation, comportement complètement différent en interne. Mais comprendre pourquoi cela fonctionne signifie comprendre quelque chose que la plupart des développeurs JavaScript n'ont jamais vraiment considéré : ce qui se passe quand personne ne regarde plus vos données.

## Quand les références deviennent des ancrages

Un Map classique en JavaScript traite ses clés comme des biens précieux. Une fois que vous y placez quelque chose, le Map s'en accroche avec une poigne d'acier. Le Garbage Collector voit cette relation et pense : « Il est clair qu'ils ont encore besoin de cet objet, mieux vaut ne pas y toucher ».

Cette tendance protectrice devient un problème lorsqu'on stocke des métadonnées sur des éléments temporaires. Des nœuds DOM qui sont supprimés. Des sessions d'utilisateurs qui expirant. Des instances de composants qui se démontent. Le Map ne sait pas que ces objets ne sont plus utiles. Il sait juste qu'il a une référence, donc il les maintient en vie.

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// L'élément est parti du DOM, mais le cache l'empêche de quitter la mémoire
```

Le Garbage Collector ne peut pas nettoyer `element` car `cache` pointe toujours dessus. C'est ce qu'on appelle une « référence forte », et dans les applications à page unique (SPA) longues, cela devient une fuite qui finit par planter le navigateur.

## WeakMap change les règles

Un WeakMap fonctionne différemment. Il traite ses clés comme des citoyens temporaires plutôt que des résidents permanents. Quand vous stockez quelque chose dans un WeakMap, vous dites essentiellement : « Je veux associer ces données à cet objet, mais je ne veux pas être la raison pour laquelle il reste en vie ».

Si la seule chose qui maintient un objet en mémoire est un WeakMap, le Garbage Collector est autorisé à le supprimer. Quand l'objet disparaît, l'entrée du WeakMap disparaît avec lui. Aucun nettoyage manuel n'est nécessaire.

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// L'élément est collecté par le Garbage Collector
// L'entrée du cache disparaît automatiquement
```

J'ai exécuté un benchmark créant 100 000 nœuds DOM, stockant des métadonnées pour chacun, puis les supprimant tous. Avec un Map, le navigateur conservait 150-200 Mo. Avec un WeakMap, la mémoire descendait à 70-80 Mo. Même code, même fonctionnalité, une empreinte mémoire réduite de moitié.

## Ce que vous sacrifiez

WeakMap comporte des contraintes qui semblent des limitations jusqu'à ce que vous réalisiez qu'elles sont ce qui rend le magie possible.

**Vous ne pouvez pas itérer sur un WeakMap.** Pas de `forEach`, pas de `keys()`, pas de `values()`. Cela a du sens quand on y pense : le Garbage Collector pourrait supprimer une entrée au milieu de votre boucle. Voulez-vous vraiment gérer cela ?

Vous ne pouvez pas vérifier la taille. Pas de propriété `.size`, pas de `.length`. C'est une cible mobile. Le nombre pourrait changer entre le moment où vous posez la question et celui où vous obtenez la réponse.

**Les clés doivent être des objets.** Pas de chaînes, pas de nombres, pas de primitives. C'est fondamental au fonctionnement des références faibles : les valeurs primitives n'ont pas d'identité pouvant être suivie séparément de leur valeur.

Ce ne sont pas des bugs. C'est la conception. WeakMap est conçu pour une tâche spécifique : attacher des métadonnées à des objets sans empêcher ces objets d'être nettoyés. Si vous avez besoin d'itération, de clés primitives ou d'un compte d'entrées, vous résolvez probablement un problème différent et devriez utiliser un Map classique.

## Où cela apporte vraiment de la valeur

Le "modèle de données privées" était le cas d'usage initial de WeakMap, avant que JavaScript n'ait des `#champs privés`. Les bibliothèques créaient un WeakMap en dehors de la classe et l'utilisaient pour stocker des données qui ne devaient pas être accessibles sur l'instance.

```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }
}
```

Quand une instance User est collectée par le Garbage Collector, les données privées disparaissent avec elle. Aucun code de nettoyage n'est nécessaire.

La mémoïsation est un autre cas d'usage naturel, surtout lorsque vous cachez des résultats basés sur des entrées d'objets plutôt que sur des valeurs primitives. Si votre calcul coûteux prend un objet de configuration en entrée, un WeakMap signifie que vous n'avez pas à vous inquiéter du fait que le cache survive aux configurations.

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

Le cache n'existe que tant que les objets mis en cache sont encore en mémoire. Une fois que `obj` n'est plus référencé nulle part ailleurs, à la fois le résultat mis en cache et l'entrée du cache disparaissent ensemble.

## Quand l'utiliser

Les fuites de mémoire dans les applications web modernes proviennent généralement de références périmées à des éléments qui auraient dû être nettoyés. Si vous construisez quelque chose de longue durée, un tableau de bord ouvert toute la journée, une application de chat qui s'exécute pendant des heures, un panneau d'administration qui ne se recharge jamais, vous devez réfléchir à ce qui advient des anciennes données.

Le WeakMap est particulièrement utile lorsque vous associez des données à des nœuds DOM, des instances de composants, ou à tout objet dont vous ne contrôlez pas la durée de vie. Si vous stockez quelque chose en fonction d'une référence et que cette référence pourrait disparaître, le WeakMap simplifie considérablement le nettoyage.

Le Map classique reste le bon choix lorsque vous construisez un cache réel avec des politiques d'éviction, lorsque vous avez besoin d'itérer sur les entrées, lorsque vous utilisez des clés primitives, ou lorsque les données elles-mêmes sont importantes plutôt que leur association avec un objet.

L'avantage du `WeakMap` est qu'il est généralement évident quand on en a besoin. Si vous vous retrouvez à écrire du code de nettoyage pour supprimer des entrées de map lorsque des objets sont détruits, c'est un signe. Si vous vous inquiétez de la mémoire qui croît indéfiniment parce que vous ne savez pas quand supprimer certaines choses, c'est un autre signe.

Parfois, la meilleure fonctionnalité est celle qui fonctionne sans qu'il faille y penser.

## Ressources

- [MDN : WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN : Gestion de la mémoire](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [Blog V8 : Références faibles et finalisateurs](https://v8.dev/features/weak-references)
- [JavaScript.info : WeakMap et WeakSet](https://javascript.info/weakmap-weakset)
````
