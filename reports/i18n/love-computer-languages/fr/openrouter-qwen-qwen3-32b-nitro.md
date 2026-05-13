# Translation Candidate
- Slug: love-computer-languages
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/fr/index.mdx
- Validation: passed
- Runtime seconds: 18.20
- Input tokens: 7713
- Output tokens: 7923
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002519
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Notes sur les langages de programmation

#### Je suis sûr que mes observations diverses ont déjà été faites, mais voici ma liste des langages les plus intéressants :

### JavaScript

Mon Grand Amour, extrêmement versatile et ubiquitaire - le champion polyvalent, incroyablement puissant !  
C'est le #1 langage le plus actif/populaire sur GitHub.com depuis _des années_.

Je déteste l'admettre, mais pendant des années, j'avais stupidement rien d'autre que du mépris et de la dérision envers ce qui est maintenant **mon langage favori**.

**ES6** n’a fait qu’augmenter mon amour (~~~addiction~~~). Bien que l’ES5 pur possède toujours une place spéciale dans mon cœur, chaque fois que j’utilise **ES6**, j’ai cette sensation de morsure radioactive d’araignée...

Il y a eu 4 facteurs qui m’ont poussé dans le **camps ES6** :

1.  C’est amusant. Vraiment. Il y a des gains concrets en termes de beauté, de clarté et de productivité.

- Des affirmations subjectives, dites-vous ? Montrez-moi un peu d’ES6 :
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- Vous n’avez plus besoin de prétendre savoir utiliser `Object.create` ou `Object.defineProperty`
- Voir les exemples ci-dessous

