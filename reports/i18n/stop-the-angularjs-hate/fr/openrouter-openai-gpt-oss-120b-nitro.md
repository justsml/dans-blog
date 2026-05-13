# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/fr/index.mdx
- Validation: passed
- Runtime seconds: 3.74
- Input tokens: 5351
- Output tokens: 1553
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.000488
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Astuces AngularJS
subTitle: AngularJS peut être amusant !
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
## AngularJS PEUT ÊTRE Amusant !

> Pour : AngularJS v1.x

1.  Les développeurs AngularJS découvrent rapidement que leurs applications de taille moyenne à grande s’effondrent sous le poids des `$watch` dispersés et du béquille souvent gonflée qu’est `$scope`.
2.  Gardez votre `$scope` exempt d’un excès d’état UI, essayez de limiter la taille et la profondeur de votre hiérarchie globale.

### Liaison de données bidirectionnelle : Épée à deux‑faces

La liaison bidirectionnelle à elle seule rend le passage depuis d’autres frameworks comme Backbone, eh bien, **vraiment incroyable**.

Le problème, c’est que de nombreux sites **surutilisent chroniquement** les modèles de conception d’Angular.  
Cela conduit à une prolifération de directives et à un `$scope/rootScope` qui accumule facilement des milliers d’instances, et qui peut s’accrocher à d’énormes objets, empêchant toute perspective de collecte de déchets efficace.

Vous savez où cela mène : un navigateur épuisé ! Condamné à fonctionner à un **rythme frénétique** en exécutant des recompilations UI/DOM infinies et redondantes.

### Arrêter la SUR‑Angular.JSification

> « Si votre seul outil est un marteau, alors chaque problème ressemble à un clou. »
> 
> – vieux proverbe

Votre application a‑t‑elle un problème avec les directives ?

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

Concevons un widget utilisateur flexible qui permet :

1.  Une composantisation polyvalente avec du code Angular DRY  
2.  Des directives compréhensibles, de taille et de profondeur minimales (veillez aux `ng-repeat`)  
3.  Une couche de services simple  
4.  Peu de code réel à implémenter — juste du HTML/Vue  

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
    h5: i Welcome User
    a.btn(href='/login') Login
```

## Solutions

### Astuces Angular

1.  Utilisez la liaison unidirectionnelle (ex. `{ :: title }`)
1.  Limitez l’imbrication récursive des directives
1.  Et si vous devez imbriquer des directives, **NE JAMAIS** le faire à l’intérieur d’un `ng-repeat` – les performances peuvent rapidement atteindre un comportement de type `O(n^2)^3` ;)
    I. Employez du code JS/DOM natif dans un pattern factory pour créer des fragments DOM/UI de base, par exemple : boîte de dialogue modale, barre d’état. Appelez les factories UI depuis les directives ou les contrôleurs.
1.  **Bonus :** Comprenez le coût et les déclencheurs du [cycle de vie du rendu du navigateur](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en) : animation, rendu composite, reflows

### Utiliser Browserify pour organiser le projet

Pas spécifiquement lié à Angular, mais indispensable pour une résolution de dépendances simple.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) rend les projets JS gérables avec pratiquement aucune surcharge de code (ok, quelques centaines de caractères).

[Just read this section](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) du [Browserify Handbook](https://github.com/substack/browserify-handbook/).

## Alternatives

### [ReactJS](https://facebook.github.io/react/) de Facebook

Si vous avez des dizaines de petits composants UI réutilisables, ReactJS peut être un meilleur choix :

- Si votre projet… ? :
  - Adopte une philosophie différente de l’implémentation UI/DOM qu’Angular
  - Dispose déjà d’une sorte de « framework » : vous pouvez **utiliser ReactJS à côté** d’AngularJS, Ember, Backbone. (À éviter si possible toutefois.)
  - Gère des changements fréquents du modèle de données dans son propre code, vous bénéficierez d’éviter la nature « ADHD » du pattern digest/loop d’Angular

### [Polymer Project](http://www.Polymer-Project.org/) de Google

### Approche JS plus pure

- Au fait, c’est ici que j’essaie de créer du code indépendant de tout framework (+1 testabilité, +1 réutilisation)  
  1.  Utiliser une classe JavaScript native pour charger les données (AJAX/JSONP/Intégrées dans la page, etc.)  
  1.  Utiliser le templating Mustache pour générer des chaînes HTML (ou le DOM directement)  
  1.  Mettre en cache le contenu rendu dans `localStorage` si possible  
  1.  (Optionnel) Ajouter maintenant un écouteur d’événement pour re‑rendre le contenu. J’ai standardisé le nom d’événement `refresh.<class-name>`
````
