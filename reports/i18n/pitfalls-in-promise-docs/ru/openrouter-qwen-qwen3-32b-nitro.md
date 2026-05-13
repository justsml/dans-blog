# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ru/index.mdx
- Validation: deferred
- Runtime seconds: 7.88
- Input tokens: 2911
- Output tokens: 3338
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001034
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Питфолы в документации Promise
subTitle: Избегание проблем из популярной документации
date: '2017-05-10'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - programming
  - patterns
  - promises
  - functional-programming
cover: ../craig-whitehead-433328-unsplash.webp
cover_mobile: ../w300_craig-whitehead-433328-unsplash.webp
cover_icon: ../icon_craig-whitehead-433328-unsplash.webp
---
> Обнаружение антипаттернов в Promise в результатах поиска Google и популярных библиотеках.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Приступая к делу, начну с признания: я виноват в написании тех же «антипаттернов», которые критикую ниже, как и многие JS-разработчики. Ничто из сказанного не должно восприниматься лично или даже как критика первоисточников. Я просто провожу код-ревью распространённых паттернов — надеюсь, это поможет понять мои приоритеты и логику критического мышления.

> Надеюсь, после глубокого изучения этого проекта вы сможете распознать признаки плохих Promise.

1. [CallbackHell.com](#callbackhellcom)  
1. [StrongLoop](#strongloop)  
1. [RisingStack](#risingstack)  
1. [Q Library](#qlibrary)  

--------------------------  
### CallbackHell.com  
> **ИСТОЧНИК:** http://callbackhell.com/  
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop  
> **ИСТОЧНИК:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`  
![strong loop](../strongloop.webp)  

----------------
### RisingStack  
> **ИСТОЧНИК:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/  
Это довольно хорошая статья. У меня есть один вопрос:  

![Rising Stack](../risingstack.webp)  

------------------------
### Q Library  
> **ИСТОЧНИК:** https://github.com/kriskowal/q  

Библиотека Q — одна из самых популярных и старых, связанная с понятием "Promises". Поэтому она страдает устаревшими примерами и необходимостью поддерживать обратную совместимость.  
**Я говорю "связанная с 'Promises'", потому что считаю, что Q на самом деле посвящена паттерну `deferred`.**  

Она может выглядеть как Promises, но настаиваю: это не так. Ее API слишком велик по всем неправильным причинам. Также несогласованное сокращение имен усложняет запоминание интерфейса. Методы вроде `when` и `done` не нужны.

В сухом остатке: паттерн `deferred` — это болезненный антипаттерн, который практически ничего не улучшает по сравнению с обычным подходом с обратными вызовами.

![q first example](qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](qlibrary-2.webp)

> Посмотрите (и поставьте звезду) на сопровождающий проект этой статьи на Github: [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> Цель проекта: исследование и разработка лучшего функциональных языковых паттернов в JavaScript.
````
