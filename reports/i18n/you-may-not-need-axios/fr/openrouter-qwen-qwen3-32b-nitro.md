# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/fr/index.mdx
- Validation: passed
- Runtime seconds: 26.90
- Input tokens: 12581
- Output tokens: 10527
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.003533
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Vous n'avez pas besoin d'Axios
subTitle: La Fetch API vient à la rescousse !
date: '2018-11-14'
modified: '2024-08-21'
tags:
  - programming
  - patterns
  - examples
  - nodejs
  - javascript
  - promises
  - axios
  - fetch
category: Guides
subCategory: fetch
cover: ../brock-dupont-575648-unsplash.webp
cover_mobile: ../w300_brock-dupont-575648-unsplash.webp
cover_icon: ../icon_brock-dupont-575648-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Vous n'avez peut-être pas besoin d'Axios

<p class="breakout call-to-action">Ce **n'est pas une attaque** contre [Axios](https://www.npmjs.com/package/axios). <br />

C'est plutôt **un plaidoyer en faveur de l'API `fetch` qui est désormais très performante.** 🦄</p>

### Aperçu

Cet article rassemble les extraits de code `fetch` "manquants" et les cas d'utilisation courants que j'aurais souhaité plus faciles à trouver.

### Aperçu

- [Aperçu](#apercu)
- [Comparaison des fonctionnalités](#comparaison-des-fonctionnalités)
- [Recettes avec `fetch`](#recettes-avec-fetch)
  - [Obtenir du JSON depuis une URL](#obtenir-du-json-depuis-une-url)
  - [En-têtes personnalisés](#en-tetes-personnalises)
  - [Gestion des erreurs HTTP](#gestion-des-erreurs-http)
  - [Exemple CORS](#exemple-cors)
  - [Soumettre du JSON](#soumettre-du-json)
  - [Soumettre un formulaire HTML `<form>`](#soumettre-un-formulaire-html-form)
  - [Données encodées en formulaire](#donnees-encodees-en-formulaire)
  - [Téléverser un fichier](#televerser-un-fichier)
  - [Téléverser plusieurs fichiers](#televerser-plusieurs-fichiers)
  - [Délais d'attente](#delais-dattente)
  - [Aide pour le suivi de progression de téléchargement](#aide-pour-le-suivi-de-progression-de-téléchargement)
  - [Aide pour les tentatives récursives](#aide-pour-les-tentatives-récursives)
  - [Gestion des redirections HTTP](#gestion-des-redirections-http)
  - [Annulation d'une requête fetch](#annulation-dune-requete-fetch) ✨nouveau✨
- [Compatibilité](#compatibilite)

> Votre cas d'utilisation n'est pas listé ? [Faites-le-moi savoir ✉️](/contact/)

<br />

### Comparaison des fonctionnalités

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| Intercepter les requêtes et réponses            |✅        |✅         |✅       |
| Transformer les données de requête et réponse   |✅        |✅         |✅       |
| Annuler les requêtes                            |✅        |✅         |❌       |
| Transformations automatiques pour le JSON       |helpers manuels |✅         |✅       |
| Protection côté client contre les XSRF          |✅        |✅         |✅       |
| Suivi de progression                            |✅        |✅         |✅       |
| Streaming                                       |✅        |✅         |✅       |
| Redirections                                    |✅        |✅         |✅       |

<br /><br />

Lors de la rédaction de cet article (fin 2018, mis à jour en 2024), je pensais conclure avec un tableau de cases cochées partielles. Il y avait certainement des cas d'utilisation spécifiques justifiant l'utilisation de bibliothèques tierces comme [`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got), etc.

En réalité, **j'ai surestimé le besoin d'utiliser des bibliothèques HTTP tierces.**

Malgré l'utilisation de `fetch` pendant plusieurs années (y compris pour des tâches non triviales : uploads de fichiers et gestion d'erreurs/retries), j'avais encore des idées reçues sur ses capacités et ses limites.

`fetch` natif ne parse pas automatiquement les réponses JSON ni ne convertit les corps de requête JSON en chaîne. Vous appelez `response.json()` en retour et `JSON.stringify()` en envoi. Axios reste plus ergonomique sur ce point précis ; l'argument en faveur de `fetch` est qu'un petit helper comble souvent ce gap.

Voyons donc ce que `fetch` est capable de faire...

## Recettes avec Fetch

### Récupérer du JSON depuis une URL

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>

### En-têtes personnalisées

<Gist path='justsml/fca7cd72ec1ebc07d994eac13a665ddf' />

### Gestion des erreurs HTTP

<Gist path='justsml/81919a72897ebc503c6b34a556a9bde2' />

### Exemple de CORS

CORS est principalement vérifié côté serveur, assurez-vous que votre configuration est correcte côté serveur.

L'option `credentials` contrôle si vos cookies sont automatiquement inclus.

<Gist path='justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />

### Envoi de JSON

<Gist path='justsml/13915347d6c8413c73f4bd7240c68e51' />

### Soumettre un formulaire HTML `<form>`

<Gist path='justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />

### Données encodées en formulaire

Pour envoyer des données avec un Content-Type de `application/x-www-form-urlencoded`, nous utiliserons `URLSearchParams` pour encoder les données comme une chaîne de requête.

Par exemple, `new URLSearchParams({a: 1, b: 2})` produit `a=1&b=2`.

<Gist path='justsml/716c4534ef4afb22f65d4fc4367c7136' />

### Téléchargement d'un fichier

<Gist path='justsml/301f22aa37df565ba3051bd5f95b4df1' />

### Téléchargement de plusieurs fichiers

Configurez un élément de téléchargement de fichier avec l'attribut `multiple` :

<Gist path='justsml/37836357041d8ca4d1b32e12638cb0ba' />

Puis utilisez-le avec quelque chose comme :

<Gist path='justsml/d17f50c36a5ddb70f584c0aa6de94237' />

### Délais d'expiration (timeouts)

Voici un délai d'expiration générique pour les promesses, utilisant le motif d'"Application partielle". Cela fonctionnera avec n'importe quelle interface de promesse. N'effectuez pas trop de travail dans la chaîne de promesses fournie, car elle continuera de s'exécuter - et toute erreur a tendance à créer des fuites de mémoire à long terme.

<Gist path='justsml/f93b2ef6457b3e52eb995831b67cab85' />

Et un exemple plus complexe, avec un indicateur de suivi `__timeout` pour **intercepter tout travail coûteux**.

<Gist path='justsml/5e492db8997a4f7e22e61b7486cbf273' />

### Assistant de progression de téléchargement

La progression du téléversement est actuellement un peu bugguée en dehors de Chrome.

Le gestionnaire de progression [la technique montrée ci-dessous évite d'encapsuler](#source-progress-helper) l'appel `fetch` dans une fermeture. 👍

`progressHelper` a l'interface suivante (source disponible ci-dessous)

<Gist path='justsml/db5ccc55ffb93c75e04e014d1f553cfb' />

Examinons un exemple d'utilisation :

<Gist path='justsml/9bec219590ff50688972c1caff67c14b' />

Un téléchargeur d'images réutilisable pourrait ressembler à `getBlob()` :

<Gist path='justsml/bef2dd7e630eb7642beb3e2be29489b2' />

Au passage, un `Blob` est un Binary Large Object.

Il est important de choisir UN des deux schémas d'utilisation ci-dessous (ils sont fonctionnellement équivalents) :

<Gist path='justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

Je préfère l'`Option #1`. Cependant, la conception de votre portée pourrait vous obliger à utiliser l'`Option #2`.

Enfin, voici la dernière partie de cette recette, notre `progressHelper` :

##### Source : Progress Helper

<Gist path='justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />

_crédit_ : Remerciements particuliers à Anthum Chris et à son [excellente preuve de concept Progress+Fetch présentée ici](https://github.com/AnthumChris/fetch-progress-indicators)

### Helper de réessai récursif

<Gist path='justsml/7e52521a0af50fa590be57d5b4593120' />

### Gestion des redirections HTTP

<Gist path='justsml/3dd0a799ada8da7cd15943ff254266de' />

### Annulation d'une requête fetch

<Gist path='justsml/7f257ac3de3c7792db8485588c54e938' />

### Compatibilité

En 2022, l'API `fetch` est [largement prise en charge](https://caniuse.com/#feat=fetch) dans tous les navigateurs modernes et dans les versions récentes de NodeJS v18+.

Si vous devez supporter IE, vous pouvez [ajouter un polyfill pour fetch](https://github.com/github/fetch#browser-support) via le package `github/fetch` (maintenu par une équipe formidable de GitHub). Il est possible d’aller jusqu’à [IE8](https://github.com/camsong/fetch-ie8) - _Résultats variables selon les cas_.

Les versions antérieures de NodeJS peuvent utiliser l'API `fetch` via le package [`node-fetch`](https://www.npmjs.com/package/node-fetch) :

```sh
npm install node-fetch
```

_Après polyfill+node-fetch : 99,99 % compatible_ ✅

> Veuillez [m’envoyer un tweet](https://x.com/justsml) si vous avez d’autres _Cas d’utilisation_ que vous aimeriez voir. ❤️
````
