# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/de/index.mdx
- Validation: passed
- Runtime seconds: 2.13
- Input tokens: 5363
- Output tokens: 1520
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000483
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: AngularJS‑Tricks
subTitle: AngularJS kann Spaß machen!
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
## AngularJS KANN Spaß machen!

> Für: AngularJS v1.x

1.  AngularJS‑Entwickler stellen schnell fest, dass ihre mittel‑großen Anwendungen unter dem Gewicht verstreuter `$watch`s` und der oft aufgeblähten Krücke `$scope` zusammenbrechen.
2.  Halten Sie `$scope` frei von überflüssigem UI‑Zustand, versuchen Sie, Größe und Tiefe Ihrer gesamten Hierarchie zu begrenzen.

### 2‑Way‑Datenbindung: 2‑Way‑Schwert

2‑Way‑Binding allein lässt den Umstieg von anderen Frameworks wie Backbone **wirklich beeindruckend** wirken.

Das Problem ist: Viele Seiten **übernutzen chronisch** Angulars Design‑Muster.  
Das führt zu einer Ausbreitung von Directives und einem `$scope/rootScope`, das leicht tausende Instanzen enthält und an riesigen Objekten hängen bleibt, was jede Aussicht auf effektive Garbage‑Collection zunichtemacht.

Sie wissen, worauf das hinausläuft: ein ausgelaugter Browser! Für immer dazu verdammt, mit **rasender Geschwindigkeit** endlose und redundante UI/DOM‑Re‑Compilings auszuführen.

### Stoppen Sie die ÜBER‑Angular.JS‑ifizierung

> „Wenn Ihr einziges Werkzeug ein Hammer ist, sieht jedes Problem wie ein Nagel aus.“
>
> – altes Sprichwort

Hat Ihre Anwendung Probleme mit Directives?

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

Entwerfen wir ein flexibles User‑Widget, das Folgendes ermöglicht:

1. Vielseitige Komponentenbildung mit DRY‑Angular‑Code  
2. Verständliche Directives, mit minimaler Größe/Tiefe (achten Sie auf Ihre ng‑repeats)  
3. Einfache Service‑Schicht  
4. Wenig eigentlicher Code – hauptsächlich HTML/View‑Code

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

## Lösungen

### Angular‑Tipps

1.  Verwenden Sie 1‑Richtungs‑Binding (z. B. `{ :: title }` )
1.  Begrenzen Sie rekursive Verschachtelungen von Directives
1.  Und wenn Sie Directives verschachteln müssen, **NIEMALS** innerhalb eines `ng-repeat` – die Performance kann dann schnell in die Größenordnung von `O(n^2)^3` geraten ;)
    I. Nutzen Sie nativen JS/DOM‑Code in einem Factory‑Pattern, um grundlegende DOM/UI‑Fragmente zu erzeugen, z. B. Modal‑Nachrichtenbox, Statusleiste. Rufen Sie UI‑Factories aus Directives oder Controllers auf.
1.  **Bonus:** Verstehen Sie Kosten und Auslöser des [Browser‑Render‑Lifecycle](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): Animation, Composite‑Rendering, Reflows

### Browserify zum Projekt‑Organisieren einsetzen

Nicht speziell für Angular, aber unverzichtbar für eine einfache Auflösung von Abhängigkeiten.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) macht JS‑Projekte handhabbar, ohne nennenswerten Code‑Overhead (ok, ein paar hundert Zeichen).

[Justread this section](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) des [Browserify Handbook](https://github.com/substack/browserify-handbook/).

## Alternativen

### [ReactJS](https://facebook.github.io/react/) von Facebook

Wenn Sie viele kleine wiederverwendbare UI‑Komponenten besitzen – ReactJS könnte die bessere Wahl sein:

- Wenn Ihr Projekt...?:
  - Eine andere Philosophie zur UI/DOM‑Implementierung als Angular verfolgt
  - Bereits irgendeine Art von „Framework“ nutzt – Sie können **ReactJS neben** AngularJS, Ember, Backbone einsetzen. (Nach Möglichkeit vermeiden.)
  - Häufige Änderungen am Datenmodell im eigenen Code verarbeitet, profitieren Sie davon, das ADHS‑artige Digest/Loop‑Muster von Angular zu umgehen

### [Polymer Project](http://www.Polymer-Project.org/) von Google

###Pure-er JS Ansatz

- Übrigens, hier versuche ich, framework‑agnostischen Code zu schreiben (+1 Testbarkeit, +1 Wiederverwendbarkeit)  
  1.  Verwende eine plain‑JavaScript‑Klasse, um Daten zu laden (AJAX/JSONP/Im Seiteninhalt eingebettet usw.)  
  1.  Nutze Mustache‑Templating, um HTML‑Strings zu erzeugen (oder direkt DOM)  
  1.  Cache den gerenderten Inhalt in `localStorage`, sofern möglich  
  1.  (Optional) Jetzt einen Event‑Listener hinzufügen, um den Inhalt neu zu rendern. Ich habe mich auf den Event‑Namen `refresh.<class-name>` standardisiert
````
