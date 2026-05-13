# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 3.19
- Input tokens: 8616
- Output tokens: 2586
- Thinking tokens: unknown
- Cached input tokens: 4480
- Cache write tokens: 0
- Estimated cost: $0.000802
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/ru/index.mdx reports/i18n/one-weird-trick-to-speed-up-feature-teams/ru
## Raw Output

````mdx
---
title: 'Один странный приём, ускоряющий команды разработки'
subTitle: Старшие инженеры ненавидят это!
date: '2024-09-29'
modified: '2024-09-30'
tags:
  - agile
  - teams
category: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide_danny-howe-98KlbUsOO_w-unsplash.webp
cover_mobile: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_icon: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@dannyhowe?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Danny
  Howe</a> on <a
  href="https://unsplash.com/photos/red-and-white-neon-light-signage-98KlbUsOO_w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
{/* Add html5 toggle element */}

<details>
<summary>Содержание</summary>

- [Thinking in Keys](#thinking-in-keys)
  - [Designing with Keys](#designing-with-keys)
  - [KVs as Graphs & Trees?](#kvs-as-graphs--trees)
  - [When to Use KV Patterns](#when-to-use-kv-patterns)
  - [When to Avoid KV Patterns](#when-to-avoid-kv-patterns)
  - [When you need more than KV](#when-you-need-more-than-kv)
- [Next Steps](#next-steps)
  - [Fact Service - Reference Project](#fact-service---reference-project)
- [Conclusion](#conclusion)
  - [Further Reading](#further-reading)

</details>

When designing a new system or feature, it's easy to get bogged down on schema design. In this article I will share a neat trick that has paid dividends over my career.

<section class="breakout">
  _Try_ the simplest possible data persistence when designing a new system or feature.
</section>

All too often, I see teams reach for SQL or MongoDB as their only choice for data storage. Sure, no one's getting fired for choosing SQL. But what if I told you there's a simpler, faster, and cheaper way to start?

A KV or Key-value store might be all you need. Something like Redis or S3.

Это не всегда правильный выбор, но, вероятно, **чаще, чем вы думаете**.

Простой слой хранения может умеренно ускорить *раннюю* разработку за счёт повторного использования кода уровня данных и избежания затрат, связанных с постоянными изменениями схемы и миграциями. Такие изменения произойдут в любом случае; пусть код справляется с ними как можно дольше. Лучше избегать двойной работы над изменениями.

Ожидается прирост производительности, поскольку поиск по `key` сильно оптимизирован, а записи могут выигрывать от пакетных обновлений.

{/* Избегайте KV‑шаблонов, если вам нужны JOIN‑ы или запросы по свойствам в наборе данных. Или в случаях, когда у вас неограниченные/бесконечно растущие наборы данных. (`Logs`, `Signups` и т.п.) */}

## Мыслить в ключах

Это может показаться странным — проектировать сначала по шаблону Key‑Value, особенно если вы привыкли разрабатывать системы с иерархиями объектов или диаграммами «сущность‑отношение» и сразу реализовывать их в SQL.

Вы, вероятно, ***использовали*** шаблоны key‑value раньше! Они встречаются повсюду — от конфигураций и URL‑ов до объектного хранилища в стиле S3! Каждый раз, когда вы работаете с данными через уникальное значение `ID`, угадайте что? Ещё один шаблон Key‑Value! (Хотя не обязательно KV‑Store.)

### Проектирование с ключами

Практически любые данные _можно_ представить с помощью KV‑шаблонов. (На самом деле многие более высокоуровневые БД строятся на нижележащих KV‑шаблонах.) Рассмотрим несколько примеров:

```markdown
user/123          {id: 123, ...}
user/123/block    ['user/456', 'user/789']
user/123/groups   ['admin', 'staff']
user/420/friends  ['user/456', 'user/789']

group/admin       {user: '*:rw'}
group/default     {user: '*:r'}

product/42/discount/<UUID>	{percentOff: '10%'}
product/42/discount/<UUID>	{percentOff: '20%', minTotal: 100.0}
```

Вы, наверное, заметили, что `ID` часто является самим ключом! Это распространённый шаблон в KV‑хранилищах. Ключ обычно представляет собой комбинацию типа сущности и уникального идентификатора (например `user/123`, `user:456`).

### KV‑как графы и деревья?

Иногда удобно представлять сложные структуры данных, такие как графы или деревья, с помощью KV‑шаблонов. (Опять же, REST‑URL‑ы являются отличным примером этого.)

Иерархия ключей (`user/420` → `user/420/friends`) естественно кодирует графовую связь между `user` и его `friends`.

Это быстрый и дешёвый способ сериализовать графовые структуры данных, особенно если вам не требуется сложность графовой БД (например Neo4j).

<figure>
![Graph of user/123](../KVsCanBeGraphs.webp)
<figcaption>Граф пользователя /123</figcaption>
</figure>

### Когда использовать KV‑шаблоны

- Когда требуется огромный масштаб (миллиарды и даже триллионы пар KV).  
- Когда доступ к данным происходит преимущественно по уникальному ключу.  
- Когда нужны простые структуры данных.  
- Когда данные имеют иерархическую, графовую или древовидную структуру.

### Когда избегать KV‑шаблонов

Не храните такие вещи, как комментарии к блогу, в _**одной**_ KV‑паре. Например, `post/666 -> {comments: [...too many...]}`. Вместо этого используйте `post/666/comments/1`, `post/666/comments/<UUID>` и т.п., либо перейдите на таблицу SQL.

- Когда необходимо выполнять поиск по свойствам (а не по ключу или ID) в наборе данных.  
- Когда требуется выполнять JOIN данных между несколькими сущностями.  
- Когда нужно обеспечивать сложные ограничения или отношения.

### Когда требуется больше, чем KV

По мере естественного роста требований проекта вам может понадобиться функциональность, недоступную в KV‑хранилище. В этом случае придётся рассматривать миграцию на более сложное хранилище данных.

{/* Хорошая новость в том, что часто можно начать с KV‑шаблона и при необходимости развить его до более сложной системы. У S3 есть возможности за пределами простого хранения: Athena для поиска файлов, Glacier и политики истечения срока действия — всё это расширяет его применение. Кроме того, Redis добавил множество высокоуровневых функций (например, Pub/Sub, геопространственные запросы, Streams и Sorted Sets), которые могут помочь удовлетворить некоторые требования. */}

Хорошая новость в том, что миграция отдельного KV‑хранилища в SQL обычно проще, чем перенос сложной SQL‑схемы в KV‑хранилище (с множеством таблиц, индексов, ограничений и т.д.). Я делал это много раз с помощью скрипта в 50 строк.

Ана́кдотически я заметил, что качество проектов на SQL выше, если сначала построить модель на основе KV‑паттерна. Это заставляет по‑другому взглянуть на данные и чётко понять, _именно_ что требуется от SQL.

## Следующие шаги

Лучший способ научиться — пробовать! Если хотите глубже изучить этот подход, советую **строить прототипы** с Redis, DynamoDB или S3. Все они отличные KV‑хранилища с разными компромиссами.

### Fact Service — референс‑проект

Посмотрите мой открытый проект ["Fact Service", референс‑проект на GitHub](https://github.com/justsml/fact-service).

Это автономный RESTful‑API, реализующий KV‑сервис данных.

Он включает множество [адаптеров данных](https://github.com/justsml/fact-service/tree/main/lib/providers), в том числе для Postgres, Redis, DynamoDB, Firestore и Cassandra! (Полный набор [Docker‑команд](https://github.com/justsml/fact-service/tree/main/lib/providers) для быстрого старта.)

Fact Service задуман как стартовый и обучающий проект — форкните его и построите собственный KV‑сервис данных!

## Заключение

Надеюсь, статья была полезной! Если у вас есть вопросы или отзывы, оставляйте комментарии или упоминайте меня в [Twitter](https://x.com/justsml).

### Благодарности

- [Моделирование иерархических деревьев в PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [Что следует и чего не следует делать при хранении больших деревьев в PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### Дополнительное чтение

- [Fact Service](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
