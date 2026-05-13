# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/ru/index.mdx
- Validation: passed
- Runtime seconds: 2.04
- Input tokens: 5244
- Output tokens: 1549
- Thinking tokens: unknown
- Cached input tokens: 2432
- Cache write tokens: 0
- Estimated cost: $0.000483
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Трюки AngularJS
subTitle: AngularJS может быть весёлым!
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
## AngularJS CAN BE Fun!

> For: AngularJS v1.x

1.  Разработчики AngularJS быстро понимают, что их средние‑крупные приложения начинают «потянуться» под тяжестью разбросанных `$watch`‑ов и часто раздутой опоры, известной как `$scope`.
2.  Держите `$scope` свободным от лишнего UI‑состояния, постарайтесь ограничить размер и глубину общей иерархии.

### 2-way data binding: 2-way Sword

Само по себе двухстороннее связывание делает переход с других фреймворков, вроде Backbone, просто **офигенно**.

Проблема в том, что многие сайты **хронически переиспользуют** дизайн‑паттерны Angular.
Это приводит к разрастанию директив и `$scope/rootScope`, которые легко набирают тысячи экземпляров и могут удерживать огромные объекты, мешая эффективному сбору мусора.

Выуже догадываетесь, к чему это приведёт: истощённый браузер! Вечный режим работы на **безумной скорости** с бесконечными и избыточными перекомпиляциями UI/DOM.

### Прекратите пере‑Angular.JS‑изацию

> «Если ваш единственный инструмент — молоток, то каждая проблема выглядит как гвоздь».  
> — старое изречение

У вашего приложения проблемы с директивами?

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

Сконструируем гибкий пользовательский виджет, который поможет:

1.  Универсальная компонентность с DRY‑кодом Angular  
2.  Понятные директивы, минимальный размер и глубина (следите за `ng-repeat`)  
3.  Простой слой сервисов  
4.  Минимум кода для реализации — только HTML/шаблоны

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

## Решения

### Советы по Angular

1.  Используйте однонаправленное связывание (например, `{ :: title }` )
1.  Ограничьте рекурсивное вложение директив
1.  И если всё же нужно вложить директивы, _НИКОГДА_ делайте это внутри `ng-repeat` — производительность может деградировать до уровня `O(n^2)^3` ;)
    I. Выносите нативный JS/DOM‑код в фабричный паттерн для создания базовых DOM/UI‑фрагментов, примеры: модальное окно, статус‑бар. Вызывайте UI‑фабрики из директив или контроллеров.
1.  _Бонус:_ Поймите стоимость и триггеры [жизненного цикла рендеринга браузера](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): анимация, композитный рендер, перерасчёты

### Используйте Browserify для организации проекта

Не привязано исключительно к Angular, но критично для простого разрешения зависимостей.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) делает JS‑проекты управляемыми практически без дополнительного кода (ок, несколько сотен символов).

[Прочитайте этот раздел](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) из [руководства по Browserify](https://github.com/substack/browserify-handbook/).

## Альтернативы

### [ReactJS](https://facebook.github.io/react/) от Facebook

Если у вас множество небольших переиспользуемых UI‑компонентов, ReactJS может оказаться лучшим выбором:

- Если ваш проект…?:
  - Имеет отличную от Angular философию реализации UI/DOM
  - Уже использует какой‑то «фреймворк» — Вы можете **использовать ReactJS рядом** с AngularJS, Ember, Backbone. (По возможности лучше избегать).
  - Обрабатывает частые изменения модели данных в собственном коде, вы получите выгоду, избежав «ADHD‑похожего» поведения цикла digest в Angular

### [Polymer Project](http://www.Polymer-Project.org/) от Google

### Более «чистый» подход на чистом JS

- Кстати, здесь я показываю, как писать код, не привязанный к какому‑либо фреймворку (плюс 1 к тестируемости, плюс 1 к переиспользуемости)
  1.  Использовать обычный JavaScript‑класс для загрузки данных (AJAX/JSONP/встроено в страницу и т.д.)
  1.  Применять шаблонизацию Mustache для создания HTML‑строк (или напрямую работать с DOM)
  1.  Кешировать отрендеренный контент в `localStorage`, если это возможно
  1.  (Опционально) Добавить обработчик события для повторного рендеринга контента. Я стандартизировал имя события как `refresh.<class-name>`
````
