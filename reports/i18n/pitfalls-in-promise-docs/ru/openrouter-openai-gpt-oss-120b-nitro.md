# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ru/index.mdx
- Validation: deferred
- Runtime seconds: 1.15
- Input tokens: 2985
- Output tokens: 819
- Thinking tokens: unknown
- Cached input tokens: 1408
- Cache write tokens: 0
- Estimated cost: $0.000264
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Подводные камни в документации Promise
subTitle: Избегаем проблем популярных документов
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
> Обнаружение анти‑шаблонов Promise в результатах поиска Google и популярных библиотеках.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Начну с признания: я сам писал те же «анти‑шаблоны», которые критикую ниже, и уверен, что многие разработчики JS делают то же самое. Всё, что я изложил, не направлено лично ни к кому и тем более не нацелено на оригинальных авторов. Это просто обзор типичных паттернов — я хочу передать вам своё понимание приоритетов и процесса критического мышления.

> Надеюсь, после изучения этого проекта вы сможете распознавать сигналы плохих Promise.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDIT:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **CREDIT:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **CREDIT:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
Это довольно солидная статья. У меня есть лишь одна озабоченность:

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

Библиотека Q — одна из самых часто используемых и старейших, ассоциируемых с «Promise». Поэтому она страдает от устаревших примеров и необходимости поддерживать обратную совместимость.  
**Я говорю «ассоциируется с ‘Promise’», потому что считаю, что Q на самом деле реализует паттерн `deferred`.**

Она может напоминать Promise, однако я настаиваю, что это не так. У неё слишком большая поверхность API по неправильным причинам. Кроме того, соглашения об именовании непоследовательно сокращают названия, что усложняет запоминание интерфейса. Методы вроде `when` и `done` не нужны.

Bottom line: паттерн `deferred` — болезненный анти‑паттерн, который почти ничего не улучшает по сравнению с обычным подходом через колбэки.

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> Пожалуйста, ознакомьтесь с (и поставьте ★) сопутствующим репозиторием статьи на Github — [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> Цель проекта: исследовать и разрабатывать более чистые функциональные паттерны в JavaScript.
````
