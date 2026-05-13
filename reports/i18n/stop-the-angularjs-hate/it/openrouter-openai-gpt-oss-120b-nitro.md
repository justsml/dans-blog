# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.09
- Input tokens: 5330
- Output tokens: 1516
- Thinking tokens: unknown
- Cached input tokens: 2688
- Cache write tokens: 0
- Estimated cost: $0.000481
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-03-10--stop-the-angularjs-hate/it/index.mdx reports/i18n/stop-the-angularjs-hate/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Trucchi AngularJS
subTitle: AngularJS può essere divertente!
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
## AngularJS PUÒ ESSERE Divertente!

> Per: AngularJS v1.x

1.  Gli sviluppatori AngularJS scoprono rapidamente che le loro app di media‑grande dimensione stanno cedendo sotto il peso di `$watch` sparsi e del tipico sostegno gonfio noto come `$scope`.
2.  Mantieni il tuo `$scope` libero da stato UI superfluo, cerca di limitare la dimensione e la profondità della gerarchia complessiva.

### 2-way data binding: 2-way Sword

Il binding a due vie da solo rende il passaggio da altri framework come Backbone, beh, **frickin amazeballs**.

Il problema è: molti siti **cronicalmente abusano** dei pattern di progettazione di Angular.  
Questo porta a una proliferazione di direttive e a un `$scope/rootScope` che facilmente contiene migliaia di istanze, e può aggrapparsi a oggetti enormi impedendo qualsiasi speranza di una raccolta dei rifiuti efficace.

Sai dovesta andando a finire: un browser esausto! Condannato per sempre a lavorare a un **ritmo frenetico** eseguendo ricompilazioni UI/DOM infinite e ridondanti.

### Ferma l'OVER‑Angular.JSification

> “Se il tuo unico strumento è un martello, allora ogni problema sembra un chiodo.”
>
> – vecchio adagio

La tua app ha problemi con le direttive?

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

Progettiamo un widget utente flessibile che aiuti a:

1.  Componentizzazione versatile con codice Angular DRY  
2.  Direttive comprensibili, con dimensioni/profondità minime (fai attenzione ai ng‑repeat)  
3.  Strato di servizio semplice  
4.  Poco codice reale da implementare – solo HTML/View.

```jade// jade
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

## Soluzioni

### Suggerimenti per Angular

1.  Usa il binding unidirezionale (es. `{ :: title }`)
1.  Limita il nesting ricorsivo delle direttive
1.  E se devi annidare direttive, _MAI_ farlo all’interno di un `ng-repeat` – le prestazioni possono degenerare fino a comportamenti simili a `O(n^2)^3` ;)
    I. Usa codice JS/DOM nativo in un pattern factory per creare frammenti DOM/UI di base, ad esempio: finestra modale, barra di stato. Chiama le factory UI sia dalle direttive sia dai controller.
1.  _Bonus:_ Comprendi i costi e i trigger del [ciclo di vita del rendering del browser](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): animazioni, composizione del rendering, reflow

### Usa Browserify per organizzare il progetto

Non è specifico per Angular, ma è fondamentale per una risoluzione delle dipendenze semplice.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) rende i progetti JS gestibili con praticamente nessun overhead di codice aggiuntivo (ok, qualche centinaio di caratteri).

[Leggi solo questa sezione](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) del [Browserify Handbook](https://github.com/substack/browserify-handbook/).

## Alternative

### [ReactJS](https://facebook.github.io/react/) di Facebook

Se disponi di moltissimi piccoli componenti UI riutilizzabili, ReactJS potrebbe essere una scelta migliore:

- Se il tuo progetto...?:
  - Ha una filosofia di implementazione UI/DOM diversa da Angular
  - È già basato su qualche tipo di “framework” – Puoi **usare ReactJS accanto a** AngularJS, Ember, Backbone. (Da evitare, se possibile.)
  - Gestisce frequenti cambiamenti del modello dati nel proprio codice, trarrai vantaggio evitando la natura ADHD del pattern digest/loop di Angular

### [Polymer Project](http://www.Polymer-Project.org/) di Google

### Approccio più puro a JS

- A proposito, è qui che provo a creare codice indipendente dal framework (+1 testabilità, +1 riuso)
  1.  Usa una classe JavaScript semplice per caricare i dati (AJAX/JSONP/Embedded nella pagina, ecc.)
  1.  Usa il templating mustache per generare stringhe HTML (o il DOM direttamente)
  1.  Metti in cache il contenuto renderizzato in `localStorage` se possibile
  1.  (Opzionale) Aggiungi ora un listener per l'evento che ri-renderizza il contenuto. Ho standardizzato il nome dell'evento `refresh.<class-name>`
````
