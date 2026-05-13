# Translation Candidate
- Slug: security-notes-regex
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/ru/index.mdx
- Validation: passed
- Runtime seconds: 5.62
- Input tokens: 1870
- Output tokens: 2292
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000700
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: Могут ли регулярные выражения быть уязвимыми?
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
## Отказ в обслуживании при регулярных выражениях: ReDOS

Одной из более удивительных и трудноуловимых уязвимостей, которые я нашел, является проблема, связанная с регулярными выражениями — либо плохо написанными, либо плохо реализованными.  

Память/CPU могут быть исчерпаны при обработке больших или специально созданных входных данных от пользователя.  

> Это уязвимость, связанная с отказом в обслуживании, а не просто проблема производительности. Если враждебные входные данные могут занять процессор настолько, что реальные пользователи останутся без ресурсов, это должно быть учтено в вашей модели угроз безопасности.  

### Признаки риска  

1. Вложенные квантификаторы, повторяющиеся группы или перекрывающиеся альтернативы  
2. Двигатели с интенсивным backtracking, у которых нет тайм-аута или ограничения длины входных данных  
3. Выражение используется с непроверенными входными данными от пользователя  
4. Проверка с помощью регулярных выражений выполняется на критичном пути запроса

### Митигация / Решение

1. Работа с RegEx сложна.  
    1. Например, вот как умные ребята из [OWASP рекомендуют проверять IP-адреса][owasp]:  
       `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2. Это длиннее, чем (старомодный) твит, для проверки 4-байтового IP-адреса!!!  
2. Ограничьте длину входных данных перед выполнением регулярного выражения.  
3. Добавьте тайм-ауты, статический анализ или используйте небэктрекинговый движок, если платформа поддерживает это.  
4. Это касается почти всех языков и платформ: .NET/Node/Python/PERL/Java.  

### Ссылки  

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
