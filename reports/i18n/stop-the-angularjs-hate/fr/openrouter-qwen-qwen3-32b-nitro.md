# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/fr/index.mdx
- Validation: passed
- Runtime seconds: 12.76
- Input tokens: 4833
- Output tokens: 5327
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.001665
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Astuces AngularJS
subTitle: ''
date: '2015-02-26'
modified: '2016-02-01'
category: Code
subCategory: angularjs
tags:
  - angularjs
  - development
  - performance
  - programming
cover: ../sharon-mccutcheon-522851-unsplash.webp
cover_mobile: ../w300_sharon-mccutcheon-522851-unsplash.webp
cover_icon: ../icon_sharon-mccutcheon-522851-unsplash.webp
---
## AngularJS PEUT ÊTRE Amusant !

> Pour : AngularJS v1.x

1.  Les développeurs AngularJS découvrent rapidement que leurs applications de taille moyenne à grande craquent sous le poids des `$watch` dispersés et du béquillard souvent enflé qu'est le `$scope`.
2.  Gardez votre `$scope` débarrassé d'un état UI superflu, essayez de limiter la taille et la profondeur de votre hiérarchie globale.

### Lien de données bidirectionnel : une épée à double tranchant

Le lien bidirectionnel seul rend le passage depuis d'autres frameworks comme Backbone, bien **absolument génial**.

Le problème est : de nombreux sites **surexploiturent chroniquement** les modèles de conception d'Angular.
Cela entraîne une prolifération des directives et un `$scope/rootScope` qui peut facilement compter des milliers d'instances, et s'accrocher à de grands objets empêchant toute chance d'une collecte efficace des orphelins.

Vous savez où cela mène : un navigateur épuisé ! Condamné à travailler à un **rythme frénétique** pour exécuter des recompilations UI/DOM infinies et redondantes.

### Arrêtez l'excès d'Angular.JS

> « Si votre seul outil est un marteau, chaque problème ressemble à un clou. »
>
> - Proverbe ancien

Votre application souffre-t-elle d'une surutilisation des directives ?

```jade
current-user-status-label
  div(ng-if='loggedIn')
    view-user-surplusage(ng-if='!editMode')
      .head: contact-details(user='user')
      .tool: contact-buttons(loggedIn='loggedIn')
      a.edit-icon(ng-click='editMode = true')
    edit-user-surplusage(ng-if='editMode')
      .head: avatar-edit(user='user')
      .body: edit-contact-details(user='user')
      a.save-icon(ng-click='editMode = false')
```

Concevons un widget utilisateur flexible qui permette :

1.  Des composants polyvalents avec du code Angular DRY
2.  Des directives compréhensibles, avec une taille et une profondeur minimales (faites attention aux ng-repeats)
3.  Une couche de service simple
4.  Peu de code à écrire - juste du HTML/Code de vue

```jade
// jade
user-widget
  div(ng-if='loggedIn')
    div.edit(ng-if='editMode')
      h4.email-icon: input(type='email', ng-model='user.email')
      h4.phone-icon: input(type='email', ng-model='user.phone')
      a.save-icon(ng-click='editMode = false')
    div.show(ng-if='!editMode')
      h1.users-icon {{ user.name  }}
      h4.email-icon {{ user.email }}
      h4.phone-icon {{ user.phone }}
      a.edit-icon(ng-click='editMode = true')
  div(ng-if='!loggedIn')
    h5: i Bienvenue utilisateur
    a.btn(href='/login') Connexion
```

## Solutions

### Conseils pour Angular

1.  Utiliser le lien unidirectionnel (ex. `{ :: title }` )
1.  Limiter la récursivité des directives
1.  Et si vous devez imbriquer des directives, _NE JAMAIS_ le faire à l'intérieur d'un `ng-repeat` - Les performances commenceront à ressembler à quelque chose comme `O(n^2)^3` ;)
    I. Utiliser du code JS/DOM natif dans un patron de factory pour créer des fragments de DOM/UI basiques, exemples : boîte de message modale, barre d'état. Appeler des factories UI depuis des directives ou des contrôleurs.
1.  _Bonus :_ Comprendre le coût et les déclencheurs du [cycle de rendu du navigateur](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): animation, composition, recalculs de mise en page

### Utiliser Browserify pour organiser le projet

Pas spécifiquement pour Angular, mais essentiel pour une résolution simple des dépendances.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) rend les projets JS gérables avec presque aucun surcoût de code (ok, quelques centaines de caractères).

[Lisez simplement cette section](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) du [Browserify Handbook](https://github.com/substack/browserify-handbook/).

## Alternatives

### [ReactJS](https://facebook.github.io/react/) de Facebook

Si vous avez de nombreuses petites composantes UI réutilisables - ReactJS pourrait être un meilleur choix :

- Si votre projet...? :
  - A une philosophie différente pour l'implémentation de l'UI/DOM par rapport à Angular
  - Déjà un genre de 'framework' - Vous pouvez **utiliser ReactJS conjointement** avec AngularJS, Ember, Backbone. (À éviter si possible cependant).
  - Gère des changements fréquents dans le modèle de données dans son propre code, vous bénéficierez en évitant la nature TDA (Traitement, Distribution, Affichage) de Angular

### [Polymer Project](http://www.Polymer-Project.org/) de Google

### Approche JS plus pure

- Au passage, c'est ici que j'essaie de créer du code indépendant du framework (+1 meilleure testabilité, +1 réutilisation)
  1. Utiliser une classe JavaScript standard pour charger les données (AJAX/JSONP/Intégrées dans la page, etc.)
  1. Utiliser le templating Mustache pour générer des chaînes HTML (ou le DOM directement)
  1. Mettre en cache le contenu rendu dans le localStorage si possible
  1. (Optionnel) Ajouter un écouteur d'événements pour rerendre le contenu. J'ai normalisé le nom d'événement `refresh.<class-name>`
````
