# Translation Candidate
- Slug: security-notes-regex
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/ru/index.mdx
- Validation: passed
- Runtime seconds: 0.83
- Input tokens: 1946
- Output tokens: 654
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000194
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Заметки по безопасности: RegEx'
subTitle: Может ли RegEx быть уязвимым?
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## Denial-of-Service с помощью регулярных выражений: ReDOS

Одна из самых неожиданно, но трудно обнаруживаемых уязвимостей, с которыми я сталкивался, связана с регулярными выражениями.  
То — плохо написанные, то — плохо реализованные.

Большие или специально сформированные пользовательские данные могут исчерпать память или процессор.

> Это уязвимость типа отказа в обслуживании, а не просто «запах» производительности. Если враждебный ввод может удерживать процессор достаточно долго, чтобы лишить реальных пользователей ресурсов, его следует включить в модель угроз безопасности.

### Признаки предупреждения

1. Вложенные квантификаторы, повторяющиеся группы или перекрывающиеся альтернативы  
2. Движки с интенсивным откатом без тайм‑аутов или ограничений длины ввода  
3. Выражение применяется к непроверенным пользовательским данным  
4. Проверка регуляркой выполняется в горячем пути запроса

### Смягчение / Решение

1. Регулярные выражения — сложная тема.  
    1.  Например, вот как «по‑умному» советуют работать с проверкой IP‑адресов в [OWASP][owasp]: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2.  Это длиннее, чем (старый) твит, для всего лишь 4‑байтового IP‑адреса!!!  
2. Ограничьте длину ввода до применения регулярного выражения.  
3. Добавьте тайм‑ауты, статический анализ или используйте движок без отката, если платформа это поддерживает.  
4. Это касается почти всех языков и платформ: .NET, Node, Python, PERL, Java.

### Ссылки

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