1.  Depuis juillet 2015, ES6 est désormais un standard officiellement finalisé !
1.  Le support est Effectivement à 100 %\* ! ... Ok, BabelJS est nécessaire pour patcher votre code afin qu’il soit compatible ES5. Historiquement, les transpileurs JS étaient mal vus. Cependant, depuis (2014-15), les choses ont changé car BabelJS est devenu un moteur clé de l’avancement du langage. Des entreprises comme Microsoft et Facebook l’utilisent sur certains des sites les plus importants.
1.  [Dernières versions de Node](../https://nodejs.org/en/blog/release/v4.0.0/) incluent le même moteur V8 de JavaScript que Chrome v45, c’est la version v4.5

#### Exemples

> Je vais vous montrer ce qui m’a enfin fait _commencer_ à boire cette boisson au KoolAid ES6.

Dans mon expérience récente, ES6 vous permet d’écrire du code plus rapidement. Tellement rapidement, en fait, que le code plus concis nécessite nettement moins d’efforts cognitifs pour le parcourir et le comprendre (que ce soit le vôtre ou celui d’un collègue).

J’ai régulièrement observé des économies de 20 à 50 % en lignes de code. C’est comme être mince comme Kate Moss !

**_IMAGE MANQUANTE :_ EcmaScript 5 vs ES 2016 - Démo : Classes, Désintégration, Élégance**
{/* ](/images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```

- Plus besoin de code fastidieux pour « extraire » et « vérifier » les champs passés à une fonction. Allons droit à l’exemple avec `add()` :

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // Stocker le hachage du mot de passe, nous n’avons besoin de définir qu’une seule variable `let` explicitement - les autres variables sont « définies » avec la magie des `{champs}` ci-dessus ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // ajouter l’utilisateur en réponse au service
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

#### Passer à ES6 peut ressembler à un saut de:

<div class="anigif top">
  <img alt='hmm' title="Hmm?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>À</h3>
<div class="anigif">
  <img alt='qu’est-ce que c’est' title="Qu’est-ce que c’est?!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>À</h3>
<div class="anigif end">
  <img alt='#gagnant' title='#gagnant' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

Continuez à explorer les nouvelles fonctionnalités. Découvrez les modèles de chaînes, la liaison automatique de `this`, un héritage plus rationnel...

##### [Node.JS](http://nodejs.org/)

### Rust

##### [Site officiel](http://www.rust-lang.org/)

- **Avantages**

- Imaginez un langage aussi rapide que C et aussi puissant que Python/C++, sans la complexité/pièges qui piègent même les développeurs les plus expérimentés.  
  - Je dirais que Rust est à peu près aussi complexe que la spécification ES6.  
  - Il inclut une tonne de fonctionnalités supplémentaires :  
    1. Rust transpile essentiellement depuis une syntaxe semi-dynamique vers **du code C pur** !  
    1. Incluant ***toutes les meilleures pratiques*** en C que vous seriez probablement enclin à rater (moi, ~~finalement~~, je rate toujours).  
    - Vous obtenez automatiquement :  
    - Gestion mémoire automatique (pas besoin d'un ramasse-miettes lent !)  
    - Propriété/verrouillage d'objets parfaitement limités (minimisation des mutex et du basculement de contexte)  
    - Durée de vie des objets (implémentée automatiquement\*, et codée comme si vous connaissiez tous les cas limites)  
    - Prévient presque tous les erreurs à l'exécution (sérieusement, vos chemins de code deviennent explicites : vous ne pouvez pas ignorer un chemin de code)  
  - Oh oui, il inclut une véritable extensibilité de langage avec une fonctionnalité de 'macro' raisonnable.  
    - Besoin de compréhensions ? [Style Scala ? C'est fait](https://gist.github.com/hanny24/5749688), et [Comme Python ? C'est fait](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).  
    1. Trop bon pour être vrai ? Non, c'est encore meilleur :  
    - Des indicateurs pointus (stats sur github.com) révèlent que Rust est hautement compétitif, voire même supérieur à Go (le nouveau langage populaire de Google)  
      - Environ 4 000 étoiles de plus que Go (actuellement autour de 12 200)  
      - Plus de contributeurs totaux (2 fois plus ! - 1 071 contre 479 pour Go)  
      - Plus de forks (3 fois plus ! - 2 343 contre 765)  
      - Nombre d'issues ouvertes, perd de peu (2 000 contre 1 730 pour Go)  
      - Demandes de tirage (Rust 70+ contre 1 pour Go)  
    - J'ai dû vérifier les chiffres trois fois.  
  - D'autres bibliothèques sont très stables grâce aux constructions & règles de Rust.  
  - Modèle de threading utilisable par les mortels ordinaires

- **Inconvénients**  
  - Des **frameworks web** décentes sont relativement nouveaux, non testés et souvent non documentés (même s'ils deviennent **très impressionnants** - mars 2015).  
  - Beaucoup de changements cassants avant la version 1.0

### Python

- **Avantages**  
  - Une collection écrasante d'algorithmes déjà implémentés en Python (voir : scikit-learn, numpy, matplotlib, pil/pillow, etc.)  
  - Très amusant à écrire ! Les compréhensions et le désassemblage sont de superbes fonctionnalités qui font paraître d'autres langages juste encombrants !  
  - Les tableaux, 'séquences', tuples, etc. sont relativement simples

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **Inconvénients**  
  - Annoyant : Python 2.x et 3.x sont incompatibles. La Grande Schisme persiste, des années plus tard.  
  - Certaines bibliothèques essentielles ne sont pas nécessairement maîtrisées par certains développeurs (numpy)

### Haskell

- **Avantages**  
  - Très gratifiant une fois que vous avez mémorisé assez de syntaxe pour créer des modèles expressifs basés sur les compréhensions  
  - Vous apprendrez des modèles de code déroutants - souvent applicables à d'autres langages.  
- **Inconvénients**  
  - La syntaxe et les modèles peuvent être difficiles à assimiler.  

<div class="anigif end">
  <img alt='boucle infinie' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>  

### SmallTalk-80

- **Avantages**  
  - Compilateurs incroyablement simples (surtout l'original)  
  - Excellents ressources : [Traduction de MVC Smalltalk vers JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)  
- **Inconvénients**  
  - Vous n'utiliserez probablement jamais ce langage pour quoi que ce soit. Aucun projet. Cependant, il influencera plus rapidement votre style de codage que d'autres langages fonctionnels... Cela devrait être dans la liste des avantages)

#### _Travail en cours (mis à jour en décembre 2015)_
````
