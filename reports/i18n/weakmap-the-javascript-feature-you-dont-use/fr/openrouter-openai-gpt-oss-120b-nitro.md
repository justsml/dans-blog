# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/fr/index.mdx
- Validation: passed
- Runtime seconds: 2.91
- Input tokens: 5490
- Output tokens: 1898
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000556
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Stopperles fuites de mémoire avec WeakMap
subTitle: "Corriger du code fragile avec des références faibles\_!"
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
Vous connaissez cette sensation quand vous modifiez une ligne de code et que votre consommation mémoire chute de 50 % ? J’ai vécu ce moment en regardant le moniteur de performance de Chrome DevTools, alors qu’une application tableau de bord passait d’une hémorragie de 100 Mo par heure à un fonctionnement propre pendant tout un après‑midi.

Le changement d’une ligne : `new Map()` est devenu `new WeakMap()`.

Tout. Même surface d’API, même modèle d’utilisation, comportement totalement différent sous le capot. Mais comprendre pourquoi cela fonctionne implique de saisir quelque chose que la plupart des développeurs JavaScript n’envisagent jamais : que se passe-t-il quand plus rien ne regarde vos données.

## Quand les références deviennent des ancres

Une `Map` ordinaire en JavaScript traite ses clés comme une cargaison précieuse. Dès que vous y placez quelque chose, la `Map` le maintient fermement. Le ramasse‑miettes voit cette relation et se dit : « Ils ont clairement encore besoin de cet objet, mieux vaut ne pas le toucher. »

Cet instinct protecteur devient un problème lorsque vous stockez des métadonnées sur des éléments temporaires. Nœuds DOM qui sont retirés. Sessions utilisateur qui expirent. Instances de composants qui se démontent. La `Map` ne sait pas que ces objets ne sont plus utiles. Elle ne sait que posséder une référence, donc elle les garde en vie.

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// The element is gone from the DOM, but cache is keeping it in memory
```

Le ramasse‑miettes ne peut pas libérer `element` parce que `cache` pointe encore dessus. C’est ce qu’on appelle une « référence forte », et dans les applications monopage de longue durée, cela se transforme en fuite qui finit par faire planter le navigateur.

## WeakMap change les règles

Un WeakMap se comporte différemment. Il considère ses clés comme des citoyens temporaires plutôt que comme des résidents permanents. Quand vous stockez quelque chose dans un WeakMap, vous dites essentiellement : « Je veux associer ces données à cet objet, mais je ne veux pas être la raison pour laquelle il reste vivant. »

Si la seule chose qui maintient un objet en mémoire est un WeakMap, le ramasse‑miettes est autorisé à le récupérer. Quand l’objet disparaît, l’entrée du WeakMap disparaît avec lui. Aucun nettoyage manuel n’est nécessaire.

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// The element gets Garbage Collected
// The cache entry vanishes automatically
```

J’ai réalisé un benchmark en créant 100 000 nœuds DOM, en stockant des métadonnées pour chacun, puis en les supprimant tous. Avec une Map, le navigateur conservait 150‑200 Mo. Avec un WeakMap, il est tombé à 70‑80 Mo. Même code, même fonctionnalité, moitié de l’empreinte mémoire.

## Ce que vous abandonnez

WeakMap impose des contraintes qui semblent des limitations jusqu’à ce que l’on réalise qu’elles sont justement ce qui rend la magie possible.

**Vous ne pouvez pas itérer sur un WeakMap.** Pas de `forEach`, pas de `keys()`, pas de `values()`. Cela a du sens : le ramasse‑miettes pourrait supprimer une entrée au milieu de votre boucle. Voulez‑vous vraiment gérer ça ?

Vous ne pouvez pas vérifier la taille. Pas de propriété `.size`, pas de `.length`. Encore une fois, c’est une cible mouvante. Le nombre peut changer entre le moment où vous posez la question et celui où vous obtenez la réponse.

**Les clés doivent être des objets.** Pas de chaînes, pas de nombres, pas de primitives. C’est fondamental pour le fonctionnement des références faibles : les valeurs primitives n’ont pas d’identité qui puisse être suivie séparément de leur valeur.

Ce ne sont pas des bugs. C’est le design. WeakMap est construit pour une tâche précise : attacher des métadonnées à des objets sans empêcher que ces objets soient nettoyés. Si vous avez besoin d’itération, de clés primitives ou d’un comptage d’entrées, vous résolvez probablement un problème différent et devriez utiliser une Map ordinaire.

## Où cela aide réellement

Le modèle « données privées » était le cas d’usage initial de WeakMap, avant que JavaScript ne propose les champs `#private`. Les bibliothèques créaient un WeakMap à l’extérieur de la classe et s’en servaient pour stocker des informations qui ne devaient pas être accessibles depuis l’instance.

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

Lorsque l’instance User est récupérée par le ramasse‑miettes, les données privées disparaissent avec elle. Aucun code de nettoyage n’est nécessaire.

La mémoïsation s’accorde naturellement avec ce principe, surtout lorsqu’on met en cache des résultats basés sur des objets d’entrée plutôt que sur des valeurs primitives. Si votre calcul coûteux prend un objet de configuration en paramètre, un WeakMap vous évite d’avoir à vous soucier d’un cache qui survivrait aux configurations.

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

Le cache ne vit que tant que les objets mis en cache existent. Dès que `obj` n’est plus référencé ailleurs, le résultat mis en cache et l’entrée du cache disparaissent simultanément.

## Quand l’utiliser

Les fuites de mémoire dans les applications web modernes proviennent généralement de références obsolètes à des éléments qui auraient dû être nettoyés. Si vous construisez quelque chose de long‑durée – un tableau de bord laissé ouvert toute la journée, une messagerie fonctionnant pendant des heures, ou un panneau d’administration qui ne se rafraîchit jamais – il faut réfléchir à ce qui arrive aux anciennes données.

WeakMap est particulièrement utile lorsque vous associez des données à des nœuds DOM, à des instances de composants, ou à tout objet dont vous ne contrôlez pas la durée de vie. Si vous stockez quelque chose basé sur une référence qui peut disparaître, WeakMap simplifie grandement le nettoyage.

Map reste le bon choix lorsque vous construisez un vrai cache avec des politiques d’éviction, lorsque vous devez itérer sur les entrées, lorsque vous utilisez des clés primitives, ou lorsque c’est la donnée elle‑elle qui importe plutôt que son association avec un objet.

Ce qui est agréable avec `WeakMap`, c’est que son besoin se révèle souvent de façon évidente. Si vous vous surprenez à écrire du code de nettoyage pour retirer des entrées de la map quand des objets sont détruits, c’est un signal. Si vous craignez que la mémoire croisse indéfiniment parce que vous ne savez pas quand supprimer des éléments, c’est un autre signal.

Parfois, la meilleure fonctionnalité est celle qui fonctionne sans que vous ayez à y penser.

## Resources

- [MDN : WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN : Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 Blog : Weak References and Finalizers](https://v8.dev/features/weak-references)
- [JavaScript.info : WeakMap and WeakSet](https://javascript.info/weakmap-weakset)
````
