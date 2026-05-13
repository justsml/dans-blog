# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/it/index.mdx
- Validation: passed
- Runtime seconds: 10.71
- Input tokens: 4954
- Output tokens: 4551
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001489
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Trucchi AngularJS
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
## AngularJS PUÒ ESSERE Divertente!

> Per: AngularJS v1.x

1.  Gli sviluppatori di AngularJS scoprono rapidamente che le loro applicazioni di media-grande dimensione si rompono sotto il peso dei $watch sparsi e dell'ausilio spesso gonfiato noto come $scope.
2.  Mantieni il $scope privo di stato UI eccessivo, cerca di limitare le dimensioni e la profondità della gerarchia complessiva.

### 2-way data binding: 2-way Sword

Il 2-way binding da solo rende l'approccio proveniente da altri framework come Backbone, beh, **proprio fantastico**.

Il problema è: molti siti **usano in modo cronico eccessivo** i pattern di progettazione di Angular.
Questo porta alla proliferazione di direttive e a un $scope/rootScope che facilmente ha migliaia di istanze, e può aderire a oggetti di grandi dimensioni impedendo qualsiasi speranza di garbage collection efficace.

Conosci già dove stiamo andando: un browser **esausto**! Dannatamente condannato a lavorare a un **ritmo frenetico** eseguendo inutilmente e in modo ridondante le riconsolidazioni UI/DOM.

### Fermiamo l'**OVER-Angular.JSification**

> “Se l'unico tuo strumento è un martello, allora ogni problema sembra un chiodo.”
>
> - vecchio detto

Il tuo app ha problemi con le direttive?

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

Progettiamo un widget utente flessibile che aiuti:

1.  Componentizzazione versatile con codice Angular DRY
1.  Direttive comprensibili, con dimensione/minima profondità ridotta (fai attenzione agli ng-repeats)
1.  Strato di servizi semplice
1.  Poco codice effettivo da implementare - solo HTML/Codice di vista

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

## Soluzioni

### Consigli per Angular

1.  Usa il binding unidirezionale (es. `{ :: title }` )
1.  Limita la ricorsione nella nidificazione delle direttive
1.  E se devi nidificare direttive, _MAI_ farlo all'interno di un `ng-repeat` - Le prestazioni inizieranno a somigliare a qualcosa come `O(n^2)^3` ;)
    I. Usa codice JS/DOM nativo in un modello di fabbrica per creare frammenti di DOM/UI di base, esempi: finestra modale, barra di stato. Chiama le fabbriche UI da direttive o controller.
1.  _Bonus:_ Capisci costi e trigger del [ciclo di rendering del browser](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): animazione, rendering composito, ricalcoli di layout

### Usa Browserify per organizzare il progetto

Non specifico per Angular, ma essenziale per la semplice risoluzione delle dipendenze.

[Browserify](../readme.markdown#exports) rende i progetti JS gestibili con un sovraccarico di codice praticamente nullo (ok, poche centinaia di caratteri).

[Leggi questa sezione](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) del [Browserify Handbook](https://github.com/substack/browserify-handbook/).

## Alternative

### [ReactJS](https://facebook.github.io/react/) di Facebook

Se hai molti piccoli componenti UI riutilizzabili - ReactJS potrebbe essere una scelta migliore:

- Se il tuo progetto...?:
  - Ha una filosofia diversa per l'implementazione dell'UI/DOM rispetto ad Angular
  - Già ha un certo tipo di 'framework' - Puoi **usare ReactJS insieme a** AngularJS, Ember, Backbone. (Evita se possibile però).
  - Gestisce frequenti modifiche al modello di dati nel proprio codice, trarrai vantaggio evitando la natura ADHD del pattern digest/loop in Angular

### [Polymer Project](http://www.Polymer-Project.org/) di Google

### Approccio con JS più "puro"

- Per inciso, ecco dove cerco di creare codice indipendente dal framework (+1 testability, +1 riutilizzo)
  1. Usa una classe JavaScript pura per caricare i dati (AJAX/JSONP/Embedded in page, ecc.)
  1. Usa il templating Mustache per creare stringhe HTML (o DOM direttamente)
  1. Memorizza in cache il contenuto renderizzato in localStorage se possibile
  1. (Opzionale) Aggiungi ora un ascoltatore di eventi per re-renderizzare il contenuto. Ho standardizzato il nome dell'evento su `refresh.<class-name>`
````
